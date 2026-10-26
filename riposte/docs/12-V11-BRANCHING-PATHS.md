# v0.11 "Branching Paths": 2,617 cards, two upgrades each

Mike asked for the middle path after v0.10: grow the pool from 1,033 to about 2,500 cards, review every card for redundancy, and add depth systems rather than just numbers. This version does that.

| | v0.10 | v0.11 |
|---|---|---|
| Player cards | 1,033 | **2,617** |
| Collectible | 990 | **2,508** (plus 70 evolved forms you can only reach in a run) |
| Cards per class draft pool | 160–230 | **496–558** |
| Redundant pairs (`npm run audit`) | 0 | **0** |
| Upgrades per card | 1 | **2** (path A and path B) |

## What's new for the player

### 1. Two upgrade paths per card

Every card can be upgraded once, down one of two paths. You pick in the upgrade window (rest site, events, shrines) by tapping the version you want.

- **Path A, Name+**: the classic upgrade. Bigger numbers, or the cost cut or lost Exhaust that some cards already printed.
- **Path B, Name✦**: the numbers stay, and the card gains a keyword instead. Which keyword follows from the card:
  - it Exhausts → it **no longer Exhausts** (28 cards);
  - it costs 2 or more → it **costs 1 less** (703 cards);
  - attacks and skills → **Retain** (841 cards);
  - Reactions, Counters and powers → **Innate** (1,045 cards).

Path B is the "make the deck smoother" upgrade; path A is the "make this card hit harder" upgrade. Hand-made cards can define their own path B (the `alt` field) for later tuning.

Deck codes write path A as `id+1` (as before) and path B as `id+2`. Echoes and the Arena read both.

### 2. Evolve cards (70 pairs)

Five per faction for the 13 home factions plus Tide. An Evolve card reads `Evolve N (Name)`: play that copy N times (3 to 5) in fights you win and, after the fight, it becomes the named card for the rest of the run, keeping its upgrade. A toast says so, and the card shows its progress as `[2/4]`.

Evolved forms keep the base card's cost and role, are priced as rares (+10%), and add a new clause. Examples:

- **Spark Squire** (attack, 1): Deal 4 damage. Apply 1 Burn. Evolve 4 → **Flame Knight**: Deal 5 damage. Apply 1 Burn. Deal 3 damage to each enemy with Burn.
- **Pup** (skill, 1): Summon Wolf 2. Evolve 4 → **Alpha Wolf**: Summon Wolf. Your companions act.
- **Small Claim** (Counter, 1): gain Block and 1 Verdict. Evolve 3 → **Supreme Claim**: the same, and if you are below half HP, heal.

Evolved forms are never drafted, sold or packed.

### 3. Class-pair hybrids (234 cards)

Three cards for each of the 78 pairs of the 13 classes' home factions. A hybrid belongs to both factions, so either class can draft it, and it mixes their mechanics:

- **Steamburst** (Ember + Rime): Deal 4 damage. If the target has Chill, apply 2 Burn. If the target has Burn, apply 2 Chill.
- **Ashen Omen** (Ember + Void): Double the target's Burn. Double the target's Doom. Exhaust.
- **Hot Streak** (Ember + Gilt): Deal 4 damage. ☀ Apply 2 Burn. ☾ Raise your Ante by 3. Flip your Fate Coin.
- **Black Ice** (Void + Rime): When attacked: gain 5 Block and apply 2 Chill. If the attacker is Frozen, apply Doom.

### 4. 56 new powers and 1,158 faction-set cards

- Four powers per faction, on six triggers: start or end of your turn, a chain of 2+ or 3+ links resolving, playing a Counter, one of your Reactions firing. Some are gated ("At the end of your turn, if you have Veil, deal 3 damage to ALL enemies").
- Faction sets: each faction's v0.11 designs use its own effects and the conditions that fit its play style. Ember reads Burn, Strength and the first card of the turn; Tide reads the chain and your hand size; Storm reads Charge, Shock and how many elements you played; Grave reads the Crypt; and so on.

### 5. The Spread (a new act map)

The act map is now dealt as cards down the Dealer's table, top to bottom, instead of a climb of icons on lines. It matches the story's descent into the duel hall. Map generation, node types and routes are unchanged; only the screen is new (`src/ui/map.ts`, `src/ui/map.css`).

### 6. A storyline: "The Last Word"

Short scenes at act starts, bosses, the crossroads and the results screen, plus story events. The full lore bible is [13-STORY.md](13-STORY.md).

## How the cards were made (and why they are not 2,500 numbers)

All v0.11 cards are written in a small design language (`src/data/dsl11.ts`). A design names a shape and its effects, e.g. `['Bramblefire', 'A1u', 'dmg burn thr:p_burn']`, and the compiler:

1. **prices the numbers** on the yardstick the game already uses (1 energy ≈ 6 damage ≈ 5 Block ≈ 1.3 cards; Reactions +30%, Counters +20%, uncommon +12%, rare +35%, Exhaust +35%);
2. **prices conditions by how often they hold**: an effect behind "Chain 3:" (true about 30% of the time) prints about 3× the number of an ungated one;
3. **rejects bad designs**: a number below the floor (Block or damage under 3), a status over its cap (Weak and Vulnerable max 3, Mark 4, and so on), a condition that an earlier effect of the same card always makes true ("Apply Burn. If the target has Burn, ..."), "Chain 2" on a Reaction or Counter (they are always in a chain of 2+), "if you played a Counter this turn" on a Counter, a gated drawback, a card that does nothing unless its condition holds;
4. **writes the rules text**, so the text and the code can't disagree.

30 conditions are available: `Chain 2/3`, "if the target has Burn / Chill / Shock / Tremor / Weak / Vulnerable / Doom / Mark", "is Frozen", "is below half HP", "first card this turn", "2+ other cards this turn", "you have Block / Verdict / Charge / Thorns / Fortify / Veil / Strength / a companion", "3 or fewer cards in hand", "2+ elements this turn", "a Counter this turn", "Crypt 3+", "Exhumed this turn", "Ante 3+", ☀ / ☾, "a Glint in hand", "a stolen trap set", "2+ Reactions set", "below half HP", "2+ enemies", "attuned to the element that beats the target".

New effects: double a status (Burn, Chill, Shock, Tremor, Doom), spend all Charge / Verdict / Ante for scaling damage or Block, damage per card in hand / Reaction set / card in the Crypt, Block per enemy / companion, gain 1 energy, 2 Glints, Bury 4, 2 Verdict, 2 Veil, "your companions act", and a 3 HP drawback.

The hybrids, Evolve pairs and powers were written by hand, one row per card (`src/data/cards11.ts`). The faction-set cards were drafted from each faction's vocabulary in a stable order (`src/data/sets11.ts`) and kept only if they passed every check.

### The redundancy review

Every new card was checked against the whole pool, in two ways:

- **The v0.9 test** (`npm run audit`): no two cards with the same type, cost, trigger and element, the same rules once numbers are blanked, and numbers within 2 or 25%. It still finds **0 pairs** across all 2,578 checked cards.
- **A stricter v0.11 test**: no new card may share its rules text, with the numbers blanked, with any other card of its type and element **at any cost**. So no v0.11 card is a bigger or smaller copy of another card. Every faction-set design also has at least one condition or one v0.11 effect, so none of them repeats a v0.7 card with new numbers.

The faction-set builder tried 1,878 designs and kept 1,158: 665 were turned down on pricing or by the lints above and 55 because their rules text already existed. Every hand-written hybrid, Evolve pair and power was run through the same checks, and the rows that failed were renamed or retuned by hand until they passed. The test suite fails if any v0.11 card repeats a rules text, or if any card's text has a `?`, `undefined` or `NaN` on either upgrade path.

## Engine changes

- `CardInst.path = 'b'` marks a path-B upgrade; `src/data/upgrades.ts` decides cost, Retain, Innate, Exhaust and values for each copy. `combat.ts`, the renderer, Echo ghosts, the Arena and deck codes all go through it.
- `CardDef.evolve = { into, n }` and `CardInst.evo`; plays are counted per copy in combat (`stats.evo`), and `evolveCards()` applies them after a won fight.
- `CardDef.faction2`: hybrids are in both factions' reward pools.
- `CardDef.evolved`: evolved forms are left out of drafts, packs, the market and the collection.
- Two new status hooks for powers: `onCounter` and `onReactFire`. Each v0.11 power registers its own status (`pw_<card id>`).
- The bot takes path B when it makes the card cheaper, and path A otherwise.

## Balance

Mike set a new target with this version: **15–30% for a fresh profile with every class, and higher for a levelled-up profile**. After tuning, fresh runs land at 15–24% for all 13 classes and career runs at 28–43% (mean 36.5%), each class 7 to 24 points above its own fresh rate.

The levers were small: talents partly restored toward their pre-v0.8 values (Vitality, Opening Guard, Field Dressing), HP for five weaker classes and a little less for the Nightblade, and one stronger starter card each for the Arbiter and the Rimeblade. The table and reasons are in [BALANCE.md](BALANCE.md).

## Tests

89 tests pass (5 new): pool size and clean text on both paths; no v0.11 rules-text repeats; every class drafts from 300+ cards and hybrids reach both classes; path B's cost, Retain, Innate and Exhaust rules plus the rest site and deck codes; Evolve counting and transformation; v0.11 powers firing.

## Decisions and open questions

- **What counts toward 2,500**: the 2,508 collectible cards alone pass 2,500; the 70 evolved forms are counted only in the 2,617 total.
- **New cards are drafted at the v0.7 weight of generated cards** (half the weight of hand-made signature cards), so the classes' signature cards still show up about as often as before.
- **Rarity mix**: v0.11 adds more uncommons and rares than commons (389 common, 793 uncommon, 406 rare), because three-effect designs are priced as uncommon or rare. The common pool still grew by about 40%.
- **Not built yet**: hand-drawn art for the new cards (they use emoji glyphs like the v0.7 cards), and a per-card review pass by a human designer, which is the next useful step.
