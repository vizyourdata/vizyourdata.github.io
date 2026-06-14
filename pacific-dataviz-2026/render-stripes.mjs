// Renders stripes-anim.html to stripes-anim.mp4 / .gif + stripes-static.png.
// Deterministic: steps window.seek(t) frame by frame, so output is exact at any speed.
// Puppeteer is borrowed from the "VIDEO Render from HTML" project's node_modules.
//   node render-stripes.mjs
import { createRequire } from 'node:module';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { pathToFileURL } from 'node:url';
import path from 'node:path';
import fs from 'node:fs';
import os from 'node:os';

const HERE = import.meta.dirname;
const require = createRequire(path.join(HERE, '..', '..', 'VIDEO Render from HTML', 'package.json'));
const puppeteer = require('puppeteer');

const FPS = 30;
const HTML = path.join(HERE, 'stripes-anim.html');
const FRAMES = fs.mkdtempSync(path.join(os.tmpdir(), 'stripes-'));
const MP4 = path.join(HERE, 'stripes-anim.mp4');
const GIF = path.join(HERE, 'stripes-anim.gif');
const PNG = path.join(HERE, 'stripes-static.png');

const browser = await puppeteer.launch({ headless: true, args: ['--force-color-profile=srgb', '--disable-gpu'] });
const page = await browser.newPage();
await page.setViewport({ width: 1960, height: 1120 });
await page.goto(pathToFileURL(HTML).href + '?render', { waitUntil: 'networkidle0' });
await page.evaluate(() => window.ready);
const total = await page.evaluate(() => window.DURATION);
const nFrames = Math.round(total * FPS);
console.log(`rendering ${nFrames} frames @ ${FPS}fps to ${FRAMES}`);

const cv = await page.$('#cv');
for (let f = 0; f <= nFrames; f++) {
  await page.evaluate(t => window.seek(t), f / FPS);
  await cv.screenshot({ path: path.join(FRAMES, `f${String(f).padStart(4, '0')}.png`) });
  if (f % 60 === 0) console.log(`  frame ${f}/${nFrames}`);
}
// final frame doubles as the static version
fs.copyFileSync(path.join(FRAMES, `f${String(nFrames).padStart(4, '0')}.png`), PNG);
await browser.close();

async function ffmpeg(args) {
  const p = spawn('ffmpeg', ['-y', ...args], { stdio: ['ignore', 'inherit', 'inherit'] });
  const [code] = await once(p, 'exit');
  if (code !== 0) throw new Error('ffmpeg failed: ' + args.join(' '));
}
console.log('encoding mp4…');
await ffmpeg(['-framerate', String(FPS), '-i', path.join(FRAMES, 'f%04d.png'),
  '-c:v', 'libx264', '-crf', '17', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', MP4]);
console.log('encoding gif…');
await ffmpeg(['-framerate', String(FPS), '-i', path.join(FRAMES, 'f%04d.png'),
  '-vf', 'fps=15,scale=960:-1:flags=lanczos,split[s0][s1];[s0]palettegen=max_colors=128[p];[s1][p]paletteuse=dither=bayer:bayer_scale=4',
  GIF]);
fs.rmSync(FRAMES, { recursive: true, force: true });
console.log('done:', MP4, GIF, PNG);
