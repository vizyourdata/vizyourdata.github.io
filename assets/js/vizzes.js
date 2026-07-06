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

   Ordering: the gallery auto-sorts newest-first by `date` (ISO
   YYYY-MM-DD). Add an entry in any position — the date decides where
   it lands. Same-day ties keep catalog order. `feature:true` still
   renders a card as the wide hero, wherever it sorts to.

   Card title overlay:
     The `title` is drawn big and white across the artwork. Add an
     optional `standout` to print a small kicker above it naming the
     recognizable subject (e.g. "SpaceX", "World Cup", "Coachella").

   Artwork for the card (pick one, optional):
     art:{type:"stream", ...}  a generated mini streamgraph (see Coachella)
     art:{type:"img", src:"assets/img/thing.png"}
     art:{type:"svg", svg:"<svg ...>"}        inline svg markup
     (omit art → a clean branded placeholder tile is drawn)
   ============================================================ */

window.VIZZES = [
  {
    slug: "launch-command",
    kind: "story",
    type: "Data story",
    title: "Launch Command",
    standout: "Spaceflight",
    sub: "Every orbital launch since 1957. A Cold War metronome, a post-Soviet collapse, then a near-vertical surge to 330 launches a year: who reaches orbit now, and the handful of spaceports they leave from.",
    href: "/launch-command/",
    tags: ["Scrollytelling", "MakeoverMonday ’26"],
    date: "2026-06-29",
    accent: "#FF7A2F",
    feature: true,
    art: {
      type: "svg",
      svg: '<svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" role="img" aria-hidden="true"><defs><linearGradient id="lc-bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0B1426"/><stop offset="1" stop-color="#05070E"/></linearGradient><radialGradient id="lc-glow" cx="93%" cy="16%" r="72%"><stop offset="0" stop-color="#FF7A2F" stop-opacity=".22"/><stop offset="1" stop-color="#FF7A2F" stop-opacity="0"/></radialGradient><linearGradient id="lc-cad" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FF7A2F" stop-opacity=".5"/><stop offset="1" stop-color="#FF7A2F" stop-opacity="0"/></linearGradient></defs><rect width="800" height="500" fill="url(#lc-bg)"/><rect width="800" height="500" fill="url(#lc-glow)"/><g fill="#cfe0ff" fill-opacity=".65"><circle cx="120" cy="150" r="1.3"/><circle cx="300" cy="90" r="1"/><circle cx="470" cy="130" r="1.2"/><circle cx="620" cy="70" r="1"/><circle cx="700" cy="210" r="1.3"/><circle cx="210" cy="250" r="1"/><circle cx="560" cy="300" r="1.1"/><circle cx="90" cy="330" r="1"/><circle cx="410" cy="200" r="1"/><circle cx="740" cy="360" r="1.2"/></g><g stroke="rgba(150,175,210,.08)" stroke-width="1"><line x1="40" y1="430" x2="760" y2="430"/><line x1="40" y1="340" x2="760" y2="340"/><line x1="40" y1="250" x2="760" y2="250"/><line x1="40" y1="160" x2="760" y2="160"/></g><path d="M40.0,427.5 C41.7,424.1 47.0,410.0 50.4,406.9 C53.9,403.9 57.4,410.8 60.9,409.4 C64.3,408.0 67.8,402.1 71.3,398.7 C74.8,395.3 78.3,394.7 81.7,388.8 C85.2,382.9 88.7,366.0 92.2,363.3 C95.7,360.5 99.1,375.0 102.6,372.4 C106.1,369.7 109.6,355.2 113.0,347.6 C116.5,340.1 120.0,331.3 123.5,327.1 C127.0,322.8 130.4,324.0 133.9,322.1 C137.4,320.2 140.9,315.3 144.3,315.5 C147.8,315.8 151.3,321.8 154.8,323.8 C158.3,325.7 161.7,326.4 165.2,327.1 C168.7,327.7 172.2,329.0 175.7,327.9 C179.1,326.8 182.6,319.0 186.1,320.5 C189.6,322.0 193.0,334.7 196.5,336.9 C200.0,339.1 203.5,333.6 207.0,333.6 C210.4,333.6 213.9,339.0 217.4,336.9 C220.9,334.9 224.3,323.8 227.8,321.3 C231.3,318.8 234.8,321.8 238.3,322.1 C241.7,322.4 245.2,322.5 248.7,322.9 C252.2,323.4 255.7,321.8 259.1,324.6 C262.6,327.3 266.1,336.8 269.6,339.4 C273.0,342.0 276.5,342.4 280.0,340.2 C283.5,338.0 287.0,329.0 290.4,326.2 C293.9,323.5 297.4,324.2 300.9,323.8 C304.3,323.4 307.8,323.9 311.3,323.8 C314.8,323.6 318.3,322.5 321.7,322.9 C325.2,323.4 328.7,323.5 332.2,326.2 C335.7,329.0 339.1,337.8 342.6,339.4 C346.1,341.1 349.6,337.6 353.0,336.1 C356.5,334.6 360.0,328.7 363.5,330.4 C367.0,332.0 370.4,346.0 373.9,346.0 C377.4,346.0 380.9,328.8 384.3,330.4 C387.8,331.9 391.3,351.8 394.8,355.1 C398.3,358.4 401.7,349.3 405.2,350.1 C408.7,350.9 412.2,359.6 415.7,360.0 C419.1,360.4 422.6,351.9 426.1,352.6 C429.6,353.3 433.0,361.8 436.5,364.1 C440.0,366.5 443.5,367.8 447.0,366.6 C450.4,365.4 453.9,357.4 457.4,356.7 C460.9,356.0 464.3,361.0 467.8,362.5 C471.3,364.0 474.8,366.2 478.3,365.8 C481.7,365.4 485.2,357.4 488.7,360.0 C492.2,362.6 495.7,378.7 499.1,381.4 C502.6,384.2 506.1,377.2 509.6,376.5 C513.0,375.8 516.5,375.9 520.0,377.3 C523.5,378.7 527.0,383.6 530.4,384.7 C533.9,385.8 537.4,385.4 540.9,383.9 C544.3,382.4 547.8,377.3 551.3,375.6 C554.8,374.0 558.3,374.4 561.7,374.0 C565.2,373.6 568.7,374.5 572.2,373.2 C575.7,371.8 579.1,366.5 582.6,365.8 C586.1,365.1 589.6,369.9 593.0,369.1 C596.5,368.2 600.0,361.4 603.5,360.8 C607.0,360.3 610.4,365.4 613.9,365.8 C617.4,366.2 620.9,365.2 624.3,363.3 C627.8,361.4 631.3,355.1 634.8,354.2 C638.3,353.4 641.7,357.5 645.2,358.4 C648.7,359.2 652.2,359.6 655.7,359.2 C659.1,358.8 662.6,359.7 666.1,355.9 C669.6,352.0 673.0,337.9 676.5,336.1 C680.0,334.3 683.5,345.2 687.0,345.2 C690.4,345.2 693.9,342.0 697.4,336.1 C700.9,330.2 704.3,319.6 707.8,309.8 C711.3,299.9 714.8,287.4 718.3,276.8 C721.7,266.3 725.2,256.9 728.7,246.4 C732.2,235.8 735.7,228.1 739.1,213.4 C742.6,198.7 746.1,143.3 749.6,158.2 C753.0,173.2 758.3,279.0 760.0,303.2 L760.0,430.0 L40.0,430.0 Z" fill="url(#lc-cad)"/><path d="M40.0,427.5 C41.7,424.1 47.0,410.0 50.4,406.9 C53.9,403.9 57.4,410.8 60.9,409.4 C64.3,408.0 67.8,402.1 71.3,398.7 C74.8,395.3 78.3,394.7 81.7,388.8 C85.2,382.9 88.7,366.0 92.2,363.3 C95.7,360.5 99.1,375.0 102.6,372.4 C106.1,369.7 109.6,355.2 113.0,347.6 C116.5,340.1 120.0,331.3 123.5,327.1 C127.0,322.8 130.4,324.0 133.9,322.1 C137.4,320.2 140.9,315.3 144.3,315.5 C147.8,315.8 151.3,321.8 154.8,323.8 C158.3,325.7 161.7,326.4 165.2,327.1 C168.7,327.7 172.2,329.0 175.7,327.9 C179.1,326.8 182.6,319.0 186.1,320.5 C189.6,322.0 193.0,334.7 196.5,336.9 C200.0,339.1 203.5,333.6 207.0,333.6 C210.4,333.6 213.9,339.0 217.4,336.9 C220.9,334.9 224.3,323.8 227.8,321.3 C231.3,318.8 234.8,321.8 238.3,322.1 C241.7,322.4 245.2,322.5 248.7,322.9 C252.2,323.4 255.7,321.8 259.1,324.6 C262.6,327.3 266.1,336.8 269.6,339.4 C273.0,342.0 276.5,342.4 280.0,340.2 C283.5,338.0 287.0,329.0 290.4,326.2 C293.9,323.5 297.4,324.2 300.9,323.8 C304.3,323.4 307.8,323.9 311.3,323.8 C314.8,323.6 318.3,322.5 321.7,322.9 C325.2,323.4 328.7,323.5 332.2,326.2 C335.7,329.0 339.1,337.8 342.6,339.4 C346.1,341.1 349.6,337.6 353.0,336.1 C356.5,334.6 360.0,328.7 363.5,330.4 C367.0,332.0 370.4,346.0 373.9,346.0 C377.4,346.0 380.9,328.8 384.3,330.4 C387.8,331.9 391.3,351.8 394.8,355.1 C398.3,358.4 401.7,349.3 405.2,350.1 C408.7,350.9 412.2,359.6 415.7,360.0 C419.1,360.4 422.6,351.9 426.1,352.6 C429.6,353.3 433.0,361.8 436.5,364.1 C440.0,366.5 443.5,367.8 447.0,366.6 C450.4,365.4 453.9,357.4 457.4,356.7 C460.9,356.0 464.3,361.0 467.8,362.5 C471.3,364.0 474.8,366.2 478.3,365.8 C481.7,365.4 485.2,357.4 488.7,360.0 C492.2,362.6 495.7,378.7 499.1,381.4 C502.6,384.2 506.1,377.2 509.6,376.5 C513.0,375.8 516.5,375.9 520.0,377.3 C523.5,378.7 527.0,383.6 530.4,384.7 C533.9,385.8 537.4,385.4 540.9,383.9 C544.3,382.4 547.8,377.3 551.3,375.6 C554.8,374.0 558.3,374.4 561.7,374.0 C565.2,373.6 568.7,374.5 572.2,373.2 C575.7,371.8 579.1,366.5 582.6,365.8 C586.1,365.1 589.6,369.9 593.0,369.1 C596.5,368.2 600.0,361.4 603.5,360.8 C607.0,360.3 610.4,365.4 613.9,365.8 C617.4,366.2 620.9,365.2 624.3,363.3 C627.8,361.4 631.3,355.1 634.8,354.2 C638.3,353.4 641.7,357.5 645.2,358.4 C648.7,359.2 652.2,359.6 655.7,359.2 C659.1,358.8 662.6,359.7 666.1,355.9 C669.6,352.0 673.0,337.9 676.5,336.1 C680.0,334.3 683.5,345.2 687.0,345.2 C690.4,345.2 693.9,342.0 697.4,336.1 C700.9,330.2 704.3,319.6 707.8,309.8 C711.3,299.9 714.8,287.4 718.3,276.8 C721.7,266.3 725.2,256.9 728.7,246.4 C732.2,235.8 735.7,228.1 739.1,213.4 C742.6,198.7 746.1,143.3 749.6,158.2 C753.0,173.2 758.3,279.0 760.0,303.2" fill="none" stroke="#FF7A2F" stroke-width="3" stroke-linejoin="round" style="filter:drop-shadow(0 0 8px rgba(255,122,47,.85))"/><circle cx="749.6" cy="158.2" r="6" fill="#EAF1FC" stroke="#FF7A2F" stroke-width="2.5"/><text x="738" y="150" text-anchor="end" font-family="monospace" font-size="15" fill="#8092AE">330 in 2025</text><text x="40" y="86" font-family="Anton, sans-serif" font-size="86" fill="#EAF1FC" letter-spacing="1">7,335</text><text x="44" y="118" font-family="monospace" font-size="15" letter-spacing="5" fill="#FF7A2F">LAUNCHES · 1957–2026</text></svg>'
    }
  },
  {
    slug: "the-long-advent",
    kind: "story",
    type: "Data story",
    title: "The Long Advent",
    standout: "Advent",
    sub: "One Christ-centered Advent calendar on Etsy, blooming into a year-round catalog: Easter calendars, scripture cards, prints, a twelve-piece fine-art line. How one December product became a ministry in print.",
    href: "/the-long-advent/",
    tags: ["Scrollytelling", "Small Business"],
    date: "2026-06-24",
    accent: "#D99A2B",
    feature: true,
    art: {
      type: "svg",
      svg: '<svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" role="img" aria-hidden="true"><defs><linearGradient id="la-bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0C1A13"/><stop offset="1" stop-color="#1B2E1E"/></linearGradient><radialGradient id="la-glow" cx="50%" cy="100%" r="78%"><stop offset="0" stop-color="#FFE3A6" stop-opacity=".40"/><stop offset="42%" stop-color="#E0922F" stop-opacity=".13"/><stop offset="100%" stop-color="#E0922F" stop-opacity="0"/></radialGradient></defs><rect width="800" height="500" fill="url(#la-bg)"/><rect width="800" height="500" fill="url(#la-glow)"/><g stroke="#ECE2C8" stroke-opacity=".05"><line x1="200" y1="40" x2="200" y2="460"/><line x1="350" y1="40" x2="350" y2="460"/><line x1="500" y1="40" x2="500" y2="460"/><line x1="650" y1="40" x2="650" y2="460"/></g><g style="filter:drop-shadow(0 0 10px rgba(0,0,0,.32))"><path d="M72,250 C320,250 470,104 724,104 L724,130 C470,130 320,250 72,250 Z" fill="#F3DD96" fill-opacity=".9"/><path d="M72,250 C320,250 470,130 724,130 L724,162 C470,162 320,250 72,250 Z" fill="#F2CD58" fill-opacity=".88"/><path d="M72,250 C320,250 470,162 724,162 L724,202 C470,202 320,250 72,250 Z" fill="#EE9E3A" fill-opacity=".88"/><path d="M72,250 C320,250 470,202 724,202 L724,250 C470,250 320,250 72,250 Z" fill="#E0C879" fill-opacity=".85"/><path d="M72,250 C320,250 470,250 724,250 L724,298 C470,298 320,250 72,250 Z" fill="#D29BB6" fill-opacity=".85"/><path d="M72,250 C320,250 470,298 724,298 L724,344 C470,344 320,250 72,250 Z" fill="#3E8E8E" fill-opacity=".82"/><path d="M72,250 C320,250 470,344 724,344 L724,398 C470,398 320,250 72,250 Z" fill="#3E8F5C" fill-opacity=".85"/></g><circle cx="72" cy="250" r="9" fill="url(#la-glow)"/><circle cx="72" cy="250" r="5.5" fill="#F3DD96" stroke="#0C1A13" stroke-width="2"/><text x="60" y="250" text-anchor="end" dominant-baseline="middle" font-family="DM Mono, monospace" font-size="13" letter-spacing="2" fill="#9DB39A">2017</text><text x="752" y="96" text-anchor="end" font-family="Fraunces, Georgia, serif" font-size="62" font-weight="600" fill="#F2CD58" style="filter:drop-shadow(0 2px 6px rgba(0,0,0,.5))">30+</text><text x="752" y="122" text-anchor="end" font-family="DM Mono, monospace" font-size="12" letter-spacing="2" fill="#9DB39A">VENUES BY 2025</text><text x="48" y="466" font-family="DM Mono, monospace" font-size="13" letter-spacing="3" fill="#E0A93B">ONE SHOP &#8594; A CATALOG</text></svg>'
    }
  },
  {
    slug: "the-book-of-begats",
    kind: "story",
    type: "Data story",
    title: "The Book of Begats",
    standout: "Genesis",
    sub: "Every 'and he begat' in the Hebrew Bible, drawn as one river — from Adam through the Flood and the twelve tribes down to David. Ten generations narrow to a single thread; one man becomes a nation.",
    href: "/the-book-of-begats/",
    tags: ["Sankey", "Scripture"],
    date: "2026-06-15",
    accent: "#1F5C92",
    feature: true,
    art: {
      type: "svg",
      svg: '<svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" role="img" aria-hidden="true"><defs><linearGradient id="bg-bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0B1320"/><stop offset="1" stop-color="#141A28"/></linearGradient><radialGradient id="bg-glow" cx="86%" cy="50%" r="60%"><stop offset="0" stop-color="#C18B2C" stop-opacity=".22"/><stop offset="1" stop-color="#C18B2C" stop-opacity="0"/></radialGradient><radialGradient id="bg-pinch" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#E9C77A" stop-opacity=".9"/><stop offset="1" stop-color="#E9C77A" stop-opacity="0"/></radialGradient></defs><rect width="800" height="500" fill="url(#bg-bg)"/><rect width="800" height="500" fill="url(#bg-glow)"/><g stroke="#CBB68A" stroke-opacity=".06"><line x1="120" y1="40" x2="120" y2="460"/><line x1="250" y1="40" x2="250" y2="460"/><line x1="430" y1="40" x2="430" y2="460"/><line x1="600" y1="40" x2="600" y2="460"/></g><path d="M250 40 L250 460" stroke="#B23B2E" stroke-opacity=".5" stroke-width="1.5" stroke-dasharray="3 7"/><path d="M40 244 C 150 244, 180 250, 250 250 L250 256 C 180 256, 150 256, 40 256 Z" fill="#2E6FA6" opacity=".5"/><path d="M40 250 C 150 320, 200 430, 250 446" fill="none" stroke="#5A6168" stroke-opacity=".22" stroke-width="26" stroke-linecap="round"/><g fill="none" stroke-linecap="round" style="filter:drop-shadow(0 0 6px rgba(43,108,166,.55))"><path d="M250 250 C 360 250, 430 70, 628 70" stroke="#2E6FA6" stroke-width="4"/><path d="M250 250 C 360 250, 430 120, 628 120" stroke="#3C82BE" stroke-width="4"/><path d="M250 250 C 360 250, 430 165, 628 165" stroke="#2E6FA6" stroke-width="4"/><path d="M250 250 C 360 250, 430 205, 628 205" stroke="#7A7A3C" stroke-width="4"/><path d="M250 250 C 380 250, 440 318, 628 318" stroke="#B5566B" stroke-width="4"/><path d="M250 250 C 380 250, 440 360, 628 360" stroke="#7A7A3C" stroke-width="4"/><path d="M250 250 C 380 250, 440 405, 628 405" stroke="#3C82BE" stroke-width="4"/><path d="M250 250 C 360 250, 430 445, 628 445" stroke="#2E6FA6" stroke-width="4"/></g><path d="M250 250 L740 250" fill="none" stroke="#C18B2C" stroke-width="5.5" stroke-linecap="round" style="filter:drop-shadow(0 0 8px rgba(193,139,44,.9))"/><circle cx="250" cy="250" r="22" fill="url(#bg-pinch)"/><circle cx="250" cy="250" r="8" fill="#E9C77A" stroke="#0B1320" stroke-width="2"/><g><circle cx="740" cy="250" r="11" fill="#E9C77A" stroke="#0B1320" stroke-width="2.5"/><path d="M727 232 L727 220 L734 227 L740 217 L746 227 L753 220 L753 232 Z" fill="#C18B2C" stroke="#0B1320" stroke-width="1"/></g><text x="48" y="214" font-family="Fragment Mono, monospace" font-size="14" letter-spacing="3" fill="#7FA3C8">ADAM</text><text x="694" y="290" text-anchor="middle" font-family="Fragment Mono, monospace" font-size="14" letter-spacing="3" fill="#E9C77A">DAVID</text><text x="262" y="44" font-family="Fragment Mono, monospace" font-size="12" letter-spacing="2" fill="#D08B7E">THE FLOOD</text></svg>'
    }
  },
  {
    slug: "the-first-48",
    kind: "story",
    type: "Data story",
    title: "The First 48",
    standout: "World Cup",
    sub: "For ninety-six years the World Cup grew one cautious step at a time. In 2026 it leaps to 48 teams across three nations — the biggest tournament football has ever staged. The shape of that leap.",
    href: "/the-first-48/",
    tags: ["Scrollytelling", "World Cup 2026"],
    date: "2026-06-13",
    accent: "#2E7D46",
    feature: true,
    art: {
      type: "svg",
      svg: '<svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" role="img" aria-hidden="true"><defs><linearGradient id="f48-bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0E2A1E"/><stop offset="1" stop-color="#12352A"/></linearGradient><radialGradient id="f48-glow" cx="89%" cy="6%" r="70%"><stop offset="0" stop-color="#FF6A3D" stop-opacity=".22"/><stop offset="1" stop-color="#FF6A3D" stop-opacity="0"/></radialGradient></defs><rect width="800" height="500" fill="url(#f48-bg)"/><g fill="#3FA15C" fill-opacity=".05"><rect x="0" width="100" height="500"/><rect x="200" width="100" height="500"/><rect x="400" width="100" height="500"/><rect x="600" width="100" height="500"/></g><rect width="800" height="300" fill="url(#f48-glow)"/><g stroke="#E9F0EA" stroke-opacity=".06"><line x1="40" y1="320" x2="760" y2="320"/><line x1="40" y1="210" x2="760" y2="210"/></g><line x1="40" y1="430" x2="760" y2="430" stroke="#E9F0EA" stroke-opacity=".12"/><g><rect x="70" y="340.6" width="44" height="89.4" rx="2" fill="#C9A86B"/><rect x="134" y="320" width="44" height="110" rx="2" fill="#C9A86B"/><rect x="198" y="320" width="44" height="110" rx="2" fill="#C9A86B"/><rect x="262" y="320" width="44" height="110" rx="2" fill="#C9A86B"/><rect x="326" y="265" width="44" height="165" rx="2" fill="#E0A93B"/><rect x="390" y="265" width="44" height="165" rx="2" fill="#E0A93B"/><rect x="454" y="210" width="44" height="220" rx="2" fill="#E0772E"/><rect x="518" y="210" width="44" height="220" rx="2" fill="#E0772E"/><rect x="582" y="210" width="44" height="220" rx="2" fill="#E0772E"/><rect x="646" y="210" width="44" height="220" rx="2" fill="#E0772E"/><rect x="710" y="100" width="44" height="330" rx="2" fill="#FF6A3D" style="filter:drop-shadow(0 0 9px rgba(255,106,61,.75))"/></g><text x="754" y="80" text-anchor="end" font-family="Anton, Bricolage Grotesque, sans-serif" font-size="58" font-weight="800" fill="#FF6A3D" style="filter:drop-shadow(0 2px 6px rgba(0,0,0,.5))">48</text><text x="70" y="464" font-family="monospace" font-size="13" letter-spacing="1.5" fill="#7FA890">1930 — 2026 · TEAMS</text></svg>'
    }
  },
  {
    slug: "escape-velocity",
    kind: "story",
    type: "Data story",
    title: "Escape Velocity",
    standout: "SpaceX",
    sub: "On 12 June 2026 SpaceX went public at $1.75 trillion — and 4,400 of its own employees, from welders to cafeteria cooks, woke up millionaires. A scrollytelling anatomy of the launch.",
    href: "/escape-velocity/",
    tags: ["Scrollytelling", "Markets"],
    date: "2026-06-13",
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
    standout: "Diesel vs Petrol",
    sub: "Britain’s two pumps moved as one for twenty years. Then, in spring 2026, the gap hit a record 34p a litre. The story of the gap.",
    href: "/the-diesel-premium/",
    tags: ["Scrollytelling", "MakeoverMonday ’26"],
    date: "2026-06-10",
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
    standout: "Coachella",
    sub: "How Coachella’s lineup quietly shrank 22% after the pandemic, and why it wasn’t for lack of space.",
    href: "/three-days-in-the-desert/",
    tags: ["Scrollytelling", "MakeoverMonday ’26"],
    date: "2026-06-10",
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
    standout: "Ready Player One",
    sub: "Every cameo and Easter egg across the Ready Player One novel and film — on the story beats they share, with a toggle to watch the adaptation swap one set of references for another.",
    href: "/ready-player-one/",
    tags: ["Network", "Book vs Film"],
    date: "2026-06-13",
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
    date: "2026-07-01",
    accent: "#1F77B4"
    // art omitted → branded placeholder tile is drawn automatically
  }
  ---------------------------------------------------------- */
];
