/* ============================================================
   The First 48 · data
   ------------------------------------------------------------
   One global, WC. All figures read from here. Every number is
   sourced in the page footer; populations are rounded estimates
   and read as orders of magnitude, not census decimals.
   ============================================================ */
window.WC = {

  /* ---- CH I · the field, tournament by tournament ----
     n = teams that actually took part (withdrawals included:
     1938 played 15, 1950 played 13). Format sizes were
     16 (1934–78) · 24 (1982–94) · 32 (1998–2022) · 48 (2026). */
  field: [
    {y:1930,n:13},{y:1934,n:16},{y:1938,n:15},{y:1950,n:13},
    {y:1954,n:16},{y:1958,n:16},{y:1962,n:16},{y:1966,n:16},
    {y:1970,n:16},{y:1974,n:16},{y:1978,n:16},
    {y:1982,n:24},{y:1986,n:24},{y:1990,n:24},{y:1994,n:24},
    {y:1998,n:32},{y:2002,n:32},{y:2006,n:32},{y:2010,n:32},
    {y:2014,n:32},{y:2018,n:32},{y:2022,n:32},
    {y:2026,n:48}
  ],
  /* the three times the format itself stepped up */
  expansions: [
    {y:1982, from:16, to:24, add:8,  who:'the 24-team era'},
    {y:1998, from:24, to:32, add:8,  who:'the 32-team era'},
    {y:2026, from:32, to:48, add:16, who:'forty-eight'}
  ],

  /* ---- CH II · who got the seats ----
     final number of qualified nations per confederation.
     2022 = 32 teams · 2026 = 48 teams. Two of 2026's places
     were settled at the March 2026 intercontinental play-offs. */
  confeds: [
    {code:'UEFA',     reg:'Europe',        c22:13, c26:16, col:'#2660A4'},
    {code:'CAF',      reg:'Africa',        c22:5,  c26:10, col:'#C8401F'},
    {code:'AFC',      reg:'Asia',          c22:6,  c26:9,  col:'#7A5BA6'},
    {code:'CONMEBOL', reg:'South America', c22:4,  c26:6,  col:'#1F8A5B'},
    {code:'CONCACAF', reg:'N. & C. America',c22:4, c26:6,  col:'#2A9D8F'},
    {code:'OFC',      reg:'Oceania',       c22:0,  c26:1,  col:'#C8922B'}
  ],

  /* ---- CH III · the four debutants ----
     pop = rounded national population estimate. */
  debutants: [
    {code:'CW', name:'Curaçao',    confed:'CONCACAF', pop:156000,   note:'smallest nation ever to qualify'},
    {code:'CV', name:'Cape Verde', confed:'CAF',      pop:525000,   note:'second-smallest ever · island nation'},
    {code:'JO', name:'Jordan',     confed:'AFC',      pop:11300000, note:'first World Cup'},
    {code:'UZ', name:'Uzbekistan', confed:'AFC',      pop:36400000, note:'first Central Asian nation'}
  ],
  /* the record they broke: smallest qualifier before 2026 */
  prevSmall: {name:'Iceland', y:2018, pop:335000},

  /* ---- CH IV · three hosts, sixteen cities ----
     lat/lon of each host venue's metro. country drives colour. */
  hosts: [
    {city:'Vancouver',     cc:'CAN', lat:49.28, lon:-123.11},
    {city:'Seattle',       cc:'USA', lat:47.59, lon:-122.33},
    {city:'San Francisco', cc:'USA', lat:37.40, lon:-121.97},
    {city:'Los Angeles',   cc:'USA', lat:33.95, lon:-118.34},
    {city:'Guadalajara',   cc:'MEX', lat:20.68, lon:-103.46},
    {city:'Monterrey',     cc:'MEX', lat:25.67, lon:-100.24},
    {city:'Mexico City',   cc:'MEX', lat:19.43, lon:-99.13},
    {city:'Kansas City',   cc:'USA', lat:39.05, lon:-94.48},
    {city:'Dallas',        cc:'USA', lat:32.75, lon:-97.08},
    {city:'Houston',       cc:'USA', lat:29.68, lon:-95.41},
    {city:'Atlanta',       cc:'USA', lat:33.75, lon:-84.39},
    {city:'Miami',         cc:'USA', lat:25.96, lon:-80.24},
    {city:'Toronto',       cc:'CAN', lat:43.63, lon:-79.42},
    {city:'Philadelphia',  cc:'USA', lat:39.90, lon:-75.17},
    {city:'New York NJ',   cc:'USA', lat:40.81, lon:-74.07},
    {city:'Boston',        cc:'USA', lat:42.09, lon:-71.26}
  ],
  hostCol: {USA:'#2660A4', MEX:'#1F8A5B', CAN:'#C8401F'},
  hostName:{USA:'United States', MEX:'Mexico', CAN:'Canada'},
  hostCount:{USA:11, MEX:3, CAN:2},

  /* ---- CH V · bigger, longer, more ----
     headline counts, 2022 → 2026. */
  growth: [
    {label:'Teams',        a:32, b:48},
    {label:'Matches',      a:64, b:104},
    {label:'Days',         a:29, b:39},
    {label:'Groups of 4',  a:8,  b:12}
  ]
};
