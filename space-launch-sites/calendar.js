/* =============================================================
   LAUNCH CALENDAR — Space-Age Grid (year x week).
   One row per year 1957..2026, 53 tiny squares across = weeks.
   Square color = the dominant country group that week; brightness
   = number of launches. Reads ./calendar-data.json (baked from CSV).
   Standalone page for Tableau Public via a Web Page object.
   ============================================================= */
const $ = (id) => document.getElementById(id);
const SVGNS = "http://www.w3.org/2000/svg";
const GROUP_COLORS = {
  "United States": "#e8694a", "Russia/Soviet Union": "#2f9e97", "China": "#e0a33e",
  "NATO Ally": "#5b86b8", "Major Non-NATO Ally": "#86bab4", "Other": "#93a3ad",
};
const groupColor = (g) => GROUP_COLORS[g] || "#93a3ad";
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
let DATA = null;

function el(tag, attrs, text) {
  const n = document.createElementNS(SVGNS, tag);
  for (const k in attrs) n.setAttribute(k, attrs[k]);
  if (text != null) n.textContent = text;
  return n;
}

/* ---------- boot ---------- */
(async function boot() {
  try {
    DATA = await fetch("./calendar-data.json").then((r) => { if (!r.ok) throw new Error("calendar-data.json " + r.status); return r.json(); });
    setStatus("ok");
    hideEmpty();
    renderLegend();
    render();
  } catch (e) {
    setStatus("err");
    showEmpty("Couldn't load data", `<b>${(e && e.message) || e}</b><br><br>Make sure <b>calendar-data.json</b> sits next to this page.`);
  }
})();

function renderLegend() {
  $("legend").innerHTML =
    `<div class="callegend__groups">` +
    DATA.groups.map((g) => `<span><i style="background:${groupColor(g)}"></i>${g}</span>`).join("") +
    `</div>` +
    `<div class="callegend__intensity"><span>fewer</span><i class="ramp"></i><span>more launches / week</span></div>`;
  $("range").textContent = `${DATA.yStart} – ${DATA.yEnd}`;
}

function render() {
  const parent = $("grid"); parent.innerHTML = "";
  const W = parent.clientWidth || 900, H = parent.clientHeight || 500;
  const rows = DATA.yEnd - DATA.yStart + 1, cols = DATA.cols;
  const padL = 42, padR = 14, padT = 18, padB = 6;
  const cell = Math.max(4, Math.min((W - padL - padR) / cols, (H - padT - padB) / rows));
  const gw = cell * cols;
  const offX = padL + Math.max(0, ((W - padL - padR) - gw) / 2);
  const offY = padT;
  const gap = cell > 7 ? 1 : 0.5, sq = cell - gap;

  const svg = document.createElementNS(SVGNS, "svg");
  svg.setAttribute("viewBox", `0 0 ${W} ${H}`); svg.setAttribute("preserveAspectRatio", "xMidYMin meet");

  // month labels along the top
  MONTHS.forEach((m, i) => svg.appendChild(el("text", { x: (offX + (i * 53 / 12) * cell).toFixed(1), y: offY - 6, class: "calax" }, m)));
  // year labels down the left (every decade + final year)
  for (let y = DATA.yStart; y <= DATA.yEnd; y++) {
    if (y % 10 === 0 || y === DATA.yEnd || y === DATA.yStart) {
      svg.appendChild(el("text", { x: (offX - 7).toFixed(1), y: (offY + (y - DATA.yStart + 0.5) * cell + 3).toFixed(1), "text-anchor": "end", class: "calax" }, y));
    }
  }
  // empty grid squares (texture)
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++)
    svg.appendChild(el("rect", { x: (offX + c * cell).toFixed(1), y: (offY + r * cell).toFixed(1), width: sq.toFixed(1), height: sq.toFixed(1), rx: 1, fill: "#0f1d2a" }));

  // data squares
  const maxN = DATA.maxN;
  for (const [y, w, n, gi] of DATA.cells) {
    const r = y - DATA.yStart;
    const rect = el("rect", {
      x: (offX + w * cell).toFixed(1), y: (offY + r * cell).toFixed(1), width: sq.toFixed(1), height: sq.toFixed(1), rx: 1,
      fill: groupColor(DATA.groups[gi]), "fill-opacity": (0.2 + 0.8 * Math.sqrt(n / maxN)).toFixed(2),
    });
    rect.style.cursor = "pointer";
    rect.addEventListener("mousemove", (ev) => showTip(ev, y, w, n, gi));
    rect.addEventListener("mouseleave", hideTip);
    svg.appendChild(rect);
  }
  parent.appendChild(svg);
}

/* ---------- tooltip ---------- */
function weekLabel(y, w) {
  const start = new Date(Date.UTC(y, 0, 1 + w * 7));
  return start.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}
function showTip(ev, y, w, n, gi) {
  const t = $("tip");
  t.innerHTML = `<b>${y}</b> &middot; week ${w + 1} <span class="tipsub">(from ~${weekLabel(y, w)})</span><br>` +
    `${n} launch${n > 1 ? "es" : ""} &middot; <span style="color:${groupColor(DATA.groups[gi])}">${DATA.groups[gi]}</span>`;
  t.hidden = false;
  const pad = 14, r = t.getBoundingClientRect();
  let x = ev.clientX + pad, yy = ev.clientY + pad;
  if (x + r.width > window.innerWidth) x = ev.clientX - r.width - pad;
  if (yy + r.height > window.innerHeight) yy = ev.clientY - r.height - pad;
  t.style.left = x + "px"; t.style.top = yy + "px";
}
function hideTip() { $("tip").hidden = true; }

/* ---------- state ---------- */
function setStatus(kind) { const d = $("status"); if (d) d.className = "dot " + (kind === "ok" ? "dot--ok" : kind === "err" ? "dot--err" : "dot--wait"); }
function showEmpty(title, msg) { $("emptyTitle").innerHTML = title; $("emptyMsg").innerHTML = msg; $("empty").hidden = false; }
function hideEmpty() { $("empty").hidden = true; }

let rt;
window.addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(() => { if (DATA) render(); }, 150); });
