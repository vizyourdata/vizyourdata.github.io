/* The Longest Chain — chart data
   Block height + BTC supply are computed from Bitcoin's real schedule (≈exact).
   Hashrate, price, fees, tx/day are correctly-shaped, illustrative anchors —
   swap the points arrays for live API pulls (mempool.space / blockchain.com) later.
   Points are [x = year(decimal), y = value]. Halvings:
     50→25  block 210,000  2012-11-28  (2012.91)
     25→12.5  block 420,000  2016-07-09  (2016.52)
     12.5→6.25  block 630,000  2020-05-11  (2020.36)
     6.25→3.125  block 840,000  2024-04-20  (2024.30)            */

const HALVINGS = [
  { x: 2012.91, label: '25' },
  { x: 2016.52, label: '12.5' },
  { x: 2020.36, label: '6.25' },
  { x: 2024.30, label: '3.125' },
];

window.CHARTS = {

  // 01 · THE BLOCK — block height climbing over time (near-exact)
  height: {
    label: 'Block height', unit: 'blocks since the 2009 genesis', note: 'near-exact · ~6 blocks / hour',
    xmin: 2009, xmax: 2026.6, xticks: [2010, 2014, 2018, 2022, 2026],
    ymin: 0, ymax: 1000000, yfmt: 'compact',
    series: [{ color: 'var(--btc)', area: true, points: [
      [2009,0],[2010,32000],[2011,100000],[2012,160000],[2013,214000],[2014,278000],
      [2015,337000],[2016,392000],[2017,447000],[2018,502000],[2019,557000],[2020,611000],
      [2021,665000],[2022,718000],[2023,770000],[2024,823000],[2025,877000],[2026,931000],[2026.4,950000]
    ]}],
  },

  // 02 · MINING — network hashrate (illustrative, log)
  hashrate: {
    label: 'Network hashrate', unit: 'exahashes / second (log scale)', note: 'illustrative shape',
    xmin: 2011, xmax: 2026.4, xticks: [2012, 2016, 2020, 2024], log: true,
    ymin: 0.01, ymax: 1000, yfmt: 'ehs',
    series: [{ color: 'var(--btc)', area: true, points: [
      [2011,0.01],[2012,0.02],[2013,0.06],[2014,0.3],[2015,0.5],[2016,1.6],[2017,6],
      [2018,40],[2019,55],[2020,120],[2021,150],[2022,230],[2023,400],[2024,620],[2025,800],[2026,900]
    ]}],
  },

  // 03 · DIFFICULTY — average block time hugging the 10-minute target
  blocktime: {
    label: 'Average block time', unit: 'minutes per block', note: 'difficulty holds the pulse near 10 min',
    xmin: 2010, xmax: 2026.4, xticks: [2012, 2016, 2020, 2024],
    ymin: 8, ymax: 11, yfmt: 'min',
    refs: [{ y: 10, label: '10-min target' }],
    series: [{ color: 'var(--btc)', area: false, points: [
      [2010,9.0],[2011,8.7],[2012,9.2],[2013,8.9],[2014,9.3],[2015,9.6],[2016,9.5],[2017,9.2],
      [2018,9.7],[2019,9.6],[2020,9.5],[2021,9.7],[2022,9.8],[2023,9.6],[2024,9.7],[2025,9.6],[2026,9.6]
    ]}],
  },

  // 04 · THE HALVING — cumulative BTC mined approaching the 21M cap (exact schedule)
  supply: {
    label: 'Bitcoin mined', unit: 'BTC in existence', note: 'exact schedule · capped forever',
    xmin: 2009, xmax: 2026.6, xticks: [2010, 2014, 2018, 2022, 2026],
    ymin: 0, ymax: 21400000, yfmt: 'btc', yticksv: [0, 5000000, 10000000, 15000000, 20000000],
    refs: [{ y: 21000000, label: '21M cap' }],
    markers: HALVINGS,
    series: [{ color: 'var(--btc)', area: true, points: [
      [2009,0],[2010,1600000],[2011,5000000],[2012,8000000],[2013,10650000],[2014,12200000],
      [2015,13700000],[2016,15200000],[2017,16100000],[2018,16800000],[2019,17500000],[2020,18200000],
      [2021,18600000],[2022,19000000],[2023,19300000],[2024,19600000],[2025,19800000],[2026,19950000]
    ]}],
  },

  // 05 · THE MARKET — price, log, with halvings marked (illustrative)
  price: {
    label: 'Price', unit: 'USD per BTC (log scale)', note: 'illustrative · each halving leads a cycle',
    xmin: 2010, xmax: 2026.4, xticks: [2012, 2016, 2020, 2024], log: true,
    ymin: 0.1, ymax: 100000, yfmt: 'usd',
    markers: HALVINGS.map(h => ({ x: h.x, label: '½' })),
    series: [{ color: 'var(--btc)', area: false, points: [
      [2010,0.1],[2011,5],[2012,13],[2013,750],[2014,320],[2015,430],[2016,960],[2017,13000],
      [2018,3700],[2019,7200],[2020,29000],[2021,47000],[2022,16500],[2023,42000],[2024,94000],[2025,97000],[2026,99000]
    ]}],
  },

  // 06 · FEES — average fee per transaction, spiky (illustrative)
  fees: {
    label: 'Average fee', unit: 'USD per transaction', note: 'spikes = blocks full, mempool backed up',
    xmin: 2013, xmax: 2026.3, xticks: [2014, 2017, 2020, 2023, 2026],
    ymin: 0, ymax: 30, yfmt: 'usd2',
    series: [{ color: 'var(--btc)', area: true, points: [
      [2013,0.05],[2014,0.07],[2015,0.1],[2016,0.3],[2017,1.2],[2017.9,28],[2018.2,1.5],[2019,0.4],
      [2020,0.7],[2021.2,9],[2021.6,2],[2022,1.2],[2023,1.5],[2023.5,7],[2024,3],[2024.3,16],[2024.7,2.2],[2025,1.8],[2026,1.6]
    ]}],
  },

  // 07 · USES — transactions per day (illustrative)
  txs: {
    label: 'Transactions', unit: 'per day', note: 'spikes = inscriptions / runes data',
    xmin: 2010, xmax: 2026.4, xticks: [2012, 2016, 2020, 2024],
    ymin: 0, ymax: 760000, yfmt: 'compact',
    series: [{ color: 'var(--btc)', area: true, points: [
      [2010,1000],[2011,6000],[2012,22000],[2013,55000],[2014,75000],[2015,120000],[2016,230000],
      [2017,300000],[2017.9,400000],[2018,230000],[2019,330000],[2020,310000],[2021,250000],[2022,240000],
      [2023,400000],[2023.5,600000],[2024,500000],[2024.2,730000],[2024.7,470000],[2025,400000],[2026,430000]
    ]}],
  },

};
