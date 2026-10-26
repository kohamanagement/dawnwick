import type { Combat, Ctx } from '../engine/combat';
import type { RunState, Trigger } from '../engine/types';
import { CARDS, rewardPool } from './cards';

/**
 * Omens: tarot cards you play as answers. Each one is written to bend the chain: flip traps, set a free
 * Reaction, double what you have stacked. You hold up to 3. They drop from fights and are sold in shops.
 * v0.14: Omens are instant-speed only. Each has a sign (⚔ an enemy attack, ✋ an enemy non-attack, ⟲ a trap or
 * Reaction firing) and you turn it over, for free, as a link in a chain whose top link is an enemy action
 * with that sign. Two (The Star, The Hierophant) also work on the map.
 */
export interface OmenDef {
  id: string;
  name: string;
  icon: string;
  numeral: string;
  /** v0.14: the enemy link it answers: ⚔ an attack, ✋ a non-attack, ⟲ a trap or Reaction firing. */
  sign: Trigger;
  text: string;
  /** Effect as a link in the chain (c is that link's context: c.negate() cancels the link it answers). */
  combat?: (cb: Combat, c: Ctx) => void;
  /** Effect usable on the map (outside combat). */
  map?: (run: RunState) => void;
}

const foes = (cb: Combat) => cb.alive();
/** Energy from an Omen: spend it now on your turn, or it waits as Flux when you answer on the enemy turn. */
const energy = (cb: Combat, n: number) => { if (cb.s.phase === 'player') cb.s.energy += n; else cb.s.flux += n; };

export const OMEN_LIST: OmenDef[] = [
  { id: 'fool', name: 'The Fool', icon: '🃏', numeral: '0', sign: 'skill', text: 'Draw 3 cards.', combat: (cb) => cb.drawCards(3) },
  { id: 'magician', name: 'The Magician', icon: '🪄', numeral: 'I', sign: 'skill', text: 'Gain 2 energy (Flux if it is the enemy turn).', combat: (cb) => energy(cb, 2) },
  { id: 'hermit', name: 'The Hermit', icon: '🏮', numeral: 'IX', sign: 'attack', text: 'Gain 14 Guard before the attack lands.', combat: (cb) => cb.gainBlock(cb.s.player, 14) },
  { id: 'wheel', name: 'Wheel of Fortune', icon: '🎡', numeral: 'X', sign: 'skill', text: 'Add 2 random cards from your factions to your hand. They cost 0 until played. Flip your Fate Coin.',
    combat: (cb) => {
      const pool = rewardPool(cb.run.character, cb.run.level, undefined, cb.run.owned);
      for (let i = 0; i < 2; i++) cb.addCard(cb.rng.pick(pool), 'hand', true);
      cb.flip(cb.s.player);
    } },
  { id: 'chariot', name: 'The Chariot', icon: '🛞', numeral: 'VII', sign: 'attack', text: 'Gain 2 Edge.', combat: (cb) => cb.applyStatus(cb.s.player, cb.s.player, 'str', 2) },
  { id: 'hanged', name: 'The Hanged Man', icon: '🙃', numeral: 'XII', sign: 'attack', text: 'Negate the attack it answers.', combat: (_cb, c) => c.negate() },
  { id: 'death', name: 'Death', icon: '💀', numeral: 'XIII', sign: 'reaction', text: 'Apply 12 Doom to ALL enemies.', combat: (cb) => { for (const e of foes(cb)) cb.applyStatus(cb.s.player, e, 'doom', 12); } },
  { id: 'tower', name: 'The Tower', icon: '🗼', numeral: 'XVI', sign: 'reaction', text: 'Destroy ALL enemy traps, then deal 8 damage to ALL enemies.',
    combat: (cb) => {
      for (const e of foes(cb)) { if (e.traps.length) cb.emit({ t: 'text', who: cb.whoKey(e), s: 'Disrupted!' }); e.traps = []; }
      for (const e of foes(cb)) cb.hit(cb.s.player, e, 8, false);
    } },
  { id: 'star', name: 'The Star', icon: '⭐', numeral: 'XVII', sign: 'attack', text: 'Heal 15 HP. Also usable on the map.',
    combat: (cb) => cb.heal(cb.s.player, 15), map: (r) => { r.hp = Math.min(r.maxHp, r.hp + 15); } },
  { id: 'moon', name: 'The Moon', icon: '🌙', numeral: 'XVIII', sign: 'skill', text: 'Apply 2 Shaken and 2 Exposed to ALL enemies.',
    combat: (cb) => { for (const e of foes(cb)) { cb.applyStatus(cb.s.player, e, 'weak', 2); cb.applyStatus(cb.s.player, e, 'vuln', 2); } } },
  { id: 'judgement', name: 'Judgement', icon: '📯', numeral: 'XX', sign: 'reaction', text: 'Double the Burn and Doom on ALL enemies.',
    combat: (cb) => {
      for (const e of foes(cb)) {
        if (e.st.burn) cb.applyStatus(cb.s.player, e, 'burn', e.st.burn);
        if (e.st.doom) cb.applyStatus(cb.s.player, e, 'doom', e.st.doom);
      }
    } },
  { id: 'temperance', name: 'Temperance', icon: '⚗️', numeral: 'XIV', sign: 'skill', text: 'Bank 3 energy for next turn and gain 5 Ante.',
    combat: (cb) => { cb.s.flux += 3; cb.raiseAnte(cb.s.player, 5); } },
  { id: 'lovers', name: 'The Lovers', icon: '💞', numeral: 'VI', sign: 'reaction', text: 'Upgrade every card in your hand for this fight.',
    combat: (cb) => { for (const c of cb.s.hand) if (CARDS[c.id].type !== 'curse') c.up = true; } },
  { id: 'empress', name: 'The Empress', icon: '🌹', numeral: 'III', sign: 'attack', text: 'Gain 6 Barbs and 6 Guard before the attack lands.',
    combat: (cb) => { cb.applyStatus(cb.s.player, cb.s.player, 'thorns', 6); cb.gainBlock(cb.s.player, 6); } },
  // v0.4: the rest of the Major Arcana.
  { id: 'priestess', name: 'The High Priestess', icon: '📿', numeral: 'II', sign: 'reaction', text: 'Reveal every enemy trap for this fight. Draw 2 cards.',
    combat: (cb) => { cb.s.once.reveal = 1; cb.drawCards(2); } },
  { id: 'emperor', name: 'The Emperor', icon: '🤴', numeral: 'IV', sign: 'reaction', text: 'Gain 1 extra Reaction slot for this fight and 6 Guard.',
    combat: (cb) => { cb.s.player.slots++; cb.gainBlock(cb.s.player, 6); } },
  { id: 'hierophant', name: 'The Hierophant', icon: '⛪', numeral: 'V', sign: 'skill', text: 'Upgrade 2 random cards in your deck for the rest of the run. Also usable on the map.',
    combat: (cb) => hierophant(cb.run), map: (r) => hierophant(r) },
  { id: 'strength', name: 'Strength', icon: '🦁', numeral: 'VIII', sign: 'attack', text: 'Double your Edge, then gain 2 more.',
    combat: (cb) => { const p = cb.s.player; cb.applyStatus(p, p, 'str', Math.max(0, p.st.str ?? 0) + 2); } },
  { id: 'justice', name: 'Justice', icon: '⚖️', numeral: 'XI', sign: 'reaction', text: 'Each enemy takes 7 damage for each trap it has set, then those traps are destroyed.',
    combat: (cb) => {
      for (const e of foes(cb)) {
        const n = e.traps.length;
        for (const t of e.traps) cb.retire(t, e);
        e.traps = [];
        if (n) cb.hit(cb.s.player, e, 7 * n, false);
      }
    } },
  { id: 'devil', name: 'The Devil', icon: '😈', numeral: 'XV', sign: 'attack', text: 'Gain 3 energy (Flux if it is the enemy turn). Add 2 Wounds to your discard pile.',
    combat: (cb) => { energy(cb, 3); cb.addCard('wound', 'discard', false); cb.addCard('wound', 'discard', false); } },
  { id: 'sun', name: 'The Sun', icon: '☀️', numeral: 'XIX', sign: 'attack', text: 'Heal 8 HP and gain 8 Guard. Your Fate Coin turns ☀.',
    combat: (cb) => { cb.heal(cb.s.player, 8); cb.gainBlock(cb.s.player, 8); if (cb.s.player.coin) cb.flip(cb.s.player); } },
  { id: 'world', name: 'The World', icon: '🌍', numeral: 'XXI', sign: 'reaction', text: 'Steal ALL enemy traps still set. Draw 1 card.',
    combat: (cb) => { cb.steal(cb.s.player, 99); cb.drawCards(1); } },
];

function hierophant(r: RunState): void {
  const ups = r.deck.filter((c) => !c.up && CARDS[c.id].type !== 'curse');
  for (let i = 0; i < 2 && ups.length; i++) ups.splice((r.floor * 7 + i * 13 + r.seed) % ups.length, 1)[0].up = true;
}

export const OMENS: Record<string, OmenDef> = Object.fromEntries(OMEN_LIST.map((o) => [o.id, o]));

export function omenCap(run: RunState): number { return (run.ascension >= 6 ? 2 : 3) + (run.relics.includes('tarot_pouch') ? 1 : 0) + (run.fate === 'alchemist' ? 1 : 0); }

export function gainOmen(run: RunState, id: string): boolean {
  run.omens ??= [];
  if (run.omens.length >= omenCap(run)) return false;
  run.omens.push(id);
  return true;
}
