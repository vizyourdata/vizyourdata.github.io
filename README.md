# vizyourdata portfolio

The data-visualization portfolio of **Eric Summers** → **https://ericsummers.io**

A static site (no build step) that frames interactive data stories and Tableau Public vizzes
in a warm editorial "gallery" shell. Hosted on GitHub Pages with a custom domain.

```
vizyourdata-portfolio/
├─ index.html                     home / gallery (renders cards from the catalog)
├─ 404.html                       on-brand not-found
├─ CNAME                          ericsummers.io  (custom domain for Pages)
├─ .nojekyll                      serve files as-is (skip Jekyll)
├─ assets/
│  ├─ css/site.css                the design system (the gallery shell)
│  ├─ js/vizzes.js                ⭐ the catalog: the ONE place you edit to publish work
│  ├─ js/site.js                  renders the gallery cards
│  └─ img/                        favicon.svg, og.svg
├─ embed/index.html               shared viewer for any Tableau Public single-sheet viz
├─ lab/index.html                 ⚗ the Lab: wires up any workbook + auto-builds its controls
│                                   (engine lives in assets/js/lab.js)
└─ three-days-in-the-desert/      a full custom data story (its own page)
   └─ index.html
```

## Add a new viz (the whole workflow)

Open **`assets/js/vizzes.js`** and add one object to the array. Two kinds:

### 1. A Tableau Public single-sheet viz *(no new HTML needed)*
```js
{
  slug: "superstore-pulse",
  kind: "tableau",
  type: "Tableau Public",
  title: "Superstore Pulse",
  sub: "A single-sheet look at profit by region and category.",
  tableauUrl: "https://public.tableau.com/views/YourWorkbook/YourSheet",
  tags: ["Tableau", "Retail"],
  date: "Jul 2026",
  accent: "#1F77B4"        // pulled into the card + viewer
}
```
The card links to `/embed/?v=superstore-pulse`, which frames the live viz (Embedding API v3)
with a back-to-gallery bar. Drop a thumbnail in `assets/img/` and add
`art:{ type:"img", src:"assets/img/superstore.png" }` for a custom card image; otherwise a
branded placeholder tile is drawn.

> **Tip:** the `tableauUrl` is the `/views/Workbook/Sheet` form (open the published viz, copy the
> URL, strip any `?:embed=...` query string). Single-sheet works best in the framed viewer.

### 2. A full custom HTML story (like *Three Days in the Desert*)
1. Drop the page at `your-slug/index.html` (it becomes `https://ericsummers.io/your-slug/`).
2. Add a `.vyd-home` back-link (copy the snippet from `three-days-in-the-desert/index.html`).
3. Add the catalog entry:
```js
{
  slug: "your-slug",
  kind: "story",
  type: "Data story",
  title: "…",
  sub: "…",
  href: "/your-slug/",
  tags: ["Scrollytelling"],
  date: "…",
  accent: "#…"
}
```

The **first** entry with `feature: true` renders as the wide hero card.

## The Lab (`/lab/`)

A template zone for building **custom-UI embeds**. Open `/lab/?src=<tableau-public-url>`
(or paste a URL into the patch-bay input). The page embeds the workbook with the Tableau
toolbar hidden, then introspects it through the **Embedding API v3** and generates web
controls that correspond to what it finds:

- **Sheets** — published sheets become tab chips (`activateSheetAsync`)
- **Filters** — categorical filters render as chips (≤ 8 values) or a checkbox well
  (`getDomainAsync` → `applyFilterAsync`); quantitative/date range filters become
  min–max inputs (`applyRangeFilterAsync`)
- **Parameters** — list params become chips/selects, range params become sliders,
  booleans become toggles (`changeParameterValueAsync`)
- **Actions** — undo / redo / reset / refresh / export, rebuilt as on-brand buttons
- the **event tape** at the bottom narrates every API event (`filterchanged`,
  `parameterchanged`, `markselectionchanged`, …) as it happens

Use it as the starting point for any piece that needs a hand-rolled UI around a
Tableau viz: copy `lab/index.html` + `assets/js/lab.js` into a new story folder and
replace the auto-generated panel with bespoke controls.

## Preview locally

It's static, but the gallery + embed use JS, so serve over http (not `file://`):
```bash
python -m http.server 8080      # then open http://localhost:8080
# or:  npx serve .
```

## Deploy (GitHub Pages + ericsummers.io)

1. Create a GitHub repo and push this folder (default branch `main`).
2. **Settings → Pages →** Source: *Deploy from a branch* → `main` / `/ (root)`.
3. The `CNAME` file sets the custom domain to **ericsummers.io** automatically.
4. At your DNS provider, point the apex `ericsummers.io` at GitHub Pages:
   - `A` records → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - (and optionally `AAAA` → `2606:50c0:8000::153` … `8003::153`)
   - `CNAME` for `www` → `<your-username>.github.io`
5. Back in **Settings → Pages**, tick **Enforce HTTPS** once the cert is issued.

## Design notes

- **Type:** Fraunces (display/body) · DM Mono (labels) · Anton (numerals).
- **Palette:** warm paper + ink, terracotta accent. Each viz carries its own `accent` so the
  shell stays quiet and the work pops.
- Replace `assets/img/og.svg` with a 1200×630 **PNG** for the richest social previews
  (some platforms don't render SVG cards).
