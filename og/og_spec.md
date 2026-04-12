# autorun — OG Image Specification

**Version:** 2.0
**Status:** Final
**Scope:** Спецификация и инструмент для генерации OG-изображений.

---

## 1. Purpose

OG-image — то, как autorun.dev выглядит, когда кто-то шерит
ссылку в Twitter, Telegram, Slack, LinkedIn, iMessage.

Вместо generic image Next.js / дефолтного скриншота лендинга —
брендовая OG-система, которая:

- следует brand spec (шрифт, цвета, state-алфавит, lowercase)
- параметризируется per-page (mark, primary, secondary)
- генерируется автоматически из HTML-шаблона
- масштабируется на десятки страниц без дизайнерской работы

---

## 2. Composition

Фиксированная 2-элементная структура: **state mark + statement**.

```
┌──────────────────────────────────────────────────┐
│                                                  │
│                                                  │
│  [*] ai-native tools & products.                 │
│      for people. not the other way.              │
│                                                  │
│                                                  │
│                                                  │
└──────────────────────────────────────────────────┘
```

**Три элемента:**

- `[*]` — state mark (default: core cyan)
- `primary` — главная строка, bold, 44px
- `secondary` — вторая строка, regular, 32px, muted

Всё центрировано вертикально в viewport 1200×630.

### Почему нет `autorun.dev` в картинке

Бренд появляется из **метаданных** (`og:site_name`), отображается
соцсетями автоматически под картинкой. Дублировать его в OG —
избыточно.

### Почему нет `[status: live]` / `> _` / boot lines

OG — это **статичный snapshot**, не терминал. Cursor, статусы,
диалог — имеют смысл только в интерактивном контексте. На картинке
это декоративный мусор, разбавляющий statement.

---

## 3. Parameters

Все параметры передаются через URL query string:

| param       | default                            | notes                              |
|-------------|------------------------------------|-------------------------------------|
| `mark`      | `[*]`                              | state glyph                        |
| `primary`   | `ai-native tools & products.`      | главная строка                     |
| `secondary` | `for people. not the other way.`   | continuation                       |

### 3.1. Mark variants

```
[*]  core       default, cyan — identity/output
[:]  presence   cyan — listening, attached
[!]  alert      amber — warning, announcement
[x]  stop       red — failure, shutdown, RIP
[+]  extend     green — new, unlock, launch
[.]  ping       muted — stealth, trace
```

Цвет меняется автоматически в зависимости от mark.

### 3.2. Auto-scaling

Обе строки масштабируются **вместе**, по самой длинной:

- максимум <40 chars → 44px (default)
- максимум 40-60 chars → 38px
- максимум >60 chars → 32px

Это сохраняет визуальное равенство строк — они всегда одного
размера, иерархия создаётся только **весом** (primary bold,
secondary regular) и **цветом** (primary fg-0, secondary fg-1).

---

## 4. Usage

### 4.1. Install

```bash
cd og/
npm install
```

Требует Node 18+. Puppeteer подтянет Chromium (~170 MB).

### 4.2. Preview в браузере

```bash
npx http-server . -p 8080 -c-1
# open http://localhost:8080/og_template.html?primary=hello&secondary=world
```

### 4.3. Single image

```bash
node og_generate.js \
  --primary "ship log 007." \
  --secondary "agent now remembers things." \
  --mark "[+]" \
  --out ./out/ship-007.png
```

### 4.4. Presets

```bash
node og_generate.js --preset default  --out ./out/home.png
node og_generate.js --preset stealth  --out ./out/redacted.png
```

Доступные: `default`, `ship`, `alert`, `unlock`, `stealth`.

### 4.5. Batch

```bash
node og_generate.js --batch posts.example.json --outdir ./out/
```

---

## 5. Typical use cases

### Home / default

```
[*] ai-native tools & products.
    for people. not the other way.
```

### Product launch

```
[+] vectoros v2.
    now with mcp.
```

### Ship log / release

```
[*] ship log 007.
    agent now remembers things.
```

### Hiring

```
[*] we're hiring.
    remote. async. ship-focused.
```

### Incident / downtime

```
[!] brief downtime.
    we're on it.
```

### Sunset / shutdown

```
[x] rip project-x.
    2024 — 2026. thanks for playing.
```

### Stealth teaser

```
[.] ********
    ********* *** ******.
```

### Unlock announcement

```
[+] [redacted] revealed.
    it was trading agents all along.
```

---

## 6. Site metadata

На странице сайта (HTML head):

```html
<meta property="og:title" content="ai-native tools & products">
<meta property="og:description" content="for people. not the other way.">
<meta property="og:site_name" content="autorun.dev">
<meta property="og:image" content="https://autorun.dev/og/default.png">
<meta property="og:url" content="https://autorun.dev">
<meta property="og:type" content="website">

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="https://autorun.dev/og/default.png">

<meta name="theme-color" content="#0A0A0A">
```

**Важно:** `og:title` — это тезис, не домен. Домен попадёт в
preview автоматически через `og:site_name` и сам URL.

---

## 7. Integration

### 7.1. Static site (Next.js, Astro, etc.)

Pre-generate на build-time:

```js
const posts = getAllPosts();
const ogData = posts.map(p => ({
  slug: p.slug,
  mark: p.mark || '[*]',
  primary: p.ogPrimary || p.title,
  secondary: p.ogSecondary || p.excerpt,
}));
fs.writeFileSync('./og/posts.json', JSON.stringify(ogData));
// → node og/og_generate.js --batch og/posts.json --outdir public/og/
```

HTML на каждой странице:

```html
<meta property="og:image" content="https://autorun.dev/og/{slug}.png" />
```

### 7.2. Dynamic (Vercel Edge, Cloudflare)

Для dynamic generation переписать шаблон на `@vercel/og` (Satori).
HTML-шаблон здесь — референс дизайна.

---

## 8. Design constraints

### 8.1. Что нельзя менять без брифа

- размер 1200×630 (OG standard)
- фоновый цвет `#0A0A0A`
- шрифт (JetBrains Mono до покупки Berkeley Mono)
- `[*]` в `--state-core` cyan (default)
- lowercase в primary/secondary

### 8.2. Что можно варьировать

- текст primary/secondary
- mark (5 валидных вариантов)
- цвет mark — автоматически по mark

### 8.3. Anti-patterns

- emoji в тексте
- gradient backgrounds
- glow effects / shadows
- иконки вместо `[*]`
- sans-serif fonts
- TitleCase или UPPERCASE
- stock photos, AI-generated imagery
- логотипы партнёров, badges, watermarks
- CTA кнопки («Learn More», «Get Started»)
- URL внутри картинки
- `autorun.dev` в тексте картинки (он уже в метаданных)
- `> _` cursor decoration
- `[status: ...]` labels

---

## 9. Checklist для запуска

```
[>] npm install в og/
[>] preview в браузере
[>] сгенерить default.png
[>] проверить в Twitter Card Validator
[>] проверить в Telegram preview
[>] интегрировать в build pipeline
[>] добавить og:image на все страницы
[>] заменить JetBrains Mono на Berkeley Mono когда куплен
```

---

## 10. Quick-reference

```
SIZE          1200 × 630 @2x
FONT          JetBrains Mono 500/800, 44px unified
BG            #0A0A0A (plain, no grid)
FG            #E8E8E8 primary (bold) / #A0A0A0 secondary (regular)

MARKS
  [*]  #7DD3FC  core       (default)
  [:]  #7DD3FC  presence
  [!]  #FBBF24  alert
  [x]  #F87171  stop
  [+]  #4ADE80  extend/live
  [.]  #606060  ping/stealth

CLI
  single   node og_generate.js --primary X --secondary Y
  preset   node og_generate.js --preset stealth
  batch    node og_generate.js --batch posts.json --outdir out/
```

---

*End of og spec.*
