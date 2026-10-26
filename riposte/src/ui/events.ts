// The Events tab: the free Season track, the Weekly Gauntlet, the Arena (async PvP) and deck codes.
// Also the Vows panel used on the character select screen.
import type { CharId } from '../engine/types';
import { app, ui } from './state';
import { hubShell } from './hub';
import * as eco from '../engine/economy';
import * as arena from '../engine/arena';
import { levelOf, unlockedChars, weekKey, weeklySetup } from '../engine/meta';
import { CARDS } from '../data/cards';
import { CHARACTERS, CHAR_LIST } from '../data/characters';
import { SEASON, SEASON_TRACK, COSMETIC_MAP } from '../data/season';
import { VOWS, VOW_MAP, TWIST_MAP, MAX_HEAT, HEAT_MILESTONES, heatOf } from '../data/vows';
import { PACKS } from '../data/packs';
import { cardHtml, esc } from './render';
import { PUZZLES, PUZZLE_REWARD } from '../data/puzzles';

const p = () => app.profile;

function tierIcon(r: (typeof SEASON_TRACK)[number]): string {
  if (r.card) return '🌟';
  if (r.cosmetic) return COSMETIC_MAP[r.cosmetic].icon;
  if (r.pack) return PACKS[r.pack].icon;
  if (r.dust) return '✨';
  return '🪙';
}

export function eventsBadge(): boolean {
  const pr = p();
  const wk = pr.weekly[weekKey()];
  return eco.seasonTier(pr) > pr.season.claimed || (!!wk && !wk.claimed) || pr.arena?.stage === 'done';
}

function seasonCard(): string {
  const pr = p();
  const tier = eco.seasonTier(pr);
  const into = pr.season.renown - tier * SEASON.tierRenown;
  const pct = tier >= SEASON.tiers ? 100 : Math.round((into / SEASON.tierRenown) * 100);
  const claimable = tier - pr.season.claimed;
  return `<section class="evcard season">
    <div class="evhead"><span class="evicon">🎭</span><div><b>${esc(SEASON.name)}</b><small>Free track · ends ${esc(SEASON.ends)} · every run earns Renown</small></div></div>
    <div class="tierline"><b>Tier ${tier}</b><small class="ofn"> of ${SEASON.tiers}</small><span class="xpbar"><span style="width:${pct}%"></span></span><small>${tier >= SEASON.tiers ? 'complete' : `${into}/${SEASON.tierRenown} Renown`}</small></div>
    <div class="track">${SEASON_TRACK.map((r, i) => `<div class="tier ${i < pr.season.claimed ? 'claimed' : i < tier ? 'ready' : ''} ${(i + 1) % 5 === 0 ? 'hl' : ''}" title="${esc(eco.rewardText(r))}"><span>${tierIcon(r)}</span><small>${i + 1}</small></div>`).join('')}</div>
    ${claimable > 0 ? `<button class="btn primary wide" data-a="claimSeason">Claim ${claimable} reward${claimable > 1 ? 's' : ''}</button>`
      : `<p class="muted small">Next: ${esc(eco.rewardText(SEASON_TRACK[Math.min(SEASON.tiers - 1, tier)]))}</p>`}
  </section>`;
}

function weeklyCard(): string {
  const pr = p();
  const key = weekKey();
  const w = weeklySetup(key);
  const tw = TWIST_MAP[w.twist];
  const rec = pr.weekly[key];
  const heat = heatOf(w.vows);
  return `<section class="evcard weekly">
    <div class="evhead"><span class="evicon">🗓</span><div><b>Weekly Gauntlet · ${esc(key)}</b><small>Same seed for everyone this week. Talents and loadouts off.</small></div></div>
    <p><b>${CHARACTERS[w.character].icon} ${esc(CHARACTERS[w.character].name)}</b> · 🔥 Wager ${heat}</p>
    <p class="kw"><b>${tw.icon} ${esc(tw.name)}</b> ${esc(tw.text)}</p>
    ${Object.keys(w.vows).map((id) => `<p class="kw small">${VOW_MAP[id].icon} <b>${esc(VOW_MAP[id].name)}</b> ${esc(VOW_MAP[id].text(1))}</p>`).join('')}
    ${rec ? `<p>Your best: <b>${rec.score}</b> pts · floor ${rec.floor}${rec.won ? ' · 🏆' : ''}</p>` : ''}
    <div class="row2">
      <button class="btn primary" data-a="startWeekly">${rec ? 'Try again' : 'Start Gauntlet'}</button>
      ${rec && !rec.claimed ? `<button class="btn" data-a="claimWeekly">Claim: 🪙${eco.weeklyReward(rec).coins} + ${esc(PACKS[eco.weeklyReward(rec).pack].name)}</button>` : rec?.claimed ? '<span class="pill">Reward claimed ✓</span>' : `<small class="muted">Reward: 🪙50 + 6/floor, pack; win for a Legend Pack</small>`}
    </div>
  </section>`;
}

function arenaCard(): string {
  const pr = p();
  const a = pr.arena;
  const head = `<div class="evhead"><span class="evicon">🏟</span><div><b>The Arena</b><small>Draft a deck, then duel other duelists' saved decks. ${arena.ARENA_WINS} wins or ${arena.ARENA_LOSSES} losses. Best: ${pr.arenaBest} wins.</small></div></div>`;
  if (!a) {
    const chars = unlockedChars(pr);
    if (!chars.includes(app.arenaChar)) app.arenaChar = 'duelist';
    return `<section class="evcard arena">${head}
      <div class="charlist mini">${CHAR_LIST.filter((c) => chars.includes(c.id)).map((c) => `<button class="charcard ${c.id === app.arenaChar ? 'sel' : ''}" data-a="arenaChar" data-id="${c.id}"><span class="charicon">${c.icon}</span><b>${esc(c.name.replace(/^The /, ''))}</b></button>`).join('')}</div>
      <p class="muted small">${esc(CHARACTERS[app.arenaChar].name)}: you start with 6 cards and draft 10 more (1 of 3 each). Every duel is 60 HP vs a rival deck that gets stronger as you win. Beat a rival to steal one of their cards.</p>
      <p class="muted small">Rewards: 🪙 40 + 30 per win, ✨ 15 per win, a pack at 3 wins, a Legend Pack and a title at 7.</p>
      <button class="btn primary wide" data-a="arenaStart">Enter the Arena</button>
    </section>`;
  }
  const rec = `<div class="arenarec">${Array.from({ length: arena.ARENA_WINS }, (_, i) => `<i class="w ${i < a.wins ? 'on' : ''}">★</i>`).join('')}<span></span>${Array.from({ length: arena.ARENA_LOSSES }, (_, i) => `<i class="l ${i < a.losses ? 'on' : ''}">✖</i>`).join('')}</div>`;
  let body = '';
  if (a.stage === 'draft') {
    body = `<p><b>Draft pick ${a.pickNo + 1}/${arena.ARENA_PICKS}</b> · ${CHARACTERS[a.character].icon} deck ${a.deck.length} cards</p>
      <div class="cardrow">${a.picks[a.pickNo].map((id, i) => cardHtml({ id, up: false, mod: pr.imprints[id] }, { act: 'arenaPick', data: `data-i="${i}"` })).join('')}</div>
      <p class="muted small">Tap a card to add it to your Arena deck.</p>`;
  } else if (a.stage === 'ready' || a.stage === 'pick') {
    const rv = a.rival;
    body = `${a.stage === 'pick' && a.spoils ? `<div class="spoils"><p><b>Rival's Pick:</b> take one card from the deck you just beat.</p>
        <div class="cardrow">${a.spoils.map((id, i) => `<div class="spoil" role="button" tabindex="0" data-a="arenaSpoil" data-i="${i}">${cardHtml({ id, up: false }).replace(/^<button/, '<div').replace(/<\/button>\s*$/, '</div>')}</div>`).join('')}</div>
        <button class="btn ghost small" data-a="arenaSpoil" data-i="-1">Skip</button></div>`
      : rv ? `<div class="rival"><span class="rivava">🤺</span><div><b>${esc(rv.label)}</b><small>${esc(rv.title)} tier · ${rv.cards.length} cards · ${56 + 9 * a.wins} HP</small>
          <div class="decklist">${rv.cards.slice(0, 5).map((c) => { const id = c.split('+')[0]; return CARDS[id] ? `<span class="mini f-${CARDS[id].faction}">${esc(CARDS[id].name)}</span>` : ''; }).join('')}<span class="mini">+${Math.max(0, rv.cards.length - 5)} more</span></div></div></div>
        ${a.duel ? '<button class="btn primary wide" data-a="arenaResume">Resume duel</button>' : '<button class="btn primary wide" data-a="arenaDuel">⚔ Duel!</button>'}` : ''}
      <button class="btn ghost small" data-a="arenaDeck">View my deck (${a.deck.length})</button>
      <button class="btn ghost small" data-a="arenaRetire">Retire & claim</button>`;
  } else {
    const rw = arena.arenaRewards(a.wins);
    body = `<p class="big-emoji">${a.wins >= 7 ? '🏆' : a.wins >= 3 ? '🥈' : '🎗'}</p><p class="center"><b>${a.wins} wins</b> · ${a.losses} losses</p>
      <p class="center">🪙 ${rw.coins} · ✨ ${rw.dust}${rw.pack ? ` · ${esc(PACKS[rw.pack].name)}` : ''}${rw.title ? ` · title “${esc(COSMETIC_MAP[rw.title].name)}”` : ''}</p>
      <button class="btn primary wide" data-a="arenaClaim">Claim rewards</button>`;
  }
  return `<section class="evcard arena">${head}${rec}${body}</section>`;
}

function codesCard(): string {
  const pr = p();
  return `<section class="evcard codes">
    <div class="evhead"><span class="evicon">🔗</span><div><b>Deck codes</b><small>Share a Legacy deck as text. A friend imports it and fights it as an Echo rival and an Arena rival.</small></div></div>
    ${pr.legacy.length ? pr.legacy.slice(0, 6).map((l) => `<div class="coderow"><span><b>${esc(l.label)}</b> <small>${CHARACTERS[l.character].icon} ${l.cards.length} cards</small></span><button class="btn small" data-a="copyCode" data-id="${esc(l.id)}">Copy code</button></div>`).join('')
      : '<p class="muted small">Mint a Legacy deck at the end of a run (beat an act boss) to get a shareable code.</p>'}
    <div class="importrow"><input id="codein" class="codein" placeholder="Paste a RIP1. code" autocomplete="off" spellcheck="false"><button class="btn small primary" data-a="importCode">Import</button></div>
    ${pr.rivals.length ? `<p class="muted small">Imported rivals:</p>${pr.rivals.map((r, i) => `<div class="coderow"><span>${CHARACTERS[r.character].icon} ${esc(r.label)} <small>${r.cards.length} cards</small></span><button class="btn ghost small" data-a="dropRival" data-i="${i}">Remove</button></div>`).join('')}` : ''}
  </section>`;
}

function riddlesCard(): string {
  const pr = p();
  const chars = unlockedChars(pr);
  const solved = PUZZLES.filter((z) => pr.puzzles[z.id]).length;
  return `<section class="evcard riddles">
    <div class="evhead"><span class="evicon">🧩</span><div><b>Riddles of the Chain</b><small>One-turn puzzles. Every trap is face-up and nothing is random. Solved ${solved}/${PUZZLES.length}.</small></div></div>
    <div class="riddlelist">${PUZZLES.map((z) => {
      const ok = chars.includes(z.character);
      const done = pr.puzzles[z.id];
      return `<button class="riddle ${done ? 'done' : ''}" data-a="startPuzzle" data-id="${z.id}" ${ok ? '' : 'disabled'}>
        <span class="rch">${CHARACTERS[z.character].icon}</span><span class="rname"><b>${esc(z.name)}</b><small>${'★'.repeat(z.tier)} · ${z.goal === 'win' ? 'Win this turn' : 'Survive'}${ok ? '' : ` · unlock ${esc(CHARACTERS[z.character].name)}`}</small></span>
        <span class="rstate">${done ? `✓ <small>${done} cards</small>` : `🪙${PUZZLE_REWARD[z.tier]}`}</span></button>`;
    }).join('')}</div>
  </section>`;
}

export function viewEvents(): string {
  return hubShell('events', `<div class="scroll">${seasonCard()}${riddlesCard()}${arenaCard()}${weeklyCard()}${codesCard()}</div>`);
}

// ───────── vows (character select) ─────────

export function vowsUnlocked(): boolean { return (p().counters.bosses ?? 0) >= 1; }

export function vowsPanel(): string {
  const pr = p();
  if (!vowsUnlocked()) return '<div class="vows locked"><b>🔥 Vows</b> <small>Beat any act boss to unlock Vows: stack your own difficulty modifiers for more score, Coins and Renown.</small></div>';
  const heat = heatOf(pr.vows);
  const best = pr.heatWins[app.charPick] ?? 0;
  const next = HEAT_MILESTONES.find((m) => m > best);
  return `<div class="vows">
    <div class="vowhead"><b>🔥 Wager ${heat}</b><small>/${MAX_HEAT} · score ×${(1 + 0.1 * heat).toFixed(1)} · Coins +${5 * heat}% · best win ${best}${next ? ` · next bonus at ${next}` : ''}</small>
      ${heat ? '<button class="link" data-a="vowsClear">clear</button>' : ''}</div>
    ${VOWS.map((v) => {
      const r = pr.vows[v.id] ?? 0;
      return `<div class="vow ${r ? 'on' : ''}"><span class="vicon">${v.icon}</span><span class="vbody"><b>${esc(v.name)}</b> <small>+${v.heat}🔥/rank</small><br><small>${esc(v.text(Math.max(1, r)))}</small></span>
        <span class="vctl"><button class="icon-btn small" data-a="vow" data-id="${v.id}" data-d="-1" ${r ? '' : 'disabled'} aria-label="Lower">−</button><b>${r}/${v.max}</b><button class="icon-btn small" data-a="vow" data-id="${v.id}" data-d="1" ${r < v.max ? '' : 'disabled'} aria-label="Raise">+</button></span></div>`;
    }).join('')}
  </div>`;
}

// ───────── actions ─────────

type H = (el: HTMLElement) => void;
const refresh = () => { ui.persist(); ui.render(); };

export const eventActions: Record<string, H> = {
  claimSeason: () => {
    const got = eco.claimSeason(p());
    if (got.length) ui.toast(`🎭 Season rewards: ${got.map((r) => esc(eco.rewardText(r))).join(' · ')}`, 'good');
    eco.checkAchievements(p());
    refresh();
  },
  claimWeekly: () => {
    const rw = eco.claimWeekly(p(), weekKey());
    if (rw) ui.toast(`🗓 +🪙${rw.coins} and a ${esc(PACKS[rw.pack].name)}`, 'good');
    refresh();
  },
  arenaChar: (el) => { app.arenaChar = el.dataset.id as CharId; ui.render(); },
  arenaStart: () => {
    if (!unlockedChars(p()).includes(app.arenaChar)) return;
    arena.arenaStart(p(), app.arenaChar);
    refresh();
  },
  arenaPick: (el) => { if (arena.arenaPick(p(), Number(el.dataset.i))) refresh(); },
  arenaSpoil: (el) => {
    const i = Number(el.dataset.i);
    const id = i >= 0 ? p().arena?.spoils?.[i] : null;
    if (arena.arenaSpoil(p(), i >= 0 ? i : null) && id) ui.toast(`Stole ${esc(CARDS[id].name)} for your Arena deck`, 'good');
    refresh();
  },
  arenaDeck: () => {
    const a = p().arena;
    if (!a) return;
    ui.modal(`<h2>Arena deck (${a.deck.length})</h2><div class="cardgrid">${[...a.deck].sort().map((c) => { const [id, up] = c.split('+'); return cardHtml({ id, up: up === '1' }); }).join('')}</div>`);
  },
  arenaRetire: () => ui.ask('Retire this Arena run and claim rewards for your wins so far?', 'Retire', () => { const rw = arena.arenaClaim(p()); if (rw) ui.toast(`🏟 +🪙${rw.coins} ✨${rw.dust}`, 'good'); eco.checkAchievements(p()); }),
  arenaClaim: () => {
    const rw = arena.arenaClaim(p());
    if (rw) ui.toast(`🏟 +🪙${rw.coins} ✨${rw.dust}${rw.pack ? ` + ${esc(PACKS[rw.pack].name)}` : ''}`, 'good');
    eco.checkAchievements(p());
    refresh();
  },
  copyCode: (el) => {
    const l = p().legacy.find((x) => x.id === el.dataset.id);
    if (!l) return;
    const code = arena.encodeDeck(l.label, l.character, l.cards);
    const done = () => ui.toast('Deck code copied', 'good');
    try { void navigator.clipboard.writeText(code).then(done, () => ui.modal(`<h2>Deck code</h2><textarea class="codebox" readonly>${esc(code)}</textarea>`)); }
    catch { ui.modal(`<h2>Deck code</h2><textarea class="codebox" readonly>${esc(code)}</textarea>`); }
  },
  importCode: () => {
    const el = document.getElementById('codein') as HTMLInputElement | null;
    const code = el?.value ?? '';
    if (arena.importRival(p(), code)) { ui.toast('Rival deck imported. It can now appear as an Echo and in the Arena.', 'good'); refresh(); }
    else ui.toast('That is not a valid RIP1 deck code.', 'warn');
  },
  dropRival: (el) => { p().rivals.splice(Number(el.dataset.i), 1); refresh(); },
  vow: (el) => {
    const v = VOW_MAP[el.dataset.id!];
    const pr = p();
    const r = Math.max(0, Math.min(v.max, (pr.vows[v.id] ?? 0) + Number(el.dataset.d)));
    if (r) pr.vows[v.id] = r; else delete pr.vows[v.id];
    refresh();
  },
  vowsClear: () => { p().vows = {}; refresh(); },
};

export { levelOf };
