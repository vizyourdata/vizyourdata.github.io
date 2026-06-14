/* ============================================================
   lab.js — "The Lab" bench engine.
   ------------------------------------------------------------
   Wires up a Tableau Public workbook through the Embedding API
   v3, reads what's inside (sheets · filters · parameters), and
   builds the matching web controls in the instrument panel.

   No build step, no framework. Everything is discovered at
   runtime, so any public workbook can be patched in via
   /lab/?src=<url> or the patch-bay input.
   ============================================================ */
(function () {
  "use strict";

  /* ---------- dom handles ---------- */
  var tviz   = document.getElementById("tviz");
  var msg    = document.getElementById("msg");
  var panel  = document.getElementById("panelBody");
  var feed   = document.getElementById("feed");
  var feedCt = document.getElementById("feedCount");
  var nS     = document.getElementById("nSheets");
  var nF     = document.getElementById("nFilters");
  var nP     = document.getElementById("nParams");
  var patch  = document.getElementById("patch");
  var srcIn  = document.getElementById("srcInput");

  var eventCount = 0;
  var suppressUntil = 0;       // ignore echoes of changes we made ourselves
  var rebuildTimer = null;

  /* per-workbook caches — Tableau Public charges a server roundtrip for
     every introspection call, and 403s get-parameter-models on many
     workbooks. Ask once per wiring, remember the answer. */
  var paramCache = null;       // Parameter[] once fetched
  var paramsBlocked = false;   // Public refused get-parameter-models
  var domainCache = {};        // fieldName → domain values

  /* ============================================================
     event tape
     ============================================================ */
  function tape(evt, text) {
    eventCount++;
    var t = new Date().toTimeString().slice(0, 8);
    feed.innerHTML = t + ' · <span class="evt">' + esc(evt) + "</span> · <b>" + esc(text) + "</b>";
    feedCt.textContent = "evt " + String(eventCount).padStart(3, "0");
  }
  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  /* ============================================================
     tiny dom helpers
     ============================================================ */
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }
  function section(no, title, hint) {
    var s = el("div", "sect");
    var h = el("div", "sect-head");
    h.appendChild(el("span", "no", no));
    var h2 = el("h2"); h2.textContent = title; h.appendChild(h2);
    if (hint) h.appendChild(el("span", "hint", hint));
    s.appendChild(h);
    return s;
  }
  function ctrlCard(label, worksheetName) {
    var c = el("div", "ctrl");
    var lab = el("div", "lab");
    var dot = el("i"); lab.appendChild(dot);
    lab.appendChild(document.createTextNode(label));
    if (worksheetName) {
      var ws = el("span", "ws", worksheetName);
      ws.title = "on worksheet: " + worksheetName;
      lab.appendChild(ws);
    }
    c.appendChild(lab);
    return c;
  }
  function note(text) { return el("p", "empty-note", text); }

  /* mark "this change came from our own panel" so the viz's echo
     event doesn't trigger a rebuild mid-interaction. Public echoes
     can land seconds later, so the window is generous. */
  function selfChange() { suppressUntil = Date.now() + 2500; }

  /* ============================================================
     loading a workbook
     ============================================================ */
  var q = new URLSearchParams(location.search);
  var initialSrc = q.get("src") || "";
  if (initialSrc) {
    srcIn.value = initialSrc;
    load(initialSrc);
  }

  patch.addEventListener("submit", function (e) {
    e.preventDefault();
    var url = srcIn.value.trim();
    if (!url) return;
    var u = new URL(location.href);
    u.searchParams.set("src", url);
    history.replaceState(null, "", u);
    load(url);
  });

  function load(url) {
    tape("patch", "wiring " + (url.split("/views/")[1] || url));
    msg.classList.add("hidden");
    tviz.classList.remove("hidden");
    panel.innerHTML = "";
    var s = el("div", "sect");
    var r = el("p", "reading"); r.appendChild(el("i"));
    r.appendChild(document.createTextNode("reading instruments…"));
    s.appendChild(r);
    panel.appendChild(s);
    nS.textContent = nF.textContent = nP.textContent = "–";
    paramCache = null; paramsBlocked = false; domainCache = {};
    tviz.src = url;
  }

  tviz.addEventListener("firstinteractive", function () {
    tape("interactive", "workbook is live — scanning");
    buildPanel();
  });

  tviz.addEventListener("vizloaderror", function (e) {
    tape("error", "viz failed to load");
    tviz.classList.add("hidden");
    msg.classList.remove("hidden");
    msg.innerHTML =
      '<h3>Couldn’t load that <em>workbook</em></h3>' +
      "<p>The URL may be private, mistyped, or not a Tableau Public /views/ link.</p>" +
      '<p class="mono">' + esc(srcIn.value) + "</p>";
    console.warn(e);
  });

  /* live events from the viz → tape + panel resync */
  tviz.addEventListener("filterchanged", function (e) {
    var f = e.detail && e.detail.fieldName ? e.detail.fieldName : "filter";
    tape("filterchanged", f);
    queueRebuild();
  });
  tviz.addEventListener("parameterchanged", function (e) {
    tape("parameterchanged", "parameter updated");
    queueRebuild();
  });
  tviz.addEventListener("markselectionchanged", function (e) {
    Promise.resolve()
      .then(function () { return e.detail.getMarksAsync(); })
      .then(function (marks) {
        var n = marks && marks.data && marks.data[0] ? marks.data[0].data.length : 0;
        tape("markselection", n + " mark" + (n === 1 ? "" : "s") + " selected");
      })
      .catch(function () { tape("markselection", "selection changed"); });
  });
  tviz.addEventListener("tabswitched", function (e) {
    tape("tabswitched", (e.detail && e.detail.newSheetName) || "sheet changed");
    queueRebuild();
  });

  function queueRebuild() {
    if (Date.now() < suppressUntil) return;       // our own echo
    clearTimeout(rebuildTimer);
    rebuildTimer = setTimeout(buildPanel, 600);   // settle, then re-scan
  }

  /* ============================================================
     introspection → panel
     ============================================================ */
  function buildPanel() {
    var wb = tviz.workbook;
    if (!wb) return;

    var built = {
      sheets: section("01", "Sheets", "tap to activate"),
      filters: section("02", "Filters", "found on the canvas"),
      params: section("03", "Parameters", "workbook-wide"),
      actions: section("04", "Actions", "toolbar, rebuilt"),
    };
    var counts = { filters: 0, params: 0 };

    /* ---- 01 · sheets ---- */
    var active = wb.activeSheet;
    var infos = [];
    try { infos = wb.publishedSheetsInfo || []; } catch (e) { /* fine */ }
    nS.textContent = infos.length || 1;

    if (infos.length > 1) {
      var chips = el("div", "chips");
      infos.forEach(function (si) {
        var isActive = active && si.name === active.name;
        var chip = el("button", "chip" + (isActive ? " on accent" : ""), si.name);
        chip.type = "button";
        chip.addEventListener("click", function () {
          tape("activate", si.name);
          selfChange();
          wb.activateSheetAsync(si.name)
            .then(buildPanel)
            .catch(function (err) { tape("error", "couldn't switch sheet"); console.warn(err); });
        });
        chips.appendChild(chip);
      });
      built.sheets.appendChild(chips);
    } else {
      built.sheets.appendChild(note("Single published sheet" + (active ? ": " + active.name : "") + "."));
    }

    /* ---- which worksheets are on the canvas? ---- */
    var worksheets = [];
    if (active) {
      if (active.sheetType === "dashboard") worksheets = active.worksheets || [];
      else if (active.sheetType === "worksheet") worksheets = [active];
      else if (active.sheetType === "story") {
        var sp = active.activeStoryPoint;
        var contained = sp && sp.containedSheet;
        if (contained && contained.sheetType === "dashboard") worksheets = contained.worksheets || [];
        else if (contained) worksheets = [contained];
      }
    }

    /* ---- 02 · filters (async per worksheet) ---- */
    var filterJobs = worksheets.map(function (ws) {
      return ws.getFiltersAsync().then(
        function (fs) { return { ws: ws, filters: fs }; },
        function () { return { ws: ws, filters: [] }; }
      );
    });

    /* ---- 03 · parameters (fetched once per wiring — Tableau Public
       403s this endpoint on many workbooks, so never re-ask) ---- */
    var paramJob = paramCache !== null
      ? Promise.resolve(paramCache)
      : wb.getParametersAsync().then(
          function (ps) { paramCache = ps || []; return paramCache; },
          function () { paramsBlocked = true; paramCache = []; return paramCache; }
        );

    Promise.all([Promise.all(filterJobs), paramJob]).then(function (res) {
      var perWs = res[0], params = res[1];

      /* filters — dedupe by field name so a dashboard-wide filter
         shows once, applied to every worksheet that carries it */
      var seen = {};
      perWs.forEach(function (entry) {
        entry.filters.forEach(function (f) {
          var key = f.fieldName + "::" + f.filterType;
          if (seen[key]) { seen[key].sheets.push(entry.ws); return; }
          seen[key] = { filter: f, sheets: [entry.ws] };
        });
      });
      var list = Object.keys(seen).map(function (k) { return seen[k]; });
      counts.filters = list.length;

      if (!list.length) {
        built.filters.appendChild(note("No filters on this sheet. Add some in the workbook and re-wire."));
        finishFilters();
      } else {
        /* build each filter control (categorical ones fetch domains async) */
        var jobs = list.map(function (item) {
          return buildFilterControl(item.filter, item.sheets).then(function (node) {
            if (node) built.filters.appendChild(node);
          });
        });
        Promise.all(jobs).then(finishFilters, finishFilters);
      }

      function finishFilters() {
        /* params */
        counts.params = params.length;
        if (paramsBlocked) {
          built.params.appendChild(note(
            "Tableau Public blocked parameter introspection for this workbook (403). " +
            "Drive parameters inside the viz, or show them as native controls on the dashboard."));
        } else if (!params.length) {
          built.params.appendChild(note("No parameters in this workbook."));
        } else {
          params.forEach(function (p) {
            built.params.appendChild(buildParamControl(wb, p));
          });
        }

        /* actions */
        built.actions.appendChild(buildActions());

        /* swap the panel in, all at once */
        panel.innerHTML = "";
        panel.appendChild(built.sheets);
        panel.appendChild(built.filters);
        panel.appendChild(built.params);
        panel.appendChild(built.actions);
        nF.textContent = counts.filters;
        nP.textContent = counts.params;
        tape("scan", counts.filters + " filters · " + counts.params + " parameters · " + (infos.length || 1) + " sheets");
      }
    });
  }

  /* ============================================================
     filter controls
     ============================================================ */
  function buildFilterControl(f, sheets) {
    var wsName = sheets.length > 1 ? sheets.length + " worksheets" : sheets[0].name;

    if (f.filterType === "categorical") return buildCategorical(f, sheets, wsName);
    if (f.filterType === "range")       return Promise.resolve(buildRange(f, sheets, wsName));

    /* hierarchical / relative-date: acknowledge, don't fake it */
    var c = ctrlCard(f.fieldName, wsName);
    c.appendChild(note("(" + f.filterType + " filter — read-only here; drive it in the viz)"));
    return Promise.resolve(c);
  }

  /* --- categorical: chips for small domains, checkbox well for big --- */
  function buildCategorical(f, sheets, wsName) {
    /* domain values rarely change → one roundtrip per field per wiring */
    var domainP;
    if (domainCache[f.fieldName]) {
      domainP = Promise.resolve(domainCache[f.fieldName]);
    } else if (f.getDomainAsync) {
      domainP = f.getDomainAsync("relevant").then(
        function (d) {
          var vals = (d && d.values) || null;
          if (vals && vals.length) domainCache[f.fieldName] = vals;
          return vals;
        },
        function () { return null; }
      );
    } else {
      domainP = Promise.resolve(null);
    }

    return domainP.then(function (domainValues) {
      var values = domainValues || f.appliedValues || [];
      var applied = {};
      (f.appliedValues || []).forEach(function (v) { applied[String(v.value)] = true; });
      var allSelected = f.isAllSelected === true ||
        (!f.appliedValues || !f.appliedValues.length);

      var c = ctrlCard(f.fieldName, wsName);
      if (!values.length) {
        c.appendChild(note("(no readable domain — drive it in the viz)"));
        return c;
      }

      function isOn(v) { return allSelected || applied[String(v.value)]; }

      function apply(selected, total) {
        selfChange();
        var useAll = selected.length === total || selected.length === 0;
        var verb = useAll ? "all" : "replace";
        var vals = useAll ? [] : selected;
        tape("apply", f.fieldName + " → " + (useAll ? "(all)" : selected.join(", ")));
        sheets.forEach(function (ws) {
          ws.applyFilterAsync(f.fieldName, vals, verb)
            .catch(function (err) { tape("error", "filter failed: " + f.fieldName); console.warn(err); });
        });
      }

      if (values.length <= 8) {
        /* chip multi-select */
        var chips = el("div", "chips");
        values.forEach(function (v) {
          var label = v.formattedValue != null ? v.formattedValue : String(v.value);
          var chip = el("button", "chip" + (isOn(v) ? " on" : ""), label);
          chip.type = "button";
          chip.dataset.val = String(v.value);
          chip.addEventListener("click", function () {
            chip.classList.toggle("on");
            var sel = [].slice.call(chips.querySelectorAll(".chip.on"))
              .map(function (n) { return n.dataset.val; });
            apply(sel, values.length);
          });
          chips.appendChild(chip);
        });
        c.appendChild(chips);
      } else {
        /* scrollable checkbox well */
        var well = el("div", "well");
        values.forEach(function (v) {
          var label = el("label");
          var cb = el("input"); cb.type = "checkbox"; cb.checked = isOn(v);
          cb.dataset.val = String(v.value);
          cb.addEventListener("change", function () {
            var sel = [].slice.call(well.querySelectorAll("input:checked"))
              .map(function (n) { return n.dataset.val; });
            apply(sel, values.length);
          });
          label.appendChild(cb);
          label.appendChild(document.createTextNode(
            v.formattedValue != null ? v.formattedValue : String(v.value)));
          well.appendChild(label);
        });
        c.appendChild(well);

        var row = el("div", "mini-row");
        var allBtn = el("button", "mini", "all"); allBtn.type = "button";
        var noneBtn = el("button", "mini", "none"); noneBtn.type = "button";
        allBtn.addEventListener("click", function () {
          [].forEach.call(well.querySelectorAll("input"), function (n) { n.checked = true; });
          apply([], values.length); /* [] + total trick → 'all' */
          tape("apply", f.fieldName + " → (all)");
        });
        noneBtn.addEventListener("click", function () {
          [].forEach.call(well.querySelectorAll("input"), function (n) { n.checked = false; });
          selfChange();
          sheets.forEach(function (ws) {
            ws.clearFilterAsync(f.fieldName).catch(function () {});
          });
          tape("apply", f.fieldName + " → cleared");
        });
        row.appendChild(allBtn); row.appendChild(noneBtn);
        c.appendChild(row);
      }
      return c;
    });
  }

  /* --- range: paired min/max inputs (numeric or date) --- */
  function buildRange(f, sheets, wsName) {
    var c = ctrlCard(f.fieldName, wsName);
    var lo = f.minValue, hi = f.maxValue;
    var isDate = lo && lo.nativeValue instanceof Date;

    var pair = el("div", "range-pair");
    var a = el("input"), b = el("input");
    if (isDate) {
      a.type = b.type = "date";
      a.value = toISODate(lo.nativeValue);
      b.value = toISODate(hi.nativeValue);
    } else {
      a.type = b.type = "number";
      a.step = b.step = "any";
      a.value = lo != null ? lo.value : "";
      b.value = hi != null ? hi.value : "";
    }
    pair.appendChild(a);
    pair.appendChild(el("span", "dash", "—"));
    pair.appendChild(b);
    c.appendChild(pair);

    /* annotate with the full data domain when readable (cached per field) */
    var spanKey = "range::" + f.fieldName;
    var spanP = domainCache[spanKey]
      ? Promise.resolve(domainCache[spanKey])
      : (f.getDomainAsync
          ? f.getDomainAsync().then(function (d) { domainCache[spanKey] = d; return d; })
          : Promise.resolve(null));
    spanP.then(function (d) {
      if (!d || d.min == null) return;
      var fmt = function (dv) { return dv.formattedValue != null ? dv.formattedValue : dv.value; };
      c.appendChild(el("div", "range-meta", "data spans " + fmt(d.min) + " — " + fmt(d.max)));
    }).catch(function () {});

    function apply() {
      var min, max;
      if (isDate) {
        min = a.value ? new Date(a.value + "T00:00:00") : null;
        max = b.value ? new Date(b.value + "T23:59:59") : null;
      } else {
        min = a.value === "" ? null : Number(a.value);
        max = b.value === "" ? null : Number(b.value);
      }
      if (min == null && max == null) return;
      selfChange();
      tape("apply", f.fieldName + " → " + (a.value || "·") + " … " + (b.value || "·"));
      var opts = {};
      if (min != null) opts.min = min;
      if (max != null) opts.max = max;
      sheets.forEach(function (ws) {
        ws.applyRangeFilterAsync(f.fieldName, opts)
          .catch(function (err) { tape("error", "range failed: " + f.fieldName); console.warn(err); });
      });
    }
    a.addEventListener("change", apply);
    b.addEventListener("change", apply);
    return c;
  }

  function toISODate(d) {
    return d.getFullYear() + "-" +
      String(d.getMonth() + 1).padStart(2, "0") + "-" +
      String(d.getDate()).padStart(2, "0");
  }

  /* ============================================================
     parameter controls
     ============================================================ */
  function buildParamControl(wb, p) {
    var c = ctrlCard(p.name, null);
    var av = p.allowableValues || { type: "all" };
    var cur = p.currentValue || {};

    function change(value, shown) {
      selfChange();
      tape("apply", p.name + " → " + shown);
      wb.changeParameterValueAsync(p.name, value)
        .catch(function (err) { tape("error", "param failed: " + p.name); console.warn(err); });
    }

    /* boolean → toggle, regardless of allowable type */
    if (p.dataType === "boolean") {
      var tog = el("label", "toggle");
      var cb = el("input"); cb.type = "checkbox";
      cb.checked = cur.value === true || String(cur.value) === "true";
      cb.addEventListener("change", function () { change(cb.checked, String(cb.checked)); });
      tog.appendChild(cb);
      var txt = el("span", null, cur.formattedValue != null ? "" : "");
      tog.appendChild(txt);
      c.appendChild(tog);
      return c;
    }

    if (av.type === "list" && av.allowableValues && av.allowableValues.length) {
      var vals = av.allowableValues;
      if (vals.length <= 5) {
        var chips = el("div", "chips");
        vals.forEach(function (v) {
          var label = v.formattedValue != null ? v.formattedValue : String(v.value);
          var on = String(v.value) === String(cur.value);
          var chip = el("button", "chip" + (on ? " on accent" : ""), label);
          chip.type = "button";
          chip.addEventListener("click", function () {
            [].forEach.call(chips.children, function (n) { n.classList.remove("on", "accent"); });
            chip.classList.add("on", "accent");
            change(v.value, label);
          });
          chips.appendChild(chip);
        });
        c.appendChild(chips);
      } else {
        var sel = el("select", "sel");
        vals.forEach(function (v) {
          var o = el("option", null, v.formattedValue != null ? v.formattedValue : String(v.value));
          o.value = String(v.value);
          if (String(v.value) === String(cur.value)) o.selected = true;
          sel.appendChild(o);
        });
        sel.addEventListener("change", function () {
          change(sel.value, sel.options[sel.selectedIndex].text);
        });
        c.appendChild(sel);
      }
      return c;
    }

    if (av.type === "range") {
      var min = av.minValue ? Number(av.minValue.value) : 0;
      var max = av.maxValue ? Number(av.maxValue.value) : 100;
      var step = av.stepSize != null ? Number(av.stepSize) : (p.dataType === "integer" ? 1 : (max - min) / 100 || 1);

      var pair = el("div", "range-pair");
      var slider = el("input"); slider.type = "range";
      slider.min = min; slider.max = max; slider.step = step;
      slider.value = Number(cur.value);
      slider.style.flex = "1"; slider.style.accentColor = "var(--accent)";
      var box = el("input"); box.type = "number";
      box.min = min; box.max = max; box.step = step;
      box.value = cur.value != null ? cur.value : "";
      box.style.flex = "0 0 5.5em";
      pair.appendChild(slider); pair.appendChild(box);
      c.appendChild(pair);
      c.appendChild(el("div", "range-meta", min + " — " + max + (av.stepSize != null ? " · step " + step : "")));

      slider.addEventListener("input", function () { box.value = slider.value; });
      slider.addEventListener("change", function () { change(Number(slider.value), slider.value); });
      box.addEventListener("change", function () {
        slider.value = box.value;
        change(Number(box.value), box.value);
      });
      return c;
    }

    /* type 'all' → free input by data type */
    var input = el("input", "free");
    if (p.dataType === "integer" || p.dataType === "float") {
      input.type = "number";
      input.step = p.dataType === "integer" ? "1" : "any";
    } else if (p.dataType === "date" || p.dataType === "date-time") {
      input.type = "date";
      if (cur.nativeValue instanceof Date) input.value = toISODate(cur.nativeValue);
    } else {
      input.type = "text";
    }
    if (!input.value && cur.value != null) input.value = cur.value;
    input.addEventListener("change", function () {
      var v = input.value;
      if (input.type === "number") v = Number(v);
      if (input.type === "date") v = new Date(v + "T00:00:00");
      change(v, input.value);
    });
    c.appendChild(input);
    return c;
  }

  /* ============================================================
     actions — the toolbar, rebuilt in our own dialect
     ============================================================ */
  function buildActions() {
    var grid = el("div", "actions");
    var defs = [
      ["Undo", "↩", function () { return tviz.undoAsync(); }],
      ["Redo", "↪", function () { return tviz.redoAsync(); }],
      ["Reset", "⟲", function () { return tviz.revertAllAsync(); }],
      ["Refresh data", "◌", function () { return tviz.refreshDataAsync(); }],
      ["Export image", "▢", function () { return tviz.exportImageAsync(); }],
      ["Export PDF", "≡", function () { return tviz.displayDialogAsync("export-pdf"); }],
      ["Crosstab", "⊞", function () { return tviz.displayDialogAsync("export-cross-tab"); }],
      ["Share", "↗", function () { return tviz.displayDialogAsync("share"); }],
    ];
    defs.forEach(function (d) {
      var b = el("button", "act");
      b.type = "button";
      b.appendChild(el("span", null, d[0]));
      b.appendChild(el("span", "k", d[1]));
      b.addEventListener("click", function () {
        tape("action", d[0].toLowerCase());
        if (d[0] === "Reset") selfChange();
        Promise.resolve()
          .then(d[2])
          .then(function () { if (d[0] === "Reset") setTimeout(buildPanel, 700); })
          .catch(function (err) {
            tape("error", d[0].toLowerCase() + " unavailable here");
            console.warn(err);
          });
      });
      grid.appendChild(b);
    });
    return grid;
  }
})();
