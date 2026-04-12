# CLAUDE.md — autorun.dev

Interactive terminal-style landing page for autorun.dev.

## Tech Stack

- **Frontend:** Single-file `index.html` (vanilla HTML/CSS/JS)
- **Backend:** Hono + @hono/node-server (Node 20, port 8787)
- **Font:** JetBrains Mono self-hosted (weights 500/800)
- **Hosting:** nginx:alpine (web) + node:alpine (api) → NPM → `https://autorun.dev`
- **SSL:** Let's Encrypt via NPM
- **AI:** Claude Haiku (PRD ~10% on unknown commands)

## Structure

```
index.html              — single page, all inline
docker-compose.yml      — autorun-web + autorun-api
nginx.conf              — static + /api/ proxy
favicon.ico, og.png     — brand assets
fonts/                  — JetBrains Mono woff2 (self-hosted)
backend/
  server.js             — Hono API (easter eggs + Haiku)
  easter_eggs.js        — ~30 hidden commands
  Dockerfile
og/
  og_template.html      — OG image template (1200x630)
  og_generate.js        — Puppeteer generator
docs/
  README.md             — brand system overview
  autorun_brand_system_spec.md
  autorun_motion_spec.md
  autorun_layout_spec.md
  autorun_social_spec.md
  tasks.md              — deferred work
  site/                 — architecture reference
```

## Commands

Public: `help`, `about`, `projects`, `team`, `stack`, `config`, `clear`
Hidden: ~30 easter eggs via `/api/cmd` (matrix, hello, red pill, 42, etc.)

## Dialogue Grammar

- `[>]` = user input (always)
- `[*]` = system output (uses description from help, not command name)
- `[.]` boot, `[:]` ready/presence, `[!]` error, `[x]` fatal, `[+]` unlock
- `[/][-][\][-]` spinner frames
- No blank between `[>]` and `[*]`, blank before next `[>]`
- 4-char hanging indent for continuation lines

## Design

- **Layout:** flush-left with `margin: 0 auto`, 60ch mobile / 80ch desktop
- **Colors:** brand spec vars `--bg-0`, `--fg-0`, `--state-core`, etc.
- **Themes:** dark / light / system (CSS vars + localStorage)
- **Sub-brands:** vectoros (white), playsnap (two-tone), ******** (stealth)
- **Boot:** typewriter 15ms/char, 200ms/line
- **Output:** 40ms between lines, spinner before marked lines
- **Scroll:** follow-tail (auto near bottom, manual ignores)
- **Effects:** matrix rain (inline overlay), CRT glitch, reboot

## Deploy

```bash
docker restart autorun-web                    # frontend changes
docker compose up -d --build autorun-api      # backend changes
docker logs -f autorun-api                    # watch all user input
```

## Key CSS vars

```
--lh: 18px          (line height, used everywhere)
--bg-0, --fg-0      (base colors)
--state-core         #7DD3FC / #0284C7
--state-live         #4ADE80 / #16A34A
--brand-vectoros     #FFFFFF / #0A0A0A
--brand-playsnap-*   play + snap colors
```
