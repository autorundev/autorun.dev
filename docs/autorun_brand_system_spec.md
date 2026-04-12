# autorun — Brand System Specification

**Version:** 1.0
**Status:** Final
**Scope:** Identity, typography, color, usage.
For motion and product-level state grammar see `autorun_motion_spec.md`.

---

## 1. Core definition

**autorun — это AI-native бренд, построенный не вокруг статичного логотипа, а вокруг контейнера состояния.**

Постоянная оболочка `[ ]` задает рамку системы, а внутренний символ показывает состояние, намерение или активность. Идентичность autorun раскрывается через поведение, динамику и ограниченный алфавит состояний.

> Not a static logo. A runtime grammar.

---

## 2. Brand idea

autorun — это не «веселый AI» и не «магический помощник».
Это тихая, автономная, точная вычислительная сущность, которая живет внутри CLI-среды.

Бренд должен передавать:

- скрытую активность
- автономное исполнение
- машинную ясность
- ощущение присутствия агента
- AI-native поведение без визуального шума

---

## 3. Brand architecture

Система состоит из двух уровней.

### 3.1. Brand layer (external)

Ограниченный набор из 5 знаков, которые видит внешняя аудитория.
Эти знаки появляются в лендинге, соцсетях, аватарах, favicon,
маркетинговых материалах.

### 3.2. Product layer (internal)

Расширенный алфавит state-grammar, который живет внутри продуктов
как UI-feedback. Описан в отдельном `autorun_motion_spec.md`.

Принцип разделения:

> Brand is seen. Grammar is used.

---

## 4. Brand alphabet (5 marks)

Финальный закрытый алфавит для внешней идентичности:

```txt
[*]  core      — identity, active intelligence
[>]  action    — prompt, execute, CTA
[:]  presence  — attached, listening
[!]  alert     — warning, anomaly
[x]  stop      — fail, abort, terminated
```

Все остальные состояния (`[_] [.] [-] [/] [\] [+] [?]`) остаются во внутренней
product-grammar и не выносятся в brand-коммуникацию.

### 4.1. Why exactly these five

- `[*]` — без него нет идентичности
- `[>]` — без него нет action/CTA и терминальной грамматики
- `[:]` — единственный знак «тихого присутствия», критичен для tone
- `[!]` и `[x]` — покрывают весь диапазон негативных состояний,
  который публика может встретить (ошибки, сбои, downtime)

Пять знаков — верхняя граница того, что человек запоминает как
единую систему. Больше — становится шум.

---

## 5. Primary identity mark

```txt
[*]
```

### 5.1. Semantics

- AI / генеративность
- wildcard / placeholder
- masked intelligence
- agent core
- hidden engine inside a shell

### 5.2. Primary use

- logo
- favicon
- avatar (Telegram, GitHub, X)
- hero mark
- email signature
- OG-image

### 5.3. Lockups

**Horizontal (default):**

```txt
[*] autorun.dev
```

**Stacked (for square formats — avatar, sticker):**

```txt
[*]
autorun
```

**Isolated (для favicon, app icon):**

```txt
[*]
```

---

## 6. Secondary action mark

```txt
[>]
```

### 6.1. Semantics

- prompt
- ready
- execute
- direction
- interaction

### 6.2. Primary use

- CTA buttons
- prompt lines
- input cursors
- «next» indicators
- command preview

### 6.3. Relationship to `[*]`

- `[*]` — кто мы
- `[>]` — что мы делаем

Они не конкурируют. `[*]` живет в identity-слое, `[>]` живет в
interaction-слое. На одной поверхности допустимо использовать оба.

---

## 6.4. Sub-brand system

autorun.dev — это **umbrella brand** для семейства продуктов.
Каждый продукт имеет свой бренд, домен, и визуальную идентичность,
но все они живут в общей грамматике.

### 6.4.1. Identity hierarchy

```
autorun.dev          parent brand, [*] cyan
  ├── vectoros       sub-brand, pure white
  ├── playsnap       sub-brand, play(white) + snap(chartreuse)
  └── ********       sub-brand (stealth), muted
```

### 6.4.2. Parent vs sub-brand rules

- **Parent brand** (autorun.dev) использует `[*]` в `--state-core`
  cyan. Это unchanging identity.
- **Sub-brands** получают свой **brand color на имени**, но не
  получают свой state-знак. State-знаки — это grammar, они
  остаются в руках parent-бренда.
- **TLD не часть sub-brand identity.** `vectoros.ai` → в тексте
  «vectoros». `playsnap.bot` → «playsnap». TLD живёт только в
  URL-href и адресной строке.

### 6.4.3. Sub-brand colors (current)

```
vectoros       #FFFFFF   pure white — reflective intelligence
playsnap       play: #FFFFFF / snap: #C8FF00  (two-tone)
********       muted grey (inherits --fg-1)
```

### 6.4.4. When sub-brand is «live»

Sub-brand в projects-списке получает:
- `[:]` presence (knows it's live, listening)
- Имя в brand color
- Clickable (вся строка = ссылка на домен)
- Стрелка `→` при hover

### 6.4.5. When sub-brand is «stealth»

- `[.]` ping (tiny activity signal, «в разработке»)
- Имя redacted звёздочками (`********`)
- Описание тоже redacted
- Не clickable, не hoverable
- Весь блок в `--fg-1` muted

### 6.4.6. Parent brand always uses full TLD

Исключение для sub-brand TLD rule — **сам autorun.dev** в header
лендинга всегда показывается целиком. `.dev` — часть parent
identity.

```
[*] autorun.dev                  ← полное имя с TLD
    ai-native tools & products
```

Это разделяет parent (инфраструктура, umbrella) от products
(чистые имена).

---

## 6.5. Terminal dialogue grammar

**Это самое важное правило брендовой грамматики, когда бренд
появляется в формате «диалога терминала» (лендинг, демо,
скриншоты, презентации).**

Вопрос: когда пользователь вводит команду в терминал, какой знак
ставится перед вводом, а какой перед ответом системы?

### 6.5.1. Core rule

```
[>]  — всё, что пишет пользователь
[*]  — всё, чем система отвечает
```

Это не «`[>]` иногда и `[*]` иногда». Это **жёсткое правило**:
`[>]` — input, `[*]` — output. Оба никогда не меняются местами.

### 6.5.2. Canonical example

```
[>] help
[*] available commands:
    about     — what we do
    projects  — things we ship
    ...

[>] about
[*] what we do
    autorun.dev builds ai-native products...

[>] _
```

**Ключевое правило для dialogue rendering:**

1. **Нет пустой строки между `[>]` input и `[*]` output.** Ответ
   идёт сразу под командой.
2. **`[*]` не повторяет имя команды.** Вместо этого используется
   подстрочник из `help` («what we do» вместо «about»). Команда
   уже видна в истории как `[>] about`, дублировать название
   избыточно.
3. **Пустая строка только перед следующим `[>]` prompt.**
   Разделяет блоки команда-ответ, не внутри блока.

### 6.5.3. Remaining state marks in dialogue

Остальные знаки используются по семантике **внутри** ответа системы:

```
[.]  — процесс/трассировка           (booting, syncing, loading)
[:]  — готовность/слушает             (ready, attached, listening)
[!]  — ошибки и предупреждения        (not found, warning, drift)
[x]  — фатальные сбои                 (aborted, denied, failed)
[+]  — разблокировки/расширения       (unlocked, attached context)
[/][\][|][-] — spinner frames         (progress-строки, см. motion spec)
```

### 6.5.4. Boot sequence (специальный случай)

При старте терминала нет пользовательского ввода, поэтому `[>]`
там не появляется. Грамматика boot-строк:

```
[*] autorun.dev              ← identity header
    ai-native tools           ← continuation (без знака)

[.] booting ... ok           ← процесс
[:] agents online: 3         ← состояние готовности
[:] type `help` to continue  ← инструкция пользователю

[>] _                        ← cursor ready for input
```

**Важно:** инструкции «введи команду / type help» идут с `[:]`
(presence/listening), не с `[>]`. `[>]` = активный ввод, а
инструкция — это описание готовности системы принять ввод.

### 6.5.5. Error handling

Ошибки всегда `[!]` (alert), даже если это «мягкая» ошибка:

```
[>] projec

[!] command not found: projec
    try `help`
```

Смертельные ошибки (connection lost, fatal) — `[x]`:

```
[>] connect wallet

[x] connection refused.
    try again later.
```

### 6.5.6. Multi-step output

Если ответ системы включает процесс (не мгновенный), используется
комбинация:

```
[>] sudo make me a sandwich

[*] ok.
[/] making a sandwich...       ← spinner (см. motion spec)
[*] making a sandwich... done  ← финальное состояние
[/] finding a plate...
[*] enjoy!
```

Каждый процесс: `[/]` spinner → `[*]` done.

### 6.5.7. Nested prompts (anti-pattern)

Иногда соблазн использовать `[>]` внутри ответа системы, как
«sub-команда». **Не делать так** — создаёт путаницу про то, кто
что ввёл:

```
[>] team

[*] team
    ...

    [>] whoami                ← ❌ читается как ввод пользователя
        founder: anton ...
```

Правильно — сделать плоский ответ без имитации вложенной
команды:

```
[>] team

[*] team
    small, senior, remote. ...

    founder:  anton frolov
              vibe coder (unironically)
    ...
```

### 6.5.8. Anti-examples

```
❌ [>] welcome to autorun.dev            ← system output с [>]
✅ [*] welcome to autorun.dev

❌ [*] help                              ← user input с [*]
✅ [>] help

❌ [>] type `help` to continue           ← инструкция с [>]
✅ [:] type `help` to continue

❌ [!] booting ... ok                    ← процесс с [!]
✅ [.] booting ... ok

❌ [>] projec                            ← ok, но ответ:
   [>] command not found                 ← ❌ ошибка с [>]
✅ [>] projec
   [!] command not found: projec         ← ✅
```

### 6.5.9. Quick test

Перед публикацией любого диалога задать вопрос:

1. **Это говорит человек или система?**
   - Человек → `[>]`
   - Система → `[*]` (или другой state-знак по семантике)

2. **Если система — это идентичность, процесс, готовность, или
   ошибка?**
   - Идентичность/ответ → `[*]`
   - Процесс/ping → `[.]`
   - Готовность/слушает → `[:]`
   - Ошибка → `[!]` или `[x]`
   - Разблокировка → `[+]`

---

## 7. Typography

### 7.1. Primary typeface

**Berkeley Mono** — основной моноширинный шрифт бренда.

Почему:
- лучший современный моно-шрифт с CLI-character
- отличная читаемость в мелких кеглях
- правильные пропорции для `[ ]` и внутренних глифов
- паттерн «tasteful AI-native startups» (используют многие
  dev-tool бренды 2024–2026)

Лицензия: коммерческая, разовая покупка.

### 7.2. Fallback stack (web)

```css
font-family: "Berkeley Mono", "JetBrains Mono", ui-monospace, monospace;
```

Стек только моноширинный. Ни при каких условиях не должен
подставляться sans-serif или serif шрифт.

Если Berkeley Mono недоступен (license/budget), использовать
**JetBrains Mono** как основной — он open source и сохраняет
90% нужного character.

### 7.3. Weights

Используем только два веса:

- `Medium` (500) — основной текст, команды, тело
- `ExtraBold` (800) — имена команд, активные состояния, заголовки

Regular (400), Light, SemiBold, Bold, Black **не используем**.
Дисциплина веса = дисциплина голоса.

Выбор 500/800 вместо более стандартных 400/700 даёт бренду
дополнительную «плотность» — текст читается как напечатанный
на реальном принтере, не как цифровой рендер. Это усиливает
tactile, machine-made feel без ухода в декоративность.

### 7.4. Type scale

Фиксированная шкала на моно-логике (каждая ступень = степень двойки
или делится на базовый unit):

```
xs    12px / line-height 16px   — meta, timestamps
sm    14px / line-height 20px   — system messages, ghost text
base  16px / line-height 24px   — body, commands, primary
lg    20px / line-height 28px   — section labels
xl    24px / line-height 32px   — page headers
2xl   32px / line-height 40px   — hero text
3xl   48px / line-height 56px   — hero logo (desktop)
```

### 7.5. Typographic rules

- **Никакого tracking.** Моно-шрифт рассчитан на фиксированные
  расстояния. Letter-spacing всегда 0.
- **Никаких курсивов.** CLI не знает italic. Для акцента —
  bold или цвет.
- **Lowercase по умолчанию.** UPPERCASE только для коротких
  статус-лейблов (`LIVE`, `STEALTH`, `ABORTED`).
- **Ligatures on.** Особенно стрелки `->`, `=>`, `!=`, `==`.
- **Никаких soft hyphens, em dashes для эмфазы.** Используем
  `—` только как разделитель в списках. Для эмфазы — цвет.

### 7.6. One-font discipline

**У бренда один шрифт. Точка.**

Нет secondary typeface. Нет sans-serif для длинных текстов.
Нет serif для «serious» документов. Весь бренд — моноширинный
от лендинга до юридических документов.

Если нужен контраст для длинного нарративного текста (эссе, блог),
использовать тот же шрифт в Regular на увеличенной line-height
(28–32px для 16px body).

Это осознанное ограничение — часть системы.

---

## 8. Color

Цветовая система строится по логике CLI-терминала: нейтральный
фон + функциональные акценты + подчеркнутая сухость. Цвет
работает как сигнал состояния, не как декорация.

### 8.1. Base palette

```
--bg-0    #0A0A0A   near-black, primary background (dark mode)
--bg-1    #111111   elevated surfaces
--bg-2    #1A1A1A   cards, inputs
--fg-0    #E8E8E8   primary text
--fg-1    #A0A0A0   secondary text
--fg-2    #606060   tertiary, ghost, meta
--fg-3    #404040   disabled, borders
```

Light mode (вторичный):

```
--bg-0    #FAFAFA
--bg-1    #F4F4F4
--bg-2    #EDEDED
--fg-0    #0A0A0A
--fg-1    #404040
--fg-2    #707070
--fg-3    #B0B0B0
```

### 8.2. State palette

Цвета привязаны к семантике state-алфавита. Не используются
декоративно.

```
--state-core     #7DD3FC   [*]  cyan/blue — active intelligence
--state-action   #E8E8E8   [>]  fg-0     — neutral, ready
--state-presence #A78BFA   [:]  violet    — attached, subtle
--state-live     #4ADE80   green     — status: live, ok
--state-alert    #FBBF24   [!]  amber     — warning
--state-stop     #F87171   [x]  red       — fail, abort
--state-stealth  #A0A0A0   fg-1     — redacted, hidden
```

Мнемоника: чем тише состояние — тем холоднее и приглушеннее
цвет. Чем критичнее — тем теплее и насыщеннее.

### 8.3. Sub-brand palette

Каждый sub-brand получает свой акцентный цвет. Используется
только на имени продукта, не на state-знаках.

```
--brand-autorun          #7DD3FC   cyan (= state-core)
--brand-vectoros         #FFFFFF   pure white (dark mode)
                         #0A0A0A   near-black (light mode)
--brand-playsnap-play    #FFFFFF / #0A0A0A
--brand-playsnap-snap    #C8FF00 / #65A30D
```

В light-теме color-mapping инвертируется для контраста. Sub-brand
visual identity сохраняется, адаптируется яркость.

### 8.4. Color rules

- **Monochrome first.** По умолчанию весь UI — только fg/bg
  токены. Цвет появляется только как state-сигнал.
- **Never gradient.** Никаких градиентов, никаких glow-эффектов,
  никакого «AI-shimmer». Это отдельно прописано в anti-patterns.
- **One accent per screen.** На одном экране не больше одного
  state-цвета одновременно (кроме dashboard с явной грамматикой
  статусов).
- **High contrast always.** Все цвета проходят WCAG AA на
  соответствующих фонах. Minimum 4.5:1 для body text.

### 8.5. Usage examples

```
default text         --fg-0 on --bg-0
ghost / system       --fg-2 on --bg-0
command name         --fg-0 bold
logo [*]             --state-core
prompt [>]           --state-action
status [status:live] --state-live
status [redacted]    --state-stealth
error [!]            --state-alert
fatal [x]            --state-stop
```

---

## 9. Scale & legibility

Знак `[*]` должен работать на всех размерах без потери character.

### 9.1. Scale matrix

```
16px   favicon           — [*] читается как 3 символа
24px   small avatar      — skobki отчетливые
32px   app icon          — отличная читаемость
48px   telegram avatar   — оптимальный размер для character
64px   github avatar     — decorative clarity
128px  OG-image corner   — full system presence
256px+ hero on landing   — max expressiveness
```

На размерах <16px знак **не используется**. Вместо него —
единичный glyph `*` без скобок, или полнотекстовое `autorun`.

### 9.2. Rendering rules

- Знак рендерится тем же моно-шрифтом, что и весь сайт
  (Berkeley Mono Regular).
- Никаких SVG-стилизаций, никаких кастомных иконок `[*]`.
  Знак — это всегда три typographic character в моно-шрифте.
- Единственное исключение: favicon.ico (16×16, 32×32) —
  pre-rendered PNG из Berkeley Mono.

### 9.3. Clear space

Минимальное свободное пространство вокруг `[*]` = высота глифа.

```
     ___________
    |           |
    |    [*]    |    ← clear space = 1x cap height со всех сторон
    |___________|
```

---

## 10. Brand voice

Бренд говорит не одним голосом, а двумя. Это нормально —
терминал сам по себе bilingual: он говорит сухо в system output
и человечно в comments. autorun так же.

### 10.1. Two registers

**System register** — сухой, машинный, без эмоции. Для UI,
status-сообщений, in-product feedback, логов, ошибок.

**Human register** — terse, самоироничный, мемный, терминально-
грамотный. Для лендинга, соцсетей, описаний проектов, команды,
commit-messages, release notes, any «front-facing» копирайта.

Два регистра не смешиваются на одной поверхности. System-текст
остается system-текстом. Но рядом с `[!] drift detected` в логе
может быть человеческий commit-message типа «fix: стоп лосить
деньги юзеров».

### 10.2. Shared principles (оба регистра)

- **Lowercase bias.** Почти всё в lowercase. Title Case — только
  юридические документы.
- **No AI-marketing language.** Запрещённые слова: «revolutionary»,
  «magical», «seamless», «powerful», «cutting-edge»,
  «game-changing», «intelligent» (в marketing context),
  «supercharged», «next-generation», «unleash», «empower»,
  «delightful», «reimagine».
- **No hyperbole.** Никаких «the best», «world-class», «industry-
  leading». Конкретика или самоирония вместо превосходной степени.
- **Terse.** Короткие предложения. Разбивка на отдельные фразы —
  часть грамматики. «small crew. tight loops.» лучше, чем
  «we're a small crew with tight feedback loops».

---

### 10.3. System register (sub-voice A)

Для in-product UI, CLI output, логов, статусов.

**Принципы:**
- без эмоции
- без прилагательных
- машинная констатация
- глагол + объект, максимум
- дублирование знаком обязательно

**Примеры:**

```
[:] attached
[>] ready
[*] running
[+] context loaded
[.] syncing
[-] on hold (rate limit)
[_] idle
[!] drift detected
[!] execution failed
[x] aborted
[x] connection lost
[?] unresolved input
```

**Anti-examples (не делай так):**

```
[:] Successfully attached to your workspace! 🎉    ← эмоция
[>] Ready when you are!                            ← human tone в system
[!] Oops, something went wrong.                    ← mascot voice
[x] We couldn't complete that action.              ← corporate-speak
```

---

### 10.4. Human register (sub-voice B)

Для лендинга, соцсетей, описаний, команды, release notes.

**Принципы:**
- dry wit вместо восторга
- самоирония вместо bragging
- инсайдерский терминальный юмор (для dev/crypto-аудитории)
- mem-references допустимы, если они работают без расшифровки
- легкая дерзость разрешена, позерство — нет

**Что можно:**

- играть со стереотипами инди-хакеров и AI-стартапов
- признавать ограничения (`(unironically)`, `it works on my machine`)
- использовать терминальные метафоры (`deploy`, `ship`, `commit`,
  `rebase`, `segfault`)
- ссылаться на мем-культуру dev-твиттера, crypto-Telegram,
  AI-reddit — но без лобового цитирования
- шутить над собой, не над пользователем

**Что нельзя:**

- шутки про конкурентов
- шутки, которые надо объяснять
- «wholesome» юмор в стиле корпоративных Slack-каналов
- emoji в любом виде (кроме ASCII-смайлов в debug-контексте)
- меме-референсы старше 3 лет (`such wow`, `many code`)
- cringe-попытки быть «relatable»

---

### 10.5. Meme library (human register)

Готовые формулы для описаний, которые можно использовать и
расширять. Разбиты по назначению.

#### Для команды / founders

```
vibe coder (unironically)
1x engineer, 10x taste
/dev/founder
ships or dies trying
runs the autorun
prompt > code
founder mode: enabled
claude's #1 power user
segfault-driven development
ctrl+c ctrl+v ctrl+ship
agents do the heavy lifting
writes specs, ships code
404: work-life balance
product, growth, late nights
ex-crypto, now ai-native
```

#### Для stack / how we build

```
sqlite-and-prayers
postgres (obviously)
redis-as-a-database
json-files-in-git
ctrl-s-as-a-service
eventual-consistency
it-works-on-my-vps
tmux + vibes
we deploy on fridays
cargo cult devops
artisanal bash scripts
bring-your-own-bugs
rm -rf / node_modules therapy
works-in-production
stack overflow driven
copy-paste-first architecture
```

#### Для about / manifesto

```
small crew. tight loops.
no meetings that could've been a commit.
software that runs where people already are.
the best software in 2026 doesn't have a ui.
we don't ship mvps. we ship.
agents, not apps.
built like a terminal. feels like one.
boring stack. weird products.
async by default, decisive on demand.
one bot to rule them all (we won't)
```

#### Для projects / status

```
[status: live]
[status: stealth]
[status: shipping]
[status: burning down]
[status: works on my machine]
[status: it's complicated]
[status: ask in dm]
[redacted]
coming when it's ready
trust the process
```

#### Для release notes / changelog

```
ship log 001: broke things, fixed most
ship log 002: now with 20% more crashes
fix: стоп лосить деньги юзеров
feat: agent can finally count
chore: renamed thing, broke everything
refactor: yolo
revert: revert: revert
hotfix: it was dns. it's always dns.
improvement: less bad
```

#### Для hiring / careers

```
hiring: always, if you're the real thing.
no whiteboards. ship something.
we value taste > pedigree.
remote, async, fast.
bring your own ide.
if you think in systems, we'll find you.
```

#### Для error states / 404 / empty

```
404: page not found. try `help`.
nothing here yet. check back after coffee.
this feature is stealth. ask in dm.
empty state: the best state.
loading... (we're also waiting)
```

---

### 10.6. Register switching examples

Как выглядит переключение между регистрами на одной поверхности:

**Landing page (human register):**
```
autorun.dev builds ai-native products that run
where people already live — messengers, games,
markets. small crew. tight loops. no meetings
that could've been a commit.

thesis: the best software in 2026 doesn't have
a ui. it has an agent.
```

**Product UI (system register):**
```
[:] attached to telegram
[+] context loaded: 12 docs
[*] running trade_001
[!] drift detected: slippage > 0.5%
[x] aborted
```

**Commit message (human, but terse):**
```
fix: agent no longer buys tops
```

**Error page (human register с system-элементами):**
```
[x] session aborted

something broke. we logged it.
try refresh, or come back later.
if it keeps happening → hello@autorun.dev
```

---

### 10.7. Voice test

Перед публикацией любого текста задать три вопроса:

1. **«Звучит ли это как Apple keynote?»** Если да — переписать.
2. **«Можно ли выкинуть половину слов?»** Если да — выкинуть.
3. **«Поверю ли я в это, если встречу в чужом твиттере?»**
   Если нет (слишком пафосно или cringe) — переписать.

---

### 10.8. Register discipline (no collision rule)

Два регистра легко съезжают друг в друга, если не держать
дисциплину. Ниже — правила разрешения конфликтов.

#### Кто говорит, не где говорит

Регистр определяется **subject of speech**, не местом:

- **Система** (автомат, агент, код) → system register
- **Команда** (человек, бренд, копирайтер) → human register

Пример: на одной странице «error 500» может быть и system-месседж
(`[x] internal server error`), и human-комментарий от команды
(`что-то сломалось. мы уже смотрим.`) — они не конфликтуют,
потому что говорят разные субъекты.

#### Одна поверхность — один субъект за раз

На одной строке или в одном блоке нельзя смешивать регистры:

```
[x] session aborted — oops we broke it ✨   ← смешение, плохо
[x] session aborted                        ← system, ok
     что-то сломалось. мы уже смотрим.    ← ниже, human, ok
```

Визуальное разделение (отступ, цвет, размер) — обязательно.

#### Gray zones и как их решать

**Push-уведомления:**
- системное: `[!] drift detected on trade_001`
- человеческое: `вышла новая версия, жми обнови`
- Правило: если уведомление генерится автоматически без участия
  человека — system. Если его пишет маркетинг — human.

**Empty states:**
- Всегда human register. Empty state — это разговор с
  пользователем, не системный лог. `nothing here yet. check
  back after coffee.` — правильно. `[_] no data` — сухо,
  но допустимо только в чисто техническом UI (dashboards,
  dev-tools).

**Release notes / changelog:**
- Заголовки версий — human register с мемами.
- Технический список изменений — system-лайк, но на человеческом:
  `fix: agent no longer buys tops` (не `[x] fixed bug in agent`).

**Error modals:**
- Технический текст — system.
- Recovery action (кнопка, совет) — human.
- Пример:
  ```
  [x] connection lost
  
  проверь интернет. если это мы — напиши hello@autorun.dev.
  [retry]
  ```

**Twitter/Telegram posts:**
- Всегда human register. Даже если постишь про деплой —
  это говорит команда, не система. `ship log 042: agent
  теперь умеет считать` — да. `[+] agent v2.1 deployed` —
  только если это автопост из CI.

#### Частые ошибки и как их избежать

```
❌  [*] Welcome to autorun! 🎉
✅  [*] running                      (system)
✅  добро пожаловать. type help.     (human, рядом)

❌  [!] Oh no! Something went wrong 😔
✅  [!] execution failed             (system)
✅  сломалось. смотрим.              (human, ниже)

❌  we [>] ship fast and [*] iterate
✅  we ship fast and iterate         (human)
✅  [>] ship · [*] iterate           (system, если UI-label)

❌  [status: living my best life]
✅  [status: live]                   (system — фиксированный алфавит)
✅  living my best life              (human, в отдельной строке)
```

#### Правило переключения

Если сомневаешься, какой регистр использовать:

1. Это пишет код или человек?
2. Если код — есть ли знак из state-алфавита, который это
   описывает? Используй его.
3. Если человек — выкини весь machine-language из фразы,
   оставь только terse human voice.

**Никогда не хибридизируй**: `[>] ready to vibe` — это мертвая
зона между регистрами, которая не работает ни там, ни там.

---

## 11. Design principles

### 11.1. What must remain constant

- квадратные скобки как рамка
- ограниченный алфавит из 5 внешних знаков
- моноширинное ощущение
- одна гарнитура (Berkeley Mono / JetBrains Mono)
- lowercase bias
- controlled color palette
- никаких градиентов и glow

### 11.2. What may vary

- конкретный внутренний символ по состоянию
- контекст появления знака
- текстовые подписи рядом со знаком
- ритм микродвижения (см. motion spec)
- плотность / spacing в разных surfaces

### 11.3. What to avoid

- рисованная «звезда»
- градиенты, glow, soft shadows
- sparkle-эстетика
- мультяшные персонажи и маскоты
- hacker role-play стиль («h4ck th3 pl4n3t»)
- generic «AI magic» visuals (нейросетевые волны, particle swarms)
- расширение алфавита знаков без системной причины
- второй шрифт
- sans-serif в коммуникациях бренда
- title case
- emoji в системной коммуникации

---

## 12. Implementation checklist

Для запуска бренда в production:

```
[x] core concept approved
[>] purchase Berkeley Mono license
[>] design favicon.ico (16/32)
[>] render [*] as PNG for non-mono surfaces
[>] build color tokens in CSS + Figma variables
[>] audit landing page against this spec
[>] prepare OG-image template
[>] write voice-guide one-pager for copywriters
[>] trademark consultation for lockup [*] autorun.dev
```

---

## 13. Appendix: quick-reference card

```
IDENTITY
  primary mark         [*]
  action mark          [>]
  lockup               [*] autorun.dev

TYPOGRAPHY
  primary              Berkeley Mono
  fallback             JetBrains Mono
  weights              Regular (400), Bold (700)
  case                 lowercase bias

COLOR
  background           #0A0A0A
  text                 #E8E8E8
  core accent          #7DD3FC
  live                 #4ADE80
  alert                #FBBF24
  stop                 #F87171
  stealth              #A0A0A0

VOICE
  terse, factual, lowercase
  no marketing-speak
  self-aware, not self-promotional

MOTION
  see autorun_motion_spec.md
```

---

*End of brand spec.*
