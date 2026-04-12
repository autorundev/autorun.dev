/**
 * autorun.dev — visual effects
 *
 * Minimal effects engine для фронта. Каждый эффект — чистая
 * функция без side-effects кроме DOM. Вызывается по ответу
 * от бэкенда через поле `effect`.
 *
 * Available effects (по enum с бэка):
 *   spinner      — animate last rendered line with spinner frames
 *   matrix_rain  — green code rain overlay for N ms
 *   glitch       — visual glitch pass on terminal for N ms
 *   clear        — fade out terminal, clear history
 *   reboot       — clear + re-run boot sequence
 */

// ─────────────────────────────────────────────────────
// SPINNER

/**
 * Animate a progress line with spinner frames.
 * Grammar: [/] → [-] → [\] → [-] — brand-canonical 4-frame spinner.
 *
 * Usage:
 *   const stop = await spinner(lineEl, 'making a sandwich...');
 *   await sleep(800);
 *   stop('done'); // swaps spinner for [*] + " done" suffix
 */
export function spinner(lineEl, text, opts = {}) {
  const frames = ['[/]', '[-]', '[\\]', '[-]'];
  const interval = opts.interval ?? 120;
  let i = 0;
  let stopped = false;

  const render = () => {
    if (stopped) return;
    lineEl.innerHTML = `
      <span class="state state-core">${frames[i]}</span>
      <span class="text">${text}</span>
    `;
    i = (i + 1) % frames.length;
  };

  render();
  const timer = setInterval(render, interval);

  return (suffix = 'done') => {
    stopped = true;
    clearInterval(timer);
    lineEl.innerHTML = `
      <span class="state state-core">[*]</span>
      <span class="text">${text} ${suffix}</span>
    `;
  };
}

/**
 * Helper: run spinner for fixed duration, then mark as done.
 */
export async function spin(lineEl, text, durationMs = 800, suffix = 'done') {
  const stop = spinner(lineEl, text);
  await sleep(durationMs);
  stop(suffix);
}

// ─────────────────────────────────────────────────────
// MATRIX RAIN

/**
 * Overlay green code rain on terminal for N ms.
 * Inspired by The Matrix. Uses canvas for smooth animation.
 */
export function matrixRain(containerEl, durationMs = 3000) {
  const canvas = document.createElement('canvas');
  canvas.style.cssText = `
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 9999;
    background: rgba(0, 0, 0, 0.85);
    transition: opacity 400ms ease-out;
    opacity: 0;
  `;
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  const resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  resize();
  window.addEventListener('resize', resize);

  const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789アイウエオ';
  const fontSize = 16;
  const columns = Math.floor(canvas.width / fontSize);
  const drops = new Array(columns).fill(1);

  let running = true;
  const draw = () => {
    if (!running) return;
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#4ADE80';
    ctx.font = `${fontSize}px "JetBrains Mono", monospace`;

    for (let i = 0; i < drops.length; i++) {
      const ch = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(ch, i * fontSize, drops[i] * fontSize);
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
    requestAnimationFrame(draw);
  };

  // fade in
  requestAnimationFrame(() => {
    canvas.style.opacity = '1';
    draw();
  });

  return new Promise((resolve) => {
    setTimeout(() => {
      canvas.style.opacity = '0';
      setTimeout(() => {
        running = false;
        canvas.remove();
        window.removeEventListener('resize', resize);
        resolve();
      }, 400);
    }, durationMs);
  });
}

// ─────────────────────────────────────────────────────
// GLITCH

/**
 * Quick glitch pass on the terminal element. 500ms default.
 */
export function glitch(el, durationMs = 500) {
  const orig = el.style.cssText;
  el.classList.add('glitching');

  const frames = [
    'translate(2px, 0) skewX(0deg)',
    'translate(-2px, 1px) skewX(2deg)',
    'translate(1px, -1px) skewX(-1deg)',
    'translate(-1px, 0) skewX(0deg)',
    'translate(0, 0) skewX(0deg)',
  ];

  let i = 0;
  const timer = setInterval(() => {
    el.style.transform = frames[i % frames.length];
    el.style.filter = i % 2 ? 'hue-rotate(90deg) saturate(3)' : 'none';
    i++;
  }, 50);

  return new Promise((resolve) => {
    setTimeout(() => {
      clearInterval(timer);
      el.style.cssText = orig;
      el.classList.remove('glitching');
      resolve();
    }, durationMs);
  });
}

// ─────────────────────────────────────────────────────
// CLEAR / REBOOT

/**
 * Fade out terminal and clear history.
 */
export async function clearScreen(terminalEl) {
  terminalEl.style.transition = 'opacity 300ms ease-out';
  terminalEl.style.opacity = '0';
  await sleep(300);
  terminalEl.innerHTML = '';
  terminalEl.style.opacity = '1';
}

/**
 * Full reboot: clear → replay boot sequence.
 * Expects `renderBoot` callback that renders fresh boot lines.
 */
export async function reboot(terminalEl, renderBoot) {
  await clearScreen(terminalEl);
  await sleep(200);
  await renderBoot();
}

// ─────────────────────────────────────────────────────
// EFFECT DISPATCHER

/**
 * Central dispatch for effects returned from backend.
 *
 * Response from /api/cmd may include:
 *   { effect: "matrix_rain" | "glitch" | "clear" | "reboot", ... }
 */
export async function runEffect(effect, ctx) {
  if (!effect) return;

  switch (effect) {
    case 'matrix_rain':
      return matrixRain(ctx.terminalEl, 3000);
    case 'glitch':
      return glitch(ctx.terminalEl, 500);
    case 'clear':
      return clearScreen(ctx.terminalEl);
    case 'reboot':
      return reboot(ctx.terminalEl, ctx.renderBoot);
    default:
      console.warn('[!] unknown effect:', effect);
  }
}

// ─────────────────────────────────────────────────────
// UTIL

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
