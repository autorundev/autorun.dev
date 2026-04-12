#!/usr/bin/env node
/**
 * autorun — og image generator v2
 *
 * Usage:
 *   node og_generate.js --primary "ai-native tools." \
 *                       --secondary "for people." \
 *                       --out ./og.png
 *
 *   node og_generate.js --mark "[:]" \
 *                       --primary "vectoros." \
 *                       --secondary "ai companion for telegram."
 *
 *   # batch mode:
 *   node og_generate.js --batch ./posts.example.json --outdir ./out/
 *
 * posts.json format:
 *   [{ "slug": "home", "mark": "[*]", "primary": "...", "secondary": "..." }]
 */

const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

// ─────────────────────────────────────────────────────
// args

const parseArgs = () => {
  const args = {};
  const argv = process.argv.slice(2);
  for (let i = 0; i < argv.length; i++) {
    if (argv[i].startsWith('--')) {
      const key = argv[i].slice(2);
      const next = argv[i + 1];
      args[key] = next && !next.startsWith('--') ? next : true;
      if (args[key] !== true) i++;
    }
  }
  return args;
};

// ─────────────────────────────────────────────────────
// defaults

const defaults = {
  mark: '[*]',
  primary: 'ai-native tools & products.',
  secondary: 'for people. not the other way.',
};

// ─────────────────────────────────────────────────────
// render

async function renderOne(browser, params, outPath) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 2 });

  const templatePath = path.resolve(__dirname, 'og_template.html');
  const query = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') query.set(k, v);
  });

  const url = `file://${templatePath}?${query.toString()}`;
  await page.goto(url, { waitUntil: 'networkidle0' });

  // wait for fonts
  await page.waitForFunction(() => document.body.getAttribute('data-ready') === 'true', {
    timeout: 5000,
  });

  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  await page.screenshot({ path: outPath, type: 'png', omitBackground: false });
  await page.close();

  console.log(`[+] ${outPath}`);
}

// ─────────────────────────────────────────────────────
// main

(async () => {
  const args = parseArgs();

  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    // batch mode
    if (args.batch) {
      const posts = JSON.parse(fs.readFileSync(args.batch, 'utf-8'));
      const outdir = args.outdir || './out';
      for (const post of posts) {
        const { slug, ...params } = post;
        const out = path.join(outdir, `${slug}.png`);
        await renderOne(browser, { ...defaults, ...params }, out);
      }
    } else {
      // single mode
      const params = {
        ...defaults,
        mark: args.mark || defaults.mark,
        primary: args.primary || defaults.primary,
        secondary: args.secondary || defaults.secondary,
      };
      const out = args.out || './og.png';
      await renderOne(browser, params, out);
    }
  } catch (err) {
    console.error('[x]', err.message);
    process.exitCode = 1;
  } finally {
    await browser.close();
  }
})();
