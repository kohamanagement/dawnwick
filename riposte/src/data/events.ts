import type { RunState } from '../engine/types';
import type { RunApi } from '../engine/run';
import { CARDS, rewardPool } from './cards';
import { OMEN_LIST, gainOmen, omenCap } from './omens';
import { MOD_LIST } from './mods';
import { EVENTS6 } from './events6';
import { STORY_EVENTS } from './story-events';

export type PickKind = 'upgrade' | 'remove' | 'duplicate' | 'transform' | 'sigil';

export interface EventOption {
  label: string;
  desc: string;
  can?: (run: RunState) => boolean;
  pick?: PickKind;
  /** v0.6: a gamble (the balance bot avoids these). */
  risky?: boolean;
  apply: (run: RunState, api: RunApi, uid?: number) => string;
}

export interface EventDef {
  id: string;
  name: string;
  icon: string;
  text: string;
  /** v0.6: text that depends on the run (multi-stage events). */
  textFn?: (run: RunState) => string;
  /** v0.6: 'event' (default, map Event nodes), 'shrine' (Shrine nodes), 'wayside' (roadside popups), 'stage' (a later step of another event). */
  kind?: 'event' | 'shrine' | 'wayside' | 'stage';
  /** v0.6: only in these acts. */
  acts?: number[];
  options: EventOption[];
}

const leave: EventOption = { label: 'Leave', desc: 'Nothing happens.', apply: () => 'You move on.' };

export const EVENTS: EventDef[] = [
  { id: 'wandering_dealer', name: 'The Wandering Dealer', icon: '🧳',
    text: 'A cloaked figure fans out a hand of cards that shimmer like oil. "Everything has a price, duelist."',
    options: [
      { label: 'Buy a rare (40 gold)', desc: 'Choose 1 of 3 rare cards.', can: (r) => r.gold >= 40,
        apply: (r, api) => { r.gold -= 40; api.offerCards('rare'); return 'The dealer smiles and lays out three cards.'; } },
      { label: 'Sell a card (+35 gold)', desc: 'Remove a card from your deck.', pick: 'remove',
        apply: (r, api, uid) => { api.removeCard(uid!); r.gold += 35; return 'The dealer pockets the card. "A pleasure."'; } },
      leave,
    ] },
  { id: 'cracked_altar', name: 'Cracked Altar', icon: '⛩️',
    text: 'Red light leaks from a split in an old altar. Something inside wants blood, or devotion.',
    options: [
      { label: 'Bleed (lose 7 HP)', desc: 'Gain a random keepsake.', can: (r) => r.hp > 7,
        apply: (r, api) => { r.hp -= 7; const id = api.gainRandomRelic(); return `The altar drinks. You find ${id} in the ashes.`; } },
      { label: 'Pray', desc: 'Heal 12 HP.', apply: (r) => { r.hp = Math.min(r.maxHp, r.hp + 12); return 'Warmth spreads through you.'; } },
      leave,
    ] },
  { id: 'mirror_pool', name: 'Mirror Pool', icon: '🪞',
    text: 'Your reflection in the still water holds a card you do not remember drawing.',
    options: [
      { label: 'Reach in', desc: 'Duplicate a card in your deck.', pick: 'duplicate',
        apply: (_r, api, uid) => { api.duplicateCard(uid!); return 'You pull out a perfect copy.'; } },
      leave,
    ] },
  { id: 'chain_library', name: 'The Chain Library', icon: '📚',
    text: 'Shelves of duel records, each annotated with the perfect response. A few pages are loose.',
    options: [
      { label: 'Study', desc: 'Upgrade 2 random cards.', apply: (_r, api) => { const n = api.upgradeRandom(2); return `You upgrade ${n} card(s).`; } },
      { label: 'Tear out a page (lose 5 HP)', desc: 'Remove a card from your deck.', pick: 'remove', can: (r) => r.hp > 5,
        apply: (r, api, uid) => { r.hp -= 5; api.removeCard(uid!); return 'The page crumbles to ash in your hand.'; } },
      leave,
    ] },
  { id: 'gamblers_echo', name: "Gambler's Echo", icon: '🎲',
    text: 'A ghostly gambler flips a coin that never lands. "Even odds. Always even."',
    options: [
      { label: 'Bet 30 gold', desc: '50% chance to win 90 gold, 50% to lose the bet.', can: (r) => r.gold >= 30,
        apply: (r, api) => {
          r.gold -= 30;
          if (api.rng.chance(0.5)) { r.gold += 90; return 'Heads. The ghost pays out 90 gold.'; }
          return 'Tails. The coin, and your gold, vanish.';
        } },
      leave,
    ] },
  { id: 'ember_shrine', name: 'Ember Shrine', icon: '🕯️',
    text: 'Three candles burn in colors you have never seen. Each one shows a different future.',
    options: [
      { label: 'Read the flames', desc: 'Choose 1 of 3 cards from your factions.', apply: (_r, api) => { api.offerCards(); return 'Shapes form in the flames.'; } },
      { label: 'Reforge', desc: 'Transform a card into a random card of your factions.', pick: 'transform',
        apply: (_r, api, uid) => { const n = api.transformCard(uid!); return `It becomes ${n}.`; } },
      leave,
    ] },
  { id: 'lost_duelist', name: 'A Lost Duelist', icon: '🪞',
    text: 'A translucent duelist blocks the path, shuffling a deck that looks oddly familiar. It wants a match.',
    options: [
      { label: 'Accept the duel', desc: 'Fight an Echo (rival). Win a rare card choice.', apply: (_r, api) => { api.fightEcho(); return 'The Echo raises its cards.'; } },
      leave,
    ] },
  { id: 'quiet_grove', name: 'Quiet Grove', icon: '🌳',
    text: 'Moss, birdsong, and a long-forgotten bedroll. Nothing here wants to hurt you.',
    options: [
      { label: 'Sleep', desc: 'Heal 25% of Max HP.', apply: (r) => { const h = Math.round(r.maxHp * 0.25); r.hp = Math.min(r.maxHp, r.hp + h); return 'You wake rested.'; } },
      { label: 'Take root', desc: 'Gain 6 Max HP.', apply: (r) => { r.maxHp += 6; r.hp += 6; return 'Bark-like skin hardens over your scars.'; } },
    ] },
  { id: 'curse_merchant', name: 'The Jinx Merchant', icon: '🛒',
    text: '"One hundred gold, no questions. You will carry a small Regret, nothing more."',
    options: [
      { label: 'Take the deal', desc: 'Gain 100 gold. Add a Regret to your deck.',
        apply: (r, api) => { r.gold += 100; api.addToDeck('regret'); return 'The coins are heavy. So is something else.'; } },
      leave,
    ] },
  // ── v0.4 ──
  { id: 'magpie_hoard', name: "The Magpie's Hoard", icon: '🪺',
    text: 'A nest woven from bootlaces, buttons, a bent crown and somebody\'s spare Reaction cards. The owner is out.',
    options: [
      { label: 'Take what glitters', desc: 'Gain 2 random Omens (if you have room).',
        apply: (r, api) => { let n = 0; for (let i = 0; i < 2; i++) if (gainOmen(r, api.rng.pick(OMEN_LIST).id)) n++; return n ? `You pocket ${n} glittering card(s).` : 'Your pockets are already full.'; } },
      { label: 'Rummage deep (lose 6 HP)', desc: 'Gain a random keepsake.', can: (r) => r.hp > 6,
        apply: (r, api) => { r.hp -= 6; const n = api.gainRandomRelic(); return `Something pecks you. Worth it: ${n}.`; } },
      leave,
    ] },
  { id: 'trapsmith', name: 'The Trapsmith', icon: '🪤',
    text: 'A gnome with ten fingers, nine of them bandaged, sells clever little mechanisms from a barrow.',
    options: [
      { label: 'Tune your Reactions (60 gold)', desc: 'Upgrade every Reaction in your deck.',
        can: (r) => r.gold >= 60 && r.deck.some((c) => !c.up && CARDS[c.id].type === 'reaction'),
        apply: (r) => { r.gold -= 60; let n = 0; for (const c of r.deck) if (!c.up && CARDS[c.id].type === 'reaction') { c.up = true; n++; } return `Click, whirr, snap. ${n} Reaction(s) upgraded.`; } },
      { label: 'Trade a card for a trick', desc: 'Remove a card, then add a random Reaction from your factions.', pick: 'remove',
        apply: (r, api, uid) => {
          api.removeCard(uid!);
          const pool = rewardPool(r.character, r.level, undefined, r.owned).filter((id) => CARDS[id].type === 'reaction');
          const id = api.rng.pick(pool);
          api.addToDeck(id);
          return `The gnome hands you ${CARDS[id].name}. "Mind the spring."`;
        } },
      leave,
    ] },
  { id: 'shattered_mirror', name: 'The Shattered Mirror', icon: '🔍',
    text: 'Seven shards on the floor, each showing you holding a different card. Seven years of bad luck, they say.',
    options: [
      { label: 'Keep a shard (lose 5 Max HP)', desc: 'Duplicate a card in your deck.', pick: 'duplicate', can: (r) => r.maxHp > 20,
        apply: (r, api, uid) => { r.maxHp -= 5; r.hp = Math.min(r.hp, r.maxHp); api.duplicateCard(uid!); return 'The shard cuts you as it becomes a card.'; } },
      { label: 'Sweep up the silver', desc: 'Gain 40 gold.', apply: (r) => { r.gold += 40; r.stats.goldEarned += 40; return 'The frame alone is worth something.'; } },
      leave,
    ] },
  { id: 'wishing_well', name: 'The Wishing Well', icon: '⛲',
    text: 'Coins glitter at the bottom of a well. A sign reads: WISHES, ALL SIZES.',
    options: [
      { label: 'A small wish (25 gold)', desc: 'Gain a random Omen.', can: (r) => r.gold >= 25 && (r.omens ?? []).length < omenCap(r),
        apply: (r, api) => { r.gold -= 25; gainOmen(r, api.rng.pick(OMEN_LIST).id); return 'Something answers from the bottom of the well.'; } },
      { label: 'A large wish (75 gold)', desc: 'Upgrade 3 random cards.', can: (r) => r.gold >= 75,
        apply: (r, api) => { r.gold -= 75; const n = api.upgradeRandom(3); return `${n} card(s) shine a little brighter.`; } },
      leave,
    ] },
  { id: 'chained_duelist', name: 'The Chained Duelist', icon: '⛓️',
    text: 'A duelist in iron chains, deck confiscated, offers you a lesson in exchange for their freedom.',
    options: [
      { label: 'Take the lesson', desc: 'Upgrade a card.', pick: 'upgrade',
        apply: (r, _api, uid) => { const c = r.deck.find((x) => x.uid === uid); if (c && CARDS[c.id].type !== 'curse') c.up = true; return 'They show you the angle you were missing.'; } },
      { label: 'Break the chains (lose 8 HP)', desc: 'Choose 1 of 3 rare cards.', can: (r) => r.hp > 8,
        apply: (r, api) => { r.hp -= 8; api.offerCards('rare'); return 'Free at last, they deal you three of their best.'; } },
      leave,
    ] },
  { id: 'owl_riddle', name: 'The Owl of Riddles', icon: '🦉',
    text: '"What answers before it is asked?" The owl tilts its head all the way round.',
    options: [
      { label: '"A Reaction."', desc: 'With 3+ Reactions in your deck: upgrade 2 of them and gain 30 gold. Otherwise lose 6 HP.',
        apply: (r, api) => {
          const reacts = r.deck.filter((c) => CARDS[c.id].type === 'reaction');
          if (reacts.length < 3) { r.hp = Math.max(1, r.hp - 6); return '"Wrong," says the owl, and bites you.'; }
          const ups = reacts.filter((c) => !c.up);
          for (let i = 0; i < 2 && ups.length; i++) ups.splice(api.rng.int(0, ups.length - 1), 1)[0].up = true;
          r.gold += 30; r.stats.goldEarned += 30;
          return '"Correct." The owl drops a purse and two of your Reactions gleam.';
        } },
      { label: '"The chain."', desc: 'If your longest chain this run is 4+ links, gain 60 gold.',
        apply: (r) => { if (r.stats.maxChain >= 4) { r.gold += 60; r.stats.goldEarned += 60; return '"Clever." It pays you in old coins.'; } return 'The owl hoots, unimpressed.'; } },
      leave,
    ] },
  // ── v0.5 ──
  { id: 'gravedigger', name: "The Gravedigger's Bargain", icon: '⚱️',
    text: 'An old sexton leans on a spade beside an open grave. "Something has to go in. It needn\'t be you."',
    options: [
      { label: 'Lay a card to rest', desc: 'Remove a card from your deck and heal 10 HP.', pick: 'remove',
        apply: (r, api, uid) => { api.removeCard(uid!); r.hp = Math.min(r.maxHp, r.hp + 10); return 'You say a few words. You feel lighter.'; } },
      { label: 'Rob the grave', desc: 'Gain 70 gold. Add a Regret jinx to your deck.',
        apply: (r, api) => { r.gold += 70; r.stats.goldEarned += 70; api.addToDeck('regret'); return 'The coins are cold. So is the feeling that follows you.'; } },
      leave,
    ] },
  { id: 'bell_tower', name: 'The Bell Tower', icon: '🛎️',
    text: 'A rope hangs from the dark. Every Reaction in your deck seems to lean toward it.',
    options: [
      { label: 'Ring the bell', desc: 'Upgrade 2 random Reactions in your deck.', can: (r) => r.deck.some((c) => CARDS[c.id].type === 'reaction' && !c.up),
        apply: (r, api) => {
          const ups = r.deck.filter((c) => CARDS[c.id].type === 'reaction' && !c.up);
          let k = 0;
          for (; k < 2 && ups.length; k++) ups.splice(api.rng.int(0, ups.length - 1), 1)[0].up = true;
          return `The peal shakes dust from the rafters. ${k} Reaction(s) answer it.`;
        } },
      { label: 'Climb to the clapper (lose 6 HP)', desc: 'Gain a random keepsake.', can: (r) => r.hp > 6,
        apply: (r, api) => { r.hp -= 6; const n = api.gainRandomRelic(); return `A long climb and a bad fall, but you come down holding ${n}.`; } },
      leave,
    ] },
  { id: 'ink_seller', name: 'The Ink Seller', icon: '🖋️',
    text: 'A stall of inks that shift colour as you watch. "One drop, and a card remembers it forever. Or at least for this trip."',
    options: [
      { label: 'Buy a drop (40 gold)', desc: 'A random card in your deck gets a random sigil that fits it, for this run.', can: (r) => r.gold >= 40,
        apply: (r, api) => {
          r.gold -= 40;
          const opts = r.deck.filter((c) => !c.mod && CARDS[c.id].type !== 'curse');
          for (let i = 0; i < 12 && opts.length; i++) {
            const c = api.rng.pick(opts);
            const m = api.rng.pick(MOD_LIST.filter((x) => x.fits(CARDS[c.id])));
            if (m) { c.mod = m.id; return `${CARDS[c.id].name} drinks the ink: ${m.name}.`; }
          }
          return 'The ink beads up and rolls off. The seller keeps your coin.';
        } },
      { label: 'Spill the inkwell', desc: 'Gain 50 gold. Lose 5 Max HP.', can: (r) => r.maxHp > 25,
        apply: (r) => { r.gold += 50; r.stats.goldEarned += 50; r.maxHp = Math.max(20, r.maxHp - 5); r.hp = Math.min(r.hp, r.maxHp); return 'You pocket the coins in the confusion. The ink stains your skin.'; } },
      leave,
    ] },
  { id: 'crossroads', name: 'The Converging Roads', icon: '🛣️',
    text: 'Three roads meet at a signpost. Each arm points somewhere you have already been.',
    options: [
      { label: 'The left road', desc: 'Transform a card into a random card of your factions.', pick: 'transform',
        apply: (_r, api, uid) => { const n = api.transformCard(uid!); return `Down the left road, it becomes ${n}.`; } },
      { label: 'The right road', desc: 'Upgrade a card.', pick: 'upgrade',
        apply: (r, _api, uid) => { const c = r.deck.find((x) => x.uid === uid); if (c && CARDS[c.id].type !== 'curse') c.up = true; return 'The right road is steep, and worth it.'; } },
      { label: 'The middle road', desc: 'Choose 1 of 3 cards.', apply: (_r, api) => { api.offerCards(); return 'The middle road is busy with travellers selling cards.'; } },
    ] },
  { id: 'mourner', name: 'The Mourner', icon: '🕯️',
    text: 'A veiled figure kneels by a duelist\'s grave, holding the dead duelist\'s deck.',
    options: [
      { label: 'Comfort them', desc: 'Heal 12 HP.', apply: (r) => { r.hp = Math.min(r.maxHp, r.hp + 12); return 'You sit together a while. It helps you both.'; } },
      { label: 'Ask for the deck (lose 4 Max HP)', desc: 'Choose 1 of 3 rare cards.', can: (r) => r.maxHp > 24,
        apply: (r, api) => { r.maxHp -= 4; r.hp = Math.min(r.hp, r.maxHp); api.offerCards('rare'); return '"Take it," they say. "It wants to be played."'; } },
      leave,
    ] },
];

EVENTS.push(...EVENTS6, ...STORY_EVENTS);
export const EVENT_MAP: Record<string, EventDef> = Object.fromEntries(EVENTS.map((e) => [e.id, e]));
/** Events that can appear on Event nodes (and Mystery nodes). */
export const NODE_EVENTS = EVENTS.filter((e) => !e.kind || e.kind === 'event');
export const SHRINES = EVENTS.filter((e) => e.kind === 'shrine');
export const WAYSIDE = EVENTS.filter((e) => e.kind === 'wayside');
export function eventText(run: RunState, e: EventDef): string { return e.textFn ? e.textFn(run) : e.text; }
