// Hub screens between runs: Play, Cards (collection + loadouts), Shop (packs + market), Forge, Profile.
import * as story from './story';
import type { CharId, ModId, Element } from '../engine/types';
import { ELEMENT_LIST, elemIcon, printedElement } from '../data/elements';
import { app, ui, type View } from './state';
import { LEVELS, UNLOCKS, dailySetup, levelOf, todayKey, unlockedChars } from '../engine/meta';
import * as eco from '../engine/economy';
import { CARDS, COLLECTIBLE } from '../data/cards';
import { CHARACTERS, CHAR_LIST } from '../data/characters';
import { RELIC_LIST, RELICS } from '../data/relics';
import { DAILY_MODS } from '../engine/run';
import { PACKS, PACK_LIST, CRAFT, PITY } from '../data/packs';
import { MODS, MOD_LIST } from '../data/mods';
import { TALENTS, SCHOOLS, type School } from '../data/talents';
import { ACHIEVEMENTS } from '../data/achievements';
import { cardText } from '../engine/combat';
import { packSvg } from './art';
import * as audio from './audio';
import { FACTION_GLYPH, FACTION_NAME, RARITY_NAME, cardHtml, esc, keywordList, relicRow, upgradeLines } from './render';
import { eventsBadge, vowsPanel } from './events';
import { ENEMIES } from '../data/enemies';
import { COSMETICS, COSMETIC_MAP, MASTERY, MASTERY_NAMES, SEASON_TRACK, masteryLevel } from '../data/season';
import { heatOf } from '../data/vows';

const p = () => app.profile;

// ───────── shell ─────────

export function currencyBar(): string {
  const pr = p();
  const packs = Object.values(pr.packs).reduce((a, b) => a + b, 0);
  const lvl = levelOf(pr.xp);
  return `<div class="wallet">
    <button class="coin" data-a="explain" data-k="coins" aria-label="${pr.coins} Coins">🪙 <b>${pr.coins}</b></button>
    <button class="coin dust" data-a="explain" data-k="dust" aria-label="${pr.dust} Dust">✨ <b>${pr.dust}</b></button>
    <button class="coin" data-a="hub" data-v="store" aria-label="${packs} unopened packs">🎁 <b>${packs}</b></button>
    <button class="coin lvl" data-a="hub" data-v="profile" aria-label="Level ${lvl}">Lv <b>${lvl}</b>${eco.talentPoints(pr).free > 0 ? '<i class="dot"></i>' : ''}</button>
  </div>`;
}

const NAV: [View, string, string][] = [
  ['title', '⚔', 'Play'], ['collection', '🂠', 'Cards'], ['store', '🎁', 'Packs'], ['forge', '⚒', 'Forge'], ['events', '🏟', 'Events'], ['profile', '👤', 'Profile'],
];

function badge(v: View): boolean {
  const pr = p();
  if (v === 'store') return eco.giftReady(pr) || Object.values(pr.packs).some((n) => n > 0);
  if (v === 'profile') return eco.talentPoints(pr).free > 0 || (pr.quests?.list.some((q) => q.prog >= q.goal && !q.claimed) ?? false);
  if (v === 'collection') return pr.newCards.length > 0;
  if (v === 'events') return eventsBadge();
  return false;
}

export function hubShell(view: View, body: string, cls = ''): string {
  return `<div class="screen hub ${cls}">
    ${currencyBar()}
    <div class="hubbody">${body}</div>
    <nav class="bottomnav">${NAV.map(([v, i, l]) => `<button class="${v === view ? 'on' : ''}" data-a="hub" data-v="${v}"><span>${i}</span>${l}${badge(v) ? '<i class="dot"></i>' : ''}</button>`).join('')}</nav>
  </div>`;
}

// ───────── play (title) ─────────

export function viewTitle(): string {
  const pr = p();
  const lvl = levelOf(pr.xp);
  const next = LEVELS[lvl] ?? null;
  const prev = LEVELS[lvl - 1] ?? 0;
  const pct = next ? Math.round(((pr.xp - prev) / (next - prev)) * 100) : 100;
  const day = todayKey();
  const daily = dailySetup(day);
  const best = pr.daily[day];
  const q = eco.quests(pr);
  const embers = Array.from({ length: 14 }, (_, i) => `<i style="--x:${(i * 37) % 100}%;--d:${4 + (i % 5)}s;--delay:${(i * 0.7) % 5}s"></i>`).join('');
  return hubShell('title', `<div class="title">
    <div class="embers" aria-hidden="true">${embers}</div>
    <div class="logo"><div class="logo-mark"><span>⚔</span><span>⟲</span></div><h1>DAWNWICK</h1><p class="sub">The Last Word</p><p class="tag">Every move has an answer.</p></div>
    <div class="menu">
      ${app.run ? `<button class="btn primary" data-a="continue">Continue run<small>${esc(CHARACTERS[app.run.character].name)} · Act ${app.run.act} · ${app.run.floor ? `Floor ${app.run.floor}` : 'start'} · ❤ ${app.run.hp}/${app.run.maxHp}</small></button>` : ''}
      <button class="btn ${app.run ? '' : 'primary'} big-cta" data-a="newRun">New run</button>
      <button class="btn" data-a="daily">Daily Duel<small>${esc(CHARACTERS[daily.character].name)} · ${esc(DAILY_MODS[daily.mod].split(':')[0])}${best ? ` · best ${best.score}` : ''}</small></button>
      <button class="btn storybtn" data-a="storyBook">📖 The Story So Far${story.unreadCount() ? '<i class="dot"></i>' : ''}<small>${story.bookProgress()}</small></button>
    </div>
    ${echoHall(pr)}
    <div class="questcard" data-a="hub" data-v="profile" data-t="quests">
      <div class="qhead"><b>Daily quests</b><small>${q.list.filter((x) => x.claimed).length}/3 claimed</small></div>
      ${q.list.map((x) => `<div class="qrow ${x.claimed ? 'done' : ''}"><span>${esc(x.text)}</span><span class="qbar"><i style="width:${Math.round((x.prog / x.goal) * 100)}%"></i></span><small>${x.claimed ? '✓' : x.prog >= x.goal ? '<b class="claimme">Claim</b>' : `🪙${x.reward}`}</small></div>`).join('')}
    </div>
    <div class="profile">
      <div>Level ${lvl}${next ? ` · ${pr.xp - prev}/${next - prev} XP` : ' · max'}</div>
      <div class="xpbar"><div style="width:${pct}%"></div></div>
      ${UNLOCKS[lvl + 1] ? `<small>Level ${lvl + 1} unlocks: ${esc(UNLOCKS[lvl + 1])}</small>` : '<small>Each level: +1 talent point, 50 Coins and a Duelist Pack</small>'}
    </div>
  </div>`, 'h-title');
}

/**
 * v0.14: the Echo Gallery, up front. Your minted decks come back as Rivals that play your own cards against you;
 * it is the most personal system in the game, so the title screen names it.
 */
function echoHall(pr: ReturnType<typeof p>): string {
  const es = pr.echoStats ?? { met: 0, youBeat: 0, beatYou: 0 };
  const decks = pr.legacy ?? [];
  const next = pr.runs === 1 && pr.lastDeck ? '<small>Next run: the first Rival you meet is your own last deck.</small>' : '';
  if (!decks.length && !es.met) return `<div class="echohall" data-a="hub" data-v="collection" data-t="legacy"><b>🪞 The Echo Gallery</b>
    <small>Every deck you mint sits back down as a Rival that plays your own cards against you.</small>${next}</div>`;
  return `<div class="echohall" data-a="hub" data-v="collection" data-t="legacy"><b>🪞 The Echo Gallery</b>
    <small>${decks.length} deck${decks.length === 1 ? '' : 's'} in the hall · you met Echoes ${es.met} time${es.met === 1 ? '' : 's'}: you won ${es.youBeat}, they beat you ${es.beatYou}.</small>${next}
    ${decks.length ? `<div class="echolist">${decks.slice(-4).map((l) => `<span>${esc(l.label)}</span>`).join('')}</div>` : ''}</div>`;
}

// ───────── character select ─────────

export function viewChars(): string {
  const pr = p();
  const lvl = levelOf(pr.xp);
  const unlocked = unlockedChars(pr);
  const ch = CHARACTERS[app.charPick];
  const maxAsc = pr.ascension[app.charPick] ?? 0;
  const b = eco.metaBonus(pr);
  const deck = eco.loadout(pr, app.charPick);
  const swaps = eco.swapsUsed(pr, app.charPick);
  return `<div class="screen chars">
    <header class="bar"><button class="icon-btn" data-a="go" data-v="title" aria-label="Back">←</button><h2>Choose a duelist</h2><span></span></header>
    <div class="charlist">
      ${[...CHAR_LIST].sort((a, b) => Number(!unlocked.includes(a.id)) - Number(!unlocked.includes(b.id)) || (unlocked.includes(a.id) ? 0 : a.unlock - b.unlock)).map((c) => {
        const ok = unlocked.includes(c.id);
        const w = pr.charWins[c.id] ?? 0;
        return `<button class="charcard ch-${c.id} ${app.charPick === c.id ? 'sel' : ''} ${ok ? '' : 'locked'}" data-a="${ok ? 'pickChar' : 'lockedChar'}" data-id="${c.id}" aria-label="${esc(c.name)}${ok ? '' : `, unlocks at level ${c.unlock}`}">
          <span class="charicon">${ok ? c.icon : '🔒'}</span>
          <b>${esc(c.name.replace(/^The /, ''))}</b>
          <small>${ok ? (w ? `🏆 ${w}` : `❤ ${c.hp}`) : `Level ${c.unlock}`}</small>
        </button>`;
      }).join('')}
    </div>
    <div class="charinfo">
      <h3 class="charname">${ch.icon} ${esc(ch.name)}</h3>
      <p class="charfac">${elemIcon(ch.element)} ${esc(ch.element[0].toUpperCase() + ch.element.slice(1))} · ${ch.factions.map((f) => `${FACTION_GLYPH[f]} ${FACTION_NAME[f]}`).join(' + ')}${(pr.charWins[ch.id] ?? 0) ? ` · 🏆 ${pr.charWins[ch.id]} wins` : ''}</p>
      <p>${esc(ch.pitch)}</p>
      <div class="stats">
        <span>❤ <b>${ch.hp + (b.maxHp ?? 0)}</b> HP${b.maxHp ? `<i>+${b.maxHp}</i>` : ''}</span>
        <span>⚡ <b>3</b> energy</span><span>🂠 <b>5</b> draw${b.drawFirst ? '<i>+1 T1</i>' : ''}</span>
        <span>⟲ <b>${app.charPick === 'hollow' ? 3 : 2}</b> slots</span>${app.charPick === 'sharp' ? '<span>☀ <b>Fate Coin</b></span>' : ''}${app.charPick === 'magpie' ? '<span>🫳 <b>Steals</b> traps</span>' : ''}${app.charPick === 'sexton' ? '<span>⚱ <b>Crypt</b> &amp; Exhume</span>' : ''}<span>💰 <b>${99 + (b.gold ?? 0)}</b></span>${b.block ? `<span>🛡 <b>${b.block}</b> start</span>` : ''}
      </div>
      ${relicRow(ch.relic)}
      <div class="loadhead"><b>Starting deck</b> <small>${swaps}/${eco.loadoutSlots(pr)} loadout swaps</small> <button class="link" data-a="editDeck" data-id="${ch.id}">edit</button></div>
      <div class="decklist">${[...new Set(deck)].map((id) => { const m = pr.imprints[id]; const n = deck.filter((x) => x === id).length; return `<span class="mini f-${CARDS[id].faction} ${ch.deck.includes(id) ? '' : 'swapped'}">${esc(CARDS[id].name)}${n > 1 ? ` ×${n}` : ''}${m ? ` ${MODS[m].icon}` : ''}</span>`; }).join('')}</div>
    </div>
    <div class="asc">
      <button class="icon-btn" data-a="asc" data-d="-1" aria-label="Lower stakes">−</button>
      <div><b>Stakes ${app.ascPick}</b><br><small>${esc(app.ascPick ? ascText(app.ascPick) : 'Standard run.')}</small>${app.ascPick >= maxAsc && maxAsc < 10 ? `<br><small class="muted">Win a run at Stakes ${maxAsc} with this class to unlock Stakes ${maxAsc + 1}.</small>` : ''}</div>
      <button class="icon-btn" data-a="asc" data-d="1" aria-label="Raise stakes" ${app.ascPick >= maxAsc ? 'disabled' : ''}>+</button>
    </div>
    ${vowsPanel()}
    <div class="startbar"><button class="btn primary wide" data-a="startRun">Begin run as ${esc(ch.name.replace(/^The /, ''))}${heatOf(pr.vows) ? ` · 🎲${heatOf(pr.vows)}` : ''}</button></div>
  </div>`;
}

let ascText = (_n: number) => '';
export function setAscText(fn: (n: number) => string): void { ascText = fn; }

// ───────── collection & loadouts ─────────

const FACTIONS = ['ember', 'tide', 'thorn', 'void', 'gilt', 'glass', 'grave', 'dawn', 'storm', 'rime', 'stone', 'aether', 'beast', 'dusk', 'neutral'];
const PAGE = 60;

/** v0.7: page buttons for long card lists. */
function pager(n: number, page: number, act: string): string {
  const pages = Math.ceil(n / PAGE);
  if (pages <= 1) return '';
  return `<div class="pager"><button class="chipbtn" data-a="${act}" data-p="${page - 1}" ${page <= 0 ? 'disabled' : ''}>‹ Prev</button><span>${page + 1} / ${pages}</span><button class="chipbtn" data-a="${act}" data-p="${page + 1}" ${page >= pages - 1 ? 'disabled' : ''}>Next ›</button></div>`;
}

export function viewCollection(): string {
  const pr = p();
  const tab = app.collTab;
  let body = '';
  if (tab === 'cards') {
    const own = Object.keys(pr.collection).length;
    const f = app.collFilter;
    // v0.10: two labelled dropdowns replace 26 glyph-only chips (▲◆●✦…) that nobody could read.
    const chips = `<button class="chipbtn ${f === 'all' ? 'on' : ''}" data-a="collFilter" data-f="all">All</button><button class="chipbtn ${f === 'owned' ? 'on' : ''}" data-a="collFilter" data-f="owned">Owned</button><button class="chipbtn ${f === 'legendary' ? 'on' : ''}" data-a="collFilter" data-f="legendary">🌟 Legendary</button>
      <select class="fsel ${FACTIONS.includes(f) ? 'on' : ''}" data-a="collFilterSel" aria-label="Faction"><option value="all">Any faction</option>${FACTIONS.map((x) => `<option value="${x}" ${f === x ? 'selected' : ''}>${FACTION_GLYPH[x]} ${FACTION_NAME[x]}</option>`).join('')}</select>`;
    const el = app.collElem;
    const elChips = `<select class="fsel ${el ? 'on' : ''}" data-a="collElemSel" aria-label="Element">${['', ...ELEMENT_LIST.map((x) => x.id), 'prism', 'none'].map((x) => `<option value="${x}" ${el === x ? 'selected' : ''}>${x === '' ? 'Any element' : x === 'none' ? '○ No element' : x === 'prism' ? `${elemIcon('prism' as Element)} Prism` : `${elemIcon(x as Element)} ${ELEMENT_LIST.find((d) => d.id === x)!.name}`}</option>`).join('')}</select>`;
    const all = COLLECTIBLE.filter((c) => (f === 'all' || f === 'owned' ? true : f === 'legendary' ? c.rarity === 'legendary' : c.faction === f)
      && (f !== 'owned' || pr.collection[c.id]) && (!el || printedElement(c) === el));
    const page = Math.min(app.collPage, Math.max(0, Math.ceil(all.length / PAGE) - 1));
    const list = all.slice(page * PAGE, page * PAGE + PAGE);
    body = `<p class="muted small">${own}/${COLLECTIBLE.length} collected. Tap a card to craft, dust or imprint it. Cards you own show up twice as often in runs; Legendaries only appear once owned.</p>
      <div class="chiprow">${chips}${elChips}</div>
      <p class="muted small">${all.length} card${all.length === 1 ? '' : 's'}</p>
      ${pager(all.length, page, 'collPage')}
      <div class="cardgrid">${list.map((c) => {
        const e = pr.collection[c.id];
        const unlocked = eco.isUnlocked(pr, c.id);
        if (!unlocked) return `<div class="card locked"><span class="cname">Locked</span><span class="ctext">Reach level ${c.unlock}</span></div>`;
        return cardHtml({ id: c.id, up: false, mod: pr.imprints[c.id], foil: (e?.foil ?? 0) > 0 }, { act: 'collCard', count: e?.n ?? 0, locked: !e, isNew: pr.newCards.includes(c.id) });
      }).join('')}</div>
      ${pager(all.length, page, 'collPage')}`;
  } else if (tab === 'decks') {
    body = deckBuilder();
  } else if (tab === 'relics') {
    // v0.10: 114 relics were one undivided list; they are now grouped by rarity with counts.
    const lvl = levelOf(pr.xp);
    const row = (r: (typeof RELIC_LIST)[number]) => {
      if ((r.unlock ?? 0) > lvl) return `<div class="relicrow locked">🔒 Reach level ${r.unlock}</div>`;
      if (r.ach && !eco.runUnlocks(pr).includes(r.id)) {
        const a = ACHIEVEMENTS.find((x) => x.reward.relic === r.id);
        return `<div class="relicrow locked">🔒 ${esc(r.name)}: achievement “${esc(a?.name ?? '')}”</div>`;
      }
      return relicRow(r.id);
    };
    const GROUPS: [string, string][] = [['starter', 'Class keepsakes'], ['common', 'Common'], ['uncommon', 'Uncommon'], ['rare', 'Rare'], ['boss', 'Boss'], ['shop', 'Shop'], ['blessing', 'Blessings']];
    body = `<p class="muted small">${RELIC_LIST.length} keepsakes. Keepsakes are found during runs; achievements unlock a few more.</p>` + GROUPS.map(([k, label]) => {
      const list = RELIC_LIST.filter((r) => r.rarity === k);
      return list.length ? `<h3>${label} <small class="muted">${list.length}</small></h3>${list.map(row).join('')}` : '';
    }).join('');
  } else if (tab === 'bestiary') {
    // v0.10: defeated enemies first, so a new player's handful isn't buried among 131 question marks.
    const seen = Object.values(ENEMIES).filter((e) => e.id !== 'echo_rival').sort((a, b) => Number(!pr.kills[a.id]) - Number(!pr.kills[b.id]));
    const known = seen.filter((e) => pr.kills[e.id]).length;
    body = `<p class="muted small">${known}/${seen.length} enemies defeated. Defeat an enemy once to read its file.</p><div class="bestiary">${seen.map((e) => {
      const k = pr.kills[e.id] ?? 0;
      return k ? `<button class="beast" data-a="beast" data-id="${e.id}"><span class="bicon">${e.icon}</span><b>${esc(e.name)}</b><small>×${k}</small></button>`
        : '<div class="beast unknown"><span class="bicon">❔</span><b>???</b></div>';
    }).join('')}</div>`;
  } else {
    body = pr.legacy.length ? pr.legacy.map((l) => `<div class="legacy">
        <div><b>${esc(l.label)}</b> <small>${esc(CHARACTERS[l.character].name)} · floor ${l.floor}${l.won ? ' · 🏆' : ''} · ${esc(l.date)}</small></div>
        <div class="decklist">${l.cards.map((code) => { const [id, up] = code.split('+'); return CARDS[id] ? `<span class="mini f-${CARDS[id].faction}">${esc(CARDS[id].name)}${up ? '+' : ''}</span>` : ''; }).join('')}</div>
        <button class="btn ghost small" data-a="delLegacy" data-id="${esc(l.id)}">Retire deck</button>
      </div>`).join('')
      : '<p class="muted">Beat an act boss, then mint your deck at the end of the run. Minted decks come back as Echo rivals you have to beat.</p>';
  }
  return hubShell('collection', `
    <nav class="tabs">${(['cards', 'decks', 'relics', 'legacy', 'bestiary'] as const).map((t) => `<button class="${t === tab ? 'on' : ''}" data-a="collTab" data-t="${t}">${{ cards: 'Cards', decks: 'Loadouts', relics: 'Keepsakes', legacy: 'Legacy', bestiary: 'Bestiary' }[t]}</button>`).join('')}</nav>
    <div class="scroll">${body}</div>`);
}

function deckBuilder(): string {
  const pr = p();
  const ch = app.deckChar;
  const def = CHARACTERS[ch].deck;
  const l = eco.loadout(pr, ch);
  const used = eco.swapsUsed(pr, ch);
  const slots = eco.loadoutSlots(pr);
  const unlocked = unlockedChars(pr);
  // v0.10: the same compact tiles as the class picker; locked classes are left out instead of shown disabled.
  return `<div class="charlist mini">${CHAR_LIST.filter((c) => unlocked.includes(c.id)).map((c) => `<button class="charcard ${c.id === ch ? 'sel' : ''}" data-a="deckChar" data-id="${c.id}"><span class="charicon">${c.icon}</span><b>${esc(c.name.replace(/^The /, ''))}</b></button>`).join('')}</div>
    <p class="muted small">Swap up to <b>${slots}</b> starter cards for cards you own from ${CHARACTERS[ch].factions.map((f) => FACTION_NAME[f]).join(' / ')} / Neutral, with at most <b>${eco.LOADOUT_STAR_CAP} Rare</b> (Legendaries can't be slotted: owning one adds it to your run drafts). More slots: <b>Signature Moves</b> talent. Daily Duels always use the default deck.</p>
    <div class="slotmeter">${Array.from({ length: slots }, (_, i) => `<i class="${i < used ? 'on' : ''}"></i>`).join('')}<span>${used}/${slots} swaps</span></div>
    <div class="cardgrid">${l.map((id, i) => cardHtml({ id, up: false, mod: pr.imprints[id], foil: (pr.collection[id]?.foil ?? 0) > 0 }, { act: 'deckSlot', data: `data-i="${i}"`, cls: id !== def[i] ? 'swapped' : 'starter' })).join('')}</div>
    <button class="btn ghost wide" data-a="deckReset">Reset to starter deck</button>`;
}

export function deckSlotPicker(i: number): string {
  const pr = p();
  const ch = app.deckChar;
  const def = CHARACTERS[ch].deck;
  const l = eco.loadout(pr, ch);
  const opts = eco.loadoutOptions(pr, ch);
  const can = eco.swapsUsed(pr, ch) < eco.loadoutSlots(pr) || l[i] !== def[i];
  return `<h2>Slot ${i + 1}: ${esc(CARDS[l[i]].name)}</h2>
    ${!can ? '<p class="warn">All loadout swaps are used. Reset a slot first, or earn more with the Signature Moves talent.</p>' : ''}
    <div class="cardgrid">
      ${cardHtml({ id: def[i], up: false, mod: pr.imprints[def[i]] }, { act: 'deckPut', data: `data-i="${i}" data-put=""`, cls: 'starter' })}
      ${can ? opts.map((id) => {
        const starFull = eco.isStar(id) && eco.starsUsed(l.map((x, j) => (j === i ? def[j] : x)), def) >= eco.LOADOUT_STAR_CAP;
        const avail = starFull ? 0 : eco.owned(pr, id) - l.filter((x, j) => x === id && j !== i).length;
        return cardHtml({ id, up: false, mod: pr.imprints[id] }, { act: avail > 0 ? 'deckPut' : 'noop', data: `data-i="${i}" data-put="${id}"`, count: Math.max(0, avail), dim: avail <= 0 });
      }).join('') : ''}
    </div>
    ${!opts.length ? '<p class="muted">You don\'t own any cards for this duelist yet. Open booster packs, buy singles in the Market, or keep souvenirs after runs.</p>' : ''}`;
}

export function collCardModal(id: string): string {
  const pr = p();
  const d = CARDS[id];
  const e = pr.collection[id];
  const mod = pr.imprints[id];
  return `<div class="center">${cardHtml({ id, up: false, mod, foil: (e?.foil ?? 0) > 0 }, { cls: 'big' })}</div>
    <p class="center muted">${RARITY_NAME[d.rarity]} · ${FACTION_NAME[d.faction]} · owned ${e?.n ?? 0}${e?.foil ? ` (${e.foil} foil)` : ''}</p>
    ${keywordList(cardText({ id, up: false, mod })).map(([k, t]) => `<p class="kw"><b>${k}</b> ${esc(t)}</p>`).join('')}
    ${upgradeLines(id)}
    ${mod ? `<p class="kw"><b>${MODS[mod].icon} ${MODS[mod].name}</b> ${esc(MODS[mod].text)}</p>` : ''}
    ${masteryLine(id)}
    <button class="btn primary wide" data-a="toForge" data-id="${id}">${e?.n ? '⚒ Imprint or dust in the Forge' : `⚒ Craft in the Forge<small>✨ ${eco.craftCost(id)} Dust · you have ${pr.dust}</small>`}</button>`;
}

export function masteryLine(id: string): string {
  const plays = p().mastery[id] ?? 0;
  const lvl = masteryLevel(plays);
  const next = MASTERY[lvl];
  return `<div class="mastery"><b>📜 Mastery ${lvl}${lvl ? ` · ${MASTERY_NAMES[lvl]} frame` : ''}</b>
    <span class="qbar"><i style="width:${next ? Math.round(((plays - (MASTERY[lvl - 1] ?? 0)) / (next - (MASTERY[lvl - 1] ?? 0))) * 100) : 100}%"></i></span>
    <small>${plays} plays${next ? ` · ${next - plays} to ${MASTERY_NAMES[lvl + 1]}` : ' · maxed: this card is Living'}. Each level pays Dust and upgrades the frame (cosmetic).</small></div>`;
}

// ───────── shop: packs & market ─────────

export function viewStore(): string {
  const pr = p();
  const m = eco.market(pr);
  const inv = Object.entries(pr.packs).filter(([, n]) => n > 0);
  return hubShell('store', `<div class="scroll">
    ${eco.giftReady(pr) ? `<button class="gift" data-a="gift"><span>🎁</span><b>Daily gift ready</b><small>Claim a free Duelist Pack</small></button>` : ''}
    ${inv.length ? `<h3>Your packs</h3><div class="packrow">${inv.map(([id, n]) => `<button class="pack" data-a="openPack" data-id="${id}" style="--hue:${PACKS[id].hue}">${packSvg(PACKS[id].hue, PACKS[id].icon, PACKS[id].name)}<span class="pcount">×${n}</span><b>Open</b></button>`).join('')}</div>` : ''}
    <h3>Booster packs</h3>
    <p class="muted small">Bought with Coins you earn in runs, quests and achievements. A Legendary is guaranteed within ${PITY} packs (${PITY - pr.pity} to go).</p>
    <div class="packgrid">${PACK_LIST.map((d) => `<div class="packoffer" style="--hue:${d.hue}">
      ${packSvg(d.hue, d.icon, d.name)}
      <div><b>${esc(d.name)}</b><small>${esc(d.blurb)}</small>
      <button class="btn small ${pr.coins >= d.price ? 'primary' : ''}" data-a="buyPack" data-id="${d.id}" ${pr.coins >= d.price ? '' : 'disabled'}>🪙 ${d.price}</button></div>
    </div>`).join('')}</div>
    <h3>Daily market <small class="muted">refreshes at midnight</small></h3>
    <div class="cardgrid">${m.items.map((it, i) => cardHtml({ id: it.id, up: false }, { act: it.sold ? 'noop' : 'buyMarket', data: `data-i="${i}"`, price: it.price, sold: it.sold, dim: !it.sold && pr.coins < it.price, cur: '🪙', count: pr.collection[it.id]?.n ?? 0 })).join('')}</div>
  </div>`);
}

export function viewPack(): string {
  const pk = app.pack!;
  const d = PACKS[pk.pack];
  if (pk.stage === 'sealed') {
    return `<div class="packstage sealed" style="--hue:${d.hue}">
      <div class="rays"></div>
      <button class="bigpack" data-a="tearPack" aria-label="Open ${esc(d.name)}">${packSvg(d.hue, d.icon, d.name)}</button>
      <p>Tap the pack to tear it open</p>
    </div>`;
  }
  const all = pk.flipped.every(Boolean);
  const pr = p();
  return `<div class="packstage open" style="--hue:${d.hue}">
    <div class="pulls n${pk.pulls.length}">${pk.pulls.map((pl, i) => `<div role="button" tabindex="0" class="pull r-${pl.rarity} ${pk.flipped[i] ? 'flipped' : ''} ${pk.shattered === i ? 'shattered' : ''} ${pk.gambleSel === i ? 'gsel' : ''}" data-a="${pk.flipped[i] ? (all && !pk.gambled && pl.rarity !== 'legendary' ? 'gambleSel' : 'noop') : 'flip'}" data-i="${i}" style="--i:${i}">
        <span class="back"><span class="backglyph">⚔⟲</span></span>
        <span class="front">${cardHtml({ id: pl.id, up: false, foil: pl.foil }, { isNew: pl.isNew }).replace(/^<button/, '<div').replace(/<\/button>\s*$/, '</div>')}</span>
      </div>`).join('')}</div>
    ${pk.gambleMsg ? `<p class="gamblemsg">${pk.gambleMsg}</p>` : ''}
    <div class="packbtns">
      ${!all ? '<button class="btn primary" data-a="flipAll">Reveal all</button>' : ''}
      ${all && !pk.gambled ? `<p class="small gamblehint">⟲ <b>Riposte gamble</b>: pick one card to answer. 50%: it becomes a random card one rarity higher. 50%: it shatters into double Dust.</p>
        <button class="btn" data-a="gamble" ${pk.gambleSel === null ? 'disabled' : ''}>⟲ Riposte it</button>` : ''}
      ${all ? `${(pr.packs[pk.pack] ?? 0) > 0 ? `<button class="btn primary" data-a="openPack" data-id="${pk.pack}">Open another (${pr.packs[pk.pack]})</button>` : ''}<button class="btn ${((pr.packs[pk.pack] ?? 0) > 0) ? 'ghost' : 'primary'}" data-a="closePack">Done</button>` : ''}
    </div>
  </div>`;
}

// ───────── forge ─────────

export function viewForge(): string {
  const pr = p();
  const sel = app.forgeSel;
  const f = app.forgeFilter;
  const starterIds = [...eco.STARTER_IDS].filter((id) => CARDS[id].rarity === 'starter');
  let list: string[];
  if (f === 'owned') list = [...starterIds, ...Object.keys(pr.collection)];
  else if (f === 'extras') list = Object.entries(pr.collection).filter(([id, e]) => e.n > (CARDS[id].rarity === 'legendary' ? 1 : 3)).map(([id]) => id);
  else list = COLLECTIBLE.filter((c) => eco.isUnlocked(pr, c.id)).map((c) => c.id);
  list = [...new Set(list)].sort((a, b) => CARDS[a].faction.localeCompare(CARDS[b].faction) || CARDS[a].name.localeCompare(CARDS[b].name));
  const total = list.length;
  const fpage = Math.min(app.forgePage, Math.max(0, Math.ceil(total / PAGE) - 1));
  list = list.slice(fpage * PAGE, fpage * PAGE + PAGE);
  // v0.10: the full explainer only until the Forge tip has been dismissed; after that, one line.
  let panel = pr.seen.forge ? '<p class="muted small forgeline">⚒ Pick a card to craft, dust or imprint a sigil.</p>' : `<div class="forgehint"><span class="anvil">⚒</span><p><b>The Forge.</b> Pick a card below. <b>Craft</b> new copies with Dust, <b>dust</b> spares into Dust, or <b>imprint a sigil</b>: a permanent tweak to every copy you take into runs (starter cards too).</p></div>`;
  if (sel) {
    const d = CARDS[sel];
    const e = pr.collection[sel];
    const isStarter = d.rarity === 'starter';
    const n = eco.owned(pr, sel);
    const cur = pr.imprints[sel];
    const cost = eco.craftCost(sel);
    const preview = app.forgeMod && MODS[app.forgeMod].fits(d) ? app.forgeMod : cur;
    panel = `<div class="forgepanel">
      <div class="fcard">${cardHtml({ id: sel, up: false, mod: preview, foil: (e?.foil ?? 0) > 0 }, { cls: 'big' })}</div>
      <div class="factions">
        <p class="muted small">${RARITY_NAME[d.rarity]} · ${isStarter ? 'starter (unlimited)' : `owned ${e?.n ?? 0}${e?.foil ? `, ${e.foil} foil` : ''}`}</p>
        ${!isStarter ? `<div class="row2">
          <button class="btn small" data-a="craft" data-id="${sel}" ${pr.dust >= cost ? '' : 'disabled'}>Craft<small>✨ ${cost}</small></button>
          <button class="btn small" data-a="dustOne" data-id="${sel}" ${(e?.n ?? 0) > (e?.foil ?? 0) ? '' : 'disabled'}>Dust<small>+✨ ${eco.dustValue(sel, false)}</small></button>
        </div>${e?.foil ? `<button class="btn small wide" data-a="dustFoil" data-id="${sel}">Dust a foil · +✨ ${eco.dustValue(sel, true)}</button>` : ''}` : ''}
        <h4>Sigils</h4>
        <div class="sigils">${MOD_LIST.map((m) => {
          const fits = m.fits(d);
          const on = cur === m.id;
          return `<button class="sigilbtn ${on ? 'on' : ''} ${app.forgeMod === m.id ? 'pv' : ''}" data-a="forgeMod" data-m="${m.id}" ${fits ? '' : 'disabled'} title="${esc(m.text)}"><span>${m.icon}</span>${m.name}<small>${on ? 'active' : fits ? `✨${m.dust}` : 'n/a'}</small></button>`;
        }).join('')}</div>
        ${app.forgeMod ? `<p class="kw"><b>${MODS[app.forgeMod].icon} ${MODS[app.forgeMod].name}</b> ${esc(MODS[app.forgeMod].text)}</p>
          ${cur === app.forgeMod ? '<button class="btn small ghost wide" data-a="unImprint">Remove sigil (free)</button>'
            : `<button class="btn small primary wide" data-a="imprint" ${n > 0 && pr.dust >= MODS[app.forgeMod].dust && MODS[app.forgeMod].fits(d) ? '' : 'disabled'}>Imprint for ✨ ${MODS[app.forgeMod].dust}${cur ? ` (replaces ${MODS[cur].name})` : ''}</button>`}
          ${n <= 0 ? '<p class="warn small">Own a copy first.</p>' : ''}` : '<p class="muted small">Tap a sigil to preview it. One sigil per card; it applies to every copy.</p>'}
      </div>
    </div>`;
  }
  return hubShell('forge', `${panel}
    <div class="chiprow">
      ${(['owned', 'all', 'extras'] as const).map((x) => `<button class="chipbtn ${f === x ? 'on' : ''}" data-a="forgeFilter" data-f="${x}">${{ owned: 'Owned', all: 'Craftable', extras: 'Spares' }[x]}</button>`).join('')}
      <button class="chipbtn" data-a="dustExtras">✨ Dust all spares</button>
    </div>
    ${pager(total, fpage, 'forgePage')}
    <div class="scroll"><div class="cardgrid">${list.map((id) => {
      const e = pr.collection[id];
      return cardHtml({ id, up: false, mod: pr.imprints[id], foil: (e?.foil ?? 0) > 0 }, { act: 'forgeSel', sel: id === sel, count: CARDS[id].rarity === 'starter' ? undefined : e?.n ?? 0, locked: CARDS[id].rarity !== 'starter' && !e });
    }).join('') || '<p class="muted">Nothing here.</p>'}</div></div>`, 'h-forge');
}

// ───────── profile: talents, achievements, quests, stats ─────────

export function viewProfile(): string {
  const pr = p();
  const tab = app.profTab;
  let body = '';
  if (tab === 'talents') {
    const tp = eco.talentPoints(pr);
    body = `<div class="tphead"><b>${tp.free}</b> talent point${tp.free === 1 ? '' : 's'} free <small>(${tp.spent}/${tp.total} spent · 1 per level)</small>
      <button class="btn ghost small" data-a="respec" ${tp.spent ? '' : 'disabled'}>Reset (free)</button></div>
      <div class="schools">${(Object.keys(SCHOOLS) as School[]).map((s) => `<div class="school sc-${s}">
        <div class="schead">${SCHOOLS[s].icon} <b>${SCHOOLS[s].name}</b><small>${SCHOOLS[s].blurb} · ${eco.schoolSpent(pr, s)} pts</small></div>
        ${TALENTS.filter((t) => t.school === s).map((t) => {
          const r = pr.talents[t.id] ?? 0;
          const can = eco.canRaise(pr, t.id);
          const locked = eco.schoolSpent(pr, s) < 2 * (t.tier - 1);
          return `<button class="talent ${r ? 'has' : ''} ${locked ? 'tlocked' : ''} ${can ? 'can' : ''}" data-a="raise" data-id="${t.id}" ${can ? '' : 'aria-disabled="true"'}>
            <span class="ticon">${t.icon}</span>
            <span class="tbody"><b>${esc(t.name)}</b> <span class="pips">${Array.from({ length: t.max }, (_, i) => `<i class="${i < r ? 'on' : ''}"></i>`).join('')}</span><br>
            <small>${esc(t.text(Math.max(1, r)))}${locked ? ` · needs ${2 * (t.tier - 1)} pts in this school` : ''}</small></span>
          </button>`;
        }).join('')}
      </div>`).join('')}</div>`;
  } else if (tab === 'achievements') {
    const n = ACHIEVEMENTS.filter((a) => pr.ach[a.id]).length;
    body = `<p class="muted">${n}/${ACHIEVEMENTS.length} earned. Some unlock new keepsakes for your runs.</p>` + ACHIEVEMENTS.map((a) => {
      const got = !!pr.ach[a.id];
      const prog = a.prog?.(pr);
      return `<div class="ach ${got ? 'got' : ''}"><span class="aicon">${got ? a.icon : '🔒'}</span>
        <span class="abody"><b>${esc(a.name)}</b><small>${esc(a.text)}</small>
        ${prog && !got ? `<span class="qbar"><i style="width:${Math.round((prog[0] / prog[1]) * 100)}%"></i></span><small>${prog[0]}/${prog[1]}</small>` : ''}
        <small class="arew">🎁 ${esc(eco.rewardText(a.reward))}</small></span>${got ? `<small class="adate">${esc(pr.ach[a.id])}</small>` : ''}</div>`;
    }).join('');
  } else if (tab === 'quests') {
    const q = eco.quests(pr);
    body = `<p class="muted">Three new quests every day. Progress comes from finished (or abandoned) runs.</p>` + q.list.map((x, i) => `<div class="quest ${x.claimed ? 'done' : ''}">
      <div><b>${esc(x.text)}</b><span class="qbar"><i style="width:${Math.round((x.prog / x.goal) * 100)}%"></i></span><small>${x.prog}/${x.goal} · 🪙 ${x.reward}</small></div>
      ${x.claimed ? '<span class="pill">✓</span>' : x.prog >= x.goal ? `<button class="btn primary small" data-a="claimQuest" data-i="${i}">Claim</button>`
        : `<button class="btn ghost small" data-a="rerollQuest" data-i="${i}" ${q.rerolled ? 'disabled' : ''}>Reroll</button>`}
    </div>`).join('') + `<p class="muted small">You can reroll one quest per day.</p>`;
  } else if (tab === 'cosmetics') {
    const kinds: [string, string][] = [['familiar', 'Familiars'], ['back', 'Card backs'], ['title', 'Titles']];
    body = `<p class="muted small">Cosmetics come from the free Season track, trophies and the Arena. They never change gameplay.</p>` + kinds.map(([k, label]) => `<h3>${label}</h3><div class="cosgrid">${COSMETICS.filter((c) => c.kind === k).map((c) => {
      const own = pr.cosmetics.owned.includes(c.id);
      const on = pr.cosmetics.familiar === c.id || pr.cosmetics.back === c.id || pr.cosmetics.title === c.id;
      return `<button class="cos ${own ? '' : 'locked'} ${on ? 'on' : ''}" data-a="${own ? 'equip' : 'cosInfo'}" data-id="${c.id}"><span class="cicon2">${own ? c.icon : '🔒'}</span><b>${esc(c.name)}</b>${c.text ? `<small>${esc(c.text)}</small>` : ''}${on ? '<em>equipped</em>' : ''}</button>`;
    }).join('')}</div>`).join('');
  } else {
    const lvl = levelOf(pr.xp);
    body = `<div class="statgrid">
      <div><b>${pr.runs}</b><small>runs</small></div><div><b>${pr.wins}</b><small>wins${pr.runs ? ` · ${Math.round((pr.wins / pr.runs) * 100)}%` : ''}</small></div>
      <div><b>${pr.bestFloor}</b><small>best floor</small></div><div><b>${pr.totalChains}</b><small>chains</small></div>
      <div><b>${pr.longestChain}</b><small>longest chain</small></div><div><b>${lvl}</b><small>level</small></div>
      <div><b>${pr.counters.elites ?? 0}</b><small>elites</small></div><div><b>${pr.counters.champs ?? 0}</b><small>champions</small></div>
      <div><b>${pr.counters.dares ?? 0}</b><small>dares won</small></div><div><b>${pr.counters.packs ?? 0}</b><small>packs opened</small></div>
      <div><b>${Object.keys(pr.collection).length}</b><small>cards owned</small></div><div><b>${pr.counters.crafted ?? 0}</b><small>crafted</small></div>
    </div>
    <h3>Stakes</h3><div class="ascgrid">${CHAR_LIST.map((c) => unlockedChars(pr).includes(c.id)
      ? `<div><span>${c.icon}</span><b>${esc(c.name.replace(/^The /, ''))}</b><small>Stakes ${pr.ascension[c.id]} · ${pr.charWins[c.id] ?? 0} win${(pr.charWins[c.id] ?? 0) === 1 ? '' : 's'}</small></div>`
      : `<div class="locked"><span>🔒</span><b>${esc(c.name.replace(/^The /, ''))}</b><small>level ${c.unlock}</small></div>`).join('')}</div>
    <h3>Daily Duels</h3>${Object.entries(pr.daily).sort().reverse().slice(0, 10).map(([dd, x]) => `<p>${esc(dd)} · ${x.score} pts · ${esc(CHARACTERS[x.character].name)}${x.won ? ' 🏆' : ''}</p>`).join('') || '<p class="muted">None yet.</p>'}
    <h3>Recent runs</h3>${pr.history.length ? `<div class="history">${pr.history.map((h) => `<div class="hrow ${h.won ? 'won' : ''}"><span>${CHARACTERS[h.character].icon}</span><span><b>${h.won ? 'Won' : `Act ${h.act} · F${h.floor}`}</b>${h.mode !== 'run' ? ` <small>${h.mode}</small>` : ''}${h.heat ? ` <small>🎲${h.heat}</small>` : ''}${h.asc ? ` <small>S${h.asc}</small>` : ''}<br><small>${esc(h.date)}${h.killer && !h.won ? ` · ${esc(h.killer.split('+').map((x) => ENEMIES[x]?.name ?? x).join(' & '))}` : ''}</small></span><span><b>${h.score}</b><small>pts · ✦${h.style}</small></span></div>`).join('')}</div>` : '<p class="muted">None yet.</p>'}`;
  }
  return hubShell('profile', `
    <div class="ptitle">${COSMETIC_MAP[pr.cosmetics.title]?.icon ?? ''} <b>${esc(COSMETIC_MAP[pr.cosmetics.title]?.name ?? '')}</b>${pr.cosmetics.familiar ? ` · ${COSMETIC_MAP[pr.cosmetics.familiar].icon}` : ''}</div>
    <nav class="tabs">${(['talents', 'achievements', 'quests', 'cosmetics', 'stats'] as const).map((t) => `<button class="${t === tab ? 'on' : ''}" data-a="profTab" data-t="${t}">${{ talents: 'Talents', achievements: 'Trophies', quests: 'Quests', cosmetics: 'Looks', stats: 'Stats' }[t]}</button>`).join('')}</nav>
    <div class="scroll">${body}
      <div class="row2"><button class="btn ghost" data-a="go" data-v="settings">Settings</button><button class="btn ghost" data-a="go" data-v="howto">How to play</button></div>
    </div>`);
}

// ───────── actions ─────────

type H = (el: HTMLElement) => void;

const refresh = () => { ui.persist(); ui.render(); };

function afterEconomy(): void {
  for (const id of eco.checkAchievements(p())) {
    const a = ACHIEVEMENTS.find((x) => x.id === id)!;
    ui.toast(`🏆 <b>${esc(a.name)}</b><br><small>${esc(eco.rewardText(a.reward))}</small>`, 'ach');
  }
  refresh();
}

export const hubActions: Record<string, H> = {
  hub: (el) => {
    if (app.view === 'collection') p().newCards = []; // NEW tags clear once you leave the collection
    app.view = el.dataset.v as View;
    if (el.dataset.t) { if (el.dataset.v === 'collection') app.collTab = el.dataset.t as typeof app.collTab; else app.profTab = el.dataset.t as typeof app.profTab; }
    app.modal = null;
    refresh();
  },
  explain: (el) => {
    const k = el.dataset.k;
    ui.modal(k === 'coins'
      ? '<div class="big-emoji">🪙</div><h2>Coins</h2><p>Earned at the end of every run (floors, rivals, bosses, Champions, Dares, wins), from daily quests, level-ups and achievements. Spend them on booster packs and single cards in the Packs tab.</p><p class="muted">Gold (💰) is different: it only exists inside a run.</p>'
      : '<div class="big-emoji">✨</div><h2>Dust</h2><p>Made by dusting spare cards in the Forge, or by losing a Riposte gamble. Spend it to craft any card you want, or to imprint sigils.</p>' + `<p class="muted">Craft: ${Object.entries(CRAFT).map(([r, c]) => `${r} ${c}`).join(' · ')}</p>`);
  },
  collTab: (el) => { app.collTab = el.dataset.t as typeof app.collTab; refresh(); },
  collFilter: (el) => { app.collFilter = el.dataset.f!; if (app.collFilter === 'all') app.collElem = ''; app.collPage = 0; ui.render(); },
  collFilterSel: (el) => { app.collFilter = (el as HTMLSelectElement).value; app.collPage = 0; ui.render(); },
  collElemSel: (el) => { app.collElem = (el as HTMLSelectElement).value; app.collPage = 0; ui.render(); },
  collElem: (el) => { app.collElem = el.dataset.e!; app.collPage = 0; ui.render(); },
  collPage: (el) => { app.collPage = Math.max(0, Number(el.dataset.p)); ui.render(); },
  forgePage: (el) => { app.forgePage = Math.max(0, Number(el.dataset.p)); ui.render(); },
  collCard: (el) => ui.modal(collCardModal(el.dataset.id!)),
  toForge: (el) => { app.forgeSel = el.dataset.id!; app.forgeMod = null; app.forgeFilter = p().collection[app.forgeSel] || CARDS[app.forgeSel].rarity === 'starter' ? 'owned' : 'all'; app.view = 'forge'; app.modal = null; ui.render(); },
  deckChar: (el) => { app.deckChar = el.dataset.id as CharId; ui.render(); },
  editDeck: (el) => { app.deckChar = el.dataset.id as CharId; app.collTab = 'decks'; app.view = 'collection'; ui.render(); },
  deckSlot: (el) => ui.modal(deckSlotPicker(Number(el.dataset.i))),
  deckPut: (el) => {
    const ok = eco.setLoadoutSlot(p(), app.deckChar, Number(el.dataset.i), el.dataset.put || null);
    if (!ok) ui.toast('Can\'t slot that card: not enough copies or swaps.', 'warn');
    app.modal = null; refresh();
  },
  deckReset: () => { delete p().loadouts[app.deckChar]; refresh(); },

  gift: () => { if (eco.claimGift(p())) { ui.toast('🎁 Free Duelist Pack added!', 'good'); refresh(); } },
  buyPack: (el) => {
    const id = el.dataset.id!;
    // v0.10: spending Coins and Dust asks first (one stray tap used to spend 130 Coins).
    if (p().coins < PACKS[id].price) return;
    ui.ask(`Buy a ${esc(PACKS[id].name)} for 🪙 ${PACKS[id].price}? You have ${p().coins}.`, 'Buy and open', () => {
      if (eco.buyPack(p(), id)) { ui.toast(`Bought a ${esc(PACKS[id].name)}`, 'good'); hubActions.openPack(el); }
    });
  },
  openPack: (el) => {
    const id = el.dataset.id!;
    if (!(p().packs[id] > 0)) return;
    app.pack = { pack: id, pulls: [], flipped: [], stage: 'sealed', gambled: false, gambleSel: null, gambleMsg: null };
    ui.render();
  },
  tearPack: () => {
    const pk = app.pack;
    if (!pk) return;
    const pulls = eco.openPack(p(), pk.pack);
    if (!pulls) { app.pack = null; ui.render(); return; }
    pk.pulls = pulls; pk.flipped = pulls.map(() => false); pk.stage = 'open';
    ui.persist();
    document.querySelector('.bigpack')?.classList.add('tearing');
    audio.sfx('pack');
    setTimeout(() => ui.render(), app.profile.settings.reduceMotion ? 0 : 380);
  },
  flip: (el) => {
    const pk = app.pack!;
    const i = Number(el.dataset.i);
    pk.flipped[i] = true;
    el.classList.add('flipped');
    const r = pk.pulls[i].rarity;
    audio.sfx(r === 'legendary' ? 'legend' : r === 'rare' ? 'rare' : 'flip');
    if (r === 'rare' || r === 'legendary') burstAt(el, r === 'legendary' ? 28 : 16, r === 'legendary' ? '#ffe28a' : '#e8b04a');
    try { navigator.vibrate?.(r === 'legendary' ? [30, 40, 60] : 10); } catch { /* not supported */ }
    if (pk.flipped.every(Boolean)) setTimeout(() => ui.render(), 450);
  },
  flipAll: () => {
    const pk = app.pack!;
    document.querySelectorAll<HTMLElement>('.pull:not(.flipped)').forEach((el, k) => setTimeout(() => hubActions.flip(el), k * 160));
    if (!pk.pulls.length) ui.render();
  },
  gambleSel: (el) => { const pk = app.pack!; pk.gambleSel = Number(el.dataset.i); ui.render(); },
  gamble: () => {
    const pk = app.pack!;
    if (pk.gambleSel === null || pk.gambled) return;
    const i = pk.gambleSel;
    const res = eco.gamble(p(), pk.pulls[i]);
    pk.gambled = true;
    if (res.won && res.card) {
      pk.pulls[i] = res.card;
      pk.gambleMsg = `⟲ Riposte! It became <b>${esc(CARDS[res.card.id].name)}</b> (${RARITY_NAME[res.card.rarity]}).`;
    } else { pk.gambleMsg = `💥 Shattered into ✨ ${res.dust ?? 0} Dust.`; pk.shattered = i; }
    afterEconomy();
    const el = document.querySelectorAll('.pull')[i] as HTMLElement | undefined;
    if (el) burstAt(el, res.won ? 24 : 12, res.won ? '#ffe28a' : '#9b6bd6');
  },
  closePack: () => { app.pack = null; afterEconomy(); },
  buyMarket: (el) => { if (eco.buyMarket(p(), Number(el.dataset.i))) { ui.toast('Card added to your collection', 'good'); afterEconomy(); } },

  forgeSel: (el) => { app.forgeSel = el.dataset.id!; app.forgeMod = null; ui.render(); document.querySelector('.hubbody')?.scrollTo({ top: 0, behavior: 'smooth' }); },
  forgeFilter: (el) => { app.forgeFilter = el.dataset.f as typeof app.forgeFilter; app.forgePage = 0; ui.render(); },
  forgeMod: (el) => { app.forgeMod = el.dataset.m as ModId; ui.render(); },
  craft: (el) => {
    const id = el.dataset.id!;
    const go = () => { if (eco.craft(p(), id)) { ui.toast(`⚒ Crafted ${esc(CARDS[id].name)}`, 'good'); flashForge(); afterEconomy(); } };
    if (eco.craftCost(id) >= CRAFT.rare) ui.ask(`Craft ${esc(CARDS[id].name)} for ✨ ${eco.craftCost(id)} Dust?`, 'Craft', go); else go();
  },
  dustOne: (el) => {
    const id = el.dataset.id!;
    const go = () => { const g = eco.dustCard(p(), id); if (g) { ui.toast(`+✨ ${g} Dust`, 'good'); if (!p().collection[id]) app.forgeSel = null; afterEconomy(); } };
    if ((p().collection[id]?.n ?? 0) === 1 || CARDS[id].rarity === 'legendary') ui.ask(`Dust your ${p().collection[id]?.n === 1 ? 'only copy' : 'copy'} of ${esc(CARDS[id].name)}?`, 'Dust it', go); else go();
  },
  dustFoil: (el) => { const g = eco.dustCard(p(), el.dataset.id!, true); if (g) { ui.toast(`+✨ ${g} Dust`, 'good'); afterEconomy(); } },
  dustExtras: () => {
    const extras = Object.entries(p().collection).reduce((a, [id, e]) => a + Math.max(0, e.n - (CARDS[id].rarity === 'legendary' ? 1 : 3)), 0);
    if (!extras) { ui.toast('No spares: you keep 3 copies of each card (1 of Legendaries).', 'warn'); return; }
    ui.ask(`Dust ${extras} spare card${extras > 1 ? 's' : ''}? You keep 3 of each (1 Legendary).`, 'Dust spares', () => {
      const g = eco.dustExtras(p()); ui.toast(`+✨ ${g} Dust`, 'good'); afterEconomy();
    });
  },
  imprint: () => {
    if (app.forgeSel && app.forgeMod && eco.imprint(p(), app.forgeSel, app.forgeMod)) {
      ui.toast(`${MODS[app.forgeMod].icon} ${MODS[app.forgeMod].name} imprinted on ${esc(CARDS[app.forgeSel].name)}`, 'good'); flashForge(); afterEconomy();
    }
  },
  unImprint: () => { if (app.forgeSel) { eco.imprint(p(), app.forgeSel, null); refresh(); } },

  profTab: (el) => { app.profTab = el.dataset.t as typeof app.profTab; ui.render(); },
  raise: (el) => {
    const id = el.dataset.id!, t = TALENTS.find((x) => x.id === id)!;
    if (eco.raiseTalent(p(), id)) { refresh(); return; }
    // v0.10: every refusal says why (it was silent unless you were out of points).
    const need = 2 * (t.tier - 1) - eco.schoolSpent(p(), t.school);
    ui.toast((p().talents[id] ?? 0) >= t.max ? `${esc(t.name)} is maxed.` : need > 0 ? `Spend ${need} more point${need > 1 ? 's' : ''} in ${esc(SCHOOLS[t.school].name)} to open ${esc(t.name)}.` : 'No free talent points. You get 1 per level.', 'warn');
  },
  respec: () => ui.ask('Refund all talent points?', 'Reset talents', () => { eco.respec(p()); refresh(); }),
  claimQuest: (el) => { const n = eco.claimQuest(p(), Number(el.dataset.i)); if (n) { ui.toast(`+🪙 ${n} Coins`, 'good'); refresh(); } },
  rerollQuest: (el) => { if (eco.rerollQuest(p(), Number(el.dataset.i))) refresh(); },
  cosInfo: (el) => {
    // v0.10: locked cosmetics say where they come from.
    const id = el.dataset.id!;
    const tier = SEASON_TRACK.findIndex((t) => t.cosmetic === id);
    const ach = ACHIEVEMENTS.find((a) => a.reward.cosmetic === id);
    ui.toast(`🔒 ${esc(COSMETIC_MAP[id]?.name ?? '')}: ${tier >= 0 ? `Season track, tier ${tier + 1}` : ach ? `trophy “${esc(ach.name)}” (${esc(ach.text)})` : 'an Arena or event reward'}.`);
  },
  equip: (el) => { if (eco.equip(p(), el.dataset.id!)) { document.body.dataset.back = p().cosmetics.back; refresh(); } },
  beast: (el) => {
    const e = ENEMIES[el.dataset.id!];
    const traps = (e.traps ?? []).map((t) => esc(CARDS[t]?.name ?? t)).join(', ');
    ui.modal(`<div class="big-emoji">${e.icon}</div><h2>${esc(e.name)}</h2><p>${esc(e.blurb ?? '')}</p><p class="muted">${e.hp[0]}–${e.hp[1]} HP · defeated ×${p().kills[e.id] ?? 0}</p>
      ${e.ghost ? '<p>Plays a saved deck.</p>' : `<h3>Moves</h3>${Object.values(e.moves).map((m) => `<p class="kw"><b>${esc(m.name)}</b></p>`).join('')}`}
      ${traps ? `<h3>Traps</h3><p>${traps}</p>` : ''}`);
  },
};

function flashForge(): void {
  const el = document.querySelector('.fcard');
  if (el) burstAt(el as HTMLElement, 18, '#ffb347');
}

/** Particle burst centred on an element. */
export function burstAt(el: HTMLElement, n: number, color: string): void {
  if (app.profile.settings.reduceMotion) return;
  const r = el.getBoundingClientRect();
  const host = document.getElementById('fx')!;
  for (let i = 0; i < n; i++) {
    const s = document.createElement('i');
    s.className = 'spark';
    const a = (Math.PI * 2 * i) / n + Math.random() * 0.4;
    const dist = 40 + Math.random() * 60;
    s.style.cssText = `left:${r.left + r.width / 2}px;top:${r.top + r.height / 2}px;--tx:${Math.cos(a) * dist}px;--ty:${Math.sin(a) * dist}px;background:${color}`;
    host.appendChild(s);
    setTimeout(() => s.remove(), 800);
  }
}

export { RELICS, todayKey };
