# Builds the-pacific-plate/data.js from PDH.stat CSV extracts in ./data
# Re-run after re-pulling the CSVs from the SDMX API (see README in this folder).
import csv, json, os
from collections import defaultdict

HERE = os.path.dirname(os.path.abspath(__file__))
DATA = os.path.join(HERE, 'data')
OUT = os.path.normpath(os.path.join(HERE, '..', 'the-pacific-plate', 'data.js'))

NAMES = {
 'AS':'American Samoa','CK':'Cook Islands','FJ':'Fiji','FM':'Micronesia (FSM)','GU':'Guam',
 'KI':'Kiribati','MH':'Marshall Islands','MP':'N. Mariana Is.','NC':'New Caledonia','NR':'Nauru',
 'NU':'Niue','PF':'French Polynesia','PG':'Papua New Guinea','PN':'Pitcairn','PW':'Palau',
 'SB':'Solomon Islands','TK':'Tokelau','TO':'Tonga','TV':'Tuvalu','VU':'Vanuatu',
 'WF':'Wallis & Futuna','WS':'Samoa'}

cc = defaultdict(dict)  # (indicator, country) -> {year: value}
with open(os.path.join(DATA, 'climate_change.csv'), encoding='utf-8-sig') as f:
    for r in csv.DictReader(f):
        try:
            cc[(r['CLIMATE_CHANGE_INDICATORS'], r['GEO_PICT'])][int(r['TIME_PERIOD'])] = float(r['OBS_VALUE'])
        except (ValueError, KeyError):
            pass

def series(d, y0, y1, scale=1, nd=1):
    out = []
    for y in range(y0, y1 + 1):
        out.append(round(d[y] * scale, nd) if y in d else None)
    # trim trailing Nones
    while out and out[-1] is None: out.pop()
    return out

# ---- SST anomalies 1850-2025 ----
sst = {}
for (ind, c), d in cc.items():
    if ind == 'SST_ANOM' and c in NAMES and len(d) > 50:
        sst[c] = {'y0': 1850, 'v': series(d, 1850, 2025)}

# Pacific mean per year across available countries
pac = []
for y in range(1850, 2026):
    vals = [cc[('SST_ANOM', c)][y] for c in sst if y in cc[('SST_ANOM', c)]]
    pac.append(round(sum(vals) / len(vals), 3) if vals else None)
sst_pac = {'y0': 1850, 'v': pac}

# headline stat: countries whose single hottest year is >= 2015
hot_since = 0
for c in sst:
    d = cc[('SST_ANOM', c)]
    if max(d, key=lambda y: d[y]) >= 2015: hot_since += 1
print(f"SST: {hot_since} of {len(sst)} countries have record-hot year since 2015")

# Pacific mean: rank of recent years
ranked = sorted([(v, 1850 + i) for i, v in enumerate(pac) if v is not None], reverse=True)
print("Pacific-mean hottest 10:", [y for _, y in ranked[:10]])

# ---- Headline crop-yield index (for climate-impact overlay) ----
crop_idx = {}
for (ind, c), d in cc.items():
    if ind == 'CROP_YIELD' and c in NAMES and len(d) > 30:
        crop_idx[c] = {'y0': 1979, 'v': series(d, 1979, 2024, nd=0)}

# ---- Rainfall anomalies 1979-2025 ----
rain = {}
for (ind, c), d in cc.items():
    if ind == 'RAIN_ANOM' and c in NAMES and d:
        rain[c] = {'y0': 1979, 'v': series(d, 1979, 2025)}

# ---- Crops: TARO / BANAN / COCON full series + staple slopes ----
ag = defaultdict(dict)
with open(os.path.join(DATA, 'ag_production.csv'), encoding='utf-8-sig') as f:
    for r in csv.DictReader(f):
        if r['AGRICULTURE_PRODUCTION_TYPE'] == 'CROP_YIELD':
            try:
                ag[(r['AGRICULTURE_PRODUCTION_ITEM'], r['GEO_PICT'])][int(r['TIME_PERIOD'])] = float(r['OBS_VALUE'])
            except (ValueError, KeyError):
                pass

crops = {}
for item in ['TARO', 'BANAN', 'COCON']:
    crops[item] = {}
    for (it, c), d in ag.items():
        if it == item and c in NAMES and len(d) >= 30:
            crops[item][c] = {'y0': 1961, 'v': series(d, 1961, 2024, nd=0)}

slopes = []
for item in ['TARO', 'BANAN', 'COCON', 'CASS', 'SWPOT', 'YAMS']:
    for (it, c), d in ag.items():
        if it != item or c not in NAMES or len(d) < 30: continue
        e = [d[y] for y in range(1961, 1971) if y in d]
        l = [d[y] for y in range(2015, 2025) if y in d]
        if e and l:
            slopes.append({'item': item, 'c': c, 'e': round(sum(e)/len(e)), 'l': round(sum(l)/len(l))})

# ---- Water SDG 6.1.1 ----
w = defaultdict(dict)
with open(os.path.join(DATA, 'water_sdg.csv'), encoding='utf-8-sig') as f:
    for r in csv.DictReader(f):
        if r['SERIES'] == 'SH_H2O_SAFE' and r['REF_AREA'] in NAMES:
            try:
                w[(r['REF_AREA'], r['URBANISATION'])][int(r['TIME_PERIOD'])] = float(r['OBS_VALUE'])
            except (ValueError, KeyError):
                pass
water = {}
for (c, u), d in w.items():
    key = {'_T': 't', 'U': 'u', 'R': 'r'}.get(u)
    if not key or not d: continue
    water.setdefault(c, {})[key] = {'y0': 2000, 'v': series(d, 2000, 2024)}
water_missing = sorted(set(NAMES) - set(water) - {'PN'})
print("Water: have", sorted(water), "missing", water_missing)

# ---- Response: fisheries agreements + meteo network (inspect semantics) ----
for ind in ['FISH_MNGT_MULT_BILAT_ARGMT', 'METEO_MONITOR_NET']:
    sample = [(c, sorted(d.items())[-3:]) for (i, c), d in cc.items() if i == ind][:4]
    print(ind, 'sample:', sample)

fish = {}
for (ind, c), d in cc.items():
    if ind == 'FISH_MNGT_MULT_BILAT_ARGMT' and c in NAMES and d:
        fish[c] = d
# region-wide: per year, sum of latest-known value per country (forward fill)
fish_total = []
for y in range(1950, 2027):
    tot = 0
    for c, d in fish.items():
        prior = [v for yy, v in d.items() if yy <= y]
        latest = d.get(y, None)
        # values look cumulative per country; forward-fill the latest value at or before y
        keys = [yy for yy in d if yy <= y]
        if keys: tot += d[max(keys)]
    fish_total.append(round(tot))
print('fish_total 1950, 1990, 2026:', fish_total[0], fish_total[40], fish_total[-1])

out = {
    'names': NAMES,
    'sst': sst, 'sstPac': sst_pac,
    'rain': rain,
    'crops': crops, 'slopes': slopes, 'cropIdx': crop_idx,
    'water': water, 'waterMissing': water_missing,
    'fishTotal': {'y0': 1950, 'v': fish_total},
}
js = 'const PD=' + json.dumps(out, separators=(',', ':')) + ';\n'
os.makedirs(os.path.dirname(OUT), exist_ok=True)
with open(OUT, 'w', encoding='utf-8') as f:
    f.write(js)
print('wrote', OUT, f'{os.path.getsize(OUT)/1024:.0f} KB')
