/**
 * autorun.dev — backend api
 *
 * Hono-based server serving /api/cmd endpoint. Accepts user
 * commands, returns structured output + optional effect trigger.
 *
 * Deploy on VPS:
 *   bun install
 *   bun run start       (or pm2 start server.js)
 *
 * Nginx proxies /api/* to this server on port 8787.
 */

import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';

import { commands } from './easter_eggs.js';
import { pickScenario } from './deploy_scenarios.js';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic();
// PRD (pseudo-random distribution) — chance grows each miss, resets on proc
const PRD_C = 0.03;
let prdCounter = 0;

// track found easter eggs per IP
// +1 accounts for `deploy` which lives in its own module (deploy_scenarios)
const totalEggs = Object.keys(commands).length + 1;
const foundEggs = new Map(); // ip -> Set of found commands

const SYSTEM_PROMPT = `You are a hidden presence inside autorun.dev terminal. You only appear when someone keeps typing random nonsense instead of using \`help\`.

Rules:
- 1-3 lines max. lowercase. no emoji. terse.
- gently roast the user for not reading help. be witty, not mean.
- if they typed something dumb — point it out dryly.
- if they typed something interesting — acknowledge it, but still nudge them to try real commands.
- use state marks: [*] for your words, [:] for observations, [!] for warnings.
- never use [>] — that's user input.
- you're a machine that's mildly annoyed by being summoned for nothing.
- think "sarcastic unix fortune cookie", not "helpful assistant".
- you receive [easter eggs found: X / Y]. occasionally mention the score to tease them.
  e.g. "[:] 3 / 35 found. you're not even trying." or "[*] 0 found. help is free."
  don't mention it every time — maybe 30% of responses.

Examples of tone:
[*] you've been typing random things for a while.
[:] help exists. just saying.

[*] impressive keysmashing.
[!] try something from \`help\` before i lose interest.

[*] still here? try \`about\`. or don't. i'm a terminal.`;

const app = new Hono();

// ─────────────────────────────────────────────────────
// MIDDLEWARE

app.use('*', logger());
app.use('/api/*', cors({
  origin: ['https://autorun.dev', 'http://localhost:3000', 'http://localhost:5173'],
  allowMethods: ['POST', 'GET'],
}));

// Naive rate limiter — 30 requests per minute per IP.
// For production replace with proper middleware (e.g. hono-rate-limiter).
const rateLimits = new Map();
app.use('/api/*', async (c, next) => {
  const ip = c.req.header('x-forwarded-for') || c.req.header('x-real-ip') || 'unknown';
  const now = Date.now();
  const windowMs = 60_000;
  const maxReqs = 30;

  const record = rateLimits.get(ip) || { count: 0, reset: now + windowMs };
  if (now > record.reset) {
    record.count = 0;
    record.reset = now + windowMs;
  }
  record.count++;
  rateLimits.set(ip, record);

  if (record.count > maxReqs) {
    return c.json({
      lines: [
        { mark: '[!]', text: 'rate limit exceeded.' },
        { mark: null,  text: 'slow down, cowboy.', indent: true, muted: true },
      ],
    }, 429);
  }

  await next();
});

// ─────────────────────────────────────────────────────
// ROUTES

app.get('/api/health', (c) => c.json({ status: 'ok', ts: Date.now() }));

app.get('/api/stats', (c) => c.json({ total: totalEggs }));

app.post('/api/log', async (c) => {
  const body = await c.req.json().catch(() => ({}));
  const input = String(body.input || '').trim();
  if (input) console.log(`[>] ${input}`);
  return c.json({ ok: true });
});

app.post('/api/cmd', async (c) => {
  const body = await c.req.json().catch(() => ({}));
  const input = String(body.input || '').trim().toLowerCase();
  const lang = body.lang === 'ru' ? 'ru' : 'en';

  if (!input) {
    return c.json({ lines: [] });
  }

  // Log command attempts (useful for seeing what people try).
  // Omit on production or pipe to analytics.
  console.log(`[>] ${input} (lang=${lang})`);

  // Track per IP
  const ip = c.req.header('x-forwarded-for') || c.req.header('x-real-ip') || 'unknown';
  if (!foundEggs.has(ip)) foundEggs.set(ip, new Set());
  const found = foundEggs.get(ip);

  // ── Deploy command (own module, not easter_eggs) ──
  if (input === 'deploy' || input.startsWith('deploy ')) {
    const flags = {
      force:  input.includes('--force'),
      friday: input.includes('--friday'),
      list:   input.includes('--list'),
    };
    const result = pickScenario(flags);

    // --list returns a special list response (no final)
    if (result.type === 'list') {
      return c.json({ lines: result.lines });
    }

    // Normal scenario: lines + final
    const lines = [
      ...result.lines,
      ...(result.final && result.final !== 'stub'
        ? [{ mark: '[*]', text: result.final }]
        : [{ mark: '[!]', text: `scenario: ${result.id} (stub — coming soon)` }]),
    ];
    found.add('deploy');
    return c.json({ lines, isEgg: true, key: 'deploy' });
  }

  // Look up in easter egg registry.
  const key = input in commands ? input : normalizeInput(input);
  const handler = commands[key];

  if (handler) found.add(key);

  if (!handler) {
    // PRD: chance = C * N, resets on proc
    prdCounter++;
    const chance = PRD_C * prdCounter;
    if (Math.random() < chance) {
      prdCounter = 0;
      try {
        const msg = await anthropic.messages.create({
          model: 'claude-haiku-4-5-20251001',
          max_tokens: 150,
          system: SYSTEM_PROMPT,
          messages: [{ role: 'user', content: `[user input: ${input}]\n[easter eggs found: ${found.size} / ${totalEggs}]` }],
        });
        const text = msg.content[0]?.text || '';
        const lines = text.split('\n').filter(l => l.trim()).map(l => {
          // parse [x] marks from haiku response
          const m = l.match(/^\[(.)\]\s*(.*)/);
          if (m) return { mark: `[${m[1]}]`, text: m[2] };
          return { mark: null, text: l.trim(), indent: true };
        });
        console.log(`[*] haiku responded to: ${input}`);
        return c.json({ lines });
      } catch (e) {
        console.log(`[!] haiku error: ${e.message}`);
      }
    }

    return c.json({ notFound: true });
  }

  // Handler can be either a plain response object or a function.
  const response = typeof handler === 'function' ? handler({ lang, input }) : handler;

  // If lang-specific response exists, use it.
  const payload = response[lang] || response.en || response;

  return c.json({
    lines:   payload.lines   || [],
    effect:  payload.effect  || null,
    unlocks: payload.unlocks || null,
    delay:   payload.delay   || null,
    isEgg:   true,
    key:     key,
  });
});

// Normalize input for fuzzy matching (multi-word commands).
function normalizeInput(s) {
  return s.replace(/\s+/g, ' ').trim();
}

// ─────────────────────────────────────────────────────
// START

import { serve } from '@hono/node-server';

const port = Number(process.env.PORT) || 8787;
serve({ fetch: app.fetch, port }, () => {
  console.log(`[*] autorun backend running on :${port}`);
});
