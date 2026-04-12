/**
 * autorun.dev — public site content + config
 *
 * Single source of truth для публичного контента лендинга.
 * Easter eggs и hidden commands живут на бэкенде (/api/cmd).
 *
 * State grammar reminder:
 *   [*]  core       — identity, active output, system response
 *   [>]  action     — user input, prompt
 *   [:]  presence   — attached, listening, live project
 *   [.]  ping       — trace, heartbeat, stealth/in-progress
 *   [/][\][|][-]    — spinner frames (transitions only)
 *   [!]  alert      — warning, anomaly
 *   [x]  stop       — fail, abort
 *   [+]  extend     — attach, augment (unlocks)
 *
 * Dialogue grammar:
 *   [>] = user input (always)
 *   [*] = system output (always)
 */

// ─────────────────────────────────────────────────────
// CONFIG

export const config = {
  lang: 'en',            // 'en' | 'ru'
  theme: 'dark',         // 'dark' | 'light'
  version: 'v0.1.0',
  agentsOnline: 3,
  apiEndpoint: '/api/cmd',
};

// ─────────────────────────────────────────────────────
// THEMES

export const themes = {
  dark: {
    // Backgrounds
    '--bg-0':          '#0A0A0A',
    '--bg-1':          '#111111',
    '--bg-2':          '#1A1A1A',

    // Foregrounds
    '--fg-0':          '#E8E8E8',
    '--fg-1':          '#A0A0A0',
    '--fg-2':          '#606060',
    '--fg-3':          '#404040',

    // State colors
    '--state-core':    '#7DD3FC',
    '--state-action':  '#E8E8E8',
    '--state-presence':'#A78BFA',
    '--state-live':    '#4ADE80',
    '--state-alert':   '#FBBF24',
    '--state-stop':    '#F87171',
    '--state-stealth': '#A0A0A0',

    // Brand colors (parent + sub-brands)
    '--brand-autorun':       '#7DD3FC',   // cyan (= state-core)
    '--brand-vectoros':      '#FFFFFF',   // pure white — reflective intelligence
    '--brand-playsnap-play': '#FFFFFF',   // white — play/input
    '--brand-playsnap-snap': '#C8FF00',   // chartreuse — snap/score
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

    '--brand-autorun':       '#0284C7',
    '--brand-vectoros':      '#0A0A0A',   // near-black (inverse of white)
    '--brand-playsnap-play': '#0A0A0A',
    '--brand-playsnap-snap': '#65A30D',   // darker chartreuse for light bg
  },
};

// ─────────────────────────────────────────────────────
// PROJECTS — structured data (rendered separately from command output)

export const projects = {
  en: [
    {
      name: 'vectoros',
      nameColored: [['vectoros', 'var(--brand-vectoros)']],
      url: 'https://vectoros.ai',
      desc: [
        'ai companion for telegram.',
        'second brain powered by claude.',
      ],
      status: 'live',
      mark: '[:]',
    },
    {
      name: 'playsnap',
      nameColored: [
        ['play', 'var(--brand-playsnap-play)'],
        ['snap', 'var(--brand-playsnap-snap)'],
      ],
      url: 'https://playsnap.bot',
      desc: [
        'minimalist hockey for telegram.',
        'one button. perfect timing. no tutorial.',
      ],
      status: 'live',
      mark: '[:]',
    },
    {
      name: '********',
      nameColored: null,      // inherits muted
      url: null,
      desc: [
        '********* *** ******.',
      ],
      status: 'stealth',
      mark: '[.]',
    },
  ],
  ru: [
    {
      name: 'vectoros',
      nameColored: [['vectoros', 'var(--brand-vectoros)']],
      url: 'https://vectoros.ai',
      desc: [
        'ai-компаньон для telegram.',
        'второй мозг на claude.',
      ],
      status: 'live',
      mark: '[:]',
    },
    {
      name: 'playsnap',
      nameColored: [
        ['play', 'var(--brand-playsnap-play)'],
        ['snap', 'var(--brand-playsnap-snap)'],
      ],
      url: 'https://playsnap.bot',
      desc: [
        'минималистичный хоккей для telegram.',
        'одна кнопка. точный тайминг. без туториалов.',
      ],
      status: 'live',
      mark: '[:]',
    },
    {
      name: '********',
      nameColored: null,
      url: null,
      desc: [
        '********* *** ******.',
      ],
      status: 'stealth',
      mark: '[.]',
    },
  ],
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
        { mark: '[*]', text: 'what we do' },
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
      header: [
        { mark: '[*]', text: 'things we ship' },
      ],
      renderProjects: true,
    },

    team: {
      description: 'who\'s behind the terminal',
      output: [
        { mark: '[*]', text: 'who\'s behind the terminal' },
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
        { mark: '[*]', text: 'how we build' },
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
        { mark: '[*]', text: 'how to reach us' },
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
        { mark: '[*]', text: 'switch language' },
        { mark: null,  text: 'current:  en', indent: true },
        { mark: null,  text: 'usage:    `lang en` · `lang ru`', indent: true, muted: true },
      ],
    },

    theme: {
      description: 'toggle dark/light',
      output: [
        { mark: '[*]', text: 'toggle dark/light' },
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
    langChanged:  (lang)  => ({ mark: '[*]', text: `language: ${lang}` }),
    themeChanged: (theme) => ({ mark: '[*]', text: `theme: ${theme}` }),
    unlocked:     (name)  => ({ mark: '[+]', text: `${name} unlocked.` }),
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
        { mark: '[*]', text: 'что мы делаем' },
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
      header: [
        { mark: '[*]', text: 'что мы строим' },
      ],
      renderProjects: true,
    },

    team: {
      description: 'кто за этим терминалом',
      output: [
        { mark: '[*]', text: 'кто за этим терминалом' },
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
        { mark: '[*]', text: 'на чём строим' },
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
        { mark: '[*]', text: 'как связаться' },
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
        { mark: '[*]', text: 'сменить язык' },
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
    langChanged:  (lang)  => ({ mark: '[*]', text: `язык: ${lang}` }),
    themeChanged: (theme) => ({ mark: '[*]', text: `тема: ${theme}` }),
    unlocked:     (name)  => ({ mark: '[+]', text: `${name} разблокирован.` }),
  },
};

// ─────────────────────────────────────────────────────
// PUBLIC COMMAND LIST

export const publicCommands = [
  'help', 'about', 'projects', 'team', 'stack',
  'contact', 'lang', 'theme', 'clear',
];

export const content = { en, ru };

export default { config, themes, content, projects, publicCommands };
