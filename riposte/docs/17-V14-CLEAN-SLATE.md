# v0.14 "Clean Slate": out of Spire's shadow

**Date:** 2026-10-26 · **Asked by:** Mike ("Make those changes and see where we are at. I don't want it to be called a spire clone but also make it fun and engaging. A true rouge game with tcg elements.")

The similarity review (https://claude.ai/artifact/WraEmWyqAYaCguGLoj1Uvu) found the fights original but everything around them (the pitch, the words on the cards, the reward/rest/shop numbers, the map and the Ascension ladder) close to Slay the Spire. This version applies all ten of its suggestions. The aim was to move the game's own idea, *every move has an answer*, out of the fight and onto the screens a new player sees first, and to lean into the trading-card side: your deck, your collection, the Dealer across the table.

The game's own name is unchanged here (the rename is a separate decision).

## 1. The pitch never names another game

README, design doc pitch, ad copy and community plan no longer mention Slay the Spire. The README now opens: *"A solo trading-card duel you play as a roguelike: you collect, build and bet a deck, and the table answers back."* The 100-game benchmark (doc 01) and older version notes keep their comparisons, since they are research.

## 2. New words on every card

Display text only: card names and ids never change (generated ids come from names), and internal status keys stay `block`, `str`, `weak`, `vuln`, so saves and sims are untouched. A TypeScript-AST rewriter changed string and template literals across cards, statuses, keepsakes, events, story, tutorial, glossary and UI.

| Before | Now | Why the word |
|---|---|---|
| Block | **Guard** | a duelist's guard |
| Strength | **Edge** | an edge on every hit |
| Weak | **Shaken** | |
| Vulnerable (+50%) | **Exposed (+40%)** | the number changed too |
| Exhaust | **Fold** | you fold a card out of the game |
| Retain | **Palm** | you palm a card to keep it |
| Innate | **Opener** | it is in your opening hand |
| Curse | **Jinx** | |
| Power | **Stance** | |
| Skill | **Trick** | |
| Elite | **Rival** | |
| Relic | **Keepsake** | |
| Potion-like Omens | **Omens are answers** (see 5) | |
| Ascension | **Stakes** | |
| Heat (vows) | **Wager** | |
| Intent | **Tell** | a card player's tell |
| Thorns | **Barbs** | |
| Strike / Defend starters | **Cut / Sidestep** (display names) | |
| Rest site | **Wick's Candle** | |
| Shop | **Merchant** | |

## 3. The copied numbers are gone

| | Before (same as Spire) | Now |
|---|---|---|
| Card removal | 75 gold, +25 each | **60 gold, +30 each; Jinxes go for half** |
| Rest heal | 30% of max HP | **Mend: 25% of max HP + 4** (flatter: better for small-HP classes) |
| Card reward | pick 1 of 3 | **The Deal: 3 face-up plus 1 face-down card a rarity higher, taken blind** |
| Boss relic | pick 1 of 3 | **pick 1 of 2 keepsakes** |
| Vulnerable | +50% | **Exposed +40%** (Cracked Lens 65%) |
| Treasure | fixed mid-act row | **weighted into the map, at least 2 per act** |
| Ascension ladder | more elites, tougher normals, starting curse, less boss heal, start below max HP | **Stakes ladder, every rung about the chain or the Dealer** (below) |

**Stakes 0–10:** 1 every enemy starts with one trap already set · 2 Rivals get a Rebuttal from Act 1 · 3 Rivals and bosses start with 1 Edge · 4 the Dealer answers every rare you take · 5 twice as many face-down map cards and no Act 1 Peek · 6 the Omen belt holds 2 · 7 bosses +10% HP · 8 Merchant prices +20% · 9 all enemies +1 Edge · 10 the Last Dealer sets an extra trap.

## 4. The map is dealt partly face-down

About 22% of map cards in the middle rows are dealt **face-down** (44% at Stakes 5). You see only the suit, the same rule as an enemy trap (you see what sets it off, not what it is): ♠ a fight or Rival, ♥ a Candle or shrine, ♦ a Merchant, treasure or forge, ♣ an event. You get one 👁 **Peek** per act (two with Storm Glass) or you can walk in blind. Code: `genMap`, `suitOf`, `SUIT`, `isDown`, `peek` in `run.ts`; `src/ui/map.ts` draws card backs with the suit.

## 5. Omens are instant-speed answers

Omens were free actions on your turn (potions, in effect). Now each Omen has a sign, ⚔ (answers an enemy attack), ✋ (an enemy non-attack) or ⟲ (an enemy trap or Reaction firing), and you can only **turn it over as a link in the chain** when the chain stops on an enemy link with that sign. It costs nothing and can itself be answered by an enemy ⟲ trap. The Hanged Man now simply Negates the attack it answers; energy Omens give Flux when used on the enemy turn. The Star and The Hierophant still also work on the map. Automatic Counter mode answers heavy hits with a defensive Omen. Code: `src/data/omens.ts` (`sign`, `combat(cb, ctx)`), `Combat.omenOptions`/`autoOmen`, the Counter window's Omen row in `main.ts`.

## 6. Enemies look like small decks

The intent icons are replaced by a **tell card**: each enemy shows a small deck (its move count), its top card face-up (the move it plays next, with its numbers) and its last move in a discard. The AI is unchanged; the combat screen now reads as a duel from the first frame.

## 7. Echoes are up front

- **The Echo Gallery** on the title screen: how many of your decks are out there, how often you met them, beat them and lost to them, and what happens next run.
- **Run 2 story beat:** on your second run, your first Rival is the Echo of the deck you finished run 1 with (`profile.lastDeck`, `run.echoBeat`), with Dealer and Wick lines (`ECHO_BEAT` in `story.ts`). The end screen says whether you beat your own Echo.

## 8. Wick's Candle (the rest site)

Four choices, two of them about the next fight:
- **Mend** 25% of max HP + 4.
- **Hone** upgrade a card (path A or B).
- **Rehearse** choose a Reaction: a copy starts your next fight already set.
- **Scout** flip every face-down card on this map and see your next Rival's traps.

## 9. The Dealer answers your pick

Take a rare or the blind card and 30% of the time (always for rares at Stakes 4+) **the Dealer answers**: a small chain on the reward screen. Pay 30 gold to Negate it (20 if your deck has a Counter), or let it resolve and a Regret Jinx joins your deck with the card.

## 10. Patrons collect a debt

A Patron's blessing is now a loan. Each blessing leaves a debt; pay 💰 40 at a Merchant, or the Patron sits in on that act's boss and gives it one extra trap (the Archivist: Mirror Veil, the Bellmaiden: Soul Snare, the Ferryman: Ambush, the Gardener: Thorn Snare, the Masked Patron: Tripwire). The HUD shows 🎭 debts; the Merchant has a pay-off button.

## Balance

Target unchanged: fresh 15–30% per class, career clearly higher (about 30–45%). Same harness and seeds (100 runs per class per mode, Stakes 0). The sims play the new rules: face-down map cards (the bot Peeks and scores suits), the blind reward card, the Dealer's answer (the bot Negates when it has gold to spare), Patron debts (paid first at a Merchant), Omens as answers (Automatic mode answers heavy hits), Mend 25%+4, removal 60+30 and Exposed +40%. The bot does not use Rehearse or Scout, so a human has two options it lacks.

First pass on the new rules: fresh 10–29% (Beastcaller 10, Magpie and Cardsharp 13), career 19–57% (Sexton 57; Rimeblade, Beastcaller, Duelist under 22). Levers, in order:

| Change | Why |
|---|---|
| Enemy damage ×1.07 / 1.13 / 1.19 by act (was 1.10 / 1.16 / 1.22) | the new rules (Regret Jinxes from the Dealer, boss debt traps, Exposed at +40% for the player's own debuffs) cost the bot about 4 points across the board |
| HP: Beastcaller 74 → 80, Magpie 70 → 74, Cardsharp 81 → 84, Duelist 76 → 79, Nightblade 48 → 51, Warden 68 → 72, Alchemist 70 → 73, Rimeblade 82 → 84 | under 15% fresh or under 30% career |
| HP: Sexton 92 → 80, Arbiter 79 → 77 | Sexton career 57% and 50%, Arbiter career 46% |
| Patron debt 45 → 40 gold, and the bot pays debts before shopping | unpaid debts put an extra trap on the Last Dealer, who gains Edge whenever his traps fire: the final boss was killing 60–80% of career runs that reached him |

```
class        fresh   career   HP
duelist      17%     36%      79
warden       23%     36%      72
hollow       19%     31%      63
sharp        18%     37%      84
magpie       16%     36%      74
sexton       19%     41%      80
arbiter      23%     32%      77
tempest      18%     44%      77
rimeblade    26%     28%      84   (career at 200 runs)
beastcaller  20%     32%      80
geomancer    22%     34%      78
alchemist    24%     32%      73
nightblade   18%     40%      51
mean         20.2%   35.3%
```

**Fresh: 16–26%, every class in the band. Career: 31–44% for 12 of 13 classes, mean 35.3%.** The Rimeblade's career rate (28% over 200 runs) is still 2 points under the band with the smallest lift of any class (2 points), the same weak spot as v0.11 and v0.12; HP does not fix a lift problem, so the next lever is its late-game rares or loadout. The card lab (390 runs, random picks) shows nothing new out of line: the cards with the lowest value per draw are Counters, which the lab measures poorly because they fire on the enemy turn (the same pattern on the v0.13.1 build).

## Similarity to Slay the Spire, re-scored

Same rubric as the v0.13.1 review: each of 17 systems gets a 0–100 rating for how much a Spire player would recognise it, and the headline is the plain average. Judgement scores, not measurements.

| | v0.13.1 | **v0.14** |
|---|---|---|
| Similar to Slay the Spire 1 (average of 17 systems) | ~60% | **~42%** |
| Similar to Slay the Spire 2 | ~65% | **~46%** |
| First impression (map, reward, rest, combat screen) | ~85% | **~55%** |
| Moment-to-moment combat | ~35% | **~25%** |

| System | v0.13.1 | v0.14 | What moved it |
|---|---|---|---|
| Run structure | 90 | 85 | still 3 acts with a boss each; the Echo Rival on run 2 and the Act 4 Reflection are its own |
| Map | 70 | 45 | face-down cards with suits, Peeks, Scout; no fixed treasure row |
| Rewards and node economy | 90 | 45 | The Deal's blind card, the Dealer's answer, removal 60+30 with Jinx half price, Mend 25%+4, Candle with Rehearse/Scout, debts at the Merchant, boss keepsake 1 of 2 |
| Energy and turn | 75 | 75 | unchanged on purpose (3 energy, 5 cards: one familiar thing to learn the new ones with) |
| Keywords | 90 | 40 | full rename; Exposed +40%. The ideas (a shield, a damage buff, a debuff) are generic to the genre |
| Enemy behaviour | 25 | 15 | enemy decks and tell cards on top of traps, Counters and Rebuttals |
| Card types | 55 | 45 | Trick and Stance next to Reactions and Counters |
| Upgrades | 55 | 55 | unchanged (two paths, Evolve) |
| Keepsakes and Omens | 80 | 45 | Omens are now instant-speed answers by sign, the system Spire has no version of |
| Run and act-start boons | 70 | 45 | Patrons collect a debt at the boss; no longer a free boon menu |
| Act variety | 55 | 55 | unchanged |
| Characters | 45 | 45 | unchanged |
| Elements | 10 | 10 | unchanged |
| Meta progression | 25 | 20 | the Echo Gallery puts the deck-collecting loop on the title screen |
| Story | 30 | 25 | the run-2 Echo beat |
| Difficulty modifiers | 85 | 40 | the Stakes ladder is about traps, Rebuttals, the Dealer and face-down cards |
| Art and presentation | 30 | 25 | the combat screen opens on enemy decks, not intent icons |

**Where we landed:** a player who sees screenshots now sees a card table (a face-down deal, a blind card, enemy decks, a candle with four choices) before anything that reads as Spire. What remains Spire-like is the generic genre chassis: a 3-act climb with a boss per act, 3 energy and 5 cards, and a branching map. Those are shared by most of the genre and are not what draws a "clone" label on their own. The next lever, if wanted, is the act structure itself (for example a run told as a tournament bracket against named rivals instead of a climb).

## Tests and build

102 rules tests (5 new: face-down deal and Peek; the face-down reward card and Dealer answer; removal price and debts; the Candle's Mend, Rehearse and Scout; Exposed at +40%) and 6 story tests pass. A headless-Chromium smoke test walked the title screen, Echo Gallery, a face-down map and Peek, a fight with enemy tells and a chain, and The Deal with its face-down card, with no console errors.
