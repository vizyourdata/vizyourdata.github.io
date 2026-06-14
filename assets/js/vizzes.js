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
    slug: "the-first-48",
    kind: "story",
    type: "Data story",
    title: "The First 48",
    sub: "For ninety-six years the World Cup grew one cautious step at a time. In 2026 it leaps to 48 teams across three nations — the biggest tournament football has ever staged. The shape of that leap.",
    href: "/the-first-48/",
    tags: ["Scrollytelling", "World Cup 2026"],
    date: "Jun 2026",
    accent: "#2E7D46",
    feature: true,
    art: {
      type: "svg",
      svg: '<svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" role="img" aria-hidden="true"><defs><linearGradient id="f48-bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0E2A1E"/><stop offset="1" stop-color="#12352A"/></linearGradient><radialGradient id="f48-glow" cx="89%" cy="6%" r="70%"><stop offset="0" stop-color="#FF6A3D" stop-opacity=".22"/><stop offset="1" stop-color="#FF6A3D" stop-opacity="0"/></radialGradient></defs><rect width="800" height="500" fill="url(#f48-bg)"/><g fill="#3FA15C" fill-opacity=".05"><rect x="0" width="100" height="500"/><rect x="200" width="100" height="500"/><rect x="400" width="100" height="500"/><rect x="600" width="100" height="500"/></g><rect width="800" height="300" fill="url(#f48-glow)"/><g stroke="#E9F0EA" stroke-opacity=".06"><line x1="40" y1="320" x2="760" y2="320"/><line x1="40" y1="210" x2="760" y2="210"/></g><line x1="40" y1="430" x2="760" y2="430" stroke="#E9F0EA" stroke-opacity=".12"/><g><rect x="70" y="340.6" width="44" height="89.4" rx="2" fill="#3FA15C"/><rect x="134" y="320" width="44" height="110" rx="2" fill="#3FA15C"/><rect x="198" y="320" width="44" height="110" rx="2" fill="#3FA15C"/><rect x="262" y="320" width="44" height="110" rx="2" fill="#3FA15C"/><rect x="326" y="265" width="44" height="165" rx="2" fill="#E0A93B"/><rect x="390" y="265" width="44" height="165" rx="2" fill="#E0A93B"/><rect x="454" y="210" width="44" height="220" rx="2" fill="#4E8FD8"/><rect x="518" y="210" width="44" height="220" rx="2" fill="#4E8FD8"/><rect x="582" y="210" width="44" height="220" rx="2" fill="#4E8FD8"/><rect x="646" y="210" width="44" height="220" rx="2" fill="#4E8FD8"/><rect x="710" y="100" width="44" height="330" rx="2" fill="#FF6A3D" style="filter:drop-shadow(0 0 9px rgba(255,106,61,.75))"/></g><text x="754" y="80" text-anchor="end" font-family="Anton, Bricolage Grotesque, sans-serif" font-size="58" font-weight="800" fill="#FF6A3D" style="filter:drop-shadow(0 2px 6px rgba(0,0,0,.5))">48</text><text x="70" y="464" font-family="monospace" font-size="13" letter-spacing="1.5" fill="#7FA890">1930 — 2026 · TEAMS</text></svg>'
    }
  },
  {
    slug: "escape-velocity",
    kind: "story",
    type: "Data story",
    title: "Escape Velocity",
    sub: "On 12 June 2026 SpaceX went public at $1.75 trillion — and 4,400 of its own employees, from welders to cafeteria cooks, woke up millionaires. A scrollytelling anatomy of the launch.",
    href: "/escape-velocity/",
    tags: ["Scrollytelling", "Markets"],
    date: "Jun 2026",
    accent: "#FF5A1F",
    art: {
      type: "svg",
      svg: '<svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" role="img" aria-hidden="true"><defs><linearGradient id="ev-bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#070A12"/><stop offset="1" stop-color="#04050A"/></linearGradient><radialGradient id="ev-glow" cx="86%" cy="4%" r="82%"><stop offset="0" stop-color="#FF5A1F" stop-opacity=".30"/><stop offset="1" stop-color="#FF5A1F" stop-opacity="0"/></radialGradient><linearGradient id="ev-fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FF5A1F" stop-opacity=".42"/><stop offset="1" stop-color="#FF5A1F" stop-opacity="0"/></linearGradient></defs><rect width="800" height="500" fill="url(#ev-bg)"/><rect width="800" height="500" fill="url(#ev-glow)"/><g fill="#cfe0ff" fill-opacity=".85"><circle cx="120" cy="84" r="1.4"/><circle cx="248" cy="150" r="1"/><circle cx="360" cy="58" r="1.2"/><circle cx="520" cy="120" r="1"/><circle cx="612" cy="208" r="1.3"/><circle cx="700" cy="300" r="1"/><circle cx="182" cy="248" r="1"/><circle cx="80" cy="350" r="1.2"/><circle cx="430" cy="178" r="1"/></g><g stroke="#EAEFFA" stroke-opacity=".05"><line x1="0" y1="380" x2="800" y2="380"/><line x1="0" y1="250" x2="800" y2="250"/><line x1="0" y1="120" x2="800" y2="120"/></g><path d="M40,470 C 280,464 472,442 592,330 S 722,150 754,78 L754,500 L40,500 Z" fill="url(#ev-fill)"/><path d="M40,470 C 280,464 472,442 592,330 S 722,150 754,78" fill="none" stroke="#FF5A1F" stroke-width="5" stroke-linecap="round" style="filter:drop-shadow(0 0 9px rgba(255,90,31,.85))"/><path d="M747,86 L754,114 L761,86 Z" fill="#FFA53C" opacity=".9"/><circle cx="754" cy="78" r="7" fill="#fff" stroke="#FF5A1F" stroke-width="2.5"/><text x="754" y="56" text-anchor="end" font-family="Fragment Mono, monospace" font-size="16" fill="#FFA53C">IPO · $1.75T</text><text x="50" y="118" font-family="Anton, sans-serif" font-size="96" fill="#EAEFFA" letter-spacing="-1" style="filter:drop-shadow(0 2px 8px rgba(0,0,0,.6))">4,400</text><text x="54" y="156" font-family="Fragment Mono, monospace" font-size="17" letter-spacing="5" fill="#FF7A3D">MILLIONAIRES · ONE LAUNCH</text></svg>'
    }
  },
  {
    slug: "the-diesel-premium",
    kind: "story",
    type: "Data story",
    title: "The Diesel Premium",
    sub: "Britain’s two pumps moved as one for twenty years. Then, in spring 2026, the gap hit a record 34p a litre. The story of the gap.",
    href: "/the-diesel-premium/",
    tags: ["Scrollytelling", "MakeoverMonday ’26"],
    date: "Jun 2026",
    accent: "#FFB52E",
    art: {
      type: "svg",
      svg: '<svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" role="img" aria-hidden="true"><defs><linearGradient id="dp-bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0C1220"/><stop offset="1" stop-color="#141D2D"/></linearGradient><radialGradient id="dp-glow" cx="84%" cy="2%" r="82%"><stop offset="0" stop-color="#FFB52E" stop-opacity=".18"/><stop offset="1" stop-color="#FFB52E" stop-opacity="0"/></radialGradient><linearGradient id="dp-gap" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#FFB52E" stop-opacity=".10"/><stop offset="0.5" stop-color="#FF7A3D" stop-opacity=".20"/><stop offset="0.82" stop-color="#FF5D49" stop-opacity=".48"/><stop offset="1" stop-color="#FF5D49" stop-opacity=".66"/></linearGradient></defs><rect width="800" height="500" fill="url(#dp-bg)"/><rect width="800" height="320" fill="url(#dp-glow)"/><line x1="0" y1="375.3" x2="800" y2="375.3" stroke="#E9EDF3" stroke-opacity=".05" stroke-width="1"/><line x1="0" y1="217.6" x2="800" y2="217.6" stroke="#E9EDF3" stroke-opacity=".05" stroke-width="1"/><line x1="0" y1="59.8" x2="800" y2="59.8" stroke="#E9EDF3" stroke-opacity=".05" stroke-width="1"/><polygon points="0.0,455.5 7.3,451.4 14.5,451.2 21.8,449.3 29.0,437.6 36.9,435.0 44.2,427.6 51.4,438.6 58.7,423.4 65.9,414.3 73.2,394.5 80.5,413.0 87.7,404.0 95.6,389.2 102.8,402.0 110.1,418.0 117.4,415.5 124.6,390.3 131.9,389.2 139.2,376.5 146.4,363.3 154.3,344.1 161.5,321.5 168.8,359.9 176.1,414.7 183.3,399.9 190.6,369.9 197.8,358.5 205.1,348.9 213.0,329.6 220.2,314.3 227.5,326.0 234.7,315.3 242.0,284.3 249.3,263.6 256.5,264.4 263.8,265.8 271.0,270.9 278.9,247.5 286.2,273.8 293.4,253.9 300.7,272.1 307.9,256.2 315.2,268.7 322.6,258.2 329.7,279.1 337.6,283.5 344.8,282.7 352.1,281.2 359.4,296.8 366.6,347.4 373.9,334.8 381.2,323.5 388.4,344.6 396.3,365.1 403.5,365.4 410.8,342.1 418.1,341.8 425.3,327.7 432.6,312.6 439.8,322.9 447.1,327.9 455.0,317.7 462.2,309.3 469.5,306.5 476.7,288.6 484.0,279.2 491.3,309.9 498.5,307.2 505.8,287.4 513.0,288.4 520.9,296.2 528.2,307.1 535.4,355.2 542.7,334.3 549.9,334.8 557.2,316.0 564.5,293.0 571.7,271.8 579.6,249.4 586.9,232.4 594.1,182.2 601.4,107.7 608.6,166.8 615.9,196.2 623.1,226.5 630.4,237.2 638.3,216.7 645.5,219.8 652.8,243.2 660.1,222.3 667.3,238.1 674.6,266.9 681.8,257.7 689.1,263.4 697.0,270.9 704.2,267.1 711.5,263.6 718.7,243.1 726.0,192.3 726.0,117.2 718.7,180.6 711.5,234.2 704.2,242.0 697.0,248.4 689.1,240.6 681.8,236.0 674.6,250.6 667.3,220.0 660.1,197.1 652.8,214.6 645.5,194.3 638.3,207.1 630.4,215.4 623.1,162.3 615.9,120.8 608.6,117.5 601.4,79.9 594.1,142.7 586.9,220.2 579.6,238.4 571.7,262.9 564.5,280.6 557.2,301.7 549.9,319.5 542.7,318.6 535.4,333.9 528.2,292.5 520.9,280.0 513.0,274.2 505.8,268.5 498.5,276.1 491.3,278.1 484.0,262.6 476.7,275.0 469.5,294.5 462.2,298.1 455.0,306.5 447.1,322.2 439.8,315.6 432.6,303.0 425.3,318.5 418.1,335.5 410.8,338.8 403.5,363.8 396.3,355.9 388.4,342.4 381.2,314.0 373.9,314.5 366.6,324.3 359.4,282.0 352.1,266.2 344.8,261.2 337.6,258.9 329.7,255.0 322.6,242.9 315.2,252.5 307.9,234.6 300.7,248.0 293.4,238.6 286.2,256.3 278.9,227.0 271.0,244.6 263.8,249.0 256.5,250.8 249.3,245.3 242.0,269.0 234.7,303.6 227.5,318.2 220.2,307.9 213.0,326.2 205.1,344.5 197.8,356.4 190.6,362.2 183.3,371.9 176.1,375.8 168.8,322.0 161.5,280.3 154.3,313.1 146.4,347.3 139.2,366.9 131.9,386.0 124.6,386.2 117.4,403.3 110.1,400.1 102.8,390.2 95.6,382.0 87.7,391.5 80.5,399.5 73.2,384.9 65.9,401.9 58.7,410.2 51.4,424.4 44.2,420.6 36.9,431.7 29.0,433.4 21.8,444.4 14.5,446.1 7.3,446.5 0.0,448.5" fill="url(#dp-gap)"/><polyline points="0.0,455.5 7.3,451.4 14.5,451.2 21.8,449.3 29.0,437.6 36.9,435.0 44.2,427.6 51.4,438.6 58.7,423.4 65.9,414.3 73.2,394.5 80.5,413.0 87.7,404.0 95.6,389.2 102.8,402.0 110.1,418.0 117.4,415.5 124.6,390.3 131.9,389.2 139.2,376.5 146.4,363.3 154.3,344.1 161.5,321.5 168.8,359.9 176.1,414.7 183.3,399.9 190.6,369.9 197.8,358.5 205.1,348.9 213.0,329.6 220.2,314.3 227.5,326.0 234.7,315.3 242.0,284.3 249.3,263.6 256.5,264.4 263.8,265.8 271.0,270.9 278.9,247.5 286.2,273.8 293.4,253.9 300.7,272.1 307.9,256.2 315.2,268.7 322.6,258.2 329.7,279.1 337.6,283.5 344.8,282.7 352.1,281.2 359.4,296.8 366.6,347.4 373.9,334.8 381.2,323.5 388.4,344.6 396.3,365.1 403.5,365.4 410.8,342.1 418.1,341.8 425.3,327.7 432.6,312.6 439.8,322.9 447.1,327.9 455.0,317.7 462.2,309.3 469.5,306.5 476.7,288.6 484.0,279.2 491.3,309.9 498.5,307.2 505.8,287.4 513.0,288.4 520.9,296.2 528.2,307.1 535.4,355.2 542.7,334.3 549.9,334.8 557.2,316.0 564.5,293.0 571.7,271.8 579.6,249.4 586.9,232.4 594.1,182.2 601.4,107.7 608.6,166.8 615.9,196.2 623.1,226.5 630.4,237.2 638.3,216.7 645.5,219.8 652.8,243.2 660.1,222.3 667.3,238.1 674.6,266.9 681.8,257.7 689.1,263.4 697.0,270.9 704.2,267.1 711.5,263.6 718.7,243.1 726.0,192.3" fill="none" stroke="#3ECF6E" stroke-width="4" stroke-linejoin="round" stroke-linecap="round" style="filter:drop-shadow(0 0 7px rgba(62,207,110,.7))"/><polyline points="0.0,448.5 7.3,446.5 14.5,446.1 21.8,444.4 29.0,433.4 36.9,431.7 44.2,420.6 51.4,424.4 58.7,410.2 65.9,401.9 73.2,384.9 80.5,399.5 87.7,391.5 95.6,382.0 102.8,390.2 110.1,400.1 117.4,403.3 124.6,386.2 131.9,386.0 139.2,366.9 146.4,347.3 154.3,313.1 161.5,280.3 168.8,322.0 176.1,375.8 183.3,371.9 190.6,362.2 197.8,356.4 205.1,344.5 213.0,326.2 220.2,307.9 227.5,318.2 234.7,303.6 242.0,269.0 249.3,245.3 256.5,250.8 263.8,249.0 271.0,244.6 278.9,227.0 286.2,256.3 293.4,238.6 300.7,248.0 307.9,234.6 315.2,252.5 322.6,242.9 329.7,255.0 337.6,258.9 344.8,261.2 352.1,266.2 359.4,282.0 366.6,324.3 373.9,314.5 381.2,314.0 388.4,342.4 396.3,355.9 403.5,363.8 410.8,338.8 418.1,335.5 425.3,318.5 432.6,303.0 439.8,315.6 447.1,322.2 455.0,306.5 462.2,298.1 469.5,294.5 476.7,275.0 484.0,262.6 491.3,278.1 498.5,276.1 505.8,268.5 513.0,274.2 520.9,280.0 528.2,292.5 535.4,333.9 542.7,318.6 549.9,319.5 557.2,301.7 564.5,280.6 571.7,262.9 579.6,238.4 586.9,220.2 594.1,142.7 601.4,79.9 608.6,117.5 615.9,120.8 623.1,162.3 630.4,215.4 638.3,207.1 645.5,194.3 652.8,214.6 660.1,197.1 667.3,220.0 674.6,250.6 681.8,236.0 689.1,240.6 697.0,248.4 704.2,242.0 711.5,234.2 718.7,180.6 726.0,117.2" fill="none" stroke="#FFB52E" stroke-width="4.5" stroke-linejoin="round" stroke-linecap="round" style="filter:drop-shadow(0 0 8px rgba(255,181,46,.9))"/><line x1="726.0" y1="117.2" x2="726.0" y2="192.3" stroke="#FF5D49" stroke-width="3.5"/><circle cx="726.0" cy="117.2" r="6.5" fill="#FFB52E" stroke="#0C1220" stroke-width="2.5"/><circle cx="726.0" cy="192.3" r="6.5" fill="#3ECF6E" stroke="#0C1220" stroke-width="2.5"/><text x="710.0" y="101.2" text-anchor="end" font-family="Anton, sans-serif" font-size="46" fill="#FF5D49" style="filter:drop-shadow(0 2px 6px rgba(0,0,0,.55))">+34p</text></svg>'
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
  },
  {
    slug: "ready-player-one",
    kind: "story",
    type: "Data story",
    title: "The Egg Hunt",
    sub: "Every cameo and Easter egg in Ready Player One, mapped two ways: who shares a scene, and how far each thing travelled to reach the screen.",
    href: "/ready-player-one/",
    tags: ["Network", "Explorable"],
    date: "Jun 2026",
    accent: "#7B5BFF",
    art: {
      type: "svg",
      svg: '<svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" role="img" aria-hidden="true"><defs><linearGradient id="rp-bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0A0A14"/><stop offset="1" stop-color="#11121F"/></linearGradient><radialGradient id="rp-glow" cx="30%" cy="14%" r="80%"><stop offset="0" stop-color="#7B5BFF" stop-opacity=".28"/><stop offset="1" stop-color="#7B5BFF" stop-opacity="0"/></radialGradient><radialGradient id="rp-glow2" cx="82%" cy="90%" r="70%"><stop offset="0" stop-color="#FF5BB0" stop-opacity=".18"/><stop offset="1" stop-color="#FF5BB0" stop-opacity="0"/></radialGradient></defs><rect width="800" height="500" fill="url(#rp-bg)"/><rect width="800" height="500" fill="url(#rp-glow)"/><rect width="800" height="500" fill="url(#rp-glow2)"/><g stroke="#ECEAF6" stroke-opacity=".05"><line x1="160" y1="40" x2="160" y2="460"/><line x1="320" y1="40" x2="320" y2="460"/><line x1="480" y1="40" x2="480" y2="460"/><line x1="640" y1="40" x2="640" y2="460"/></g><g stroke="#ECEAF6" stroke-opacity=".14" stroke-width="1"><line x1="250" y1="300" x2="205" y2="250"/><line x1="250" y1="300" x2="232" y2="345"/><line x1="250" y1="300" x2="292" y2="272"/><line x1="250" y1="300" x2="198" y2="312"/><line x1="250" y1="300" x2="300" y2="350"/><line x1="520" y1="205" x2="478" y2="168"/><line x1="520" y1="205" x2="566" y2="180"/><line x1="520" y1="205" x2="540" y2="250"/><line x1="520" y1="205" x2="486" y2="248"/><line x1="520" y1="205" x2="582" y2="236"/><line x1="640" y1="350" x2="612" y2="302"/><line x1="640" y1="350" x2="690" y2="360"/><line x1="640" y1="350" x2="666" y2="398"/><line x1="640" y1="350" x2="700" y2="322"/><line x1="380" y1="232" x2="250" y2="300"/><line x1="380" y1="232" x2="520" y2="205"/><line x1="410" y1="330" x2="250" y2="300"/><line x1="410" y1="330" x2="640" y2="350"/></g><g stroke="#0A0A14" stroke-width="1.5"><circle cx="205" cy="250" r="6" fill="#FF6FB5"/><circle cx="232" cy="345" r="5.5" fill="#FFB454"/><circle cx="292" cy="272" r="7" fill="#5BE5A0"/><circle cx="198" cy="312" r="5" fill="#FFD86B"/><circle cx="300" cy="350" r="5.5" fill="#46D5E8"/><circle cx="478" cy="168" r="6" fill="#FF6A5A"/><circle cx="566" cy="180" r="7" fill="#5BE5A0"/><circle cx="540" cy="250" r="6.5" fill="#FFB454"/><circle cx="486" cy="248" r="5.5" fill="#B98BFF"/><circle cx="582" cy="236" r="6" fill="#FF6FB5"/><circle cx="612" cy="302" r="6.5" fill="#5BE5A0"/><circle cx="690" cy="360" r="6" fill="#FFB454"/><circle cx="666" cy="398" r="5.5" fill="#FF6A5A"/><circle cx="700" cy="322" r="5.5" fill="#46D5E8"/><circle cx="380" cy="232" r="6" fill="#B98BFF"/><circle cx="410" cy="330" r="6.5" fill="#FFB454"/><circle cx="360" cy="180" r="5" fill="#5BE5A0"/><circle cx="448" cy="372" r="5" fill="#FFD86B"/></g><g fill="#20243a" stroke="#3a3f63" stroke-width="2"><circle cx="250" cy="300" r="22"/><circle cx="520" cy="205" r="26"/><circle cx="640" cy="350" r="19"/></g><g font-family="monospace" font-size="15" fill="#8A8DA8" text-anchor="middle"><text x="250" y="305">04</text><text x="520" y="210">09</text><text x="640" y="355">12</text></g><path d="M300,92 C300,210 520,120 520,205" fill="none" stroke="#A48BFF" stroke-opacity=".8" stroke-width="2.5" style="filter:drop-shadow(0 0 6px rgba(164,139,255,.8))"/><circle cx="300" cy="92" r="9" fill="#ECEAF6"/><circle cx="300" cy="92" r="9" fill="none" stroke="#A48BFF" stroke-width="2.5" style="filter:drop-shadow(0 0 8px rgba(164,139,255,.9))"/><text x="300" y="66" text-anchor="middle" font-family="monospace" font-size="13" letter-spacing="1" fill="#A48BFF">made 1981</text></svg>'
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
