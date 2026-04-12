# autorun — Layout & Scroll Specification

**Version:** 1.0
**Status:** Final
**Scope:** Layout grid, content width, scroll behavior, output timing
для любого терминал-ориентированного интерфейса autorun.
Companion to `autorun_brand_system_spec.md`.

---

## 1. Purpose

Brand spec отвечает на вопрос *что* показывать (знаки, цвета,
голос). Этот документ отвечает на вопрос *как* это разложить
на странице и как оно должно двигаться во времени.

Ошибки в layout и scroll убивают ощущение терминала сильнее,
чем любая ошибка в типографике. Контент может быть идеальным,
но если он выровнен по центру как карточка — это лендинг, а
не терминал.

> The brand is in the behavior as much as in the marks.

---

## 2. Content width

### 2.1. Canonical widths

autorun использует классическую терминальную ширину:

```
mobile   <640px     60ch     fixed, max viewport width
tablet   640-1024   80ch     classic terminal
desktop  >1024      80ch     same width, more background
wide     >1440      80ch     content stays, background extends
```

### 2.2. Why 80ch

80 columns — стандарт с эпохи VT100 и punch cards. Используется
в `.editorconfig`, линтерах, man-страницах, `git log`. Для
бренда, который строится вокруг CLI-грамматики, это единственный
правильный выбор.

60ch на mobile — прагматичный минимум, чтобы шрифт оставался
читаемым (14px) и не ломался на iPhone SE / Android небольшого
размера.

### 2.3. Content never grows past 80ch

**Это главное правило.** На wide мониторе контент **не
растягивается**. Он остаётся 80ch, а всё остальное — чистый
фон `--bg-0`.

Это и есть terminal authenticity: реальный терминал не
растягивает текст на весь экран, он работает в фиксированной
колонке, viewport вокруг — просто пустота.

### 2.4. CSS implementation

```css
:root {
  --content-mobile:   60ch;
  --content-desktop:  80ch;
  --font-mobile:      14px;
  --font-desktop:     16px;
  --line-height:      1.5;
  --pad-block:        max(24px, 4vh);
  --pad-inline:       max(16px, 4vw);
}

.terminal {
  max-width:   var(--content-mobile);
  font-size:   var(--font-mobile);
  line-height: var(--line-height);
  padding:     var(--pad-block) var(--pad-inline);
  margin:      0 auto;   /* or 0 for flush-left — see section 3 */
}

@media (min-width: 640px) {
  .terminal {
    max-width: var(--content-desktop);
    font-size: var(--font-desktop);
  }
}
```

Альтернатива со smooth scaling (без брейкпоинтов):

```css
.terminal {
  max-width:   min(80ch, 100%);
  font-size:   clamp(14px, 1.5vw, 16px);
  line-height: 1.5;
  padding:     2rem 1.5rem;
}
```

---

## 3. Alignment: center vs flush-left

Два честных варианта, оба валидны для бренда. Выбор один и
навсегда — не смешивать на разных страницах.

### 3.1. Center (`margin: 0 auto`)

Контент в 80ch по центру, пустое пространство по бокам.

**Для чего:** лендинг-как-эстетика, mainstream dev-tool look.
Читается как «мы используем терминал как формат презентации».

**Ближайшие референсы:** Vercel, Linear, Cursor, shadcn docs.

**Плюсы:** привычно, работает из коробки на всех viewport.
**Минусы:** на wide-мониторах контент выглядит изолированно,
теряется «я в терминале» feel.

### 3.2. Flush-left (`margin: 0`)

Контент прижат к левому краю с padding, занимает 80ch слева.

**Для чего:** терминал-как-продукт, cult classic look.
Читается как «ты в реальном shell».

**Ближайшие референсы:** lowtechmagazine.com, xxiivv.com,
bt.ht, plaintext manifestos.

**Плюсы:** максимальная honesty, резкий character, меньше
похоже на очередной стартап-лендинг.
**Минусы:** на mobile разницы нет; на wide может выглядеть
«необычно» для mainstream аудитории.

### 3.3. Recommended for autorun

По брендовой философии (`quiet mechanics, not visual spectacle`,
runtime grammar как ядро) — **flush-left**.

Это честнее, резче, и дифференцирует от десятка других
dev-лендингов с моно-шрифтом по центру.

---

## 4. Vertical rhythm

### 4.1. Start from top, accumulate down

Терминал **никогда** не центрирует контент вертикально. Output
всегда начинается сверху и накапливается вниз. Cursor всегда
внизу последней строки.

```css
.terminal-wrapper {
  min-height:     100dvh;
  display:        flex;
  flex-direction: column;
  justify-content: flex-start;   /* НЕ center! */
}
```

### 4.2. Why `100dvh`, not `100vh`

На iOS Safari адресная строка скрывается/появляется при скролле.
`100vh` = статическая высота, игнорирует dynamic browser chrome —
контент прыгает при первом скролле.

`100dvh` (dynamic viewport height) подстраивается. Используй
везде.

### 4.3. Section spacing

Между логическими блоками (команда + её output) — одна пустая
строка. Между output одной команды и следующим prompt — одна
пустая строка.

```
[>] help

[*] available commands:
    about     — ...
    projects  — ...
                              ← пустая строка (1× line-height)
[>] about

[*] about
    ...
                              ← пустая строка
[>] _
```

Никаких `margin-top: 2rem` или `margin-bottom: 1.5rem` между
блоками. Только пустые строки, как в настоящем shell.

---

## 5. Scroll behavior

### 5.1. Smart auto-follow (follow-tail)

Поведение «как в tail -f», терминалах, логах, chat-apps:

1. Новый output появляется внизу
2. Если юзер **у низа** viewport — автоскролл к новому output
3. Если юзер **прокрутил вверх** — не трогаем viewport, он
   читает историю
4. Ввод новой команды — принудительно возвращаем в follow-mode

### 5.2. Implementation

```javascript
const SCROLL_THRESHOLD = 50; // пиксели
let isFollowing = true;

terminal.addEventListener('scroll', () => {
  const distanceFromBottom =
    terminal.scrollHeight - terminal.scrollTop - terminal.clientHeight;
  isFollowing = distanceFromBottom < SCROLL_THRESHOLD;
});

function appendLine(line) {
  terminal.appendChild(line);
  if (isFollowing) {
    // Мгновенно, без smooth
    terminal.scrollTop = terminal.scrollHeight;
  }
}

function onCommandSubmit() {
  isFollowing = true;
  terminal.scrollTop = terminal.scrollHeight;
}
```

### 5.3. Animation: instant, not smooth

Автоскролл **всегда** мгновенный:

```javascript
terminal.scrollTop = terminal.scrollHeight;   // ✅
```

Никакого smooth:

```javascript
terminal.scrollIntoView({ behavior: 'smooth' });   // ❌
```

В терминале output не «плавает» в viewport — он появляется.
Smooth скролл создаёт motion sickness при быстрых командах
и смотрится как презентация, не как CLI.

### 5.4. Anti-patterns

```
❌ scrollTo на каждый output независимо от позиции юзера
❌ scrollIntoView({ behavior: 'smooth' }) для новых строк
❌ overflow: hidden на terminal container (убивает историю)
❌ scroll-snap по секциям (превращает в презентацию)
❌ фиксированный prompt внизу со скроллом только контента
   (создаёт chat-app look, не terminal look)
```

### 5.5. Optional: "new output" indicator

Когда юзер прокрутил вверх и появляется новый output, можно
показать плашку внизу:

```
                              [↓] 3 new lines below
```

Клик → `isFollowing = true`, скролл к низу.

Паттерн из Telegram/Discord/Slack, работает везде. Но для
autorun может быть слишком chat-like. Optional, не обязательно.

---

## 6. Output timing

Как именно output появляется в DOM. Два режима:

### 6.1. Boot sequence — typewriter style

При первой загрузке страницы boot-строки печатаются посимвольно,
имитируя typewriter. Это первое впечатление, оно должно
чувствоваться «живым».

```javascript
async function renderBootLine(line) {
  const CHAR_DELAY = 15;      // ms на символ
  const LINE_PAUSE = 200;     // ms между строками

  for (const char of line.text) {
    appendChar(char);
    await sleep(CHAR_DELAY);
  }
  await sleep(LINE_PAUSE);
}
```

### 6.2. Command output — line-by-line

Для output команд посимвольно — слишком медленно, юзер будет
бесить. Строки появляются целиком, но с задержкой между ними:

```javascript
async function renderCommandOutput(lines) {
  const LINE_DELAY = 40;      // ms между строками

  for (const line of lines) {
    appendLine(line);
    if (isFollowing) scrollToBottom();
    await sleep(LINE_DELAY);
  }
}
```

### 6.3. Special case: spinner lines

Progress-строки со спиннером (`[/] → [-] → [\] → [|]`) имеют
свою анимацию по motion spec. Длительность спиннера задаётся
явно в бэкенде (`duration: 800`).

### 6.4. Timing summary

```
boot char-by-char     15ms per char
boot pause/line       200ms after each boot line
command line-by-line  40ms between lines
spinner frame         120ms per frame (from motion spec)
clear fade-out        300ms
```

### 6.5. `prefers-reduced-motion`

Все timing задержки обнуляются для юзеров с `prefers-reduced-motion`:

```javascript
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const CHAR_DELAY = reducedMotion ? 0 : 15;
const LINE_PAUSE = reducedMotion ? 0 : 200;
const LINE_DELAY = reducedMotion ? 0 : 40;
```

Output появляется мгновенно, функциональность не страдает.

---

## 7. Clear & reboot

### 7.1. `clear` command

```javascript
async function clearScreen() {
  terminal.innerHTML = '';
  terminal.scrollTop = 0;
  isFollowing = true;
  // нет re-render boot
}
```

После clear остаётся только prompt `[>] _`.

### 7.2. `reboot` effect (blue pill)

```javascript
async function reboot() {
  // Fade out
  terminal.style.transition = 'opacity 300ms ease-out';
  terminal.style.opacity = '0';
  await sleep(300);

  // Clear
  terminal.innerHTML = '';
  terminal.scrollTop = 0;
  isFollowing = true;

  // Fade in
  terminal.style.opacity = '1';
  await sleep(200);

  // Replay boot
  await renderBoot();
}
```

Разница от `clear` — reboot проигрывает boot sequence заново.

---

## 8. Input line (prompt)

### 8.1. Position

Prompt всегда внизу потока, не фиксирован. Когда юзер вводит
команду, строка добавляется в историю, появляется новый prompt
ниже.

```
[>] about
[*] about output...

[>] projects
[*] projects output...

[>] _       ← текущий prompt, внизу потока
```

**Никогда** не фиксировать prompt через `position: sticky` или
`position: fixed`. Это chat-app pattern, не terminal.

### 8.2. Cursor

Видимый cursor — блок или подчёркивание, мигает:

```css
.cursor {
  display: inline-block;
  width: 1ch;
  background: var(--fg-0);
  animation: blink 1s steps(1) infinite;
}

@keyframes blink {
  0%, 50%   { opacity: 1; }
  51%, 100% { opacity: 0; }
}
```

`steps(1)` — не smooth fade, резкое переключение. По моушн-спеке
terminal motion всегда mechanical, не organic.

### 8.3. Input echo

Пока юзер печатает, символы появляются после `[>]` в real-time.
Enter → команда «фиксируется» (уходит в историю), запускается
output, ниже появляется новый prompt.

---

## 9. Mobile considerations

### 9.1. Viewport

```html
<meta name="viewport"
      content="width=device-width, initial-scale=1, maximum-scale=1">
```

`maximum-scale=1` — чтобы не было случайного zoom при double-tap.
Это опциональный trade-off (ломает accessibility в некоторых
случаях). Для brand experience важнее.

### 9.2. Keyboard

При открытии soft keyboard на mobile viewport уменьшается.
`100dvh` автоматически адаптируется.

Но есть нюанс: когда keyboard открыт и юзер печатает, prompt
должен оставаться **над** клавиатурой. Используй
`scrollIntoView` только для input-строки, только при фокусе:

```javascript
input.addEventListener('focus', () => {
  setTimeout(() => {
    input.scrollIntoView({ block: 'end' });
  }, 300);   // wait for keyboard animation
});
```

### 9.3. No horizontal scroll

60ch на mobile иногда даёт overflow с длинными URL или
командами. Два варианта:

**A. Wrap long lines:**
```css
.terminal .line {
  word-break: break-all;     /* для URL */
  overflow-wrap: anywhere;
}
```

**B. Horizontal scroll per-line:**
```css
.terminal .line {
  white-space: pre;
  overflow-x: auto;
}
```

Для autorun — **A**. Wrap честнее (настоящий терминал тоже
wrapps), horizontal scroll внутри строк создаёт weird UX.

---

## 10. Quick-reference card

```
CONTENT WIDTH
  mobile   60ch / 14px
  desktop  80ch / 16px
  wide     80ch (doesn't grow)

ALIGNMENT
  flush-left (margin: 0) — canonical for autorun
  never center vertically

RHYTHM
  min-height: 100dvh (not 100vh)
  justify-content: flex-start
  one empty line between blocks

SCROLL
  follow-tail: auto-scroll if within 50px of bottom
  manual scroll: no interference
  new command: force follow
  animation: instant (never smooth)

OUTPUT TIMING
  boot            15ms per char, 200ms pause/line
  command         40ms between lines
  spinner         120ms per frame
  clear fade      300ms

PROMPT
  never sticky, never fixed
  flows with history
  cursor: steps(1) blink, 1s period

MOBILE
  100dvh (safari chrome fix)
  word-break for long URLs
  scroll input into view on focus
```

---

## 11. Anti-patterns summary

```
❌ Центрировать контент вертикально на desktop
❌ Растягивать контент на весь экран на wide viewport
❌ position: fixed/sticky на prompt
❌ behavior: 'smooth' для автоскролла
❌ overflow: hidden на terminal container
❌ scrollTo на каждый output независимо от позиции юзера
❌ scroll-snap по секциям
❌ margin-top/margin-bottom между блоками вместо пустых строк
❌ 100vh вместо 100dvh
❌ horizontal scroll внутри строк
❌ Smooth fade cursor (должен быть steps(1))
```

---

*End of layout spec.*
