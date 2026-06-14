---
name: data-story
description: Build an editorial scrollytelling data story in the vizyourdata / Eric Summers house style (the "Pacific Plate" look — warm paper, grain, Bricolage + Newsreader + Fragment Mono, sticky hand-built SVG figures driven by a scroll-stage system, sourced honesty footer). Use this whenever the user asks to make a new data viz / data story / scrollytelling page for this portfolio, or to restyle something into "the style of the Pacific Plate / the-first-48".
---

# Data Story — the house style

This portfolio's signature work is the **long-form editorial data story**: a single self-contained
HTML page that walks the reader down a scroll, swapping a sticky, hand-built SVG figure through a
series of annotated "stages" while a narrow text rail tells the story. Reference implementations:

- `the-pacific-plate/` — the canonical example (5 chapters + interlude, 6 figures).
- `the-first-48/` — World Cup 2026 story built from this skill (5 chapters, 5 figures).

Read one of those end-to-end before building; copy its scaffold rather than starting from scratch.
A ready starter is in [reference/scaffold.html](reference/scaffold.html).

## The DNA (non-negotiables)

These are what make a page "ours". Keep all of them:

1. **Paper + grain.** Warm paper background with two faint repeating-linear-gradient weaves and a
   fixed SVG-noise `.grain` overlay at ~5% multiply. Never a flat white page.
2. **The type stack.** Display = **Bricolage Grotesque** (760 wght, uppercase headlines). Body =
   **Newsreader** (serif). Labels/numbers/micro-copy = **Fragment Mono**. Load via the one Google
   Fonts link. Numbers in running text get `.num` (mono).
3. **A small token palette.** `--paper / --paper2 / --ink / --muted` plus 3–5 named accent colors
   chosen for *this* story (e.g. heat/sea/earth for Pacific; grass/gold/new/blue for the World Cup).
   The same hexes are mirrored into a JS `C={}` object for the SVG code.
4. **Hand-built SVG, no chart libraries.** Every figure is a function that returns an SVG string.
   No D3, no Chart.js, no canvas. `viewBox="0 0 1140 760"` is the usual figure box.
5. **Sticky figure, scrolling steps.** A `.scrolly` grid: a left `position:sticky` `.fig` (the SVG)
   and a right `.steps` rail of `.step` blocks. As each step scrolls to mid-viewport it sets the
   figure's stage.
6. **Stage-gated annotations via CSS.** Annotations carry classes `s1/s2/s3` and `only0`; the figure
   element carries `data-stage`. CSS fades the right layers in. The JS only flips `data-stage` — it
   does **not** rebuild the figure for annotation changes (rebuild only when the underlying *series*
   changes, e.g. a country selector).
7. **A kicker → hero → "menu" → chapters → statement → footer** spine. The hero has an oversized
   uppercase H1 with a colored second line, a dek, and a bordered "menu/line-up" nav listing chapters.
8. **An honest, sourced footer.** Two columns: "Data" (every source linked) and "Method & honesty"
   (what's estimated, what's not, baselines, caveats). Sign-off line: `· Title · Eric Summers · YEAR ·`.
9. **The home link + progress bar.** Fixed `.vyd-home` pill ("← Eric Summers", href `/`) top-left,
   and a 3px scroll `.progress` bar across the top.
10. **Reduced-motion + mobile.** `@media (prefers-reduced-motion)` kills transitions; under 980px the
    `.scrolly` collapses to a stacked layout with the figure stuck to the top.

## File layout

```
my-story/
  index.html      ← the whole page: <style>, markup, <script> at the bottom
  data.js          ← window.MYDATA = {...}; loaded with <script src="data.js"> before the main script
```

Then **register it** by adding one object to the top of [assets/js/vizzes.js](../../../assets/js/vizzes.js):

```js
{
  slug: "my-story", kind: "story", type: "Data story",
  title: "My Story",
  sub: "One vivid sentence that makes someone click.",
  href: "/my-story/", tags: ["Scrollytelling", "Some theme"],
  date: "Mon YYYY", accent: "#XXXXXX", feature: true,
  art: { type: "svg", svg: '<svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice">…</svg>' }
}
```

The gallery card `art` is its own little hero illustration — usually a dark-background mini-chart that
teases the story's main figure (see existing cards for the glow/gradient treatment). `accent` should
match the story's lead color.

## The figure system

Each figure is one `build*()` function that writes `innerHTML` of its `<svg id>`. Pattern:

- Compute a padding box (`padL/padR/padT/padB`) and `xs()/ys()` scale closures.
- Draw axes/gridlines first (muted `--line`), then the data marks, then annotations.
- Wrap stage-only marks in `<g class="anno s1">…`, the stage-0-only baseline state in
  `<g class="only0">…`, and leave always-on structure ungrouped.
- Round coordinates with `.toFixed(1)` to keep the markup lean.
- Add a `viz.onpointermove` hit-test → `showTip()` for hover where it helps; `onpointerleave=hideTip`.

Helpers that live in the page script: `lerp`, `hex2rgb`, `mix` (color interpolation for stripes /
diverging scales), `spread` (vertical label de-collision), `showTip/hideTip`. Reuse them verbatim.

Common figure types in the house vocabulary: warming-stripe weaves, diverging bars, line + annotation,
slope/dumbbell charts, glass/lollipop fills, small-multiple "triptychs", projected point maps,
cumulative area. Pick the form that reads in one glance; annotate the one number that matters.

## The scroll/stage driver

```js
const VIZID = {field:'fieldviz', seats:'seatviz', …};   // data-viz → svg id
const stepObs = new IntersectionObserver(ents => {
  ents.forEach(e => { if(!e.isIntersecting) return;
    const id = VIZID[e.target.dataset.viz];
    if(id) document.getElementById(id).setAttribute('data-stage', e.target.dataset.stage);
  });
}, {rootMargin:'-45% 0px -45% 0px'});
document.querySelectorAll('.step').forEach(s => stepObs.observe(s));
```

`.reveal` elements fade up via a second observer (threshold .2, unobserve after). A throttled scroll
handler paints the progress bar width. Build every figure once on load, then set each staged svg to
`data-stage="0"`.

## Writing voice

- Headlines are short, declarative, a little literary. Chapters are *courses / acts*, numbered (I, II…).
- The text rail uses a `.big` lead sentence (Bricolage) then 1–2 supporting lines, then optional
  `.micro` mono caption with the source/baseline in caps.
- Lead with the human stake, let documented events carry causation, and **never overclaim** — the
  honesty note is part of the craft. Quantities are concrete (`+34p`, `−42%`, `156,000 people`).
- One accent color = one idea, used consistently (e.g. "new/expansion" always red).

## Build checklist

- [ ] `data.js` holds all numbers in one global; every figure reads from it; sources noted inline.
- [ ] Fonts link, grain, progress bar, `.vyd-home`, tooltip div all present.
- [ ] Each chapter: `chap` head (course + h2 + reveal prose) → `scrolly` (fig + steps).
- [ ] Stages tested: stage 0 baseline reads on its own; each step adds exactly one idea.
- [ ] Footer has linked sources + an honesty paragraph + the sign-off line.
- [ ] Registered in `assets/js/vizzes.js` with a card `art` and matching `accent`.
- [ ] Works at mobile width and with reduced motion.
- [ ] Sense-check numbers against the source; if any value is an estimate, say so in the footer.
