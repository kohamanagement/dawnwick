// v0.11 "The Spread": the act map is a hand the Dealer lays out on his table, top to bottom.
// You carry Wick down the rows to the boss's seat. Same nodes, links and fog as before: only the look changed.
import './map.css';
import type { MapNode, RunState } from '../engine/types';
import { ROWS, SUIT, actEnc, foggy, isDown, reachable, suitOf } from '../engine/run';
import { ENEMIES } from '../data/enemies';
import { VENUE_MAP } from '../data/venues';
import { esc } from './render';

/** Each act (and its alternates) sits at its own table: felt, rim and the colour of the light. */
const TABLES: Record<string, { name: string; felt: string; felt2: string; rim: string; glow: string }> = {
  '1-0': { name: 'a lamplit roadside table', felt: '#3a2a1c', felt2: '#22180f', rim: '#7a5532', glow: '255,196,110' },
  '1-1': { name: 'a market stall, still wet', felt: '#173a3c', felt2: '#0d2224', rim: '#4f7d78', glow: '150,226,214' },
  '1-2': { name: 'a stump in the Hollow Woods', felt: '#203421', felt2: '#121e13', rim: '#5d6b3a', glow: '200,230,140' },
  '2-0': { name: 'the velvet of the Chorus Halls', felt: '#4a1620', felt2: '#2a0b12', rim: '#9c6a2e', glow: '255,186,120' },
  '2-1': { name: 'a masquerade card table', felt: '#33184a', felt2: '#1c0c2a', rim: '#b08a3a', glow: '240,200,255' },
  '2-2': { name: "a wreckers' sea chest", felt: '#16263f', felt2: '#0b1424', rim: '#5a6e86', glow: '170,210,255' },
  '3-0': { name: "the Dealer's own black felt", felt: '#15131c', felt2: '#08070c', rim: '#6a5a8c', glow: '232,176,74' },
  '3-1': { name: 'a table of turning brass', felt: '#2c2a24', felt2: '#16150f', rim: '#a08a50', glow: '255,220,150' },
  '3-2': { name: 'a slab of cooling rock', felt: '#3a1610', felt2: '#1e0906', rim: '#b0482a', glow: '255,140,80' },
  mirror: { name: 'the glass behind the Last Table', felt: '#2a3038', felt2: '#14181e', rim: '#a8b4c4', glow: '220,235,255' },
  night: { name: 'the stair under the Last Table', felt: '#141a33', felt2: '#090c1c', rim: '#46508a', glow: '170,180,255' },
};

function tableOf(r: RunState, night: boolean) {
  if (night) return TABLES.night;
  if (r.act >= 4) return TABLES.mirror;
  return TABLES[`${r.act}-${r.acts?.[r.act - 1] ?? 0}`] ?? TABLES['1-0'];
}

/** A small, fixed tilt per card so the spread looks dealt by hand, not printed. */
const tilt = (row: number, col: number) => (((row * 7 + col * 13) % 7) - 3) * 0.9;

// Deal the spread once per act and flip the next row once per step; re-renders in between stay still.
let dealtKey = '';
let flipKey = '';

const H = 104; // row pitch in px
const TOP = 104; // room for the Dealer's deck above row 0

export interface SpreadLabels { icon: Record<string, string>; name: Record<string, string> }

/** The board and legend for the map screen (the header stays in main.ts). */
export function viewSpread(r: RunState, L: SpreadLabels, night: boolean): string {
  const reach = reachable(r);
  const isReach = (row: number, col: number) => reach.some((p) => p.row === row && p.col === col);
  const fog = foggy(r);
  const total = TOP + ROWS * H + 150;
  const x = (col: number) => ((col + 0.5) / 4) * 100;
  const y = (row: number) => TOP + row * H + H / 2;
  const bossY = TOP + ROWS * H + 64;
  const actKey = `${r.seed}:${r.act}:${night ? 'n' : ''}`;
  const deal = actKey !== dealtKey;
  dealtKey = actKey;
  const posKey = `${actKey}:${r.pos?.row ?? -1}:${r.pos?.col ?? -1}`;
  const flip = posKey !== flipKey;
  flipKey = posKey;
  const atRow = r.pos?.row ?? -1;
  const t = tableOf(r, night);

  // Threads between cards: gentle S-curves in a 100-wide viewBox (stroke width stays in screen px).
  const curve = (x1: number, y1: number, x2: number, y2: number) => {
    const m = (y1 + y2) / 2;
    return `M${x1} ${y1} C${x1} ${m} ${x2} ${m} ${x2} ${y2}`;
  };
  let lines = '';
  for (const row of r.map) for (const n of row) {
    const fromHere = r.pos ? r.pos.row === n.row && r.pos.col === n.col : false;
    const spent = n.row < atRow;
    const cls = fromHere ? 'hot' : spent ? 'spent' : '';
    for (const nc of n.next) lines += `<path class="${cls}" d="${curve(x(n.col), y(n.row) + 34, x(nc), y(n.row + 1) - 34)}" />`;
    if (n.row === ROWS - 1) lines += `<path class="${cls}" d="${curve(x(n.col), y(n.row) + 34, 50, bossY - 52)}" />`;
  }
  if (!r.pos) for (const n of r.map[0] ?? []) lines += `<path class="hot" d="${curve(50, 86, x(n.col), y(0) - 34)}" />`;

  let cards = '';
  const seen = new Set<string>();
  let champSeen = false;
  let downSeen = false;
  for (const row of r.map) for (const n of row) cards += cardHtml(n);

  function cardHtml(n: MapNode): string {
    const here = !!r.pos && r.pos.row === n.row && r.pos.col === n.col;
    const past = n.row <= atRow && !here;
    const ok = isReach(n.row, n.col);
    const hidden = fog && n.row > atRow + 2;
    const style = `left:${x(n.col)}%;top:${y(n.row)}px;--rot:${tilt(n.row, n.col)}deg;--d:${n.row * 70 + n.col * 25}ms`;
    const anim = `${deal ? 'deal' : ''} ${flip && ok && !deal ? 'flip' : ''}`;
    const data = `data-a="${ok ? 'travel' : 'nodeInfo'}" data-row="${n.row}" data-col="${n.col}"`;
    if (hidden) return `<button class="node mc n-fog ${ok ? 'reach' : ''} ${anim}" style="${style}" ${data} aria-label="Face down: hidden by fog"><span class="back"></span></button>`;
    // v0.14: dealt face-down. The suit shows (like an enemy trap's trigger); tap to read it, Peek, or go blind.
    if (isDown(n)) {
      downSeen = true;
      const su = suitOf(n.type);
      return `<button class="node mc n-down s-${su} ${ok ? 'reach' : ''} ${anim}" style="${style}" data-a="nodeInfo" data-row="${n.row}" data-col="${n.col}" aria-label="Face down: ${SUIT[su].name} (${SUIT[su].hint})${ok ? ', available' : ''}"><span class="back"><b class="suit">${SUIT[su].glyph}</b></span></button>`;
    }
    seen.add(n.type);
    if (n.champ) champSeen = true;
    const v = n.venue ? VENUE_MAP[n.venue] : null;
    const label = `${n.champ ? 'Champion ' : ''}${L.name[n.type]}${v ? ` at ${esc(v.name)}` : ''}${ok ? ' (available)' : ''}${here ? ' (you are here)' : ''}`;
    return `<button class="node mc n-${n.type} ${n.champ ? 'champ' : ''} ${ok ? 'reach' : ''} ${here ? 'here' : ''} ${past ? 'past' : ''} ${anim}" style="${style}" ${data} aria-label="${label}">
      <span class="face"><i class="pip">${n.down ? SUIT[suitOf(n.type)].glyph : L.icon[n.type]}</i><b class="ic">${L.icon[n.type]}</b><small>${esc(n.champ ? 'Champion' : L.name[n.type])}</small></span>${v ? `<span class="venuebadge">${v.icon}</span>` : ''}${here ? '<span class="wick" aria-hidden="true">🕯️</span>' : ''}</button>`;
  }

  // The boss sits at the bottom of the spread: the seat across the table.
  const nb = ROWS;
  const bossOk = isReach(nb, 0);
  const b = ENEMIES[actEnc(r).boss.enemies[0]];
  const bossCard = `<button class="node mc n-boss ${bossOk ? 'reach' : ''} ${deal ? 'deal' : ''} ${flip && bossOk && !deal ? 'flip' : ''}" style="left:50%;top:${bossY}px;--rot:0deg;--d:${ROWS * 70 + 120}ms"
    data-a="${bossOk ? 'travel' : 'bossInfo'}" data-row="${nb}" data-col="0" aria-label="Boss: ${esc(b?.name ?? '')}${bossOk ? ' (available)' : ''}">
    <span class="face"><i class="pip">👑</i><b class="ic">${b?.icon ?? '👑'}</b><small>${esc(b?.name ?? 'Boss')}</small></span></button>`;

  // Wick's light follows you down the table.
  const glowY = r.pos ? (r.pos.row >= ROWS ? bossY : y(r.pos.row)) : 40;
  const glowX = r.pos && r.pos.row < ROWS ? x(r.pos.col) : 50;
  const wickStart = r.pos ? '' : '<span class="wick start" aria-hidden="true">🕯️</span>';

  return `<div class="spread ${deal ? 'dealing' : ''}" style="height:${total}px;--felt:${t.felt};--felt2:${t.felt2};--rim:${t.rim};--glow:${t.glow}">
      <div class="candle" style="left:${glowX}%;top:${glowY}px"></div>
      <div class="dealer" aria-hidden="true"><span class="ddeck"></span><span class="dhand">🫳</span>${wickStart}<small>Dealt on ${esc(t.name)}</small></div>
      <svg class="threads" viewBox="0 0 100 ${total}" preserveAspectRatio="none" width="100%" height="${total}">${lines}</svg>
      ${cards}${bossCard}
      <div class="seat" style="top:${bossY + 64}px" aria-hidden="true">the seat across the table</div>
    </div>
    <div class="legend">${Object.entries(L.icon).filter(([k]) => seen.has(k)).map(([k, v]) => `<span>${v} ${L.name[k]}</span>`).join('')}${champSeen ? '<span class="champkey">🔥 Champion rival</span>' : ''}${downSeen ? '<span class="suitkey">♠ fight · ♥ rest · ♦ riches · ♣ unknown (face down)</span>' : ''}${fog ? '<span>🂠 Hidden (fog)</span>' : ''}</div>`;
}
