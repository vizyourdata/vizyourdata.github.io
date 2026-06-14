/* ============================================================
   data.js — "The Egg Hunt" reference catalog.
   ------------------------------------------------------------
   Every pop-culture reference, cameo, vehicle and prop in
   Ready Player One (2018, dir. Spielberg), keyed to the scene
   it appears in and the year the referenced thing was made.

   MODEL — a bipartite graph:
     • refs link to the SCENES they appear in (not to each other)
     • a scene becomes a constellation hub; a ref that recurs
       across scenes (DeLorean, Take On Me, Iron Giant) bridges them
     • timeline axis  = ref.year   (when the thing was made)
     • runtime axis   = scene.order (where it lands in the film)

   SOURCING — scene placement cross-referenced against Den of
   Geek's complete guide + ScreenRant's cameo list. Origin years
   are canonical debut dates, hand-corrected where the listicles
   were wrong (Galaga is 1981 not 1979; Asteroids 1979; Atari
   "Adventure" 1980). prom = prominence: 3 plot-critical · 2
   featured on screen · 1 background cameo.
   ============================================================ */
(function () {
  "use strict";

  /* ---------- the medium taxonomy (drives node colour) ---------- */
  var mediums = [
    { id: "game",  label: "Video game",  color: "#5BE5A0" }, // OASIS green
    { id: "film",  label: "Film",        color: "#FFB454" }, // marquee amber
    { id: "tv",    label: "Television",  color: "#46D5E8" }, // CRT cyan
    { id: "anime", label: "Anime",       color: "#FF6FB5" }, // mecha pink
    { id: "music", label: "Music",       color: "#B98BFF" }, // synth violet
    { id: "comic", label: "Comics",      color: "#FF6A5A" }, // four-colour red
    { id: "toy",   label: "Toys & games",color: "#FFD86B" }, // plastic yellow
    { id: "hw",    label: "Hardware",    color: "#9AA6C4" }  // grey-steel
  ];

  /* ---------- the film as an ordered runtime axis ---------- */
  /* order = position along the movie; act = 1·setup 2·hunt 3·war */
  var scenes = [
    { id: "oasis",    order: 1,  act: 1, name: "Welcome to the OASIS",   blurb: "Wade’s tour of the simulation — climb Everest with Batman, drop into a hundred franchises at once." },
    { id: "doom",     order: 2,  act: 1, name: "Planet Doom",            blurb: "The combat planet — slashers and shooters trading fire in the background." },
    { id: "funeral",  order: 3,  act: 1, name: "Halliday’s Funeral",     blurb: "The creator is laid to rest the only way he’d want — as a Starfleet send-off." },
    { id: "race",     order: 4,  act: 1, name: "The Copper Key Race",    blurb: "A demolition-derby sprint through Manhattan past Kong and a T-rex, won by driving backwards." },
    { id: "garage",   order: 5,  act: 1, name: "Aech’s Garage",          blurb: "A hangar-museum of every dream vehicle ever filmed, where the Iron Giant waits in pieces." },
    { id: "archive",  order: 6,  act: 2, name: "The Halliday Archive",   blurb: "The Journals — a walk-through memory palace of one man’s obsessions, poster by poster." },
    { id: "shop",     order: 7,  act: 2, name: "Gearing Up",             blurb: "Avatar shopping — armour, artifacts, and a very small grenade from Antioch." },
    { id: "globe",    order: 8,  act: 2, name: "The Distracted Globe",   blurb: "The zero-gravity nightclub date — Saturday-night strut to New Order." },
    { id: "shining",  order: 9,  act: 2, name: "The Overlook Hotel",     blurb: "The Jade Key hides inside Kubrick’s Shining — Room 237, the twins, the maze." },
    { id: "ioi",      order: 10, act: 2, name: "IOI & the Sixers",       blurb: "Sorrento’s corporate war room, and a pop-quiz on the things Halliday loved." },
    { id: "stacks",   order: 11, act: 2, name: "The Stacks",             blurb: "Out in the real world — a tower-trailer slum, and an a-ha music video made flesh." },
    { id: "battle",   order: 12, act: 3, name: "Battle of Castle Anorak",blurb: "Every player in the OASIS storms Planet Doom at once — the densest frame in the film." },
    { id: "egg",      order: 13, act: 3, name: "The Easter Egg",         blurb: "The third gate is an Atari 2600 and the secret is the first secret ever hidden in a game." },
    { id: "home",     order: 14, act: 3, name: "Wade Wins",              blurb: "The OASIS handed over — and powered down two days a week." }
  ];

  /* ---------- the catalogue ---------- */
  /* m = medium · y = origin year · s = scenes it appears in · p = prominence */
  var refs = [
    // --- Welcome to the OASIS ---
    { id:"batman",     name:"Batman (Keaton)",          m:"comic", y:1989, s:["oasis"],            p:2, note:"Climbs Everest alongside Wade in the tour; Keaton’s 1989 design." },
    { id:"robocop",    name:"RoboCop",                  m:"film",  y:1987, s:["oasis","garage"],   p:1, note:"Loiters in the OASIS plaza; ED-209 also looms in Aech’s garage." },
    { id:"marvin",     name:"Marvin the Martian",       m:"film",  y:1948, s:["oasis"],            p:1, note:"Looney Tunes Martian wandering the entrance plaza." },
    { id:"hellokitty", name:"Hello Kitty",              m:"toy",   y:1974, s:["oasis"],            p:1, note:"Sanrio cameo in the opening sprawl." },
    { id:"minecraft",  name:"Minecraft",                m:"game",  y:2011, s:["oasis"],            p:1, note:"A blocky world is one of the OASIS planets." },
    { id:"flash",      name:"The Flash",                m:"comic", y:1940, s:["oasis"],            p:1, note:"Speeds through the entrance plaza crowd." },

    // --- Planet Doom ---
    { id:"freddy",     name:"Freddy Krueger",           m:"film",  y:1984, s:["doom","battle"],    p:1, note:"A Nightmare on Elm Street; fights on the combat planet." },
    { id:"jason",      name:"Jason Voorhees",           m:"film",  y:1980, s:["doom","battle"],    p:1, note:"Friday the 13th slasher swinging in the melee." },
    { id:"duke",       name:"Duke Nukem",               m:"game",  y:1991, s:["doom","battle"],    p:1, note:"Spotted blasting through Planet Doom." },
    { id:"voltron",    name:"Voltron",                  m:"anime", y:1984, s:["doom","battle"],    p:2, note:"The lion-mech assembles for the final charge." },

    // --- Halliday's Funeral ---
    { id:"spock",      name:"Spock’s coffin",           m:"film",  y:1982, s:["funeral"],          p:2, note:"The Wrath of Khan torpedo-casket; Halliday’s Trek send-off." },
    { id:"enterprise", name:"USS Enterprise",           m:"tv",    y:1966, s:["funeral"],          p:1, note:"Star Trek iconography across the funeral set." },

    // --- The Copper Key Race ---
    { id:"delorean",   name:"DeLorean",                 m:"film",  y:1985, s:["race","garage"],    p:3, note:"Back to the Future time machine — Parzival’s ride, with a KITT scanner grafted on." },
    { id:"kitt",       name:"KITT",                     m:"tv",    y:1982, s:["race"],             p:1, note:"Knight Rider’s red scanner bar across the DeLorean’s nose." },
    { id:"kong",       name:"King Kong",                m:"film",  y:1933, s:["race"],             p:3, note:"Tears the racetrack apart at the halfway mark." },
    { id:"trex",       name:"T. rex",                   m:"film",  y:1993, s:["race"],             p:2, note:"Jurassic Park predator charging the racers." },
    { id:"akira",      name:"Kaneda’s bike",            m:"anime", y:1988, s:["race"],             p:2, note:"Art3mis rides the Akira motorcycle through the race." },
    { id:"gah",        name:"Greatest American Hero",   m:"tv",    y:1981, s:["race"],             p:1, note:"The show’s emblem on Art3mis’s bike." },
    { id:"speedracer", name:"Mach Five",                m:"anime", y:1967, s:["race"],             p:1, note:"Speed Racer’s car on the course." },
    { id:"bigfoot",    name:"Bigfoot monster truck",    m:"toy",   y:1979, s:["race"],             p:1, note:"Aech’s monster truck in the demolition sprint." },

    // --- Aech's Garage ---
    { id:"irongiant",  name:"The Iron Giant",           m:"film",  y:1999, s:["garage","battle"],  p:3, note:"Built in the garage; Aech pilots it into the final war." },
    { id:"sulaco",     name:"USS Sulaco",               m:"film",  y:1986, s:["garage"],           p:1, note:"Aliens dropship hanging in the rafters." },
    { id:"eagle5",     name:"Eagle 5",                  m:"film",  y:1987, s:["garage"],           p:1, note:"The Winnebago starship from Spaceballs." },
    { id:"ed209",      name:"ED-209",                   m:"film",  y:1987, s:["garage"],           p:1, note:"RoboCop’s enforcement droid on display." },
    { id:"ferrari",    name:"Ferrari 250 GT",           m:"film",  y:1986, s:["garage","ioi"],     p:2, note:"Ferris Bueller’s borrowed Ferrari; the film resurfaces in the Sixer quiz." },
    { id:"evapod",     name:"EVA Pod",                  m:"film",  y:1968, s:["garage"],           p:1, note:"2001: A Space Odyssey pod, ‘open the doors’ and all." },
    { id:"valleyforge",name:"Valley Forge",             m:"film",  y:1972, s:["garage"],           p:1, note:"Silent Running’s greenhouse freighter." },
    { id:"thunderftr", name:"Thunderfighter",           m:"tv",    y:1979, s:["garage"],           p:1, note:"Buck Rogers in the 25th Century fighter." },
    { id:"swordfish",  name:"Swordfish II",             m:"anime", y:1998, s:["garage"],           p:1, note:"Spike’s ship from Cowboy Bebop." },
    { id:"viper",      name:"Colonial Viper",           m:"tv",    y:1978, s:["garage"],           p:1, note:"Battlestar Galactica fighter parked in the bay." },
    { id:"peewee",     name:"Pee-wee’s bike",           m:"film",  y:1985, s:["garage"],           p:1, note:"The most-wanted bicycle in cinema." },
    { id:"tardis",     name:"The TARDIS",               m:"tv",    y:1963, s:["garage"],           p:1, note:"Doctor Who’s blue box tucked in a corner." },
    { id:"madmax",     name:"Mad Max Interceptor",      m:"film",  y:1979, s:["garage"],           p:1, note:"Pursuit Special poster/car in the workshop." },

    // --- The Halliday Archive ---
    { id:"galaga",     name:"Galaga",                   m:"game",  y:1981, s:["archive"],          p:2, note:"Cabinet/poster in the Journals — a Halliday touchstone." },
    { id:"rush2112",   name:"Rush — 2112",              m:"music", y:1976, s:["archive"],          p:2, note:"The album’s red star on Halliday’s wall." },
    { id:"spaceinv",   name:"Space Invaders",           m:"game",  y:1978, s:["archive"],          p:1, note:"On a t-shirt in the memory archive." },
    { id:"asteroids",  name:"Asteroids",                m:"game",  y:1979, s:["archive"],          p:1, note:"One of Halliday’s perfect games." },
    { id:"dnd",        name:"Dungeons & Dragons",       m:"toy",   y:1974, s:["archive","battle"], p:2, note:"Gygax’s game — modules and dice thread through the hunt." },
    { id:"raiders",    name:"Raiders of the Lost Ark",  m:"film",  y:1981, s:["archive"],          p:1, note:"Poster in Halliday’s bedroom." },
    { id:"wargames",   name:"WarGames / IMSAI 8080",    m:"film",  y:1983, s:["archive"],          p:2, note:"The home computer that taught a generation to hack." },
    { id:"buggles",    name:"Video Killed the Radio Star", m:"music", y:1979, s:["archive"],       p:1, note:"The Buggles — Halliday’s stated favourite song." },
    { id:"takeonme",   name:"Take On Me",               m:"music", y:1985, s:["archive","stacks"], p:3, note:"a-ha’s video — Halliday’s favourite, then restaged as a real-world chase." },
    { id:"whipit",     name:"Devo — Whip It",           m:"music", y:1980, s:["archive"],          p:1, note:"Energy-dome Devo on the archive wall." },
    { id:"lostinspace",name:"Robot B-9",                m:"tv",    y:1965, s:["archive"],          p:1, note:"Lost in Space robot among the childhood toys." },
    { id:"simon",      name:"Simon",                    m:"toy",   y:1978, s:["archive"],          p:1, note:"Milton Bradley’s memory game as a lapel pin." },
    { id:"robby",      name:"Robby the Robot",          m:"film",  y:1956, s:["archive"],          p:1, note:"Forbidden Planet’s robot, a recurring deep cut." },
    { id:"tff",        name:"Everybody Wants to Rule the World", m:"music", y:1985, s:["archive","oasis"], p:1, note:"Tears for Fears scores the opening glide." },

    // --- Gearing Up ---
    { id:"hhg",        name:"Holy Hand Grenade",        m:"film",  y:1975, s:["shop","battle"],    p:2, note:"Monty Python and the Holy Grail — bought, then thrown." },
    { id:"beetlejuice",name:"Beetlejuice",              m:"film",  y:1988, s:["shop","globe"],     p:1, note:"The ghost-with-the-most as a rentable avatar." },
    { id:"zemeckis",   name:"The Zemeckis Cube",        m:"film",  y:1985, s:["shop","battle"],    p:2, note:"Artifact that rewinds time 60 seconds — named for the BTTF director." },

    // --- The Distracted Globe ---
    { id:"stayinalive",name:"Stayin’ Alive",            m:"music", y:1977, s:["globe"],            p:2, note:"Saturday Night Fever strut onto the dance floor." },
    { id:"buckaroo",   name:"Buckaroo Banzai",          m:"film",  y:1984, s:["globe"],            p:1, note:"Parzival’s date-night outfit." },
    { id:"joker",      name:"The Joker",                m:"comic", y:1940, s:["globe","battle"],   p:1, note:"Among the club’s costumed dancers." },
    { id:"harley",     name:"Harley Quinn",             m:"comic", y:1992, s:["globe","battle"],   p:1, note:"Partying at the Globe beside the Joker." },
    { id:"bluemonday", name:"Blue Monday",              m:"music", y:1983, s:["globe"],            p:2, note:"New Order’s track drives the zero-g dance." },
    { id:"thriller",   name:"Thriller",                 m:"music", y:1983, s:["globe"],            p:1, note:"Michael Jackson’s red-jacket look in the wardrobe." },
    { id:"purplerain", name:"Purple Rain",              m:"music", y:1984, s:["globe"],            p:1, note:"A Prince costume option for the date." },

    // --- The Overlook Hotel ---
    { id:"shining",    name:"The Shining",              m:"film",  y:1980, s:["shining"],          p:3, note:"The entire Jade Key gate is Kubrick’s Overlook — Room 237, the twins, the hedge maze." },

    // --- IOI & the Sixers ---
    { id:"breakfast",  name:"The Breakfast Club",       m:"film",  y:1985, s:["ioi"],              p:1, note:"Hughes trivia in the Sixer loyalty centre." },
    { id:"fasttimes",  name:"Fast Times at Ridgemont High", m:"film", y:1982, s:["ioi"],           p:1, note:"More 80s-teen canon Sorrento has to fake." },
    { id:"thefly",     name:"The Fly",                  m:"film",  y:1986, s:["ioi"],              p:1, note:"The wrong answer in Sorrento’s favourite-film bluff." },
    { id:"sayanything",name:"Say Anything…",            m:"film",  y:1989, s:["ioi","battle"],    p:1, note:"Boombox-over-the-head, paid off later in the war." },
    { id:"superman",   name:"Superman (Lex quote)",     m:"film",  y:1978, s:["ioi","oasis"],      p:1, note:"Halliday’s favourite line lifted from Donner’s Superman." },
    { id:"wotw",       name:"War of the Worlds tripod", m:"film",  y:1953, s:["ioi"],              p:1, note:"The martian war-machine looming over IOI." },

    // --- The Stacks ---
    { id:"joydivision",name:"Joy Division",             m:"music", y:1979, s:["stacks"],           p:1, note:"Unknown Pleasures shirt on Samantha." },
    { id:"transam",    name:"Trans Am (Bandit)",        m:"film",  y:1977, s:["stacks"],           p:1, note:"Smokey and the Bandit firebird as Shoto’s car." },

    // --- Battle of Castle Anorak ---
    { id:"mechagodzilla",name:"Mechagodzilla",          m:"film",  y:1974, s:["battle"],           p:3, note:"Sorrento’s kaiju — the final boss, scored to the Godzilla march." },
    { id:"gundam",     name:"RX-78-2 Gundam",           m:"anime", y:1979, s:["battle"],           p:3, note:"Daito becomes the original mobile suit for the last stand." },
    { id:"chucky",     name:"Chucky",                   m:"film",  y:1988, s:["battle"],           p:2, note:"The Child’s Play doll is flung into the IOI ranks." },
    { id:"tracer",     name:"Tracer (Overwatch)",       m:"game",  y:2016, s:["battle"],           p:2, note:"Blink-dashing across the front line." },
    { id:"masterchief",name:"Master Chief (Halo)",      m:"game",  y:2001, s:["battle"],           p:2, note:"Spartans hold the wall on Planet Doom." },
    { id:"battletoads",name:"Battletoads",              m:"game",  y:1991, s:["battle"],           p:1, note:"Rash, Zitz and Pimple lead a charge." },
    { id:"tmnt",       name:"Teenage Mutant Ninja Turtles", m:"comic", y:1984, s:["battle"],       p:1, note:"All four turtles join the assault." },
    { id:"spawn",      name:"Spawn",                    m:"comic", y:1992, s:["battle"],           p:1, note:"McFarlane’s antihero in the crowd." },
    { id:"chunli",     name:"Chun-Li",                  m:"game",  y:1991, s:["battle"],           p:1, note:"Street Fighter II fighter trading blows." },
    { id:"ryu",        name:"Ryu",                      m:"game",  y:1987, s:["battle","race"],    p:1, note:"Throws a Hadouken in the melee." },
    { id:"goro",       name:"Goro",                     m:"game",  y:1992, s:["battle"],           p:1, note:"Mortal Kombat’s four-armed Shokan." },
    { id:"bigdaddy",   name:"Big Daddy (BioShock)",     m:"game",  y:2007, s:["battle"],           p:1, note:"Rapture’s diver lumbering through the line." },
    { id:"gears",      name:"Gears of War Lancer",      m:"game",  y:2006, s:["battle"],           p:1, note:"Art3mis wields the chainsaw rifle." },
    { id:"starcraft",  name:"StarCraft Marines",        m:"game",  y:1998, s:["battle"],           p:1, note:"Terran marines in the ground war." },
    { id:"krull",      name:"The Glaive (Krull)",       m:"film",  y:1983, s:["battle"],           p:1, note:"The five-pointed throwing blade." },
    { id:"excalibur",  name:"Excalibur — Charm of Making", m:"film", y:1981, s:["battle"],         p:1, note:"The dragon-summoning spell, spoken aloud." },
    { id:"serenity",   name:"Serenity (Firefly)",       m:"tv",    y:2002, s:["battle"],           p:1, note:"Firefly-class ship makes the entrance." },
    { id:"twisted",    name:"We’re Not Gonna Take It",  m:"music", y:1984, s:["battle"],           p:2, note:"Twisted Sister rallies the players to fight." },
    { id:"heman",      name:"He-Man",                   m:"tv",    y:1983, s:["battle"],           p:1, note:"Masters of the Universe hero in the throng." },
    { id:"catwoman",   name:"Catwoman",                 m:"comic", y:1940, s:["battle"],           p:1, note:"Among the costumed combatants." },
    { id:"mariokart",  name:"Mario Kart",               m:"game",  y:1992, s:["battle"],           p:1, note:"Aech name-checks it mid-fight." },
    { id:"quake",      name:"Quake",                    m:"game",  y:1996, s:["battle"],           p:1, note:"id Software’s rail gun in Parzival’s hands." },

    // --- The Easter Egg ---
    { id:"adventure",  name:"Adventure (Atari 2600)",   m:"game",  y:1980, s:["egg","archive"],    p:3, note:"The third gate IS the game — and the secret is the first Easter egg ever hidden in software." },
    { id:"atari2600",  name:"Atari 2600",               m:"hw",    y:1977, s:["egg","archive"],    p:3, note:"The wood-grain console that holds the final test." },

    // --- Wade Wins ---
    { id:"revengemars",name:"Revenge from Mars",        m:"toy",   y:1999, s:["home"],             p:1, note:"Pinball table in Wade and Samantha’s loft." },
    { id:"batleth",    name:"Bat’leth",                 m:"tv",    y:1991, s:["home"],             p:1, note:"Klingon blade mounted on the wall." }
  ];

  /* ---------- derived: scene → refs, and the year span ---------- */
  var byScene = {};
  scenes.forEach(function (sc) { byScene[sc.id] = []; });
  refs.forEach(function (r) {
    r.s.forEach(function (sid) { if (byScene[sid]) byScene[sid].push(r.id); });
  });

  var years = refs.map(function (r) { return r.y; });
  var yearMin = Math.min.apply(null, years);   // 1933, King Kong
  var yearMax = Math.max.apply(null, years);   // 2016, Overwatch

  window.RPO = {
    mediums: mediums,
    scenes: scenes,
    refs: refs,
    byScene: byScene,
    yearMin: yearMin,
    yearMax: yearMax,
    counts: { refs: refs.length, scenes: scenes.length }
  };
})();
