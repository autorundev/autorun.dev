/**
 * autorun.dev — public site content + config
 *
 * Single source of truth для публичного контента лендинга.
 * Easter eggs и hidden commands живут на бэкенде (/api/cmd).
 *
 * State grammar reminder:
 *   [*]  core       — identity, active output, system response
 *   [>]  action     — user input, prompt
 *   [:]  presence   — attached, listening
 *   [.]  ping       — trace, heartbeat, low activity (boot)
 *   [/][\][|][-]    — spinner frames (transitions only)
 *   [!]  alert      — warning, anomaly
 *   [x]  stop       — fail, abort
 *   [+]  extend     — attach, augment (unlocks)
 */

// ─────────────────────────────────────────────────────
// CONFIG

export const config = {
  lang: 'en',            // 'en' | 'ru'
  theme: 'dark',         // 'dark' | 'light'
  version: 'v0.1.0',
  agentsOnline: 3,
  apiEndpoint: '/api/cmd',   // backend для hidden commands
};

// ─────────────────────────────────────────────────────
// THEMES

export const themes = {
  dark: {
    '--bg-0':          '#0A0A0A',
    '--bg-1':          '#111111',
    '--bg-2':          '#1A1A1A',
    '--fg-0':          '#E8E8E8',
    '--fg-1':          '#A0A0A0',
    '--fg-2':          '#606060',
    '--fg-3':          '#404040',
    '--state-core':    '#7DD3FC',
    '--state-action':  '#E8E8E8',
    '--state-presence':'#A78BFA',
    '--state-live':    '#4ADE80',
    '--state-alert':   '#FBBF24',
    '--state-stop':    '#F87171',
    '--state-stealth': '#A0A0A0',
  },
  light: {
    '--bg-0':          '#FAFAFA',
    '--bg-1':          '#F4F4F4',
    '--bg-2':          '#EDEDED',
    '--fg-0':          '#0A0A0A',
    '--fg-1':          '#404040',
    '--fg-2':          '#707070',
    '--fg-3':          '#B0B0B0',
    '--state-core':    '#0284C7',
    '--state-action':  '#0A0A0A',
    '--state-presence':'#7C3AED',
    '--state-live':    '#16A34A',
    '--state-alert':   '#D97706',
    '--state-stop':    '#DC2626',
    '--state-stealth': '#707070',
  },
};

// ─────────────────────────────────────────────────────
// PUBLIC CONTENT — ENGLISH

export const en = {

  boot: [
    { mark: '[*]', text: 'autorun.dev' },
    { mark: null,  text: 'ai-native tools & products', indent: true },
    { mark: null,  text: config.version, indent: true, muted: true },
    { mark: null,  text: '' },
    { mark: '[.]', text: 'booting autorun.dev ... ok' },
    { mark: '[:]', text: `agents online: ${config.agentsOnline}` },
    { mark: '[:]', text: 'type `help` to see available commands.' },
  ],

  notFound: (cmd) => [
    { mark: '[!]', text: `command not found: ${cmd}` },
    { mark: null,  text: 'try `help`', indent: true, muted: true },
  ],

  prompt: '[>]',

  commands: {

    help: {
      description: 'show available commands',
      output: [
        { mark: '[*]', text: 'available commands:' },
        { mark: null,  text: 'about     — what we do', indent: true },
        { mark: null,  text: 'projects  — things we ship', indent: true },
        { mark: null,  text: 'team      — who\'s behind the terminal', indent: true },
        { mark: null,  text: 'stack     — how we build', indent: true },
        { mark: null,  text: 'contact   — how to reach us', indent: true },
        { mark: null,  text: 'lang      — switch language (en/ru)', indent: true },
        { mark: null,  text: 'theme     — toggle dark/light', indent: true },
        { mark: null,  text: 'clear     — wipe the screen', indent: true },
      ],
    },

    about: {
      description: 'what we do',
      output: [
        { mark: '[*]', text: 'about' },
        { mark: null,  text: 'autorun.dev builds ai-native products that', indent: true },
        { mark: null,  text: 'run where people already live — messengers,', indent: true },
        { mark: null,  text: 'games, markets. small crew. tight loops.', indent: true },
        { mark: null,  text: 'no meetings that could\'ve been a commit.', indent: true },
        { mark: null,  text: '' },
        { mark: null,  text: 'thesis: the best software in 2026 doesn\'t', indent: true },
        { mark: null,  text: 'have a ui. it has an agent.', indent: true },
      ],
    },

    projects: {
      description: 'things we ship',
      output: [
        { mark: '[*]', text: 'active projects:' },
        { mark: null,  text: '' },
        { mark: null,  text: 'vectoros.ai', indent: true, bold: true },
        { mark: null,  text: 'ai companion for telegram.', indent: true },
        { mark: null,  text: 'second brain powered by claude.', indent: true },
        { mark: null,  text: '[status: live]', indent: true, state: 'live' },
        { mark: null,  text: '' },
        { mark: null,  text: 'playsnap.bot', indent: true, bold: true },
        { mark: null,  text: 'minimalist hockey for telegram.', indent: true },
        { mark: null,  text: 'one button. perfect timing. no tutorial.', indent: true },
        { mark: null,  text: '[status: live]', indent: true, state: 'live' },
        { mark: null,  text: '' },
        { mark: null,  text: '[redacted]', indent: true, bold: true },
        { mark: null,  text: 'something for traders.', indent: true },
        { mark: null,  text: '[status: stealth]', indent: true, state: 'stealth' },
      ],
    },

    team: {
      description: 'who\'s behind the terminal',
      output: [
        { mark: '[*]', text: 'team' },
        { mark: null,  text: 'small, senior, remote. product engineers', indent: true },
        { mark: null,  text: 'who ship end-to-end — design, code, growth,', indent: true },
        { mark: null,  text: 'ops.', indent: true },
        { mark: null,  text: '' },
        { mark: null,  text: 'founder:  anton frolov', indent: true },
        { mark: null,  text: '          vibe coder (unironically)', indent: true, muted: true },
        { mark: null,  text: 'crew:     engineers, designers, degens', indent: true },
        { mark: null,  text: 'hiring:   always, if you\'re the real thing.', indent: true },
        { mark: null,  text: '          → hello@autorun.dev', indent: true, muted: true },
      ],
    },

    stack: {
      description: 'how we build',
      output: [
        { mark: '[*]', text: 'stack' },
        { mark: null,  text: 'claude · typescript · python · telegram', indent: true },
        { mark: null,  text: 'sqlite-and-prayers · vps · tmux · vibes', indent: true },
        { mark: null,  text: '' },
        { mark: '[!]', text: 'we deploy on fridays.', indent: true },
        { mark: null,  text: 'and midnights. no one stops us.', indent: true, muted: true },
      ],
    },

    contact: {
      description: 'how to reach us',
      output: [
        { mark: '[*]', text: 'contact' },
        { mark: null,  text: 'mail      · hello@autorun.dev', indent: true },
        { mark: null,  text: 'telegram  · t.me/autorundev', indent: true },
        { mark: null,  text: 'github    · github.com/autorundev', indent: true },
        { mark: null,  text: 'x         · x.com/autorundev', indent: true },
        { mark: null,  text: '' },
        { mark: null,  text: 'async by default. we reply when we can.', indent: true, muted: true },
      ],
    },

    lang: {
      description: 'switch language',
      output: [
        { mark: '[*]', text: 'language' },
        { mark: null,  text: 'current:  en', indent: true },
        { mark: null,  text: 'usage:    `lang en` · `lang ru`', indent: true, muted: true },
      ],
    },

    theme: {
      description: 'toggle dark/light',
      output: [
        { mark: '[*]', text: 'theme' },
        { mark: null,  text: 'current:  dark', indent: true },
        { mark: null,  text: 'usage:    `theme dark` · `theme light`', indent: true, muted: true },
      ],
    },

    clear: {
      description: 'wipe the screen',
      output: null,
    },
  },

  system: {
    langChanged: (lang) => ({ mark: '[*]', text: `language: ${lang}` }),
    themeChanged: (theme) => ({ mark: '[*]', text: `theme: ${theme}` }),
    unlocked: (name) => ({ mark: '[+]', text: `${name} unlocked.` }),
  },
};

// ─────────────────────────────────────────────────────
// PUBLIC CONTENT — RUSSIAN

export const ru = {

  boot: [
    { mark: '[*]', text: 'autorun.dev' },
    { mark: null,  text: 'ai-native инструменты и продукты', indent: true },
    { mark: null,  text: config.version, indent: true, muted: true },
    { mark: null,  text: '' },
    { mark: '[.]', text: 'booting autorun.dev ... ok' },
    { mark: '[:]', text: `агентов в сети: ${config.agentsOnline}` },
    { mark: '[:]', text: 'введи `help` чтобы увидеть команды.' },
  ],

  notFound: (cmd) => [
    { mark: '[!]', text: `команда не найдена: ${cmd}` },
    { mark: null,  text: 'попробуй `help`', indent: true, muted: true },
  ],

  prompt: '[>]',

  commands: {

    help: {
      description: 'показать команды',
      output: [
        { mark: '[*]', text: 'доступные команды:' },
        { mark: null,  text: 'about     — что мы делаем', indent: true },
        { mark: null,  text: 'projects  — что мы строим', indent: true },
        { mark: null,  text: 'team      — кто за этим терминалом', indent: true },
        { mark: null,  text: 'stack     — на чём строим', indent: true },
        { mark: null,  text: 'contact   — как связаться', indent: true },
        { mark: null,  text: 'lang      — сменить язык (en/ru)', indent: true },
        { mark: null,  text: 'theme     — тема (dark/light)', indent: true },
        { mark: null,  text: 'clear     — очистить экран', indent: true },
      ],
    },

    about: {
      description: 'что мы делаем',
      output: [
        { mark: '[*]', text: 'о нас' },
        { mark: null,  text: 'autorun.dev строит ai-native продукты,', indent: true },
        { mark: null,  text: 'которые живут там, где уже живут люди —', indent: true },
        { mark: null,  text: 'в мессенджерах, играх, маркетах.', indent: true },
        { mark: null,  text: 'маленькая команда. быстрые циклы.', indent: true },
        { mark: null,  text: 'никаких встреч, которые могли быть коммитом.', indent: true },
        { mark: null,  text: '' },
        { mark: null,  text: 'тезис: лучший софт в 2026 не имеет', indent: true },
        { mark: null,  text: 'ui. у него есть агент.', indent: true },
      ],
    },

    projects: {
      description: 'что мы строим',
      output: [
        { mark: '[*]', text: 'активные проекты:' },
        { mark: null,  text: '' },
        { mark: null,  text: 'vectoros.ai', indent: true, bold: true },
        { mark: null,  text: 'ai-компаньон для telegram.', indent: true },
        { mark: null,  text: 'второй мозг на claude.', indent: true },
        { mark: null,  text: '[status: live]', indent: true, state: 'live' },
        { mark: null,  text: '' },
        { mark: null,  text: 'playsnap.bot', indent: true, bold: true },
        { mark: null,  text: 'минималистичный хоккей для telegram.', indent: true },
        { mark: null,  text: 'одна кнопка. точный тайминг. без туториалов.', indent: true },
        { mark: null,  text: '[status: live]', indent: true, state: 'live' },
        { mark: null,  text: '' },
        { mark: null,  text: '[redacted]', indent: true, bold: true },
        { mark: null,  text: 'кое-что для трейдеров.', indent: true },
        { mark: null,  text: '[status: stealth]', indent: true, state: 'stealth' },
      ],
    },

    team: {
      description: 'кто за этим терминалом',
      output: [
        { mark: '[*]', text: 'команда' },
        { mark: null,  text: 'небольшая, опытная, удалённая.', indent: true },
        { mark: null,  text: 'product-инженеры, которые шипят от и до —', indent: true },
        { mark: null,  text: 'дизайн, код, рост, операции.', indent: true },
        { mark: null,  text: '' },
        { mark: null,  text: 'основатель:  антон фролов', indent: true },
        { mark: null,  text: '             vibe coder (unironically)', indent: true, muted: true },
        { mark: null,  text: 'команда:     инженеры, дизайнеры, дегены', indent: true },
        { mark: null,  text: 'найм:        всегда, если ты настоящий.', indent: true },
        { mark: null,  text: '             → hello@autorun.dev', indent: true, muted: true },
      ],
    },

    stack: {
      description: 'на чём строим',
      output: [
        { mark: '[*]', text: 'stack' },
        { mark: null,  text: 'claude · typescript · python · telegram', indent: true },
        { mark: null,  text: 'sqlite-and-prayers · vps · tmux · vibes', indent: true },
        { mark: null,  text: '' },
        { mark: '[!]', text: 'деплоим по пятницам.', indent: true },
        { mark: null,  text: 'и по ночам. никто не останавливает.', indent: true, muted: true },
      ],
    },

    contact: {
      description: 'как связаться',
      output: [
        { mark: '[*]', text: 'контакты' },
        { mark: null,  text: 'почта     · hello@autorun.dev', indent: true },
        { mark: null,  text: 'telegram  · t.me/autorundev', indent: true },
        { mark: null,  text: 'github    · github.com/autorundev', indent: true },
        { mark: null,  text: 'x         · x.com/autorundev', indent: true },
        { mark: null,  text: '' },
        { mark: null,  text: 'async by default. отвечаем когда можем.', indent: true, muted: true },
      ],
    },

    lang: {
      description: 'сменить язык',
      output: [
        { mark: '[*]', text: 'язык' },
        { mark: null,  text: 'текущий:  ru', indent: true },
        { mark: null,  text: 'usage:    `lang en` · `lang ru`', indent: true, muted: true },
      ],
    },

    theme: {
      description: 'тема',
      output: [
        { mark: '[*]', text: 'тема' },
        { mark: null,  text: 'текущая:  dark', indent: true },
        { mark: null,  text: 'usage:    `theme dark` · `theme light`', indent: true, muted: true },
      ],
    },

    clear: {
      description: 'очистить экран',
      output: null,
    },
  },

  system: {
    langChanged: (lang) => ({ mark: '[*]', text: `язык: ${lang}` }),
    themeChanged: (theme) => ({ mark: '[*]', text: `тема: ${theme}` }),
    unlocked: (name) => ({ mark: '[+]', text: `${name} разблокирован.` }),
  },
};

// ─────────────────────────────────────────────────────
// PUBLIC COMMAND LIST (для быстрой проверки — всё остальное уходит на бэк)

export const publicCommands = [
  'help', 'about', 'projects', 'team', 'stack',
  'contact', 'lang', 'theme', 'clear',
];

export const content = { en, ru };

export default { config, themes, content, publicCommands };
