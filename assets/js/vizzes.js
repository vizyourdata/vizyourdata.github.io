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
    slug: "the-diesel-premium",
    kind: "story",
    type: "Data story",
    title: "The Diesel Premium",
    sub: "Britain’s two pumps moved as one for twenty years – then in spring 2026 the gap hit a record 34p a litre. The story of the gap.",
    href: "/the-diesel-premium/",
    tags: ["Scrollytelling", "MakeoverMonday ’26"],
    date: "Jun 2026",
    accent: "#FFB52E",
    art: {
      type: "svg",
      svg: '<svg viewBox="0 0 840 320" preserveAspectRatio="xMidYMid slice" role="img" aria-hidden="true"><defs><linearGradient id="dp-bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0E1422"/><stop offset="1" stop-color="#131C2C"/></linearGradient><radialGradient id="dp-glow" cx="50%" cy="0%" r="75%"><stop offset="0" stop-color="#FFB52E" stop-opacity=".22"/><stop offset="1" stop-color="#FFB52E" stop-opacity="0"/></radialGradient></defs><rect width="840" height="320" fill="url(#dp-bg)"/><rect width="840" height="150" fill="url(#dp-glow)"/><polygon points="0.0,275.4 11.9,273.8 24.5,273.3 36.4,263.5 49.0,261.0 60.9,262.2 72.8,255.4 85.4,239.9 97.3,245.5 109.9,238.5 121.8,249.2 133.7,252.9 146.3,239.5 158.2,236.2 170.1,218.8 182.7,182.3 194.6,197.5 207.2,234.1 219.1,227.9 231.0,224.4 243.6,210.3 255.5,198.7 268.1,199.7 280.0,175.6 291.9,164.9 304.5,165.1 316.4,160.3 329.0,164.9 340.9,158.9 352.8,160.8 365.4,165.2 377.3,166.3 389.9,169.8 401.8,171.2 413.7,179.3 426.3,210.1 438.2,197.1 450.1,215.9 462.7,232.7 474.6,214.5 487.2,209.2 499.1,193.8 511.0,202.9 523.6,198.5 535.5,189.9 548.1,177.2 560.0,172.1 571.9,183.4 584.5,172.3 596.4,178.6 609.0,182.3 620.9,213.5 632.8,202.7 645.4,192.2 657.3,177.6 669.9,163.0 681.8,146.1 693.7,85.2 706.3,92.4 718.2,110.7 730.1,152.9 742.7,124.6 754.6,147.6 767.2,143.1 779.1,166.8 791.0,153.5 803.6,168.6 815.5,159.1 828.1,163.0 840.0,90.6 840.0,132.5 828.1,179.2 815.5,173.3 803.6,179.3 791.0,166.5 779.1,175.5 767.2,153.3 754.6,163.1 742.7,136.2 730.1,159.1 718.2,149.6 706.3,125.3 693.7,102.6 681.8,153.1 669.9,169.1 657.3,184.1 645.4,199.9 632.8,211.2 620.9,224.6 609.0,191.1 596.4,187.2 584.5,183.7 571.9,201.0 560.0,181.4 548.1,184.3 535.5,196.4 523.6,204.3 511.0,206.8 499.1,199.0 487.2,212.8 474.6,216.3 462.7,232.0 450.1,218.9 438.2,205.9 426.3,223.3 413.7,187.4 401.8,182.3 389.9,183.9 377.3,179.0 365.4,174.2 352.8,174.0 340.9,167.4 329.0,175.3 316.4,174.4 304.5,173.9 291.9,171.9 280.0,184.3 268.1,205.0 255.5,202.6 243.6,213.5 231.0,226.0 219.1,233.5 207.2,253.4 194.6,218.0 182.7,204.8 170.1,227.6 158.2,239.7 146.3,240.6 133.7,259.9 121.8,258.2 109.9,242.5 97.3,252.7 85.4,244.8 72.8,262.8 60.9,270.1 49.0,264.3 36.4,265.6 24.5,276.0 11.9,276.1 0.0,279.3" fill="#FF5D49" opacity=".16"/><polyline points="0.0,275.4 11.9,273.8 24.5,273.3 36.4,263.5 49.0,261.0 60.9,262.2 72.8,255.4 85.4,239.9 97.3,245.5 109.9,238.5 121.8,249.2 133.7,252.9 146.3,239.5 158.2,236.2 170.1,218.8 182.7,182.3 194.6,197.5 207.2,234.1 219.1,227.9 231.0,224.4 243.6,210.3 255.5,198.7 268.1,199.7 280.0,175.6 291.9,164.9 304.5,165.1 316.4,160.3 329.0,164.9 340.9,158.9 352.8,160.8 365.4,165.2 377.3,166.3 389.9,169.8 401.8,171.2 413.7,179.3 426.3,210.1 438.2,197.1 450.1,215.9 462.7,232.7 474.6,214.5 487.2,209.2 499.1,193.8 511.0,202.9 523.6,198.5 535.5,189.9 548.1,177.2 560.0,172.1 571.9,183.4 584.5,172.3 596.4,178.6 609.0,182.3 620.9,213.5 632.8,202.7 645.4,192.2 657.3,177.6 669.9,163.0 681.8,146.1 693.7,85.2 706.3,92.4 718.2,110.7 730.1,152.9 742.7,124.6 754.6,147.6 767.2,143.1 779.1,166.8 791.0,153.5 803.6,168.6 815.5,159.1 828.1,163.0 840.0,90.6" fill="none" stroke="#FFB52E" stroke-width="3" stroke-linejoin="round" style="filter:drop-shadow(0 0 6px rgba(255,181,46,.8))"/><polyline points="0.0,279.3 11.9,276.1 24.5,276.0 36.4,265.6 49.0,264.3 60.9,270.1 72.8,262.8 85.4,244.8 97.3,252.7 109.9,242.5 121.8,258.2 133.7,259.9 146.3,240.6 158.2,239.7 170.1,227.6 182.7,204.8 194.6,218.0 207.2,253.4 219.1,233.5 231.0,226.0 243.6,213.5 255.5,202.6 268.1,205.0 280.0,184.3 291.9,171.9 304.5,173.9 316.4,174.4 329.0,175.3 340.9,167.4 352.8,174.0 365.4,174.2 377.3,179.0 389.9,183.9 401.8,182.3 413.7,187.4 426.3,223.3 438.2,205.9 450.1,218.9 462.7,232.0 474.6,216.3 487.2,212.8 499.1,199.0 511.0,206.8 523.6,204.3 535.5,196.4 548.1,184.3 560.0,181.4 571.9,201.0 584.5,183.7 596.4,187.2 609.0,191.1 620.9,224.6 632.8,211.2 645.4,199.9 657.3,184.1 669.9,169.1 681.8,153.1 693.7,102.6 706.3,125.3 718.2,149.6 730.1,159.1 742.7,136.2 754.6,163.1 767.2,153.3 779.1,175.5 791.0,166.5 803.6,179.3 815.5,173.3 828.1,179.2 840.0,132.5" fill="none" stroke="#3ECF6E" stroke-width="3" stroke-linejoin="round" style="filter:drop-shadow(0 0 6px rgba(62,207,110,.7))"/></svg>'
    }
  },
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
