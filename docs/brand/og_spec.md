# autorun — OG Image Specification

**Version:** 1.0
**Status:** Final
**Scope:** Спецификация и инструмент для генерации OG-изображений.

---

## 1. Purpose

OG-image — то, как autorun.dev выглядит, когда кто-то шерит
ссылку в Twitter, Telegram, Slack, LinkedIn, iMessage. Это
первое впечатление от бренда для 90% новых пользователей.

Вместо generic image Next.js / дефолтного скриншота лендинга
у нас — брендовая OG-система, которая:

- следует brand spec (шрифт, цвета, state-алфавит, lowercase)
- параметризируется per-page (title, subtitle, status)
- генерируется автоматически из HTML-шаблона
- масштабируется на десятки страниц без дизайнерской работы

---

## 2. Files

```
og/
├── og_template.html       ← HTML-шаблон, рендерится в 1200×630
├── og_generate.js         ← Node.js генератор (Puppeteer)
├── package.json           ← зависимости и npm scripts
├── posts.example.json     ← пример batch-файла
└── og_spec.md             ← этот документ
```

---

## 3. Visual composition

Фиксированная 3-зонная структура (1200×630, safe area padding
72–80px):

```
┌──────────────────────────────────────────────────┐
│ [*] autorun.dev                                  │  ← header
│                                                  │
│                                                  │
│  {TITLE — 64px bold}                             │  ← content
│                                                  │
│  {subtitle — 26px regular, --fg-1}               │
│                                                  │
│                                                  │
│  > _                           [status: live]    │  ← footer
└──────────────────────────────────────────────────┘
```

### Zones

- **Header:** `[*]` mark (cyan, `--state-core`) + brand name
- **Content:** title + subtitle, left-aligned, max-width 1040px
- **Footer:** prompt `> _` слева, статус справа (color по state)

### Background

- base: `#0A0A0A`
- subtle 24px grid overlay (1.5% opacity) — имитирует терминал
  без превращения в декоративный noise

---

## 4. Template parameters

Все параметры передаются через URL query string:

| param      | default                                        | notes                              |
|------------|------------------------------------------------|-------------------------------------|
| `brand`    | `autorun.dev`                                  | в header                           |
| `title`    | `ai-native tools & products`                   | основной заголовок                 |
| `subtitle` | `software that runs where people already are.` | подзаголовок                       |
| `status`   | `[status: live]`                               | правый нижний угол                 |
| `variant`  | —                                              | `boot` — с boot-sequence           |
| `agents`   | `3`                                            | только для `variant=boot`          |
| `bootline` | `ready.`                                       | только для `variant=boot`          |

### Auto-behavior

- **Title scaling:** автоматически уменьшается при длинной
  строке (>50 chars → 52px, >80 chars → 42px)
- **Status color:** вычисляется по ключевому слову в status —
  `live` → зелёный, `stealth`/`redacted` → серый,
  `alert` → жёлтый, `fail`/`abort`/`stop` → красный,
  `wip`/`building`/`soon` → cyan

---

## 5. Usage

### 5.1. Install

```bash
cd og/
npm install
```

Требует Node 18+. Puppeteer подтянет свою сборку Chromium
(~170 MB).

### 5.2. Preview в браузере

```bash
npm run preview
# open http://localhost:8080/og_template.html?title=hello&subtitle=world
```

Полезно при дизайн-итерациях — увидеть как рендерится без
скриншота.

### 5.3. Single image

```bash
node og_generate.js \
  --title "ship log 007" \
  --subtitle "agent now remembers things." \
  --status "[status: live]" \
  --out ./out/ship-007.png
```

### 5.4. С preset

```bash
node og_generate.js --preset stealth --out ./out/redacted.png
node og_generate.js --preset boot --out ./out/home.png
```

Доступные presets: `default`, `project`, `stealth`, `ship`, `boot`.

### 5.5. Batch generation

Создать `posts.json`:

```json
[
  { "slug": "home", "title": "...", "subtitle": "...", "status": "[status: live]" },
  { "slug": "vectoros", "title": "...", "subtitle": "...", "status": "[status: live]" }
]
```

Запустить:

```bash
node og_generate.js --batch ./posts.json --outdir ./out/
```

Получить `./out/home.png`, `./out/vectoros.png` и т.д.

---

## 6. Integration patterns

### 6.1. Static site (Next.js, Astro, etc.)

Pre-generate все OG на build-time:

```js
// build.js
const posts = getAllPosts();
const ogData = posts.map(p => ({
  slug: p.slug,
  title: p.title,
  subtitle: p.excerpt,
  status: p.status || '[status: live]',
}));
fs.writeFileSync('./og/posts.json', JSON.stringify(ogData));
// → then run `node og/og_generate.js --batch og/posts.json --outdir public/og/`
```

HTML:

```html
<meta property="og:image" content="https://autorun.dev/og/{slug}.png" />
<meta name="twitter:card" content="summary_large_image" />
```

### 6.2. Dynamic (Vercel/Cloudflare Edge)

Для dynamic generation лучше переписать шаблон на `@vercel/og`
(Satori + React), который рендерит без headless browser.
HTML-шаблон здесь — референс дизайна.

Но для small team / shipping-focused workflow pre-generated
PNG + CDN — проще и быстрее.

### 6.3. Social posts

Для Twitter/Telegram каждый значимый ship должен иметь OG
с уникальным title/subtitle. Это занимает ~5 секунд через
batch-файл и дает консистентный визуальный feed.

---

## 7. Design constraints

### 7.1. Что нельзя менять без брифа

- размер 1200×630 (OG standard)
- фоновый цвет `#0A0A0A`
- шрифт (JetBrains Mono до покупки Berkeley Mono)
- `[*]` в header в цвете `--state-core`
- lowercase в title/subtitle (unless preset explicitly says otherwise)

### 7.2. Что можно варьировать

- текст всех трех слотов (title/subtitle/status)
- цвет статуса (через keyword mapping или явный класс)
- variant: default vs boot
- agents count в boot-variant

### 7.3. Anti-patterns

- emoji в тексте
- gradient backgrounds
- glow effects / shadows
- иконки вместо `[*]`
- sans-serif fonts
- TitleCase или UPPERCASE в body (только в `[STATUS: X]`)
- декоративные рамки, border-radius на container
- stock photos, AI-generated imagery

---

## 8. Font licensing note

Шаблон использует **JetBrains Mono** (open source, via Google
Fonts) как default. Когда Berkeley Mono будет куплен:

1. Скачать `.woff2` файлы
2. Положить в `og/fonts/`
3. Заменить `<link>` на `@font-face` в `og_template.html`
4. Обновить font-family на `'Berkeley Mono'` first

До тех пор JetBrains Mono сохраняет 90% правильного character.

---

## 9. Checklist для запуска

```
[>] npm install в og/
[>] протестить preview в браузере
[>] сгенерить out/default.png и out/stealth.png
[>] проверить как выглядит в Twitter/Telegram preview (postman-style)
[>] интегрировать в build pipeline сайта
[>] добавить og:image meta-tags на все страницы
[>] заменить JetBrains Mono на Berkeley Mono когда куплен
```

---

## 10. Quick-reference

```
SIZE          1200 × 630 (2x device pixel ratio)
FONT          JetBrains Mono 400/700
BG            #0A0A0A + 1.5% grid
FG            #E8E8E8 title / #A0A0A0 subtitle / #606060 meta
ACCENT        #7DD3FC [*]
STATUS COLORS live #4ADE80 · stealth #A0A0A0 · alert #FBBF24
              stop #F87171 · wip #7DD3FC

CLI
  single      node og_generate.js --title X --out Y.png
  preset      node og_generate.js --preset stealth
  batch       node og_generate.js --batch posts.json --outdir out/
  preview     npm run preview
```

---

*End of og spec.*
