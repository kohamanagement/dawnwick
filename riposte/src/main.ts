import './style.css';
import type { CardInst, ChainLinkView, CharId, EnemyState, RunState, UiEvent, ModId } from './engine/types';
import { Combat, cardText, vals, type CounterWindow } from './engine/combat';
import { ELEMENT_LIST, ELEMENT_MAP } from './data/elements';
import {
  ASCENSION_TEXT, DAILY_MODS, ROWS, buyCard, buyRelic, buyRemove, chooseEvent, finishCombat, forgeApply, newRun, nodeAt,
  proceed, reachable, rerollCards, answerDealer, removePriceFor, payDebt, DEBT_PRICE, restRehearse, restScout, peek, isDown, suitOf, SUIT, PATRON_TRAP, restHeal, restHealAmount, restUpgrade, takeCard, takeDare, takeGold, takeRelic, travel, runScore,
  actEnc, buyOmen, useOmenOnMap, discardOmen, enterEpilogue, declineEpilogue, EPILOGUE_CHAMPS,
  choosePatron, patronOf, descendNight, nightOf, nightReady, nightsCleared,
  chooseFate, foggy, nightHpMult, nightStr,
} from './engine/run';
import { FATE_MAP } from './data/fates';
import { SKY_MAP, LAYOUT_MAP, TERROR_MAP, skyOf } from './data/wilds';
import { SURPRISE_MAP } from './data/surprises';
import { BUFF_MAP } from './data/events6';
import { VENUE_MAP } from './data/venues';
import { BLESSING_MAP, PATRON_MAP } from './data/patrons';
import { puzzleRun, judge, recordSolve } from './engine/puzzle';
import { PUZZLE_MAP, PUZZLES, PUZZLE_REWARD } from './data/puzzles';
import { EPILOGUE } from './data/enemies';
import { APP_VERSION, UNLOCKS, dailySetup, levelOf, mintLegacy, newProfile, saveProfile, saveRun, todayKey, unlockedChars, weekKey, weeklySetup } from './engine/meta';
import * as eco from './engine/economy';
import { CARDS } from './data/cards';
import { CHARACTERS, CHAR_LIST } from './data/characters';
import { ENEMIES } from './data/enemies';
import { RELICS } from './data/relics';
import { STATUSES } from './data/statuses';
import { EVENT_MAP, eventText, type PickKind } from './data/events';
import { AFFIX_MAP } from './data/affixes';
import { DARE_MAP, DARE_PAYOUT } from './data/dares';
import { MODS, MOD_LIST } from './data/mods';
import { altPath, pathALabel } from './data/upgrades';
import { ACHIEVEMENTS } from './data/achievements';
import {
  FACTION_GLYPH, FACTION_NAME, TRIGGER_GLYPH, TRIGGER_TEXT, cardHtml, cardName, esc, hpBar, intentHtml, keywordList, relicChip, relicRow, statusChips, synergy,
  type HpPreview, elemBadge, matchupText,
  upgradeLines,
} from './ui/render';
import { app, root, ui, type View } from './ui/state';
import * as hub from './ui/hub';
import { artIcon } from './ui/art';
import { viewSpread } from './ui/map';
import * as audio from './ui/audio';
import * as ev from './ui/events';
import * as story from './ui/story';
import * as arena from './engine/arena';
import { OMENS, omenCap } from './data/omens';
import { ACT_NAMES } from './data/enemies';
import { COSMETIC_MAP } from './data/season';
import { TWIST_MAP } from './data/vows';

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const speed = () => (app.profile.settings.turbo ? 0.25 : app.profile.settings.fast ? 0.5 : 1) * (app.profile.settings.reduceMotion ? 0.6 : 1);

// Layers that survive re-renders: particles/flying cards, and toasts.
const fx = document.createElement('div'); fx.id = 'fx'; document.body.appendChild(fx);
const toasts = document.createElement('div'); toasts.id = 'toasts'; document.body.appendChild(toasts);

audio.configure(() => app.profile.settings);

function applySettings(): void {
  const s = app.profile.settings;
  document.documentElement.dataset.text = s.text;
  document.documentElement.classList.toggle('reduce-motion', s.reduceMotion);
  document.documentElement.classList.toggle('lefty', s.leftHanded);
  // Inside an embedded viewer (an iframe), let swipes reach the page around us and let short frames scroll.
  let framed = false; try { framed = window.self !== window.top; } catch { framed = true; }
  document.documentElement.classList.toggle('framed', framed);
  document.body.dataset.back = app.profile.cosmetics.back;
  audio.applyVolumes();
}

function persist(): void {
  // While an Arena duel borrows app.run, the roguelike run waits in app.stash and the duel lives in the profile.
  // Riddles (puzzles) borrow app.run the same way and are never saved.
  if (app.run?.arena || app.run?.puzzle) saveRun(app.stash);
  else saveRun(app.run);
  saveProfile(app.profile);
}

function combat(): Combat | null {
  if (!app.run?.combat) return null;
  const cb = new Combat(app.run.combat, app.run);
  // Anything not run through runAction() plays Counters automatically, so it can never stop mid-chain.
  cb.counterMode = app.profile.settings.counters === 'off' ? 'off' : 'auto';
  cb.detail = true;
  return cb;
}

/**
 * v0.7: run a combat action with hand Counters offered to the player. The engine rewinds to before the
 * action whenever a counter window opens; we ask, remember the answer, and replay with it.
 */
async function runAction(cb: Combat, fn: () => void): Promise<void> {
  const mode = app.profile.settings.counters ?? 'ask';
  if (mode !== 'ask') { cb.counterMode = mode; fn(); return; }
  cb.counterMode = 'ask';
  const decisions: number[] = [];
  for (let guard = 0; guard < 40; guard++) {
    cb.decisions = decisions;
    const win = cb.attempt(fn);
    if (!win) break;
    decisions.push(await askCounter(win));
  }
  cb.decisions = null;
  cb.counterMode = 'auto';
}

function askCounter(win: CounterWindow): Promise<number> {
  return new Promise((resolve) => {
    app.counterAsk = { win, resolve: (uid) => { app.counterAsk = null; render(); resolve(uid); }, sel: win.options.length === 1 && !win.omens?.length ? win.options[0] : undefined };
    audio.sfx('trap');
    render();
  });
}

/** v0.13: a chain link shown face-up: its card, or for an enemy move a move card with the intent preview. */
function linkFace(l: ChainLinkView, cb: Combat): string {
  if (l.card && CARDS[l.card.id]) return cardHtml(l.card, { act: 'noop', cls: 'linkface' });
  if (l.omen && OMENS[l.omen]) { const o = OMENS[l.omen]; return `<div class="movecard linkface mine omenface"><span class="numeral">${o.numeral}</span><span class="mvicon">${o.icon}</span><b>${esc(o.name)}</b><small>Omen · ${TRIGGER_GLYPH[o.sign]}</small></div>`; }
  const e = l.who && l.who !== 'p' ? cb.s.enemies[Number(l.who)] : null;
  const icon = e && ENEMIES[e.def] ? ENEMIES[e.def].icon : l.counter ? '↯' : '⚔';
  return `<div class="movecard linkface ${l.mine ? 'mine' : 'theirs'}"><span class="mvicon">${icon}</span><b>${esc(l.name)}</b><small>${l.counter ? 'Rebuttal' : l.mine ? 'Your move' : 'Enemy tell'}</small>${l.intents ? `<span class="intents">${intentHtml(l.intents)}</span>` : ''}</div>`;
}

/** v0.13: what a chain link does, in words: its text, its target, how much of an attack gets through your Block. */
function linkInfo(l: ChainLinkView, chain: ChainLinkView[], i: number, cb: Combat): string {
  const atk = (l.intents ?? []).filter((x) => x.icon === 'atk').reduce((a, x) => a + (x.n ?? 0) * (x.times ?? 1), 0);
  const p = cb.s.player;
  const through = Math.max(0, atk - p.block);
  const hurt = atk && l.target === 'You'
    ? `<p class="lihurt ${through >= p.hp ? 'lethal' : through ? 'hurts' : 'blocked'}">⚔ ${atk} damage · ${p.block ? `${p.block} Guard · ` : ''}${through ? `<b>${through}</b> gets through (you have ${p.hp} HP)` : 'all blocked'}</p>` : '';
  const prev = i > 0 ? chain[i - 1] : null;
  return `<b class="liname">${l.counter ? '↯ ' : ''}${esc(l.name)}</b><small class="liowner">${l.mine ? 'You' : esc(l.owner)}${l.target ? ` → ${esc(l.target)}` : ''}</small>
    <p class="litext">${esc(l.text ?? 'No details.')}</p>${hurt}${prev ? `<p class="liprev">Answers link ${i}: ${esc(prev.name)}</p>` : ''}`;
}

function counterPrompt(cb: Combat): string {
  const ask = app.counterAsk;
  if (!ask) return '';
  const w = ask.win;
  const last = w.chain.length - 1;
  const fi = Math.min(last, Math.max(0, ask.focus ?? last));
  const fl = w.chain[fi];
  const opts = w.options.map((u) => cb.s.hand.find((c) => c.uid === u)).filter((c): c is CardInst => !!c);
  const sel = opts.find((c) => c.uid === ask.sel);
  // v0.14: Omens whose sign matches the link can be turned over here, for free.
  const belt = app.run?.omens ?? [];
  const oms = (w.omens ?? []).filter((i) => belt[i] && OMENS[belt[i]]);
  const osel = ask.sel !== undefined && ask.sel < 0 && oms.includes(-ask.sel - 1) ? OMENS[belt[-ask.sel - 1]] : null;
  const any = opts.length + oms.length;
  const blocked = (w.blocked ?? []).map((b) => ({ ...b, name: (() => { const c = cb.s.hand.find((x) => x.uid === b.uid); return c ? cardName(c) : '?'; })() }));
  // v0.13.1: when the enemy answers something, say what it answered.
  const prev = last > 0 ? w.chain[last - 1] : null;
  const lead = prev ? `${esc(w.owner)} answers ${prev.mine ? 'your' : `${esc(prev.owner)}'s`} <b>${esc(prev.name)}</b> with <b>${esc(w.against)}</b>.` : `${esc(w.owner)}'s <b>${esc(w.against)}</b> is about to resolve.`;
  return `<div class="counterask" role="dialog" aria-label="Counter window: ${esc(w.owner)}'s ${esc(w.against)} is about to resolve">
    <div class="cahead">⏸ <b>${prev ? 'The enemy answers' : 'Chain paused'}</b> <small>${lead} The game waits until you choose.</small></div>
    <div class="cachain" aria-label="The chain so far. Tap a link to read it.">${w.chain.map((l, i) => `<button class="clink ${l.mine ? 'mine' : 'theirs'} ${l.counter ? 'ctr' : ''} ${i === fi ? 'on' : ''}" data-a="caFocus" data-i="${i}"><span class="ln">${i + 1}</span>${l.counter ? '↯ ' : ''}${esc(l.name)}</button>`).join('<i>→</i>')}</div>
    <div class="cafocus ${fl.mine ? 'mine' : 'theirs'}">
      <div class="caface">${linkFace(fl, cb)}</div>
      <div class="cainfo"><div class="calabel">${fi === last ? 'About to resolve' : `Link ${fi + 1} of ${w.chain.length}`}</div>${linkInfo(fl, w.chain, fi, cb)}</div>
    </div>
    <div class="calabel">Your Counters <small>${opts.length > 1 ? 'tap one to choose' : ''} · ${w.enemyTurn ? `pay with Flux (${w.pay} left)` : `${w.pay} energy left`}</small></div>
    ${opts.length ? `<div class="caopts">${opts.map((c) => cardHtml(c, { cost: cb.cost(c), act: 'caSel', data: `data-uid="${c.uid}"`, cls: 'playable', sel: c.uid === ask.sel })).join('')}</div>` : oms.length ? '' : `<div class="canone">${blocked.length
      ? `Nothing in hand can answer this.<ul>${blocked.map((b) => `<li><b>${esc(b.name)}</b>: ${esc(b.reason)}</li>`).join('')}</ul>`
      : 'You have no Counters in hand. Read what it does, then let it resolve.'}</div>`}
    ${oms.length ? `<div class="calabel">Your Omens <small>free · answers ${TRIGGER_GLYPH[w.kind]}</small></div><div class="caomens">${oms.map((i) => { const o = OMENS[belt[i]]; return `<button class="omenpick ${ask.sel === -(i + 1) ? 'sel' : ''}" data-a="caSel" data-uid="${-(i + 1)}"><span class="numeral">${o.numeral}</span><span class="oicon">${o.icon}</span><b>${esc(o.name)}</b><small>${esc(o.text)}</small></button>`; }).join('')}</div>` : ''}
    <div class="cabtns">
      <button class="btn ${any ? 'ghost' : 'primary'}" data-a="counterPick" data-uid="0">Let it resolve</button>
      ${any ? `<button class="btn primary" data-a="counterPick" data-uid="${sel?.uid ?? (osel ? ask.sel : 0)}" ${sel || osel ? '' : 'disabled'}>${sel ? `↯ Counter with ${esc(cardName(sel))}` : osel ? `${osel.icon} Turn over ${esc(osel.name)}` : opts.length ? 'Pick a Counter or Omen' : 'Pick an Omen'}</button>` : ''}
    </div>
  </div>`;
}

/** v0.7: the player's Attunement chip, and the wheel explainer. */
function attuneChip(cb: Combat): string {
  const a = cb.s.attune;
  if (!a) return '';
  const d = ELEMENT_MAP[a];
  return `<button class="attune e-${a}" data-a="elemInfo" aria-label="Attunement: ${esc(d.name)}">${d.icon}<small>${esc(d.name)}</small></button>`;
}

function elemInfo(): void {
  const cb = combat();
  const foes = cb ? cb.alive().map((e) => ({ e, a: cb.aspect(e) })).filter((x) => x.a) : [];
  modal(`<h3>Elements</h3>
    <p class="small">🔥 Blaze → ❄️ Frost → 🌿 Wild → ⚡ Storm → 🌊 Flood → 🪨 Stone → 🔥. Each beats the next two (×${1.3}) and is resisted by the two before it and itself (×0.75). ✨ Radiant and 🌑 Umbral beat each other.</p>
    ${cb?.s.attune ? `<p><b>Your Attunement</b>: ${matchupText(cb.s.attune)}<br><small>It is the element of the last elemental card you played, and your element when enemies hit you.</small></p>` : ''}
    ${foes.map(({ e, a }) => `<p>${e.icon} <b>${esc(e.name)}</b>: ${matchupText(a!)}</p>`).join('')}
    <div class="elemgrid">${ELEMENT_LIST.map((x) => `<div class="eg e-${x.id}"><b>${x.icon} ${x.name}</b><small>${esc(x.blurb)}</small><small><i>Resonance:</i> ${esc(x.resonance)}</small></div>`).join('')}</div>
  `);
}

function toast(html: string, kind = ''): void {
  const el = document.createElement('div');
  el.className = `toast ${kind}`;
  if (kind === 'warn') audio.sfx('warn');
  el.innerHTML = html;
  toasts.appendChild(el);
  // v0.10: long toasts stay up long enough to read, and any toast can be tapped away.
  const ms = Math.min(6000, 2600 + Math.max(0, el.textContent!.length - 60) * 40);
  el.addEventListener('pointerdown', () => { el.classList.add('out'); setTimeout(() => el.remove(), 300); });
  setTimeout(() => el.classList.add('out'), ms);
  setTimeout(() => el.remove(), ms + 500);
}

// ═════════════════════════ RENDER ═════════════════════════

const HUB_VIEWS: View[] = ['title', 'collection', 'store', 'forge', 'events', 'profile'];

const COACH: Partial<Record<View, string>> = {
  collection: 'Your <b>collection</b> lives between runs. Owned cards show up more often in drafts, and in <b>Loadouts</b> you can swap starter cards for them.',
  store: 'Open <b>booster packs</b> here. After revealing a pack you may <b>Riposte</b> one card: double or nothing on its rarity.',
  forge: '<b>Sigils</b> change how a card plays: Linked counts as an extra chain link, Ricochet comes back if Negated. Imprint one on any card you own, even a Cut.',
  profile: 'Every level gives a <b>talent point</b>. Spend them in three schools; resetting is free, so experiment.',
  events: 'The <b>Season track</b> is free: every run earns Renown. The <b>Arena</b> lets you draft a deck and duel other duelists\' saved decks. The <b>Weekly Gauntlet</b> is one seeded run with a twist.',
};

let mapScrolled = '';
let backTo: View = 'title';
let lastScrollKey = '';
let lastModal = '';
const KEEP_SCROLL = ['.screen', '.screen .scroll', '.panel', '.mapwrap', '.picker .cardgrid', '.end', '.hubbody', '.logview'];
function render(): void {
  story.watch();
  let html = '';
  switch (app.view) {
    case 'title': html = hub.viewTitle(); break;
    case 'chars': html = hub.viewChars(); break;
    case 'run': html = viewRun(); break;
    case 'collection': html = hub.viewCollection(); break;
    case 'store': html = hub.viewStore(); break;
    case 'forge': html = hub.viewForge(); break;
    case 'events': html = ev.viewEvents(); break;
    case 'profile': html = hub.viewProfile(); break;
    case 'settings': html = viewSettings(); break;
    case 'howto': html = viewHowto(); break;
    case 'end': html = viewEnd(); break;
  }
  const coach = HUB_VIEWS.includes(app.view) && COACH[app.view] && !app.profile.seen[app.view] && !app.pack;
  if (coach) html = html.replace('<div class="hubbody">', `<div class="hubbody"><div class="coach"><span>💡 ${COACH[app.view]}</span><button class="btn small" data-a="coachOk">Got it</button></div>`);
  if (app.pack) html += `<div class="modal-bg packbg">${hub.viewPack()}</div>`;
  if (app.picker) html += viewPicker();
  if (app.modal) html += `<div class="modal-bg" data-a="closeModal"><div class="modal" data-a="noop" role="dialog" aria-modal="true">${app.modal}${app.confirmFn ? '' : '<button class="btn wide" data-a="closeModal">Close</button>'}</div></div>`;
  // v0.10: re-rendering replaced every scroller, so opening any popup (node info, a card, a relic) jumped lists and the map back to the top.
  const r = app.run;
  const scrollKey = `${app.view}:${r?.screen ?? ''}:${app.collTab}:${app.profTab}:${app.collPage}:${app.forgePage}:${app.picker?.title ?? ''}`;
  const kept = scrollKey === lastScrollKey ? KEEP_SCROLL.map((sel) => [...root.querySelectorAll(sel)].map((el) => el.scrollTop)) : null;
  root.innerHTML = html;
  lastScrollKey = scrollKey;
  // v0.10: keyboard and screen-reader users land inside a newly opened popup.
  const openModal = app.modal ?? '';
  if (openModal && openModal !== lastModal) root.querySelector<HTMLElement>('.modal .btn.primary, .modal .btn')?.focus({ preventScroll: true });
  lastModal = openModal;
  if (kept) KEEP_SCROLL.forEach((sel, i) => root.querySelectorAll(sel).forEach((el, j) => { if (kept[i][j]) el.scrollTop = kept[i][j]; }));
  // v0.10: whenever the map comes up at a new spot (run start, after a node, resume), centre it on where you can go next.
  if (app.view === 'run' && r?.screen === 'map') {
    const key = `${r.seed}:${r.act}:${r.pos?.row ?? -1}:${r.pos?.col ?? -1}`;
    if (key !== mapScrolled) {
      mapScrolled = key;
      const target = root.querySelector('.node.reach') ?? root.querySelector('.node.here');
      target?.scrollIntoView({ block: 'center' });
    }
  }
  audio.setMood(musicMood());
  soundTrack();
}

/** v0.13: which piece of music fits the screen. Acts have themes; fights lean in; bosses get the tense variant. */
function musicMood(): string {
  const r = app.run;
  if (app.view === 'end') return 'end';
  if (app.view !== 'run' || !r) return 'title';
  if (r.puzzle) return 'riddle';
  const act = r.arena ? 'act1' : `act${Math.min(4, Math.max(1, r.act))}`;
  switch (r.screen) {
    case 'combat': {
      const k = r.combat?.kind;
      return `${act}:${k === 'boss' || r.epilogue === 'fighting' ? 3 : k === 'elite' ? 2 : 1}`;
    }
    case 'shop': return 'shop';
    case 'rest': case 'forge': return 'rest';
    case 'event': return 'event';
    case 'victory': case 'defeat': case 'epilogue': return 'end';
    default: return act;
  }
}

/** v0.13: sounds that follow the state rather than one action: new cards in hand, the Counter hush, low-HP heartbeat. */
let handSeen: { key: string; uids: Set<number> } | null = null;
function soundTrack(): void {
  audio.hush(!!app.counterAsk);
  const s = app.view === 'run' && app.run?.screen === 'combat' ? app.run.combat : null;
  if (!s) { handSeen = null; audio.setTension(0); return; }
  audio.setTension(1 - s.player.hp / Math.max(1, s.player.maxHp) - 0.2);
  const key = `${app.run!.seed}:${s.encounter}:${s.turn}`;
  const now = new Set(s.hand.map((c) => c.uid));
  if (handSeen && handSeen.key.split(':').slice(0, 2).join(':') === key.split(':').slice(0, 2).join(':')) {
    let n = 0;
    for (const u of now) if (!handSeen.uids.has(u)) audio.sfx('draw', 0.06 * n++);
  }
  handSeen = { key, uids: now };
}

function modal(html: string): void { app.confirmFn = null; app.modal = html; render(); }

/** In-page confirmation (embedded webviews may block window.confirm). */
function ask(question: string, yes: string, fn: () => void): void {
  app.modal = `<h2>${esc(question)}</h2><div class="row2"><button class="btn primary" data-a="confirmYes">${esc(yes)}</button><button class="btn ghost" data-a="closeModal">Cancel</button></div>`;
  app.confirmFn = fn;
  render();
}

Object.assign(ui, { render, persist, modal, ask, toast });
hub.setAscText((n) => ASCENSION_TEXT.slice(1, n + 1).at(-1)! + (n > 1 ? ' (+ all below)' : ''));

// ───────── run shell ─────────

const OMEN_SIGN: Record<string, string> = { attack: 'an enemy attack', skill: 'an enemy non-attack', reaction: 'an enemy trap firing' };

function omenBelt(r: RunState): string {
  const om = r.omens ?? [];
  if (!om.length) return '';
  return `<span class="omens">${om.map((id, i) => `<button class="omen" data-a="omen" data-i="${i}" aria-label="${esc(OMENS[id].name)} (answers ${TRIGGER_GLYPH[OMENS[id].sign]}): ${esc(OMENS[id].text)}">${OMENS[id].icon}<small class="osign">${TRIGGER_GLYPH[OMENS[id].sign]}</small></button>`).join('')}</span>`;
}

/** v0.6: the run's Fate and temporary boons, as chips in the relic bar. */
function fateChip(r: RunState): string {
  const f = r.fate ? FATE_MAP[r.fate] : null;
  return f ? `<button class="dailytag fatetag" data-a="fateInfo" aria-label="Fate: ${esc(f.name)}. ${esc(f.text)}">${f.icon} ${esc(f.name)}</button>` : '';
}
function buffChips(r: RunState): string {
  return Object.entries(r.buffs ?? {}).filter(([k, n]) => n > 0 && BUFF_MAP[k]).map(([k, n]) => `<span class="dailytag bufftag ${BUFF_MAP[k].bad ? 'bad' : ''}" title="${esc(BUFF_MAP[k].name)}: ${esc(BUFF_MAP[k].text)} (${n} fight${n > 1 ? 's' : ''} left)">${BUFF_MAP[k].icon}${n}</span>`).join('');
}

function hud(r: RunState): string {
  if (r.puzzle) {
    const pz = PUZZLE_MAP[r.puzzle];
    return `<header class="hud">
      <span class="stat hp">❤ ${r.combat ? r.combat.player.hp : r.hp}</span>
      <span class="stat">🧩 ${esc(pz.name)} · ${'★'.repeat(pz.tier)}</span>
      <button class="icon-btn small" data-a="puzzleHint" aria-label="Hint">💡</button>
      <button class="icon-btn small" data-a="menu" aria-label="Menu">☰</button>
    </header><div class="relicbar"><span class="dailytag">${pz.goal === 'win' ? 'Defeat every enemy before your next turn' : 'Survive to your next turn'}</span></div>`;
  }
  if (r.arena) {
    const a = app.profile.arena;
    return `<header class="hud">
      <span class="stat hp">❤ ${r.combat ? r.combat.player.hp : r.hp}/${r.maxHp}</span>
      <span class="stat">🏟 Arena · ${a?.wins ?? 0}W ${a?.losses ?? 0}L</span>
      <button class="icon-btn small" data-a="deck" aria-label="View deck">🂠 ${r.deck.length}</button>
      <button class="icon-btn small" data-a="menu" aria-label="Menu">☰</button>
    </header><div class="relicbar">${r.relics.map((id) => relicChip(id)).join('')}</div>`;
  }
  const hpNow = r.combat ? r.combat.player.hp : r.hp;
  return `<header class="hud">
    <span class="stat hp ${hpNow <= r.maxHp * 0.3 ? 'low' : ''}" aria-label="${hpNow} of ${r.maxHp} HP${hpNow <= r.maxHp * 0.3 ? ', low' : ''}">❤ ${hpNow}/${r.maxHp}</span>
    <span class="stat gold">💰 ${r.gold}</span>
    <span class="stat">${nightOf(r) ? `🌙 Night ${nightOf(r)}` : `Act ${r.act}`} · ${r.floor ? `Floor ${r.floor}` : 'Start'}</span>
    <button class="icon-btn small" data-a="deck" aria-label="View deck">🂠 ${r.deck.length}</button>
    <button class="icon-btn small" data-a="menu" aria-label="Menu">☰</button>
  </header>
  <div class="relicbar">${r.relics.map((id) => relicChip(id)).join('')}${omenBelt(r)}${fateChip(r)}${buffChips(r)}${r.heat ? `<span class="dailytag heat" title="Wager ${r.heat}">🎲${r.heat}</span>` : ''}${r.weekly ? `<span class="dailytag">Weekly · ${esc(TWIST_MAP[r.twist!]?.name ?? '')}</span>` : ''}${r.daily ? `<span class="dailytag">Daily · ${esc(DAILY_MODS[r.dailyMod!].split(':')[0])}</span>` : ''}${r.ascension ? `<span class="dailytag" title="Stakes ${r.ascension}">Stakes ${r.ascension}</span>` : ''}${(r.debts ?? []).length ? `<span class="dailytag bufftag bad" title="Patron debts: each one sits in on this act's boss as an extra trap. Pay them off at a Merchant.">🎭${r.debts!.length}</span>` : ''}${r.rerolls ? `<span class="dailytag">🔄${r.rerolls}</span>` : ''}</div>`;
}

function viewRun(): string {
  const r = app.run!;
  let body = '';
  switch (r.screen) {
    case 'map': body = viewMap(r); break;
    case 'combat': body = viewCombat(r); break;
    case 'reward': body = viewReward(r); break;
    case 'treasure': body = viewTreasure(r); break;
    case 'shop': body = viewShop(r); break;
    case 'rest': body = viewRest(r); break;
    case 'event': body = viewEvent(r); break;
    case 'forge': body = viewForgeNode(r); break;
    case 'epilogue': body = viewEpilogue(r); break;
    case 'patron': body = viewPatron(r); break;
    case 'fate': body = viewFate(r); break;
    default: body = '';
  }
  return `<div class="screen run s-${r.screen} act${nightOf(r) ? 4 : r.act} ${nightOf(r) ? 'night' : ''}">${hud(r)}${body}</div>`;
}

// ───────── map ─────────

const NODE_ICON: Record<string, string> = { fight: '⚔️', elite: '🤺', event: '❔', shop: '🛒', rest: '🪔', treasure: '🎁', forge: '⚒️', mystery: '🔮', shrine: '⛩️', boss: '👑' };
const NODE_NAME: Record<string, string> = { fight: 'Fight', elite: 'Rival', event: 'Event', shop: 'Merchant', rest: 'Candle', treasure: 'Treasure', forge: 'Forge', mystery: 'Mystery', shrine: 'Shrine', boss: 'Boss' };
const NODE_HELP: Record<string, string> = {
  fight: 'A normal fight. Win a card reward and some gold.',
  elite: 'A Rival duelist. A tough fight that drops a keepsake. You may place a Dare before it starts.',
  event: 'Something strange. Choices with trade-offs.',
  shop: 'Buy cards and keepsakes with gold, or pay to remove a card.',
  rest: "Wick's Candle: mend a quarter of your HP, hone a card, rehearse a Reaction for the next fight, or scout the act.",
  treasure: 'A free keepsake and some gold.',
  forge: 'Stamp one of three sigils onto a card in your deck, for this run.',
  mystery: 'Could be anything: an event, a fight, treasure, a shop, a shrine, even a rare monster. You find out when you get there.',
  shrine: 'A shrine offers a blessing, a trade or a gamble: upgrades, sigils, boons for your next fights, a new Fate.',
  boss: 'The act boss.',
};

function viewMap(r: RunState): string {
  const boss = actEnc(r).boss;
  const bv = r.venues?.[r.act - 1] ? VENUE_MAP[r.venues[r.act - 1]!] : null;
  const nem = r.nemesis && !r.nemesis.met && r.nemesis.act === r.act ? r.nemesis : null;
  const actTitle = nightOf(r) ? `The Long Night · Night ${nightOf(r)}` : `Act ${r.act}: ${ACT_NAMES[r.act]?.[r.acts?.[r.act - 1] ?? 0] ?? ''}`;
  return `<div class="mapwrap" id="mapwrap">
    <div class="maphead"><b>${esc(actTitle)}</b>${!nightOf(r) && r.acts?.[r.act - 1] ? (r.acts[r.act - 1] === 2 ? ' <span class="altpill">wild</span>' : ' <span class="altpill">alternate</span>') : ''}<br><small>Boss: ${esc(boss.name)}${bv ? ` · ${bv.icon} ${esc(bv.name)}` : ''}</small> <button class="link" data-a="bossInfo">info</button>
      ${nem ? `<button class="nemesispill" data-a="nemesisInfo">☠ Your Nemesis waits in this act: <b>${esc(nem.name)}</b> (${nem.kind === 'elite' ? 'at a rival' : 'in a fight'}) · grudge ${nem.grudge}</button>` : ''}
      <div class="mappills">${r.map.flat().some((n) => isDown(n)) || r.peeks ? `<span class="skypill peekpill" title="Tap a face-down card to Peek at it">👁 Peeks ${r.peeks ?? 0}</span>` : ''}${!nightOf(r) && r.bosses?.[r.act - 1] ? '<span class="altpill wander">wandering boss</span>' : ''}${wildsPills(r)}${!r.daily && !nightOf(r) ? `<button class="mirrorgoal ${(r.champs ?? 0) >= EPILOGUE_CHAMPS ? 'ready' : ''}" data-a="mirrorInfo">🪞 Champions ${Math.min(r.champs ?? 0, EPILOGUE_CHAMPS)}/${EPILOGUE_CHAMPS}${(r.champs ?? 0) >= EPILOGUE_CHAMPS ? ' · the Reflection awaits' : ''}</button>` : ''}</div>
      ${nightOf(r) ? `<div class="nightpill">🌙 Enemies +${Math.round((nightHpMult(nightOf(r)) - 1) * 100)}% HP and +${nightStr(nightOf(r))} Edge. Nights cleared: ${nightsCleared(r)}</div>
      ${(r.terrors ?? []).length ? `<div class="nightpill terrors">${(r.terrors ?? []).map((t) => TERROR_MAP[t] ? `<span title="${esc(TERROR_MAP[t].text)}">${TERROR_MAP[t].icon} ${esc(TERROR_MAP[t].name)}</span>` : '').join(' · ')}</div>` : ''}` : ''}
</div>
    ${viewSpread(r, { icon: NODE_ICON, name: NODE_NAME }, !!nightOf(r))}
  </div>`;
}

/** v0.6: this act's Sky and Layout, tappable for details. */
function wildsPills(r: RunState): string {
  const sky = skyOf(r);
  const lay = LAYOUT_MAP[r.layouts?.[r.act - 1] ?? ''];
  if (!sky && !lay) return '';
  return `${sky ? `<button class="skypill s-${sky.id}" data-a="skyInfo">${sky.icon} ${esc(sky.name)}</button>` : ''}${lay ? `<button class="skypill lay" data-a="skyInfo">${lay.icon} ${esc(lay.name)}</button>` : ''}${foggy(r) && sky?.id !== 'fog' ? '<span class="skypill fogpill">☁️ Fog</span>' : ''}`;
}

// ───────── combat ─────────

const TIPS: { when: (r: RunState) => boolean; text: string }[] = [
  { when: () => true, text: '<b>Drag</b> a card up to play it, or onto an enemy to target it. Tapping works too: tap to inspect, tap again to play.' },
  { when: () => true, text: 'Every enemy plays from a small deck. The card on top is its <b>tell</b>: what it will do on its turn. ⚔ 5 means a 5-damage attack. Tap an enemy for details.' },
  { when: (r) => r.combat!.hand.some((c) => CARDS[c.id].type === 'reaction') || r.combat!.player.traps.length > 0,
    text: '<b>Reactions</b> (like Parry) are <b>set face-down</b>. On the enemy turn they fire by themselves when their trigger happens, <i>before</i> the enemy move lands.' },
  { when: (r) => r.combat!.enemies.some((e) => e.traps.length), text: 'Enemies set <b>traps</b> too. The icon shows what sets them off: ⚔ your attacks, ✋ your other cards. Bait them with a cheap card first.' },
  { when: () => true, text: 'When cards answer each other they form an <b>Answer Chain</b>. It resolves last-in, first-out. Up to 1 unspent energy carries over as <b>Flux</b>.' },
];

function currentTip(r: RunState): string | null {
  if (!r.combat?.tutorial || app.profile.tutorialDone) return null;
  while (app.tipIdx < TIPS.length && !TIPS[app.tipIdx].when(r)) {
    if (app.tipIdx >= 2) return null;
    app.tipIdx++;
  }
  return app.tipIdx < TIPS.length ? TIPS[app.tipIdx].text : null;
}

/** Show the Fate Coin when the deck has a card that reads it. */
function showCoin(r: RunState): boolean {
  return r.character === 'sharp' || r.deck.some((c) => /☀|☾|Flip/.test(CARDS[c.id].text));
}

/** Enemy traps are visible with Trap Lens, Lantern of Truth, Magpie's Eye, The High Priestess, and in Riddles. */
function trapsRevealed(r: RunState): boolean {
  return r.relics.includes('trap_lens') || r.relics.includes('lantern_truth') || !!r.combat?.once.reveal;
}

/** What the selected card would do if played now. Face-down traps you can't see are left out, so it never leaks hidden info. */
function previewPlay(cb: Combat, uid: number, tgt?: number): { e: (HpPreview | null)[]; p: HpPreview } | null {
  const r = app.run!;
  const s2 = JSON.parse(JSON.stringify(cb.s)) as typeof cb.s;
  const r2 = JSON.parse(JSON.stringify({ ...r, combat: null })) as RunState;
  if (!trapsRevealed(r)) for (const e of s2.enemies) e.traps = [];
  const c2 = new Combat(s2, r2);
  c2.counterMode = 'off';
  if (!c2.play(uid, tgt)) return null;
  return {
    e: cb.s.enemies.map((e0, i) => (e0.dead ? null : { hp: s2.enemies[i].dead ? 0 : s2.enemies[i].hp, block: s2.enemies[i].block })),
    p: { hp: s2.player.dead ? 0 : s2.player.hp, block: s2.player.block },
  };
}

function viewCombat(r: RunState): string {
  const cb = combat()!;
  const s = cb.s;
  const sel = app.sel !== null ? s.hand.find((c) => c.uid === app.sel) ?? null : null;
  const selDef = sel ? CARDS[sel.id] : null;
  const targeting = !!selDef?.target && cb.alive().length > 1 && cb.canPlay(sel!);
  const lens = trapsRevealed(r);
  // Damage preview (v0.4).
  const pvE: (HpPreview | null)[] = [];
  let pvP: HpPreview | null = null;
  if (sel && selDef && selDef.type !== 'reaction' && !selDef.unplayable && cb.canPlay(sel) && s.phase === 'player' && !app.busy && app.profile.settings.preview !== false) {
    if (targeting) {
      for (const e of cb.alive()) {
        const i = s.enemies.indexOf(e);
        const res = previewPlay(cb, sel.uid, i);
        if (res) { pvE[i] = res.e[i]; pvP ??= res.p; }
      }
    } else {
      const t0 = selDef.target ? s.enemies.indexOf(cb.alive()[0]) : undefined;
      const res = previewPlay(cb, sel.uid, t0);
      if (res) { res.e.forEach((x, i) => { pvE[i] = x; }); pvP = res.p; }
    }
  }
  const affix = s.affix ? AFFIX_MAP[s.affix] : null;
  const enemies = s.enemies.map((e, i) => {
    if (e.dead) return `<div class="enemy dead" data-who="${i}"></div>`;
    const traps = e.traps.map((t) => {
      const d = CARDS[t.id];
      return `<span class="trap" title="${esc(TRIGGER_TEXT[d.trigger!])}">${lens ? `<small>${esc(d.name)}</small>` : '<span class="tback">⚔⟲</span>'}<b>${TRIGGER_GLYPH[d.trigger!]}</b></span>`;
    }).join('');
    return `<button class="enemy ${targeting ? 'targetable' : ''} ${s.kind !== 'normal' ? `k-${s.kind}` : ''}" data-a="${targeting ? 'target' : 'enemyInfo'}" data-i="${i}" data-who="${i}" style="--i:${i}">
      ${tellHtml(cb, e)}
      <div class="emed"><span class="eicon">${e.icon}</span><span class="eshadow"></span></div>
      ${affix ? `<div class="affix" title="${esc(affix.text)}">${affix.icon} ${esc(affix.name)}</div>` : ''}
      <div class="ename">${elemBadge(cb.aspect(e), 'aspect')}${e.coin !== undefined ? `<span class="ecoin ${e.coin ? 'moon' : 'sun'}">${e.coin ? '☾' : '☀'}</span> ` : ''}${esc(e.name)}</div>
      ${hpBar(e, pvE[i])}
      <div class="chips">${statusChips(e)}</div>
      <div class="traps">${traps}</div>
    </button>`;
  }).join('');
  const p = s.player;
  const slots = Array.from({ length: p.slots }, (_, i) => {
    const t = p.traps[i];
    if (!t) return `<span class="slot empty ${selDef?.type === 'reaction' ? 'ready' : ''}">${selDef?.type === 'reaction' ? `Set ${esc(selDef.name)} here` : 'Reaction slot'}</span>`;
    const d = CARDS[t.id];
    return `<button class="slot f-${d.faction} ${d.faction === 'enemy' ? 'stolen' : ''}" data-a="slotInfo" data-uid="${t.uid}">${TRIGGER_GLYPH[d.trigger!]} ${d.faction === 'enemy' ? '🫳 ' : ''}${esc(cardName(t))}${d.primes ? `<span class="primebadge" title="Prime ${t.prime ?? 0}">🌞${t.prime ?? 0}</span>` : ''}</button>`;
  }).join('');
  const n = s.hand.length;
  const mid = (n - 1) / 2;
  const hand = s.hand.map((c, i) => {
    const off = i - mid;
    const style = `--rot:${(off * (n > 6 ? 2 : 3)).toFixed(1)}deg;--lift:${(Math.abs(off) ** 1.6 * 2.5).toFixed(1)}px;--z:${i}`;
    return cardHtml(c, { cost: cb.cost(c), dim: !cb.canPlay(c), sel: c.uid === app.sel, act: 'card', data: `style="${style}"`, cls: cb.canPlay(c) ? 'playable' : '' });
  }).join('');
  let detail = '';
  if (sel && selDef) {
    const kws = keywordList(cardText(sel));
    const can = cb.canPlay(sel);
    const kind = selDef.type === 'attack' ? 'attack' : 'skill';
    const answering = selDef.type === 'reaction' ? 0 : cb.alive().reduce((a, e) => a + e.traps.filter((t) => CARDS[t.id].trigger === kind).length, 0);
    const warn = answering ? `<p class="trapwarn">⚠ ${answering} ${lens ? '' : 'face-down '}trap${answering > 1 ? 's' : ''} can answer this (${TRIGGER_GLYPH[kind]})${lens ? '. The preview includes them.' : '. The preview leaves them out.'}</p>` : '';
    const label = selDef.type === 'reaction' ? (p.traps.length >= p.slots ? 'Set (replaces oldest)' : 'Set face-down') : 'Play';
    detail = `<div class="detail">
      <div class="dcard">${cardHtml(sel, { cost: cb.cost(sel), cls: 'big' })}</div>
      <div class="dside">
        ${kws.map(([k, d]) => `<p class="kw"><b>${k}</b> ${esc(d)}</p>`).join('')}
        ${sel.mod ? `<p class="kw"><b>${MODS[sel.mod].icon} ${MODS[sel.mod].name}</b> ${esc(MODS[sel.mod].text)}</p>` : ''}
        ${warn}
        ${selDef.unplayable ? '<p class="warn">This card cannot be played.</p>'
          : !can ? `<p class="warn">${cb.cost(sel) > s.energy ? `Costs ${cb.cost(sel)} energy; you have ${s.energy}.` : 'You can\'t play this right now.'}</p>`
          : targeting ? '<p class="hint">Tap an enemy to target it.</p>'
          : `<button class="btn primary" data-a="play" data-uid="${sel.uid}">${label}</button>`}
        <button class="btn ghost small" data-a="desel">Cancel</button>
      </div>
    </div>`;
  }
  const tip = currentTip(r);
  const links = app.chainShow?.links;
  const pin = links && app.chainPin !== null ? links[app.chainPin] : null;
  const chain = links ? `<div class="chainview ${pin ? 'pinned' : ''}" data-a="dismissChain">
      <div class="chaintitle">Answer Chain · resolved top to bottom</div>
      ${[...links].map((l, i) => ({ l, i })).reverse().map(({ l, i }, k) => `<button class="clink ${l.mine ? 'mine' : 'theirs'} ${l.negated ? 'negated' : ''} ${l.counter ? 'ctr' : ''} ${i === app.chainPin ? 'on' : ''}" style="--k:${k}" data-a="chainLink" data-i="${i}"><span class="ln">${i + 1}</span><span class="clbody">${l.counter ? '↯ ' : ''}${esc(l.name)}<small>${esc(l.mine ? 'You' : l.owner)}</small>${l.text ? `<span class="cltext">${esc(l.text)}</span>` : ''}</span>${l.negated ? '<em>NEGATED</em>' : ''}</button>`).join('')}
      ${pin ? `<div class="cafocus ${pin.mine ? 'mine' : 'theirs'}"><div class="caface">${linkFace(pin, cb)}</div><div class="cainfo">${linkInfo(pin, links, app.chainPin!, cb)}${pin.negated ? '<p class="liprev">It was <b>Negated</b> and did nothing.</p>' : ''}</div></div>` : ''}
      ${app.chainMs ? `<div class="chainhint">${pin ? 'Paused · tap here to carry on' : 'Tap a link to read it and pause'}</div>` : `<div class="chainhint">Tap a link to read it</div><button class="btn primary chaingo" data-a="dismissChain">Continue</button>`}
      ${pin || !app.chainMs || app.profile.settings.reduceMotion ? '' : `<i class="chaintimer" style="--d:${app.chainMs}ms"></i>`}
    </div>${app.chainMs ? '' : '<div class="chainback" data-a="dismissChain" aria-hidden="true"></div>'}` : '';
  const ended = s.phase === 'won' || s.phase === 'lost';
  const anyPlayable = s.hand.some((c) => cb.canPlay(c));
  const dareOffer = r.dareOffer && s.turn === 1 && s.cardsThisTurn === 0 && s.phase === 'player' ? `<div class="dare">
      <div class="darehead">🎲 <b>Place a Dare?</b> <small>Stake ${Math.min(r.gold, 25)} gold. Win the Dare: get it back +${DARE_PAYOUT}.</small></div>
      <div class="dareopts">${r.dareOffer.map((id) => `<button class="btn small" data-a="dare" data-id="${id}">${DARE_MAP[id].icon} ${esc(DARE_MAP[id].name)}<small>${esc(DARE_MAP[id].text(s.kind))}</small></button>`).join('')}
      <button class="btn ghost small" data-a="dare" data-id="">No dare</button></div>
    </div>` : '';
  const dareLine = r.dare ? `<span class="darechip">🎲 ${esc(DARE_MAP[r.dare.id].name)}: ${esc(DARE_MAP[r.dare.id].text(s.kind))}${DARE_MAP[r.dare.id].check(s) ? ' ✓' : ''}</span>` : '';
  const ven = s.venue ? VENUE_MAP[s.venue] : null;
  return `<div class="combat k-${s.kind} ${ven ? `v-${ven.id}` : ''} ${s.nemesis ? 'nemesis' : ''}">
    <div class="stage"><div class="fog"></div></div>
    ${s.kind !== 'normal' || s.nemesis ? `<div class="encname">${s.nemesis ? '☠' : s.kind === 'boss' ? '👑' : affix ? '🔥 Champion ·' : '👹'} ${esc(s.encounter)}</div>` : ''}
    ${ven ? `<button class="venuechip" data-a="venueInfo" aria-label="Venue: ${esc(ven.name)}. ${esc(ven.text)}">${ven.icon} ${esc(ven.name)}</button>` : ''}
    <div class="enemies n${s.enemies.length}">${enemies}</div>
    ${chain}
    ${surpriseCard(s)}
    ${dareOffer}
    ${tip ? `<div class="tip"><span><small class="tipstep">Tip ${app.tipIdx + 1}/${TIPS.length}</small> ${tip}</span><button class="btn small" data-a="tipNext">${app.tipIdx + 1 >= TIPS.length ? 'Done' : 'Next'}</button></div>` : ''}
    <button class="stylemeter" data-a="styleInfo" aria-label="Style ${s.stats.style ?? 0}">✦ <b>${s.stats.style ?? 0}</b><small>style</small></button>
    <button class="logbtn" data-a="combatLog" aria-label="Combat log">📜</button>
    <div class="playerzone" data-who="p">
      <div class="pline"><span class="pava">${CHARACTERS[r.character].icon}${r.familiar && COSMETIC_MAP[r.familiar] ? `<span class="familiar" data-who="fam">${COSMETIC_MAP[r.familiar].icon}</span>` : ''}</span>${showCoin(r) ? `<button class="fatecoin ${p.coin ? 'moon' : 'sun'} ${p.st.house ? 'both' : ''}" data-a="coinInfo" aria-label="Fate Coin: ${p.coin ? 'Moon' : 'Sun'}"><span>${p.st.house ? '☀☾' : p.coin ? '☾' : '☀'}</span></button>` : ''}${attuneChip(cb)}${hpBar(p, pvP)}</div>
      <div class="chips">${incomingChip(cb)}${statusChips(p)}${dareLine}</div>
      <div class="slots">${slots}</div>
    </div>
    ${detail}
    ${counterPrompt(cb)}
    <div class="controls">
      <div class="energy ${s.energy ? '' : 'empty'}" aria-label="${s.energy} energy">${s.energy}<small>energy</small>${s.flux ? `<span class="flux">+${s.flux} next</span>` : ''}</div>
      <button class="pile" data-a="pile" data-p="draw" aria-label="Draw pile, ${s.draw.length} cards">🂠 ${s.draw.length}<small>${s.draw.length ? 'draw' : 'reshuffle'}</small></button>
      <button class="pile" data-a="pile" data-p="discard">♻ ${s.discard.length}<small>discard</small></button>
      ${p.st.grave || s.crypt?.length ? `<button class="pile crypt" data-a="pile" data-p="crypt">⚱ ${s.crypt?.length ?? 0}<small>crypt</small></button>` : ''}
      <button class="btn end ${s.phase === 'player' && !app.busy && !anyPlayable ? 'glow' : ''}" data-a="endTurn" ${s.phase !== 'player' || app.busy || ended ? 'disabled' : ''}>${s.phase === 'enemy' ? 'Enemy turn…' : `End turn${s.phase === 'player' && anyPlayable && s.energy > 0 ? `<small>${s.energy} energy unused</small>` : ''}`}</button>
    </div>
    <div class="hand" role="list" style="--n:${Math.max(1, n)}">${hand || '<div class="muted emptyhand">No cards in hand</div>'}</div>
  </div>`;
}

/**
 * v0.14: every enemy plays from a small deck. Its tell is the top card, face-up: the move it will make, with the
 * same preview the intent icons used to give. Beside it, the deck (how many move cards it holds) and the card it
 * played last. Echoes show the cards they are about to play from their real deck.
 */
function tellHtml(cb: Combat, e: EnemyState): string {
  const d = ENEMIES[e.def];
  const ghost = d.ghost && e.ghost;
  const m = d.moves?.[e.move];
  const name = ghost ? (e.ghost!.plan.length ? e.ghost!.plan.map((c) => CARDS[c.id].name).join(' · ') : 'No play') : m?.name ?? '…';
  const deckN = ghost ? e.ghost!.draw.length : Object.keys(d.moves ?? {}).length;
  const lastId = e.lastMoves.length > 1 ? e.lastMoves[e.lastMoves.length - 2] : null;
  const last = !ghost && lastId ? d.moves[lastId]?.name : null;
  return `<div class="tell" aria-label="Tell: ${esc(name)}">
    <span class="edeck" title="${deckN} move cards in its deck" aria-hidden="true"><i></i><i></i><b>${deckN}</b></span>
    <span class="tellcard"><small class="tellname">${esc(name)}</small><span class="intents">${intentHtml(cb.intents(e))}</span></span>
    ${last ? `<span class="ediscard" title="Played last: ${esc(last)}" aria-hidden="true">↺<small>${esc(last)}</small></span>` : '<span class="ediscard empty" aria-hidden="true"></span>'}
  </div>`;
}

/** v0.10: the total of the enemies' attack intents next to your HP, red when it would get through your Block. */
function incomingChip(cb: Combat): string {
  if (cb.s.phase !== 'player') return '';
  const total = cb.alive().reduce((a, e) => a + cb.intents(e).filter((i) => i.icon === 'atk').reduce((b, i) => b + (i.n ?? 0) * (i.times ?? 1), 0), 0);
  if (!total) return '';
  const p = cb.s.player;
  const through = Math.max(0, total - p.block);
  return `<span class="incoming ${through >= p.hp ? 'lethal' : through ? 'hurts' : 'blocked'}" aria-label="${total} incoming attack damage, ${through} gets through your Guard">⚔ ${total} incoming${p.block ? ` · ${through ? `${through} through` : 'all blocked'}` : ''}</span>`;
}

/** v0.6: a Surprise that just happened, shown as a card over the table until dismissed. */
function surpriseCard(s: RunState['combat'] & object): string {
  const sp = s.surprise;
  if (!sp?.fired || sp.seen) return '';
  const d = SURPRISE_MAP[sp.id];
  if (!d) return '';
  return `<div class="surprise pop ${d.good > 0 ? 'good' : d.good < 0 ? 'bad' : ''}" data-a="surpriseOk"><div class="kicker">Surprise!</div><div class="big-emoji">${d.icon}</div><b>${esc(d.name)}</b><p>${esc(d.text)}</p><small>tap to continue</small></div>`;
}

// ───────── reward / treasure ─────────

const HIDDEN = '__facedown';
const DEALER_LINES = ['A fine card. Shame about the company it keeps.', 'Every card has an answer. Even yours.', 'You took the good one. I noticed.', 'The house always gets a word in.', 'Careful. Rare things attract attention.'];

function viewReward(r: RunState): string {
  const w = r.reward!;
  const blindSel = app.rewardCardSel === HIDDEN && !!w.hidden;
  const cards = w.cards ? `<div class="sect"><h3>The Deal: choose a card <button class="link" data-a="deck">your deck: ${r.deck.length}</button></h3>
      <div class="cardrow deal">${w.cards.map((id) => {
        const sy = synergy(id, r.deck);
        return cardHtml({ id, up: false, mod: r.imprints?.[id] }, { act: 'rewardSel', sel: app.rewardCardSel === id, syn: sy.n >= 2 ? sy.n : 0 });
      }).join('')}${w.hidden ? `<button class="card facedown ${blindSel ? 'sel' : ''}" data-a="rewardSel" data-id="${HIDDEN}" aria-label="A face-down card, one rarity higher. You take it blind."><span class="fdback">🂠</span><b>Face down</b><small>one rarity higher · taken blind</small></button>` : ''}</div>
      ${blindSel ? '<div class="kwbox"><p class="kw"><b>Face down</b> The Dealer kept this one back. It is one rarity higher than the usual draw, but you only see it once it is yours, and the Dealer is more likely to answer a blind pick.</p></div>' : ''}
      ${app.rewardCardSel && !blindSel ? `<div class="kwbox">${(() => { const sy = synergy(app.rewardCardSel, r.deck); return sy.n >= 2 ? `<p class="kw syntext">🔗 <b>Synergy</b> Shares ${esc(sy.tag ?? '')} with ${sy.n} card(s) in your deck.</p>` : ''; })()}${keywordList(CARDS[app.rewardCardSel].text).map(([k, d]) => `<p class="kw"><b>${k}</b> ${esc(d)}</p>`).join('')}</div>` : ''}
      <button class="btn primary wide" data-a="takeCard" ${app.rewardCardSel ? '' : 'disabled'}>${blindSel ? 'Take it blind' : app.rewardCardSel ? `Take ${esc(CARDS[app.rewardCardSel].name)}` : 'Tap a card to choose it'}</button>
      ${r.rerolls ? `<button class="btn small ghost wide" data-a="reroll">🔄 Reroll choices (${r.rerolls} left)</button>` : ''}
    </div>` : '';
  // v0.14: the Dealer answers your pick. A small chain on the reward screen: Negate it, or let it resolve.
  const answer = w.answer ? `<div class="sect dealeranswer"><h3>⟲ The Dealer answers</h3>
      <div class="cachain"><span class="clink mine"><span class="ln">1</span>You take ${esc(CARDS[w.answer.card].name)}</span><i>→</i><span class="clink theirs"><span class="ln">2</span>The Dealer: slip in a ${esc(CARDS[w.answer.jinx].name)}</span></div>
      <div class="cardrow">${cardHtml({ id: w.answer.card, up: false }, { act: 'noop' })}${cardHtml({ id: w.answer.jinx, up: false }, { act: 'noop' })}</div>
      <p class="small muted">"${esc(DEALER_LINES[(r.floor + r.deck.length) % DEALER_LINES.length])}" Pay to Negate his answer, or let it resolve and the Jinx joins your deck.${w.answer.cost < 30 ? ' Your Counters taught you his tells: Negating costs less.' : ''}</p>
      <div class="row2"><button class="btn primary" data-a="dealerAnswer" data-n="1" ${r.gold >= w.answer.cost ? '' : 'disabled'}>↯ Negate (💰 ${w.answer.cost})</button><button class="btn ghost" data-a="dealerAnswer" data-n="0">Let it resolve</button></div>
    </div>` : w.answerNote ? `<p class="darenote ${w.answerNote.startsWith('You Negate') ? 'ok' : 'warn'}">⟲ ${esc(w.answerNote)}</p>` : '';
  const relicChoices = w.relicChoices ? `<div class="sect"><h3>Boss keepsake: choose one</h3>${w.relicChoices.map((id) => relicRow(id, 'bossRelic')).join('')}</div>` : '';
  return `<div class="panel reward">
    <h2 class="vic">${r.event ? 'Your choice' : r.patron && r.patron.done && !w.gold ? 'A Patron\'s gift' : w.nemesis ? '☠ Nemesis slain' : w.champ ? '🔥 Champion slain' : 'Victory'}</h2>
    ${w.nemesis ? '<p class="darenote ok">☠ Your Nemesis has fallen. The grudge is settled: +60 gold and a rare card.</p>' : ''}
    ${w.venue && VENUE_MAP[w.venue] ? `<p class="muted small">${VENUE_MAP[w.venue].icon} Won at ${esc(VENUE_MAP[w.venue].name)}${r.relics.includes('season_ticket') ? ' (Season Ticket: +25 gold)' : ''}</p>` : ''}
    ${w.note ? `<p class="darenote ${w.note.startsWith('Dare won') || w.note.startsWith('Caught') ? 'ok' : 'warn'}">${w.note.startsWith('Dare') ? '🎲' : '✨'} ${esc(w.note)}</p>` : ''}
    ${w.gold && !w.goldTaken ? `<button class="btn goldbtn" data-a="takeGold">💰 Take ${w.gold} gold</button>` : ''}
    ${w.omen ? `<p class="omenfound">${OMENS[w.omen].icon} <b>Omen: ${esc(OMENS[w.omen].name)}</b> <small>${w.omenKept ? 'added to your belt' : 'no room (belt full)'}</small></p>` : ''}
    ${w.relic ? `<div class="sect"><h3>Keepsake</h3>${relicRow(w.relic, 'takeRelic', '<span class="pill">Take</span>')}</div>` : ''}
    ${relicChoices}
    ${answer}
    ${cards}
    <button class="btn wide ${w.cards || w.relicChoices || w.answer ? 'ghost' : 'primary'}" data-a="proceed">${w.cards ? 'Skip the card and continue' : w.relicChoices ? 'Skip the keepsake and continue' : 'Continue'}</button>
  </div>`;
}

function viewTreasure(r: RunState): string {
  const w = r.reward!;
  return `<div class="panel treasure">
    <div class="big-emoji chest">🎁</div><h2>Treasure</h2>
    ${w.relic ? relicRow(w.relic) : ''}
    <p>+${w.gold} gold</p>
    <button class="btn primary wide" data-a="proceed">Take & continue</button>
  </div>`;
}

// ───────── shop ─────────

function viewShop(r: RunState): string {
  const s = r.shop!;
  return `<div class="panel shop">
    <h2>🛒 The Card Merchant</h2>
    <div class="cardgrid">${s.cards.map((c, i) => { const sy = synergy(c.id, r.deck); return cardHtml({ id: c.id, up: false, mod: r.imprints?.[c.id] }, { act: c.sold ? 'noop' : 'buyCard', data: `data-i="${i}"`, price: c.price, sold: c.sold, dim: !c.sold && r.gold < c.price, syn: sy.n >= 2 ? sy.n : 0 }); }).join('')}</div>
    <h3>Keepsakes</h3>
    ${s.relics.map((x, i) => relicRow(x.id, x.sold ? undefined : 'buyRelic', `<span class="pill ${r.gold < x.price && !x.sold ? 'poor' : ''}">${x.sold ? 'SOLD' : `💰 ${x.price}`}</span>`).replace('data-id', `data-i="${i}" data-id`)).join('')}
    ${s.omens?.length ? `<h3>Omens <small class="muted">${(r.omens ?? []).length}/${omenCap(r)} held</small></h3>${s.omens.map((o, i) => `<button class="relicrow" data-a="${o.sold ? 'noop' : 'buyOmen'}" data-i="${i}"><span class="ricon">${OMENS[o.id].icon}</span><span><b>${esc(OMENS[o.id].name)}</b> <small>${OMENS[o.id].numeral}</small><br><small>${esc(OMENS[o.id].text)}</small></span><span class="pill ${r.gold < o.price && !o.sold ? 'poor' : ''}">${o.sold ? 'SOLD' : `💰 ${o.price}`}</span></button>`).join('')}` : ''}
    <h3>Services</h3>
    <button class="btn" data-a="shopRemove" ${s.removed || r.gold < Math.round(s.removePrice / 2) ? 'disabled' : ''}>✂ Remove a card · 💰 ${s.removePrice}${s.removed ? ' (used)' : ''}<small>Jinxes go for half (💰 ${Math.round(s.removePrice / 2)}). Each removal costs ${30} more.</small></button>
    ${(r.debts ?? []).map((d, i) => { const pt = PATRON_MAP[d.patron]; return `<button class="btn" data-a="payDebt" data-i="${i}" ${r.gold < DEBT_PRICE ? 'disabled' : ''}>${pt?.icon ?? '🎭'} Pay off ${esc(pt?.name ?? 'a Patron')}'s debt · 💰 ${DEBT_PRICE}<small>Otherwise ${esc(pt?.name ?? 'the Patron')} sits in on the Act ${d.act} boss: it starts with an extra ${esc(CARDS[d.trap]?.name ?? 'trap')} set.</small></button>`; }).join('')}
    <button class="btn primary wide" data-a="proceed">Leave shop</button>
  </div>`;
}

// ───────── rest / forge node ─────────

function viewRest(r: RunState): string {
  // v0.10: show the real heal (Skies, Fates and Vows change it) and steer away from resting at full HP.
  // v0.14: Wick's Candle. Besides mending and honing, two options that prepare the next fight: Rehearse and Scout.
  const heal = restHealAmount(r);
  const canSmith = r.deck.some((c) => !c.up && CARDS[c.id].type !== 'curse') && r.fate !== 'ascetic';
  const reactions = r.deck.filter((c) => CARDS[c.id].type === 'reaction');
  const downs = r.map.flat().filter((n) => isDown(n)).length;
  return `<div class="panel rest">
    <div class="big-emoji campfire">🪔</div><h2>Wick's Candle</h2>
    <p class="flavor small">Wick flickers up off your shoulder and settles on the table. "Sit a while. What do you need?"</p>
    ${r.restDone ? `<p>${r.rehearse ? `You rehearse ${esc(CARDS[r.rehearse.split('+')[0]].name)} until it is second nature. It will be set when your next fight begins.` : r.scout ? 'Wick drifts ahead and comes back with the lay of the table.' : 'You feel ready.'}</p>` : `
      <button class="btn big ${heal ? '' : 'disabled'}" data-a="restHeal">🕯 Mend<small>${heal ? `Heal ${heal} HP (to ${r.hp + heal}/${r.maxHp})` : 'You are already at full HP'}</small></button>
      <button class="btn big ${!heal && canSmith ? 'primary' : ''}" data-a="restUpgrade" ${canSmith ? '' : 'disabled'}>⚒ Hone<small>${canSmith ? 'Upgrade a card (path A or B)' : r.fate === 'ascetic' ? 'The Ascetic never hones' : 'Every card is already upgraded'}</small></button>
      <button class="btn big" data-a="restRehearse" ${reactions.length ? '' : 'disabled'}>🎭 Rehearse<small>${reactions.length ? 'Pick a Reaction: a copy starts your next fight already set' : 'You have no Reactions to rehearse'}</small></button>
      <button class="btn big" data-a="restScout">🔭 Scout<small>Flip ${downs ? `the ${downs} face-down card${downs > 1 ? 's' : ''} left` : 'every face-down card'} in this act, and see your next Rival's traps</small></button>`}
    <button class="btn ${r.restDone ? 'primary' : 'ghost'} wide" data-a="proceed">${r.restDone ? 'Continue' : 'Leave'}</button>
  </div>`;
}

function viewForgeNode(r: RunState): string {
  const f = r.forge!;
  return `<div class="panel forgenode">
    <div class="big-emoji anvil">⚒️</div><h2>Wayside Forge</h2>
    <p class="flavor">A smith with soot to the elbows offers to stamp a sigil into one of your cards. It lasts for this run.</p>
    ${f.done ? '<p class="ok">The sigil glows, then settles into the card.</p>' : f.mods.map((m) => `<button class="btn choice" data-a="nodeSigil" data-m="${m}"><b>${MODS[m].icon} ${esc(MODS[m].name)}</b><small>${esc(MODS[m].text)}</small></button>`).join('')}
    <button class="btn ${f.done ? 'primary' : 'ghost'} wide" data-a="proceed">${f.done ? 'Continue' : 'Leave'}</button>
  </div>`;
}

// ───────── event ─────────

function viewEvent(r: RunState): string {
  const ev = EVENT_MAP[r.event!.id];
  const road = !!r.wayside;
  const kicker = road ? '<div class="kicker">On the road…</div>' : ev.kind === 'shrine' ? '<div class="kicker">Shrine</div>' : r.mystery ? '<div class="kicker">🔮 The Mystery was an Event</div>' : '';
  const cls = `panel event ${road ? 'wayside pop' : ''} ${ev.kind === 'shrine' ? 'shrine' : ''}`;
  if (r.event!.resolved) {
    const pending = r.reward?.cards;
    return `<div class="${cls}">${kicker}<div class="big-emoji">${ev.icon}</div><h2>${esc(ev.name)}</h2>
      <p>${esc(r.event!.resolved)}</p>
      ${pending ? viewReward(r) : `<button class="btn primary wide" data-a="proceed">${road ? 'Onward' : 'Continue'}</button>`}
    </div>`;
  }
  return `<div class="${cls}">${kicker}<div class="big-emoji">${ev.icon}</div><h2>${esc(ev.name)}</h2>
    ${r.event!.note ? `<p class="evnote">${esc(r.event!.note)}</p>` : ''}
    <p class="flavor">${esc(eventText(r, ev))}</p>
    ${ev.options.map((o, i) => {
      const ok = !o.can || o.can(r);
      return `<button class="btn choice" data-a="eventOpt" data-i="${i}" ${ok ? '' : 'disabled'}><b>${esc(o.label)}</b><small>${esc(o.desc)}</small>${ok ? '' : '<small class="why">Not available right now (you can\'t pay its cost).</small>'}</button>`;
    }).join('')}
  </div>`;
}

// ───────── act 4: the Reflection ─────────

function viewEpilogue(r: RunState): string {
  const d = ENEMIES[EPILOGUE.enemies[0]];
  const mirror = r.epilogue === 'offered';
  const night = nightReady(r) && !nightOf(r);
  return `<div class="panel epilogue">
    <div class="big-emoji mirror">${mirror ? '🪞' : '🌙'}</div>
    <h2>${mirror ? 'The Last Mirror' : 'The Crossroads'}</h2>
    <p class="flavor">${mirror ? 'The Act 3 boss falls, and the run is already yours. Behind it stands a mirror that does not show your face. It shows your deck.'
      : r.epilogue === 'won' ? 'The mirror shatters. Beyond it a stair winds down into a night that does not end.' : 'The Act 3 boss falls and the run is yours. Beneath the last table, a stair winds down into a night that does not end.'}</p>
    ${mirror ? `<p><b>${esc(d.name)}</b>: ${esc(d.blurb ?? '')}</p>
    <p class="muted">You recover half your missing HP first. Win or lose, the run still counts as a victory; beating the Reflection adds 400 score, XP and a trophy.</p>
    <button class="btn primary wide" data-a="epilogueGo">Step through the mirror</button>` : ''}
    ${night ? `<p class="muted">🌙 <b>The Long Night</b>: endless acts with a rotating boss. Enemies gain 20% HP and 1 Edge each night. The run already counts as won; every night you clear adds 150 score.</p>
    <button class="btn ${mirror ? '' : 'primary'} wide" data-a="nightGo">Descend into the Long Night</button>` : ''}
    <button class="btn ghost wide" data-a="epilogueSkip">Walk away victorious</button>
  </div>`;
}

// ───────── v0.5: Patrons ─────────

function viewPatron(r: RunState): string {
  const pt = patronOf(r)!;
  return `<div class="panel patron">
    <div class="big-emoji">${pt.icon}</div>
    <h2>${esc(pt.name)}</h2>
    <p class="flavor">${esc(pt.text)}</p>
    <p class="muted small">A Patron offers one blessing as you enter Act ${r.act}. Take one, or none. Nothing is free: a blessing leaves a debt. Pay 💰 ${DEBT_PRICE} at a Merchant, or ${esc(pt.name)} sits in on the Act ${r.act} boss and sets an extra ${esc(CARDS[PATRON_TRAP[pt.id]]?.name ?? 'trap')} for it.</p>
    ${r.patron!.offers.map((id) => { const b = BLESSING_MAP[id]; const ok = !b.can || b.can(r); return `<button class="btn choice" data-a="patronPick" data-id="${id}" ${ok ? '' : 'disabled'}><b>${esc(b.name)}</b><small>${esc(b.text)}</small>${ok ? '' : '<small class="why">Not available for this run.</small>'}</button>`; }).join('')}
    <button class="btn ghost wide" data-a="patronPick" data-id="">Decline politely</button>
  </div>`;
}

// ───────── v0.6: Fates ─────────

function viewFate(r: RunState): string {
  const offers = r.fateOffer ?? [];
  return `<div class="panel fate">
    <div class="big-emoji">🎴</div>
    <h2>Choose your Fate</h2>
    <p class="flavor">Three cards turn over on a table at the start of the road. Each is a life you could lead. Keep one, or walk your own path.</p>
    <div class="fates">${offers.map((id) => { const f = FATE_MAP[id]; return `<button class="btn choice fatecard" data-a="fatePick" data-id="${id}"><span class="fateicon">${f.icon}</span><b>${esc(f.name)}</b><small>${esc(f.text)}</small></button>`; }).join('')}</div>
    <button class="btn ghost wide" data-a="fatePick" data-id="">Walk your own path (no Fate)</button>
  </div>`;
}

// ───────── end of run ─────────

/** A few run highlights for the end screen (v0.4). */
function highlights(r: RunState): string {
  const plays = Object.entries(r.stats.plays ?? {}).filter(([id]) => CARDS[id] && CARDS[id].rarity !== 'special').sort((a, b) => b[1] - a[1]);
  const fav = plays[0];
  const items = [
    r.stats.bigHit ? `💥 Biggest hit <b>${r.stats.bigHit}</b>` : '',
    fav ? `🃏 Most played <b>${esc(CARDS[fav[0]].name)}</b> ×${fav[1]}` : '',
    r.stats.steals ? `🫳 Traps stolen <b>${r.stats.steals}</b>` : '',
    r.stats.mimics ? `👥 Mimics <b>${r.stats.mimics}</b>` : '',
    r.champs ? `🔥 Champions <b>${r.champs}</b>` : '',
    r.stats.exhumes ? `⚱ Exhumes <b>${r.stats.exhumes}</b>` : '',
    r.stats.venueWins ? `🎪 Venue wins <b>${r.stats.venueWins}</b>` : '',
    r.nemesis?.slain ? '☠ <b>Nemesis slain</b>' : '',
    nightOf(r) ? `🌙 Nights cleared <b>${nightsCleared(r)}</b>` : '',
    !r.won && r.combat?.phase === 'lost' && r.lastFight ? `🕯️ Fell to <b>${esc(r.lastFight.name)}</b>${r.lastFight.kind !== 'normal' ? ` (${r.lastFight.kind})` : ''}` : '',
  ].filter(Boolean);
  return items.length ? `<div class="highlights">${items.map((x) => `<span>${x}</span>`).join('')}</div>` : '';
}

function viewEnd(): string {
  const r = app.endRun!;
  const res = app.result!;
  const ch = CHARACTERS[r.character];
  const lvUp = res.levelAfter > res.levelBefore;
  const newUnlocks: string[] = [];
  for (let l = res.levelBefore + 1; l <= res.levelAfter; l++) if (UNLOCKS[l]) newUnlocks.push(UNLOCKS[l]);
  const newChars = CHAR_LIST.filter((c) => c.unlock > res.levelBefore && c.unlock <= res.levelAfter);
  const opts = eco.souvenirOptions(r);
  const left = res.keep - app.kept.length;
  return `<div class="screen end ${r.won ? 'won' : 'lost'}">
    ${r.won ? `<div class="confetti" aria-hidden="true">${Array.from({ length: 24 }, (_, i) => `<i style="--x:${(i * 41) % 100}%;--d:${2 + (i % 4) * 0.5}s;--delay:${(i % 6) * 0.2}s;--c:${['#e8b04a', '#3fb6c9', '#e8743b', '#6bbf59', '#a56ee0'][i % 5]}"></i>`).join('')}</div>` : ''}
    <div class="big-emoji">${r.won ? '🏆' : '🕯️'}</div>
    <h1>${r.won ? 'Victory' : 'Defeated'}</h1>
    <p>${esc(ch.name)} · ${r.daily ? 'Daily Duel' : r.weekly ? `Weekly Gauntlet ${esc(r.weekly)}` : `Stakes ${r.ascension}`}${r.heat ? ` · 🎲 Wager ${r.heat}` : ''} · reached ${nightOf(r) ? `night ${nightOf(r)}` : `Act ${r.act}`}, floor ${r.floor}</p>
    ${story.endingHtml(r)}
    <div class="statgrid">${[
      [`${res.score}`, 'score', true], [`${r.stats.elites}`, 'rivals', r.stats.elites], [`${r.stats.chains}`, 'chains', r.stats.chains],
      [`${r.stats.maxChain}`, 'longest chain', r.stats.maxChain > 1], [`+${res.xp}`, 'XP', true], [`+${res.coins}`, '🪙 Coins', true, 'coinbox'],
      [`✦ ${r.stats.style ?? 0}`, 'style', r.stats.style], [`+${res.renown ?? 0}`, '🎭 Renown', res.renown], [`${r.stats.omensUsed ?? 0}`, 'omens used', r.stats.omensUsed],
    ].filter((x) => x[2]).map(([v, label, , cls]) => `<div${cls ? ` class="${cls}"` : ''}><b>${v}</b><small>${label}</small></div>`).join('')}
    </div>
    ${highlights(r)}
    ${r.stats.echoMet ? `<div class="levelup q">🪞 ${r.stats.echoWon ? 'You beat your own Echo this run.' : 'Your Echo got the better of you this run.'}</div>` : ''}
    ${nightOf(r) ? `<div class="levelup ach">🌙 The Long Night: you reached night ${nightOf(r)} and cleared ${nightsCleared(r)}.</div>` : ''}
    ${!r.won && app.profile.nemesis && !r.daily && !r.weekly ? `<div class="levelup q">☠ <b>${esc(app.profile.nemesis.name)}</b> is now your Nemesis. It will be waiting in Act ${app.profile.nemesis.act} next run.</div>` : ''}
    ${r.epilogue === 'won' ? '<div class="levelup ach">🪞 You defeated the Reflection.</div>' : r.epilogue === 'lost' ? '<div class="levelup q">🪞 The Reflection won this time. The run still counts.</div>' : ''}
    ${res.heatMsg ? `<div class="levelup">🔥 ${esc(res.heatMsg)}</div>` : ''}
    ${res.mastered?.length ? `<div class="levelup q">📜 Mastery up: ${esc(res.mastered.slice(0, 4).join(', '))}${res.mastered.length > 4 ? ` +${res.mastered.length - 4} more` : ''} <small>(Dust added)</small></div>` : ''}
    ${eco.seasonTier(app.profile) > app.profile.season.claimed ? '<div class="levelup ach">🎭 Season reward ready! <small>Claim it in Events.</small></div>' : ''}
    ${lvUp ? `<div class="levelup">Level ${res.levelAfter}! +${res.levelAfter - res.levelBefore} talent point${res.levelAfter - res.levelBefore > 1 ? 's' : ''} and a Duelist Pack${newUnlocks.length ? `<br><small>Unlocked: ${esc(newUnlocks.join(', '))}</small>` : ''}</div>` : ''}
    ${newChars.map((c) => `<div class="levelup newclass">🔓 New class: ${c.icon} <b>${esc(c.name)}</b><br><small>${esc(c.pitch)}</small></div>`).join('')}
    ${res.newAscension ? `<div class="levelup">Stakes ${app.profile.ascension[r.character]} unlocked for ${esc(ch.name)}</div>` : ''}
    ${res.ach.map((id) => { const a = ACHIEVEMENTS.find((x) => x.id === id)!; return `<div class="levelup ach">🏆 ${esc(a.name)}<br><small>${esc(eco.rewardText(a.reward))}</small></div>`; }).join('')}
    ${res.quests.map((q) => `<div class="levelup q">✓ Quest complete: ${esc(q)} <small>(claim it in Profile)</small></div>`).join('')}
    ${res.keep && opts.length ? `<div class="souvenir"><h3>Souvenir${res.keep > 1 ? 's' : ''}: keep ${res.keep} card${res.keep > 1 ? 's' : ''} for your collection</h3>
      <div class="cardrow">${opts.map((id) => cardHtml({ id, up: false }, { act: left > 0 && !app.kept.includes(id) ? 'keep' : 'noop', sel: app.kept.includes(id), count: app.profile.collection[id]?.n ?? 0 })).join('')}</div>
      <p class="muted small">${left > 0 ? `${left} pick${left > 1 ? 's' : ''} left. Tap a card to keep it.` : 'Kept! Find them under Cards.'}</p></div>` : ''}
    ${res.mintable ? (app.minted
      ? '<p class="ok">Deck minted. It will return as an Echo rival in future runs.</p>'
      : '<button class="btn primary" data-a="mint">🪞 Mint this deck as a Legacy<small>It returns as an Echo rival to fight</small></button>')
      : '<p class="muted">Beat an act boss to mint your deck as a Legacy.</p>'}
    <div class="row2"><button class="btn primary" data-a="endLeave" data-v="chars">Play again</button><button class="btn" data-a="endLeave" data-v="title">Back to hub</button></div>
  </div>`;
}

// ───────── settings / how to ─────────

function viewSettings(): string {
  const s = app.profile.settings;
  const tg = (k: keyof typeof s, label: string) =>
    `<label class="toggle"><span>${label}</span><input type="checkbox" data-a="setting" data-k="${k}" ${s[k] ? 'checked' : ''}></label>`;
  return `<div class="screen settings">
    <header class="bar"><button class="icon-btn" data-a="go" data-v="back" aria-label="Back">←</button><h2>Settings</h2><span></span></header>
    <div class="scroll">
      <h3>Text size</h3>
      <div class="seg">${(['s', 'm', 'l'] as const).map((t) => `<button class="${s.text === t ? 'on' : ''}" data-a="textSize" data-t="${t}">${{ s: 'Small', m: 'Medium', l: 'Large' }[t]}</button>`).join('')}</div>
      ${tg('fast', 'Fast animations')}
      ${tg('reduceMotion', 'Reduce motion')}
      ${tg('leftHanded', 'Left-handed controls')}
      ${tg('turbo', 'Turbo (very fast enemy turns)')}
      <label class="toggle"><span>Vibration on hits</span><input type="checkbox" data-a="setting" data-k="haptics" ${s.haptics !== false ? 'checked' : ''}></label>
      <h3>Counters</h3>
      <div class="seg">${(['ask', 'auto', 'off'] as const).map((m) => `<button class="${(s.counters ?? 'ask') === m ? 'on' : ''}" data-a="counterMode" data-m="${m}">${{ ask: 'Ask me', auto: 'Automatic', off: 'Never' }[m]}</button>`).join('')}</div>
      <p class="muted small">When an enemy trap or move could be answered by a Counter in your hand or an Omen on your belt: pause and ask each time (you see the enemy card first), answer automatically (cheapest Counter; defensive Omens only against heavy hits), or never.</p>
      <label class="toggle"><span>Damage preview on the selected card</span><input type="checkbox" data-a="setting" data-k="preview" ${s.preview !== false ? 'checked' : ''}></label>
      <h3>Sound</h3>
      <label class="toggle"><span>Music</span><input type="checkbox" data-a="audioToggle" data-k="musicOff" ${s.musicOff ? '' : 'checked'}></label>
      <label class="slider"><span>Music volume</span><input type="range" min="0" max="1" step="0.1" value="${s.music ?? 0.5}" data-a="volume" data-k="music" ${s.musicOff ? 'disabled' : ''}></label>
      <label class="toggle"><span>Sound effects</span><input type="checkbox" data-a="audioToggle" data-k="sfxOff" ${s.sfxOff ? '' : 'checked'}></label>
      <label class="slider"><span>Effects volume</span><input type="range" min="0" max="1" step="0.1" value="${s.sfx ?? 0.7}" data-a="volume" data-k="sfx" ${s.sfxOff ? 'disabled' : ''}></label>
      <label class="toggle"><span>Play with the iPhone silent switch on</span><input type="checkbox" data-a="audioToggle" data-k="ignoreSilent" ${s.ignoreSilent ? 'checked' : ''}></label>
      <p class="muted small">All sound is synthesized live, so the game stays one small file. Each act has its own theme, fights add drums and bass, and bosses get a darker variant. Each chain link plays the next note of a scale.${audio.nowPlaying() ? ` Now playing: <i>${esc(audio.nowPlaying())}</i>.` : ''}</p>
      <p class="muted">Factions always carry a shape so color is never the only cue: ${Object.keys(FACTION_GLYPH).filter((f) => f !== 'enemy' && f !== 'curse').map((f) => `${FACTION_GLYPH[f]} ${FACTION_NAME[f]}`).join(', ')}.</p>
      <h3>Help</h3>
      <button class="btn ghost" data-a="replayTips">Replay tutorial tips</button>
      <p class="muted small">On a keyboard: 1–9 inspects a card in hand (press again to play it), E ends your turn, Esc closes popups.</p>
      <h3>Data</h3>
      <button class="btn ghost danger" data-a="resetAll">Reset all progress</button>
      <p class="muted">Dawnwick v${APP_VERSION}. Progress is stored on this device only.</p>
    </div>
  </div>`;
}

function viewHowto(): string {
  return howtoSections(`
      <h3>The run</h3>
      <p>Climb 3 acts. Each act is a short branching map that ends in a boss. Fights give cards, rivals give keepsakes, Wick's Candle mends, hones, rehearses or scouts, Merchants sell cards, forges stamp sigils. A 🔥 <b>Champion</b> rival on each map has a random affix and pays far more. Lose all your HP and the run ends; everything you earned for your collection stays.</p>
      <h3>Your turn</h3>
      <p>You get <b>3 energy</b> and draw <b>5 cards</b>. <b>Drag</b> a card upward to play it, or onto an enemy to target it (or tap to inspect, tap again to play). Up to <b>1 unspent energy</b> carries over as <b>Flux</b>. Each enemy is a small deck: the top card (its <b>tell</b>) shows the move it will play next, and the last move it played sits beside it.</p>
      <h3>The Answer Chain</h3>
      <p><b>Reactions</b> are set face-down into your 2 Reaction slots. They fire on their own during the enemy turn when their trigger happens: ⚔ when attacked, ✋ when the enemy uses a non-attack, ⟲ when an enemy trap fires.</p>
      <p>Enemies set face-down <b>traps</b> the same way. You can see what sets each one off, but not what it does.</p>
      <p>When cards answer each other they form an <b>Answer Chain</b> (the chain, for short) of up to 6 links. The chain resolves <b>last-in, first-out</b>, so the answer happens before the thing it answers:</p>
      <div class="chainex"><div class="clink mine"><span class="ln">1</span>You play Cut</div><div class="clink theirs"><span class="ln">2</span>Beetle's Spike Shell: gain 6 Guard</div><div class="clink mine"><span class="ln">3</span>Your Mirror Tide: Negate it</div>
      <p class="muted">Resolves 3 → 2 → 1: the shell is negated, then your Cut lands.</p></div>
      <p>Cards with <b>Chain N</b> get a bonus when the chain they are in reaches N links, so baiting traps on purpose pays off.</p>
      <h3>Dares</h3>
      <p>Before a rival or boss you may stake up to 25 gold on a <b>Dare</b>: win fast, take little damage, build a long chain, Negate twice… Pull it off and you get the stake back plus ${DARE_PAYOUT} gold.</p>
      <h3>The Deal and the Dealer</h3>
      <p>After a fight the Dealer deals you cards face-up plus one <b>face-down</b> card that is one rarity better. Take it blind if you dare. Pick a rare or the blind card and the Dealer may <b>answer your pick</b>: pay gold to Negate the answer, or let it resolve and take a Regret jinx with the card.</p>
      <h3>The Spread: face-down cards</h3>
      <p>The act map is dealt as cards. Some are dealt <b>face-down</b>: you only see the suit. ♠ means a fight, ♥ a Candle or shrine, ♦ a Merchant, treasure or forge, ♣ anything else. Each act you get one 👁 <b>Peek</b> to flip a card early, or you can walk in blind.</p>
      <h3>Wick's Candle</h3>
      <p>Pick one: <b>Mend</b> (heal a quarter of your Max HP plus 4), <b>Hone</b> (upgrade a card), <b>Rehearse</b> (choose a Reaction: it starts your next fight already set) or <b>Scout</b> (flip every face-down card on this map and see the traps of your next rival).</p>
      <h3>Echoes</h3>
      <p>Every run you finish leaves an <b>Echo</b>: the deck you ended with. The Echo Gallery on the title screen keeps count. On your second run, your first run's Echo waits for you as a rival.</p>
      <h3>Stakes</h3>
      <p>Win a run to raise the <b>Stakes</b>. Each level adds one rule on top of the last: pre-set traps, early Rebuttals, the Dealer answering every rare, more face-down cards, a smaller Omen belt, and the Last Dealer's extra trap at the top.</p>
      <h3>Between runs</h3>
      <p><b>Coins</b> 🪙 come from runs, quests and achievements. Spend them on <b>booster packs</b> and Market singles. Spare cards break into <b>Dust</b> ✨ in the Forge; Dust crafts any card and imprints <b>sigils</b>. After a pack, the <b>Riposte gamble</b> lets you answer one card: 50% it jumps a rarity, 50% it shatters into double Dust.</p>
      <p>Owned cards appear twice as often in runs, and <b>Legendaries</b> only appear once you own them. In <b>Loadouts</b> you can swap starter cards for owned ones. At the end of a run you keep <b>souvenir</b> cards from your final deck.</p>
      <p>Every level gives a <b>talent point</b> for the three schools (Guard, Coin, Feint) plus 50 Coins and a pack. <b>Trophies</b> unlock new keepsakes. Daily Duels ignore all of this so everyone starts equal.</p>
      <h3>Factions</h3>
      <p>▲ <b>Ember</b>: damage, Burn, Edge. ◆ <b>Tide</b>: draw, Shaken, Negate. ● <b>Thorn</b>: Guard, Barbs, healing. ✦ <b>Void</b>: Doom, Sacrifice, Disrupt. ✧ <b>Gilt</b>: the Fate Coin and Ante. ◇ <b>Glass</b>: Steal, Glints, Mimic. ⚱ <b>Grave</b>: Crypt, Exhume, Haunt. ☼ <b>Dawn</b>: Counters, Verdict. ϟ <b>Storm</b>: Charge, Shock. ❅ <b>Rime</b>: Chill, Freeze. ⬢ <b>Stone</b>: Fortify, Tremor. ⚗ <b>Aether</b>: Prism, Catalyze. ♞ <b>Beast</b>: companions. ☽ <b>Dusk</b>: Mark, Veil.</p>
      <h3>The Cardsharp and the Fate Coin</h3>
      <p>✧ <b>Gilt</b> cards read your <b>Fate Coin</b> when they resolve: ☀ Sun or ☾ Moon. Most of them <b>Flip</b> it afterwards. It is never random, so plan the order: set up ☾ before All In, ☀ before Heads Up. <b>Ante</b> is a stack you build over the fight; Jackpot and Royal Flush <b>cash it in</b>.</p>
      <h3>Omens</h3>
      <p>Tarot answers. They drop from fights (always from bosses) and are sold by the Merchant. Hold up to 3 on the belt by your keepsakes. Each Omen carries a sign: ⚔ it answers an enemy attack, ✋ an enemy non-attack, ⟲ an enemy trap or Reaction firing. You never play one on your own turn: when the chain stops on an enemy link with that sign, you may <b>turn it over</b> for free as your answer (The Hanged Man negates the attack outright). The Star and The Hierophant also work on the map.</p>
      <h3>Alternate acts</h3>
      <p>Every act has two versions with different enemies and bosses. Each run rolls one per act, so the climb changes.</p>
      <h3>Vows and Wager</h3>
      <p>After your first boss kill you can take <b>Vows</b> on the duelist screen: more enemy HP, extra traps, poorer rests… Each adds <b>Wager</b>. Wager multiplies score, adds Coins and Renown, and new Wager records pay a bonus.</p>
      <h3>Style</h3>
      <p>Every chain earns Style (10 × links²), every Negate 30, every kill 20 or more. Style adds to your score and Renown. A 6-link chain is worth 360.</p>
      <h3>Events tab</h3>
      <p><b>Season track</b>: 30 free reward tiers; every run earns Renown. <b>Arena</b>: draft 10 cards onto a small base deck, then duel rivals' saved decks (your Legacies, imported deck codes, and generated duelists) until 7 wins or 3 losses. Beat a rival and steal one of 3 of their cards. <b>Weekly Gauntlet</b>: one seeded run per week with set Vows and a twist rule. <b>Deck codes</b>: share a Legacy deck as text; friends import it and fight it.</p>
      <h3>Mastery and cosmetics</h3>
      <p>Every card you play earns mastery. Each level pays Dust and upgrades the card frame (Bronze, Silver, Gold, Prismatic, Living). Familiars, card backs and titles come from the Season track, trophies and the Arena. None of them change gameplay.</p>
      <h3>The Magpie and Glass (v0.4)</h3>
      <p>◇ <b>Glass</b> cards <b>Steal</b>: they take the enemy's oldest face-down trap and set it in your own free Reaction slot, where it fires for you. A trap with no room becomes a <b>Glint</b>, a 0-cost shard that deals 4 damage to a random enemy. <b>Mimic</b> repeats the last Attack or Trick you played this turn. Some enemies steal too: kill them to get your card back.</p>
      <h3>Damage preview</h3>
      <p>Select a card and the enemy HP bars show what it would do. Face-down traps you can't see are left out, and a ⚠ line tells you how many could answer it.</p>
      <h3>Wandering bosses and the Reflection</h3>
      <p>Each act has a 1 in 3 chance to be ruled by a wandering boss instead: the Briar Queen, the Magpie King or the Orrery. Slay 2 🔥 Champion rivals in one run and, after the Act 3 boss, you may step into <b>Act 4</b> and fight <b>the Reflection</b>, which plays your own deck back at you.</p>
      <h3>Riddles of the Chain</h3>
      <p>Hand-made one-turn puzzles in the Events tab. Everything is face-up and nothing is random. Find the order that wins.</p>
      <h3>The Sexton and the Crypt (v0.5)</h3>
      <p>⚱ <b>Grave</b> cards work your <b>Crypt</b>. While you play the Sexton, your Reactions go to the Crypt when they leave play instead of the discard pile. <b>Haunt</b> effects fire as a card is buried. <b>Exhume</b> sets the newest buried Reaction again for free, and <b>Bury</b> puts the top of your draw pile into the Crypt. Tap ⚱ by your piles to see it.</p>
      <h3>Prime and Converge</h3>
      <p><b>Prime</b> Reactions gain 1 Prime each turn they stay set and hit harder for it (the 🌞 number on the slot). <b>Converge</b> counts the different factions you have played this turn, so mix your colours before you play it.</p>
      <h3>Venues</h3>
      <p>Some fights happen at a <b>Venue</b> that changes the rules for everyone: fewer or more Reaction slots, longer chains, lightning, Barbs for all… Rival and boss Venues show on the map; tap the chip at the top of a fight to read it.</p>
      <h3>Patrons, Nemesis, the Long Night</h3>
      <p>At the start of Acts 2 and 3 a <b>Patron</b> offers three blessings; take one or none. A Patron's gift is a loan: unless you pay the debt off at a Merchant (💰 ${DEBT_PRICE}), the Patron sits in on that act's boss fight and gives the boss an extra trap. The normal or rival fight that ends a run becomes your <b>Nemesis</b>: next run it waits in the same act, promoted, and beating it pays extra. After your first win, beating the Act 3 boss opens <b>the Long Night</b>: endless nights of rising danger for score.</p>
      <h3>Wilds &amp; Wonders (v0.6)</h3>
      <p>Every act now comes in <b>three versions</b> (the third: the Hollow Woods, the Wreckers' Coast, the Molten Deep) and rolls a <b>map Layout</b> and a <b>Sky</b> that bends the act: Fog hides the map, a Blood Moon brings rivals, a Gale blows strangers onto the road. Tap the pills under the act name to read them.</p>
      <p>At the start of a run you keep one of three <b>Fates</b>: mixed blessings like the Gambler (rich, but shops cost more) or Oath of Steel (+1 Reaction slot, less HP). 🔮 <b>Mystery</b> nodes could be anything; ⛩️ <b>Shrines</b> offer upgrades, sigils and boons. On the way to a node, something may happen on the <b>road</b>, and in the middle of a fight, a <b>Surprise</b> may pop up. <b>Rare monsters</b> (a Gilded Hare, a Treasure Crab, a Wishing Star) run away after 3 turns: catch one for gold and a keepsake.</p>
      <h3>Blot</h3>
      <p>Ink enemies <b>Blot</b> cards in your draw pile: a Blotted card (🖋) costs 1 more until the fight ends.</p>
      <h3>Elements (v0.7)</h3>
      <p>Every card and enemy has an element. Six sit on a wheel: 🔥 Blaze → ❄️ Frost → 🌿 Wild → ⚡ Storm → 🌊 Flood → 🪨 Stone → back to 🔥. Each one is <b>Effective</b> (×1.3 damage) against the next two and <b>Resisted</b> (×0.75) by the two before it and by itself. ✨ Radiant and 🌑 Umbral sit outside the wheel and are Effective against each other.</p>
      <p>Enemies show their <b>Aspect</b> by their name. Your <b>Attunement</b> (the chip by your HP) is the element of the last elemental card you played, and it is your element when they hit you, so the order you play in matters for defence too. 🔮 <b>Prism</b> cards take your Attunement. Play 3 cards of one element in a turn for its <b>Resonance</b> bonus. Tap the chip to see the wheel.</p>
      <h3>Counters (v0.7)</h3>
      <p><b>Counters</b> (↯) stay in your hand (they Palm) and answer the enemy mid-chain: when an enemy trap fires or an enemy move is about to land, the chain <b>pauses</b> and shows the enemy card face-up: what it does, who it hits and how much damage gets through your Guard. Tap any link in the chain to read it, pick a Counter, then choose <b>Counter</b> or <b>Let it resolve</b>. Nothing happens until you choose. The game also stops every time an enemy trap, Counter or Rebuttal answers, even when you hold nothing that can answer back. After a chain the recap stays up until you tap Continue (tap a link to read what it did). With Counters set to Automatic or Never, the recap closes by itself. On your turn you pay energy; on the enemy's turn you pay with <b>Flux</b>. Counters can push a chain 2 links past its cap. From Act 2, rivals and bosses carry <b>Rebuttals</b> that cancel your first Counter, so bait them out. Change how you are asked in Settings.</p>
      <h3>New classes (v0.7)</h3>
      <p>⚖️ <b>Arbiter</b> (Dawn + Tide): counters for Verdict. 🌩️ <b>Tempest</b> (Storm + Tide): Charge and Shock. ❄️ <b>Rimeblade</b> (Rime + Glass): Chill, Freeze, Shatter. 🐾 <b>Beastcaller</b> (Beast + Storm): companions that act every turn. 🪨 <b>Geomancer</b> (Stone + Thorn): Fortify and Tremor. ⚗️ <b>Alchemist</b> (Aether + Ember): Prism cards and Catalyze. 🥷 <b>Nightblade</b> (Dusk + Void): Mark, Veil and executions.</p>
      <h3>Upgrades, Evolve and hybrids</h3>
      <p>Every card can be upgraded once, down one of two paths. <b>Path A</b> (Name+) raises its numbers. <b>Path B</b> (Name✦) keeps the numbers but the card costs 1 less (2+ cost cards), Palms (attacks and tricks), is Opener (Reactions, Counters and stances) or stops Folding. Tap the version you want in the upgrade window.</p>
      <p>🦋 <b>Evolve N</b>: play this copy N times in fights you win and it becomes the stronger card named in brackets for the rest of the run. Its upgrade carries over.</p>
      <p>⧉ <b>Hybrids</b> belong to two classes' home factions (say Ember and Rime) and mix their mechanics. Either class can draft them.</p>
      <h3>Legacy decks</h3>
      <p>Beat an act boss and you can mint your final deck. Minted decks return as <b>Echo</b> rivals: the game plays your old deck against you.</p>
`);
}

/**
 * v0.10: How to Play had 27 sections in one scroll, ordered by the version that added them.
 * The three core sections stay open; the rest fold into tappable sections, the most useful first.
 */
const HOWTO_FIRST = ['The run', 'Your turn', 'The Answer Chain', 'Elements', 'Counters', 'Upgrades, Evolve and hybrids', 'New classes', 'Between runs', 'Factions', 'Dares', 'Legacy decks'];
function howtoSections(raw: string): string {
  const parts = raw.split('<h3>').slice(1).map((chunk) => {
    const [head, ...rest] = chunk.split('</h3>');
    return { title: head.replace(/\s*\(v0\.\d+\)/, '').trim(), body: rest.join('</h3>') };
  });
  const rank = (t: string) => { const i = HOWTO_FIRST.indexOf(t); return i < 0 ? HOWTO_FIRST.length : i; };
  parts.sort((x, y) => rank(x.title) - rank(y.title));
  return `<div class="screen howto">
    <header class="bar"><button class="icon-btn" data-a="go" data-v="back" aria-label="Back">←</button><h2>How to play</h2><span></span></header>
    <div class="scroll prose">
      ${parts.map((x, i) => i < 3 ? `<h3>${x.title}</h3>${x.body}` : `<details><summary>${x.title}</summary>${x.body}</details>`).join('')}
    </div>
  </div>`;
}

// ───────── picker ─────────

const TYPE_ORDER: Record<string, number> = { attack: 0, skill: 1, power: 2, reaction: 3, counter: 4, curse: 5 };
/** v0.10: decks read by type, then cost, then name (was alphabetical by internal id). */
function sortDeck(cards: CardInst[]): CardInst[] {
  return [...cards].sort((a, b) => {
    const da = CARDS[a.id], db = CARDS[b.id];
    return (TYPE_ORDER[da.type] ?? 9) - (TYPE_ORDER[db.type] ?? 9) || da.cost - db.cost || cardName(a).localeCompare(cardName(b)) || Number(a.up) - Number(b.up);
  });
}

function viewPicker(): string {
  const pk = app.picker!;
  let shown: { c: CardInst; n: number }[] = pk.cards.map((c) => ({ c, n: 1 }));
  if (pk.group) {
    const by = new Map<string, { c: CardInst; n: number }>();
    for (const c of pk.cards) { const k = `${c.id}|${c.up}|${c.path ?? ''}|${c.mod ?? ''}|${c.foil ? 1 : 0}`; const g = by.get(k); if (g) g.n++; else by.set(k, { c, n: 1 }); }
    shown = [...by.values()];
  }
  const chosen = pk.chosen !== undefined ? pk.cards.find((c) => c.uid === pk.chosen) : undefined;
  let preview = '';
  // v0.11: two upgrade paths; tap one to choose it.
  if (chosen && pk.kind === 'upgrade') {
    const alt = altPath(CARDS[chosen.id]);
    const b = app.upPath === 'b';
    preview = `<div class="uppreview paths">${cardHtml(chosen)}<span>→</span>
      <div class="path ${b ? '' : 'on'}" data-a="upPath" data-p="a">${cardHtml({ ...chosen, up: true, path: undefined })}<small>A: ${esc(pathALabel(CARDS[chosen.id]))}</small></div>
      <div class="path ${b ? 'on' : ''}" data-a="upPath" data-p="b">${cardHtml({ ...chosen, up: true, path: 'b' })}<small>B: ${esc(alt.label)}</small></div></div>`;
  }
  if (chosen && pk.kind === 'forge' && app.forgeMod) preview = `<div class="uppreview">${cardHtml(chosen)}<span>→</span>${cardHtml({ ...chosen, mod: app.forgeMod })}</div>`;
  return `<div class="modal-bg"><div class="modal picker">
    <h2>${esc(pk.title)}</h2>${pk.sub ? `<p class="center muted small">${esc(pk.sub)}</p>` : ''}
    ${preview}
    <div class="cardgrid">${shown.map(({ c, n }) => cardHtml(c, { act: pk.kind === 'view' ? 'cardInfo' : 'pickCard', sel: c.uid === pk.chosen, count: n > 1 ? n : undefined })).join('') || '<p class="muted">Nothing here.</p>'}</div>
    ${pk.kind === 'view' ? '<button class="btn wide" data-a="pickCancel">Close</button>' : `<div class="row2">
      <button class="btn primary" data-a="pickConfirm" ${chosen ? '' : 'disabled'}>Confirm</button>
      <button class="btn ghost" data-a="pickCancel">Cancel</button>
    </div>`}
  </div></div>`;
}

function openPicker(kind: PickKind | 'view' | 'forge', title: string, cards: CardInst[], onPick?: (uid: number) => void): void {
  app.picker = { kind, title, cards, onPick };
  render();
}

function deckFor(kind: PickKind): CardInst[] {
  const r = app.run!;
  if (kind === 'upgrade') return r.deck.filter((c) => !c.up && CARDS[c.id].type !== 'curse');
  if (kind === 'duplicate' || kind === 'transform') return r.deck.filter((c) => CARDS[c.id].type !== 'curse');
  if (kind === 'sigil') return r.deck.filter((c) => CARDS[c.id].type !== 'curse' && MOD_LIST.some((m) => m.fits(CARDS[c.id]) && m.id !== c.mod));
  return [...r.deck];
}

// ═════════════════════════ COMBAT FLOW & FX ═════════════════════════

/** After moving to a node (or carrying on after a roadside encounter): banners for fights, a toast for Mysteries. */
function arrived(r: RunState): void {
  if (r.mystery && r.screen !== 'event') toast(`🔮 The Mystery was ${MYSTERY_TEXT[r.mystery] ?? 'something'}!`, 'good');
  if (r.screen === 'combat') {
    const s = r.combat!;
    audio.sfx(s.kind === 'boss' ? 'bossIntro' : s.kind === 'elite' || s.affix ? 'elite' : 'fight');
    banner(s.rare ? `✨ ${esc(s.encounter)}` : s.kind === 'boss' ? `👑 ${esc(s.encounter)}` : s.affix ? `🔥 Champion: ${esc(AFFIX_MAP[s.affix].name)}` : s.kind === 'elite' ? `👹 ${esc(s.encounter)}` : 'Fight!', s.kind === 'normal' ? 'mine' : 'enemy');
    void afterAction();
  }
}
const MYSTERY_TEXT: Record<string, string> = { fight: 'an ambush', elite: 'a rival', treasure: 'treasure', shop: 'a hidden shop', rare: 'a rare monster', shrine: 'a shrine', forge: 'a forge', rest: 'a quiet camp', event: 'an event' };

function burst(host: Element, n: number, color: string): void { hub.burstAt(host as HTMLElement, n, color); }

function banner(text: string, cls: string): void {
  if (app.profile.settings.reduceMotion) return;
  const el = document.createElement('div');
  el.className = `banner ${cls}`;
  el.innerHTML = `<span>${text}</span>`;
  fx.appendChild(el);
  setTimeout(() => el.remove(), 1100 * speed() + 100);
}

/** v0.13.1: the chain recap waits for a tap unless Counters are set to Automatic or Never. */
const chainWaits = (): boolean => (app.profile.settings.counters ?? 'ask') === 'ask';

async function showEvents(events: UiEvent[]): Promise<void> {
  let chain: UiEvent | null = null;
  let sounded = 0;
  for (const ev of events) {
    if (ev.t === 'chain') { chain = ev; continue; }
    if (sounded < 4) {
      sounded++;
      if (ev.t === 'dmg') audio.sfx((ev.n ?? 0) >= 10 ? 'bighit' : 'hit');
      else if (ev.t === 'block' && (ev.n ?? 0) > 0) audio.sfx('block');
      else if (ev.t === 'heal') audio.sfx('heal');
      else if (ev.t === 'status' && ev.who === 'p') audio.sfx('status');
      else if (ev.t === 'negate') audio.sfx('negate');
      else if (ev.t === 'death') audio.sfx('death');
      else if (ev.t === 'text' && /Sun|Moon/.test(ev.s ?? '')) audio.sfx('flip');
      else if (ev.t === 'text' && /gold/.test(ev.s ?? '')) audio.sfx('coin');
      else sounded--;
    }
    const host = root.querySelector(`[data-who="${ev.who}"]`);
    if (!host) continue;
    if (ev.t === 'death') { host.classList.add('dying'); burst(host, 22, '#ffcf7a'); continue; }
    if (ev.t === 'elem') {
      const el = document.createElement('div');
      el.className = `float f-elem ${(ev.n ?? 0) > 0 ? 'eff' : 'res'}`;
      el.textContent = ev.s ?? '';
      host.appendChild(el);
      setTimeout(() => el.remove(), 1100);
      continue;
    }
    const el = document.createElement('div');
    el.className = `float f-${ev.t} ${ev.t === 'dmg' && (ev.n ?? 0) >= 10 ? 'crit' : ''}`;
    el.textContent = ev.t === 'dmg' ? `-${ev.n}` : ev.t === 'heal' ? `+${ev.n}` : ev.t === 'block' ? (ev.n! > 0 ? `+${ev.n}🛡` : `${ev.n}🛡`) : (ev.s ?? '');
    el.style.setProperty('--dx', `${(Math.random() * 40 - 20).toFixed(0)}px`);
    host.appendChild(el);
    setTimeout(() => el.remove(), 1100);
    if (ev.t === 'dmg') {
      host.classList.remove('hit'); void (host as HTMLElement).offsetWidth; host.classList.add('hit');
      if ((ev.n ?? 0) > 0) burst(host, Math.min(16, 4 + (ev.n ?? 0)), ev.who === 'p' ? '#ff6b6b' : '#ffb347');
    }
    if (ev.t === 'block' && (ev.n ?? 0) > 0) { host.classList.remove('shield'); void (host as HTMLElement).offsetWidth; host.classList.add('shield'); }
    if (ev.t === 'negate') burst(host, 10, '#ef6b6b');
    if (ev.t === 'dmg' && ev.who === 'p') {
      host.classList.remove('shake'); void (host as HTMLElement).offsetWidth; host.classList.add('shake');
      if ((ev.n ?? 0) >= 10) { root.classList.remove('bigshake'); void root.offsetWidth; root.classList.add('bigshake'); }
      if (app.profile.settings.haptics !== false && !app.profile.settings.reduceMotion) try { navigator.vibrate?.(25); } catch { /* not supported */ }
    }
  }
  if (chain) {
    // v0.13: the recap stays up long enough to read (about half a second a link), and waits while a link is open.
    // v0.13.1: in Ask mode (the default) there is no timer at all: the recap waits for a tap.
    app.chainMs = chainWaits() ? 0 : Math.round((1400 + 550 * (chain.links?.length ?? 1)) * speed());
    app.chainPin = null;
    app.chainShow = chain;
    render();
    audio.chainNotes(chain.links ?? []);
    if ((chain.links?.length ?? 0) >= 3) famBark(chain.links!.length >= 5 ? '!!!' : '♪');
    await sleep(app.chainMs);
    while (app.chainShow === chain && (app.chainPin !== null || !app.chainMs)) await sleep(120);
    if (app.chainShow === chain) { app.chainShow = null; render(); }
  }
}

const BARKS: Record<string, string> = { fam_inkwell: 'Mrrp!', fam_owl: 'Hoo!', fam_toad: 'Ribbit!', fam_bat: 'Eep!', fam_fox: 'Yip!', fam_ghost: 'Boo!', fam_crow: 'Caw!', fam_moth: '✨', fam_raccoon: 'Chrr!', fam_dragon: 'Rawr!', fam_snail: '…', fam_skull: 'Clack!', fam_wisp: '✧' };

/** The familiar cheers on long chains. */
function famBark(extra: string): void {
  const f = app.run?.familiar;
  const host = root.querySelector('[data-who="fam"]');
  if (!f || !host) return;
  const el = document.createElement('div');
  el.className = 'float f-text bark';
  el.textContent = `${BARKS[f] ?? '!'} ${extra}`;
  host.appendChild(el);
  host.classList.remove('hop'); void (host as HTMLElement).offsetWidth; host.classList.add('hop');
  setTimeout(() => el.remove(), 1100);
}

async function afterAction(cb0?: Combat): Promise<void> {
  const cb = cb0 ?? combat();
  if (!cb) return;
  const evs = cb.flush();
  render();
  await showEvents(evs);
  await checkCombatEnd();
  persist();
}

async function checkCombatEnd(): Promise<void> {
  const r = app.run!;
  const s = r.combat;
  if (!s || (s.phase !== 'won' && s.phase !== 'lost')) return;
  if (r.puzzle) { puzzleDone(s.phase === 'won'); return; }
  app.busy = true;
  if (s.phase === 'won') { banner(s.kind === 'boss' ? 'Boss defeated' : `Victory · ✦ ${s.stats.style ?? 0} style`, 'win'); audio.sfx('win'); } else audio.sfx('lose');
  await sleep(800 * speed());
  if (r.arena) { endDuel(); return; }
  if (s.tutorial) app.profile.tutorialDone = true;
  finishCombat(r);
  // v0.11: Evolve news.
  for (const m of r.evolved ?? []) toast(`🦋 ${esc(m)}`, 'good');
  r.evolved = [];
  app.busy = false;
  app.sel = null;
  app.rewardCardSel = null;
  if (r.finished) endRun();
  else render();
}

async function endTurn(): Promise<void> {
  const cb = combat();
  if (!cb || app.busy || cb.s.phase !== 'player') return;
  app.busy = true;
  app.sel = null;
  await runAction(cb, () => cb.endPlayerTurn());
  render();
  banner('Enemy turn', 'enemy');
  audio.sfx('enemyTurn');
  await showEvents(cb.flush());
  await sleep(250 * speed());
  for (let i = 0; i < cb.s.enemies.length; i++) {
    if (cb.over()) break;
    if (cb.s.enemies[i].dead) continue;
    await sleep(380 * speed());
    const el = root.querySelector(`.enemy[data-who="${i}"]`);
    el?.classList.add('acting');
    await sleep(220 * speed());
    await runAction(cb, () => cb.enemyAct(i));
    render();
    await showEvents(cb.flush());
  }
  if (app.run?.puzzle) { app.busy = false; render(); puzzleDone(judge(cb) === 'solved'); return; }
  await runAction(cb, () => cb.endEnemyPhase());
  app.busy = false;
  render();
  if (!cb.over()) { banner(`Your turn · ${cb.s.turn}`, 'mine'); audio.sfx('turn'); }
  await showEvents(cb.flush());
  await checkCombatEnd();
  persist();
}

// ───────── riddles (puzzles) ─────────

function startPuzzle(id: string): void {
  const def = PUZZLE_MAP[id];
  if (!def) return;
  if (!app.run?.puzzle && !app.run?.arena) app.stash = app.run;
  app.run = puzzleRun(def, app.profile.cosmetics.familiar ?? undefined);
  app.sel = null;
  app.busy = false;
  app.chainShow = null; app.chainPin = null;
  app.view = 'run';
  persist();
  const draw = def.draw?.length ? `<p class="small">Draw pile, top first: ${def.draw.map((c) => esc(CARDS[c.replace('+', '')].name + (c.endsWith('+') ? '+' : ''))).join(', ')}</p>` : '';
  modal(`<div class="big-emoji">🧩</div><h2>${esc(def.name)} <small>${'★'.repeat(def.tier)}</small></h2>
    <p>${esc(def.text)}</p>
    <p class="kw"><b>Goal</b> ${def.goal === 'win' ? 'Defeat every enemy before your next turn starts. Burn, Doom, Barbs and your set Reactions keep working during the enemy turn.' : 'Still be standing when your next turn starts.'}</p>
    ${draw}
    <p class="muted small">Every enemy trap is face-up and nothing is random. First solve: +${PUZZLE_REWARD[def.tier]} Coins.</p>`);
}

function puzzleDone(solved: boolean): void {
  const r = app.run!;
  const def = PUZZLE_MAP[r.puzzle!];
  const used = Object.values(r.combat?.stats.plays ?? {}).reduce((a, b) => a + b, 0);
  app.busy = false;
  app.sel = null;
  if (solved) {
    const res = recordSolve(app.profile, def.id, used);
    audio.sfx('solve');
    for (const a of res.ach) toast(`🏆 <b>${esc(ACHIEVEMENTS.find((x) => x.id === a)!.name)}</b>`, 'ach');
    persist();
    const next = PUZZLES.find((p) => !app.profile.puzzles[p.id]);
    modal(`<div class="big-emoji">🧩</div><h2>Solved!</h2><p><b>${esc(def.name)}</b> in ${used} card${used === 1 ? '' : 's'}.${res.first ? ` <b>+${res.coins} Coins</b>.` : ''}</p>
      ${next ? `<button class="btn primary wide" data-a="startPuzzle" data-id="${next.id}">Next: ${esc(next.name)} ${'★'.repeat(next.tier)}</button>` : '<p class="ok">You have solved every riddle.</p>'}
      <button class="btn wide" data-a="puzzleRetry">Play it again</button>
      <button class="btn ghost wide" data-a="puzzleQuit">Back to Riddles</button>`);
  } else {
    audio.sfx('lose');
    modal(`<div class="big-emoji">🤔</div><h2>Not quite</h2><p>${def.goal === 'win' ? 'An enemy is still standing.' : 'You did not make it to your next turn.'}</p>
      <button class="btn primary wide" data-a="puzzleRetry">Try again</button>
      <button class="btn wide" data-a="puzzleHint">Hint</button>
      <button class="btn ghost wide" data-a="puzzleQuit">Back to Riddles</button>`);
  }
}

function leavePuzzle(): void {
  app.run = app.stash;
  app.stash = null;
  app.sel = null;
  app.busy = false;
  app.modal = null;
  app.view = 'events';
  persist();
  render();
}

// ───────── arena duels ─────────

function startDuel(resume: boolean): void {
  const p = app.profile;
  const duel = resume ? p.arena?.duel ?? null : arena.arenaDuel(p);
  if (!duel) return;
  if (!app.run?.arena) app.stash = app.run;
  app.run = duel;
  p.arena!.duel = duel;
  app.sel = null;
  app.view = 'run';
  resumeIfNeeded();
  persist();
  render();
  banner(`🏟 ${esc(duel.arena!.rival)}`, 'enemy');
  void afterAction();
}

function leaveDuel(): void {
  app.run = app.stash;
  app.stash = null;
  app.view = 'events';
}

function endDuel(): void {
  const res = arena.arenaResolve(app.profile);
  app.busy = false;
  app.sel = null;
  leaveDuel();
  for (const a of eco.checkAchievements(app.profile)) toast(`🏆 <b>${esc(ACHIEVEMENTS.find((x) => x.id === a)!.name)}</b>`, 'ach');
  const a = app.profile.arena;
  persist();
  modal(res === 'win'
    ? `<div class="big-emoji">🏆</div><h2>Duel won</h2><p>${a?.wins ?? 0} wins, ${a?.losses ?? 0} losses.${a?.stage === 'pick' ? ' Take one card from your rival\'s deck.' : a?.stage === 'done' ? ' The Arena run is complete: claim your rewards.' : ''}</p>`
    : `<div class="big-emoji">🕯️</div><h2>Duel lost</h2><p>${a?.wins ?? 0} wins, ${a?.losses ?? 0} losses.${a?.stage === 'done' ? ' The Arena run is over: claim your rewards.' : ' Shake it off. Next rival.'}</p>`);
}

function abandonCurrent(): void {
  if (!app.run) return;
  app.run.finished = true;
  eco.finishRun(app.profile, app.run);
  app.run = null;
  persist();
}

function endRun(): void {
  const r = app.run!;
  app.result = eco.finishRun(app.profile, r);
  audio.sfx(r.won ? 'runWin' : 'runLose');
  app.endRun = r;
  app.minted = false;
  app.kept = [];
  app.run = null;
  app.view = 'end';
  persist();
  render();
}

/** Fly a copy of the card from the hand toward its target before it resolves. */
async function flyCard(uid: number, targetIdx?: number): Promise<void> {
  if (app.profile.settings.reduceMotion) return;
  const src = root.querySelector<HTMLElement>(`.hand .card[data-uid="${uid}"]`);
  if (!src) return;
  const a = src.getBoundingClientRect();
  const tgtEl = targetIdx !== undefined ? root.querySelector(`.enemy[data-who="${targetIdx}"]`) : root.querySelector('.enemies');
  const b = (tgtEl ?? root).getBoundingClientRect();
  const ghost = src.cloneNode(true) as HTMLElement;
  ghost.classList.add('flying');
  ghost.style.cssText = `left:${a.left}px;top:${a.top}px;width:${a.width}px;height:${a.height}px`;
  fx.appendChild(ghost);
  src.style.visibility = 'hidden';
  const dx = b.left + b.width / 2 - (a.left + a.width / 2);
  const dy = b.top + b.height / 2 - (a.top + a.height / 2);
  const t = 260 * speed();
  ghost.animate([{ transform: 'translate(0,0) scale(1)', opacity: 1 }, { transform: `translate(${dx}px,${dy}px) scale(.45) rotate(8deg)`, opacity: 0.2 }], { duration: t, easing: 'cubic-bezier(.5,0,.8,.5)' });
  await sleep(t);
  ghost.remove();
}

// ═════════════════════════ ACTIONS ═════════════════════════

function startRun(character: CharId, ascension: number, daily?: string, weekly?: string): void {
  const p = app.profile;
  const d = daily ? dailySetup(daily) : null;
  const w = weekly ? weeklySetup(weekly) : null;
  const ch = d ? d.character : w ? w.character : character;
  const echoes = [...p.legacy.map((l) => ({ label: l.label, cards: l.cards })), ...p.rivals.map((x) => ({ label: x.label, cards: x.cards }))];
  app.run = newRun({
    character: ch, ascension: d || w ? 0 : ascension, seed: d?.seed ?? w?.seed, daily: daily ?? null, dailyMod: d?.mod ?? null,
    level: levelOf(p.xp), echoes, tutorial: !p.tutorialDone, fates: !daily && !weekly && p.tutorialDone,
    // v0.14: on your second run, your first Rival is the Echo of the deck you finished the first one with.
    echoBeat: p.runs === 1 && p.lastDeck && !daily && !weekly ? p.lastDeck : null,
    ...eco.runSetup(p, ch, !!daily || !!weekly),
    ...(w ? { weekly, twist: w.twist, vows: w.vows } : {}),
  });
  app.tipIdx = 0;
  app.view = 'run';
  persist();
  render();
}

type Handler = (el: HTMLElement) => void | Promise<void>;

const actions: Record<string, Handler> = {
  ...hub.hubActions,
  ...story.storyActions,
  noop: () => {},
  go: (el) => {
    const v = el.dataset.v as View;
    // v0.10: Settings and How to Play return to where they were opened from (mid-run included).
    if ((v === 'settings' || v === 'howto') && app.view !== 'settings' && app.view !== 'howto') backTo = app.view;
    app.view = v === 'back' as View ? backTo : v; app.modal = null; render();
  },
  endLeave: (el) => {
    // v0.10: leaving the results screen with souvenir picks unspent silently forfeited them.
    const go = () => { if (el.dataset.v === 'chars') void actions.newRun(el); else { app.view = 'title'; render(); } };
    const r = app.endRun, res = app.result;
    const left = r && res && res.keep && eco.souvenirOptions(r).length ? res.keep - app.kept.length : 0;
    if (left > 0) ask(`You have ${left} souvenir pick${left > 1 ? 's' : ''} left. Leave without keeping ${left > 1 ? 'them' : 'it'}?`, 'Leave anyway', go); else go();
  },
  closeModal: () => { app.modal = null; app.confirmFn = null; render(); },
  confirmYes: () => { const fn = app.confirmFn; app.modal = null; app.confirmFn = null; fn?.(); render(); },
  coachOk: () => { app.profile.seen[app.view] = true; persist(); render(); },
  continue: () => { app.view = 'run'; render(); },
  newRun: () => {
    if (app.run) { ask('Abandon your current run? It counts as a loss.', 'Abandon run', () => { abandonCurrent(); void actions.newRun(document.body); }); return; }
    const unlocked = unlockedChars(app.profile);
    if (!unlocked.includes(app.charPick)) app.charPick = 'duelist';
    app.ascPick = Math.min(app.ascPick, app.profile.ascension[app.charPick]);
    app.view = 'chars';
    app.modal = null;
    render();
  },
  daily: () => {
    const key = todayKey();
    const d = dailySetup(key);
    modal(`<h2>Daily Duel · ${esc(key)}</h2>
      <p>Everyone gets the same seed today: same map, same cards offered, same enemies. Talents, loadouts and your collection are switched off so it stays fair.</p>
      <p><b>${esc(CHARACTERS[d.character].name)}</b><br>${esc(DAILY_MODS[d.mod])}</p>
      ${app.profile.daily[key] ? `<p>Your best today: <b>${app.profile.daily[key].score}</b></p>` : ''}
      <p class="muted">Global leaderboards arrive with the online backend; scores are kept on this device for now.</p>
      <button class="btn primary wide" data-a="startDaily">Start Daily Duel</button>`);
  },
  startDaily: () => {
    if (app.run) { ask('Abandon your current run? It counts as a loss.', 'Abandon run', () => { abandonCurrent(); startRun('duelist', 0, todayKey()); }); return; }
    app.modal = null;
    startRun('duelist', 0, todayKey());
  },
  styleInfo: () => modal(`<div class="big-emoji">✦</div><h2>Style</h2><p>Style rewards playing with flair: chains of 2+ links, Negates, Counters and kills all add to it. It adds to your run score, and some Dares and quests ask for it. It never changes how a fight plays.</p><p class="muted">This fight: ✦ ${app.run?.combat?.stats.style ?? 0}</p>`),
  nemesisInfo: () => { const n = app.run?.nemesis; if (n) modal(`<div class="big-emoji">☠</div><h2>Nemesis: ${esc(n.name)}</h2><p>It beat you last time and now waits for you in this act (${n.kind === 'elite' ? 'at a rival' : 'in a fight'}). Its grudge (${n.grudge}) makes it tougher each time it wins. Beat it for <b>60 gold, a rare card and 100 score</b>. A Nemesis that wins three times running moves on.</p>`); },
  mirrorInfo: () => modal(`<div class="big-emoji">🪞</div><h2>The Reflection</h2><p>Each act map has one 🔥 <b>Champion</b> rival with a random affix. Slay ${EPILOGUE_CHAMPS} Champions in a run and, after the Act 3 boss, you may face the Reflection: one last fight against a copy of your own deck. The run already counts as won; beating it pays extra score, XP and a trophy.</p><p class="muted">Champions slain this run: ${Math.min(app.run?.champs ?? 0, EPILOGUE_CHAMPS)}/${EPILOGUE_CHAMPS}</p>`),
  lockedChar: (el) => { const c = CHARACTERS[el.dataset.id as CharId]; toast(`🔒 ${esc(c.name)} unlocks at level ${c.unlock}. Every run earns XP, win or lose.`); },
  pickChar: (el) => { app.charPick = el.dataset.id as CharId; app.ascPick = Math.min(app.ascPick, app.profile.ascension[app.charPick]); render(); },
  asc: (el) => {
    const max = app.profile.ascension[app.charPick];
    app.ascPick = Math.max(0, Math.min(max, app.ascPick + Number(el.dataset.d)));
    render();
  },
  startRun: () => startRun(app.charPick, app.ascPick),
  ...ev.eventActions,
  startWeekly: () => {
    const go = () => { app.modal = null; startRun('duelist', 0, undefined, weekKey()); };
    if (app.run) { ask('Abandon your current run? It counts as a loss.', 'Abandon run', () => { abandonCurrent(); go(); }); return; }
    go();
  },
  arenaDuel: () => startDuel(false),
  startPuzzle: (el) => startPuzzle(el.dataset.id!),
  puzzleRetry: () => { const id = app.run?.puzzle; if (id) startPuzzle(id); },
  puzzleQuit: () => leavePuzzle(),
  puzzleHint: () => { const id = app.run?.puzzle; if (id) modal(`<div class="big-emoji">💡</div><h2>Hint</h2><p>${esc(PUZZLE_MAP[id].hint)}</p>`); },
  epilogueGo: () => {
    const r = app.run!;
    enterEpilogue(r);
    app.sel = null;
    persist();
    render();
    if (r.screen === 'combat') { banner('🪞 The Reflection', 'enemy'); void afterAction(); }
  },
  epilogueSkip: () => ask(app.run?.epilogue === 'offered' ? 'Leave without facing the Reflection? The run is already won.' : 'End the run here? It is already won.', 'Walk away', () => { declineEpilogue(app.run!); endRun(); }),
  nightGo: () => {
    const r = app.run!;
    descendNight(r);
    app.sel = null;
    persist();
    render();
    banner('🌙 The Long Night', 'enemy');
  },
  patronPick: (el) => {
    const r = app.run!;
    const id = el.dataset.id || null;
    const msg = choosePatron(r, id);
    persist();
    render();
    if (msg) toast(`${esc(patronOf(r)?.icon ?? '')} ${esc(msg)}`, 'ach');
  },
  venueInfo: () => {
    const v = app.run?.combat?.venue ? VENUE_MAP[app.run.combat.venue] : null;
    if (v) modal(`<div class="big-emoji">${v.icon}</div><h2>${esc(v.name)}</h2><p>${esc(v.text)}</p><p class="muted small">Venues change the rules for everyone in the fight. Rival and boss Venues are shown on the map before you go.</p>`);
  },
  combatLog: () => {
    const s = app.run?.combat;
    if (!s) return;
    modal(`<h2>📜 Combat log</h2><p class="muted small">Newest first.</p><div class="logview">${[...s.log].reverse().map((l) => `<p${l.startsWith('— Turn') ? ' class="turnsep"' : ''}>${esc(l)}</p>`).join('') || '<p class="muted">Nothing yet.</p>'}</div>`);
  },
  arenaResume: () => startDuel(true),
  forfeit: () => ask('Forfeit this duel? It counts as a loss.', 'Forfeit', () => { const s = app.run!.combat!; s.phase = 'lost'; endDuel(); }),
  duelQuit: () => { leaveDuel(); persist(); render(); },
  coinInfo: () => {
    const c = app.run!.combat!.player;
    modal(`<div class="big-emoji">${c.coin ? '☾' : '☀'}</div><h2>Fate Coin: ${c.st.house ? 'both faces' : c.coin ? 'Moon' : 'Sun'}</h2><p>Gilt cards read the coin when they resolve. "Flip" turns it over afterwards. It starts every fight on ☀ Sun and it is never random.</p>${c.st.ante ? `<p>Ante on the table: <b>${c.st.ante}</b>.</p>` : ''}`);
  },
  omen: (el) => {
    const r = app.run!;
    const i = Number(el.dataset.i);
    const d = OMENS[r.omens![i]];
    // v0.14: Omens are answers. In a fight they are turned over from the chain window, never as a free action.
    const can = !r.combat && !!d.map;
    const sign = OMEN_SIGN[d.sign];
    modal(`<div class="omencard"><span class="numeral">${d.numeral}</span><span class="oicon">${d.icon}</span><b>${esc(d.name)}</b><small class="osign">${TRIGGER_GLYPH[d.sign]} ${esc(sign)}</small></div><p class="center">${esc(d.text)}</p>
      <p class="muted center small">An Omen is an answer. When ${esc(sign)} is about to resolve, the chain pauses and you can turn this over for free as the next link.${(app.profile.settings.counters ?? 'ask') !== 'ask' ? ' With Counters set to Automatic, defensive ⚔ Omens are turned over only against a heavy hit; choose Ask me in Settings to pick yourself.' : ''}</p>
      ${can ? `<button class="btn primary wide" data-a="omenUse" data-i="${i}">Use ${esc(d.name)} now</button>` : ''}
      <button class="btn ghost small wide" data-a="omenDrop" data-i="${i}">Discard</button>`);
  },
  omenUse: async (el) => {
    const r = app.run!;
    const i = Number(el.dataset.i);
    app.modal = null;
    if (!r.combat && useOmenOnMap(r, i)) { audio.sfx('heal'); persist(); render(); }
    else render();
  },
  omenDrop: (el) => { discardOmen(app.run!, Number(el.dataset.i)); app.modal = null; persist(); render(); },
  buyOmen: (el) => {
    const r = app.run!, i = Number(el.dataset.i), it = r.shop!.omens![i];
    if (!it || it.sold) return;
    const d = OMENS[it.id], short = it.price - r.gold;
    const full = (r.omens ?? []).length >= (r.relics.includes('tarot_pouch') ? 4 : 3);
    modal(`<div class="omencard"><span class="numeral">${d.numeral}</span><span class="oicon">${d.icon}</span><b>${esc(d.name)}</b></div><p class="center">${esc(d.text)}</p>
      <button class="btn primary wide" data-a="buyOmenYes" data-i="${i}" ${short > 0 || full ? 'disabled' : ''}>${full ? 'Your Omen belt is full' : short > 0 ? `You need 💰 ${short} more gold` : `Buy for 💰 ${it.price}`}</button>`);
  },
  buyOmenYes: (el) => { app.modal = null; if (buyOmen(app.run!, Number(el.dataset.i))) { audio.sfx('buy'); persist(); } else toast('Not enough gold, or your Omen belt is full.', 'warn'); render(); },
  volume: (el) => {
    const k = el.dataset.k as 'sfx' | 'music';
    app.profile.settings[k] = Number((el as HTMLInputElement).value);
    audio.applyVolumes();
    if (k === 'sfx') audio.sfx('coin');
    persist(); render();
  },
  audioToggle: (el) => {
    const k = el.dataset.k as 'musicOff' | 'sfxOff' | 'ignoreSilent';
    const on = (el as HTMLInputElement).checked;
    app.profile.settings[k] = k === 'ignoreSilent' ? on : !on;
    audio.unlock();
    audio.refreshSession();
    audio.applyVolumes();
    if (k === 'sfxOff' && on) audio.sfx('coin');
    persist(); render();
  },
  menu: () => app.run?.puzzle ? modal(`<h2>Riddle</h2>
    <button class="btn wide" data-a="puzzleRetry">Restart riddle</button>
    <button class="btn wide" data-a="puzzleHint">Hint</button>
    <button class="btn wide ghost" data-a="puzzleQuit">Leave riddle</button>`) : app.run?.arena ? modal(`<h2>Arena duel</h2>
    <button class="btn wide" data-a="duelQuit">Save & leave (resume from Events)</button>
    <button class="btn wide ghost" data-a="forfeit">Forfeit duel</button>`) : modal(`<h2>Menu</h2><p class="center muted">${CHARACTERS[app.run!.character].icon} ${esc(CHARACTERS[app.run!.character].name)} · Stakes ${app.run!.ascension} · Act ${app.run!.act}, floor ${app.run!.floor} · score so far ${runScore(app.run!)}</p>
    <button class="btn wide" data-a="go" data-v="title">Save & quit to hub</button>
    <button class="btn wide" data-a="go" data-v="howto">How to play</button>
    <button class="btn wide" data-a="go" data-v="settings">Settings</button>
    <button class="btn wide ghost danger" data-a="abandon">Abandon run</button>`),
  abandon: () => ask('Abandon this run? It counts as a loss.', 'Abandon run', () => { app.run!.finished = true; endRun(); }),
  deck: () => {
    const d = app.run!.deck;
    const by = (t: string) => d.filter((c) => CARDS[c.id].type === t).length;
    const mix = (['attack', 'skill', 'power', 'reaction', 'counter', 'curse'] as const).map((t) => [by(t), t] as const).filter(([n]) => n).map(([n, t]) => `${n} ${t}${n > 1 ? 's' : ''}`).join(' · ');
    openPicker('view', `Your deck (${d.length})`, sortDeck(d)); app.picker!.group = true; app.picker!.sub = mix; render();
  },
  relic: (el) => { const r = RELICS[el.dataset.id!]; modal(`<div class="big-emoji">${r.icon}</div><h2>${esc(r.name)}</h2><p>${esc(r.text)}</p><p class="muted">${r.rarity} keepsake</p>`); },
  status: (el) => { const s = STATUSES[el.dataset.s!]; modal(`<h2>${s.icon} ${esc(s.name)}</h2><p>${esc(s.desc(Number(el.dataset.n)))}</p>`); },
  cardInfo: (el) => {
    const id = el.dataset.id!;
    const uid = el.dataset.uid ? Number(el.dataset.uid) : undefined;
    const inst = uid !== undefined ? app.run?.deck.find((c) => c.uid === uid) ?? app.run?.combat?.draw.concat(app.run.combat.discard).find((c) => c.uid === uid) : undefined;
    const c = inst ?? { id, up: false };
    const d = CARDS[id];
    modal(`<div class="center">${cardHtml(c, { cls: 'big' })}</div>
      ${keywordList(cardText(c)).map(([k, t]) => `<p class="kw"><b>${k}</b> ${esc(t)}</p>`).join('')}
      ${'mod' in c && c.mod ? `<p class="kw"><b>${MODS[c.mod].icon} ${MODS[c.mod].name}</b> ${esc(MODS[c.mod].text)}</p>` : ''}
      ${!c.up ? upgradeLines(id) : ''}`);
  },

  // map
  travel: (el) => {
    const r = app.run!;
    travel(r, Number(el.dataset.row), Number(el.dataset.col));
    audio.sfx('flip');
    app.sel = null;
    app.rewardCardSel = null;
    persist();
    render();
    arrived(r);
  },
  fatePick: (el) => { const r = app.run!; if (chooseFate(r, el.dataset.id || null)) { if (r.fate) toast(`${FATE_MAP[r.fate].icon} Fate: ${esc(FATE_MAP[r.fate].name)}`, 'good'); persist(); render(); } },
  fateInfo: () => { const f = app.run?.fate ? FATE_MAP[app.run.fate] : null; if (f) modal(`<div class="big-emoji">${f.icon}</div><h2>${esc(f.name)}</h2><p>${esc(f.text)}</p><p class="muted">Your Fate for this run. Shrines and an inkwell or two can change it.</p>`); },
  skyInfo: () => {
    const r = app.run!;
    const sky = skyOf(r);
    const lay = LAYOUT_MAP[r.layouts?.[r.act - 1] ?? ''];
    modal(`<h2>This act</h2>${sky ? `<p class="kw"><b>${sky.icon} Sky: ${esc(sky.name)}</b> ${esc(sky.text)}</p>` : ''}${lay ? `<p class="kw"><b>${lay.icon} Map: ${esc(lay.name)}</b> ${esc(lay.text)}</p>` : ''}${foggy(r) ? '<p class="kw"><b>☁️ Fog</b> You can only see what lies 2 rows ahead.</p>' : ''}<p class="muted">Every act rolls a new Sky and a new map Layout.</p>`);
  },
  surpriseOk: () => { const s = app.run?.combat; if (s?.surprise) { s.surprise.seen = true; persist(); render(); } },
  nodeInfo: (el) => {
    const r0 = app.run!;
    const n0 = nodeAt(r0, Number(el.dataset.row), Number(el.dataset.col));
    if (n0 && foggy(r0) && n0.row > (r0.pos?.row ?? -1) + 2) { modal('<h2>☁️ Fog</h2><p>You cannot see what waits here until you are closer (2 rows away).</p>'); return; }
    const n = n0;
    if (n && isDown(n)) {
      const su = SUIT[suitOf(n.type)];
      const ok = reachable(r0).some((x) => x.row === n.row && x.col === n.col);
      modal(`<div class="big-emoji suitbig s-${suitOf(n.type)}">${su.glyph}</div><h2>Face down: ${su.name}</h2><p>The Dealer dealt this card face-down, the same way an enemy sets a trap: you can see its suit, not the card. ${su.glyph} ${su.name} means ${esc(su.hint)}.</p>
        ${r0.peeks ? `<button class="btn wide" data-a="peekNode" data-row="${n.row}" data-col="${n.col}">👁 Peek (${r0.peeks} left this act)</button>` : '<p class="muted small">No Peeks left this act. A Candle\'s Scout flips every face-down card.</p>'}
        ${ok ? `<button class="btn primary wide" data-a="travelFromInfo" data-row="${n.row}" data-col="${n.col}">Go here blind</button>` : ''}`);
      return;
    }
    if (n) modal(`<h2>${n.champ ? '🔥 Champion ' : ''}${NODE_ICON[n.type]} ${NODE_NAME[n.type]}</h2><p>${n.champ ? 'A Champion rival: it carries a random affix (more HP, Edge, traps…). Beat it for a rare card choice, a keepsake and 60% more gold.' : NODE_HELP[n.type]}</p>${n.venue && VENUE_MAP[n.venue] ? `<p class="kw"><b>${VENUE_MAP[n.venue].icon} Venue: ${esc(VENUE_MAP[n.venue].name)}</b> ${esc(VENUE_MAP[n.venue].text)}</p>` : ''}${reachable(r0).some((x) => x.row === n.row && x.col === n.col) ? `<button class="btn primary wide" data-a="travelFromInfo" data-row="${n.row}" data-col="${n.col}">Go here</button>` : '<p class="muted">You can only move along the lines, one row at a time. Press and hold a glowing node to read it before you go.</p>'}`);
  },
  travelFromInfo: (el) => { app.modal = null; void actions.travel(el); },
  peekNode: (el) => { const r = app.run!; if (peek(r, Number(el.dataset.row), Number(el.dataset.col))) { audio.sfx('trapFlip'); persist(); } void actions.nodeInfo(el); },
  bossInfo: () => {
    const b = actEnc(app.run!).boss;
    const d = ENEMIES[b.enemies[0]];
    const r = app.run!;
    const v = r.venues?.[r.act - 1] ? VENUE_MAP[r.venues[r.act - 1]!] : null;
    modal(`<div class="big-emoji">${d.icon}</div><h2>${esc(d.name)}</h2><p>${esc(d.blurb ?? '')}</p>${v ? `<p class="kw"><b>${v.icon} Venue: ${esc(v.name)}</b> ${esc(v.text)}</p>` : ''}<p class="muted">${d.hp[0]} HP${nightOf(r) ? ` (+${Math.round((nightHpMult(nightOf(r)) - 1) * 100)}% at night)` : ''}</p>`);
  },

  // combat
  card: (el) => {
    const uid = Number(el.dataset.uid);
    if (app.busy) return;
    const cb = combat()!;
    const c = cb.s.hand.find((x) => x.uid === uid);
    if (!c) return;
    if (app.sel === uid && cb.canPlay(c) && !(CARDS[c.id].target && cb.alive().length > 1)) { void playSel(); return; }
    app.sel = uid;
    audio.sfx('select');
    render();
  },
  desel: () => { app.sel = null; render(); },
  play: () => playSel(),
  target: (el) => playSel(Number(el.dataset.i)),
  endTurn: () => endTurn(),
  dismissChain: () => { app.chainShow = null; app.chainPin = null; render(); },
  chainLink: (el) => { const i = Number(el.dataset.i); app.chainPin = app.chainPin === i ? null : i; render(); },
  counterPick: (el) => { app.counterAsk?.resolve(Number(el.dataset.uid)); },
  caFocus: (el) => { if (app.counterAsk) { app.counterAsk.focus = Number(el.dataset.i); render(); } },
  caSel: (el) => { if (app.counterAsk) { const u = Number(el.dataset.uid); app.counterAsk.sel = u; render(); } },
  elemInfo: () => elemInfo(),
  counterMode: (el) => { app.profile.settings.counters = el.dataset.m as 'ask' | 'auto' | 'off'; persist(); render(); },
  tipNext: () => { app.tipIdx++; if (app.tipIdx >= TIPS.length) { app.profile.tutorialDone = true; persist(); } render(); },
  dare: (el) => {
    const id = el.dataset.id || null;
    if (takeDare(app.run!, id)) { if (id) toast(`🎲 Dare placed: ${esc(DARE_MAP[id].name)}`, 'good'); persist(); render(); }
  },
  enemyInfo: (el) => {
    const cb = combat()!;
    const e = cb.s.enemies[Number(el.dataset.i)];
    const d = ENEMIES[e.def];
    const traps = (d.traps ?? []).map((t) => `<p class="kw">${TRIGGER_GLYPH[CARDS[t].trigger!]} <b>${esc(CARDS[t].name)}</b> ${esc(cardText({ id: t, up: false }))}</p>`).join('');
    const sts = Object.entries(e.st).map(([k, n]) => STATUSES[k] ? `<p class="kw">${STATUSES[k].icon} <b>${esc(STATUSES[k].name)}</b> ${esc(STATUSES[k].desc(n))}</p>` : '').join('');
    const ghost = e.ghost ? `<p>Plays the deck <b>${esc(e.ghost.label)}</b>: ${e.ghost.deck.map((c) => esc(cardName(c))).join(', ')}</p>` : '';
    const mv = d.moves[e.move];
    const af = cb.s.affix ? AFFIX_MAP[cb.s.affix] : null;
    const asp = cb.aspect(e);
    modal(`<div class="big-emoji">${e.icon}</div><h2>${esc(e.name)}</h2><p class="center muted">❤ ${e.hp}/${e.maxHp}${e.block ? ` · 🛡 ${e.block} Guard` : ''}</p><p>${esc(d.blurb ?? '')}</p>${ghost}
      ${asp ? `<p class="kw"><b>Aspect</b> ${matchupText(asp)}</p>` : '<p class="kw"><b>Aspect</b> none: it hits with its cards\' elements.</p>'}
      ${mv ? `<h3>Next move</h3><p class="kw"><b>${esc(mv.name)}</b> ${intentHtml(cb.intents(e))}</p>` : ''}
      ${af ? `<h3>Champion affix</h3><p class="kw"><b>${af.icon} ${esc(af.name)}</b> ${esc(af.text)}</p>` : ''}
      ${sts ? `<h3>Statuses</h3>${sts}` : ''}
      ${traps ? `<h3>Traps it can set</h3>${traps}` : ''}
      ${e.traps.length ? `<p class="muted">${e.traps.length === 1 ? '1 trap is' : `${e.traps.length} traps are`} set now. ${trapsRevealed(app.run!) ? 'Your lens shows which.' : 'Face-down: you see the trigger, not which one.'}</p>` : ''}`);
  },
  slotInfo: (el) => {
    const t = app.run!.combat!.player.traps.find((c) => c.uid === Number(el.dataset.uid));
    if (t) modal(`<div class="center">${cardHtml(t, { cls: 'big' })}</div><p class="muted">Set. It fires by itself when its trigger happens.</p>`);
  },
  pile: (el) => {
    const s = app.run!.combat!;
    const which = el.dataset.p as 'draw' | 'discard' | 'crypt';
    if (which === 'crypt') { const cr = [...(s.crypt ?? [])].reverse(); openPicker('view', `Crypt (${cr.length}, newest first: Exhume takes the newest Reaction)`, cr); return; }
    const cards = which === 'draw' ? sortDeck(s.draw) : [...s.discard].reverse();
    openPicker('view', which === 'draw' ? `Draw pile (${cards.length}, shown sorted)` : `Discard pile (${cards.length}, newest first)`, cards);
    if (which === 'draw') { app.picker!.group = true; render(); }
  },

  // rewards
  takeGold: (el) => { burst(el, 12, '#e8b04a'); takeGold(app.run!); persist(); render(); },
  takeRelic: () => { takeRelic(app.run!); persist(); render(); },
  bossRelic: (el) => { takeRelic(app.run!, el.dataset.id); persist(); render(); },
  rewardSel: (el) => { app.rewardCardSel = el.dataset.id!; render(); },
  takeCard: () => {
    const r = app.run!;
    const sel = app.rewardCardSel;
    if (!sel) return;
    const blind = sel === HIDDEN ? r.reward?.hidden ?? null : null;
    takeCard(r, blind ?? sel);
    app.rewardCardSel = null;
    if (blind) { toast(`🂠 Face down: it was <b>${esc(CARDS[blind].name)}</b> (${esc(CARDS[blind].rarity)}).`, 'good'); audio.sfx('flip'); }
    if (r.reward?.answer) audio.sfx('trap');
    persist(); render();
  },
  dealerAnswer: (el) => { const r = app.run!; if (answerDealer(r, el.dataset.n === '1')) audio.sfx(el.dataset.n === '1' ? 'negate' : 'warn'); persist(); render(); },
  skipCard: () => { takeCard(app.run!, null); app.rewardCardSel = null; persist(); render(); },
  reroll: () => { if (rerollCards(app.run!)) { app.rewardCardSel = null; persist(); render(); } },
  proceed: () => {
    const r = app.run!;
    const go = () => {
      if (r.reward?.relic && r.screen === 'reward') takeRelic(r);
      proceed(r);
      app.rewardCardSel = null;
      persist();
      render();
      arrived(r);
    };
    if (r.reward?.cards || r.reward?.relicChoices) ask(r.reward.cards ? 'Leave without taking a card?' : 'Leave without a boss keepsake?', 'Leave', go);
    else go();
  },

  // shop
  // v0.10: tapping a shop item used to buy it on the spot; now it opens the item with a Buy button.
  buyCard: (el) => {
    const r = app.run!, i = Number(el.dataset.i), it = r.shop!.cards[i];
    if (!it || it.sold) return;
    const c = { id: it.id, up: false, mod: r.imprints?.[it.id] };
    const short = it.price - r.gold;
    modal(`<div class="dcard center">${cardHtml(c, { cls: 'big' })}</div>
      ${keywordList(cardText(c)).map(([k, d]) => `<p class="kw"><b>${k}</b> ${esc(d)}</p>`).join('')}
      <button class="btn primary wide" data-a="buyCardYes" data-i="${i}" ${short > 0 ? 'disabled' : ''}>${short > 0 ? `You need 💰 ${short} more gold` : `Buy for 💰 ${it.price}`}</button>`);
  },
  buyCardYes: (el) => { app.modal = null; if (buyCard(app.run!, Number(el.dataset.i))) { audio.sfx('buy'); persist(); } render(); },
  buyRelic: (el) => {
    const r = app.run!, i = Number(el.dataset.i), it = r.shop!.relics[i];
    if (!it || it.sold) return;
    const d = RELICS[it.id], short = it.price - r.gold;
    modal(`<div class="big-emoji">${d.icon}</div><h2>${esc(d.name)}</h2><p>${esc(d.text)}</p><p class="muted">${d.rarity} keepsake</p>
      <button class="btn primary wide" data-a="buyRelicYes" data-i="${i}" ${short > 0 ? 'disabled' : ''}>${short > 0 ? `You need 💰 ${short} more gold` : `Buy for 💰 ${it.price}`}</button>`);
  },
  buyRelicYes: (el) => { app.modal = null; if (buyRelic(app.run!, Number(el.dataset.i))) { audio.sfx('buy'); persist(); } render(); },
  shopRemove: () => openPicker('remove', 'Remove a card', deckFor('remove').filter((c) => removePriceFor(app.run!, c.uid) <= app.run!.gold), (uid) => { buyRemove(app.run!, uid); }),
  payDebt: (el) => { if (payDebt(app.run!, Number(el.dataset.i))) { audio.sfx('coin'); toast('The debt is settled. The Patron tips its hat and is gone.', 'good'); persist(); } render(); },

  // rest / forge node
  restHeal: () => {
    const go = () => { restHeal(app.run!); audio.sfx('rest'); persist(); render(); };
    if (!restHealAmount(app.run!)) ask('You are at full HP, so mending heals nothing. Mend anyway?', 'Mend anyway', go); else go();
  },
  restUpgrade: () => openPicker('upgrade', 'Hone a card', deckFor('upgrade'), (uid) => { restUpgrade(app.run!, uid); audio.sfx('upgrade'); }),
  restRehearse: () => openPicker('duplicate', 'Rehearse a Reaction', app.run!.deck.filter((c) => CARDS[c.id].type === 'reaction'), (uid) => { restRehearse(app.run!, uid); audio.sfx('trap'); }),
  restScout: () => { if (restScout(app.run!)) { audio.sfx('trapFlip'); persist(); render(); } },
  nodeSigil: (el) => {
    const m = el.dataset.m as ModId;
    app.forgeMod = m;
    const fits = app.run!.deck.filter((c) => MODS[m].fits(CARDS[c.id]) && c.mod !== m);
    openPicker('forge', `${MODS[m].icon} ${MODS[m].name}: pick a card`, fits, (uid) => { forgeApply(app.run!, uid, m); app.forgeMod = null; });
  },

  // events
  eventOpt: (el) => {
    const r = app.run!;
    const i = Number(el.dataset.i);
    const opt = EVENT_MAP[r.event!.id].options[i];
    const done = () => { persist(); render(); arrived(r); };
    if (opt.pick) {
      const titles: Record<PickKind, string> = { upgrade: 'Upgrade a card', remove: 'Remove a card', duplicate: 'Duplicate a card', transform: 'Transform a card', sigil: 'Stamp a sigil on a card' };
      openPicker(opt.pick, titles[opt.pick], deckFor(opt.pick), (uid) => { chooseEvent(r, i, uid); done(); });
      return;
    }
    chooseEvent(r, i);
    done();
  },

  // picker
  pickCard: (el) => { if (app.picker) { app.picker.chosen = Number(el.dataset.uid); render(); } },
  upPath: (el) => { app.upPath = el.dataset.p === 'b' ? 'b' : 'a'; render(); },
  pickConfirm: () => {
    const pk = app.picker;
    if (!pk || pk.chosen === undefined) return;
    app.picker = null;
    pk.onPick?.(pk.chosen);
    // v0.11: whatever upgraded the card (rest site, event, shrine), path B applies if it was picked.
    if (pk.kind === 'upgrade' && app.upPath === 'b') { const c = app.run?.deck.find((x) => x.uid === pk.chosen); if (c?.up) c.path = 'b'; }
    app.upPath = 'a';
    persist();
    render();
  },
  pickCancel: () => { app.picker = null; app.forgeMod = app.view === 'forge' ? app.forgeMod : null; render(); },

  // end
  mint: () => { if (app.endRun) { mintLegacy(app.profile, app.endRun); app.minted = true; eco.checkAchievements(app.profile); persist(); render(); } },
  keep: (el) => {
    const id = el.dataset.id!;
    if (!app.result || app.kept.length >= app.result.keep || app.kept.includes(id)) return;
    app.kept.push(id);
    eco.addCard(app.profile, id);
    burst(el, 14, '#e8b04a');
    for (const a of eco.checkAchievements(app.profile)) toast(`🏆 <b>${esc(ACHIEVEMENTS.find((x) => x.id === a)!.name)}</b>`, 'ach');
    persist();
    render();
  },

  // collection & settings
  delLegacy: (el) => {
    const id = el.dataset.id;
    ask('Retire this legacy deck? It will stop appearing as an Echo.', 'Retire deck', () => {
      app.profile.legacy = app.profile.legacy.filter((l) => l.id !== id);
      persist();
    });
  },
  textSize: (el) => { app.profile.settings.text = el.dataset.t as 's' | 'm' | 'l'; applySettings(); persist(); render(); },
  setting: (el) => {
    const k = el.dataset.k as 'fast' | 'reduceMotion' | 'leftHanded' | 'turbo' | 'preview' | 'haptics';
    app.profile.settings[k] = (el as HTMLInputElement).checked;
    applySettings(); persist(); render();
  },
  replayTips: () => { app.profile.tutorialDone = false; app.profile.seen = {}; persist(); toast('Tips will show again', 'good'); },
  resetAll: () => {
    ask('Erase all progress, cards, unlocks and legacy decks?', 'Erase everything', () => {
      app.profile = newProfile(); app.run = null; persist(); applySettings(); app.view = 'title';
    });
  },
};

async function playSel(targetIdx?: number): Promise<void> {
  const cb = combat();
  if (!cb || app.sel === null || app.busy) return;
  const uid = app.sel;
  const c = cb.s.hand.find((x) => x.uid === uid);
  if (!c || !cb.canPlay(c)) return;
  const tgt = targetIdx ?? cb.s.enemies.findIndex((e) => !e.dead);
  app.sel = null;
  if (app.tipIdx === 0 && !app.profile.tutorialDone) app.tipIdx = 1; // v0.10: playing a card answers the "how to play a card" tip
  app.busy = true;
  await flyCard(uid, CARDS[c.id].target ? tgt : undefined);
  app.busy = false;
  audio.sfx(CARDS[c.id].type === 'reaction' ? 'trap' : 'card');
  app.busy = true;
  await runAction(cb, () => { cb.play(uid, tgt); });
  app.busy = false;
  await afterAction(cb);
}

// ───────── drag to play ─────────

interface Drag { uid: number; el: HTMLElement; sx: number; sy: number; active: boolean; ghost?: HTMLElement; arrow?: SVGSVGElement; target: number | null; ox: number; oy: number }
let drag: Drag | null = null;
let swallowClick = false;

// Mobile browsers only allow sound after a gesture: any tap, touch or key unlocks it (and starts the music).
for (const ev of ['pointerdown', 'touchend', 'keydown'] as const) window.addEventListener(ev, () => { audio.unlock(); }, { capture: true, passive: true });
/** v0.13: buttons with their own sound (or none) skip the generic click. */
const QUIET_CLICK = new Set(['card', 'play', 'target', 'travel', 'counterPick', 'buyCardYes', 'buyRelicYes', 'buyOmenYes', 'chainLink', 'caSel', 'caFocus']);

root.addEventListener('pointerdown', (e) => {
  const el = (e.target as HTMLElement).closest<HTMLElement>('.hand .card');
  if (!el || app.busy || app.modal || app.picker) return;
  drag = { uid: Number(el.dataset.uid), el, sx: e.clientX, sy: e.clientY, active: false, target: null, ox: 0, oy: 0 };
});

// v0.10: press and hold a reachable map node to read about it (a tap still travels there).
let hold: { el: HTMLElement; t: number; x: number; y: number } | null = null;
root.addEventListener('pointerdown', (e) => {
  const el = (e.target as HTMLElement).closest<HTMLElement>('.node[data-a="travel"]');
  if (!el) return;
  hold = { el, x: e.clientX, y: e.clientY, t: window.setTimeout(() => {
    if (!hold) return;
    hold = null;
    swallowClick = true;
    setTimeout(() => { swallowClick = false; }, 400);
    try { navigator.vibrate?.(10); } catch { /* not supported */ }
    void (el.classList.contains('n-boss') ? actions.bossInfo(el) : actions.nodeInfo(el));
  }, 450) };
});
const dropHold = (e: PointerEvent) => { if (hold && (e.type !== 'pointermove' || Math.hypot(e.clientX - hold.x, e.clientY - hold.y) > 10)) { clearTimeout(hold.t); hold = null; } };
window.addEventListener('pointerup', dropHold);
window.addEventListener('pointercancel', dropHold);
window.addEventListener('pointermove', dropHold, { passive: true });
root.addEventListener('contextmenu', (e) => { if ((e.target as HTMLElement).closest('.node')) e.preventDefault(); });

window.addEventListener('pointermove', (e) => {
  if (!drag) return;
  const dx = e.clientX - drag.sx;
  const dy = e.clientY - drag.sy;
  if (!drag.active) {
    if (Math.hypot(dx, dy) < 14) return;
    const cb = combat();
    const c = cb?.s.hand.find((x) => x.uid === drag!.uid);
    if (!cb || !c) { drag = null; return; }
    drag.active = true;
    const r = drag.el.getBoundingClientRect();
    drag.ox = r.left + r.width / 2; drag.oy = r.top + r.height / 2;
    const needsTarget = !!CARDS[c.id].target;
    if (needsTarget) {
      drag.arrow = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      drag.arrow.setAttribute('class', 'arrow');
      drag.arrow.innerHTML = '<defs><marker id="ah" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#e8b04a"/></marker></defs><path class="aline" d="" marker-end="url(#ah)"/>';
      fx.appendChild(drag.arrow);
      drag.el.classList.add('aiming');
    } else {
      drag.ghost = drag.el.cloneNode(true) as HTMLElement;
      drag.ghost.classList.add('dragghost');
      drag.ghost.style.cssText = `left:${r.left}px;top:${r.top}px;width:${r.width}px;height:${r.height}px`;
      fx.appendChild(drag.ghost);
      drag.el.classList.add('dragging');
    }
  }
  const hand = root.querySelector('.hand')!.getBoundingClientRect();
  if (drag.ghost) {
    drag.ghost.style.transform = `translate(${dx}px,${dy}px) rotate(${Math.max(-12, Math.min(12, dx / 10))}deg)`;
    drag.ghost.classList.toggle('armed', e.clientY < hand.top - 30);
  }
  if (drag.arrow) {
    const mx = (drag.ox + e.clientX) / 2;
    const my = Math.min(drag.oy, e.clientY) - 60;
    drag.arrow.querySelector('.aline')!.setAttribute('d', `M${drag.ox},${drag.oy - 40} Q${mx},${my} ${e.clientX},${e.clientY}`);
    const under = document.elementFromPoint(e.clientX, e.clientY)?.closest<HTMLElement>('.enemy:not(.dead)');
    root.querySelectorAll('.enemy.dropT').forEach((x) => x.classList.remove('dropT'));
    drag.target = under ? Number(under.dataset.i) : null;
    under?.classList.add('dropT');
  }
}, { passive: true });

window.addEventListener('pointerup', (e) => {
  const d = drag;
  drag = null;
  if (!d || !d.active) return;
  swallowClick = true;
  setTimeout(() => { swallowClick = false; }, 50);
  d.ghost?.remove();
  d.arrow?.remove();
  d.el.classList.remove('dragging', 'aiming');
  root.querySelectorAll('.enemy.dropT').forEach((x) => x.classList.remove('dropT'));
  const cb = combat();
  const c = cb?.s.hand.find((x) => x.uid === d.uid);
  if (!cb || !c) return;
  const hand = root.querySelector('.hand')!.getBoundingClientRect();
  const needsTarget = !!CARDS[c.id].target;
  const single = cb.alive().length === 1;
  const above = e.clientY < hand.top - 30;
  let target: number | undefined;
  if (needsTarget) {
    if (d.target !== null) target = d.target;
    else if (single && above) target = cb.s.enemies.findIndex((x) => !x.dead);
    else return;
  } else if (!above) return;
  if (!cb.canPlay(c)) { toast(CARDS[c.id].unplayable ? 'This card cannot be played.' : 'Not enough energy', 'warn'); return; }
  app.sel = d.uid;
  if (!app.profile.settings.reduceMotion) burst(d.target !== null ? root.querySelector(`.enemy[data-who="${d.target}"]`)! : root.querySelector('.enemies')!, 8, '#e8b04a');
  audio.sfx(CARDS[c.id].type === 'reaction' ? 'trap' : 'card');
  void (async () => {
    app.busy = true;
    await runAction(cb, () => { cb.play(d.uid, target); });
    app.busy = false; app.sel = null;
    await afterAction(cb);
  })();
});

root.addEventListener('click', (e) => {
  if (swallowClick) { e.stopPropagation(); return; }
  const el = (e.target as HTMLElement).closest<HTMLElement>('[data-a]');
  if (!el) return;
  const a = el.dataset.a!;
  if (a === 'noop') { e.stopPropagation(); return; }
  if (el.tagName === 'INPUT' || el.tagName === 'SELECT') return;
  e.stopPropagation();
  if ((el as HTMLButtonElement).disabled) return;
  if (el.tagName === 'BUTTON' && !QUIET_CLICK.has(a)) audio.sfx('click');
  void actions[a]?.(el);
});
// v0.10: keyboard play for the browser version: Esc backs out of popups and selections, E ends the turn, 1-9 pick a card in hand.
document.addEventListener('keydown', (e) => {
  if (e.metaKey || e.ctrlKey || e.altKey || (e.target as HTMLElement).closest?.('input, select, textarea')) return;
  if (e.key === 'Escape') {
    if (app.modal && !app.confirmFn) { void actions.closeModal(document.body); return; }
    if (app.modal && app.confirmFn) { app.modal = null; app.confirmFn = null; render(); return; }
    if (app.picker) { void actions.pickCancel(document.body); return; }
    if (app.sel !== null) { app.sel = null; render(); }
    return;
  }
  const s = app.view === 'run' && app.run?.screen === 'combat' ? app.run.combat : null;
  if (!s || s.phase !== 'player' || app.busy || app.modal || app.picker || app.counterAsk) return;
  if (e.key === 'e' || e.key === 'E') { void actions.endTurn(document.body); return; }
  const n = Number(e.key);
  if (n >= 1 && n <= 9 && s.hand[n - 1]) { const el = root.querySelector<HTMLElement>(`.hand .card[data-uid="${s.hand[n - 1].uid}"]`); if (el) void actions.card(el); }
});
root.addEventListener('change', (e) => {
  const el = e.target as HTMLElement;
  if (el.dataset.a) void actions[el.dataset.a]?.(el);
});

// Keep a run that was mid-combat consistent after a reload: an interrupted enemy phase resumes.
function resumeIfNeeded(): void {
  const cb = combat();
  if (cb && cb.s.phase === 'enemy') {
    for (let i = 0; i < cb.s.enemies.length; i++) if (cb.s.enemies[i].turn < cb.s.turn) cb.enemyAct(i);
    cb.endEnemyPhase();
    cb.flush();
  }
  if (cb && !app.run?.arena && (cb.s.phase === 'won' || cb.s.phase === 'lost')) { finishCombat(app.run!); if (app.run!.finished) { eco.finishRun(app.profile, app.run!); app.run = null; } }
  persist();
}

document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') persist(); });

function welcome(): void {
  if (app.profile.seen.welcome13) {
    // v0.14.1: the game was renamed from Riposte; tell returning players once.
    if (app.profile.seen.dawnwick || app.profile.runs === 0) return;
    app.profile.seen.dawnwick = true;
    modal(`<div class="big-emoji">🕯️</div><h2>Riposte is now Dawnwick</h2>
    <p>Same game, same saves, new name: <b>Dawnwick: The Last Word</b>, after the lamp at the Last Table that used to be Vesper's sun. Wick is its last ember.</p>
    <p>The chain has a proper name too: the <b>Answer Chain</b>. Counter cards you play into it are still Ripostes.</p>
    <button class="btn primary wide" data-a="closeModal">Light it</button>`);
    persist();
    return;
  }
  if (app.profile.seen.welcome12) {
    // v0.13: players who already saw v0.12 just hear about the music.
    app.profile.seen.welcome13 = true;
    modal(`<div class="big-emoji">🎵</div><h2>Dawnwick v0.13: Table Music</h2>
    <p>The game has a soundtrack now, all played live by the game itself.</p>
    <ul class="welcome">
      <li>🎼 <b>A theme for every act</b>, quiet on the map and fuller in fights, and a darker version for each boss</li>
      <li>🔔 <b>Sound effects</b> for cards, traps springing, your Counters, hits, the shop, the map and the end of a run</li>
      <li>⚙️ Music and effects each have an on/off switch and a volume in <b>Settings</b></li>
    </ul><button class="btn primary wide" data-a="closeModal">Sounds good</button>`);
    persist();
    return;
  }
  const had11 = !!app.profile.seen.welcome11;
  for (const k of ['dawnwick', 'welcome13', 'welcome12', 'welcome11', 'welcome10', 'welcome9', 'welcome8', 'welcome7', 'welcome6', 'welcome5', 'welcome4', 'welcome3', 'welcome']) app.profile.seen[k] = true;
  const fresh = app.profile.runs === 0;
  const packs = Object.values(app.profile.packs).reduce((a, b) => a + b, 0);
  // v0.10: new players get a short intro, not a changelog of versions they never saw.
  modal(`<div class="big-emoji">⚔⟲</div><h2>${fresh ? 'Welcome to Dawnwick' : 'Dawnwick v0.12'}</h2>
    ${fresh ? `<p>A roguelike card game where every move has an answer.</p>
    <ul class="welcome">
      <li>🂠 <b>Enemies set face-down traps</b>. The glyph under them says what sets one off: ⚔ your attacks, ✋ your skills.</li>
      <li>⟲ <b>You set Reactions</b> the same way. When cards answer each other they form an <b>Answer Chain</b> that resolves last-in, first-out.</li>
      <li>🗺 <b>Climb three acts</b>. Lose and you keep your XP, Coins and cards; every level unlocks more classes.</li>
    </ul>` : `<p>Your progress carried over. v0.12 "Fewer, Better" is a quality pass: 459 cards that played like another card, or rarely did anything, are gone, and every reward is a real choice.</p>
    <ul class="welcome">
      <li>✂️ <b>2,049 collectible cards</b> (from 2,508). If you owned a cut card that played like another one, you now own that card instead; the rest refunded Dust</li>
      <li>🎴 <b>Better card rewards</b>: never two cards that play the same way, never three of one type, and the last card leans toward what your deck already does</li>
      <li>🛒 <b>A Merchant every act</b> you can route to, so your gold has somewhere to go</li>
      <li>⚔️ <b>Sharper fights</b>: bosses have less HP and hit harder (about 9 turns instead of 11), and Act 1 hallway enemies bite a little</li>
      <li>🎵 <b>Music and sound</b> (v0.13): a theme per act, boss music and sound effects; switch them in Settings</li>
    </ul>${had11 ? '' : '<p class="muted">Also since your last visit: v0.11 added two upgrade paths, Evolve cards, hybrids and the story.</p>'}`}
    ${fresh ? `<button class="btn primary wide" data-a="newRun">Pick a class and play</button>${packs ? `<button class="btn wide" data-a="hub" data-v="store">Open my ${packs} free pack${packs > 1 ? 's' : ''} first</button>` : ''}`
      : packs ? `<p>You have <b>${app.profile.coins} Coins</b> and <b>${packs} pack${packs > 1 ? 's' : ''}</b> waiting.</p>
    <button class="btn primary wide" data-a="hub" data-v="store">Open my packs</button>` : ''}`);
  persist();
}

applySettings();
resumeIfNeeded();
render();
welcome();
// Expose for debugging in the browser console.
(window as unknown as Record<string, unknown>).__riposte = { app, runScore, vals, eco, artIcon, render, run: { travel, finishCombat } };
