/* ============================================================
   The Book of Begats · data
   ------------------------------------------------------------
   One global, BEGAT. The single Sankey figure reads everything
   from here. Names, ages and links follow the King James /
   Masoretic text; every chapter is sourced in the page footer.

   Ages are AS THE TEXT RECORDS THEM (Genesis 5 & 11, Masoretic
   numbers — the Septuagint and Samaritan texts differ). Band
   thickness in the figure is schematic: it shows how many
   distinct lines the chart is following at a point, not
   population or number of descendants.
   ============================================================ */
window.BEGAT = {

  /* ---- I · the line of Seth (Genesis 5) ----
     Adam → Noah. The chosen son each generation, with the
     famous recorded ages. Enoch is "taken"; Methuselah is the
     oldest age in the Bible. */
  primeval: [
    {n:'Adam',      age:930, v:'Genesis 5:5',  meaning:'“man” · the first man'},
    {n:'Seth',      age:912, v:'Genesis 5:8',  meaning:'set in Abel’s place'},
    {n:'Enosh',     age:905, v:'Genesis 5:11', meaning:'“mortal”'},
    {n:'Kenan',     age:910, v:'Genesis 5:14'},
    {n:'Mahalalel', age:895, v:'Genesis 5:17'},
    {n:'Jared',     age:962, v:'Genesis 5:20'},
    {n:'Enoch',     age:365, v:'Genesis 5:23', meaning:'walked with God, and was not — God took him'},
    {n:'Methuselah',age:969, v:'Genesis 5:27', meaning:'the oldest age in scripture'},
    {n:'Lamech',    age:777, v:'Genesis 5:31'},
    {n:'Noah',      age:950, v:'Genesis 9:29', meaning:'“rest” · the survivor of the Flood'}
  ],

  /* ---- III/IV · Shem → Abraham (Genesis 11) ----
     Post-Flood chosen line. Eber is where Joktan branches away
     to Arabia; Peleg is "for in his days was the earth divided".
     Terah is Abraham's father. Abraham listed in patriarchs[]. */
  shemLine: [
    {n:'Shem',     age:600, v:'Genesis 11:11', meaning:'eldest son of Noah'},
    {n:'Arphaxad', age:438, v:'Genesis 11:13'},
    {n:'Shelah',   age:433, v:'Genesis 11:15'},
    {n:'Eber',     age:464, v:'Genesis 11:17', meaning:'root of the name “Hebrew”', branch:'Joktan'},
    {n:'Peleg',    age:239, v:'Genesis 11:19', meaning:'“in his days was the earth divided”'},
    {n:'Reu',      age:239, v:'Genesis 11:21'},
    {n:'Serug',    age:230, v:'Genesis 11:23'},
    {n:'Nahor',    age:148, v:'Genesis 11:25'},
    {n:'Terah',    age:205, v:'Genesis 11:32', meaning:'father of Abraham'}
  ],

  /* ---- II · the three sons of Noah → the Table of Nations
     (Genesis 10). `count` = number of sons named in Genesis 10,
     used to size the fan. Names compressed to bundles. */
  noahSons: [
    {n:'Japheth', kind:'nations', count:7, sons:['Gomer','Magog','Madai','Javan','Tubal','Meshech','Tiras'],
      label:'the maritime & northern nations'},
    {n:'Ham',     kind:'nations', count:4, sons:['Cush','Mizraim','Put','Canaan'],
      label:'Egypt, Cush, Babel & Canaan'},
    {n:'Shem',    kind:'chosen',  label:'the line of promise'}
  ],
  /* Eber's other son — the Joktanite tribes of Arabia */
  joktan:{ count:13, label:'Joktan · the tribes of Arabia', v:'Genesis 10:25–30' },

  /* ---- IV · the sons of Abraham (Genesis 16, 21, 25) ---- */
  abrahamSons: [
    {n:'Ishmael', kind:'branch', count:12, label:'twelve princes',        v:'Genesis 25:12–16'},
    {n:'Keturah', kind:'branch', count:6,  label:'Midian & the eastern peoples', v:'Genesis 25:1–4'},
    {n:'Isaac',   kind:'chosen', label:'the child of promise',            v:'Genesis 21:1–3'}
  ],
  /* ---- IV · the sons of Isaac (Genesis 25, 36) ---- */
  isaacSons: [
    {n:'Esau',  kind:'branch', count:8, label:'Edom · the dukes of Esau', v:'Genesis 36'},
    {n:'Jacob', kind:'chosen', label:'renamed Israel',                    v:'Genesis 32:28'}
  ],

  /* ---- VI · the twelve sons of Jacob → the tribes of Israel.
     `mom` = mother (Leah / Rachel / Bilhah Rachel's maid /
     Zilpah Leah's maid). Ordered here for the figure (Judah
     placed near the central spine), not by birth order. */
  tribes: [
    {n:'Reuben',  mom:'Leah',   v:'Genesis 29:32', note:'the firstborn'},
    {n:'Simeon',  mom:'Leah',   v:'Genesis 29:33'},
    {n:'Levi',    mom:'Leah',   v:'Genesis 29:34', note:'the priestly tribe — no land'},
    {n:'Issachar',mom:'Leah',   v:'Genesis 30:18'},
    {n:'Zebulun', mom:'Leah',   v:'Genesis 30:20'},
    {n:'Judah',   mom:'Leah',   v:'Genesis 29:35', note:'the royal line — the lion', chosen:true},
    {n:'Benjamin',mom:'Rachel', v:'Genesis 35:18', note:'the last-born'},
    {n:'Joseph',  mom:'Rachel', v:'Genesis 30:24', note:'→ Ephraim & Manasseh'},
    {n:'Dan',     mom:'Bilhah', v:'Genesis 30:6'},
    {n:'Naphtali',mom:'Bilhah', v:'Genesis 30:8'},
    {n:'Gad',     mom:'Zilpah', v:'Genesis 30:11'},
    {n:'Asher',   mom:'Zilpah', v:'Genesis 30:13'}
  ],
  moms:{
    Leah:  {col:'#1F5C92', note:'Leah'},
    Rachel:{col:'#C18B2C', note:'Rachel'},
    Bilhah:{col:'#6F7A39', note:'Bilhah · Rachel’s maid'},
    Zilpah:{col:'#B5566B', note:'Zilpah · Leah’s maid'}
  },

  /* ---- VII · Judah → David (Ruth 4:18–22 / 1 Chronicles 2:5–15).
     The gold thread. Notes mark the two famous mothers. */
  royal: [
    {n:'Judah'},
    {n:'Perez',    note:'by Tamar'},
    {n:'Hezron'},
    {n:'Ram'},
    {n:'Amminadab'},
    {n:'Nahshon',  note:'prince of Judah at Sinai'},
    {n:'Salmon'},
    {n:'Boaz',     note:'married Ruth'},
    {n:'Obed'},
    {n:'Jesse'},
    {n:'David',    note:'king of Israel'}
  ]
};
