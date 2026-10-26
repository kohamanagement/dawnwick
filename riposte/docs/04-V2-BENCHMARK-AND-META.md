# Riposte v0.2 · Benchmark round 2 and the meta layer

v0.1 proved the core: a roguelike deckbuilder where enemies answer your cards (Yu-Gi-Oh-style chain, LIFO, no response prompts). This round asks what the best roguelike and TCG games give players **between** and **around** fights that Riposte lacked, then adds the parts that fit. The rule for every borrowed idea: take the reason it is fun, then twist it so it pushes players toward Riposte's own mechanic, the chain.

## 1. What the benchmarks do that v0.1 did not

| Game | What keeps people playing | Riposte v0.1 had | Gap |
|---|---|---|---|
| **Slay the Spire** | Map pathing with risk/reward (elites, "burning" elites with the emerald key), card removal, upgrades, Ascension, unlockable cards per character | Map, elites, Ascension, upgrades | No optional high-risk/high-reward node; few reasons to deviate from the safe path |
| **Monster Train** | Clan unlocks by leveling each clan, card **upgrades/"Merchant of Steel" stones** that change how a card plays, multiple paths per floor | Level unlocks | No way to **modify** a card beyond +1 upgrade |
| **Inscryption** | **Sigils** stamped onto cards (sacrificing to transfer them), deck as a physical object, surprise | Nothing like sigils | Same as above; also no "the cards themselves are toys" feeling |
| **Balatro** | Joker/edition rarity tiers, **Foil/Holo/Polychrome editions**, a shop between every blind, unlocks via challenges, absurd combo scaling | Shop | No collectible finishes, no "chase" rarity |
| **Roguebook** | **Persistent talents** bought with run currency, page-painting map exploration, two heroes in synergy | Profile level only | No talent tree / RPG growth |
| **Hades / Rogue Legacy** | Persistent upgrades (Mirror of Night), **Heat/Pact** opt-in difficulty modifiers, every run pays something | XP | Runs that fail early felt like zero progress |
| **Hearthstone** | **Booster packs** with pity timer, **dust crafting** (disenchant duplicates), golden cards, quests, daily login | None (v0.1 design said "no packs ever") | No collection at all |
| **Marvel Snap** | Fast unboxing, card **variants/levels** (cosmetic progress), daily missions, simple currency loop | None | No daily reason to return |
| **MTG Arena** | Collection + **deck builder**, wildcards (craft-anything currency), daily wins, event modes | None | No deck ownership between runs |
| **Yu-Gi-Oh Master Duel** | Craft with "Craft Points" from dismantling, secret packs targeted at archetypes, **Glossy/Royal** finishes | Chain rules (the inspiration) | No collection, no archetype-targeted packs |
| **Legends of Runeterra / Path of Champions** | PvE roguelite where **champions level up permanently** and gain relic slots | Ascension per character | No sense that *your* character grows |
| **Wildfrost / Dicey Dungeons** | Charms that modify units/dice; short, cute runs; clear tooltips | Keyword rules list | Fine |

**Common threads Riposte was missing:** (1) a persistent **collection** that matters in runs, (2) **card modification** beyond upgrades, (3) **packs and crafting** for a "chase", (4) **RPG growth** (talents), (5) **daily hooks** (quests, gift, rotating shop), (6) **optional risk** on the map, and (7) **unlocks earned by doing things** rather than by grinding XP. Also: v0.1's cards were text boxes with no art, the hand felt static, and there was no drag-to-play.

## 2. What v0.2 adds, and how each idea is twisted to be Riposte's own

### Collection and economy (Hearthstone/Master Duel, made roguelike-safe)

- **Two currencies.** 🪙 **Coins** are earned at the end of every run (floors, elites, bosses, Champions, Dares, wins, Ascension), from daily quests, level-ups and trophies. ✨ **Dust** comes from breaking spare cards. In-run 💰 gold stays separate. No real money anywhere in the prototype.
- **Booster packs** (Duelist, four faction packs, Legend pack) with a 12-pack Legendary pity timer and 6–15% foil odds. Pack opening has a tear animation, rarity-glow on face-down cards, and tap-to-flip.
- **The Riposte gamble (original).** After revealing a pack you may *answer* one pulled card: 50% it jumps a rarity (common/uncommon → rare, rare → Legendary), 50% it shatters into double Dust. It turns the most passive moment in every card game into a decision, and it is literally the game's verb.
- **Daily market** (2 uncommons, 1 rare, 1 Legendary, refreshes at midnight) and a **daily gift pack**.
- **Forge:** craft any unlocked card with Dust (40/100/400/1600), dust single copies or "all spares" (keeps a playset of 3, 1 for Legendaries).
- **Why it does not break the roguelike:** the collection never gives you a built deck. It (a) doubles the odds that cards you own are offered in drafts, (b) gates **10 new Legendaries** out of runs until you own them, and (c) feeds **Loadouts**, which swap only 2 starter cards (up to 5 with talents). Daily Duels switch all of it off so the shared seed stays fair.
- **Souvenirs (original).** At the end of a run you keep 1 card from your final deck (2 if you won). Every run, even a loss past floor 5, feeds the collection, and the deck you just loved comes home with you.

### Sigils: card modification that bends the chain (Inscryption/Monster Train, rethought)

Six sigils, one per card, imprinted in the Forge for Dust (permanent, every copy you take into runs, starter cards included) or stamped at the new ⚒ **forge stops** on the map (one free, this run only):

| Sigil | Effect | Why it is Riposte-specific |
|---|---|---|
| ◈ Keen | +25% damage/Block/Doom/heal (min +2) | The plain one |
| ⛓ **Linked** | Counts as 1 extra chain link for its own Chain N bonuses | Makes chain payoffs reachable without a perfect bait |
| ↩ **Ricochet** | If Negated, it bounces back to your hand | Turns enemy Counter Glyphs from a loss into bait |
| ⚡ Swift | Costs 1 less | |
| ⏳ Lasting | Retain | Lets you hold an answer for the right turn |
| ☀ Opening | Innate | Guarantees your key Reaction is set on turn 1 |

### RPG growth and unlocks (Roguebook/Hades/Path of Champions)

- **Level cap 10 → 20.** Every level: +1 talent point, 50 Coins, a Duelist Pack.
- **The Salle (talent board):** three fencing schools, four tiers each, free respec. *Guard* (Max HP, opening Block, heal after fights, a starting relic), *Coin* (starting gold, shop discount, gold bonus, Coin bonus), *Feint* (Loadout slots, card-reward rerolls, extra first-turn draw, 4-card rewards). Tier N needs 2×(N−1) points in that school, so you commit to a style.
- **Character stats** are shown on the duelist screen (HP, energy, draw, Reaction slots, starting gold/Block) including talent bonuses.
- **18 trophies** with rewards; four of them **unlock new relics** into the run pool (Chain Gauntlet, King's Reserve, Trophy Belt, Merchant's Seal) and one grants the Legendary *Grand Riposte*.
- **Daily quests** (3 per day, one reroll) such as "Resolve 25 chains", "Win a Dare", "Reach floor 14".

### Deeper run strategy

- 🔥 **Champion elites (StS burning elite, with a twist).** One elite per act carries a random affix (Armored, Enraged, Vigorous, Trapper, Thorned). It pays a rare card choice, a relic and 60% more gold. Trapper is the Riposte flavor: an extra face-down trap from the start.
- 🎲 **Dares (original).** Before any elite or boss, stake up to 25 gold on one of two offered dares: win by turn 4 (7 for bosses), lose ≤10 HP (≤18), resolve a 4-link chain, Negate twice, resolve 5 chains. Win: stake back +40 gold. They reward *playing the chain on purpose* instead of turtling, and give skilled players a gold engine.
- ⚒ **Forge stops** on the map (see sigils).
- **Synergy hints:** reward and shop cards show 🔗N when they share a mechanic (Burn, Doom, Chain, Sacrifice, Negate…) with N cards already in your deck.
- **10 Legendaries** (2 per faction): e.g. *Maelstrom* (Reaction: Negate the attack, draw 2), *Requiem Bell* (0-cost: Negate an enemy trap and Doom its owner), *Inferno Duel* (Chain 2: Burn per hit), *Worldroot*, *Oblivion*.
- **Balance levers applied:** the Hollow (weakest duelist) gets a 3rd Reaction slot and Hollow Crown applies 4 Doom instead of 3. Fixed a bug where combat-start Block (Iron Buckle, talents) was wiped before turn 1.

### Graphics and UX

- **Procedural card art:** each card has an art window (faction scene in SVG, varied per card by a hash of its id, plus a glyph), a cost gem, a type banner, keyword highlighting, and a rarity gem. Uncommon/rare/legendary frames differ; Legendaries have an animated prismatic border; foils have a moving holo sheen. Still zero image files; the whole game is one ~220 KB HTML file.
- **Hand feel:** the hand fans like a held hand; playable cards glow; **drag a card up to play it, or onto an enemy with a targeting arrow** (tap-to-play still works); cards fly to their target.
- **Combat feedback:** enemies sit on lit medallions with idle bob; hit flash and knockback, sparks, bigger crit numbers, screen shake on big hits, shield pulse on Block, a death burst, "Your turn / Enemy turn" banners, chain links animate in one by one, a pulsing energy orb, and "End turn" glows when nothing is playable.
- **Act backdrops** (green dusk, crimson, void violet), animated map paths from your position, Champion nodes on fire.
- **Hub with bottom navigation** (Play, Cards, Shop, Forge, Profile), a wallet bar, red dots for things to do, and one-time coach tips per screen. A welcome sheet explains what changed for returning players.
- Everything respects *Reduce motion* and *Fast animations*.

## 3. What else would improve the game (recommendations, not built yet)

Ranked by fun per unit of work:

1. **Async PvP against real Echoes.** The Legacy → Echo system already plays a saved deck through the same rules. With a small server, your Echoes appear in other players' runs and you get Coins when your deck wins. This is Riposte's best long-term hook and the main thing no competitor has.
2. **A fourth duelist built on Dares or sigils**, e.g. a "Gambler" whose cards get stronger while a Dare is active, or a "Smith" who stamps sigils mid-combat.
3. **Heat-style modifiers** (Hades Pact) instead of linear Ascension: pick your own mix of handicaps for score multipliers. Pairs naturally with Daily Duel leaderboards.
4. **Weekly "Gauntlet" events** with a fixed deck from a theme pack and a rotating rule (e.g. every card has Ricochet), rewarding a Legend Pack.
5. **Card mastery:** a card gains a cosmetic star tier and a free sigil slot after N wins with it in your deck (Marvel Snap-style collection progress without power creep).
6. **Real art and audio.** The procedural frames make a good template; commissioned faction illustrations and a hit/chain sound set would be the biggest perceived-quality jump.
7. **Boss relic drafting across acts** and more events that interact with the collection (e.g. "trade a card from your collection for a run relic").
8. **Accessibility:** colorblind-tested faction palettes, screen-reader pass on the hub, and a one-tap "auto-target" option.

## 4. Decisions made without asking (per Mike's standing instruction)

- **Packs now exist, earned-currency only.** The v0.1 plan said "no packs ever" to avoid loot-box regulation. Packs bought with in-game Coins only, with published odds and a pity timer, keep that promise. Selling Coins for money would reopen the loot-box question and is not recommended (see doc 03 business model).
- **Collection is a light touch on runs** (draft weighting, Legendary gating, 2–5 starter swaps) so a new player and a veteran still have comparable runs. Daily Duels ignore the meta layer entirely.
- **Talent points start at 1 at level 1** so the board is usable from the first session.
- Booster pack and gamble randomness are not seeded (meta-only); run randomness stays fully seeded and replayable.
