// v0.11 "The Last Word": events that carry the storyline (Cassius Vane, Wick, the Accord, the Ferryman).
// Rewards sit on the same scale as the v0.4–v0.6 events they share the pool with.
import type { RunState, CharId } from '../engine/types';
import type { EventDef, EventOption } from './events';
import { omenCap } from './omens';

const leave: EventOption = { label: 'Leave', desc: 'Nothing happens.', apply: () => 'You move on.' };
const onward: EventOption = { label: 'Carry on', desc: 'Keep to the road.', apply: () => 'You keep walking.' };

/** Who the Echo in "Someone You Knew" is, for each class. */
const KNEW: Record<CharId, string> = {
  duelist: 'an Echo in an ash-grey coat, holding her cards exactly the way your grandmother taught you',
  warden: 'an Echo with dirt under its fingernails: the gardener who planted the first thorn you ever kept',
  hollow: 'an Echo who waves at you like an old friend. You do not know them. You think you used to',
  sharp: 'an Echo of your old partner, the one who ran off with the takings. It still owes you money',
  magpie: 'an Echo of the first duelist you ever robbed. It checks its pockets when it sees you',
  sexton: 'an Echo you buried forty years ago. It looks well. It looks a lot better than you',
  arbiter: 'an Echo in the robes of Dawn: the judge who swore you in. It is still waiting for a verdict',
  tempest: 'an Echo of a storm-chaser who went up the bell tower in a thunderstorm and never came down',
  rimeblade: 'an Echo in a blue coat. Isolde. Your sister. She does not recognise you',
  beastcaller: 'an Echo with a wolf at its heel. The wolf knows you even if the Echo does not',
  geomancer: 'an Echo of the architect who built the Circuit. It keeps checking the ceiling',
  alchemist: 'an Echo of your old teacher, still muttering the formula she never finished',
  nightblade: 'an Echo of the Dusk blade who trained you. It nods once, the way it used to',
};

export const STORY_EVENTS: EventDef[] = [
  { id: 'dealers_break', name: 'The Dealer’s Night Off', icon: '🃏', acts: [2, 3],
    text: 'Off the path, at a card table lit by one candle, the Last Dealer is playing patience against himself. He is losing. “Sit, duelist. I’m off the clock.”',
    options: [
      { label: 'Play Find the Lady', desc: 'Even odds: choose 1 of 3 rare cards, or add a Regret to your deck.', risky: true,
        apply: (_r, api) => {
          if (api.rng.chance(0.5)) { api.offerCards('rare'); return '“The lady! Well spotted.” He seems genuinely pleased.'; }
          api.addToDeck('regret'); return '“The jack, I’m afraid. There was never a lady.” He slides you a Regret.';
        } },
      { label: 'Ask about the Unanswered Hand', desc: 'Heal 10 HP.',
        apply: (_r, api) => { api.heal(10); return '“I wanted the last word. I got it. Turns out the last word is very lonely.” He pours you tea.'; } },
      leave,
    ] },
  { id: 'jarred_daylight', name: 'Jarred Daylight', icon: '🫙', acts: [1, 2],
    text: 'A pedlar sells jars of daylight, bottled before the Night. Most are empty. A few still glow. Wick is staring at them very hard.',
    options: [
      { label: 'Buy a glowing jar (40 gold)', desc: 'Heal 35% of your Max HP.', can: (r) => r.gold >= 40,
        apply: (r, api) => { r.gold -= 40; api.heal(Math.round(r.maxHp * 0.35)); return 'Warm light pours over you like a summer afternoon.'; } },
      { label: 'Let Wick drink one (lose 5 HP)', desc: 'Upgrade 2 random cards.', can: (r) => r.hp > 5,
        apply: (_r, api) => { api.hurt(5); const n = api.upgradeRandom(2); return `Wick gulps it and flares so bright it singes you. “Ohh. That’s what Tuesdays tasted like.” ${n} card(s) upgraded.`; } },
      leave,
    ] },
  { id: 'vanes_chair', name: 'An Empty Chair', icon: '🪑', acts: [3],
    text: 'A champion’s chair with a brass plate: CASSIUS VANE, UNDEFEATED. The cushion is still warm.',
    options: [
      { label: 'Sit in it', desc: 'Choose 1 of 3 rare cards. Add a Regret to your deck.',
        apply: (_r, api) => { api.addToDeck('regret'); api.offerCards('rare'); return 'For a moment you can see every hand you could ever play. You stand up quickly.'; } },
      { label: 'Carve your name under his (lose 6 HP)', desc: 'Gain a random keepsake.', can: (r) => r.hp > 6,
        apply: (_r, api) => { api.hurt(6); const n = api.gainRandomRelic(); return `The brass fights back, but your name goes in. Behind the plate you find ${n}.`; } },
      leave,
    ] },
  { id: 'torn_accord', name: 'A Page of the Accord', icon: '📜', acts: [1, 2],
    text: 'Pinned to a lectern: one page of the Accord, half blotted out. The only line left reads EVERY MOVE HAS AN—',
    options: [
      { label: 'Finish the sentence', desc: 'Upgrade a card.', pick: 'upgrade',
        apply: (r, _api, uid) => { const c = r.deck.find((x) => x.uid === uid); if (c) c.up = true; return '“ANSWER,” you write. The ink stays. So does the feeling.'; } },
      { label: 'Take the page', desc: 'Gain 35 gold.',
        apply: (_r, api) => { api.gold(35); return 'A collector will pay well for it. Wick says that’s vandalism. Wick is right.'; } },
      leave,
    ] },
  { id: 'echo_friend', name: 'Someone You Knew', icon: '👤', acts: [2, 3],
    text: 'An Echo sits on the stair, shuffling.',
    textFn: (r: RunState) => `On the stair sits ${KNEW[r.character] ?? 'an Echo you almost recognise'}.`,
    options: [
      { label: 'Duel them', desc: 'Fight an Echo (rival). Win a rare card choice.', apply: (_r, api) => { api.fightEcho(); return 'The Echo stands and raises its cards. It smiles, a little.'; } },
      { label: 'Sit with them a while', desc: 'Upgrade a random card and heal 6 HP.',
        apply: (_r, api) => { api.upgradeRandom(1); api.heal(6); return 'It shows you one old trick before it fades back into the stair.'; } },
      leave,
    ] },
  { id: 'understudy', name: 'The Understudy', icon: '🎭', acts: [2],
    text: 'Behind a curtain, a nervous Echo rehearses the Impresario’s lines. “Ladies, gentlemen… no. LADIES! No…”',
    options: [
      { label: 'Give notes', desc: 'Gain a random Omen.', can: (r) => (r.omens ?? []).length < omenCap(r),
        apply: (_r, api) => { const n = api.gainOmens(1); return n ? '“Louder? I can do louder.” It tips you with a card from its sleeve.' : '“Louder? I can do louder.” It has nothing to give you.'; } },
      { label: 'Steal the script', desc: 'Gain 30 gold.',
        apply: (_r, api) => { api.gold(30); return 'The script is mostly stage directions. EXIT, PURSUED BY DUELIST. It sells well.'; } },
      leave,
    ] },
  { id: 'ferrymans_ledger', name: 'The Ferryman’s Ledger', icon: '📖',
    text: 'The Ferryman’s boat is moored and empty. On the bench lies his ledger: every duelist he has rowed back. Your name is in it. Several times.',
    options: [
      { label: 'Strike out a line (lose 4 Max HP)', desc: 'Remove a card from your deck.', pick: 'remove', can: (r) => r.maxHp > 24,
        apply: (r, api, uid) => { r.maxHp -= 4; r.hp = Math.min(r.hp, r.maxHp); api.removeCard(uid!); return 'You cross out one of your old mistakes. It stays crossed out.'; } },
      { label: 'Write “next time” in the margin', desc: 'Heal 8 HP.', apply: (_r, api) => { api.heal(8); return 'Somewhere upriver, the Ferryman chuckles.'; } },
      leave,
    ] },
  // ── roadside ──
  { id: 'wick_gutters', name: 'Wick Gutters', icon: '🕯️', kind: 'wayside',
    text: 'A cold draught. Wick shrinks to a blue bead. “I’m fine. I’m FINE. Feed me something.”',
    options: [
      { label: 'Feed it a card', desc: 'Remove a card from your deck.', pick: 'remove',
        apply: (_r, api, uid) => { api.removeCard(uid!); return 'Wick eats it. “Crunchy.” The flame stands back up.'; } },
      { label: 'Cup your hands around it', desc: 'Heal 5 HP.', apply: (_r, api) => { api.heal(5); return 'You both feel warmer.'; } },
    ] },
  { id: 'dealers_note', name: 'A Note on the Path', icon: '✉️', kind: 'wayside',
    text: 'A playing card is pinned to a post. On the back, in neat handwriting: “Still coming? Good. — C.V.”',
    options: [
      { label: 'Keep the card', desc: 'Gain 15 gold.', apply: (_r, api) => { api.gold(15); return 'It’s gilt-edged. Someone will buy it.'; } },
      { label: 'Write a reply on it', desc: 'Start your next fight with 1 Edge.', apply: (_r, api) => { api.buff('ballad', 1); return 'You write one word and pin it back up: “Riposte.”'; } },
    ] },
  { id: 'sexton_passes', name: 'The Sexton Passes', icon: '⚰️', kind: 'wayside',
    text: 'An old gravedigger with a spade passes the other way. “Mind the graves. Some of them are shallow. Some of them are mine.”',
    textFn: (r: RunState) => r.character === 'sexton' ? 'Your old apprentice passes the other way with a borrowed spade. “Evening, master. Graves are all in order. Mostly.”'
      : 'An old gravedigger with a spade passes the other way. “Mind the graves. Some of them are shallow. Some of them are mine.”',
    options: [
      { label: 'Help him dig (lose 4 HP)', desc: 'Upgrade a random card.', can: (r) => r.hp > 4,
        apply: (_r, api) => { api.hurt(4); api.upgradeRandom(1); return 'He shows you how to hold a spade, and, somehow, a card.'; } },
      onward,
    ] },
];
