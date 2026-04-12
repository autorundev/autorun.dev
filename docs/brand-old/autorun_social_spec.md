# autorun — Social Channel Specification

**Version:** 1.0
**Status:** Final
**Scope:** Channel-specific voice и формат для внешних каналов.
Companion to `autorun_brand_system_spec.md`.

---

## 1. Purpose

Brand spec описывает два регистра голоса (system / human). Этот
документ переводит их в конкретные каналы: Twitter/X, Telegram,
LinkedIn, GitHub, blog, email.

Каждый канал имеет свои ограничения, свою аудиторию и свой
допустимый регистр. Но все они говорят одним брендом.

---

## 2. Channel matrix

```
channel          audience              register     cadence
────────────────────────────────────────────────────────────────
twitter/x        devs, ai, crypto      human        3–7/week
telegram         insiders, ru-speakers human        2–4/week
linkedin         b2b, hiring           human (soft) 1–2/week
github readme    devs                  system+human per release
blog             thinkers, long-form   human        1–2/month
email/newsletter existing users        human        1/month
hello@           incoming              human        on-demand
```

---

## 3. Twitter / X

**Handle:** `@autorundev`
**Bio template:**
```
[*] ai-native tools & products
ships where people already are.
autorun.dev
```

### 3.1. Voice

Human register, максимально terse. Твиттер — это lowercase,
dry wit, dev-твиттер culture. Никакого корпоративного голоса.

### 3.2. Post types

**Ship announcements:**
```
[*] shipped.
vectoros v0.4 — agent now remembers things.
t.me/vectorosbot
```

**Shower thoughts / takes:**
```
the best software in 2026 doesn't have a ui.
it has an agent.
```

**Dev logs:**
```
day 127: claude wrote 87% of today's commits.
i wrote the prompts.
who's the engineer here.
```

**Self-roast:**
```
our stack: sqlite-and-prayers.
it's fine. sqlite is actually great.
the prayers — unclear.
```

**Replies / engagement:**
- Отвечать в том же регистре, что собеседник
- Если вопрос серьезный — human register без мемов
- Если шутка — ответ с шуткой, без вымученности

### 3.3. Formatting rules

- Lowercase (всегда)
- Разрыв строк вместо длинных предложений
- Максимум одна ссылка на пост
- Никаких hashtags (`#AI #startup #buildinpublic` — запрещено)
- Никаких emoji (кроме `→` стрелок в редких случаях)
- Threads допустимы, но короткие (3–5 постов)

### 3.4. What never to post

- «We're excited to announce...»
- Hashtag-спам
- Quote-tweet с «this 👆» или «preach»
- Generic «happy friday team!» контент
- Subtweets / jabs в конкурентов
- Cryptocurrency price speculation (это не наш бренд)
- Политика

---

## 4. Telegram

**Channel:** `@autorundev`
**Audience:** русско- и англоязычные инсайдеры, ранние юзеры,
crypto/dev-среда.

### 4.1. Voice

Human register, можно чуть теплее чем в Twitter. Telegram более
personal канал — допустима прямая речь от команды, behind-the-
scenes контент, длинные посты.

Язык: **смешанный** (ru + en). Это нормально для русскоязычного
dev/crypto-контекста. Терминальная терминология всегда en.

### 4.2. Post types

**Drops / ship logs:**
```
[*] shipped vectoros v0.4.

что нового:
· агент помнит контекст между сессиями
· поддержка mcp-серверов
· починили баг, где он забывал кто вы

попробовать: t.me/vectorosbot
```

**Notes from the trenches:**
```
неделя 17: деплоили в пятницу.
сломали прод. починили за 3 часа.
урок не выучен.
```

**Long-form takes (400–800 слов):**
Длинные посты про продуктовые решения, архитектуру,
observations. Всегда human register, но с большей глубиной
чем в твиттере.

**Polls:**
Используем для реального фидбека, не для engagement-фарма.

### 4.3. Formatting rules

- Markdown-подобное форматирование допустимо (bold для
  акцентов, code-blocks для команд)
- Emoji — не использовать, даже в «дружеских» постах
- Ссылки — в конце поста, не в середине
- Отдельные мысли разделяем пустой строкой, не `·` или `—`

---

## 5. LinkedIn

**Handle:** `autorun.dev`

### 5.1. Voice

Human register в **soft mode**. LinkedIn — это аудитория,
которая может быть клиентами, инвесторами или будущими
сотрудниками. Мемы минимизируем, но не включаем корпоративный
голос.

Задача LinkedIn: показать экспертизу и серьезность намерений,
не теряя brand character.

### 5.2. Post types

**Product milestones:**
```
vectoros crossed 10,000 daily active users this week.

built by two people. no funding. telegram-native.

the bet: ai-native products don't need app stores.
they live where people already are.
```

**Hiring:**
```
we're hiring a senior product engineer.

remote, async, ship-focused. no whiteboards,
no take-homes. send us something you built.

autorun.dev/careers
```

**Thought leadership (умеренно):**
Можно. Но без «here are 7 lessons from my startup journey 🧵»
форматов. Конкретный insight, коротко, без thread-бейта.

### 5.3. Rules

- Можно Title Case в заголовках, если так лучше читается
- Нет emoji
- Нет «I'm thrilled to announce»
- Нет thread-bait форматов
- Не использовать «humbled», «grateful», «blessed»

---

## 6. GitHub README

**Repos:** `github.com/autorundev/*`

### 6.1. Voice

**Смешанный регистр**, единственный случай где это разрешено
и даже правильно.

- Header / tagline: human
- Installation / usage: system (технический язык)
- Examples: system
- Acknowledgments / license: human

### 6.2. Template

```markdown
# [*] project-name

one-line description in human register.

## install

\`\`\`bash
npm install project-name
\`\`\`

## usage

\`\`\`ts
// system register in code
const agent = new Agent({ ... });
await agent.run();
\`\`\`

## what this is

human register. 2–3 параграфа. что делает, зачем,
на кого рассчитано. no marketing-speak.

## status

[status: live] · [status: stealth] · [status: burning down]

## license

MIT. made by autorun.dev.
```

---

## 7. Blog / long-form

**Domain:** `autorun.dev/blog` (TBD)
**Cadence:** 1–2 поста в месяц.

### 7.1. Voice

Human register, но с развернутой аргументацией. Блог — это место,
где можно писать абзацами, не фразами. Но все еще без marketing-
speak и без «7 lessons I learned».

### 7.2. Post types

- Product essays (почему мы построили X так, а не иначе)
- Technical deep-dives (архитектура, trade-offs)
- Observations (what we're seeing in ai-native product space)
- Release notes (расширенная версия ship logs)

### 7.3. Rules

- Lowercase заголовки
- Никаких «Table of Contents» для постов <2000 слов
- Код-примеры в terminal-style (оформление `[>]`, `[*]`, etc.)
- Личные местоимения: `we` > `I` (даже если пишет один человек)

---

## 8. Email / newsletter

### 8.1. Subject lines

Human register, lowercase, terse:

```
[*] shipped: vectoros v0.4
ship log 007
three things we broke this month
```

Избегаем:
```
🚀 BIG news from autorun!
You won't believe what we just launched
Don't miss this update
```

### 8.2. Body

- Lowercase
- Короткие абзацы (2–3 предложения)
- Минимум одна ссылка на действие
- Подпись: `— autorun.dev` или `— anton, autorun.dev`

### 8.3. `hello@autorun.dev`

Для входящих писем:

- Отвечаем в том же регистре, что пишущий
- Если это серьезный business inquiry — human register без
  мемов
- Если user-support — быстро, по делу, без «thank you for
  reaching out»
- Если spam / sales pitch — не отвечаем

---

## 9. Cross-channel rules

### 9.1. Single source of truth

Product announcements идут в такой последовательности:

```
1. ship to production
2. tweet (short)
3. telegram post (longer)
4. linkedin (soft version)
5. email newsletter (end-of-month digest)
6. blog post (if there's a story)
```

Не параллельно, не одновременно. Twitter первым — он задает тон.

### 9.2. Brand consistency

Что должно быть одинаковым везде:
- avatar (`[*]` в брендовом cyan)
- handle (`autorundev` или `autorun.dev`)
- bio base («ai-native tools & products»)
- lowercase bias
- one-font typography (где применимо)

Что может варьироваться:
- длина постов
- tone intensity (Twitter острее, LinkedIn мягче)
- уровень технических деталей

### 9.3. Response time

Не создавать ожидания 24/7 присутствия. Мы маленькая команда,
отвечаем когда можем. В bio каналов где релевантно:

```
async by default. we reply when we can.
urgent → hello@autorun.dev
```

---

## 10. Quick-reference card

```
TWITTER
  lowercase, terse, dev-humor
  no hashtags, no emoji
  3–7 posts/week

TELEGRAM
  mixed ru/en ok
  longer posts, teplее tone
  no emoji

LINKEDIN
  soft human register
  no corporate speak
  no emoji

GITHUB
  mixed register (ok here)
  [*] in project headers
  system for code, human for prose

BLOG
  human, developed argumentation
  lowercase titles
  1–2 posts/month

EMAIL
  lowercase subjects
  terse body
  sign as autorun.dev or anton

EVERYWHERE
  no emoji
  no hashtags
  no "we're excited to announce"
  lowercase bias
  one voice, many channels
```

---

*End of social spec.*
