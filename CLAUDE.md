# CLAUDE.md — autorun.dev

Landing page для autorun.dev в стиле интерактивного терминала.

## Tech Stack

- **Frontend:** Single-file `index.html` (vanilla HTML/CSS/JS)
- **Font:** JetBrains Mono (Google Fonts, weights 400/600)
- **Hosting:** nginx:alpine контейнер → NPM reverse proxy → `https://autorun.dev`
- **SSL:** Let's Encrypt (auto-renew через NPM)

## Structure

```
index.html              — единственная страница, всё inline
docker-compose.yml      — nginx:alpine в сети proxy
docs/brand/             — brand system (identity, motion, social, OG)
```

## Команды терминала

Интерактивный ввод через contenteditable div. Доступные команды:
`help`, `about`, `projects`, `team`, `stack`, `clear`

## Design Constraints

- **60 символов** — максимальная ширина контента. Font-size: `clamp(8px, calc((100vw - 32px)/36), 15px)`
- **Monospace only** — JetBrains Mono, fallback: SF Mono, Cascadia Code, Fira Code
- **Цвета из brand system:** bg `#0A0A0A`, fg `#C8C8C8`, accent `#6EE7B7`, link `#93C5FD`, prompt `#A78BFA`
- **Brand:** `docs/brand/` — полная спека (identity, motion, social, OG-images)
- **Lowercase bias** — весь текст строчными

## Deploy

```bash
docker restart autorun-web    # index.html подмонтирован как volume, достаточно рестарта
```

## Current State

- Landing page live: `https://autorun.dev`
- Brand system задокументирован в `docs/brand/`
- OG-image генератор готов (puppeteer), но не задеплоен
- Нет favicon / OG-image на самом сайте (TODO)
