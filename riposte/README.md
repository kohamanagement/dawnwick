# Dawnwick: The Last Word

_Formerly **Riposte** (renamed in v0.14.1 because the name was taken; the project folder, save keys and deck codes keep the old name so nothing breaks)._

**A phone-first roguelike card game where every move has an answer.**

*A solo trading-card duel you play as a roguelike: you collect, build and bet a deck, and the table answers back.* Enemies set face-down traps that answer your cards; you set Reactions that answer theirs. Answers stack into a chain of up to 6 links and resolve last-in, first-out. Since v0.7 you can also jump into the chain from your hand with **Counters**, and every card and enemy has one of 8 **Elements** on a rock-paper-scissors wheel. Beat a boss and you can mint your deck as a Legacy; it comes back as an **Echo** rival that plays your old deck against you.

## Executive summary

- **Niche:** solo, medium-depth card play with real card-on-card interaction. Roguelike deckbuilders have depth, but enemies never respond to you. TCGs (MTG, Yu-Gi-Oh!) have interaction, but need an opponent, long rules and money. Nobody serves the overlap on phones. See [docs/01-BENCHMARK-AND-NICHE.md](docs/01-BENCHMARK-AND-NICHE.md) (100-game benchmark, 5 niches scored).
- **Pitch:** 35–45 minute runs split into 3–5 minute fights, playable one-handed in portrait, fully offline. Between runs: a collection, booster packs and crafting, all with earned in-game currency only.
- **Why it can win:** it owns a mechanic (the chain) that no roguelike deckbuilder owns, it costs rules rather than content to build, and its async PvP (Echoes) needs no live matchmaking.
- **Three defining mechanics:**
  1. **The Answer Chain:** traps and Reactions answer each other, up to 6 links, LIFO; *Chain N* cards reward baiting.
  2. **Visible-trigger traps:** you always see *what* sets an enemy trap off (⚔ ✋ ⟲), never *which* trap it is; every enemy lists its possible traps.
  3. **Legacy → Echo:** your best run decks become ghost opponents (offline now, other players' decks once a server exists).
- **Business:** free Act 1 demo → $6.99 one-time unlock, $3.99 expansions, cosmetics only; no loot boxes or energy. See [docs/03-MOBILE-BUSINESS-AND-BUILD-PLAN.md](docs/03-MOBILE-BUSINESS-AND-BUILD-PLAN.md).

## New in v0.16 "Every Action Sounds"

Nothing happens silently any more. Hits on you sound different from your hits; Block that soaks a hit thunks and flashes blue, Block that breaks cracks; Counters ring and flash gold the moment you press them; traps flash red; attack cards slam down with a shockwave. Outside fights, gold showers coins while the HUD number counts up, keepsakes pop into the bar with a fanfare, chests creak open and burst, cards slide into the deck, and the Merchant, Candle, forge and events each greet you with their own sound. 29 new synthesized effects (67 in all, still no audio files), all under the Effects setting and Reduce motion. Full audit table: [docs/21-V16-EVERY-ACTION-SOUNDS.md](docs/21-V16-EVERY-ACTION-SOUNDS.md).

## New in v0.15.1 "Sharp Pixels"

Icons now land on whole device pixels on 2x and 3x phones (no more uneven 3- and 4-px columns), nothing scales or tilts them at rest, every icon has a closed 1 px outline, dark icons get a rim light, and the Merchant is a travelling trader instead of a shopping cart. Notes: [docs/20-V15-1-SHARP-PIXELS.md](docs/20-V15-1-SHARP-PIXELS.md).

## New in v0.15 "Pixel Icons"

Every emoji and placeholder glyph is now a hand-drawn hi-bit pixel icon (247 icons, one shared palette, crisp edges): card art, keywords, statuses, elements, factions, map stops, keepsakes, enemies and buttons. Factions show real pictures instead of shapes. Layout and balance are unchanged. Icons live in `tools/pixel/` and build into `src/ui/pxicons.ts`. Notes: [docs/19-V15-PIXEL-ICONS.md](docs/19-V15-PIXEL-ICONS.md).

## New in v0.14.1 "Dawnwick"

The game is now **Dawnwick: The Last Word**, after the lamp at the Last Table whose flame was Vesper's sun (Wick is its last ember). The chain is now called the **Answer Chain** in the UI and docs; Counter cards are still Ripostes. App id is `com.dawnwick.game` on iOS and Android. Returning players see a one-time note; saves carry over. Name research and clearance: [docs/18-RENAME-DAWNWICK.md](docs/18-RENAME-DAWNWICK.md).

## New in v0.14 "Clean Slate"

The frame around the fights now plays like a card table, not like any other roguelike. Some map cards are dealt **face-down** (you see the suit, not the card; one Peek per act). After a fight **the Deal** adds a face-down card a rarity higher, and **the Dealer may answer** a rare or blind pick: Negate it with gold or take a Jinx. **Omens** are instant-speed answers you turn over mid-chain. Enemies show a small **deck with a tell card** instead of intent icons. **Wick's Candle** offers Mend, Hone, Rehearse (start the next fight with a Reaction set) or Scout (flip the map). **Patrons collect a debt** at the boss unless you pay it off. The **Echo Gallery** is on the title screen, and on run 2 your first Rival is your run-1 deck. New words throughout (Guard, Edge, Shaken, Exposed, Fold, Palm, Opener, Jinx, Stance, Trick, Rival, Keepsake, Stakes, Wager, Tell), new numbers (removal 60+30, Mend 25%+4, Exposed +40%, boss keepsake 1 of 2) and a chain-themed **Stakes** ladder. Notes: [docs/17-V14-CLEAN-SLATE.md](docs/17-V14-CLEAN-SLATE.md).

## New in v0.13 "Table Music"

A real soundtrack, still all synthesized (no audio files, +34 KB): a composed theme per act (the back room, the Masquerade waltz, the Fog), sparse on the map and fuller in fights, a tense variant for every boss, a heartbeat at low HP, and music that hushes while the Counter window holds the chain. 38 sound effects including trap springs, your Counter's ring, the boss gong, shop bell, map card flips and Wick's flame going out when a run ends. Settings: music and effects each get an on/off switch and a volume, plus an iPhone silent-switch option. Notes: [docs/16-V13-TABLE-MUSIC.md](docs/16-V13-TABLE-MUSIC.md).

## New in v0.13.1 "No timers in the chain"

The game now stops every time an enemy trap, Counter or Rebuttal answers (even if you cannot answer back), and the chain recap waits for Continue. Notes: [docs/15-V12-1-READ-THE-CHAIN.md](docs/15-V12-1-READ-THE-CHAIN.md).

## New in v0.12.1 "Read the Chain"

The Counter window now pauses the chain with the enemy card shown face-up (its text, target and how much damage gets through your Block), lets you tap any link to read it, and has separate **Let it resolve** / **Counter with …** buttons. The chain recap shows each link's text, stays up longer, and waits while you read a link. Notes: [docs/15-V12-1-READ-THE-CHAIN.md](docs/15-V12-1-READ-THE-CHAIN.md).

## New in v0.12 "Fewer, Better" (a quality pass)

Full notes: [docs/14-V12-FEWER-BETTER.md](docs/14-V12-FEWER-BETTER.md). Balance: [docs/BALANCE.md](docs/BALANCE.md).

- **459 cards cut** (2,049 collectible left): 347 that played like another card once gates are ignored, 67 whose only extra effect sat behind a gate that is true under 20% of the time ("Chain 2" on a card you play holds 9%), 45 that were the weakest of their type and cost in the card lab. Old saves swap cut cards for the card they played like.
- **Card lab** (`sim/cardlab.ts`): 7,800 bot runs per round record each card's offers, draws, plays and value. The bot now scores every status and spends its gold.
- **Better rewards**: no two cards that play the same way, never three of one type, and the last card leans toward your deck.
- **A Merchant every act**, **shorter, harder-hitting bosses** (about 9 turns instead of 11), Act 1 hallway fights that bite, and a faster Sexton.
- Balance: fresh 16–27% for every class, career 31–45% (mean 37.6%).

## New in v0.11 "Branching Paths" (2,617 cards and a storyline)

Full notes: [docs/12-V11-BRANCHING-PATHS.md](docs/12-V11-BRANCHING-PATHS.md). Story: [docs/13-STORY.md](docs/13-STORY.md).

- **2,617 player cards**: 2,508 collectible, plus 70 evolved forms you can only reach in a run. Every card was checked for repeats, and `npm run audit` finds 0 redundant pairs.
- **Two upgrade paths per card**: path A (Name+) raises the numbers; path B (Name✦) adds a keyword instead (no Exhaust, 1 cheaper, Retain or Innate).
- **70 Evolve cards**: play one copy enough times in fights you win and it becomes a stronger card for the rest of the run.
- **234 class-pair hybrids**: three for each pair of the 13 classes, draftable by both.
- **56 new powers and 1,158 faction-set cards**, written in a small design language that prices every number and rejects bad designs.
- **A storyline, "The Last Word"**: carry the last ember of the sun down the duel hall beneath Vesper to the Last Table. Short scenes play at act starts, bosses and the results screen, with story events, a talking candle named Wick, and an ending for each class.
- **The Spread**: the act map is now dealt as cards down the Dealer's table.
- **New balance target**: a new profile wins 15–30% of bot runs with every class, and a levelled-up profile wins more. See [docs/BALANCE.md](docs/BALANCE.md).

## New in v0.10 "Polish Pass" (100 rounds of UI, UX and balance)

Every round is logged in [docs/11-V10-POLISH.md](docs/11-V10-POLISH.md).

- **Fix**: the level-up unlock list and the design doc now cover all 13 classes. The list is derived from the data, so it can't go stale again.
- **About 87 UI/UX rounds**:
  - The class picker is a grid.
  - Shop items, crafting and dusting ask before you spend.
  - Map nodes can be pressed and held to read them.
  - A chip shows the total incoming damage.
  - The rest site shows the real heal amount.
  - Keyboard shortcuts.
  - Readable text at 360px, plus many smaller fixes.
- **13 balance rounds**:
  - Bosses in the same act are now about as hard as each other. The Gravelord used to end 88% of the runs that reached it and now ends 67%.
  - Every class stays in the 10–30% bot win-rate band. See [docs/BALANCE.md](docs/BALANCE.md).

## New in v0.9 "Clean Cut" (no more repeat cards)

Full list, the redundancy test and every before/after: [docs/10-V9-CLEAN-CUT.md](docs/10-V9-CLEAN-CUT.md).

- **Audit**: 102 pairs of collectible cards did the same thing (same type, cost, element and rules, numbers within 2 or 25%). All were made by the v0.7 generator; no two hand-made cards repeated
- **27 generated powers** that copied a hand-made power now each do something new (e.g. "At the end of your turn, deal 3 damage to each enemy with Burn", "Whenever an enemy Freezes, deal 7 damage to ALL enemies")
- **75 cards reworked** into a different second effect, mostly new payoffs: "deal N damage to each enemy with Burn / Chill / Shock / Tremor / Weak / Doom / Mark"; **4 cut** (owned copies refund 20 Dust). Ids and names are unchanged, so decks and collections stay valid
- The generator now refuses to print a repeat, a test fails if one appears, and `npm run audit` checks the pool
- **Balance re-checked**: fresh 11–16%, career 18–30%, every class in the 10–30% band (Cardsharp, Tempest, Beastcaller, Nightblade HP nudged)

## New in v0.8 "Hard Earned" (balance)

Target: a **10–30% win rate** at Ascension 0. Measured with 100 bot runs per class from a blank profile (**10–16%**) and 100 runs per class on a profile that keeps all its progression (**17–32%**, mean 26%). Details, ablations and every number changed: [docs/BALANCE.md](docs/BALANCE.md).

- **Base difficulty** dial in `src/data/difficulty.ts`: enemies have 5 / 12 / 15% more HP and hit 3 / 8 / 13% harder in Acts 1 / 2 / 3
- **Progression trimmed**: 1 base loadout swap (Signature Moves +1), at most 1 Rare and no Legendaries in a loadout; smaller Guard and Coin talents; owned Legendaries show up a little less in drafts
- **Classes evened out** with HP and three starter tweaks (Storm in a Bottle, Spark Ward, Tombstone); Eternal Objection, Mirror Riposte and Bankroll toned down
- **The Nemesis moves on** after beating you three times running
- New sim modes: `PROFILE=fresh` and `PROFILE=career` (plus `ABLATE=…`) in `npm run sim`

## New in v0.7 "Elements & Counters"

Full list and the decisions behind it: [docs/09-V7-EXPANSION.md](docs/09-V7-EXPANSION.md).

- **1033 player cards** at v0.7 (994 collectible, up from 204): 183 new hand-designed signature cards plus 646 generated from balanced effect atoms, so every faction has 55–113 cards
- **8 Elements**: 🔥 Blaze → ❄️ Frost → 🌿 Wild → ⚡ Storm → 🌊 Flood → 🪨 Stone → 🔥 (each beats the next two, ×1.3 / ×0.75), plus ✨ Radiant vs 🌑 Umbral. Every enemy has an Aspect; your **Attunement** (last elemental card played) is what they hit; 3 cards of one element in a turn trigger **Resonance**
- **Counters** (113): a new card type you hold in hand and play mid-chain to answer an enemy trap, attack or skill, paid with energy or Flux on the enemy turn. Enemies can answer your Counter and you can answer back; elite and boss **Rebuttals** cancel the first one
- **7 new classes and factions**: ⚖️ Arbiter (Dawn: Counters → Verdict), 🌩️ Tempest (Storm: Charge, Shock), ❄️ Rimeblade (Rime: Chill → Freeze → Shatter), 🐾 Beastcaller (Beast: companions), 🪨 Geomancer (Stone: Fortify, Tremor), ⚗️ Alchemist (Aether: Prism, Catalyze), 🥷 Nightblade (Dusk: Mark, Veil)
- 19 relics, 30+ statuses, a Counter prompt with Ask/Automatic/Never setting, element badges on every card, enemy and the player, and a paged, element-filtered collection

## New in v0.6 "Wilds & Wonders"

Full list and the decisions behind it: [docs/08-V6-EXPANSION.md](docs/08-V6-EXPANSION.md).

- **53 new monsters** (132 in all) and a third, **wild** version of every act: the Hollow Woods (boss: the Antlered King), the Wreckers' Coast (the Leviathan) and the Molten Deep (the Forgemother), plus shared monsters that roam every act
- **Rare monsters** (Gilded Hare, Treasure Crab, Wishing Star) that flee after 3 turns: catch them for gold and a relic
- **Every act rolls a Sky and a Layout**: 15 Skies (Fog, Blood Moon, Heatwave, Starfall…) bend the act's rules, and 7 map shapes (the Gauntlet, the Labyrinth, the Crossroads Fair…) change the paths
- **24 Fates**: pick a run-long identity at the start (the Gambler, the Hermit, the Daredevil…)
- **91 new events**: 60 map events (many multi-stage), 12 **Shrines**, 35 **roadside encounters** that pop up on the way, and **Mystery** nodes 🔮
- **18 Surprises** that interrupt fights (a runaway cart, reinforcements, a helpful crow), short-lived Buffs, 17 relics and 12 trophies
- **The Long Night compounds** (×1.25 HP and growing Strength per night) and adds a stacking Night Terror every night

## New in v0.5 "Graves & Venues"

Full list, research and design notes: [docs/07-V5-EXPANSION.md](docs/07-V5-EXPANSION.md).

- **The Sexton** ⚰️, a 6th character, and the **Grave** faction (27 cards incl. 2 Legendaries): Reactions that leave play go to the **Crypt**; **Exhume** sets them straight back into a slot; **Bury** and **Haunt** feed it
- **16 Venues**: elite and boss fights (and some normal ones) happen somewhere that bends the chain for everyone: fewer or more slots, longer chains, face-up traps, lightning, a bell that hits everyone on long chains
- **Patrons**: at the start of Acts 2 and 3, one of 5 old powers offers 3 of its 4 blessings (20 in all), several of which change the chain itself
- **Prime** (Reactions that grow each turn they stay set) and **Converge** (count the factions you played this turn): 16 cards spread across every faction
- **The Nemesis**: what killed you comes back next run, promoted, titled and holding a grudge; slay it for a bounty
- **The Long Night**: after a win, descend into endless scaling acts with a rotating boss
- 12 enemies incl. 3 new bosses (a second wandering boss per act), the **Blot** debuff, 3 new sigils (Reckless, Echoing, Haunted), 23 relics, 5 events, 2 Vows, 2 Twists, 10 trophies, a Grave pack and new cosmetics
- The Reflection's Doom against you is halved, so Doom decks can now beat their own mirror

## New in v0.4

Full list and design notes: [docs/06-V4-EXPANSION.md](docs/06-V4-EXPANSION.md).

- **The Magpie** 🐦‍⬛, a 5th character, and the **Glass** faction (27 cards incl. 2 Legendaries): **Steal** the enemy's face-down traps into your own slots and they fire *for you*; nothing to steal makes a **Glint** (0-cost spark); **Mimic** replays your last card
- **Riddles of the Chain**: 14 hand-made one-turn puzzles (Events tab). Every one is proven solvable by an exhaustive solver in `npm test`, and the obvious left-to-right play fails each one
- **Act 4, the Reflection**: slay 2+ Champions, beat the Act 3 boss, and face a mirror that plays *your own deck* against you
- **Wandering bosses**: the Briar Queen, the Magpie King and the Orrery can replace any act's boss (1 in 3 each)
- **Summoners and thieves**: 18 new enemies including 3 elites (Hedge Witch, Executioner, Mirror Knight), enemies that steal your Reactions (kill them to get the card back), 3 new trap types
- **More cards for everyone**: 22 new cards across Ember, Tide, Thorn, Void, Gilt and Neutral, including *Chainbreaker*, *Lure* and the Legendary *Ouroboros* (8-link chains)
- 15 relics, 8 Omens, 3 Vows, 2 Weekly Twists, 6 events, 9 trophies, new Familiars, card backs and titles
- **UX**: live **damage preview** on the selected card (HP loss and kill markers, hidden traps left out), a **trap warning** line, a scrollable **combat log**, run **highlights** on the end screen

## New in v0.3

Trend research (2025–26) and rationale for every feature: [docs/05-V3-TRENDS-AND-FEATURES.md](docs/05-V3-TRENDS-AND-FEATURES.md).

- **The Cardsharp** 🎩, a 4th character, and the **Gilt** faction (22 cards + 2 Legendaries): a **Fate Coin** (☀/☾) that cards read and flip with no randomness, plus **Ante** that you stack and cash in
- **Alternate acts**: each act rolls one of two versions (Drowned Market, Gilded Masquerade, Clockwork Abyss), with 18 new enemies and 3 new bosses
- **Vows / Heat**: 9 mix-and-match difficulty modifiers that multiply score, Coins and Renown
- **Omens**: 14 tarot consumables (hold 3, use as a free action)
- **Style score**: chains, Negates and kills feed a live meter
- **Arena** (async PvP): draft 16 cards and duel saved decks to 7 wins or 3 losses, with Rival's Pick spoils. **Deck codes** let you trade rivals with friends
- **Weekly Gauntlet**: one seed per week, 3 Vows and a rule-bending Twist
- **Card mastery** frames; a free **Season track** (30 tiers, cosmetic Familiars, card backs, titles); a Bestiary and run history
- **Synth audio**: 38 procedural sound effects, a chain that plays a melody, and composed per-act music with map/fight/elite layers and a boss variant (v0.13)
- **Balance**: the Hollow went from 8% to 29% bot win rate; every character is now 21–44% at A0

## New in v0.2

Benchmark and design rationale: [docs/04-V2-BENCHMARK-AND-META.md](docs/04-V2-BENCHMARK-AND-META.md).

- **Hub** with Play / Cards / Shop / Forge / Profile tabs, a Coins + Dust wallet and coach tips
- **Collection**: booster packs (5 kinds, pity timer, foils), the **Riposte gamble** (double-or-nothing on one pulled card), daily market and gift, crafting and dusting, end-of-run **souvenir** cards, starting-deck **Loadouts**
- **Sigils** (Keen, Linked, Ricochet, Swift, Lasting, Opening): permanent card mods from the Forge, or one-run mods at ⚒ forge stops on the map
- **10 Legendary cards**, only drafted once you own them
- **Talents** (3 schools, 12 talents), level cap 20, **18 trophies** (4 unlock relics), **daily quests**
- **Champion elites** with affixes and **Dares** (stake gold on winning with style) for elites and bosses
- **Graphics/UX**: procedural card art and rarity frames, foil and Legendary effects, fanned hand, drag-to-play with a targeting arrow, hit/death/shield effects, turn banners, act backdrops, animated pack opening

## What is in the build

- 13 characters (the Ashen Duelist to start; the rest unlock with profile levels), 14 factions + neutral, **2,158 player cards** (2,049 collectible, after the v0.12 cut), two upgrade paths per card, Evolve cards and class-pair hybrids, Counters and 8 Elements, a storyline across the acts
- 3 acts × 3 versions with generated branching maps in 7 layouts under 15 Skies, 6 wandering bosses, an optional Act 4 and the endless Long Night (8 stacking Night Terrors), 16 Venues, 5 Patrons, 24 Fates, a Nemesis, 132 enemies including 18 bosses and 3 rare monsters, 95 relics, 22 Omens, 111 events (incl. 12 Shrines and 35 roadside encounters), Mystery nodes, 18 mid-fight Surprises, 14 Riddles, shop, rest sites, treasure, forge stops, Champion elites
- Ascension 0–10 per character, 14 Vows (Heat), XP levels with unlocks, Daily Duel and Weekly Gauntlet, Arena, Legacy decks and Echo elites, deck codes, Season 1 track, card mastery, 57 trophies, collection/codex/bestiary, stats and history
- Tutorial coach tips on the first run, keyword rules under every selected card, text size, reduced motion, fast animations, left-handed layout
- Saves after every action (mid-fight included) and resumes exactly
- iOS and Android native projects (Capacitor 7), portrait-locked

Full design: [docs/02-GAME-DESIGN.md](docs/02-GAME-DESIGN.md). Every card/relic/enemy: [docs/CATALOG.md](docs/CATALOG.md). Balance results: [docs/BALANCE.md](docs/BALANCE.md).

## Run it

Needs Node 20+.

```bash
npm install
npm run dev          # open the printed URL; on your phone use the Network URL (same Wi-Fi)
npm test             # 49 rules + economy tests (chain, Doom, determinism, Echoes, packs, Fate Coin, Ante, alt acts, Vows, Omens, mastery, season, deck codes, Arena, save migration, Steal, Mimic, summons, Act 4, every Riddle solved, Crypt, Prime, Converge, every Venue, Patrons, Nemesis, Long Night)
npm run sim -- 150 0 # balance sim: 150 bot runs per character at Ascension 0 (ALT=0 or ALT=1 forces classic or alternate acts; NIGHT=1 sends winners into the Long Night)
npm run catalog      # regenerate docs/CATALOG.md from the data
npm run build        # production web build into dist/
```

`dist-single/index.html` (from `npm run build:single`) is the whole game in one file; open it in any browser.
For the claude.ai artifact, strip the skeleton with `python3 scripts/strip-for-artifact.py dist-single/index.html riposte-play.html`.

## Ship it to phones

```bash
npm run cap:android  # builds, syncs into android/, opens Android Studio → Run on a device
npm run cap:ios      # builds, syncs into ios/, opens Xcode (macOS only) → Run on a device
```

## Code map

| Path | What |
|---|---|
| `src/engine/combat.ts` | Rules engine: chain/response stack, damage, statuses, turns, enemy AI hooks, Echo (ghost deck) play, Steal/Mimic/summons, Crypt/Exhume, Prime, Venue hooks |
| `src/engine/run.ts` | Run structure: map generation, nodes, Venues on the map, Patrons, Nemesis, Long Night, rewards, shop, rest, events, scoring |
| `src/engine/meta.ts` | Profile, XP/levels, unlocks, Ascension, daily seeds, Legacy decks, storage |
| `src/engine/economy.ts` | Coins/Dust, collection, packs, gamble, crafting, sigil imprints, market, quests, talents, loadouts, trophies |
| `src/engine/puzzle.ts` | Riddles of the Chain: builds a one-turn puzzle fight and judges it |
| `src/engine/arena.ts` | Arena draft, rival generation, duels, spoils, deck codes |
| `src/engine/rng.ts` | Seeded, serializable RNG streams (daily fairness, replay anti-cheat) |
| `src/data/venues.ts`, `src/data/patrons.ts` | The 16 Venues (rules as data + hooks) and the 5 Patrons with their blessings |
| `src/data/wilds.ts`, `fates.ts`, `surprises.ts`, `events6.ts`, `enemies6.ts` | v0.6: Skies, Layouts, Night Terrors, Fates, Surprises, Buffs, the new events/shrines/roadside encounters, and the wild acts' monsters |
| `src/data/*.ts` | Cards, enemies (incl. alternate acts), relics, statuses, events, characters, Omens, Vows/Twists, Season/cosmetics/mastery (all content is data + small functions) |
| `src/main.ts`, `src/ui/*.ts`, `src/style.css` | Phone UI (no framework, ~130 KB gzipped total): run screens and combat FX in main, hub screens in `hub.ts`, Events tab (Season, Riddles, Arena, Weekly, codes, Vows) in `events.ts`, procedural art in `art.ts`, synth audio and music in `audio.ts` |
| `sim/` | Lookahead balance bot, simulator with fresh/career profile modes (`metabot.ts`), rules tests (79), exhaustive Riddle solver, catalog generator |
| `android/`, `ios/` | Capacitor native shells |

## What remains before store submission

See [docs/STORE-SUBMISSION.md](docs/STORE-SUBMISSION.md) for the step-by-step checklist. In short: hand-made art (sound is now synthesized and could ship as is), app icons and splash screens, in-app purchases for the unlock, a privacy policy URL, store listing assets, a signed release build on each store, and a human playtest round to confirm the balance.
