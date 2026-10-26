# Riposte v0.7: Elements & Counters

Mike asked for "close to 1000 cards", more classes, abilities and powers, a way to answer a reaction from your hand (a chain you can join on purpose), and elements that work like rock-paper-scissors. This is what shipped and why.

## At a glance

| | v0.6 | v0.7 |
|---|---|---|
| Player cards | 204 | **1033** (994 collectible) |
| Hand-designed cards | 204 | 387 (+183) |
| Classes | 6 | **13** |
| Factions | 7 + neutral | **14** + neutral |
| Card types | Attack, Skill, Power, Reaction | + **Counter** (113 of them) |
| Relics | 95 | 114 |
| Statuses | ~45 | 76 |
| Rules tests | 62 | 77 |

Rarity spread: 475 common, 312 uncommon, 180 rare, 27 legendary, 38 starter. Types: 351 attacks, 261 skills, 232 reactions, 113 counters, 76 powers.

## 1. Elements (the rock-paper-scissors layer)

Six elements sit on a wheel. Each one beats the next two and is beaten by the two before it; the one opposite is neutral.

```
🔥 Blaze → ❄️ Frost → 🌿 Wild → ⚡ Storm → 🌊 Flood → 🪨 Stone → (🔥 Blaze)
```

Blaze melts Frost and burns Wild. Frost withers Wild and freezes Storm. Wild weathers Storm and drinks Flood. Storm whips Flood and shatters Stone. Flood erodes Stone and douses Blaze. Stone smothers Blaze and crushes Frost.

✨ **Radiant** and 🌑 **Umbral** sit outside the wheel. They are neutral to it and Effective against each other, so a Radiant-vs-Umbral fight hits hard both ways.

- **Effective**: ×1.3 damage. **Resisted** (the target beats you, or you share an element): ×0.75. Tunables live in `ELEMENTS` (`src/data/elements.ts`).
- **Every card has an element.** By default it comes from its faction (Ember is Blaze, Tide is Flood, Thorn and Beast are Wild, Void and Dusk are Umbral, Gilt and Dawn are Radiant, Glass and Rime are Frost, Grave and Stone are Stone, Storm is Storm). Neutral cards are elementless unless they say otherwise; the generator also prints neutral elemental cards ("Ember Jab", "Tidal Ward"…) so any class can splash.
- **Every enemy has an Aspect** (badge by its name). The table is hand-assigned for all 132 enemies; Echoes and the Reflection have none (they hit with their cards' elements, or yours).
- **Attunement.** Your element is the element of the last elemental card you played (you start each fight in your class's home element). It is what enemies hit, so the order you play cards in is also your defence.
- **Prism** (🔮, Aether faction) cards take your current Attunement. **Catalyze** attunes you to whatever beats the target's Aspect.
- **Resonance.** Play 3 cards of one element in a turn and that element's bonus fires once: Blaze 3 Burn to all, Frost 3 Chill to all, Wild heal 3 + 2 Thorns, Storm 3 Shock to all + 1 Charge, Flood draw 2, Stone 8 Block, Radiant heal 4 + 1 Verdict, Umbral 7 Doom to all. The Alchemist's relic (and the Catalyst power) makes it 2 cards.

Why this shape: a six-wheel where each beats two keeps every matchup readable at a glance (you are good against two, bad against two, even against one) without a type chart to memorise. Attunement makes the system matter on defence too, which a pure attacker-side multiplier would not.

## 2. Counters (answering from your hand)

The chain used to be automatic: set Reactions fire on their own. v0.7 adds **Counters**, a fifth card type you hold.

- Counters **stay in your hand** (Retain) and are never played in the main phase for their counter effect (playing one on your turn just cycles it: draw 1, unless the card says otherwise).
- Each Counter answers a kind of link: ⟲ an enemy trap/Reaction, ⚔ an enemy attack, ✋ an enemy skill, or ✦ anything.
- **The counter window** opens whenever a chain would end on an enemy link. The game shows the chain so far and the Counters that can answer it: tap one, or "Let it resolve". Your answer becomes a new link, and enemy traps can answer *it*, and you can answer again: a real back-and-forth chain.
- **Paying**: on your turn with energy; on the enemy turn with **Flux** (your carried-over energy, cap 1, more with relics). This makes ending a turn with 1 energy left a real decision.
- **Overchain**: hand Counters may push a chain 2 links past its normal cap (so 8 links normally).
- **Rebuttals**: from Act 2, elites carry 1 Rebuttal and bosses 1 per act. A Rebuttal negates the first Counter played against them, and you can counter the Rebuttal. This stops a Counter-heavy deck from shutting bosses out and makes baiting a real skill.
- **Settings → Counters**: *Ask me* (default), *Automatic* (plays the cheapest legal Counter, Negates first), or *Never*.

Engine: `perform()` checks `counterWindow()` before resolving the top link. In *ask* mode it throws `NeedCounter`; `Combat.attempt()` rewinds the whole run to before the action (state snapshot, events trimmed, RNG reseeded from state), the UI asks, and the action is replayed with the answers in `decisions`. Because everything is deterministic, the replay reaches the same window and takes the recorded answer. The sim bot and automatic mode use `autoCounter()`.

## 3. The seven new classes

| Class | Factions | Element | HP | Unlock | Plan |
|---|---|---|---|---|---|
| ⚖️ The Arbiter | Dawn + Tide | Radiant | 72 | L0 | The counter specialist. Objections answer traps mid-chain and build **Verdict**; Sentence and Last Judgment spend it. Scales of Dawn makes the first Counter each turn free. |
| 🌩️ The Tempest | Storm + Tide | Storm | 74 | L1 | Stores **Charge**, then dumps it all at once (Thunderclap, Skyfall). **Shock** makes the next attack on a target hit harder. Storm in a Bottle: start with 3 Charge, draw 2 when you spend 5+. |
| ❄️ The Rimeblade | Rime + Glass | Frost | 76 | L2 | Stacks **Chill** until enemies **Freeze** (lose their turn), then Shatters them. Freeze points: 5 normal, 8 elite, 12 boss, +3 per earlier freeze. Rime Heart: 3 Chill to all at start; Frozen foes take +50%. |
| 🐾 The Beastcaller | Beast + Storm | Wild | 74 | L3 | **Companions**: Wolf (hits a random enemy), Hawk (hits all enemies), Bear (Block at the start of your turn), Serpent (venom Burn). They stack and act every turn on their own. Bone Whistle: start with Wolf 2. |
| 🪨 The Geomancer | Stone + Thorn | Stone | 80 | L4 | **Fortify** keeps Block between turns; **Tremor** damages all enemies at the end of your turn, then halves. Lodestone: start with 4 Fortify and 4 Block. |
| ⚗️ The Alchemist | Aether + Ember | Flood | 70 | L5 | Master of the wheel. **Prism** cards take your Attunement, **Catalyze** turns you into what beats the target, flasks hand out elements. Philosopher's Flask: Resonance after 2 cards. |
| 🥷 The Nightblade | Dusk + Void | Umbral | 66 | L6 | **Mark** a target (your damage to it is permanently higher), slip hits with **Veil** (next hit misses), and execute. Smoke Cowl: start with 1 Veil and Mark 1 on all enemies. |

Each new class has 22 hand-designed signature cards (starters through legendary) plus about 50 generated ones. The old seven factions each got 3 hand-made Counters (Flashfire, Riptide Reversal, Bramble Rebuke, Null Retort, Call the Bet, Shard Reply, Grave Retort…) so every existing class can play the new system, plus 8 neutral Counters (Quick Parry, Deflect, Snap Retort, Second Opinion, Final Say…).

## 4. How 1000 cards were made without 1000 bad cards

Hand-designing 800 cards would have produced filler; random generation would have produced broken cards. `src/data/cardgen.ts` sits in between:

1. **Atoms**: small, already-balanced effects (deal N, gain N Block, apply N Burn/Chill/Shock/Mark/Weak…, draw, gain Charge/Fortify/Verdict, summon a companion, Negate…), each with a point price per unit.
2. **Vocabulary per faction**: which atoms the faction may use (Dusk gets Mark/Veil/Doom/Weak, never healing; Stone gets Block/Fortify/Tremor, little draw), which powers it may print, and whether its Reactions/Counters may Negate.
3. **Shapes** (23): "deal X", "deal X twice", "X + rider", "block + rider", "AoE", "Reaction: when attacked…", "Counter: negate…", powers, Exhaust bursts, etc.
4. **Budget** on the same yardstick the hand-made cards were tuned to: about 4 / 7 / 13.5 / 20 points at cost 0 / 1 / 2 / 3, ×1.3 for Reactions (they need a trigger) and ×1.2 for Counters, ×1.12 uncommon and ×1.35 rare. Rares get a third atom. Cards that would land below a minimum (a 1-damage attack) or above the budget with fixed atoms are thrown away, not printed.
5. **Deterministic names and ids** from faction word lists ("Cinder Lash", "Glacier Rite", "Pack Howl"…), so saves and deck codes stay stable across builds.

Drafts weight hand-made cards ×2 and neutral cards ×0.6, so the signature cards still show up often and the class identity stays clear in a pool of a thousand.

## 5. New relics and statuses

19 relics: 7 starters (above) and 12 anyone can find: Retort Quill (draw on Counter), Storm Jar (3 Charge), Seismograph (3 Fortify), Hunter's Chalk (Mark 1 on all), Beast Tooth (Bear 2), Elemental Compass (start attuned to beat the first enemy), Resonant Bell (energy on Resonance), Smoke Pellet (1 Veil), Frost Brooch (energy when an enemy Freezes), Quickdraw Glove (Counters cost 1 less), Prism Crown (Resonance after 2), Silver Gavel (5 damage to whatever you counter).

New statuses: Chill, Frozen, Shock, Charge, Fortify, Tremor, Verdict, Veil, Mark, Rebuttal, Wolf, Hawk, Bear, Serpent, Pack Leader, Dynamo, Conductor, Blizzard, Permafrost, Fault Line, Sanctum, Judge, Catalyst, Elixir, Nightfall, Shadowstep, Quickdraw, Riposte, Frostbrand, Fury, Mountain, Wild Hunt. All have keyword tooltips.

## 6. UI

- Card frames show their element (top-right of the art) and Counters read "Counter ⟲/⚔/✋/✦".
- Enemy Aspect badge by the name; tap an enemy for its matchups. Your **Attunement chip** sits by your HP; tap it for the full wheel, every element's Resonance, and your current matchups.
- "Effective!" / "Resisted" pop over the target when an element multiplier applies.
- **Counter prompt** slides up over the hand with the chain so far, the Counters you can afford, and what you will pay with.
- The chain view marks Counter links with ↯.
- Collection: filters for all 15 factions plus an element row, and pages of 60 (the Forge list pages too).
- Settings: Counters (Ask me / Automatic / Never). How to play: Elements, Counters and the new classes.

## 7. Decisions made without asking

- **Counters are a hand card type, not set Reactions.** Mike asked for "you can play a card if it's in your hand to counter that reaction". Reactions stay as the automatic layer; Counters are the deliberate one.
- **The prompt pauses the game** by default rather than using a timer, since this is a phone game played one-handed.
- **Rebuttals** were added so bosses cannot be locked out by a hand full of Negates.
- **The new classes unlock at levels 0–6** alongside the old ones, so a new player can start as the Arbiter (the cleanest teacher of the counter system).
- **Old rules tests turn elements and Rebuttals off** (`ELEMENTS.on = false`, `COUNTERS.rebut = false`) so their exact numbers stay meaningful; 15 new tests cover the v0.7 rules.
- **Save compatibility**: old saves and runs load; a fight already in progress from v0.6 just has no Attunement until you play an elemental card.

## 8. Known gaps and next ideas

- Generated cards share art motifs per faction (icons vary by effect); hand-drawn art would lift the new factions most.
- The sim bot uses Counters greedily and ignores Attunement order, so real players should do better than the bot on the new classes than on the old.
- Ideas: element-themed acts or Skies (a Blizzard Sky that Chills everyone), a Counter-only Riddle set, a draft mode that offers one element per pick.
