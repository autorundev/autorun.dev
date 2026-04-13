/**
 * autorun.dev — deploy scenario system
 *
 * 18 weighted scenarios for the `deploy` command.
 * See docs/SPECS/deploy-easter-eggs/ for full specs.
 */

const scenarios = [
  // 01
  {
    id: 'happy_path', weight: 32,
    lines: [
      { mark: '[/]', text: 'running tests',           spinner: true, duration: 700 },
      { mark: '[*]', text: 'running tests',           suffix: '142/142' },
      { mark: '[/]', text: 'type check',              spinner: true, duration: 600 },
      { mark: '[*]', text: 'type check',              suffix: 'ok' },
      { mark: '[/]', text: 'bundling',                spinner: true, duration: 700 },
      { mark: '[*]', text: 'bundling',                suffix: '1.2mb gzipped' },
      { mark: '[/]', text: 'pushing to edge',         spinner: true, duration: 800 },
      { mark: '[*]', text: 'pushing to edge',         suffix: '23 locations' },
      { mark: '[/]', text: 'warming caches',          spinner: true, duration: 600 },
      { mark: '[*]', text: 'warming caches',          suffix: 'ok' },
      { mark: '[/]', text: 'deploying to production', spinner: true, duration: 700 },
      { mark: '[*]', text: 'deploying to production', suffix: 'done' },
      { anim: 'pause', duration: 900 },
    ],
    final: 'deployed in 47s. users happy. founders caffeinated.',
  },
  // 02
  {
    id: 'not_friday', weight: 8,
    lines: [
      { mark: '[/]', text: 'running tests',           spinner: true, duration: 700 },
      { mark: '[*]', text: 'running tests',           suffix: '142/142' },
      { mark: '[/]', text: 'type check',              spinner: true, duration: 600 },
      { mark: '[*]', text: 'type check',              suffix: 'ok' },
      { mark: '[/]', text: 'checking calendar',       spinner: true, duration: 700 },
      { mark: '[!]', text: 'it\'s friday 17:42' },
      { mark: '[x]', text: 'aborting deploy per company policy' },
      { mark: '[=]', text: 'nothing good ships on friday evening' },
      { anim: 'pause', duration: 900 },
    ],
    final: 'weekend saved. deploy rescheduled for monday 10:00.',
  },
  // 03
  {
    id: 'last_minute_feature', weight: 8,
    lines: [
      { mark: '[/]', text: 'running tests',             spinner: true, duration: 700 },
      { mark: '[*]', text: 'running tests',             suffix: '142/142' },
      { mark: '[/]', text: 'bundling',                  spinner: true, duration: 700 },
      { mark: '[*]', text: 'bundling',                  suffix: '1.2mb' },
      { mark: '[/]', text: 'deploying to production',   spinner: true, duration: 600 },
      { mark: '[!]', text: 'anton pushed a commit' },
      { mark: '[-]', text: 'deploy paused',             suffix: '0s' },
      { mark: '[/]', text: 'pulling anton/quick-fix',   spinner: true, duration: 1000 },
      { mark: '[>]', text: '"just one more thing, i promise"', anim: 'typeout' },
      { mark: '[/]', text: 're-running tests',          spinner: true, duration: 900 },
      { mark: '[*]', text: 're-running tests',          suffix: '143/143' },
      { mark: '[/]', text: 'deploying to production',   spinner: true, duration: 600 },
      { mark: '[!]', text: 'designer has a note on button radius' },
      { mark: '[-]', text: 'deploy paused',             suffix: '0s' },
      { mark: '[/]', text: 'radius 8px \u2192 6px',     spinner: true, duration: 700 },
      { mark: '[*]', text: 'radius 8px \u2192 6px',     suffix: 'done' },
      { mark: '[/]', text: 'deploying to production',   spinner: true, duration: 700 },
      { mark: '[*]', text: 'deploying to production',   suffix: 'done' },
      { anim: 'pause', duration: 900 },
    ],
    final: 'deployed in 14m 22s. one more thing almost killed us.',
  },
  // 04
  {
    id: 'rollback', weight: 6,
    lines: [
      { mark: '[/]', text: 'running tests',             spinner: true, duration: 700 },
      { mark: '[*]', text: 'running tests',             suffix: '142/142' },
      { mark: '[/]', text: 'deploying to production',   spinner: true, duration: 800 },
      { mark: '[*]', text: 'deploying to production',   suffix: 'done' },
      { mark: '[:]', text: 'monitoring' },
      { mark: '[!]', text: 'error rate: 0.1% \u2192 4.7%' },
      { mark: '[!]', text: 'latency p99: 80ms \u2192 2.4s' },
      { mark: '[x]', text: 'initiating rollback' },
      { mark: '[/]', text: 'reverting to previous',     spinner: true, duration: 1200 },
      { mark: '[*]', text: 'reverting to previous',     suffix: 'done' },
      { mark: '[:]', text: 'monitoring' },
      { mark: '[*]', text: 'error rate',                suffix: '0.1%' },
      { mark: '[*]', text: 'latency p99',               suffix: '78ms' },
      { anim: 'pause', duration: 900 },
    ],
    final: 'rolled back in 38s. the test you didn\'t write is the bug you\'ll ship.',
  },
  // 05
  {
    id: 'investor_call', weight: 4,
    lines: [
      { mark: '[/]', text: 'running tests',             spinner: true, duration: 700 },
      { mark: '[*]', text: 'running tests',             suffix: '142/142' },
      { mark: '[/]', text: 'bundling',                  spinner: true, duration: 600 },
      { mark: '[!]', text: 'investor call in 3 minutes' },
      { mark: '[-]', text: 'deploy paused',             suffix: '3m' },
      { mark: '[/]', text: 'closing terminal',          spinner: true, duration: 600 },
      { mark: '[/]', text: 'opening zoom',              spinner: true, duration: 800 },
      { mark: '[*]', text: 'opening zoom',              suffix: 'ok' },
      { mark: '[>]', text: '"we\'re growing 40% mom"',  anim: 'typeout' },
      { mark: '[*]', text: 'call',                      suffix: '22 minutes' },
      { mark: '[/]', text: 'resuming deploy',           spinner: true, duration: 700 },
      { mark: '[*]', text: 'deploying to production',   suffix: 'done' },
      { anim: 'pause', duration: 900 },
    ],
    final: 'deployed in 27m 14s. call went well. shipping mood: cautiously optimistic.',
  },
  // 06
  {
    id: 'cats_on_keyboard', weight: 4,
    lines: [
      { mark: '[/]', text: 'running tests',                    spinner: true, duration: 700 },
      { mark: '[*]', text: 'running tests',                    suffix: '142/142' },
      { mark: '[/]', text: 'deploying ajskdhfkjashdkfjhaskdjfh', spinner: true, duration: 600 },
      { mark: '[!]', text: 'cat detected on keyboard' },
      { mark: '[-]', text: 'deploy paused',                    suffix: '0s' },
      { mark: '[/]', text: 'relocating cat',                   spinner: true, duration: 900 },
      { mark: '[*]', text: 'relocating cat',                   suffix: 'done' },
      { mark: '[/]', text: 'giving treat',                     spinner: true, duration: 600 },
      { mark: '[*]', text: 'giving treat',                     suffix: 'accepted' },
      { mark: '[/]', text: 'resuming deploy',                  spinner: true, duration: 600 },
      { mark: '[*]', text: 'deploying to production',          suffix: 'done' },
      { anim: 'pause', duration: 900 },
    ],
    final: 'deployed in 2m 10s. cat is now a co-author.',
  },
  // 07
  {
    id: 'ai_ate_homework', weight: 4,
    lines: [
      { mark: '[/]', text: 'running tests',             spinner: true, duration: 700 },
      { mark: '[*]', text: 'running tests',             suffix: '142/142' },
      { mark: '[/]', text: 'asking claude to review',   spinner: true, duration: 1500 },
      { mark: '[?]', text: 'claude: "have you considered..."', anim: 'typeout' },
      { mark: '[*]', text: 'suggestions generated',     suffix: '47' },
      { mark: '[*]', text: 'accepting 3' },
      { mark: '[=]', text: 'ignoring 44' },
      { mark: '[/]', text: 'applying changes',          spinner: true, duration: 800 },
      { mark: '[*]', text: 'applying changes',          suffix: 'done' },
      { mark: '[/]', text: 'deploying to production',   spinner: true, duration: 700 },
      { mark: '[*]', text: 'deploying to production',   suffix: 'done' },
      { anim: 'pause', duration: 900 },
    ],
    final: 'deployed in 4m 18s. the ai had opinions. we had deadlines.',
  },
  // 08
  {
    id: 'dns_the_usual_suspect', weight: 4,
    lines: [
      { mark: '[/]', text: 'running tests',             spinner: true, duration: 700 },
      { mark: '[*]', text: 'running tests',             suffix: '142/142' },
      { mark: '[/]', text: 'bundling',                  spinner: true, duration: 600 },
      { mark: '[*]', text: 'bundling',                  suffix: '1.2mb' },
      { mark: '[/]', text: 'deploying to production',   spinner: true, duration: 700 },
      { mark: '[*]', text: 'deploying to production',   suffix: 'done' },
      { mark: '[!]', text: 'site is down' },
      { mark: '[/]', text: 'checking servers',          spinner: true, duration: 900 },
      { mark: '[*]', text: 'checking servers',          suffix: 'healthy' },
      { mark: '[/]', text: 'checking database',         spinner: true, duration: 900 },
      { mark: '[*]', text: 'checking database',         suffix: 'healthy' },
      { mark: '[/]', text: 'checking dns',              spinner: true, duration: 1200 },
      { mark: '[!]', text: 'it was dns. it\'s always dns' },
      { mark: '[/]', text: 'flushing caches',           spinner: true, duration: 700 },
      { mark: '[*]', text: 'flushing caches',           suffix: 'ok' },
      { mark: '[*]', text: 'site is back' },
      { anim: 'pause', duration: 900 },
    ],
    final: 'deployed in 6m 55s. three engineers swore. one learned a new word.',
  },
  // 09
  {
    id: 'stealth_ship', weight: 4,
    lines: [
      { mark: '[/]', text: 'running tests',             spinner: true, duration: 700 },
      { mark: '[*]', text: 'running tests',             suffix: '142/142' },
      { mark: '[/]', text: 'bundling',                  spinner: true, duration: 600 },
      { mark: '[*]', text: 'bundling',                  suffix: '1.2mb' },
      { mark: '[/]', text: 'checking feature flag',     spinner: true, duration: 800 },
      { mark: '[!]', text: 'project is still [redacted]' },
      { mark: '[/]', text: 'deploying behind flag',     spinner: true, duration: 800 },
      { mark: '[*]', text: 'deploying behind flag',     suffix: 'done' },
      { mark: '[*]', text: 'audience',                  suffix: '3 users' },
      { mark: '[=]', text: 'telegram post',             suffix: 'skipped' },
      { mark: '[=]', text: 'twitter thread',            suffix: 'skipped' },
      { mark: '[=]', text: 'changelog entry',           suffix: 'skipped' },
      { anim: 'pause', duration: 900 },
    ],
    final: 'shipped silently. the best launches make no sound.',
  },
  // 10
  {
    id: 'demo_gods', weight: 3,
    lines: [
      { mark: '[/]', text: 'running tests',                   spinner: true, duration: 700 },
      { mark: '[*]', text: 'running tests',                   suffix: '142/142' },
      { mark: '[/]', text: 'deploying to production',         spinner: true, duration: 800 },
      { mark: '[*]', text: 'deploying to production',         suffix: 'done' },
      { mark: '[/]', text: 'opening demo in browser',         spinner: true, duration: 900 },
      { mark: '[!]', text: 'works on localhost. breaks in prod' },
      { mark: '[/]', text: 'opening devtools',                spinner: true, duration: 700 },
      { mark: '[!]', text: 'cors error' },
      { mark: '[/]', text: 'adding access-control header',    spinner: true, duration: 1000 },
      { mark: '[*]', text: 'adding access-control header',    suffix: 'done' },
      { mark: '[/]', text: 're-deploying',                    spinner: true, duration: 1000 },
      { mark: '[*]', text: 're-deploying',                    suffix: 'done' },
      { mark: '[*]', text: 'demo',                            suffix: 'working' },
      { anim: 'pause', duration: 900 },
    ],
    final: 'deployed in 11m 03s. the demo gods demanded a sacrifice. we gave them our evening.',
  },
  // 11
  {
    id: 'scope_creep', weight: 3,
    lines: [
      { mark: '[/]', text: 'running tests',             spinner: true, duration: 700 },
      { mark: '[*]', text: 'running tests',             suffix: '142/142' },
      { mark: '[>]', text: '"while we\'re at it, let\'s also..."', anim: 'typeout' },
      { mark: '[/]', text: 'refactoring auth layer',    spinner: true, duration: 900 },
      { mark: '[/]', text: 'migrating database',        spinner: true, duration: 900 },
      { mark: '[/]', text: 'rewriting in rust',         spinner: true, duration: 1200 },
      { mark: '[x]', text: 'aborting. this was a typo fix' },
      { mark: '[/]', text: 'reverting tangent',         spinner: true, duration: 900 },
      { mark: '[*]', text: 'reverting tangent',         suffix: 'done' },
      { mark: '[/]', text: 'fixing the typo',           spinner: true, duration: 600 },
      { mark: '[*]', text: 'fixing the typo',           suffix: '1 char' },
      { mark: '[/]', text: 'deploying to production',   spinner: true, duration: 700 },
      { mark: '[*]', text: 'deploying to production',   suffix: 'done' },
      { anim: 'pause', duration: 900 },
    ],
    final: 'deployed in 3m 40s. saved ourselves from ourselves.',
  },
  // 12
  {
    id: 'hackathon_finish', weight: 4,
    lines: [
      { mark: '[:]', text: 'submission deadline',        suffix: '00:00:47' },
      { mark: '[/]', text: 'running tests',             spinner: true, duration: 800 },
      { mark: '[=]', text: 'running tests',             suffix: 'skipped' },
      { mark: '[:]', text: 'submission deadline',        suffix: '00:00:31' },
      { mark: '[/]', text: 'bundling',                  spinner: true, duration: 700 },
      { mark: '[!]', text: 'bundle is 2.4mb. ship it' },
      { mark: '[/]', text: 'uploading',                 spinner: true, duration: 1500 },
      { mark: '[:]', text: 'submission deadline',        suffix: '00:00:08' },
      { mark: '[*]', text: 'uploading',                 suffix: 'done' },
      { mark: '[/]', text: 'submitting to devpost',     spinner: true, duration: 1200 },
      { mark: '[*]', text: 'submitting to devpost',     suffix: 'accepted' },
      { mark: '[:]', text: 'submission deadline',        suffix: '00:00:02' },
      { anim: 'pause', duration: 1200 },
    ],
    final: 'shipped with 2 seconds to spare. the demo will work. probably.',
  },
  // 13
  {
    id: 'drive_by_pr', weight: 4,
    lines: [
      { mark: '[/]', text: 'running tests',               spinner: true, duration: 700 },
      { mark: '[*]', text: 'running tests',               suffix: '142/142' },
      { mark: '[/]', text: 'bundling',                    spinner: true, duration: 600 },
      { mark: '[*]', text: 'bundling',                    suffix: '1.2mb' },
      { mark: '[/]', text: 'deploying to production',     spinner: true, duration: 800 },
      { mark: '[!]', text: 'pr from @stranger_dev' },
      { mark: '[-]', text: 'deploy paused',               suffix: '0s' },
      { mark: '[:]', text: 'reviewing pr',                 suffix: '+847 \u2212203' },
      { mark: '[>]', text: '"fixed a typo and also rewrote auth"', anim: 'typeout' },
      { mark: '[?]', text: 'merge?' },
      { mark: '[*]', text: 'merging',                     suffix: 'yolo' },
      { mark: '[/]', text: 're-running tests',            spinner: true, duration: 900 },
      { mark: '[*]', text: 're-running tests',            suffix: '144/144' },
      { mark: '[+]', text: '@stranger_dev added to contributors' },
      { mark: '[*]', text: 'deploying to production',     suffix: 'done' },
      { anim: 'pause', duration: 900 },
    ],
    final: 'deployed in 16m 04s. a stranger from the internet made our auth better. we let them.',
  },
  // 14
  {
    id: 'hi_mom', weight: 3,
    lines: [
      { mark: '[/]', text: 'running tests',                  spinner: true, duration: 700 },
      { mark: '[*]', text: 'running tests',                  suffix: '142/142' },
      { mark: '[/]', text: 'bundling',                       spinner: true, duration: 600 },
      { mark: '[*]', text: 'bundling',                       suffix: '1.2mb' },
      { mark: '[/]', text: 'deploying to production',        spinner: true, duration: 800 },
      { mark: '[*]', text: 'deploying to production',        suffix: 'done' },
      { mark: '[:]', text: 'checking logs' },
      { mark: '[!]', text: 'production log: "hi mom"' },
      { mark: '[!]', text: 'production log: "hi mom"' },
      { mark: '[!]', text: 'production log: "hi mom"' },
      { mark: '[/]', text: 'locating rogue console.log',    spinner: true, duration: 900 },
      { mark: '[*]', text: 'locating rogue console.log',    suffix: 'src/auth.ts:42' },
      { mark: '[/]', text: 'removing it',                   spinner: true, duration: 500 },
      { mark: '[*]', text: 'removing it',                   suffix: 'done' },
      { mark: '[*]', text: 're-deploying',                  suffix: 'done' },
      { anim: 'pause', duration: 900 },
    ],
    final: 'deployed in 9m 11s. mom saw it. she\'s proud anyway.',
  },
  // 15
  {
    id: 'timezone_mixup', weight: 3,
    lines: [
      { mark: '[/]', text: 'running tests',                 spinner: true, duration: 700 },
      { mark: '[*]', text: 'running tests',                 suffix: '142/142' },
      { mark: '[/]', text: 'checking team availability',    spinner: true, duration: 900 },
      { mark: '[*]', text: 'anton (belgrade)',               suffix: '03:14 awake' },
      { mark: '[*]', text: 'designer (lisbon)',              suffix: '02:14 asleep' },
      { mark: '[*]', text: 'backend (buenos aires)',         suffix: '22:14 online' },
      { mark: '[!]', text: 'everyone thought deadline was local' },
      { mark: '[?]', text: 'whose local' },
      { mark: '[/]', text: 'picking utc',                   spinner: true, duration: 600 },
      { mark: '[*]', text: 'picking utc',                   suffix: 'finally' },
      { mark: '[/]', text: 'deploying to production',       spinner: true, duration: 800 },
      { mark: '[*]', text: 'deploying to production',       suffix: 'done' },
      { mark: '[*]', text: 'posting in #general',           suffix: '"it\'s shipped"' },
      { anim: 'pause', duration: 900 },
    ],
    final: 'deployed in 7m 22s across 3 timezones. utc won. it always does.',
  },
  // 16
  {
    id: 'standup_interrupt', weight: 3,
    lines: [
      { mark: '[/]', text: 'running tests',                spinner: true, duration: 700 },
      { mark: '[*]', text: 'running tests',                suffix: '142/142' },
      { mark: '[/]', text: 'deploying to production',      spinner: true, duration: 700 },
      { mark: '[!]', text: 'standup started 3 minutes ago' },
      { mark: '[-]', text: 'deploy paused',                suffix: '0s' },
      { mark: '[/]', text: 'joining standup',              spinner: true, duration: 600 },
      { mark: '[>]', text: '"sorry i\'m late, was deploying"', anim: 'typeout' },
      { mark: '[>]', text: '"what did you do yesterday?"',    anim: 'typeout' },
      { mark: '[>]', text: '"deployed to production"',        anim: 'typeout' },
      { mark: '[>]', text: '"what will you do today?"',       anim: 'typeout' },
      { mark: '[>]', text: '"deploy to production"',          anim: 'typeout' },
      { mark: '[*]', text: 'standup',                      suffix: '4 minutes' },
      { mark: '[/]', text: 'resuming deploy',              spinner: true, duration: 600 },
      { mark: '[*]', text: 'deploying to production',      suffix: 'done' },
      { anim: 'pause', duration: 900 },
    ],
    final: 'deployed in 6m 48s. standup took 4. shortest one this year.',
  },
  // 17
  {
    id: 'power_outage', weight: 2,
    lines: [
      { mark: '[/]', text: 'running tests',              spinner: true, duration: 700 },
      { mark: '[*]', text: 'running tests',              suffix: '142/142' },
      { mark: '[/]', text: 'bundling',                   spinner: true, duration: 600 },
      { mark: '[*]', text: 'bundling',                   suffix: '1.2mb' },
      { mark: '[!]', text: 'battery low: 7%' },
      { mark: '[/]', text: 'deploying to production',    spinner: true, duration: 800 },
      { mark: '[!]', text: 'battery low: 3%',            anim: 'flash+shake' },
      { mark: '[/]', text: 'deploying faster',           spinner: true, duration: 600 },
      { mark: '[!]', text: 'battery: 1%',                anim: 'flash+shake' },
      { mark: '[/]', text: 'push it pu',                 anim: 'typeout' },
      { anim: 'blackout', duration: 2400 },
      { mark: '[:]', text: 'restoring session',          spinner: true, duration: 1200 },
      { mark: '[*]', text: 'deploy completed before shutdown' },
      { anim: 'pause', duration: 900 },
    ],
    final: 'deployed in 4m 19s, then lost power for 23 minutes. the cloud doesn\'t care about your battery.',
  },
  // 18
  {
    id: 'perfect_day', weight: 1,
    lines: [
      { mark: '[/]', text: 'running tests',              spinner: true, duration: 600 },
      { mark: '[*]', text: 'running tests',              suffix: '142/142' },
      { mark: '[/]', text: 'type check',                 spinner: true, duration: 600 },
      { mark: '[*]', text: 'type check',                 suffix: '0 errors' },
      { mark: '[/]', text: 'linter',                     spinner: true, duration: 600 },
      { mark: '[*]', text: 'linter',                     suffix: '0 warnings' },
      { mark: '[/]', text: 'bundling',                   spinner: true, duration: 600 },
      { mark: '[*]', text: 'bundling',                   suffix: '1.1mb (\u22128%)' },
      { mark: '[/]', text: 'deploying to production',    spinner: true, duration: 600 },
      { mark: '[*]', text: 'deploying to production',    suffix: 'done' },
      { mark: '[/]', text: 'smoke test',                 spinner: true, duration: 600 },
      { mark: '[*]', text: 'smoke test',                 suffix: 'ok' },
      { mark: '[*]', text: 'error rate',                 suffix: '0.00%' },
      { mark: '[*]', text: 'latency p99',                suffix: '42ms' },
      { mark: '[?]', text: 'this is going too well' },
      { mark: '[?]', text: 'did we forget something' },
      { mark: '[*]', text: 'nope. just a good day' },
      { anim: 'pause', duration: 1200 },
    ],
    final: 'deployed in 3m 04s. zero incidents. enjoy it. days like this are rare.',
  },
];

// ───────────────────────────────────────────────────
// PICKER

const totalWeight = scenarios.reduce((s, sc) => s + sc.weight, 0);

export function pickScenario(flags = {}) {
  if (flags.list) {
    const lines = [
      { mark: '[*]', text: 'deploy scenarios' },
      ...scenarios.map(sc => ({
        mark: null, text: `${sc.id}`, suffix: `${sc.weight}%`, indent: true,
      })),
    ];
    return { type: 'list', lines };
  }

  if (flags.force) return scenarios.find(s => s.id === 'happy_path');
  if (flags.friday) return scenarios.find(s => s.id === 'not_friday');

  let roll = Math.random() * totalWeight;
  for (const sc of scenarios) {
    roll -= sc.weight;
    if (roll <= 0) return sc;
  }
  return scenarios[0];
}
