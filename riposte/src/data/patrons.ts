import type { RunState } from '../engine/types';
import type { Rng } from '../engine/rng';
import { CARDS, rewardPool } from './cards';
import { OMEN_LIST, gainOmen } from './omens';

/**
 * Patrons (v0.5): at the start of Acts 2 and 3 an old power of the Undercroft visits and offers three
 * blessings; you take one or none. Every Patron has a personality and a price, and several blessings
 * bend the chain (longer chains, more slots, Doom on long chains) rather than add raw stats.
 * v0.14: every blessing is a bargain. The Patron calls it in at that act's boss as an extra trap (run.debts),
 * unless you pay it off at a Merchant first.
 */
export interface BlessingApi {
  rng: Rng;
  gainRelic: (id: string) => void;
  randomRelic: (rarity: 'common' | 'uncommon' | 'rare' | 'boss') => string | null;
  offerCards: (rarity?: 'rare') => void;
  addToDeck: (id: string, up?: boolean) => void;
  removeCard: (uid: number) => void;
}

export interface BlessingDef {
  id: string;
  name: string;
  text: string;
  can?: (run: RunState) => boolean;
  /** Returns the line shown after choosing it. */
  apply: (run: RunState, api: BlessingApi) => string;
}

export interface PatronDef { id: string; name: string; icon: string; text: string; blessings: BlessingDef[] }

const basics = (run: RunState) => run.deck.filter((c) => c.id === 'strike' || c.id === 'guard');
const RANK: Record<string, number> = { legendary: 5, rare: 4, uncommon: 3, common: 2, starter: 1 };

export const PATRONS: PatronDef[] = [
  { id: 'archivist', name: 'The Archivist', icon: '📚', text: 'A librarian made of index cards, every one of them annotated in red. "Your deck is a first draft. Allow me."',
    blessings: [
      { id: 'margins', name: 'Annotated Margins', text: 'Upgrade 3 random cards.',
        apply: (run, api) => {
          const ups = run.deck.filter((c) => !c.up && CARDS[c.id].type !== 'curse');
          let k = 0;
          for (; k < 3 && ups.length; k++) ups.splice(api.rng.int(0, ups.length - 1), 1)[0].up = true;
          return `${k} card(s) gain the Archivist's notes.`;
        } },
      { id: 'index', name: 'Forbidden Index', text: 'Choose 1 of 3 rare cards.', apply: (_r, api) => { api.offerCards('rare'); return 'Three cards slide out from between the pages.'; } },
      { id: 'redaction', name: 'Redaction', text: 'Remove up to 2 Cuts or Sidesteps from your deck.', can: (r) => basics(r).length > 0,
        apply: (run, api) => { const b = basics(run).slice(0, 2); for (const c of b) api.removeCard(c.uid); return `${b.length} card(s) struck from the record.`; } },
      { id: 'second_edition', name: 'Second Edition', text: 'Duplicate your rarest card (an upgraded copy if it was upgraded).',
        apply: (run, api) => {
          const pool = run.deck.filter((c) => CARDS[c.id].type !== 'curse');
          if (!pool.length) return 'There is nothing worth reprinting.';
          const top = Math.max(...pool.map((c) => RANK[CARDS[c.id].rarity] ?? 0));
          const c = api.rng.pick(pool.filter((x) => (RANK[CARDS[x.id].rarity] ?? 0) === top));
          api.addToDeck(c.id, c.up);
          return `A fresh printing of ${CARDS[c.id].name}.`;
        } },
    ] },
  { id: 'bellmaiden', name: 'The Bellmaiden', icon: '🔔', text: 'She rings a bell no one else can hear, and every Reaction in your deck answers it.',
    blessings: [
      { id: 'peal', name: 'Long Peal', text: 'Chains can be 1 link longer for the rest of the run.', apply: (_r, api) => { api.gainRelic('b_peal'); return 'The bell keeps ringing, somewhere far below.'; } },
      { id: 'answer', name: 'Answering Bell', text: 'The first chain of 2+ links each combat draws 2 cards and gives 1 energy.', apply: (_r, api) => { api.gainRelic('b_answer'); return 'You hear it now: a second bell, answering the first.'; } },
      { id: 'rope', name: 'Extra Rope', text: '+1 Reaction slot. Lose 10 Max HP.', can: (r) => r.maxHp > 30,
        apply: (run, api) => { run.maxHp -= 10; run.hp = Math.min(run.hp, run.maxHp); api.gainRelic('b_rope'); return 'She ties a third knot into your belt. It tightens.'; } },
      { id: 'toll', name: 'Toll for Thee', text: 'Whenever a chain of 3+ links resolves, apply 4 Doom to ALL enemies.', apply: (_r, api) => { api.gainRelic('b_toll'); return '"It tolls for them," she says. "Not yet for you."'; } },
    ] },
  { id: 'ferryman', name: 'The Ferryman', icon: '⛴️', text: 'A boatman on a river that is not there. He accepts payment in every currency, including time.',
    blessings: [
      { id: 'crossing', name: 'Coin for the Crossing', text: 'Gain 120 gold.', apply: (run) => { run.gold += 120; run.stats.goldEarned += 120; return 'He pays you, for once. "You will be back."'; } },
      { id: 'calm', name: 'Still Waters', text: 'Heal to full HP.', apply: (run) => { run.hp = run.maxHp; return 'The river is warm. Your wounds close.'; } },
      { id: 'cargo', name: 'Cursed Cargo', text: 'Gain a random rare keepsake. Add a Regret jinx to your deck.',
        apply: (_run, api) => { const id = api.randomRelic('rare'); if (id) api.gainRelic(id); api.addToDeck('regret'); return 'Something heavy is wrapped in sailcloth. Something heavier follows you off the boat.'; } },
      { id: 'fare', name: 'Fare Forward', text: 'Gain 2 random Omens.',
        apply: (run, api) => { let k = 0; for (let i = 0; i < 2; i++) if (gainOmen(run, api.rng.pick(OMEN_LIST).id)) k++; return `${k} tarot card(s) wash up in the hull.`; } },
    ] },
  { id: 'gardener', name: 'The Gardener', icon: '🌱', text: 'An old woman pruning a hedge of barbs that grows through the floor. "Everything that dies feeds something."',
    blessings: [
      { id: 'heartwood', name: 'Heartwood', text: '+10 Max HP and heal 10.', apply: (run) => { run.maxHp += 10; run.hp = Math.min(run.maxHp, run.hp + 10); return 'Your heart takes root.'; } },
      { id: 'mulch', name: 'Mulch', text: 'Start each combat with 6 Guard.', apply: (_r, api) => { api.gainRelic('b_mulch'); return 'Leaves settle on your shoulders like armour.'; } },
      { id: 'graft', name: 'Graft', text: 'Transform 2 Cuts or Sidesteps into random uncommon cards of your factions.', can: (r) => basics(r).length > 0,
        apply: (run, api) => {
          const b = basics(run).slice(0, 2);
          const pool = rewardPool(run.character, run.level, 'uncommon');
          for (const c of b) { api.removeCard(c.uid); api.addToDeck(api.rng.pick(pool)); }
          return `${b.length} plain card(s) bloom into something new.`;
        } },
      { id: 'perennial', name: 'Perennial', text: 'Heal 3 HP after each combat.', apply: (_r, api) => { api.gainRelic('b_perennial'); return 'You will grow back. Every time.'; } },
    ] },
  { id: 'masked', name: 'The Masked Patron', icon: '🎭', text: 'A figure in a porcelain mask that laughs a beat too late. Its gifts are generous. Its terms are worse.',
    blessings: [
      { id: 'second_face', name: 'Second Face', text: '+1 energy each turn, but enemies have 15% more HP.', apply: (_r, api) => { api.gainRelic('b_mask'); return 'You put on the mask. It fits too well.'; } },
      { id: 'hunt', name: 'The Grand Hunt', text: 'Every rival left in this act becomes a Champion. Gain 80 gold.',
        apply: (run) => { for (const row of run.map) for (const n of row) if (n.type === 'elite') n.champ = true; run.gold += 80; run.stats.goldEarned += 80; return 'Somewhere ahead, the rivals sharpen their blades.'; } },
      { id: 'borrowed_crown', name: 'Borrowed Crown', text: 'Gain a random boss keepsake. Lose 8 Max HP.', can: (r) => r.maxHp > 30,
        apply: (run, api) => { const id = api.randomRelic('boss'); if (id) api.gainRelic(id); run.maxHp -= 8; run.hp = Math.min(run.hp, run.maxHp); return 'The crown is heavy, and not yours.'; } },
      { id: 'all_in', name: 'All or Nothing', text: 'Lose 30% of your current HP. Upgrade 5 random cards.', can: (r) => r.hp > 10,
        apply: (run, api) => {
          run.hp = Math.max(1, Math.round(run.hp * 0.7));
          const ups = run.deck.filter((c) => !c.up && CARDS[c.id].type !== 'curse');
          let k = 0;
          for (; k < 5 && ups.length; k++) ups.splice(api.rng.int(0, ups.length - 1), 1)[0].up = true;
          return `${k} card(s) burn brighter. So do you, briefly.`;
        } },
    ] },
];

export const PATRON_MAP: Record<string, PatronDef> = Object.fromEntries(PATRONS.map((p) => [p.id, p]));
export const BLESSING_MAP: Record<string, BlessingDef & { patron: string }> = Object.fromEntries(
  PATRONS.flatMap((p) => p.blessings.map((b) => [b.id, { ...b, patron: p.id }])),
);
