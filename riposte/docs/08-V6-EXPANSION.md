# Riposte v0.6: "Wilds & Wonders"

_2026-10-25. Builds on v0.5 ("Graves & Venues", [07-V5-EXPANSION.md](07-V5-EXPANSION.md))._

The brief was "10x more: more fun, more monsters, more random runs, more events, more pop-ups, and keep it balanced". v0.6 spends almost all of its effort on **variety between and inside runs** rather than on new rules, because the chain engine is already deep and what players see too often is the *same road*. Every system below is original to Riposte; none is a copy of another game's content.

## 1. What changed, in numbers

| | v0.5 | v0.6 |
|---|---|---|
| Enemies | 79 | **132** (+53) |
| Versions of each act | 2 | **3** (a "wild" version per act) |
| Events (all kinds) | 20 | **111** (60 map events, 12 shrines, 35 roadside encounters, plus follow-up stages) |
| Map node types | 7 | **9** (Mystery 🔮, Shrine ⛩️) |
| Map layouts | 1 | **7** |
| Skies (act conditions) | 0 | **15** |
| Fates (run-start identities) | 0 | **24** |
| Mid-fight Surprises | 0 | **18** |
| Relics | 78 | **95** |
| Trophies | 45 | **57** |
| Long Night terrors | 0 | **8**, cumulative |

## 2. Monsters

- **Act 1C, the Hollow Woods:** foxes, a wolf pack that hits harder together, an owl that hides your traps, wisps, boars, a bee swarm; elites Alpha Wolf, Old Oak, Cursed Bear; boss **the Antlered King** (summons wolves, grows thorns, triggers THE WILD HUNT below half HP).
- **Act 2C, the Wreckers' Coast:** gulls that steal gold until killed, crabs that keep Block, drowned sailors that add Wounds, sirens, cannoneers, wreckers; elites Captain Saltbones, the Sea Hag, Kraken Arms; boss **the Leviathan**.
- **Act 3C, the Molten Deep:** salamanders, slag golems, forge imps, cinder wyrms, an obsidian knight, a magma ooze that splits into ember blobs; elites the Ironmonger and the **Ash Phoenix** (comes back once at half HP); boss **the Forgemother**.
- **Shared monsters that turn up in every act:** card goblins, mudlings, scarecrows, a chest mimic, the Rat King, a shadow duelist, a puppeteer and her marionettes, a star eater, a chain devil, a void jelly, a frost wraith, a bridge troll.
- **Rare monsters** (Gilded Hare, Treasure Crab, Wishing Star): they are **Skittish** and flee after 3 turns. Catch one for a big gold pay-out and a relic; let it escape and you get 5 gold and a "It got away!" note.
- **New Long Night bosses:** the Phantom, the Night Mare and the Dawn-Eater. The Forgemother and Leviathan also rotate in.
- **3 new enemy traps:** Ember Pod (Burn on your attack), Feral Howl (Strength on your attack), Undertow Charm (Block on your Reaction).

## 3. More random runs

- **Act versions:** each act now rolls 1 of 3 versions (classic, alternate, wild), so a run is one of 27 act combinations before wandering bosses.
- **Layouts:** each act's map rolls a shape: the Old Road, Open Country (6 walks, branches), the Narrow Pass (2 paths, more events and rests), the Gauntlet (elites and 2 treasure rows), the Labyrinth (branches everywhere, Mystery nodes), the Crossroads Fair (a row of shops, shrines and events), Wild Paths (no shops, more treasure and shrines).
- **Skies:** each act also rolls a condition shown in the map header: Fog (only 2 rows visible, +25% gold), Blood Moon (more elites, each drops an Omen), Carnival, Rain, Thunderstorm (more Venues), Harvest Moon, New Moon, Heatwave (everyone Burns), Hard Frost, Rainbow (an extra card choice), Gale (roadside encounters ×3), Royal Procession (2 Champions), Eclipse (tougher enemies, rare cards), Starfall (rare monsters ×3), and Clear Skies.
- **Fates:** at the start of a normal run you pick 1 of 3 Fates, a run-long identity with an upside and usually a cost: the Gambler, the Pauper, the Scholar, the Brute, the Hunter, the Hermit, the Daredevil, the Ascetic, Light Fingers and 15 more. Daily and Weekly runs and the tutorial skip it so they stay comparable.

## 4. More events and pop-ups

- **60 map events**, many of them **multi-stage** (the Card Shark, the Lost Child, the Beggar King, the Golden Idol run) and two that loop (the Slot Machine, Bone Dice) until you walk away. Options that can go wrong are marked as risky.
- **12 Shrines**, a new node type: a short, always-positive trade with a god of the road.
- **35 roadside encounters:** about 1 trip in 8 (more under a Gale or with certain Fates and relics), something happens *on the way* to the node you chose. It appears as a pop-up over the map, and then you carry on to your node.
- **Mystery nodes** 🔮 roll their contents when you arrive: an event, a fight, an elite, treasure, a shop, a shrine or a rare monster. A toast tells you what it was.
- **Surprises:** about 1 normal or elite fight in 6, something interrupts on turn 2 or 3, shown as a card over the table: a wandering bard, a runaway cart, reinforcements, a thunderclap, a helpful crow that steals a trap for you, and 13 more. Most help; a few hurt or hit everyone.
- **Buffs:** some events grant a short-lived blessing (Ballad, Warpaint, Shielded, Well-Fed, Blessed, Bounty) or a curse (Hexed) that lasts a few fights and shows in the HUD.

## 5. The Long Night now compounds

This was the open item from v0.5: the Warden cleared up to 15 nights because linear scaling (+20% HP, +1 Strength per night) never caught up with Thorns and Block.

- Enemy HP is now ×1.25 per night (night 4 is ×2.4, night 8 is ×6).
- Enemy Strength is `n + floor(n²/8)` (night 4 +6, night 8 +16).
- Night elites and bosses get a Champion affix from night 2.
- Every night adds a cumulative **Night Terror** (Haunted Halls, Red Eyes, Night Ward, Restless Dead, Bramble Dark, Dread, Ink-Black Sky, Undying), so each night also plays differently.

## 6. Decisions I made without asking

| Decision | Why |
|---|---|
| Fates are skipped in Daily, Weekly and tutorial runs | Leaderboard runs should be comparable, and the tutorial should teach the chain first. |
| Rare monsters flee rather than just being tougher | A countdown is a decision (race it, or spend the turn on safety), which fits a chain game better than an HP sponge. |
| Roadside encounters happen *on the way* rather than replacing the node | You still get what you planned for, so they feel like a bonus rather than a tax. Chance is capped at 60%. |
| Fog hides node *types*, not paths | Planning a route is part of the fun; you just plan with less information. |
| Surprises are weighted to help (most are positive) | They should feel like a story beat, not a punishment. The Party Popper relic makes them positive-only. |
| The Warden 80 → 68 HP and the Hollow 78 → 66 HP | With all the new upside (Fates, shrines, events) both climbed to 53% wins at A0; see [BALANCE.md](BALANCE.md). |
| Fates tuned toward side-grades | A per-Fate sim showed a 5%–40% spread. The Bard, Oath of Steel, Trickster, Born Lucky and Cursed Blade got smaller costs; the Scholar, Brute and Pilgrim got smaller gains or a cost. |
| The Antlered King 118 → 106 HP, Wild Hunt 4×5 → 4×4 | It was the top Act 1 killer for 4 of 6 characters. |
| A `WILDS.on` switch turns off Skies, Surprises and roadside encounters | The rules tests must stay exact; every v0.6 system has its own tests instead. |
| Save version bumped to 5 | Old saves can't carry v0.6 map state; an in-progress v0.5 run is discarded on load (the collection is kept). |

## 7. Fix: the published game looked stuck

Mike reported the published game was stuck and would not scroll. **Cause:** the step that strips `<head>` from the single-file build before publishing used the pattern `</?head[^>]*>`, which also matched `<header>`. That deleted the run HUD's `<header class="hud">` tags, so its items fell out of their row and stacked full-width, pushing every run screen taller than the window. Screens clip instead of scrolling, so the hand of cards and the bottom of the map were cut off. Plain browser builds (and the Android/iOS apps) were never affected.

- The strip patterns now only match whole tags (`</?head(\s[^>]*)?>`, same for html and body), and the published page is checked for its 6 `<header>` tags.
- Belt and braces: every non-combat screen can now scroll as a whole when it doesn't fit, the app has a 480 px minimum height, the host page's root safe-area padding is neutralised (the app already pads for it), and inside an iframe swipes are no longer trapped.

## 8. How it was checked

- `npm test`: 62 tests, including a fuzz test that clicks every option of every event, rare-monster flee/catch, Phoenix revive and Ooze split, map connectivity for every layout, all 24 Fates, Long Night compounding, and full bot runs per character.
- `npm run sim`: 100 bot runs per character at A0, plus A5 and `NIGHT=1`. Results in [BALANCE.md](BALANCE.md).
- Headless-browser screenshots of the Fate screen, a foggy map, a roadside pop-up, a multi-stage event and a Surprise.
