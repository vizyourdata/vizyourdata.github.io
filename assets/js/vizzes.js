/* ============================================================
   vizzes.js: the catalog. THIS is the single place to add work.
   ------------------------------------------------------------
   To publish a new viz, add an object to the array below.

   Two kinds:
   ┌ kind:"story"   a full custom HTML page you built (its own folder).
   │                 → set href to its path, e.g. "/my-story/"
   └ kind:"tableau" a single-sheet Tableau Public viz.
                     → set tableauUrl to the /views/ URL; the shared
                       /embed/ viewer frames it. (href is auto.)

   Artwork for the card (pick one, optional):
     art:{type:"stream", ...}  a generated mini streamgraph (see Coachella)
     art:{type:"img", src:"assets/img/thing.png"}
     art:{type:"svg", svg:"<svg ...>"}        inline svg markup
     (omit art → a clean branded placeholder tile is drawn)
   ============================================================ */

window.VIZZES = [
  {
    slug: "three-days-in-the-desert",
    kind: "story",
    type: "Data story",
    title: "Three Days in the Desert",
    sub: "How Coachella’s lineup quietly shrank 22% after the pandemic, and why it wasn’t for lack of space.",
    href: "/three-days-in-the-desert/",
    tags: ["Scrollytelling", "MakeoverMonday ’26"],
    date: "Jun 2026",
    accent: "#EE6A2E",
    feature: true,
    art: {
      type: "stream",
      bg: ["#F6DEAF", "#EAC487"],
      colors: { fri: "#F0AE2A", sat: "#EE6A2E", sun: "#CE4283" },
      data: [
        { fri: 55, sat: 57, sun: 57 },
        { fri: 59, sat: 55, sun: 52 },
        { fri: 60, sat: 61, sun: 57 },
        { fri: 55, sat: 57, sun: 54 },
        { fri: 52, sat: 55, sun: 45 },
        { fri: 54, sat: 48, sun: 48 },
        { fri: 51, sat: 44, sun: 43 }
      ]
    }
  }

  /* ----------------------------------------------------------
     EXAMPLE: a Tableau Public single-sheet viz (delete or copy):

  ,{
    slug: "superstore-pulse",
    kind: "tableau",
    type: "Tableau Public",
    title: "Superstore Pulse",
    sub: "A single-sheet look at profit by region and category.",
    tableauUrl: "https://public.tableau.com/views/YourWorkbook/YourSheet",
    tags: ["Tableau", "Retail"],
    date: "Jul 2026",
    accent: "#1F77B4"
    // art omitted → branded placeholder tile is drawn automatically
  }
  ---------------------------------------------------------- */
];
