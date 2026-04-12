# autorun — Brand System

**Version:** 1.4
**Status:** Final

---

## What this is

Brand system для autorun — AI-native бренда, построенного вокруг
контейнера состояния `[ ]`, а не вокруг статичного логотипа.

Постоянная оболочка задает рамку, внутренний символ показывает
состояние. Идентичность раскрывается через поведение и
ограниченный алфавит знаков.

> Not a static logo. A runtime grammar.

---

## Documents

```
autorun/
├── README.md                        ← this file, entry point
├── autorun_brand_system_spec.md     ← identity, typography, color, voice
├── autorun_motion_spec.md           ← state grammar, loops, motion
├── autorun_layout_spec.md           ← layout, width, scroll, output timing
├── autorun_social_spec.md           ← channel-specific guides
└── og/
    ├── og_spec.md                   ← og image spec
    ├── og_template.html             ← html template
    ├── og_generate.js               ← puppeteer generator
    ├── package.json
    └── posts.example.json           ← batch example
```

### `autorun_brand_system_spec.md`

Внешняя идентичность бренда:
- core concept и архитектура системы
- brand alphabet (5 знаков)
- primary mark `[*]` и secondary `[>]`
- **terminal dialogue grammar (input vs output)**
- typography (один моноширинный шрифт)
- color palette (монохром + state-акценты)
- scale & legibility
- two-register voice + meme library
- register discipline (как не смешивать регистры)
- design principles и anti-patterns

### `autorun_motion_spec.md`

Внутренняя продуктовая грамматика:
- расширенный алфавит (12 знаков)
- state loops
- motion principles (quiet mechanics)
- timing и easing rules
- UI usage patterns
- CSS implementation

### `autorun_layout_spec.md`

Layout, scroll и тайминги появления контента:
- content width (60ch mobile / 80ch desktop, never grows)
- flush-left vs center alignment
- vertical rhythm (start top, accumulate down)
- smart auto-follow scroll behavior
- output timing (typewriter boot, line-by-line commands)
- mobile considerations (100dvh, keyboard, wrap)
- clear & reboot effects

### `autorun_social_spec.md`

Голос бренда по каналам:
- Twitter/X, Telegram, LinkedIn
- GitHub README, blog, email
- cross-channel rules и cadence

### `og/`

OG-image система:
- HTML-шаблон 1200×630 на JetBrains Mono
- Node.js генератор (Puppeteer) с presets и batch mode
- auto-scale title, auto-color status
- интеграция с static site builders

---

## Core principles

### 1. State container, not logo

Бренд — это `[ ]` оболочка плюс меняющийся внутренний символ.
Не логотип, который повторяется. Грамматика, которая живет.

### 2. Two-layer system

- **Brand layer** (5 знаков) — внешняя идентичность
- **Product layer** (+7 знаков) — внутренняя UI-грамматика

### 3. One typeface

Моноширинный шрифт, один на весь бренд. Berkeley Mono (primary)
или JetBrains Mono (fallback). Никаких sans-serif, никогда.

### 4. Monochrome first

Цвет — это сигнал состояния, не декорация.

### 5. Quiet mechanics

Движение экономное, машинное, контролируемое. Никакого
AI-sparkle, никакого cartoon-easing.

### 6. Two-register voice

- **System register** — сухой, машинный (для UI, логов)
- **Human register** — terse, мемный (для лендинга, соцсетей)

Оба в lowercase, без marketing-speak. Не смешиваются на одной
поверхности.

### 7. Terminal dialogue grammar

В любом диалоге терминала (лендинг, демо, скриншоты):

- `[>]` — **всегда** пользовательский ввод
- `[*]` — **всегда** ответ системы
- `[.]` — процесс, `[:]` — готовность, `[!]` / `[x]` — ошибки
- `[+]` — разблокировки, `[/] [-] [\] [|]` — spinner frames

Ответ идёт сразу под командой, без пустой строки. `[*]` не
повторяет имя команды — использует подстрочник из `help`.

Подробно — brand spec section 6.5.

### 8. Sub-brand system

autorun.dev — umbrella. Продукты (vectoros, playsnap) —
sub-brands с собственными цветами на имени, но общей
state grammar. TLD убирается в sub-brand именах (но сохраняется
в parent `autorun.dev`).

Подробно — brand spec section 6.4.

---

## Quick reference

```
BRAND ALPHABET (5)
  [*]  core      — identity
  [>]  action    — prompt, execute
  [:]  presence  — attached, listening
  [!]  alert     — warning
  [x]  stop      — fail, abort

PRODUCT ALPHABET (+7)
  [_]  idle       [.]  ping       [-]  hold
  [/]  trans A    [\]  trans B    [+]  extend
  [?]  unresolved

TYPOGRAPHY
  Berkeley Mono / JetBrains Mono
  Regular 400, Bold 700
  lowercase bias, no italic, no tracking

COLOR
  bg       #0A0A0A
  fg       #E8E8E8
  core     #7DD3FC
  live     #4ADE80
  alert    #FBBF24
  stop     #F87171
  stealth  #A0A0A0

SUB-BRANDS
  autorun.dev   #7DD3FC    cyan (parent)
  vectoros      #FFFFFF    pure white
  playsnap      #FFFFFF + #C8FF00  (play + snap)
  ********      muted (stealth)

DIALOGUE GRAMMAR
  [>] = user input (always)
  [*] = system output (always)
  [.] process · [:] ready · [!] error · [x] fatal
  [+] unlock · [/][\][|][-] spinner

LAYOUT
  width:     60ch mobile / 80ch desktop (never grows)
  alignment: flush-left (margin: 0)
  height:    100dvh, justify-content: flex-start

SCROLL
  follow-tail within 50px of bottom
  instant, never smooth
  new command forces follow

OUTPUT TIMING
  boot:    15ms/char, 200ms/line
  command: 40ms between lines
  spinner: 120ms/frame

VOICE
  two registers, never mixed on one surface
  system: [:] attached · [x] aborted
  human:  vibe coder (unironically)

SOCIAL
  twitter   — terse dev-humor, no hashtags
  telegram  — ru/en mixed, longer form
  linkedin  — soft human, no corporate-speak
  github    — mixed register ok
  blog      — developed human voice

OG IMAGES
  1200×630 · [*] autorun.dev header
  auto-generated from html template
```

---

## Canonical hero

```
[*] autorun.dev
ai-native tools & products
```

---

## Reading order

1. **README** (this) — обзор системы
2. **brand spec** — ядро бренда
3. **layout spec** — как раскладывать на странице
4. **social spec** — как бренд говорит в каналах
5. **og/og_spec** — как бренд выглядит в шерах
6. **motion spec** — когда начнешь строить продукт на грамматике

---

*Brand system is a living document. Update when reality changes.*
