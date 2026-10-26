# v0.12 "Fewer, Better": a quality pass on the v0.11 pool

Mike's ask after v0.11: go through the balance, look at every card again, remove the redundant ones and keep the important ones, and above all make the game more fun. v0.12 adds no new systems. It measures what the 2,617-card pool actually does in play, cuts what doesn't earn its slot, and fixes the pacing problems the measurements showed.

| | v0.11 | v0.12 |
|---|---|---|
| Collectible cards | 2,508 | **2,049** (459 cut) |
| All player cards (with starters, evolved forms) | 2,617 | **2,158** |
| Cards per class draft pool | 496–558 | **408–493** |
| Cards that play like another card in the same faction | 253 | **0** (plus 94 cross-faction repeats removed) |
| Redundant pairs (`npm run audit`) | 0 | **0** |
| Boss fight length (bot, turns) | 9–11 | **about 8–9** |
| Unspent gold at the end of a run (bot) | ~360 | **~200** |
| Tests | 95 | **100** (94 rules + 6 story) |

## How the cards were judged

### 1. The card lab (new: `sim/cardlab.ts`, `sim/cardreport.ts`)

The balance bot already plays each turn by trying cards on copies of the fight and scoring the position after the enemy's turn. The lab records, for every card, how often it was offered, picked, drawn, played (or fired, for Counters), how often it sat in hand playable but unplayed, and **how much the bot's score went up when it was played**. Value per draw = value per play × how often a drawn copy got played, so a card that is great once in a while but dead most of the time scores low. Each card is then ranked against cards of the same type and cost (a 2-cost attack is compared with 2-cost attacks).

The lab drafts at random (`LABPICK=random`) so every card gets seen: 600 runs × 13 classes = 7,800 runs per round, ~290 draws per card on the median. Two rounds were run; the cuts use the second.

**The first round found a measuring problem, not a card problem.** The bot's score only counted HP, Burn, Weak, Vulnerable, Doom, Strength, Thorns and the v0.3–v0.9 power statuses. Chill, Shock, Mark, Tremor left over after the enemy turn, Charge, Verdict, Veil, Fortify, companions and all 56 v0.11 powers were invisible to it, so the Rimeblade's, Tempest's and Nightblade's cards looked worthless and v0.11 powers were played on 36% of draws. The bot now credits them (`evaluate` in `sim/bot.ts`), and the second round was run with that. This also makes the balance bot a fairer stand-in for a player: it now plays those classes the way they are meant to be played.

Two other bot changes, so the sim spends like a person: it buys relics with spare gold at a shop, and it heads for a shop from 100 gold (was 130).

### 2. How often gates are true

Every v0.11 card prices a gated effect by a guess at how often its gate holds ("If the target has Burn," was guessed at 55%). The lab counted every real check:

| Gate | Guessed | Measured | | Gate | Guessed | Measured |
|---|---|---|---|---|---|---|
| Chain 2 (on a card you play) | 50% | **9%** | | Target has Burn | 55% | 62% |
| Played a Counter this turn | 35% | **11%** | | First card this turn | 40% | 63% |
| Chain 3 | 30% | **13%** | | 2+ other cards this turn | 45% | 65% |
| Stolen trap set | 30% | **13%** | | 2+ elements this turn | 35% | 61% |
| You have Veil | 40% | **15%** | | You have Block | 50% | 74% |
| You have Strength | 45% | **20%** | | You have Verdict | 60% | 82% |
| You hold a Glint | 40% | 20% | | You have Fortify | 55% | 91% |
| Target has Vulnerable | 55% | 21% | | You have Thorns | 55% | 74% |

The headline is **Chain 2**: a card you play is only in a chain when an enemy trap answers it, which happens about one play in eleven. 161 v0.11 set cards had their only extra effect behind Chain 2 or Chain 3. They were, in practice, a weaker copy of a plain card. The hand-made cards barely use Chain 2 on attacks and skills (4 of them), so the chain hook itself is fine; the set builder's guess was wrong.

### 3. Play patterns (new: `src/data/patterns.ts`, `sim/patterns.ts`)

The v0.9 audit catches cards with the same text and close numbers. It can't see that "Deal 4 damage. If the target has Burn, apply 3 Chill." and "Deal 4 damage. If you have Block, apply 3 Chill." play the same way: you hit and add Chill. The new pattern check reads each card's effects with numbers and gates stripped (type, trigger, cost and the set of effects: damage, Block, Burn, draw, a companion...). Two cards with the same pattern in the same faction are near-identical in play. There were 253 such extra cards across 213 patterns.

## What was cut (459 cards; list in `src/data/cuts12.ts`, table in CATALOG.md)

`sim/cutlist.ts` writes the list from the lab rows. Hand-made cards, Evolve cards and their evolved forms, all powers and every card the code names (starter decks, events, relics, tests) are never cut.

| Reason | Cards | Rule |
|---|---|---|
| Plays like another card | 347 | Same pattern as a better card in the same faction (the hand-made one if there is one, else the best by lab value), or the same pattern across factions when every class that can draft it still sees the other card |
| Rare-gate filler | 67 | An attack or skill whose gates are all ones the lab saw hold under 20% of the time (Chain 2, Chain 3, a Counter this turn, a stolen trap, Veil, Strength), unless it still ranked in the top 40% |
| Weakest of its type and cost | 45 | Bottom 7% of value per draw among cards of its type and cost, seen 60+ times, and only if every effect is one the bot can score (draw, energy, Glints, the Crypt and Steal are judged by hand, not cut) |

By source: 330 of the 1,158 v0.11 faction-set cards, 115 of the 642 v0.7 generated cards, 14 of the 234 hybrids. By faction the cut ran from 9% (Neutral, Void) to 32% (Dawn, which had the most Chain 2 and Verdict-gated filler). Every class still drafts from 400+ cards with at least 20 of each card type.

Cut cards keep their slot in the generators, so every remaining card keeps its id, name and numbers.

**Saves.** A cut card that played like another card turns into that card everywhere: collection (copies and foils), loadouts, Legacy decks, rivals, and a run in progress (keeping its upgrade path). A cut card without a twin refunds 20 Dust per copy and drops out of decks, as in v0.9.

## Buffs to signature cards the lab flagged

| Card | Was | Now | Why |
|---|---|---|---|
| Frostbrand (Rime power) | attacks apply 1 Chill (2 upgraded) | 2 (3) | bottom 3% of 1-cost powers; one Chill per hit rarely reached a Freeze |
| Frost Flask (Aether) | 6 damage, 2 Chill (8/3) | 7, 3 (9/4) | bottom 5% of 1-cost attacks |
| Gravel Ward (Stone) | 4 Block, 2 Tremor (6/3) | 5, 3 (7/4) | bottom 2% of 0-cost Reactions |
| Snap Retort (Neutral Counter) | 5 damage (8) | 7 (10) | played on half its draws for almost nothing |
| Spade Strike (Sexton starter) | 7 damage (10) | 9 (12) | see the Sexton below |
| Tombstone (Sexton starter) | Haunt: gain 3 Block | Haunt: gain 3 Block and deal 3 damage to a random enemy | same |

## Fun: what the sim showed and what changed

1. **Every card reward is a real choice.** With 500 cards a class, an offer could show three attacks, or two cards that differ only in their gate. Now no offer has two cards with the same pattern or three of one type (`offerFits` in run.ts), and the last card offered is three times as likely to share a status or mechanic with your deck (Burn, Chill, companions, the Crypt...; `deckThemes`). The reward screen's existing 🔗 Synergy badge points it out. The test measures that the last card fits the deck in well over 40% of offers.
2. **A Merchant every act.** Bot runs ended with about 360 unspent gold because the act's shop was often off the path. If a map has no shop in its middle rows, one node there becomes a shop. Unspent gold at the end of a run dropped to about 200.
3. **Shorter, sharper bosses.** Bosses took 10–11 bot turns (Act 1) and 9–10 (Acts 2–3), the longest fights in the game by far, while Act 1 hallway fights cost 1.4 HP and were over in under 3 turns. Bosses now have 14% less HP in every act and, with the global damage raise below, hit about 20% harder (`DIFFICULTY.hp.boss`, new `DIFFICULTY.kindDmg`); Act 1 hallway enemies hit about a third harder than in v0.11, Act 2 hallway enemies about 18%. Bosses now last about 8–9 turns and cost the same HP; hallway fights in Act 1 cost about 3 HP.
4. **The Sexton is no longer a slog.** Its fights were the longest of any class (Act 1 boss 12–13 turns) and it lost most runs to Act 1 bosses. It now starts with a second Spade Strike instead of a third Guard, Spade Strike hits for 9, and Tombstone's Haunt also deals damage. Its Act 1 boss fights are about 9–10 turns and its win rates moved into the band.

## Balance

Same harness and seeds (100 runs per class per mode, Ascension 0, everything on). Target (Mike, v0.11): fresh profile 15–30% for every class, career clearly higher (about 30–45%).

The bot got stronger this version (it now values every status, spends gold, and drafts from a pool without filler), so the first pass ran hot: fresh 19–40%, career 23–66%. Enemy HP and damage went up across the board to compensate (`DIFFICULTY`: hallway and elite HP ×1.10/1.17/1.20 by act, was ×1.05/1.12/1.15; damage ×1.10/1.16/1.22, was ×1.03/1.08/1.13), then class HP was nudged.

```
class        fresh        career       HP   (v0.11 HP)
duelist      26% (19)     38% (43)     76
warden       21% (20)     39% (40)     68
hollow       19% (21)     43% (41)     63   (60)   200 runs
sharp        18% (16)     42% (40)     81   (84)
magpie       22% (15)     36% (33)     70
sexton       25% (24)     33% (34)     92   (93)   + starter deck, see above
arbiter      27% (15)     45% (34)     79   (82)
tempest      24% (17)     40% (34)     77   (84)
rimeblade    27% (21)     32% (28)     82
beastcaller  17% (19)     31% (37)     74
geomancer    19% (19)     31% (37)     78
alchemist    21% (23)     34% (31)     70
nightblade   16% (19)     45% (42)     48   (52)
mean         21.7%        37.6%
```

v0.11 results in brackets. **Fresh: 16–27%, every class in the band. Career: 31–45%, mean 37.6%, every class 5 to 29 points above its own fresh rate.** The Rimeblade's career rate is up from 28% to 32%, inside the band now (its cards now count the Chill and Freezes the bot used to ignore, and Frostbrand is stronger). Its career lift (5 points) is still the smallest of any class, so the next lever for it is a late-game rare or its loadout, not HP. The Hollow was measured at 200 runs because its 100-run fresh result swung between 13% and 19% across HP 60–63.

Fight length and HP lost (bot, fresh profile, all classes): Act 1 hallway 2.9 turns / 3 HP (was 2.8 / 1.4), elites 7–8 turns, bosses 8.6 / 8.6 / 8.0 turns by act (was 10.7 / 9.7 / 9.1). Pacing line: about 8 relics and 22 cards by the end of a run, 450 gold earned and 200 left (was ~360 left).

## Tests

100 pass (5 new): cut cards are gone and nothing the game names was cut, every class keeps 20+ of each card type; saves turn cut cards into their twin (collection, foils, loadout codes, a run deck with its upgrade path) and refund the rest; card offers never repeat a pattern or show three of a type, and the last card leans to the deck; every act map has a Merchant in its middle rows; the pacing numbers.

## Tools added

- `npx tsx sim/cardlab.ts <runs> <class> <out.json>` (`LABPICK=random` for even coverage) and `npx tsx sim/cardreport.ts <dir> [rows.json]`: the card lab.
- `npx tsx sim/patterns.ts [n]`: play-pattern groups.
- `npx tsx sim/cutlist.ts <rows.json>`: writes `src/data/cuts12.ts` (run it against the uncut pool).
- `npm run sim` now prints a pacing line (relics, deck size, fights, gold earned and left, card rewards taken) and average fight length and HP lost by act and fight kind.

## Decisions and open questions

- **Why not reprice instead of cut?** Repricing the gates to the measured rates would print 5× numbers behind Chain 2 ("Chain 2: gain 11 Strength") and would change which designs the v0.11 set builder accepts, which renames and re-ids hundreds of cards in players' collections. Cutting the rare-gate filler keeps every other card stable.
- **The bot is a better player now**, so v0.12 win rates are not directly comparable with v0.11's. The targets are the same; the enemies are tougher to make up for it.
- **Not touched:** hand-made utility cards that the bot can't score (draw, energy, the Crypt, Steal, reveals) were reviewed by hand and kept. A person playing them is the next useful check, along with art for the generated cards.
