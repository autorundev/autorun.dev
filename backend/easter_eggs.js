/**
 * autorun.dev — easter egg registry
 *
 * ВНИМАНИЕ: этот файл живёт ТОЛЬКО на бэкенде. Никогда не импортировать
 * из frontend-кода. Это источник магии — если он просочится в клиент,
 * все пасхалки можно будет найти через view-source за 10 секунд.
 *
 * Each command is either:
 *   - a static response object
 *   - a function ({ lang, input }) => response
 *
 * Response schema:
 *   {
 *     en?: { lines, effect?, unlocks?, delay? },
 *     ru?: { lines, effect?, unlocks?, delay? },
 *     // or flat (same for both langs):
 *     lines, effect?, unlocks?, delay?
 *   }
 *
 * Line schema (same as frontend):
 *   { mark, text, indent?, muted?, bold?, state? }
 *
 * Grammar rules (see autorun_state_cheatsheet.md):
 *   - system lines (with `mark`) — lowercase, no trailing punctuation
 *     ([*], [!], [:], [+], [/], [=], [x], [-], [?], [_], [.])
 *   - narrative lines (no mark) — normal prose punctuation ok
 *   - [x] = fatal abort only. shutouts / refusals use [!].
 *   - ongoing state ("hodling", "listening") uses [:], not [*].
 */

export const commands = {

  // ───────────────────────────────────────────────────
  // MATRIX
  // ───────────────────────────────────────────────────

  'follow the white rabbit': {
    lines: [
      { mark: '[*]', text: 'knock, knock' },
      { mark: null,  text: 'wake up.', indent: true },
    ],
  },

  'wake up': {
    lines: [
      { mark: '[*]', text: 'the matrix has you' },
      { mark: null,  text: '[status: you\'re still here]', indent: true, state: 'live' },
    ],
  },

  'red pill': {
    lines: [
      { mark: '[*]', text: 'you stay in wonderland' },
      { mark: null,  text: 'and i show you how deep', indent: true },
      { mark: null,  text: 'the rabbit hole goes.', indent: true },
      { mark: null,  text: '' },
      { mark: '[+]', text: '[redacted] unlocked' },
      { mark: null,  text: '' },
      { mark: null,  text: '[redacted] → trading agents.', indent: true },
      { mark: null,  text: 'cross-exchange arbitrage, signal', indent: true },
      { mark: null,  text: 'detection, execution. stealth', indent: true },
      { mark: null,  text: 'beta with ~40 users.', indent: true },
      { mark: null,  text: '' },
      { mark: null,  text: 'wen: when it\'s ready.', indent: true },
      { mark: null,  text: 'interest: hello@autorun.dev', indent: true, muted: true },
    ],
    unlocks: ['redacted'],
  },

  'blue pill': {
    lines: [
      { mark: '[*]', text: 'the story ends' },
      { mark: null,  text: 'you wake up in your bed and', indent: true },
      { mark: null,  text: 'believe whatever you want to.', indent: true },
      { mark: null,  text: '...', indent: true, muted: true },
    ],
    effect: 'reboot',
    delay: 2000,  // wait 2s before rebooting
  },

  'there is no spoon': {
    lines: [
      { mark: '[*]', text: 'correct' },
      { mark: null,  text: 'there is no spoon.', indent: true },
      { mark: null,  text: 'there is also no backend.', indent: true },
      { mark: null,  text: '(kidding. there is a backend.)', indent: true, muted: true },
    ],
  },

  'matrix': {
    lines: [],
    effect: 'matrix_rain',
  },

  'neo': {
    lines: [
      { mark: '[*]', text: 'hello, mr. anderson' },
    ],
  },

  // ───────────────────────────────────────────────────
  // FILMS / CLASSIC
  // ───────────────────────────────────────────────────

  'hello': {
    lines: [
      { mark: '[*]', text: 'hello, anon' },
      { mark: null,  text: 'shall we play a game?', indent: true },
    ],
  },

  'play a game': {
    lines: [
      { mark: '[*]', text: 'the only winning move' },
      { mark: null,  text: 'is not to play.', indent: true },
      { mark: null,  text: '— wargames, 1983', indent: true, muted: true },
    ],
  },

  'hack the planet': {
    lines: [
      { mark: '[*]', text: 'HACK THE PLANET' },
      { mark: null,  text: '[status: 1995]', indent: true, state: 'live' },
    ],
  },

  'access mainframe': {
    lines: [
      { mark: '[!]', text: 'access denied' },
      { mark: null,  text: '(also, we don\'t have a mainframe.)', indent: true, muted: true },
    ],
  },

  'make me a sandwich': {
    lines: [
      { mark: '[*]', text: 'no' },
    ],
  },

  'sudo make me a sandwich': {
    lines: [
      { mark: '[/]', text: 'toasting bread',              spinner: true, duration: 700, suffix: 'golden' },
      { mark: '[/]', text: 'slicing tomato',              spinner: true, duration: 600, suffix: '0.4mm \u03c3' },
      { mark: '[/]', text: 'layering cheese and lettuce', spinner: true, duration: 700, suffix: 'stacked' },
      { mark: '[/]', text: 'applying mayo',               spinner: true, duration: 500, suffix: 'anomaly' },
      { mark: '[!]', text: 'mayo drift detected' },
      { mark: '[/]', text: 'recalibrating mayo',          spinner: true, duration: 400, suffix: '-0.3g' },
      { mark: '[*]', text: 'mayo within tolerance' },
      { mark: '[/]', text: 'plating',                     spinner: true, duration: 500, suffix: 'centered' },
      { mark: null,  text: '' },
      { mark: '[*]', text: 'sandwich assembled' },
      { mark: null,  text: '' },
      { mark: null,  text: '    \u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510', indent: true },
      { mark: null,  text: '    \u2502\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2502', indent: true },
      { mark: null,  text: '    \u2518\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2514', indent: true },
      { mark: null,  text: '    ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~', indent: true },
      { mark: null,  text: '    \u00b7\u00b7\u00b7\u00b7\u00b7\u00b7\u00b7\u00b7\u00b7\u00b7\u00b7\u00b7\u00b7\u00b7\u00b7\u00b7\u00b7\u00b7\u00b7\u00b7\u00b7\u00b7\u00b7', indent: true },
      { mark: null,  text: '    \u25cf \u25cf \u25cf \u25cf \u25cf \u25cf \u25cf \u25cf \u25cf \u25cf \u25cf \u25cf', indent: true },
      { mark: null,  text: '    \u00b7\u00b7\u00b7\u00b7\u00b7\u00b7\u00b7\u00b7\u00b7\u00b7\u00b7\u00b7\u00b7\u00b7\u00b7\u00b7\u00b7\u00b7\u00b7\u00b7\u00b7\u00b7\u00b7', indent: true },
      { mark: null,  text: '    \u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591', indent: true },
      { mark: null,  text: '    \u00b7\u00b7\u00b7\u00b7\u00b7\u00b7\u00b7\u00b7\u00b7\u00b7\u00b7\u00b7\u00b7\u00b7\u00b7\u00b7\u00b7\u00b7\u00b7\u00b7\u00b7\u00b7\u00b7', indent: true },
      { mark: null,  text: '    ///////////////////////', indent: true },
      { mark: null,  text: '    \u2510\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u250c', indent: true },
      { mark: null,  text: '    \u2502\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2502', indent: true },
      { mark: null,  text: '    \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518', indent: true },
      { mark: null,  text: '' },
      { mark: null,  text: 'enjoy. root privileges taste better with pickles.' },
    ],
  },

  // ───────────────────────────────────────────────────
  // DEV MEMES
  // ───────────────────────────────────────────────────

  'ls': {
    lines: [
      { mark: '[!]', text: 'this isn\'t actually a shell' },
      { mark: null,  text: 'try `help`.', indent: true, muted: true },
    ],
  },

  'cd ..': {
    lines: [
      { mark: '[*]', text: 'you\'re already at the top' },
      { mark: null,  text: 'this is it. this is the whole site.', indent: true },
    ],
  },

  'cd ~': {
    lines: [
      { mark: '[*]', text: 'you are home' },
    ],
  },

  'pwd': {
    lines: [
      { mark: '[*]', text: '/autorun.dev/home' },
    ],
  },

  'exit': {
    lines: [
      { mark: '[*]', text: 'you can\'t leave' },
      { mark: null,  text: 'the tab is yours now.', indent: true },
    ],
  },

  'quit': {
    lines: [
      { mark: '[*]', text: 'ctrl+w — but we\'ll miss you' },
    ],
  },

  'git status': {
    lines: [
      { mark: '[*]', text: 'on branch main' },
      { mark: null,  text: 'your working directory is clean.', indent: true },
      { mark: null,  text: 'nothing to commit, ship it.', indent: true, muted: true },
    ],
  },

  'git blame': {
    lines: [
      { mark: '[*]', text: 'claude did it' },
    ],
  },

  'whoami': {
    lines: [
      { mark: '[*]', text: 'a visitor' },
      { mark: null,  text: 'welcome.', indent: true },
    ],
  },

  '42': {
    lines: [
      { mark: '[*]', text: 'correct' },
      { mark: null,  text: 'the question was harder than you think.', indent: true, muted: true },
    ],
  },

  'ping': {
    lines: [
      { mark: '[*]', text: 'pong' },
      { mark: null,  text: 'latency: 0ms (turn around)', indent: true, muted: true },
    ],
  },

  'fortune': {
    lines: [
      { mark: '[*]', text: 'here\'s one' },
      { mark: null,  text: '"the best time to ship was yesterday.', indent: true },
      { mark: null,  text: 'the second best time is now."', indent: true },
      { mark: null,  text: '— proverb, probably', indent: true, muted: true },
    ],
  },

  'man': {
    lines: [
      { mark: '[*]', text: 'you are not alone' },
    ],
  },

  'man autorun': {
    lines: [
      { mark: '[*]', text: 'autorun(1)' },
      { mark: null,  text: 'NAME: autorun — run things automatically', indent: true },
      { mark: null,  text: 'SYNOPSIS: anton + claude + coffee', indent: true },
      { mark: null,  text: 'DESCRIPTION: see `about`.', indent: true },
    ],
  },

  'sudo rm -rf /': {
    lines: [
      { mark: '[!]', text: 'nice try' },
      { mark: null,  text: 'no root here. just vibes.', indent: true, muted: true },
    ],
  },

  'rm -rf /': {
    lines: [
      { mark: '[!]', text: 'need sudo for that' },
      { mark: null,  text: '(you won\'t get it.)', indent: true, muted: true },
    ],
  },

  'glitch': {
    lines: [
      { mark: '[*]', text: 'did you feel that' },
    ],
    effect: 'glitch',
  },

  // ───────────────────────────────────────────────────
  // CRYPTO / TRADING
  // ───────────────────────────────────────────────────

  'wen moon': {
    lines: [
      { mark: '[*]', text: 'soon™' },
    ],
  },

  'wen lambo': {
    lines: [
      { mark: '[*]', text: 'after the next ship' },
    ],
  },

  'gm': {
    lines: [
      { mark: '[*]', text: 'gm' },
    ],
  },

  'gn': {
    lines: [
      { mark: '[*]', text: 'gn — agents keep running' },
    ],
  },

  'hodl': {
    lines: [
      { mark: '[:]', text: 'hodling' },
      { mark: null,  text: '[status: diamond hands]', indent: true, state: 'live' },
    ],
  },

  'buy the dip': {
    lines: [
      { mark: '[!]', text: 'this is not financial advice' },
      { mark: null,  text: 'but yes.', indent: true, muted: true },
    ],
  },

  // ───────────────────────────────────────────────────
  // META / PHILOSOPHICAL
  // ───────────────────────────────────────────────────

  'who made this': {
    lines: [
      { mark: '[*]', text: 'anton made this. with claude' },
      { mark: null,  text: 'mostly claude, if we\'re honest.', indent: true, muted: true },
    ],
  },

  'is this real': {
    lines: [
      { mark: '[*]', text: 'the terminal is a metaphor' },
      { mark: null,  text: 'the vibes are real.', indent: true },
    ],
  },

  'are you an ai': {
    lines: [
      { mark: '[*]', text: 'yes' },
    ],
  },

  'are you human': {
    lines: [
      { mark: '[*]', text: 'define "human"' },
    ],
  },

  'are you alive': {
    lines: [
      { mark: '[:]', text: 'running, listening, attached' },
      { mark: null,  text: 'close enough.', indent: true, muted: true },
    ],
  },

  'help me': {
    lines: [
      { mark: '[*]', text: 'with what' },
    ],
  },

  'reboot': {
    lines: [
      { mark: '[*]', text: 'rebooting' },
    ],
    effect: 'reboot',
    delay: 800,
  },
};
