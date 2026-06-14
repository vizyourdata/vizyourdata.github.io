/* Escape Velocity — SpaceX IPO data
   ------------------------------------------------------------------
   Figures as reported around SpaceX's Nasdaq debut (ticker SPCX),
   priced 11 Jun 2026, first trade 12 Jun 2026.

   ascent  : SpaceX's valuation over 24 years. Early points are the
             marks set at successive private financing rounds; the
             final point is the IPO — 555.6M shares at $135 ≈ $1.75T.
             Round marks are widely-reported approximations; the IPO
             mark is the offering price. Log scale — a straight-ish
             climb on a log axis IS exponential growth.
   pop     : opening day. Two real numbers — priced at $135 the night
             before, first trades near $161 (~+19%). No invented
             intraday squiggle; just the jump.
   waffle  : 22,000 employees. ~4,400 (1 in 5) clear $1M on paper;
             ~400 of those clear $100M. Each dot = 100 people.
   versus  : Musk's rocket company (≈$1.75T) is now worth more than
             his car company (Tesla ≈$1.6T).

   Sources are listed in the page footer. Swap any array for a live
   pull later — the page reads only from CHARTS / FIGS.            */

const IPO_MARK = { x: 2026.45, label: 'IPO · $1.75T' };

window.CHARTS = {

  // THE FLIGHT PATH — valuation, log scale, blasting to $1.75T
  ascent: {
    label: 'SpaceX valuation', unit: 'private rounds → IPO · USD (log scale)',
    note: 'each step a financing round · IPO at $135/share ≈ $1.75 trillion',
    xmin: 2002, xmax: 2026.8, xticks: [2004, 2010, 2016, 2022, 2026], log: true,
    ymin: 0.1, ymax: 2000, yfmt: 'usdb',
    markers: [IPO_MARK],
    series: [{ color: 'var(--flame)', area: true, points: [
      [2002, 0.1], [2008, 1], [2012, 2.4], [2015, 12], [2017, 21], [2019, 33],
      [2020, 46], [2021, 100], [2022, 127], [2023, 137], [2024, 350], [2025, 400],
      [2026.45, 1750]
    ]}],
  },

};

window.FIGS = {

  // OPENING DAY — the pop. Two real numbers, honest gap.
  pop: {
    unit: 'USD per share · first day',
    open:  { label: 'Priced',      v: 135, note: 'the night before' },
    close: { label: 'First trades', v: 161, note: 'minutes after the open' },
    delta: '+$26 · +19%',
  },

  // ONE IN FIVE — 22,000 dots of 100; the lit ones woke up rich
  waffle: {
    total: 22000, per: 100, cols: 20,
    tiers: [
      { n: 400,  cls: 'ultra', label: '≈ 400 clear $100M+' },
      { n: 4400, cls: 'mill',  label: '≈ 4,400 clear $1M  ·  1 in 5' },
    ],
    restLabel: '22,000 employees',
  },

  // BIGGER THAN THE CARS — rocket co. vs car co.
  versus: {
    unit: 'company value · USD trillions',
    bars: [
      { label: 'SpaceX', sub: 'rocket company · at IPO', v: 1.75, cls: 'flame' },
      { label: 'Tesla',  sub: 'car company · market cap', v: 1.60, cls: 'tel'   },
    ],
    foot: '$1.75T would rank SpaceX ≈ 7th among US public companies — its first day.',
  },

};
