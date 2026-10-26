// v0.11 "The Last Word": plays the storyline (src/data/story.ts) at the right moments of a run, writes the story
// part of the end screen, and keeps the Story book. It watches the run from render() instead of hooking every
// screen, so the rest of the game only needs four one-line hooks (see story-merge-notes.md).
import type { CharId, RunState } from '../engine/types';
import { app, ui } from './state';
import { esc } from './render';
import { CHARACTERS, CHAR_LIST } from '../data/characters';
import { ENEMIES, ACT_NAMES } from '../data/enemies';
import { actEnc, nightOf } from '../engine/run';
import {
  SPEAKERS, PROLOGUE, REENTRY, ACT_KICKER, ACT_DEALER, WANDERER_DEALER, ACT_WICK, NEMESIS_DEALER, NIGHT_INTRO, NIGHT_BOSS,
  BOSSES, BOSS_FALLBACK, ECHO_LINES, ECHO_BEAT, NEMESIS_LINES, PATRON_WICK, ASK_OPEN, ASK_OPEN_DEALER, ASK_STING, TRUE_END, MIRROR_LOST,
  NIGHT_END, FALL_WICK, FALL_FERRY, FALL_NEMESIS, CLASSES, DEALER_RETORT, CHAPTERS, type Beat, type BossStory,
} from '../data/story';
import './story.css';

// ───────── saved story state (its own key, so the profile format does not change) ─────────

interface StoryStats { runs: number; deaths: number; wins: number; bosses: string[]; won: CharId[]; mirror: number; mirrorWins: number; nights: number; echoes: number; nemeses: number }
interface StoryStore { on: boolean; prologue: boolean; beats: Record<string, string[]>; order: string[]; done: string[]; stats: StoryStats; read: string[] }

// The game was called Riposte until v0.14.1; storage keys keep the old prefix so saves carry over.
const KEY = 'riposte.story.v1';
const fresh = (): StoryStore => ({ on: true, prologue: false, beats: {}, order: [], done: [], read: [],
  stats: { runs: 0, deaths: 0, wins: 0, bosses: [], won: [], mirror: 0, mirrorWins: 0, nights: 0, echoes: 0, nemeses: 0 } });
let store: StoryStore = load();
function load(): StoryStore {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) { const s = JSON.parse(raw) as Partial<StoryStore>; const f = fresh(); return { ...f, ...s, stats: { ...f.stats, ...(s.stats ?? {}) } }; }
  } catch { /* storage blocked: the story still plays, it just won't remember */ }
  return fresh();
}
function save(): void { try { localStorage.setItem(KEY, JSON.stringify(store)); } catch { /* ignore */ } }

/** Has this beat already played in this run? Marks it as played. */
function once(r: RunState, key: string): boolean {
  const id = String(r.seed);
  let list = store.beats[id];
  if (!list) {
    list = store.beats[id] = [];
    store.order.push(id);
    while (store.order.length > 6) delete store.beats[store.order.shift()!];
  }
  if (list.includes(key)) return false;
  list.push(key);
  save();
  return true;
}
const played = (r: RunState, key: string) => !!store.beats[String(r.seed)]?.includes(key);

// ───────── text helpers ─────────

/** A stable pick for this run, so a reload shows the same line. */
function pick<T>(r: RunState | null, list: T[], salt: string): T {
  let h = 2166136261;
  for (const ch of `${r?.seed ?? 0}:${salt}`) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
  return list[Math.abs(h) % list.length];
}
const fill = (t: string, v: Record<string, string | number>) => t.replace(/\{(\w+)\}/g, (m, k) => (k in v ? String(v[k]) : m));
const bossStory = (id: string): BossStory => BOSSES[id] ?? BOSS_FALLBACK;
const className = (r: RunState) => CHARACTERS[r.character].name;

function speaker(who: string, r: RunState | null, bossId?: string): { name: string; icon: string; cls: string } {
  if (who === 'class' && r) { const c = CHARACTERS[r.character]; return { name: c.name, icon: c.icon, cls: 'you' }; }
  if (who === 'boss' && bossId) { const e = ENEMIES[bossId]; return { name: e?.name ?? '', icon: e?.icon ?? '❔', cls: 'boss' }; }
  const s = SPEAKERS[who] ?? SPEAKERS.narrator;
  return { name: s.name, icon: s.icon, cls: s.cls ?? '' };
}

// ───────── the scene player (one beat at a time, chat style) ─────────

interface Line { name: string; icon: string; cls: string; text: string }
interface Scene { kicker?: string; title?: string; lines: Line[]; at: number }
let scene: Scene | null = null;

function lines(beats: Beat[], r: RunState | null, vars: Record<string, string | number> = {}, bossId?: string): Line[] {
  return beats.map((bt) => ({ ...speaker(bt.who, r, bossId), text: fill(bt.text, { class: r ? className(r) : '', ...vars }) }));
}

function sceneHtml(s: Scene): string {
  const shown = s.lines.slice(0, s.at + 1);
  const last = s.at >= s.lines.length - 1;
  return `<div class="story">
    ${s.kicker ? `<div class="st-kicker">${esc(s.kicker)}</div>` : ''}${s.title ? `<h2 class="st-title">${esc(s.title)}</h2>` : ''}
    <div class="st-lines">${shown.map((l, i) => `<div class="st-line ${l.cls} ${i === s.at ? 'new' : 'old'}">
      ${l.name ? `<div class="st-who"><span class="st-icon">${l.icon}</span><b>${esc(l.name)}</b></div>` : ''}<p>${esc(l.text)}</p></div>`).join('')}</div>
    <div class="st-foot"><span class="st-dots" aria-hidden="true">${s.lines.map((_, i) => (i <= s.at ? '●' : '○')).join('')}</span>
      ${last ? '' : '<button class="btn ghost small" data-a="storySkip">Skip</button>'}
      <button class="btn primary" data-a="storyNext">${last ? 'Continue' : 'Next'}</button></div>
  </div>`;
}

function play(s: Omit<Scene, 'at'>): void {
  if (!s.lines.length) return;
  scene = { ...s, at: 0 };
  app.modal = sceneHtml(scene);
  // A non-null confirmFn hides the generic Close button; tapping outside or Esc still skips the scene.
  app.confirmFn = () => {};
}

function close(): void { scene = null; app.modal = null; app.confirmFn = null; ui.render(); }

export const storyActions: Record<string, (el: HTMLElement) => void> = {
  storyNext: () => {
    if (!scene) return close();
    if (scene.at >= scene.lines.length - 1) return close();
    scene.at++;
    app.modal = sceneHtml(scene);
    ui.render();
  },
  storySkip: () => close(),
  storyBook: () => { app.modal = bookHtml(); app.confirmFn = null; ui.render(); },
  storyChapter: (el) => {
    const ch = CHAPTERS.find((c) => c.id === el.dataset.id);
    if (!ch || !unlocked(ch.id)) return;
    if (!store.read.includes(ch.id)) { store.read.push(ch.id); save(); }
    app.modal = `<div class="story book"><div class="st-kicker">The Story So Far</div><h2 class="st-title">${esc(ch.title)}</h2>
      ${ch.text.map((t) => `<p class="st-page">${esc(t)}</p>`).join('')}
      <button class="btn wide" data-a="storyBook">Back to the book</button></div>`;
    ui.render();
  },
  storyClass: (el) => {
    const id = el.dataset.id as CharId;
    const c = CHARACTERS[id], cs = CLASSES[id];
    if (!c || !cs) return;
    const won = store.stats.won.includes(id);
    app.modal = `<div class="story book"><div class="st-kicker">${c.icon} ${esc(c.name)}</div><h2 class="st-title">${won ? esc(cs.ask) : 'What will they ask for?'}</h2>
      <p class="st-page">${esc(cs.who)}</p><p class="st-page"><i>“${esc(cs.motive[0])}”</i></p>
      ${won ? `<p class="st-page">${cs.win.map((bt) => `<b>${esc(bt.who === 'class' ? c.name : speaker(bt.who, null).name || '')}</b> ${esc(bt.text)}`).join('<br>')}</p>` : '<p class="muted">Win a run as this class to read their ending.</p>'}
      <button class="btn wide" data-a="storyBook">Back to the book</button></div>`;
    ui.render();
  },
  storyPrologue: () => { play({ kicker: 'Prologue', title: 'The Last Word', lines: lines(PROLOGUE, null) }); ui.render(); },
  storyToggle: () => { store.on = !store.on; save(); app.modal = bookHtml(); ui.render(); },
};

// ───────── the watcher: called at the top of every render ─────────

/** Plays at most one scene per render, when nothing else is on screen. */
export function watch(): void {
  const r = app.run;
  if (!store.on || app.view !== 'run' || !r || r.arena || r.puzzle || r.finished) return;
  if (app.modal || app.picker || app.pack || app.busy || app.counterAsk || app.chainShow) { combatToasts(r); return; }
  const night = nightOf(r);
  const atStart = !r.pos && (r.screen === 'map' || r.screen === 'fate' || r.screen === 'patron');
  if (atStart && !night && r.act <= 3 && once(r, `act${r.act}`)) return actIntro(r);
  if (atStart && night && once(r, `night${night}`)) return nightIntro(r, night);
  if (r.screen === 'patron' && r.patron && !r.patron.done && once(r, `patron${r.act}`)) { const w = PATRON_WICK[r.patron.id]; if (w) ui.toast(esc(w)); return; }
  if (r.screen === 'combat' && r.combat && r.combat.turn === 1 && r.combat.phase === 'player') {
    const cb = r.combat;
    if (cb.kind === 'boss' && once(r, `boss${r.act}`)) return bossIntro(r, cb.enemies[0]?.def ?? '');
    if (cb.nemesis && once(r, `nem${r.act}`)) { const g = Math.max(1, r.nemesis?.grudge ?? 1); ui.toast(esc(fill(NEMESIS_LINES[Math.min(NEMESIS_LINES.length, g) - 1], { name: cb.enemies[0]?.name ?? 'Your Nemesis' }))); return; }
    if (cb.echoBeat && once(r, 'echobeat')) { play({ kicker: 'An old friend', title: cb.encounter, lines: lines(ECHO_BEAT, r, {}, '') }); return; }
    if (cb.kind === 'elite' && cb.enemies.some((e) => e.ghost) && once(r, `echo${r.act}:${r.floor}`)) { store.stats.echoes++; save(); ui.toast(`🪞 ${esc(pick(r, ECHO_LINES, `echo${r.floor}`))}`); return; }
  }
  combatToasts(r);
  // A boss of Acts 1–2 has just fallen (its reward screen is up).
  const lf = r.lastFight;
  if (r.screen === 'reward' && lf?.kind === 'boss' && lf.act === r.act && r.act < 3 && once(r, `down${r.act}`)) return bossDown(r, lf.enemies[0]);
  // The Act 3 boss (or the Reflection) has fallen and the crossroads is up.
  if (r.screen === 'epilogue' && once(r, `cross:${r.epilogue ?? ''}`)) return crossroads(r);
}

/** The boss's half-HP shout: a toast, so it never interrupts play. */
function combatToasts(r: RunState): void {
  const cb = r.combat;
  if (!store.on || r.screen !== 'combat' || !cb || cb.kind !== 'boss') return;
  const e = cb.enemies[0];
  if (!e || e.hp <= 0 || e.hp > e.maxHp / 2 || played(r, `half${r.act}`)) return;
  once(r, `half${r.act}`);
  ui.toast(`${e.icon} <b>${esc(e.name)}</b>: “${esc(bossStory(e.def).half)}”`, 'storytoast');
}

function actIntro(r: RunState): void {
  const a = r.act;
  const variant = r.acts?.[a - 1] ?? 0;
  const cs = CLASSES[r.character];
  const beats: Beat[] = [];
  if (a === 1) {
    if (!store.prologue) { beats.push(...PROLOGUE); store.prologue = true; }
    else beats.push(...[...REENTRY].reverse().find((x) => store.stats.deaths >= x.min)!.beats);
    beats.push({ who: 'class', text: pick(r, cs.motive, 'motive') });
    store.stats.runs++;
    save();
  }
  beats.push(...ACT_DEALER[a][variant]);
  const boss = actEnc(r).boss.enemies[0];
  if (r.bosses?.[a - 1] && WANDERER_DEALER[boss]) beats.push(WANDERER_DEALER[boss]);
  const nem = r.nemesis && !r.nemesis.met && r.nemesis.act === a ? r.nemesis : null;
  if (nem) beats.push(NEMESIS_DEALER);
  if (a > 1 || store.stats.runs > 1) beats.push(pick(r, ACT_WICK[a], `wick${a}`));
  beats.push({ who: 'class', text: cs.acts[a - 1] });
  play({ kicker: ACT_KICKER[a], title: ACT_NAMES[a]?.[variant] ?? '', lines: lines(beats, r, { name: nem?.name ?? '' }) });
}

function nightIntro(r: RunState, n: number): void {
  const beats = n === 1 ? NIGHT_INTRO[0] : pick(r, NIGHT_INTRO.slice(1), `night${n}`);
  play({ kicker: 'The Long Night', title: `Night ${n}`, lines: lines(beats, r, { n }) });
}

function bossIntro(r: RunState, id: string): void {
  const st = bossStory(id);
  const cs = CLASSES[r.character];
  const n = nightOf(r);
  const beats: Beat[] = [];
  const own = !!BOSSES[id];
  if (n && id !== 'night_mare' && id !== 'dawn_eater') beats.push(NIGHT_BOSS);
  beats.push(...(own ? st.intro : BOSS_FALLBACK.intro));
  if (id === 'reflection') beats.push({ who: 'class', text: cs.mirror });
  else beats.push({ who: 'class', text: cs.rivals[id] ?? cs.retort });
  const name = ENEMIES[id]?.name ?? 'The boss';
  play({ kicker: n ? `Night ${n}` : r.act === 4 ? ACT_KICKER[4] : 'Boss', title: name, lines: lines(beats, r, { boss: name, n }, id) });
}

function bossDown(r: RunState, id: string): void {
  if (!store.stats.bosses.includes(id)) { store.stats.bosses.push(id); save(); }
  play({ kicker: `Act ${r.act} cleared`, title: ENEMIES[id]?.name ?? '', lines: lines(bossStory(id).down, r, {}, id) });
}

/** After the Act 3 boss: its last words, then the mirror or the stair. */
function crossroads(r: RunState): void {
  const beats: Line[] = [];
  const lf = r.lastFight;
  if (r.epilogue !== 'won' && lf?.kind === 'boss' && !played(r, 'down3')) {
    once(r, 'down3');
    const id = lf.enemies[0];
    if (!store.stats.bosses.includes(id)) { store.stats.bosses.push(id); save(); }
    beats.push(...lines(bossStory(id).down, r, {}, id));
  }
  if (r.epilogue === 'offered') beats.push(...lines([{ who: 'dealer', text: 'One thing before you Ask. Every winner sees it. Behind the table, duelist. Have a look.' }, { who: 'wick', text: 'Why is it a mirror. Why is it ALWAYS a mirror.' }], r));
  else beats.push(...lines([{ who: 'dealer', text: 'You could Ask now and walk away. Or there’s the stair under my table. It goes down into the night itself.' }, { who: 'wick', text: 'Down there is whatever ate me. Just saying. No pressure. Some pressure.' }], r));
  play({ kicker: 'The Last Table', title: r.epilogue === 'offered' ? 'The Last Mirror' : r.epilogue === 'won' ? 'The Stair Down' : 'The Crossroads', lines: beats });
}

// ───────── the end screen ─────────

/** The story block on the results screen. Also records the run for the Story book (once). */
export function endingHtml(r: RunState): string {
  if (r.arena || r.puzzle) return '';
  record(r);
  if (!store.on) return '';
  const beats = endBeats(r);
  if (!beats.length) return '';
  const bossId = r.lastFight?.enemies[0];
  return `<div class="story-end ${r.won ? 'won' : 'lost'}">
    <div class="st-kicker">${r.won ? 'The Ask' : 'The Ferryman'}</div>
    ${beats.map((bt) => { const s = speaker(bt.who, r, bossId); return `<div class="st-line ${s.cls}">${s.name ? `<div class="st-who"><span class="st-icon">${s.icon}</span><b>${esc(s.name)}</b></div>` : ''}<p>${esc(bt.text)}</p></div>`; }).join('')}
  </div>`;
}

function endBeats(r: RunState): Beat[] {
  const cs = CLASSES[r.character];
  const lf = r.lastFight;
  const vars = { n: Math.max(0, nightOf(r) - 1), name: app.profile.nemesis?.name ?? '' };
  const out: Beat[] = [];
  const f = (bts: Beat[]) => bts.map((bt) => ({ ...bt, text: fill(bt.text, vars) }));
  if (!r.won) {
    if (lf?.kind === 'boss') out.push({ who: 'boss', text: bossStory(lf.enemies[0]).win });
    out.push({ who: 'ferryman', text: pick(r, FALL_FERRY, 'ferry') });
    out.push({ who: 'class', text: cs.fall });
    out.push({ who: 'wick', text: pick(r, FALL_WICK, 'fall') });
    if (app.profile.nemesis && !r.daily && !r.weekly) out.push(...f([FALL_NEMESIS]));
    return out;
  }
  // Won: the Act 3 boss's last words (if no crossroads scene showed them), the Ask, then whatever came after.
  const beatDealer = wasDealer(r);
  if (!beatDealer && !played(r, 'down3') && lf?.kind === 'boss' && lf.act === 3) out.push(bossStory(lf.enemies[0]).down[0]);
  out.push(...(beatDealer ? ASK_OPEN_DEALER : ASK_OPEN));
  if (beatDealer && !cs.rivals.last_dealer) out.push({ who: 'class', text: DEALER_RETORT });
  out.push(...cs.win);
  out.push(...ASK_STING);
  if (r.epilogue === 'won') { out.push(...TRUE_END); out.push({ who: 'narrator', text: cs.trueEnd }); }
  else if (r.epilogue === 'lost') out.push(...MIRROR_LOST);
  if (nightOf(r)) out.push(...f([...NIGHT_END].reverse().find((x) => vars.n >= x.min)!.beats));
  return out;
}

/** Was the Act 3 boss of this run the Last Dealer himself? */
const act3Boss = (r: RunState) => actEnc(r, 3).boss.enemies[0];
const wasDealer = (r: RunState) => act3Boss(r) === 'last_dealer';

function record(r: RunState): void {
  const id = String(r.seed);
  if (store.done.includes(id)) return;
  store.done.push(id);
  if (store.done.length > 40) store.done.shift();
  const s = store.stats;
  if (r.won) { s.wins++; if (!s.won.includes(r.character)) s.won.push(r.character); } else s.deaths++;
  if (r.won && !s.bosses.includes(act3Boss(r))) s.bosses.push(act3Boss(r));
  if (r.epilogue === 'won' || r.epilogue === 'lost') s.mirror++;
  if (r.epilogue === 'won') s.mirrorWins++;
  if (nightOf(r)) s.nights++;
  if (r.nemesis?.slain) s.nemeses++;
  save();
}

// ───────── the Story book ─────────

const ACT1 = ['lantern_warden', 'tide_broker', 'antlered_king', 'briar_queen', 'bell_tyrant'];
const ACT2 = ['chorus_of_knives', 'impresario', 'leviathan', 'magpie_king', 'blotted_saint'];

function unlocked(id: string): boolean {
  const s = store.stats;
  const p = app.profile;
  switch (id) {
    case 'deal': return true;
    case 'ferry': return s.deaths > 0 || p.runs > p.wins;
    case 'door': return s.bosses.some((x) => ACT1.includes(x)) || s.wins > 0 || p.wins > 0;
    case 'grudge': return !!p.nemesis || s.nemeses > 0 || s.deaths > 0;
    case 'audience': return s.bosses.some((x) => ACT2.includes(x)) || s.wins > 0 || p.wins > 0;
    case 'copies': return s.echoes > 0 || (p.legacy?.length ?? 0) > 0;
    case 'table': return s.wins > 0 || p.wins > 0;
    case 'cassius': return s.bosses.includes('last_dealer');
    case 'mirror': return s.mirror > 0;
    case 'night': return s.nights > 0 || (p.bestNight ?? 0) > 0;
    case 'masked': return Math.max(s.wins, p.wins) >= 3;
    case 'riposte': return s.mirrorWins > 0;
  }
  return false;
}

/** For the title screen button: chapters unlocked and not yet read. */
export function unreadCount(): number { return CHAPTERS.filter((c) => unlocked(c.id) && !store.read.includes(c.id)).length; }
export function bookProgress(): string { return `${CHAPTERS.filter((c) => unlocked(c.id)).length}/${CHAPTERS.length} chapters`; }

function bookHtml(): string {
  const won = store.stats.won;
  return `<div class="story book"><div class="st-kicker">Dawnwick</div><h2 class="st-title">The Story So Far</h2>
    <p class="muted small">Under a city where the sun stopped rising, you carry the last ember of dawn down a duel hall full of ghosts.</p>
    <div class="st-chapters">${CHAPTERS.map((c, i) => {
      const ok = unlocked(c.id);
      const isNew = ok && !store.read.includes(c.id);
      return `<button class="btn choice st-ch ${ok ? '' : 'locked'}" data-a="${ok ? 'storyChapter' : 'noop'}" data-id="${c.id}" ${ok ? '' : 'aria-disabled="true"'}>
        <b>${i + 1}. ${ok ? esc(c.title) : '???'}${isNew ? ' <span class="st-new">new</span>' : ''}</b><small>${ok ? '' : `🔒 ${esc(c.hint)}`}</small></button>`;
    }).join('')}</div>
    <h3 class="st-sub">The duelists <small>${won.length}/${CHAR_LIST.length} endings</small></h3>
    <div class="st-classes">${CHAR_LIST.map((c) => `<button class="st-cl ${won.includes(c.id) ? 'won' : ''}" data-a="storyClass" data-id="${c.id}" aria-label="${esc(c.name)}">${c.icon}${won.includes(c.id) ? '<i>✓</i>' : ''}</button>`).join('')}</div>
    <div class="row2"><button class="btn" data-a="storyPrologue">Replay the prologue</button><button class="btn ghost" data-a="storyToggle">Story scenes: ${store.on ? 'On' : 'Off'}</button></div>
  </div>`;
}
