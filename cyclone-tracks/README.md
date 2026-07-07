# Global Cyclone Tracks — standalone

A single self-contained page that renders 6,173 real IBTrACS storm tracks (all Category 3+
plus a dense sample of weaker systems) on a dark world map, colored by Saffir-Simpson
category, with hover-to-isolate tracks and hover-a-bar-to-filter interactions. The storm
data and coastlines are **baked into `index.html`** — no server, API, or live data needed.

```
cyclone-tracks-extension/
  index.html                       ← the whole thing (data + coastlines embedded, ~2 MB)
  lib/tableau.extensions.1.latest.js
  manifest.local.trex              ← extension manifest → http://localhost:8080/index.html
  manifest.hosted.trex             ← extension manifest → your public HTTPS URL
```

## Two ways to show it

### 1. Tableau **dashboard extension** (Desktop / Server)
The page calls `initializeAsync()` if it detects Tableau, so it loads cleanly as an extension.
1. Serve this folder:  `python -m http.server 8080`  (run from `cyclone-tracks-extension/`)
2. Dashboard → drag an **Extension** object → *Access Local Extensions* → pick
   `manifest.local.trex`.
> Extensions do **not** run in Tableau Public — use the web object below for public work.

### 2. Web page object / **public** embed (works anywhere, incl. Tableau Public)
Host `index.html` (+ the `lib/` folder) on any static HTTPS host — GitHub Pages is easiest:
1. Push this folder to a repo, enable **Pages**.
2. Your URL is `https://YOURNAME.github.io/REPO/index.html`.
3. In Tableau, drag a **Web Page** object onto the dashboard and paste that URL.
   (Also update `manifest.hosted.trex`'s `<url>` to the same address if you want the hosted
   extension variant.)

## Notes
- It's fully responsive and self-contained; the only external file is the Tableau Extensions
  API in `lib/` (needed for the extension handshake, ignored when used as a plain web object).
- To refresh the storm data later, re-run the build that injects `tracks_hifi.json` +
  `land.json` into the page body.

Built for Makeover Monday 2026 W27 · data: IBTrACS.
