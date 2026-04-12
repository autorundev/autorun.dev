# autorun — Motion & State Grammar Specification

**Version:** 1.0
**Status:** Final
**Scope:** Product-level state grammar, state transitions, micro-motion.
Companion document to `autorun_brand_system_spec.md`.

---

## 1. Purpose

Brand-spec описывает, как autorun выглядит снаружи (5 знаков,
типографика, цвет). Этот документ описывает, как autorun ведет
себя внутри — в продуктах, агентах, UI-состояниях.

Здесь живет расширенный алфавит из 12 знаков, циклы переходов и
правила движения.

> Brand is seen. Grammar is used.

---

## 2. Full state alphabet (12 marks)

```txt
BRAND LAYER (external, repeated here for reference)
[*]  core         — identity, active intelligence
[>]  action       — prompt, execute, CTA
[:]  presence     — attached, listening
[!]  alert        — warning, anomaly
[x]  stop         — fail, abort, terminated

PRODUCT LAYER (internal only)
[_]  idle         — standby, waiting
[.]  ping         — trace, heartbeat, low activity
[-]  hold         — stable, paused
[/]  transition A — runtime step
[\]  transition B — runtime step
[+]  extend       — attach, augment
[?]  unresolved   — ambiguity, help needed
```

---

## 3. State semantics (extended)

### 3.1. Brand layer — see brand spec section 4–6

Короткий повтор для контекста:

- `[*]` — active intelligence, wildcard, hidden engine
- `[>]` — ready, prompt, execute, direction
- `[:]` — attached, listening, monitoring
- `[!]` — alert, anomaly, drift
- `[x]` — stop, fail, abort, terminated

### 3.2. `[_]` — idle

Meaning:
- тихое ожидание
- standby
- система на месте, не делает работу
- no active execution

Use for:
- idle state нон-активного агента
- пустой terminal cursor
- UI-компонент, который ждет ввода после таймаута

### 3.3. `[.]` — ping

Meaning:
- heartbeat
- trace
- sync
- очень низкая активность, но живая

Use for:
- fetching progress <10%
- background sync indicator
- connection heartbeat
- «еще жив, еще считаю»

### 3.4. `[-]` — hold

Meaning:
- stable
- paused (by user or system)
- контролируемое удержание
- controlled inactivity

Use for:
- paused agent
- maintenance mode
- rate-limit hold
- waiting for external dependency

### 3.5. `[/]` and `[\]` — transitions

Meaning:
- motion
- runtime cycle
- step-through
- process turn

Use as a spinner pair: `[/] → [-] → [\] → [-] → [/]`.

Cycle period: 400–600ms per frame. Медленнее — кажется мертвым.
Быстрее — тревожный, mascot-like.

### 3.6. `[+]` — extend

Meaning:
- augment
- attach
- context expansion
- capability extension
- plugin activation

Use for:
- MCP server подключен
- новый tool зарегистрирован
- context window расширен
- attachment uploaded

### 3.7. `[?]` — unresolved

Meaning:
- ambiguity
- need clarification
- unknown state
- help context

Use for:
- agent asks for clarification
- ambiguous command
- help prompts
- «не понял запрос, уточни»

---

## 4. Role model

### 4.1. Identity layer

```
[*]
```

Ядро бренда. Не меняется. Всегда `[*]`, всегда в brand-core color.

### 4.2. Action layer

```
[>]
```

Маркер запуска, интеракции, движения вперед.

### 4.3. Presence layer

```
[:] [_] [.]
```

Сигналы того, что система существует и наблюдает.

### 4.4. Transition layer

```
[/] [\] [-] [+]
```

Сигналы изменения, вращения, переключения, расширения.

### 4.5. Exception layer

```
[!] [x] [?]
```

Сигналы проблем, отклонений и неопределенности.

---

## 5. State loops

Канонические переходы состояний. Используются как референс для
анимаций и как референс для ментальной модели системы.

### 5.1. Idle loop

```txt
[_] → [.] → [:] → [_]
```

«Система жива, не шумит, присутствует, не отвлекает».
Cycle period: 3–5 секунд. Это breath-rate, не heartbeat.

### 5.2. Ready to execute

```txt
[:] → [>] → [*]
```

«Система была подключена → приняла команду → перешла к действию».
Не цикл, а однонаправленная последовательность. Каждый переход
300–500ms.

### 5.3. Runtime loop

```txt
[*] → [/] → [-] → [\] → [*]
```

«Активное ядро работает — механический цикл выполнения».
Cycle period: 1.6–2.0s на полный цикл (400–500ms на шаг).

### 5.4. Ambiguity

```txt
[>] → [?] → [:]
```

«Вход получен → нужна ясность → система ждет уточнения».
Однонаправленная. После `[:]` система ждет новый ввод.

### 5.5. Expansion

```txt
[:] → [+] → [*]
```

«Подключение нового контекста → расширение возможностей →
переход к активному выполнению».

### 5.6. Problem escalation

```txt
[.] → [!] → [x]
```

«Слабый сигнал → обнаружено отклонение → выполнение остановлено».
Переходы намеренно резкие: 150–250ms. Без easing.

### 5.7. Soft warning path

```txt
[:] → [!] → [?]
```

«Система присутствует → заметила проблему → требуется уточнение,
но это не фатальный сбой».
Более медленные переходы (500–700ms), symbolизирующие
«разберемся».

---

## 6. Motion principles

### 6.1. Allowed motion types

- **blink** — резкая смена символа без интерполяции
- **swap** — мгновенная замена глифа
- **step rotation** — последовательный проход по спиннер-парам `[/]` `[\]`
- **hold** — удержание в одном состоянии дольше обычного для акцента
- **resolve** — последовательность из нескольких состояний с финалом
- **cycle** — зацикленный переход состояний

### 6.2. Forbidden motion types

- bounce, squash, stretch
- sparkle burst, particle effects
- pulsing (как у декоративных «AI-ядер»)
- soft wobble, friendly jiggle
- cartoon easing (anticipation, overshoot, follow-through)
- color glow / bloom
- gradient rotation

### 6.3. Timing grammar

Для согласованности — фиксированные timing-buckets:

```
instant    0ms         — error→stop, immediate reaction
fast       100–200ms   — command accepted, resolved
normal     300–500ms   — state transitions, step frames
slow       600–1000ms  — deliberate holds, presence signals
breath     3–5s        — idle loops, ambient presence
```

### 6.4. Easing

Используем **только** два easing-curve:

```
linear        — для circular / rotational motion (спиннеры)
ease-out      — для state transitions (прибытие в состояние)
```

Ease-in, ease-in-out, cubic-bezier custom curves — **запрещены**.
Они привносят «органическое» чувство, которое несовместимо с
machine-character бренда.

### 6.5. Motion character

Формула:

> quiet mechanics, not visual spectacle

Проверочный вопрос: «выглядит ли это как терминал или как
splash screen игры?». Если второе — переделать.

---

## 7. UI usage patterns

### 7.1. Header

```txt
[*] autorun.dev
```

Альтернатива с live-счетчиком:

```txt
[*] agents online: 3
```

### 7.2. Prompt line

```txt
[>] enter command
```

### 7.3. Presence indicator

```txt
[:] listening
[:] monitoring 3 markets
```

### 7.4. Active execution

```txt
[*] running
[*] executing trade_001
```

### 7.5. Context attached

```txt
[+] context attached
[+] loaded 12 docs
```

### 7.6. Ambiguity

```txt
[?] unresolved input
[?] which market?
```

### 7.7. Failure

```txt
[!] drift detected
[!] execution failed
[x] session aborted
[x] connection lost
```

### 7.8. Idle / standby

```txt
[_] idle
[-] on hold (rate limit)
[.] syncing
```

---

## 8. Color mapping

Каждый state-знак имеет закрепленный цвет из brand-spec
section 8.2:

```
[*]  --state-core       cyan/blue   #7DD3FC
[>]  --state-action     fg-0        #E8E8E8
[:]  --state-presence   violet      #A78BFA
[_]  --fg-2             ghost       #606060
[.]  --fg-2             ghost       #606060
[-]  --fg-1             secondary   #A0A0A0
[/]  --state-core       cyan/blue   #7DD3FC (во время runtime)
[\]  --state-core       cyan/blue   #7DD3FC (во время runtime)
[+]  --state-live       green       #4ADE80
[!]  --state-alert      amber       #FBBF24
[x]  --state-stop       red         #F87171
[?]  --state-presence   violet      #A78BFA
```

Цвет не меняется случайно. Каждое состояние = свой цвет.

---

## 9. Implementation notes

### 9.1. CSS

Для веб-имплементации — состояния рендерятся как обычный текст
в моно-шрифте с inline цветом:

```html
<span class="state state-core">[*]</span>
<span class="state state-live">[+]</span>
```

```css
.state {
  font-family: "Berkeley Mono", "JetBrains Mono", ui-monospace, monospace;
  font-weight: 400;
  letter-spacing: 0;
  display: inline-block;
  min-width: 3ch;
}

.state-core    { color: var(--state-core); }
.state-action  { color: var(--state-action); }
.state-live    { color: var(--state-live); }
.state-alert   { color: var(--state-alert); }
.state-stop    { color: var(--state-stop); }
```

### 9.2. Animation

Рекомендую использовать CSS `steps()` easing для спиннера —
он идеально передает machine-character без интерполяции:

```css
@keyframes runtime-cycle {
  0%   { content: "[*]"; }
  25%  { content: "[/]"; }
  50%  { content: "[-]"; }
  75%  { content: "[\\]"; }
  100% { content: "[*]"; }
}

.runtime::before {
  content: "[*]";
  animation: runtime-cycle 1.8s steps(1) infinite;
}
```

### 9.3. Accessibility

- Для каждого state-знака дублировать text label:
  `[!] drift detected` — не `[!]` в изоляции
- `prefers-reduced-motion`: отключать все циклы кроме `instant`
  transitions
- Цветовые сигналы всегда дублируются глифом (не надеяться,
  что пользователь различает цвета)

---

## 10. Quick-reference card

```
BRAND (external, 5)
[*] [>] [:] [!] [x]

PRODUCT (internal, 7 more)
[_] [.] [-] [/] [\] [+] [?]

TIMING
instant    0ms
fast       100–200ms
normal     300–500ms
slow       600–1000ms
breath     3–5s

EASING
linear, ease-out only

PRINCIPLE
quiet mechanics, not visual spectacle
```

---

*End of motion spec.*
