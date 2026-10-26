// v0.15: hi-bit pixel icons in place of emoji. Every glyph the data uses (🔥, ⚔, ⟲, 🪙…) is drawn as a
// 16×16 sprite in one sheet (tools/pixel, generated into pxicons.ts). Content keeps its glyphs, so
// card data and tests are untouched; HTML is passed through pixify() just before it reaches the DOM.
import { PX_COLS, PX_GLYPH, PX_INDEX, PX_ROWS, PX_SHEET } from './pxicons';

const CELL = 18; // 16 px icon + 1 px clear gutter each side
const VS = /️|︎/g;

// Match the longest glyph first (❤️‍🔥 before ❤️ before ❤), with or without a trailing variation selector.
const KEYS = new Map<string, string>();
for (const [g, n] of Object.entries(PX_GLYPH)) { KEYS.set(g, n); KEYS.set(g.replace(VS, ''), n); }
const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const ALT = [...KEYS.keys()].filter(Boolean).sort((a, b) => b.length - a.length).map(esc).join('|');
/** A known glyph, or an explicit `:px-name:` token for icons that have no emoji of their own. */
const GLYPH_RE = new RegExp(`:px-([a-z_]+):|(?:${ALT})\\uFE0F?`, 'gu');
/** Arrows and other text marks some fonts paint as emoji: force text presentation. */
const TEXTY = /([←-⇿⬅-⬇])️/g;

function nameOf(m: string, token?: string): string | undefined {
  return token ?? KEYS.get(m) ?? KEYS.get(m.replace(VS, ''));
}

/** One pixel icon as inline HTML. Size follows the font size (1.25em), so existing CSS keeps working. */
export function pxIcon(name: string, cls = ''): string {
  const i = PX_INDEX[name];
  if (i === undefined) return '';
  const x = ((i % PX_COLS) * CELL + 1) / 16, y = (Math.floor(i / PX_COLS) * CELL + 1) / 16;
  return `<i class="px${cls ? ` ${cls}` : ''}" style="--x:${x};--y:${y}" aria-hidden="true"></i>`;
}

/** The icon name a glyph is drawn as (for tests and tools). */
export function pxName(glyph: string): string | undefined { return nameOf(glyph); }

/** Plain-text contexts (attributes, <option>, document title): drop the glyphs, keep the words. */
export function pxText(s: string): string {
  return s.replace(GLYPH_RE, '').replace(TEXTY, '$1').replace(/ {2,}/g, ' ').replace(/^ | $/g, '');
}

const PLAIN = /^<(option|textarea|title)\b/i;
/** Replace glyphs in an HTML string's text with pixel icons; strip them from attribute values. */
export function pixify(html: string): string {
  if (!html) return html;
  let plain = 0;
  return html.split(/(<(?:[^>"']|"[^"]*"|'[^']*')*>)/).map((part) => {
    if (part.startsWith('<')) {
      if (PLAIN.test(part)) plain++;
      else if (/^<\/(option|textarea|title)/i.test(part)) plain = Math.max(0, plain - 1);
      return /[\u2190-\u2BFF\u{1F000}-\u{1FAFF}]|:px-/u.test(part) ? part.replace(/(=")([^"]*)(")/g, (_m, a, v, b) => a + pxText(v) + b) : part;
    }
    if (plain) return pxText(part);
    const out = part.replace(GLYPH_RE, (m, token) => { const n = nameOf(m, token); return n ? pxIcon(n) : m; }).replace(TEXTY, '$1');
    // Icon + words used to be one text run; keep them one box so flex layouts don't split them apart.
    return out !== part && /[^\s]/.test(part.replace(GLYPH_RE, '')) ? `<span class="pxrun">${out}</span>` : out;
  }).join('');
}

/** Installs the sheet once, as a CSS rule, so each icon is just an <i> with two numbers. */
export function installPx(): void {
  if (typeof document === 'undefined' || document.getElementById('px-sheet')) return;
  const st = document.createElement('style');
  st.id = 'px-sheet';
  const size = (s: string) => `background-size:calc(${s} * ${PX_COLS * CELL / 16}) calc(${s} * ${PX_ROWS * CELL / 16})`;
  // Pseudo-element badges (champion flame, shattered pull) can't hold an <i>, so they get their cell here.
  const pseudo = (sel: string, name: string, s: string) => {
    const i = PX_INDEX[name];
    return `${sel}{content:'';width:${s};height:${s};background:url(${PX_SHEET}) no-repeat;${size(s)};image-rendering:pixelated;`
      + `background-position:calc(${s} * -${((i % PX_COLS) * CELL + 1) / 16}) calc(${s} * -${(Math.floor(i / PX_COLS) * CELL + 1) / 16})}`;
  };
  st.textContent = `.px{background-image:url(${PX_SHEET});${size('var(--s)')}}`
    + pseudo('.node.champ::after', 'fire', '18px')
    + pseudo('.spread .node.mc.champ::after', 'fire', '22px')
    + pseudo('.spread .node.mc .back::after', 'cloud', '26px') + '.spread .node.mc .back::after{margin:auto;opacity:.45}'
    + pseudo('.pull.shattered::after', 'burst', '48px') + '.pull.shattered::after{margin:auto}';
  document.head.appendChild(st);
}
