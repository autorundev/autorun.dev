#!/usr/bin/env node
/**
 * autorun — og image generator
 *
 * Usage:
 *   node og_generate.js --title "new drop: vectoros v0.4" \
 *                       --subtitle "agent now remembers things." \
 *                       --status "[status: live]" \
 *                       --out ./out/vectoros-v04.png
 *
 *   node og_generate.js --preset project \
 *                       --title "[redacted]" \
 *                       --subtitle "something for traders." \
 *                       --status "[status: stealth]"
 *
 *   node og_generate.js --variant boot \
 *                       --title "autorun.dev" \
 *                       --subtitle "ai-native tools & products" \
 *                       --agents 3 \
 *                       --bootline "ready."
 *
 *   # batch mode:
 *   node og_generate.js --batch ./posts.json --outdir ./out/
 *
 * posts.json format:
 *   [{ "slug": "ship-007", "title": "ship log 007", "subtitle": "...", "status": "[status: live]" }]
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
// presets

const presets = {
  default: {
    title: 'ai-native tools & products',
    subtitle: 'software that runs where people already are.',
    status: '[status: live]',
  },
  project: {
    status: '[status: live]',
  },
  stealth: {
    title: '[redacted]',
    subtitle: 'something for traders.',
    status: '[status: stealth]',
  },
  ship: {
    status: '[status: live]',
  },
  boot: {
    variant: 'boot',
    title: 'autorun.dev',
    subtitle: 'ai-native tools & products',
    agents: '3',
    bootline: 'ready.',
    status: '[status: live]',
  },
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
        await renderOne(browser, params, out);
      }
    } else {
      // single mode
      const preset = args.preset ? presets[args.preset] || {} : {};
      const params = {
        ...presets.default,
        ...preset,
        title: args.title || preset.title || presets.default.title,
        subtitle: args.subtitle || preset.subtitle || presets.default.subtitle,
        status: args.status || preset.status || presets.default.status,
        brand: args.brand,
        variant: args.variant || preset.variant,
        agents: args.agents || preset.agents,
        bootline: args.bootline || preset.bootline,
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
