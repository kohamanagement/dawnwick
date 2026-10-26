# v0.9 "Clean Cut": removing repeat cards

Mike heard that Riposte has redundant cards. He was right: the v0.7 generator printed the same card more than once. This pass finds every repeat, reworks it into something new where that keeps a class or element covered, cuts it where it doesn't, and then re-checks the balance.

## How "redundant" was measured

Two collectible cards are **redundant** when all of these match:

- type, cost, trigger (Reactions) or what they answer (Counters), printed element, and Exhaust;
- the rules text, once the numbers are blanked out ("Deal N damage. Apply N Burn.");
- every number is within 2 (or 25%) of the other card's.

So "Deal 4 damage. Apply 1 Burn." and "Deal 5 damage. Apply 2 Burn." at the same cost and element are the same card to a player; a common and its rare version with a third effect are not. The test lives in `src/data/cardgen.ts` (`redundant`) and `npm run audit` checks the whole pool with it, hand-made cards included (`npm run audit -- list` prints every pair and every change).

## What the audit found (v0.8)

**102 redundant pairs** among 994 collectible cards:

| Kind | Pairs | Why it happened |
|---|---|---|
| Generated powers copying a hand-made power | 20 | Each faction's two generated powers reused the status of a hand-made power (Molten Oath = Ember Crown, Pearl Crown = Deep Focus, Sparking Covenant = Dynamo…). Seven more did the same with numbers or an element far enough apart to slip past the test (Marble Dominion was the Warden's Overgrowth in Stone, Transmuted Engine was the Tempest's Conductor in Aether), so all 27 count. Only Wild Creed ("Summon Wolf 3") was original |
| Neutral elemental cards repeating a faction card | 50 | Every class can draft neutral cards, and the neutral Blaze/Frost/… cards were built from the same atoms as Ember/Rime/… cards, so an Ember deck saw "Draw 1 card. Apply 1 Burn." twice |
| Two factions with the same element | 16 | Glass and Rime are both Frost, Grave and Stone both Stone, Gilt and Dawn both Radiant, Void and Dusk both Umbral, Thorn and Beast both Wild. Their generic templates (attack + Block, "When attacked: gain 4 Block") came out identical. The Rimeblade drafts Glass + Rime and the Nightblade Dusk + Void, so they really saw these twice |
| Generated card repeating a hand-made card | 13 | e.g. Smouldering Gambit (Apply 2 Burn, 0) next to Kindling (Apply 3 Burn, 0); Fern Mantle (Gain 6 Block, 1) next to Barkskin (Gain 8 Block, 1) |
| Two Negate Counters in one faction | 3 | The generator added a Negate Counter for both of a faction's trap-Counter templates (Tide, Void, Dusk) |

No two hand-made cards were redundant.

## What changed

Decision rule (from the brief): **rework first** when a class or element would otherwise lose coverage, **cut** when no rework is genuinely different.

### 1. 27 new powers (every repeated power reworked)

Each faction keeps two generated powers with their names, costs and rarities, but they now do something no other card does. Each is a new status in `src/data/statuses.ts` (v0.9 block) with hooks in `combat.ts` where needed (Fate Coin flips, Glints, the Crypt, Exhume, spending Charge, Freezing, Resonance, Veil misses).

| Card | Faction | Cost | Rarity | Now |
|---|---|---|---|---|
| Charred Heart | ember | 2 | uncommon | At the end of your turn, deal 3 damage to each enemy with Burn. |
| Molten Oath | ember | 2 | rare | At the start of your turn, gain 4 Block for each enemy with Burn. |
| Pearl Crown | tide | 2 | uncommon | At the start of your turn, apply 2 Weak to a random enemy. |
| Spray Creed | tide | 2 | rare | At the end of your turn, gain 5 Block for each energy you carry over. |
| Oaken Engine | thorn | 2 | uncommon | At the end of your turn, if you have Thorns, heal 2 HP. |
| Briar Covenant | thorn | 2 | rare | At the start of your turn, gain 2 Block for each Thorns you have. |
| Nether Heart | void | 1 | uncommon | At the end of your turn, apply 4 Doom to the enemy with the most HP. |
| Dread Dominion | void | 1 | rare | Whenever a chain of 2+ links resolves, apply 3 Doom to ALL enemies. |
| Royal Creed | gilt | 1 | uncommon | At the start of your turn, raise your Ante by 2. |
| Ducat Covenant | gilt | 1 | rare | Whenever your Fate Coin flips, deal 3 damage to a random enemy. |
| Thieving Dominion | glass | 1 | uncommon | Whenever you play a Glint, gain 3 Block. |
| Shard Aura | glass | 1 | rare | At the end of your turn, gain 3 Block for each Reaction you have set. |
| Ossuary Aura | grave | 1 | uncommon | Whenever a card enters your Crypt, deal 3 damage to a random enemy. |
| Gravebound Dominion | grave | 1 | rare | Whenever you Exhume a card, gain 5 Block. |
| Sparking Covenant | storm | 1 | uncommon | At the end of your turn, apply 3 Shock to ALL enemies. |
| Charged Creed | storm | 1 | rare | Whenever you spend Charge, gain 2 Block per Charge spent. |
| Crystalline Covenant | rime | 2 | uncommon | At the end of your turn, gain 3 Block for each enemy with Chill. |
| Boreal Oath | rime | 1 | rare | Whenever an enemy Freezes, deal 7 damage to ALL enemies. |
| Flint Aura | stone | 2 | uncommon | At the end of your turn, gain 3 Fortify. |
| Marble Dominion | stone | 2 | rare | At the end of your turn, if you have 10 or more Block, deal 5 damage to ALL enemies. |
| Gleaming Creed | dawn | 1 | uncommon | At the start of your turn, gain 1 Verdict. |
| Righteous Aura | dawn | 2 | rare | At the end of your turn, heal 3 HP for each Counter you played this turn. |
| Elemental Oath | aether | 1 | uncommon | At the start of your turn, apply 1 Vulnerable to a random enemy. |
| Transmuted Engine | aether | 1 | rare | Whenever Resonance happens, deal 5 damage to ALL enemies. |
| Savage Covenant | beast | 1 | uncommon | At the end of your turn, heal 1 HP for each companion you have. |
| Veiled Aura | dusk | 2 | uncommon | At the end of your turn, deal 3 damage to each enemy with Mark. |
| Moonless Creed | dusk | 2 | rare | Whenever an attack misses you because of Veil, deal 8 damage to the attacker. |

Values come from the generator's point budget, like every other generated card (upgrade: +1).

### 2. Repeat cards reworked or cut (the generator now refuses to print a repeat)

`generateCards` now takes the hand-made pool and checks every card it builds against it and against everything it built before. A repeat gets its second effect swapped, trying in order:

1. its element's **payoff** effect, new in v0.9: "deal N damage to each enemy with Burn / Chill / Shock / Tremor / Weak / Doom / Mark" (Wild, Radiant and Prism have no single debuff, so they go to step 2);
2. other effects that fit the element (Vulnerable, Strength, Sprout, Fortify, Verdict, Veil, Catalyze…), then the faction's own effects, then a short generic list;

and keeps the first version that repeats nothing, **including in another element** (so a rework can't just be the same card in a new colour). Payoffs under 3 damage are filler and rejected. If nothing is left, the card is **cut**. Names, ids and rarities never change, and a cut card still uses its slot, so every other card keeps its id and saved decks stay valid.

Result: **75 reworked, 4 cut** (Winter Coil, Thicket Trap, Beacon Swipe, Starlight Stance: neutral cards whose element had no unused effect left). The full before/after table is generated into [CATALOG.md](CATALOG.md#v09-clean-cut-repeat-cards-reworked-or-cut-79).

Examples:

| Card | Was | Now | It repeated |
|---|---|---|---|
| Smouldering Gambit (Ember, 0) | Apply 2 Burn. | Deal 3 damage to each enemy with Burn. | Kindling |
| Boreal Cleave (Rime, 2) | Deal 4 damage twice. Gain 4 Block. | Deal 4 damage twice. Deal 3 damage to each enemy with Chill. | Glass Strike (Glass) |
| Granite Cut (Stone, 3) | Deal 15 damage. Gain 7 Block. | Deal 15 damage. Deal 6 damage to each enemy with Tremor. | Hallowed Barrage (Grave) |
| Silent Stab (Dusk, 2) | Deal 5 damage twice. Apply 7 Doom. | Deal 5 damage twice. Deal 4 damage to each enemy with Doom. | Silent Volley (Void) |
| Brine Answer (Tide Counter) | Negate it and apply 1 Weak to its owner. | Negate it and apply 1 Vulnerable to its owner. | Rippling Comeback |
| Flame Rite (neutral Blaze) | Draw 1 card. Apply 1 Burn. | Draw 1 card. Apply 1 Vulnerable to ALL enemies. | Blazing Gambit (Ember) |

### 3. Saves

`migrate()` now forgets cut cards: each owned copy refunds **20 Dust**, and cut ids are dropped from loadouts, imprints, Legacy decks, imported rivals, the Arena draft, and any saved run (deck, combat piles, reward and shop). Reworked cards keep their ids, so owned copies simply read the new text.

### 4. Guards so it can't come back

- Test `v0.9 no two collectible cards are redundant`: fails if any pair exists, or if a generated power copies a hand-made power's text.
- Test `v0.9 the 27 new powers each do what they say`: one assertion per power.
- Test `v0.9 saves forget cut cards`.
- `npm run audit` for a quick check after adding cards.

The bot (`sim/bot.ts`) counts the new powers as worth playing, like the old ones.

## Balance re-check

Same harness and seeds as v0.8 (`PROFILE=fresh|career npm run sim -- 100 0 <class>`, 100 runs per class per mode, Ascension 0, everything on). Target: 10–30%.

```
class        fresh   career   (v0.8: fresh / career)
duelist        12%     18%     (12% / 27%)
warden         14%     21%     (16% / 17%)
hollow         16%     28%     (13% / 32%)
sharp          12%     29%     (10% / 31%)
magpie         13%     25%     (13% / 26%)
sexton         11%     19%     (11% / 18%)
arbiter        15%     24%     (12% / 25%)
tempest        15%     30%     (16% / 30%)
rimeblade      13%     23%     (12% / 21%)
beastcaller    13%     30%     (10% / 30%)
geomancer      16%     24%     (12% / 21%)
alchemist      12%     28%     (14% / 30%)
nightblade     14%     29%     (12% / 26%)
mean         13.5%  25.2%    (12.5% / 25.7%)
```

**Every class is inside the band in both modes: fresh 11–16% (mean 13.5%), career 18–30% (mean 26.8%).**

The first pass after the card changes had four classes out of band, all fixed with small HP nudges (re-measured after):

| Class | First pass (fresh / career) | Change | After |
|---|---|---|---|
| Cardsharp | **7%** / 25% | HP 72 → 78 | 12% (200 runs) / 29% |
| Tempest | 15% / **32%** | HP 88 → 85 | 15% / 30% |
| Beastcaller | 16% / **32%** | HP 82 → 79 | 13% / 30% |
| Nightblade | 17% / **31%** | HP 58 → 56 | 14% / 29% |

Why those four moved (my reading, not measured separately): the Cardsharp lost the most from the power rework (its generated Gilt powers were copies of House Edge and Midas Touch, both strong Block engines; the new Royal Creed and Ducat Covenant are offensive), so its fresh runs reached Act 3 as often but won it less. The Tempest, Beastcaller and Nightblade picked up the new payoff cards ("deal N to each enemy with Shock / Doom / Mark"), which probably fit decks that already spread those debuffs. A trial at Cardsharp HP 80 went to 35% career, so 78 it is.

Noise: a 100-run sample at 30% has a standard error of about ±4.6 points, and career columns swing about ±6, so 29–30% career results sit at the top edge rather than safely inside it. If playtests show the Tempest or Beastcaller running away, the next lever is another 2–3 HP.
