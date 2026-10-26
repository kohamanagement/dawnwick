// v0.18 "Tell the Dealer": the in-game playtest feedback form.
// A button on the title screen, in the run menu and on the results screen opens a short form with the run
// already described (version, class, act, floor, seed, deaths, device, the last 20 taps and chains). It posts
// to Mike's Google Form (src/feedback/config.ts); with no form set up, or offline, the tester copies or shares
// the same report instead. Nothing is sent unless the tester taps Send.
import type { RunState, UiEvent } from '../engine/types';
import { APP_VERSION } from '../engine/meta';
import { runScore } from '../engine/run';
import { CHARACTERS } from '../data/characters';
import { CHAIN_ANSWERS, FEEDBACK, KINDS, PAY_ANSWERS, QUESTIONS, formReady } from '../feedback/config';
import { ActionLog, buildReport, formBody, formPostUrl, noteText, prefillUrl, type Answers, type RunContext } from '../feedback/report';
import { app, root, ui } from './state';
import { esc } from './render';

export const log = new ActionLog();
type Where = RunContext['where'];
let where: Where = 'title';
let sending = false;
const blank = (): Answers => ({ kind: '', what: '', stuck: '', died: '', chain: '', pay: '', contact: '' });
let draft: Answers = blank();

/** Shown unless turned off in Settings; release builds (FEEDBACK.beta = false) start with it off. */
export const visible = (): boolean => app.profile.settings.tellDealer ?? FEEDBACK.beta;

// ───────── the log ─────────

export function logTap(action: string, el: HTMLElement): void {
  if (action === 'noop' || action.startsWith('td')) return;
  const d = el.dataset;
  const extra = [d.v, d.id, d.k, d.row !== undefined ? `row ${d.row} col ${d.col}` : '', d.i !== undefined ? `#${d.i}` : '', d.uid !== undefined ? cardAt(Number(d.uid)) : ''].filter(Boolean).join(' ');
  log.push('tap', `${action}${extra ? ` ${extra}` : ''}`);
}

function cardAt(uid: number): string {
  const s = app.run?.combat;
  const c = s?.hand.find((x) => x.uid === uid) ?? app.run?.deck.find((x) => x.uid === uid);
  return c ? `${c.id}${c.up ? '+' : ''}` : `uid ${uid}`;
}

/** Chains and deaths from a combat action (called with the same events the fight animates). */
export function logEvents(events: UiEvent[]): void {
  for (const e of events) {
    if (e.t === 'chain' && e.links?.length) log.push('chain', e.links.map((l) => `${l.mine ? 'you' : 'foe'}:${l.name}${l.negated ? ' (negated)' : ''}`).join(' > '));
    else if (e.t === 'death') log.push('event', `${e.who === 'p' ? 'you' : `enemy ${e.who}`} died`);
  }
}

let lastScreen = '';
/** One line whenever the screen changes (called after each render). */
export function logScreen(): void {
  const r = app.view === 'run' ? app.run : null;
  const key = r ? `run:${r.screen} act ${r.act} floor ${r.floor}${r.combat ? ` turn ${r.combat.turn}` : ''}` : app.view;
  if (key !== lastScreen) { lastScreen = key; log.push('screen', key); }
}

export function installErrorLog(): void {
  window.addEventListener('error', (e) => log.push('error', `${e.message} @ ${String(e.filename).split('/').pop()}:${e.lineno}`));
  window.addEventListener('unhandledrejection', (e) => log.push('error', `promise: ${String((e.reason as Error)?.message ?? e.reason)}`));
}

// ───────── context ─────────

function platform(): string {
  const cap = (globalThis as { Capacitor?: { getPlatform?: () => string } }).Capacitor;
  const p = cap?.getPlatform?.() ?? 'web';
  let framed = false; try { framed = window.self !== window.top; } catch { framed = true; }
  return p === 'web' && framed ? 'web (embedded)' : p;
}

function device(): string {
  const ua = navigator.userAgent;
  const os = /iPhone|iPad|iPod/.exec(ua)?.[0] ?? (/Android [\d.]+/.exec(ua)?.[0]) ?? (/Mac OS X|Windows|Linux|CrOS/.exec(ua)?.[0]) ?? 'unknown OS';
  const ver = /OS (\d+[_\d]*) like Mac/.exec(ua)?.[1]?.replace(/_/g, '.') ?? '';
  const browser = /CriOS|FxiOS|EdgA?|Firefox|Chrome|Safari/.exec(ua)?.[0] ?? '';
  return [os + (ver ? ` ${ver}` : ''), browser].filter(Boolean).join(' · ');
}

function runCtx(r: RunState): NonNullable<RunContext['run']> {
  const ended = app.view === 'end';
  const hp = r.combat ? r.combat.player.hp : r.hp;
  return {
    character: CHARACTERS[r.character]?.name ?? r.character, stakes: r.ascension, act: r.act, floor: r.floor, seed: r.seed,
    hp: `${hp}/${r.maxHp}`, gold: r.gold, deck: r.deck.length, keepsakes: r.relics.length,
    screen: r.combat ? `${r.screen} (${r.combat.kind} fight, turn ${r.combat.turn}${r.lastFight ? `, vs ${r.lastFight.name}` : ''})` : r.screen,
    mode: r.puzzle ? 'riddle' : r.arena ? 'arena' : r.daily ? 'daily' : r.weekly ? 'weekly' : 'run',
    score: r.puzzle || r.arena ? undefined : app.result?.score ?? runScore(r),
    ...(ended ? { won: !!r.won, abandoned: !r.won && r.combat?.phase !== 'lost', fellTo: r.won ? undefined : r.lastFight?.name } : {}),
  };
}

export function context(w: Where = where): RunContext {
  const r = app.view === 'end' ? app.endRun : app.run;
  return {
    version: APP_VERSION, where: w, platform: platform(), device: device(),
    screen: `${window.innerWidth}x${window.innerHeight} @${window.devicePixelRatio || 1}x`,
    runs: app.profile.runs, wins: app.profile.wins, run: r ? runCtx(r) : null,
  };
}

export const report = (w: Where = where): string => buildReport(context(w), log.recent());

// ───────── the form ─────────

const opt = (name: keyof Answers, list: readonly string[], label: string): string =>
  `<label class="tdq"><span>${esc(label)}</span><select name="${name}"><option value="">Pick one</option>${list.map((x) => `<option${draft[name] === x ? ' selected' : ''}>${esc(x)}</option>`).join('')}</select></label>`;
const text = (name: keyof Answers, label: string, rows = 2): string =>
  `<label class="tdq"><span>${esc(label)}</span><textarea name="${name}" rows="${rows}" maxlength="2000">${esc(draft[name])}</textarea></label>`;

/** The run summary at the top of the form, so testers see exactly what gets sent. */
function summary(): string {
  const c = context();
  const r = c.run;
  return `<p class="muted small center">${r ? `${esc(r.character)} · Act ${r.act}, floor ${r.floor} · seed ${esc(String(r.seed))}` : 'No run in progress'} · v${c.version}</p>`;
}

export function open(w: Where): void {
  where = w;
  const share = typeof navigator.share === 'function';
  ui.modal(`<div class="tdform">
    <h2>🕯 Tell the Dealer</h2>
    <p class="small">Something broke, confused you, or felt great? Tell us. The game adds what was happening (your class, act, floor, seed, device and last 20 moves), nothing else.</p>
    ${summary()}
    <div class="tdkinds" role="radiogroup" aria-label="${esc(QUESTIONS.kind)}">${KINDS.map((k) => `<label class="tdkind"><input type="radio" name="kind" value="${esc(k)}" ${draft.kind === k ? 'checked' : ''}><span>${esc(k)}</span></label>`).join('')}</div>
    ${text('what', QUESTIONS.what, 3)}
    <details class="tdmore" ${draft.stuck || draft.died || draft.chain || draft.pay ? 'open' : ''}><summary>The 2-minute playtest questions</summary>
      ${text('stuck', QUESTIONS.stuck)}
      ${text('died', QUESTIONS.died)}
      ${opt('chain', CHAIN_ANSWERS, QUESTIONS.chain)}
      ${opt('pay', PAY_ANSWERS, QUESTIONS.pay)}
      <label class="tdq"><span>${esc(QUESTIONS.contact)}</span><input type="text" name="contact" maxlength="120" value="${esc(draft.contact)}"></label>
    </details>
    <details class="tdmore"><summary>See the run report</summary><pre class="tdreport">${esc(report())}</pre></details>
    ${formReady() ? '<button class="btn primary wide" data-a="tdSend">Send to the Dealer</button>' : '<p class="muted small">This build has no feedback form yet: copy the report and paste it where your playtest invite said (Discord, Reddit or email).</p>'}
    <div class="row2"><button class="btn" data-a="tdCopy">📋 Copy run report</button>${share ? '<button class="btn" data-a="tdShare">Share…</button>' : ''}</div>
  </div>`);
}

/** Keep what was typed when something re-renders under the open form. */
export function trackDraft(): void {
  const onInput = (e: Event): void => {
    const el = e.target as HTMLInputElement;
    if (!el.closest?.('.tdform') || !el.name || !(el.name in draft)) return;
    draft[el.name as keyof Answers] = el.value;
  };
  root.addEventListener('input', onInput);
  root.addEventListener('change', onInput);
}

const hasText = (a: Answers): boolean => !!(a.what.trim() || a.stuck.trim() || a.died.trim() || a.kind || a.chain || a.pay);

async function copyText(t: string): Promise<boolean> {
  try { await navigator.clipboard.writeText(t); return true; } catch { /* blocked in some embedded viewers */ }
  const ta = document.createElement('textarea');
  ta.value = t; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0';
  document.body.appendChild(ta); ta.select();
  let ok = false; try { ok = document.execCommand('copy'); } catch { ok = false; }
  ta.remove();
  return ok;
}

export async function copy(): Promise<void> {
  const t = noteText(draft, report());
  if (await copyText(t)) { ui.toast('📋 Run report copied. Paste it wherever your playtest invite said.', 'good'); return; }
  // Last resort: show the text so it can be selected by hand.
  ui.modal(`<h2>Copy this</h2><p class="small">Your device blocked copying. Press and hold the text, then Select All and Copy.</p><textarea class="tdreport" rows="12" readonly>${esc(t)}</textarea>`);
}

export async function share(): Promise<void> {
  try { await navigator.share({ title: 'Dawnwick playtest note', text: noteText(draft, report()) }); } catch { /* cancelled */ }
}

export async function send(): Promise<void> {
  if (sending) return;
  const a = { ...draft, what: draft.what.trim(), stuck: draft.stuck.trim(), died: draft.died.trim(), contact: draft.contact.trim() };
  if (!hasText(a)) { ui.toast('Tell the Dealer something first: pick a kind or type a line.', 'warn'); return; }
  const rep = report();
  sending = true;
  try {
    const ctl = new AbortController();
    const timer = setTimeout(() => ctl.abort(), 8000);
    // Google Forms answers without CORS headers, so the response is opaque: no exception means it arrived.
    await fetch(formPostUrl(), { method: 'POST', mode: 'no-cors', body: formBody(a, rep, APP_VERSION), signal: ctl.signal });
    clearTimeout(timer);
    log.push('event', 'feedback sent');
    draft = blank();
    app.modal = null; ui.render();
    ui.toast('🕯 The Dealer heard you. Thank you!', 'good');
  } catch {
    // Offline, or the page may not post to Google (some embedded viewers): open the prefilled form instead.
    const url = prefillUrl(a, rep, APP_VERSION);
    const w = url ? window.open(url, '_blank', 'noopener') : null;
    if (w) ui.toast('Opened the feedback form with your note filled in: tap Submit there.', 'good');
    else { await copy(); }
  } finally { sending = false; }
}

// ───────── buttons ─────────

export const titleButton = (): string => visible() ? '<button class="btn ghost tdbtn" data-a="tellDealer" data-v="title">🕯 Tell the Dealer<small>Playtest feedback</small></button>' : '';
export const menuButton = (): string => visible() ? '<button class="btn wide" data-a="tellDealer" data-v="menu">🕯 Tell the Dealer</button>' : '';
export const endCard = (): string => visible()
  ? '<div class="tdend"><span>Anything feel off, or great? <b>Tell the Dealer</b>: your run is filled in for you.</span><button class="btn small" data-a="tellDealer" data-v="end">🕯 Tell</button></div>'
  : '';

/** After a re-render, put the typed draft back into the open form. */
export function restoreDraft(): void {
  const form = root.querySelector('.tdform');
  if (!form) return;
  form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>('[name]').forEach((el) => {
    const v = draft[el.name as keyof Answers];
    if (v === undefined) return;
    if (el instanceof HTMLInputElement && el.type === 'radio') el.checked = el.value === v;
    else el.value = v;
  });
}
