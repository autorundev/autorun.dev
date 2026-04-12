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

  // Look up in easter egg registry.
  const handler = commands[input] || commands[normalizeInput(input)];

  if (!handler) {
    return c.json({
      lines: [
        { mark: '[!]', text: lang === 'ru'
          ? `команда не найдена: ${input}`
          : `command not found: ${input}` },
        { mark: null,  text: lang === 'ru' ? 'попробуй `help`' : 'try `help`',
          indent: true, muted: true },
      ],
    });
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
  });
});

// Normalize input for fuzzy matching (multi-word commands).
function normalizeInput(s) {
  return s.replace(/\s+/g, ' ').trim();
}

// ─────────────────────────────────────────────────────
// START

const port = Number(process.env.PORT) || 8787;
console.log(`[*] autorun backend running on :${port}`);

export default {
  port,
  fetch: app.fetch,
};
