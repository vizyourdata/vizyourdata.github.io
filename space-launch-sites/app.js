/* =============================================================
   LAUNCH COMMAND — standalone build for Tableau Public.
   Identical viz to the dashboard extension, but the data is baked
   into ./data.json (generated from the launches CSV) instead of being
   read live from the workbook via the Extensions API — because
   Tableau Public does not run extensions. Embed index.html in a
   Web Page (URL) object on the Public dashboard.
   ============================================================= */
const $ = (id) => document.getElementById(id);
const SVGNS = "http://www.w3.org/2000/svg";
let WORLD = null;
let CAL = null; // calendar (year x week) data, loaded from ./calendar-data.json
let heroHover = null; // set by renderHero: (siteName|null) => spotlight that site on the map
let calFilter = null; // set by renderCalendar: (siteName|null) => filter the calendar to one site
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const GROUP_COLORS = {
  "United States": "#e8694a", "Russia/Soviet Union": "#2f9e97", "China": "#e0a33e",
  "NATO Ally": "#5b86b8", "Major Non-NATO Ally": "#86bab4", "Other": "#93a3ad",
};
const groupColor = (g) => GROUP_COLORS[g] || "#93a3ad";
const GROUP_ORDER = ["Russia/Soviet Union", "United States", "China", "NATO Ally", "Major Non-NATO Ally", "Other"];
const fmt = (n) => Math.round(n).toLocaleString("en-US");

/* ---------- boot ---------- */
(async function boot() {
  try {
    const [world, data, cal] = await Promise.all([
      fetch("./world-land.json").then((r) => r.json()).catch(() => null),
      fetch("./data.json").then((r) => { if (!r.ok) throw new Error("data.json " + r.status); return r.json(); }),
      fetch("./calendar-data.json").then((r) => (r.ok ? r.json() : null)).catch(() => null),
    ]);
    WORLD = world;
    CAL = cal;
    window.__PAYLOAD = data;
    setStatus("ok");
    renderAll(data);
  } catch (e) {
    setStatus("err");
    showEmpty("Couldn't load data", `<b>${(e && e.message) || e}</b><br><br>Make sure <b>data.json</b> and <b>world-land.json</b> sit next to this page.`);
  }
})();

function renderAll(p) {
  const byMonth = new Map(p.byMonth);
  const byGroup = new Map(p.byGroup);
  hideEmpty();
  let stage = "kpis";
  try {
    renderKPIs(p.kpis);
    stage = "hero"; renderHero(byMonth, p.sites, p.siteYears);
    stage = "byCountry"; renderBars($("byCountry"), [...byGroup.entries()].map(([g, n]) => ({ label: g, n, color: groupColor(g) })).sort((a, b) => b.n - a.n), { max: 6 });
    stage = "topSites"; renderRockets($("topSites"), p.sites.slice(0, 7).map((s) => ({ label: s.name, n: s.n, color: groupColor(s.group) })));
    stage = "calendar"; if (CAL) renderCalendar($("cal"), CAL);
    const ks = p.byMonth.map((e) => e[0]);
    $("range").textContent = ks.length ? `${Math.floor(Math.min(...ks))} – ${Math.ceil(Math.max(...ks))}` : "";
  } catch (e) {
    setStatus("err");
    showEmpty("Render error @ " + stage, `<b>${(e && e.message) || e}</b>`);
  }
}

/* ---------- svg helpers ---------- */
function svg(parent) {
  parent.innerHTML = "";
  const s = document.createElementNS(SVGNS, "svg");
  const w = parent.clientWidth || 400, h = parent.clientHeight || 200;
  s.setAttribute("viewBox", `0 0 ${w} ${h}`); s.setAttribute("preserveAspectRatio", "none");
  parent.appendChild(s);
  return { s, w, h };
}
function el(tag, attrs, text) {
  const n = document.createElementNS(SVGNS, tag);
  for (const k in attrs) n.setAttribute(k, attrs[k]);
  if (text != null) n.textContent = text;
  return n;
}

/* ---------- KPIs ---------- */
function renderKPIs({ total, successRate, activeSites, payload }) {
  const cards = [
    { label: "Total Launches", value: fmt(total), sub: "orbital + deep space", cls: "" },
    { label: "Mission Success", value: (successRate * 100).toFixed(1) + "%", sub: fmt(total * successRate) + " reached orbit", cls: "kpi--teal" },
    { label: "Active Sites", value: fmt(activeSites), sub: "spaceports worldwide", cls: "kpi--gold" },
    { label: "Payload to Orbit", value: fmt(payload), sub: "metric tons", cls: "kpi--slate" },
  ];
  $("kpis").innerHTML = cards.map((c) =>
    `<div class="kpi ${c.cls}"><div class="kpi__label">${c.label}</div>
     <div class="kpi__value">${c.value}</div><div class="kpi__sub">${c.sub}</div></div>`).join("");
}

/* ---------- hero: map + ridge + wisps ---------- */
function renderHero(byMonth, sites, siteYears) {
  const { s, w, h } = svg($("map"));
  const defs = el("defs", {});
  defs.innerHTML = `<linearGradient id="ridgeGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#6b7f92" stop-opacity="0.5"/>
      <stop offset="1" stop-color="#3a4a5a" stop-opacity="0.03"/></linearGradient>`;
  s.appendChild(defs);

  const padX = 14;
  const ridgeTop = 4, ridgeH = Math.max(40, h * 0.24), ridgeBase = ridgeTop + ridgeH;
  const mapTop = ridgeBase + 18, mapBot = h - 4;
  const tMin = 1957, tMax = 2027;
  const TX = (ts) => padX + (ts - tMin) / (tMax - tMin) * (w - 2 * padX);

  const pts = [...byMonth.entries()].sort((a, b) => a[0] - b[0]);
  const maxM = Math.max(1, ...byMonth.values());
  const RY = (v) => ridgeBase - (v / maxM) * ridgeH;
  const ridgeYAt = (ts) => {
    if (!pts.length) return ridgeBase;
    for (let i = 0; i < pts.length; i++) {
      if (pts[i][0] >= ts) {
        if (!i) return RY(pts[0][1]);
        const a = pts[i - 1], b = pts[i], f = (ts - a[0]) / ((b[0] - a[0]) || 1);
        return RY(a[1] + (b[1] - a[1]) * f);
      }
    }
    return RY(pts[pts.length - 1][1]);
  };

  // continents
  const lonMin = -172, lonMax = 184, latMax = 80, latMin = -58;
  const MX = (lon) => padX + (lon - lonMin) / (lonMax - lonMin) * (w - 2 * padX);
  const MY = (lat) => mapTop + (latMax - lat) / (latMax - latMin) * (mapBot - mapTop);
  if (WORLD && WORLD.features) {
    for (const f of WORLD.features) {
      const g = f.geometry; if (!g) continue;
      const polys = g.type === "Polygon" ? [g.coordinates] : g.type === "MultiPolygon" ? g.coordinates : [];
      let d = "";
      for (const poly of polys) for (const ring of poly)
        d += ring.map((c, i) => (i ? "L" : "M") + MX(c[0]).toFixed(1) + "," + MY(c[1]).toFixed(1)).join(" ") + " Z ";
      if (d) s.appendChild(el("path", { d, fill: "#123048", "fill-opacity": 0.6, stroke: "#1e415c", "stroke-width": 0.5, "stroke-opacity": 0.8 }));
    }
  }

  // ridge
  let ridgeLine = null;
  if (pts.length) {
    let top = "";
    pts.forEach((p, i) => (top += (i ? "L" : "M") + TX(p[0]).toFixed(1) + "," + RY(p[1]).toFixed(1) + " "));
    s.appendChild(el("path", { d: `${top}L${TX(pts[pts.length - 1][0]).toFixed(1)},${ridgeBase} L${TX(pts[0][0]).toFixed(1)},${ridgeBase} Z`, fill: "url(#ridgeGrad)", stroke: "none" }));
    ridgeLine = el("path", { d: top, fill: "none", stroke: "#5b7186", "stroke-width": 1.1, "stroke-opacity": 0.75 });
    s.appendChild(ridgeLine);
  }
  for (let y = 1960; y <= 2020; y += 20) {
    s.appendChild(el("line", { x1: TX(y), y1: ridgeBase, x2: TX(y), y2: ridgeBase + 4, stroke: "#33506a", "stroke-width": 1 }));
    s.appendChild(el("text", { x: TX(y), y: ridgeBase + 13, "text-anchor": "middle", class: "axis" }, y));
  }

  const geo = sites.filter((d) => isFinite(d.lat) && isFinite(d.lon) && (d.lat || d.lon));
  const maxN = Math.max(1, ...geo.map((d) => d.n));
  const R = (n) => 2.2 + Math.sqrt(n / maxN) * 17;
  const GRAY = "#33465a";
  const wispNames = new Set(geo.slice(0, 34).map((d) => d.name));
  const yrRows = (siteYears || []).filter((d) => wispNames.has(d.name) && isFinite(d.ts));
  const maxYr = Math.max(1, ...yrRows.map((d) => d.n));

  // one mark per site (bubble), each carrying its monthly wisps (resting fan)
  const marks = [];
  const byName = new Map();
  geo.forEach((d) => {
    const x = MX(d.lon), y = MY(d.lat), r = R(d.n), c = groupColor(d.group);
    const m = { d, x, y, r, c, wisps: [], lands: [], halo: null, core: null };
    marks.push(m); byName.set(d.name, m);
  });

  // resting state: a faint wisp per (site, month) — the full haze
  for (const yr of yrRows) {
    const m = byName.get(yr.name); if (!m) continue;
    const tx = TX(yr.ts), ty = ridgeYAt(yr.ts);
    const cx = (m.x + tx) / 2, cy = Math.min(m.y, ty) - (22 + Math.abs(m.x - tx) * 0.32);
    const wOpen = 0.06 + Math.sqrt(yr.n / maxYr) * 0.12;
    const wWide = 0.5 + Math.sqrt(yr.n / maxYr) * 1.3;
    m.wisps.push({ el: el("path", { d: `M${m.x.toFixed(1)},${m.y.toFixed(1)} Q${cx.toFixed(1)},${cy.toFixed(1)} ${tx.toFixed(1)},${ty.toFixed(1)}`, fill: "none", stroke: m.c, "stroke-width": wWide.toFixed(2), "stroke-opacity": wOpen.toFixed(3), "stroke-linecap": "round" }), open: wOpen, wide: wWide });
    m.lands.push(el("circle", { cx: tx, cy: ty, r: 1.4, fill: m.c, "fill-opacity": 0.5 }));
  }

  // hover-condense: roll each site's months up to ONE thread per year (thickness = that year's launches)
  const yearAgg = new Map();
  for (const yr of yrRows) {
    let ym = yearAgg.get(yr.name); if (!ym) { ym = new Map(); yearAgg.set(yr.name, ym); }
    const cur = ym.get(Math.floor(yr.ts)) || { n: 0, tsw: 0 };
    cur.n += yr.n; cur.tsw += yr.ts * yr.n; ym.set(Math.floor(yr.ts), cur);
  }
  let maxYA = 1;
  for (const ym of yearAgg.values()) for (const a of ym.values()) if (a.n > maxYA) maxYA = a.n;

  // paint order: wisps → landing nodes → bubbles → labels → hit targets
  marks.forEach((m) => m.wisps.forEach((wp) => s.appendChild(wp.el)));
  marks.forEach((m) => m.lands.forEach((ld) => s.appendChild(ld)));
  marks.forEach((m) => {
    m.halo = el("circle", { cx: m.x, cy: m.y, r: m.r * 1.8, fill: m.c, "fill-opacity": 0.12 });
    m.core = el("circle", { cx: m.x, cy: m.y, r: m.r, fill: m.c, "fill-opacity": 0.55, stroke: m.c, "stroke-opacity": 0.95, "stroke-width": 1 });
    s.appendChild(m.halo); s.appendChild(m.core);
  });
  geo.slice(0, 4).forEach((d) => s.appendChild(el("text", { x: MX(d.lon), y: MY(d.lat) - R(d.n) - 4, "text-anchor": "middle", class: "maplab" }, d.name.split(",")[0].slice(0, 18))));

  // build the condensed yearly fan for one site on demand (kept in its own layer, under the bubbles)
  let hoverG = null;
  const clearHover = () => { if (hoverG) { hoverG.remove(); hoverG = null; } };
  function buildYearFan(m) {
    const g = el("g", {}), ym = yearAgg.get(m.d.name);
    if (!ym) return g;
    for (const a of ym.values()) {
      const ts = a.tsw / a.n, tx = TX(ts), ty = ridgeYAt(ts);
      const cx = (m.x + tx) / 2, cy = Math.min(m.y, ty) - (24 + Math.abs(m.x - tx) * 0.34);
      const vol = Math.sqrt(a.n / maxYA);
      g.appendChild(el("path", { d: `M${m.x.toFixed(1)},${m.y.toFixed(1)} Q${cx.toFixed(1)},${cy.toFixed(1)} ${tx.toFixed(1)},${ty.toFixed(1)}`, fill: "none", stroke: m.c, "stroke-width": (0.6 + vol * 0.7).toFixed(2), "stroke-opacity": (0.5 + vol * 0.4).toFixed(2), "stroke-linecap": "round" }));
      g.appendChild(el("circle", { cx: tx, cy: ty, r: (1.5 + vol * 4).toFixed(1), fill: m.c, "fill-opacity": 0.92, stroke: m.c, "stroke-opacity": 1, "stroke-width": 0.5 }));
    }
    return g;
  }

  // hover: hide the monthly haze, condense the hovered site to yearly threads, gray other bubbles
  function setHover(hi) {
    const on = hi == null;
    marks.forEach((m, i) => {
      const sel = hi === i, dim = hi != null && !sel;
      m.wisps.forEach((wp) => wp.el.setAttribute("stroke-opacity", on ? wp.open.toFixed(3) : 0.012));
      m.lands.forEach((ld) => ld.setAttribute("fill-opacity", on ? 0.5 : 0.04));
      m.halo.setAttribute("fill", dim ? GRAY : m.c);
      m.halo.setAttribute("fill-opacity", dim ? 0.04 : 0.12);
      m.core.setAttribute("fill", dim ? GRAY : m.c);
      m.core.setAttribute("stroke", dim ? GRAY : m.c);
      m.core.setAttribute("fill-opacity", dim ? 0.1 : 0.55);
      m.core.setAttribute("stroke-opacity", dim ? 0.25 : 0.95);
    });
    if (ridgeLine) ridgeLine.setAttribute("stroke-opacity", on ? 0.75 : 0.28);
    clearHover();
    if (hi != null) { hoverG = buildYearFan(marks[hi]); s.insertBefore(hoverG, marks[0].halo); }
    const tsChart = $("topSites"), hoverName = hi != null ? marks[hi].d.name : null;
    if (tsChart) tsChart.querySelectorAll("g[data-name]").forEach((g) => {
      g.setAttribute("opacity", on ? 1 : g.getAttribute("data-name") === hoverName ? 1 : 0.22);
    });
    if (calFilter) calFilter(hoverName);
  }
  marks.forEach((m, i) => {
    const hit = el("circle", { cx: m.x, cy: m.y, r: Math.max(m.r * 1.5, 9), fill: "transparent", "pointer-events": "all", cursor: "pointer" });
    hit.addEventListener("mouseenter", () => setHover(i));
    hit.addEventListener("mouseleave", () => setHover(null));
    s.appendChild(hit);
  });

  heroHover = (name) => {
    const idx = name == null ? null : marks.findIndex((m) => m.d.name === name);
    setHover(idx != null && idx < 0 ? null : idx);
  };
}

/* ---------- rockets: Top Launch Sites as vertical rockets ---------- */
function renderRockets(parent, items) {
  const { s, w, h } = svg(parent);
  if (!items.length) return;
  const max = Math.max(...items.map((d) => d.n)) || 1;
  const groundY = h - 20, topPad = 15;
  const maxBody = Math.max(20, groundY - topPad - 16);
  const colW = w / items.length;
  items.forEach((d, i) => {
    const cx = i * colW + colW / 2;
    const bw = Math.min(colW * 0.32, 12);
    const bodyH = Math.max(10, (d.n / max) * maxBody);
    const topY = groundY - bodyH, noseH = bw * 1.7, c = d.color;
    const lx = (cx - bw / 2), rx = (cx + bw / 2);
    const g = el("g", { "data-name": d.label });
    g.appendChild(el("path", { d: `M${lx.toFixed(1)},${(groundY - bw * 0.7).toFixed(1)} L${(lx - bw * 0.75).toFixed(1)},${(groundY + 2).toFixed(1)} L${lx.toFixed(1)},${groundY.toFixed(1)} Z`, fill: c, "fill-opacity": 0.75 }));
    g.appendChild(el("path", { d: `M${rx.toFixed(1)},${(groundY - bw * 0.7).toFixed(1)} L${(rx + bw * 0.75).toFixed(1)},${(groundY + 2).toFixed(1)} L${rx.toFixed(1)},${groundY.toFixed(1)} Z`, fill: c, "fill-opacity": 0.75 }));
    g.appendChild(el("rect", { x: lx.toFixed(1), y: topY.toFixed(1), width: bw.toFixed(1), height: bodyH.toFixed(1), rx: 1.5, fill: c, "fill-opacity": 0.94 }));
    g.appendChild(el("path", { d: `M${lx.toFixed(1)},${topY.toFixed(1)} L${cx.toFixed(1)},${(topY - noseH).toFixed(1)} L${rx.toFixed(1)},${topY.toFixed(1)} Z`, fill: c }));
    if (bodyH > 22) {
      g.appendChild(el("rect", { x: lx.toFixed(1), y: (topY + bodyH * 0.42).toFixed(1), width: bw.toFixed(1), height: 2, fill: "#0b1622", "fill-opacity": 0.28 }));
      g.appendChild(el("rect", { x: lx.toFixed(1), y: (topY + bodyH * 0.62).toFixed(1), width: bw.toFixed(1), height: 2, fill: "#0b1622", "fill-opacity": 0.28 }));
    }
    g.appendChild(el("circle", { cx, cy: (topY + Math.min(bodyH * 0.28, 9) + 2).toFixed(1), r: (bw * 0.2).toFixed(1), fill: "#0b1622", "fill-opacity": 0.85 }));
    g.appendChild(el("text", { x: cx, y: (topY - noseH - 4).toFixed(1), "text-anchor": "middle", class: "blab" }, fmt(d.n)));
    const nm = d.label.split(",")[0];
    g.appendChild(el("text", { x: cx, y: groundY + 13, "text-anchor": "middle", class: "rlab" }, nm.length > 10 ? nm.slice(0, 9) + "…" : nm));
    const hit = el("rect", { x: (i * colW).toFixed(1), y: 0, width: colW.toFixed(1), height: h, fill: "transparent", "pointer-events": "all", cursor: "pointer" });
    hit.addEventListener("mouseenter", () => heroHover && heroHover(d.label));
    hit.addEventListener("mouseleave", () => heroHover && heroHover(null));
    g.appendChild(hit);
    s.appendChild(g);
  });
  s.insertBefore(el("line", { x1: 0, y1: groundY, x2: w, y2: groundY, stroke: "#1e3145", "stroke-width": 1 }), s.firstChild);
}

/* ---------- bars ---------- */
function renderBars(parent, items, opts) {
  const { s, w, h } = svg(parent);
  items = items.slice(0, opts.max);
  if (!items.length) return;
  const max = Math.max(...items.map((d) => d.n)) || 1;
  const rowH = h / items.length, barH = Math.min(rowH * 0.62, 22);
  const labW = opts.shortLabel ? 96 : 116, x0 = labW, x1 = w - 44;
  items.forEach((d, i) => {
    const cy = i * rowH + rowH / 2, bw = Math.max(2, (d.n / max) * (x1 - x0));
    const cut = opts.shortLabel ? 15 : 18;
    const nm = d.label.length > cut ? d.label.slice(0, cut - 1) + "…" : d.label;
    const g = el("g", { "data-name": d.label });
    g.appendChild(el("text", { x: labW - 8, y: cy + 3.5, "text-anchor": "end", class: "rlab" }, nm));
    g.appendChild(el("rect", { x: x0, y: cy - barH / 2, width: bw, height: barH, rx: 3, fill: d.color, "fill-opacity": 0.92 }));
    g.appendChild(el("text", { x: x0 + bw + 6, y: cy + 3.5, "text-anchor": "start", class: "blab" }, fmt(d.n)));
    s.appendChild(g);
  });
}

/* ---------- calendar: year x week heatmap (years top->down, weeks across) ---------- */
function renderCalendar(parent, D) {
  const { s, w, h } = svg(parent);
  const nYears = D.yEnd - D.yStart + 1, nWeeks = D.cols;
  const padL = 28, padR = 5, padT = 14, padB = 3;
  const cw = Math.max(2, (w - padL - padR) / nWeeks); // week columns (across)
  const ch = Math.max(1.5, (h - padT - padB) / nYears); // year rows (top->down)
  const offX = padL, offY = padT;
  const gx = cw > 3 ? 0.5 : 0, gy = ch > 3 ? 0.5 : 0;
  const rw = Math.max(1, cw - gx), rh = Math.max(1, ch - gy);
  const maxN = D.maxN, cellByKey = new Map();
  // year labels down the left (every decade)
  for (let y = D.yStart; y <= D.yEnd; y++) if (y % 10 === 0)
    s.appendChild(el("text", { x: (offX - 4).toFixed(1), y: (offY + (y - D.yStart) * ch + ch).toFixed(1), "text-anchor": "end", class: "axis" }, y));
  // month ticks across the top
  for (const [wk, lb] of [[0, "Jan"], [13, "Apr"], [26, "Jul"], [39, "Oct"]])
    s.appendChild(el("text", { x: (offX + wk * cw + cw / 2).toFixed(1), y: (offY - 4).toFixed(1), "text-anchor": "middle", class: "axis" }, lb));
  // data cells: x = week, y = year; color = dominant group, brightness = count
  const cellsG = el("g", { class: "calcells" });
  for (const [y, wk, n, gi] of D.cells) {
    const x = offX + wk * cw, yy = offY + (y - D.yStart) * ch;
    const rect = el("rect", { x: x.toFixed(1), y: yy.toFixed(1), width: rw.toFixed(1), height: rh.toFixed(1), fill: groupColor(D.groups[gi]), "fill-opacity": (0.22 + 0.78 * Math.sqrt(n / maxN)).toFixed(2) });
    rect.style.cursor = "pointer";
    rect.addEventListener("mousemove", (ev) => calTip(ev, D, y, wk, n, gi));
    rect.addEventListener("mouseleave", () => { const t = $("tip"); if (t) t.hidden = true; });
    cellsG.appendChild(rect);
    cellByKey.set(y + "|" + wk, rect);
  }
  s.appendChild(cellsG);

  // filter (fast): dim the whole grid with one CSS class, brighten only the hovered site's weeks
  let lastHi = [];
  calFilter = (name) => {
    for (const r of lastHi) { r.style.opacity = ""; r.style.fill = ""; r.style.fillOpacity = ""; }
    lastHi = [];
    const sw = D.siteWeeks && name ? D.siteWeeks[name] : null;
    if (!sw) { cellsG.classList.remove("dim"); return; }
    cellsG.classList.add("dim");
    const col = groupColor(D.groups[sw[0]]); // recolor to the hovered site's country
    for (const [y, wk, n] of sw[1]) {
      const r = cellByKey.get(y + "|" + wk);
      if (r) { r.style.opacity = "1"; r.style.fill = col; r.style.fillOpacity = (0.4 + 0.6 * Math.sqrt(n / maxN)).toFixed(2); lastHi.push(r); }
    }
  };
}
function calTip(ev, D, y, wk, n, gi) {
  const t = $("tip"); if (!t) return;
  const start = new Date(Date.UTC(y, 0, 1 + wk * 7));
  const wl = start.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  t.innerHTML = `<b>${y}</b> &middot; week ${wk + 1} <span class="tipsub">(~${wl})</span><br>` +
    `${n} launch${n > 1 ? "es" : ""} &middot; <span style="color:${groupColor(D.groups[gi])}">${D.groups[gi]}</span>`;
  t.hidden = false;
  const pad = 14, r = t.getBoundingClientRect();
  let x = ev.clientX + pad, yy = ev.clientY + pad;
  if (x + r.width > window.innerWidth) x = ev.clientX - r.width - pad;
  if (yy + r.height > window.innerHeight) yy = ev.clientY - r.height - pad;
  t.style.left = x + "px"; t.style.top = yy + "px";
}

/* ---------- state ---------- */
function setStatus(kind) { const d = $("status"); if (d) d.className = "dot " + (kind === "ok" ? "dot--ok" : kind === "err" ? "dot--err" : "dot--wait"); }
function showEmpty(title, msg) { $("emptyTitle").innerHTML = title; $("emptyMsg").innerHTML = msg; $("empty").hidden = false; }
function hideEmpty() { $("empty").hidden = true; }

let rt;
window.addEventListener("resize", () => {
  clearTimeout(rt);
  rt = setTimeout(() => { if (window.__PAYLOAD) renderAll(window.__PAYLOAD); }, 150);
});
