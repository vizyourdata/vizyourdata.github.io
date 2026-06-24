/* ============================================================
   site.js: renders the gallery from window.VIZZES
   ============================================================ */
(function () {
  "use strict";
  var VIZZES = window.VIZZES || [];

  /* ---------- helpers ---------- */
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function hrefFor(v) {
    if (v.kind === "tableau") return "/embed/?v=" + encodeURIComponent(v.slug);
    return v.href || "/" + v.slug + "/";
  }

  /* ---------- dates: store ISO (YYYY-MM-DD), show "13 Jun 2026" ---------- */
  var MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var MON_IX = { jan: "01", feb: "02", mar: "03", apr: "04", may: "05", jun: "06", jul: "07", aug: "08", sep: "09", oct: "10", nov: "11", dec: "12" };
  function fmtDate(d) {
    var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(d || ""));
    if (!m) return d || "";                       // pass legacy "Jun 2026" through
    return String(+m[3]) + " " + MON[+m[2] - 1] + " " + m[1];
  }
  /* a lexicographically-sortable key; ISO sorts as-is, "Mon YYYY" → "YYYY-MM-01" */
  function dateKey(v) {
    var s = String(v.date || "");
    if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return s;
    var mo = MON_IX[s.slice(0, 3).toLowerCase()] || "01";
    var yr = (s.match(/\d{4}/) || ["0000"])[0];
    return yr + "-" + mo + "-01";
  }

  /* ---------- artwork: mini streamgraph (matches a viz's chart) ---------- */
  function smooth(pts) {
    if (pts.length < 2) return "";
    var d = "M" + pts[0].x + "," + pts[0].y, i;
    for (i = 0; i < pts.length - 1; i++) {
      var p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2;
      var c1x = p1.x + (p2.x - p0.x) / 6, c1y = p1.y + (p2.y - p0.y) / 6;
      var c2x = p2.x - (p3.x - p1.x) / 6, c2y = p2.y - (p3.y - p1.y) / 6;
      d += " C" + c1x.toFixed(1) + "," + c1y.toFixed(1) + " " +
        c2x.toFixed(1) + "," + c2y.toFixed(1) + " " +
        p2.x.toFixed(1) + "," + p2.y.toFixed(1);
    }
    return d;
  }
  function areaPath(top, bot) {
    return smooth(top) + " " + smooth(bot.slice().reverse()).replace(/^M/, "L") + " Z";
  }
  function streamArt(art) {
    var W = 840, H = 320, padL = 40, padR = 40, padT = 54, padB = 54;
    var data = art.data, col = art.colors;
    var n = data.length;
    var x = function (i) { return padL + (i / (n - 1)) * (W - padL - padR); };
    var maxTotal = Math.max.apply(null, data.map(function (d) { return d.fri + d.sat + d.sun; }));
    var k = (H - padT - padB) / maxTotal, CY = H / 2;
    var top = { sun: [], sat: [], fri: [] }, bot = { sun: [], sat: [], fri: [] };
    data.forEach(function (d, i) {
      var total = d.fri + d.sat + d.sun, half = total * k / 2;
      var sunT = CY - half, sunB = sunT + d.sun * k, satB = sunB + d.sat * k, friB = satB + d.fri * k;
      var xi = x(i);
      top.sun.push({ x: xi, y: sunT }); bot.sun.push({ x: xi, y: sunB });
      top.sat.push({ x: xi, y: sunB }); bot.sat.push({ x: xi, y: satB });
      top.fri.push({ x: xi, y: satB }); bot.fri.push({ x: xi, y: friB });
    });
    var bg0 = (art.bg && art.bg[0]) || "#F4DDB0", bg1 = (art.bg && art.bg[1]) || "#E9C58E";
    return '' +
      '<svg viewBox="0 0 ' + W + ' ' + H + '" preserveAspectRatio="xMidYMid slice" role="img" aria-hidden="true">' +
        '<defs>' +
          '<linearGradient id="sg-bg" x1="0" y1="0" x2="0" y2="1">' +
            '<stop offset="0" stop-color="' + bg0 + '"/><stop offset="1" stop-color="' + bg1 + '"/>' +
          '</linearGradient>' +
          '<radialGradient id="sg-sun" cx="50%" cy="50%" r="50%">' +
            '<stop offset="0" stop-color="#FFF4DD" stop-opacity=".95"/>' +
            '<stop offset="55%" stop-color="#FFC987" stop-opacity=".35"/>' +
            '<stop offset="100%" stop-color="#FFC987" stop-opacity="0"/>' +
          '</radialGradient>' +
        '</defs>' +
        '<rect width="' + W + '" height="' + H + '" fill="url(#sg-bg)"/>' +
        '<circle cx="688" cy="58" r="118" fill="url(#sg-sun)"/>' +
        '<g stroke="rgba(40,22,30,.20)" stroke-width="1.2">' +
          '<path d="' + areaPath(top.fri, bot.fri) + '" fill="' + col.fri + '"/>' +
          '<path d="' + areaPath(top.sat, bot.sat) + '" fill="' + col.sat + '"/>' +
          '<path d="' + areaPath(top.sun, bot.sun) + '" fill="' + col.sun + '"/>' +
        '</g>' +
      '</svg>';
  }

  /* ---------- artwork: branded placeholder (default) ---------- */
  function placeholderArt(v) {
    var c = v.accent || "#C24E2C";
    var label = (v.type || "Visualization").toUpperCase();
    return '' +
      '<svg viewBox="0 0 840 320" preserveAspectRatio="xMidYMid slice" role="img" aria-hidden="true">' +
        '<defs><linearGradient id="ph-' + esc(v.slug) + '" x1="0" y1="0" x2="1" y2="1">' +
          '<stop offset="0" stop-color="#F7F1E6"/><stop offset="1" stop-color="#EBE0CC"/>' +
        '</linearGradient></defs>' +
        '<rect width="840" height="320" fill="url(#ph-' + esc(v.slug) + ')"/>' +
        '<g fill="none" stroke="' + c + '" stroke-opacity=".22" stroke-width="2">' +
          '<circle cx="624" cy="150" r="150"/><circle cx="624" cy="150" r="104"/><circle cx="624" cy="150" r="58"/>' +
        '</g>' +
        '<rect x="60" y="150" width="46" height="110" fill="' + c + '" fill-opacity=".85"/>' +
        '<rect x="116" y="116" width="46" height="144" fill="' + c + '" fill-opacity=".6"/>' +
        '<rect x="172" y="176" width="46" height="84" fill="' + c + '" fill-opacity=".4"/>' +
        '<text x="60" y="64" font-family="DM Mono, monospace" font-size="17" letter-spacing="6" fill="' + c + '">' + esc(label) + '</text>' +
      '</svg>';
  }

  function artFor(v) {
    var a = v.art;
    if (a && a.type === "stream") return streamArt(a);
    if (a && a.type === "img") return '<img src="' + esc(a.src) + '" alt="" loading="lazy">';
    if (a && a.type === "svg") return a.svg;
    return placeholderArt(v);
  }

  /* ---------- card ---------- */
  function card(v, i) {
    var c = v.accent || "#C24E2C";
    var num = String(i + 1).padStart(2, "0");
    var tags = (v.tags || []).map(function (t) { return '<span class="tag">' + esc(t) + "</span>"; }).join('<span class="sep">/</span>');
    var badgeText = v.kind === "tableau" ? "Tableau Public" : (v.type || "Story");
    return '' +
      '<a class="plate' + (v.feature ? " feature" : "") + '" href="' + esc(hrefFor(v)) + '" style="--c:' + esc(c) + '"' +
        (v.kind === "story" ? "" : "") + '>' +
        '<div class="frame">' +
          '<div class="art">' +
            '<span class="badge"><i></i>' + esc(badgeText) + "</span>" +
            '<span class="idx">' + num + "</span>" +
            artFor(v) +
            '<span class="scrim"></span>' +
            '<div class="overlay">' +
              (v.standout ? '<span class="kicker">' + esc(v.standout) + "</span>" : "") +
              '<span class="over-title">' + esc(v.title) + "</span>" +
            "</div>" +
            '<span class="wash"></span>' +
          "</div>" +
        "</div>" +
        '<div class="body">' +
          '<span class="accent-rule"></span>' +
          '<p class="sub">' + esc(v.sub || "") + "</p>" +
          '<div class="foot">' + tags +
            (v.date ? '<span class="sep">/</span><span class="tag">' + esc(fmtDate(v.date)) + "</span>" : "") +
            '<span class="cta">View <span class="arrow">→</span></span>' +
          "</div>" +
        "</div>" +
      "</a>";
  }

  /* ---------- render ---------- */
  var grid = document.getElementById("grid");
  if (grid) {
    /* newest-first; stable sort keeps catalog order for same-day ties */
    var ordered = VIZZES.slice().sort(function (a, b) {
      var ka = dateKey(a), kb = dateKey(b);
      return ka < kb ? 1 : ka > kb ? -1 : 0;
    });
    grid.innerHTML = ordered.map(card).join("");
    var countEl = document.getElementById("count");
    if (countEl) countEl.textContent = String(VIZZES.length).padStart(2, "0") + (VIZZES.length === 1 ? " piece" : " pieces");

    /* reveal on scroll, staggered */
    var plates = Array.prototype.slice.call(grid.querySelectorAll(".plate"));
    if ("IntersectionObserver" in window) {
      var obs = new IntersectionObserver(function (ents) {
        ents.forEach(function (e) {
          if (e.isIntersecting) {
            var idx = plates.indexOf(e.target);
            e.target.style.transitionDelay = Math.min(idx, 6) * 70 + "ms";
            e.target.classList.add("in");
            obs.unobserve(e.target);
          }
        });
      }, { threshold: 0.18, rootMargin: "0px 0px -8% 0px" });
      plates.forEach(function (p) { obs.observe(p); });
    } else {
      plates.forEach(function (p) { p.classList.add("in"); });
    }
  }

  /* ---------- footer year ---------- */
  var yr = document.getElementById("year");
  if (yr) yr.textContent = new Date().getFullYear();
})();
