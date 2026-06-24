/* ============================================================
   data.js — "The Egg Hunt" reference catalog.
   ------------------------------------------------------------
   Every pop-culture reference, cameo, vehicle and prop in
   Ready Player One — across BOTH versions:
     • Ernest Cline's 2011 novel
     • Steven Spielberg's 2018 film

   SHARED-BEATS MODEL — the two versions tell the same story on
   the same skeleton, but fill each beat with different culture
   (the film swapped most of the three Gates and the final-battle
   robots). So references are keyed to ~14 STORY BEATS both
   versions share, not to one version's runtime. Divergent
   challenges live in the SAME beat — The Shining [film] sits in
   "The Second Gate" beside Zork and Blade Runner [book] — which
   is exactly where the adaptation's swaps become visible.

   Each ref carries:
     m   medium (drives colour)
     y   year the referenced thing was made (canonical debut)
     s   the story beats it appears in
     p   prominence: 3 plot-critical · 2 featured · 1 cameo
     src "movie" · "book" · "both"

   SOURCING — film placements cross-referenced against Den of
   Geek + ScreenRant frame breakdowns; book references from the
   novel's text; years hand-corrected where guides slipped
   (Galaga 1981, Asteroids 1979, Atari "Adventure" 1980).
   ============================================================ */
(function () {
  "use strict";

  /* ---------- the medium taxonomy (drives node colour) ---------- */
  var mediums = [
    { id: "game",  label: "Video game",  color: "#5BE5A0" },
    { id: "film",  label: "Film",        color: "#FFB454" },
    { id: "tv",    label: "Television",  color: "#46D5E8" },
    { id: "anime", label: "Anime",       color: "#FF6FB5" },
    { id: "music", label: "Music",       color: "#B98BFF" },
    { id: "comic", label: "Comics",      color: "#FF6A5A" },
    { id: "toy",   label: "Toys & games",color: "#FFD86B" },
    { id: "hw",    label: "Hardware",    color: "#9AA6C4" }
  ];

  /* ---------- the two versions (drives the toggle) ---------- */
  var versions = [
    { id: "movie", label: "Film",  sub: "2018" },
    { id: "book",  label: "Novel", sub: "2011" },
    { id: "both",  label: "Both",  sub: "overlap" }
  ];

  /* ---------- the shared story skeleton (the runtime axis) ---------- */
  /* order = position along the story; act = 1 setup · 2 hunt · 3 war */
  var scenes = [
    { id: "oasis",   order: 1,  act: 1, name: "Into the OASIS",      blurb: "The simulation itself — the hub world both versions tour before the hunt begins." },
    { id: "contest", order: 2,  act: 1, name: "Halliday’s Contest",  blurb: "The creator dies and wills his fortune to whoever finds the egg. The film stages it as a Star-Trek funeral." },
    { id: "gate1",   order: 3,  act: 1, name: "The First Gate",      blurb: "The Copper Key. The novel hides it in the Tomb of Horrors and a flawless run of WarGames; the film swaps in a backwards demolition race through Manhattan." },
    { id: "garage",  order: 4,  act: 1, name: "Aech’s Workshop",     blurb: "A hangar of borrowed machines — the film’s museum of dream vehicles, where the Iron Giant waits in pieces." },
    { id: "archive", order: 5,  act: 2, name: "The Halliday Archive",blurb: "Studying the dead man’s obsessions: the games, shows and records he never grew out of." },
    { id: "shop",    order: 6,  act: 2, name: "Gearing Up",          blurb: "Avatar shopping — armour, artifacts, and a very small grenade from Antioch." },
    { id: "globe",   order: 7,  act: 2, name: "The Distracted Globe",blurb: "The zero-gravity nightclub date the film builds for Wade and Art3mis." },
    { id: "gate2",   order: 8,  act: 2, name: "The Second Gate",     blurb: "The Jade Key. The novel runs it through Zork and the Tyrell Building; the film rebuilds Kubrick’s Overlook Hotel instead." },
    { id: "ioi",     order: 9,  act: 2, name: "IOI & the Sixers",    blurb: "The corporate enemy farming the contest — and a pop-quiz on everything Halliday loved." },
    { id: "realworld",order:10, act: 2, name: "The Real World",      blurb: "Out of the headset: the Stacks, the stakes, and an a-ha video made flesh." },
    { id: "gate3",   order: 11, act: 3, name: "The Third Gate",      blurb: "The Crystal Key — where the two versions run closest: Rush’s 2112, the power of three, and Anorak’s castle." },
    { id: "battle",  order: 12, act: 3, name: "The Final Battle",    blurb: "Every player storms the castle at once. The giant robots differ: Iron Giant and Mechagodzilla in the film, Ultraman and Leopardon in the book." },
    { id: "egg",     order: 13, act: 3, name: "The Easter Egg",      blurb: "The prize is an Atari 2600 and the first secret ever hidden in a game: the hidden room in Adventure." },
    { id: "ending",  order: 14, act: 3, name: "The Ending",         blurb: "The OASIS handed over — and powered down two days a week." }
  ];

  /* ---------- the catalogue ---------- */
  var refs = [
    // ===== Into the OASIS =====
    { id:"batman",     name:"Batman (Keaton)",          m:"comic", y:1989, s:["oasis"],            p:2, src:"movie", note:"Climbs Everest with Wade in the film’s tour; Keaton’s 1989 design." },
    { id:"robocop",    name:"RoboCop",                  m:"film",  y:1987, s:["oasis","garage"],   p:1, src:"movie", note:"Loiters in the OASIS plaza; ED-209 also looms in Aech’s garage." },
    { id:"marvin",     name:"Marvin the Martian",       m:"film",  y:1948, s:["oasis"],            p:1, src:"movie", note:"Looney Tunes Martian wandering the entrance plaza." },
    { id:"hellokitty", name:"Hello Kitty",              m:"toy",   y:1974, s:["oasis"],            p:1, src:"movie", note:"Sanrio cameo in the opening sprawl." },
    { id:"minecraft",  name:"Minecraft",                m:"game",  y:2011, s:["oasis"],            p:1, src:"movie", note:"A blocky world is one of the OASIS planets." },
    { id:"flash",      name:"The Flash",                m:"comic", y:1940, s:["oasis"],            p:1, src:"movie", note:"Speeds through the entrance plaza crowd." },
    { id:"starwars",   name:"Star Wars",                m:"film",  y:1977, s:["oasis","battle"],   p:2, src:"both",  note:"Padawan talk, the Falcon and troopers in the film; woven through the OASIS in the book." },
    { id:"tff",        name:"Everybody Wants to Rule the World", m:"music", y:1985, s:["oasis","archive"], p:1, src:"movie", note:"Tears for Fears scores the opening glide." },

    // ===== Halliday's Contest =====
    { id:"spock",      name:"Spock’s coffin",           m:"film",  y:1982, s:["contest"],          p:2, src:"movie", note:"The Wrath of Khan torpedo-casket; Halliday’s Trek send-off." },
    { id:"enterprise", name:"USS Enterprise",           m:"tv",    y:1966, s:["contest"],          p:1, src:"movie", note:"Star Trek iconography across the funeral set." },
    { id:"heathers",   name:"Heathers",                 m:"film",  y:1988, s:["contest"],          p:1, src:"movie", note:"The funeral staging echoes the film." },

    // ===== The First Gate (Copper Key) =====
    { id:"tombhorrors",name:"Tomb of Horrors",          m:"toy",   y:1978, s:["gate1"],            p:3, src:"book",  note:"Gygax’s D&D module — where the novel hides the Copper Key." },
    { id:"acererak",   name:"Acererak",                 m:"toy",   y:1978, s:["gate1"],            p:2, src:"book",  note:"The demilich Parzival beats at Joust to win the key." },
    { id:"daggorath",  name:"Dungeons of Daggorath",    m:"game",  y:1982, s:["gate1"],            p:2, src:"book",  note:"The TRS-80 game played in a recreated Middletown." },
    { id:"wargames",   name:"WarGames",                 m:"film",  y:1983, s:["gate1","archive"],  p:3, src:"both",  note:"Parzival reenacts the whole film to clear the First Gate (book); the IMSAI 8080 sits in the film’s archive." },
    { id:"delorean",   name:"DeLorean",                 m:"film",  y:1985, s:["gate1","garage"],   p:3, src:"both",  note:"Back to the Future time machine — Parzival’s ride in both, with a KITT scanner grafted on." },
    { id:"kitt",       name:"KITT",                     m:"tv",    y:1982, s:["gate1","garage"],   p:1, src:"both",  note:"Knight Rider’s red scanner bar across the DeLorean’s nose." },
    { id:"kong",       name:"King Kong",                m:"film",  y:1933, s:["gate1"],            p:3, src:"movie", note:"Tears the racetrack apart at the halfway mark." },
    { id:"trex",       name:"T. rex",                   m:"film",  y:1993, s:["gate1"],            p:2, src:"movie", note:"Jurassic Park predator charging the racers." },
    { id:"akira",      name:"Kaneda’s bike",            m:"anime", y:1988, s:["gate1"],            p:2, src:"movie", note:"Art3mis rides the Akira motorcycle through the race." },
    { id:"gah",        name:"Greatest American Hero",   m:"tv",    y:1981, s:["gate1"],            p:1, src:"movie", note:"The show’s emblem on Art3mis’s bike." },
    { id:"speedracer", name:"Mach Five",                m:"anime", y:1967, s:["gate1"],            p:1, src:"movie", note:"Speed Racer’s car on the course." },
    { id:"bigfoot",    name:"Bigfoot monster truck",    m:"toy",   y:1979, s:["gate1"],            p:1, src:"movie", note:"Aech’s monster truck in the demolition sprint." },
    { id:"christine",  name:"Christine",                m:"film",  y:1983, s:["gate1"],            p:1, src:"movie", note:"King’s killer Plymouth Fury in the race pack." },
    { id:"ateam",      name:"The A-Team van",           m:"tv",    y:1983, s:["gate1"],            p:1, src:"movie", note:"The GMC van weaving through the racers." },
    { id:"batmobile66",name:"1966 Batmobile",           m:"tv",    y:1966, s:["gate1"],            p:1, src:"movie", note:"Adam West’s Lincoln Futura on the track." },
    { id:"poleposition",name:"Pole Position",           m:"game",  y:1982, s:["gate1"],            p:1, src:"movie", note:"The arcade racer nodded to in the race." },
    { id:"joust",      name:"Joust",                    m:"game",  y:1982, s:["gate1","battle"],   p:2, src:"both",  note:"Parzival duels Acererak at it (book); flapping avatars in the film." },

    // ===== Aech's Workshop =====
    { id:"irongiant",  name:"The Iron Giant",           m:"film",  y:1999, s:["garage","battle"],  p:3, src:"movie", note:"Built in the garage; Aech pilots it into the final war." },
    { id:"sulaco",     name:"USS Sulaco",               m:"film",  y:1986, s:["garage"],           p:1, src:"movie", note:"Aliens dropship hanging in the rafters." },
    { id:"eagle5",     name:"Eagle 5",                  m:"film",  y:1987, s:["garage"],           p:1, src:"movie", note:"The Winnebago starship from Spaceballs." },
    { id:"ed209",      name:"ED-209",                   m:"film",  y:1987, s:["garage"],           p:1, src:"movie", note:"RoboCop’s enforcement droid on display." },
    { id:"ferrari",    name:"Ferrari 250 GT",           m:"film",  y:1986, s:["garage","ioi"],     p:2, src:"movie", note:"Ferris Bueller’s borrowed Ferrari; the film resurfaces in the Sixer quiz." },
    { id:"evapod",     name:"EVA Pod",                  m:"film",  y:1968, s:["garage"],           p:1, src:"movie", note:"2001: A Space Odyssey pod, ‘open the doors’ and all." },
    { id:"valleyforge",name:"Valley Forge",             m:"film",  y:1972, s:["garage"],           p:1, src:"movie", note:"Silent Running’s greenhouse freighter." },
    { id:"thunderftr", name:"Thunderfighter",           m:"tv",    y:1979, s:["garage"],           p:1, src:"movie", note:"Buck Rogers in the 25th Century fighter." },
    { id:"swordfish",  name:"Swordfish II",             m:"anime", y:1998, s:["garage"],           p:1, src:"movie", note:"Spike’s ship from Cowboy Bebop." },
    { id:"viper",      name:"Colonial Viper",           m:"tv",    y:1978, s:["garage"],           p:1, src:"movie", note:"Battlestar Galactica fighter parked in the bay." },
    { id:"peewee",     name:"Pee-wee’s bike",           m:"film",  y:1985, s:["garage"],           p:1, src:"movie", note:"The most-wanted bicycle in cinema." },
    { id:"tardis",     name:"The TARDIS",               m:"tv",    y:1963, s:["garage"],           p:1, src:"both",  note:"Doctor Who’s blue box, a recurring nod in both." },
    { id:"madmax",     name:"Mad Max Interceptor",      m:"film",  y:1979, s:["garage"],           p:1, src:"movie", note:"Pursuit Special in the workshop." },
    { id:"ghostbusters",name:"Ghostbusters",            m:"film",  y:1984, s:["garage","gate1"],   p:1, src:"both",  note:"Logo and gear in the film; the DeLorean’s ‘ECTO’ plate in the book." },

    // ===== The Halliday Archive =====
    { id:"galaga",     name:"Galaga",                   m:"game",  y:1981, s:["archive"],          p:2, src:"both",  note:"A Halliday touchstone — cabinet/poster in the film, arcade lore in the book." },
    { id:"spaceinv",   name:"Space Invaders",           m:"game",  y:1978, s:["archive"],          p:1, src:"both",  note:"On a t-shirt in the film; among the book’s revered arcades." },
    { id:"asteroids",  name:"Asteroids",                m:"game",  y:1979, s:["archive"],          p:1, src:"both",  note:"One of Halliday’s perfect games." },
    { id:"dnd",        name:"Dungeons & Dragons",       m:"toy",   y:1974, s:["archive","gate1"],  p:2, src:"both",  note:"Gygax’s game threads the whole hunt — modules, dice, Anorak’s robe." },
    { id:"raiders",    name:"Raiders of the Lost Ark",  m:"film",  y:1981, s:["archive"],          p:1, src:"movie", note:"Poster in Halliday’s bedroom." },
    { id:"buggles",    name:"Video Killed the Radio Star", m:"music", y:1979, s:["archive"],       p:1, src:"movie", note:"The Buggles — Halliday’s stated favourite song." },
    { id:"takeonme",   name:"Take On Me",               m:"music", y:1985, s:["archive","realworld"], p:3, src:"movie", note:"a-ha’s video — Halliday’s favourite, then restaged as a real-world chase." },
    { id:"whipit",     name:"Devo — Whip It",           m:"music", y:1980, s:["archive"],          p:1, src:"movie", note:"Energy-dome Devo on the archive wall." },
    { id:"lostinspace",name:"Robot B-9",                m:"tv",    y:1965, s:["archive"],          p:1, src:"movie", note:"Lost in Space robot among the childhood toys." },
    { id:"simon",      name:"Simon",                    m:"toy",   y:1978, s:["archive"],          p:1, src:"movie", note:"Milton Bradley’s memory game as a lapel pin." },
    { id:"robby",      name:"Robby the Robot",          m:"film",  y:1956, s:["archive"],          p:1, src:"movie", note:"Forbidden Planet’s robot, a recurring deep cut." },
    { id:"tempest",    name:"Tempest",                  m:"game",  y:1981, s:["archive"],          p:1, src:"book",  note:"Among the vector arcades Halliday venerated." },
    { id:"digdug",     name:"Dig Dug",                  m:"game",  y:1982, s:["archive"],          p:1, src:"book",  note:"Named among the OASIS arcades in the novel." },
    { id:"defender",   name:"Defender",                 m:"game",  y:1981, s:["archive"],          p:1, src:"book",  note:"A Williams classic in the book’s arcade canon." },
    { id:"centipede",  name:"Centipede",                m:"game",  y:1981, s:["archive"],          p:1, src:"book",  note:"Among the cabinets gunters study." },
    { id:"sinistar",   name:"Sinistar",                 m:"game",  y:1982, s:["archive"],          p:1, src:"book",  note:"‘Beware, I live!’ — a book-era arcade deep cut." },
    { id:"robotron",   name:"Robotron 2084",            m:"game",  y:1982, s:["archive"],          p:1, src:"book",  note:"Twin-stick chaos in the novel’s arcade lore." },
    { id:"swarcade",   name:"Star Wars (Atari arcade)", m:"game",  y:1983, s:["archive"],          p:1, src:"book",  note:"The vector X-wing trench run, a book name-drop." },
    { id:"familyties", name:"Family Ties",              m:"tv",    y:1982, s:["archive"],          p:1, src:"book",  note:"An ’80s sitcom Halliday obsessed over (book)." },
    { id:"silverspoons",name:"Silver Spoons",           m:"tv",    y:1982, s:["archive"],          p:1, src:"book",  note:"More ’80s sitcom canon memorised in the novel." },
    { id:"realgenius", name:"Real Genius",              m:"film",  y:1985, s:["archive"],          p:1, src:"book",  note:"One of the novel’s ’80s film touchstones." },
    { id:"weirdscience",name:"Weird Science",           m:"film",  y:1985, s:["archive"],          p:1, src:"book",  note:"Hughes sci-fi comedy in the book’s canon." },
    { id:"goonies",    name:"The Goonies",              m:"film",  y:1985, s:["archive"],          p:1, src:"book",  note:"A treasure-hunt touchstone in the novel." },
    { id:"trs80",      name:"TRS-80",                   m:"hw",    y:1977, s:["archive"],          p:1, src:"book",  note:"Vintage hardware the novel venerates (and runs Daggorath)." },
    { id:"commodore64",name:"Commodore 64",             m:"hw",    y:1982, s:["archive"],          p:1, src:"book",  note:"The home computer a generation of gunters grew up on." },

    // ===== Gearing Up =====
    { id:"hhg",        name:"Holy Hand Grenade",        m:"film",  y:1975, s:["shop","battle"],    p:2, src:"both",  note:"Monty Python and the Holy Grail — bought, then thrown, in both." },
    { id:"beetlejuice",name:"Beetlejuice",              m:"film",  y:1988, s:["shop","globe"],     p:1, src:"movie", note:"The ghost-with-the-most as a rentable avatar." },
    { id:"zemeckis",   name:"The Zemeckis Cube",        m:"film",  y:1985, s:["shop","battle"],    p:2, src:"movie", note:"Artifact that rewinds 60 seconds — named for the BTTF director." },

    // ===== The Distracted Globe =====
    { id:"stayinalive",name:"Stayin’ Alive",            m:"music", y:1977, s:["globe"],            p:2, src:"movie", note:"Saturday Night Fever strut onto the dance floor." },
    { id:"buckaroo",   name:"Buckaroo Banzai",          m:"film",  y:1984, s:["globe"],            p:1, src:"movie", note:"Parzival’s date-night outfit." },
    { id:"joker",      name:"The Joker",                m:"comic", y:1940, s:["globe","battle"],   p:1, src:"movie", note:"Among the club’s costumed dancers." },
    { id:"harley",     name:"Harley Quinn",             m:"comic", y:1992, s:["globe","battle"],   p:1, src:"movie", note:"Partying at the Globe beside the Joker." },
    { id:"bluemonday", name:"Blue Monday",              m:"music", y:1983, s:["globe"],            p:2, src:"movie", note:"New Order’s track drives the zero-g dance." },
    { id:"thriller",   name:"Thriller",                 m:"music", y:1983, s:["globe"],            p:1, src:"movie", note:"Michael Jackson’s red-jacket look in the wardrobe." },
    { id:"purplerain", name:"Purple Rain",              m:"music", y:1984, s:["globe"],            p:1, src:"movie", note:"A Prince costume option for the date." },

    // ===== The Second Gate (Jade Key) =====
    { id:"shining",    name:"The Shining",              m:"film",  y:1980, s:["gate2"],            p:3, src:"movie", note:"The film’s entire Jade gate is Kubrick’s Overlook — Room 237, the twins, the maze." },
    { id:"zork",       name:"Zork",                     m:"game",  y:1980, s:["gate2"],            p:3, src:"book",  note:"The novel’s Jade Key: solve the Infocom text adventure on planet Frobozz." },
    { id:"bladerunner",name:"Blade Runner",             m:"film",  y:1982, s:["gate2","oasis"],    p:2, src:"both",  note:"The book’s Second Gate is the Tyrell Building (Voight-Kampff, the unicorn); its cityscape colours the film’s OASIS." },
    { id:"pacman",     name:"Pac-Man",                  m:"game",  y:1980, s:["gate2","garage"],   p:2, src:"both",  note:"A perfect game wins the magic quarter (book); a cocktail cabinet sits in the garage (film)." },
    { id:"blacktiger", name:"Black Tiger",              m:"game",  y:1987, s:["gate2"],            p:1, src:"book",  note:"The Capcom arcade game cleared from a first-person view at the Second Gate." },
    { id:"capncrunch", name:"Cap’n Crunch whistle",     m:"toy",   y:1971, s:["gate2"],            p:2, src:"book",  note:"The 2600-Hz phreaking whistle that transforms into the Jade Key." },
    { id:"darkcrystal",name:"The Dark Crystal",         m:"film",  y:1982, s:["gate2"],            p:1, src:"both",  note:"Halliday’s crush ‘Kira’ is named for the film; the novel leans on its fantasy." },

    // ===== IOI & the Sixers =====
    { id:"breakfast",  name:"The Breakfast Club",       m:"film",  y:1985, s:["ioi"],              p:1, src:"both",  note:"Hughes trivia in the Sixer loyalty centre; revered in the novel." },
    { id:"fasttimes",  name:"Fast Times at Ridgemont High", m:"film", y:1982, s:["ioi"],           p:1, src:"both",  note:"More ’80s-teen canon Sorrento has to fake." },
    { id:"sixteen",    name:"Sixteen Candles",          m:"film",  y:1984, s:["ioi"],              p:1, src:"both",  note:"Part of the Hughes canon Halliday memorised." },
    { id:"thefly",     name:"The Fly",                  m:"film",  y:1986, s:["ioi"],              p:1, src:"movie", note:"The wrong answer in Sorrento’s favourite-film bluff." },
    { id:"sayanything",name:"Say Anything…",            m:"film",  y:1989, s:["ioi","battle"],    p:1, src:"movie", note:"Boombox-over-the-head, paid off later in the war." },
    { id:"superman",   name:"Superman (Lex quote)",     m:"film",  y:1978, s:["ioi","oasis"],      p:1, src:"movie", note:"Halliday’s favourite line lifted from Donner’s Superman." },
    { id:"wotw",       name:"War of the Worlds tripod", m:"film",  y:1953, s:["ioi"],              p:1, src:"movie", note:"The martian war-machine looming over IOI." },

    // ===== The Real World =====
    { id:"joydivision",name:"Joy Division",             m:"music", y:1979, s:["realworld"],        p:1, src:"movie", note:"Unknown Pleasures shirt on Samantha." },
    { id:"transam",    name:"Trans Am (Bandit)",        m:"film",  y:1977, s:["realworld"],        p:1, src:"movie", note:"Smokey and the Bandit firebird as Shoto’s car." },

    // ===== The Third Gate (Crystal Key) =====
    { id:"rush2112",   name:"Rush — 2112",              m:"music", y:1976, s:["gate3","archive"],  p:3, src:"both",  note:"The album’s red star is the Crystal Key reward; the planet is Syrinx." },
    { id:"schoolhouse",name:"Schoolhouse Rock!",        m:"tv",    y:1973, s:["gate3"],            p:2, src:"both",  note:"‘Three Is a Magic Number’ — the power-of-three clue needing three players." },
    { id:"adventure",  name:"Adventure (Atari 2600)",   m:"game",  y:1980, s:["gate3","egg"],      p:3, src:"both",  note:"The final challenge — and the first Easter egg ever hidden in software." },

    // ===== The Final Battle =====
    { id:"mechagodzilla",name:"Mechagodzilla",          m:"film",  y:1974, s:["battle"],           p:3, src:"both",  note:"The villain’s kaiju in both — scored to the Godzilla march in the film." },
    { id:"ultraman",   name:"Ultraman",                 m:"tv",    y:1966, s:["battle"],            p:3, src:"book",  note:"Parzival uses the Beta Capsule to become Ultraman against Mechagodzilla (book)." },
    { id:"leopardon",  name:"Leopardon",                m:"tv",    y:1978, s:["battle"],            p:2, src:"book",  note:"Daito’s mecha, from Toei’s Japanese Spider-Man series (book)." },
    { id:"gundam",     name:"RX-78-2 Gundam",           m:"anime", y:1979, s:["battle"],            p:3, src:"movie", note:"Daito becomes the original mobile suit for the film’s last stand." },
    { id:"voltron",    name:"Voltron",                  m:"anime", y:1984, s:["battle"],            p:2, src:"both",  note:"The lion-mech assembles for the charge; central to the book’s anime lore." },
    { id:"chucky",     name:"Chucky",                   m:"film",  y:1988, s:["battle"],            p:2, src:"movie", note:"The Child’s Play doll is flung into the IOI ranks." },
    { id:"freddy",     name:"Freddy Krueger",           m:"film",  y:1984, s:["battle"],            p:1, src:"movie", note:"A Nightmare on Elm Street slasher in the melee." },
    { id:"jason",      name:"Jason Voorhees",           m:"film",  y:1980, s:["battle"],            p:1, src:"movie", note:"Friday the 13th killer swinging through the fight." },
    { id:"tracer",     name:"Tracer (Overwatch)",       m:"game",  y:2016, s:["battle"],            p:2, src:"movie", note:"Blink-dashing across the front line." },
    { id:"masterchief",name:"Master Chief (Halo)",      m:"game",  y:2001, s:["battle"],            p:2, src:"movie", note:"Spartans hold the wall on Planet Doom." },
    { id:"battletoads",name:"Battletoads",              m:"game",  y:1991, s:["battle"],            p:1, src:"movie", note:"Rash, Zitz and Pimple lead a charge." },
    { id:"duke",       name:"Duke Nukem",               m:"game",  y:1991, s:["battle"],            p:1, src:"movie", note:"Blasting through the combat planet." },
    { id:"tmnt",       name:"Teenage Mutant Ninja Turtles", m:"comic", y:1984, s:["battle"],       p:1, src:"movie", note:"All four turtles join the assault." },
    { id:"spawn",      name:"Spawn",                    m:"comic", y:1992, s:["battle"],            p:1, src:"movie", note:"McFarlane’s antihero in the crowd." },
    { id:"chunli",     name:"Chun-Li",                  m:"game",  y:1991, s:["battle"],            p:1, src:"movie", note:"Street Fighter II fighter trading blows." },
    { id:"ryu",        name:"Ryu",                      m:"game",  y:1987, s:["battle","gate1"],    p:1, src:"movie", note:"Throws a Hadouken in the melee." },
    { id:"goro",       name:"Goro",                     m:"game",  y:1992, s:["battle"],            p:1, src:"movie", note:"Mortal Kombat’s four-armed Shokan." },
    { id:"bigdaddy",   name:"Big Daddy (BioShock)",     m:"game",  y:2007, s:["battle"],            p:1, src:"movie", note:"Rapture’s diver lumbering through the line." },
    { id:"gears",      name:"Gears of War Lancer",      m:"game",  y:2006, s:["battle"],            p:1, src:"movie", note:"Art3mis wields the chainsaw rifle." },
    { id:"starcraft",  name:"StarCraft Marines",        m:"game",  y:1998, s:["battle"],            p:1, src:"movie", note:"Terran marines in the ground war." },
    { id:"krull",      name:"The Glaive (Krull)",       m:"film",  y:1983, s:["battle"],            p:1, src:"both",  note:"The five-pointed throwing blade — book ’80s-fantasy canon." },
    { id:"excalibur",  name:"Excalibur — Charm of Making", m:"film", y:1981, s:["battle"],         p:1, src:"both",  note:"The dragon-summoning spell, spoken aloud." },
    { id:"serenity",   name:"Serenity (Firefly)",       m:"tv",    y:2002, s:["battle"],            p:1, src:"movie", note:"Firefly-class ship makes the entrance." },
    { id:"twisted",    name:"We’re Not Gonna Take It",  m:"music", y:1984, s:["battle"],            p:2, src:"movie", note:"Twisted Sister rallies the players to fight." },
    { id:"heman",      name:"He-Man",                   m:"tv",    y:1983, s:["battle"],            p:1, src:"movie", note:"Masters of the Universe hero in the throng." },
    { id:"catwoman",   name:"Catwoman",                 m:"comic", y:1940, s:["battle"],            p:1, src:"movie", note:"Among the costumed combatants." },
    { id:"mariokart",  name:"Mario Kart",               m:"game",  y:1992, s:["battle"],            p:1, src:"movie", note:"Aech name-checks it mid-fight." },
    { id:"quake",      name:"Quake",                    m:"game",  y:1996, s:["battle"],            p:1, src:"movie", note:"id Software’s rail gun in Parzival’s hands." },

    // ===== The Easter Egg =====
    { id:"atari2600",  name:"Atari 2600",               m:"hw",    y:1977, s:["egg","archive"],    p:3, src:"both",  note:"The wood-grain console that holds the final test." },

    // ===== The Ending =====
    { id:"revengemars",name:"Revenge from Mars",        m:"toy",   y:1999, s:["ending"],           p:1, src:"movie", note:"Pinball table in Wade and Samantha’s loft." },
    { id:"batleth",    name:"Bat’leth",                 m:"tv",    y:1991, s:["ending"],            p:1, src:"movie", note:"Klingon blade mounted on the wall." }
  ];

  /* ---------- derived: beat → refs, year span, version counts ---------- */
  var byScene = {};
  scenes.forEach(function (sc) { byScene[sc.id] = []; });
  refs.forEach(function (r) {
    r.s.forEach(function (sid) { if (byScene[sid]) byScene[sid].push(r.id); });
  });

  var years = refs.map(function (r) { return r.y; });
  var yearMin = Math.min.apply(null, years);
  var yearMax = Math.max.apply(null, years);

  function inVersion(r, v) { return v === "both" ? true : (r.src === v || r.src === "both"); }
  var versionCounts = {
    movie: refs.filter(function (r) { return inVersion(r, "movie"); }).length,
    book:  refs.filter(function (r) { return inVersion(r, "book"); }).length,
    both:  refs.length,
    onlyMovie: refs.filter(function (r) { return r.src === "movie"; }).length,
    onlyBook:  refs.filter(function (r) { return r.src === "book"; }).length,
    shared:    refs.filter(function (r) { return r.src === "both"; }).length
  };

  window.RPO = {
    mediums: mediums,
    versions: versions,
    scenes: scenes,
    refs: refs,
    byScene: byScene,
    yearMin: yearMin,
    yearMax: yearMax,
    versionCounts: versionCounts,
    counts: { refs: refs.length, scenes: scenes.length }
  };
})();
