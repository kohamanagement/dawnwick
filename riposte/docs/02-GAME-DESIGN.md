# Dawnwick (formerly Riposte) · Phase 3: Game design

Everything in this document is implemented in the prototype unless it is marked **(planned)**. Exact numbers for every card, relic and enemy are in [CATALOG.md](CATALOG.md), which is generated from the code.

## 1. High concept

- **Title:** *Dawnwick: The Last Word* since v0.14.1 (the original title *Riposte* was taken; research in [18-RENAME-DAWNWICK.md](18-RENAME-DAWNWICK.md)). The mechanic is the **Answer Chain**. One-line genre: *a counter-chain roguelike deckbuilder*.
- **Elevator pitch:** *A trading-card duel against the house, played as a roguelike: the enemies play traps, and you can answer them.* (v0.14: the pitch never names another roguelike.) A phone-first roguelike deckbuilder built on a Yu-Gi-Oh!-style chain: every card, trap and enemy move can be answered, and answers resolve last-in, first-out.
- **Setting:** The Undercroft Circuit, a duel hall that has outlived its players. Duelists climb three floors (The Lantern Hall, The Choir Stair, The Dealer's Table) to win a seat at the last table. Opponents are wardens, beasts and *Echoes*: decks of duelists who came before, still playing.
- **Tone:** dark, theatrical, a little wry. Closer to Inscryption's mood than to anime TCG brightness.
- **Art direction for a small screen:** one big readable silhouette per enemy, flat color fields, thick borders on cards, a faction shape (▲ ◆ ● ✦) on every card so color is never the only cue. The prototype uses system emoji as placeholder portraits; production art should be single-figure painted portraits on dark backgrounds at 512×512, cards at 600×840 with a fixed text box (text is always rendered live, never baked into art, for localization and size settings).

**Orientation: portrait.** Justification: one-thumb play on the bus is the target context (Marvel Snap, Pokémon TCG Pocket, Night of the Full Moon are all portrait). Fights have at most 3 enemies, which fit across a 390px screen; the hand sits in the thumb zone; the chain list reads naturally top-to-bottom.

## 2. Core loop

| Scale | What happens | Target length |
|---|---|---|
| **Turn** | Draw 5, spend 3 energy, set up to 2 Reactions, end turn; enemies act and chains resolve automatically | 20–40 s |
| **Fight** | 1–3 enemies, 4–7 turns (bosses 8–12) | 2–4 min (boss 5–7) |
| **Act** | 8 map rows + boss: ~5 fights, 1 treasure, 1–2 events, shop/rest | 10–14 min |
| **Run** | 3 acts, 27 floors | 35–45 min, saved after every action so it splits across 5–8 sessions |
| **Day** | 1 Daily Duel (fixed seed) plus free runs | 10–40 min |
| **Week** | Climb Ascension, unlock a character, mint and retire Legacy decks | 2–4 h |

First meaningful decision within 10 seconds of opening: the title screen's top button resumes the run exactly where it stopped (mid-fight included).

## 3. Resource system: fixed energy + Flux

- **3 energy every turn**. No lands: mana screw and flood are impossible (the top complaint about MTG on mobile).
- **Flux:** up to **1 unspent energy carries to next turn** automatically. Cards can **Bank** more (ignoring the cap).
- Why: pure fixed energy makes every turn a "spend it all" puzzle and punishes holding a Reaction for the right moment. Flux makes "set a cheap trap and wait" a real choice and gives skill expression (planning a 5-energy turn) without the feel-bad of lands. Borrowed from Hearthstone's *Coin*, Flesh and Blood's pitching, and Lorcana's inkwell (any card as resource).
- Boss relics trade on this axis: *Ember Heart* gives +1 energy but disables Flux.

## 4. Card design

### Card types

| Type | Rule | Share of pool |
|---|---|---|
| Attack | Damages; declaring it can trigger enemy ⚔ traps | ~35% |
| Skill | Block, draw, debuffs; triggers enemy ✋ traps | ~30% |
| Power | Permanent effect for the fight | ~12% |
| **Reaction** | **Set** face-down into one of 2 Reaction slots for its cost. Fires by itself on the enemy turn when its trigger happens: ⚔ attacked, ✋ enemy uses a non-attack, ⟲ an enemy trap fires | ~23% |
| Curse | Unplayable clutter from events, enemies, Ascension | — |

### Factions (color pie)

| Faction | Shape | Does | Can't do |
|---|---|---|---|
| **Ember** | ▲ | Direct damage, Burn, Strength, self-damage for power | Negate, heal, much Block |
| **Tide** | ◆ | Draw, Weak, Negate, cheap Reactions, Flux | Big damage, Strength |
| **Thorn** | ● | Block, Thorns, healing, slow scaling | Draw, Disrupt, Negate |
| **Void** | ✦ | Doom (slow drain + execute), Sacrifice, Exhaust, Vulnerable, Disrupt, HP costs | Real healing (only small drains); Block only at a price |
| Neutral | ■ | Basic Strike/Guard and glue | Nothing strong |

Each character draws rewards from **two factions + neutral** (Monster Train's clan pairs): Ashen Duelist = Ember+Tide, Thorn Warden = Thorn+Tide, Hollow = Void+Ember. The fourth pairing (Thorn+Void) is the first planned DLC character.

### Keywords (15)

Block · Strength · Weak · Vulnerable · Burn · Thorns · Doom (never wears off; the target loses 1 HP per 5 Doom each turn and dies outright when Doom ≥ HP) · Exhaust · Retain · **Set (Reaction)** · **Negate** · **Chain N** · **Sacrifice** · **Disrupt** · Bank/Flux. Every keyword shows its rules text under the card when selected.

### Rarity

Starter, Common (60% of offers), Uncommon (33%), Rare (6%, 15% from elites, 100% from bosses). Rares open a new axis rather than bigger numbers (e.g. *Flow State* makes Reactions cheaper; *Final Hour* doubles Doom).

### 30 example cards (all in the game)

| # | Card | Faction | Cost | Text | Role |
|---|---|---|---|---|---|
| 1 | Strike | Neutral | 1 | Deal 6 damage | Baseline damage |
| 2 | Guard | Neutral | 1 | Gain 5 Block | Baseline defense |
| 3 | Brace | Neutral | 1 | Reaction ⚔: gain 9 Block | Pre-committed defense |
| 4 | Feint | Neutral | 1 | Reaction ✋: Negate it | Stops buffs/traps/debuffs |
| 5 | Bank Shot | Neutral | 1 | Deal 5. Bank 1 energy | Tempo smoothing |
| 6 | Duel Stance | Neutral | 1 | Power: whenever a chain of 2+ resolves, gain 4 Block and deal 4 | Chain payoff engine |
| 7 | Spark Lunge | Ember | 1 | Deal 6, apply 2 Burn | Starter, damage over time |
| 8 | Searing Strike | Ember | 2 | Deal 12, +6 if Burning | Burn payoff |
| 9 | Reckless Swing | Ember | 0 | Deal 6, lose 2 HP | Risk for tempo |
| 10 | Blaze Ward | Ember | 1 | Reaction ⚔: deal 6 and apply 2 Burn to attacker | Aggressive answer |
| 11 | Fury Chain | Ember | 1 | Deal 8. Chain 2: gain 2 Strength | Rewards baiting traps |
| 12 | Wildfire | Ember | 2 | Deal 8 + 2 Burn to ALL | Multi-enemy |
| 13 | Ignite | Ember | 1 | Deal 3× target's Burn. Exhaust | Burn finisher |
| 14 | Ember Crown | Ember | 2 | Power: apply +2 Burn whenever you apply Burn | Build-around |
| 15 | Parry | Tide | 1 | Reaction ⚔: gain 8 Block. Chain 3: draw 2 | Starter answer |
| 16 | Riptide Snare | Tide | 1 | Reaction ⚔: apply 2 Weak before the hit, gain 3 Block | Damage reduction |
| 17 | Countercurrent | Tide | 2 | Reaction ⚔: Negate the attack | Hard counter to boss nukes |
| 18 | Mirror Tide | Tide | 1 | Reaction ⟲: Negate an enemy trap, draw 1 | Counter-trap |
| 19 | Wave Crash | Tide | 2 | Deal 6, +2 per card in hand | Hand-size payoff |
| 20 | Flow State | Tide | 2 | Power: Reactions cost 1 less | Reaction build-around |
| 21 | Bramble Ward | Thorn | 1 | Gain 6 Block and 1 Thorns | Starter |
| 22 | Bramble Snare | Thorn | 1 | Reaction ⚔: gain 3 Thorns (first) and 4 Block | Punishes multi-hits |
| 23 | Trunk Slam | Thorn | 1 | Deal damage equal to your Block | Defense into offense |
| 24 | Deep Roots | Thorn | 2 | Gain 12 Block; keep Block next turn | Setup turn |
| 25 | Overgrowth | Thorn | 2 | Power: gain 5 Block each turn | Scaling defense |
| 26 | Hollow Cut | Void | 1 | Deal 6, apply 5 Doom | Starter execute |
| 27 | Shatter Seal | Void | 0 | Disrupt 1, draw 1 | Removes enemy traps |
| 28 | Offering | Void | 1 | Sacrifice a Reaction: +2 energy, draw 2 | Converts answers into tempo |
| 29 | Void Lance | Void | 2 | Deal 12; Sacrifice to double | Burst |
| 30 | Grave Harvest | Void | 1 | Power: Sacrifice/Exhaust apply 3 Doom to ALL | Build-around |

## 5. Interaction model: the chain

The design problem: Yu-Gi-Oh! and MTG interaction is the deepest in card games, and also the slowest (priority passes, "respond?" prompts every action). On a phone it must cost zero taps.

**Rules (as implemented in `src/engine/combat.ts`):**

1. Any action (card or enemy move) is **declared** as link 1.
2. The opponent's set cards are checked for a matching trigger (⚔ attack, ✋ non-attack, ⟲ a trap firing). The first match becomes link 2. Then the other side checks against link 2, and so on, **up to 6 links**.
3. The chain **resolves from the top down** (last in, first out). A **Negate** cancels the link directly below it.
4. **Chain N** cards get a bonus if the chain they are part of reaches N links.

**Why it stays fast:** you pre-commit by *setting* Reactions on your turn. There are no response prompts, ever (MTG Arena's auto-pass taken to its end point). The chain plays itself as a 1.3-second overlay listing the numbered links, which can be tapped away.

**Enemy side:** enemies set traps as part of their intent ("🂠 ⚔" means *it will set a trap that fires on your attacks*). Face-down traps show their trigger, never their contents (Netrunner ICE). Each enemy's info panel lists every trap it *can* set, so hidden information is bounded and learnable rather than opaque RNG.

**What this adds to the usual deckbuilder model:** bait plays (a 0-cost attack to pop a Counter Glyph before your big hit), sequencing within a turn, and a defensive game that is played *before* the enemy acts.

## 6. Roguelike structure

- **Map:** 3 acts × 8 rows × 4 columns, generated per seed with non-crossing paths. Row 1 is always a fight, row 4 a treasure, row 8 a rest site, then the boss. Other rows weight: fight 46, event 22, elite 11 (17 at A1+), shop 9, rest 12 (rows 5–6 only).
- **Nodes:** Fight (card of 3 + gold), Elite (relic + better card odds), Event (9 events, choices with stated odds), Shop (5 cards incl. 1 on sale, 3 relics, card removal 75g +25 each use), Rest (heal 30% or upgrade a card), Treasure (relic + gold), Boss (rare card of 3 + boss relic of 3, full heal).
- **Deck thinning and upgrades:** shop removal, Wandering Dealer and Chain Library events; upgrades at rest, events and the Deck Box relic. Every card has an upgraded version (+ numbers, lower cost, or loses Exhaust).

### 15 example relics

| Relic | Rarity | Effect |
|---|---|---|
| Duelist's Fan | Starter | First chain of 2+ each turn draws 1; the first each fight also gives +1 energy |
| Root Heart | Starter | Start fights with 2 Thorns |
| Hollow Crown | Starter | When your Reaction leaves play, 3 Doom to ALL |
| Iron Buckle | Common | Start fights with 8 Block |
| Tide Glass | Common | Bank 1 more Flux |
| Ember Jar | Common | Start of fight: 3 Burn to ALL |
| Trap Lens | Common | Destroy 1 enemy trap at fight start; enemy traps shown face-up |
| Spare Slot | Uncommon | +1 Reaction slot |
| Mirror Shard | Uncommon | Gain 4 Block whenever an enemy trap fires |
| Linked Ring | Uncommon | Chains of 3+ draw a card |
| Cracked Lens | Uncommon | Vulnerable is +75% instead of +50% |
| Phoenix Feather | Rare | Once per run, survive death at 30% HP |
| Counterweight | Rare | Each Negate banks 2 energy |
| Ember Heart | Boss | +1 energy each turn; no Flux |
| Grand Stage | Boss | +1 Reaction slot and +1 Flux; start fights Vulnerable |

### 3 bosses

| Boss | Act | HP | Pattern | What it tests |
|---|---|---|---|---|
| **The Lantern Warden** 🏮 | 1 | 120 | Searing Sweep (6×2 + Burn) → Kindle (+2 Str, sets Spike Shell) → Lantern Glare (Weak, Vulnerable, Block). Below half HP: one telegraphed FLARE (18 + Burn) | Basic sequencing; bait the Spike Shell before your big attack; save a Reaction for the Flare |
| **Chorus of Knives** 🎼 | 2 | 160 | Verse hits 4 × (2, 3, 4, 5…) knives; Refrain sets Counter Glyph + Smother; Harmonics buffs. CRESCENDO 28 below half | Damage race vs. escalation; Thorns and Weak shine; counter-traps vs. Smother |
| **The Last Dealer** 🃏 | 3 | 210 | The Deal sets 2 random traps from 5; gains Strength each time one of its traps fires; Call 5×4; Raise; ALL IN (30) below 40% | Full chain mastery: Disrupt, counter-traps, baiting, and not feeding it Strength |

### Stakes ladder (Stakes 0–10, per character; was "Ascension" before v0.14)

Each rung is about the chain or the Dealer, not about HP: 1 every enemy starts with one trap already set · 2 Rivals get a Rebuttal from Act 1 · 3 Rivals and bosses start with 1 Edge · 4 the Dealer answers every rare you take · 5 twice as many face-down map cards and no Act 1 Peek · 6 the Omen belt holds 2 · 7 bosses +10% HP · 8 Merchant prices +20% · 9 all enemies +1 Edge · 10 the Last Dealer sets an extra trap. Winning at Stakes *n* unlocks Stakes *n*+1 for that character. (v0.14 vocabulary: Block→Guard, Strength→Edge, Weak→Shaken, Vulnerable→Exposed (+40%), Exhaust→Fold, Retain→Palm, Innate→Opener, Curse→Jinx, Power→Stance, Skill→Trick, Elite→Rival, Relic→Keepsake, Heat→Wager. Older sections of this document use the old words; see docs/17-V14-CLEAN-SLATE.md.)

## 7. Meta-progression

What carries over: **XP → level**, which unlocks options, never raw power. Since v0.10 the in-game unlock list (`UNLOCKS` in `src/engine/meta.ts`) is derived from the `unlock` fields in characters, cards and relics, so this table and the level-up popup cannot drift apart.

| Level | XP | Unlocks |
|---|---|---|
| 1 | 0 | The Ashen Duelist, The Arbiter, The Tempest (available from the first run) |
| 2 | 100 | The Thorn Warden, The Rimeblade, Patience, Grave Bell |
| 3 | 250 | The Cardsharp, The Beastcaller, Wildcard, Sharpened Edge |
| 4 | 450 | The Hollow, The Geomancer, Ember Crown, Grove Guardian |
| 5 | 700 | The Magpie, The Alchemist, Flow State, Soul Rend |
| 6 | 1000 | The Sexton, The Nightblade, Chain Crown |
| 7–10 | 1400–3200 | **(planned)** card backs, map themes, Echo frames; the content of each expansion slots in here |

XP per run = floor × 4 + elites × 15 + bosses × 40 + 100 for a win + 10 × Ascension. A typical early loss (floor 9–12) earns 45–70 XP, so **the second character unlocks within 2–3 runs** and the third within about a week of casual play (7–9 runs).

**Pacing for the first 30 days:** days 1–2 learn Duelist and unlock Warden; days 3–7 unlock Hollow and see Act 3; week 2 first win and Ascension 1; weeks 3–4 Ascension climbing, Legacy collection, Daily Duel habit. Unlocks add *breadth* (more cards in the pool, which slightly dilutes rewards), so late runs are not trivial; Ascension supplies the difficulty curve.

**Avoiding pointless early runs:** every run gives XP, Daily Duel score, and from the first boss kill a Legacy deck.

## 8. The TCG layer

- **Collection:** the Codex shows every card, locked cards with their unlock level. Cards are never bought.
- **Legacy decks (the "minted run deck"):** after beating any act boss you can mint your final deck. Up to 12 are kept, named automatically (*Silent Gambit*, *Burning Vigil*).
- **Echoes:** Act 2 and 3 elites (and the Lost Duelist event) are **Echoes**: the game plays a Legacy deck against you through the *same card code*, showing its planned cards as intents. Offline, Echoes come from your own minted decks plus three built-in ones.
- **Async PvP (planned):** upload minted decks; Echo elites are drawn from other players' decks matched by Ascension; win/loss against a deck feeds an Elo-like rating for the *deck*, and the owner gets a "your deck defeated 14 duelists this week" notification (Super Auto Pets / The Bazaar loop without real-time netcode).
- **Trading/crafting:** none. Deliberately: trading creates real-money markets and pay-to-win pressure.

## 9. Balance framework

**Cost-to-power yardstick** (comment at the top of `src/data/cards.ts`): 1 energy ≈ 6 damage ≈ 5 Block ≈ 1.3 cards drawn ≈ 2 stacks Weak/Vulnerable ≈ 3 Burn ≈ 5 Doom. Commons sit on the curve, uncommons +10%, rares +20% *or* a new axis. **Reactions get +30% budget** because they are conditional, cost a slot, and are spent on the turn before they work. Negate is valued at the expected value of the enemy action it stops (≈ 2 energy for attacks, 1 for skills).

**Valuing draw, removal, tempo:** draw is worth 0.75 energy/card early in a fight and drops as the fight goes on; Disrupt is worth one enemy trap ≈ 1 energy; Flux banked is worth 0.9 energy (a banked energy is slightly less flexible).

**Automated balancing (shipped):** `npm run sim` plays full runs with a lookahead bot (each candidate line is played out on a copy of the fight, including the enemy turn) and reports win rate, act reached and top killers. The bot is a floor for a decent human. Latest results at Ascension 0 are in [BALANCE.md](BALANCE.md).

**Targets:** bot win rate per character at A0 within 15–40% of each other; no single encounter > 30% of deaths; human target A0 win rate 30–45% after 5 runs. Telemetry (planned): per-card pick rate, win rate when in deck, and play rate; per-encounter death rate and HP lost; flag a card when win-rate-in-deck deviates > 4 points from its faction average over 5k runs.

**Patch cadence:** balance hotfix within 72h of launch, then monthly; content each season.

**Power creep prevention:** new cards must fit the yardstick; expansions add a **new faction pairing and new axes** (a new keyword) rather than raising numbers; old cards are buffed up to curve instead of new cards going above it; no rotation is needed because nothing is sold.

## 10. Onboarding

- **First 10 minutes:** the first run is the tutorial. The Ashen Duelist is the only character; the first two fights of every act come from an easy pool (Cinder Rats, Gloom Moth, Bramble Beetle). Five contextual coach tips appear when relevant: tap-to-read and play, intents, Reactions (shown when you first hold one), enemy traps (shown the first time one is set), chains and Flux. Every keyword explains itself under the selected card.
- **First session:** the easy pool introduces at most one simple enemy trap (Bramble Beetle's Spike Shell); the first elite (e.g. Gatekeeper's Counter Glyph) teaches baiting. **(Planned:** a scripted first-run order so every new player meets traps in the same sequence.)
- **First week:** Warden (defensive, forgiving) unlocks on day 1–2; Hollow (the expert character) later. Daily Duel from day 1.
- **Never-played-a-card-game players** never see "priority" or a response prompt; they set cards, the rest is automatic.
- **MTG/YGO veterans** get chains up to 6 links, counter-traps (Mirror Tide vs Smother), Sacrifice, Doom math, and Ascension 10.
