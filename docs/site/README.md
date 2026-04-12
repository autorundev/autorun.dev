# autorun.dev — site architecture

Мини-архитектура для лендинга autorun.dev с фронтом и бэкендом.

```
site/
├── frontend/
│   ├── site_content.js    ← публичные команды, темы, конфиг
│   └── effects.js         ← spinner, matrix rain, glitch, reboot
│
└── backend/
    ├── server.js          ← hono api server (port 8787)
    ├── easter_eggs.js     ← SECRET: все скрытые команды
    └── package.json
```

---

## Почему два слоя

**Фронт** рендерит публичный контент — то что попадает в `help`. Эти команды открыто лежат в `site_content.js`, потому что их всё равно видно в навигации.

**Бэк** хранит easter eggs. Если юзер вводит команду, которой нет в публичном списке, фронт делает `POST /api/cmd { input }` и получает либо ответ, либо `[!] command not found`. Файл `easter_eggs.js` никогда не попадает в клиент — чтобы через View Source нельзя было найти все шутки сразу.

---

## Local development

```bash
cd backend/
bun install
bun run dev          # starts on :8787 with --watch
```

Или если bun нет:

```bash
npm install
node server.js
```

Health check:

```bash
curl http://localhost:8787/api/health
# → {"status":"ok","ts":1712934567890}
```

Тест команды:

```bash
curl -X POST http://localhost:8787/api/cmd \
  -H "Content-Type: application/json" \
  -d '{"input":"red pill","lang":"en"}'
```

---

## VPS deployment

Сайт живёт на VPS в `~/autorun.dev/`. Фронт раздаётся через nginx:alpine контейнер (`autorun-web`), проксируется через Nginx Proxy Manager на порт 443 с Let's Encrypt SSL.

```bash
# frontend — docker compose (nginx:alpine)
cd ~/autorun.dev/
docker compose up -d

# backend — отдельный контейнер или bun process
cd ~/autorun.dev/docs/site/backend/
bun install --production
bun run start
# или через docker — добавить в docker-compose.yml
```

### nginx config (внутри autorun-web)

```nginx
server {
    listen 80;
    server_name _;
    root /usr/share/nginx/html;
    index index.html;

    location = /index.html {
        add_header Cache-Control "no-cache, no-store, must-revalidate";
        add_header Pragma "no-cache";
    }

    location /api/ {
        proxy_pass http://autorun-api:8787;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

NPM (Nginx Proxy Manager) проксирует `autorun.dev` → `autorun-web:80` с SSL.

---

## Frontend integration

В твоём terminal-компоненте (React/Vue/vanilla — любой):

```js
import { config, content, publicCommands } from './site_content.js';
import { runEffect, spin } from './effects.js';

async function executeCommand(input, ctx) {
  const cmd = input.trim().toLowerCase();
  const lang = ctx.currentLang;

  // 1. Check public commands first (instant, no network)
  if (publicCommands.includes(cmd)) {
    const def = content[lang].commands[cmd];
    if (cmd === 'clear') return runEffect('clear', ctx);
    return renderLines(def.output);
  }

  // 2. Handle `lang X` and `theme X` inline
  if (cmd.startsWith('lang ')) {
    const newLang = cmd.slice(5);
    if (['en', 'ru'].includes(newLang)) {
      ctx.setLang(newLang);
      return renderLines([content[newLang].system.langChanged(newLang)]);
    }
  }
  if (cmd.startsWith('theme ')) {
    const newTheme = cmd.slice(6);
    if (['dark', 'light'].includes(newTheme)) {
      ctx.setTheme(newTheme);
      return renderLines([content[lang].system.themeChanged(newTheme)]);
    }
  }

  // 3. Otherwise — ask backend
  try {
    const res = await fetch(config.apiEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input: cmd, lang }),
    });
    const data = await res.json();

    // Render lines (with special handling for spinner lines)
    for (const line of data.lines) {
      if (line.spinner) {
        const el = appendLine({ mark: line.mark, text: line.text });
        await spin(el, line.text, line.duration || 800);
      } else {
        appendLine(line);
      }
    }

    // Apply state unlocks
    if (data.unlocks) {
      data.unlocks.forEach((key) => ctx.unlock(key));
    }

    // Run effect after delay (if any)
    if (data.effect) {
      if (data.delay) await sleep(data.delay);
      await runEffect(data.effect, ctx);
    }
  } catch (err) {
    renderLines(content[lang].notFound(cmd));
  }
}
```

---

## Adding new easter eggs

Редактируешь только `backend/easter_eggs.js`:

```js
'your command': {
  lines: [
    { mark: '[*]', text: 'your response' },
  ],
  effect: 'matrix_rain',   // optional
  unlocks: ['something'],  // optional
  delay: 1000,             // optional, before effect
},
```

Перезапуск:

```bash
pm2 restart autorun-api
```

Или с hot-reload:

```bash
pm2 start server.js --name autorun-api --watch
```

---

## What to protect

**Fine to leak:**
- `site_content.js` — всё равно видно в UI
- `effects.js` — интересно поглядеть, но не spoilers

**NEVER expose:**
- `backend/easter_eggs.js` — если он утечёт, вся магия умирает
- `backend/server.js` — не критично, но и зачем

Убедись что `/backend/` не раздаётся через nginx статикой. Только `/api/` проксируется на 8787.

---

## Monitoring

Все команды логируются через `console.log`:

```
[>] red pill (lang=en)
[>] asdfasdf (lang=en)
[>] hodl (lang=en)
```

Через `pm2 logs autorun-api` можно смотреть что люди вводят — идеальный источник для новых easter eggs. Если кто-то упорно пытается `ls -la`, `vim`, `cat` — добавляем.

---

## Rate limiting

Встроен простейший rate limiter: 30 запросов/минуту на IP. Для продакшна можно заменить на Redis-based или что-то посерьёзнее.
