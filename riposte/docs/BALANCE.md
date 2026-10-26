# Balance report

## v0.14 "Clean Slate" (new map, reward, rest and Patron rules; see docs/17-V14-CLEAN-SLATE.md)

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


## v0.12 "Fewer, Better" (459 cards cut, smarter bot, sharper bosses; see docs/14-V12-FEWER-BETTER.md)

Target unchanged from v0.11: fresh 15–30% for every class, career clearly higher (about 30–45%). Same harness and seeds, 100 runs per class per mode.

The bot is stronger this version: it now scores Chill, Shock, Mark, Tremor, Charge, Verdict, Veil, Fortify, companions and v0.11 powers, buys relics with spare gold, and drafts from a pool without filler. The first pass ran at fresh 19–40%, career 23–66%. Levers, in order:

| Change | Why |
|---|---|
| Enemy HP (hallway and elite) ×1.10 / 1.17 / 1.20 by act (was 1.05 / 1.12 / 1.15); enemy damage ×1.10 / 1.16 / 1.22 (was 1.03 / 1.08 / 1.13) | brings the stronger bot back to the band |
| Boss HP ×0.90 / 0.96 / 1.00 (was 1.05 / 1.12 / 1.16), boss damage ×1.12 / 1.12 / 1.10; Act 1 hallway damage ×1.25, Act 2 ×1.10 (`DIFFICULTY.kindDmg`) | pacing: bosses were 10–11-turn slogs, Act 1 hallway fights cost 1.4 HP |
| HP: Tempest 84 → 77, Cardsharp 84 → 81, Arbiter 82 → 79, Nightblade 52 → 48, Sexton 93 → 92, Hollow 60 → 63 | the first four ran over 30% fresh or over 45% career; the Hollow under 15% fresh |
| Sexton: second Spade Strike instead of a third Guard, Spade Strike 7 → 9, Tombstone's Haunt also deals 3 | its fights were the longest in the game and its career rate was under its fresh rate (13% vs 17%) |

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


## v0.11 "Branching Paths" (new target: fresh 15–30%, career higher)

Mike's new target: a new player should win 15–30% of runs with every class, and players who play more, plan better or have more unlocked should win more than that. In the harness, that means:

- **Fresh** (`PROFILE=fresh`, blank profile every run): **15–30%** for every class.
- **Career** (`PROFILE=career`, one profile per class carried across 100 runs): **clearly above fresh, about 30–45%**.

Same harness and seeds as before (100 runs per class per mode, Ascension 0, everything on, story events included). Win rates on the v0.11 pool before tuning are shown in brackets.

```
class        fresh        career       HP   (v0.10 HP)
duelist      19% (19)     43% (31)     76
warden       20% (20)     40% (38)     68
hollow       21% (21)     41% (33)     60
sharp        16% (11)     40% (28)     84   (70)
magpie       15% (15)     33% (33)     70
sexton       24% (24)     34% (34)     93
arbiter      15% (9)      34% (27)     82   (70)
tempest      17% (13)     34% (24)     84   (79)
rimeblade    21% (13)     28% (15)     82   (77)
beastcaller  19% (19)     37% (26)     74
geomancer    19% (19)     37% (35)     78
alchemist    23% (22)     31% (23)     70   (66)
nightblade   19% (19)     42% (39)     52   (55)
mean         19.1%        36.5%
```

**Fresh: 15–24%, every class in the band. Career: 28–43%, mean 36.5%, and 7 to 24 points above the same class's fresh rate.** The Rimeblade's 28% career rate is about half a standard error under 30 (±4.6 points at 100 runs), so I left it rather than tune to noise. Its career deaths are mostly Act 3 bosses (the Forgemother), so the next lever for it is a late-game card, not HP.

What changed:

| Change | Why |
|---|---|
| Talents partly restored toward pre-v0.8: Vitality +2 → +3 Max HP per rank, Opening Guard 2 → 3 Block, Field Dressing 4 → 5 HP per rank | The v0.8 trims were made for a 10–30% target and left career only about 8 points over fresh. This lifts every career profile by 5–10 points and leaves fresh untouched, because fresh profiles have no talents |
| HP: Cardsharp 70 → 84, Arbiter 70 → 82, Tempest 79 → 84, Rimeblade 77 → 82, Alchemist 66 → 70; Nightblade 55 → 52 | Brought the four classes under 15% into the fresh band. The Nightblade was the strongest career class (46%), so it gives up 3 HP |
| Starter decks: the Arbiter swaps a Strike for a second Gavel Strike; the Rimeblade swaps a Strike for a third Frost Cut | Both classes died mostly to Act 1 bosses in fresh runs, and HP alone barely moved them. A stronger opening deck did (Arbiter 9 → 15, Rimeblade 13 → 21) |
| Story events (merged this version) | The Duelist was reported at 11% on an early story build. On the final tree it is 19% fresh, 43% career, with no change needed |

Every career profile reaches level 20 with about 550–600 cards. Most of the lift arrives within the first quarter of a career (the first 25 runs), as in v0.8; later quarters swing by ±15 points but do not keep climbing.

## v0.10 "Polish Pass" (boss spread evened out; see docs/11-V10-POLISH.md rounds 76–88)

Same harness as v0.9 (100 runs per class per mode, Ascension 0, everything on). The five classes changed in the last pass (Alchemist, Arbiter, Cardsharp, Tempest, Beastcaller) were re-measured at 200 runs. Target: 10–30%.

```
class        fresh   career   (v0.9: fresh / career)   HP
duelist        19%     29%     (12% / 18%)              76
warden         17%     29%     (14% / 21%)              68
hollow         19%     27%     (16% / 28%)              60
sharp          13%     28%     (12% / 29%)              70
magpie         18%     30%     (13% / 25%)              70
sexton         20%     24%     (11% / 19%)              93
arbiter        15%     28%     (15% / 24%)              70
tempest        14%     27%     (15% / 30%)              79
rimeblade      16%     21%     (13% / 23%)              77
beastcaller    10%     31%     (13% / 30%)              74
geomancer      29%     26%     (16% / 24%)              78
alchemist      11%     27%     (12% / 28%)              66
nightblade     18%     28%     (14% / 29%)              55
mean         16.8%   27.3%    (13.5% / 25.2%)
```

Every class is between 10% and 29% in fresh profiles. In career profiles every class is between 21% and 30%, except the Beastcaller at 31%. That is within one standard error at 200 runs. Its fresh rate is the floor of the band, so it keeps its HP; see round 88. Fresh win rates rose about 3 points on average, because the hardest bosses no longer end most runs. That is intended: before, the boss you drew decided many runs.

The share of runs that reached each boss and lost to it (fresh profile, all classes pooled):

| Act | Boss | v0.9 | v0.10 |
|---|---|---|---|
| 1 | Lantern Warden / Briar Queen / Tide Broker / Antlered King / Bell Tyrant | 6–20% | 7–20% |
| 2 | Leviathan / Magpie King / Chorus of Knives / Blotted Saint / Impresario | 7–48% | 12–41% |
| 3 | Clockmaker / Forgemother / Orrery / Last Dealer / Gravelord | 53–88% | 46–67% |

The Reflection (Act 4, optional) was not beaten by the bot in either version.

## v0.9 "Clean Cut" (after removing repeat cards; see docs/10-V9-CLEAN-CUT.md)

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

## v0.8 "Hard Earned" (Ascension 0, 100 bot runs per class per mode, everything on)

Mike's target: **a 10–30% win rate**, with the 13 classes close together. The bot is a lookahead player that never misreads a trap, so people will land below it; treat these numbers as the top edge of what a player sees.

Two ways to measure it, both new in `sim/simulate.ts` (helpers in `sim/metabot.ts`):

- **Fresh** (`PROFILE=fresh`): every run starts from a blank profile: level 1 card pool, no collection, talents, loadout, unlocks or Nemesis. This is a new player's first real run (tutorial skipped).
- **Career** (`PROFILE=career`): one profile per class plays 100 runs in a row and keeps everything between them: XP and levels, Coins spent on class packs, Dust crafted into class rares, souvenirs, talents (Guard → Feint → Coin), a like-for-like loadout (Strike → best attack, Guard → best non-attack), achievements, Season rewards, Legacy echoes and the Nemesis. Ascension stays at 0, so this is the most generous case.

```
class        fresh  (act2 / act3)   career (act2 / act3)   career by quarter (runs 1-25 / 26-50 / 51-75 / 76-100)
duelist       12%   ( 90% / 55%)     27%   ( 93% / 69%)     12% / 40% / 32% / 24%
warden        16%   ( 91% / 65%)     17%   ( 99% / 75%)      4% / 32% / 16% / 16%
hollow        13%   ( 98% / 66%)     32%   (100% / 80%)     24% / 40% / 36% / 28%
sharp         10%   ( 79% / 52%)     31%   (100% / 92%)     40% / 36% / 28% / 20%
magpie        13%   ( 90% / 59%)     26%   ( 96% / 63%)     12% / 20% / 36% / 36%
sexton        11%   ( 76% / 54%)     18%   ( 61% / 41%)     28% / 12% / 16% / 16%
arbiter       12%   ( 84% / 66%)     25%   ( 88% / 76%)     24% / 20% / 40% / 16%
tempest       16%   ( 96% / 72%)     30%   (100% / 83%)     24% / 28% / 44% / 24%
rimeblade     12%   ( 80% / 41%)     21%   ( 89% / 58%)     28% / 20% / 20% / 16%
beastcaller   10%   (100% / 75%)     30%   (100% / 92%)     20% / 24% / 44% / 32%
geomancer     12%   ( 90% / 71%)     21%   ( 90% / 75%)     36% / 24% / 12% / 12%
alchemist     14%   ( 97% / 55%)     30%   ( 98% / 78%)     20% / 40% / 32% / 28%
nightblade    12%   ( 79% / 47%)     26%   ( 97% / 76%)     12% / 36% / 28% / 28%
mean          12.5%                  25.7%
```

**Fresh: 10–16%, every class inside the band. Career: 17–32%, mean 26%.** Two classes sit one or two points over 30 (the Hollow 32, the Cardsharp 31); a 100-run sample at 30% has a standard error of about ±4.6 points, so neither is distinguishable from 30 and I stopped there rather than tune to noise. Progression roughly doubles the win rate, and almost all of that lift arrives in the first 10–15 runs (levels and talents come fast); later quarters do not keep climbing. Every career profile reached level 19–20 with about 370–400 cards.

Top killers (fresh, all classes): the Clockmaker (A3) 127, the Impresario (A2) 101, the Forgemother (A3) 83, the Last Dealer (A3) 72, the Gravelord (A3) 66. Act 3 is the wall, as it should be.

Before this pass (same seeds): the classic harness had all 13 classes at 23–41%, and the first career measurement, before any meta changes, had them at **37–85%**. The meta layer, not the enemies, was the main reason runs were easy.

### What drives the progression lift (career ablations, 60 runs)

| Removed from the career profile | Duelist | Nightblade | Arbiter | Magpie | Hollow | Cardsharp |
|---|---|---|---|---|---|---|
| nothing (v0.7 meta) | 68% | 78% | 83% | | | |
| loadout | 30% | 57% | 20% | | | |
| talents (and their loadout slots) | 20% | 55% | 77% | | | |
| talents + loadout | 10% | 23% | 13% | | | |
| level (card pool) or owned Legendaries | −11 to +12, within noise | | | | | |
| *after the loadout cap:* Guard school | 17% (from 42) | | | 22% (47) | 20% (42) | 27% (42) |
| *after the loadout cap:* Coin school | 27% | | | 40% | 37% | 33% |
| *after the loadout cap:* Feint school | no change | | | no change | no change | no change |

Loadouts first (a Legendary like Eternal Objection or Mirror Riposte in every opening hand), then the Guard talents (Max HP, Block every fight, healing every fight), then the Coin talents.

### Changes

| Change | Why |
|---|---|
| **Base difficulty table** (new `src/data/difficulty.ts`): enemy HP ×1.05 / ×1.12 / ×1.15 in Acts 1 / 2 / 3+ (bosses ×1.16 in Act 3), enemy damage ×1.03 / ×1.08 / ×1.13, applied to the printed number before Strength. Off for the rules tests, Riddles, Arena duels and the tutorial's first fight; Ascension stacks on top | One honest dial for "how hard is A0". Weighted toward Act 3 so a new player still gets through Act 1 (76–100% reach Act 2) and a strong deck still has to earn the last boss. A flat ×1.15 / ×1.12 first pass overshot to 5–19% |
| **Loadouts**: base swaps 2 → 1, Signature Moves max 3 → 1 rank, at most 1 Rare, no Legendaries. Old saves are trimmed to the first legal swaps | Biggest single source of the lift (the Arbiter went 83% → 20% without its loadout). Owned Legendaries still enter run drafts, so collecting them still matters |
| **Talents**: Vitality +4 → +2 Max HP per rank; Opening Guard 3 → 2 Block and max 2 → 1; Field Dressing "heal 2 per rank after every combat" → "heal 4 per rank after elite and boss fights"; Pocket Money 30 → 20 gold per rank; Haggler 8% → 6% per rank. Ranks above a new cap are refunded on load | Guard was worth about 20 points of win rate on its own, Coin about 8 |
| **Legendary draft odds** for owned Legendaries: 12% → 8% on a rare slot, 25% → 15% on a rare upgrade | Late careers owned most Legendaries and saw one in nearly every elite reward |
| **The Nemesis moves on** after beating you three times running (it used to stay at grudge 4 forever) | A career Beastcaller lost **53 runs** to the same Act 3 Nemesis (Devil & Eater at +55% HP and +3 Strength). A profile could get stuck behind one fight |
| **Eternal Objection** cost 1 → 2 (upgraded 1); **Mirror Riposte** cost 1 → 2 (upgraded 1); **Bankroll** 2 / 3 → 1 / 2 Ante per carried energy | The outlier cards in winning career decks |
| **Class HP**: Sexton 82 → 90, Tempest 78 → 88, Beastcaller 74 → 82, Warden 68 → 70; Magpie 72 → 70, Hollow 66 → 62, Rimeblade 80 → 74, Nightblade 62 → 58, Cardsharp 74 → 72, Alchemist 70 → 68 | HP is the lever that keeps each class's identity. The weak four lost too often in Act 1 once enemies got tougher; the strong ones ran away in careers |
| **Storm in a Bottle** 3 → 4 starting Charge, **Spark Ward** 6 / 8 → 7 / 9 Block, **Tombstone** 7 / 10 → 8 / 11 Block | The Tempest and the Sexton were last in both modes even with more HP |

Ascension still bites: a career profile at **Ascension 5** (50 runs, everything carried) wins Duelist 8%, Warden 10%, Tempest 16%, Hollow 12%, so a veteran who climbs Ascension is back in the same band as a new player at A0.

Still open:
- The bot never routes, never plans Prime/Converge or Resonance turns and plays Counters greedily, so the Arbiter, Alchemist and Sexton are probably better in human hands than here, and humans will win less than the bot overall. If playtests show new players below 5%, the first lever is `DIFFICULTY.hp/dmg` for Act 1.
- Career results come from one profile per class, so they swing more than fresh ones (the same class measured 15–29% across rounds with tiny changes). Read the career column as ±6 points.
- The Clockmaker is again the top killer for most classes.

## v0.7 (Ascension 0, 100 bot runs per character, elements and Counters on, bot Counters in Automatic mode)

```
duelist      win 25% | reach act2 84% | reach act3 67% | avg floor 22.0 | Act 4: 4 tries, 3 wins
warden       win 30% | reach act2 100% | reach act3 83% | avg floor 25.1 | Act 4: 11 tries, 10 wins
hollow       win 39% | reach act2 100% | reach act3 82% | avg floor 24.7 | Act 4: 6 tries, 4 wins
sharp        win 25% | reach act2 85% | reach act3 69% | avg floor 22.6 | Act 4: 5 tries, 5 wins
magpie       win 41% | reach act2 98% | reach act3 82% | avg floor 24.7 | Act 4: 6 tries, 4 wins
sexton       win 27% | reach act2 78% | reach act3 58% | avg floor 20.8 | Act 4: 3 tries, 3 wins
arbiter      win 23% | reach act2 81% | reach act3 73% | avg floor 22.4 | Act 4: 4 tries, 4 wins
tempest      win 26% | reach act2 94% | reach act3 74% | avg floor 23.6 | Act 4: 4 tries, 1 win
rimeblade    win 27% | reach act2 89% | reach act3 61% | avg floor 22.1 | Act 4: 2 tries, 1 win
beastcaller  win 23% | reach act2 98% | reach act3 79% | avg floor 24.1 | Act 4: 5 tries, 1 win
geomancer    win 36% | reach act2 95% | reach act3 81% | avg floor 24.6 | Act 4: 10 tries, 10 wins
alchemist    win 40% | reach act2 100% | reach act3 78% | avg floor 24.4 | Act 4: 6 tries, 5 wins
nightblade   win 37% | reach act2 87% | reach act3 66% | avg floor 22.3 | Act 4: 7 tries, 3 wins
```

All 13 classes land in 23–41%. Ascension 5 spot check (50 runs each): Duelist 10%, Arbiter 12%, Rimeblade 12%, Nightblade 14%, in line with v0.6's 3–13%. The old six moved by at most a few points from v0.6 except the Warden (41 → 30) and the Magpie (31 → 41). Our best guess, not yet measured: Wild is burned by Blaze, which is common among Act 3 enemies, while Frost beats Wild and Storm Aspects, and Glass also gained two Counters (Shard Reply, Mirror Reply).

First pass (60 runs each, before tuning): Nightblade 67%, Tempest 10%, Rimeblade 15%, Sexton 18%, Arbiter 22%.

| Change | Why |
|---|---|
| **Smoke Ward** cost 1 → 2, Block 2 → 3; **Smoke Cowl** no longer gives 1 Veil; **Nightblade** 66 → 62 HP | A 1-cost Reaction that gains Veil fires *before* the attack lands, so it was a 1-energy Negate for every attack. 67% → 37%. |
| **Tempest** 70 → 78 HP, a Capacitor replaces a Guard, Storm in a Bottle 2 → 3 Charge, Static Jab 5/2 → 6/3, Thunderclap 4 → 5 base | It had no defence in the starter deck and lost most runs in Act 1. 10% → 26%. |
| **Rimeblade** 72 → 80 HP, Rime Heart 2 → 3 Chill and +25% → +50% vs Frozen, Frost Cut and Hoarfrost Ward +1 Chill, Shatter bonus 10 → 12 | It needed two turns to freeze anything, then had nothing left. 15% → 27%. |
| **Sexton** 78 → 82 HP, **Arbiter** 72 → 76 HP | Elements made Stone (Sexton) take more from Storm and Flood enemies; the Arbiter's Counters often met Rebuttals on bosses. |

Still open:
- The bot plays Counters greedily (cheapest legal one, Negates first) and ignores Attunement order, so the counter-heavy Arbiter and the element-juggling Alchemist are probably better in human hands than here.
- The Clockmaker (Act 3) is again the top killer for 8 of 13 classes.

## v0.6 (Ascension 0, 100 bot runs per character, acts mixed across 3 versions, Skies/Layouts/Fates/Surprises/roadside encounters on)

```
duelist  win 28% | reach act2 85% | reach act3 68% | avg floor 21.8 | Act 4: 3 tries, 1 win
warden   win 41% | reach act2 97% | reach act3 82% | avg floor 24.8 | Act 4: 12 tries, 12 wins
hollow   win 38% | reach act2 99% | reach act3 81% | avg floor 24.4 | Act 4: 5 tries, 3 wins
sharp    win 26% | reach act2 87% | reach act3 71% | avg floor 22.5 | Act 4: 5 tries, 4 wins
magpie   win 31% | reach act2 88% | reach act3 77% | avg floor 22.9 | Act 4: 4 tries, 1 win
sexton   win 27% | reach act2 81% | reach act3 63% | avg floor 21.1 | Act 4: 3 tries, 3 wins
```

Ascension 5 (60 runs each): Duelist 3%, Warden 10%, Hollow 7%, Cardsharp 8%, Magpie 13%, Sexton 12%. The spread is now 3–13% (v0.5: 5–25%).

The Long Night (`NIGHT=1`, 40 runs each, nights cleared per run / best): Warden 0.42 / 2 (v0.5: 0.97 / 15), Sexton 0.07 / 2. Compounding works: nobody runs away with it any more.

Per-Fate check (Duelist, 40 runs each, `FATES` forced one at a time): before tuning the spread was 5% (the Bard) to 40% (the Scholar) around a 23% no-Fate baseline. After tuning, the outliers measured: Bard 8, Oath 13, Born Lucky 15, Trickster 18, Pilgrim 25, Cursed Blade 30, Scholar 30, Brute 35. The bot undervalues extra card choices and slots, so the Bard and Oath are likely better for people than these numbers say.

| Change | Why |
|---|---|
| **The Warden** 80 → 68 HP, **the Hollow** 78 → 66 HP | v0.6 added a lot of upside (Fates, Shrines, events, relics) and these two climbed to 53% at A0. Now 41% and 38%. |
| **The Antlered King** 118 → 106 HP, Trample 2×8 → 2×7, Wild Hunt 4×5 → 4×4 | It was the top Act 1 killer for 4 of 6 characters, pulling Act 2 reach down to 76–83%. |
| **Fates** (Bard, Oath, Trickster, Born Lucky, Cursed Blade cheaper; Scholar, Brute smaller; Pilgrim −8 Max HP) | See the per-Fate check above. |

Still open:
- The Warden (41%) sits one point above the 20–40% band; it wins every Act 4 it reaches. Next levers: its starting relic or deck.
- Act 2 reach for the Sexton (81%) and Duelist (85%) is lower than v0.5 (86–94%): Act 1 now has more bosses and wild-act elites (Old Oak, the Alpha). Worth a human playtest before more nerfs.
- The bot always takes the first Fate and skips risky event options, so it understates both the upside and the downside of v0.6's choices.

## v0.5 (Ascension 0, 100 bot runs per character, acts mixed, Venues/Patrons/wandering bosses rolled per run)

```
duelist  win 23% | reach act2 94% | reach act3 59% | avg floor 21.8 | chains/run 36.5 | Act 4: 5 tries, 3 wins
warden   win 38% | reach act2 99% | reach act3 82% | avg floor 25.0 | chains/run 41.1 | Act 4: 9 tries, 8 wins
hollow   win 40% | reach act2 99% | reach act3 88% | avg floor 25.0 | chains/run 23.4 | Act 4: 12 tries, 3 wins
sharp    win 21% | reach act2 91% | reach act3 62% | avg floor 22.1 | chains/run 34.3 | Act 4: 2 tries, 2 wins
magpie   win 25% | reach act2 95% | reach act3 72% | avg floor 23.1 | chains/run 19.1 | Act 4: 7 tries, 3 wins
sexton   win 24% | reach act2 86% | reach act3 56% | avg floor 21.2 | chains/run 51.2 | Act 4: 7 tries, 6 wins
```

Ascension 5 (60 runs each): Duelist 5%, Warden 25%, Hollow 17%, Cardsharp 5%, Magpie 5%, Sexton 8%.

The Long Night (`NIGHT=1`, 60 runs each, nights cleared per run / best): Duelist 0.12 / 4, Warden 0.97 / 15, Hollow 0.03 / 1, Cardsharp 0.07 / 2, Magpie 0.02 / 1, Sexton 0.27 / 5.

| Change | Why |
|---|---|
| **The Bell Tyrant** (new Act 1 wandering boss) 122 → 112 HP, Death Knell 20 → 16 | It was in every character's top killers and pulled Act 2 reach down to 73–87%. Now Act 2 reach is 86–99%. |
| **The Sexton** 76 → 78 HP | Act 1 was its weak spot (Lantern Warden, Briar Queen). Its Act 2 reach went from 82% to 86%; it still wins 24%. |
| **The Reflection's Doom against you is halved** | The v0.4 open question: the Hollow never beat its own mirror. It now wins about 1 in 4 Reflections in the sim. |
| **Trap tiers cap at Act 3** (bug fix) | Champion affixes and Vow traps built trap ids like `snap_jaw5` in the Long Night and crashed. Found by the new `NIGHT=1` sim. |

Still open:
- The Hollow (40%) and Warden (38%) are near the top of the band, and the Duelist, Cardsharp and Magpie sit at 21–25%. All inside 17–45%, but the Ascension 5 spread (5% vs 25%) is wide. The cheapest levers are the Duelist's and Cardsharp's starting decks.
- The Warden's Thorns and Block outscale the Long Night's +20% HP / +1 Strength per night (best 15 nights). If playtests agree, make the night scaling compound (×1.2 per night) instead of linear.
- The bot does not route around Venues or plan Prime/Converge turns, so it understates the Sexton and Converge decks.

## v0.4 (Ascension 0, 100 bot runs per character, acts mixed, wandering bosses rolled per run)

```
duelist  win 18% | reach act2 97%  | reach act3 63% | avg floor 22.4 | chains/run 37.8 | Act 4: 2 tries, 2 wins
warden   win 43% | reach act2 100% | reach act3 86% | avg floor 25.5 | chains/run 42.9 | Act 4: 6 tries, 6 wins
hollow   win 32% | reach act2 100% | reach act3 89% | avg floor 24.9 | chains/run 22.5 | Act 4: 7 tries, 0 wins
sharp    win 17% | reach act2 97%  | reach act3 64% | avg floor 22.5 | chains/run 34.8 | Act 4: 2 tries, 1 win
magpie   win 21% | reach act2 97%  | reach act3 75% | avg floor 22.9 | chains/run 19.0 | Act 4: 4 tries, 2 wins
```

Ascension 5 (60 runs each): Duelist 7%, Warden 13%, Hollow 15%, Cardsharp 5%, Magpie 5%.

"Win" means beating the Act 3 boss; the Act 4 Reflection is optional glory and does not count against the win rate.

| Change | Why |
|---|---|
| **The Briar Queen** (wandering Act 1 boss) 130 → 112 HP, starts with 1 Thorns (was 2), Crown of Thorns +1 Str/+1 Thorns (was +2/+2), Wrath 6×4 → 5×4 | In the first pass it was the top killer for the Duelist, Cardsharp and Magpie, all in Act 1. Now it is not in any top-8 list. |
| **Cardsharp:** Loaded Coin starts at 3 Ante (was 2), Hedge 9 → 10 Block | The two levers named in the v0.3 report. The new Act 2 enemies had pulled it to 13%; now 17%. |
| **Act 2 newcomers:** Chain Lash 11 → 10, Trapper Volley 6×2 → 5×2, Grave Leech Drain 8/heal 5 → 7/heal 4 | The new pool made Act 2 a little harsher for everyone. |
| **The Magpie** 72 HP, 2 slots, Steal/Glint starter | Lands mid-band (21%) on its first tuning pass. The bot plays Glints greedily and never holds them for Glass Cannon, so it understates the character. |

Still open: the Duelist and Cardsharp sit just under the 20% floor in this sample (both were 21–23% in v0.3, and 100-run samples swing ±4 points). The Hollow reaches the Reflection often but never beats it: a Doom deck mirrored back at you is slow to kill and fast to kill you. That is a fair "know yourself" fight, but if playtests agree it is unfair, give the Reflection less HP when it plays a Void deck.


## v0.3 (Ascension 0, 100 bot runs per character, acts mixed 50/50 between classic and alternate)

```
duelist  win 21% | reach act2 99%  | reach act3 61% | avg floor 22.3 | chains/run 37.5
warden   win 44% | reach act2 100% | reach act3 81% | avg floor 25.0 | chains/run 50.0
hollow   win 29% | reach act2 100% | reach act3 86% | avg floor 24.4 | chains/run 22.3
sharp    win 23% | reach act2 100% | reach act3 63% | avg floor 22.6 | chains/run 39.7
```

Ascension 5 (60 runs each): Duelist 7%, Warden 15%, Hollow 13%, Cardsharp 3%.

| Change | Why |
|---|---|
| **Hollow:** Ossuary Ward added to the starting deck (12 cards), Hollow Crown 4 → 6 Doom, 5 new Void cards | 8% → 29%. Doom now reaches lethal on Act 3 bosses in time. Its top killer is still The Last Dealer, but no longer by a wide margin. |
| **Cardsharp:** new starter *Cash Out* (5 + 2× Ante), 2nd Coin Toss, 74 HP | Without a payoff in the starting deck, Ante did nothing until a Jackpot showed up: 3% → 23%. |
| **Duelist:** 72 → 76 HP, a Guard swapped for a 2nd Parry | 17% → 21%. More Reactions also means more chains, the thing the Duelist teaches. |
| **Chorus of Knives** 160 → 150 HP | It was the top killer for 3 of 4 characters. |
| **Clockmaker** 215 → 205 HP, Gear Storm caps at 5 hits (was 6), Wind 20 → 18 Block | It took 34 of the Warden's 40 deaths in alternate Act 3. |
| **Impresario** Grand Finale 30 → 26 | Top killer in alternate Act 2 for the Duelist and Hollow. |

Still open: the Warden is at the top of the band (44%), and the Cardsharp is the weakest at A5 (3%). The bot values Ante gains but does not plan coin faces across a turn, so the Cardsharp is the character the bot understates most. Humans reading ☀/☾ should do clearly better. Next levers if playtests agree: Loaded Coin 2 → 3 starting Ante, or Hedge 9 → 10 Block.

## v0.2 (Ascension 0, 150 bot runs per character, no meta bonuses)

```
duelist  win 17% | reach act2 99%  | reach act3 66% | avg floor 22.5 | chains/run 31.6
warden   win 47% | reach act2 100% | reach act3 61% | avg floor 23.2 | chains/run 39.9
hollow   win  8% | reach act2 100% | reach act3 77% | avg floor 23.2 | chains/run 17.9
```

Changes since v0.1 that affect these numbers: forge stops and Champion elites on the map (the bot treats a Champion like any elite, so it walks into affixes it would avoid), the Hollow's 3rd Reaction slot and Hollow Crown 3 → 4 Doom, and the combat-start Block fix. The bot never places Dares, uses sigils or talents, so real players start stronger than this floor. The Hollow gap is still open: its deaths are now almost all in Act 3 (Last Dealer), so the next lever is Act 3, not its early game.

Meta-layer bonuses (talents, loadouts, sigils) are intentionally modest: fully talented, a player gains roughly +12 Max HP, 6 combat-start Block, 4 HP healing per fight, 5 loadout swaps and a 4th card choice, comparable to two or three extra relics.

# Prototype v0.1 report

Produced with `npm run sim -- <runs> <ascension>`: a lookahead bot plays full runs (map, shop, events, every fight). For each turn it tries card sequences on copies of the fight, plays out the enemy turn on each copy, and keeps the best line. It does not plan across turns, path well on the map, or understand Sacrifice synergies, so **its win rate is a floor, not a forecast** for human players.

## Results

### Ascension 0 (150 runs per character, seeds 1000–1149)

```
== duelist (A0, 150 runs, 62.9s) ==
win 21% | reach act2 100% | reach act3 61% | avg floor 22.3 | chains/run 32.0 | longest 5
top killers: A2 Chorus of Knives 34 · A3 The Last Dealer 29 · A2 Echo 8 · A3 Bone Choir 7 · A2 Spore Mother 6 · A3 Eye & Mage 6 · A3 Stalker & Eye 6 · A3 Grand Sentinel 4
== warden (A0, 150 runs, 78.5s) ==
win 42% | reach act2 100% | reach act3 60% | avg floor 23.2 | chains/run 41.1 | longest 5
top killers: A2 Chorus of Knives 58 · A3 The Last Dealer 19 · A3 Stalker & Eye 3 · A3 Eye & Mage 2 · A3 Bone Choir 2 · A2 Spore Mother 1 · A3 Echo Champion 1 · A2 Cultist & Hound 1
== hollow (A0, 150 runs, 51.5s) ==
win 7% | reach act2 100% | reach act3 77% | avg floor 23.0 | chains/run 18.0 | longest 3
top killers: A3 The Last Dealer 41 · A2 Chorus of Knives 18 · A3 Stalker & Eye 17 · A3 Echo Champion 13 · A3 Eye & Mage 12 · A3 Mage & Choir 6 · A2 Spore Mother 5 · A3 Grand Sentinel 5
```

### Ascension 5 (100 runs per character)

```
== duelist (A5, 100 runs, 30.2s) ==
win 6% | reach act2 80% | reach act3 29% | avg floor 17.0 | chains/run 23.7 | longest 5
top killers: A1 The Lantern Warden 19 · A2 Chorus of Knives 17 · A2 Chorus Knight 9 · A3 The Last Dealer 8 · A2 Echo 5 · A2 Spore Mother 5 · A3 Echo Champion 5 · A3 Stalker & Eye 4
== warden (A5, 100 runs, 39.2s) ==
win 15% | reach act2 97% | reach act3 28% | avg floor 19.7 | chains/run 35.4 | longest 5
top killers: A2 Chorus of Knives 57 · A3 The Last Dealer 8 · A2 Spore Mother 5 · A2 Cult & Imp 3 · A1 The Lantern Warden 3 · A3 Eye & Mage 2 · A2 Warden of Seals 2 · A3 Echo Champion 1
== hollow (A5, 100 runs, 25.9s) ==
win 1% | reach act2 96% | reach act3 46% | avg floor 19.4 | chains/run 15.7 | longest 3
top killers: A2 Chorus of Knives 18 · A3 The Last Dealer 11 · A3 Echo Champion 10 · A2 Spore Mother 7 · A3 Grand Sentinel 7 · A2 Echo 6 · A3 Stalker & Eye 5 · A2 Warden of Seals 4
```

## Reading it

| Check | Target | Now | Verdict |
|---|---|---|---|
| Every character reaches Act 2 | > 90% | 100% / 100% / 100% | OK |
| Bot A0 win rate spread | all within 15–40% | Duelist 21%, Warden 42%, Hollow 7% | **Hollow under, Warden slightly over** |
| No single encounter > 30% of deaths | ≤ 30% | Warden: Chorus of Knives ≈ 66% of its deaths | **Chorus is Warden's wall** |
| A5 harder than A0 | yes | win rates drop by roughly a third to a half | OK |
| Chains happen | several per fight | 18–41 chains per run, up to 5 links | OK |

## Known gaps to fix with human playtests

1. **The Hollow (expert character) is weakest.** Its plan (Sacrifice Reactions → Doom on everything) needs multi-turn planning the bot doesn't do, so the true gap is smaller than 7% suggests. Levers already identified: Hollow Crown Doom 3 → 4, cheaper *Offering*, or a third Reaction slot as Hollow's passive.
2. **Chorus of Knives vs. the Thorn Warden.** Warden either beats it comfortably or loses a long race; tune Verse's escalation cap (5 knives) or Refrain's Block.
3. **The Last Dealer** is the top killer for Duelist and Hollow, mostly through Strength gained from its traps. Disrupt and counter-trap play beat it; humans should find this faster than the bot.

## How to re-run after a change

```bash
npm run sim -- 150 0                 # all characters (classic: level-10 card pool, no meta)
npm run sim -- 100 0 hollow          # one character
PROFILE=fresh npm run sim -- 100 0   # v0.8: blank profile every run
PROFILE=career npm run sim -- 100 0  # v0.8: one profile per class keeps its progression
ABLATE=talents,loadout PROFILE=career npm run sim -- 60 0 duelist   # strip parts of the meta (talents, loadout, legends, level, nemesis, guard, purse, feint)
npm test                             # rules still hold
npm run catalog                      # refresh CATALOG.md
```
