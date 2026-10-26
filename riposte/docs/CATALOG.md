# Dawnwick content catalog

_Generated from `src/data` by `npm run catalog`. Do not edit by hand._

**2158 player cards** (2049 collectible, plus 70 evolved forms). Before v0.11: 387 hand-designed and 1355 generated from the effect atoms in `src/data/cardgen.ts`. v0.11 (`src/data/cards11.ts`, `sets11.ts`): 220 class-pair hybrids, 70 Evolve cards and their 70 evolved forms, 56 powers and 828 faction-set cards. 301 Counters.

Every card has two upgrades: **A** (Name+, the "Upgraded" column) and **B** (Name✦, the "Path B" column: costs 1 less, Retains, is Innate or stops Exhausting). ★ = hand-designed, ⧉ = class-pair hybrid (second faction in brackets), 🦋 = Evolve / evolved form.

## Elements

| Element | Strong against | Weak to | Resonance |
|---|---|---|---|
| 🔥 Blaze | Frost, Wild | Flood, Stone | Apply 3 Burn to ALL enemies. |
| ❄️ Frost | Wild, Storm | Blaze, Stone | Apply 3 Chill to ALL enemies. |
| 🌿 Wild | Storm, Flood | Blaze, Frost | Heal 3 and gain 2 Barbs. |
| ⚡ Storm | Flood, Stone | Frost, Wild | Apply 3 Shock to ALL enemies and gain 1 Charge. |
| 🌊 Flood | Blaze, Stone | Wild, Storm | Draw 2 cards. |
| 🪨 Stone | Blaze, Frost | Storm, Flood | Gain 8 Guard. |
| ✨ Radiant | Umbral | Umbral | Heal 4 and gain 1 Verdict. |
| 🌑 Umbral | Radiant | Radiant | Apply 7 Doom to ALL enemies. |

## Characters

| Character | Factions | Element | HP | Starter relic | Starting deck |
|---|---|---|---|---|---|
| The Ashen Duelist | ember + tide | Blaze | 79 | duelists_fan | strike, strike, strike, strike, guard, guard, guard, spark_lunge, parry, parry |
| The Thorn Warden | thorn + tide | Wild | 72 | root_heart | strike, strike, strike, strike, guard, guard, guard, guard, bramble_ward, riptide_snare |
| The Hollow | void + ember | Umbral | 63 | hollow_crown | strike, strike, strike, guard, guard, guard, bone_shield, hollow_cut, bone_toll, ossuary_ward, shatter_seal, rend |
| The Cardsharp | gilt + tide | Radiant | 84 | loaded_coin | strike, strike, strike, strike, guard, guard, guard, coin_toss, coin_toss, hedge, cash_out |
| The Magpie | glass + void | Frost | 74 | magpie_nest | strike, strike, strike, strike, guard, guard, guard, snatch, snatch, glass_edge, sleight |
| The Sexton | grave + thorn | Stone | 80 | gravediggers_spade | strike, strike, strike, strike, guard, guard, tombstone, tombstone, spade_strike, spade_strike, gravedig |
| The Arbiter | dawn + tide | Radiant | 77 | scales_of_dawn | strike, strike, strike, guard, guard, guard, objection, objection, gavel_strike, gavel_strike, dawn_ward |
| The Tempest | storm + tide | Storm | 77 | storm_bottle | strike, strike, strike, strike, guard, guard, capacitor, static_jab, static_jab, spark_ward, thunderclap |
| The Rimeblade | rime + glass | Frost | 84 | rime_heart | strike, strike, strike, guard, guard, guard, frost_cut, frost_cut, frost_cut, hoarfrost_ward, shatter |
| The Beastcaller | beast + storm | Wild | 80 | bone_whistle | strike, strike, strike, strike, guard, guard, guard, call_wolf, call_bear, pack_tactics, feral_ward |
| The Geomancer | stone + thorn | Stone | 78 | lodestone | strike, strike, strike, strike, guard, guard, guard, guard, quake_step, quake_step, bulwark_ward |
| The Alchemist | aether + ember | Flood | 73 | philosophers_flask | strike, strike, strike, strike, guard, guard, guard, vial_toss, vial_toss, catalyze, reagent_ward |
| The Nightblade | dusk + void | Umbral | 51 | smoke_cowl | strike, strike, strike, strike, guard, guard, guard, mark_target, shadow_cut, shadow_cut, smoke_ward |

## Neutral cards (172)

| Card | Type | Element | Rarity | Cost | Text | Upgraded (A) | Path B | Unlock |
|---|---|---|---|---|---|---|---|---|
| Cut | attack ★ | None | starter | 1 | Deal 6 damage. | Deal 9 damage. | Gains Palm |  |
| Sidestep | skill ★ | None | starter | 1 | Gain 5 Guard. | Gain 8 Guard. | Gains Palm |  |
| Brace | reaction (attack) ★ | None | common | 1 | When attacked: gain 9 Guard. | When attacked: gain 13 Guard. | Gains Opener |  |
| Quick Study | skill ★ | None | common | 0 | Draw 2 cards. Fold. | Draw 3 cards. Fold. | No longer Folds |  |
| Second Wind | skill ★ | None | common | 1 | Gain 6 Guard. Draw 1 card. | Gain 9 Guard. Draw 1 card. | Gains Palm |  |
| Feint | reaction (skill) ★ | None | uncommon | 1→0 | When an enemy uses a non-attack: Negate it. | When an enemy uses a non-attack: Negate it. | Gains Opener |  |
| Bank Shot | attack ★ | None | common | 1 | Deal 5 damage. Bank 1 energy for next turn. | Deal 7 damage. Bank 2 energy for next turn. | Gains Palm |  |
| Duel Stance | power ★ | None | rare | 1 | Whenever a chain of 2+ links resolves, gain 4 Guard and deal 4 damage to a random enemy. | Whenever a chain of 2+ links resolves, gain 6 Guard and deal 6 damage to a random enemy. | Gains Opener |  |
| Wildcard | skill ★ | None | rare | 0 | Add 1 random card(s) from your factions to your hand. They cost 0 this turn. Fold. | Add 2 random card(s) from your factions to your hand. They cost 0 this turn. Fold. | No longer Folds | L3 |
| Patience | skill ★ | None | uncommon | 1 | Palm. Gain 7 Guard. Bank 1 energy. | Palm. Gain 10 Guard. Bank 2 energy. | Gains Opener | L2 |
| Tarot Reading | skill ★ | None | uncommon | 1 | Gain 1 random Omen(s) if you have room. Draw 1 card. Fold. | Gain 2 random Omen(s) if you have room. Draw 1 card. Fold. | No longer Folds |  |
| Grand Riposte | reaction (attack) ★ | None | legendary | 2→1 | When attacked: Negate the attack and deal 12 damage to the attacker. | When attacked: Negate the attack and deal 16 damage to the attacker. | Gains Opener |  |
| Master's Gambit | skill ★ | None | legendary | 0 | Gain 2 energy. Draw 2 cards. Fold. | Gain 2 energy. Draw 3 cards. Fold. | No longer Folds |  |
| Lure | attack ★ | None | common | 0 | Deal 2 damage. Chain 2: draw 1 card. | Deal 4 damage. Chain 2: draw 1 card. | Gains Palm |  |
| Tempo | attack ★ | None | common | 0 | Deal 4 damage. If it is the first card you played this turn, draw 1 card. | Deal 6 damage. If it is the first card you played this turn, draw 1 card. | Gains Palm |  |
| Second Thoughts | reaction (skill) ★ | None | uncommon | 1 | When an enemy uses a non-attack: gain 6 Guard and draw 1 card. | When an enemy uses a non-attack: gain 9 Guard and draw 1 card. | Gains Opener |  |
| Hair Trigger | power ★ | None | uncommon | 1 | Whenever one of your Reactions fires, deal 3 damage to a random enemy. | Whenever one of your Reactions fires, deal 5 damage to a random enemy. | Gains Opener |  |
| Chainbreaker | attack ★ | None | rare | 2 | Deal 8 damage, +3 for each link in the longest chain this fight. | Deal 10 damage, +4 for each link in the longest chain this fight. | Costs 1 less |  |
| Ouroboros | power ★ | None | legendary | 3→2 | Chains can be 8 links long. Whenever a chain of 4+ links resolves, draw 2 cards. | Chains can be 8 links long. Whenever a chain of 4+ links resolves, draw 2 cards. | Gains Opener |  |
| Slow Fuse | reaction (attack) ★ | None | common | 1 | Prime. When attacked: deal 4 damage to the attacker, +4 per Prime. | Prime. When attacked: deal 6 damage to the attacker, +5 per Prime. | Gains Opener |  |
| Confluence | attack ★ | None | common | 1 | Deal 4 damage, +3 per Converge. | Deal 5 damage, +4 per Converge. | Gains Palm |  |
| Harmony | skill ★ | None | common | 1 | Gain 3 Guard, +3 per Converge. | Gain 4 Guard, +4 per Converge. | Gains Palm |  |
| Clean Slate | skill ★ | None | uncommon | 0 | Remove every Blot from your cards. Draw 2 cards. Fold. | Remove every Blot from your cards. Draw 3 cards. Fold. | No longer Folds |  |
| Quick Parry | counter (attack) ★ | None | common | 1 | Counter (an attack): gain 9 Guard. | Counter (an attack): gain 13 Guard. | Gains Opener |  |
| Deflect | counter (reaction) ★ | None | common | 1 | Counter (a trap or Reaction): Negate it. Fold. | Counter (a trap or Reaction): Negate it. | Gains Opener |  |
| Snap Retort | counter (reaction) ★ | None | common | 0 | Counter (a trap or Reaction): deal 7 damage to its owner. | Counter (a trap or Reaction): deal 10 damage to its owner. | Gains Opener |  |
| Stall | counter (skill) ★ | None | uncommon | 0 | Counter (a non-attack): Negate it. Fold. | Counter (a non-attack): Negate it. | Gains Opener |  |
| Second Opinion | counter (any) ★ | None | uncommon | 1 | Counter (anything an enemy does): gain 5 Guard and draw 2 cards. | Counter (anything an enemy does): gain 8 Guard and draw 2 cards. | Gains Opener |  |
| Riposte | counter (attack) ★ | None | rare | 1 | Counter (an attack): deal 10 damage to the attacker and gain 4 Guard. | Counter (an attack): deal 14 damage to the attacker and gain 6 Guard. | Gains Opener |  |
| Final Say | counter (any) ★ | None | legendary | 0 | Counter (anything an enemy does): Negate it. Deal 10 damage to the enemy that did it. Fold. | Counter (anything an enemy does): Negate it. Deal 15 damage to the enemy that did it. Fold. | No longer Folds |  |
| Counter Drill | power ★ | None | rare | 1 | Whenever you play a Counter, deal 4 damage to the enemy it answers. | Whenever you play a Counter, deal 6 damage to the enemy it answers. | Gains Opener |  |
| Flare Barrage | attack | Blaze | uncommon | 1 | Deal 5 damage. Apply 1 Exposed to ALL enemies. | Deal 7 damage. Apply 2 Exposed to ALL enemies. | Gains Palm |  |
| Inferno Lash | attack | Blaze | rare | 2 | Deal 7 damage to ALL enemies. Deal 5 damage to each enemy with Burn. | Deal 9 damage to ALL enemies. Deal 7 damage to each enemy with Burn. | Costs 1 less |  |
| Flame Rite | skill | Blaze | uncommon | 1 | Draw 1 card. Apply 1 Exposed to ALL enemies. | Draw 1 card. Apply 2 Exposed to ALL enemies. | Gains Palm |  |
| Flare Rune | reaction (attack) | Blaze | uncommon | 1 | When attacked: gain 5 Guard and apply 1 Exposed to ALL enemies. | When attacked: gain 7 Guard and apply 2 Exposed to ALL enemies. | Gains Opener |  |
| Kiln Mirror | reaction (attack) | Blaze | rare | 0 | When attacked: apply 2 Burn to ALL enemies. | When attacked: apply 3 Burn to ALL enemies. | Gains Opener |  |
| Inferno Pit | reaction (skill) | Blaze | common | 1 | When an enemy uses a non-attack: gain 4 Guard and deal 3 damage to each enemy with Burn. | When an enemy uses a non-attack: gain 5 Guard and deal 4 damage to each enemy with Burn. | Gains Opener |  |
| Fire Rebuff | counter (attack) | Blaze | uncommon | 1 | Counter (an attack): gain 4 Guard and apply 1 Burn to ALL enemies. | Counter (an attack): gain 5 Guard and apply 2 Burn to ALL enemies. | Gains Opener |  |
| Flame Volley | attack | Blaze | uncommon | 2 | Deal 10 damage. Deal 4 damage to each enemy with Burn. | Deal 13 damage. Deal 5 damage to each enemy with Burn. | Costs 1 less |  |
| Fire Lunge | attack | Blaze | common | 3 | Deal 13 damage. Apply 4 Burn. | Deal 17 damage. Apply 5 Burn. | Costs 1 less |  |
| Inferno Shroud | skill | Blaze | rare | 1 | Deal 7 damage to each enemy with Burn. | Deal 9 damage to each enemy with Burn. | Gains Palm |  |
| Snow Crash | attack | Frost | uncommon | 1 | Deal 5 damage. Apply 1 Chill to ALL enemies. | Deal 7 damage. Apply 2 Chill to ALL enemies. | Gains Palm |  |
| Hail Volley | attack | Frost | rare | 2 | Deal 8 damage to ALL enemies. Bank 1 energy for next turn. | Deal 11 damage to ALL enemies. Bank 1 energy for next turn. | Costs 1 less |  |
| Hail Mantle | skill | Frost | uncommon | 1 | Draw 1 card. Apply 1 Chill to ALL enemies. | Draw 1 card. Apply 2 Chill to ALL enemies. | Gains Palm |  |
| Glacier Aegis | skill | Frost | common | 0 | Deal 3 damage to each enemy with Chill. | Deal 4 damage to each enemy with Chill. | Gains Palm |  |
| Ice Seal | reaction (attack) | Frost | uncommon | 1 | When attacked: gain 5 Guard and deal 3 damage to each enemy with Chill. | When attacked: gain 7 Guard and deal 4 damage to each enemy with Chill. | Gains Opener |  |
| Hail Coil | reaction (skill) | Frost | common | 1 | When an enemy uses a non-attack: gain 4 Guard and apply 3 Chill to it. | When an enemy uses a non-attack: gain 5 Guard and apply 4 Chill to it. | Gains Opener |  |
| Glacier Reply | counter (attack) | Frost | uncommon | 1 | Counter (an attack): gain 4 Guard and deal 3 damage to each enemy with Chill. | Counter (an attack): gain 5 Guard and deal 4 damage to each enemy with Chill. | Gains Opener |  |
| Glacier Cleave | attack | Frost | uncommon | 2 | Deal 10 damage. Next turn, gain 5 Guard. | Deal 13 damage. Next turn, gain 7 Guard. | Costs 1 less |  |
| Winter Blow | attack | Frost | common | 3 | Deal 13 damage. Apply 4 Chill. | Deal 17 damage. Apply 5 Chill. | Costs 1 less |  |
| Ice Gambit | skill | Frost | rare | 1 | Next turn, gain 9 Guard. | Next turn, gain 12 Guard. | Gains Palm |  |
| Vine Slash | attack | Wild | uncommon | 1 | Deal 5 damage. Heal 2 HP. | Deal 7 damage. Heal 3 HP. | Gains Palm |  |
| Leaf Smite | attack | Wild | rare | 2 | Deal 7 damage to ALL enemies. Apply 2 Exposed to ALL enemies. | Deal 9 damage to ALL enemies. Apply 3 Exposed to ALL enemies. | Costs 1 less |  |
| Leaf Sigil | skill | Wild | uncommon | 1 | Draw 1 card. Heal 1 HP. | Draw 1 card. Heal 2 HP. | Gains Palm |  |
| Wildwood Veil | skill | Wild | common | 0 | Next turn, gain 4 Guard. | Next turn, gain 5 Guard. | Gains Palm |  |
| Petal Pit | reaction (attack) | Wild | uncommon | 1 | When attacked: gain 5 Guard and gain 1 Barbs. | When attacked: gain 7 Guard and gain 2 Barbs. | Gains Opener |  |
| Leaf Mirror | reaction (skill) | Wild | common | 1 | When an enemy uses a non-attack: gain 4 Guard and gain 1 Barbs. | When an enemy uses a non-attack: gain 5 Guard and gain 2 Barbs. | Gains Opener |  |
| Wildwood Parry | counter (attack) | Wild | uncommon | 1 | Counter (an attack): gain 4 Guard and gain 1 Barbs. | Counter (an attack): gain 5 Guard and gain 2 Barbs. | Gains Opener |  |
| Leaf Lash | attack | Wild | uncommon | 2 | Deal 10 damage. Gain 2 Barbs. | Deal 13 damage. Gain 3 Barbs. | Costs 1 less |  |
| Vine Trick | skill | Wild | rare | 1 | Bank 1 energy for next turn. Gain 4 Guard. | Bank 1 energy for next turn. Gain 5 Guard. | Gains Palm |  |
| Stormcloud Barrage | attack | Storm | uncommon | 1 | Deal 5 damage. Apply 3 Shock. | Deal 7 damage. Apply 4 Shock. | Gains Palm |  |
| Bolt Slash | attack | Storm | rare | 2 | Deal 7 damage to ALL enemies. Deal 5 damage to each enemy with Shock. | Deal 9 damage to ALL enemies. Deal 7 damage to each enemy with Shock. | Costs 1 less |  |
| Volt Rite | skill | Storm | uncommon | 1 | Draw 1 card. Gain 1 Charge. | Draw 1 card. Gain 2 Charge. | Gains Palm |  |
| Squall Aegis | skill | Storm | common | 0 | Deal 3 damage to each enemy with Shock. | Deal 4 damage to each enemy with Shock. | Gains Palm |  |
| Stormcloud Tripwire | reaction (attack) | Storm | uncommon | 1 | When attacked: gain 5 Guard and deal 3 damage to each enemy with Shock. | When attacked: gain 7 Guard and deal 4 damage to each enemy with Shock. | Gains Opener |  |
| Spark Trap | reaction (attack) | Storm | rare | 0 | When attacked: deal 5 damage to each enemy with Shock. | When attacked: deal 7 damage to each enemy with Shock. | Gains Opener |  |
| Bolt Pit | reaction (skill) | Storm | common | 1 | When an enemy uses a non-attack: gain 4 Guard and deal 3 damage to each enemy with Shock. | When an enemy uses a non-attack: gain 5 Guard and deal 4 damage to each enemy with Shock. | Gains Opener |  |
| Volt Comeback | counter (attack) | Storm | uncommon | 1 | Counter (an attack): gain 4 Guard and gain 2 Charge. | Counter (an attack): gain 5 Guard and gain 3 Charge. | Gains Opener |  |
| Bolt Rend | attack | Storm | uncommon | 2 | Deal 10 damage. Gain 2 Charge. | Deal 13 damage. Gain 3 Charge. | Costs 1 less |  |
| Squall Slash | attack | Storm | common | 3 | Deal 13 damage. Deal 5 damage to each enemy with Shock. | Deal 17 damage. Deal 7 damage to each enemy with Shock. | Costs 1 less |  |
| Volt Focus | skill | Storm | rare | 1 | Gain 4 Charge. | Gain 5 Charge. | Gains Palm |  |
| Wave Strike | attack | Flood | uncommon | 1 | Deal 5 damage. Apply 1 Shaken to ALL enemies. | Deal 7 damage. Apply 2 Shaken to ALL enemies. | Gains Palm |  |
| Torrent Volley | attack | Flood | rare | 2 | Deal 7 damage to ALL enemies. Deal 5 damage to each enemy with Shaken. | Deal 9 damage to ALL enemies. Deal 7 damage to each enemy with Shaken. | Costs 1 less |  |
| River Mantle | skill | Flood | uncommon | 1 | Draw 1 card. Apply 1 Shaken to ALL enemies. | Draw 1 card. Apply 2 Shaken to ALL enemies. | Gains Palm |  |
| Wave Pit | reaction (attack) | Flood | uncommon | 1 | When attacked: gain 5 Guard and deal 3 damage to each enemy with Shaken. | When attacked: gain 7 Guard and deal 4 damage to each enemy with Shaken. | Gains Opener |  |
| Torrent Rune | reaction (skill) | Flood | common | 1 | When an enemy uses a non-attack: gain 4 Guard and deal 3 damage to each enemy with Shaken. | When an enemy uses a non-attack: gain 5 Guard and deal 4 damage to each enemy with Shaken. | Gains Opener |  |
| Torrent Smite | attack | Flood | uncommon | 2 | Deal 8 damage. Draw 1 card. | Deal 11 damage. Draw 1 card. | Costs 1 less |  |
| Monsoon Volley | attack | Flood | common | 3 | Deal 13 damage. Deal 5 damage to each enemy with Shaken. | Deal 17 damage. Deal 7 damage to each enemy with Shaken. | Costs 1 less |  |
| Mountain Burst | attack | Stone | uncommon | 1 | Deal 5 damage. Gain 2 Fortify. | Deal 7 damage. Gain 3 Fortify. | Gains Palm |  |
| Earth Rend | attack | Stone | rare | 2 | Deal 7 damage to ALL enemies. Deal 5 damage to each enemy with Tremor. | Deal 9 damage to ALL enemies. Deal 7 damage to each enemy with Tremor. | Costs 1 less |  |
| Earth Focus | skill | Stone | uncommon | 1 | Draw 1 card. Apply 1 Tremor. | Draw 1 card. Apply 2 Tremor. | Gains Palm |  |
| Pebble Charm | skill | Stone | common | 0 | Deal 3 damage to each enemy with Tremor. | Deal 4 damage to each enemy with Tremor. | Gains Palm |  |
| Cliff Glyph | reaction (attack) | Stone | uncommon | 1 | When attacked: gain 5 Guard and deal 3 damage to each enemy with Tremor. | When attacked: gain 7 Guard and deal 4 damage to each enemy with Tremor. | Gains Opener |  |
| Landslide Coil | reaction (attack) | Stone | rare | 0 | When attacked: gain 5 Fortify. | When attacked: gain 7 Fortify. | Gains Opener |  |
| Cliff Pit | reaction (skill) | Stone | common | 1 | When an enemy uses a non-attack: gain 4 Guard and apply 3 Tremor to it. | When an enemy uses a non-attack: gain 5 Guard and apply 4 Tremor to it. | Gains Opener |  |
| Mountain Volley | attack | Stone | uncommon | 2 | Deal 10 damage. Deal 4 damage to each enemy with Tremor. | Deal 13 damage. Deal 5 damage to each enemy with Tremor. | Costs 1 less |  |
| Pebble Jab | attack | Stone | common | 3 | Deal 13 damage. Apply 4 Tremor. | Deal 17 damage. Apply 5 Tremor. | Costs 1 less |  |
| Earth Stance | skill | Stone | rare | 1 | Deal 7 damage to each enemy with Tremor. | Deal 9 damage to each enemy with Tremor. | Gains Palm |  |
| Light Strike | attack | Radiant | rare | 2 | Deal 7 damage to ALL enemies. Heal 4 HP. | Deal 9 damage to ALL enemies. Heal 5 HP. | Costs 1 less |  |
| Beacon Rune | reaction (attack) | Radiant | uncommon | 1 | When attacked: gain 5 Guard and heal 2 HP. | When attacked: gain 7 Guard and heal 3 HP. | Gains Opener |  |
| Starlight Mirror | reaction (skill) | Radiant | common | 1 | When an enemy uses a non-attack: gain 4 Guard and heal 2 HP. | When an enemy uses a non-attack: gain 5 Guard and heal 3 HP. | Gains Opener |  |
| Sun Reply | counter (attack) | Radiant | uncommon | 1 | Counter (an attack): gain 4 Guard and bank 1 energy for next turn. | Counter (an attack): gain 5 Guard and bank 1 energy for next turn. | Gains Opener |  |
| Beacon Slash | attack | Radiant | uncommon | 2 | Deal 10 damage. Bank 1 energy for next turn. | Deal 13 damage. Bank 1 energy for next turn. | Costs 1 less |  |
| Halo Cut | attack | Radiant | common | 3 | Deal 13 damage. Heal 4 HP. | Deal 17 damage. Heal 5 HP. | Costs 1 less |  |
| Light Veil | skill | Radiant | rare | 1 | Gain 1 Verdict. Gain 5 Guard. | Gain 1 Verdict. Gain 7 Guard. | Gains Palm |  |
| Eclipse Swipe | attack | Umbral | uncommon | 1 | Deal 5 damage. Apply 1 Mark. | Deal 7 damage. Apply 2 Mark. | Gains Palm |  |
| Night Burst | attack | Umbral | rare | 2 | Deal 7 damage to ALL enemies. Gain 6 Guard. | Deal 9 damage to ALL enemies. Gain 8 Guard. | Costs 1 less |  |
| Night Rite | skill | Umbral | uncommon | 1 | Draw 1 card. Apply 3 Doom. | Draw 1 card. Apply 4 Doom. | Gains Palm |  |
| Dark Aegis | skill | Umbral | common | 0 | Deal 3 damage to each enemy with Mark. | Deal 4 damage to each enemy with Mark. | Gains Palm |  |
| Void Snare | reaction (attack) | Umbral | uncommon | 1 | When attacked: gain 5 Guard and deal 3 damage to each enemy with Doom. | When attacked: gain 7 Guard and deal 4 damage to each enemy with Doom. | Gains Opener |  |
| Shade Pit | reaction (attack) | Umbral | rare | 0 | When attacked: apply 2 Mark to the attacker. | When attacked: apply 3 Mark to the attacker. | Gains Opener |  |
| Void Tripwire | reaction (skill) | Umbral | common | 1 | When an enemy uses a non-attack: gain 4 Guard and apply 6 Doom to it. | When an enemy uses a non-attack: gain 5 Guard and apply 8 Doom to it. | Gains Opener |  |
| Shade Rebuff | counter (attack) | Umbral | uncommon | 1 | Counter (an attack): gain 4 Guard and deal 3 damage to each enemy with Doom. | Counter (an attack): gain 5 Guard and deal 4 damage to each enemy with Doom. | Gains Opener |  |
| Dark Lunge | attack | Umbral | uncommon | 2 | Deal 10 damage. Deal 4 damage to each enemy with Doom. | Deal 13 damage. Deal 5 damage to each enemy with Doom. | Costs 1 less |  |
| Shade Lunge | attack | Umbral | common | 3 | Deal 13 damage. Apply 9 Doom. | Deal 17 damage. Apply 12 Doom. | Costs 1 less |  |
| Void Charm | skill | Umbral | rare | 1 | Apply 3 Mark. | Apply 4 Mark. | Gains Palm |  |
| Flicker Lunge | attack | Blaze | uncommon | 2 | Deal 5 damage twice. If this is the first card you played this turn, deal 10 damage to each enemy with Burn. | Deal 7 damage twice. If this is the first card you played this turn, deal 13 damage to each enemy with Burn. | Costs 1 less |  |
| Kindle Mantra | skill | Blaze | uncommon | 1 | Deal 4 damage to each enemy with Burn. If the target has Burn, apply 3 Burn. | Deal 5 damage to each enemy with Burn. If the target has Burn, apply 4 Burn. | Gains Palm |  |
| Hotshot Sunder | attack | Blaze | common | 2 | Deal 9 damage. If you are attuned to the element that beats the target, gain 1 Edge. | Deal 12 damage. If you are attuned to the element that beats the target, gain 1 Edge. | Costs 1 less |  |
| Kindle Gesture | skill | Blaze | rare | 2 | Deal 8 damage to each enemy with Burn. If you are attuned to the element that beats the target, apply 7 Burn. | Deal 11 damage to each enemy with Burn. If you are attuned to the element that beats the target, apply 9 Burn. | Costs 1 less |  |
| Kindle Net | reaction (reaction) | Blaze | common | 1 | When an enemy trap activates: deal 4 damage to its owner. If you are attuned to the element that beats the target, gain 1 Edge. | When an enemy trap activates: deal 5 damage to its owner. If you are attuned to the element that beats the target, gain 1 Edge. | Gains Opener |  |
| Hotshot Stance | skill | Blaze | common | 2 | Gain 7 Guard. If the target has Burn, deal 6 damage to each enemy with Burn. | Gain 9 Guard. If the target has Burn, deal 8 damage to each enemy with Burn. | Costs 1 less |  |
| Spitfire Deflection | counter (skill) | Blaze | uncommon | 1 | Counter (a non-attack): gain 5 Guard. If you are attuned to the element that beats the target, apply 3 Burn to it. | Counter (a non-attack): gain 7 Guard. If you are attuned to the element that beats the target, apply 4 Burn to it. | Gains Opener |  |
| Hotshot Tactic | skill | Blaze | uncommon | 1 | Gain 3 Guard. Deal 2 damage to each enemy with Burn. If you are attuned to the element that beats the target, apply 2 Burn. | Gain 4 Guard. Deal 3 damage to each enemy with Burn. If you are attuned to the element that beats the target, apply 3 Burn. | Gains Palm |  |
| Kindle Rune | reaction (attack) | Blaze | common | 1 | When attacked: gain 5 Guard. If the attacker has Burn, deal 4 damage to each enemy with Burn. | When attacked: gain 7 Guard. If the attacker has Burn, deal 5 damage to each enemy with Burn. | Gains Opener |  |
| Iced Deadfall | reaction (reaction) | Frost | uncommon | 1 | When an enemy trap activates: deal 5 damage to its owner and deal 2 damage to each enemy with Chill. If you have Guard, apply 3 Chill to its owner. | When an enemy trap activates: deal 7 damage to its owner and deal 3 damage to each enemy with Chill. If you have Guard, apply 4 Chill to its owner. | Gains Opener |  |
| Coldsnap Recital | skill | Frost | uncommon | 2 | Gain 8 Guard. If you are attuned to the element that beats the target, deal 8 damage to each enemy with Chill. | Gain 11 Guard. If you are attuned to the element that beats the target, deal 11 damage to each enemy with Chill. | Costs 1 less |  |
| Coldsnap Ambush | reaction (reaction) | Frost | uncommon | 1 | When an enemy trap activates: deal 5 damage to its owner and deal 2 damage to each enemy with Chill. If you are attuned to the element that beats the target, apply 2 Shaken to its owner. | When an enemy trap activates: deal 7 damage to its owner and deal 3 damage to each enemy with Chill. If you are attuned to the element that beats the target, apply 3 Shaken to its owner. | Gains Opener |  |
| Iced Trick | skill | Frost | uncommon | 2 | Apply 6 Chill. If you have Guard, deal 8 damage to each enemy with Chill. | Apply 8 Chill. If you have Guard, deal 11 damage to each enemy with Chill. | Costs 1 less |  |
| Frosty Riposte | counter (reaction) | Frost | uncommon | 0 | Counter (a trap or Reaction): apply 1 Shaken to its owner. If you have Guard, deal 3 damage to each enemy with Chill. | Counter (a trap or Reaction): apply 2 Shaken to its owner. If you have Guard, deal 4 damage to each enemy with Chill. | Gains Opener |  |
| Iced Omen | skill | Frost | uncommon | 2 | Gain 8 Guard. If the target has Chill, apply 3 Shaken. | Gain 11 Guard. If the target has Chill, apply 4 Shaken. | Costs 1 less |  |
| Coldsnap Catch | reaction (reaction) | Frost | uncommon | 1 | When an enemy trap activates: apply 2 Shaken to its owner. If its owner has Chill, deal 5 damage to each enemy with Chill. | When an enemy trap activates: apply 3 Shaken to its owner. If its owner has Chill, deal 7 damage to each enemy with Chill. | Gains Opener |  |
| Chilly Hammer | attack | Frost | common | 0 | Deal 3 damage. If the target has Chill, apply 1 Shaken. | Deal 4 damage. If the target has Chill, apply 2 Shaken. | Gains Palm |  |
| Rambling Catch | reaction (reaction) | Wild | uncommon | 1 | When an enemy trap activates: next turn, gain 6 Guard. If you are attuned to the element that beats the target, gain 2 Barbs. | When an enemy trap activates: next turn, gain 8 Guard. If you are attuned to the element that beats the target, gain 3 Barbs. | Gains Opener |  |
| Rambling Lash | attack | Wild | common | 2 | Deal 4 damage twice. If you are below half HP, next turn, gain 13 Guard. | Deal 5 damage twice. If you are below half HP, next turn, gain 17 Guard. | Costs 1 less |  |
| Wildflower Posture | skill | Wild | common | 1 | Gain 4 Guard. If you are attuned to the element that beats the target, heal 3 HP. | Gain 5 Guard. If you are attuned to the element that beats the target, heal 4 HP. | Gains Palm |  |
| Wildflower Glyph | reaction (attack) | Wild | rare | 1 | When attacked: deal 6 damage to the attacker and heal 2 HP. If you are attuned to the element that beats the target, gain 2 Barbs. | When attacked: deal 8 damage to the attacker and heal 3 HP. If you are attuned to the element that beats the target, gain 3 Barbs. | Gains Opener |  |
| Wildflower Lure | reaction (attack) | Wild | common | 1 | When attacked: deal 6 damage to the attacker. If there are 2+ enemies, heal 4 HP. | When attacked: deal 8 damage to the attacker. If there are 2+ enemies, heal 5 HP. | Gains Opener |  |
| Sprouting Crash | attack | Wild | uncommon | 1 | Deal 2 damage to a random enemy 3 times. If you are below half HP, gain 2 Barbs. | Deal 3 damage to a random enemy 3 times. If you are below half HP, gain 3 Barbs. | Gains Palm |  |
| Rambling Stance | skill | Wild | common | 1 | Gain 4 Guard. If you are attuned to the element that beats the target, gain 1 Barbs. | Gain 5 Guard. If you are attuned to the element that beats the target, gain 2 Barbs. | Gains Palm |  |
| Thundering Tactic | skill | Storm | common | 2 | Gain 7 Guard. If you are attuned to the element that beats the target, deal 7 damage to each enemy with Shock. | Gain 9 Guard. If you are attuned to the element that beats the target, deal 9 damage to each enemy with Shock. | Costs 1 less |  |
| Zappy Tripline | reaction (attack) | Storm | common | 1 | When attacked: gain 5 Guard. If you are attuned to the element that beats the target, apply 5 Shock to the attacker. | When attacked: gain 7 Guard. If you are attuned to the element that beats the target, apply 7 Shock to the attacker. | Gains Opener |  |
| Breezy Denial | counter (reaction) | Storm | rare | 0 | Counter (a trap or Reaction): deal 3 damage to each enemy with Shock. If you are attuned to the element that beats the target, apply 4 Shock to its owner. | Counter (a trap or Reaction): deal 4 damage to each enemy with Shock. If you are attuned to the element that beats the target, apply 5 Shock to its owner. | Gains Opener |  |
| Thundering Recital | skill | Storm | uncommon | 2 | Gain 6 Guard. Deal 3 damage to each enemy with Shock. If you played 2+ other cards this turn, gain 3 Charge. | Gain 8 Guard. Deal 4 damage to each enemy with Shock. If you played 2+ other cards this turn, gain 4 Charge. | Costs 1 less |  |
| Breezy Uppercut | attack | Storm | common | 2 | Deal 4 damage twice. If you are attuned to the element that beats the target, apply 8 Shock. | Deal 5 damage twice. If you are attuned to the element that beats the target, apply 11 Shock. | Costs 1 less |  |
| Breezy Pit | reaction (attack) | Storm | rare | 0 | When attacked: gain 2 Charge. If you are attuned to the element that beats the target, deal 4 damage to each enemy with Shock. | When attacked: gain 3 Charge. If you are attuned to the element that beats the target, deal 5 damage to each enemy with Shock. | Gains Opener |  |
| Fizzing Veil | skill | Storm | common | 2 | Gain 7 Guard. If you played 2+ other cards this turn, gain 4 Charge. | Gain 9 Guard. If you played 2+ other cards this turn, gain 5 Charge. | Costs 1 less |  |
| Zappy Gainsay | counter (reaction) | Storm | rare | 0 | Counter (a trap or Reaction): deal 3 damage to each enemy with Shock. If you are attuned to the element that beats the target, gain 2 Charge. | Counter (a trap or Reaction): deal 4 damage to each enemy with Shock. If you are attuned to the element that beats the target, gain 3 Charge. | Gains Opener |  |
| Fizzing Slash | attack | Storm | uncommon | 2 | Deal 10 damage. If the target has Shock, apply 8 Shock. | Deal 13 damage. If the target has Shock, apply 11 Shock. | Costs 1 less |  |
| Brooking Drill | skill | Flood | rare | 1 | Draw 1 card. If you are attuned to the element that beats the target, deal 4 damage to each enemy with Shaken. | Draw 1 card. If you are attuned to the element that beats the target, deal 5 damage to each enemy with Shaken. | Gains Palm |  |
| Drenching Rebuttal | counter (reaction) | Flood | common | 1 | Counter (a trap or Reaction): gain 4 Guard. If you are attuned to the element that beats the target, apply 2 Shaken to its owner. | Counter (a trap or Reaction): gain 5 Guard. If you are attuned to the element that beats the target, apply 3 Shaken to its owner. | Gains Opener |  |
| Brooking Ambush | reaction (reaction) | Flood | uncommon | 1 | When an enemy trap activates: apply 2 Shaken to its owner. If you are attuned to the element that beats the target, draw 1 card. | When an enemy trap activates: apply 3 Shaken to its owner. If you are attuned to the element that beats the target, draw 1 card. | Gains Opener |  |
| Rainy Ram | attack | Flood | common | 2 | Deal 4 damage twice. If you are attuned to the element that beats the target, apply 3 Shaken. | Deal 5 damage twice. If you are attuned to the element that beats the target, apply 4 Shaken. | Costs 1 less |  |
| Pebbled Volley | attack | Stone | common | 1 | Deal 4 damage. If you are attuned to the element that beats the target, apply 3 Tremor. | Deal 5 damage. If you are attuned to the element that beats the target, apply 4 Tremor. | Gains Palm |  |
| Pebbled Ward | skill | Stone | rare | 2 | Gain 7 Guard. Gain 3 Fortify. If the target has Tremor, deal 6 damage to each enemy with Tremor. | Gain 9 Guard. Gain 4 Fortify. If the target has Tremor, deal 8 damage to each enemy with Tremor. | Costs 1 less |  |
| Rocky Tripline | reaction (attack) | Stone | uncommon | 1 | When attacked: deal 5 damage to the attacker and gain 2 Fortify. If you are attuned to the element that beats the target, apply 3 Tremor to the attacker. | When attacked: deal 7 damage to the attacker and gain 3 Fortify. If you are attuned to the element that beats the target, apply 4 Tremor to the attacker. | Gains Opener |  |
| Rocky Hammer | attack | Stone | uncommon | 2 | Deal 3 damage twice. Apply 3 Tremor. If you are attuned to the element that beats the target, deal 6 damage to each enemy with Tremor. | Deal 4 damage twice. Apply 4 Tremor. If you are attuned to the element that beats the target, deal 8 damage to each enemy with Tremor. | Costs 1 less |  |
| Bouldering Riposte | counter (skill) | Stone | uncommon | 1 | Counter (a non-attack): gain 4 Guard and apply 2 Tremor to it. If you are attuned to the element that beats the target, gain 3 Fortify. | Counter (a non-attack): gain 5 Guard and apply 3 Tremor to it. If you are attuned to the element that beats the target, gain 4 Fortify. | Gains Opener |  |
| Pebbled Stance | skill | Stone | common | 1 | Gain 4 Guard. If you are attuned to the element that beats the target, deal 4 damage to each enemy with Tremor. | Gain 5 Guard. If you are attuned to the element that beats the target, deal 5 damage to each enemy with Tremor. | Gains Palm |  |
| Bouldering Coil | reaction (attack) | Stone | uncommon | 1 | When attacked: deal 7 damage to the attacker. If you have Guard, deal 5 damage to each enemy with Tremor. | When attacked: deal 9 damage to the attacker. If you have Guard, deal 7 damage to each enemy with Tremor. | Gains Opener |  |
| Rocky Parry | counter (reaction) | Stone | uncommon | 0 | Counter (a trap or Reaction): gain 2 Fortify. If you are attuned to the element that beats the target, deal 3 damage to each enemy with Tremor. | Counter (a trap or Reaction): gain 3 Fortify. If you are attuned to the element that beats the target, deal 4 damage to each enemy with Tremor. | Gains Opener |  |
| Rocky Recital | skill | Stone | rare | 1 | Gain 4 Fortify. If the target has Tremor, deal 4 damage to each enemy with Tremor. | Gain 5 Fortify. If the target has Tremor, deal 5 damage to each enemy with Tremor. | Gains Palm |  |
| Pebbled Jaw | reaction (skill) | Stone | uncommon | 1 | When an enemy uses a non-attack: gain 4 Guard and gain 2 Fortify. If you are attuned to the element that beats the target, deal 4 damage to each enemy with Tremor. | When an enemy uses a non-attack: gain 5 Guard and gain 3 Fortify. If you are attuned to the element that beats the target, deal 5 damage to each enemy with Tremor. | Gains Opener |  |
| Golden-Hour Uppercut | attack | Radiant | common | 1 | Deal 6 damage. If you are below half HP, gain 1 Verdict. | Deal 8 damage. If you are below half HP, gain 1 Verdict. | Gains Palm |  |
| Dawnlit Rune | reaction (skill) | Radiant | common | 1 | When an enemy uses a non-attack: gain 5 Guard. If you are below half HP, apply 3 Shaken to it. | When an enemy uses a non-attack: gain 7 Guard. If you are below half HP, apply 4 Shaken to it. | Gains Opener |  |
| Glowing Veto | counter (skill) | Radiant | common | 1 | Counter (a non-attack): gain 4 Guard. If you are attuned to the element that beats the target, heal 3 HP. | Counter (a non-attack): gain 5 Guard. If you are attuned to the element that beats the target, heal 4 HP. | Gains Opener |  |
| Golden-Hour Gesture | skill | Radiant | common | 2 | Gain 7 Guard. If you are below half HP, heal 7 HP. | Gain 9 Guard. If you are below half HP, heal 9 HP. | Costs 1 less |  |
| Glowing Jaw | reaction (skill) | Radiant | common | 1 | When an enemy uses a non-attack: gain 6 Guard. If you are attuned to the element that beats the target, gain 1 Verdict. | When an enemy uses a non-attack: gain 8 Guard. If you are attuned to the element that beats the target, gain 1 Verdict. | Gains Opener |  |
| Dawnlit Rebuff | counter (skill) | Radiant | rare | 1 | Counter (a non-attack): gain 5 Guard and heal 2 HP. If you are attuned to the element that beats the target, gain 1 Verdict. | Counter (a non-attack): gain 7 Guard and heal 3 HP. If you are attuned to the element that beats the target, gain 1 Verdict. | Gains Opener |  |
| Sunny Lunge | attack | Radiant | rare | 1 | Deal 4 damage. Gain 1 Verdict. If you are attuned to the element that beats the target, heal 2 HP. | Deal 5 damage. Gain 1 Verdict. If you are attuned to the element that beats the target, heal 3 HP. | Gains Palm |  |
| Dawnlit Ploy | skill | Radiant | uncommon | 1 | Gain 3 Guard. Apply 1 Shaken. If this is the first card you played this turn, heal 3 HP. | Gain 4 Guard. Apply 2 Shaken. If this is the first card you played this turn, heal 4 HP. | Gains Palm |  |
| Golden-Hour Glyph | reaction (attack) | Radiant | common | 1 | When attacked: gain 6 Guard. If you are attuned to the element that beats the target, gain 1 Verdict. | When attacked: gain 8 Guard. If you are attuned to the element that beats the target, gain 1 Verdict. | Gains Opener |  |
| Glowing Swipe | attack | Radiant | uncommon | 2 | Deal 10 damage. If you are attuned to the element that beats the target, heal 5 HP. | Deal 13 damage. If you are attuned to the element that beats the target, heal 7 HP. | Costs 1 less |  |
| Nighted Gesture | skill | Umbral | uncommon | 1 | Gain 4 Guard. If the target has Mark, apply 6 Doom. | Gain 5 Guard. If the target has Mark, apply 8 Doom. | Gains Palm |  |
| Murky Ambush | reaction (skill) | Umbral | uncommon | 1 | When an enemy uses a non-attack: gain 5 Guard. If it has Doom, apply 2 Mark to it. | When an enemy uses a non-attack: gain 7 Guard. If it has Doom, apply 3 Mark to it. | Gains Opener |  |
| Duskfall Comeback | counter (reaction) | Umbral | uncommon | 0 | Counter (a trap or Reaction): deal 2 damage to each enemy with Mark. If you are attuned to the element that beats the target, apply 5 Doom to its owner. | Counter (a trap or Reaction): deal 3 damage to each enemy with Mark. If you are attuned to the element that beats the target, apply 7 Doom to its owner. | Gains Opener |  |
| Nighted Recital | skill | Umbral | uncommon | 1 | Gain 4 Guard. If the target has Mark, deal 4 damage to each enemy with Mark. | Gain 5 Guard. If the target has Mark, deal 5 damage to each enemy with Mark. | Gains Palm |  |
| Duskfall Deadfall | reaction (attack) | Umbral | common | 1 | When attacked: deal 6 damage to the attacker. If the attacker has Mark, apply 2 Mark to the attacker. | When attacked: deal 8 damage to the attacker. If the attacker has Mark, apply 3 Mark to the attacker. | Gains Opener |  |
| Shadowy Stance | skill | Umbral | rare | 0 | Apply 1 Mark. If you are attuned to the element that beats the target, deal 3 damage to each enemy with Mark. | Apply 2 Mark. If you are attuned to the element that beats the target, deal 4 damage to each enemy with Mark. | Gains Palm |  |
| Murky Deflection | counter (skill) | Umbral | uncommon | 1 | Counter (a non-attack): gain 5 Guard. If you are attuned to the element that beats the target, apply 8 Doom to it. | Counter (a non-attack): gain 7 Guard. If you are attuned to the element that beats the target, apply 11 Doom to it. | Gains Opener |  |
| Murky Sigil | skill | Umbral | uncommon | 0 | Apply 4 Doom. If you are attuned to the element that beats the target, deal 2 damage to each enemy with Mark. | Apply 5 Doom. If you are attuned to the element that beats the target, deal 3 damage to each enemy with Mark. | Gains Palm |  |
| Nighted Lure | reaction (attack) | Umbral | common | 1 | When attacked: deal 6 damage to the attacker. If you are attuned to the element that beats the target, deal 5 damage to each enemy with Mark. | When attacked: deal 8 damage to the attacker. If you are attuned to the element that beats the target, deal 7 damage to each enemy with Mark. | Gains Opener |  |

## Ember cards (154)

| Card | Type | Element | Rarity | Cost | Text | Upgraded (A) | Path B | Unlock |
|---|---|---|---|---|---|---|---|---|
| Spark Lunge | attack ★ | Blaze | starter | 1 | Deal 6 damage. Apply 2 Burn. | Deal 8 damage. Apply 3 Burn. | Gains Palm |  |
| Flame Lash | attack ★ | Blaze | common | 1 | Deal 4 damage twice. | Deal 6 damage twice. | Gains Palm |  |
| Kindling | skill ★ | Blaze | common | 0 | Apply 3 Burn. | Apply 5 Burn. | Gains Palm |  |
| Searing Strike | attack ★ | Blaze | common | 2 | Deal 12 damage. If the target is Burning, deal 6 more. | Deal 15 damage. If the target is Burning, deal 8 more. | Costs 1 less |  |
| Reckless Swing | attack ★ | Blaze | common | 0 | Deal 6 damage. Lose 2 HP. | Deal 9 damage. Lose 2 HP. | Gains Palm |  |
| Blaze Ward | reaction (attack) ★ | Blaze | common | 1 | When attacked: deal 6 damage to the attacker and apply 2 Burn. | When attacked: deal 9 damage to the attacker and apply 3 Burn. | Gains Opener |  |
| Cinder Trap | reaction (skill) ★ | Blaze | common | 0 | When an enemy uses a non-attack: apply 4 Burn to it. | When an enemy uses a non-attack: apply 6 Burn to it. | Gains Opener |  |
| Fury Chain | attack ★ | Blaze | uncommon | 1 | Deal 8 damage. Chain 2: gain 2 Edge. | Deal 11 damage. Chain 2: gain 3 Edge. | Gains Palm |  |
| Wildfire | attack ★ | Blaze | uncommon | 2 | Deal 8 damage and apply 2 Burn to ALL enemies. | Deal 11 damage and apply 3 Burn to ALL enemies. | Costs 1 less |  |
| Stoke | skill ★ | Blaze | uncommon | 1→0 | Double the target's Burn. | Double the target's Burn. | Gains Palm |  |
| Hot Blood | power ★ | Blaze | uncommon | 2→1 | At the start of your turn, gain 1 Edge and lose 1 HP. | At the start of your turn, gain 1 Edge and lose 1 HP. | Gains Opener |  |
| Ignite | attack ★ | Blaze | rare | 1 | Deal damage equal to 3× the target's Burn. Fold. | Deal damage equal to 4× the target's Burn. Fold. | No longer Folds |  |
| Ember Crown | power ★ | Blaze | rare | 2→1 | Whenever you apply Burn, apply 2 more. | Whenever you apply Burn, apply 2 more. | Gains Opener | L4 |
| Bonfire | skill ★ | Blaze | rare | 2 | Gain 2 Edge. Apply 3 Burn to ALL enemies. Fold. | Gain 3 Edge. Apply 4 Burn to ALL enemies. Fold. | No longer Folds |  |
| Phoenix Rite | power ★ | Blaze | legendary | 2→1 | At the start of your turn, apply 3 Burn to ALL enemies. | At the start of your turn, apply 3 Burn to ALL enemies. | Gains Opener |  |
| Inferno Duel | attack ★ | Blaze | legendary | 2 | Deal 5 damage 3 times. Chain 2: apply 2 Burn per hit. | Deal 7 damage 3 times. Chain 2: apply 3 Burn per hit. | Costs 1 less |  |
| Flashpoint | skill ★ | Blaze | uncommon | 1 | Apply 5 Burn. Chain 2: apply it to ALL enemies instead. | Apply 7 Burn. Chain 2: apply it to ALL enemies instead. | Gains Palm |  |
| Cinder Cloak | reaction (attack) ★ | Blaze | common | 1 | When attacked: gain 5 Guard and apply 3 Burn to the attacker. | When attacked: gain 8 Guard and apply 4 Burn to the attacker. | Gains Opener |  |
| Smoulder | skill ★ | Blaze | common | 1 | Palm. Apply 4 Burn. Gain 4 Guard. | Palm. Apply 6 Burn. Gain 5 Guard. | Gains Opener |  |
| Pyroclasm | attack ★ | Blaze | rare | 2 | Each enemy takes damage equal to 2× its Burn. Fold. | Each enemy takes damage equal to 3× its Burn. Fold. | No longer Folds |  |
| Banked Embers | reaction (attack) ★ | Blaze | common | 1 | Prime. When attacked: apply 2 Burn to the attacker, +2 per Prime. | Prime. When attacked: apply 3 Burn to the attacker, +3 per Prime. | Gains Opener |  |
| Fusion Blast | attack ★ | Blaze | uncommon | 2 | Deal 7 damage to ALL enemies. Converge 3: apply 3 Burn to ALL enemies. | Deal 10 damage to ALL enemies. Converge 3: apply 4 Burn to ALL enemies. | Costs 1 less |  |
| Flashfire | counter (reaction) ★ | Blaze | common | 0 | Counter (a trap or Reaction): deal 5 damage to its owner and apply 2 Burn. | Counter (a trap or Reaction): deal 8 damage to its owner and apply 3 Burn. | Gains Opener |  |
| Backdraft | counter (attack) ★ | Blaze | common | 1 | Counter (an attack): apply 4 Burn and 1 Shaken to the attacker before it hits. | Counter (an attack): apply 6 Burn and 2 Shaken to the attacker before it hits. | Gains Opener |  |
| Smoke Screen | counter (reaction) ★ | Blaze | uncommon | 1 | Counter (a trap or Reaction): Negate it. Lose 3 HP. | Counter (a trap or Reaction): Negate it. Lose 1 HP. | Gains Opener |  |
| Charred Heart | power | Blaze | uncommon | 2 | At the end of your turn, deal 3 damage to each enemy with Burn. | At the end of your turn, deal 4 damage to each enemy with Burn. | Costs 1 less |  |
| Molten Oath | power | Blaze | rare | 2 | At the start of your turn, gain 4 Guard for each enemy with Burn. | At the start of your turn, gain 5 Guard for each enemy with Burn. | Costs 1 less |  |
| Furnace Barrage | attack | Blaze | common | 3 | Deal 13 damage. Gain 6 Guard. | Deal 17 damage. Gain 8 Guard. | Costs 1 less |  |
| Charred Ploy | skill | Blaze | common | 0 | Apply 1 Burn to ALL enemies. | Apply 2 Burn to ALL enemies. | Gains Palm |  |
| Cinder Rebuke | counter (attack) | Blaze | common | 0 | Counter (an attack): apply 2 Burn to ALL enemies. | Counter (an attack): apply 3 Burn to ALL enemies. | Gains Opener |  |
| Ashen Rend | attack | Blaze | uncommon | 1 | Deal 2 damage to a random enemy 3 times. Apply 1 Burn. | Deal 3 damage to a random enemy 3 times. Apply 2 Burn. | Gains Palm |  |
| Cinder Ward | skill | Blaze | common | 1 | Apply 2 Burn to ALL enemies. | Apply 3 Burn to ALL enemies. | Gains Palm |  |
| Smouldering Trap | reaction (attack) | Blaze | uncommon | 1 | When attacked: gain 5 Guard and apply 2 Burn to ALL enemies. | When attacked: gain 7 Guard and apply 3 Burn to ALL enemies. | Gains Opener |  |
| Molten Strike | attack | Blaze | rare | 2 | Deal 5 damage. Apply 1 Burn. Gain 1 Edge. | Deal 7 damage. Apply 2 Burn. Gain 1 Edge. | Costs 1 less |  |
| Scorching Ambush | reaction (skill) | Blaze | common | 1 | When an enemy uses a non-attack: gain 4 Guard and apply 2 Burn to ALL enemies. | When an enemy uses a non-attack: gain 5 Guard and apply 3 Burn to ALL enemies. | Gains Opener |  |
| Smouldering Gambit | skill | Blaze | common | 0 | Deal 3 damage to each enemy with Burn. | Deal 4 damage to each enemy with Burn. | Gains Palm |  |
| Searing Swipe | attack | Blaze | common | 2 | Deal 5 damage to ALL enemies. Apply 2 Burn to ALL enemies. | Deal 7 damage to ALL enemies. Apply 3 Burn to ALL enemies. | Costs 1 less |  |
| Pyre Burst | attack | Blaze | rare | 3 | Deal 11 damage. Apply 3 Burn. Gain 1 Edge. | Deal 15 damage. Apply 4 Burn. Gain 1 Edge. | Costs 1 less |  |
| Blazing Gambit | skill | Blaze | uncommon | 1 | Draw 1 card. Apply 1 Burn. | Draw 1 card. Apply 2 Burn. | Gains Palm |  |
| Blazing Smite | attack | Blaze | common | 1 | Deal 4 damage. Apply 1 Burn to ALL enemies. | Deal 5 damage. Apply 2 Burn to ALL enemies. | Gains Palm |  |
| Kindled Ambush | reaction (attack) | Blaze | common | 0 | When attacked: apply 3 Burn to the attacker. | When attacked: apply 4 Burn to the attacker. | Gains Opener |  |
| Wildfire Cut | attack | Blaze | rare | 2 | Deal 3 damage twice. Apply 1 Burn. Gain 1 Edge. | Deal 4 damage twice. Apply 2 Burn. Gain 1 Edge. | Costs 1 less |  |
| Scorching Charm | skill | Blaze | common | 1 | Gain 6 Guard. | Gain 8 Guard. | Gains Palm |  |
| Ashen Charm | skill | Blaze | common | 1 | Apply 4 Burn. | Apply 5 Burn. | Gains Palm |  |
| Sunfire Comeback | counter (attack) | Blaze | common | 0 | Counter (an attack): apply 2 Burn to the attacker. | Counter (an attack): apply 3 Burn to the attacker. | Gains Opener |  |
| Furnace Trick | skill | Blaze | rare | 2 | Gain 4 Guard. Apply 1 Burn to ALL enemies. Gain 1 Edge. | Gain 5 Guard. Apply 2 Burn to ALL enemies. Gain 1 Edge. | Costs 1 less |  |
| Smouldering Rend | attack | Blaze | common | 1 | Deal 2 damage to a random enemy 3 times. Apply 1 Burn to ALL enemies. | Deal 3 damage to a random enemy 3 times. Apply 2 Burn to ALL enemies. | Gains Palm |  |
| Smouldering Rebuff | counter (attack) | Blaze | common | 1 | Counter (an attack): gain 4 Guard and apply 2 Burn to the attacker. | Counter (an attack): gain 5 Guard and apply 3 Burn to the attacker. | Gains Opener |  |
| Ember Ambush | reaction (skill) | Blaze | uncommon | 1 | When an enemy uses a non-attack: gain 4 Guard and apply 3 Burn to it. | When an enemy uses a non-attack: gain 5 Guard and apply 4 Burn to it. | Gains Opener |  |
| Charred Blow | attack | Blaze | rare | 3 | Deal 11 damage. Apply 2 Burn to ALL enemies. Gain 1 Edge. | Deal 15 damage. Apply 3 Burn to ALL enemies. Gain 1 Edge. | Costs 1 less |  |
| Bramblefire | attack ⧉ (thorn) | Blaze | uncommon | 1 | Deal 4 damage. Apply 1 Burn. If you have Barbs, deal 3 damage to each enemy with Burn. | Deal 5 damage. Apply 2 Burn. If you have Barbs, deal 4 damage to each enemy with Burn. | Gains Palm |  |
| Smoulder Hedge | reaction (attack) ⧉ (thorn) | Blaze | uncommon | 1 | When attacked: gain 2 Barbs and apply 2 Burn to the attacker. | When attacked: gain 3 Barbs and apply 3 Burn to the attacker. | Gains Opener |  |
| Ash Bloom | skill ⧉ (thorn) | Blaze | rare | 1 | Next turn, gain 4 Guard. Apply 1 Burn to ALL enemies. If you are below half HP, heal 3 HP. | Next turn, gain 5 Guard. Apply 2 Burn to ALL enemies. If you are below half HP, heal 4 HP. | Gains Palm |  |
| Cinder Hex | attack ⧉ (void) | Blaze | uncommon | 1 | Deal 4 damage. Apply 1 Burn. If the target has Doom, apply 5 Doom. | Deal 5 damage. Apply 2 Burn. If the target has Doom, apply 7 Doom. | Gains Palm |  |
| Pyre of Endings | reaction (skill) ⧉ (void) | Blaze | uncommon | 1 | When an enemy uses a non-attack: apply 8 Doom to it and apply 2 Burn to it. | When an enemy uses a non-attack: apply 11 Doom to it and apply 3 Burn to it. | Gains Opener |  |
| Ashen Omen | skill ⧉ (void) | Blaze | rare | 2→1 | Double the target's Burn. Double the target's Doom. Fold. | Double the target's Burn. Double the target's Doom. Fold. | No longer Folds |  |
| Hot Streak | attack ⧉ (gilt) | Blaze | uncommon | 1 | Deal 4 damage. ☀ Apply 2 Burn. ☾ Raise your Ante by 3. Flip your Fate Coin. | Deal 5 damage. ☀ Apply 3 Burn. ☾ Raise your Ante by 4. Flip your Fate Coin. | Gains Palm |  |
| Molten Ante | counter (attack) ⧉ (gilt) | Blaze | uncommon | 1 | Counter (an attack): gain 5 Guard. If your Ante is 3+, apply 3 Burn to the attacker. | Counter (an attack): gain 7 Guard. If your Ante is 3+, apply 4 Burn to the attacker. | Gains Opener |  |
| Burning Bet | skill ⧉ (gilt) | Blaze | uncommon | 0 | Lose 3 HP. Raise your Ante by 6. | Lose 3 HP. Raise your Ante by 8. | Gains Palm |  |
| Shard Flare | attack ⧉ (glass) | Blaze | uncommon | 0 | Deal 3 damage. If you hold a Glint, apply 2 Burn. | Deal 4 damage. If you hold a Glint, apply 3 Burn. | Gains Palm |  |
| Glassblower | skill ⧉ (glass) | Blaze | rare | 1 | Add a Glint to your hand. Apply 2 Burn to ALL enemies. | Add a Glint to your hand. Apply 3 Burn to ALL enemies. | Gains Palm |  |
| Stolen Spark | reaction (reaction) ⧉ (glass) | Blaze | uncommon | 1 | When an enemy trap activates: deal 7 damage to its owner. If you have a stolen trap set, apply 4 Burn to ALL enemies. | When an enemy trap activates: deal 9 damage to its owner. If you have a stolen trap set, apply 5 Burn to ALL enemies. | Gains Opener |  |
| Funeral Pyre | attack ⧉ (grave) | Blaze | uncommon | 2 | Deal 6 damage to ALL enemies. If your Crypt holds 3+ cards, apply 4 Burn to ALL enemies. | Deal 8 damage to ALL enemies. If your Crypt holds 3+ cards, apply 5 Burn to ALL enemies. | Costs 1 less |  |
| Cremation | skill ⧉ (grave) | Blaze | uncommon | 1 | Bury 2. Deal 3 damage to each enemy with Burn. | Bury 2. Deal 4 damage to each enemy with Burn. | Gains Palm |  |
| Ember Wake | reaction (skill) ⧉ (grave) | Blaze | rare | 1 | When an enemy uses a non-attack: Exhume 1 and apply 3 Burn to it. | When an enemy uses a non-attack: Exhume 1 and apply 4 Burn to it. | Gains Opener |  |
| Trial by Fire | attack ⧉ (dawn) | Blaze | uncommon | 1 | Deal 4 damage. Apply 1 Burn. If you have Verdict, deal 2 damage to each enemy with Burn. | Deal 5 damage. Apply 2 Burn. If you have Verdict, deal 3 damage to each enemy with Burn. | Gains Palm |  |
| Purifying Flame | skill ⧉ (dawn) | Blaze | uncommon | 1 | Heal 2 HP. Apply 1 Burn to ALL enemies. | Heal 3 HP. Apply 2 Burn to ALL enemies. | Gains Palm |  |
| Searing Verdict | counter (reaction) ⧉ (dawn) | Blaze | rare | 1→0 | Counter (a trap or Reaction): Negate it. If its owner has Burn, gain 2 Verdict. | Counter (a trap or Reaction): Negate it. If its owner has Burn, gain 2 Verdict. | Gains Opener |  |
| Firestorm | attack ⧉ (storm) | Blaze | uncommon | 2 | Deal 4 damage to ALL enemies. Apply 2 Shock to ALL enemies. If the target has Burn, apply 2 Burn to ALL enemies. | Deal 5 damage to ALL enemies. Apply 3 Shock to ALL enemies. If the target has Burn, apply 3 Burn to ALL enemies. | Costs 1 less |  |
| Plasma Lash | attack ⧉ (storm) | Blaze | rare | 1 | Deal 3 damage. Apply 1 Burn. If you have Charge, double the target's Burn. | Deal 4 damage. Apply 2 Burn. If you have Charge, double the target's Burn. | Gains Palm |  |
| Arc Kiln | reaction (attack) ⧉ (storm) | Blaze | uncommon | 1 | When attacked: apply 5 Shock to the attacker and apply 2 Burn to the attacker. | When attacked: apply 7 Shock to the attacker and apply 3 Burn to the attacker. | Gains Opener |  |
| Steamburst | attack ⧉ (rime) | Blaze | uncommon | 1 | Deal 4 damage. If the target has Chill, apply 2 Burn. If the target has Burn, apply 2 Chill. | Deal 5 damage. If the target has Chill, apply 3 Burn. If the target has Burn, apply 3 Chill. | Gains Palm |  |
| Thermal Shock | attack ⧉ (rime) | Blaze | rare | 2 | Deal 10 damage. Apply 4 Chill. If the target is Frozen, double the target's Burn. | Deal 13 damage. Apply 5 Chill. If the target is Frozen, double the target's Burn. | Costs 1 less |  |
| Fog of Embers | reaction (attack) ⧉ (rime) | Blaze | uncommon | 1 | When attacked: gain 4 Guard, apply 2 Chill to the attacker and apply 1 Burn to the attacker. | When attacked: gain 5 Guard, apply 3 Chill to the attacker and apply 2 Burn to the attacker. | Gains Opener |  |
| Hellhound | skill ⧉ (beast) | Blaze | uncommon | 1 | Summon Wolf 1. Apply 2 Burn. | Summon Wolf 2. Apply 3 Burn. | Gains Palm |  |
| Fire Hawk | skill ⧉ (beast) | Blaze | rare | 2 | Summon Hawk 2. Apply 2 Burn to ALL enemies. | Summon Hawk 3. Apply 3 Burn to ALL enemies. | Costs 1 less |  |
| Scorched Pack | attack ⧉ (beast) | Blaze | uncommon | 1 | Deal 5 damage. If you have a companion, apply 2 Burn. | Deal 7 damage. If you have a companion, apply 3 Burn. | Gains Palm |  |
| Magma Fist | attack ⧉ (stone) | Blaze | uncommon | 2 | Deal 7 damage. Apply 3 Tremor. If the target has Burn, double the target's Tremor. | Deal 9 damage. Apply 4 Tremor. If the target has Burn, double the target's Tremor. | Costs 1 less |  |
| Lava Wall | skill ⧉ (stone) | Blaze | uncommon | 1 | Gain 3 Guard. Gain 1 Fortify. If the target has Tremor, apply 2 Burn. | Gain 4 Guard. Gain 2 Fortify. If the target has Tremor, apply 3 Burn. | Gains Palm |  |
| Obsidian Kiln | reaction (attack) ⧉ (stone) | Blaze | uncommon | 1 | When attacked: gain 5 Guard. If you have Fortify, apply 3 Burn to the attacker. | When attacked: gain 7 Guard. If you have Fortify, apply 4 Burn to the attacker. | Gains Opener |  |
| Phlogiston | attack ⧉ (aether) | Blaze | uncommon | 1 | Deal 4 damage. Apply 1 Exposed. If the target has Burn, apply 2 Burn. | Deal 5 damage. Apply 2 Exposed. If the target has Burn, apply 3 Burn. | Gains Palm |  |
| Calcinate | skill ⧉ (aether) | Blaze | uncommon | 1 | Attune to the element that beats the target. Apply 3 Burn. | Attune to the element that beats the target. Apply 4 Burn. | Gains Palm |  |
| Volatile Flask | attack ⧉ (aether) | Blaze | rare | 0 | Deal 3 damage. If you are attuned to the element that beats the target, apply 2 Burn. | Deal 4 damage. If you are attuned to the element that beats the target, apply 3 Burn. | Gains Palm |  |
| Cinder Smoke | skill ⧉ (dusk) | Blaze | uncommon | 2 | Gain 1 Veil. Apply 3 Burn to ALL enemies. | Gain 1 Veil. Apply 4 Burn to ALL enemies. | Costs 1 less |  |
| Kindled Shadow | counter (attack) ⧉ (dusk) | Blaze | rare | 1 | Counter (an attack): gain 1 Veil and apply 2 Burn to the attacker. | Counter (an attack): gain 1 Veil and apply 3 Burn to the attacker. | Gains Opener |  |
| Flame Knight | attack 🦋 | Blaze | evolved | 1 | Deal 5 damage. Apply 1 Burn. Deal 2 damage to each enemy with Burn. | Deal 7 damage. Apply 2 Burn. Deal 3 damage to each enemy with Burn. | Gains Palm |  |
| Spark Squire | attack 🦋 | Blaze | common | 1 | Deal 4 damage. Apply 1 Burn. Evolve 4 (Flame Knight). | Deal 5 damage. Apply 2 Burn. Evolve 4 (Flame Knight). | Gains Palm |  |
| Bonfire Heart | skill 🦋 | Blaze | evolved | 0 | Apply 1 Burn to ALL enemies. If you have Edge, gain 1 energy. | Apply 2 Burn to ALL enemies. If you have Edge, gain 1 energy. | Gains Palm |  |
| Tinder Sprite | skill 🦋 | Blaze | common | 0 | Apply 2 Burn. Evolve 3 (Bonfire Heart). | Apply 3 Burn. Evolve 3 (Bonfire Heart). | Gains Palm |  |
| Cinder Drake | reaction (attack) 🦋 | Blaze | evolved | 1 | When attacked: gain 5 Guard and apply 1 Burn to ALL enemies. If you are below half HP, gain 1 Edge. | When attacked: gain 7 Guard and apply 2 Burn to ALL enemies. If you are below half HP, gain 1 Edge. | Gains Opener |  |
| Ember Pup | reaction (attack) 🦋 | Blaze | common | 1 | When attacked: gain 5 Guard and apply 2 Burn to the attacker. Evolve 4 (Cinder Drake). | When attacked: gain 7 Guard and apply 3 Burn to the attacker. Evolve 4 (Cinder Drake). | Gains Opener |  |
| Pyromancer | attack 🦋 | Blaze | evolved | 2 | Deal 5 damage twice. Apply 3 Burn. If this is the first card you played this turn, double the target's Burn. | Deal 7 damage twice. Apply 4 Burn. If this is the first card you played this turn, double the target's Burn. | Costs 1 less |  |
| Fire Apprentice | attack 🦋 | Blaze | uncommon | 2 | Deal 5 damage twice. If this is the first card you played this turn, apply 7 Burn. Evolve 5 (Pyromancer). | Deal 7 damage twice. If this is the first card you played this turn, apply 9 Burn. Evolve 5 (Pyromancer). | Costs 1 less |  |
| Beacon of Ash | skill 🦋 | Blaze | evolved | 1 | Gain 4 Guard. Apply 1 Burn to ALL enemies. If this is the first card you played this turn, draw 1 card. | Gain 5 Guard. Apply 2 Burn to ALL enemies. If this is the first card you played this turn, draw 1 card. | Gains Palm |  |
| Torchbearer | skill 🦋 | Blaze | common | 1 | Gain 4 Guard. Apply 1 Burn. Evolve 4 (Beacon of Ash). | Gain 5 Guard. Apply 2 Burn. Evolve 4 (Beacon of Ash). | Gains Palm |  |
| Kiln Heart | power ★ | Blaze | uncommon | 1 | At the start of your turn, if you have Edge, apply 4 Burn to ALL enemies. | At the start of your turn, if you have Edge, apply 5 Burn to ALL enemies. | Gains Opener |  |
| Pyre Engine | power ★ | Blaze | rare | 2 | Whenever a chain of 2+ links resolves, apply 3 Burn to ALL enemies. | Whenever a chain of 2+ links resolves, apply 4 Burn to ALL enemies. | Costs 1 less |  |
| Ashen Throne | power ★ | Blaze | uncommon | 2 | At the end of your turn, if you are below half HP, deal 17 damage to ALL enemies. | At the end of your turn, if you are below half HP, deal 18 damage to ALL enemies. | Costs 1 less |  |
| Flame Pact | power ★ | Blaze | rare | 1 | Whenever one of your Reactions fires, apply 2 Burn to a random enemy. | Whenever one of your Reactions fires, apply 3 Burn to a random enemy. | Gains Opener |  |
| Ignited Ram | attack | Blaze | uncommon | 3 | Deal 23 damage. Lose 3 HP. If the target has Burn, gain 1 energy. | Deal 31 damage. Lose 3 HP. If the target has Burn, gain 1 energy. | Costs 1 less |  |
| Phoenix Gesture | skill | Blaze | uncommon | 2 | Gain 6 Guard. Apply 1 Burn to ALL enemies. If you have Edge, deal 6 damage to each enemy with Burn. | Gain 8 Guard. Apply 2 Burn to ALL enemies. If you have Edge, deal 8 damage to each enemy with Burn. | Costs 1 less |  |
| Ignited Gainsay | counter (attack) | Blaze | uncommon | 0 | Counter (an attack): apply 1 Exposed to the attacker. If you have Edge, apply 2 Burn to the attacker. | Counter (an attack): apply 2 Exposed to the attacker. If you have Edge, apply 3 Burn to the attacker. | Gains Opener |  |
| Phoenix Snare | reaction (skill) | Blaze | uncommon | 1 | When an enemy uses a non-attack: gain 8 Guard and lose 3 HP. If it has Burn, double its Burn. | When an enemy uses a non-attack: gain 11 Guard and lose 3 HP. If it has Burn, double its Burn. | Gains Opener |  |
| Tinder Net | reaction (reaction) | Blaze | rare | 1 | When an enemy trap activates: deal 6 damage to its owner and apply 1 Burn to ALL enemies. If you are below half HP, apply 3 Exposed to its owner. | When an enemy trap activates: deal 8 damage to its owner and apply 2 Burn to ALL enemies. If you are below half HP, apply 4 Exposed to its owner. | Gains Opener |  |
| Lava Parry | counter (reaction) | Blaze | uncommon | 1 | Counter (a trap or Reaction): gain 5 Guard. If you have Edge, deal 5 damage to each enemy with Burn. | Counter (a trap or Reaction): gain 7 Guard. If you have Edge, deal 7 damage to each enemy with Burn. | Gains Opener |  |
| Sulphur Gesture | skill | Blaze | uncommon | 2 | Gain 3 Guard. Gain 1 Edge. If the target has Burn, apply 2 Burn. | Gain 4 Guard. Gain 1 Edge. If the target has Burn, apply 3 Burn. | Costs 1 less |  |
| Brimstone Seal | reaction (skill) | Blaze | uncommon | 1 | When an enemy uses a non-attack: gain 4 Guard and apply 1 Burn to ALL enemies. If it is below half HP, deal 5 damage to each enemy with Burn. | When an enemy uses a non-attack: gain 5 Guard and apply 2 Burn to ALL enemies. If it is below half HP, deal 7 damage to each enemy with Burn. | Gains Opener |  |
| Coal Gainsay | counter (skill) | Blaze | uncommon | 1 | Counter (a non-attack): gain 4 Guard. If it has Burn, double its Burn. | Counter (a non-attack): gain 5 Guard. If it has Burn, double its Burn. | Gains Opener |  |
| Phoenix Ward | skill | Blaze | rare | 0 | Apply 2 Burn. If you have Edge, deal 3 damage to each enemy with Burn. | Apply 3 Burn. If you have Edge, deal 4 damage to each enemy with Burn. | Gains Palm |  |
| Firebrand Gambit | skill | Blaze | rare | 2 | Apply 5 Burn to ALL enemies. If you are below half HP, gain 1 energy. | Apply 7 Burn to ALL enemies. If you are below half HP, gain 1 energy. | Costs 1 less |  |
| Brimstone Ward | skill | Blaze | uncommon | 2 | Gain 1 energy. If the target has Burn, apply 7 Burn. | Gain 1 energy. If the target has Burn, apply 9 Burn. | Costs 1 less |  |
| Blistering Comeback | counter (attack) | Blaze | rare | 0 | Counter (an attack): apply 1 Burn to ALL enemies. If you have Edge, gain 1 Edge. | Counter (an attack): apply 2 Burn to ALL enemies. If you have Edge, gain 1 Edge. | Gains Opener |  |
| Flashpoint Swipe | attack | Blaze | uncommon | 0 | Deal 4 damage. Lose 3 HP. If the target has Burn, double the target's Burn. | Deal 5 damage. Lose 3 HP. If the target has Burn, double the target's Burn. | Gains Palm |  |
| Pyroclast Deflection | counter (attack) | Blaze | rare | 1 | Counter (an attack): gain 4 Guard and apply 2 Burn to the attacker. If you have Edge, apply 2 Exposed to the attacker. | Counter (an attack): gain 5 Guard and apply 3 Burn to the attacker. If you have Edge, apply 3 Exposed to the attacker. | Gains Opener |  |
| Sulphur Volley | attack | Blaze | rare | 2 | Deal 20 damage. Lose 3 HP. If you are below half HP, gain 1 energy. | Deal 27 damage. Lose 3 HP. If you are below half HP, gain 1 energy. | Costs 1 less |  |
| Flashpoint Jaw | reaction (attack) | Blaze | common | 1 | When attacked: gain 5 Guard. If the attacker is below half HP, double the attacker's Burn. | When attacked: gain 7 Guard. If the attacker is below half HP, double the attacker's Burn. | Gains Opener |  |
| Bonfire Gesture | skill | Blaze | uncommon | 0 | Apply 1 Exposed. If you are below half HP, double the target's Burn. | Apply 2 Exposed. If you are below half HP, double the target's Burn. | Gains Palm |  |
| Ignited Bait | reaction (reaction) | Blaze | uncommon | 1 | When an enemy trap activates: deal 5 damage to its owner. If its owner has Burn, gain 1 Edge. | When an enemy trap activates: deal 7 damage to its owner. If its owner has Burn, gain 1 Edge. | Gains Opener |  |
| Flashpoint Deflection | counter (skill) | Blaze | common | 1 | Counter (a non-attack): gain 4 Guard. If it is below half HP, deal 5 damage to each enemy with Burn. | Counter (a non-attack): gain 5 Guard. If it is below half HP, deal 7 damage to each enemy with Burn. | Gains Opener |  |
| Phoenix Tripwire | reaction (attack) | Blaze | rare | 1 | When attacked: gain 5 Guard and deal 3 damage to each enemy with Burn. If you have Edge, apply 4 Burn to the attacker. | When attacked: gain 7 Guard and deal 4 damage to each enemy with Burn. If you have Edge, apply 5 Burn to the attacker. | Gains Opener |  |
| Lava Charm | skill | Blaze | rare | 1 | Apply 2 Exposed. If you played 2+ other cards this turn, double the target's Burn. | Apply 3 Exposed. If you played 2+ other cards this turn, double the target's Burn. | Gains Palm |  |
| Flashpoint Rend | attack | Blaze | common | 3 | Deal 12 damage. Double the target's Burn. | Deal 16 damage. Double the target's Burn. | Costs 1 less |  |
| Coal Canticle | skill | Blaze | common | 2 | Gain 7 Guard. If you are below half HP, deal 10 damage to each enemy with Burn. | Gain 9 Guard. If you are below half HP, deal 13 damage to each enemy with Burn. | Costs 1 less |  |
| Firebrand Retort | counter (any) | Blaze | uncommon | 2 | Counter (anything an enemy does): deal 10 damage to each enemy with Burn. If its owner is below half HP, gain 1 Edge. | Counter (anything an enemy does): deal 13 damage to each enemy with Burn. If its owner is below half HP, gain 1 Edge. | Costs 1 less |  |
| Brimstone Mirror | reaction (skill) | Blaze | rare | 0 | When an enemy uses a non-attack: deal 3 damage to each enemy with Burn. If it has Burn, apply 2 Burn to ALL enemies. | When an enemy uses a non-attack: deal 4 damage to each enemy with Burn. If it has Burn, apply 3 Burn to ALL enemies. | Gains Opener |  |
| Coal Stance | skill | Blaze | rare | 2 | Gain 1 Edge. If the target has Burn, apply 5 Burn to ALL enemies. | Gain 1 Edge. If the target has Burn, apply 7 Burn to ALL enemies. | Costs 1 less |  |
| Bonfire Flourish | attack | Blaze | common | 1 | Deal 4 damage. If this is the first card you played this turn, deal 5 damage to each enemy with Burn. | Deal 5 damage. If this is the first card you played this turn, deal 7 damage to each enemy with Burn. | Gains Palm |  |
| Pyroclast Focus | skill | Blaze | common | 2 | Gain 7 Guard. If you are below half HP, apply 5 Burn to ALL enemies. | Gain 9 Guard. If you are below half HP, apply 7 Burn to ALL enemies. | Costs 1 less |  |
| Coal Swipe | attack | Blaze | rare | 2 | Deal 7 damage. Gain 1 energy. If you are below half HP, apply 4 Burn to ALL enemies. | Deal 9 damage. Gain 1 energy. If you are below half HP, apply 5 Burn to ALL enemies. | Costs 1 less |  |
| Hearth Veto | counter (skill) | Blaze | uncommon | 1 | Counter (a non-attack): gain 4 Guard and deal 2 damage to each enemy with Burn. If it has Burn, apply 2 Burn to it. | Counter (a non-attack): gain 5 Guard and deal 3 damage to each enemy with Burn. If it has Burn, apply 3 Burn to it. | Gains Opener |  |
| Blistering Gash | attack | Blaze | uncommon | 2 | Deal 7 damage. Apply 1 Exposed. If you played 2+ other cards this turn, apply 4 Burn. | Deal 9 damage. Apply 2 Exposed. If you played 2+ other cards this turn, apply 5 Burn. | Costs 1 less |  |
| Hearth Mirror | reaction (reaction) | Blaze | uncommon | 1 | When an enemy trap activates: deal 4 damage to each enemy with Burn. If its owner has Burn, double its Burn. | When an enemy trap activates: deal 5 damage to each enemy with Burn. If its owner has Burn, double its Burn. | Gains Opener |  |
| Ignited Ward | skill | Blaze | rare | 1 | Gain 7 Guard. Lose 3 HP. If this is the first card you played this turn, deal 9 damage to each enemy with Burn. | Gain 9 Guard. Lose 3 HP. If this is the first card you played this turn, deal 12 damage to each enemy with Burn. | Gains Palm |  |
| Bonfire Bait | reaction (skill) | Blaze | uncommon | 0 | When an enemy uses a non-attack: apply 1 Exposed to it. If it has Burn, apply 2 Burn to it. | When an enemy uses a non-attack: apply 2 Exposed to it. If it has Burn, apply 3 Burn to it. | Gains Opener |  |
| Lava Slash | attack | Blaze | common | 3 | Deal 13 damage. If the target has Burn, deal 9 damage to each enemy with Burn. | Deal 17 damage. If the target has Burn, deal 12 damage to each enemy with Burn. | Costs 1 less |  |
| Brimstone Trance | skill | Blaze | uncommon | 0 | Apply 1 Burn. If this is the first card you played this turn, gain 1 energy. | Apply 2 Burn. If this is the first card you played this turn, gain 1 energy. | Gains Palm |  |
| Sulphur Lure | reaction (attack) | Blaze | rare | 1 | When attacked: deal 5 damage to the attacker and apply 1 Burn to ALL enemies. If you are below half HP, gain 1 Edge. | When attacked: deal 7 damage to the attacker and apply 2 Burn to ALL enemies. If you are below half HP, gain 1 Edge. | Gains Opener |  |
| Phoenix Rejoinder | counter (reaction) | Blaze | rare | 0 | Counter (a trap or Reaction): apply 1 Burn to ALL enemies. If its owner is below half HP, deal 4 damage to each enemy with Burn. | Counter (a trap or Reaction): apply 2 Burn to ALL enemies. If its owner is below half HP, deal 5 damage to each enemy with Burn. | Gains Opener |  |
| Firebrand Tripwire | reaction (reaction) | Blaze | rare | 1 | When an enemy trap activates: deal 5 damage to its owner and apply 1 Exposed to its owner. If you have Edge, double its Burn. | When an enemy trap activates: deal 7 damage to its owner and apply 2 Exposed to its owner. If you have Edge, double its Burn. | Gains Opener |  |
| Tinder Gash | attack | Blaze | common | 1 | Deal 3 damage. If you played 2+ other cards this turn, double the target's Burn. | Deal 4 damage. If you played 2+ other cards this turn, double the target's Burn. | Gains Palm |  |
| Coal Mantle | skill | Blaze | rare | 2 | Apply 5 Burn to ALL enemies. If you played 2+ other cards this turn, double the target's Burn. | Apply 7 Burn to ALL enemies. If you played 2+ other cards this turn, double the target's Burn. | Costs 1 less |  |
| Bonfire Retaliation | counter (attack) | Blaze | uncommon | 1 | Counter (an attack): gain 4 Guard and apply 1 Exposed to the attacker. If the attacker has Burn, deal 3 damage to each enemy with Burn. | Counter (an attack): gain 5 Guard and apply 2 Exposed to the attacker. If the attacker has Burn, deal 4 damage to each enemy with Burn. | Gains Opener |  |
| Flashpoint Rune | reaction (attack) | Blaze | rare | 1 | When attacked: gain 9 Guard and lose 3 HP. If the attacker is below half HP, deal 10 damage to each enemy with Burn. | When attacked: gain 12 Guard and lose 3 HP. If the attacker is below half HP, deal 13 damage to each enemy with Burn. | Gains Opener |  |
| Bonfire Aegis | skill | Blaze | uncommon | 2 | Gain 6 Guard. Apply 2 Burn. If this is the first card you played this turn, double the target's Burn. | Gain 8 Guard. Apply 3 Burn. If this is the first card you played this turn, double the target's Burn. | Costs 1 less |  |
| Lava Feint | attack | Blaze | uncommon | 1 | Deal 4 damage twice. Lose 3 HP. If you played 2+ other cards this turn, gain 1 energy. | Deal 5 damage twice. Lose 3 HP. If you played 2+ other cards this turn, gain 1 energy. | Gains Palm |  |
| Ignited Thrust | attack | Blaze | uncommon | 3 | Deal 10 damage. Gain 1 Edge. If you are below half HP, double the target's Burn. | Deal 13 damage. Gain 1 Edge. If you are below half HP, double the target's Burn. | Costs 1 less |  |
| Volcanic Ward | skill | Blaze | rare | 1 | Deal 4 damage to each enemy with Burn. If you played 2+ other cards this turn, apply 3 Exposed. | Deal 5 damage to each enemy with Burn. If you played 2+ other cards this turn, apply 4 Exposed. | Gains Palm |  |
| Hearth Strike | attack | Blaze | uncommon | 0 | Deal 3 damage. If you have Edge, apply 1 Burn to ALL enemies. | Deal 4 damage. If you have Edge, apply 2 Burn to ALL enemies. | Gains Palm |  |
| Ignited Stance | skill | Blaze | common | 2 | Gain 8 Guard. Chain 2: Gain 1 energy. | Gain 11 Guard. Chain 2: Gain 1 energy. | Costs 1 less |  |
| Ignited Feint | attack | Blaze | uncommon | 3 | Deal 11 damage. Apply 2 Exposed. If you played 2+ other cards this turn, gain 1 Edge. | Deal 15 damage. Apply 3 Exposed. If you played 2+ other cards this turn, gain 1 Edge. | Costs 1 less |  |
| Blistering Catch | reaction (skill) | Blaze | uncommon | 0 | When an enemy uses a non-attack: apply 1 Exposed to it. If you are below half HP, deal 4 damage to each enemy with Burn. | When an enemy uses a non-attack: apply 2 Exposed to it. If you are below half HP, deal 5 damage to each enemy with Burn. | Gains Opener |  |
| Coal Snare | reaction (attack) | Blaze | uncommon | 1 | When attacked: deal 5 damage to the attacker and deal 2 damage to each enemy with Burn. If the attacker is below half HP, apply 2 Exposed to the attacker. | When attacked: deal 7 damage to the attacker and deal 3 damage to each enemy with Burn. If the attacker is below half HP, apply 3 Exposed to the attacker. | Gains Opener |  |
| Sulphur Canticle | skill | Blaze | uncommon | 0 | Apply 1 Exposed. If the target is below half HP, apply 2 Burn. | Apply 2 Exposed. If the target is below half HP, apply 3 Burn. | Gains Palm |  |
| Lava Lunge | attack | Blaze | common | 2 | Deal 5 damage twice. If you are below half HP, double the target's Burn. | Deal 7 damage twice. If you are below half HP, double the target's Burn. | Costs 1 less |  |

## Tide cards (119)

| Card | Type | Element | Rarity | Cost | Text | Upgraded (A) | Path B | Unlock |
|---|---|---|---|---|---|---|---|---|
| Parry | reaction (attack) ★ | Flood | starter | 1 | When attacked: gain 8 Guard. Chain 3: draw 2 cards. | When attacked: gain 11 Guard. Chain 3: draw 2 cards. | Gains Opener |  |
| Riptide Snare | reaction (attack) ★ | Flood | starter | 1 | When attacked: apply 2 Shaken to the attacker (before it hits) and gain 3 Guard. | When attacked: apply 3 Shaken to the attacker (before it hits) and gain 5 Guard. | Gains Opener |  |
| Tidal Read | skill ★ | Flood | common | 1 | Draw 2 cards. | Draw 3 cards. | Gains Palm |  |
| Undertow | attack ★ | Flood | common | 1 | Deal 7 damage. Apply 1 Shaken. | Deal 9 damage. Apply 2 Shaken. | Gains Palm |  |
| Ebb | skill ★ | Flood | common | 0 | Palm. Gain 3 Guard. Draw 1 card. | Palm. Gain 5 Guard. Draw 1 card. | Gains Opener |  |
| Calm Waters | skill ★ | Flood | common | 1 | Apply 1 Shaken to ALL enemies. Draw 1 card. | Apply 2 Shaken to ALL enemies. Draw 1 card. | Gains Palm |  |
| Countercurrent | reaction (attack) ★ | Flood | uncommon | 2→1 | When attacked: Negate the attack. | When attacked: Negate the attack. | Gains Opener |  |
| Mirror Tide | reaction (reaction) ★ | Flood | uncommon | 1→0 | When an enemy trap activates: Negate it. Draw 1 card. | When an enemy trap activates: Negate it. Draw 1 card. | Gains Opener |  |
| Surge | skill ★ | Flood | uncommon | 1 | Bank 2 energy for next turn. Draw 1 card. | Bank 3 energy for next turn. Draw 1 card. | Gains Palm |  |
| Wave Crash | attack ★ | Flood | uncommon | 2 | Deal 6 damage, +2 for each card in your hand. | Deal 8 damage, +3 for each card in your hand. | Costs 1 less |  |
| Deep Focus | power ★ | Flood | rare | 2→1 | Draw 1 extra card each turn. | Draw 1 extra card each turn. | Gains Opener |  |
| Tide Turner | reaction (attack) ★ | Flood | rare | 1 | When attacked: gain 6 Guard and apply 2 Shaken. Chain 3: bank 1 energy. | When attacked: gain 10 Guard and apply 2 Shaken. Chain 3: bank 2 energy. | Gains Opener |  |
| Flow State | power ★ | Flood | rare | 2→1 | Your Reactions cost 1 less. | Your Reactions cost 1 less. | Gains Opener | L5 |
| Maelstrom | reaction (attack) ★ | Flood | legendary | 1→0 | When attacked: Negate the attack. Draw 2 cards. | When attacked: Negate the attack. Draw 3 cards. | Gains Opener |  |
| Drowning Verse | attack ★ | Flood | legendary | 1 | Apply 2 Shaken. Deal 6 damage, +4 per Shaken on the target. | Apply 2 Shaken. Deal 8 damage, +5 per Shaken on the target. | Gains Palm |  |
| Low Tide | skill ★ | Flood | uncommon | 1 | Draw 2 cards. The next Reaction you set this turn costs 0. | Draw 3 cards. The next Reaction you set this turn costs 0. | Gains Palm |  |
| Whirlpool | attack ★ | Flood | uncommon | 1 | Deal 5 damage and apply 1 Shaken to ALL enemies. | Deal 7 damage and apply 1 Shaken to ALL enemies. | Gains Palm |  |
| Undercurrent | reaction (reaction) ★ | Flood | rare | 1→0 | When an enemy trap activates: Negate it and bank 1 energy. | When an enemy trap activates: Negate it and bank 2 energy. | Gains Opener |  |
| Still Water | reaction (skill) ★ | Flood | common | 1 | Prime. When an enemy uses a non-attack: gain 3 Guard. Next turn, draw 1 more card(s), +1 per Prime (max +3). | Prime. When an enemy uses a non-attack: gain 5 Guard. Next turn, draw 2 more card(s), +1 per Prime (max +3). | Gains Opener |  |
| Meeting of Waters | skill ★ | Flood | uncommon | 1 | Draw 1 card per Converge (max 3), +0. | Draw 1 card per Converge (max 3), +1. | Gains Palm |  |
| Rebuke Wave | counter (reaction) ★ | Flood | common | 1→0 | Counter (a trap or Reaction): Negate it. | Counter (a trap or Reaction): Negate it. | Gains Opener |  |
| Riptide Reversal | counter (attack) ★ | Flood | common | 1 | Counter (an attack): apply 2 Shaken to the attacker before it hits. Draw 1 card. | Counter (an attack): apply 3 Shaken to the attacker before it hits. Draw 1 card. | Gains Opener |  |
| Tidal Rebuff | counter (any) ★ | Flood | rare | 2→1 | Counter (anything an enemy does): Negate it. Draw 2 cards. | Counter (anything an enemy does): Negate it. Draw 2 cards. | Gains Opener |  |
| Pearl Crown | power | Flood | uncommon | 2 | At the start of your turn, apply 2 Shaken to a random enemy. | At the start of your turn, apply 3 Shaken to a random enemy. | Costs 1 less |  |
| Spray Creed | power | Flood | rare | 2 | At the end of your turn, gain 5 Guard for each energy you carry over. | At the end of your turn, gain 6 Guard for each energy you carry over. | Costs 1 less |  |
| Spray Barrage | attack | Flood | common | 3 | Deal 13 damage. Apply 2 Shaken. | Deal 17 damage. Apply 3 Shaken. | Costs 1 less |  |
| Undertow Rite | skill | Flood | rare | 2 | Draw 2 cards. Apply 1 Shaken. Bank 1 energy for next turn. | Draw 2 cards. Apply 2 Shaken. Bank 1 energy for next turn. | Costs 1 less |  |
| Brine Crash | attack | Flood | common | 2 | Deal 4 damage twice. Gain 4 Guard. | Deal 5 damage twice. Gain 5 Guard. | Costs 1 less |  |
| Mist Ambush | reaction (attack) | Flood | uncommon | 1 | When attacked: deal 6 damage to the attacker and apply 1 Shaken to ALL enemies. | When attacked: deal 8 damage to the attacker and apply 2 Shaken to ALL enemies. | Gains Opener |  |
| Ebbing Snare | reaction (attack) | Flood | common | 0 | When attacked: apply 2 Shaken to the attacker. | When attacked: apply 3 Shaken to the attacker. | Gains Opener |  |
| Moonwater Focus | skill | Flood | uncommon | 1 | Draw 1 card. Apply 1 Shaken. | Draw 1 card. Apply 2 Shaken. | Gains Palm |  |
| Rippling Cleave | attack | Flood | rare | 2 | Deal 9 damage. Bank 1 energy for next turn. Apply 2 Shaken. | Deal 12 damage. Bank 1 energy for next turn. Apply 3 Shaken. | Costs 1 less |  |
| Coral Glyph | reaction (attack) | Flood | common | 1 | When attacked: gain 4 Guard and apply 1 Shaken to the attacker. | When attacked: gain 5 Guard and apply 2 Shaken to the attacker. | Gains Opener |  |
| Tidal Rune | reaction (skill) | Flood | common | 1 | When an enemy uses a non-attack: gain 4 Guard and apply 2 Shaken to it. | When an enemy uses a non-attack: gain 5 Guard and apply 3 Shaken to it. | Gains Opener |  |
| Mist Aegis | skill | Flood | common | 1 | Apply 2 Shaken. | Apply 3 Shaken. | Gains Palm |  |
| Undertow Strike | attack | Flood | common | 2 | Deal 9 damage. Apply 2 Shaken. | Deal 12 damage. Apply 3 Shaken. | Costs 1 less |  |
| Tidal Jab | attack | Flood | rare | 3 | Deal 14 damage. Gain 7 Guard. Apply 2 Shaken. | Deal 19 damage. Gain 9 Guard. Apply 3 Shaken. | Costs 1 less |  |
| Ebbing Rite | skill | Flood | common | 0 | Apply 1 Shaken. | Apply 2 Shaken. | Gains Palm |  |
| Pearl Volley | attack | Flood | uncommon | 2 | Deal 5 damage twice. Bank 1 energy for next turn. | Deal 7 damage twice. Bank 1 energy for next turn. | Costs 1 less |  |
| Rippling Comeback | counter (reaction) | Flood | common | 1 | Counter (a trap or Reaction): Negate it and apply 1 Shaken to its owner. | Counter (a trap or Reaction): Negate it and apply 2 Shaken to its owner. | Gains Opener |  |
| Pearl Sigil | skill | Flood | uncommon | 1 | Gain 4 Guard. Apply 1 Shaken. | Gain 5 Guard. Apply 2 Shaken. | Gains Palm |  |
| Brine Jab | attack | Flood | rare | 2 | Deal 7 damage. Apply 1 Shaken to ALL enemies. Draw 1 card. | Deal 9 damage. Apply 2 Shaken to ALL enemies. Draw 1 card. | Costs 1 less |  |
| Brine Answer | counter (reaction) | Flood | common | 1 | Counter (a trap or Reaction): Negate it and apply 1 Exposed to its owner. | Counter (a trap or Reaction): Negate it and apply 2 Exposed to its owner. | Gains Opener |  |
| Rippling Strike | attack | Flood | uncommon | 3 | Deal 15 damage. Draw 1 card. | Deal 20 damage. Draw 1 card. | Costs 1 less |  |
| Riptide Blow | attack | Flood | common | 2 | Deal 3 damage twice. Draw 1 card. | Deal 4 damage twice. Draw 1 card. | Costs 1 less |  |
| Tidal Strike | attack | Flood | uncommon | 2 | Deal 6 damage to ALL enemies. Apply 1 Shaken to ALL enemies. | Deal 8 damage to ALL enemies. Apply 2 Shaken to ALL enemies. | Costs 1 less |  |
| Undertow Trick | skill | Flood | common | 2 | Gain 7 Guard. Bank 1 energy for next turn. | Gain 9 Guard. Bank 1 energy for next turn. | Costs 1 less |  |
| Undertow Lunge | attack | Flood | rare | 2 | Deal 3 damage twice. Apply 1 Shaken to ALL enemies. Draw 1 card. | Deal 4 damage twice. Apply 2 Shaken to ALL enemies. Draw 1 card. | Costs 1 less |  |
| Riptide Coil | reaction (attack) | Flood | common | 1 | When attacked: gain 4 Guard and apply 1 Shaken to ALL enemies. | When attacked: gain 5 Guard and apply 2 Shaken to ALL enemies. | Gains Opener |  |
| Tidal Ploy | skill | Flood | uncommon | 2 | Gain 7 Guard. Apply 2 Shaken to ALL enemies. | Gain 9 Guard. Apply 3 Shaken to ALL enemies. | Costs 1 less |  |
| Spray Rebuff | counter (attack) | Flood | common | 0 | Counter (an attack): apply 1 Shaken to ALL enemies. | Counter (an attack): apply 2 Shaken to ALL enemies. | Gains Opener |  |
| Brine Tripwire | reaction (attack) | Flood | common | 0 | When attacked: apply 1 Shaken to ALL enemies. | When attacked: apply 2 Shaken to ALL enemies. | Gains Opener |  |
| Riptide Surge | skill 🦋 | Flood | evolved | 1 | Apply 1 Shaken to ALL enemies. If you hold 3 or fewer other cards, draw 2 cards. | Apply 2 Shaken to ALL enemies. If you hold 3 or fewer other cards, draw 2 cards. | Gains Palm |  |
| Trickle | skill 🦋 | Flood | common | 1 | Apply 1 Shaken. If you hold 3 or fewer other cards, draw 1 card. Evolve 3 (Riptide Surge). | Apply 2 Shaken. If you hold 3 or fewer other cards, draw 1 card. Evolve 3 (Riptide Surge). | Gains Palm |  |
| Tsunami Fist | attack 🦋 | Flood | evolved | 1 | Deal 5 damage. Apply 1 Shaken to ALL enemies. Deal 2 damage to each enemy with Shaken. | Deal 7 damage. Apply 2 Shaken to ALL enemies. Deal 3 damage to each enemy with Shaken. | Gains Palm |  |
| Puddle Jab | attack 🦋 | Flood | common | 1 | Deal 4 damage. Apply 1 Shaken. Evolve 4 (Tsunami Fist). | Deal 5 damage. Apply 2 Shaken. Evolve 4 (Tsunami Fist). | Gains Palm |  |
| Maelstrom Ward | reaction (skill) 🦋 | Flood | evolved | 1 | When an enemy uses a non-attack: gain 6 Guard and apply 1 Shaken to ALL enemies. Chain 3: Draw 1 card. | When an enemy uses a non-attack: gain 8 Guard and apply 2 Shaken to ALL enemies. Chain 3: Draw 1 card. | Gains Opener |  |
| Undertow Novice | reaction (skill) 🦋 | Flood | common | 1 | When an enemy uses a non-attack: gain 5 Guard and apply 1 Shaken to it. Evolve 4 (Maelstrom Ward). | When an enemy uses a non-attack: gain 7 Guard and apply 2 Shaken to it. Evolve 4 (Maelstrom Ward). | Gains Opener |  |
| Flood Refusal | counter (attack) 🦋 | Flood | evolved | 1 | Counter (an attack): Negate it and apply 2 Shaken to the attacker. | Counter (an attack): Negate it and apply 3 Shaken to the attacker. | Gains Opener |  |
| Ebb Counter | counter (attack) 🦋 | Flood | common | 1 | Counter (an attack): gain 4 Guard and apply 1 Shaken to the attacker. Evolve 4 (Flood Refusal). | Counter (an attack): gain 5 Guard and apply 2 Shaken to the attacker. Evolve 4 (Flood Refusal). | Gains Opener |  |
| Tide Lord | attack 🦋 | Flood | evolved | 1 | Deal 4 damage. Chain 2: Draw 1 card. If the target has Shaken, bank 1 energy for next turn. | Deal 5 damage. Chain 2: Draw 1 card. If the target has Shaken, bank 1 energy for next turn. | Gains Palm |  |
| Wave Rider | attack 🦋 | Flood | uncommon | 1 | Deal 4 damage. Chain 2: Draw 1 card. Evolve 5 (Tide Lord). | Deal 5 damage. Chain 2: Draw 1 card. Evolve 5 (Tide Lord). | Gains Palm |  |
| Riptide Crown | power ★ | Flood | uncommon | 2 | Whenever a chain of 3+ links resolves, apply 1 Shaken to ALL enemies. | Whenever a chain of 3+ links resolves, apply 2 Shaken to ALL enemies. | Costs 1 less |  |
| Undertow Heart | power ★ | Flood | rare | 1 | Whenever you play a Counter, apply 1 Shaken to a random enemy. | Whenever you play a Counter, apply 2 Shaken to a random enemy. | Gains Opener |  |
| Still Waters | power ★ | Flood | rare | 2 | At the end of your turn, if you have Guard, gain 20 Guard. | At the end of your turn, if you have Guard, gain 21 Guard. | Costs 1 less |  |
| Moon Pull | power ★ | Flood | uncommon | 1 | Whenever one of your Reactions fires, apply 1 Shaken to ALL enemies. | Whenever one of your Reactions fires, apply 2 Shaken to ALL enemies. | Gains Opener |  |
| Estuary Omen | skill | Flood | uncommon | 2→1 | Draw 1 card. If this is the first card you played this turn, gain 1 energy. | Draw 1 card. If this is the first card you played this turn, gain 1 energy. | Gains Palm |  |
| Breaker Snare | reaction (skill) | Flood | uncommon | 1 | When an enemy uses a non-attack: gain 3 Guard and bank 1 energy for next turn. Chain 3: Apply 1 Shaken to ALL enemies. | When an enemy uses a non-attack: gain 4 Guard and bank 1 energy for next turn. Chain 3: Apply 2 Shaken to ALL enemies. | Gains Opener |  |
| Billow Gainsay | counter (reaction) | Flood | rare | 1 | Counter (a trap or Reaction): gain 3 Guard and bank 1 energy for next turn. If there are 2+ enemies, apply 2 Shaken to its owner. | Counter (a trap or Reaction): gain 4 Guard and bank 1 energy for next turn. If there are 2+ enemies, apply 3 Shaken to its owner. | Gains Opener |  |
| Brackish Gambit | skill | Flood | common | 2 | Gain 8 Guard. If the target has Shaken, gain 1 energy. | Gain 11 Guard. If the target has Shaken, gain 1 energy. | Costs 1 less |  |
| Whirlpool Barrage | attack | Flood | uncommon | 1 | Deal 3 damage. Apply 1 Shaken to ALL enemies. If there are 2+ enemies, draw 1 card. | Deal 4 damage. Apply 2 Shaken to ALL enemies. If there are 2+ enemies, draw 1 card. | Gains Palm |  |
| Harbor Gesture | skill | Flood | rare | 2 | Gain 7 Guard. Apply 1 Shaken to ALL enemies. Chain 2: Deal 7 damage to each enemy with Shaken. | Gain 9 Guard. Apply 2 Shaken to ALL enemies. Chain 2: Deal 9 damage to each enemy with Shaken. | Costs 1 less |  |
| Kelp Coil | reaction (skill) | Flood | uncommon | 0 | When an enemy uses a non-attack: apply 1 Shaken to ALL enemies. Chain 3: Deal 2 damage to it for each card in your hand. | When an enemy uses a non-attack: apply 2 Shaken to ALL enemies. Chain 3: Deal 3 damage to it for each card in your hand. | Gains Opener |  |
| Billow Volley | attack | Flood | uncommon | 2 | Deal 5 damage to ALL enemies. Deal 3 damage to each enemy with Shaken. If there are 2+ enemies, gain 1 energy. | Deal 7 damage to ALL enemies. Deal 4 damage to each enemy with Shaken. If there are 2+ enemies, gain 1 energy. | Costs 1 less |  |
| Breaker Trance | skill | Flood | common | 2 | Gain 7 Guard. If this is the first card you played this turn, deal 3 damage for each card in your hand. | Gain 9 Guard. If this is the first card you played this turn, deal 4 damage for each card in your hand. | Costs 1 less |  |
| Maelstrom Tripline | reaction (skill) | Flood | uncommon | 1 | When an enemy uses a non-attack: gain 4 Guard and deal 1 damage to it for each card in your hand. Chain 3: Apply 2 Shaken to ALL enemies. | When an enemy uses a non-attack: gain 5 Guard and deal 2 damage to it for each card in your hand. Chain 3: Apply 3 Shaken to ALL enemies. | Gains Opener |  |
| Neap Reversal | counter (skill) | Flood | uncommon | 1 | Counter (a non-attack): gain 4 Guard and deal 2 damage to each enemy with Shaken. Chain 3: Apply 3 Shaken to it. | Counter (a non-attack): gain 5 Guard and deal 3 damage to each enemy with Shaken. Chain 3: Apply 4 Shaken to it. | Gains Opener |  |
| Abyssal Spring | reaction (attack) | Flood | uncommon | 0 | When attacked: deal 1 damage to the attacker for each card in your hand. If you have Guard, apply 1 Shaken to the attacker. | When attacked: deal 2 damage to the attacker for each card in your hand. If you have Guard, apply 2 Shaken to the attacker. | Gains Opener |  |
| Harbor Lunge | attack | Flood | uncommon | 2 | Deal 4 damage to ALL enemies. Deal 3 damage to each enemy with Shaken. If the target has Shaken, draw 1 card. | Deal 5 damage to ALL enemies. Deal 4 damage to each enemy with Shaken. If the target has Shaken, draw 1 card. | Costs 1 less |  |
| Neap Retaliation | counter (skill) | Flood | common | 1 | Counter (a non-attack): gain 4 Guard. If there are 2+ enemies, apply 1 Shaken to ALL enemies. | Counter (a non-attack): gain 5 Guard. If there are 2+ enemies, apply 2 Shaken to ALL enemies. | Gains Opener |  |
| Neap Vow | skill | Flood | rare | 1 | Gain 4 Guard. Apply 1 Shaken to ALL enemies. If this is the first card you played this turn, bank 1 energy for next turn. | Gain 5 Guard. Apply 2 Shaken to ALL enemies. If this is the first card you played this turn, bank 1 energy for next turn. | Gains Palm |  |
| Gulf Burst | attack | Flood | uncommon | 1 | Deal 3 damage. Deal 2 damage to each enemy with Shaken. If there are 2+ enemies, bank 1 energy for next turn. | Deal 4 damage. Deal 3 damage to each enemy with Shaken. If there are 2+ enemies, bank 1 energy for next turn. | Gains Palm |  |
| Saltwater Charm | skill | Flood | uncommon | 2 | Apply 2 Shaken to ALL enemies. If this is the first card you played this turn, deal 3 damage for each card in your hand. | Apply 3 Shaken to ALL enemies. If this is the first card you played this turn, deal 4 damage for each card in your hand. | Costs 1 less |  |
| Gulf Catch | reaction (attack) | Flood | uncommon | 1 | When attacked: deal 7 damage to the attacker. If there are 2+ enemies, deal 6 damage to each enemy with Shaken. | When attacked: deal 9 damage to the attacker. If there are 2+ enemies, deal 8 damage to each enemy with Shaken. | Gains Opener |  |
| Kelp Hammer | attack | Flood | uncommon | 2 | Deal 4 damage twice. Apply 2 Shaken. If there are 2+ enemies, draw 1 card. | Deal 5 damage twice. Apply 3 Shaken. If there are 2+ enemies, draw 1 card. | Costs 1 less |  |
| Floodgate Canticle | skill | Flood | rare | 1 | Gain 1 energy. If there are 2+ enemies, apply 1 Shaken to ALL enemies. | Gain 1 energy. If there are 2+ enemies, apply 2 Shaken to ALL enemies. | Gains Palm |  |
| Harbor Catch | reaction (reaction) | Flood | common | 1 | When an enemy trap activates: deal 8 damage to its owner. Chain 3: Bank 1 energy for next turn. | When an enemy trap activates: deal 11 damage to its owner. Chain 3: Bank 1 energy for next turn. | Gains Opener |  |
| Brackish Riposte | counter (reaction) | Flood | uncommon | 0 | Counter (a trap or Reaction): deal 2 damage to each enemy with Shaken. If its owner has Shaken, apply 1 Shaken to its owner. | Counter (a trap or Reaction): deal 3 damage to each enemy with Shaken. If its owner has Shaken, apply 2 Shaken to its owner. | Gains Opener |  |
| Estuary Ram | attack | Flood | uncommon | 1 | Deal 2 damage to a random enemy 3 times. If the target has Shaken, deal 4 damage to each enemy with Shaken. | Deal 3 damage to a random enemy 3 times. If the target has Shaken, deal 5 damage to each enemy with Shaken. | Gains Palm |  |
| Gulf Seal | reaction (reaction) | Flood | uncommon | 1 | When an enemy trap activates: deal 5 damage to each enemy with Shaken. If there are 2+ enemies, apply 3 Shaken to its owner. | When an enemy trap activates: deal 7 damage to each enemy with Shaken. If there are 2+ enemies, apply 4 Shaken to its owner. | Gains Opener |  |
| Squall Charm | skill | Flood | common | 1 | Gain 3 Guard. If there are 2+ enemies, gain 1 energy. | Gain 4 Guard. If there are 2+ enemies, gain 1 energy. | Gains Palm |  |
| Wavecrest Crash | attack | Flood | uncommon | 2 | Deal 5 damage. Draw 1 card. If this is the first card you played this turn, deal 5 damage to each enemy with Shaken. | Deal 7 damage. Draw 1 card. If this is the first card you played this turn, deal 7 damage to each enemy with Shaken. | Costs 1 less |  |
| Saltwater Tactic | skill | Flood | rare | 2 | Gain 8 Guard. Apply 1 Shaken to ALL enemies. If you hold 3 or fewer other cards, bank 1 energy for next turn. | Gain 11 Guard. Apply 2 Shaken to ALL enemies. If you hold 3 or fewer other cards, bank 1 energy for next turn. | Costs 1 less |  |
| Estuary Rune | reaction (attack) | Flood | common | 0 | When attacked: deal 1 damage to the attacker for each card in your hand. | When attacked: deal 2 damage to the attacker for each card in your hand. | Gains Opener |  |
| Wavecrest Rebuttal | counter (skill) | Flood | common | 1 | Counter (a non-attack): gain 4 Guard. If there are 2+ enemies, draw 1 card. | Counter (a non-attack): gain 5 Guard. If there are 2+ enemies, draw 1 card. | Gains Opener |  |
| Gulf Rejoinder | counter (reaction) | Flood | common | 1 | Counter (a trap or Reaction): gain 4 Guard. If its owner has Shaken, draw 1 card. | Counter (a trap or Reaction): gain 5 Guard. If its owner has Shaken, draw 1 card. | Gains Opener |  |
| Whirlpool Rejoinder | counter (attack) | Flood | common | 1 | Counter (an attack): gain 4 Guard. If there are 2+ enemies, apply 1 Shaken to ALL enemies. | Counter (an attack): gain 5 Guard. If there are 2+ enemies, apply 2 Shaken to ALL enemies. | Gains Opener |  |
| Gulf Posture | skill | Flood | rare | 0 | Apply 1 Shaken. If there are 2+ enemies, deal 3 damage to each enemy with Shaken. | Apply 2 Shaken. If there are 2+ enemies, deal 4 damage to each enemy with Shaken. | Gains Palm |  |
| Billow Lash | attack | Flood | rare | 1 | Deal 4 damage. Apply 1 Shaken to ALL enemies. If you have Guard, deal 3 damage to each enemy with Shaken. | Deal 5 damage. Apply 2 Shaken to ALL enemies. If you have Guard, deal 4 damage to each enemy with Shaken. | Gains Palm |  |
| Estuary Tripwire | reaction (attack) | Flood | uncommon | 1 | When attacked: deal 3 damage to the attacker and bank 1 energy for next turn. Chain 3: Apply 2 Shaken to the attacker. | When attacked: deal 4 damage to the attacker and bank 1 energy for next turn. Chain 3: Apply 3 Shaken to the attacker. | Gains Opener |  |
| Wavecrest Rite | skill | Flood | rare | 2 | Gain 7 Guard. Deal 1 damage for each card in your hand. If you hold 3 or fewer other cards, apply 2 Shaken to ALL enemies. | Gain 9 Guard. Deal 2 damage for each card in your hand. If you hold 3 or fewer other cards, apply 3 Shaken to ALL enemies. | Costs 1 less |  |
| Harbor Deflection | counter (reaction) | Flood | uncommon | 1 | Counter (a trap or Reaction): gain 4 Guard and deal 1 damage to its owner for each card in your hand. Chain 3: Bank 1 energy for next turn. | Counter (a trap or Reaction): gain 5 Guard and deal 2 damage to its owner for each card in your hand. Chain 3: Bank 1 energy for next turn. | Gains Opener |  |
| Shoal Jab | attack | Flood | common | 0 | Deal 3 damage. If you hold 3 or fewer other cards, deal 2 damage to each enemy with Shaken. | Deal 4 damage. If you hold 3 or fewer other cards, deal 3 damage to each enemy with Shaken. | Gains Palm |  |
| Saltwater Trap | reaction (attack) | Flood | common | 1 | When attacked: deal 6 damage to the attacker. If the attacker has Shaken, apply 2 Shaken to the attacker. | When attacked: deal 8 damage to the attacker. If the attacker has Shaken, apply 3 Shaken to the attacker. | Gains Opener |  |
| Kelp Focus | skill | Flood | rare | 1 | Deal 2 damage for each card in your hand. If there are 2+ enemies, draw 1 card. | Deal 3 damage for each card in your hand. If there are 2+ enemies, draw 1 card. | Gains Palm |  |
| Shoal Rite | skill | Flood | uncommon | 2 | Apply 3 Shaken to ALL enemies. If this is the first card you played this turn, bank 1 energy for next turn. | Apply 4 Shaken to ALL enemies. If this is the first card you played this turn, bank 1 energy for next turn. | Costs 1 less |  |
| Brackish Sigil | skill | Flood | uncommon | 1 | Gain 4 Guard. If you hold 3 or fewer other cards, deal 1 damage for each card in your hand. | Gain 5 Guard. If you hold 3 or fewer other cards, deal 2 damage for each card in your hand. | Gains Palm |  |
| Neap Crash | attack | Flood | common | 1 | Deal 5 damage. Chain 3: Draw 1 card. | Deal 7 damage. Chain 3: Draw 1 card. | Gains Palm |  |
| Saltwater Shroud | skill | Flood | rare | 1 | Gain 1 energy. If the target has Shaken, deal 3 damage to each enemy with Shaken. | Gain 1 energy. If the target has Shaken, deal 4 damage to each enemy with Shaken. | Gains Palm |  |
| Saltwater Recital | skill | Flood | uncommon | 2 | Gain 6 Guard. Apply 1 Shaken to ALL enemies. If you hold 3 or fewer other cards, draw 1 card. | Gain 8 Guard. Apply 2 Shaken to ALL enemies. If you hold 3 or fewer other cards, draw 1 card. | Costs 1 less |  |
| Billow Denial | counter (attack) | Flood | rare | 1 | Counter (an attack): gain 5 Guard and apply 1 Shaken to the attacker. Chain 3: Bank 1 energy for next turn. | Counter (an attack): gain 7 Guard and apply 2 Shaken to the attacker. Chain 3: Bank 1 energy for next turn. | Gains Opener |  |
| Whirlpool Mirror | reaction (skill) | Flood | common | 1 | When an enemy uses a non-attack: gain 5 Guard. If there are 2+ enemies, apply 2 Shaken to ALL enemies. | When an enemy uses a non-attack: gain 7 Guard. If there are 2+ enemies, apply 3 Shaken to ALL enemies. | Gains Opener |  |
| Gulf Veil | skill | Flood | uncommon | 1 | Bank 1 energy for next turn. If there are 2+ enemies, deal 2 damage for each card in your hand. | Bank 1 energy for next turn. If there are 2+ enemies, deal 3 damage for each card in your hand. | Gains Palm |  |
| Billow Jab | attack | Flood | rare | 1 | Deal 3 damage. Bank 1 energy for next turn. If there are 2+ enemies, apply 1 Shaken to ALL enemies. | Deal 4 damage. Bank 1 energy for next turn. If there are 2+ enemies, apply 2 Shaken to ALL enemies. | Gains Palm |  |
| Maelstrom Tripwire | reaction (attack) | Flood | common | 1 | When attacked: gain 4 Guard. If the attacker has Shaken, draw 1 card. | When attacked: gain 5 Guard. If the attacker has Shaken, draw 1 card. | Gains Opener |  |
| Brackish Rebuke | counter (reaction) | Flood | common | 1 | Counter (a trap or Reaction): gain 4 Guard. If there are 2+ enemies, deal 5 damage to each enemy with Shaken. | Counter (a trap or Reaction): gain 5 Guard. If there are 2+ enemies, deal 7 damage to each enemy with Shaken. | Gains Opener |  |
| Neap Sigil | skill | Flood | uncommon | 2 | Apply 3 Shaken. If you have Guard, deal 8 damage to each enemy with Shaken. | Apply 4 Shaken. If you have Guard, deal 11 damage to each enemy with Shaken. | Costs 1 less |  |
| Kelp Sweep | attack | Flood | uncommon | 1 | Deal 3 damage twice. If you hold 3 or fewer other cards, bank 1 energy for next turn. | Deal 4 damage twice. If you hold 3 or fewer other cards, bank 1 energy for next turn. | Gains Palm |  |
| Kelp Jaw | reaction (skill) | Flood | rare | 0 | When an enemy uses a non-attack: deal 3 damage to each enemy with Shaken. Chain 3: Deal 2 damage to it for each card in your hand. | When an enemy uses a non-attack: deal 4 damage to each enemy with Shaken. Chain 3: Deal 3 damage to it for each card in your hand. | Gains Opener |  |

## Thorn cards (152)

| Card | Type | Element | Rarity | Cost | Text | Upgraded (A) | Path B | Unlock |
|---|---|---|---|---|---|---|---|---|
| Bramble Ward | skill ★ | Wild | starter | 1 | Gain 6 Guard. Gain 1 Barbs. | Gain 8 Guard. Gain 2 Barbs. | Gains Palm |  |
| Barkskin | skill ★ | Wild | common | 1 | Gain 8 Guard. | Gain 11 Guard. | Gains Palm |  |
| Root Strike | attack ★ | Wild | common | 1 | Deal 5 damage. Gain 4 Guard. | Deal 7 damage. Gain 6 Guard. | Gains Palm |  |
| Bramble Snare | reaction (attack) ★ | Wild | common | 1 | When attacked: gain 3 Barbs (before it hits) and 4 Guard. | When attacked: gain 5 Barbs (before it hits) and 5 Guard. | Gains Opener |  |
| Harden | reaction (attack) ★ | Wild | common | 0 | When attacked: gain 5 Guard. | When attacked: gain 8 Guard. | Gains Opener |  |
| Sapling | skill ★ | Wild | common | 0 | Gain 3 Guard. Next turn, gain 4 Guard. | Gain 4 Guard. Next turn, gain 6 Guard. | Gains Palm |  |
| Thornmail | power ★ | Wild | uncommon | 1 | Gain 3 Barbs. | Gain 5 Barbs. | Gains Opener |  |
| Regrowth | skill ★ | Wild | uncommon | 1 | Heal 6 HP. Fold. | Heal 9 HP. Fold. | No longer Folds |  |
| Trunk Slam | attack ★ | Wild | uncommon | 1→0 | Deal damage equal to your Guard. | Deal damage equal to your Guard. | Gains Palm |  |
| Deep Roots | skill ★ | Wild | uncommon | 2 | Gain 12 Guard. Your Guard is kept through your next turn start. | Gain 16 Guard. Your Guard is kept through your next turn start. | Costs 1 less |  |
| Thorn Volley | attack ★ | Wild | uncommon | 1 | Deal 4 damage, +2 per Barbs you have. | Deal 6 damage, +3 per Barbs you have. | Gains Palm |  |
| Overgrowth | power ★ | Wild | rare | 2 | At the start of your turn, gain 5 Guard. | At the start of your turn, gain 8 Guard. | Costs 1 less |  |
| Wild Bloom | skill ★ | Wild | rare | 1 | Double your Guard. Fold. | Double your Guard. | Gains Palm |  |
| Grove Guardian | skill ★ | Wild | rare | 3 | Gain 20 Guard and 3 Barbs. | Gain 26 Guard and 4 Barbs. | Costs 1 less | L4 |
| Worldroot | power ★ | Wild | legendary | 3→2 | Gain 3 Barbs. At the start of your turn, gain 6 Guard. | Gain 3 Barbs. At the start of your turn, gain 6 Guard. | Gains Opener |  |
| Briar Reprisal | reaction (attack) ★ | Wild | legendary | 1 | When attacked: gain 8 Guard, then deal 2× your Barbs to the attacker. | When attacked: gain 12 Guard, then deal 3× your Barbs to the attacker. | Gains Opener |  |
| Nettle Wall | skill ★ | Wild | uncommon | 1 | Palm. Gain 6 Guard and 2 Barbs. | Palm. Gain 8 Guard and 3 Barbs. | Gains Opener |  |
| Pollen Burst | skill ★ | Wild | uncommon | 1 | Apply 1 Shaken to ALL enemies. Heal 4 HP. Fold. | Apply 2 Shaken to ALL enemies. Heal 6 HP. Fold. | No longer Folds |  |
| Briar Lash | attack ★ | Wild | common | 1 | Deal 5 damage. Gain 1 Barbs. | Deal 7 damage. Gain 2 Barbs. | Gains Palm |  |
| Ancient Bark | power ★ | Wild | rare | 1 | At the end of your turn, if you have Guard, gain 1 Barbs. | At the end of your turn, if you have Guard, gain 2 Barbs. | Gains Opener |  |
| Heartwood Ward | reaction (attack) ★ | Wild | common | 1 | Prime. When attacked: gain 6 Guard, +3 per Prime. | Prime. When attacked: gain 8 Guard, +4 per Prime. | Gains Opener |  |
| Crossroads Grove | skill ★ | Wild | uncommon | 1 | Gain 3 Barbs. Converge 3: gain 3 more Barbs and 6 Guard. | Gain 4 Barbs. Converge 3: gain 4 more Barbs and 8 Guard. | Gains Palm |  |
| Bramble Rebuke | counter (attack) ★ | Wild | common | 1 | Counter (an attack): gain 3 Barbs before it hits and 4 Guard. | Counter (an attack): gain 4 Barbs before it hits and 6 Guard. | Gains Opener |  |
| Rootbind | counter (reaction) ★ | Wild | common | 1 | Counter (a trap or Reaction): gain 8 Guard and 1 Barbs. | Counter (a trap or Reaction): gain 11 Guard and 2 Barbs. | Gains Opener |  |
| Heartwood Rebuke | counter (attack) ★ | Wild | uncommon | 1 | Counter (an attack): gain 10 Guard. Heal 3 HP. | Counter (an attack): gain 13 Guard. Heal 4 HP. | Gains Opener |  |
| Oaken Engine | power | Wild | uncommon | 2 | At the end of your turn, if you have Barbs, heal 2 HP. | At the end of your turn, if you have Barbs, heal 3 HP. | Costs 1 less |  |
| Briar Covenant | power | Wild | rare | 2 | At the start of your turn, gain 2 Guard for each Barbs you have. | At the start of your turn, gain 3 Guard for each Barbs you have. | Costs 1 less |  |
| Bloom Barrage | attack | Wild | common | 1 | Deal 4 damage. Apply 1 Shaken. | Deal 5 damage. Apply 2 Shaken. | Gains Palm |  |
| Nettle Charm | skill | Wild | rare | 1 | Draw 1 card. Heal 1 HP. Gain 1 Barbs. | Draw 1 card. Heal 2 HP. Gain 2 Barbs. | Gains Palm |  |
| Bramble Rend | attack | Wild | common | 2 | Deal 5 damage to ALL enemies. Gain 2 Barbs. | Deal 7 damage to ALL enemies. Gain 3 Barbs. | Costs 1 less |  |
| Bramble Coil | reaction (reaction) | Wild | uncommon | 1 | When an enemy trap activates: deal 5 damage to its owner and gain 4 Guard. | When an enemy trap activates: deal 7 damage to its owner and gain 5 Guard. | Gains Opener |  |
| Bloom Seal | reaction (attack) | Wild | uncommon | 1 | When attacked: deal 6 damage to the attacker and gain 4 Guard. | When attacked: deal 8 damage to the attacker and gain 5 Guard. | Gains Opener |  |
| Sylvan Blow | attack | Wild | rare | 2 | Deal 4 damage twice. Gain 5 Guard. Gain 1 Barbs. | Deal 5 damage twice. Gain 7 Guard. Gain 2 Barbs. | Costs 1 less |  |
| Barbed Slash | attack | Wild | uncommon | 2 | Deal 5 damage twice. Gain 2 Barbs. | Deal 7 damage twice. Gain 3 Barbs. | Costs 1 less |  |
| Sylvan Tripwire | reaction (reaction) | Wild | common | 1 | When an enemy trap activates: deal 5 damage to its owner and next turn, gain 4 Guard. | When an enemy trap activates: deal 7 damage to its owner and next turn, gain 5 Guard. | Gains Opener |  |
| Ivy Parry | counter (reaction) | Wild | common | 1 | Counter (a trap or Reaction): gain 4 Guard and heal 2 HP. | Counter (a trap or Reaction): gain 5 Guard and heal 3 HP. | Gains Opener |  |
| Fern Cut | attack | Wild | rare | 2 | Deal 4 damage twice. Next turn, gain 5 Guard. Gain 1 Barbs. | Deal 5 damage twice. Next turn, gain 7 Guard. Gain 2 Barbs. | Costs 1 less |  |
| Heartwood Trap | reaction (attack) | Wild | common | 1 | When attacked: deal 5 damage to the attacker and next turn, gain 4 Guard. | When attacked: deal 7 damage to the attacker and next turn, gain 5 Guard. | Gains Opener |  |
| Fern Snare | reaction (attack) | Wild | common | 0 | When attacked: gain 1 Barbs. | When attacked: gain 2 Barbs. | Gains Opener |  |
| Heartwood Charm | skill | Wild | common | 0 | Gain 1 Barbs. | Gain 2 Barbs. | Gains Palm |  |
| Barbed Ambush | reaction (attack) | Wild | common | 0 | When attacked: heal 3 HP. | When attacked: heal 4 HP. | Gains Opener |  |
| Ivy Blow | attack | Wild | common | 2 | Deal 5 damage to ALL enemies. Next turn, gain 5 Guard. | Deal 7 damage to ALL enemies. Next turn, gain 7 Guard. | Costs 1 less |  |
| Bramble Canticle | skill | Wild | uncommon | 2 | Draw 2 cards. Heal 1 HP. | Draw 2 cards. Heal 2 HP. | Costs 1 less |  |
| Oaken Crash | attack | Wild | common | 3 | Deal 13 damage. Next turn, gain 6 Guard. | Deal 17 damage. Next turn, gain 8 Guard. | Costs 1 less |  |
| Bloom Mantle | skill | Wild | common | 1 | Draw 1 card. Gain 1 Barbs. | Draw 1 card. Gain 2 Barbs. | Gains Palm |  |
| Oaken Riposte | counter (attack) | Wild | common | 0 | Counter (an attack): next turn, gain 4 Guard. | Counter (an attack): next turn, gain 5 Guard. | Gains Opener |  |
| Grove Trick | skill | Wild | common | 1 | Gain 2 Barbs. | Gain 3 Barbs. | Gains Palm |  |
| Ivy Ambush | reaction (attack) | Wild | common | 0 | When attacked: next turn, gain 5 Guard. | When attacked: next turn, gain 7 Guard. | Gains Opener |  |
| Verdant Mirror | reaction (attack) | Wild | common | 0 | When attacked: apply 2 Exposed to the attacker. | When attacked: apply 3 Exposed to the attacker. | Gains Opener |  |
| Rooted Lash | attack | Wild | common | 1 | Deal 2 damage to a random enemy 3 times. Heal 1 HP. | Deal 3 damage to a random enemy 3 times. Heal 2 HP. | Gains Palm |  |
| Rotting Thicket | reaction (attack) ⧉ (void) | Wild | uncommon | 1 | When attacked: gain 2 Barbs and apply 5 Doom to the attacker. | When attacked: gain 3 Barbs and apply 7 Doom to the attacker. | Gains Opener |  |
| Blight | skill ⧉ (void) | Wild | uncommon | 1 | Apply 4 Doom to ALL enemies. If you have Barbs, heal 3 HP. | Apply 5 Doom to ALL enemies. If you have Barbs, heal 4 HP. | Gains Palm |  |
| Withering Vine | attack ⧉ (void) | Wild | uncommon | 1 | Deal 5 damage. If the target has Doom, next turn, gain 5 Guard. | Deal 7 damage. If the target has Doom, next turn, gain 7 Guard. | Gains Palm |  |
| Golden Bough | skill ⧉ (gilt) | Wild | uncommon | 1 | Next turn, gain 4 Guard. Raise your Ante by 2. | Next turn, gain 5 Guard. Raise your Ante by 3. | Gains Palm |  |
| Lucky Clover | skill ⧉ (gilt) | Wild | uncommon | 0 | ☀ Heal 2 HP. ☾ Gain 1 Barbs. Flip your Fate Coin. | ☀ Heal 3 HP. ☾ Gain 2 Barbs. Flip your Fate Coin. | Gains Palm |  |
| Thorny Wager | reaction (attack) ⧉ (gilt) | Wild | rare | 1 | When attacked: gain 2 Barbs. If your Ante is 3+, gain 3 Barbs. | When attacked: gain 3 Barbs. If your Ante is 3+, gain 4 Barbs. | Gains Opener |  |
| Crystal Rose | reaction (attack) ⧉ (glass) | Wild | uncommon | 1 | When attacked: gain 2 Barbs and add a Glint to your hand. | When attacked: gain 3 Barbs and add a Glint to your hand. | Gains Opener |  |
| Glass Garden | skill ⧉ (glass) | Wild | uncommon | 1 | Next turn, gain 5 Guard. If you hold a Glint, heal 4 HP. | Next turn, gain 7 Guard. If you hold a Glint, heal 5 HP. | Gains Palm |  |
| Prickly Thief | reaction (reaction) ⧉ (glass) | Wild | rare | 1 | When an enemy trap activates: Steal 1 and gain 2 Barbs. | When an enemy trap activates: Steal 1 and gain 3 Barbs. | Gains Opener |  |
| Grave Moss | skill ⧉ (grave) | Wild | uncommon | 1 | Heal 2 HP. Bury 2. | Heal 3 HP. Bury 2. | Gains Palm |  |
| Ossuary Bloom | skill ⧉ (grave) | Wild | rare | 2 | Exhume 1. Next turn, gain 10 Guard. | Exhume 1. Next turn, gain 13 Guard. | Costs 1 less |  |
| Sacred Grove | skill ⧉ (dawn) | Wild | uncommon | 1 | Heal 2 HP. Gain 1 Verdict. | Heal 3 HP. Gain 1 Verdict. | Gains Palm |  |
| Mercy Thorn | counter (attack) ⧉ (dawn) | Wild | rare | 1 | Counter (an attack): gain 6 Guard. If you are below half HP, heal 6 HP. | Counter (an attack): gain 8 Guard. If you are below half HP, heal 8 HP. | Gains Opener |  |
| Lightning Rod Oak | reaction (attack) ⧉ (storm) | Wild | uncommon | 1 | When attacked: gain 2 Barbs and gain 2 Charge. | When attacked: gain 3 Barbs and gain 3 Charge. | Gains Opener |  |
| Thundergrowth | skill ⧉ (storm) | Wild | rare | 1 | Next turn, gain 5 Guard. Apply 2 Shock to ALL enemies. | Next turn, gain 7 Guard. Apply 3 Shock to ALL enemies. | Gains Palm |  |
| Frostbramble | reaction (attack) ⧉ (rime) | Wild | uncommon | 1 | When attacked: gain 2 Barbs and apply 2 Chill to the attacker. | When attacked: gain 3 Barbs and apply 3 Chill to the attacker. | Gains Opener |  |
| Winter Hedge | skill ⧉ (rime) | Wild | uncommon | 1 | Gain 4 Guard. If the target has Chill, next turn, gain 5 Guard. | Gain 5 Guard. If the target has Chill, next turn, gain 7 Guard. | Gains Palm |  |
| Hoarvine | reaction (attack) ⧉ (rime) | Wild | rare | 1 | When attacked: gain 5 Guard and apply 2 Chill to the attacker. If you have Barbs, apply 2 Shaken to the attacker. | When attacked: gain 7 Guard and apply 3 Chill to the attacker. If you have Barbs, apply 3 Shaken to the attacker. | Gains Opener |  |
| Boar Thicket | skill ⧉ (beast) | Wild | uncommon | 1 | Summon Bear 1. Gain 1 Barbs. | Summon Bear 2. Gain 2 Barbs. | Gains Palm |  |
| Den Mother | skill ⧉ (beast) | Wild | rare | 2 | Summon Bear 3. Heal 4 HP. | Summon Bear 4. Heal 5 HP. | Costs 1 less |  |
| Rootrock | skill ⧉ (stone) | Wild | uncommon | 1 | Gain 3 Fortify. Gain 1 Barbs. | Gain 4 Fortify. Gain 2 Barbs. | Gains Palm |  |
| Living Wall | skill ⧉ (stone) | Wild | uncommon | 2 | Gain 6 Guard. Gain 3 Fortify. If you have Barbs, next turn, gain 6 Guard. | Gain 8 Guard. Gain 4 Fortify. If you have Barbs, next turn, gain 8 Guard. | Costs 1 less |  |
| Bramble Quake | reaction (attack) ⧉ (stone) | Wild | rare | 1 | When attacked: apply 5 Tremor to the attacker and gain 1 Barbs. | When attacked: apply 7 Tremor to the attacker and gain 2 Barbs. | Gains Opener |  |
| Herbal Tincture | skill ⧉ (aether) | Wild | uncommon | 1 | Heal 3 HP. Attune to the element that beats the first enemy. | Heal 4 HP. Attune to the element that beats the first enemy. | Gains Palm |  |
| Thorn Elixir | skill ⧉ (aether) | Wild | uncommon | 0 | Gain 1 Barbs. If you played 2+ elements this turn, heal 2 HP. | Gain 2 Barbs. If you played 2+ elements this turn, heal 3 HP. | Gains Palm |  |
| Verdant Reagent | attack ⧉ (aether) | Wild | uncommon | 1 | Deal 5 damage. If you are attuned to the element that beats the target, next turn, gain 5 Guard. | Deal 7 damage. If you are attuned to the element that beats the target, next turn, gain 7 Guard. | Gains Palm |  |
| Hidden Thorns | reaction (attack) ⧉ (dusk) | Wild | uncommon | 1 | When attacked: gain 2 Barbs. If you have Veil, gain 3 Barbs. | When attacked: gain 3 Barbs. If you have Veil, gain 4 Barbs. | Gains Opener |  |
| Shade Bower | skill ⧉ (dusk) | Wild | uncommon | 2 | Gain 1 Veil. Next turn, gain 7 Guard. | Gain 1 Veil. Next turn, gain 9 Guard. | Costs 1 less |  |
| Poisoned Briar | attack ⧉ (dusk) | Wild | rare | 1 | Deal 4 damage. Apply 1 Mark. If you are below half HP, heal 3 HP. | Deal 5 damage. Apply 2 Mark. If you are below half HP, heal 4 HP. | Gains Palm |  |
| Elder Oak | skill 🦋 | Wild | evolved | 1 | Next turn, gain 4 Guard. Gain 1 Barbs. If you are below half HP, heal 4 HP. | Next turn, gain 5 Guard. Gain 2 Barbs. If you are below half HP, heal 5 HP. | Gains Palm |  |
| Seedling | skill 🦋 | Wild | common | 1 | Next turn, gain 6 Guard. Evolve 4 (Elder Oak). | Next turn, gain 8 Guard. Evolve 4 (Elder Oak). | Gains Palm |  |
| Bramble Titan | reaction (attack) 🦋 | Wild | evolved | 1 | When attacked: gain 2 Barbs and gain 3 Guard. If you are below half HP, heal 5 HP. | When attacked: gain 3 Barbs and gain 4 Guard. If you are below half HP, heal 7 HP. | Gains Opener |  |
| Thornling | reaction (attack) 🦋 | Wild | common | 1 | When attacked: gain 3 Barbs. Evolve 3 (Bramble Titan). | When attacked: gain 4 Barbs. Evolve 3 (Bramble Titan). | Gains Opener |  |
| Heartwood Smash | attack 🦋 | Wild | evolved | 1 | Deal 5 damage. Heal 1 HP. If you have Barbs, next turn, gain 4 Guard. | Deal 7 damage. Heal 2 HP. If you have Barbs, next turn, gain 5 Guard. | Gains Palm |  |
| Sapling Strike | attack 🦋 | Wild | common | 1 | Deal 4 damage. Heal 1 HP. Evolve 4 (Heartwood Smash). | Deal 5 damage. Heal 2 HP. Evolve 4 (Heartwood Smash). | Gains Palm |  |
| Grove Remedy | skill 🦋 | Wild | evolved | 0 | Heal 2 HP. If you are below half HP, next turn, gain 6 Guard. | Heal 3 HP. If you are below half HP, next turn, gain 8 Guard. | Gains Palm |  |
| Herb Satchel | skill 🦋 | Wild | common | 0 | Heal 2 HP. Evolve 3 (Grove Remedy). | Heal 3 HP. Evolve 3 (Grove Remedy). | Gains Palm |  |
| Strangler Fig | reaction (skill) 🦋 | Wild | evolved | 1 | When an enemy uses a non-attack: gain 2 Barbs and apply 1 Shaken to it. If there are 2+ enemies, gain 6 Guard. | When an enemy uses a non-attack: gain 3 Barbs and apply 2 Shaken to it. If there are 2+ enemies, gain 8 Guard. | Gains Opener |  |
| Ivy Snare | reaction (skill) 🦋 | Wild | uncommon | 1 | When an enemy uses a non-attack: gain 5 Guard and gain 1 Barbs. Evolve 4 (Strangler Fig). | When an enemy uses a non-attack: gain 7 Guard and gain 2 Barbs. Evolve 4 (Strangler Fig). | Gains Opener |  |
| Briar Crown | power ★ | Wild | uncommon | 1 | At the start of your turn, gain 1 Barbs. | At the start of your turn, gain 2 Barbs. | Gains Opener |  |
| Greenheart | power ★ | Wild | uncommon | 2 | At the start of your turn, if you are below half HP, heal 14 HP. | At the start of your turn, if you are below half HP, heal 15 HP. | Costs 1 less |  |
| Root Network | power ★ | Wild | rare | 1 | Whenever one of your Reactions fires, next turn, gain 4 Guard. | Whenever one of your Reactions fires, next turn, gain 5 Guard. | Gains Opener |  |
| Thicket Lord | power ★ | Wild | rare | 2 | Whenever a chain of 2+ links resolves, gain 2 Barbs. | Whenever a chain of 2+ links resolves, gain 3 Barbs. | Costs 1 less |  |
| Evergreen Aegis | skill | Wild | rare | 2 | Gain 7 Guard. Apply 2 Shaken. If you are below half HP, gain 4 Barbs. | Gain 9 Guard. Apply 3 Shaken. If you are below half HP, gain 5 Barbs. | Costs 1 less |  |
| Canopy Answer | counter (reaction) | Wild | uncommon | 0 | Counter (a trap or Reaction): gain 1 Barbs. If there are 2+ enemies, next turn, gain 4 Guard. | Counter (a trap or Reaction): gain 2 Barbs. If there are 2+ enemies, next turn, gain 5 Guard. | Gains Opener |  |
| Evergreen Lash | attack | Wild | common | 2 | Deal 4 damage twice. If you are below half HP, heal 7 HP. | Deal 5 damage twice. If you are below half HP, heal 9 HP. | Costs 1 less |  |
| Evergreen Spring | reaction (skill) | Wild | rare | 1 | When an enemy uses a non-attack: gain 5 Guard and apply 1 Shaken to it. If you have Barbs, gain 2 Barbs. | When an enemy uses a non-attack: gain 7 Guard and apply 2 Shaken to it. If you have Barbs, gain 3 Barbs. | Gains Opener |  |
| Yew Rite | skill | Wild | uncommon | 2 | Apply 3 Shaken. If the target is below half HP, gain 4 Barbs. | Apply 4 Shaken. If the target is below half HP, gain 5 Barbs. | Costs 1 less |  |
| Yew Vow | skill | Wild | uncommon | 1 | Apply 2 Shaken. If there are 2+ enemies, heal 3 HP. | Apply 3 Shaken. If there are 2+ enemies, heal 4 HP. | Gains Palm |  |
| Evergreen Glyph | reaction (reaction) | Wild | rare | 1 | When an enemy trap activates: deal 6 damage to its owner and apply 1 Shaken to its owner. If you have Barbs, heal 3 HP. | When an enemy trap activates: deal 8 damage to its owner and apply 2 Shaken to its owner. If you have Barbs, heal 4 HP. | Gains Opener |  |
| Juniper Deflection | counter (reaction) | Wild | rare | 1 | Counter (a trap or Reaction): gain 4 Guard and gain 1 Barbs. If its owner is below half HP, apply 2 Shaken to its owner. | Counter (a trap or Reaction): gain 5 Guard and gain 2 Barbs. If its owner is below half HP, apply 3 Shaken to its owner. | Gains Opener |  |
| Dewy Aegis | skill | Wild | common | 2 | Gain 7 Guard. If you are below half HP, gain 5 Barbs. | Gain 9 Guard. If you are below half HP, gain 7 Barbs. | Costs 1 less |  |
| Pinecone Net | reaction (skill) | Wild | common | 1 | When an enemy uses a non-attack: gain 5 Guard. If there are 2+ enemies, heal 4 HP. | When an enemy uses a non-attack: gain 7 Guard. If there are 2+ enemies, heal 5 HP. | Gains Opener |  |
| Acorn Comeback | counter (reaction) | Wild | rare | 0 | Counter (a trap or Reaction): gain 1 Barbs. If its owner is below half HP, gain 3 Guard for each enemy. | Counter (a trap or Reaction): gain 2 Barbs. If its owner is below half HP, gain 4 Guard for each enemy. | Gains Opener |  |
| Lichen Lunge | attack | Wild | uncommon | 2 | Deal 7 damage. Heal 2 HP. If you are below half HP, next turn, gain 10 Guard. | Deal 9 damage. Heal 3 HP. If you are below half HP, next turn, gain 13 Guard. | Costs 1 less |  |
| Evergreen Mantra | skill | Wild | rare | 1 | Gain 3 Guard for each enemy. If you are below half HP, apply 3 Shaken. | Gain 4 Guard for each enemy. If you are below half HP, apply 4 Shaken. | Gains Palm |  |
| Pinecone Spring | reaction (attack) | Wild | uncommon | 0 | When attacked: gain 2 Guard for each enemy. If you have Barbs, heal 2 HP. | When attacked: gain 3 Guard for each enemy. If you have Barbs, heal 3 HP. | Gains Opener |  |
| Rosethorn Reversal | counter (attack) | Wild | rare | 0 | Counter (an attack): next turn, gain 4 Guard. If the attacker is below half HP, gain 2 Barbs. | Counter (an attack): next turn, gain 5 Guard. If the attacker is below half HP, gain 3 Barbs. | Gains Opener |  |
| Lichen Trick | skill | Wild | common | 2 | Gain 7 Guard. If you are below half HP, heal 7 HP. | Gain 9 Guard. If you are below half HP, heal 9 HP. | Costs 1 less |  |
| Orchard Onslaught | attack | Wild | uncommon | 2 | Deal 7 damage. Next turn, gain 4 Guard. If you are below half HP, gain 3 Barbs. | Deal 9 damage. Next turn, gain 5 Guard. If you are below half HP, gain 4 Barbs. | Costs 1 less |  |
| Evergreen Snare | reaction (reaction) | Wild | uncommon | 1 | When an enemy trap activates: deal 5 damage to its owner and gain 1 Guard for each enemy. If you have Barbs, gain 2 Barbs. | When an enemy trap activates: deal 7 damage to its owner and gain 2 Guard for each enemy. If you have Barbs, gain 3 Barbs. | Gains Opener |  |
| Pinecone Parry | counter (any) | Wild | uncommon | 2 | Counter (anything an enemy does): heal 6 HP. If there are 2+ enemies, next turn, gain 13 Guard. | Counter (anything an enemy does): heal 8 HP. If there are 2+ enemies, next turn, gain 17 Guard. | Costs 1 less |  |
| Blackthorn Tactic | skill | Wild | common | 1 | Gain 4 Guard. Chain 2: Gain 2 Barbs. | Gain 5 Guard. Chain 2: Gain 3 Barbs. | Gains Palm |  |
| Willow Catch | reaction (attack) | Wild | uncommon | 1 | When attacked: gain 4 Guard and apply 1 Shaken to the attacker. If the attacker is below half HP, heal 3 HP. | When attacked: gain 5 Guard and apply 2 Shaken to the attacker. If the attacker is below half HP, heal 4 HP. | Gains Opener |  |
| Gnarled Refusal | counter (reaction) | Wild | rare | 1 | Counter (a trap or Reaction): gain 4 Guard and heal 2 HP. If you have Barbs, apply 2 Shaken to its owner. | Counter (a trap or Reaction): gain 5 Guard and heal 3 HP. If you have Barbs, apply 3 Shaken to its owner. | Gains Opener |  |
| Wildroot Rite | skill | Wild | rare | 0 | Next turn, gain 3 Guard. If there are 2+ enemies, gain 1 Barbs. | Next turn, gain 4 Guard. If there are 2+ enemies, gain 2 Barbs. | Gains Palm |  |
| Wildroot Ambush | reaction (reaction) | Wild | uncommon | 1 | When an enemy trap activates: next turn, gain 6 Guard. If you are below half HP, apply 3 Shaken to its owner. | When an enemy trap activates: next turn, gain 8 Guard. If you are below half HP, apply 4 Shaken to its owner. | Gains Opener |  |
| Hedgerow Ritual | skill | Wild | uncommon | 1 | Gain 2 Barbs. If the target is below half HP, next turn, gain 6 Guard. | Gain 3 Barbs. If the target is below half HP, next turn, gain 8 Guard. | Gains Palm |  |
| Willow Retaliation | counter (skill) | Wild | common | 1 | Counter (a non-attack): gain 4 Guard. If there are 2+ enemies, gain 2 Barbs. | Counter (a non-attack): gain 5 Guard. If there are 2+ enemies, gain 3 Barbs. | Gains Opener |  |
| Willow Hook | attack | Wild | rare | 3 | Deal 12 damage. Gain 2 Barbs. Chain 2: Heal 7 HP. | Deal 16 damage. Gain 3 Barbs. Chain 2: Heal 9 HP. | Costs 1 less |  |
| Willow Ward | skill | Wild | uncommon | 1 | Apply 2 Shaken. If there are 2+ enemies, gain 2 Barbs. | Apply 3 Shaken. If there are 2+ enemies, gain 3 Barbs. | Gains Palm |  |
| Canopy Rebuke | counter (reaction) | Wild | common | 1 | Counter (a trap or Reaction): gain 4 Guard. If you are below half HP, gain 3 Barbs. | Counter (a trap or Reaction): gain 5 Guard. If you are below half HP, gain 4 Barbs. | Gains Opener |  |
| Willow Snare | reaction (reaction) | Wild | uncommon | 1 | When an enemy trap activates: deal 5 damage to its owner and apply 1 Shaken to its owner. If you have Barbs, gain 2 Barbs. | When an enemy trap activates: deal 7 damage to its owner and apply 2 Shaken to its owner. If you have Barbs, gain 3 Barbs. | Gains Opener |  |
| Meadow Canticle | skill | Wild | rare | 1 | Gain 3 Guard for each enemy. If there are 2+ enemies, heal 4 HP. | Gain 4 Guard for each enemy. If there are 2+ enemies, heal 5 HP. | Gains Palm |  |
| Juniper Spike | attack | Wild | rare | 2 | Deal 4 damage twice. Heal 3 HP. If you have Barbs, gain 3 Barbs. | Deal 5 damage twice. Heal 4 HP. If you have Barbs, gain 4 Barbs. | Costs 1 less |  |
| Pinecone Focus | skill | Wild | rare | 0 | Gain 2 Guard for each enemy. If you have Barbs, apply 1 Shaken. | Gain 3 Guard for each enemy. If you have Barbs, apply 2 Shaken. | Gains Palm |  |
| Lichen Catch | reaction (attack) | Wild | common | 1 | When attacked: deal 6 damage to the attacker. If the attacker is below half HP, apply 3 Shaken to the attacker. | When attacked: deal 8 damage to the attacker. If the attacker is below half HP, apply 4 Shaken to the attacker. | Gains Opener |  |
| Dewy Return | counter (reaction) | Wild | rare | 0 | Counter (a trap or Reaction): heal 2 HP. If you have Barbs, apply 1 Shaken to its owner. | Counter (a trap or Reaction): heal 3 HP. If you have Barbs, apply 2 Shaken to its owner. | Gains Opener |  |
| Juniper Mantle | skill | Wild | rare | 1 | Next turn, gain 5 Guard. If the target is below half HP, apply 3 Shaken. | Next turn, gain 7 Guard. If the target is below half HP, apply 4 Shaken. | Gains Palm |  |
| Juniper Ambush | reaction (reaction) | Wild | rare | 1 | When an enemy trap activates: deal 6 damage to its owner and heal 2 HP. If there are 2+ enemies, next turn, gain 6 Guard. | When an enemy trap activates: deal 8 damage to its owner and heal 3 HP. If there are 2+ enemies, next turn, gain 8 Guard. | Gains Opener |  |
| Acorn Focus | skill | Wild | uncommon | 2 | Apply 3 Shaken. If you are below half HP, next turn, gain 14 Guard. | Apply 4 Shaken. If you are below half HP, next turn, gain 19 Guard. | Costs 1 less |  |
| Evergreen Riposte | counter (attack) | Wild | uncommon | 0 | Counter (an attack): gain 1 Barbs. If you have Guard, heal 2 HP. | Counter (an attack): gain 2 Barbs. If you have Guard, heal 3 HP. | Gains Opener |  |
| Rosethorn Volley | attack | Wild | uncommon | 1 | Deal 4 damage. Gain 1 Barbs. Chain 2: Apply 1 Shaken. | Deal 5 damage. Gain 2 Barbs. Chain 2: Apply 2 Shaken. | Gains Palm |  |
| Acorn Recital | skill | Wild | rare | 2 | Gain 5 Guard for each enemy. If the target is below half HP, gain 5 Barbs. | Gain 7 Guard for each enemy. If the target is below half HP, gain 7 Barbs. | Costs 1 less |  |
| Yew Tripline | reaction (reaction) | Wild | uncommon | 1 | When an enemy trap activates: apply 2 Shaken to its owner. If its owner is below half HP, gain 3 Barbs. | When an enemy trap activates: apply 3 Shaken to its owner. If its owner is below half HP, gain 4 Barbs. | Gains Opener |  |
| Gnarled Jab | attack | Wild | rare | 1 | Deal 4 damage. Gain 1 Guard for each enemy. If there are 2+ enemies, gain 2 Barbs. | Deal 5 damage. Gain 2 Guard for each enemy. If there are 2+ enemies, gain 3 Barbs. | Gains Palm |  |
| Rosethorn Tactic | skill | Wild | rare | 1 | Gain 3 Guard for each enemy. Chain 2: Gain 2 Barbs. | Gain 4 Guard for each enemy. Chain 2: Gain 3 Barbs. | Gains Palm |  |
| Acorn Glyph | reaction (attack) | Wild | uncommon | 0 | When attacked: apply 1 Shaken to the attacker. If the attacker is below half HP, gain 2 Barbs. | When attacked: apply 2 Shaken to the attacker. If the attacker is below half HP, gain 3 Barbs. | Gains Opener |  |
| Yew Deflection | counter (attack) | Wild | rare | 0 | Counter (an attack): gain 1 Barbs. If there are 2+ enemies, apply 2 Shaken to the attacker. | Counter (an attack): gain 2 Barbs. If there are 2+ enemies, apply 3 Shaken to the attacker. | Gains Opener |  |
| Gnarled Sweep | attack | Wild | rare | 2 | Deal 5 damage to ALL enemies. Next turn, gain 5 Guard. If the target is below half HP, gain 3 Barbs. | Deal 7 damage to ALL enemies. Next turn, gain 7 Guard. If the target is below half HP, gain 4 Barbs. | Costs 1 less |  |
| Wildroot Recital | skill | Wild | rare | 1 | Heal 3 HP. If the target is below half HP, next turn, gain 8 Guard. | Heal 4 HP. If the target is below half HP, next turn, gain 11 Guard. | Gains Palm |  |
| Canopy Jaw | reaction (attack) | Wild | uncommon | 0 | When attacked: gain 2 Guard for each enemy. If you have Barbs, gain 1 Barbs. | When attacked: gain 3 Guard for each enemy. If you have Barbs, gain 2 Barbs. | Gains Opener |  |
| Blackthorn Return | counter (any) | Wild | uncommon | 2 | Counter (anything an enemy does): gain 5 Guard for each enemy. If you have Barbs, gain 3 Barbs. | Counter (anything an enemy does): gain 7 Guard for each enemy. If you have Barbs, gain 4 Barbs. | Costs 1 less |  |
| Blackthorn Gesture | skill | Wild | uncommon | 2 | Apply 3 Shaken. If you have Barbs, heal 5 HP. | Apply 4 Shaken. If you have Barbs, heal 7 HP. | Costs 1 less |  |
| Dewy Lunge | attack | Wild | common | 2 | Deal 4 damage twice. If there are 2+ enemies, gain 5 Guard for each enemy. | Deal 5 damage twice. If there are 2+ enemies, gain 7 Guard for each enemy. | Costs 1 less |  |
| Meadow Coil | reaction (reaction) | Wild | uncommon | 1 | When an enemy trap activates: deal 7 damage to its owner. If there are 2+ enemies, gain 4 Guard for each enemy. | When an enemy trap activates: deal 9 damage to its owner. If there are 2+ enemies, gain 5 Guard for each enemy. | Gains Opener |  |
| Canopy Comeback | counter (attack) | Wild | common | 1 | Counter (an attack): gain 4 Guard. If there are 2+ enemies, gain 2 Barbs. | Counter (an attack): gain 5 Guard. If there are 2+ enemies, gain 3 Barbs. | Gains Opener |  |
| Blackthorn Catch | reaction (attack) | Wild | rare | 1 | When attacked: deal 6 damage to the attacker and heal 2 HP. If there are 2+ enemies, gain 3 Guard for each enemy. | When attacked: deal 8 damage to the attacker and heal 3 HP. If there are 2+ enemies, gain 4 Guard for each enemy. | Gains Opener |  |
| Acorn Gash | attack | Wild | common | 0 | Deal 3 damage. If you have Barbs, gain 1 Guard for each enemy. | Deal 4 damage. If you have Barbs, gain 2 Guard for each enemy. | Gains Palm |  |
| Orchard Trap | reaction (reaction) | Wild | common | 1 | When an enemy trap activates: deal 6 damage to its owner. If you are below half HP, next turn, gain 9 Guard. | When an enemy trap activates: deal 8 damage to its owner. If you are below half HP, next turn, gain 12 Guard. | Gains Opener |  |
| Gnarled Posture | skill | Wild | uncommon | 1 | Gain 2 Barbs. If you have Guard, heal 3 HP. | Gain 3 Barbs. If you have Guard, heal 4 HP. | Gains Palm |  |
| Gnarled Rebuke | counter (attack) | Wild | rare | 0 | Counter (an attack): heal 2 HP. If there are 2+ enemies, apply 2 Shaken to the attacker. | Counter (an attack): heal 3 HP. If there are 2+ enemies, apply 3 Shaken to the attacker. | Gains Opener |  |

## Void cards (171)

| Card | Type | Element | Rarity | Cost | Text | Upgraded (A) | Path B | Unlock |
|---|---|---|---|---|---|---|---|---|
| Hollow Cut | attack ★ | Umbral | starter | 1 | Deal 6 damage. Apply 5 Doom. | Deal 8 damage. Apply 7 Doom. | Gains Palm |  |
| Bone Toll | reaction (attack) ★ | Umbral | starter | 1 | When attacked: deal 5 damage to the attacker and apply 5 Doom. | When attacked: deal 7 damage to the attacker and apply 7 Doom. | Gains Opener |  |
| Shatter Seal | skill ★ | Umbral | common | 0 | Disrupt 1 (destroy enemy traps). Draw 1 card. | Disrupt 3 (destroy enemy traps). Draw 1 card. | Gains Palm |  |
| Rend | attack ★ | Umbral | common | 1 | Deal 6 damage. Apply 2 Exposed. | Deal 8 damage. Apply 3 Exposed. | Gains Palm |  |
| Blood Price | skill ★ | Umbral | common | 0 | Lose 3 HP. Gain 1 energy. | Lose 3 HP. Gain 2 energy. | Gains Palm |  |
| Grave Snare | reaction (attack) ★ | Umbral | common | 0 | When attacked: apply 5 Doom to the attacker. | When attacked: apply 8 Doom to the attacker. | Gains Opener |  |
| Soul Siphon | attack ★ | Umbral | common | 1 | Deal 6 damage. Heal 3 HP. | Deal 8 damage. Heal 4 HP. | Gains Palm |  |
| Bone Shield | skill ★ | Umbral | common | 1 | Lose 2 HP. Gain 11 Guard. | Lose 2 HP. Gain 15 Guard. | Gains Palm |  |
| Consume | attack ★ | Umbral | common | 1 | Fold a random card in your hand. Deal 9 damage to ALL enemies. | Fold a random card in your hand. Deal 12 damage to ALL enemies. | Gains Palm |  |
| Offering | skill ★ | Umbral | uncommon | 1 | Sacrifice a set Reaction: gain 2 energy and draw 2. Otherwise draw 1. | Sacrifice a set Reaction: gain 2 energy and draw 3. Otherwise draw 1. | Gains Palm |  |
| Void Lance | attack ★ | Umbral | uncommon | 2 | Sacrifice a set Reaction to deal double. Deal 12 damage. | Sacrifice a set Reaction to deal double. Deal 16 damage. | Costs 1 less |  |
| Creeping End | skill ★ | Umbral | uncommon | 1 | Apply 9 Doom. | Apply 13 Doom. | Gains Palm |  |
| Null Ward | reaction (skill) ★ | Umbral | uncommon | 1→0 | When an enemy uses a non-attack: Negate it. Lose 2 HP. | When an enemy uses a non-attack: Negate it. Lose 2 HP. | Gains Opener |  |
| Abyss Gaze | skill ★ | Umbral | uncommon | 1 | Apply 1 Exposed to ALL enemies. Disrupt 1. | Apply 2 Exposed to ALL enemies. Disrupt 1. | Gains Palm |  |
| Grave Harvest | power ★ | Umbral | rare | 1 | Whenever you Sacrifice or Fold a card, apply 3 Doom to ALL enemies. | Whenever you Sacrifice or Fold a card, apply 5 Doom to ALL enemies. | Gains Opener |  |
| Final Hour | skill ★ | Umbral | rare | 1 | Double the target's Doom. Fold. | Double the target's Doom. | Gains Palm |  |
| Soul Rend | attack ★ | Umbral | rare | 2 | Sacrifice ALL set Reactions. Deal 10 damage to ALL enemies, +8 per Reaction sacrificed. | Sacrifice ALL set Reactions. Deal 14 damage to ALL enemies, +10 per Reaction sacrificed. | Costs 1 less | L5 |
| Ossuary Ward | reaction (attack) ★ | Umbral | common | 1 | When attacked: gain 7 Guard and apply 4 Doom to the attacker. | When attacked: gain 10 Guard and apply 6 Doom to the attacker. | Gains Opener |  |
| Hollow Echo | reaction (reaction) ★ | Umbral | common | 0 | When an enemy trap activates: apply 5 Doom to its owner and gain 4 Guard. | When an enemy trap activates: apply 8 Doom to its owner and gain 6 Guard. | Gains Opener |  |
| Grim Tithe | skill ★ | Umbral | common | 1 | Gain 7 Guard. Sacrifice a set Reaction to also apply 6 Doom to ALL enemies. | Gain 10 Guard. Sacrifice a set Reaction to also apply 8 Doom to ALL enemies. | Gains Palm |  |
| Death Knell | attack ★ | Umbral | uncommon | 1 | Deal 7 damage. If the target's Doom is at least half its HP, deal 10 more. | Deal 9 damage. If the target's Doom is at least half its HP, deal 14 more. | Gains Palm |  |
| Soul Lantern | power ★ | Umbral | uncommon | 1 | At the start of your turn, apply 3 Doom to ALL enemies. | At the start of your turn, apply 5 Doom to ALL enemies. | Gains Opener |  |
| Oblivion | skill ★ | Umbral | legendary | 2 | Apply 10 Doom to ALL enemies. Sacrifice a set Reaction to do it again. Fold. | Apply 14 Doom to ALL enemies. Sacrifice a set Reaction to do it again. Fold. | No longer Folds |  |
| Requiem Bell | reaction (reaction) ★ | Umbral | legendary | 0 | When an enemy trap activates: Negate it and apply 8 Doom to its owner. | When an enemy trap activates: Negate it and apply 12 Doom to its owner. | Gains Opener |  |
| Last Rites | skill ★ | Umbral | uncommon | 1 | Apply 6 Doom to ALL enemies. Lose 3 HP. | Apply 9 Doom to ALL enemies. Lose 3 HP. | Gains Palm |  |
| Grave Robber | attack ★ | Umbral | common | 1 | Deal 6 damage. Steal 1. | Deal 9 damage. Steal 1. | Gains Palm |  |
| Soul Fracture | skill ★ | Umbral | rare | 0 | Fold your hand. Apply 4 Doom to ALL enemies for each card folded. Fold. | Fold your hand. Apply 5 Doom to ALL enemies for each card folded. Fold. | No longer Folds |  |
| Gathering Dark | reaction (skill) ★ | Umbral | common | 1 | Prime. When an enemy uses a non-attack: apply 4 Doom to it, +3 per Prime. | Prime. When an enemy uses a non-attack: apply 6 Doom to it, +4 per Prime. | Gains Opener |  |
| Eclipse Rite | skill ★ | Umbral | uncommon | 1 | Apply 4 Doom to ALL enemies. Converge 3: apply 8 instead. | Apply 6 Doom to ALL enemies. Converge 3: apply 11 instead. | Gains Palm |  |
| Null Retort | counter (reaction) ★ | Umbral | common | 1→0 | Counter (a trap or Reaction): Negate it. Apply 5 Doom to its owner. | Counter (a trap or Reaction): Negate it. Apply 6 Doom to its owner. | Gains Opener |  |
| Abyssal Reply | counter (attack) ★ | Umbral | common | 1 | Counter (an attack): apply 2 Exposed and 6 Doom to the attacker. | Counter (an attack): apply 2 Exposed and 10 Doom to the attacker. | Gains Opener |  |
| Void Swallow | counter (any) ★ | Umbral | rare | 1 | Counter (anything an enemy does): Negate it. Sacrifice a set Reaction; if you can't, lose 4 HP. | Counter (anything an enemy does): Negate it. Sacrifice a set Reaction; if you can't, lose 2 HP. | Gains Opener |  |
| Nether Heart | power | Umbral | uncommon | 1 | At the end of your turn, apply 4 Doom to the enemy with the most HP. | At the end of your turn, apply 5 Doom to the enemy with the most HP. | Gains Opener |  |
| Dread Dominion | power | Umbral | rare | 1 | Whenever a chain of 2+ links resolves, apply 3 Doom to ALL enemies. | Whenever a chain of 2+ links resolves, apply 4 Doom to ALL enemies. | Gains Opener |  |
| Null Cut | attack | Umbral | common | 3 | Deal 13 damage. Apply 6 Doom to ALL enemies. | Deal 17 damage. Apply 8 Doom to ALL enemies. | Costs 1 less |  |
| Silent Pit | reaction (attack) | Umbral | common | 0 | When attacked: deal 4 damage to each enemy with Doom. | When attacked: deal 5 damage to each enemy with Doom. | Gains Opener |  |
| Jinxed Lunge | attack | Umbral | common | 3 | Deal 13 damage. Gain 6 Guard. | Deal 17 damage. Gain 8 Guard. | Costs 1 less |  |
| Severed Trap | reaction (attack) | Umbral | uncommon | 1 | When attacked: gain 5 Guard and Disrupt 1. | When attacked: gain 7 Guard and Disrupt 1. | Gains Opener |  |
| Eclipsed Shroud | skill | Umbral | common | 0 | Apply 1 Exposed. | Apply 2 Exposed. | Gains Palm |  |
| Hollow Rune | reaction (skill) | Umbral | uncommon | 1 | When an enemy uses a non-attack: gain 5 Guard and Disrupt 1. | When an enemy uses a non-attack: gain 7 Guard and Disrupt 1. | Gains Opener |  |
| Bleak Focus | skill | Umbral | common | 1 | Apply 6 Doom to ALL enemies. | Apply 8 Doom to ALL enemies. | Gains Palm |  |
| Silent Swipe | attack | Umbral | common | 2 | Deal 4 damage twice. Apply 2 Exposed. | Deal 5 damage twice. Apply 3 Exposed. | Costs 1 less |  |
| Starless Mirror | reaction (attack) | Umbral | uncommon | 1 | When attacked: gain 5 Guard and apply 4 Doom to ALL enemies. | When attacked: gain 7 Guard and apply 5 Doom to ALL enemies. | Gains Opener |  |
| Starless Smite | attack | Umbral | common | 2 | Deal 5 damage twice. Disrupt 1. | Deal 7 damage twice. Disrupt 1. | Costs 1 less |  |
| Nether Sigil | skill | Umbral | uncommon | 1 | Gain 4 Guard. Apply 4 Doom. | Gain 5 Guard. Apply 5 Doom. | Gains Palm |  |
| Null Coil | reaction (skill) | Umbral | common | 1 | When an enemy uses a non-attack: gain 4 Guard and apply 4 Doom to ALL enemies. | When an enemy uses a non-attack: gain 5 Guard and apply 5 Doom to ALL enemies. | Gains Opener |  |
| Dread Veil | skill | Umbral | common | 0 | Apply 5 Doom. | Apply 7 Doom. | Gains Palm |  |
| Dread Thrust | attack | Umbral | uncommon | 1 | Deal 5 damage. Apply 3 Doom to ALL enemies. | Deal 7 damage. Apply 4 Doom to ALL enemies. | Gains Palm |  |
| Nether Barrage | attack | Umbral | common | 1 | Deal 2 damage to a random enemy 3 times. Apply 2 Doom to ALL enemies. | Deal 3 damage to a random enemy 3 times. Apply 3 Doom to ALL enemies. | Gains Palm |  |
| Silent Volley | attack | Umbral | uncommon | 2 | Deal 5 damage twice. Apply 7 Doom. | Deal 7 damage twice. Apply 9 Doom. | Costs 1 less |  |
| Gloom Tripwire | reaction (attack) | Umbral | common | 0 | When attacked: gain 4 Guard. | When attacked: gain 5 Guard. | Gains Opener |  |
| Silent Riposte | counter (reaction) | Umbral | common | 1 | Counter (a trap or Reaction): Negate it and apply 2 Doom to ALL enemies. | Counter (a trap or Reaction): Negate it and apply 3 Doom to ALL enemies. | Gains Opener |  |
| Severed Thrust | attack | Umbral | uncommon | 3 | Deal 18 damage. Disrupt 1. | Deal 24 damage. Disrupt 1. | Costs 1 less |  |
| Jinxed Seal | reaction (attack) | Umbral | common | 0 | When attacked: apply 2 Exposed to the attacker. | When attacked: apply 3 Exposed to the attacker. | Gains Opener |  |
| Hollow Strike | attack | Umbral | uncommon | 2 | Deal 10 damage. Apply 4 Doom to ALL enemies. | Deal 13 damage. Apply 5 Doom to ALL enemies. | Costs 1 less |  |
| Starless Lunge | attack | Umbral | common | 2 | Deal 9 damage. Gain 4 Guard. | Deal 12 damage. Gain 5 Guard. | Costs 1 less |  |
| Empty Snare | reaction (attack) | Umbral | rare | 1 | When attacked: gain 5 Guard and apply 1 Exposed to the attacker and apply 3 Doom to the attacker. | When attacked: gain 7 Guard and apply 2 Exposed to the attacker and apply 4 Doom to the attacker. | Gains Opener |  |
| Jinxed Rebuff | counter (attack) | Umbral | common | 1 | Counter (an attack): gain 4 Guard and apply 1 Exposed to the attacker. | Counter (an attack): gain 5 Guard and apply 2 Exposed to the attacker. | Gains Opener |  |
| Abyssal Rune | reaction (skill) | Umbral | uncommon | 1 | When an enemy uses a non-attack: gain 4 Guard and apply 2 Exposed to it. | When an enemy uses a non-attack: gain 5 Guard and apply 3 Exposed to it. | Gains Opener |  |
| Voidborn Blow | attack | Umbral | common | 2 | Deal 5 damage to ALL enemies. Apply 5 Doom to ALL enemies. | Deal 7 damage to ALL enemies. Apply 7 Doom to ALL enemies. | Costs 1 less |  |
| Starless Rite | skill | Umbral | uncommon | 2 | Gain 7 Guard. Apply 6 Doom to ALL enemies. | Gain 9 Guard. Apply 8 Doom to ALL enemies. | Costs 1 less |  |
| Bleak Trap | reaction (skill) | Umbral | rare | 1 | When an enemy uses a non-attack: Negate it and apply 3 Doom to it and apply 1 Exposed to it. | When an enemy uses a non-attack: Negate it and apply 4 Doom to it and apply 2 Exposed to it. | Gains Opener |  |
| Hollow Aegis | skill | Umbral | common | 0 | Apply 3 Doom to ALL enemies. | Apply 4 Doom to ALL enemies. | Gains Palm |  |
| Doomsday Bet | attack ⧉ (gilt) | Umbral | uncommon | 1 | Deal 4 damage. ☀ Apply 5 Doom. ☾ Apply 1 Exposed. Flip your Fate Coin. | Deal 5 damage. ☀ Apply 7 Doom. ☾ Apply 2 Exposed. Flip your Fate Coin. | Gains Palm |  |
| Null Dividend | skill ⧉ (gilt) | Umbral | uncommon | 1 | Raise your Ante by 3. If the target has Doom, draw 1 card. | Raise your Ante by 4. If the target has Doom, draw 1 card. | Gains Palm |  |
| Black Chip | counter (reaction) ⧉ (gilt) | Umbral | rare | 1 | Counter (a trap or Reaction): Disrupt 1 and raise your Ante by 5. | Counter (a trap or Reaction): Disrupt 1 and raise your Ante by 7. | Gains Opener |  |
| Hollow Mirror | reaction (reaction) ⧉ (glass) | Umbral | uncommon | 1 | When an enemy trap activates: Steal 1 and apply 5 Doom to its owner. | When an enemy trap activates: Steal 1 and apply 7 Doom to its owner. | Gains Opener |  |
| Void Shard | attack ⧉ (glass) | Umbral | uncommon | 0 | Deal 3 damage. If you hold a Glint, apply 5 Doom. | Deal 4 damage. If you hold a Glint, apply 7 Doom. | Gains Palm |  |
| Abyssal Lens | skill ⧉ (glass) | Umbral | rare | 2 | Draw 1 card. Apply 8 Doom to ALL enemies. If you have a stolen trap set, double the target's Doom. | Draw 1 card. Apply 11 Doom to ALL enemies. If you have a stolen trap set, double the target's Doom. | Costs 1 less |  |
| Tolling Knell | attack ⧉ (grave) | Umbral | uncommon | 2 | Deal 10 damage. If your Crypt holds 3+ cards, apply 9 Doom to ALL enemies. | Deal 13 damage. If your Crypt holds 3+ cards, apply 12 Doom to ALL enemies. | Costs 1 less |  |
| Restless Doom | reaction (skill) ⧉ (grave) | Umbral | uncommon | 1 | When an enemy uses a non-attack: apply 9 Doom to it and Bury 2. | When an enemy uses a non-attack: apply 12 Doom to it and Bury 2. | Gains Opener |  |
| Final Rest | skill ⧉ (grave) | Umbral | rare | 2→1 | Exhume 1. Double the target's Doom. | Exhume 1. Double the target's Doom. | Gains Palm |  |
| Doom Verdict | attack ⧉ (dawn) | Umbral | uncommon | 1 | Deal 5 damage. If you have Verdict, apply 6 Doom. | Deal 7 damage. If you have Verdict, apply 8 Doom. | Gains Palm |  |
| Null Writ | counter (skill) ⧉ (dawn) | Umbral | uncommon | 1 | Counter (a non-attack): Negate it and apply 3 Doom to it. | Counter (a non-attack): Negate it and apply 4 Doom to it. | Gains Opener |  |
| Final Absolution | skill ⧉ (dawn) | Umbral | rare | 1 | Gain 1 Verdict. If the target has Doom, heal 6 HP. | Gain 1 Verdict. If the target has Doom, heal 8 HP. | Gains Palm |  |
| Dark Current | attack ⧉ (storm) | Umbral | uncommon | 1 | Deal 4 damage. Apply 2 Shock. If the target has Exposed, gain 1 Charge. | Deal 5 damage. Apply 3 Shock. If the target has Exposed, gain 2 Charge. | Gains Palm |  |
| Static Void | reaction (reaction) ⧉ (storm) | Umbral | uncommon | 1 | When an enemy trap activates: apply 8 Doom to its owner and apply 2 Shock to ALL enemies. | When an enemy trap activates: apply 11 Doom to its owner and apply 3 Shock to ALL enemies. | Gains Opener |  |
| Event Horizon | attack ⧉ (storm) | Umbral | rare | 2 | Deal 6 damage to ALL enemies. Apply 5 Doom to ALL enemies. If the target has Shock, double the target's Doom. | Deal 8 damage to ALL enemies. Apply 7 Doom to ALL enemies. If the target has Shock, double the target's Doom. | Costs 1 less |  |
| Zero Point | attack ⧉ (rime) | Umbral | uncommon | 1 | Deal 4 damage. Apply 1 Chill. If the target is Frozen, double the target's Doom. | Deal 5 damage. Apply 2 Chill. If the target is Frozen, double the target's Doom. | Gains Palm |  |
| Cold Void | skill ⧉ (rime) | Umbral | uncommon | 1 | Apply 2 Chill to ALL enemies. Apply 3 Doom to ALL enemies. | Apply 3 Chill to ALL enemies. Apply 4 Doom to ALL enemies. | Gains Palm |  |
| Black Ice | reaction (attack) ⧉ (rime) | Umbral | rare | 1 | When attacked: gain 5 Guard and apply 2 Chill to the attacker. If the attacker is Frozen, apply 13 Doom to the attacker. | When attacked: gain 7 Guard and apply 3 Chill to the attacker. If the attacker is Frozen, apply 17 Doom to the attacker. | Gains Opener |  |
| Carrion Crow | skill ⧉ (beast) | Umbral | uncommon | 1 | Summon Hawk 1. Apply 4 Doom. | Summon Hawk 2. Apply 5 Doom. | Gains Palm |  |
| Dire Wolf | skill ⧉ (beast) | Umbral | uncommon | 2 | Summon Wolf 2. Apply 5 Doom to ALL enemies. | Summon Wolf 3. Apply 7 Doom to ALL enemies. | Costs 1 less |  |
| Hungry Dark | attack ⧉ (beast) | Umbral | rare | 1 | Deal 4 damage. Apply 1 Exposed. If you have a companion, apply 5 Doom. | Deal 5 damage. Apply 2 Exposed. If you have a companion, apply 7 Doom. | Gains Palm |  |
| Sinkhole | attack ⧉ (stone) | Umbral | uncommon | 2 | Deal 7 damage. Apply 3 Tremor. If the target has Exposed, double the target's Tremor. | Deal 9 damage. Apply 4 Tremor. If the target has Exposed, double the target's Tremor. | Costs 1 less |  |
| Gravity Well | skill ⧉ (stone) | Umbral | uncommon | 2 | Apply 4 Tremor to ALL enemies. Apply 5 Doom to ALL enemies. | Apply 5 Tremor to ALL enemies. Apply 7 Doom to ALL enemies. | Costs 1 less |  |
| Crushing Null | reaction (attack) ⧉ (stone) | Umbral | rare | 1 | When attacked: gain 5 Guard and gain 2 Fortify. If the attacker has Tremor, apply 7 Doom to the attacker. | When attacked: gain 7 Guard and gain 3 Fortify. If the attacker has Tremor, apply 9 Doom to the attacker. | Gains Opener |  |
| Entropic Flask | attack ⧉ (aether) | Umbral | uncommon | 1 | Deal 4 damage. Apply 1 Exposed. If you are attuned to the element that beats the target, apply 5 Doom. | Deal 5 damage. Apply 2 Exposed. If you are attuned to the element that beats the target, apply 7 Doom. | Gains Palm |  |
| Null Reagent | skill ⧉ (aether) | Umbral | uncommon | 0 | Attune to the element that beats the target. Apply 3 Doom. | Attune to the element that beats the target. Apply 4 Doom. | Gains Palm |  |
| Dissolution | skill ⧉ (aether) | Umbral | rare | 1 | Apply 1 Exposed to ALL enemies. If the target has Doom, double the target's Doom. | Apply 2 Exposed to ALL enemies. If the target has Doom, double the target's Doom. | Gains Palm |  |
| Umbral Shroud | skill ⧉ (dusk) | Umbral | uncommon | 2 | Gain 1 Veil. Apply 10 Doom. | Gain 1 Veil. Apply 13 Doom. | Costs 1 less |  |
| Mark of Ending | attack ⧉ (dusk) | Umbral | rare | 2 | Deal 9 damage. Apply 7 Doom. If the target has Mark, double the target's Doom. | Deal 12 damage. Apply 9 Doom. If the target has Mark, double the target's Doom. | Costs 1 less |  |
| Starless Maw | attack 🦋 | Umbral | evolved | 1 | Deal 5 damage. Apply 4 Doom. If the target is below half HP, double the target's Doom. | Deal 7 damage. Apply 5 Doom. If the target is below half HP, double the target's Doom. | Gains Palm |  |
| Void Mote | attack 🦋 | Umbral | common | 1 | Deal 4 damage. Apply 3 Doom. Evolve 4 (Starless Maw). | Deal 5 damage. Apply 4 Doom. Evolve 4 (Starless Maw). | Gains Palm |  |
| Death Chorus | skill 🦋 | Umbral | evolved | 0 | Apply 3 Doom to ALL enemies. If the target is below half HP, apply 7 Doom. | Apply 4 Doom to ALL enemies. If the target is below half HP, apply 9 Doom. | Gains Palm |  |
| Whisper | skill 🦋 | Umbral | common | 0 | Apply 5 Doom. Evolve 3 (Death Chorus). | Apply 7 Doom. Evolve 3 (Death Chorus). | Gains Palm |  |
| Rift Sentinel | reaction (reaction) 🦋 | Umbral | evolved | 1 | When an enemy trap activates: deal 7 damage to its owner and Disrupt 2. | When an enemy trap activates: deal 9 damage to its owner and Disrupt 2. | Gains Opener |  |
| Rift Ward | reaction (reaction) 🦋 | Umbral | common | 1 | When an enemy trap activates: deal 5 damage to its owner and Disrupt 1. Evolve 4 (Rift Sentinel). | When an enemy trap activates: deal 7 damage to its owner and Disrupt 1. Evolve 4 (Rift Sentinel). | Gains Opener |  |
| Abyss Bloom | skill 🦋 | Umbral | evolved | 1 | Gain 3 Guard. Apply 1 Exposed to ALL enemies. If the target has Doom, draw 1 card. | Gain 4 Guard. Apply 2 Exposed to ALL enemies. If the target has Doom, draw 1 card. | Gains Palm |  |
| Hollow Seed | skill 🦋 | Umbral | common | 1 | Gain 4 Guard. Apply 1 Exposed. Evolve 4 (Abyss Bloom). | Gain 5 Guard. Apply 2 Exposed. Evolve 4 (Abyss Bloom). | Gains Palm |  |
| Null Archon | counter (reaction) 🦋 | Umbral | evolved | 1 | Counter (a trap or Reaction): Negate it. If its owner is below half HP, apply 11 Doom to ALL enemies. | Counter (a trap or Reaction): Negate it. If its owner is below half HP, apply 15 Doom to ALL enemies. | Gains Opener |  |
| Null Novice | counter (reaction) 🦋 | Umbral | uncommon | 1→0 | Counter (a trap or Reaction): Negate it. Evolve 3 (Null Archon). | Counter (a trap or Reaction): Negate it. Evolve 3 (Null Archon). | Gains Opener |  |
| Black Star | power ★ | Umbral | uncommon | 2 | At the start of your turn, if you are below half HP, apply 23 Doom to ALL enemies. | At the start of your turn, if you are below half HP, apply 24 Doom to ALL enemies. | Costs 1 less |  |
| Null Engine | power ★ | Umbral | rare | 1 | Whenever you play a Counter, apply 5 Doom to a random enemy. | Whenever you play a Counter, apply 6 Doom to a random enemy. | Gains Opener |  |
| Grave Gravity | power ★ | Umbral | uncommon | 1 | Whenever one of your Reactions fires, apply 1 Exposed to a random enemy. | Whenever one of your Reactions fires, apply 2 Exposed to a random enemy. | Gains Opener |  |
| Collapse | power ★ | Umbral | rare | 2 | Whenever a chain of 3+ links resolves, apply 8 Doom to a random enemy. | Whenever a chain of 3+ links resolves, apply 9 Doom to a random enemy. | Costs 1 less |  |
| Blackhole Trance | skill | Umbral | uncommon | 0 | Apply 1 Exposed. If there are 2+ enemies, deal 3 damage to each enemy with Doom. | Apply 2 Exposed. If there are 2+ enemies, deal 4 damage to each enemy with Doom. | Gains Palm |  |
| Annihilating Rune | reaction (attack) | Umbral | rare | 0 | When attacked: deal 3 damage to each enemy with Doom. If there are 2+ enemies, apply 2 Exposed to the attacker. | When attacked: deal 4 damage to each enemy with Doom. If there are 2+ enemies, apply 3 Exposed to the attacker. | Gains Opener |  |
| Unmaking Ritual | skill | Umbral | rare | 1 | Gain 4 Guard. Apply 2 Doom to ALL enemies. If the target has Exposed, apply 1 Exposed to ALL enemies. | Gain 5 Guard. Apply 3 Doom to ALL enemies. If the target has Exposed, apply 2 Exposed to ALL enemies. | Gains Palm |  |
| Wane Tripline | reaction (skill) | Umbral | uncommon | 1 | When an enemy uses a non-attack: gain 3 Guard and Disrupt 1. If there are 2+ enemies, apply 6 Doom to it. | When an enemy uses a non-attack: gain 4 Guard and Disrupt 1. If there are 2+ enemies, apply 8 Doom to it. | Gains Opener |  |
| Hungering Trance | skill | Umbral | rare | 0 | Apply 4 Doom. If the target has Exposed, apply 1 Exposed. | Apply 5 Doom. If the target has Exposed, apply 2 Exposed. | Gains Palm |  |
| Nihil Rejoinder | counter (attack) | Umbral | uncommon | 1 | Counter (an attack): gain 4 Guard and apply 2 Doom to ALL enemies. If the attacker has Exposed, apply 1 Exposed to the attacker. | Counter (an attack): gain 5 Guard and apply 3 Doom to ALL enemies. If the attacker has Exposed, apply 2 Exposed to the attacker. | Gains Opener |  |
| Hungering Slash | attack | Umbral | rare | 2 | Deal 5 damage twice. Apply 5 Doom to ALL enemies. Chain 3: Double the target's Doom. | Deal 7 damage twice. Apply 7 Doom to ALL enemies. Chain 3: Double the target's Doom. | Costs 1 less |  |
| Blackhole Jaw | reaction (skill) | Umbral | uncommon | 1 | When an enemy uses a non-attack: gain 3 Guard and Disrupt 1. Chain 3: Apply 2 Exposed to ALL enemies. | When an enemy uses a non-attack: gain 4 Guard and Disrupt 1. Chain 3: Apply 3 Exposed to ALL enemies. | Gains Opener |  |
| Desolate Ram | attack | Umbral | uncommon | 2 | Deal 12 damage. If the target has Exposed, double the target's Doom. | Deal 16 damage. If the target has Exposed, double the target's Doom. | Costs 1 less |  |
| Shadowless Focus | skill | Umbral | uncommon | 1 | Double the target's Doom. Chain 2: Deal 3 damage to each enemy with Doom. | Double the target's Doom. Chain 2: Deal 4 damage to each enemy with Doom. | Gains Palm |  |
| Quiet Mirror | reaction (attack) | Umbral | rare | 1 | When attacked: deal 6 damage to the attacker and apply 3 Doom to ALL enemies. If the attacker has Exposed, apply 2 Exposed to the attacker. | When attacked: deal 8 damage to the attacker and apply 4 Doom to ALL enemies. If the attacker has Exposed, apply 3 Exposed to the attacker. | Gains Opener |  |
| Ruinous Charm | skill | Umbral | rare | 2 | Gain 7 Guard. Apply 4 Doom to ALL enemies. Chain 2: Apply 2 Exposed to ALL enemies. | Gain 9 Guard. Apply 5 Doom to ALL enemies. Chain 2: Apply 3 Exposed to ALL enemies. | Costs 1 less |  |
| Unmaking Flourish | attack | Umbral | uncommon | 2 | Deal 3 damage twice. Disrupt 1. If the target is below half HP, apply 2 Exposed to ALL enemies. | Deal 4 damage twice. Disrupt 1. If the target is below half HP, apply 3 Exposed to ALL enemies. | Costs 1 less |  |
| Ruinous Shroud | skill | Umbral | common | 2 | Gain 7 Guard. If the target has Doom, apply 2 Exposed to ALL enemies. | Gain 9 Guard. If the target has Doom, apply 3 Exposed to ALL enemies. | Costs 1 less |  |
| Entropic Rend | attack | Umbral | uncommon | 2 | Deal 7 damage. Disrupt 1. If the target has Exposed, apply 6 Doom to ALL enemies. | Deal 9 damage. Disrupt 1. If the target has Exposed, apply 8 Doom to ALL enemies. | Costs 1 less |  |
| Forsaken Trap | reaction (skill) | Umbral | rare | 0 | When an enemy uses a non-attack: Disrupt 1. If it has Doom, deal 4 damage to each enemy with Doom. | When an enemy uses a non-attack: Disrupt 1. If it has Doom, deal 5 damage to each enemy with Doom. | Gains Opener |  |
| Annihilating Stance | skill | Umbral | uncommon | 1 | Gain 4 Guard. If the target is below half HP, apply 2 Exposed. | Gain 5 Guard. If the target is below half HP, apply 3 Exposed. | Gains Palm |  |
| Annihilating Comeback | counter (attack) | Umbral | uncommon | 1 | Counter (an attack): gain 4 Guard and apply 1 Exposed to the attacker. Chain 3: Double the attacker's Doom. | Counter (an attack): gain 5 Guard and apply 2 Exposed to the attacker. Chain 3: Double the attacker's Doom. | Gains Opener |  |
| Entropic Strike | attack | Umbral | common | 2 | Deal 4 damage twice. If the target has Exposed, deal 6 damage to each enemy with Doom. | Deal 5 damage twice. If the target has Exposed, deal 8 damage to each enemy with Doom. | Costs 1 less |  |
| Vacant Drill | skill | Umbral | uncommon | 1 | Gain 3 Guard. Apply 2 Doom to ALL enemies. If the target is below half HP, double the target's Doom. | Gain 4 Guard. Apply 3 Doom to ALL enemies. If the target is below half HP, double the target's Doom. | Gains Palm |  |
| Unmaking Pierce | attack | Umbral | rare | 2 | Deal 8 damage. Apply 2 Exposed. If the target is below half HP, apply 15 Doom. | Deal 11 damage. Apply 3 Exposed. If the target is below half HP, apply 20 Doom. | Costs 1 less |  |
| Hungering Reply | counter (reaction) | Umbral | uncommon | 0 | Counter (a trap or Reaction): apply 4 Doom to its owner. If there are 2+ enemies, deal 3 damage to each enemy with Doom. | Counter (a trap or Reaction): apply 5 Doom to its owner. If there are 2+ enemies, deal 4 damage to each enemy with Doom. | Gains Opener |  |
| Quiet Omen | skill | Umbral | uncommon | 2 | Gain 5 Guard. Double the target's Doom. If there are 2+ enemies, deal 5 damage to each enemy with Doom. | Gain 7 Guard. Double the target's Doom. If there are 2+ enemies, deal 7 damage to each enemy with Doom. | Costs 1 less |  |
| Shadowless Net | reaction (attack) | Umbral | uncommon | 1 | When attacked: gain 4 Guard and deal 2 damage to each enemy with Doom. If the attacker has Doom, Disrupt 1. | When attacked: gain 5 Guard and deal 3 damage to each enemy with Doom. If the attacker has Doom, Disrupt 1. | Gains Opener |  |
| Oblivion Veil | skill | Umbral | uncommon | 1 | Apply 8 Doom. If the target is below half HP, Disrupt 1. | Apply 11 Doom. If the target is below half HP, Disrupt 1. | Gains Palm |  |
| Unmaking Rebuttal | counter (attack) | Umbral | rare | 0 | Counter (an attack): apply 1 Exposed to the attacker. If the attacker has Doom, deal 3 damage to each enemy with Doom. | Counter (an attack): apply 2 Exposed to the attacker. If the attacker has Doom, deal 4 damage to each enemy with Doom. | Gains Opener |  |
| Ruinous Burst | attack | Umbral | uncommon | 1 | Deal 5 damage. If the target has Exposed, apply 6 Doom. | Deal 7 damage. If the target has Exposed, apply 8 Doom. | Gains Palm |  |
| Annihilating Deadfall | reaction (reaction) | Umbral | common | 1 | When an enemy trap activates: deal 6 damage to its owner. If there are 2+ enemies, apply 2 Exposed to its owner. | When an enemy trap activates: deal 8 damage to its owner. If there are 2+ enemies, apply 3 Exposed to its owner. | Gains Opener |  |
| Vacant Onslaught | attack | Umbral | uncommon | 1 | Deal 4 damage. Apply 3 Doom. Chain 3: Deal 5 damage to each enemy with Doom. | Deal 5 damage. Apply 4 Doom. Chain 3: Deal 7 damage to each enemy with Doom. | Gains Palm |  |
| Vacant Gambit | skill | Umbral | uncommon | 0 | Apply 1 Exposed to ALL enemies. If there are 2+ enemies, apply 4 Doom. | Apply 2 Exposed to ALL enemies. If there are 2+ enemies, apply 5 Doom. | Gains Palm |  |
| Unmaking Blow | attack | Umbral | common | 2 | Deal 9 damage. If the target has Exposed, apply 2 Exposed to ALL enemies. | Deal 12 damage. If the target has Exposed, apply 3 Exposed to ALL enemies. | Costs 1 less |  |
| Wane Catch | reaction (attack) | Umbral | uncommon | 1 | When attacked: deal 5 damage to the attacker and apply 1 Exposed to the attacker. If the attacker has Doom, Disrupt 1. | When attacked: deal 7 damage to the attacker and apply 2 Exposed to the attacker. If the attacker has Doom, Disrupt 1. | Gains Opener |  |
| Chasm Rebuttal | counter (attack) | Umbral | rare | 0 | Counter (an attack): Disrupt 1. Chain 3: Apply 10 Doom to the attacker. | Counter (an attack): Disrupt 1. Chain 3: Apply 13 Doom to the attacker. | Gains Opener |  |
| Chasm Jab | attack | Umbral | uncommon | 0 | Deal 3 damage. If there are 2+ enemies, Disrupt 1. | Deal 4 damage. If there are 2+ enemies, Disrupt 1. | Gains Palm |  |
| Entropic Trick | skill | Umbral | rare | 0 | Apply 1 Exposed. If there are 2+ enemies, double the target's Doom. | Apply 2 Exposed. If there are 2+ enemies, double the target's Doom. | Gains Palm |  |
| Wane Swipe | attack | Umbral | uncommon | 2 | Deal 4 damage twice. Apply 4 Doom to ALL enemies. If the target has Exposed, Disrupt 1. | Deal 5 damage twice. Apply 5 Doom to ALL enemies. If the target has Exposed, Disrupt 1. | Costs 1 less |  |
| Nihil Ploy | skill | Umbral | uncommon | 2 | Gain 5 Guard. Double the target's Doom. If the target has Exposed, apply 7 Doom. | Gain 7 Guard. Double the target's Doom. If the target has Exposed, apply 9 Doom. | Costs 1 less |  |
| Hungering Net | reaction (attack) | Umbral | rare | 0 | When attacked: deal 4 damage to each enemy with Doom. Chain 3: Disrupt 1. | When attacked: deal 5 damage to each enemy with Doom. Chain 3: Disrupt 1. | Gains Opener |  |
| Oblivion Crash | attack | Umbral | rare | 1 | Deal 3 damage. Disrupt 1. If there are 2+ enemies, apply 4 Doom to ALL enemies. | Deal 4 damage. Disrupt 1. If there are 2+ enemies, apply 5 Doom to ALL enemies. | Gains Palm |  |
| Annihilating Charm | skill | Umbral | common | 2 | Gain 7 Guard. If there are 2+ enemies, apply 14 Doom. | Gain 9 Guard. If there are 2+ enemies, apply 19 Doom. | Costs 1 less |  |
| Quiet Jaw | reaction (skill) | Umbral | rare | 1 | When an enemy uses a non-attack: gain 5 Guard and apply 3 Doom to ALL enemies. If it has Exposed, deal 4 damage to each enemy with Doom. | When an enemy uses a non-attack: gain 7 Guard and apply 4 Doom to ALL enemies. If it has Exposed, deal 5 damage to each enemy with Doom. | Gains Opener |  |
| Annihilating Blow | attack | Umbral | common | 0 | Deal 3 damage. If there are 2+ enemies, apply 4 Doom. | Deal 4 damage. If there are 2+ enemies, apply 5 Doom. | Gains Palm |  |
| Desolate Retaliation | counter (reaction) | Umbral | rare | 1 | Counter (a trap or Reaction): gain 3 Guard and double its Doom. If its owner has Exposed, apply 3 Doom to ALL enemies. | Counter (a trap or Reaction): gain 4 Guard and double its Doom. If its owner has Exposed, apply 4 Doom to ALL enemies. | Gains Opener |  |
| Wane Flourish | attack | Umbral | common | 2 | Deal 4 damage twice. If the target has Exposed, apply 7 Doom to ALL enemies. | Deal 5 damage twice. If the target has Exposed, apply 9 Doom to ALL enemies. | Costs 1 less |  |
| Blackhole Coil | reaction (reaction) | Umbral | rare | 1 | When an enemy trap activates: deal 5 damage to its owner and Disrupt 1. If its owner has Doom, apply 5 Doom to ALL enemies. | When an enemy trap activates: deal 7 damage to its owner and Disrupt 1. If its owner has Doom, apply 7 Doom to ALL enemies. | Gains Opener |  |
| Entropic Reply | counter (reaction) | Umbral | uncommon | 1 | Counter (a trap or Reaction): gain 4 Guard and apply 1 Exposed to ALL enemies. If its owner is below half HP, Disrupt 1. | Counter (a trap or Reaction): gain 5 Guard and apply 2 Exposed to ALL enemies. If its owner is below half HP, Disrupt 1. | Gains Opener |  |
| Annihilating Rend | attack | Umbral | common | 2 | Deal 9 damage. If the target is below half HP, apply 15 Doom. | Deal 12 damage. If the target is below half HP, apply 20 Doom. | Costs 1 less |  |
| Desolate Shroud | skill | Umbral | uncommon | 1→0 | Disrupt 1. If there are 2+ enemies, double the target's Doom. | Disrupt 1. If there are 2+ enemies, double the target's Doom. | Gains Palm |  |
| Lightless Tripline | reaction (reaction) | Umbral | common | 1 | When an enemy trap activates: deal 6 damage to its owner. Chain 3: Deal 8 damage to each enemy with Doom. | When an enemy trap activates: deal 8 damage to its owner. Chain 3: Deal 11 damage to each enemy with Doom. | Gains Opener |  |
| Chasm Refusal | counter (reaction) | Umbral | uncommon | 1 | Counter (a trap or Reaction): gain 3 Guard and Disrupt 1. Chain 3: Apply 5 Doom to ALL enemies. | Counter (a trap or Reaction): gain 4 Guard and Disrupt 1. Chain 3: Apply 7 Doom to ALL enemies. | Gains Opener |  |
| Chasm Ram | attack | Umbral | common | 0 | Deal 3 damage. If the target is below half HP, apply 3 Doom to ALL enemies. | Deal 4 damage. If the target is below half HP, apply 4 Doom to ALL enemies. | Gains Palm |  |
| Nihil Rune | reaction (attack) | Umbral | common | 1 | When attacked: gain 6 Guard. If the attacker is below half HP, double the attacker's Doom. | When attacked: gain 8 Guard. If the attacker is below half HP, double the attacker's Doom. | Gains Opener |  |
| Blackhole Rebuttal | counter (reaction) | Umbral | common | 1 | Counter (a trap or Reaction): gain 4 Guard. If its owner has Exposed, double its Doom. | Counter (a trap or Reaction): gain 5 Guard. If its owner has Exposed, double its Doom. | Gains Opener |  |
| Forsaken Canticle | skill | Umbral | uncommon | 1 | Gain 4 Guard. If the target is below half HP, apply 6 Doom to ALL enemies. | Gain 5 Guard. If the target is below half HP, apply 8 Doom to ALL enemies. | Gains Palm |  |
| Entropic Seal | reaction (attack) | Umbral | uncommon | 1 | When attacked: deal 7 damage to the attacker. If the attacker has Exposed, apply 2 Exposed to the attacker. | When attacked: deal 9 damage to the attacker. If the attacker has Exposed, apply 3 Exposed to the attacker. | Gains Opener |  |
| Quiet Sunder | attack | Umbral | uncommon | 2 | Deal 3 damage twice. Apply 1 Exposed to ALL enemies. If the target has Doom, deal 5 damage to each enemy with Doom. | Deal 4 damage twice. Apply 2 Exposed to ALL enemies. If the target has Doom, deal 7 damage to each enemy with Doom. | Costs 1 less |  |
| Unmaking Rebuke | counter (skill) | Umbral | uncommon | 1 | Counter (a non-attack): gain 5 Guard. If it is below half HP, apply 7 Doom to ALL enemies. | Counter (a non-attack): gain 7 Guard. If it is below half HP, apply 9 Doom to ALL enemies. | Gains Opener |  |
| Quiet Ward | skill | Umbral | rare | 1 | Gain 4 Guard. Apply 1 Exposed. Chain 2: Apply 4 Doom to ALL enemies. | Gain 5 Guard. Apply 2 Exposed. Chain 2: Apply 5 Doom to ALL enemies. | Gains Palm |  |
| Nihil Rite | skill | Umbral | uncommon | 1 | Gain 3 Guard. Deal 2 damage to each enemy with Doom. Chain 3: Disrupt 1. | Gain 4 Guard. Deal 3 damage to each enemy with Doom. Chain 3: Disrupt 1. | Gains Palm |  |
| Oblivion Bait | reaction (skill) | Umbral | rare | 0 | When an enemy uses a non-attack: deal 3 damage to each enemy with Doom. If there are 2+ enemies, apply 7 Doom to it. | When an enemy uses a non-attack: deal 4 damage to each enemy with Doom. If there are 2+ enemies, apply 9 Doom to it. | Gains Opener |  |
| Entropic Refusal | counter (reaction) | Umbral | common | 1 | Counter (a trap or Reaction): gain 4 Guard. If its owner has Exposed, apply 5 Doom to ALL enemies. | Counter (a trap or Reaction): gain 5 Guard. If its owner has Exposed, apply 7 Doom to ALL enemies. | Gains Opener |  |
| Forsaken Volley | attack | Umbral | uncommon | 2 | Deal 6 damage twice. If the target has Exposed, double the target's Doom. | Deal 8 damage twice. If the target has Exposed, double the target's Doom. | Costs 1 less |  |
| Chasm Deadfall | reaction (attack) | Umbral | uncommon | 0 | When attacked: apply 1 Exposed to the attacker. If there are 2+ enemies, apply 4 Doom to ALL enemies. | When attacked: apply 2 Exposed to the attacker. If there are 2+ enemies, apply 5 Doom to ALL enemies. | Gains Opener |  |
| Desolate Mantra | skill | Umbral | uncommon | 1 | Gain 5 Guard. If the target has Doom, Disrupt 1. | Gain 7 Guard. If the target has Doom, Disrupt 1. | Gains Palm |  |
| Ruinous Tripline | reaction (reaction) | Umbral | common | 1 | When an enemy trap activates: deal 7 damage to its owner. If its owner has Doom, Disrupt 1. | When an enemy trap activates: deal 9 damage to its owner. If its owner has Doom, Disrupt 1. | Gains Opener |  |

## Gilt cards (160)

| Card | Type | Element | Rarity | Cost | Text | Upgraded (A) | Path B | Unlock |
|---|---|---|---|---|---|---|---|---|
| Coin Toss | attack ★ | Radiant | starter | 1 | ☀: Gain 8 Guard. ☾: Deal 8 damage. Flip. | ☀: Gain 11 Guard. ☾: Deal 11 damage. Flip. | Gains Palm |  |
| Hedge | reaction (attack) ★ | Radiant | starter | 1 | When attacked: ☀ gain 10 Guard. ☾ deal 8 damage to the attacker. Flip. | When attacked: ☀ gain 12 Guard. ☾ deal 11 damage to the attacker. Flip. | Gains Opener |  |
| Cash Out | attack ★ | Radiant | starter | 1 | Cash in your Ante: deal 5 damage plus 2× the Ante. | Cash in your Ante: deal 7 damage plus 3× the Ante. | Gains Palm |  |
| Heads Up | attack ★ | Radiant | common | 1 | Deal 6 damage. ☀: deal 5 more. Flip. | Deal 8 damage. ☀: deal 7 more. Flip. | Gains Palm |  |
| Double Down | attack ★ | Radiant | common | 1 | Deal 4 damage twice. ☾: three times. Flip. | Deal 5 damage twice. ☾: three times. Flip. | Gains Palm |  |
| Ante Up | skill ★ | Radiant | common | 0 | Raise your Ante by 3. Draw 1 card. | Raise your Ante by 5. Draw 1 card. | Gains Palm |  |
| Penny Ward | reaction (attack) ★ | Radiant | common | 0 | When attacked: gain 4 Guard and raise your Ante by 2. | When attacked: gain 6 Guard and raise your Ante by 3. | Gains Opener |  |
| Call the Bluff | reaction (skill) ★ | Radiant | common | 1 | When an enemy uses a non-attack: ☀ deal 10 damage to it. ☾ Negate it. Flip. | When an enemy uses a non-attack: ☀ deal 14 damage to it. ☾ Negate it. Flip. | Gains Opener |  |
| Pickpocket | attack ★ | Radiant | common | 1 | Deal 7 damage. Gain 8 gold. Fold. | Deal 9 damage. Gain 12 gold. Fold. | No longer Folds |  |
| Cut the Deck | skill ★ | Radiant | common | 1 | Draw 2 cards. Flip. | Draw 3 cards. Flip. | Gains Palm |  |
| Gilded Guard | skill ★ | Radiant | common | 1 | Gain 7 Guard. ☾: raise your Ante by 3. Flip. | Gain 10 Guard. ☾: raise your Ante by 4. Flip. | Gains Palm |  |
| Jackpot | attack ★ | Radiant | uncommon | 2 | Cash in your Ante: deal 6 damage plus 3× the Ante. | Cash in your Ante: deal 9 damage plus 4× the Ante. | Costs 1 less |  |
| House Edge | power ★ | Radiant | uncommon | 1 | Whenever your Fate Coin flips, gain 3 Guard. | Whenever your Fate Coin flips, gain 5 Guard. | Gains Opener |  |
| Call It | skill ★ | Radiant | uncommon | 0 | Flip, then raise your Ante by 2. If it lands ☾, draw 1 card. | Flip, then raise your Ante by 4. If it lands ☾, draw 1 card. | Gains Palm |  |
| All In | attack ★ | Radiant | uncommon | 2 | Deal 13 damage. ☾: deal double. Flip. | Deal 17 damage. ☾: deal double. Flip. | Costs 1 less |  |
| Insurance | reaction (attack) ★ | Radiant | uncommon | 1→0 | When attacked: ☾ Negate the attack. ☀ gain 10 Guard. Flip. | When attacked: ☾ Negate the attack. ☀ gain 13 Guard. Flip. | Gains Opener |  |
| High Roller | skill ★ | Radiant | uncommon | 1→0 | Double your Ante. Lose 2 HP. | Double your Ante. Lose 2 HP. | Gains Palm |  |
| Loaded Dice | skill ★ | Radiant | uncommon | 1 | Gain Guard equal to 5 plus your Ante. | Gain Guard equal to 8 plus your Ante. | Gains Palm |  |
| Snake Eyes | attack ★ | Radiant | uncommon | 1 | Deal 6 damage to ALL enemies. ☀: raise your Ante by 3. Flip. | Deal 8 damage to ALL enemies. ☀: raise your Ante by 4. Flip. | Gains Palm |  |
| Gilt Snare | reaction (reaction) ★ | Radiant | uncommon | 1→0 | When an enemy trap activates: Negate it and raise your Ante by 3. | When an enemy trap activates: Negate it and raise your Ante by 5. | Gains Opener |  |
| Fortune Wheel | power ★ | Radiant | rare | 2→1 | At the start of your turn, flip your Fate Coin and raise your Ante by 2. | At the start of your turn, flip your Fate Coin and raise your Ante by 2. | Gains Opener |  |
| Double or Nothing | skill ★ | Radiant | rare | 1 | Double your Ante. ☾: also double your Guard. Flip. Fold. | Double your Ante. ☾: also double your Guard. Flip. | Gains Palm |  |
| Royal Flush | attack ★ | Radiant | rare | 2 | Cash in your Ante: deal 2× the Ante to ALL enemies. Fold. | Cash in your Ante: deal 3× the Ante to ALL enemies. Fold. | No longer Folds |  |
| Midas Touch | power ★ | Radiant | rare | 2→1 | Whenever you raise your Ante, gain 1 Guard per Ante raised. | Whenever you raise your Ante, gain 1 Guard per Ante raised. | Gains Opener |  |
| Marked Cards | skill ★ | Radiant | rare | 1 | ☀: Disrupt 2. ☾: draw 2 cards. Flip. | ☀: Disrupt 3. ☾: draw 3 cards. Flip. | Gains Palm |  |
| The House Always Wins | power ★ | Radiant | legendary | 3→2 | Your Fate Coin counts as both ☀ Sun and ☾ Moon. | Your Fate Coin counts as both ☀ Sun and ☾ Moon. | Gains Opener |  |
| Golden Riposte | reaction (attack) ★ | Radiant | legendary | 1 | When attacked: Negate the attack, raise your Ante by 4, then cash in: deal 2× the Ante to the attacker. | When attacked: Negate the attack, raise your Ante by 6, then cash in: deal 2× the Ante to the attacker. | Gains Opener |  |
| Lucky Charm | reaction (skill) ★ | Radiant | common | 0 | When an enemy uses a non-attack: ☀ gain 6 Guard. ☾ raise your Ante by 3. Flip. | When an enemy uses a non-attack: ☀ gain 9 Guard. ☾ raise your Ante by 4. Flip. | Gains Opener |  |
| Card Counting | skill ★ | Radiant | uncommon | 1 | Draw 2 cards. ☾: draw 1 more. Flip. | Draw 3 cards. ☾: draw 1 more. Flip. | Gains Palm |  |
| Bankroll | power ★ | Radiant | rare | 1 | At the end of your turn, raise your Ante by 1 for each energy you carry over. | At the end of your turn, raise your Ante by 2 for each energy you carry over. | Gains Opener |  |
| Compound Interest | reaction (skill) ★ | Radiant | common | 1 | Prime. When an enemy uses a non-attack: gain 4 Guard and raise your Ante by 1, +1 per Prime. Flip. | Prime. When an enemy uses a non-attack: gain 6 Guard and raise your Ante by 2, +1 per Prime. Flip. | Gains Opener |  |
| Mixed Hand | attack ★ | Radiant | common | 1 | Deal 6 damage. Converge 2: raise your Ante by 2 and Flip. | Deal 9 damage. Converge 2: raise your Ante by 3 and Flip. | Gains Palm |  |
| Call the Bet | counter (reaction) ★ | Radiant | common | 1 | Counter (a trap or Reaction): ☾ Negate it. ☀ gain 8 Guard. Flip. | Counter (a trap or Reaction): ☾ Negate it. ☀ gain 11 Guard. Flip. | Gains Opener |  |
| Raise the Stakes | counter (attack) ★ | Radiant | common | 0 | Counter (an attack): raise your Ante by 3. ☾: gain 6 Guard. Flip. | Counter (an attack): raise your Ante by 4. ☾: gain 8 Guard. Flip. | Gains Opener |  |
| House Rules | counter (any) ★ | Radiant | rare | 1 | Counter (anything an enemy does): Negate it. Raise your Ante by 2. Fold. | Counter (anything an enemy does): Negate it. Raise your Ante by 3. | Gains Opener |  |
| Royal Creed | power | Radiant | uncommon | 1 | At the start of your turn, raise your Ante by 2. | At the start of your turn, raise your Ante by 3. | Gains Opener |  |
| Ducat Covenant | power | Radiant | rare | 1 | Whenever your Fate Coin flips, deal 3 damage to a random enemy. | Whenever your Fate Coin flips, deal 4 damage to a random enemy. | Gains Opener |  |
| Ducat Gamble | attack | Radiant | common | 1 | Deal 2 damage to a random enemy 3 times. Raise your Ante by 1. | Deal 3 damage to a random enemy 3 times. Raise your Ante by 2. | Gains Palm |  |
| Royal Stake | attack | Radiant | rare | 2 | ☀ deal 9 damage. ☾ gain 5 Guard. Flip. | ☀ deal 12 damage. ☾ gain 7 Guard. Flip. | Costs 1 less |  |
| Fortune Glyph | reaction (attack) | Radiant | common | 0 | When attacked: gain 4 Guard. | When attacked: gain 5 Guard. | Gains Opener |  |
| Gambler Deal | attack | Radiant | uncommon | 2 | Deal 10 damage. Raise your Ante by 4. | Deal 13 damage. Raise your Ante by 5. | Costs 1 less |  |
| Minted Mirror | reaction (skill) | Radiant | common | 1 | When an enemy uses a non-attack: ☀ Negate it. ☾ raise your Ante by 1. Flip. | When an enemy uses a non-attack: ☀ Negate it. ☾ raise your Ante by 2. Flip. | Gains Opener |  |
| Minted Raise | attack | Radiant | rare | 2 | Deal 7 damage. Draw 1 card. Raise your Ante by 3. | Deal 9 damage. Draw 1 card. Raise your Ante by 4. | Costs 1 less |  |
| Gambler Sigil | skill | Radiant | common | 1 | ☀ raise your Ante by 5. ☾ raise your Ante by 5. Flip. | ☀ raise your Ante by 7. ☾ raise your Ante by 7. Flip. | Gains Palm |  |
| Fortune Rite | skill | Radiant | common | 2 | Draw 2 cards. Raise your Ante by 1. | Draw 2 cards. Raise your Ante by 2. | Costs 1 less |  |
| Minted Stance | skill | Radiant | common | 1 | ☀ gain 6 Guard. ☾ gain 6 Guard. Flip. | ☀ gain 8 Guard. ☾ gain 8 Guard. Flip. | Gains Palm |  |
| Crooked Refusal | counter (reaction) | Radiant | common | 1 | Counter (a trap or Reaction): Negate it and raise your Ante by 1. | Counter (a trap or Reaction): Negate it and raise your Ante by 2. | Gains Opener |  |
| Counterfeit Hustle | attack | Radiant | rare | 2 | Deal 6 damage to ALL enemies. Gain 5 Guard. Raise your Ante by 2. | Deal 8 damage to ALL enemies. Gain 7 Guard. Raise your Ante by 3. | Costs 1 less |  |
| Ducat Seal | reaction (attack) | Radiant | common | 1 | When attacked: ☀ gain 4 Guard. ☾ raise your Ante by 3. Flip. | When attacked: ☀ gain 5 Guard. ☾ raise your Ante by 4. Flip. | Gains Opener |  |
| High-Stakes Sigil | skill | Radiant | common | 0 | Raise your Ante by 3. | Raise your Ante by 4. | Gains Palm |  |
| Crowned Shroud | skill | Radiant | rare | 2 | Gain 5 Guard. Raise your Ante by 3. Draw 1 card. | Gain 7 Guard. Raise your Ante by 4. Draw 1 card. | Costs 1 less |  |
| Loaded Retort | counter (attack) | Radiant | common | 0 | Counter (an attack): ☀ gain 4 Guard. ☾ gain 4 Guard. Flip. | Counter (an attack): ☀ gain 5 Guard. ☾ gain 5 Guard. Flip. | Gains Opener |  |
| Crooked Rune | reaction (reaction) | Radiant | common | 1 | When an enemy trap activates: deal 5 damage to its owner and raise your Ante by 3. | When an enemy trap activates: deal 7 damage to its owner and raise your Ante by 4. | Gains Opener |  |
| Sterling Flip | attack | Radiant | uncommon | 2 | Deal 5 damage twice. Raise your Ante by 4. | Deal 7 damage twice. Raise your Ante by 5. | Costs 1 less |  |
| Golden Glyph | reaction (attack) | Radiant | common | 1 | When attacked: ☀ deal 5 damage to the attacker. ☾ raise your Ante by 3. Flip. | When attacked: ☀ deal 7 damage to the attacker. ☾ raise your Ante by 4. Flip. | Gains Opener |  |
| Ducat Bribe | attack | Radiant | rare | 2 | Deal 3 damage twice. Draw 1 card. Raise your Ante by 3. | Deal 4 damage twice. Draw 1 card. Raise your Ante by 4. | Costs 1 less |  |
| Fortune Tripwire | reaction (attack) | Radiant | common | 0 | When attacked: ☀ raise your Ante by 3. ☾ raise your Ante by 3. Flip. | When attacked: ☀ raise your Ante by 4. ☾ raise your Ante by 4. Flip. | Gains Opener |  |
| Royal Squeeze | attack | Radiant | common | 3 | Deal 13 damage. Gain 6 Guard. | Deal 17 damage. Gain 8 Guard. | Costs 1 less |  |
| Gambler Shakedown | attack | Radiant | uncommon | 3 | Deal 15 damage. Raise your Ante by 5. | Deal 20 damage. Raise your Ante by 7. | Costs 1 less |  |
| High-Stakes Parry | counter (attack) | Radiant | common | 0 | Counter (an attack): ☀ raise your Ante by 3. ☾ raise your Ante by 3. Flip. | Counter (an attack): ☀ raise your Ante by 4. ☾ raise your Ante by 4. Flip. | Gains Opener |  |
| Fool's Gold | skill ⧉ (glass) | Radiant | uncommon | 1 | Add a Glint to your hand. Raise your Ante by 3. | Add a Glint to your hand. Raise your Ante by 4. | Gains Palm |  |
| Card Trick | attack ⧉ (glass) | Radiant | uncommon | 1 | Deal 4 damage. ☀ Add a Glint to your hand. ☾ Raise your Ante by 3. Flip your Fate Coin. | Deal 5 damage. ☀ Add a Glint to your hand. ☾ Raise your Ante by 4. Flip your Fate Coin. | Gains Palm |  |
| Pickpocket's Bet | reaction (reaction) ⧉ (glass) | Radiant | rare | 1 | When an enemy trap activates: Steal 1 and raise your Ante by 4. | When an enemy trap activates: Steal 1 and raise your Ante by 5. | Gains Opener |  |
| Grave Robbery | skill ⧉ (grave) | Radiant | uncommon | 1 | Bury 2. Raise your Ante by 3. | Bury 2. Raise your Ante by 4. | Gains Palm |  |
| Dead Hand Draw | attack ⧉ (grave) | Radiant | uncommon | 1 | Deal 5 damage. If your Crypt holds 3+ cards, raise your Ante by 4. | Deal 7 damage. If your Crypt holds 3+ cards, raise your Ante by 5. | Gains Palm |  |
| Coin for the Ferryman | counter (reaction) ⧉ (grave) | Radiant | rare | 1 | Counter (a trap or Reaction): Exhume 1 and raise your Ante by 3. | Counter (a trap or Reaction): Exhume 1 and raise your Ante by 4. | Gains Opener |  |
| Honest Wager | skill ⧉ (dawn) | Radiant | uncommon | 1 | Gain 1 Verdict. Raise your Ante by 3. | Gain 1 Verdict. Raise your Ante by 4. | Gains Palm |  |
| Gavel Toss | attack ⧉ (dawn) | Radiant | uncommon | 1 | Deal 4 damage. ☀ Gain 1 Verdict. ☾ Gain 4 Guard. Flip your Fate Coin. | Deal 5 damage. ☀ Gain 1 Verdict. ☾ Gain 5 Guard. Flip your Fate Coin. | Gains Palm |  |
| Bail Bond | counter (attack) ⧉ (dawn) | Radiant | rare | 1 | Counter (an attack): gain 6 Guard. If you have Verdict, raise your Ante by 5. | Counter (an attack): gain 8 Guard. If you have Verdict, raise your Ante by 7. | Gains Opener |  |
| Lightning Lottery | attack ⧉ (storm) | Radiant | uncommon | 2 | Deal 2 damage to a random enemy 3 times. ☀ Apply 4 Shock to ALL enemies. ☾ Gain 3 Charge. Flip your Fate Coin. | Deal 3 damage to a random enemy 3 times. ☀ Apply 5 Shock to ALL enemies. ☾ Gain 4 Charge. Flip your Fate Coin. | Costs 1 less |  |
| Charged Chip | skill ⧉ (storm) | Radiant | uncommon | 1 | Raise your Ante by 2. If you have Charge, draw 1 card. | Raise your Ante by 3. If you have Charge, draw 1 card. | Gains Palm |  |
| Jackpot Bolt | attack ⧉ (storm) | Radiant | rare | 2 | Deal 12 damage. If your Ante is 3+, spend all Charge: deal 5 damage per Charge spent. | Deal 16 damage. If your Ante is 3+, spend all Charge: deal 7 damage per Charge spent. | Costs 1 less |  |
| Cold Cash | attack ⧉ (rime) | Radiant | uncommon | 1 | Deal 4 damage. Apply 1 Chill. If your Ante is 3+, apply 3 Chill. | Deal 5 damage. Apply 2 Chill. If your Ante is 3+, apply 4 Chill. | Gains Palm |  |
| Frozen Assets | skill ⧉ (rime) | Radiant | uncommon | 1 | Gain 3 Guard. ☀ Apply 2 Chill to ALL enemies. ☾ Raise your Ante by 3. Flip your Fate Coin. | Gain 4 Guard. ☀ Apply 3 Chill to ALL enemies. ☾ Raise your Ante by 4. Flip your Fate Coin. | Gains Palm |  |
| Ice Dealer | counter (attack) ⧉ (rime) | Radiant | rare | 1 | Counter (an attack): apply 3 Chill to the attacker and gain 3 Guard. If the attacker is Frozen, raise your Ante by 6. | Counter (an attack): apply 4 Chill to the attacker and gain 4 Guard. If the attacker is Frozen, raise your Ante by 8. | Gains Opener |  |
| Lucky Rabbit | skill ⧉ (beast) | Radiant | uncommon | 1 | Summon Hawk 1. Raise your Ante by 2. | Summon Hawk 2. Raise your Ante by 3. | Gains Palm |  |
| Wolf Gambit | skill ⧉ (beast) | Radiant | uncommon | 1 | ☀ Summon Wolf 2. ☾ Summon Bear 2. Flip your Fate Coin. | ☀ Summon Wolf 3. ☾ Summon Bear 3. Flip your Fate Coin. | Gains Palm |  |
| Pack Bet | attack ⧉ (beast) | Radiant | rare | 1 | Deal 6 damage. If you have a companion, raise your Ante by 4. | Deal 8 damage. If you have a companion, raise your Ante by 5. | Gains Palm |  |
| Gold Vein | skill ⧉ (stone) | Radiant | uncommon | 1 | Gain 3 Fortify. Raise your Ante by 2. | Gain 4 Fortify. Raise your Ante by 3. | Gains Palm |  |
| Landslide Odds | attack ⧉ (stone) | Radiant | uncommon | 2 | Deal 4 damage to ALL enemies. ☀ Apply 3 Tremor to ALL enemies. ☾ Gain 7 Guard. Flip your Fate Coin. | Deal 5 damage to ALL enemies. ☀ Apply 4 Tremor to ALL enemies. ☾ Gain 9 Guard. Flip your Fate Coin. | Costs 1 less |  |
| Bullion Wall | reaction (attack) ⧉ (stone) | Radiant | rare | 1 | When attacked: gain 7 Guard. If your Ante is 3+, gain 6 Fortify. | When attacked: gain 9 Guard. If your Ante is 3+, gain 8 Fortify. | Gains Opener |  |
| Transmute Gold | skill ⧉ (aether) | Radiant | uncommon | 1 | Attune to the element that beats the first enemy. Raise your Ante by 4. | Attune to the element that beats the first enemy. Raise your Ante by 5. | Gains Palm |  |
| Alchemist's Bet | attack ⧉ (aether) | Radiant | uncommon | 1 | Deal 3 damage. ☀ Apply 1 Exposed. ☾ Draw 1 card. Flip your Fate Coin. | Deal 4 damage. ☀ Apply 2 Exposed. ☾ Draw 1 card. Flip your Fate Coin. | Gains Palm |  |
| Philosopher's Coin | skill ⧉ (aether) | Radiant | rare | 1 | Draw 1 card. If you played 2+ elements this turn, raise your Ante by 5. | Draw 1 card. If you played 2+ elements this turn, raise your Ante by 7. | Gains Palm |  |
| Loaded Dagger | attack ⧉ (dusk) | Radiant | uncommon | 0 | Deal 3 damage. ☀ Apply 1 Mark. Flip your Fate Coin. | Deal 4 damage. ☀ Apply 2 Mark. Flip your Fate Coin. | Gains Palm |  |
| Shadow Market | skill ⧉ (dusk) | Radiant | uncommon | 2 | Gain 1 Veil. Raise your Ante by 5. | Gain 1 Veil. Raise your Ante by 7. | Costs 1 less |  |
| Assassin's Fee | attack ⧉ (dusk) | Radiant | rare | 1 | Deal 6 damage. If the target has Mark, cash in your Ante: deal 3 damage per Ante. | Deal 8 damage. If the target has Mark, cash in your Ante: deal 4 damage per Ante. | Gains Palm |  |
| Gold Crown | skill 🦋 | Radiant | evolved | 0 | Raise your Ante by 2. If this is the first card you played this turn, draw 1 card. | Raise your Ante by 3. If this is the first card you played this turn, draw 1 card. | Gains Palm |  |
| Penny | skill 🦋 | Radiant | common | 0 | Raise your Ante by 3. Evolve 4 (Gold Crown). | Raise your Ante by 4. Evolve 4 (Gold Crown). | Gains Palm |  |
| Double Eagle | attack 🦋 | Radiant | evolved | 1 | Deal 4 damage. ☀ Raise your Ante by 3. ☾ Draw 1 card. Flip your Fate Coin. | Deal 5 damage. ☀ Raise your Ante by 4. ☾ Draw 1 card. Flip your Fate Coin. | Gains Palm |  |
| Lucky Toss | attack 🦋 | Radiant | common | 1 | Deal 4 damage. ☀ Raise your Ante by 3. Flip your Fate Coin. Evolve 4 (Double Eagle). | Deal 5 damage. ☀ Raise your Ante by 4. Flip your Fate Coin. Evolve 4 (Double Eagle). | Gains Palm |  |
| Pawnbroker King | counter (attack) 🦋 | Radiant | evolved | 1 | Counter (an attack): gain 5 Guard and raise your Ante by 3. Chain 3: Negate it. | Counter (an attack): gain 7 Guard and raise your Ante by 4. Chain 3: Negate it. | Gains Opener |  |
| Pawn Ticket | counter (attack) 🦋 | Radiant | common | 1 | Counter (an attack): gain 4 Guard and raise your Ante by 2. Evolve 4 (Pawnbroker King). | Counter (an attack): gain 5 Guard and raise your Ante by 3. Evolve 4 (Pawnbroker King). | Gains Opener |  |
| Whale of the Table | skill 🦋 | Radiant | evolved | 1 | Gain 3 Guard. ☀ Gain 1 energy. ☾ Draw 1 card. Flip your Fate Coin. | Gain 4 Guard. ☀ Gain 1 energy. ☾ Draw 1 card. Flip your Fate Coin. | Gains Palm |  |
| Penny Ante | skill 🦋 | Radiant | common | 1 | Gain 6 Guard. Flip your Fate Coin. Evolve 4 (Whale of the Table). | Gain 8 Guard. Flip your Fate Coin. Evolve 4 (Whale of the Table). | Gains Palm |  |
| Treasury | skill 🦋 | Radiant | evolved | 1 | Raise your Ante by 2. Bank 1 energy for next turn. If this is the first card you played this turn, gain 1 energy. | Raise your Ante by 3. Bank 1 energy for next turn. If this is the first card you played this turn, gain 1 energy. | Gains Palm |  |
| Piggy Bank | skill 🦋 | Radiant | uncommon | 1 | Raise your Ante by 2. Bank 1 energy for next turn. Evolve 5 (Treasury). | Raise your Ante by 3. Bank 1 energy for next turn. Evolve 5 (Treasury). | Gains Palm |  |
| Golden Engine | power ★ | Radiant | uncommon | 1 | Whenever a chain of 2+ links resolves, raise your Ante by 2. | Whenever a chain of 2+ links resolves, raise your Ante by 3. | Gains Opener |  |
| Lucky Star | power ★ | Radiant | rare | 1 | At the start of your turn, ☀ raise your Ante by 8. | At the start of your turn, ☀ raise your Ante by 9. | Gains Opener |  |
| Royal Mint | power ★ | Radiant | uncommon | 2 | Whenever one of your Reactions fires, raise your Ante by 5. | Whenever one of your Reactions fires, raise your Ante by 6. | Costs 1 less |  |
| Counting House | power ★ | Radiant | uncommon | 1 | At the end of your turn, if your Ante is 3+, gain 8 Guard. | At the end of your turn, if your Ante is 3+, gain 9 Guard. | Gains Opener |  |
| Lucre Swipe | attack | Radiant | uncommon | 2 | Deal 7 damage. ☀ Raise your Ante by 5. ☾ Apply 3 Shaken. Flip your Fate Coin. | Deal 9 damage. ☀ Raise your Ante by 7. ☾ Apply 4 Shaken. Flip your Fate Coin. | Costs 1 less |  |
| Emerald Retort | counter (reaction) | Radiant | uncommon | 1 | Counter (a trap or Reaction): gain 3 Guard. ☀ Draw 1 card. ☾ Apply 1 Shaken to its owner. Flip your Fate Coin. | Counter (a trap or Reaction): gain 4 Guard. ☀ Draw 1 card. ☾ Apply 2 Shaken to its owner. Flip your Fate Coin. | Gains Opener |  |
| Marked Posture | skill | Radiant | rare | 1 | Apply 2 Shaken. If this is the first card you played this turn, draw 1 card. | Apply 3 Shaken. If this is the first card you played this turn, draw 1 card. | Gains Palm |  |
| Bullion Lunge | attack | Radiant | uncommon | 2 | Deal 4 damage twice. ☀ Gain 1 energy. ☾ Draw 1 card. Flip your Fate Coin. | Deal 5 damage twice. ☀ Gain 1 energy. ☾ Draw 1 card. Flip your Fate Coin. | Costs 1 less |  |
| Raffle Bait | reaction (attack) | Radiant | uncommon | 1 | When attacked: deal 5 damage to the attacker. ☀ Raise your Ante by 4. ☾ Bank 1 energy for next turn. Flip your Fate Coin. | When attacked: deal 7 damage to the attacker. ☀ Raise your Ante by 5. ☾ Bank 1 energy for next turn. Flip your Fate Coin. | Gains Opener |  |
| Opulent Drill | skill | Radiant | uncommon | 1 | ☀ Bank 1 energy for next turn. ☾ Raise your Ante by 7. Flip your Fate Coin. | ☀ Bank 1 energy for next turn. ☾ Raise your Ante by 9. Flip your Fate Coin. | Gains Palm |  |
| Fortunate Thrust | attack | Radiant | common | 3 | Deal 17 damage. If this is the first card you played this turn, gain 1 energy. | Deal 23 damage. If this is the first card you played this turn, gain 1 energy. | Costs 1 less |  |
| Dealer Mirror | reaction (attack) | Radiant | common | 1 | When attacked: gain 5 Guard and cash in your Ante: deal 2 damage per Ante. | When attacked: gain 7 Guard and cash in your Ante: deal 3 damage per Ante. | Gains Opener |  |
| Gilt-Edged Onslaught | attack | Radiant | uncommon | 3 | Deal 13 damage. ☀ Cash in your Ante: deal 7 damage per Ante. ☾ Bank 1 energy for next turn. Flip your Fate Coin. | Deal 17 damage. ☀ Cash in your Ante: deal 9 damage per Ante. ☾ Bank 1 energy for next turn. Flip your Fate Coin. | Costs 1 less |  |
| Marked Deadfall | reaction (attack) | Radiant | uncommon | 0 | When attacked: ☀ Draw 1 card. ☾ Apply 2 Shaken to the attacker. Flip your Fate Coin. | When attacked: ☀ Draw 1 card. ☾ Apply 3 Shaken to the attacker. Flip your Fate Coin. | Gains Opener |  |
| Fortunate Drill | skill | Radiant | uncommon | 1 | Gain 3 Guard. ☀ Bank 1 energy for next turn. ☾ Apply 1 Shaken. Flip your Fate Coin. | Gain 4 Guard. ☀ Bank 1 energy for next turn. ☾ Apply 2 Shaken. Flip your Fate Coin. | Gains Palm |  |
| Silver Comeback | counter (reaction) | Radiant | uncommon | 0 | Counter (a trap or Reaction): ☀ Raise your Ante by 4. ☾ Bank 1 energy for next turn. Flip your Fate Coin. | Counter (a trap or Reaction): ☀ Raise your Ante by 5. ☾ Bank 1 energy for next turn. Flip your Fate Coin. | Gains Opener |  |
| Opulent Refusal | counter (attack) | Radiant | uncommon | 1 | Counter (an attack): gain 4 Guard. ☀ Apply 2 Shaken to the attacker. ☾ Cash in your Ante: deal 2 damage per Ante. Flip your Fate Coin. | Counter (an attack): gain 5 Guard. ☀ Apply 3 Shaken to the attacker. ☾ Cash in your Ante: deal 3 damage per Ante. Flip your Fate Coin. | Gains Opener |  |
| Highroller Mantle | skill | Radiant | uncommon | 1→0 | ☀ Gain 1 energy. ☾ Draw 1 card. Flip your Fate Coin. | ☀ Gain 1 energy. ☾ Draw 1 card. Flip your Fate Coin. | Gains Palm |  |
| Dealer Uppercut | attack | Radiant | uncommon | 2 | Deal 9 damage. ☀ Bank 1 energy for next turn. ☾ Draw 1 card. Flip your Fate Coin. | Deal 12 damage. ☀ Bank 1 energy for next turn. ☾ Draw 1 card. Flip your Fate Coin. | Costs 1 less |  |
| Velvet Gambit | skill | Radiant | uncommon | 0 | ☀ Bank 1 energy for next turn. ☾ Cash in your Ante: deal 2 damage per Ante. Flip your Fate Coin. | ☀ Bank 1 energy for next turn. ☾ Cash in your Ante: deal 3 damage per Ante. Flip your Fate Coin. | Gains Palm |  |
| Marked Sigil | skill | Radiant | uncommon | 2 | Gain 6 Guard. ☀ Cash in your Ante: deal 4 damage per Ante. ☾ Draw 1 card. Flip your Fate Coin. | Gain 8 Guard. ☀ Cash in your Ante: deal 5 damage per Ante. ☾ Draw 1 card. Flip your Fate Coin. | Costs 1 less |  |
| Casino Clasp | reaction (reaction) | Radiant | uncommon | 1 | When an enemy trap activates: ☀ Bank 1 energy for next turn. ☾ Cash in your Ante: deal 7 damage per Ante. Flip your Fate Coin. | When an enemy trap activates: ☀ Bank 1 energy for next turn. ☾ Cash in your Ante: deal 9 damage per Ante. Flip your Fate Coin. | Gains Opener |  |
| Highroller Sweep | attack | Radiant | uncommon | 2 | Deal 12 damage. If your Ante is 3+, gain 1 energy. | Deal 16 damage. If your Ante is 3+, gain 1 energy. | Costs 1 less |  |
| Coinflip Riposte | counter (skill) | Radiant | uncommon | 1 | Counter (a non-attack): gain 4 Guard. ☀ Bank 1 energy for next turn. ☾ Cash in your Ante: deal 2 damage per Ante. Flip your Fate Coin. | Counter (a non-attack): gain 5 Guard. ☀ Bank 1 energy for next turn. ☾ Cash in your Ante: deal 3 damage per Ante. Flip your Fate Coin. | Gains Opener |  |
| Gilt-Edged Volley | attack | Radiant | uncommon | 3 | Deal 10 damage. Gain 1 energy. If this is the first card you played this turn, cash in your Ante: deal 6 damage per Ante. | Deal 13 damage. Gain 1 energy. If this is the first card you played this turn, cash in your Ante: deal 8 damage per Ante. | Costs 1 less |  |
| Dealer Retaliation | counter (attack) | Radiant | uncommon | 0 | Counter (an attack): ☀ Apply 2 Shaken to the attacker. ☾ Cash in your Ante: deal 2 damage per Ante. Flip your Fate Coin. | Counter (an attack): ☀ Apply 3 Shaken to the attacker. ☾ Cash in your Ante: deal 3 damage per Ante. Flip your Fate Coin. | Gains Opener |  |
| Casino Reversal | counter (reaction) | Radiant | uncommon | 0 | Counter (a trap or Reaction): ☀ Apply 2 Shaken to its owner. ☾ Raise your Ante by 4. Flip your Fate Coin. | Counter (a trap or Reaction): ☀ Apply 3 Shaken to its owner. ☾ Raise your Ante by 5. Flip your Fate Coin. | Gains Opener |  |
| Ivory Trick | skill | Radiant | common | 1 | Gain 4 Guard. Chain 2: Cash in your Ante: deal 2 damage per Ante. | Gain 5 Guard. Chain 2: Cash in your Ante: deal 3 damage per Ante. | Gains Palm |  |
| Bullion Parry | counter (reaction) | Radiant | uncommon | 1 | Counter (a trap or Reaction): gain 3 Guard. ☀ Cash in your Ante: deal 2 damage per Ante. ☾ Draw 1 card. Flip your Fate Coin. | Counter (a trap or Reaction): gain 4 Guard. ☀ Cash in your Ante: deal 3 damage per Ante. ☾ Draw 1 card. Flip your Fate Coin. | Gains Opener |  |
| Highroller Ambush | reaction (reaction) | Radiant | uncommon | 1 | When an enemy trap activates: deal 4 damage to its owner. ☀ Draw 1 card. ☾ Apply 2 Shaken to its owner. Flip your Fate Coin. | When an enemy trap activates: deal 5 damage to its owner. ☀ Draw 1 card. ☾ Apply 3 Shaken to its owner. Flip your Fate Coin. | Gains Opener |  |
| Bullion Rejoinder | counter (skill) | Radiant | uncommon | 1 | Counter (a non-attack): gain 4 Guard. ☀ Raise your Ante by 3. ☾ Bank 1 energy for next turn. Flip your Fate Coin. | Counter (a non-attack): gain 5 Guard. ☀ Raise your Ante by 4. ☾ Bank 1 energy for next turn. Flip your Fate Coin. | Gains Opener |  |
| Emerald Strike | attack | Radiant | uncommon | 2 | Deal 7 damage. ☀ Cash in your Ante: deal 4 damage per Ante. ☾ Gain 1 energy. Flip your Fate Coin. | Deal 9 damage. ☀ Cash in your Ante: deal 5 damage per Ante. ☾ Gain 1 energy. Flip your Fate Coin. | Costs 1 less |  |
| Casino Gainsay | counter (skill) | Radiant | uncommon | 1 | Counter (a non-attack): gain 5 Guard. If your Ante is 3+, apply 2 Shaken to it. | Counter (a non-attack): gain 7 Guard. If your Ante is 3+, apply 3 Shaken to it. | Gains Opener |  |
| Lucre Strike | attack | Radiant | uncommon | 2 | Deal 5 damage to ALL enemies. ☀ Draw 1 card. ☾ Gain 1 energy. Flip your Fate Coin. | Deal 7 damage to ALL enemies. ☀ Draw 1 card. ☾ Gain 1 energy. Flip your Fate Coin. | Costs 1 less |  |
| Raffle Ambush | reaction (attack) | Radiant | uncommon | 1 | When attacked: gain 3 Guard. ☀ Draw 1 card. ☾ Bank 1 energy for next turn. Flip your Fate Coin. | When attacked: gain 4 Guard. ☀ Draw 1 card. ☾ Bank 1 energy for next turn. Flip your Fate Coin. | Gains Opener |  |
| Highroller Comeback | counter (reaction) | Radiant | uncommon | 1 | Counter (a trap or Reaction): gain 4 Guard and apply 1 Shaken to its owner. If your Ante is 3+, raise your Ante by 3. | Counter (a trap or Reaction): gain 5 Guard and apply 2 Shaken to its owner. If your Ante is 3+, raise your Ante by 4. | Gains Opener |  |
| Silver Net | reaction (skill) | Radiant | uncommon | 1 | When an enemy uses a non-attack: gain 4 Guard. ☀ Bank 1 energy for next turn. ☾ Apply 2 Shaken to it. Flip your Fate Coin. | When an enemy uses a non-attack: gain 5 Guard. ☀ Bank 1 energy for next turn. ☾ Apply 3 Shaken to it. Flip your Fate Coin. | Gains Opener |  |
| Marked Focus | skill | Radiant | uncommon | 2 | Gain 5 Guard. Bank 1 energy for next turn. If this is the first card you played this turn, raise your Ante by 6. | Gain 7 Guard. Bank 1 energy for next turn. If this is the first card you played this turn, raise your Ante by 8. | Costs 1 less |  |
| Raffle Crash | attack | Radiant | uncommon | 1 | Deal 3 damage. ☀ Bank 1 energy for next turn. ☾ Cash in your Ante: deal 2 damage per Ante. Flip your Fate Coin. | Deal 4 damage. ☀ Bank 1 energy for next turn. ☾ Cash in your Ante: deal 3 damage per Ante. Flip your Fate Coin. | Gains Palm |  |
| Fortunate Jaw | reaction (reaction) | Radiant | uncommon | 1 | When an enemy trap activates: apply 2 Shaken to its owner. If your Ante is 3+, cash in your Ante: deal 3 damage per Ante. | When an enemy trap activates: apply 3 Shaken to its owner. If your Ante is 3+, cash in your Ante: deal 4 damage per Ante. | Gains Opener |  |
| Marked Gash | attack | Radiant | uncommon | 2 | Deal 4 damage twice. ☀ Draw 1 card. ☾ Cash in your Ante: deal 4 damage per Ante. Flip your Fate Coin. | Deal 5 damage twice. ☀ Draw 1 card. ☾ Cash in your Ante: deal 5 damage per Ante. Flip your Fate Coin. | Costs 1 less |  |
| Emerald Lure | reaction (attack) | Radiant | uncommon | 0 | When attacked: ☀ Apply 2 Shaken to the attacker. ☾ Raise your Ante by 4. Flip your Fate Coin. | When attacked: ☀ Apply 3 Shaken to the attacker. ☾ Raise your Ante by 5. Flip your Fate Coin. | Gains Opener |  |
| Opulent Tactic | skill | Radiant | uncommon | 2 | Gain 6 Guard. Apply 2 Shaken. If this is the first card you played this turn, gain 1 energy. | Gain 8 Guard. Apply 3 Shaken. If this is the first card you played this turn, gain 1 energy. | Costs 1 less |  |
| Dealer Rend | attack | Radiant | uncommon | 2 | Deal 4 damage twice. ☀ Raise your Ante by 6. ☾ Gain 1 energy. Flip your Fate Coin. | Deal 5 damage twice. ☀ Raise your Ante by 8. ☾ Gain 1 energy. Flip your Fate Coin. | Costs 1 less |  |
| Coinflip Tripline | reaction (attack) | Radiant | uncommon | 1 | When attacked: gain 4 Guard. ☀ Cash in your Ante: deal 2 damage per Ante. ☾ Apply 2 Shaken to the attacker. Flip your Fate Coin. | When attacked: gain 5 Guard. ☀ Cash in your Ante: deal 3 damage per Ante. ☾ Apply 3 Shaken to the attacker. Flip your Fate Coin. | Gains Opener |  |
| Silver Aegis | skill | Radiant | uncommon | 1 | ☀ Gain 1 energy. ☾ Cash in your Ante: deal 4 damage per Ante. Flip your Fate Coin. | ☀ Gain 1 energy. ☾ Cash in your Ante: deal 5 damage per Ante. Flip your Fate Coin. | Gains Palm |  |
| Silver Cut | attack | Radiant | rare | 2 | Deal 10 damage. Cash in your Ante: deal 3 damage per Ante. Chain 2: Bank 1 energy for next turn. | Deal 13 damage. Cash in your Ante: deal 4 damage per Ante. Chain 2: Bank 1 energy for next turn. | Costs 1 less |  |
| Opulent Tripwire | reaction (attack) | Radiant | common | 1 | When attacked: deal 6 damage to the attacker and cash in your Ante: deal 2 damage per Ante. | When attacked: deal 8 damage to the attacker and cash in your Ante: deal 3 damage per Ante. | Gains Opener |  |
| Emerald Shroud | skill | Radiant | common | 2 | Gain 7 Guard. If this is the first card you played this turn, cash in your Ante: deal 6 damage per Ante. | Gain 9 Guard. If this is the first card you played this turn, cash in your Ante: deal 8 damage per Ante. | Costs 1 less |  |
| Emerald Quip | counter (reaction) | Radiant | common | 1 | Counter (a trap or Reaction): gain 4 Guard and cash in your Ante: deal 1 damage per Ante. | Counter (a trap or Reaction): gain 5 Guard and cash in your Ante: deal 2 damage per Ante. | Gains Opener |  |
| Raffle Rite | skill | Radiant | rare | 2→1 | Bank 1 energy for next turn. If your Ante is 3+, draw 1 card. | Bank 1 energy for next turn. If your Ante is 3+, draw 1 card. | Gains Palm |  |
| Ivory Seal | reaction (skill) | Radiant | uncommon | 0 | When an enemy uses a non-attack: ☀ Draw 1 card. ☾ Raise your Ante by 3. Flip your Fate Coin. | When an enemy uses a non-attack: ☀ Draw 1 card. ☾ Raise your Ante by 4. Flip your Fate Coin. | Gains Opener |  |
| Raffle Cleave | attack | Radiant | rare | 2 | Deal 8 damage. Draw 1 card. If your Ante is 3+, gain 1 energy. | Deal 11 damage. Draw 1 card. If your Ante is 3+, gain 1 energy. | Costs 1 less |  |
| Highroller Rite | skill | Radiant | rare | 2 | Gain 8 Guard. Cash in your Ante: deal 3 damage per Ante. If this is the first card you played this turn, gain 1 energy. | Gain 11 Guard. Cash in your Ante: deal 4 damage per Ante. If this is the first card you played this turn, gain 1 energy. | Costs 1 less |  |
| Bullion Answer | counter (reaction) | Radiant | uncommon | 0 | Counter (a trap or Reaction): ☀ Draw 1 card. ☾ Raise your Ante by 3. Flip your Fate Coin. | Counter (a trap or Reaction): ☀ Draw 1 card. ☾ Raise your Ante by 4. Flip your Fate Coin. | Gains Opener |  |
| Dealer Strike | attack | Radiant | rare | 1 | Deal 2 damage to a random enemy 3 times. Raise your Ante by 2. If this is the first card you played this turn, bank 1 energy for next turn. | Deal 3 damage to a random enemy 3 times. Raise your Ante by 3. If this is the first card you played this turn, bank 1 energy for next turn. | Gains Palm |  |
| Coinflip Retort | counter (attack) | Radiant | rare | 1 | Counter (an attack): gain 5 Guard and apply 1 Shaken to the attacker. If your Ante is 3+, bank 1 energy for next turn. | Counter (an attack): gain 7 Guard and apply 2 Shaken to the attacker. If your Ante is 3+, bank 1 energy for next turn. | Gains Opener |  |
| Emerald Sigil | skill | Radiant | uncommon | 2 | Gain 4 Guard. Draw 1 card. If this is the first card you played this turn, apply 2 Shaken. | Gain 5 Guard. Draw 1 card. If this is the first card you played this turn, apply 3 Shaken. | Costs 1 less |  |
| Marked Sweep | attack | Radiant | uncommon | 2 | Deal 5 damage to ALL enemies. ☀ Raise your Ante by 6. ☾ Bank 1 energy for next turn. Flip your Fate Coin. | Deal 7 damage to ALL enemies. ☀ Raise your Ante by 8. ☾ Bank 1 energy for next turn. Flip your Fate Coin. | Costs 1 less |  |
| Silver Mantra | skill | Radiant | common | 2 | Gain 8 Guard. If your Ante is 3+, draw 1 card. | Gain 11 Guard. If your Ante is 3+, draw 1 card. | Costs 1 less |  |
| Fortunate Smite | attack | Radiant | rare | 1 | Deal 4 damage. Cash in your Ante: deal 1 damage per Ante. Chain 2: Apply 2 Shaken. | Deal 5 damage. Cash in your Ante: deal 2 damage per Ante. Chain 2: Apply 3 Shaken. | Gains Palm |  |
| Marked Spring | reaction (skill) | Radiant | uncommon | 1 | When an enemy uses a non-attack: gain 4 Guard. ☀ Raise your Ante by 4. ☾ Apply 2 Shaken to it. Flip your Fate Coin. | When an enemy uses a non-attack: gain 5 Guard. ☀ Raise your Ante by 5. ☾ Apply 3 Shaken to it. Flip your Fate Coin. | Gains Opener |  |
| Highroller Denial | counter (attack) | Radiant | uncommon | 1 | Counter (an attack): gain 3 Guard. ☀ Cash in your Ante: deal 2 damage per Ante. ☾ Draw 1 card. Flip your Fate Coin. | Counter (an attack): gain 4 Guard. ☀ Cash in your Ante: deal 3 damage per Ante. ☾ Draw 1 card. Flip your Fate Coin. | Gains Opener |  |

## Glass cards (147)

| Card | Type | Element | Rarity | Cost | Text | Upgraded (A) | Path B | Unlock |
|---|---|---|---|---|---|---|---|---|
| Snatch | skill ★ | Frost | starter | 1 | Gain 4 Guard. Steal 1. If there was nothing to steal, add a Glint to your hand. | Gain 7 Guard. Steal 1. If there was nothing to steal, add a Glint to your hand. | Gains Palm |  |
| Glass Edge | attack ★ | Frost | starter | 1 | Deal 5 damage. Add a Glint to your hand. | Deal 7 damage. Add a Glint to your hand. | Gains Palm |  |
| Sleight | reaction (attack) ★ | Frost | starter | 1 | When attacked: gain 6 Guard and Steal 1. | When attacked: gain 9 Guard and Steal 1. | Gains Opener |  |
| Glint | skill ★ | Frost | special | 0 | Deal 4 damage to a random enemy. Fold. | Deal 4 damage to a random enemy. Fold. | No longer Folds |  |
| Fleece | attack ★ | Frost | common | 1 | Deal 6 damage. If you have a stolen trap set, deal 5 more. | Deal 8 damage. If you have a stolen trap set, deal 7 more. | Gains Palm |  |
| Glitter Bomb | skill ★ | Frost | common | 1 | Add 2 Glints to your hand. | Add 3 Glints to your hand. | Gains Palm |  |
| Two-Way Mirror | reaction (skill) ★ | Frost | common | 1 | When an enemy uses a non-attack: gain 5 Guard and Steal 1. | When an enemy uses a non-attack: gain 8 Guard and Steal 1. | Gains Opener |  |
| Peck | attack ★ | Frost | common | 0 | Deal 4 damage. If you have a Glint in hand, draw 1 card. | Deal 6 damage. If you have a Glint in hand, draw 1 card. | Gains Palm |  |
| Shardplate | skill ★ | Frost | common | 1 | Gain 5 Guard, +3 for each Reaction you have set. | Gain 7 Guard, +4 for each Reaction you have set. | Gains Palm |  |
| Copycat | skill ★ | Frost | common | 1→0 | Mimic: repeat the last Attack or Trick you played this turn. | Mimic: repeat the last Attack or Trick you played this turn. | Gains Palm |  |
| Cutpurse | attack ★ | Frost | common | 1 | Deal 7 damage. Steal 1. | Deal 10 damage. Steal 1. | Gains Palm |  |
| Glass Cannon | attack ★ | Frost | common | 1 | Deal 5 damage, +3 for each Glint in your hand. | Deal 7 damage, +4 for each Glint in your hand. | Gains Palm |  |
| Smash and Grab | attack ★ | Frost | uncommon | 2 | Steal 2. Deal 8 damage to ALL enemies. | Steal 2. Deal 11 damage to ALL enemies. | Costs 1 less |  |
| Kaleidoscope | power ★ | Frost | uncommon | 1 | Your Glints deal 3 more damage. Add a Glint to your hand. | Your Glints deal 5 more damage. Add a Glint to your hand. | Gains Opener |  |
| Fence the Goods | skill ★ | Frost | uncommon | 1 | Sacrifice a set Reaction: gain 2 energy and add 2 Glints to your hand. Otherwise add 1 Glint. | Sacrifice a set Reaction: gain 2 energy and add 3 Glints to your hand. Otherwise add 1 Glint. | Gains Palm |  |
| Hall of Mirrors | reaction (reaction) ★ | Frost | uncommon | 1→0 | When an enemy trap activates: Negate it and set a copy of it in one of your free Reaction slots. | When an enemy trap activates: Negate it and set a copy of it in one of your free Reaction slots. | Gains Opener |  |
| Magpie's Eye | skill ★ | Frost | uncommon | 0 | Reveal every enemy trap for the rest of this fight. Draw 1 card(s). | Reveal every enemy trap for the rest of this fight. Draw 2 card(s). | Gains Palm |  |
| Light Fingers | skill ★ | Frost | uncommon | 1 | Palm. Steal 1. Draw 1 card(s). | Palm. Steal 1. Draw 2 card(s). | Gains Opener |  |
| Seven Years | attack ★ | Frost | uncommon | 1 | Deal 6 damage. Apply 4 Doom for each Reaction you have set. | Deal 8 damage. Apply 6 Doom for each Reaction you have set. | Gains Palm |  |
| Shiny Lure | reaction (attack) ★ | Frost | uncommon | 0 | When attacked: gain 3 Guard and add 1 Glint(s) to your hand. | When attacked: gain 4 Guard and add 2 Glint(s) to your hand. | Gains Opener |  |
| Grand Heist | skill ★ | Frost | rare | 2 | Steal ALL enemy traps. Gain 1 energy for each one stolen. Fold. | Steal ALL enemy traps. Gain 1 energy for each one stolen. | Costs 1 less |  |
| Doppelgänger | power ★ | Frost | rare | 3→2 | The first Attack or Trick you play each turn happens twice. | The first Attack or Trick you play each turn happens twice. | Gains Opener |  |
| Crow Court | power ★ | Frost | rare | 1→0 | At the start of your turn, Steal 1. If there was nothing to steal, add a Glint to your hand. | At the start of your turn, Steal 1. If there was nothing to steal, add a Glint to your hand. | Gains Opener |  |
| Shatterstorm | attack ★ | Frost | rare | 1 | Fold every Glint in your hand. Deal 6 damage to ALL enemies for each. Fold. | Fold every Glint in your hand. Deal 8 damage to ALL enemies for each. Fold. | No longer Folds |  |
| Gilded Cage | reaction (reaction) ★ | Frost | rare | 1 | When an enemy trap activates: Negate it, Steal 1 and deal 6 damage to its owner. | When an enemy trap activates: Negate it, Steal 1 and deal 9 damage to its owner. | Gains Opener |  |
| Kleptomania | power ★ | Frost | rare | 1 | Whenever you Steal a trap, draw 1 card and gain 3 Guard. | Whenever you Steal a trap, draw 1 card and gain 5 Guard. | Gains Opener |  |
| The Gilded Nest | power ★ | Frost | legendary | 2→1 | Stolen traps go back into their slot after they fire. Steal 1. | Stolen traps go back into their slot after they fire. Steal 1. | Gains Opener |  |
| Mirror Riposte | reaction (attack) ★ | Frost | legendary | 2→1 | When attacked: Negate the attack and turn it back: the attacker takes the attack's damage plus 6. | When attacked: Negate the attack and turn it back: the attacker takes the attack's damage plus 9. | Gains Opener |  |
| The Long Con | reaction (reaction) ★ | Frost | uncommon | 1 | Prime. When an enemy trap fires: deal 3 damage to its owner, +3 per Prime, then Steal 1. | Prime. When an enemy trap fires: deal 5 damage to its owner, +4 per Prime, then Steal 1. | Gains Opener |  |
| Prismatic Edge | attack ★ | Frost | common | 0 | Deal 3 damage per Converge. | Deal 4 damage per Converge. | Gains Palm |  |
| Pilfer | counter (reaction) ★ | Frost | common | 1→0 | Counter (a trap or Reaction): Negate it, then Steal 1. | Counter (a trap or Reaction): Negate it, then Steal 1. | Gains Opener |  |
| Shard Reply | counter (attack) ★ | Frost | common | 0 | Counter (an attack): gain 4 Guard. Add 2 Glints to your hand. | Counter (an attack): gain 7 Guard. Add 2 Glints to your hand. | Gains Opener |  |
| Mirror Reply | counter (reaction) ★ | Frost | rare | 1→0 | Counter (a trap or Reaction): Negate it. Copy it into a free Reaction slot of yours. | Counter (a trap or Reaction): Negate it. Copy it into a free Reaction slot of yours. | Gains Opener |  |
| Thieving Dominion | power | Frost | uncommon | 1 | Whenever you play a Glint, gain 3 Guard. | Whenever you play a Glint, gain 4 Guard. | Gains Opener |  |
| Shard Aura | power | Frost | rare | 1 | At the end of your turn, gain 3 Guard for each Reaction you have set. | At the end of your turn, gain 4 Guard for each Reaction you have set. | Gains Opener |  |
| Gleaming Strike | attack | Frost | common | 2 | Deal 8 damage. Steal 1. | Deal 11 damage. Steal 1. | Costs 1 less |  |
| Sparkling Rune | reaction (reaction) | Frost | common | 1 | When an enemy trap activates: deal 5 damage to its owner and gain 4 Guard. | When an enemy trap activates: deal 7 damage to its owner and gain 5 Guard. | Gains Opener |  |
| Magpie Rend | attack | Frost | common | 2 | Deal 6 damage to ALL enemies. Add a Glint to your hand. | Deal 8 damage to ALL enemies. Add a Glint to your hand. | Costs 1 less |  |
| Lens Barrage | attack | Frost | uncommon | 2 | Deal 4 damage twice. Steal 1. | Deal 5 damage twice. Steal 1. | Costs 1 less |  |
| Shard Rend | attack | Frost | rare | 2 | Deal 7 damage. Draw 1 card. Add a Glint to your hand. | Deal 9 damage. Draw 1 card. Add a Glint to your hand. | Costs 1 less |  |
| Facet Focus | skill | Frost | common | 1 | Gain 6 Guard. | Gain 8 Guard. | Gains Palm |  |
| Facet Tripwire | reaction (reaction) | Frost | uncommon | 1 | When an enemy trap activates: deal 6 damage to its owner and add a Glint to your hand. | When an enemy trap activates: deal 8 damage to its owner and add a Glint to your hand. | Gains Opener |  |
| Crackled Seal | reaction (attack) | Frost | uncommon | 1 | When attacked: deal 6 damage to the attacker and add a Glint to your hand. | When attacked: deal 8 damage to the attacker and add a Glint to your hand. | Gains Opener |  |
| Magpie Cut | attack | Frost | common | 2 | Deal 5 damage twice. Add a Glint to your hand. | Deal 7 damage twice. Add a Glint to your hand. | Costs 1 less |  |
| Prism Pit | reaction (attack) | Frost | common | 0 | When attacked: gain 4 Guard. | When attacked: gain 5 Guard. | Gains Opener |  |
| Splinter Charm | skill | Frost | common | 2 | Gain 8 Guard. Add a Glint to your hand. | Gain 11 Guard. Add a Glint to your hand. | Costs 1 less |  |
| Gleaming Lash | attack | Frost | uncommon | 3 | Deal 15 damage. Gain 7 Guard. | Deal 20 damage. Gain 9 Guard. | Costs 1 less |  |
| Glitter Burst | attack | Frost | common | 3 | Deal 14 damage. Steal 1. | Deal 19 damage. Steal 1. | Costs 1 less |  |
| Crystal Ward | skill | Frost | uncommon | 2 | Gain 8 Guard. Steal 1. | Gain 11 Guard. Steal 1. | Costs 1 less |  |
| Shiny Charm | skill | Frost | rare | 2 | Gain 6 Guard. Draw 1 card. Add a Glint to your hand. | Gain 8 Guard. Draw 1 card. Add a Glint to your hand. | Costs 1 less |  |
| Glitter Volley | attack | Frost | common | 2 | Deal 9 damage. Gain 4 Guard. | Deal 12 damage. Gain 5 Guard. | Costs 1 less |  |
| Gleaming Blow | attack | Frost | uncommon | 2 | Deal 6 damage to ALL enemies. Gain 5 Guard. | Deal 8 damage to ALL enemies. Gain 7 Guard. | Costs 1 less |  |
| Glass Jab | attack | Frost | uncommon | 3 | Deal 15 damage. Draw 1 card. | Deal 20 damage. Draw 1 card. | Costs 1 less |  |
| Glass Strike | attack | Frost | common | 2 | Deal 4 damage twice. Gain 4 Guard. | Deal 5 damage twice. Gain 5 Guard. | Costs 1 less |  |
| Mirror Lunge | attack | Frost | uncommon | 2 | Deal 11 damage. Add a Glint to your hand. | Deal 15 damage. Add a Glint to your hand. | Costs 1 less |  |
| Prism Parry | counter (attack) | Frost | common | 1 | Counter (an attack): gain 4 Guard and add a Glint to your hand. | Counter (an attack): gain 5 Guard and add a Glint to your hand. | Gains Opener |  |
| Splinter Rebuff | counter (reaction) | Frost | uncommon | 1 | Counter (a trap or Reaction): gain 5 Guard and add a Glint to your hand. | Counter (a trap or Reaction): gain 7 Guard and add a Glint to your hand. | Gains Opener |  |
| Shattered Urn | skill ⧉ (grave) | Frost | uncommon | 1→0 | Add a Glint to your hand. Bury 2. | Add a Glint to your hand. Bury 2. | Gains Palm |  |
| Mirror Crypt | reaction (reaction) ⧉ (grave) | Frost | uncommon | 1 | When an enemy trap activates: deal 7 damage to its owner. If your Crypt holds 3+ cards, Steal 1. | When an enemy trap activates: deal 9 damage to its owner. If your Crypt holds 3+ cards, Steal 1. | Gains Opener |  |
| Bone Prism | attack ⧉ (grave) | Frost | rare | 1 | Deal 3 damage to a random enemy for each card in your Crypt. If you hold a Glint, draw 1 card. | Deal 4 damage to a random enemy for each card in your Crypt. If you hold a Glint, draw 1 card. | Gains Palm |  |
| Crystal Writ | counter (reaction) ⧉ (dawn) | Frost | rare | 1→0 | Counter (a trap or Reaction): Negate it and add a Glint to your hand. | Counter (a trap or Reaction): Negate it and add a Glint to your hand. | Gains Opener |  |
| Glass Gavel | attack ⧉ (dawn) | Frost | uncommon | 1 | Deal 5 damage. If you have Verdict, add a Glint to your hand. | Deal 7 damage. If you have Verdict, add a Glint to your hand. | Gains Palm |  |
| Clear Conscience | skill ⧉ (dawn) | Frost | rare | 2 | Draw 1 card. Gain 1 Verdict. If you hold a Glint, heal 10 HP. | Draw 1 card. Gain 1 Verdict. If you hold a Glint, heal 13 HP. | Costs 1 less |  |
| Prism Bolt | attack ⧉ (storm) | Frost | uncommon | 1 | Deal 4 damage. Apply 2 Shock. If you hold a Glint, gain 2 Charge. | Deal 5 damage. Apply 3 Shock. If you hold a Glint, gain 3 Charge. | Gains Palm |  |
| Static Shards | skill ⧉ (storm) | Frost | uncommon | 1 | Add a Glint to your hand. Apply 2 Shock to ALL enemies. | Add a Glint to your hand. Apply 3 Shock to ALL enemies. | Gains Palm |  |
| Lightning Glass | reaction (reaction) ⧉ (storm) | Frost | rare | 1 | When an enemy trap activates: Steal 1 and apply 5 Shock to its owner. | When an enemy trap activates: Steal 1 and apply 7 Shock to its owner. | Gains Opener |  |
| Icicle Shard | attack ⧉ (rime) | Frost | uncommon | 0 | Deal 3 damage. If you hold a Glint, apply 3 Chill. | Deal 4 damage. If you hold a Glint, apply 4 Chill. | Gains Palm |  |
| Frost Mirror | reaction (attack) ⧉ (rime) | Frost | uncommon | 1 | When attacked: apply 4 Chill to the attacker and add a Glint to your hand. | When attacked: apply 5 Chill to the attacker and add a Glint to your hand. | Gains Opener |  |
| Crystal Freeze | skill ⧉ (rime) | Frost | rare | 1 | Apply 3 Chill to ALL enemies. If the target is Frozen, add 2 Glints to your hand. | Apply 4 Chill to ALL enemies. If the target is Frozen, add 2 Glints to your hand. | Gains Palm |  |
| Magpie Familiar | skill ⧉ (beast) | Frost | uncommon | 1 | Summon Hawk 1. Add a Glint to your hand. | Summon Hawk 2. Add a Glint to your hand. | Gains Palm |  |
| Glitterbait | skill ⧉ (beast) | Frost | uncommon | 1→0 | Add a Glint to your hand. If you have a companion, draw 1 card. | Add a Glint to your hand. If you have a companion, draw 1 card. | Gains Palm |  |
| Thieving Fox | attack ⧉ (beast) | Frost | rare | 2 | Deal 10 damage. Steal 1. If you have a companion, add a Glint to your hand. | Deal 13 damage. Steal 1. If you have a companion, add a Glint to your hand. | Costs 1 less |  |
| Thieves' Geode | skill ⧉ (stone) | Frost | uncommon | 1 | Gain 3 Fortify. Add a Glint to your hand. | Gain 4 Fortify. Add a Glint to your hand. | Gains Palm |  |
| Crystal Quake | attack ⧉ (stone) | Frost | uncommon | 2 | Deal 4 damage to ALL enemies. Apply 2 Tremor to ALL enemies. If you hold a Glint, gain 6 Fortify. | Deal 5 damage to ALL enemies. Apply 3 Tremor to ALL enemies. If you hold a Glint, gain 8 Fortify. | Costs 1 less |  |
| Mirror Wall | reaction (attack) ⧉ (stone) | Frost | rare | 1 | When attacked: gain 4 Guard and add a Glint to your hand. If you have a stolen trap set, gain 7 Fortify. | When attacked: gain 5 Guard and add a Glint to your hand. If you have a stolen trap set, gain 9 Fortify. | Gains Opener |  |
| Prism Glass | skill ⧉ (aether) | Frost | uncommon | 1→0 | Add a Glint to your hand. Attune to the element that beats the first enemy. | Add a Glint to your hand. Attune to the element that beats the first enemy. | Gains Palm |  |
| Refraction | attack ⧉ (aether) | Frost | uncommon | 1 | Deal 5 damage. If you hold a Glint, apply 2 Exposed. | Deal 7 damage. If you hold a Glint, apply 3 Exposed. | Gains Palm |  |
| Lens Grinder | skill ⧉ (aether) | Frost | rare | 2→1 | Draw 1 card. Add a Glint to your hand. If you played 2+ elements this turn, draw 1 card. | Draw 1 card. Add a Glint to your hand. If you played 2+ elements this turn, draw 1 card. | Gains Palm |  |
| Sleight of Shadow | skill ⧉ (dusk) | Frost | uncommon | 2→1 | Gain 1 Veil. Add 2 Glints to your hand. | Gain 1 Veil. Add 2 Glints to your hand. | Gains Palm |  |
| Glinting Knife | attack ⧉ (dusk) | Frost | uncommon | 1 | Deal 6 damage. If the target has Mark, add a Glint to your hand. | Deal 8 damage. If the target has Mark, add a Glint to your hand. | Gains Palm |  |
| Cat Burglar | reaction (reaction) ⧉ (dusk) | Frost | rare | 1 | When an enemy trap activates: Steal 1 and apply 2 Mark to its owner. | When an enemy trap activates: Steal 1 and apply 3 Mark to its owner. | Gains Opener |  |
| Crown Jewel | skill 🦋 | Frost | evolved | 1→0 | Add 2 Glints to your hand. If you hold 3 or fewer other cards, draw 1 card. | Add 2 Glints to your hand. If you hold 3 or fewer other cards, draw 1 card. | Gains Palm |  |
| Bauble | skill 🦋 | Frost | common | 1 | Add a Glint to your hand. Gain 3 Guard. Evolve 3 (Crown Jewel). | Add a Glint to your hand. Gain 4 Guard. Evolve 3 (Crown Jewel). | Gains Palm |  |
| Master Thief | reaction (reaction) 🦋 | Frost | evolved | 1 | When an enemy trap activates: Steal 1 and deal 2 damage to its owner for each card in your hand. | When an enemy trap activates: Steal 1 and deal 3 damage to its owner for each card in your hand. | Gains Opener |  |
| Sticky Fingers | reaction (reaction) 🦋 | Frost | common | 1→0 | When an enemy trap activates: Steal 1. Evolve 4 (Master Thief). | When an enemy trap activates: Steal 1. Evolve 4 (Master Thief). | Gains Opener |  |
| Diamond Edge | attack 🦋 | Frost | evolved | 1 | Deal 4 damage. Add a Glint to your hand. If this is the first card you played this turn, apply 2 Exposed. | Deal 5 damage. Add a Glint to your hand. If this is the first card you played this turn, apply 3 Exposed. | Gains Palm |  |
| Glass Pebble | attack 🦋 | Frost | common | 1 | Deal 3 damage. Add a Glint to your hand. Evolve 4 (Diamond Edge). | Deal 4 damage. Add a Glint to your hand. Evolve 4 (Diamond Edge). | Gains Palm |  |
| Mirror Palace | reaction (attack) 🦋 | Frost | evolved | 1 | When attacked: gain 5 Guard and add a Glint to your hand. If you have 2+ Reactions set, draw 1 card. | When attacked: gain 7 Guard and add a Glint to your hand. If you have 2+ Reactions set, draw 1 card. | Gains Opener |  |
| Mirror Shard | reaction (attack) 🦋 | Frost | common | 1 | When attacked: gain 4 Guard and add a Glint to your hand. Evolve 4 (Mirror Palace). | When attacked: gain 5 Guard and add a Glint to your hand. Evolve 4 (Mirror Palace). | Gains Opener |  |
| Prism Eye | skill 🦋 | Frost | evolved | 1→0 | Draw 1 card. If you hold 3 or fewer other cards, add 2 Glints to your hand. | Draw 1 card. If you hold 3 or fewer other cards, add 2 Glints to your hand. | Gains Palm |  |
| Pocket Lens | skill 🦋 | Frost | uncommon | 1→0 | Draw 1 card. If you hold 3 or fewer other cards, add a Glint to your hand. Evolve 5 (Prism Eye). | Draw 1 card. If you hold 3 or fewer other cards, add a Glint to your hand. Evolve 5 (Prism Eye). | Gains Palm |  |
| Prism Crown | power ★ | Frost | uncommon | 1 | Whenever one of your Reactions fires, gain 3 Guard. | Whenever one of your Reactions fires, gain 4 Guard. | Gains Opener |  |
| Shard Engine | power ★ | Frost | rare | 2 | Whenever a chain of 2+ links resolves, deal 3 damage to a random enemy 3 times. | Whenever a chain of 2+ links resolves, deal 4 damage to a random enemy 3 times. | Costs 1 less |  |
| Trinket Hoard | power ★ | Frost | uncommon | 1 | At the start of your turn, if you hold a Glint, gain 11 Guard. | At the start of your turn, if you hold a Glint, gain 12 Guard. | Gains Opener |  |
| Mirror Soul | power ★ | Frost | uncommon | 2 | At the end of your turn, if you have 2+ Reactions set, deal 14 damage to ALL enemies. | At the end of your turn, if you have 2+ Reactions set, deal 15 damage to ALL enemies. | Costs 1 less |  |
| Pilfered Gainsay | counter (any) | Frost | uncommon | 2→1 | Counter (anything an enemy does): Steal 1. If you have 2+ Reactions set, add 2 Glints to your hand. | Counter (anything an enemy does): Steal 1. If you have 2+ Reactions set, add 2 Glints to your hand. | Gains Opener |  |
| Cut-Glass Recital | skill | Frost | uncommon | 1 | Gain 3 Guard. Deal 1 damage for each card in your hand. If you hold a Glint, add a Glint to your hand. | Gain 4 Guard. Deal 2 damage for each card in your hand. If you hold a Glint, add a Glint to your hand. | Gains Palm |  |
| Window Jab | attack | Frost | common | 3 | Deal 18 damage. If you hold 3 or fewer other cards, add a Glint to your hand. | Deal 24 damage. If you hold 3 or fewer other cards, add a Glint to your hand. | Costs 1 less |  |
| Pilfered Tripline | reaction (attack) | Frost | uncommon | 0 | When attacked: deal 1 damage to the attacker for each card in your hand. If you have a stolen trap set, Steal 1. | When attacked: deal 2 damage to the attacker for each card in your hand. If you have a stolen trap set, Steal 1. | Gains Opener |  |
| Diamond Tactic | skill | Frost | uncommon | 2 | Gain 6 Guard. Add a Glint to your hand. If you have 2+ Reactions set, apply 3 Exposed. | Gain 8 Guard. Add a Glint to your hand. If you have 2+ Reactions set, apply 4 Exposed. | Costs 1 less |  |
| Quartz Riposte | counter (attack) | Frost | common | 1 | Counter (an attack): gain 4 Guard. If you have 2+ Reactions set, apply 2 Exposed to the attacker. | Counter (an attack): gain 5 Guard. If you have 2+ Reactions set, apply 3 Exposed to the attacker. | Gains Opener |  |
| Leaded Focus | skill | Frost | uncommon | 0 | Apply 1 Exposed. If this is the first card you played this turn, deal 1 damage for each card in your hand. | Apply 2 Exposed. If this is the first card you played this turn, deal 2 damage for each card in your hand. | Gains Palm |  |
| Beveled Swipe | attack | Frost | common | 1 | Deal 2 damage to a random enemy 3 times. If you hold a Glint, add a Glint to your hand. | Deal 3 damage to a random enemy 3 times. If you hold a Glint, add a Glint to your hand. | Gains Palm |  |
| Tinted Tripline | reaction (reaction) | Frost | uncommon | 1→0 | When an enemy trap activates: add a Glint to your hand. If you have a stolen trap set, draw 1 card. | When an enemy trap activates: add a Glint to your hand. If you have a stolen trap set, draw 1 card. | Gains Opener |  |
| Window Omen | skill | Frost | common | 2 | Deal 3 damage for each card in your hand. | Deal 4 damage for each card in your hand. | Costs 1 less |  |
| Mosaic Jab | attack | Frost | uncommon | 2 | Deal 4 damage to ALL enemies. Steal 1. If you hold 3 or fewer other cards, add 2 Glints to your hand. | Deal 5 damage to ALL enemies. Steal 1. If you hold 3 or fewer other cards, add 2 Glints to your hand. | Costs 1 less |  |
| Pilfered Comeback | counter (skill) | Frost | common | 1 | Counter (a non-attack): gain 5 Guard. If you have 2+ Reactions set, Steal 1. | Counter (a non-attack): gain 7 Guard. If you have 2+ Reactions set, Steal 1. | Gains Opener |  |
| Etched Stance | skill | Frost | uncommon | 2 | Gain 5 Guard. Steal 1. If this is the first card you played this turn, deal 2 damage for each card in your hand. | Gain 7 Guard. Steal 1. If this is the first card you played this turn, deal 3 damage for each card in your hand. | Costs 1 less |  |
| Beveled Mirror | reaction (attack) | Frost | uncommon | 1 | When attacked: gain 5 Guard and deal 1 damage to the attacker for each card in your hand. If you have a stolen trap set, add a Glint to your hand. | When attacked: gain 7 Guard and deal 2 damage to the attacker for each card in your hand. If you have a stolen trap set, add a Glint to your hand. | Gains Opener |  |
| Stained Ritual | skill | Frost | rare | 2 | Gain 9 Guard. Steal 1. Chain 2: Add a Glint to your hand. | Gain 12 Guard. Steal 1. Chain 2: Add a Glint to your hand. | Costs 1 less |  |
| Filched Mirror | reaction (attack) | Frost | common | 1 | When attacked: gain 6 Guard. If you have a stolen trap set, add 2 Glints to your hand. | When attacked: gain 8 Guard. If you have a stolen trap set, add 2 Glints to your hand. | Gains Opener |  |
| Mosaic Sunder | attack | Frost | uncommon | 1 | Deal 2 damage to a random enemy 3 times. If you hold a Glint, draw 1 card. | Deal 3 damage to a random enemy 3 times. If you hold a Glint, draw 1 card. | Gains Palm |  |
| Beveled Vow | skill | Frost | rare | 1 | Gain 4 Guard. Apply 1 Exposed. If this is the first card you played this turn, deal 1 damage for each card in your hand. | Gain 5 Guard. Apply 2 Exposed. If this is the first card you played this turn, deal 2 damage for each card in your hand. | Gains Palm |  |
| Filched Retort | counter (skill) | Frost | uncommon | 1 | Counter (a non-attack): gain 5 Guard. If you have 2+ Reactions set, deal 2 damage to it for each card in your hand. | Counter (a non-attack): gain 7 Guard. If you have 2+ Reactions set, deal 3 damage to it for each card in your hand. | Gains Opener |  |
| Filched Pierce | attack | Frost | uncommon | 1 | Deal 3 damage. Apply 1 Exposed. If you hold a Glint, draw 1 card. | Deal 4 damage. Apply 2 Exposed. If you hold a Glint, draw 1 card. | Gains Palm |  |
| Window Return | counter (reaction) | Frost | common | 1 | Counter (a trap or Reaction): gain 5 Guard. If you hold a Glint, draw 1 card. | Counter (a trap or Reaction): gain 7 Guard. If you hold a Glint, draw 1 card. | Gains Opener |  |
| Filched Lunge | attack | Frost | common | 1 | Deal 4 damage. If you hold 3 or fewer other cards, draw 1 card. | Deal 5 damage. If you hold 3 or fewer other cards, draw 1 card. | Gains Palm |  |
| Pilfered Pit | reaction (attack) | Frost | uncommon | 1 | When attacked: deal 8 damage to the attacker. If you hold a Glint, Steal 1. | When attacked: deal 11 damage to the attacker. If you hold a Glint, Steal 1. | Gains Opener |  |
| Stained Crash | attack | Frost | rare | 3 | Deal 18 damage. Draw 1 card. If this is the first card you played this turn, Steal 1. | Deal 24 damage. Draw 1 card. If this is the first card you played this turn, Steal 1. | Costs 1 less |  |
| Mosaic Vow | skill | Frost | common | 2 | Gain 7 Guard. If you hold a Glint, deal 3 damage for each card in your hand. | Gain 9 Guard. If you hold a Glint, deal 4 damage for each card in your hand. | Costs 1 less |  |
| Etched Hook | attack | Frost | rare | 2 | Deal 4 damage twice. Add 2 Glints to your hand. If you hold 3 or fewer other cards, draw 1 card. | Deal 5 damage twice. Add 2 Glints to your hand. If you hold 3 or fewer other cards, draw 1 card. | Costs 1 less |  |
| Opal Drill | skill | Frost | uncommon | 1 | Apply 2 Exposed. If you hold 3 or fewer other cards, deal 1 damage for each card in your hand. | Apply 3 Exposed. If you hold 3 or fewer other cards, deal 2 damage for each card in your hand. | Gains Palm |  |
| Beveled Clasp | reaction (reaction) | Frost | rare | 1 | When an enemy trap activates: deal 3 damage to its owner and Steal 1. If you have 2+ Reactions set, add 2 Glints to your hand. | When an enemy trap activates: deal 4 damage to its owner and Steal 1. If you have 2+ Reactions set, add 2 Glints to your hand. | Gains Opener |  |
| Window Spring | reaction (attack) | Frost | common | 1 | When attacked: gain 5 Guard. If you have a stolen trap set, deal 3 damage to the attacker for each card in your hand. | When attacked: gain 7 Guard. If you have a stolen trap set, deal 4 damage to the attacker for each card in your hand. | Gains Opener |  |
| Leaded Rebuttal | counter (reaction) | Frost | common | 1 | Counter (a trap or Reaction): gain 5 Guard. If you have 2+ Reactions set, Steal 1. | Counter (a trap or Reaction): gain 7 Guard. If you have 2+ Reactions set, Steal 1. | Gains Opener |  |
| Hourglass Mirror | reaction (attack) | Frost | uncommon | 1 | When attacked: deal 3 damage to the attacker and Steal 1. If you hold a Glint, add a Glint to your hand. | When attacked: deal 4 damage to the attacker and Steal 1. If you hold a Glint, add a Glint to your hand. | Gains Opener |  |
| Hourglass Burst | attack | Frost | uncommon | 2 | Deal 8 damage to ALL enemies. If you hold a Glint, draw 1 card. | Deal 11 damage to ALL enemies. If you hold a Glint, draw 1 card. | Costs 1 less |  |
| Window Lure | reaction (attack) | Frost | uncommon | 0 | When attacked: apply 1 Exposed to the attacker. If you have a stolen trap set, add 2 Glints to your hand. | When attacked: apply 2 Exposed to the attacker. If you have a stolen trap set, add 2 Glints to your hand. | Gains Opener |  |
| Stained Mantra | skill | Frost | uncommon | 0 | Apply 1 Exposed. If you hold a Glint, add a Glint to your hand. | Apply 2 Exposed. If you hold a Glint, add a Glint to your hand. | Gains Palm |  |
| Window Flourish | attack | Frost | uncommon | 3 | Deal 12 damage. Apply 3 Exposed. If you have 2+ Reactions set, Steal 1. | Deal 16 damage. Apply 4 Exposed. If you have 2+ Reactions set, Steal 1. | Costs 1 less |  |
| Cut-Glass Quip | counter (reaction) | Frost | uncommon | 1 | Counter (a trap or Reaction): gain 4 Guard and deal 1 damage to its owner for each card in your hand. If you have a stolen trap set, add a Glint to your hand. | Counter (a trap or Reaction): gain 5 Guard and deal 2 damage to its owner for each card in your hand. If you have a stolen trap set, add a Glint to your hand. | Gains Opener |  |
| Etched Recital | skill | Frost | uncommon | 1 | Gain 5 Guard. If this is the first card you played this turn, add a Glint to your hand. | Gain 7 Guard. If this is the first card you played this turn, add a Glint to your hand. | Gains Palm |  |
| Filched Ploy | skill | Frost | uncommon | 1 | Steal 1. If you have 2+ Reactions set, apply 1 Exposed. | Steal 1. If you have 2+ Reactions set, apply 2 Exposed. | Gains Palm |  |
| Diamond Rebuttal | counter (skill) | Frost | uncommon | 1 | Counter (a non-attack): gain 4 Guard and apply 1 Exposed to it. If you hold a Glint, deal 1 damage to it for each card in your hand. | Counter (a non-attack): gain 5 Guard and apply 2 Exposed to it. If you hold a Glint, deal 2 damage to it for each card in your hand. | Gains Opener |  |
| Filched Ritual | skill | Frost | uncommon | 1 | Gain 4 Guard. If you have 2+ Reactions set, draw 1 card. | Gain 5 Guard. If you have 2+ Reactions set, draw 1 card. | Gains Palm |  |
| Stained Pit | reaction (reaction) | Frost | common | 1 | When an enemy trap activates: deal 6 damage to its owner. If you have 2+ Reactions set, draw 1 card. | When an enemy trap activates: deal 8 damage to its owner. If you have 2+ Reactions set, draw 1 card. | Gains Opener |  |
| Stained Gash | attack | Frost | rare | 3 | Deal 16 damage. Add 2 Glints to your hand. If you have 2+ Reactions set, draw 1 card. | Deal 21 damage. Add 2 Glints to your hand. If you have 2+ Reactions set, draw 1 card. | Costs 1 less |  |
| Diamond Gainsay | counter (reaction) | Frost | rare | 0 | Counter (a trap or Reaction): add a Glint to your hand. If you have a stolen trap set, deal 2 damage to its owner for each card in your hand. | Counter (a trap or Reaction): add a Glint to your hand. If you have a stolen trap set, deal 3 damage to its owner for each card in your hand. | Gains Opener |  |
| Leaded Trance | skill | Frost | rare | 1 | Deal 1 damage for each card in your hand. If you have 2+ Reactions set, add 2 Glints to your hand. | Deal 2 damage for each card in your hand. If you have 2+ Reactions set, add 2 Glints to your hand. | Gains Palm |  |
| Tinted Net | reaction (attack) | Frost | uncommon | 1 | When attacked: gain 3 Guard and add a Glint to your hand. If you have a stolen trap set, draw 1 card. | When attacked: gain 4 Guard and add a Glint to your hand. If you have a stolen trap set, draw 1 card. | Gains Opener |  |
| Leaded Snare | reaction (attack) | Frost | rare | 1 | When attacked: gain 5 Guard and deal 1 damage to the attacker for each card in your hand. If you have 2+ Reactions set, draw 1 card. | When attacked: gain 7 Guard and deal 2 damage to the attacker for each card in your hand. If you have 2+ Reactions set, draw 1 card. | Gains Opener |  |
| Hourglass Shroud | skill | Frost | rare | 0 | Deal 1 damage for each card in your hand. If you hold a Glint, add a Glint to your hand. | Deal 2 damage for each card in your hand. If you hold a Glint, add a Glint to your hand. | Gains Palm |  |
| Filched Reversal | counter (any) | Frost | rare | 2→1 | Counter (anything an enemy does): draw 1 card. If you have a stolen trap set, add a Glint to your hand. | Counter (anything an enemy does): draw 1 card. If you have a stolen trap set, add a Glint to your hand. | Gains Opener |  |
| Pilfered Ambush | reaction (reaction) | Frost | uncommon | 1 | When an enemy trap activates: deal 5 damage to its owner and apply 1 Exposed to its owner. If you have a stolen trap set, Steal 1. | When an enemy trap activates: deal 7 damage to its owner and apply 2 Exposed to its owner. If you have a stolen trap set, Steal 1. | Gains Opener |  |
| Mosaic Recital | skill | Frost | uncommon | 2 | Gain 5 Guard. Steal 1. If you have 2+ Reactions set, draw 1 card. | Gain 7 Guard. Steal 1. If you have 2+ Reactions set, draw 1 card. | Costs 1 less |  |
| Tinted Feint | attack | Frost | uncommon | 2 | Deal 3 damage twice. Draw 1 card. If you hold a Glint, Steal 1. | Deal 4 damage twice. Draw 1 card. If you hold a Glint, Steal 1. | Costs 1 less |  |
| Gem Answer | counter (skill) | Frost | uncommon | 1 | Counter (a non-attack): gain 3 Guard and apply 1 Exposed to it. If you have 2+ Reactions set, add 2 Glints to your hand. | Counter (a non-attack): gain 4 Guard and apply 2 Exposed to it. If you have 2+ Reactions set, add 2 Glints to your hand. | Gains Opener |  |

## Grave cards (129)

| Card | Type | Element | Rarity | Cost | Text | Upgraded (A) | Path B | Unlock |
|---|---|---|---|---|---|---|---|---|
| Tombstone | reaction (attack) ★ | Stone | starter | 1 | When attacked: gain 8 Guard. Haunt: gain 3 Guard and deal 3 damage to a random enemy. | When attacked: gain 11 Guard. Haunt: gain 4 Guard and deal 4 damage to a random enemy. | Gains Opener |  |
| Gravedig | skill ★ | Stone | starter | 1→0 | Exhume 1. Draw 1 card. | Exhume 1. Draw 1 card. | Gains Palm |  |
| Spade Strike | attack ★ | Stone | starter | 1 | Deal 9 damage. Bury 1. | Deal 12 damage. Bury 1. | Gains Palm |  |
| Wake | reaction (skill) ★ | Stone | common | 1 | When an enemy uses a non-attack: deal 6 damage to it. Haunt: deal 3 damage to a random enemy. | When an enemy uses a non-attack: deal 9 damage to it. Haunt: deal 5 damage to a random enemy. | Gains Opener |  |
| Restless Dead | reaction (attack) ★ | Stone | common | 1 | When attacked: gain 4 Guard and deal 4 damage to the attacker. Haunt: gain 4 Guard. | When attacked: gain 6 Guard and deal 6 damage to the attacker. Haunt: gain 5 Guard. | Gains Opener |  |
| Shallow Grave | skill ★ | Stone | common | 0 | Bury 2. Draw 1 card. | Bury 3. Draw 1 card. | Gains Palm |  |
| Mourning Veil | skill ★ | Stone | common | 1 | Gain 7 Guard. If your Crypt holds 3+ cards, gain 4 more. | Gain 9 Guard. If your Crypt holds 3+ cards, gain 6 more. | Gains Palm |  |
| Epitaph | attack ★ | Stone | common | 2 | Deal 12 damage. Exhume 1. | Deal 16 damage. Exhume 1. | Costs 1 less |  |
| Bone Rattle | attack ★ | Stone | common | 1 | Deal 4 damage twice. If you Exhumed this turn, three times. | Deal 5 damage twice. If you Exhumed this turn, three times. | Gains Palm |  |
| Cairn | reaction (attack) ★ | Stone | common | 0 | Prime. When attacked: gain 4 Guard, +2 per Prime. | Prime. When attacked: gain 6 Guard, +3 per Prime. | Gains Opener |  |
| Toll of Bones | attack ★ | Stone | uncommon | 1 | Deal 4 damage, +2 for each card in your Crypt. | Deal 6 damage, +3 for each card in your Crypt. | Gains Palm |  |
| Exhumation | skill ★ | Stone | uncommon | 2→1 | Exhume 2. | Exhume 2. | Gains Palm |  |
| Danse Macabre | power ★ | Stone | uncommon | 2 | Whenever you Exhume a Reaction, deal 4 damage to ALL enemies. | Whenever you Exhume a Reaction, deal 6 damage to ALL enemies. | Costs 1 less |  |
| Dead Man's Hand | reaction (skill) ★ | Stone | uncommon | 1→0 | When an enemy uses a non-attack: Negate it. Haunt: draw 1 card. | When an enemy uses a non-attack: Negate it. Haunt: draw 1 card. | Gains Opener |  |
| Gravewalker | skill ★ | Stone | uncommon | 1 | Gain 6 Guard. Bury 2. | Gain 9 Guard. Bury 2. | Gains Palm |  |
| Funeral March | power ★ | Stone | uncommon | 1 | At the start of your turn, Bury 1 and gain 2 Guard. | At the start of your turn, Bury 1 and gain 4 Guard. | Gains Opener |  |
| Revenant | reaction (attack) ★ | Stone | uncommon | 2→1 | When attacked: Negate the attack. Haunt: gain 5 Guard. | When attacked: Negate the attack. Haunt: gain 5 Guard. | Gains Opener |  |
| Unquiet Slumber | reaction (reaction) ★ | Stone | uncommon | 1 | When an enemy trap fires: deal 8 damage to its owner. Haunt: Exhume 1 other Reaction. | When an enemy trap fires: deal 12 damage to its owner. Haunt: Exhume 1 other Reaction. | Gains Opener |  |
| Wailing Wall | reaction (attack) ★ | Stone | uncommon | 2 | Prime. When attacked: gain 12 Guard, +3 per Prime. | Prime. When attacked: gain 15 Guard, +4 per Prime. | Costs 1 less |  |
| Rite of Passage | skill ★ | Stone | uncommon | 1 | Bury 1. Converge 3: Exhume 1 and draw 1 card. | Bury 2. Converge 3: Exhume 1 and draw 1 card. | Gains Palm |  |
| Mass Grave | attack ★ | Stone | rare | 2 | Deal 2 damage to ALL enemies for each card in your Crypt. | Deal 3 damage to ALL enemies for each card in your Crypt. | Costs 1 less |  |
| The Long Sleep | power ★ | Stone | rare | 2→1 | At the start of your turn, Exhume 1. | At the start of your turn, Exhume 1. | Gains Opener |  |
| Pallbearer | power ★ | Stone | rare | 1 | Whenever a card enters your Crypt, gain 2 Guard. | Whenever a card enters your Crypt, gain 3 Guard. | Gains Opener |  |
| Lazarus | skill ★ | Stone | rare | 1 | Exhume every Reaction in your Crypt (into free slots, the rest to your hand). Fold. | Exhume every Reaction in your Crypt (into free slots, the rest to your hand). | Gains Palm |  |
| Last Word | reaction (reaction) ★ | Stone | rare | 1→0 | When an enemy trap fires: Negate it. Haunt: Exhume 1 other Reaction. | When an enemy trap fires: Negate it. Haunt: Exhume 1 other Reaction. | Gains Opener |  |
| The Charnel Throne | power ★ | Stone | legendary | 2→1 | Whenever one of your Reactions fires, deal damage equal to your Crypt size +2 to a random enemy. Bury 2. | Whenever one of your Reactions fires, deal damage equal to your Crypt size +2 to a random enemy. Bury 2. | Gains Opener |  |
| Requiem Eternal | reaction (attack) ★ | Stone | legendary | 2 | When attacked: Negate the attack and deal 10 damage to the attacker. Haunt: return this to your hand. | When attacked: Negate the attack and deal 15 damage to the attacker. Haunt: return this to your hand. | Costs 1 less |  |
| Grave Retort | counter (reaction) ★ | Stone | common | 1→0 | Counter (a trap or Reaction): Negate it. Exhume 1. | Counter (a trap or Reaction): Negate it. Exhume 1. | Gains Opener |  |
| Bone Reply | counter (attack) ★ | Stone | common | 1 | Counter (an attack): gain 8 Guard. Bury 2. | Counter (an attack): gain 11 Guard. Bury 2. | Gains Opener |  |
| Funeral Rites | counter (skill) ★ | Stone | uncommon | 1 | Counter (a non-attack): Negate it. Gain 5 Guard. | Counter (a non-attack): Negate it. Gain 8 Guard. | Gains Opener |  |
| Ossuary Aura | power | Stone | uncommon | 1 | Whenever a card enters your Crypt, deal 3 damage to a random enemy. | Whenever a card enters your Crypt, deal 4 damage to a random enemy. | Gains Opener |  |
| Gravebound Dominion | power | Stone | rare | 1 | Whenever you Exhume a card, gain 5 Guard. | Whenever you Exhume a card, gain 6 Guard. | Gains Opener |  |
| Funeral Rune | reaction (attack) | Stone | common | 1 | When attacked: gain 5 Guard and Bury 2. | When attacked: gain 7 Guard and Bury 2. | Gains Opener |  |
| Shroud Slash | attack | Stone | rare | 3 | Deal 17 damage. Exhume 1. Bury 2. | Deal 23 damage. Exhume 1. Bury 2. | Costs 1 less |  |
| Bone Trap | reaction (skill) | Stone | common | 1 | When an enemy uses a non-attack: gain 5 Guard and Bury 2. | When an enemy uses a non-attack: gain 7 Guard and Bury 2. | Gains Opener |  |
| Sepulchral Cut | attack | Stone | rare | 2 | Deal 6 damage to ALL enemies. Gain 5 Guard. Bury 2. | Deal 8 damage to ALL enemies. Gain 7 Guard. Bury 2. | Costs 1 less |  |
| Wake Cleave | attack | Stone | uncommon | 3 | Deal 19 damage. Bury 2. | Deal 25 damage. Bury 2. | Costs 1 less |  |
| Shroud Aegis | skill | Stone | common | 0 | Heal 2 HP. | Heal 3 HP. | Gains Palm |  |
| Gravebound Retort | counter (attack) | Stone | common | 0 | Counter (an attack): heal 2 HP. | Counter (an attack): heal 3 HP. | Gains Opener |  |
| Bone Shroud | skill | Stone | rare | 2 | Gain 7 Guard. Heal 3 HP. Bury 2. | Gain 9 Guard. Heal 4 HP. Bury 2. | Costs 1 less |  |
| Barrow Seal | reaction (reaction) | Stone | uncommon | 1 | When an enemy trap activates: deal 7 damage to its owner and Bury 2. | When an enemy trap activates: deal 9 damage to its owner and Bury 2. | Gains Opener |  |
| Crypt Strike | attack | Stone | common | 1 | Deal 4 damage. Bury 2. | Deal 5 damage. Bury 2. | Gains Palm |  |
| Lich Glyph | reaction (attack) | Stone | uncommon | 1 | When attacked: deal 7 damage to the attacker and Bury 2. | When attacked: deal 9 damage to the attacker and Bury 2. | Gains Opener |  |
| Coffin Rend | attack | Stone | rare | 2 | Deal 5 damage to ALL enemies. Exhume 1. Bury 2. | Deal 7 damage to ALL enemies. Exhume 1. Bury 2. | Costs 1 less |  |
| Hallowed Barrage | attack | Stone | uncommon | 3 | Deal 15 damage. Gain 7 Guard. | Deal 20 damage. Gain 9 Guard. | Costs 1 less |  |
| Hallowed Rite | skill | Stone | common | 2 | Gain 9 Guard. Bury 2. | Gain 12 Guard. Bury 2. | Costs 1 less |  |
| Tomb Cleave | attack | Stone | uncommon | 1 | Deal 5 damage. Heal 2 HP. | Deal 7 damage. Heal 3 HP. | Gains Palm |  |
| Mourning Crash | attack | Stone | common | 2 | Deal 7 damage to ALL enemies. Bury 2. | Deal 9 damage to ALL enemies. Bury 2. | Costs 1 less |  |
| Sepulchral Rend | attack | Stone | rare | 2 | Deal 10 damage. Heal 3 HP. Bury 2. | Deal 13 damage. Heal 4 HP. Bury 2. | Costs 1 less |  |
| Bone Jab | attack | Stone | uncommon | 2 | Deal 10 damage. Gain 4 Guard. | Deal 13 damage. Gain 5 Guard. | Costs 1 less |  |
| Ossuary Focus | skill | Stone | uncommon | 2 | Gain 7 Guard. Exhume 1. | Gain 9 Guard. Exhume 1. | Costs 1 less |  |
| Funeral Rite | skill ⧉ (dawn) | Stone | uncommon | 1→0 | Bury 2. Gain 1 Verdict. | Bury 2. Gain 1 Verdict. | Gains Palm |  |
| Last Testament | counter (reaction) ⧉ (dawn) | Stone | uncommon | 1→0 | Counter (a trap or Reaction): Negate it. If your Crypt holds 3+ cards, gain 1 Verdict. | Counter (a trap or Reaction): Negate it. If your Crypt holds 3+ cards, gain 1 Verdict. | Gains Opener |  |
| Saintly Relics | skill ⧉ (dawn) | Stone | rare | 1 | Heal 2 HP. Spend all Verdict: gain 1 Guard per Verdict spent. If your Crypt holds 3+ cards, draw 1 card. | Heal 3 HP. Spend all Verdict: gain 2 Guard per Verdict spent. If your Crypt holds 3+ cards, draw 1 card. | Gains Palm |  |
| Galvanized Corpse | skill ⧉ (storm) | Stone | uncommon | 2 | Exhume 1. Gain 3 Charge. | Exhume 1. Gain 4 Charge. | Costs 1 less |  |
| Thunder Tomb | attack ⧉ (storm) | Stone | uncommon | 2 | Deal 6 damage to ALL enemies. If your Crypt holds 3+ cards, apply 6 Shock to ALL enemies. | Deal 8 damage to ALL enemies. If your Crypt holds 3+ cards, apply 8 Shock to ALL enemies. | Costs 1 less |  |
| Crackling Bones | reaction (skill) ⧉ (storm) | Stone | rare | 1 | When an enemy uses a non-attack: Bury 2 and apply 8 Shock to it. | When an enemy uses a non-attack: Bury 2 and apply 11 Shock to it. | Gains Opener |  |
| Cold Grave | skill ⧉ (rime) | Stone | uncommon | 1 | Bury 2. Apply 2 Chill to ALL enemies. | Bury 2. Apply 3 Chill to ALL enemies. | Gains Palm |  |
| Frozen Crypt | reaction (attack) ⧉ (rime) | Stone | uncommon | 1 | When attacked: gain 5 Guard. If your Crypt holds 3+ cards, apply 5 Chill to the attacker. | When attacked: gain 7 Guard. If your Crypt holds 3+ cards, apply 7 Chill to the attacker. | Gains Opener |  |
| Permafrost Tomb | skill ⧉ (rime) | Stone | rare | 1 | Exhume 1. Apply 2 Chill. | Exhume 1. Apply 3 Chill. | Gains Palm |  |
| Bone Hound | skill ⧉ (beast) | Stone | uncommon | 1 | Summon Wolf 1. Bury 2. | Summon Wolf 2. Bury 2. | Gains Palm |  |
| Spirit Pack | skill ⧉ (beast) | Stone | rare | 2 | Exhume 1. Gain 5 Guard for each companion you have. | Exhume 1. Gain 7 Guard for each companion you have. | Costs 1 less |  |
| Barrow Stone | skill ⧉ (stone) | Stone | uncommon | 1 | Gain 3 Fortify. Bury 2. | Gain 4 Fortify. Bury 2. | Gains Palm |  |
| Tombstone Slam | attack ⧉ (stone) | Stone | uncommon | 2 | Deal 10 damage. If your Crypt holds 3+ cards, apply 7 Tremor. | Deal 13 damage. If your Crypt holds 3+ cards, apply 9 Tremor. | Costs 1 less |  |
| Catacomb Wall | reaction (attack) ⧉ (stone) | Stone | rare | 1 | When attacked: gain 7 Guard. If you Exhumed this turn, gain 8 Fortify. | When attacked: gain 9 Guard. If you Exhumed this turn, gain 11 Fortify. | Gains Opener |  |
| Embalming Fluid | skill ⧉ (aether) | Stone | uncommon | 1→0 | Bury 2. Attune to the element that beats the first enemy. | Bury 2. Attune to the element that beats the first enemy. | Gains Palm |  |
| Necro-Reagent | attack ⧉ (aether) | Stone | uncommon | 1 | Deal 5 damage. If your Crypt holds 3+ cards, apply 2 Exposed. | Deal 7 damage. If your Crypt holds 3+ cards, apply 3 Exposed. | Gains Palm |  |
| Distilled Soul | skill ⧉ (aether) | Stone | rare | 1→0 | Exhume 1. If you played 2+ elements this turn, draw 1 card. | Exhume 1. If you played 2+ elements this turn, draw 1 card. | Gains Palm |  |
| Widow's Veil | reaction (attack) ⧉ (dusk) | Stone | uncommon | 1→0 | When attacked: gain 1 Veil and Bury 2. | When attacked: gain 1 Veil and Bury 2. | Gains Opener |  |
| Wake of Shadows | skill ⧉ (dusk) | Stone | rare | 1 | Apply 1 Mark to ALL enemies. If you Exhumed this turn, gain 1 Veil. | Apply 2 Mark to ALL enemies. If you Exhumed this turn, gain 1 Veil. | Gains Palm |  |
| Lich Lord | skill 🦋 | Stone | evolved | 1→0 | Exhume 1. If your Crypt holds 3+ cards, Bury 4. | Exhume 1. If your Crypt holds 3+ cards, Bury 4. | Gains Palm |  |
| Gravedigger | skill 🦋 | Stone | common | 1 | Bury 2. Gain 3 Guard. Evolve 4 (Lich Lord). | Bury 2. Gain 4 Guard. Evolve 4 (Lich Lord). | Gains Palm |  |
| Bone Colossus | attack 🦋 | Stone | evolved | 1 | Deal 4 damage twice. If your Crypt holds 3+ cards, Bury 4. | Deal 5 damage twice. If your Crypt holds 3+ cards, Bury 4. | Gains Palm |  |
| Rattlebones | attack 🦋 | Stone | common | 1 | Deal 4 damage. Bury 2. Evolve 4 (Bone Colossus). | Deal 5 damage. Bury 2. Evolve 4 (Bone Colossus). | Gains Palm |  |
| Banshee | reaction (skill) 🦋 | Stone | evolved | 1 | When an enemy uses a non-attack: deal 3 damage to a random enemy for each card in your Crypt and heal 3 HP. | When an enemy uses a non-attack: deal 4 damage to a random enemy for each card in your Crypt and heal 4 HP. | Gains Opener |  |
| Wisp | reaction (skill) 🦋 | Stone | common | 1 | When an enemy uses a non-attack: gain 5 Guard and heal 2 HP. Evolve 4 (Banshee). | When an enemy uses a non-attack: gain 7 Guard and heal 3 HP. Evolve 4 (Banshee). | Gains Opener |  |
| Undertaker | skill 🦋 | Stone | evolved | 1→0 | Bury 4. If you Exhumed this turn, draw 1 card. | Bury 4. If you Exhumed this turn, draw 1 card. | Gains Palm |  |
| Mourner | skill 🦋 | Stone | common | 1 | Bury 2. Apply 1 Shaken. Evolve 3 (Undertaker). | Bury 2. Apply 2 Shaken. Evolve 3 (Undertaker). | Gains Palm |  |
| Risen Host | counter (reaction) 🦋 | Stone | evolved | 1 | Counter (a trap or Reaction): Exhume 1 and deal 2 damage to a random enemy for each card in your Crypt. | Counter (a trap or Reaction): Exhume 1 and deal 3 damage to a random enemy for each card in your Crypt. | Gains Opener |  |
| Restless Hand | counter (reaction) 🦋 | Stone | uncommon | 1→0 | Counter (a trap or Reaction): Exhume 1. Evolve 4 (Risen Host). | Counter (a trap or Reaction): Exhume 1. Evolve 4 (Risen Host). | Gains Opener |  |
| Bone Crown | power ★ | Stone | uncommon | 1 | At the start of your turn, if your Crypt holds 3+ cards, gain 8 Guard. | At the start of your turn, if your Crypt holds 3+ cards, gain 9 Guard. | Gains Opener |  |
| Ghost Engine | power ★ | Stone | rare | 2 | Whenever a chain of 2+ links resolves, deal 3 damage to a random enemy for each card in your Crypt. | Whenever a chain of 2+ links resolves, deal 4 damage to a random enemy for each card in your Crypt. | Costs 1 less |  |
| Dirge March | power ★ | Stone | uncommon | 1 | Whenever one of your Reactions fires, heal 2 HP. | Whenever one of your Reactions fires, heal 3 HP. | Gains Opener |  |
| Ossuary | power ★ | Stone | uncommon | 2 | At the end of your turn, if your Crypt holds 3+ cards, deal 12 damage to ALL enemies. | At the end of your turn, if your Crypt holds 3+ cards, deal 13 damage to ALL enemies. | Costs 1 less |  |
| Gallows Canticle | skill | Stone | uncommon | 2 | Gain 6 Guard. Exhume 1. If your Crypt holds 3+ cards, Bury 2. | Gain 8 Guard. Exhume 1. If your Crypt holds 3+ cards, Bury 2. | Costs 1 less |  |
| Marrow Mantle | skill | Stone | uncommon | 1 | Apply 2 Shaken. If you Exhumed this turn, deal 3 damage to a random enemy for each card in your Crypt. | Apply 3 Shaken. If you Exhumed this turn, deal 4 damage to a random enemy for each card in your Crypt. | Gains Palm |  |
| Gallows Seal | reaction (attack) | Stone | uncommon | 1 | When attacked: gain 6 Guard. If you have 2+ Reactions set, Exhume 1. | When attacked: gain 8 Guard. If you have 2+ Reactions set, Exhume 1. | Gains Opener |  |
| Elegy Swipe | attack | Stone | uncommon | 3 | Deal 11 damage. Bury 4. If you Exhumed this turn, heal 9 HP. | Deal 15 damage. Bury 4. If you Exhumed this turn, heal 12 HP. | Costs 1 less |  |
| Headstone Lash | attack | Stone | common | 2 | Deal 4 damage twice. If you are below half HP, heal 7 HP. | Deal 5 damage twice. If you are below half HP, heal 9 HP. | Costs 1 less |  |
| Lantern Rebuttal | counter (skill) | Stone | uncommon | 1 | Counter (a non-attack): gain 4 Guard and deal 1 damage to a random enemy for each card in your Crypt. If you are below half HP, apply 2 Shaken to it. | Counter (a non-attack): gain 5 Guard and deal 2 damage to a random enemy for each card in your Crypt. If you are below half HP, apply 3 Shaken to it. | Gains Opener |  |
| Gallows Ward | skill | Stone | rare | 1 | Gain 3 Guard. Deal 1 damage to a random enemy for each card in your Crypt. If your Crypt holds 3+ cards, Bury 4. | Gain 4 Guard. Deal 2 damage to a random enemy for each card in your Crypt. If your Crypt holds 3+ cards, Bury 4. | Gains Palm |  |
| Revenant Spring | reaction (attack) | Stone | rare | 0 | When attacked: deal 2 damage to a random enemy for each card in your Crypt. If your Crypt holds 3+ cards, Bury 2. | When attacked: deal 3 damage to a random enemy for each card in your Crypt. If your Crypt holds 3+ cards, Bury 2. | Gains Opener |  |
| Catacomb Cut | attack | Stone | uncommon | 2 | Deal 3 damage to ALL enemies. Exhume 1. If you have 2+ Reactions set, heal 3 HP. | Deal 4 damage to ALL enemies. Exhume 1. If you have 2+ Reactions set, heal 4 HP. | Costs 1 less |  |
| Skeletal Answer | counter (reaction) | Stone | common | 1 | Counter (a trap or Reaction): gain 5 Guard. If you Exhumed this turn, Exhume 1. | Counter (a trap or Reaction): gain 7 Guard. If you Exhumed this turn, Exhume 1. | Gains Opener |  |
| Marrow Tactic | skill | Stone | rare | 1 | Deal 3 damage to a random enemy for each card in your Crypt. If you are below half HP, Bury 4. | Deal 4 damage to a random enemy for each card in your Crypt. If you are below half HP, Bury 4. | Gains Palm |  |
| Requiem Lash | attack | Stone | rare | 2 | Deal 4 damage twice. Exhume 1. If you are below half HP, Bury 4. | Deal 5 damage twice. Exhume 1. If you are below half HP, Bury 4. | Costs 1 less |  |
| Gallows Snare | reaction (reaction) | Stone | rare | 1 | When an enemy trap activates: deal 6 damage to its owner and heal 2 HP. If your Crypt holds 3+ cards, Bury 4. | When an enemy trap activates: deal 8 damage to its owner and heal 3 HP. If your Crypt holds 3+ cards, Bury 4. | Gains Opener |  |
| Revenant Deflection | counter (reaction) | Stone | common | 1 | Counter (a trap or Reaction): gain 4 Guard. If you Exhumed this turn, apply 3 Shaken to its owner. | Counter (a trap or Reaction): gain 5 Guard. If you Exhumed this turn, apply 4 Shaken to its owner. | Gains Opener |  |
| Catacomb Ploy | skill | Stone | common | 1→0 | Bury 4. | Bury 4. | Gains Palm |  |
| Marrow Feint | attack | Stone | uncommon | 2 | Deal 6 damage. Exhume 1. If you are below half HP, Bury 4. | Deal 8 damage. Exhume 1. If you are below half HP, Bury 4. | Costs 1 less |  |
| Skeletal Trick | skill | Stone | uncommon | 1 | Gain 4 Guard. If you are below half HP, Exhume 1. | Gain 5 Guard. If you are below half HP, Exhume 1. | Gains Palm |  |
| Skeletal Ambush | reaction (attack) | Stone | rare | 0 | When attacked: heal 2 HP. If you Exhumed this turn, Exhume 1. | When attacked: heal 3 HP. If you Exhumed this turn, Exhume 1. | Gains Opener |  |
| Vigil Answer | counter (attack) | Stone | uncommon | 0 | Counter (an attack): apply 1 Shaken to the attacker. If you are below half HP, Bury 4. | Counter (an attack): apply 2 Shaken to the attacker. If you are below half HP, Bury 4. | Gains Opener |  |
| Skeletal Net | reaction (reaction) | Stone | common | 1 | When an enemy trap activates: deal 6 damage to its owner. If you have 2+ Reactions set, heal 4 HP. | When an enemy trap activates: deal 8 damage to its owner. If you have 2+ Reactions set, heal 5 HP. | Gains Opener |  |
| Vigil Snare | reaction (reaction) | Stone | rare | 1 | When an enemy trap activates: deal 3 damage to a random enemy for each card in your Crypt. If you have 2+ Reactions set, apply 3 Shaken to its owner. | When an enemy trap activates: deal 4 damage to a random enemy for each card in your Crypt. If you have 2+ Reactions set, apply 4 Shaken to its owner. | Gains Opener |  |
| Revenant Posture | skill | Stone | rare | 0 | Deal 1 damage to a random enemy for each card in your Crypt. If you Exhumed this turn, Exhume 1. | Deal 2 damage to a random enemy for each card in your Crypt. If you Exhumed this turn, Exhume 1. | Gains Palm |  |
| Marrow Catch | reaction (attack) | Stone | rare | 1 | When attacked: gain 6 Guard and Bury 2. If you are below half HP, Exhume 1. | When attacked: gain 8 Guard and Bury 2. If you are below half HP, Exhume 1. | Gains Opener |  |
| Catacomb Crash | attack | Stone | uncommon | 1 | Deal 2 damage to a random enemy 3 times. If you have 2+ Reactions set, Bury 2. | Deal 3 damage to a random enemy 3 times. If you have 2+ Reactions set, Bury 2. | Gains Palm |  |
| Banshee Trance | skill | Stone | uncommon | 1 | Gain 3 Guard. Heal 1 HP. If your Crypt holds 3+ cards, Bury 2. | Gain 4 Guard. Heal 2 HP. If your Crypt holds 3+ cards, Bury 2. | Gains Palm |  |
| Marrow Answer | counter (skill) | Stone | common | 1 | Counter (a non-attack): gain 5 Guard. If you Exhumed this turn, Bury 4. | Counter (a non-attack): gain 7 Guard. If you Exhumed this turn, Bury 4. | Gains Opener |  |
| Headstone Volley | attack | Stone | common | 2 | Deal 12 damage. If you have 2+ Reactions set, Bury 2. | Deal 16 damage. If you have 2+ Reactions set, Bury 2. | Costs 1 less |  |
| Banshee Lure | reaction (attack) | Stone | rare | 0 | When attacked: deal 2 damage to a random enemy for each card in your Crypt. If your Crypt holds 3+ cards, apply 2 Shaken to the attacker. | When attacked: deal 3 damage to a random enemy for each card in your Crypt. If your Crypt holds 3+ cards, apply 3 Shaken to the attacker. | Gains Opener |  |
| Catacomb Denial | counter (attack) | Stone | uncommon | 1 | Counter (an attack): gain 3 Guard and heal 1 HP. If your Crypt holds 3+ cards, Exhume 1. | Counter (an attack): gain 4 Guard and heal 2 HP. If your Crypt holds 3+ cards, Exhume 1. | Gains Opener |  |
| Catacomb Tactic | skill | Stone | rare | 0 | Apply 1 Shaken. If you Exhumed this turn, Exhume 1. | Apply 2 Shaken. If you Exhumed this turn, Exhume 1. | Gains Palm |  |
| Dirge Ward | skill | Stone | common | 1 | Gain 4 Guard. If you Exhumed this turn, deal 3 damage to a random enemy for each card in your Crypt. | Gain 5 Guard. If you Exhumed this turn, deal 4 damage to a random enemy for each card in your Crypt. | Gains Palm |  |
| Dirge Return | counter (reaction) | Stone | common | 1 | Counter (a trap or Reaction): gain 4 Guard. If you have 2+ Reactions set, deal 3 damage to a random enemy for each card in your Crypt. | Counter (a trap or Reaction): gain 5 Guard. If you have 2+ Reactions set, deal 4 damage to a random enemy for each card in your Crypt. | Gains Opener |  |
| Requiem Gambit | skill | Stone | uncommon | 2 | Gain 6 Guard. Heal 2 HP. If your Crypt holds 3+ cards, Exhume 1. | Gain 8 Guard. Heal 3 HP. If your Crypt holds 3+ cards, Exhume 1. | Costs 1 less |  |
| Catacomb Rune | reaction (skill) | Stone | uncommon | 0 | When an enemy uses a non-attack: apply 1 Shaken to it. If your Crypt holds 3+ cards, heal 2 HP. | When an enemy uses a non-attack: apply 2 Shaken to it. If your Crypt holds 3+ cards, heal 3 HP. | Gains Opener |  |
| Vigil Veto | counter (skill) | Stone | uncommon | 1 | Counter (a non-attack): gain 4 Guard and heal 1 HP. If you Exhumed this turn, apply 2 Shaken to it. | Counter (a non-attack): gain 5 Guard and heal 2 HP. If you Exhumed this turn, apply 3 Shaken to it. | Gains Opener |  |
| Vigil Ward | skill | Stone | uncommon | 2 | Gain 4 Guard. Exhume 1. If your Crypt holds 3+ cards, apply 2 Shaken. | Gain 5 Guard. Exhume 1. If your Crypt holds 3+ cards, apply 3 Shaken. | Costs 1 less |  |
| Ghoul Vow | skill | Stone | uncommon | 0 | Deal 1 damage to a random enemy for each card in your Crypt. If you have 2+ Reactions set, Bury 4. | Deal 2 damage to a random enemy for each card in your Crypt. If you have 2+ Reactions set, Bury 4. | Gains Palm |  |
| Revenant Focus | skill | Stone | rare | 1 | Exhume 1. If you have 2+ Reactions set, apply 2 Shaken. | Exhume 1. If you have 2+ Reactions set, apply 3 Shaken. | Gains Palm |  |
| Skeletal Spike | attack | Stone | uncommon | 2 | Deal 6 damage twice. Chain 2: Bury 2. | Deal 8 damage twice. Chain 2: Bury 2. | Costs 1 less |  |
| Elegy Tripwire | reaction (skill) | Stone | uncommon | 0 | When an enemy uses a non-attack: deal 1 damage to a random enemy for each card in your Crypt. If you have 2+ Reactions set, heal 2 HP. | When an enemy uses a non-attack: deal 2 damage to a random enemy for each card in your Crypt. If you have 2+ Reactions set, heal 3 HP. | Gains Opener |  |
| Marrow Trap | reaction (skill) | Stone | uncommon | 1 | When an enemy uses a non-attack: gain 4 Guard and heal 1 HP. If you Exhumed this turn, Exhume 1. | When an enemy uses a non-attack: gain 5 Guard and heal 2 HP. If you Exhumed this turn, Exhume 1. | Gains Opener |  |
| Banshee Slash | attack | Stone | uncommon | 1 | Deal 3 damage. Heal 1 HP. If you have 2+ Reactions set, Exhume 1. | Deal 4 damage. Heal 2 HP. If you have 2+ Reactions set, Exhume 1. | Gains Palm |  |
| Skeletal Quip | counter (attack) | Stone | rare | 1 | Counter (an attack): gain 5 Guard and deal 1 damage to a random enemy for each card in your Crypt. If you are below half HP, Bury 4. | Counter (an attack): gain 7 Guard and deal 2 damage to a random enemy for each card in your Crypt. If you are below half HP, Bury 4. | Gains Opener |  |
| Wraith Cleave | attack | Stone | rare | 2 | Deal 3 damage twice. Exhume 1. If you are below half HP, heal 6 HP. | Deal 4 damage twice. Exhume 1. If you are below half HP, heal 8 HP. | Costs 1 less |  |
| Headstone Gainsay | counter (attack) | Stone | common | 1 | Counter (an attack): gain 4 Guard. If you have 2+ Reactions set, Exhume 1. | Counter (an attack): gain 5 Guard. If you have 2+ Reactions set, Exhume 1. | Gains Opener |  |

## Dawn cards (125)

| Card | Type | Element | Rarity | Cost | Text | Upgraded (A) | Path B | Unlock |
|---|---|---|---|---|---|---|---|---|
| Objection! | counter (reaction) ★ | Radiant | starter | 1→0 | Counter (a trap or Reaction): Negate it. | Counter (a trap or Reaction): Negate it. | Gains Opener |  |
| Gavel Strike | attack ★ | Radiant | starter | 1 | Deal 6 damage. Gain 1 Verdict. | Deal 9 damage. Gain 1 Verdict. | Gains Palm |  |
| Dawn Ward | reaction (attack) ★ | Radiant | starter | 1 | When attacked: gain 8 Guard and 1 Verdict. | When attacked: gain 11 Guard and 1 Verdict. | Gains Opener |  |
| Sidebar | counter (reaction) ★ | Radiant | common | 0 | Counter (a trap or Reaction): gain 5 Guard. Draw 1 card. | Counter (a trap or Reaction): gain 8 Guard. Draw 1 card. | Gains Opener |  |
| Contempt of Court | counter (attack) ★ | Radiant | common | 1 | Counter (an attack): apply 2 Shaken to the attacker before it hits and gain 5 Guard. | Counter (an attack): apply 3 Shaken to the attacker before it hits and gain 8 Guard. | Gains Opener |  |
| Testimony | skill ★ | Radiant | common | 1 | Gain 7 Guard. Gain 1 Verdict. | Gain 10 Guard. Gain 1 Verdict. | Gains Palm |  |
| Bailiff | attack ★ | Radiant | common | 1 | Deal 5 damage twice. If you have Verdict, apply 1 Shaken. | Deal 7 damage twice. If you have Verdict, apply 1 Shaken. | Gains Palm |  |
| Cross-Examine | skill ★ | Radiant | common | 1 | Reveal enemy traps this turn. Draw 2 cards. | Reveal enemy traps this turn. Draw 3 cards. | Gains Palm |  |
| Lumen Lance | attack ★ | Radiant | common | 1 | Deal 7 damage. Heal 2 HP. | Deal 10 damage. Heal 3 HP. | Gains Palm |  |
| Sentence | attack ★ | Radiant | uncommon | 2 | Spend all Verdict: deal 8 damage, +6 per Verdict spent. | Spend all Verdict: deal 11 damage, +8 per Verdict spent. | Costs 1 less |  |
| Appeal | counter (reaction) ★ | Radiant | uncommon | 1 | Counter (a trap or Reaction): Negate it and deal 6 damage to its owner. | Counter (a trap or Reaction): Negate it and deal 10 damage to its owner. | Gains Opener |  |
| Injunction | counter (skill) ★ | Radiant | uncommon | 1→0 | Counter (a non-attack): Negate it. | Counter (a non-attack): Negate it. | Gains Opener |  |
| Due Process | power ★ | Radiant | uncommon | 1→0 | Your Counters cost 1 less. | Your Counters cost 1 less. | Gains Opener |  |
| Sanctuary | power ★ | Radiant | uncommon | 1 | Whenever you play a Counter, gain 6 Guard. | Whenever you play a Counter, gain 9 Guard. | Gains Opener |  |
| Halo | skill ★ | Radiant | uncommon | 1 | Gain 5 Guard. Heal 3 HP. Gain 1 Verdict. | Gain 8 Guard. Heal 4 HP. Gain 1 Verdict. | Gains Palm |  |
| Verdict Rendered | skill ★ | Radiant | uncommon | 1 | Spend all Verdict: gain 5 Guard and draw 1 card per Verdict spent. | Spend all Verdict: gain 7 Guard and draw 1 card per Verdict spent. | Gains Palm |  |
| The Final Word | attack ★ | Radiant | rare | 1 | Deal 6 damage. If you played a Counter this turn, deal it 3 times instead. | Deal 9 damage. If you played a Counter this turn, deal it 3 times instead. | Gains Palm |  |
| High Court | power ★ | Radiant | rare | 2 | Whenever you gain Verdict, deal 5 damage to a random enemy. | Whenever you gain Verdict, deal 8 damage to a random enemy. | Costs 1 less |  |
| Overrule | counter (any) ★ | Radiant | rare | 2→1 | Counter (anything an enemy does): Negate it. Fold. | Counter (anything an enemy does): Negate it. Fold. | No longer Folds |  |
| Star Chamber | skill ★ | Radiant | rare | 1 | Disrupt ALL enemy traps. Gain 1 Verdict per trap destroyed. Fold. | Disrupt ALL enemy traps. Gain 1 Verdict per trap destroyed. | Gains Palm |  |
| Last Judgment | attack ★ | Radiant | legendary | 3→2 | Spend all Verdict: deal 10 damage to ALL enemies, +5 per Verdict spent. Fold. | Spend all Verdict: deal 10 damage to ALL enemies, +5 per Verdict spent. Fold. | No longer Folds |  |
| Eternal Objection | counter (any) ★ | Radiant | legendary | 2→1 | Counter (anything an enemy does): Negate it. Gain 0 Guard. Goes back to your hand. | Counter (anything an enemy does): Negate it. Gain 6 Guard. Goes back to your hand. | Gains Opener |  |
| Gleaming Creed | power | Radiant | uncommon | 1 | At the start of your turn, gain 1 Verdict. | At the start of your turn, gain 2 Verdict. | Gains Opener |  |
| Righteous Aura | power | Radiant | rare | 2 | At the end of your turn, heal 3 HP for each Counter you played this turn. | At the end of your turn, heal 4 HP for each Counter you played this turn. | Costs 1 less |  |
| Haloed Sigil | skill | Radiant | rare | 2 | Gain 7 Guard. Draw 1 card. Gain 1 Verdict. | Gain 9 Guard. Draw 1 card. Gain 1 Verdict. | Costs 1 less |  |
| Radiant Glyph | reaction (reaction) | Radiant | common | 1 | When an enemy trap activates: deal 5 damage to its owner and apply 2 Shaken to its owner. | When an enemy trap activates: deal 7 damage to its owner and apply 3 Shaken to its owner. | Gains Opener |  |
| Sworn Cleave | attack | Radiant | uncommon | 2 | Deal 10 damage. Apply 2 Shaken. | Deal 13 damage. Apply 3 Shaken. | Costs 1 less |  |
| Radiant Crash | attack | Radiant | rare | 3 | Deal 16 damage. Heal 4 HP. Gain 1 Verdict. | Deal 21 damage. Heal 5 HP. Gain 1 Verdict. | Costs 1 less |  |
| Aurora Ambush | reaction (attack) | Radiant | common | 0 | When attacked: heal 3 HP. | When attacked: heal 4 HP. | Gains Opener |  |
| Aurora Barrage | attack | Radiant | common | 2 | Deal 7 damage to ALL enemies. Gain 1 Verdict. | Deal 9 damage to ALL enemies. Gain 1 Verdict. | Costs 1 less |  |
| Radiant Objection | counter (attack) | Radiant | rare | 1 | Counter (an attack): gain 4 Guard and heal 2 HP and gain 1 Verdict. | Counter (an attack): gain 5 Guard and heal 3 HP and gain 1 Verdict. | Gains Opener |  |
| Gleaming Cleave | attack | Radiant | common | 2 | Deal 11 damage. Gain 1 Verdict. | Deal 15 damage. Gain 1 Verdict. | Costs 1 less |  |
| Blessed Aegis | skill | Radiant | common | 0 | Heal 2 HP. | Heal 3 HP. | Gains Palm |  |
| Judicial Barrage | attack | Radiant | common | 1 | Deal 2 damage to a random enemy 3 times. Apply 1 Shaken. | Deal 3 damage to a random enemy 3 times. Apply 2 Shaken. | Gains Palm |  |
| Sacred Cut | attack | Radiant | rare | 3 | Deal 16 damage. Apply 3 Shaken. Gain 1 Verdict. | Deal 21 damage. Apply 4 Shaken. Gain 1 Verdict. | Costs 1 less |  |
| Solemn Rune | reaction (attack) | Radiant | common | 1 | When attacked: deal 6 damage to the attacker and gain 1 Verdict. | When attacked: deal 8 damage to the attacker and gain 1 Verdict. | Gains Opener |  |
| Sworn Writ | counter (attack) | Radiant | uncommon | 1 | Counter (an attack): gain 5 Guard and gain 1 Verdict. | Counter (an attack): gain 7 Guard and gain 1 Verdict. | Gains Opener |  |
| Dawn Snare | reaction (attack) | Radiant | common | 0 | When attacked: apply 1 Exposed to ALL enemies. | When attacked: apply 2 Exposed to ALL enemies. | Gains Opener |  |
| Radiant Sigil | skill | Radiant | rare | 2 | Draw 2 cards. Apply 1 Shaken. Gain 1 Verdict. | Draw 2 cards. Apply 2 Shaken. Gain 1 Verdict. | Costs 1 less |  |
| Vigilant Blow | attack | Radiant | common | 2 | Deal 9 damage. Gain 4 Guard. | Deal 12 damage. Gain 5 Guard. | Costs 1 less |  |
| Vigilant Pit | reaction (reaction) | Radiant | uncommon | 1 | When an enemy trap activates: deal 5 damage to its owner and gain 4 Guard. | When an enemy trap activates: deal 7 damage to its owner and gain 5 Guard. | Gains Opener |  |
| Sacred Ruling | counter (reaction) | Radiant | uncommon | 1 | Counter (a trap or Reaction): gain 5 Guard and gain 1 Verdict. | Counter (a trap or Reaction): gain 7 Guard and gain 1 Verdict. | Gains Opener |  |
| Lawful Trick | skill | Radiant | common | 2 | Gain 6 Guard. Heal 3 HP. | Gain 8 Guard. Heal 4 HP. | Costs 1 less |  |
| Morning Crash | attack | Radiant | rare | 2 | Deal 4 damage twice. Draw 1 card. Gain 1 Verdict. | Deal 5 damage twice. Draw 1 card. Gain 1 Verdict. | Costs 1 less |  |
| Vigilant Volley | attack | Radiant | common | 3 | Deal 17 damage. Gain 1 Verdict. | Deal 23 damage. Gain 1 Verdict. | Costs 1 less |  |
| Sacred Stance | skill | Radiant | common | 1 | Heal 4 HP. | Heal 5 HP. | Gains Palm |  |
| Haloed Blow | attack | Radiant | rare | 1 | Deal 2 damage to a random enemy 3 times. Heal 1 HP. Gain 1 Verdict. | Deal 3 damage to a random enemy 3 times. Heal 2 HP. Gain 1 Verdict. | Gains Palm |  |
| Righteous Coil | reaction (reaction) | Radiant | common | 1 | When an enemy trap activates: deal 5 damage to its owner and heal 2 HP. | When an enemy trap activates: deal 7 damage to its owner and heal 3 HP. | Gains Opener |  |
| Honest Ward | skill | Radiant | uncommon | 2 | Gain 10 Guard. Gain 1 Verdict. | Gain 13 Guard. Gain 1 Verdict. | Costs 1 less |  |
| Dawn Jab | attack | Radiant | uncommon | 2 | Deal 5 damage twice. Heal 3 HP. | Deal 7 damage twice. Heal 4 HP. | Costs 1 less |  |
| Judicial Rend | attack | Radiant | common | 2 | Deal 5 damage twice. Gain 1 Verdict. | Deal 7 damage twice. Gain 1 Verdict. | Costs 1 less |  |
| Aurora Tripwire | reaction (attack) | Radiant | rare | 1 | When attacked: gain 4 Guard and heal 2 HP and gain 1 Verdict. | When attacked: gain 5 Guard and heal 3 HP and gain 1 Verdict. | Gains Opener |  |
| Dawn Shroud | skill | Radiant | common | 1 | Gain 6 Guard. | Gain 8 Guard. | Gains Palm |  |
| Dawn Objection | counter (attack) | Radiant | common | 0 | Counter (an attack): gain 4 Guard. | Counter (an attack): gain 5 Guard. | Gains Opener |  |
| Bolt of Judgment | counter (reaction) ⧉ (storm) | Radiant | uncommon | 1 | Counter (a trap or Reaction): Negate it and gain 1 Charge. | Counter (a trap or Reaction): Negate it and gain 2 Charge. | Gains Opener |  |
| Storm Oath | skill ⧉ (storm) | Radiant | rare | 1 | Gain 1 Verdict. Gain 2 Charge. If you played a Counter this turn, gain 1 energy. | Gain 1 Verdict. Gain 3 Charge. If you played a Counter this turn, gain 1 energy. | Gains Palm |  |
| Cold Justice | attack ⧉ (rime) | Radiant | uncommon | 1 | Deal 4 damage. Apply 2 Chill. If the target is Frozen, gain 1 Verdict. | Deal 5 damage. Apply 3 Chill. If the target is Frozen, gain 1 Verdict. | Gains Palm |  |
| Frozen Gavel | counter (attack) ⧉ (rime) | Radiant | uncommon | 1 | Counter (an attack): apply 4 Chill to the attacker. If you have Verdict, gain 5 Guard. | Counter (an attack): apply 5 Chill to the attacker. If you have Verdict, gain 7 Guard. | Gains Opener |  |
| Winter Court | skill ⧉ (rime) | Radiant | rare | 1 | Apply 3 Chill to ALL enemies. Gain 1 Verdict. | Apply 4 Chill to ALL enemies. Gain 1 Verdict. | Gains Palm |  |
| Sworn Hound | skill ⧉ (beast) | Radiant | uncommon | 1 | Summon Wolf 1. Gain 1 Verdict. | Summon Wolf 2. Gain 1 Verdict. | Gains Palm |  |
| Guardian Bear | counter (attack) ⧉ (beast) | Radiant | rare | 1 | Counter (an attack): Summon Bear 2 and gain 4 Guard. | Counter (an attack): Summon Bear 3 and gain 5 Guard. | Gains Opener |  |
| Bedrock Law | skill ⧉ (stone) | Radiant | uncommon | 1 | Gain 3 Fortify. Gain 1 Verdict. | Gain 4 Fortify. Gain 1 Verdict. | Gains Palm |  |
| Stone Tablet | skill ⧉ (stone) | Radiant | uncommon | 1 | Gain 4 Guard. If you have Verdict, gain 3 Fortify. | Gain 5 Guard. If you have Verdict, gain 4 Fortify. | Gains Palm |  |
| Seismic Ruling | counter (reaction) ⧉ (stone) | Radiant | rare | 1 | Counter (a trap or Reaction): Negate it and apply 3 Tremor to its owner. | Counter (a trap or Reaction): Negate it and apply 4 Tremor to its owner. | Gains Opener |  |
| Holy Water | skill ⧉ (aether) | Radiant | uncommon | 1 | Heal 3 HP. Attune to the element that beats the first enemy. | Heal 4 HP. Attune to the element that beats the first enemy. | Gains Palm |  |
| Alembic of Truth | skill ⧉ (aether) | Radiant | rare | 2 | Draw 2 cards. Gain 1 Verdict. If you played 2+ elements this turn, heal 3 HP. | Draw 2 cards. Gain 1 Verdict. If you played 2+ elements this turn, heal 4 HP. | Costs 1 less |  |
| Twilight Oath | skill ⧉ (dusk) | Radiant | uncommon | 2→1 | Gain 1 Veil. Gain 1 Verdict. | Gain 1 Veil. Gain 1 Verdict. | Gains Palm |  |
| Inquisitor | counter (skill) ⧉ (dusk) | Radiant | rare | 1→0 | Counter (a non-attack): Negate it. If it has Mark, gain 2 Verdict. | Counter (a non-attack): Negate it. If it has Mark, gain 2 Verdict. | Gains Opener |  |
| Chief Justice | skill 🦋 | Radiant | evolved | 2 | Gain 10 Guard. Gain 2 Verdict. If you played a Counter this turn, draw 1 card. | Gain 13 Guard. Gain 2 Verdict. If you played a Counter this turn, draw 1 card. | Costs 1 less |  |
| Novice Clerk | skill 🦋 | Radiant | common | 2 | Gain 9 Guard. Gain 1 Verdict. Evolve 4 (Chief Justice). | Gain 12 Guard. Gain 1 Verdict. Evolve 4 (Chief Justice). | Costs 1 less |  |
| Marshal's Mace | attack 🦋 | Radiant | evolved | 1 | Deal 5 damage. Apply 1 Shaken. If you have Verdict, spend all Verdict: gain 2 Guard per Verdict spent. | Deal 7 damage. Apply 2 Shaken. If you have Verdict, spend all Verdict: gain 3 Guard per Verdict spent. | Gains Palm |  |
| Bailiff's Baton | attack 🦋 | Radiant | common | 1 | Deal 4 damage. If you have Verdict, apply 1 Shaken. Evolve 4 (Marshal's Mace). | Deal 5 damage. If you have Verdict, apply 2 Shaken. Evolve 4 (Marshal's Mace). | Gains Palm |  |
| Supreme Claim | counter (reaction) 🦋 | Radiant | evolved | 1 | Counter (a trap or Reaction): gain 5 Guard and gain 1 Verdict. If you are below half HP, heal 5 HP. | Counter (a trap or Reaction): gain 7 Guard and gain 1 Verdict. If you are below half HP, heal 7 HP. | Gains Opener |  |
| Small Claim | counter (reaction) 🦋 | Radiant | common | 1 | Counter (a trap or Reaction): gain 5 Guard and gain 1 Verdict. Evolve 3 (Supreme Claim). | Counter (a trap or Reaction): gain 7 Guard and gain 1 Verdict. Evolve 3 (Supreme Claim). | Gains Opener |  |
| Sun Cathedral | skill 🦋 | Radiant | evolved | 1 | Heal 3 HP. Gain 1 Verdict. If you are below half HP, gain 2 Verdict. | Heal 4 HP. Gain 1 Verdict. If you are below half HP, gain 2 Verdict. | Gains Palm |  |
| Candle Vigil | skill 🦋 | Radiant | common | 1 | Heal 2 HP. Gain 1 Verdict. Evolve 3 (Sun Cathedral). | Heal 3 HP. Gain 1 Verdict. Evolve 3 (Sun Cathedral). | Gains Palm |  |
| Oathkeeper | counter (attack) 🦋 | Radiant | evolved | 1 | Counter (an attack): gain 5 Guard and heal 2 HP. If you have Verdict, gain 2 Verdict. | Counter (an attack): gain 7 Guard and heal 3 HP. If you have Verdict, gain 2 Verdict. | Gains Opener |  |
| Oath Page | counter (attack) 🦋 | Radiant | uncommon | 1 | Counter (an attack): gain 5 Guard. If you have Verdict, heal 3 HP. Evolve 4 (Oathkeeper). | Counter (an attack): gain 7 Guard. If you have Verdict, heal 4 HP. Evolve 4 (Oathkeeper). | Gains Opener |  |
| Court of Dawn | power ★ | Radiant | uncommon | 1 | Whenever a chain of 2+ links resolves, heal 2 HP. | Whenever a chain of 2+ links resolves, heal 3 HP. | Gains Opener |  |
| Gavel Engine | power ★ | Radiant | rare | 2 | Whenever you play a Counter, deal 5 damage to ALL enemies. | Whenever you play a Counter, deal 6 damage to ALL enemies. | Costs 1 less |  |
| Sunrise Oath | power ★ | Radiant | uncommon | 1 | At the start of your turn, if you have Verdict, gain 7 Guard. | At the start of your turn, if you have Verdict, gain 8 Guard. | Gains Opener |  |
| Hall of Sentences | power ★ | Radiant | uncommon | 2 | At the end of your turn, if you have Verdict, deal 5 damage to a random enemy 3 times. | At the end of your turn, if you have Verdict, deal 6 damage to a random enemy 3 times. | Costs 1 less |  |
| Paladin Ram | attack | Radiant | uncommon | 2 | Deal 5 damage to ALL enemies. Spend all Verdict: gain 3 Guard per Verdict spent. If you are below half HP, draw 1 card. | Deal 7 damage to ALL enemies. Spend all Verdict: gain 4 Guard per Verdict spent. If you are below half HP, draw 1 card. | Costs 1 less |  |
| Shining Charm | skill | Radiant | rare | 0 | Apply 1 Shaken. If this is the first card you played this turn, gain 1 Verdict. | Apply 2 Shaken. If this is the first card you played this turn, gain 1 Verdict. | Gains Palm |  |
| Exalted Reversal | counter (reaction) | Radiant | uncommon | 1 | Counter (a trap or Reaction): gain 4 Guard and spend all Verdict: gain 1 Guard per Verdict spent. If you are below half HP, heal 3 HP. | Counter (a trap or Reaction): gain 5 Guard and spend all Verdict: gain 2 Guard per Verdict spent. If you are below half HP, heal 4 HP. | Gains Opener |  |
| Temple Canticle | skill | Radiant | uncommon | 2 | Gain 7 Guard. Apply 2 Shaken. Chain 2: Gain 1 Verdict. | Gain 9 Guard. Apply 3 Shaken. Chain 2: Gain 1 Verdict. | Costs 1 less |  |
| Illumined Retaliation | counter (attack) | Radiant | rare | 0 | Counter (an attack): apply 1 Shaken to the attacker. If you have Verdict, spend all Verdict: gain 2 Guard per Verdict spent. | Counter (an attack): apply 2 Shaken to the attacker. If you have Verdict, spend all Verdict: gain 3 Guard per Verdict spent. | Gains Opener |  |
| Gilded-Sun Stance | skill | Radiant | uncommon | 0 | Heal 1 HP. If you are below half HP, draw 1 card. | Heal 2 HP. If you are below half HP, draw 1 card. | Gains Palm |  |
| Merciful Catch | reaction (skill) | Radiant | uncommon | 1 | When an enemy uses a non-attack: gain 6 Guard. If you played a Counter this turn, draw 1 card. | When an enemy uses a non-attack: gain 8 Guard. If you played a Counter this turn, draw 1 card. | Gains Opener |  |
| Clarion Sigil | skill | Radiant | rare | 1 | Spend all Verdict: gain 3 Guard per Verdict spent. Chain 2: Draw 1 card. | Spend all Verdict: gain 4 Guard per Verdict spent. Chain 2: Draw 1 card. | Gains Palm |  |
| Just Rite | skill | Radiant | uncommon | 1 | Apply 2 Shaken. If you have Verdict, gain 2 Verdict. | Apply 3 Shaken. If you have Verdict, gain 2 Verdict. | Gains Palm |  |
| Just Deadfall | reaction (reaction) | Radiant | common | 1 | When an enemy trap activates: deal 6 damage to its owner. If you have Verdict, spend all Verdict: gain 3 Guard per Verdict spent. | When an enemy trap activates: deal 8 damage to its owner. If you have Verdict, spend all Verdict: gain 4 Guard per Verdict spent. | Gains Opener |  |
| Faithful Shroud | skill | Radiant | rare | 1→0 | Gain 2 Verdict. Chain 2: Draw 1 card. | Gain 2 Verdict. Chain 2: Draw 1 card. | Gains Palm |  |
| Lucent Swipe | attack | Radiant | uncommon | 2 | Deal 10 damage. If you have Verdict, heal 5 HP. | Deal 13 damage. If you have Verdict, heal 7 HP. | Costs 1 less |  |
| Noble Trance | skill | Radiant | uncommon | 1 | Gain 3 Guard. Apply 1 Shaken. Chain 2: Spend all Verdict: gain 2 Guard per Verdict spent. | Gain 4 Guard. Apply 2 Shaken. Chain 2: Spend all Verdict: gain 3 Guard per Verdict spent. | Gains Palm |  |
| Hallowed Smite | attack | Radiant | uncommon | 2 | Deal 4 damage to ALL enemies. Draw 1 card. If you are below half HP, gain 2 Verdict. | Deal 5 damage to ALL enemies. Draw 1 card. If you are below half HP, gain 2 Verdict. | Costs 1 less |  |
| Illumined Spike | attack | Radiant | uncommon | 0 | Deal 3 damage. If this is the first card you played this turn, gain 1 Verdict. | Deal 4 damage. If this is the first card you played this turn, gain 1 Verdict. | Gains Palm |  |
| Shining Trap | reaction (attack) | Radiant | rare | 1 | When attacked: deal 6 damage to the attacker and gain 1 Verdict. If you have Guard, apply 2 Shaken to the attacker. | When attacked: deal 8 damage to the attacker and gain 1 Verdict. If you have Guard, apply 3 Shaken to the attacker. | Gains Opener |  |
| Hallowed Denial | counter (reaction) | Radiant | rare | 1 | Counter (a trap or Reaction): gain 4 Guard and heal 2 HP. If you have Verdict, apply 2 Shaken to its owner. | Counter (a trap or Reaction): gain 5 Guard and heal 3 HP. If you have Verdict, apply 3 Shaken to its owner. | Gains Opener |  |
| Clarion Clasp | reaction (reaction) | Radiant | uncommon | 1→0 | When an enemy trap activates: gain 1 Verdict. If you are below half HP, draw 1 card. | When an enemy trap activates: gain 1 Verdict. If you are below half HP, draw 1 card. | Gains Opener |  |
| Merciful Mantra | skill | Radiant | common | 1 | Gain 4 Guard. Spend all Verdict: gain 1 Guard per Verdict spent. | Gain 5 Guard. Spend all Verdict: gain 2 Guard per Verdict spent. | Gains Palm |  |
| Hallowed Cleave | attack | Radiant | uncommon | 1 | Deal 5 damage. If you have Verdict, gain 2 Verdict. | Deal 7 damage. If you have Verdict, gain 2 Verdict. | Gains Palm |  |
| Noble Gesture | skill | Radiant | uncommon | 1 | Gain 4 Guard. If you have Verdict, apply 2 Shaken. | Gain 5 Guard. If you have Verdict, apply 3 Shaken. | Gains Palm |  |
| Illumined Barrage | attack | Radiant | uncommon | 2 | Deal 4 damage twice. Heal 3 HP. If you are below half HP, gain 2 Verdict. | Deal 5 damage twice. Heal 4 HP. If you are below half HP, gain 2 Verdict. | Costs 1 less |  |
| Lucent Veil | skill | Radiant | rare | 1 | Gain 4 Guard. Heal 1 HP. If you played a Counter this turn, draw 1 card. | Gain 5 Guard. Heal 2 HP. If you played a Counter this turn, draw 1 card. | Gains Palm |  |
| Bright Burst | attack | Radiant | common | 1 | Deal 4 damage. If you have Verdict, apply 1 Shaken. | Deal 5 damage. If you have Verdict, apply 2 Shaken. | Gains Palm |  |
| Anointed Bait | reaction (attack) | Radiant | uncommon | 1 | When attacked: deal 5 damage to the attacker and apply 1 Shaken to the attacker. If you have Verdict, spend all Verdict: gain 2 Guard per Verdict spent. | When attacked: deal 7 damage to the attacker and apply 2 Shaken to the attacker. If you have Verdict, spend all Verdict: gain 3 Guard per Verdict spent. | Gains Opener |  |
| Devout Mirror | reaction (skill) | Radiant | rare | 1 | When an enemy uses a non-attack: gain 4 Guard and gain 2 Verdict. If you are below half HP, apply 2 Shaken to it. | When an enemy uses a non-attack: gain 5 Guard and gain 2 Verdict. If you are below half HP, apply 3 Shaken to it. | Gains Opener |  |
| Noble Rend | attack | Radiant | uncommon | 2 | Deal 5 damage. Draw 1 card. If you have Verdict, gain 2 Verdict. | Deal 7 damage. Draw 1 card. If you have Verdict, gain 2 Verdict. | Costs 1 less |  |
| Lucent Catch | reaction (attack) | Radiant | uncommon | 1 | When attacked: gain 4 Guard and gain 1 Verdict. If you are below half HP, draw 1 card. | When attacked: gain 5 Guard and gain 1 Verdict. If you are below half HP, draw 1 card. | Gains Opener |  |
| Lucent Hook | attack | Radiant | common | 2 | Deal 9 damage. If you have Verdict, draw 1 card. | Deal 12 damage. If you have Verdict, draw 1 card. | Costs 1 less |  |
| Shining Gesture | skill | Radiant | uncommon | 2 | Gain 4 Guard. Draw 1 card. If you have Verdict, heal 2 HP. | Gain 5 Guard. Draw 1 card. If you have Verdict, heal 3 HP. | Costs 1 less |  |
| Lucent Trance | skill | Radiant | rare | 2→1 | Gain 1 Verdict. If you have Guard, draw 1 card. | Gain 1 Verdict. If you have Guard, draw 1 card. | Gains Palm |  |
| Illumined Cut | attack | Radiant | uncommon | 2 | Deal 5 damage. Draw 1 card. If you are below half HP, apply 3 Shaken. | Deal 7 damage. Draw 1 card. If you are below half HP, apply 4 Shaken. | Costs 1 less |  |
| Just Charm | skill | Radiant | uncommon | 0 | Spend all Verdict: gain 2 Guard per Verdict spent. Chain 2: Apply 1 Shaken. | Spend all Verdict: gain 3 Guard per Verdict spent. Chain 2: Apply 2 Shaken. | Gains Palm |  |
| Devout Rejoinder | counter (skill) | Radiant | common | 1 | Counter (a non-attack): gain 4 Guard and spend all Verdict: gain 2 Guard per Verdict spent. | Counter (a non-attack): gain 5 Guard and spend all Verdict: gain 3 Guard per Verdict spent. | Gains Opener |  |
| Merciful Omen | skill | Radiant | common | 0 | Spend all Verdict: gain 2 Guard per Verdict spent. | Spend all Verdict: gain 3 Guard per Verdict spent. | Gains Palm |  |
| Gilded-Sun Hook | attack | Radiant | common | 1 | Deal 4 damage. Spend all Verdict: gain 1 Guard per Verdict spent. | Deal 5 damage. Spend all Verdict: gain 2 Guard per Verdict spent. | Gains Palm |  |
| Hallowed Gambit | skill | Radiant | uncommon | 1 | Gain 3 Guard. Heal 1 HP. If you are below half HP, spend all Verdict: gain 3 Guard per Verdict spent. | Gain 4 Guard. Heal 2 HP. If you are below half HP, spend all Verdict: gain 4 Guard per Verdict spent. | Gains Palm |  |
| Faithful Ambush | reaction (skill) | Radiant | uncommon | 0 | When an enemy uses a non-attack: heal 2 HP. If you played a Counter this turn, spend all Verdict: gain 3 Guard per Verdict spent. | When an enemy uses a non-attack: heal 3 HP. If you played a Counter this turn, spend all Verdict: gain 4 Guard per Verdict spent. | Gains Opener |  |
| Bright Net | reaction (reaction) | Radiant | uncommon | 1 | When an enemy trap activates: deal 3 damage to its owner and gain 2 Verdict. If you have Guard, heal 2 HP. | When an enemy trap activates: deal 4 damage to its owner and gain 2 Verdict. If you have Guard, heal 3 HP. | Gains Opener |  |
| Noble Net | reaction (attack) | Radiant | uncommon | 1 | When attacked: gain 5 Guard. If you have Verdict, heal 3 HP. | When attacked: gain 7 Guard. If you have Verdict, heal 4 HP. | Gains Opener |  |
| Bright Vow | skill | Radiant | uncommon | 0 | Spend all Verdict: gain 2 Guard per Verdict spent. If you are below half HP, heal 2 HP. | Spend all Verdict: gain 3 Guard per Verdict spent. If you are below half HP, heal 3 HP. | Gains Palm |  |
| Exalted Lure | reaction (attack) | Radiant | uncommon | 0 | When attacked: apply 1 Shaken to the attacker. If you have Guard, gain 2 Verdict. | When attacked: apply 2 Shaken to the attacker. If you have Guard, gain 2 Verdict. | Gains Opener |  |
| Shining Smite | attack | Radiant | uncommon | 1 | Deal 4 damage. Heal 1 HP. If you played a Counter this turn, apply 2 Shaken. | Deal 5 damage. Heal 2 HP. If you played a Counter this turn, apply 3 Shaken. | Gains Palm |  |

## Storm cards (146)

| Card | Type | Element | Rarity | Cost | Text | Upgraded (A) | Path B | Unlock |
|---|---|---|---|---|---|---|---|---|
| Static Jab | attack ★ | Storm | starter | 1 | Deal 6 damage. Apply 3 Shock. Gain 1 Charge. | Deal 8 damage. Apply 4 Shock. Gain 1 Charge. | Gains Palm |  |
| Spark Ward | reaction (attack) ★ | Storm | starter | 1 | When attacked: gain 7 Guard and apply 3 Shock to the attacker. | When attacked: gain 9 Guard and apply 4 Shock to the attacker. | Gains Opener |  |
| Thunderclap | attack ★ | Storm | starter | 1 | Spend all Charge: deal 5 damage to ALL enemies, +3 per Charge spent. | Spend all Charge: deal 7 damage to ALL enemies, +4 per Charge spent. | Gains Palm |  |
| Arc Lash | attack ★ | Storm | common | 1 | Deal 4 damage to a random enemy 3 times. | Deal 5 damage to a random enemy 3 times. | Gains Palm |  |
| Capacitor | skill ★ | Storm | common | 1 | Gain 6 Guard. Gain 2 Charge. | Gain 8 Guard. Gain 3 Charge. | Gains Palm |  |
| Ion Surge | skill ★ | Storm | common | 0 | Gain 1 Charge. Draw 1 card. | Gain 2 Charge. Draw 1 card. | Gains Palm |  |
| Forked Bolt | attack ★ | Storm | common | 1 | Deal 6 damage. Deal 4 damage to a random enemy. | Deal 8 damage. Deal 6 damage to a random enemy. | Gains Palm |  |
| Galvanize | skill ★ | Storm | common | 1 | Apply 6 Shock. Gain 1 Charge. | Apply 9 Shock. Gain 1 Charge. | Gains Palm |  |
| Grounding | counter (attack) ★ | Storm | common | 1 | Counter (an attack): gain 10 Guard and 1 Charge. | Counter (an attack): gain 14 Guard and 1 Charge. | Gains Opener |  |
| Crackle | counter (reaction) ★ | Storm | common | 0 | Counter (a trap or Reaction): deal 5 damage to its owner and apply 3 Shock. | Counter (a trap or Reaction): deal 7 damage to its owner and apply 4 Shock. | Gains Opener |  |
| Overload | attack ★ | Storm | uncommon | 2 | Spend all Charge: deal 10 damage, +5 per Charge spent. | Spend all Charge: deal 14 damage, +6 per Charge spent. | Costs 1 less |  |
| Chain Lightning | attack ★ | Storm | uncommon | 2 | Deal 7 damage to ALL enemies. Chain 3: do it again. | Deal 9 damage to ALL enemies. Chain 3: do it again. | Costs 1 less |  |
| Storm Front | skill ★ | Storm | uncommon | 1 | Apply 3 Shock to ALL enemies. Gain 1 Charge. | Apply 5 Shock to ALL enemies. Gain 1 Charge. | Gains Palm |  |
| Lightning Rod | reaction (attack) ★ | Storm | uncommon | 0 | When attacked: gain 4 Guard and 2 Charge. | When attacked: gain 6 Guard and 3 Charge. | Gains Opener |  |
| Static Veil | reaction (skill) ★ | Storm | uncommon | 1 | When an enemy uses a non-attack: apply 5 Shock to it and gain 1 Charge. | When an enemy uses a non-attack: apply 8 Shock to it and gain 1 Charge. | Gains Opener |  |
| Ball Lightning | attack ★ | Storm | uncommon | 1 | Palm. Deal 8 damage. | Palm. Deal 11 damage. | Gains Opener |  |
| Dynamo | power ★ | Storm | uncommon | 1 | At the start of your turn, gain 1 Charge. | At the start of your turn, gain 2 Charge. | Gains Opener |  |
| Conductor | power ★ | Storm | rare | 1 | Whenever you apply Shock, apply 2 more. | Whenever you apply Shock, apply 3 more. | Gains Opener |  |
| Thunderhead | attack ★ | Storm | rare | 3 | Deal 8 damage to a random enemy 4 times. | Deal 10 damage to a random enemy 4 times. | Costs 1 less |  |
| Eye of the Storm | skill ★ | Storm | rare | 1 | Gain 10 Guard. Double your Charge. | Gain 14 Guard. Double your Charge. | Gains Palm |  |
| Skyfall | attack ★ | Storm | legendary | 3 | Spend all Charge: deal 6 damage to ALL enemies once per Charge spent (at least once). Fold. | Spend all Charge: deal 8 damage to ALL enemies once per Charge spent (at least once). Fold. | No longer Folds |  |
| Tempest Fury | power ★ | Storm | legendary | 2→1 | Whenever you spend Charge, deal that much damage to ALL enemies. | Whenever you spend Charge, deal that much damage to ALL enemies. | Gains Opener |  |
| Sparking Covenant | power | Storm | uncommon | 1 | At the end of your turn, apply 3 Shock to ALL enemies. | At the end of your turn, apply 4 Shock to ALL enemies. | Gains Opener |  |
| Charged Creed | power | Storm | rare | 1 | Whenever you spend Charge, gain 2 Guard per Charge spent. | Whenever you spend Charge, gain 3 Guard per Charge spent. | Gains Opener |  |
| Lightning Burst | attack | Storm | common | 2 | Deal 9 damage. Apply 3 Shock to ALL enemies. | Deal 12 damage. Apply 4 Shock to ALL enemies. | Costs 1 less |  |
| Tempest Stance | skill | Storm | rare | 1 | Draw 1 card. Gain 1 Charge. Apply 1 Shock. | Draw 1 card. Gain 2 Charge. Apply 2 Shock. | Gains Palm |  |
| Skyborn Slash | attack | Storm | common | 2 | Deal 4 damage twice. Gain 2 Charge. | Deal 5 damage twice. Gain 3 Charge. | Costs 1 less |  |
| Skyborn Rune | reaction (reaction) | Storm | uncommon | 1 | When an enemy trap activates: deal 5 damage to its owner and apply 3 Shock to ALL enemies. | When an enemy trap activates: deal 7 damage to its owner and apply 4 Shock to ALL enemies. | Gains Opener |  |
| Ionized Rend | attack | Storm | common | 2 | Deal 5 damage to ALL enemies. Gain 2 Charge. | Deal 7 damage to ALL enemies. Gain 3 Charge. | Costs 1 less |  |
| Lightning Snare | reaction (attack) | Storm | uncommon | 1 | When attacked: deal 6 damage to the attacker and apply 3 Shock to ALL enemies. | When attacked: deal 8 damage to the attacker and apply 4 Shock to ALL enemies. | Gains Opener |  |
| Static Ploy | skill | Storm | common | 1 | Gain 6 Guard. | Gain 8 Guard. | Gains Palm |  |
| Squall Ambush | reaction (attack) | Storm | common | 0 | When attacked: apply 3 Shock to ALL enemies. | When attacked: apply 4 Shock to ALL enemies. | Gains Opener |  |
| Cyclone Charm | skill | Storm | common | 0 | Apply 3 Shock. | Apply 4 Shock. | Gains Palm |  |
| Galvanic Rebuke | counter (attack) | Storm | common | 0 | Counter (an attack): apply 3 Shock to ALL enemies. | Counter (an attack): apply 4 Shock to ALL enemies. | Gains Opener |  |
| Ionized Tripwire | reaction (reaction) | Storm | uncommon | 1 | When an enemy trap activates: deal 5 damage to its owner and gain 2 Charge. | When an enemy trap activates: deal 7 damage to its owner and gain 3 Charge. | Gains Opener |  |
| Static Glyph | reaction (attack) | Storm | rare | 1 | When attacked: deal 6 damage to the attacker and gain 1 Charge and apply 2 Shock to the attacker. | When attacked: deal 8 damage to the attacker and gain 2 Charge and apply 3 Shock to the attacker. | Gains Opener |  |
| Ionized Trick | skill | Storm | common | 1 | Draw 1 card. Apply 1 Shock to ALL enemies. | Draw 1 card. Apply 2 Shock to ALL enemies. | Gains Palm |  |
| Charged Denial | counter (attack) | Storm | common | 0 | Counter (an attack): gain 4 Guard. | Counter (an attack): gain 5 Guard. | Gains Opener |  |
| Voltaic Rend | attack | Storm | common | 1 | Deal 2 damage to a random enemy 3 times. Apply 2 Shock. | Deal 3 damage to a random enemy 3 times. Apply 3 Shock. | Gains Palm |  |
| Galvanic Lash | attack | Storm | rare | 2 | Deal 4 damage twice. Apply 5 Shock. Gain 1 Charge. | Deal 5 damage twice. Apply 7 Shock. Gain 2 Charge. | Costs 1 less |  |
| Skyborn Charm | skill | Storm | common | 2 | Draw 2 cards. Gain 1 Charge. | Draw 2 cards. Gain 2 Charge. | Costs 1 less |  |
| Tempest Seal | reaction (attack) | Storm | uncommon | 1 | When attacked: deal 6 damage to the attacker and apply 4 Shock to the attacker. | When attacked: deal 8 damage to the attacker and apply 5 Shock to the attacker. | Gains Opener |  |
| Ionized Lash | attack | Storm | common | 1 | Deal 4 damage. Gain 1 Charge. | Deal 5 damage. Gain 2 Charge. | Gains Palm |  |
| Lightning Slash | attack | Storm | rare | 1 | Deal 5 damage. Apply 2 Shock. Gain 1 Charge. | Deal 7 damage. Apply 3 Shock. Gain 2 Charge. | Gains Palm |  |
| Galvanic Trap | reaction (attack) | Storm | common | 1 | When attacked: gain 4 Guard and apply 2 Shock to ALL enemies. | When attacked: gain 5 Guard and apply 3 Shock to ALL enemies. | Gains Opener |  |
| Thunder Sigil | skill | Storm | uncommon | 1 | Draw 1 card. Apply 2 Shock. | Draw 1 card. Apply 3 Shock. | Gains Palm |  |
| Voltaic Pit | reaction (skill) | Storm | uncommon | 1 | When an enemy uses a non-attack: gain 4 Guard and apply 3 Shock to ALL enemies. | When an enemy uses a non-attack: gain 5 Guard and apply 4 Shock to ALL enemies. | Gains Opener |  |
| Gale Veil | skill | Storm | rare | 2 | Gain 8 Guard. Apply 3 Shock to ALL enemies. Gain 1 Charge. | Gain 11 Guard. Apply 4 Shock to ALL enemies. Gain 2 Charge. | Costs 1 less |  |
| Static Rend | attack | Storm | common | 3 | Deal 13 damage. Apply 6 Shock. | Deal 17 damage. Apply 8 Shock. | Costs 1 less |  |
| Cyclone Trap | reaction (attack) | Storm | uncommon | 1 | When attacked: gain 5 Guard and apply 4 Shock to the attacker. | When attacked: gain 7 Guard and apply 5 Shock to the attacker. | Gains Opener |  |
| Arcing Refusal | counter (reaction) | Storm | common | 1 | Counter (a trap or Reaction): gain 4 Guard and apply 4 Shock to its owner. | Counter (a trap or Reaction): gain 5 Guard and apply 5 Shock to its owner. | Gains Opener |  |
| Cyclone Barrage | attack | Storm | uncommon | 1 | Deal 2 damage to a random enemy 3 times. Gain 1 Charge. | Deal 3 damage to a random enemy 3 times. Gain 2 Charge. | Gains Palm |  |
| Static Tripwire | reaction (skill) | Storm | common | 1 | When an enemy uses a non-attack: gain 4 Guard and apply 4 Shock to it. | When an enemy uses a non-attack: gain 5 Guard and apply 5 Shock to it. | Gains Opener |  |
| Sparking Rend | attack | Storm | rare | 3 | Deal 14 damage. Gain 3 Charge. Apply 5 Shock. | Deal 19 damage. Gain 4 Charge. Apply 7 Shock. | Costs 1 less |  |
| Charged Barrage | attack | Storm | uncommon | 2 | Deal 10 damage. Gain 4 Guard. | Deal 13 damage. Gain 5 Guard. | Costs 1 less |  |
| Gale Seal | reaction (attack) | Storm | common | 0 | When attacked: gain 4 Guard. | When attacked: gain 5 Guard. | Gains Opener |  |
| Static Stance | skill | Storm | uncommon | 2 | Draw 2 cards. Apply 1 Shock to ALL enemies. | Draw 2 cards. Apply 2 Shock to ALL enemies. | Costs 1 less |  |
| Thunder Answer | counter (attack) | Storm | rare | 1 | Counter (an attack): gain 5 Guard and gain 1 Charge and apply 2 Shock to the attacker. | Counter (an attack): gain 7 Guard and gain 2 Charge and apply 3 Shock to the attacker. | Gains Opener |  |
| Ionized Sigil | skill | Storm | common | 0 | Gain 2 Charge. | Gain 3 Charge. | Gains Palm |  |
| Voltaic Lunge | attack | Storm | uncommon | 2 | Deal 5 damage twice. Gain 4 Guard. | Deal 7 damage twice. Gain 5 Guard. | Costs 1 less |  |
| Squall Ploy | skill | Storm | common | 2 | Draw 2 cards. Apply 2 Shock. | Draw 2 cards. Apply 3 Shock. | Costs 1 less |  |
| Crackling Comeback | counter (reaction) | Storm | rare | 1 | Counter (a trap or Reaction): gain 5 Guard and gain 1 Charge and apply 2 Shock to its owner. | Counter (a trap or Reaction): gain 7 Guard and gain 2 Charge and apply 3 Shock to its owner. | Gains Opener |  |
| Galvanic Volley | attack | Storm | common | 1 | Deal 2 damage to a random enemy 3 times. Apply 1 Shock to ALL enemies. | Deal 3 damage to a random enemy 3 times. Apply 2 Shock to ALL enemies. | Gains Palm |  |
| Skyborn Mirror | reaction (attack) | Storm | common | 0 | When attacked: apply 4 Shock to the attacker. | When attacked: apply 5 Shock to the attacker. | Gains Opener |  |
| Sleet Storm | attack ⧉ (rime) | Storm | uncommon | 2 | Deal 4 damage to ALL enemies. Apply 2 Chill to ALL enemies. Apply 2 Shock to ALL enemies. | Deal 5 damage to ALL enemies. Apply 3 Chill to ALL enemies. Apply 3 Shock to ALL enemies. | Costs 1 less |  |
| Frozen Circuit | reaction (attack) ⧉ (rime) | Storm | uncommon | 1 | When attacked: gain 4 Guard and apply 2 Shock to the attacker. If the attacker has Chill, gain 2 Charge. | When attacked: gain 5 Guard and apply 3 Shock to the attacker. If the attacker has Chill, gain 3 Charge. | Gains Opener |  |
| Superconductor | skill ⧉ (rime) | Storm | rare | 1 | Gain 3 Charge. If the target is Frozen, gain 1 energy. | Gain 4 Charge. If the target is Frozen, gain 1 energy. | Gains Palm |  |
| Storm Roc | skill ⧉ (beast) | Storm | uncommon | 1 | Summon Hawk 1. Apply 3 Shock. | Summon Hawk 2. Apply 4 Shock. | Gains Palm |  |
| Static Fur | reaction (attack) ⧉ (beast) | Storm | rare | 1 | When attacked: gain 3 Guard for each companion you have and apply 4 Shock to the attacker. | When attacked: gain 4 Guard for each companion you have and apply 5 Shock to the attacker. | Gains Opener |  |
| Grounding Rod | skill ⧉ (stone) | Storm | uncommon | 1 | Gain 3 Fortify. Gain 1 Charge. | Gain 4 Fortify. Gain 2 Charge. | Gains Palm |  |
| Thunderquake | attack ⧉ (stone) | Storm | uncommon | 2 | Deal 4 damage to ALL enemies. Apply 2 Shock to ALL enemies. If the target has Tremor, apply 3 Tremor to ALL enemies. | Deal 5 damage to ALL enemies. Apply 3 Shock to ALL enemies. If the target has Tremor, apply 4 Tremor to ALL enemies. | Costs 1 less |  |
| Grounding Stone | reaction (attack) ⧉ (stone) | Storm | rare | 1 | When attacked: gain 7 Guard. If you have Charge, gain 5 Fortify. | When attacked: gain 9 Guard. If you have Charge, gain 7 Fortify. | Gains Opener |  |
| Electrolysis | attack ⧉ (aether) | Storm | uncommon | 1 | Deal 4 damage. Apply 2 Shock. If you are attuned to the element that beats the target, gain 2 Charge. | Deal 5 damage. Apply 3 Shock. If you are attuned to the element that beats the target, gain 3 Charge. | Gains Palm |  |
| Charged Catalyst | skill ⧉ (aether) | Storm | uncommon | 0 | Attune to the element that beats the first enemy. Gain 1 Charge. | Attune to the element that beats the first enemy. Gain 2 Charge. | Gains Palm |  |
| Spark Gap | skill ⧉ (aether) | Storm | rare | 1 | Draw 1 card. If you played 2+ elements this turn, gain 3 Charge. | Draw 1 card. If you played 2+ elements this turn, gain 4 Charge. | Gains Palm |  |
| Silent Thunder | attack ⧉ (dusk) | Storm | uncommon | 1 | Deal 4 damage. Apply 2 Shock. If the target has Mark, apply 3 Shock. | Deal 5 damage. Apply 3 Shock. If the target has Mark, apply 4 Shock. | Gains Palm |  |
| Storm Cloak | reaction (attack) ⧉ (dusk) | Storm | uncommon | 1 | When attacked: gain 1 Veil and apply 3 Shock to the attacker. | When attacked: gain 1 Veil and apply 4 Shock to the attacker. | Gains Opener |  |
| Flash Step | skill ⧉ (dusk) | Storm | rare | 2→1 | Gain 1 Veil. If you have Charge, draw 1 card. | Gain 1 Veil. If you have Charge, draw 1 card. | Gains Palm |  |
| Cumulonimbus | attack 🦋 | Storm | evolved | 1 | Deal 5 damage. Apply 2 Shock. If you played 2+ other cards this turn, gain 2 Charge. | Deal 7 damage. Apply 3 Shock. If you played 2+ other cards this turn, gain 3 Charge. | Gains Palm |  |
| Spark Mite | attack 🦋 | Storm | common | 1 | Deal 4 damage. Apply 2 Shock. Evolve 4 (Cumulonimbus). | Deal 5 damage. Apply 3 Shock. Evolve 4 (Cumulonimbus). | Gains Palm |  |
| Perpetual Dynamo | skill 🦋 | Storm | evolved | 1 | Gain 3 Charge. If this is the first card you played this turn, gain 1 energy. | Gain 4 Charge. If this is the first card you played this turn, gain 1 energy. | Gains Palm |  |
| Dry Cell | skill 🦋 | Storm | common | 1 | Gain 3 Charge. Evolve 3 (Perpetual Dynamo). | Gain 4 Charge. Evolve 3 (Perpetual Dynamo). | Gains Palm |  |
| Tesla Coil | reaction (attack) 🦋 | Storm | evolved | 1 | When attacked: gain 5 Guard and apply 2 Shock to ALL enemies. If you have Charge, gain 2 Charge. | When attacked: gain 7 Guard and apply 3 Shock to ALL enemies. If you have Charge, gain 3 Charge. | Gains Opener |  |
| Static Cling | reaction (attack) 🦋 | Storm | common | 1 | When attacked: gain 5 Guard and apply 3 Shock to the attacker. Evolve 4 (Tesla Coil). | When attacked: gain 7 Guard and apply 4 Shock to the attacker. Evolve 4 (Tesla Coil). | Gains Opener |  |
| Lightning Sphere | attack 🦋 | Storm | evolved | 1 | Deal 2 damage to a random enemy 3 times. If you have Charge, spend all Charge: deal 3 damage per Charge spent. | Deal 3 damage to a random enemy 3 times. If you have Charge, spend all Charge: deal 4 damage per Charge spent. | Gains Palm |  |
| Zap Gremlin | attack 🦋 | Storm | common | 1 | Deal 4 damage. If you have Charge, apply 4 Shock. Evolve 4 (Lightning Sphere). | Deal 5 damage. If you have Charge, apply 5 Shock. Evolve 4 (Lightning Sphere). | Gains Palm |  |
| Hurricane | skill 🦋 | Storm | evolved | 0 | Apply 2 Shock to ALL enemies. If you played 2+ elements this turn, double the target's Shock. | Apply 3 Shock to ALL enemies. If you played 2+ elements this turn, double the target's Shock. | Gains Palm |  |
| Gust | skill 🦋 | Storm | uncommon | 0 | Apply 2 Shock to ALL enemies. Evolve 4 (Hurricane). | Apply 3 Shock to ALL enemies. Evolve 4 (Hurricane). | Gains Palm |  |
| Storm Engine | power ★ | Storm | uncommon | 1 | Whenever a chain of 2+ links resolves, apply 2 Shock to ALL enemies. | Whenever a chain of 2+ links resolves, apply 3 Shock to ALL enemies. | Gains Opener |  |
| Dynamo Heart | power ★ | Storm | rare | 2 | At the end of your turn, if you have Charge, gain 8 Charge. | At the end of your turn, if you have Charge, gain 9 Charge. | Costs 1 less |  |
| Lightning Crown | power ★ | Storm | uncommon | 1 | At the end of your turn, if you have Charge, deal 3 damage to a random enemy 3 times. | At the end of your turn, if you have Charge, deal 4 damage to a random enemy 3 times. | Gains Opener |  |
| Static Soul | power ★ | Storm | rare | 1 | Whenever you play a Counter, apply 2 Shock to ALL enemies. | Whenever you play a Counter, apply 3 Shock to ALL enemies. | Gains Opener |  |
| Hailstorm Strike | attack | Storm | uncommon | 2 | Deal 3 damage twice. Gain 2 Charge. If you played 2+ elements this turn, deal 8 damage to each enemy with Shock. | Deal 4 damage twice. Gain 3 Charge. If you played 2+ elements this turn, deal 11 damage to each enemy with Shock. | Costs 1 less |  |
| Jolt Cleave | attack | Storm | common | 2 | Deal 6 damage to ALL enemies. If you have Charge, gain 1 energy. | Deal 8 damage to ALL enemies. If you have Charge, gain 1 energy. | Costs 1 less |  |
| Rolling Denial | counter (reaction) | Storm | common | 1 | Counter (a trap or Reaction): gain 4 Guard. If you have Charge, apply 3 Shock to ALL enemies. | Counter (a trap or Reaction): gain 5 Guard. If you have Charge, apply 4 Shock to ALL enemies. | Gains Opener |  |
| Hailstorm Aegis | skill | Storm | common | 1 | Gain 4 Guard. If you have Charge, apply 4 Shock. | Gain 5 Guard. If you have Charge, apply 5 Shock. | Gains Palm |  |
| Ampere Veil | skill | Storm | uncommon | 1 | Gain 2 Charge. If you played 2+ other cards this turn, deal 4 damage to each enemy with Shock. | Gain 3 Charge. If you played 2+ other cards this turn, deal 5 damage to each enemy with Shock. | Gains Palm |  |
| Electric Reply | counter (reaction) | Storm | uncommon | 1 | Counter (a trap or Reaction): gain 4 Guard and gain 1 Charge. If you played 2+ elements this turn, deal 5 damage to each enemy with Shock. | Counter (a trap or Reaction): gain 5 Guard and gain 2 Charge. If you played 2+ elements this turn, deal 7 damage to each enemy with Shock. | Gains Opener |  |
| Plasma Canticle | skill | Storm | uncommon | 1 | Gain 4 Guard. If you have Charge, spend all Charge: deal 2 damage per Charge spent. | Gain 5 Guard. If you have Charge, spend all Charge: deal 3 damage per Charge spent. | Gains Palm |  |
| Ampere Glyph | reaction (skill) | Storm | uncommon | 1 | When an enemy uses a non-attack: gain 4 Guard and gain 1 Charge. If you played 2+ elements this turn, apply 4 Shock to ALL enemies. | When an enemy uses a non-attack: gain 5 Guard and gain 2 Charge. If you played 2+ elements this turn, apply 5 Shock to ALL enemies. | Gains Opener |  |
| Overcharged Trick | skill | Storm | uncommon | 2 | Gain 1 energy. If you have Charge, deal 10 damage to each enemy with Shock. | Gain 1 energy. If you have Charge, deal 13 damage to each enemy with Shock. | Costs 1 less |  |
| Flash Gash | attack | Storm | uncommon | 3 | Deal 10 damage. Gain 3 Charge. If this is the first card you played this turn, deal 10 damage to each enemy with Shock. | Deal 13 damage. Gain 4 Charge. If this is the first card you played this turn, deal 13 damage to each enemy with Shock. | Costs 1 less |  |
| Coil Tripline | reaction (attack) | Storm | common | 1 | When attacked: deal 6 damage to the attacker. If the attacker has Shock, spend all Charge: deal 2 damage per Charge spent. | When attacked: deal 8 damage to the attacker. If the attacker has Shock, spend all Charge: deal 3 damage per Charge spent. | Gains Opener |  |
| Plasma Cleave | attack | Storm | uncommon | 2 | Deal 7 damage. Apply 4 Shock. If this is the first card you played this turn, gain 4 Charge. | Deal 9 damage. Apply 5 Shock. If this is the first card you played this turn, gain 5 Charge. | Costs 1 less |  |
| Coil Ritual | skill | Storm | uncommon | 1 | Gain 3 Guard. Deal 2 damage to each enemy with Shock. If the target has Shock, apply 3 Shock. | Gain 4 Guard. Deal 3 damage to each enemy with Shock. If the target has Shock, apply 4 Shock. | Gains Palm |  |
| Nimbus Uppercut | attack | Storm | common | 3 | Deal 17 damage. If you played 2+ elements this turn, double the target's Shock. | Deal 23 damage. If you played 2+ elements this turn, double the target's Shock. | Costs 1 less |  |
| Monsoon Seal | reaction (attack) | Storm | uncommon | 1 | When attacked: gain 4 Guard and deal 2 damage to each enemy with Shock. If you played 2+ elements this turn, spend all Charge: deal 3 damage per Charge spent. | When attacked: gain 5 Guard and deal 3 damage to each enemy with Shock. If you played 2+ elements this turn, spend all Charge: deal 4 damage per Charge spent. | Gains Opener |  |
| Hailstorm Onslaught | attack | Storm | common | 3 | Deal 17 damage. If this is the first card you played this turn, gain 1 energy. | Deal 23 damage. If this is the first card you played this turn, gain 1 energy. | Costs 1 less |  |
| Fulgurite Reply | counter (skill) | Storm | common | 1 | Counter (a non-attack): gain 3 Guard. If you have Charge, double its Shock. | Counter (a non-attack): gain 4 Guard. If you have Charge, double its Shock. | Gains Opener |  |
| Coil Net | reaction (reaction) | Storm | common | 1 | When an enemy trap activates: deal 6 damage to its owner. If you played 2+ elements this turn, apply 8 Shock to its owner. | When an enemy trap activates: deal 8 damage to its owner. If you played 2+ elements this turn, apply 11 Shock to its owner. | Gains Opener |  |
| Downpour Hook | attack | Storm | common | 1 | Deal 2 damage to a random enemy 3 times. If you played 2+ elements this turn, gain 1 energy. | Deal 3 damage to a random enemy 3 times. If you played 2+ elements this turn, gain 1 energy. | Gains Palm |  |
| Windshear Charm | skill | Storm | uncommon | 2 | Gain 8 Guard. If this is the first card you played this turn, gain 5 Charge. | Gain 11 Guard. If this is the first card you played this turn, gain 7 Charge. | Costs 1 less |  |
| Electric Mirror | reaction (reaction) | Storm | rare | 1 | When an enemy trap activates: deal 5 damage to each enemy with Shock. If you have Charge, double its Shock. | When an enemy trap activates: deal 7 damage to each enemy with Shock. If you have Charge, double its Shock. | Gains Opener |  |
| Fulgurite Gash | attack | Storm | uncommon | 3 | Deal 10 damage. Apply 5 Shock. If you played 2+ other cards this turn, deal 9 damage to each enemy with Shock. | Deal 13 damage. Apply 7 Shock. If you played 2+ other cards this turn, deal 12 damage to each enemy with Shock. | Costs 1 less |  |
| Hailstorm Return | counter (skill) | Storm | uncommon | 1 | Counter (a non-attack): gain 5 Guard. If you played 2+ elements this turn, gain 4 Charge. | Counter (a non-attack): gain 7 Guard. If you played 2+ elements this turn, gain 5 Charge. | Gains Opener |  |
| Jolt Mantra | skill | Storm | uncommon | 0 | Spend all Charge: deal 1 damage per Charge spent. If you played 2+ elements this turn, gain 1 energy. | Spend all Charge: deal 2 damage per Charge spent. If you played 2+ elements this turn, gain 1 energy. | Gains Palm |  |
| Nimbus Spike | attack | Storm | common | 1 | Deal 4 damage. If this is the first card you played this turn, apply 3 Shock to ALL enemies. | Deal 5 damage. If this is the first card you played this turn, apply 4 Shock to ALL enemies. | Gains Palm |  |
| Electric Rune | reaction (reaction) | Storm | common | 1 | When an enemy trap activates: deal 4 damage to its owner. If you have Charge, double its Shock. | When an enemy trap activates: deal 5 damage to its owner. If you have Charge, double its Shock. | Gains Opener |  |
| Overcharged Denial | counter (reaction) | Storm | uncommon | 1 | Counter (a trap or Reaction): gain 4 Guard and apply 2 Shock to its owner. If you have Charge, spend all Charge: deal 2 damage per Charge spent. | Counter (a trap or Reaction): gain 5 Guard and apply 3 Shock to its owner. If you have Charge, spend all Charge: deal 3 damage per Charge spent. | Gains Opener |  |
| Blitz Sweep | attack | Storm | uncommon | 2 | Deal 3 damage twice. Gain 2 Charge. Chain 2: Gain 1 energy. | Deal 4 damage twice. Gain 3 Charge. Chain 2: Gain 1 energy. | Costs 1 less |  |
| Fulgurite Posture | skill | Storm | common | 2 | Gain 7 Guard. If you have Charge, deal 6 damage to each enemy with Shock. | Gain 9 Guard. If you have Charge, deal 8 damage to each enemy with Shock. | Costs 1 less |  |
| Surge Reply | counter (skill) | Storm | uncommon | 1 | Counter (a non-attack): gain 4 Guard and apply 2 Shock to it. If you played 2+ elements this turn, spend all Charge: deal 3 damage per Charge spent. | Counter (a non-attack): gain 5 Guard and apply 3 Shock to it. If you played 2+ elements this turn, spend all Charge: deal 4 damage per Charge spent. | Gains Opener |  |
| Fulgurite Ward | skill | Storm | uncommon | 2 | Apply 10 Shock. If you played 2+ elements this turn, double the target's Shock. | Apply 13 Shock. If you played 2+ elements this turn, double the target's Shock. | Costs 1 less |  |
| Downpour Sunder | attack | Storm | common | 2 | Deal 7 damage. Gain 1 energy. | Deal 9 damage. Gain 1 energy. | Costs 1 less |  |
| Nimbus Reversal | counter (reaction) | Storm | uncommon | 1 | Counter (a trap or Reaction): gain 3 Guard and gain 1 Charge. If you played 2+ elements this turn, double its Shock. | Counter (a trap or Reaction): gain 4 Guard and gain 2 Charge. If you played 2+ elements this turn, double its Shock. | Gains Opener |  |
| Fulgurite Catch | reaction (reaction) | Storm | common | 1 | When an enemy trap activates: deal 6 damage to its owner and spend all Charge: deal 1 damage per Charge spent. | When an enemy trap activates: deal 8 damage to its owner and spend all Charge: deal 2 damage per Charge spent. | Gains Opener |  |
| Blitz Ward | skill | Storm | uncommon | 1 | Gain 3 Guard. Apply 1 Shock to ALL enemies. If you have Charge, deal 2 damage to each enemy with Shock. | Gain 4 Guard. Apply 2 Shock to ALL enemies. If you have Charge, deal 3 damage to each enemy with Shock. | Gains Palm |  |
| Monsoon Refusal | counter (attack) | Storm | common | 1 | Counter (an attack): gain 4 Guard. If you have Charge, apply 3 Shock to ALL enemies. | Counter (an attack): gain 5 Guard. If you have Charge, apply 4 Shock to ALL enemies. | Gains Opener |  |
| Windshear Cut | attack | Storm | common | 0 | Deal 3 damage. If you have Charge, apply 2 Shock. | Deal 4 damage. If you have Charge, apply 3 Shock. | Gains Palm |  |
| Monsoon Sunder | attack | Storm | uncommon | 3 | Deal 10 damage. Gain 1 energy. If you have Charge, gain 4 Charge. | Deal 13 damage. Gain 1 energy. If you have Charge, gain 5 Charge. | Costs 1 less |  |
| Plasma Comeback | counter (reaction) | Storm | rare | 1 | Counter (a trap or Reaction): gain 4 Guard and spend all Charge: deal 1 damage per Charge spent. If you played 2+ elements this turn, deal 6 damage to each enemy with Shock. | Counter (a trap or Reaction): gain 5 Guard and spend all Charge: deal 2 damage per Charge spent. If you played 2+ elements this turn, deal 8 damage to each enemy with Shock. | Gains Opener |  |
| Overcharged Aegis | skill | Storm | rare | 2 | Gain 6 Guard. Gain 1 energy. If the target has Shock, apply 4 Shock to ALL enemies. | Gain 8 Guard. Gain 1 energy. If the target has Shock, apply 5 Shock to ALL enemies. | Costs 1 less |  |
| Plasma Gash | attack | Storm | rare | 2 | Deal 10 damage. Spend all Charge: deal 3 damage per Charge spent. If you played 2+ elements this turn, gain 1 energy. | Deal 13 damage. Spend all Charge: deal 4 damage per Charge spent. If you played 2+ elements this turn, gain 1 energy. | Costs 1 less |  |
| Overcharged Bait | reaction (attack) | Storm | common | 1 | When attacked: deal 6 damage to the attacker. If you played 2+ elements this turn, gain 4 Charge. | When attacked: deal 8 damage to the attacker. If you played 2+ elements this turn, gain 5 Charge. | Gains Opener |  |
| Ampere Trick | skill | Storm | rare | 0 | Deal 2 damage to each enemy with Shock. If you played 2+ elements this turn, apply 5 Shock. | Deal 3 damage to each enemy with Shock. If you played 2+ elements this turn, apply 7 Shock. | Gains Palm |  |
| Coil Rebuff | counter (skill) | Storm | common | 1 | Counter (a non-attack): gain 4 Guard. If you played 2+ elements this turn, deal 6 damage to each enemy with Shock. | Counter (a non-attack): gain 5 Guard. If you played 2+ elements this turn, deal 8 damage to each enemy with Shock. | Gains Opener |  |
| Flash Rend | attack | Storm | rare | 2 | Deal 4 damage twice. Gain 2 Charge. If you played 2+ elements this turn, apply 7 Shock to ALL enemies. | Deal 5 damage twice. Gain 3 Charge. If you played 2+ elements this turn, apply 9 Shock to ALL enemies. | Costs 1 less |  |
| Jolt Rebuke | counter (reaction) | Storm | rare | 0 | Counter (a trap or Reaction): gain 1 Charge. If you played 2+ elements this turn, double its Shock. | Counter (a trap or Reaction): gain 2 Charge. If you played 2+ elements this turn, double its Shock. | Gains Opener |  |
| Fulgurite Pierce | attack | Storm | rare | 3 | Deal 15 damage. Apply 5 Shock to ALL enemies. If you played 2+ elements this turn, gain 1 energy. | Deal 20 damage. Apply 7 Shock to ALL enemies. If you played 2+ elements this turn, gain 1 energy. | Costs 1 less |  |
| Monsoon Posture | skill | Storm | uncommon | 2 | Gain 6 Guard. Apply 4 Shock. If you played 2+ other cards this turn, deal 6 damage to each enemy with Shock. | Gain 8 Guard. Apply 5 Shock. If you played 2+ other cards this turn, deal 8 damage to each enemy with Shock. | Costs 1 less |  |
| Windshear Veto | counter (skill) | Storm | rare | 1 | Counter (a non-attack): gain 3 Guard and apply 2 Shock to it. If you have Charge, double its Shock. | Counter (a non-attack): gain 4 Guard and apply 3 Shock to it. If you have Charge, double its Shock. | Gains Opener |  |
| Rolling Recital | skill | Storm | uncommon | 2 | Gain 8 Guard. If you played 2+ elements this turn, spend all Charge: deal 6 damage per Charge spent. | Gain 11 Guard. If you played 2+ elements this turn, spend all Charge: deal 8 damage per Charge spent. | Costs 1 less |  |
| Surge Snare | reaction (reaction) | Storm | uncommon | 1 | When an enemy trap activates: gain 3 Charge. If its owner has Shock, apply 4 Shock to ALL enemies. | When an enemy trap activates: gain 4 Charge. If its owner has Shock, apply 5 Shock to ALL enemies. | Gains Opener |  |
| Overcharged Ram | attack | Storm | uncommon | 2 | Deal 7 damage. Gain 2 Charge. Chain 2: Double the target's Shock. | Deal 9 damage. Gain 3 Charge. Chain 2: Double the target's Shock. | Costs 1 less |  |
| Rolling Catch | reaction (reaction) | Storm | rare | 1 | When an enemy trap activates: deal 6 damage to its owner and apply 2 Shock to ALL enemies. If you played 2+ elements this turn, gain 4 Charge. | When an enemy trap activates: deal 8 damage to its owner and apply 3 Shock to ALL enemies. If you played 2+ elements this turn, gain 5 Charge. | Gains Opener |  |
| Electric Rebuke | counter (attack) | Storm | uncommon | 1 | Counter (an attack): gain 5 Guard. If you played 2+ elements this turn, apply 8 Shock to the attacker. | Counter (an attack): gain 7 Guard. If you played 2+ elements this turn, apply 11 Shock to the attacker. | Gains Opener |  |

## Rime cards (140)

| Card | Type | Element | Rarity | Cost | Text | Upgraded (A) | Path B | Unlock |
|---|---|---|---|---|---|---|---|---|
| Frost Cut | attack ★ | Frost | starter | 1 | Deal 5 damage. Apply 3 Chill. | Deal 7 damage. Apply 4 Chill. | Gains Palm |  |
| Hoarfrost Ward | reaction (attack) ★ | Frost | starter | 1 | When attacked: gain 7 Guard and apply 3 Chill to the attacker. | When attacked: gain 10 Guard and apply 4 Chill to the attacker. | Gains Opener |  |
| Shatter | attack ★ | Frost | starter | 1 | Deal 6 damage. If the target is Frozen, deal 12 more. | Deal 8 damage. If the target is Frozen, deal 16 more. | Gains Palm |  |
| Rime Shard | attack ★ | Frost | common | 0 | Deal 4 damage. Apply 1 Chill. | Deal 6 damage. Apply 2 Chill. | Gains Palm |  |
| Cold Snap | skill ★ | Frost | common | 1 | Apply 4 Chill. Draw 1 card. | Apply 6 Chill. Draw 1 card. | Gains Palm |  |
| Glacier Wall | skill ★ | Frost | common | 2 | Gain 13 Guard. Apply 2 Chill to ALL enemies. | Gain 17 Guard. Apply 3 Chill to ALL enemies. | Costs 1 less |  |
| Frostbite | attack ★ | Frost | common | 1 | Deal 6 damage, +1 per Chill on the target. | Deal 8 damage, +2 per Chill on the target. | Gains Palm |  |
| Snowblind | skill ★ | Frost | common | 1 | Apply 2 Chill and 1 Shaken to ALL enemies. | Apply 3 Chill and 2 Shaken to ALL enemies. | Gains Palm |  |
| Cryo Counter | counter (attack) ★ | Frost | common | 1 | Counter (an attack): gain 5 Guard and apply 4 Chill to the attacker. If that Freezes it, Negate the attack. | Counter (an attack): gain 7 Guard and apply 6 Chill to the attacker. If that Freezes it, Negate the attack. | Gains Opener |  |
| Thin Ice | counter (reaction) ★ | Frost | common | 0 | Counter (a trap or Reaction): apply 3 Chill to its owner. If that Freezes it, Negate it. | Counter (a trap or Reaction): apply 5 Chill to its owner. If that Freezes it, Negate it. | Gains Opener |  |
| Icicle Rain | attack ★ | Frost | uncommon | 2 | Deal 5 damage to ALL enemies twice. Apply 1 Chill to ALL enemies. | Deal 7 damage to ALL enemies twice. Apply 2 Chill to ALL enemies. | Costs 1 less |  |
| Ice Mirror | reaction (reaction) ★ | Frost | uncommon | 1→0 | When an enemy trap activates: Negate it and apply 2 Chill to its owner. | When an enemy trap activates: Negate it and apply 3 Chill to its owner. | Gains Opener |  |
| Frozen Heart | skill ★ | Frost | uncommon | 1 | Gain 7 Guard. If any enemy is Frozen, gain 7 more. | Gain 10 Guard. If any enemy is Frozen, gain 10 more. | Gains Palm |  |
| Hailstorm | attack ★ | Frost | uncommon | 1 | Deal 3 damage to a random enemy 4 times. | Deal 4 damage to a random enemy 4 times. | Gains Palm |  |
| Winter's Grasp | skill ★ | Frost | uncommon | 0 | Apply 3 Chill. If the target is Frozen, gain 1 energy. | Apply 4 Chill. If the target is Frozen, gain 1 energy. | Gains Palm |  |
| Permafrost | power ★ | Frost | uncommon | 1 | Whenever an enemy Freezes, gain 6 Guard and draw 1 card. | Whenever an enemy Freezes, gain 9 Guard and draw 1 card. | Gains Opener |  |
| Frostbrand | power ★ | Frost | uncommon | 1 | Your attacks apply 2 Chill to whatever they hit. | Your attacks apply 3 Chill to whatever they hit. | Gains Opener |  |
| Deep Freeze | skill ★ | Frost | rare | 1 | Double the target's Chill. Fold. | Double the target's Chill. | Gains Palm |  |
| Blizzard | power ★ | Frost | rare | 2 | At the start of your turn, apply 2 Chill to ALL enemies. | At the start of your turn, apply 3 Chill to ALL enemies. | Costs 1 less |  |
| Glacial Blade | attack ★ | Frost | rare | 2 | Deal 10 damage. If the target is Frozen, deal triple. | Deal 14 damage. If the target is Frozen, deal triple. | Costs 1 less |  |
| Avalanche | attack ★ | Frost | rare | 3 | Deal 14 damage to ALL enemies. Apply 3 Chill to ALL enemies. | Deal 18 damage to ALL enemies. Apply 4 Chill to ALL enemies. | Costs 1 less |  |
| Absolute Zero | skill ★ | Frost | legendary | 2→1 | Freeze ALL enemies. Fold. | Freeze ALL enemies. Fold. | No longer Folds |  |
| Crystalline Covenant | power | Frost | uncommon | 2 | At the end of your turn, gain 3 Guard for each enemy with Chill. | At the end of your turn, gain 4 Guard for each enemy with Chill. | Costs 1 less |  |
| Boreal Oath | power | Frost | rare | 1 | Whenever an enemy Freezes, deal 7 damage to ALL enemies. | Whenever an enemy Freezes, deal 8 damage to ALL enemies. | Gains Opener |  |
| Wintry Cleave | attack | Frost | common | 1 | Deal 4 damage. Apply 1 Shaken. | Deal 5 damage. Apply 2 Shaken. | Gains Palm |  |
| Sleet Mirror | reaction (attack) | Frost | common | 0 | When attacked: apply 2 Shaken to the attacker. | When attacked: apply 3 Shaken to the attacker. | Gains Opener |  |
| Numbing Charm | skill | Frost | common | 1 | Draw 1 card. Apply 1 Shaken. | Draw 1 card. Apply 2 Shaken. | Gains Palm |  |
| Hailstone Comeback | counter (attack) | Frost | uncommon | 1 | Counter (an attack): gain 4 Guard and apply 2 Chill to ALL enemies. | Counter (an attack): gain 5 Guard and apply 3 Chill to ALL enemies. | Gains Opener |  |
| Frostbitten Crash | attack | Frost | uncommon | 2 | Deal 6 damage to ALL enemies. Deal 4 damage to each enemy with Chill. | Deal 8 damage to ALL enemies. Deal 5 damage to each enemy with Chill. | Costs 1 less |  |
| Icebound Canticle | skill | Frost | common | 0 | Apply 1 Shaken. | Apply 2 Shaken. | Gains Palm |  |
| Frostbitten Coil | reaction (attack) | Frost | common | 1 | When attacked: deal 5 damage to the attacker and apply 2 Chill to ALL enemies. | When attacked: deal 7 damage to the attacker and apply 3 Chill to ALL enemies. | Gains Opener |  |
| Frozen Ambush | reaction (reaction) | Frost | common | 1 | When an enemy trap activates: deal 5 damage to its owner and apply 3 Chill to its owner. | When an enemy trap activates: deal 7 damage to its owner and apply 4 Chill to its owner. | Gains Opener |  |
| Numbing Cut | attack | Frost | uncommon | 3 | Deal 15 damage. Apply 3 Chill to ALL enemies. | Deal 20 damage. Apply 4 Chill to ALL enemies. | Costs 1 less |  |
| Sleet Stance | skill | Frost | common | 0 | Apply 2 Chill to ALL enemies. | Apply 3 Chill to ALL enemies. | Gains Palm |  |
| Wintry Ward | skill | Frost | common | 2 | Draw 2 cards. Apply 1 Chill to ALL enemies. | Draw 2 cards. Apply 2 Chill to ALL enemies. | Costs 1 less |  |
| Crystalline Answer | counter (attack) | Frost | common | 0 | Counter (an attack): apply 2 Shaken to the attacker. | Counter (an attack): apply 3 Shaken to the attacker. | Gains Opener |  |
| Boreal Cleave | attack | Frost | common | 2 | Deal 4 damage twice. Deal 3 damage to each enemy with Chill. | Deal 5 damage twice. Deal 4 damage to each enemy with Chill. | Costs 1 less |  |
| Rime Smite | attack | Frost | rare | 3 | Deal 14 damage. Apply 5 Chill. Gain 5 Guard. | Deal 19 damage. Apply 7 Chill. Gain 7 Guard. | Costs 1 less |  |
| Hailstone Cut | attack | Frost | common | 2 | Deal 9 damage. Apply 2 Chill to ALL enemies. | Deal 12 damage. Apply 3 Chill to ALL enemies. | Costs 1 less |  |
| Rime Snare | reaction (attack) | Frost | uncommon | 1 | When attacked: gain 5 Guard and apply 3 Chill to the attacker. | When attacked: gain 7 Guard and apply 4 Chill to the attacker. | Gains Opener |  |
| Hoarfrost Canticle | skill | Frost | common | 2 | Draw 2 cards. Apply 1 Shaken. | Draw 2 cards. Apply 2 Shaken. | Costs 1 less |  |
| Polar Lash | attack | Frost | common | 2 | Deal 5 damage to ALL enemies. Apply 2 Chill to ALL enemies. | Deal 7 damage to ALL enemies. Apply 3 Chill to ALL enemies. | Costs 1 less |  |
| Hailstone Ambush | reaction (skill) | Frost | rare | 1 | When an enemy uses a non-attack: gain 5 Guard and apply 2 Chill to it and apply 1 Shaken to it. | When an enemy uses a non-attack: gain 7 Guard and apply 3 Chill to it and apply 2 Shaken to it. | Gains Opener |  |
| Hoarfrost Rend | attack | Frost | common | 2 | Deal 4 damage twice. Apply 2 Chill to ALL enemies. | Deal 5 damage twice. Apply 3 Chill to ALL enemies. | Costs 1 less |  |
| Hoarfrost Trick | skill | Frost | uncommon | 1 | Gain 4 Guard. Apply 2 Chill. | Gain 5 Guard. Apply 3 Chill. | Gains Palm |  |
| Arctic Slash | attack | Frost | common | 1 | Deal 4 damage. Apply 2 Chill. | Deal 5 damage. Apply 3 Chill. | Gains Palm |  |
| Glacial Snare | reaction (attack) | Frost | common | 0 | When attacked: deal 4 damage to each enemy with Chill. | When attacked: deal 5 damage to each enemy with Chill. | Gains Opener |  |
| Polar Ward | skill | Frost | common | 1 | Apply 2 Shaken. | Apply 3 Shaken. | Gains Palm |  |
| Snowdrift Burst | attack | Frost | uncommon | 2 | Deal 10 damage. Deal 4 damage to each enemy with Chill. | Deal 13 damage. Deal 5 damage to each enemy with Chill. | Costs 1 less |  |
| Icebound Glyph | reaction (reaction) | Frost | common | 1 | When an enemy trap activates: deal 5 damage to its owner and apply 2 Shaken to its owner. | When an enemy trap activates: deal 7 damage to its owner and apply 3 Shaken to its owner. | Gains Opener |  |
| Hoarfrost Cleave | attack | Frost | uncommon | 2 | Deal 10 damage. Apply 3 Chill. | Deal 13 damage. Apply 4 Chill. | Costs 1 less |  |
| Snowdrift Stance | skill | Frost | common | 1 | Apply 3 Chill to ALL enemies. | Apply 4 Chill to ALL enemies. | Gains Palm |  |
| Numbing Tripwire | reaction (attack) | Frost | rare | 1 | When attacked: deal 6 damage to the attacker and apply 1 Shaken to the attacker and apply 2 Chill to the attacker. | When attacked: deal 8 damage to the attacker and apply 2 Shaken to the attacker and apply 3 Chill to the attacker. | Gains Opener |  |
| Frostbitten Lunge | attack | Frost | common | 1 | Deal 2 damage to a random enemy 3 times. Apply 1 Chill to ALL enemies. | Deal 3 damage to a random enemy 3 times. Apply 2 Chill to ALL enemies. | Gains Palm |  |
| Boreal Ward | skill | Frost | common | 1 | Deal 5 damage to each enemy with Chill. | Deal 7 damage to each enemy with Chill. | Gains Palm |  |
| Wintry Coil | reaction (attack) | Frost | rare | 1 | When attacked: gain 5 Guard and apply 2 Chill to ALL enemies and apply 1 Shaken to the attacker. | When attacked: gain 7 Guard and apply 3 Chill to ALL enemies and apply 2 Shaken to the attacker. | Gains Opener |  |
| Crystalline Stance | skill | Frost | common | 0 | Apply 3 Chill. | Apply 4 Chill. | Gains Palm |  |
| Sleet Thrust | attack | Frost | common | 1 | Deal 2 damage to a random enemy 3 times. Apply 1 Chill. | Deal 3 damage to a random enemy 3 times. Apply 2 Chill. | Gains Palm |  |
| Numbing Swipe | attack | Frost | common | 3 | Deal 13 damage. Apply 2 Shaken. | Deal 17 damage. Apply 3 Shaken. | Costs 1 less |  |
| Hailstone Sigil | skill | Frost | common | 1 | Apply 4 Chill. | Apply 5 Chill. | Gains Palm |  |
| Frozen Rune | reaction (attack) | Frost | common | 1 | When attacked: gain 4 Guard and apply 1 Shaken to the attacker. | When attacked: gain 5 Guard and apply 2 Shaken to the attacker. | Gains Opener |  |
| Rime Veil | skill | Frost | uncommon | 2 | Draw 2 cards. Apply 1 Chill. | Draw 2 cards. Apply 2 Chill. | Costs 1 less |  |
| Snow Wolf | skill ⧉ (beast) | Frost | uncommon | 1 | Summon Wolf 1. Apply 2 Chill. | Summon Wolf 2. Apply 3 Chill. | Gains Palm |  |
| Frost Bear | skill ⧉ (beast) | Frost | uncommon | 2 | Summon Bear 2. Apply 2 Chill to ALL enemies. | Summon Bear 3. Apply 3 Chill to ALL enemies. | Costs 1 less |  |
| Polar Pounce | attack ⧉ (beast) | Frost | rare | 1 | Deal 3 damage. Apply 1 Chill. If you have a companion, double the target's Chill. | Deal 4 damage. Apply 2 Chill. If you have a companion, double the target's Chill. | Gains Palm |  |
| Glacier | skill ⧉ (stone) | Frost | uncommon | 1 | Gain 3 Fortify. Apply 1 Chill to ALL enemies. | Gain 4 Fortify. Apply 2 Chill to ALL enemies. | Gains Palm |  |
| Ice Wedge | attack ⧉ (stone) | Frost | uncommon | 1 | Deal 4 damage. Apply 1 Tremor. If the target has Chill, apply 2 Tremor. | Deal 5 damage. Apply 2 Tremor. If the target has Chill, apply 3 Tremor. | Gains Palm |  |
| Frost Heave | reaction (attack) ⧉ (stone) | Frost | rare | 1 | When attacked: apply 5 Tremor to the attacker and apply 3 Chill to the attacker. | When attacked: apply 7 Tremor to the attacker and apply 4 Chill to the attacker. | Gains Opener |  |
| Cryo Flask | attack ⧉ (aether) | Frost | uncommon | 2 | Deal 7 damage. Apply 3 Chill. If the target has Exposed, double the target's Chill. | Deal 9 damage. Apply 4 Chill. If the target has Exposed, double the target's Chill. | Costs 1 less |  |
| Cold Catalyst | skill ⧉ (aether) | Frost | uncommon | 0 | Attune to the element that beats the target. Apply 2 Chill. | Attune to the element that beats the target. Apply 3 Chill. | Gains Palm |  |
| Liquid Nitrogen | skill ⧉ (aether) | Frost | rare | 1 | Apply 3 Chill to ALL enemies. If you played 2+ elements this turn, apply 2 Exposed to ALL enemies. | Apply 4 Chill to ALL enemies. If you played 2+ elements this turn, apply 3 Exposed to ALL enemies. | Gains Palm |  |
| Frostbite Knife | attack ⧉ (dusk) | Frost | uncommon | 0 | Deal 3 damage. If the target has Chill, apply 1 Mark. | Deal 4 damage. If the target has Chill, apply 2 Mark. | Gains Palm |  |
| Snow Blind | skill ⧉ (dusk) | Frost | uncommon | 2 | Gain 1 Veil. Apply 3 Chill to ALL enemies. | Gain 1 Veil. Apply 4 Chill to ALL enemies. | Costs 1 less |  |
| Black Frost | attack ⧉ (dusk) | Frost | rare | 2 | Deal 9 damage. Apply 2 Mark. If the target is Frozen, deal 9 damage to each enemy with Mark. | Deal 12 damage. Apply 3 Mark. If the target is Frozen, deal 12 damage to each enemy with Mark. | Costs 1 less |  |
| Blizzard Lord | attack 🦋 | Frost | evolved | 1 | Deal 5 damage. Apply 2 Chill. If the target is Frozen, draw 1 card. | Deal 7 damage. Apply 3 Chill. If the target is Frozen, draw 1 card. | Gains Palm |  |
| Snowflake | attack 🦋 | Frost | common | 1 | Deal 4 damage. Apply 2 Chill. Evolve 4 (Blizzard Lord). | Deal 5 damage. Apply 3 Chill. Evolve 4 (Blizzard Lord). | Gains Palm |  |
| Glacier Bastion | reaction (attack) 🦋 | Frost | evolved | 1 | When attacked: gain 6 Guard and apply 2 Chill to ALL enemies. If the attacker is Frozen, apply 2 Shaken to the attacker. | When attacked: gain 8 Guard and apply 3 Chill to ALL enemies. If the attacker is Frozen, apply 3 Shaken to the attacker. | Gains Opener |  |
| Frost Ward | reaction (attack) 🦋 | Frost | common | 1 | When attacked: gain 5 Guard and apply 2 Chill to the attacker. Evolve 4 (Glacier Bastion). | When attacked: gain 7 Guard and apply 3 Chill to the attacker. Evolve 4 (Glacier Bastion). | Gains Opener |  |
| Avalanche Spear | attack 🦋 | Frost | evolved | 1 | Deal 3 damage twice. If the target has Chill, double the target's Chill. | Deal 4 damage twice. If the target has Chill, double the target's Chill. | Gains Palm |  |
| Icicle | attack 🦋 | Frost | common | 1 | Deal 4 damage. If the target has Chill, apply 3 Chill. Evolve 4 (Avalanche Spear). | Deal 5 damage. If the target has Chill, apply 4 Chill. Evolve 4 (Avalanche Spear). | Gains Palm |  |
| Ice Age | skill 🦋 | Frost | evolved | 1 | Apply 3 Chill to ALL enemies. If the target is Frozen, gain 1 energy. | Apply 4 Chill to ALL enemies. If the target is Frozen, gain 1 energy. | Gains Palm |  |
| Frost Snap | skill 🦋 | Frost | common | 1 | Apply 3 Chill to ALL enemies. Evolve 4 (Ice Age). | Apply 4 Chill to ALL enemies. Evolve 4 (Ice Age). | Gains Palm |  |
| Rime Sovereign | counter (attack) 🦋 | Frost | evolved | 1 | Counter (an attack): apply 4 Chill to the attacker and apply 1 Shaken to the attacker. If you are below half HP, gain 8 Guard. | Counter (an attack): apply 5 Chill to the attacker and apply 2 Shaken to the attacker. If you are below half HP, gain 11 Guard. | Gains Opener |  |
| Rime Novice | counter (attack) 🦋 | Frost | uncommon | 1 | Counter (an attack): gain 5 Guard and apply 2 Chill to the attacker. Evolve 4 (Rime Sovereign). | Counter (an attack): gain 7 Guard and apply 3 Chill to the attacker. Evolve 4 (Rime Sovereign). | Gains Opener |  |
| Winter Crown | power ★ | Frost | uncommon | 1 | At the end of your turn, apply 2 Chill to ALL enemies. | At the end of your turn, apply 3 Chill to ALL enemies. | Gains Opener |  |
| Frost Engine | power ★ | Frost | rare | 1 | Whenever a chain of 2+ links resolves, apply 2 Chill to ALL enemies. | Whenever a chain of 2+ links resolves, apply 3 Chill to ALL enemies. | Gains Opener |  |
| Glacial Heart | power ★ | Frost | uncommon | 2 | At the end of your turn, if you have Guard, apply 8 Chill to ALL enemies. | At the end of your turn, if you have Guard, apply 9 Chill to ALL enemies. | Costs 1 less |  |
| Cold Soul | power ★ | Frost | uncommon | 1 | Whenever one of your Reactions fires, apply 2 Chill to a random enemy. | Whenever one of your Reactions fires, apply 3 Chill to a random enemy. | Gains Opener |  |
| Shiver Omen | skill | Frost | uncommon | 2 | Gain 6 Guard. Deal 3 damage to each enemy with Chill. If there are 2+ enemies, apply 4 Chill to ALL enemies. | Gain 8 Guard. Deal 4 damage to each enemy with Chill. If there are 2+ enemies, apply 5 Chill to ALL enemies. | Costs 1 less |  |
| Drift Coil | reaction (reaction) | Frost | uncommon | 1 | When an enemy trap activates: deal 5 damage to its owner and apply 1 Shaken to its owner. If its owner has Chill, apply 2 Chill to ALL enemies. | When an enemy trap activates: deal 7 damage to its owner and apply 2 Shaken to its owner. If its owner has Chill, apply 3 Chill to ALL enemies. | Gains Opener |  |
| Avalanche Drill | skill | Frost | common | 1 | Gain 3 Guard. If there are 2+ enemies, double the target's Chill. | Gain 4 Guard. If there are 2+ enemies, double the target's Chill. | Gains Palm |  |
| Northern Rejoinder | counter (attack) | Frost | rare | 0 | Counter (an attack): apply 1 Chill to ALL enemies. If you have Guard, double the attacker's Chill. | Counter (an attack): apply 2 Chill to ALL enemies. If you have Guard, double the attacker's Chill. | Gains Opener |  |
| Rimed Flourish | attack | Frost | rare | 2 | Deal 8 damage. Apply 2 Shaken. If there are 2+ enemies, next turn, gain 9 Guard. | Deal 11 damage. Apply 3 Shaken. If there are 2+ enemies, next turn, gain 12 Guard. | Costs 1 less |  |
| Ice-Bound Mantle | skill | Frost | uncommon | 1 | Apply 2 Shaken. If the target is Frozen, double the target's Chill. | Apply 3 Shaken. If the target is Frozen, double the target's Chill. | Gains Palm |  |
| Rimed Focus | skill | Frost | uncommon | 2 | Gain 6 Guard. Apply 1 Shaken. Chain 2: Apply 5 Chill. | Gain 8 Guard. Apply 2 Shaken. Chain 2: Apply 7 Chill. | Costs 1 less |  |
| Silverfrost Volley | attack | Frost | rare | 2 | Deal 8 damage. Deal 4 damage to each enemy with Chill. If there are 2+ enemies, apply 3 Shaken. | Deal 11 damage. Deal 5 damage to each enemy with Chill. If there are 2+ enemies, apply 4 Shaken. | Costs 1 less |  |
| Drift Seal | reaction (attack) | Frost | uncommon | 0 | When attacked: apply 2 Chill to ALL enemies. If the attacker is below half HP, deal 4 damage to each enemy with Chill. | When attacked: apply 3 Chill to ALL enemies. If the attacker is below half HP, deal 5 damage to each enemy with Chill. | Gains Opener |  |
| Icicle Comeback | counter (any) | Frost | uncommon | 2 | Counter (anything an enemy does): apply 7 Chill to its owner. If you have Guard, deal 9 damage to each enemy with Chill. | Counter (anything an enemy does): apply 9 Chill to its owner. If you have Guard, deal 12 damage to each enemy with Chill. | Costs 1 less |  |
| Avalanche Lash | attack | Frost | rare | 1 | Deal 4 damage. Deal 2 damage to each enemy with Chill. If the target has Chill, apply 2 Chill to ALL enemies. | Deal 5 damage. Deal 3 damage to each enemy with Chill. If the target has Chill, apply 3 Chill to ALL enemies. | Gains Palm |  |
| Drift Tripwire | reaction (reaction) | Frost | uncommon | 1 | When an enemy trap activates: deal 5 damage to its owner and deal 2 damage to each enemy with Chill. If you have Guard, apply 2 Shaken to its owner. | When an enemy trap activates: deal 7 damage to its owner and deal 3 damage to each enemy with Chill. If you have Guard, apply 3 Shaken to its owner. | Gains Opener |  |
| Avalanche Recital | skill | Frost | rare | 1 | Apply 4 Chill. If the target is below half HP, double the target's Chill. | Apply 5 Chill. If the target is below half HP, double the target's Chill. | Gains Palm |  |
| Cryo Strike | attack | Frost | uncommon | 2 | Deal 3 damage twice. Next turn, gain 4 Guard. If the target is below half HP, double the target's Chill. | Deal 4 damage twice. Next turn, gain 5 Guard. If the target is below half HP, double the target's Chill. | Costs 1 less |  |
| Drift Parry | counter (reaction) | Frost | uncommon | 0 | Counter (a trap or Reaction): apply 1 Chill to ALL enemies. If there are 2+ enemies, apply 1 Shaken to its owner. | Counter (a trap or Reaction): apply 2 Chill to ALL enemies. If there are 2+ enemies, apply 2 Shaken to its owner. | Gains Opener |  |
| Silverfrost Quip | counter (attack) | Frost | common | 1 | Counter (an attack): gain 4 Guard. If the attacker has Chill, apply 2 Shaken to the attacker. | Counter (an attack): gain 5 Guard. If the attacker has Chill, apply 3 Shaken to the attacker. | Gains Opener |  |
| Frigid Veil | skill | Frost | uncommon | 2 | Gain 4 Guard. Double the target's Chill. Chain 2: Deal 4 damage to each enemy with Chill. | Gain 5 Guard. Double the target's Chill. Chain 2: Deal 5 damage to each enemy with Chill. | Costs 1 less |  |
| Frigid Seal | reaction (skill) | Frost | uncommon | 0 | When an enemy uses a non-attack: deal 3 damage to each enemy with Chill. If it is below half HP, apply 2 Chill to ALL enemies. | When an enemy uses a non-attack: deal 4 damage to each enemy with Chill. If it is below half HP, apply 3 Chill to ALL enemies. | Gains Opener |  |
| Drift Slash | attack | Frost | uncommon | 2 | Deal 7 damage. Apply 3 Chill. If there are 2+ enemies, deal 6 damage to each enemy with Chill. | Deal 9 damage. Apply 4 Chill. If there are 2+ enemies, deal 8 damage to each enemy with Chill. | Costs 1 less |  |
| Powder Retaliation | counter (reaction) | Frost | uncommon | 1 | Counter (a trap or Reaction): gain 3 Guard and apply 1 Shaken to its owner. If its owner has Chill, double its Chill. | Counter (a trap or Reaction): gain 4 Guard and apply 2 Shaken to its owner. If its owner has Chill, double its Chill. | Gains Opener |  |
| Cryo Sigil | skill | Frost | uncommon | 1 | Gain 3 Guard. Apply 1 Shaken. If the target is Frozen, apply 4 Chill. | Gain 4 Guard. Apply 2 Shaken. If the target is Frozen, apply 5 Chill. | Gains Palm |  |
| Bitter Stance | skill | Frost | uncommon | 2 | Deal 9 damage to each enemy with Chill. If the target is below half HP, double the target's Chill. | Deal 12 damage to each enemy with Chill. If the target is below half HP, double the target's Chill. | Costs 1 less |  |
| Northern Rebuttal | counter (attack) | Frost | rare | 1 | Counter (an attack): gain 4 Guard and apply 1 Chill to ALL enemies. If the attacker is Frozen, apply 3 Shaken to the attacker. | Counter (an attack): gain 5 Guard and apply 2 Chill to ALL enemies. If the attacker is Frozen, apply 4 Shaken to the attacker. | Gains Opener |  |
| Whiteout Cut | attack | Frost | common | 0 | Deal 3 damage. If the target has Chill, deal 2 damage to each enemy with Chill. | Deal 4 damage. If the target has Chill, deal 3 damage to each enemy with Chill. | Gains Palm |  |
| Drift Vow | skill | Frost | uncommon | 2 | Gain 8 Guard. If the target has Chill, deal 7 damage to each enemy with Chill. | Gain 11 Guard. If the target has Chill, deal 9 damage to each enemy with Chill. | Costs 1 less |  |
| Shiver Riposte | counter (attack) | Frost | rare | 0 | Counter (an attack): deal 3 damage to each enemy with Chill. If the attacker is below half HP, apply 4 Chill to the attacker. | Counter (an attack): deal 4 damage to each enemy with Chill. If the attacker is below half HP, apply 5 Chill to the attacker. | Gains Opener |  |
| Icicle Vow | skill | Frost | common | 2 | Gain 9 Guard. If the target is Frozen, double the target's Chill. | Gain 12 Guard. If the target is Frozen, double the target's Chill. | Costs 1 less |  |
| Ice-Bound Bait | reaction (attack) | Frost | uncommon | 1 | When attacked: deal 7 damage to the attacker. If the attacker is below half HP, deal 7 damage to each enemy with Chill. | When attacked: deal 9 damage to the attacker. If the attacker is below half HP, deal 9 damage to each enemy with Chill. | Gains Opener |  |
| Floe Trance | skill | Frost | uncommon | 0 | Apply 2 Chill. If there are 2+ enemies, next turn, gain 3 Guard. | Apply 3 Chill. If there are 2+ enemies, next turn, gain 4 Guard. | Gains Palm |  |
| Tundra Hammer | attack | Frost | uncommon | 3 | Deal 12 damage. Apply 2 Shaken. If the target is below half HP, double the target's Chill. | Deal 16 damage. Apply 3 Shaken. If the target is below half HP, double the target's Chill. | Costs 1 less |  |
| Icicle Clasp | reaction (attack) | Frost | uncommon | 0 | When attacked: apply 1 Shaken to the attacker. If there are 2+ enemies, double the attacker's Chill. | When attacked: apply 2 Shaken to the attacker. If there are 2+ enemies, double the attacker's Chill. | Gains Opener |  |
| Drift Shroud | skill | Frost | rare | 1 | Next turn, gain 5 Guard. If the target is below half HP, apply 3 Shaken. | Next turn, gain 7 Guard. If the target is below half HP, apply 4 Shaken. | Gains Palm |  |
| Ice-Bound Deflection | counter (attack) | Frost | rare | 0 | Counter (an attack): apply 1 Shaken to the attacker. If the attacker is below half HP, double the attacker's Chill. | Counter (an attack): apply 2 Shaken to the attacker. If the attacker is below half HP, double the attacker's Chill. | Gains Opener |  |
| Northern Seal | reaction (skill) | Frost | uncommon | 0 | When an enemy uses a non-attack: deal 3 damage to each enemy with Chill. If it is below half HP, next turn, gain 5 Guard. | When an enemy uses a non-attack: deal 4 damage to each enemy with Chill. If it is below half HP, next turn, gain 7 Guard. | Gains Opener |  |
| Ice-Bound Smite | attack | Frost | uncommon | 2 | Deal 3 damage twice. Apply 3 Chill. If there are 2+ enemies, deal 6 damage to each enemy with Chill. | Deal 4 damage twice. Apply 4 Chill. If there are 2+ enemies, deal 8 damage to each enemy with Chill. | Costs 1 less |  |
| Silverfrost Canticle | skill | Frost | rare | 1 | Apply 2 Chill to ALL enemies. If you have Guard, double the target's Chill. | Apply 3 Chill to ALL enemies. If you have Guard, double the target's Chill. | Gains Palm |  |
| Silverfrost Rebuff | counter (reaction) | Frost | uncommon | 1 | Counter (a trap or Reaction): gain 5 Guard. If its owner is below half HP, double its Chill. | Counter (a trap or Reaction): gain 7 Guard. If its owner is below half HP, double its Chill. | Gains Opener |  |
| Drift Hook | attack | Frost | uncommon | 1 | Deal 5 damage. If there are 2+ enemies, next turn, gain 6 Guard. | Deal 7 damage. If there are 2+ enemies, next turn, gain 8 Guard. | Gains Palm |  |
| Ice-Bound Veto | counter (attack) | Frost | common | 1 | Counter (an attack): gain 4 Guard. If the attacker has Chill, apply 3 Chill to the attacker. | Counter (an attack): gain 5 Guard. If the attacker has Chill, apply 4 Chill to the attacker. | Gains Opener |  |
| Drift Posture | skill | Frost | uncommon | 2 | Next turn, gain 9 Guard. If the target is below half HP, deal 10 damage to each enemy with Chill. | Next turn, gain 12 Guard. If the target is below half HP, deal 13 damage to each enemy with Chill. | Costs 1 less |  |
| Rimed Tripwire | reaction (reaction) | Frost | uncommon | 1 | When an enemy trap activates: deal 7 damage to its owner. If there are 2+ enemies, apply 3 Chill to ALL enemies. | When an enemy trap activates: deal 9 damage to its owner. If there are 2+ enemies, apply 4 Chill to ALL enemies. | Gains Opener |  |
| Avalanche Tripwire | reaction (reaction) | Frost | rare | 1 | When an enemy trap activates: apply 3 Shaken to its owner. If its owner has Chill, apply 3 Chill to ALL enemies. | When an enemy trap activates: apply 4 Shaken to its owner. If its owner has Chill, apply 4 Chill to ALL enemies. | Gains Opener |  |
| Frigid Retaliation | counter (reaction) | Frost | uncommon | 0 | Counter (a trap or Reaction): next turn, gain 3 Guard. If its owner is Frozen, apply 3 Chill to ALL enemies. | Counter (a trap or Reaction): next turn, gain 4 Guard. If its owner is Frozen, apply 4 Chill to ALL enemies. | Gains Opener |  |
| Whiteout Clasp | reaction (reaction) | Frost | uncommon | 1 | When an enemy trap activates: apply 4 Chill to its owner. If there are 2+ enemies, double its Chill. | When an enemy trap activates: apply 5 Chill to its owner. If there are 2+ enemies, double its Chill. | Gains Opener |  |
| Floe Vow | skill | Frost | uncommon | 1 | Gain 3 Guard. Apply 1 Shaken. If there are 2+ enemies, deal 3 damage to each enemy with Chill. | Gain 4 Guard. Apply 2 Shaken. If there are 2+ enemies, deal 4 damage to each enemy with Chill. | Gains Palm |  |
| Icicle Cut | attack | Frost | rare | 1 | Deal 4 damage. Apply 1 Shaken. If the target is Frozen, apply 3 Chill to ALL enemies. | Deal 5 damage. Apply 2 Shaken. If the target is Frozen, apply 4 Chill to ALL enemies. | Gains Palm |  |
| Shiver Reply | counter (reaction) | Frost | uncommon | 1 | Counter (a trap or Reaction): gain 5 Guard. If its owner is below half HP, deal 6 damage to each enemy with Chill. | Counter (a trap or Reaction): gain 7 Guard. If its owner is below half HP, deal 8 damage to each enemy with Chill. | Gains Opener |  |
| Silverfrost Ritual | skill | Frost | uncommon | 1 | Gain 4 Guard. If there are 2+ enemies, apply 2 Shaken. | Gain 5 Guard. If there are 2+ enemies, apply 3 Shaken. | Gains Palm |  |
| Powder Seal | reaction (attack) | Frost | uncommon | 1 | When attacked: deal 4 damage to the attacker and apply 2 Chill to the attacker. If the attacker is below half HP, double the attacker's Chill. | When attacked: deal 5 damage to the attacker and apply 3 Chill to the attacker. If the attacker is below half HP, double the attacker's Chill. | Gains Opener |  |
| Bitter Clasp | reaction (attack) | Frost | rare | 1 | When attacked: gain 5 Guard and apply 1 Shaken to the attacker. If the attacker has Chill, deal 4 damage to each enemy with Chill. | When attacked: gain 7 Guard and apply 2 Shaken to the attacker. If the attacker has Chill, deal 5 damage to each enemy with Chill. | Gains Opener |  |
| Glacier Tactic | skill | Frost | uncommon | 1 | Apply 3 Chill. If the target is Frozen, deal 7 damage to each enemy with Chill. | Apply 4 Chill. If the target is Frozen, deal 9 damage to each enemy with Chill. | Gains Palm |  |
| Frigid Drill | skill | Frost | uncommon | 0 | Deal 2 damage to each enemy with Chill. If the target is below half HP, apply 2 Chill to ALL enemies. | Deal 3 damage to each enemy with Chill. If the target is below half HP, apply 3 Chill to ALL enemies. | Gains Palm |  |

## Stone cards (133)

| Card | Type | Element | Rarity | Cost | Text | Upgraded (A) | Path B | Unlock |
|---|---|---|---|---|---|---|---|---|
| Quake Step | attack ★ | Stone | starter | 1 | Deal 5 damage. Apply 3 Tremor. | Deal 7 damage. Apply 4 Tremor. | Gains Palm |  |
| Bulwark Ward | reaction (attack) ★ | Stone | starter | 1 | When attacked: gain 9 Guard and 2 Fortify. | When attacked: gain 12 Guard and 3 Fortify. | Gains Opener |  |
| Cobble | skill ★ | Stone | common | 1 | Gain 7 Guard and 2 Fortify. | Gain 10 Guard and 3 Fortify. | Gains Palm |  |
| Rockslide | attack ★ | Stone | common | 2 | Deal 8 damage to ALL enemies. Apply 2 Tremor to ALL enemies. | Deal 11 damage to ALL enemies. Apply 3 Tremor to ALL enemies. | Costs 1 less |  |
| Pillar | skill ★ | Stone | common | 2 | Gain 15 Guard. | Gain 20 Guard. | Costs 1 less |  |
| Boulder Toss | attack ★ | Stone | common | 2 | Deal 13 damage. If you have 10 or more Guard, deal 6 more. | Deal 17 damage. If you have 10 or more Guard, deal 8 more. | Costs 1 less |  |
| Crag Hammer | attack ★ | Stone | common | 1 | Deal 7 damage. Gain 3 Guard. | Deal 9 damage. Gain 5 Guard. | Gains Palm |  |
| Quarry | skill ★ | Stone | common | 0 | Gain 3 Guard. Next turn, gain 5 Guard. | Gain 4 Guard. Next turn, gain 7 Guard. | Gains Palm |  |
| Gravel Ward | reaction (attack) ★ | Stone | common | 0 | When attacked: gain 5 Guard and apply 3 Tremor to the attacker. | When attacked: gain 7 Guard and apply 4 Tremor to the attacker. | Gains Opener |  |
| Earthen Rebuff | counter (attack) ★ | Stone | common | 1 | Counter (an attack): gain 11 Guard and 2 Fortify. | Counter (an attack): gain 15 Guard and 3 Fortify. | Gains Opener |  |
| Rockfall | counter (reaction) ★ | Stone | uncommon | 1→0 | Counter (a trap or Reaction): Negate it and apply 4 Tremor to its owner. | Counter (a trap or Reaction): Negate it and apply 5 Tremor to its owner. | Gains Opener |  |
| Aftershock | attack ★ | Stone | uncommon | 1 | Deal 4 damage. Double the target's Tremor. | Deal 7 damage. Double the target's Tremor. | Gains Palm |  |
| Stone Skin | power ★ | Stone | uncommon | 1 | Gain 5 Fortify. | Gain 8 Fortify. | Gains Opener |  |
| Seismic Slam | attack ★ | Stone | uncommon | 2→1 | Deal damage equal to your Guard to ALL enemies. | Deal damage equal to your Guard to ALL enemies. | Gains Palm |  |
| Sandstorm | skill ★ | Stone | uncommon | 1 | Apply 1 Shaken and 2 Tremor to ALL enemies. | Apply 2 Shaken and 3 Tremor to ALL enemies. | Gains Palm |  |
| Obelisk | reaction (skill) ★ | Stone | uncommon | 1 | When an enemy uses a non-attack: gain 8 Guard and 2 Fortify. | When an enemy uses a non-attack: gain 11 Guard and 3 Fortify. | Gains Opener |  |
| Petrify | skill ★ | Stone | uncommon | 2 | Apply 3 Shaken and 6 Tremor. Fold. | Apply 4 Shaken and 9 Tremor. Fold. | No longer Folds |  |
| Geode | skill ★ | Stone | uncommon | 0 | Gain 1 energy for every 10 Guard you have (up to 3). Fold. | Gain 1 energy for every 10 Guard you have (up to 4). Fold. | No longer Folds |  |
| Fault Line | power ★ | Stone | rare | 2 | At the start of your turn, apply 3 Tremor to ALL enemies. | At the start of your turn, apply 4 Tremor to ALL enemies. | Costs 1 less |  |
| Monolith | skill ★ | Stone | rare | 3 | Gain 24 Guard and 5 Fortify. | Gain 30 Guard and 7 Fortify. | Costs 1 less |  |
| Tectonic Shift | attack ★ | Stone | rare | 2 | Deal 6 damage to ALL enemies. Apply 6 Tremor to ALL enemies. | Deal 8 damage to ALL enemies. Apply 8 Tremor to ALL enemies. | Costs 1 less |  |
| Heart of the Mountain | power ★ | Stone | legendary | 3→2 | Your Guard is never removed at the start of your turn. | Your Guard is never removed at the start of your turn. | Gains Opener |  |
| Flint Aura | power | Stone | uncommon | 2 | At the end of your turn, gain 3 Fortify. | At the end of your turn, gain 4 Fortify. | Costs 1 less |  |
| Marble Dominion | power | Stone | rare | 2 | At the end of your turn, if you have 10 or more Guard, deal 5 damage to ALL enemies. | At the end of your turn, if you have 10 or more Guard, deal 6 damage to ALL enemies. | Costs 1 less |  |
| Slate Swipe | attack | Stone | common | 2 | Deal 5 damage to ALL enemies. Gain 4 Fortify. | Deal 7 damage to ALL enemies. Gain 5 Fortify. | Costs 1 less |  |
| Ironstone Ploy | skill | Stone | common | 0 | Apply 3 Tremor. | Apply 4 Tremor. | Gains Palm |  |
| Tectonic Lash | attack | Stone | common | 3 | Deal 13 damage. Gain 5 Fortify. | Deal 17 damage. Gain 7 Fortify. | Costs 1 less |  |
| Tectonic Glyph | reaction (reaction) | Stone | uncommon | 1 | When an enemy trap activates: deal 5 damage to its owner and apply 3 Tremor to its owner. | When an enemy trap activates: deal 7 damage to its owner and apply 4 Tremor to its owner. | Gains Opener |  |
| Iron Parry | counter (attack) | Stone | common | 0 | Counter (an attack): gain 4 Guard. | Counter (an attack): gain 5 Guard. | Gains Opener |  |
| Granite Cut | attack | Stone | uncommon | 3 | Deal 15 damage. Deal 6 damage to each enemy with Tremor. | Deal 20 damage. Deal 8 damage to each enemy with Tremor. | Costs 1 less |  |
| Quarry Smite | attack | Stone | common | 2 | Deal 4 damage twice. Apply 3 Tremor. | Deal 5 damage twice. Apply 4 Tremor. | Costs 1 less |  |
| Craggy Canticle | skill | Stone | common | 0 | Apply 2 Tremor to ALL enemies. | Apply 3 Tremor to ALL enemies. | Gains Palm |  |
| Bedrock Cut | attack | Stone | common | 2 | Deal 4 damage twice. Gain 3 Fortify. | Deal 5 damage twice. Gain 4 Fortify. | Costs 1 less |  |
| Quarry Seal | reaction (reaction) | Stone | uncommon | 1 | When an enemy trap activates: deal 5 damage to its owner and gain 3 Fortify. | When an enemy trap activates: deal 7 damage to its owner and gain 4 Fortify. | Gains Opener |  |
| Bedrock Mantle | skill | Stone | common | 1 | Draw 1 card. Apply 1 Tremor to ALL enemies. | Draw 1 card. Apply 2 Tremor to ALL enemies. | Gains Palm |  |
| Basalt Rebuff | counter (attack) | Stone | rare | 1 | Counter (an attack): gain 5 Guard and apply 1 Tremor to ALL enemies and gain 2 Fortify. | Counter (an attack): gain 7 Guard and apply 2 Tremor to ALL enemies and gain 3 Fortify. | Gains Opener |  |
| Quarry Trick | skill | Stone | common | 2 | Draw 2 cards. Apply 1 Tremor. | Draw 2 cards. Apply 2 Tremor. | Costs 1 less |  |
| Granite Ploy | skill | Stone | rare | 2 | Gain 8 Guard. Apply 2 Tremor to ALL enemies. Gain 2 Fortify. | Gain 11 Guard. Apply 3 Tremor to ALL enemies. Gain 3 Fortify. | Costs 1 less |  |
| Marble Riposte | counter (reaction) | Stone | common | 1 | Counter (a trap or Reaction): gain 4 Guard and apply 2 Tremor to ALL enemies. | Counter (a trap or Reaction): gain 5 Guard and apply 3 Tremor to ALL enemies. | Gains Opener |  |
| Iron Burst | attack | Stone | uncommon | 2 | Deal 10 damage. Apply 2 Tremor to ALL enemies. | Deal 13 damage. Apply 3 Tremor to ALL enemies. | Costs 1 less |  |
| Basalt Lunge | attack | Stone | common | 2 | Deal 9 damage. Apply 3 Tremor. | Deal 12 damage. Apply 4 Tremor. | Costs 1 less |  |
| Ironstone Ambush | reaction (attack) | Stone | uncommon | 1 | When attacked: gain 5 Guard and apply 2 Tremor to ALL enemies. | When attacked: gain 7 Guard and apply 3 Tremor to ALL enemies. | Gains Opener |  |
| Monolithic Tripwire | reaction (skill) | Stone | rare | 1 | When an enemy uses a non-attack: gain 5 Guard and apply 2 Tremor to ALL enemies and gain 2 Fortify. | When an enemy uses a non-attack: gain 7 Guard and apply 3 Tremor to ALL enemies and gain 3 Fortify. | Gains Opener |  |
| Obsidian Rite | skill | Stone | uncommon | 2 | Draw 2 cards. Apply 1 Tremor to ALL enemies. | Draw 2 cards. Apply 2 Tremor to ALL enemies. | Costs 1 less |  |
| Iron Thrust | attack | Stone | common | 2 | Deal 9 damage. Gain 3 Fortify. | Deal 12 damage. Gain 4 Fortify. | Costs 1 less |  |
| Boulder Canticle | skill | Stone | rare | 1 | Draw 1 card. Gain 1 Fortify. Apply 1 Tremor. | Draw 1 card. Gain 2 Fortify. Apply 2 Tremor. | Gains Palm |  |
| Boulder Mantle | skill | Stone | common | 1 | Apply 4 Tremor. | Apply 5 Tremor. | Gains Palm |  |
| Bedrock Tripwire | reaction (attack) | Stone | common | 0 | When attacked: deal 4 damage to each enemy with Tremor. | When attacked: deal 5 damage to each enemy with Tremor. | Gains Opener |  |
| Cavern Reply | counter (attack) | Stone | common | 1 | Counter (an attack): gain 4 Guard and gain 3 Fortify. | Counter (an attack): gain 5 Guard and gain 4 Fortify. | Gains Opener |  |
| Seismic Blow | attack | Stone | rare | 3 | Deal 14 damage. Apply 5 Tremor. Gain 4 Fortify. | Deal 19 damage. Apply 7 Tremor. Gain 5 Fortify. | Costs 1 less |  |
| Craggy Ambush | reaction (attack) | Stone | common | 0 | When attacked: apply 2 Tremor to ALL enemies. | When attacked: apply 3 Tremor to ALL enemies. | Gains Opener |  |
| Seismic Gambit | skill | Stone | common | 1 | Apply 3 Tremor to ALL enemies. | Apply 4 Tremor to ALL enemies. | Gains Palm |  |
| Granite Jab | attack | Stone | common | 1 | Deal 4 damage. Apply 1 Tremor to ALL enemies. | Deal 5 damage. Apply 2 Tremor to ALL enemies. | Gains Palm |  |
| Cavern Charm | skill | Stone | common | 0 | Gain 3 Fortify. | Gain 4 Fortify. | Gains Palm |  |
| Boulder Refusal | counter (reaction) | Stone | common | 1 | Counter (a trap or Reaction): gain 4 Guard and gain 3 Fortify. | Counter (a trap or Reaction): gain 5 Guard and gain 4 Fortify. | Gains Opener |  |
| Marble Ward | skill | Stone | uncommon | 2 | Draw 2 cards. Gain 1 Fortify. | Draw 2 cards. Gain 2 Fortify. | Costs 1 less |  |
| Slate Tripwire | reaction (skill) | Stone | rare | 1 | When an enemy uses a non-attack: gain 5 Guard and gain 2 Fortify and apply 2 Tremor to it. | When an enemy uses a non-attack: gain 7 Guard and gain 3 Fortify and apply 3 Tremor to it. | Gains Opener |  |
| Flint Gambit | skill | Stone | common | 1 | Gain 5 Fortify. | Gain 7 Fortify. | Gains Palm |  |
| Tectonic Seal | reaction (attack) | Stone | uncommon | 1 | When attacked: gain 5 Guard and apply 3 Tremor to the attacker. | When attacked: gain 7 Guard and apply 4 Tremor to the attacker. | Gains Opener |  |
| Salt of the Earth | skill ⧉ (aether) | Stone | uncommon | 1 | Gain 4 Fortify. Attune to the element that beats the first enemy. | Gain 5 Fortify. Attune to the element that beats the first enemy. | Gains Palm |  |
| Mineral Acid | attack ⧉ (aether) | Stone | uncommon | 1 | Deal 4 damage. Apply 1 Tremor. If the target has Exposed, deal 3 damage to each enemy with Tremor. | Deal 5 damage. Apply 2 Tremor. If the target has Exposed, deal 4 damage to each enemy with Tremor. | Gains Palm |  |
| Philosopher's Rock | skill ⧉ (aether) | Stone | rare | 1 | Gain 5 Guard. If you played 2+ elements this turn, gain 6 Fortify. | Gain 7 Guard. If you played 2+ elements this turn, gain 8 Fortify. | Gains Palm |  |
| Rockfall Ambush | attack ⧉ (dusk) | Stone | uncommon | 2 | Deal 7 damage. Apply 1 Mark. If the target has Tremor, double the target's Tremor. | Deal 9 damage. Apply 2 Mark. If the target has Tremor, double the target's Tremor. | Costs 1 less |  |
| Cave Shadow | reaction (attack) ⧉ (dusk) | Stone | uncommon | 1 | When attacked: gain 3 Guard and gain 1 Veil. | When attacked: gain 4 Guard and gain 1 Veil. | Gains Opener |  |
| Buried Blade | attack ⧉ (dusk) | Stone | rare | 2 | Deal 12 damage. If you have Fortify, apply 3 Mark. | Deal 16 damage. If you have Fortify, apply 4 Mark. | Costs 1 less |  |
| Meteor | attack 🦋 | Stone | evolved | 1 | Deal 4 damage. Apply 1 Tremor to ALL enemies. If there are 2+ enemies, double the target's Tremor. | Deal 5 damage. Apply 2 Tremor to ALL enemies. If there are 2+ enemies, double the target's Tremor. | Gains Palm |  |
| Pebble Toss | attack 🦋 | Stone | common | 1 | Deal 4 damage. Apply 2 Tremor. Evolve 4 (Meteor). | Deal 5 damage. Apply 3 Tremor. Evolve 4 (Meteor). | Gains Palm |  |
| Mountain Keep | skill 🦋 | Stone | evolved | 1 | Gain 4 Guard. Gain 2 Fortify. If this is the first card you played this turn, draw 1 card. | Gain 5 Guard. Gain 3 Fortify. If this is the first card you played this turn, draw 1 card. | Gains Palm |  |
| Cobblestone | skill 🦋 | Stone | common | 1 | Gain 4 Guard. Gain 2 Fortify. Evolve 4 (Mountain Keep). | Gain 5 Guard. Gain 3 Fortify. Evolve 4 (Mountain Keep). | Gains Palm |  |
| Tectonic Plate | reaction (attack) 🦋 | Stone | evolved | 1 | When attacked: gain 4 Guard for each enemy and apply 2 Tremor to ALL enemies. | When attacked: gain 5 Guard for each enemy and apply 3 Tremor to ALL enemies. | Gains Opener |  |
| Grit | reaction (attack) 🦋 | Stone | common | 1 | When attacked: gain 5 Guard and apply 2 Tremor to the attacker. Evolve 4 (Tectonic Plate). | When attacked: gain 7 Guard and apply 3 Tremor to the attacker. Evolve 4 (Tectonic Plate). | Gains Opener |  |
| Earthshaker | skill 🦋 | Stone | evolved | 0 | Apply 2 Tremor to ALL enemies. Deal 2 damage to each enemy with Tremor. | Apply 3 Tremor to ALL enemies. Deal 3 damage to each enemy with Tremor. | Gains Palm |  |
| Rubble | skill 🦋 | Stone | common | 0 | Apply 3 Tremor. Evolve 3 (Earthshaker). | Apply 4 Tremor. Evolve 3 (Earthshaker). | Gains Palm |  |
| Grand Architect | skill 🦋 | Stone | evolved | 1 | Gain 3 Fortify. Gain 1 Guard for each enemy. If this is the first card you played this turn, draw 1 card. | Gain 4 Fortify. Gain 2 Guard for each enemy. If this is the first card you played this turn, draw 1 card. | Gains Palm |  |
| Mason | skill 🦋 | Stone | uncommon | 1 | Gain 3 Fortify. Gain 1 Guard for each enemy. Evolve 5 (Grand Architect). | Gain 4 Fortify. Gain 2 Guard for each enemy. Evolve 5 (Grand Architect). | Gains Palm |  |
| Mountain Heart | power ★ | Stone | uncommon | 1 | At the start of your turn, gain 3 Fortify. | At the start of your turn, gain 4 Fortify. | Gains Opener |  |
| Quake Engine | power ★ | Stone | rare | 2 | Whenever a chain of 2+ links resolves, apply 3 Tremor to ALL enemies. | Whenever a chain of 2+ links resolves, apply 4 Tremor to ALL enemies. | Costs 1 less |  |
| Granite Crown | power ★ | Stone | uncommon | 1 | At the end of your turn, if you have Fortify, apply 4 Tremor to ALL enemies. | At the end of your turn, if you have Fortify, apply 5 Tremor to ALL enemies. | Gains Opener |  |
| Stone Soul | power ★ | Stone | rare | 1 | Whenever one of your Reactions fires, gain 3 Fortify. | Whenever one of your Reactions fires, gain 4 Fortify. | Gains Opener |  |
| Geode Lunge | attack | Stone | uncommon | 3 | Deal 18 damage. If you have Fortify, double the target's Tremor. | Deal 24 damage. If you have Fortify, double the target's Tremor. | Costs 1 less |  |
| Rampart Canticle | skill | Stone | uncommon | 0 | Deal 2 damage to each enemy with Tremor. If the target has Tremor, apply 1 Shaken. | Deal 3 damage to each enemy with Tremor. If the target has Tremor, apply 2 Shaken. | Gains Palm |  |
| Menhir Comeback | counter (reaction) | Stone | uncommon | 1 | Counter (a trap or Reaction): gain 4 Guard and apply 1 Shaken to its owner. If there are 2+ enemies, gain 4 Fortify. | Counter (a trap or Reaction): gain 5 Guard and apply 2 Shaken to its owner. If there are 2+ enemies, gain 5 Fortify. | Gains Opener |  |
| Rampart Smite | attack | Stone | rare | 2 | Deal 8 damage. Gain 2 Guard for each enemy. If there are 2+ enemies, gain 7 Fortify. | Deal 11 damage. Gain 3 Guard for each enemy. If there are 2+ enemies, gain 9 Fortify. | Costs 1 less |  |
| Rampart Tripwire | reaction (attack) | Stone | common | 1 | When attacked: deal 6 damage to the attacker. If there are 2+ enemies, apply 3 Tremor to ALL enemies. | When attacked: deal 8 damage to the attacker. If there are 2+ enemies, apply 4 Tremor to ALL enemies. | Gains Opener |  |
| Lodestone Comeback | counter (attack) | Stone | rare | 0 | Counter (an attack): apply 1 Shaken to the attacker. If you have Fortify, deal 3 damage to each enemy with Tremor. | Counter (an attack): apply 2 Shaken to the attacker. If you have Fortify, deal 4 damage to each enemy with Tremor. | Gains Opener |  |
| Petrified Swipe | attack | Stone | common | 3 | Deal 13 damage. If the target has Tremor, apply 5 Tremor to ALL enemies. | Deal 17 damage. If the target has Tremor, apply 7 Tremor to ALL enemies. | Costs 1 less |  |
| Shale Lash | attack | Stone | uncommon | 2 | Deal 7 damage. Gain 3 Fortify. If there are 2+ enemies, deal 6 damage to each enemy with Tremor. | Deal 9 damage. Gain 4 Fortify. If there are 2+ enemies, deal 8 damage to each enemy with Tremor. | Costs 1 less |  |
| Terrace Gainsay | counter (skill) | Stone | common | 1 | Counter (a non-attack): gain 4 Guard. If you have Fortify, apply 3 Tremor to it. | Counter (a non-attack): gain 5 Guard. If you have Fortify, apply 4 Tremor to it. | Gains Opener |  |
| Dolmen Trap | reaction (attack) | Stone | rare | 1 | When attacked: gain 5 Guard and apply 1 Tremor to ALL enemies. If there are 2+ enemies, gain 5 Fortify. | When attacked: gain 7 Guard and apply 2 Tremor to ALL enemies. If there are 2+ enemies, gain 7 Fortify. | Gains Opener |  |
| Rampart Trick | skill | Stone | uncommon | 2 | Gain 8 Guard. If you have Fortify, apply 6 Tremor. | Gain 11 Guard. If you have Fortify, apply 8 Tremor. | Costs 1 less |  |
| Keystone Refusal | counter (attack) | Stone | uncommon | 0 | Counter (an attack): apply 1 Shaken to the attacker. If you have Fortify, apply 1 Tremor to ALL enemies. | Counter (an attack): apply 2 Shaken to the attacker. If you have Fortify, apply 2 Tremor to ALL enemies. | Gains Opener |  |
| Rampart Aegis | skill | Stone | uncommon | 2 | Deal 7 damage to each enemy with Tremor. If the target has Tremor, apply 4 Tremor to ALL enemies. | Deal 9 damage to each enemy with Tremor. If the target has Tremor, apply 5 Tremor to ALL enemies. | Costs 1 less |  |
| Dolmen Deadfall | reaction (reaction) | Stone | uncommon | 1 | When an enemy trap activates: apply 4 Tremor to its owner. If you have Fortify, apply 2 Shaken to its owner. | When an enemy trap activates: apply 5 Tremor to its owner. If you have Fortify, apply 3 Shaken to its owner. | Gains Opener |  |
| Aftershock Veil | skill | Stone | uncommon | 2 | Apply 6 Tremor. If you have Fortify, gain 4 Guard for each enemy. | Apply 8 Tremor. If you have Fortify, gain 5 Guard for each enemy. | Costs 1 less |  |
| Rampart Ambush | reaction (attack) | Stone | rare | 0 | When attacked: apply 1 Shaken to the attacker. If you have Guard, apply 3 Tremor to the attacker. | When attacked: apply 2 Shaken to the attacker. If you have Guard, apply 4 Tremor to the attacker. | Gains Opener |  |
| Hewn Ward | skill | Stone | common | 2 | Gain 5 Guard. Double the target's Tremor. | Gain 7 Guard. Double the target's Tremor. | Costs 1 less |  |
| Dolmen Retaliation | counter (reaction) | Stone | uncommon | 0 | Counter (a trap or Reaction): apply 2 Tremor to its owner. If there are 2+ enemies, deal 3 damage to each enemy with Tremor. | Counter (a trap or Reaction): apply 3 Tremor to its owner. If there are 2+ enemies, deal 4 damage to each enemy with Tremor. | Gains Opener |  |
| Terrace Strike | attack | Stone | common | 2 | Deal 4 damage twice. If there are 2+ enemies, deal 8 damage to each enemy with Tremor. | Deal 5 damage twice. If there are 2+ enemies, deal 11 damage to each enemy with Tremor. | Costs 1 less |  |
| Shale Trance | skill | Stone | common | 2 | Gain 7 Guard. If you have Fortify, apply 4 Tremor to ALL enemies. | Gain 9 Guard. If you have Fortify, apply 5 Tremor to ALL enemies. | Costs 1 less |  |
| Geode Ritual | skill | Stone | uncommon | 2 | Gain 4 Guard for each enemy. If the target has Tremor, apply 4 Tremor to ALL enemies. | Gain 5 Guard for each enemy. If the target has Tremor, apply 5 Tremor to ALL enemies. | Costs 1 less |  |
| Cairn Ward | skill | Stone | uncommon | 0 | Apply 2 Tremor. If you have Guard, apply 1 Shaken. | Apply 3 Tremor. If you have Guard, apply 2 Shaken. | Gains Palm |  |
| Bastion Veil | skill | Stone | uncommon | 1 | Gain 3 Guard. Apply 1 Shaken. If there are 2+ enemies, gain 3 Fortify. | Gain 4 Guard. Apply 2 Shaken. If there are 2+ enemies, gain 4 Fortify. | Gains Palm |  |
| Terrace Jab | attack | Stone | rare | 2 | Deal 4 damage twice. Deal 4 damage to each enemy with Tremor. If there are 2+ enemies, gain 7 Fortify. | Deal 5 damage twice. Deal 5 damage to each enemy with Tremor. If there are 2+ enemies, gain 9 Fortify. | Costs 1 less |  |
| Aftershock Coil | reaction (attack) | Stone | uncommon | 1 | When attacked: deal 6 damage to the attacker. If you have Guard, double the attacker's Tremor. | When attacked: deal 8 damage to the attacker. If you have Guard, double the attacker's Tremor. | Gains Opener |  |
| Cairn Feint | attack | Stone | uncommon | 2 | Deal 5 damage. Double the target's Tremor. If there are 2+ enemies, gain 4 Fortify. | Deal 7 damage. Double the target's Tremor. If there are 2+ enemies, gain 5 Fortify. | Costs 1 less |  |
| Terrace Ploy | skill | Stone | common | 1 | Gain 4 Guard. If there are 2+ enemies, apply 2 Tremor to ALL enemies. | Gain 5 Guard. If there are 2+ enemies, apply 3 Tremor to ALL enemies. | Gains Palm |  |
| Lodestone Thrust | attack | Stone | common | 2 | Deal 5 damage twice. If there are 2+ enemies, double the target's Tremor. | Deal 7 damage twice. If there are 2+ enemies, double the target's Tremor. | Costs 1 less |  |
| Terrace Rune | reaction (skill) | Stone | common | 1 | When an enemy uses a non-attack: gain 5 Guard. If there are 2+ enemies, apply 3 Tremor to ALL enemies. | When an enemy uses a non-attack: gain 7 Guard. If there are 2+ enemies, apply 4 Tremor to ALL enemies. | Gains Opener |  |
| Keystone Gesture | skill | Stone | rare | 2 | Gain 5 Guard. Double the target's Tremor. If there are 2+ enemies, deal 6 damage to each enemy with Tremor. | Gain 7 Guard. Double the target's Tremor. If there are 2+ enemies, deal 8 damage to each enemy with Tremor. | Costs 1 less |  |
| Hewn Seal | reaction (attack) | Stone | common | 1 | When attacked: deal 6 damage to the attacker. If there are 2+ enemies, apply 5 Tremor to the attacker. | When attacked: deal 8 damage to the attacker. If there are 2+ enemies, apply 7 Tremor to the attacker. | Gains Opener |  |
| Dolmen Charm | skill | Stone | uncommon | 1 | Apply 3 Tremor. If you have Guard, gain 4 Fortify. | Apply 4 Tremor. If you have Guard, gain 5 Fortify. | Gains Palm |  |
| Bastion Bait | reaction (attack) | Stone | uncommon | 0 | When attacked: gain 2 Guard for each enemy. If you have Fortify, apply 2 Tremor to the attacker. | When attacked: gain 3 Guard for each enemy. If you have Fortify, apply 3 Tremor to the attacker. | Gains Opener |  |
| Menhir Lunge | attack | Stone | uncommon | 1 | Deal 2 damage to a random enemy 3 times. If you have Fortify, gain 2 Guard for each enemy. | Deal 3 damage to a random enemy 3 times. If you have Fortify, gain 3 Guard for each enemy. | Gains Palm |  |
| Cairn Mantra | skill | Stone | uncommon | 2 | Gain 5 Guard. Gain 3 Fortify. If the target has Tremor, double the target's Tremor. | Gain 7 Guard. Gain 4 Fortify. If the target has Tremor, double the target's Tremor. | Costs 1 less |  |
| Geode Rebuff | counter (attack) | Stone | uncommon | 1 | Counter (an attack): gain 4 Guard and apply 1 Shaken to the attacker. If there are 2+ enemies, apply 2 Tremor to ALL enemies. | Counter (an attack): gain 5 Guard and apply 2 Shaken to the attacker. If there are 2+ enemies, apply 3 Tremor to ALL enemies. | Gains Opener |  |
| Sandstone Mantra | skill | Stone | uncommon | 1 | Gain 3 Fortify. If the target has Tremor, gain 2 Guard for each enemy. | Gain 4 Fortify. If the target has Tremor, gain 3 Guard for each enemy. | Gains Palm |  |
| Dolmen Slash | attack | Stone | uncommon | 3 | Deal 10 damage. Deal 5 damage to each enemy with Tremor. If you have Guard, gain 5 Guard for each enemy. | Deal 13 damage. Deal 7 damage to each enemy with Tremor. If you have Guard, gain 7 Guard for each enemy. | Costs 1 less |  |
| Earthen Deadfall | reaction (attack) | Stone | common | 1 | When attacked: deal 6 damage to the attacker. If you have Fortify, gain 4 Fortify. | When attacked: deal 8 damage to the attacker. If you have Fortify, gain 5 Fortify. | Gains Opener |  |
| Dolmen Aegis | skill | Stone | rare | 1 | Apply 2 Shaken. If you have Fortify, deal 4 damage to each enemy with Tremor. | Apply 3 Shaken. If you have Fortify, deal 5 damage to each enemy with Tremor. | Gains Palm |  |
| Earthen Gambit | skill | Stone | uncommon | 1 | Gain 3 Guard. Apply 1 Tremor. If there are 2+ enemies, deal 3 damage to each enemy with Tremor. | Gain 4 Guard. Apply 2 Tremor. If there are 2+ enemies, deal 4 damage to each enemy with Tremor. | Gains Palm |  |
| Aftershock Veto | counter (reaction) | Stone | common | 1 | Counter (a trap or Reaction): gain 4 Guard. If its owner has Tremor, apply 3 Tremor to its owner. | Counter (a trap or Reaction): gain 5 Guard. If its owner has Tremor, apply 4 Tremor to its owner. | Gains Opener |  |
| Terrace Posture | skill | Stone | uncommon | 1 | Gain 3 Guard. Gain 1 Fortify. If there are 2+ enemies, apply 2 Tremor to ALL enemies. | Gain 4 Guard. Gain 2 Fortify. If there are 2+ enemies, apply 3 Tremor to ALL enemies. | Gains Palm |  |
| Aftershock Lure | reaction (reaction) | Stone | rare | 1 | When an enemy trap activates: gain 6 Fortify. If you have Guard, double its Tremor. | When an enemy trap activates: gain 8 Fortify. If you have Guard, double its Tremor. | Gains Opener |  |
| Fault Veto | counter (skill) | Stone | uncommon | 1 | Counter (a non-attack): gain 3 Guard and apply 1 Shaken to it. If there are 2+ enemies, double its Tremor. | Counter (a non-attack): gain 4 Guard and apply 2 Shaken to it. If there are 2+ enemies, double its Tremor. | Gains Opener |  |
| Dolmen Mantra | skill | Stone | rare | 0 | Apply 1 Shaken. If there are 2+ enemies, gain 3 Fortify. | Apply 2 Shaken. If there are 2+ enemies, gain 4 Fortify. | Gains Palm |  |
| Shale Rebuke | counter (reaction) | Stone | uncommon | 0 | Counter (a trap or Reaction): deal 2 damage to each enemy with Tremor. If its owner has Tremor, apply 1 Tremor to ALL enemies. | Counter (a trap or Reaction): deal 3 damage to each enemy with Tremor. If its owner has Tremor, apply 2 Tremor to ALL enemies. | Gains Opener |  |
| Cairn Veil | skill | Stone | uncommon | 2 | Gain 6 Fortify. If you have Guard, gain 5 Guard for each enemy. | Gain 8 Fortify. If you have Guard, gain 7 Guard for each enemy. | Costs 1 less |  |
| Fault Lure | reaction (reaction) | Stone | rare | 1 | When an enemy trap activates: apply 3 Shaken to its owner. If you have Guard, gain 6 Fortify. | When an enemy trap activates: apply 4 Shaken to its owner. If you have Guard, gain 8 Fortify. | Gains Opener |  |
| Bastion Jab | attack | Stone | uncommon | 1 | Deal 4 damage. Apply 1 Tremor to ALL enemies. If you have Fortify, apply 1 Shaken. | Deal 5 damage. Apply 2 Tremor to ALL enemies. If you have Fortify, apply 2 Shaken. | Gains Palm |  |
| Rampart Denial | counter (attack) | Stone | uncommon | 0 | Counter (an attack): deal 2 damage to each enemy with Tremor. If you have Fortify, gain 2 Guard for each enemy. | Counter (an attack): deal 3 damage to each enemy with Tremor. If you have Fortify, gain 3 Guard for each enemy. | Gains Opener |  |
| Geode Sigil | skill | Stone | common | 1 | Gain 4 Guard. If the target has Tremor, deal 3 damage to each enemy with Tremor. | Gain 5 Guard. If the target has Tremor, deal 4 damage to each enemy with Tremor. | Gains Palm |  |
| Sandstone Ritual | skill | Stone | uncommon | 2 | Apply 3 Shaken. If you have Fortify, gain 7 Fortify. | Apply 4 Shaken. If you have Fortify, gain 9 Fortify. | Costs 1 less |  |
| Petrified Retort | counter (reaction) | Stone | common | 1 | Counter (a trap or Reaction): gain 4 Guard. If you have Fortify, deal 4 damage to each enemy with Tremor. | Counter (a trap or Reaction): gain 5 Guard. If you have Fortify, deal 5 damage to each enemy with Tremor. | Gains Opener |  |

## Aether cards (125)

| Card | Type | Element | Rarity | Cost | Text | Upgraded (A) | Path B | Unlock |
|---|---|---|---|---|---|---|---|---|
| Vial Toss | attack ★ | Prism | starter | 1 | Prism. Deal 6 damage. If Effective, draw 1 card. | Prism. Deal 9 damage. If Effective, draw 1 card. | Gains Palm |  |
| Catalyze | skill ★ | Prism | starter | 0 | Attune to the element that beats the target. Gain 3 Guard. | Attune to the element that beats the target. Gain 5 Guard. | Gains Palm |  |
| Reagent Ward | reaction (attack) ★ | Prism | starter | 1 | When attacked: attune to the element that beats the attacker (so its hit is Resisted) and gain 6 Guard. | When attacked: attune to the element that beats the attacker (so its hit is Resisted) and gain 9 Guard. | Gains Opener |  |
| Fire Flask | attack ★ | Blaze | common | 1 | Blaze. Deal 6 damage. Apply 2 Burn. | Blaze. Deal 8 damage. Apply 3 Burn. | Gains Palm |  |
| Frost Flask | attack ★ | Frost | common | 1 | Frost. Deal 7 damage. Apply 3 Chill. | Frost. Deal 9 damage. Apply 4 Chill. | Gains Palm |  |
| Spark Flask | attack ★ | Storm | common | 1 | Storm. Deal 6 damage. Apply 2 Shock. | Storm. Deal 8 damage. Apply 3 Shock. | Gains Palm |  |
| Mud Flask | attack ★ | Stone | common | 1 | Stone. Deal 5 damage. Gain 5 Guard. | Stone. Deal 7 damage. Gain 7 Guard. | Gains Palm |  |
| Brine Flask | attack ★ | Flood | common | 1 | Flood. Deal 6 damage. Draw 1 card. | Flood. Deal 9 damage. Draw 1 card. | Gains Palm |  |
| Seed Flask | attack ★ | Wild | common | 1 | Wild. Deal 6 damage. Heal 2 HP. | Wild. Deal 8 damage. Heal 3 HP. | Gains Palm |  |
| Transmute | skill ★ | Prism | common | 1 | Attune to the element that beats the target. Draw 2 cards. | Attune to the element that beats the target. Draw 3 cards. | Gains Palm |  |
| Philter | skill ★ | Prism | common | 1 | Prism. Gain 7 Guard. Draw 1 card if you played 2 or more elements this turn. | Prism. Gain 10 Guard. Draw 1 card if you played 2 or more elements this turn. | Gains Palm |  |
| Solvent | counter (reaction) ★ | Prism | common | 1→0 | Counter (a trap or Reaction): Negate it. Attune to the element that beats its owner. | Counter (a trap or Reaction): Negate it. Attune to the element that beats its owner. | Gains Opener |  |
| Buffer Solution | counter (attack) ★ | Prism | common | 1 | Counter (an attack): attune to the element that beats the attacker (its hit is Resisted) and gain 7 Guard. | Counter (an attack): attune to the element that beats the attacker (its hit is Resisted) and gain 10 Guard. | Gains Opener |  |
| Volatile Mix | attack ★ | Prism | uncommon | 1 | Prism. Deal 12 damage. Lose 3 HP. | Prism. Deal 16 damage. Lose 3 HP. | Gains Palm |  |
| Alembic | skill ★ | Prism | uncommon | 0 | Draw 1 card for each different element you played this turn, +0. | Draw 1 card for each different element you played this turn, +1. | Gains Palm |  |
| Elixir of Plenty | power ★ | Prism | uncommon | 1 | Whenever Resonance happens, gain 4 Guard and draw 1 card. | Whenever Resonance happens, gain 7 Guard and draw 1 card. | Gains Opener |  |
| Aqua Regia | attack ★ | Prism | uncommon | 2 | Prism. Deal 8 damage twice. If Effective, apply 2 Exposed. | Prism. Deal 11 damage twice. If Effective, apply 2 Exposed. | Costs 1 less |  |
| Chromatic Burst | attack ★ | Prism | uncommon | 1 | Prism. Deal 4 damage to ALL enemies once per different element you played this turn (at least once). | Prism. Deal 6 damage to ALL enemies once per different element you played this turn (at least once). | Gains Palm |  |
| Catalyst | power ★ | Prism | rare | 2→1 | Resonance happens after 2 cards of an element instead of 3. | Resonance happens after 2 cards of an element instead of 3. | Gains Opener |  |
| Prima Materia | skill ★ | Prism | rare | 1 | Trigger your Attunement's Resonance. Fold. | Trigger your Attunement's Resonance. | Gains Palm |  |
| Quintessence | attack ★ | Prism | rare | 2 | Prism. Deal 10 damage, +4 per different element you played this turn. | Prism. Deal 13 damage, +5 per different element you played this turn. | Costs 1 less |  |
| Magnum Opus | skill ★ | Prism | legendary | 2→1 | Trigger the Resonance of every element you played this turn. Fold. | Trigger the Resonance of every element you played this turn. Fold. | No longer Folds |  |
| Elemental Oath | power | Prism | uncommon | 1 | At the start of your turn, apply 1 Exposed to a random enemy. | At the start of your turn, apply 2 Exposed to a random enemy. | Gains Opener |  |
| Transmuted Engine | power | Prism | rare | 1 | Whenever Resonance happens, deal 5 damage to ALL enemies. | Whenever Resonance happens, deal 6 damage to ALL enemies. | Gains Opener |  |
| Essential Draught | attack | Prism | common | 2 | Prism. Deal 4 damage twice. Gain 4 Guard. | Prism. Deal 5 damage twice. Gain 5 Guard. | Costs 1 less |  |
| Elemental Focus | skill | Prism | common | 1 | Prism. Attune to the element that beats the target. Gain 4 Guard. | Prism. Attune to the element that beats the target. Gain 5 Guard. | Gains Palm |  |
| Mercurial Mirror | reaction (attack) | Prism | common | 1 | Prism. When attacked: gain 4 Guard and apply 1 Exposed to the attacker. | Prism. When attacked: gain 5 Guard and apply 2 Exposed to the attacker. | Gains Opener |  |
| Essential Glyph | reaction (skill) | Prism | common | 1 | Prism. When an enemy uses a non-attack: gain 4 Guard and apply 2 Exposed to it. | Prism. When an enemy uses a non-attack: gain 5 Guard and apply 3 Exposed to it. | Gains Opener |  |
| Quicksilver Acid | attack | Prism | uncommon | 1 | Prism. Deal 6 damage. Attune to the element that beats the target. | Prism. Deal 8 damage. Attune to the element that beats the target. | Gains Palm |  |
| Aetheric Canticle | skill | Prism | rare | 2 | Prism. Draw 2 cards. Apply 1 Exposed. Attune to the element that beats the target. | Prism. Draw 2 cards. Apply 2 Exposed. Attune to the element that beats the target. | Costs 1 less |  |
| Volatile Denial | counter (reaction) | Prism | common | 1 | Prism. Counter (a trap or Reaction): gain 5 Guard and attune to the element that beats its owner. | Prism. Counter (a trap or Reaction): gain 7 Guard and attune to the element that beats its owner. | Gains Opener |  |
| Transmuted Acid | attack | Prism | common | 1 | Prism. Deal 4 damage. Apply 1 Exposed. | Prism. Deal 5 damage. Apply 2 Exposed. | Gains Palm |  |
| Quicksilver Shroud | skill | Prism | uncommon | 2 | Prism. Gain 7 Guard. Draw 1 card. | Prism. Gain 9 Guard. Draw 1 card. | Costs 1 less |  |
| Volatile Tripwire | reaction (attack) | Prism | common | 0 | Prism. When attacked: apply 2 Exposed to the attacker. | Prism. When attacked: apply 3 Exposed to the attacker. | Gains Opener |  |
| Transmuted Retort | counter (attack) | Prism | common | 0 | Prism. Counter (an attack): apply 2 Exposed to the attacker. | Prism. Counter (an attack): apply 3 Exposed to the attacker. | Gains Opener |  |
| Aetheric Trap | reaction (reaction) | Prism | common | 1 | Prism. When an enemy trap activates: deal 7 damage to its owner and attune to the element that beats its owner. | Prism. When an enemy trap activates: deal 9 damage to its owner and attune to the element that beats its owner. | Gains Opener |  |
| Mercurial Canticle | skill | Prism | common | 1 | Prism. Apply 2 Exposed. | Prism. Apply 3 Exposed. | Gains Palm |  |
| Philosophic Spray | attack | Prism | rare | 2 | Prism. Deal 4 damage to ALL enemies. Gain 4 Guard. Draw 1 card. | Prism. Deal 5 damage to ALL enemies. Gain 5 Guard. Draw 1 card. | Costs 1 less |  |
| Prismatic Tripwire | reaction (reaction) | Prism | uncommon | 1 | Prism. When an enemy trap activates: deal 5 damage to its owner and gain 4 Guard. | Prism. When an enemy trap activates: deal 7 damage to its owner and gain 5 Guard. | Gains Opener |  |
| Transmuted Focus | skill | Prism | common | 0 | Prism. Apply 1 Exposed. | Prism. Apply 2 Exposed. | Gains Palm |  |
| Quicksilver Solution | attack | Prism | rare | 2 | Prism. Deal 9 damage. Attune to the element that beats the target. Draw 1 card. | Prism. Deal 12 damage. Attune to the element that beats the target. Draw 1 card. | Costs 1 less |  |
| Distilled Vial | attack | Prism | uncommon | 2 | Prism. Deal 6 damage twice. Attune to the element that beats the target. | Prism. Deal 8 damage twice. Attune to the element that beats the target. | Costs 1 less |  |
| Distilled Rebuff | counter (attack) | Prism | uncommon | 1 | Prism. Counter (an attack): gain 4 Guard and apply 1 Exposed to the attacker. | Prism. Counter (an attack): gain 5 Guard and apply 2 Exposed to the attacker. | Gains Opener |  |
| Spagyric Mirror | reaction (reaction) | Prism | rare | 1 | Prism. When an enemy trap activates: deal 5 damage to its owner and apply 2 Exposed to its owner and attune to the element that beats its owner. | Prism. When an enemy trap activates: deal 7 damage to its owner and apply 3 Exposed to its owner and attune to the element that beats its owner. | Gains Opener |  |
| Aetheric Solution | attack | Prism | uncommon | 3 | Prism. Deal 20 damage. Attune to the element that beats the target. | Prism. Deal 27 damage. Attune to the element that beats the target. | Costs 1 less |  |
| Arcane Seal | reaction (attack) | Prism | common | 1 | Prism. When attacked: deal 5 damage to the attacker and apply 1 Exposed to the attacker. | Prism. When attacked: deal 7 damage to the attacker and apply 2 Exposed to the attacker. | Gains Opener |  |
| Quicksilver Refusal | counter (reaction) | Prism | uncommon | 1 | Prism. Counter (a trap or Reaction): gain 4 Guard and apply 2 Exposed to its owner. | Prism. Counter (a trap or Reaction): gain 5 Guard and apply 3 Exposed to its owner. | Gains Opener |  |
| Distilled Compound | attack | Prism | rare | 1 | Prism. Deal 2 damage to a random enemy 3 times. Apply 1 Exposed. Attune to the element that beats the target. | Prism. Deal 3 damage to a random enemy 3 times. Apply 2 Exposed. Attune to the element that beats the target. | Gains Palm |  |
| Sublimated Trap | reaction (skill) | Prism | uncommon | 1 | Prism. When an enemy uses a non-attack: gain 7 Guard and attune to the element that beats it. | Prism. When an enemy uses a non-attack: gain 9 Guard and attune to the element that beats it. | Gains Opener |  |
| Alchemical Tripwire | reaction (attack) | Prism | common | 0 | Prism. When attacked: gain 4 Guard. | Prism. When attacked: gain 5 Guard. | Gains Opener |  |
| Sublimated Solution | attack | Prism | uncommon | 3 | Prism. Deal 15 damage. Apply 3 Exposed. | Prism. Deal 20 damage. Apply 4 Exposed. | Costs 1 less |  |
| Alchemical Dose | attack | Prism | rare | 2 | Prism. Deal 11 damage. Gain 5 Guard. Attune to the element that beats the target. | Prism. Deal 15 damage. Gain 7 Guard. Attune to the element that beats the target. | Costs 1 less |  |
| Aetheric Parry | counter (attack) | Prism | common | 0 | Prism. Counter (an attack): gain 4 Guard. | Prism. Counter (an attack): gain 5 Guard. | Gains Opener |  |
| Shadow Tonic | skill ⧉ (dusk) | Prism | rare | 1→0 | Prism. Gain 1 Veil. Attune to the element that beats the first enemy. | Prism. Gain 1 Veil. Attune to the element that beats the first enemy. | Gains Palm |  |
| Poison Vial | attack ⧉ (dusk) | Prism | uncommon | 1 | Prism. Deal 4 damage. Apply 1 Mark. If you are attuned to the element that beats the target, apply 1 Mark. | Prism. Deal 5 damage. Apply 2 Mark. If you are attuned to the element that beats the target, apply 2 Mark. | Gains Palm |  |
| Vanishing Reagent | counter (attack) ⧉ (dusk) | Prism | rare | 1→0 | Prism. Counter (an attack): gain 1 Veil. If you played 2+ elements this turn, draw 1 card. | Prism. Counter (an attack): gain 1 Veil. If you played 2+ elements this turn, draw 1 card. | Gains Opener |  |
| Quicksilver Heart | skill 🦋 | Prism | evolved | 0 | Prism. Attune to the element that beats the first enemy. Apply 1 Exposed to ALL enemies. | Prism. Attune to the element that beats the first enemy. Apply 2 Exposed to ALL enemies. | Gains Palm |  |
| Drop of Mercury | skill 🦋 | Prism | common | 0 | Prism. Attune to the element that beats the first enemy. Apply 1 Exposed. Evolve 3 (Quicksilver Heart). | Prism. Attune to the element that beats the first enemy. Apply 2 Exposed. Evolve 3 (Quicksilver Heart). | Gains Palm |  |
| Grand Alembic | attack 🦋 | Prism | evolved | 1 | Prism. Deal 4 damage. Apply 1 Exposed to ALL enemies. If you are attuned to the element that beats the target, draw 1 card. | Prism. Deal 5 damage. Apply 2 Exposed to ALL enemies. If you are attuned to the element that beats the target, draw 1 card. | Gains Palm |  |
| Test Tube | attack 🦋 | Prism | common | 1 | Prism. Deal 4 damage. Apply 1 Exposed. Evolve 4 (Grand Alembic). | Prism. Deal 5 damage. Apply 2 Exposed. Evolve 4 (Grand Alembic). | Gains Palm |  |
| Universal Solvent | skill 🦋 | Prism | evolved | 1 | Prism. Apply 1 Exposed to ALL enemies. Attune to the element that beats the first enemy. If this is the first card you played this turn, gain 1 energy. | Prism. Apply 2 Exposed to ALL enemies. Attune to the element that beats the first enemy. If this is the first card you played this turn, gain 1 energy. | Gains Palm |  |
| Litmus | skill 🦋 | Prism | common | 1 | Prism. Apply 2 Exposed. Attune to the element that beats the first enemy. Evolve 4 (Universal Solvent). | Prism. Apply 3 Exposed. Attune to the element that beats the first enemy. Evolve 4 (Universal Solvent). | Gains Palm |  |
| Prism Barrier | reaction (attack) 🦋 | Prism | evolved | 1 | Prism. When attacked: gain 7 Guard and apply 1 Exposed to ALL enemies. | Prism. When attacked: gain 9 Guard and apply 2 Exposed to ALL enemies. | Gains Opener |  |
| Flask Ward | reaction (attack) 🦋 | Prism | common | 1 | Prism. When attacked: gain 6 Guard and attune to the element that beats the attacker. Evolve 4 (Prism Barrier). | Prism. When attacked: gain 8 Guard and attune to the element that beats the attacker. Evolve 4 (Prism Barrier). | Gains Opener |  |
| Great Work | attack 🦋 | Prism | evolved | 1 | Prism. Deal 3 damage twice. If you played 2+ elements this turn, apply 2 Exposed to ALL enemies. | Prism. Deal 4 damage twice. If you played 2+ elements this turn, apply 3 Exposed to ALL enemies. | Gains Palm |  |
| Apprentice Brew | attack 🦋 | Prism | uncommon | 1 | Prism. Deal 5 damage. If you played 2+ elements this turn, apply 3 Exposed. Evolve 5 (Great Work). | Prism. Deal 7 damage. If you played 2+ elements this turn, apply 4 Exposed. Evolve 5 (Great Work). | Gains Palm |  |
| Reagent Engine | power ★ | Prism | uncommon | 1 | Whenever a chain of 2+ links resolves, apply 1 Exposed to ALL enemies. | Whenever a chain of 2+ links resolves, apply 2 Exposed to ALL enemies. | Gains Opener |  |
| Elixir Crown | power ★ | Prism | rare | 2 | At the end of your turn, if you played 2+ elements this turn, deal 21 damage to ALL enemies. | At the end of your turn, if you played 2+ elements this turn, deal 22 damage to ALL enemies. | Costs 1 less |  |
| Alembic Soul | power ★ | Prism | uncommon | 1 | Whenever you play a Counter, apply 1 Exposed to a random enemy. | Whenever you play a Counter, apply 2 Exposed to a random enemy. | Gains Opener |  |
| Fifth Essence | power ★ | Prism | uncommon | 2 | At the start of your turn, apply 2 Exposed to ALL enemies. | At the start of your turn, apply 3 Exposed to ALL enemies. | Costs 1 less |  |
| Saline Volley | attack | Prism | common | 2 | Prism. Deal 5 damage twice. If the target has Exposed, gain 1 energy. | Prism. Deal 7 damage twice. If the target has Exposed, gain 1 energy. | Costs 1 less |  |
| Fixative Lure | reaction (skill) | Prism | uncommon | 0 | Prism. When an enemy uses a non-attack: apply 1 Exposed to ALL enemies. If you played 2+ elements this turn, draw 1 card. | Prism. When an enemy uses a non-attack: apply 2 Exposed to ALL enemies. If you played 2+ elements this turn, draw 1 card. | Gains Opener |  |
| Fixative Jab | attack | Prism | common | 1 | Prism. Deal 2 damage to a random enemy 3 times. Attune to the element that beats the first enemy. | Prism. Deal 3 damage to a random enemy 3 times. Attune to the element that beats the first enemy. | Gains Palm |  |
| Azoth Veil | skill | Prism | rare | 1 | Prism. Gain 3 Guard. Attune to the element that beats the target. If the target has Exposed, draw 1 card. | Prism. Gain 4 Guard. Attune to the element that beats the target. If the target has Exposed, draw 1 card. | Gains Palm |  |
| Fixative Veto | counter (skill) | Prism | uncommon | 1 | Prism. Counter (a non-attack): gain 4 Guard and apply 1 Exposed to it. If you played 2+ elements this turn, draw 1 card. | Prism. Counter (a non-attack): gain 5 Guard and apply 2 Exposed to it. If you played 2+ elements this turn, draw 1 card. | Gains Opener |  |
| Azoth Tripwire | reaction (reaction) | Prism | uncommon | 1→0 | Prism. When an enemy trap activates: attune to the element that beats its owner. If its owner has Exposed, draw 1 card. | Prism. When an enemy trap activates: attune to the element that beats its owner. If its owner has Exposed, draw 1 card. | Gains Opener |  |
| Tinctured Rebuke | counter (attack) | Prism | rare | 0 | Prism. Counter (an attack): attune to the element that beats the first enemy. If the attacker has Exposed, apply 2 Exposed to ALL enemies. | Prism. Counter (an attack): attune to the element that beats the first enemy. If the attacker has Exposed, apply 3 Exposed to ALL enemies. | Gains Opener |  |
| Fixative Seal | reaction (reaction) | Prism | common | 1 | Prism. When an enemy trap activates: deal 6 damage to its owner. If you are attuned to the element that beats the target, apply 2 Exposed to its owner. | Prism. When an enemy trap activates: deal 8 damage to its owner. If you are attuned to the element that beats the target, apply 3 Exposed to its owner. | Gains Opener |  |
| Crucible Rend | attack | Prism | uncommon | 1 | Prism. Deal 2 damage to a random enemy 3 times. If you played 2+ elements this turn, apply 2 Exposed to ALL enemies. | Prism. Deal 3 damage to a random enemy 3 times. If you played 2+ elements this turn, apply 3 Exposed to ALL enemies. | Gains Palm |  |
| Calcined Mantra | skill | Prism | uncommon | 0 | Prism. Attune to the element that beats the target. If the target has Exposed, apply 2 Exposed. | Prism. Attune to the element that beats the target. If the target has Exposed, apply 3 Exposed. | Gains Palm |  |
| Sulfuric Rebuff | counter (attack) | Prism | uncommon | 1 | Prism. Counter (an attack): gain 5 Guard. If you are attuned to the element that beats the target, apply 2 Exposed to ALL enemies. | Prism. Counter (an attack): gain 7 Guard. If you are attuned to the element that beats the target, apply 3 Exposed to ALL enemies. | Gains Opener |  |
| Crucible Gesture | skill | Prism | rare | 1 | Prism. Gain 1 energy. If you are attuned to the element that beats the target, apply 2 Exposed. | Prism. Gain 1 energy. If you are attuned to the element that beats the target, apply 3 Exposed. | Gains Palm |  |
| Calcined Burst | attack | Prism | uncommon | 3 | Prism. Deal 19 damage. If you are attuned to the element that beats the target, gain 1 energy. | Prism. Deal 25 damage. If you are attuned to the element that beats the target, gain 1 energy. | Costs 1 less |  |
| Hermetic Veto | counter (reaction) | Prism | rare | 1 | Prism. Counter (a trap or Reaction): gain 5 Guard and attune to the element that beats its owner. If its owner has Exposed, draw 1 card. | Prism. Counter (a trap or Reaction): gain 7 Guard and attune to the element that beats its owner. If its owner has Exposed, draw 1 card. | Gains Opener |  |
| Lunar Smite | attack | Prism | uncommon | 1 | Prism. Deal 5 damage. If this is the first card you played this turn, draw 1 card. | Prism. Deal 7 damage. If this is the first card you played this turn, draw 1 card. | Gains Palm |  |
| Vitriol Deadfall | reaction (attack) | Prism | rare | 1 | Prism. When attacked: gain 3 Guard and draw 1 card. If you are attuned to the element that beats the target, apply 1 Exposed to ALL enemies. | Prism. When attacked: gain 4 Guard and draw 1 card. If you are attuned to the element that beats the target, apply 2 Exposed to ALL enemies. | Gains Opener |  |
| Infused Stance | skill | Prism | uncommon | 2→1 | Prism. Gain 1 energy. If this is the first card you played this turn, draw 1 card. | Prism. Gain 1 energy. If this is the first card you played this turn, draw 1 card. | Gains Palm |  |
| Alkahest Hook | attack | Prism | common | 2 | Prism. Deal 7 damage. Gain 1 energy. | Prism. Deal 9 damage. Gain 1 energy. | Costs 1 less |  |
| Infused Rebuke | counter (reaction) | Prism | common | 1 | Prism. Counter (a trap or Reaction): gain 5 Guard. If you played 2+ elements this turn, draw 1 card. | Prism. Counter (a trap or Reaction): gain 7 Guard. If you played 2+ elements this turn, draw 1 card. | Gains Opener |  |
| Calcined Thrust | attack | Prism | common | 2 | Prism. Deal 5 damage twice. If you are attuned to the element that beats the target, draw 1 card. | Prism. Deal 7 damage twice. If you are attuned to the element that beats the target, draw 1 card. | Costs 1 less |  |
| Saline Spring | reaction (attack) | Prism | uncommon | 1 | Prism. When attacked: deal 6 damage to the attacker and attune to the element that beats the first enemy. If you played 2+ elements this turn, draw 1 card. | Prism. When attacked: deal 8 damage to the attacker and attune to the element that beats the first enemy. If you played 2+ elements this turn, draw 1 card. | Gains Opener |  |
| Fixative Mantra | skill | Prism | uncommon | 0 | Prism. Apply 1 Exposed. If this is the first card you played this turn, draw 1 card. | Prism. Apply 2 Exposed. If this is the first card you played this turn, draw 1 card. | Gains Palm |  |
| Vitriol Sunder | attack | Prism | common | 2 | Prism. Deal 9 damage. If you are attuned to the element that beats the target, apply 3 Exposed. | Prism. Deal 12 damage. If you are attuned to the element that beats the target, apply 4 Exposed. | Costs 1 less |  |
| Tinctured Tactic | skill | Prism | common | 2 | Prism. Gain 7 Guard. If you are attuned to the element that beats the target, apply 2 Exposed to ALL enemies. | Prism. Gain 9 Guard. If you are attuned to the element that beats the target, apply 3 Exposed to ALL enemies. | Costs 1 less |  |
| Calcined Gash | attack | Prism | rare | 1 | Prism. Deal 5 damage. Attune to the element that beats the first enemy. Chain 2: Apply 2 Exposed. | Prism. Deal 7 damage. Attune to the element that beats the first enemy. Chain 2: Apply 3 Exposed. | Gains Palm |  |
| Calcined Rejoinder | counter (skill) | Prism | uncommon | 1 | Prism. Counter (a non-attack): gain 4 Guard and attune to the element that beats it. If it has Exposed, apply 1 Exposed to ALL enemies. | Prism. Counter (a non-attack): gain 5 Guard and attune to the element that beats it. If it has Exposed, apply 2 Exposed to ALL enemies. | Gains Opener |  |
| Nigredo Lure | reaction (skill) | Prism | common | 1 | Prism. When an enemy uses a non-attack: gain 5 Guard. If you are attuned to the element that beats the target, apply 1 Exposed to ALL enemies. | Prism. When an enemy uses a non-attack: gain 7 Guard. If you are attuned to the element that beats the target, apply 2 Exposed to ALL enemies. | Gains Opener |  |
| Hermetic Omen | skill | Prism | uncommon | 2 | Prism. Gain 6 Guard. Apply 1 Exposed. Chain 2: Draw 1 card. | Prism. Gain 8 Guard. Apply 2 Exposed. Chain 2: Draw 1 card. | Costs 1 less |  |
| Saline Glyph | reaction (attack) | Prism | common | 1 | Prism. When attacked: gain 4 Guard. If the attacker has Exposed, draw 1 card. | Prism. When attacked: gain 5 Guard. If the attacker has Exposed, draw 1 card. | Gains Opener |  |
| Rubedo Drill | skill | Prism | common | 1 | Prism. Gain 4 Guard. If you are attuned to the element that beats the target, apply 2 Exposed. | Prism. Gain 5 Guard. If you are attuned to the element that beats the target, apply 3 Exposed. | Gains Palm |  |
| Sulfuric Jab | attack | Prism | common | 3 | Prism. Deal 17 damage. If you are attuned to the element that beats the target, draw 1 card. | Prism. Deal 23 damage. If you are attuned to the element that beats the target, draw 1 card. | Costs 1 less |  |
| Saline Tactic | skill | Prism | uncommon | 1 | Prism. Apply 2 Exposed. If you played 2+ elements this turn, draw 1 card. | Prism. Apply 3 Exposed. If you played 2+ elements this turn, draw 1 card. | Gains Palm |  |
| Vitriol Mirror | reaction (attack) | Prism | common | 1 | Prism. When attacked: deal 6 damage to the attacker. If you played 2+ elements this turn, apply 2 Exposed to ALL enemies. | Prism. When attacked: deal 8 damage to the attacker. If you played 2+ elements this turn, apply 3 Exposed to ALL enemies. | Gains Opener |  |
| Effervescent Rebuttal | counter (any) | Prism | common | 2→1 | Prism. Counter (anything an enemy does): attune to the element that beats the first enemy. | Prism. Counter (anything an enemy does): attune to the element that beats the first enemy. | Gains Opener |  |
| Saline Crash | attack | Prism | common | 2 | Prism. Deal 7 damage to ALL enemies. If you played 2+ elements this turn, gain 1 energy. | Prism. Deal 9 damage to ALL enemies. If you played 2+ elements this turn, gain 1 energy. | Costs 1 less |  |
| Crucible Blow | attack | Prism | rare | 1 | Prism. Deal 2 damage to a random enemy 3 times. Attune to the element that beats the first enemy. If you played 2+ elements this turn, draw 1 card. | Prism. Deal 3 damage to a random enemy 3 times. Attune to the element that beats the first enemy. If you played 2+ elements this turn, draw 1 card. | Gains Palm |  |
| Lunar Veil | skill | Prism | common | 1 | Prism. Gain 4 Guard. If you played 2+ elements this turn, apply 2 Exposed to ALL enemies. | Prism. Gain 5 Guard. If you played 2+ elements this turn, apply 3 Exposed to ALL enemies. | Gains Palm |  |
| Calcined Tripline | reaction (attack) | Prism | common | 1 | Prism. When attacked: gain 5 Guard. If the attacker has Exposed, apply 1 Exposed to ALL enemies. | Prism. When attacked: gain 7 Guard. If the attacker has Exposed, apply 2 Exposed to ALL enemies. | Gains Opener |  |
| Nigredo Pierce | attack | Prism | uncommon | 0 | Prism. Deal 3 damage. If you are attuned to the element that beats the target, apply 1 Exposed to ALL enemies. | Prism. Deal 4 damage. If you are attuned to the element that beats the target, apply 2 Exposed to ALL enemies. | Gains Palm |  |
| Azoth Feint | attack | Prism | common | 1 | Prism. Deal 2 damage to a random enemy 3 times. If you played 2+ elements this turn, draw 1 card. | Prism. Deal 3 damage to a random enemy 3 times. If you played 2+ elements this turn, draw 1 card. | Gains Palm |  |
| Lunar Ambush | reaction (attack) | Prism | uncommon | 1 | Prism. When attacked: deal 5 damage to the attacker and apply 1 Exposed to the attacker. If you played 2+ elements this turn, draw 1 card. | Prism. When attacked: deal 7 damage to the attacker and apply 2 Exposed to the attacker. If you played 2+ elements this turn, draw 1 card. | Gains Opener |  |
| Tinctured Drill | skill | Prism | common | 1 | Prism. Gain 3 Guard. If the target has Exposed, gain 1 energy. | Prism. Gain 4 Guard. If the target has Exposed, gain 1 energy. | Gains Palm |  |
| Tinctured Sweep | attack | Prism | uncommon | 2 | Prism. Deal 4 damage to ALL enemies. Draw 1 card. If you played 2+ elements this turn, gain 1 energy. | Prism. Deal 5 damage to ALL enemies. Draw 1 card. If you played 2+ elements this turn, gain 1 energy. | Costs 1 less |  |
| Saline Gambit | skill | Prism | uncommon | 2 | Prism. Gain 4 Guard. Draw 1 card. If this is the first card you played this turn, apply 2 Exposed to ALL enemies. | Prism. Gain 5 Guard. Draw 1 card. If this is the first card you played this turn, apply 3 Exposed to ALL enemies. | Costs 1 less |  |
| Vitriol Snag | reaction (attack) | Prism | rare | 0 | Prism. When attacked: apply 1 Exposed to ALL enemies. If you are attuned to the element that beats the target, draw 1 card. | Prism. When attacked: apply 2 Exposed to ALL enemies. If you are attuned to the element that beats the target, draw 1 card. | Gains Opener |  |
| Alkahest Omen | skill | Prism | uncommon | 0 | Prism. Apply 1 Exposed to ALL enemies. If you played 2+ elements this turn, draw 1 card. | Prism. Apply 2 Exposed to ALL enemies. If you played 2+ elements this turn, draw 1 card. | Gains Palm |  |
| Effervescent Hammer | attack | Prism | rare | 1 | Prism. Deal 5 damage. Attune to the element that beats the first enemy. If you played 2+ elements this turn, gain 1 energy. | Prism. Deal 7 damage. Attune to the element that beats the first enemy. If you played 2+ elements this turn, gain 1 energy. | Gains Palm |  |
| Infused Tripwire | reaction (attack) | Prism | common | 1 | Prism. When attacked: deal 7 damage to the attacker. If you played 2+ elements this turn, draw 1 card. | Prism. When attacked: deal 9 damage to the attacker. If you played 2+ elements this turn, draw 1 card. | Gains Opener |  |
| Saline Rend | attack | Prism | rare | 1 | Prism. Deal 4 damage. Apply 1 Exposed to ALL enemies. If this is the first card you played this turn, gain 1 energy. | Prism. Deal 5 damage. Apply 2 Exposed to ALL enemies. If this is the first card you played this turn, gain 1 energy. | Gains Palm |  |
| Fixative Reversal | counter (attack) | Prism | uncommon | 1 | Prism. Counter (an attack): gain 6 Guard. If you played 2+ elements this turn, draw 1 card. | Prism. Counter (an attack): gain 8 Guard. If you played 2+ elements this turn, draw 1 card. | Gains Opener |  |
| Rubedo Tactic | skill | Prism | rare | 1 | Prism. Gain 4 Guard. Attune to the element that beats the first enemy. If the target has Exposed, apply 2 Exposed. | Prism. Gain 5 Guard. Attune to the element that beats the first enemy. If the target has Exposed, apply 3 Exposed. | Gains Palm |  |
| Saline Ward | skill | Prism | uncommon | 2 | Prism. Gain 4 Guard. Gain 1 energy. If you are attuned to the element that beats the target, draw 1 card. | Prism. Gain 5 Guard. Gain 1 energy. If you are attuned to the element that beats the target, draw 1 card. | Costs 1 less |  |
| Sulfuric Catch | reaction (reaction) | Prism | rare | 1 | Prism. When an enemy trap activates: deal 5 damage to its owner and apply 1 Exposed to ALL enemies. If you are attuned to the element that beats the target, draw 1 card. | Prism. When an enemy trap activates: deal 7 damage to its owner and apply 2 Exposed to ALL enemies. If you are attuned to the element that beats the target, draw 1 card. | Gains Opener |  |
| Fixative Pierce | attack | Prism | uncommon | 0 | Prism. Deal 3 damage. Chain 2: Apply 1 Exposed. | Prism. Deal 4 damage. Chain 2: Apply 2 Exposed. | Gains Palm |  |
| Saline Refusal | counter (skill) | Prism | uncommon | 1 | Prism. Counter (a non-attack): gain 4 Guard and attune to the element that beats the first enemy. If you played 2+ elements this turn, apply 3 Exposed to it. | Prism. Counter (a non-attack): gain 5 Guard and attune to the element that beats the first enemy. If you played 2+ elements this turn, apply 4 Exposed to it. | Gains Opener |  |

## Beast cards (146)

| Card | Type | Element | Rarity | Cost | Text | Upgraded (A) | Path B | Unlock |
|---|---|---|---|---|---|---|---|---|
| Call the Wolf | skill ★ | Wild | starter | 1 | Summon Wolf 2 (it deals 2 damage to a random enemy at the end of each of your turns). Stacks. | Summon Wolf 3 (it deals 3 damage to a random enemy at the end of each of your turns). Stacks. | Gains Palm |  |
| Call the Bear | skill ★ | Wild | starter | 1 | Gain 4 Guard. Summon Bear 2 (you gain 2 Guard at the start of each turn). Stacks. | Gain 6 Guard. Summon Bear 3 (you gain 3 Guard at the start of each turn). Stacks. | Gains Palm |  |
| Pack Tactics | attack ★ | Wild | starter | 1 | Deal 5 damage, +2 per kind of companion you have. | Deal 7 damage, +3 per kind of companion you have. | Gains Palm |  |
| Feral Ward | reaction (attack) ★ | Wild | starter | 1 | When attacked: gain 6 Guard. Summon Wolf 1. | When attacked: gain 9 Guard. Summon Wolf 1. | Gains Opener |  |
| Howl | skill ★ | Wild | common | 0 | Summon Wolf 1. Draw 1 card. | Summon Wolf 2. Draw 1 card. | Gains Palm |  |
| Maul | attack ★ | Wild | common | 2 | Deal 12 damage. If you have a Bear, gain 6 Guard. | Deal 15 damage. If you have a Bear, gain 8 Guard. | Costs 1 less |  |
| Call the Hawk | skill ★ | Wild | common | 1 | Gain 3 Guard. Summon Hawk 1 (it deals 1 damage to ALL enemies at the end of each of your turns). | Gain 4 Guard. Summon Hawk 2 (it deals 2 damage to ALL enemies at the end of each of your turns). | Gains Palm |  |
| Claw Swipe | attack ★ | Wild | common | 1 | Deal 4 damage twice. Your Wolf gains 1. | Deal 5 damage twice. Your Wolf gains 1. | Gains Palm |  |
| Venom Fang | attack ★ | Wild | common | 1 | Deal 5 damage. Apply 3 Burn (venom). | Deal 7 damage. Apply 4 Burn (venom). | Gains Palm |  |
| Burrow | skill ★ | Wild | common | 1 | Gain 8 Guard. If you have a Serpent, apply 2 Burn to ALL enemies. | Gain 11 Guard. If you have a Serpent, apply 3 Burn to ALL enemies. | Gains Palm |  |
| Pounce | counter (reaction) ★ | Wild | common | 0 | Counter (a trap or Reaction): your pack pounces: deal 4 damage plus your Wolf to its owner. | Counter (a trap or Reaction): your pack pounces: deal 7 damage plus your Wolf to its owner. | Gains Opener |  |
| Bear Guard | counter (attack) ★ | Wild | common | 1 | Counter (an attack): gain 5 Guard, +3 per Bear. | Counter (an attack): gain 8 Guard, +4 per Bear. | Gains Opener |  |
| Call the Serpent | skill ★ | Wild | uncommon | 1 | Summon Serpent 2 (it applies 2 Burn to a random enemy at the end of each of your turns). | Summon Serpent 3 (it applies 3 Burn to a random enemy at the end of each of your turns). | Gains Palm |  |
| Rally the Pack | skill ★ | Wild | uncommon | 1→0 | Your companions act now. | Your companions act now. | Gains Palm |  |
| Alpha Call | skill ★ | Wild | uncommon | 2 | Summon Wolf 3 and Bear 3. | Summon Wolf 4 and Bear 4. | Costs 1 less |  |
| Feed the Pack | skill ★ | Wild | uncommon | 1 | Double your Wolf. Fold. | Double your Wolf. | Gains Palm |  |
| Stag Spirit | skill ★ | Wild | uncommon | 1 | Heal 5 HP. Summon Bear 2. Fold. | Heal 7 HP. Summon Bear 3. Fold. | No longer Folds |  |
| Beast Bond | skill ★ | Wild | uncommon | 1 | Gain 4 Guard per kind of companion you have (at least once). | Gain 6 Guard per kind of companion you have (at least once). | Gains Palm |  |
| Pack Leader | power ★ | Wild | rare | 1 | Your companions act with +2. | Your companions act with +3. | Gains Opener |  |
| Stampede | attack ★ | Wild | rare | 2 | Deal 6 damage to ALL enemies, +3 per kind of companion you have. | Deal 8 damage to ALL enemies, +4 per kind of companion you have. | Costs 1 less |  |
| Thunderbird | skill ★ | Storm | rare | 2 | Storm. Summon Hawk 3. Apply 2 Shock to ALL enemies. | Storm. Summon Hawk 4. Apply 3 Shock to ALL enemies. | Costs 1 less |  |
| The Wild Hunt | power ★ | Wild | legendary | 3→2 | At the start of your turn, Summon Wolf 1, Bear 1 and Hawk 1. | At the start of your turn, Summon Wolf 1, Bear 1 and Hawk 1. | Gains Opener |  |
| Savage Covenant | power | Wild | uncommon | 1 | At the end of your turn, heal 1 HP for each companion you have. | At the end of your turn, heal 2 HP for each companion you have. | Gains Opener |  |
| Wild Creed | power | Wild | rare | 1 | Summon Wolf 3. | Summon Wolf 4. | Gains Opener |  |
| Savage Canticle | skill | Wild | rare | 2 | Draw 2 cards. Summon Wolf 1. Apply 1 Burn. | Draw 2 cards. Summon Wolf 2. Apply 2 Burn. | Costs 1 less |  |
| Snarling Pounce | attack | Wild | common | 3 | Deal 13 damage. Summon Serpent 1. | Deal 17 damage. Summon Serpent 2. | Costs 1 less |  |
| Snarling Rune | reaction (attack) | Wild | uncommon | 1 | When attacked: gain 5 Guard and Summon Hawk 1. | When attacked: gain 7 Guard and Summon Hawk 2. | Gains Opener |  |
| Wild Mantle | skill | Wild | common | 2 | Draw 2 cards. Summon Bear 1. | Draw 2 cards. Summon Bear 2. | Costs 1 less |  |
| Clawed Refusal | counter (attack) | Wild | common | 0 | Counter (an attack): Summon Hawk 1. | Counter (an attack): Summon Hawk 2. | Gains Opener |  |
| Untamed Trap | reaction (skill) | Wild | rare | 1 | When an enemy uses a non-attack: gain 5 Guard and Summon Hawk 1 and apply 1 Burn to it. | When an enemy uses a non-attack: gain 7 Guard and Summon Hawk 2 and apply 2 Burn to it. | Gains Opener |  |
| Fanged Focus | skill | Wild | common | 2 | Draw 2 cards. Summon Hawk 1. | Draw 2 cards. Summon Hawk 2. | Costs 1 less |  |
| Stalking Coil | reaction (attack) | Wild | common | 0 | When attacked: Summon Wolf 1. | When attacked: Summon Wolf 2. | Gains Opener |  |
| Clawed Shroud | skill | Wild | common | 1 | Draw 1 card. Summon Serpent 1. | Draw 1 card. Summon Serpent 2. | Gains Palm |  |
| Fanged Charge | attack | Wild | uncommon | 2 | Deal 5 damage twice. Summon Serpent 1. | Deal 7 damage twice. Summon Serpent 2. | Costs 1 less |  |
| Antlered Seal | reaction (reaction) | Wild | common | 1 | When an enemy trap activates: deal 5 damage to its owner and gain 1 Barbs. | When an enemy trap activates: deal 7 damage to its owner and gain 2 Barbs. | Gains Opener |  |
| Wild Talon | attack | Wild | rare | 1 | Deal 5 damage. Summon Wolf 1. Apply 1 Burn. | Deal 7 damage. Summon Wolf 2. Apply 2 Burn. | Gains Palm |  |
| Savage Tusk | attack | Wild | common | 2 | Deal 4 damage twice. Apply 2 Burn. | Deal 5 damage twice. Apply 3 Burn. | Costs 1 less |  |
| Fanged Rune | reaction (attack) | Wild | uncommon | 1 | When attacked: deal 6 damage to the attacker and gain 1 Barbs. | When attacked: deal 8 damage to the attacker and gain 2 Barbs. | Gains Opener |  |
| Antlered Focus | skill | Wild | common | 0 | Summon Hawk 1. | Summon Hawk 2. | Gains Palm |  |
| Clawed Snare | reaction (reaction) | Wild | rare | 1 | When an enemy trap activates: deal 6 damage to its owner and Summon Serpent 1 and apply 1 Burn to its owner. | When an enemy trap activates: deal 8 damage to its owner and Summon Serpent 2 and apply 2 Burn to its owner. | Gains Opener |  |
| Snarling Shroud | skill | Wild | common | 1 | Draw 1 card. Summon Hawk 1. | Draw 1 card. Summon Hawk 2. | Gains Palm |  |
| Savage Pit | reaction (attack) | Wild | common | 1 | When attacked: deal 5 damage to the attacker and Summon Serpent 1. | When attacked: deal 7 damage to the attacker and Summon Serpent 2. | Gains Opener |  |
| Untamed Rite | skill | Wild | uncommon | 2 | Draw 2 cards. Summon Serpent 1. | Draw 2 cards. Summon Serpent 2. | Costs 1 less |  |
| Savage Reply | counter (attack) | Wild | common | 1 | Counter (an attack): gain 4 Guard and Summon Wolf 1. | Counter (an attack): gain 5 Guard and Summon Wolf 2. | Gains Opener |  |
| Packbound Claw | attack | Wild | rare | 1 | Deal 2 damage to a random enemy 3 times. Summon Serpent 1. Apply 1 Burn. | Deal 3 damage to a random enemy 3 times. Summon Serpent 2. Apply 2 Burn. | Gains Palm |  |
| Wild Mirror | reaction (attack) | Wild | common | 1 | When attacked: gain 4 Guard and Summon Wolf 1. | When attacked: gain 5 Guard and Summon Wolf 2. | Gains Opener |  |
| Thunderhoof Charm | skill | Wild | uncommon | 2 | Gain 7 Guard. Summon Bear 2. | Gain 9 Guard. Summon Bear 3. | Costs 1 less |  |
| Primal Snap | attack | Wild | common | 1 | Deal 2 damage to a random enemy 3 times. Summon Wolf 1. | Deal 3 damage to a random enemy 3 times. Summon Wolf 2. | Gains Palm |  |
| Roaring Glyph | reaction (skill) | Wild | uncommon | 1 | When an enemy uses a non-attack: gain 4 Guard and Summon Wolf 1. | When an enemy uses a non-attack: gain 5 Guard and Summon Wolf 2. | Gains Opener |  |
| Moonlit Gambit | skill | Wild | rare | 1 | Draw 1 card. Summon Wolf 1. Apply 1 Burn. | Draw 1 card. Summon Wolf 2. Apply 2 Burn. | Gains Palm |  |
| Untamed Rebuke | counter (reaction) | Wild | common | 1 | Counter (a trap or Reaction): gain 4 Guard and Summon Wolf 1. | Counter (a trap or Reaction): gain 5 Guard and Summon Wolf 2. | Gains Opener |  |
| Primal Coil | reaction (attack) | Wild | common | 0 | When attacked: apply 3 Burn to the attacker. | When attacked: apply 4 Burn to the attacker. | Gains Opener |  |
| Moonlit Maul | attack | Wild | common | 1 | Deal 2 damage to a random enemy 3 times. Summon Hawk 1. | Deal 3 damage to a random enemy 3 times. Summon Hawk 2. | Gains Palm |  |
| Antlered Trick | skill | Wild | uncommon | 2 | Draw 2 cards. Apply 1 Burn. | Draw 2 cards. Apply 2 Burn. | Costs 1 less |  |
| Primal Glyph | reaction (reaction) | Wild | common | 1 | When an enemy trap activates: deal 5 damage to its owner and Summon Bear 1. | When an enemy trap activates: deal 7 damage to its owner and Summon Bear 2. | Gains Opener |  |
| Snarling Parry | counter (attack) | Wild | rare | 1 | Counter (an attack): gain 5 Guard and apply 2 Burn to the attacker and Summon Wolf 1. | Counter (an attack): gain 7 Guard and apply 3 Burn to the attacker and Summon Wolf 2. | Gains Opener |  |
| Feral Lunge | attack | Wild | common | 3 | Deal 13 damage. Gain 6 Guard. | Deal 17 damage. Gain 8 Guard. | Costs 1 less |  |
| Roaring Tripwire | reaction (attack) | Wild | uncommon | 1 | When attacked: deal 6 damage to the attacker and Summon Bear 1. | When attacked: deal 8 damage to the attacker and Summon Bear 2. | Gains Opener |  |
| Stalking Rush | attack | Wild | common | 2 | Deal 5 damage to ALL enemies. Summon Serpent 1. | Deal 7 damage to ALL enemies. Summon Serpent 2. | Costs 1 less |  |
| Untamed Charm | skill | Wild | common | 0 | Summon Serpent 1. | Summon Serpent 2. | Gains Palm |  |
| Antlered Trample | attack | Wild | rare | 3 | Deal 14 damage. Apply 4 Burn. Summon Wolf 1. | Deal 19 damage. Apply 5 Burn. Summon Wolf 2. | Costs 1 less |  |
| Packbound Ambush | reaction (reaction) | Wild | common | 1 | When an enemy trap activates: deal 5 damage to its owner and Summon Hawk 1. | When an enemy trap activates: deal 7 damage to its owner and Summon Hawk 2. | Gains Opener |  |
| Antlered Retort | counter (reaction) | Wild | common | 1 | Counter (a trap or Reaction): gain 4 Guard and apply 2 Burn to its owner. | Counter (a trap or Reaction): gain 5 Guard and apply 3 Burn to its owner. | Gains Opener |  |
| Wild Rake | attack | Wild | uncommon | 1 | Deal 5 damage. Apply 2 Burn. | Deal 7 damage. Apply 3 Burn. | Gains Palm |  |
| Prowling Snare | reaction (attack) | Wild | common | 1 | When attacked: deal 5 damage to the attacker and Summon Hawk 1. | When attacked: deal 7 damage to the attacker and Summon Hawk 2. | Gains Opener |  |
| Savage Trample | attack | Wild | rare | 1 | Deal 2 damage to a random enemy 3 times. Summon Bear 1. Apply 1 Burn. | Deal 3 damage to a random enemy 3 times. Summon Bear 2. Apply 2 Burn. | Gains Palm |  |
| Wild Ward | skill | Wild | common | 1 | Summon Wolf 2. | Summon Wolf 3. | Gains Palm |  |
| Clawed Bite | attack | Wild | uncommon | 2 | Deal 5 damage twice. Summon Bear 1. | Deal 7 damage twice. Summon Bear 2. | Costs 1 less |  |
| Stone Boar | skill ⧉ (stone) | Wild | uncommon | 1 | Summon Bear 1. Gain 2 Fortify. | Summon Bear 2. Gain 3 Fortify. | Gains Palm |  |
| Rockslide Stampede | attack ⧉ (stone) | Wild | uncommon | 2 | Deal 6 damage to ALL enemies. If you have a companion, apply 4 Tremor to ALL enemies. | Deal 8 damage to ALL enemies. If you have a companion, apply 5 Tremor to ALL enemies. | Costs 1 less |  |
| Rock Shell | reaction (attack) ⧉ (stone) | Wild | rare | 1 | When attacked: gain 3 Guard for each companion you have and gain 3 Fortify. | When attacked: gain 4 Guard for each companion you have and gain 4 Fortify. | Gains Opener |  |
| Chimera | skill ⧉ (aether) | Wild | uncommon | 2 | Summon Wolf 2. Summon Hawk 1. | Summon Wolf 3. Summon Hawk 2. | Costs 1 less |  |
| Mutagen | skill ⧉ (aether) | Wild | uncommon | 1 | Summon Serpent 1. Attune to the element that beats the first enemy. | Summon Serpent 2. Attune to the element that beats the first enemy. | Gains Palm |  |
| Feral Elixir | attack ⧉ (aether) | Wild | rare | 1 | Deal 6 damage. If you are attuned to the element that beats the target, Summon Hawk 1. | Deal 8 damage. If you are attuned to the element that beats the target, Summon Hawk 2. | Gains Palm |  |
| Shadow Panther | skill ⧉ (dusk) | Wild | uncommon | 2 | Summon Serpent 2. Gain 1 Veil. | Summon Serpent 3. Gain 1 Veil. | Costs 1 less |  |
| Night Owl | skill ⧉ (dusk) | Wild | rare | 1 | Summon Hawk 1. Apply 1 Mark to ALL enemies. | Summon Hawk 2. Apply 2 Mark to ALL enemies. | Gains Palm |  |
| Alpha Wolf | skill 🦋 | Wild | evolved | 1 | Summon Wolf 1. Your companions act. | Summon Wolf 2. Your companions act. | Gains Palm |  |
| Pup | skill 🦋 | Wild | common | 1 | Summon Wolf 2. Evolve 4 (Alpha Wolf). | Summon Wolf 3. Evolve 4 (Alpha Wolf). | Gains Palm |  |
| Grizzly Elder | skill 🦋 | Wild | evolved | 1 | Summon Bear 2. Gain 2 Guard for each companion you have. | Summon Bear 3. Gain 3 Guard for each companion you have. | Gains Palm |  |
| Cub | skill 🦋 | Wild | common | 1 | Summon Bear 2. Evolve 4 (Grizzly Elder). | Summon Bear 3. Evolve 4 (Grizzly Elder). | Gains Palm |  |
| Roc | skill 🦋 | Wild | evolved | 1 | Summon Hawk 1. If this is the first card you played this turn, draw 1 card. | Summon Hawk 2. If this is the first card you played this turn, draw 1 card. | Gains Palm |  |
| Fledgling | skill 🦋 | Wild | common | 1 | Summon Hawk 1. Evolve 4 (Roc). | Summon Hawk 2. Evolve 4 (Roc). | Gains Palm |  |
| Basilisk | skill 🦋 | Wild | evolved | 1 | Summon Serpent 1. Apply 1 Exposed. | Summon Serpent 2. Apply 2 Exposed. | Gains Palm |  |
| Hatchling | skill 🦋 | Wild | common | 1 | Summon Serpent 1. Evolve 4 (Basilisk). | Summon Serpent 2. Evolve 4 (Basilisk). | Gains Palm |  |
| Beastmaster | attack 🦋 | Wild | evolved | 1 | Deal 3 damage twice. If you have a companion, your companions act. | Deal 4 damage twice. If you have a companion, your companions act. | Gains Palm |  |
| Tracker | attack 🦋 | Wild | uncommon | 1 | Deal 5 damage. If you have a companion, gain 4 Guard. Evolve 5 (Beastmaster). | Deal 7 damage. If you have a companion, gain 5 Guard. Evolve 5 (Beastmaster). | Gains Palm |  |
| Pack Heart | power ★ | Wild | uncommon | 1 | At the start of your turn, if you have a companion, gain 7 Guard. | At the start of your turn, if you have a companion, gain 8 Guard. | Gains Opener |  |
| Alpha Crown | power ★ | Wild | rare | 2 | Whenever a chain of 2+ links resolves, Summon Wolf 2. | Whenever a chain of 2+ links resolves, Summon Wolf 3. | Costs 1 less |  |
| Den Engine | power ★ | Wild | uncommon | 1 | At the end of your turn, gain 2 Guard for each companion you have. | At the end of your turn, gain 3 Guard for each companion you have. | Gains Opener |  |
| Wild Soul | power ★ | Wild | rare | 1 | Whenever one of your Reactions fires, Summon Hawk 1. | Whenever one of your Reactions fires, Summon Hawk 2. | Gains Opener |  |
| Ursine Gambit | skill | Wild | uncommon | 1 | Your companions act. If there are 2+ enemies, Summon Wolf 1. | Your companions act. If there are 2+ enemies, Summon Wolf 2. | Gains Palm |  |
| Scaled Charm | skill | Wild | uncommon | 1 | Gain 2 Guard for each companion you have. If this is the first card you played this turn, Summon Bear 2. | Gain 3 Guard for each companion you have. If this is the first card you played this turn, Summon Bear 3. | Gains Palm |  |
| Ursine Pierce | attack | Wild | uncommon | 0 | Deal 3 damage. If this is the first card you played this turn, gain 2 Guard for each companion you have. | Deal 4 damage. If this is the first card you played this turn, gain 3 Guard for each companion you have. | Gains Palm |  |
| Ursine Mirror | reaction (reaction) | Wild | common | 1 | When an enemy trap activates: deal 6 damage to its owner. If you have a companion, Summon Wolf 1. | When an enemy trap activates: deal 8 damage to its owner. If you have a companion, Summon Wolf 2. | Gains Opener |  |
| Ravening Vow | skill | Wild | uncommon | 2 | Gain 8 Guard. If this is the first card you played this turn, Summon Serpent 3. | Gain 11 Guard. If this is the first card you played this turn, Summon Serpent 4. | Costs 1 less |  |
| Ferocious Deflection | counter (attack) | Wild | uncommon | 0 | Counter (an attack): apply 1 Shaken to the attacker. If the attacker is below half HP, gain 2 Guard for each companion you have. | Counter (an attack): apply 2 Shaken to the attacker. If the attacker is below half HP, gain 3 Guard for each companion you have. | Gains Opener |  |
| Hunting Barrage | attack | Wild | uncommon | 3 | Deal 10 damage. Apply 2 Shaken. Chain 2: Summon Wolf 3. | Deal 13 damage. Apply 3 Shaken. Chain 2: Summon Wolf 4. | Costs 1 less |  |
| Dappled Ambush | reaction (skill) | Wild | common | 1 | When an enemy uses a non-attack: gain 5 Guard. If it is below half HP, Summon Serpent 2. | When an enemy uses a non-attack: gain 7 Guard. If it is below half HP, Summon Serpent 3. | Gains Opener |  |
| Striped Ram | attack | Wild | common | 3 | Deal 13 damage. If there are 2+ enemies, Summon Wolf 4. | Deal 17 damage. If there are 2+ enemies, Summon Wolf 5. | Costs 1 less |  |
| Tusked Deflection | counter (attack) | Wild | common | 1 | Counter (an attack): gain 4 Guard. If you have a companion, apply 2 Shaken to the attacker. | Counter (an attack): gain 5 Guard. If you have a companion, apply 3 Shaken to the attacker. | Gains Opener |  |
| Ravening Deadfall | reaction (reaction) | Wild | uncommon | 1 | When an enemy trap activates: Summon Wolf 2. If its owner is below half HP, your companions act. | When an enemy trap activates: Summon Wolf 3. If its owner is below half HP, your companions act. | Gains Opener |  |
| Lupine Retort | counter (skill) | Wild | rare | 1 | Counter (a non-attack): gain 3 Guard and your companions act. If there are 2+ enemies, apply 1 Shaken to it. | Counter (a non-attack): gain 4 Guard and your companions act. If there are 2+ enemies, apply 2 Shaken to it. | Gains Opener |  |
| Ursine Thrust | attack | Wild | rare | 2 | Deal 8 damage. Gain 2 Guard for each companion you have. If you have a companion, Summon Serpent 2. | Deal 11 damage. Gain 3 Guard for each companion you have. If you have a companion, Summon Serpent 3. | Costs 1 less |  |
| Ursine Drill | skill | Wild | common | 1 | Gain 4 Guard. If this is the first card you played this turn, apply 2 Shaken. | Gain 5 Guard. If this is the first card you played this turn, apply 3 Shaken. | Gains Palm |  |
| Tusked Ambush | reaction (attack) | Wild | uncommon | 0 | When attacked: Summon Hawk 1. If the attacker is below half HP, gain 2 Guard for each companion you have. | When attacked: Summon Hawk 2. If the attacker is below half HP, gain 3 Guard for each companion you have. | Gains Opener |  |
| Scaled Omen | skill | Wild | uncommon | 2 | Gain 8 Guard. If this is the first card you played this turn, Summon Wolf 3. | Gain 11 Guard. If this is the first card you played this turn, Summon Wolf 4. | Costs 1 less |  |
| Ursine Lure | reaction (reaction) | Wild | uncommon | 1 | When an enemy trap activates: Summon Hawk 1. If its owner is below half HP, gain 4 Guard for each companion you have. | When an enemy trap activates: Summon Hawk 2. If its owner is below half HP, gain 5 Guard for each companion you have. | Gains Opener |  |
| Mangy Uppercut | attack | Wild | common | 2 | Deal 9 damage. If you have a companion, Summon Wolf 2. | Deal 12 damage. If you have a companion, Summon Wolf 3. | Costs 1 less |  |
| Spotted Shroud | skill | Wild | uncommon | 1 | Apply 2 Shaken. If the target is below half HP, gain 3 Guard for each companion you have. | Apply 3 Shaken. If the target is below half HP, gain 4 Guard for each companion you have. | Gains Palm |  |
| Nocturnal Rune | reaction (skill) | Wild | rare | 1 | When an enemy uses a non-attack: gain 3 Guard and your companions act. If it is below half HP, apply 2 Shaken to it. | When an enemy uses a non-attack: gain 4 Guard and your companions act. If it is below half HP, apply 3 Shaken to it. | Gains Opener |  |
| Scaled Pierce | attack | Wild | rare | 3 | Deal 15 damage. Summon Wolf 2. Chain 2: Your companions act. | Deal 20 damage. Summon Wolf 3. Chain 2: Your companions act. | Costs 1 less |  |
| Wildborn Parry | counter (reaction) | Wild | common | 1 | Counter (a trap or Reaction): gain 5 Guard. If its owner is below half HP, your companions act. | Counter (a trap or Reaction): gain 7 Guard. If its owner is below half HP, your companions act. | Gains Opener |  |
| Nocturnal Gainsay | counter (attack) | Wild | uncommon | 0 | Counter (an attack): gain 1 Guard for each companion you have. If the attacker is below half HP, Summon Bear 1. | Counter (an attack): gain 2 Guard for each companion you have. If the attacker is below half HP, Summon Bear 2. | Gains Opener |  |
| Spotted Rune | reaction (attack) | Wild | rare | 0 | When attacked: apply 2 Shaken to the attacker. If the attacker is below half HP, your companions act. | When attacked: apply 3 Shaken to the attacker. If the attacker is below half HP, your companions act. | Gains Opener |  |
| Bristled Rend | attack | Wild | common | 1 | Deal 4 damage. If this is the first card you played this turn, Summon Hawk 1. | Deal 5 damage. If this is the first card you played this turn, Summon Hawk 2. | Gains Palm |  |
| Alpha Riposte | counter (reaction) | Wild | rare | 1 | Counter (a trap or Reaction): gain 4 Guard and Summon Hawk 1. If there are 2+ enemies, apply 2 Shaken to its owner. | Counter (a trap or Reaction): gain 5 Guard and Summon Hawk 2. If there are 2+ enemies, apply 3 Shaken to its owner. | Gains Opener |  |
| Scaled Flourish | attack | Wild | uncommon | 3 | Deal 12 damage. Gain 3 Guard for each companion you have. If you have a companion, your companions act. | Deal 16 damage. Gain 4 Guard for each companion you have. If you have a companion, your companions act. | Costs 1 less |  |
| Wildborn Ward | skill | Wild | common | 1 | Gain 4 Guard. If the target is below half HP, your companions act. | Gain 5 Guard. If the target is below half HP, your companions act. | Gains Palm |  |
| Ravening Return | counter (attack) | Wild | uncommon | 0 | Counter (an attack): Summon Wolf 1. If the attacker is below half HP, gain 2 Guard for each companion you have. | Counter (an attack): Summon Wolf 2. If the attacker is below half HP, gain 3 Guard for each companion you have. | Gains Opener |  |
| Tusked Gambit | skill | Wild | uncommon | 2 | Summon Hawk 2. If this is the first card you played this turn, gain 6 Guard for each companion you have. | Summon Hawk 3. If this is the first card you played this turn, gain 8 Guard for each companion you have. | Costs 1 less |  |
| Mangy Thrust | attack | Wild | uncommon | 2 | Deal 4 damage twice. Summon Bear 1. If this is the first card you played this turn, your companions act. | Deal 5 damage twice. Summon Bear 2. If this is the first card you played this turn, your companions act. | Costs 1 less |  |
| Dappled Shroud | skill | Wild | common | 1→0 | Your companions act. | Your companions act. | Gains Palm |  |
| Scaled Rebuke | counter (skill) | Wild | uncommon | 1 | Counter (a non-attack): gain 4 Guard and apply 1 Shaken to it. If it is below half HP, Summon Hawk 1. | Counter (a non-attack): gain 5 Guard and apply 2 Shaken to it. If it is below half HP, Summon Hawk 2. | Gains Opener |  |
| Tusked Shroud | skill | Wild | uncommon | 2 | Gain 6 Guard. Apply 1 Shaken. Chain 2: Summon Wolf 2. | Gain 8 Guard. Apply 2 Shaken. Chain 2: Summon Wolf 3. | Costs 1 less |  |
| Wildborn Trick | skill | Wild | uncommon | 0 | Apply 1 Shaken. If the target is below half HP, Summon Wolf 1. | Apply 2 Shaken. If the target is below half HP, Summon Wolf 2. | Gains Palm |  |
| Striped Comeback | counter (skill) | Wild | common | 1 | Counter (a non-attack): gain 4 Guard. If you have a companion, apply 2 Shaken to it. | Counter (a non-attack): gain 5 Guard. If you have a companion, apply 3 Shaken to it. | Gains Opener |  |
| Grizzled Cleave | attack | Wild | common | 2 | Deal 5 damage twice. If there are 2+ enemies, your companions act. | Deal 7 damage twice. If there are 2+ enemies, your companions act. | Costs 1 less |  |
| Nocturnal Sigil | skill | Wild | uncommon | 1 | Gain 3 Guard. Summon Bear 1. If this is the first card you played this turn, your companions act. | Gain 4 Guard. Summon Bear 2. If this is the first card you played this turn, your companions act. | Gains Palm |  |
| Tusked Spike | attack | Wild | uncommon | 2 | Deal 4 damage to ALL enemies. Summon Serpent 1. If there are 2+ enemies, gain 4 Guard for each companion you have. | Deal 5 damage to ALL enemies. Summon Serpent 2. If there are 2+ enemies, gain 5 Guard for each companion you have. | Costs 1 less |  |
| Striped Refusal | counter (reaction) | Wild | common | 1 | Counter (a trap or Reaction): gain 4 Guard. If its owner is below half HP, Summon Serpent 2. | Counter (a trap or Reaction): gain 5 Guard. If its owner is below half HP, Summon Serpent 3. | Gains Opener |  |
| Nocturnal Coil | reaction (skill) | Wild | common | 1 | When an enemy uses a non-attack: gain 3 Guard and your companions act. | When an enemy uses a non-attack: gain 4 Guard and your companions act. | Gains Opener |  |
| Ferocious Recital | skill | Wild | rare | 2 | Gain 7 Guard. Your companions act. If you have a companion, Summon Hawk 1. | Gain 9 Guard. Your companions act. If you have a companion, Summon Hawk 2. | Costs 1 less |  |
| Spotted Veto | counter (any) | Wild | rare | 2 | Counter (anything an enemy does): gain 6 Guard for each companion you have. If you have a companion, Summon Hawk 2. | Counter (anything an enemy does): gain 8 Guard for each companion you have. If you have a companion, Summon Hawk 3. | Costs 1 less |  |
| Ravening Mantle | skill | Wild | uncommon | 2 | Your companions act. If there are 2+ enemies, Summon Hawk 3. | Your companions act. If there are 2+ enemies, Summon Hawk 4. | Costs 1 less |  |
| Scaled Ward | skill | Wild | rare | 2 | Summon Bear 3. If there are 2+ enemies, gain 6 Guard for each companion you have. | Summon Bear 4. If there are 2+ enemies, gain 8 Guard for each companion you have. | Costs 1 less |  |
| Ursine Reply | counter (skill) | Wild | common | 1 | Counter (a non-attack): gain 5 Guard. If there are 2+ enemies, your companions act. | Counter (a non-attack): gain 7 Guard. If there are 2+ enemies, your companions act. | Gains Opener |  |
| Wildborn Strike | attack | Wild | uncommon | 1 | Deal 4 damage. Gain 1 Guard for each companion you have. If there are 2+ enemies, Summon Serpent 1. | Deal 5 damage. Gain 2 Guard for each companion you have. If there are 2+ enemies, Summon Serpent 2. | Gains Palm |  |
| Alpha Return | counter (reaction) | Wild | common | 0 | Counter (a trap or Reaction): gain 2 Guard for each companion you have. | Counter (a trap or Reaction): gain 3 Guard for each companion you have. | Gains Opener |  |
| Tusked Tactic | skill | Wild | uncommon | 2 | Summon Serpent 2. If this is the first card you played this turn, gain 6 Guard for each companion you have. | Summon Serpent 3. If this is the first card you played this turn, gain 8 Guard for each companion you have. | Costs 1 less |  |
| Bristled Rune | reaction (reaction) | Wild | uncommon | 1 | When an enemy trap activates: deal 5 damage to its owner and Summon Hawk 1. If its owner is below half HP, gain 3 Guard for each companion you have. | When an enemy trap activates: deal 7 damage to its owner and Summon Hawk 2. If its owner is below half HP, gain 4 Guard for each companion you have. | Gains Opener |  |
| Grizzled Focus | skill | Wild | uncommon | 2 | Apply 3 Shaken. Chain 2: Gain 5 Guard for each companion you have. | Apply 4 Shaken. Chain 2: Gain 7 Guard for each companion you have. | Costs 1 less |  |
| Mangy Bait | reaction (skill) | Wild | common | 1 | When an enemy uses a non-attack: gain 5 Guard. If it is below half HP, Summon Bear 2. | When an enemy uses a non-attack: gain 7 Guard. If it is below half HP, Summon Bear 3. | Gains Opener |  |
| Ursine Refusal | counter (reaction) | Wild | common | 1 | Counter (a trap or Reaction): gain 4 Guard. If you have a companion, Summon Bear 1. | Counter (a trap or Reaction): gain 5 Guard. If you have a companion, Summon Bear 2. | Gains Opener |  |
| Nocturnal Jaw | reaction (skill) | Wild | rare | 0 | When an enemy uses a non-attack: gain 2 Guard for each companion you have. If there are 2+ enemies, apply 2 Shaken to it. | When an enemy uses a non-attack: gain 3 Guard for each companion you have. If there are 2+ enemies, apply 3 Shaken to it. | Gains Opener |  |
| Wildborn Drill | skill | Wild | uncommon | 1 | Gain 3 Guard. Apply 1 Shaken. If the target is below half HP, Summon Bear 1. | Gain 4 Guard. Apply 2 Shaken. If the target is below half HP, Summon Bear 2. | Gains Palm |  |
| Alpha Net | reaction (attack) | Wild | rare | 0 | When attacked: Summon Serpent 1. If there are 2+ enemies, apply 2 Shaken to the attacker. | When attacked: Summon Serpent 2. If there are 2+ enemies, apply 3 Shaken to the attacker. | Gains Opener |  |

## Dusk cards (139)

| Card | Type | Element | Rarity | Cost | Text | Upgraded (A) | Path B | Unlock |
|---|---|---|---|---|---|---|---|---|
| Mark Target | skill ★ | Umbral | starter | 0 | Apply 2 Mark (your damage against it is +2, forever). | Apply 3 Mark (your damage against it is +3, forever). | Gains Palm |  |
| Shadow Cut | attack ★ | Umbral | starter | 1 | Deal 4 damage twice. | Deal 6 damage twice. | Gains Palm |  |
| Smoke Ward | reaction (attack) ★ | Umbral | starter | 2 | When attacked: gain 1 Veil (its first hit misses) and 3 Guard. | When attacked: gain 1 Veil (its first hit misses) and 6 Guard. | Costs 1 less |  |
| Backstab | attack ★ | Umbral | common | 1 | Deal 7 damage. If this is the first card you played this turn, deal 6 more. | Deal 10 damage. If this is the first card you played this turn, deal 8 more. | Gains Palm |  |
| Fan of Knives | attack ★ | Umbral | common | 1 | Deal 3 damage to ALL enemies twice. | Deal 4 damage to ALL enemies twice. | Gains Palm |  |
| Poisoned Blade | attack ★ | Umbral | common | 1 | Deal 5 damage. Apply 5 Doom. | Deal 7 damage. Apply 7 Doom. | Gains Palm |  |
| Silent Step | skill ★ | Umbral | common | 0 | Palm. Gain 4 Guard. Apply 1 Mark to ALL enemies. | Palm. Gain 6 Guard. Apply 1 Mark to ALL enemies. | Gains Opener |  |
| Cloak and Dagger | skill ★ | Umbral | common | 1 | Gain 6 Guard. Apply 1 Mark to ALL enemies. | Gain 9 Guard. Apply 1 Mark to ALL enemies. | Gains Palm |  |
| Feint Step | counter (attack) ★ | Umbral | common | 0 | Counter (an attack): gain 1 Veil (its first hit misses). | Counter (an attack): gain 1 Veil (its first hit misses). | Gains Opener |  |
| Cut the Wire | counter (reaction) ★ | Umbral | common | 0 | Counter (a trap or Reaction): Negate it. Lose 3 HP. | Counter (a trap or Reaction): Negate it. Lose 0 HP. | Gains Opener |  |
| Smoke Bomb | skill ★ | Umbral | uncommon | 1 | Gain 1 Veil. Apply 1 Shaken to ALL enemies. | Gain 1 Veil. Apply 2 Shaken to ALL enemies. | Gains Palm |  |
| Garrote | attack ★ | Umbral | uncommon | 1 | Deal 6 damage. Apply 2 Shaken. If the target is Marked, also apply 2 Exposed. | Deal 8 damage. Apply 3 Shaken. If the target is Marked, also apply 2 Exposed. | Gains Palm |  |
| Death Mark | skill ★ | Umbral | uncommon | 1 | Double the target's Mark. Fold. | Double the target's Mark. | Gains Palm |  |
| Umbral Flurry | attack ★ | Umbral | uncommon | 2 | Deal 3 damage 5 times. | Deal 4 damage 5 times. | Costs 1 less |  |
| Vanish | skill ★ | Umbral | uncommon | 2→1 | Gain 2 Veil. | Gain 2 Veil. | Gains Palm |  |
| Dusk Ward | reaction (skill) ★ | Umbral | uncommon | 0 | When an enemy uses a non-attack: apply 2 Mark to it. | When an enemy uses a non-attack: apply 3 Mark to it. | Gains Opener |  |
| Nightfall | power ★ | Umbral | rare | 2→1 | At the start of your turn, apply 1 Mark to ALL enemies. | At the start of your turn, apply 1 Mark to ALL enemies. | Gains Opener |  |
| Shadowstep | power ★ | Umbral | rare | 2→1 | At the start of your turn, if you have no Veil, gain 1 Veil. | At the start of your turn, if you have no Veil, gain 1 Veil. | Gains Opener |  |
| Assassinate | attack ★ | Umbral | rare | 2 | Deal 10 damage. Then, if the target's HP is at most 4× its Mark, it dies. Fold. | Deal 14 damage. Then, if the target's HP is at most 5× its Mark, it dies. Fold. | No longer Folds |  |
| Night Terror | attack ★ | Umbral | rare | 1 | Deal damage equal to 3× the target's Mark. Fold. | Deal damage equal to 3× the target's Mark. | Gains Palm |  |
| Eclipse | skill ★ | Umbral | legendary | 2 | Apply 4 Mark to ALL enemies. Gain 2 Veil. Fold. | Apply 6 Mark to ALL enemies. Gain 2 Veil. Fold. | No longer Folds |  |
| Veiled Aura | power | Umbral | uncommon | 2 | At the end of your turn, deal 3 damage to each enemy with Mark. | At the end of your turn, deal 4 damage to each enemy with Mark. | Costs 1 less |  |
| Moonless Creed | power | Umbral | rare | 2 | Whenever an attack misses you because of Veil, deal 8 damage to the attacker. | Whenever an attack misses you because of Veil, deal 9 damage to the attacker. | Costs 1 less |  |
| Whispering Garrote | attack | Umbral | common | 1 | Deal 4 damage. Apply 1 Shaken. | Deal 5 damage. Apply 2 Shaken. | Gains Palm |  |
| Sable Focus | skill | Umbral | common | 1 | Apply 2 Shaken. | Apply 3 Shaken. | Gains Palm |  |
| Twilight Seal | reaction (attack) | Umbral | common | 0 | When attacked: apply 2 Shaken to the attacker. | When attacked: apply 3 Shaken to the attacker. | Gains Opener |  |
| Hooded Riposte | counter (reaction) | Umbral | common | 1 | Counter (a trap or Reaction): Negate it and apply 1 Mark to its owner. | Counter (a trap or Reaction): Negate it and apply 2 Mark to its owner. | Gains Opener |  |
| Gloaming Slit | attack | Umbral | uncommon | 2 | Deal 6 damage to ALL enemies. Apply 1 Mark to ALL enemies. | Deal 8 damage to ALL enemies. Apply 2 Mark to ALL enemies. | Costs 1 less |  |
| Whispering Tripwire | reaction (reaction) | Umbral | rare | 1 | When an enemy trap activates: deal 6 damage to its owner and apply 5 Doom to its owner and apply 1 Mark to its owner. | When an enemy trap activates: deal 8 damage to its owner and apply 7 Doom to its owner and apply 2 Mark to its owner. | Gains Opener |  |
| Dusk Sting | attack | Umbral | common | 2 | Deal 7 damage. Gain 1 Veil. | Deal 9 damage. Gain 1 Veil. | Costs 1 less |  |
| Smoky Gambit | skill | Umbral | uncommon | 2 | Gain 7 Guard. Gain 1 Veil. | Gain 9 Guard. Gain 1 Veil. | Costs 1 less |  |
| Dusk Glyph | reaction (attack) | Umbral | common | 1 | When attacked: deal 5 damage to the attacker and apply 5 Doom to the attacker. | When attacked: deal 7 damage to the attacker and apply 7 Doom to the attacker. | Gains Opener |  |
| Phantom Rebuke | counter (reaction) | Umbral | common | 1 | Counter (a trap or Reaction): Negate it and apply 1 Mark to ALL enemies. | Counter (a trap or Reaction): Negate it and apply 2 Mark to ALL enemies. | Gains Opener |  |
| Shadow Edge | attack | Umbral | rare | 2 | Deal 9 damage. Apply 7 Doom. Apply 1 Mark. | Deal 12 damage. Apply 9 Doom. Apply 2 Mark. | Costs 1 less |  |
| Silent Stab | attack | Umbral | uncommon | 2 | Deal 5 damage twice. Deal 4 damage to each enemy with Doom. | Deal 7 damage twice. Deal 5 damage to each enemy with Doom. | Costs 1 less |  |
| Twilight Charm | skill | Umbral | common | 1 | Draw 1 card. Apply 1 Mark to ALL enemies. | Draw 1 card. Apply 2 Mark to ALL enemies. | Gains Palm |  |
| Sable Rune | reaction (attack) | Umbral | common | 0 | When attacked: deal 4 damage to each enemy with Mark. | When attacked: deal 5 damage to each enemy with Mark. | Gains Opener |  |
| Whispering Gambit | skill | Umbral | rare | 1 | Draw 1 card. Apply 2 Doom. Apply 1 Mark. | Draw 1 card. Apply 3 Doom. Apply 2 Mark. | Gains Palm |  |
| Phantom Stab | attack | Umbral | common | 2 | Deal 9 damage. Apply 1 Mark. | Deal 12 damage. Apply 2 Mark. | Costs 1 less |  |
| Nightshade Snare | reaction (attack) | Umbral | common | 0 | When attacked: apply 1 Mark to ALL enemies. | When attacked: apply 2 Mark to ALL enemies. | Gains Opener |  |
| Twilight Flurry | attack | Umbral | common | 2 | Deal 9 damage. Apply 1 Mark to ALL enemies. | Deal 12 damage. Apply 2 Mark to ALL enemies. | Costs 1 less |  |
| Veiled Canticle | skill | Umbral | uncommon | 2 | Draw 2 cards. Apply 1 Shaken. | Draw 2 cards. Apply 2 Shaken. | Costs 1 less |  |
| Shadow Glyph | reaction (skill) | Umbral | rare | 1 | When an enemy uses a non-attack: gain 5 Guard and apply 5 Doom to it and apply 1 Mark to it. | When an enemy uses a non-attack: gain 7 Guard and apply 7 Doom to it and apply 2 Mark to it. | Gains Opener |  |
| Smoky Garrote | attack | Umbral | common | 1 | Deal 2 damage to a random enemy 3 times. Apply 1 Mark to ALL enemies. | Deal 3 damage to a random enemy 3 times. Apply 2 Mark to ALL enemies. | Gains Palm |  |
| Dusk Stance | skill | Umbral | common | 0 | Deal 3 damage to each enemy with Doom. | Deal 4 damage to each enemy with Doom. | Gains Palm |  |
| Silent Rebuke | counter (attack) | Umbral | common | 0 | Counter (an attack): apply 2 Shaken to the attacker. | Counter (an attack): apply 3 Shaken to the attacker. | Gains Opener |  |
| Umbral Strike | attack | Umbral | rare | 2 | Deal 9 damage. Apply 2 Shaken. Apply 1 Mark. | Deal 12 damage. Apply 3 Shaken. Apply 2 Mark. | Costs 1 less |  |
| Whispering Ploy | skill | Umbral | common | 2 | Gain 6 Guard. Apply 1 Mark to ALL enemies. | Gain 8 Guard. Apply 2 Mark to ALL enemies. | Costs 1 less |  |
| Midnight Cut | attack | Umbral | uncommon | 3 | Deal 15 damage. Apply 3 Shaken. | Deal 20 damage. Apply 4 Shaken. | Costs 1 less |  |
| Twilight Trick | skill | Umbral | common | 0 | Apply 1 Shaken. | Apply 2 Shaken. | Gains Palm |  |
| Midnight Denial | counter (attack) | Umbral | uncommon | 1 | Counter (an attack): gain 4 Guard and apply 1 Mark to the attacker. | Counter (an attack): gain 5 Guard and apply 2 Mark to the attacker. | Gains Opener |  |
| Nightshade Shiv | attack | Umbral | common | 1 | Deal 2 damage to a random enemy 3 times. Apply 1 Mark. | Deal 3 damage to a random enemy 3 times. Apply 2 Mark. | Gains Palm |  |
| Sable Garrote | attack | Umbral | rare | 2 | Deal 4 damage twice. Apply 2 Shaken. Apply 1 Mark. | Deal 5 damage twice. Apply 3 Shaken. Apply 2 Mark. | Costs 1 less |  |
| Sable Canticle | skill | Umbral | common | 0 | Apply 1 Mark to ALL enemies. | Apply 2 Mark to ALL enemies. | Gains Palm |  |
| Umbral Retort | counter (reaction) | Umbral | common | 1 | Counter (a trap or Reaction): gain 4 Guard and apply 1 Mark to its owner. | Counter (a trap or Reaction): gain 5 Guard and apply 2 Mark to its owner. | Gains Opener |  |
| Smoky Sting | attack | Umbral | uncommon | 1 | Deal 2 damage to a random enemy 3 times. Apply 1 Shaken. | Deal 3 damage to a random enemy 3 times. Apply 2 Shaken. | Gains Palm |  |
| Smoky Ploy | skill | Umbral | common | 0 | Apply 1 Mark. | Apply 2 Mark. | Gains Palm |  |
| Hidden Refusal | counter (attack) | Umbral | common | 0 | Counter (an attack): apply 1 Mark to the attacker. | Counter (an attack): apply 2 Mark to the attacker. | Gains Opener |  |
| Whispering Stab | attack | Umbral | uncommon | 2 | Deal 5 damage to ALL enemies. Gain 1 Veil. | Deal 7 damage to ALL enemies. Gain 1 Veil. | Costs 1 less |  |
| Gloaming Seal | reaction (reaction) | Umbral | common | 1 | When an enemy trap activates: deal 5 damage to its owner and apply 1 Mark to ALL enemies. | When an enemy trap activates: deal 7 damage to its owner and apply 2 Mark to ALL enemies. | Gains Opener |  |
| Twilight Shiv | attack | Umbral | uncommon | 2 | Deal 5 damage twice. Apply 2 Mark. | Deal 7 damage twice. Apply 3 Mark. | Costs 1 less |  |
| Moonless Blade | attack | Umbral | common | 2 | Deal 4 damage twice. Apply 1 Mark to ALL enemies. | Deal 5 damage twice. Apply 2 Mark to ALL enemies. | Costs 1 less |  |
| Veiled Slit | attack | Umbral | rare | 3 | Deal 14 damage. Apply 10 Doom. Apply 2 Mark. | Deal 19 damage. Apply 13 Doom. Apply 3 Mark. | Costs 1 less |  |
| Hidden Pit | reaction (attack) | Umbral | common | 1 | When attacked: gain 4 Guard and apply 1 Shaken to the attacker. | When attacked: gain 5 Guard and apply 2 Shaken to the attacker. | Gains Opener |  |
| Veiled Strike | attack | Umbral | uncommon | 3 | Deal 15 damage. Gain 1 Veil. | Deal 20 damage. Gain 1 Veil. | Costs 1 less |  |
| Shadow Master | attack 🦋 | Umbral | evolved | 1 | Deal 5 damage. Apply 1 Mark. If this is the first card you played this turn, gain 1 Veil. | Deal 7 damage. Apply 2 Mark. If this is the first card you played this turn, gain 1 Veil. | Gains Palm |  |
| Pickpurse | attack 🦋 | Umbral | common | 1 | Deal 4 damage. Apply 1 Mark. Evolve 4 (Shadow Master). | Deal 5 damage. Apply 2 Mark. Evolve 4 (Shadow Master). | Gains Palm |  |
| Night Cloak | skill 🦋 | Umbral | evolved | 1 | Gain 1 Veil. Apply 1 Mark to ALL enemies. | Gain 1 Veil. Apply 2 Mark to ALL enemies. | Gains Palm |  |
| Smoke Puff | skill 🦋 | Umbral | common | 1→0 | Gain 1 Veil. Evolve 3 (Night Cloak). | Gain 1 Veil. Evolve 3 (Night Cloak). | Gains Palm |  |
| Spymaster | reaction (attack) 🦋 | Umbral | evolved | 1 | When attacked: gain 5 Guard and apply 1 Mark to ALL enemies. If you have Veil, draw 1 card. | When attacked: gain 7 Guard and apply 2 Mark to ALL enemies. If you have Veil, draw 1 card. | Gains Opener |  |
| Lookout | reaction (attack) 🦋 | Umbral | common | 1 | When attacked: gain 5 Guard and apply 1 Mark to the attacker. Evolve 4 (Spymaster). | When attacked: gain 7 Guard and apply 2 Mark to the attacker. Evolve 4 (Spymaster). | Gains Opener |  |
| Assassin's Kiss | attack 🦋 | Umbral | evolved | 1 | Deal 3 damage twice. If this is the first card you played this turn, apply 2 Mark to ALL enemies. | Deal 4 damage twice. If this is the first card you played this turn, apply 3 Mark to ALL enemies. | Gains Palm |  |
| Shiv | attack 🦋 | Umbral | common | 1 | Deal 4 damage. If this is the first card you played this turn, apply 2 Mark. Evolve 4 (Assassin's Kiss). | Deal 5 damage. If this is the first card you played this turn, apply 3 Mark. Evolve 4 (Assassin's Kiss). | Gains Palm |  |
| Phantom Step | counter (attack) 🦋 | Umbral | evolved | 1 | Counter (an attack): gain 1 Veil and apply 1 Mark to ALL enemies. | Counter (an attack): gain 1 Veil and apply 2 Mark to ALL enemies. | Gains Opener |  |
| Shade Step | counter (attack) 🦋 | Umbral | uncommon | 1→0 | Counter (an attack): gain 1 Veil. Evolve 4 (Phantom Step). | Counter (an attack): gain 1 Veil. Evolve 4 (Phantom Step). | Gains Opener |  |
| Shadow Heart | power ★ | Umbral | uncommon | 1 | At the start of your turn, apply 1 Mark to a random enemy. | At the start of your turn, apply 2 Mark to a random enemy. | Gains Opener |  |
| Night Engine | power ★ | Umbral | rare | 2 | Whenever a chain of 2+ links resolves, apply 2 Mark to ALL enemies. | Whenever a chain of 2+ links resolves, apply 3 Mark to ALL enemies. | Costs 1 less |  |
| Veil Crown | power ★ | Umbral | uncommon | 1 | At the end of your turn, if you have Veil, deal 8 damage to ALL enemies. | At the end of your turn, if you have Veil, deal 9 damage to ALL enemies. | Gains Opener |  |
| Phantom Soul | power ★ | Umbral | rare | 1 | Whenever you play a Counter, apply 1 Mark to a random enemy. | Whenever you play a Counter, apply 2 Mark to a random enemy. | Gains Opener |  |
| Blackout Glyph | reaction (attack) | Umbral | common | 1 | When attacked: deal 6 damage to the attacker. If you have Veil, gain 1 Veil. | When attacked: deal 8 damage to the attacker. If you have Veil, gain 1 Veil. | Gains Opener |  |
| Sly Ward | skill | Umbral | uncommon | 2 | Gain 6 Guard. Apply 1 Shaken. If you have Veil, apply 12 Doom. | Gain 8 Guard. Apply 2 Shaken. If you have Veil, apply 16 Doom. | Costs 1 less |  |
| Faceless Vow | skill | Umbral | common | 1 | Gain 3 Guard. If you have Veil, gain 1 Veil. | Gain 4 Guard. If you have Veil, gain 1 Veil. | Gains Palm |  |
| Sly Deadfall | reaction (attack) | Umbral | common | 1 | When attacked: gain 5 Guard. If the attacker has Mark, apply 2 Mark to the attacker. | When attacked: gain 7 Guard. If the attacker has Mark, apply 3 Mark to the attacker. | Gains Opener |  |
| Lurking Spike | attack | Umbral | uncommon | 1 | Deal 4 damage. Apply 1 Shaken. If this is the first card you played this turn, apply 6 Doom. | Deal 5 damage. Apply 2 Shaken. If this is the first card you played this turn, apply 8 Doom. | Gains Palm |  |
| Raven Omen | skill | Umbral | uncommon | 1 | Apply 2 Shaken. If you hold 3 or fewer other cards, deal 4 damage to each enemy with Mark. | Apply 3 Shaken. If you hold 3 or fewer other cards, deal 5 damage to each enemy with Mark. | Gains Palm |  |
| Inky Smite | attack | Umbral | uncommon | 2 | Deal 8 damage. Apply 1 Mark. If the target is below half HP, gain 1 Veil. | Deal 11 damage. Apply 2 Mark. If the target is below half HP, gain 1 Veil. | Costs 1 less |  |
| Raven Catch | reaction (attack) | Umbral | uncommon | 1 | When attacked: deal 7 damage to the attacker. If the attacker has Mark, apply 1 Mark to ALL enemies. | When attacked: deal 9 damage to the attacker. If the attacker has Mark, apply 2 Mark to ALL enemies. | Gains Opener |  |
| Ghostly Drill | skill | Umbral | uncommon | 2 | Gain 8 Guard. If this is the first card you played this turn, apply 17 Doom. | Gain 11 Guard. If this is the first card you played this turn, apply 23 Doom. | Costs 1 less |  |
| Crow Rejoinder | counter (reaction) | Umbral | uncommon | 0 | Counter (a trap or Reaction): apply 1 Shaken to its owner. If its owner has Mark, gain 1 Veil. | Counter (a trap or Reaction): apply 2 Shaken to its owner. If its owner has Mark, gain 1 Veil. | Gains Opener |  |
| Crow Rite | skill | Umbral | uncommon | 2 | Gain 4 Guard. Gain 1 Veil. If this is the first card you played this turn, apply 1 Mark to ALL enemies. | Gain 5 Guard. Gain 1 Veil. If this is the first card you played this turn, apply 2 Mark to ALL enemies. | Costs 1 less |  |
| Masked Coil | reaction (skill) | Umbral | common | 1 | When an enemy uses a non-attack: gain 4 Guard. If it has Mark, gain 1 Veil. | When an enemy uses a non-attack: gain 5 Guard. If it has Mark, gain 1 Veil. | Gains Opener |  |
| Inky Slash | attack | Umbral | common | 0 | Deal 3 damage. If you hold 3 or fewer other cards, apply 1 Mark. | Deal 4 damage. If you hold 3 or fewer other cards, apply 2 Mark. | Gains Palm |  |
| Blackout Reply | counter (attack) | Umbral | uncommon | 0 | Counter (an attack): apply 1 Mark to ALL enemies. If you have Veil, apply 6 Doom to the attacker. | Counter (an attack): apply 2 Mark to ALL enemies. If you have Veil, apply 8 Doom to the attacker. | Gains Opener |  |
| Dim Lunge | attack | Umbral | uncommon | 3 | Deal 14 damage. Chain 2: Apply 3 Mark to ALL enemies. | Deal 19 damage. Chain 2: Apply 4 Mark to ALL enemies. | Costs 1 less |  |
| Unseen Gambit | skill | Umbral | rare | 1 | Apply 8 Doom. If you hold 3 or fewer other cards, apply 2 Mark. | Apply 11 Doom. If you hold 3 or fewer other cards, apply 3 Mark. | Gains Palm |  |
| Dim Return | counter (skill) | Umbral | uncommon | 1 | Counter (a non-attack): gain 4 Guard and deal 2 damage to each enemy with Mark. If it is below half HP, apply 8 Doom to it. | Counter (a non-attack): gain 5 Guard and deal 3 damage to each enemy with Mark. If it is below half HP, apply 11 Doom to it. | Gains Opener |  |
| Dim Omen | skill | Umbral | uncommon | 0 | Apply 4 Doom. If you have Veil, apply 1 Mark. | Apply 5 Doom. If you have Veil, apply 2 Mark. | Gains Palm |  |
| Faceless Onslaught | attack | Umbral | uncommon | 2 | Deal 10 damage. If this is the first card you played this turn, deal 10 damage to each enemy with Mark. | Deal 13 damage. If this is the first card you played this turn, deal 13 damage to each enemy with Mark. | Costs 1 less |  |
| Eventide Canticle | skill | Umbral | common | 2 | Gain 7 Guard. If the target is below half HP, apply 3 Mark. | Gain 9 Guard. If the target is below half HP, apply 4 Mark. | Costs 1 less |  |
| Eventide Denial | counter (attack) | Umbral | common | 1 | Counter (an attack): gain 4 Guard. If you have Veil, deal 5 damage to each enemy with Mark. | Counter (an attack): gain 5 Guard. If you have Veil, deal 7 damage to each enemy with Mark. | Gains Opener |  |
| Penumbral Cut | attack | Umbral | common | 0 | Deal 3 damage. If you have Veil, deal 3 damage to each enemy with Mark. | Deal 4 damage. If you have Veil, deal 4 damage to each enemy with Mark. | Gains Palm |  |
| Faceless Lash | attack | Umbral | common | 2 | Deal 5 damage to ALL enemies. If this is the first card you played this turn, deal 9 damage to each enemy with Mark. | Deal 7 damage to ALL enemies. If this is the first card you played this turn, deal 12 damage to each enemy with Mark. | Costs 1 less |  |
| Penumbral Deflection | counter (reaction) | Umbral | rare | 1 | Counter (a trap or Reaction): gain 4 Guard and apply 4 Doom to its owner. If its owner is below half HP, gain 1 Veil. | Counter (a trap or Reaction): gain 5 Guard and apply 5 Doom to its owner. If its owner is below half HP, gain 1 Veil. | Gains Opener |  |
| Assassin Tripwire | reaction (reaction) | Umbral | uncommon | 1 | When an enemy trap activates: deal 4 damage to its owner and deal 2 damage to each enemy with Mark. If its owner has Mark, gain 1 Veil. | When an enemy trap activates: deal 5 damage to its owner and deal 3 damage to each enemy with Mark. If its owner has Mark, gain 1 Veil. | Gains Opener |  |
| Obscure Focus | skill | Umbral | uncommon | 1 | Gain 3 Guard. Apply 3 Doom. If the target has Mark, deal 3 damage to each enemy with Mark. | Gain 4 Guard. Apply 4 Doom. If the target has Mark, deal 4 damage to each enemy with Mark. | Gains Palm |  |
| Obscure Parry | counter (reaction) | Umbral | rare | 1 | Counter (a trap or Reaction): gain 4 Guard and apply 1 Shaken to its owner. If its owner has Mark, gain 1 Veil. | Counter (a trap or Reaction): gain 5 Guard and apply 2 Shaken to its owner. If its owner has Mark, gain 1 Veil. | Gains Opener |  |
| Crow Deadfall | reaction (reaction) | Umbral | common | 1 | When an enemy trap activates: deal 5 damage to its owner. If its owner has Mark, gain 1 Veil. | When an enemy trap activates: deal 7 damage to its owner. If its owner has Mark, gain 1 Veil. | Gains Opener |  |
| Faceless Deflection | counter (attack) | Umbral | uncommon | 1 | Counter (an attack): gain 5 Guard. If you have Veil, apply 11 Doom to the attacker. | Counter (an attack): gain 7 Guard. If you have Veil, apply 15 Doom to the attacker. | Gains Opener |  |
| Crow Canticle | skill | Umbral | uncommon | 2 | Gain 6 Guard. Apply 2 Shaken. If this is the first card you played this turn, gain 1 Veil. | Gain 8 Guard. Apply 3 Shaken. If this is the first card you played this turn, gain 1 Veil. | Costs 1 less |  |
| Sly Tactic | skill | Umbral | rare | 1 | Gain 4 Guard. Apply 3 Doom. If you have Veil, apply 2 Mark. | Gain 5 Guard. Apply 4 Doom. If you have Veil, apply 3 Mark. | Gains Palm |  |
| Raven Deadfall | reaction (attack) | Umbral | rare | 1 | When attacked: gain 5 Guard and apply 1 Mark to the attacker. If the attacker is below half HP, gain 1 Veil. | When attacked: gain 7 Guard and apply 2 Mark to the attacker. If the attacker is below half HP, gain 1 Veil. | Gains Opener |  |
| Nightfall Rite | skill | Umbral | uncommon | 1 | Gain 3 Guard. Apply 2 Doom. If you have Veil, gain 1 Veil. | Gain 4 Guard. Apply 3 Doom. If you have Veil, gain 1 Veil. | Gains Palm |  |
| Masked Trick | skill | Umbral | uncommon | 2 | Apply 3 Shaken. If the target is below half HP, apply 3 Mark to ALL enemies. | Apply 4 Shaken. If the target is below half HP, apply 4 Mark to ALL enemies. | Costs 1 less |  |
| Inky Uppercut | attack | Umbral | uncommon | 2 | Deal 3 damage twice. Apply 5 Doom. Chain 2: Apply 3 Shaken. | Deal 4 damage twice. Apply 7 Doom. Chain 2: Apply 4 Shaken. | Costs 1 less |  |
| Obscure Sigil | skill | Umbral | rare | 2 | Gain 7 Guard. Apply 1 Mark. If the target is below half HP, deal 8 damage to each enemy with Mark. | Gain 9 Guard. Apply 2 Mark. If the target is below half HP, deal 11 damage to each enemy with Mark. | Costs 1 less |  |
| Lurking Pit | reaction (attack) | Umbral | rare | 1 | When attacked: deal 3 damage to the attacker and gain 1 Veil. If the attacker is below half HP, apply 2 Shaken to the attacker. | When attacked: deal 4 damage to the attacker and gain 1 Veil. If the attacker is below half HP, apply 3 Shaken to the attacker. | Gains Opener |  |
| Blackout Burst | attack | Umbral | uncommon | 3 | Deal 10 damage. Deal 5 damage to each enemy with Mark. Chain 2: Apply 2 Mark to ALL enemies. | Deal 13 damage. Deal 7 damage to each enemy with Mark. Chain 2: Apply 3 Mark to ALL enemies. | Costs 1 less |  |
| Penumbral Trick | skill | Umbral | uncommon | 0 | Deal 2 damage to each enemy with Mark. If the target is below half HP, apply 1 Shaken. | Deal 3 damage to each enemy with Mark. If the target is below half HP, apply 2 Shaken. | Gains Palm |  |
| Dim Pit | reaction (attack) | Umbral | uncommon | 1 | When attacked: gain 4 Guard and apply 4 Doom to the attacker. If the attacker has Mark, deal 3 damage to each enemy with Mark. | When attacked: gain 5 Guard and apply 5 Doom to the attacker. If the attacker has Mark, deal 4 damage to each enemy with Mark. | Gains Opener |  |
| Assassin Reversal | counter (reaction) | Umbral | uncommon | 0 | Counter (a trap or Reaction): apply 1 Mark to ALL enemies. If you have Veil, deal 3 damage to each enemy with Mark. | Counter (a trap or Reaction): apply 2 Mark to ALL enemies. If you have Veil, deal 4 damage to each enemy with Mark. | Gains Opener |  |
| Crow Crash | attack | Umbral | common | 0 | Deal 3 damage. If you hold 3 or fewer other cards, apply 1 Shaken. | Deal 4 damage. If you hold 3 or fewer other cards, apply 2 Shaken. | Gains Palm |  |
| Penumbral Tripline | reaction (reaction) | Umbral | common | 1 | When an enemy trap activates: deal 6 damage to its owner. If you have Veil, apply 10 Doom to its owner. | When an enemy trap activates: deal 8 damage to its owner. If you have Veil, apply 13 Doom to its owner. | Gains Opener |  |
| Inky Return | counter (skill) | Umbral | common | 1 | Counter (a non-attack): gain 4 Guard. If it has Mark, apply 2 Shaken to it. | Counter (a non-attack): gain 5 Guard. If it has Mark, apply 3 Shaken to it. | Gains Opener |  |
| Ghostly Clasp | reaction (reaction) | Umbral | common | 1 | When an enemy trap activates: deal 6 damage to its owner. If you have Veil, deal 6 damage to each enemy with Mark. | When an enemy trap activates: deal 8 damage to its owner. If you have Veil, deal 8 damage to each enemy with Mark. | Gains Opener |  |
| Assassin Strike | attack | Umbral | rare | 1 | Deal 4 damage. Apply 3 Doom. If the target has Mark, apply 1 Mark. | Deal 5 damage. Apply 4 Doom. If the target has Mark, apply 2 Mark. | Gains Palm |  |
| Masked Refusal | counter (attack) | Umbral | uncommon | 1 | Counter (an attack): gain 4 Guard and apply 1 Shaken to the attacker. If the attacker has Mark, deal 3 damage to each enemy with Mark. | Counter (an attack): gain 5 Guard and apply 2 Shaken to the attacker. If the attacker has Mark, deal 4 damage to each enemy with Mark. | Gains Opener |  |
| Faceless Ritual | skill | Umbral | uncommon | 0 | Apply 3 Doom. If this is the first card you played this turn, gain 1 Veil. | Apply 4 Doom. If this is the first card you played this turn, gain 1 Veil. | Gains Palm |  |
| Faceless Bait | reaction (skill) | Umbral | uncommon | 0 | When an enemy uses a non-attack: apply 5 Doom to it. If it has Mark, deal 3 damage to each enemy with Mark. | When an enemy uses a non-attack: apply 7 Doom to it. If it has Mark, deal 4 damage to each enemy with Mark. | Gains Opener |  |
| Nightfall Veto | counter (attack) | Umbral | rare | 1 | Counter (an attack): gain 4 Guard and deal 2 damage to each enemy with Mark. If you have Veil, apply 2 Mark to the attacker. | Counter (an attack): gain 5 Guard and deal 3 damage to each enemy with Mark. If you have Veil, apply 3 Mark to the attacker. | Gains Opener |  |
| Ghostly Blow | attack | Umbral | uncommon | 2 | Deal 5 damage to ALL enemies. Deal 3 damage to each enemy with Mark. If you have Veil, gain 1 Veil. | Deal 7 damage to ALL enemies. Deal 4 damage to each enemy with Mark. If you have Veil, gain 1 Veil. | Costs 1 less |  |
| Obscure Denial | counter (reaction) | Umbral | rare | 0 | Counter (a trap or Reaction): apply 5 Doom to its owner. If you have Veil, gain 1 Veil. | Counter (a trap or Reaction): apply 7 Doom to its owner. If you have Veil, gain 1 Veil. | Gains Opener |  |
| Blackout Tactic | skill | Umbral | rare | 1 | Gain 4 Guard. Deal 2 damage to each enemy with Mark. Chain 2: Apply 1 Mark. | Gain 5 Guard. Deal 3 damage to each enemy with Mark. Chain 2: Apply 2 Mark. | Gains Palm |  |
| Raven Mirror | reaction (attack) | Umbral | uncommon | 1 | When attacked: deal 5 damage to the attacker and apply 4 Doom to the attacker. If the attacker is below half HP, apply 2 Shaken to the attacker. | When attacked: deal 7 damage to the attacker and apply 5 Doom to the attacker. If the attacker is below half HP, apply 3 Shaken to the attacker. | Gains Opener |  |
| Penumbral Reversal | counter (skill) | Umbral | common | 1 | Counter (a non-attack): gain 4 Guard. If you have Veil, apply 2 Mark to ALL enemies. | Counter (a non-attack): gain 5 Guard. If you have Veil, apply 3 Mark to ALL enemies. | Gains Opener |  |
| Assassin Trance | skill | Umbral | uncommon | 2 | Gain 6 Guard. Deal 3 damage to each enemy with Mark. If this is the first card you played this turn, gain 1 Veil. | Gain 8 Guard. Deal 4 damage to each enemy with Mark. If this is the first card you played this turn, gain 1 Veil. | Costs 1 less |  |
| Obscure Lure | reaction (skill) | Umbral | common | 1 | When an enemy uses a non-attack: gain 5 Guard. If it is below half HP, deal 6 damage to each enemy with Mark. | When an enemy uses a non-attack: gain 7 Guard. If it is below half HP, deal 8 damage to each enemy with Mark. | Gains Opener |  |
| Penumbral Ritual | skill | Umbral | rare | 1 | Apply 8 Doom. If the target is below half HP, apply 2 Mark to ALL enemies. | Apply 11 Doom. If the target is below half HP, apply 3 Mark to ALL enemies. | Gains Palm |  |
| Lurking Jab | attack | Umbral | rare | 2 | Deal 7 damage. Gain 1 Veil. Chain 2: Apply 3 Shaken. | Deal 9 damage. Gain 1 Veil. Chain 2: Apply 4 Shaken. | Costs 1 less |  |
| Eventide Clasp | reaction (attack) | Umbral | uncommon | 1 | When attacked: gain 4 Guard and deal 2 damage to each enemy with Mark. If you have Veil, apply 2 Shaken to the attacker. | When attacked: gain 5 Guard and deal 3 damage to each enemy with Mark. If you have Veil, apply 3 Shaken to the attacker. | Gains Opener |  |

★ = hand-designed.

## v0.9 "Clean Cut": repeat cards reworked or cut (79)

Generated cards that repeated another card (same type, cost, element and rules, numbers within 2 or 25%). Powers are listed in docs/10-V9-CLEAN-CUT.md.

| Card | Faction | Was | Now | Repeated |
|---|---|---|---|---|
| Smouldering Gambit | ember | Apply 2 Burn. | Deal 3 damage to each enemy with Burn. | Kindling |
| Pyre Tripwire | ember | When attacked: gain 5 Guard and apply 2 Burn to the attacker. | When attacked: gain 5 Guard and deal 3 damage to each enemy with Burn. | Cinder Cloak |
| Brine Answer | tide | Counter (a trap or Reaction): Negate it and apply 1 Shaken to its owner. | Counter (a trap or Reaction): Negate it and apply 1 Exposed to its owner. | Rippling Comeback |
| Bloom Barrage | thorn | Deal 4 damage. Gain 1 Barbs. | Deal 4 damage. Apply 1 Shaken. | Briar Lash |
| Fern Mantle | thorn | Gain 6 Guard. | Next turn, gain 6 Guard. | Barkskin |
| Grove Trick | thorn | Next turn, gain 6 Guard. | Gain 2 Barbs. | fern_mantle |
| Verdant Mirror | thorn | When attacked: gain 4 Guard. | When attacked: apply 2 Exposed to the attacker. | Harden |
| Silent Pit | void | When attacked: apply 7 Doom to the attacker. | When attacked: deal 4 damage to each enemy with Doom. | Grave Snare |
| Dread Thrust | void | Deal 5 damage. Apply 4 Doom. | Deal 5 damage. Apply 3 Doom to ALL enemies. | Poisoned Blade |
| Silent Riposte | void | Counter (a trap or Reaction): Negate it and apply 3 Doom to its owner. | Counter (a trap or Reaction): Negate it and apply 2 Doom to ALL enemies. | severed_answer |
| Frostbitten Crash | rime | Deal 6 damage to ALL enemies. Gain 5 Guard. | Deal 6 damage to ALL enemies. Deal 4 damage to each enemy with Chill. | Gleaming Blow |
| Boreal Cleave | rime | Deal 4 damage twice. Gain 4 Guard. | Deal 4 damage twice. Deal 3 damage to each enemy with Chill. | Glass Strike |
| Glacial Snare | rime | When attacked: gain 4 Guard. | When attacked: deal 4 damage to each enemy with Chill. | Prism Pit |
| Snowdrift Burst | rime | Deal 10 damage. Gain 4 Guard. | Deal 10 damage. Deal 4 damage to each enemy with Chill. | Glitter Volley |
| Hoarfrost Refusal | rime | Counter (an attack): gain 4 Guard. | Counter (an attack): deal 3 damage to each enemy with Chill. | pane_denial |
| Boreal Ward | rime | Gain 6 Guard. | Deal 5 damage to each enemy with Chill. | Facet Focus |
| Granite Cut | stone | Deal 15 damage. Gain 7 Guard. | Deal 15 damage. Deal 6 damage to each enemy with Tremor. | Hallowed Barrage |
| Craggy Rune | stone | When an enemy trap activates: deal 5 damage to its owner and gain 4 Guard. | When an enemy trap activates: deal 5 damage to its owner and deal 4 damage to each enemy with Tremor. | crypt_coil |
| Bedrock Tripwire | stone | When attacked: gain 4 Guard. | When attacked: deal 4 damage to each enemy with Tremor. | funeral_snare |
| Dawn Snare | dawn | When attacked: gain 4 Guard. | When attacked: apply 1 Exposed to ALL enemies. | Fortune Glyph |
| Judicial Rend | dawn | Deal 4 damage twice. Gain 4 Guard. | Deal 5 damage twice. Gain 1 Verdict. | fortune_flip |
| Antlered Seal | beast | When an enemy trap activates: deal 5 damage to its owner and gain 4 Guard. | When an enemy trap activates: deal 5 damage to its owner and gain 1 Barbs. | Bramble Coil |
| Fanged Rune | beast | When attacked: deal 6 damage to the attacker and gain 4 Guard. | When attacked: deal 6 damage to the attacker and gain 1 Barbs. | Bloom Seal |
| Phantom Rebuke | dusk | Counter (a trap or Reaction): Negate it and apply 1 Mark to its owner. | Counter (a trap or Reaction): Negate it and apply 1 Mark to ALL enemies. | Hooded Riposte |
| Silent Stab | dusk | Deal 5 damage twice. Apply 7 Doom. | Deal 5 damage twice. Deal 4 damage to each enemy with Doom. | Silent Volley |
| Sable Rune | dusk | When attacked: apply 7 Doom to the attacker. | When attacked: deal 4 damage to each enemy with Mark. | Grave Snare |
| Dusk Stance | dusk | Apply 5 Doom. | Deal 3 damage to each enemy with Doom. | Dread Veil |
| Flare Barrage | neutral | Deal 5 damage. Apply 2 Burn. | Deal 5 damage. Apply 1 Exposed to ALL enemies. | cinder_crash |
| Inferno Lash | neutral | Deal 7 damage to ALL enemies. Apply 2 Burn to ALL enemies. | Deal 7 damage to ALL enemies. Deal 5 damage to each enemy with Burn. | Searing Swipe |
| Flame Rite | neutral | Draw 1 card. Apply 1 Burn. | Draw 1 card. Apply 1 Exposed to ALL enemies. | Blazing Gambit |
| Bonfire Shroud | neutral | Apply 1 Burn to ALL enemies. | Apply 1 Exposed to ALL enemies. | Charred Ploy |
| Flare Rune | neutral | When attacked: gain 5 Guard and apply 2 Burn to the attacker. | When attacked: gain 5 Guard and apply 1 Exposed to ALL enemies. | Cinder Cloak |
| Inferno Pit | neutral | When an enemy uses a non-attack: gain 4 Guard and apply 2 Burn to it. | When an enemy uses a non-attack: gain 4 Guard and deal 3 damage to each enemy with Burn. | Ember Ambush |
| Flame Volley | neutral | Deal 10 damage. Apply 2 Burn to ALL enemies. | Deal 10 damage. Deal 4 damage to each enemy with Burn. | searing_lash |
| Inferno Shroud | neutral | Apply 3 Burn to ALL enemies. | Deal 7 damage to each enemy with Burn. | Cinder Ward |
| Snow Crash | neutral | Deal 5 damage. Apply 2 Chill. | Deal 5 damage. Apply 1 Chill to ALL enemies. | Arctic Slash |
| Hail Volley | neutral | Deal 7 damage to ALL enemies. Apply 3 Chill to ALL enemies. | Deal 8 damage to ALL enemies. Bank 1 energy for next turn. | Polar Lash |
| Hail Mantle | neutral | Draw 1 card. Apply 1 Chill. | Draw 1 card. Apply 1 Chill to ALL enemies. | frostbitten_trick |
| Glacier Aegis | neutral | Apply 2 Chill to ALL enemies. | Deal 3 damage to each enemy with Chill. | Sleet Stance |
| Ice Seal | neutral | When attacked: gain 5 Guard and apply 3 Chill to the attacker. | When attacked: gain 5 Guard and deal 3 damage to each enemy with Chill. | Rime Snare |
| Winter Coil | neutral | When attacked: apply 3 Chill to ALL enemies. | **cut** | numbing_pit |
| Glacier Reply | neutral | Counter (an attack): gain 4 Guard and apply 2 Chill to ALL enemies. | Counter (an attack): gain 4 Guard and deal 3 damage to each enemy with Chill. | Hailstone Comeback |
| Glacier Cleave | neutral | Deal 10 damage. Apply 2 Chill to ALL enemies. | Deal 10 damage. Next turn, gain 5 Guard. | Hailstone Cut |
| Ice Gambit | neutral | Apply 4 Chill to ALL enemies. | Next turn, gain 9 Guard. | Snowdrift Stance |
| Leaf Smite | neutral | Deal 7 damage to ALL enemies. Heal 4 HP. | Deal 7 damage to ALL enemies. Apply 2 Exposed to ALL enemies. | verdant_cleave |
| Wildwood Veil | neutral | Gain 1 Barbs. | Next turn, gain 4 Guard. | Heartwood Charm |
| Petal Pit | neutral | When attacked: gain 5 Guard and heal 2 HP. | When attacked: gain 5 Guard and gain 1 Barbs. | nettle_mirror |
| Thicket Trap | neutral | When attacked: gain 2 Barbs. | **cut** | Fern Snare |
| Leaf Mirror | neutral | When an enemy uses a non-attack: gain 4 Guard and heal 2 HP. | When an enemy uses a non-attack: gain 4 Guard and gain 1 Barbs. | mossy_glyph |
| Vine Trick | neutral | Gain 3 Barbs. | Bank 1 energy for next turn. Gain 4 Guard. | Grove Trick |
| Bolt Slash | neutral | Deal 7 damage to ALL enemies. Gain 3 Charge. | Deal 7 damage to ALL enemies. Deal 5 damage to each enemy with Shock. | Ionized Rend |
| Volt Rite | neutral | Draw 1 card. Apply 2 Shock. | Draw 1 card. Gain 1 Charge. | Thunder Sigil |
| Squall Aegis | neutral | Gain 2 Charge. | Deal 3 damage to each enemy with Shock. | Ionized Sigil |
| Stormcloud Tripwire | neutral | When attacked: gain 5 Guard and apply 4 Shock to the attacker. | When attacked: gain 5 Guard and deal 3 damage to each enemy with Shock. | Cyclone Trap |
| Spark Trap | neutral | When attacked: gain 3 Charge. | When attacked: deal 5 damage to each enemy with Shock. | gale_tripwire |
| Bolt Pit | neutral | When an enemy uses a non-attack: gain 4 Guard and apply 4 Shock to it. | When an enemy uses a non-attack: gain 4 Guard and deal 3 damage to each enemy with Shock. | Static Tripwire |
| Squall Slash | neutral | Deal 13 damage. Apply 6 Shock. | Deal 13 damage. Deal 5 damage to each enemy with Shock. | Static Rend |
| Wave Strike | neutral | Deal 5 damage. Apply 1 Shaken. | Deal 5 damage. Apply 1 Shaken to ALL enemies. | Undertow |
| Torrent Volley | neutral | Deal 7 damage to ALL enemies. Draw 1 card. | Deal 7 damage to ALL enemies. Deal 5 damage to each enemy with Shaken. | undertow_smite |
| River Mantle | neutral | Draw 1 card. Apply 1 Shaken. | Draw 1 card. Apply 1 Shaken to ALL enemies. | Moonwater Focus |
| Wave Pit | neutral | When attacked: gain 5 Guard and apply 2 Shaken to the attacker. | When attacked: gain 5 Guard and deal 3 damage to each enemy with Shaken. | Coral Glyph |
| Torrent Rune | neutral | When an enemy uses a non-attack: gain 4 Guard and apply 2 Shaken to it. | When an enemy uses a non-attack: gain 4 Guard and deal 3 damage to each enemy with Shaken. | Tidal Rune |
| Monsoon Volley | neutral | Deal 13 damage. Apply 2 Shaken. | Deal 13 damage. Deal 5 damage to each enemy with Shaken. | Spray Barrage |
| Mountain Burst | neutral | Deal 5 damage. Apply 2 Tremor. | Deal 5 damage. Gain 2 Fortify. | marble_blow |
| Earth Rend | neutral | Deal 7 damage to ALL enemies. Gain 5 Fortify. | Deal 7 damage to ALL enemies. Deal 5 damage to each enemy with Tremor. | Slate Swipe |
| Pebble Charm | neutral | Gain 3 Fortify. | Deal 3 damage to each enemy with Tremor. | Cavern Charm |
| Cliff Glyph | neutral | When attacked: gain 5 Guard and apply 3 Tremor to the attacker. | When attacked: gain 5 Guard and deal 3 damage to each enemy with Tremor. | Tectonic Seal |
| Landslide Answer | neutral | Counter (an attack): gain 4 Guard and gain 3 Fortify. | Counter (an attack): gain 4 Guard and deal 3 damage to each enemy with Tremor. | Cavern Reply |
| Mountain Volley | neutral | Deal 10 damage. Gain 4 Fortify. | Deal 10 damage. Deal 4 damage to each enemy with Tremor. | Iron Thrust |
| Earth Stance | neutral | Gain 6 Fortify. | Deal 7 damage to each enemy with Tremor. | Flint Gambit |
| Beacon Swipe | neutral | Deal 5 damage. Heal 2 HP. | **cut** | Lumen Lance |
| Starlight Stance | neutral | Draw 1 card. Heal 1 HP. | **cut** | solemn_stance |
| Sun Reply | neutral | Counter (an attack): gain 5 Guard and gain 1 Verdict. | Counter (an attack): gain 4 Guard and bank 1 energy for next turn. | Sworn Writ |
| Beacon Slash | neutral | Deal 12 damage. Gain 1 Verdict. | Deal 10 damage. Bank 1 energy for next turn. | Gleaming Cleave |
| Eclipse Swipe | neutral | Deal 5 damage. Apply 4 Doom. | Deal 5 damage. Apply 1 Mark. | Poisoned Blade |
| Dark Aegis | neutral | Apply 1 Mark. | Deal 3 damage to each enemy with Mark. | Smoky Ploy |
| Void Snare | neutral | When attacked: gain 5 Guard and apply 6 Doom to the attacker. | When attacked: gain 5 Guard and deal 3 damage to each enemy with Doom. | Ossuary Ward |
| Shade Rebuff | neutral | Counter (an attack): gain 4 Guard and apply 1 Mark to the attacker. | Counter (an attack): gain 4 Guard and deal 3 damage to each enemy with Doom. | Midnight Denial |
| Dark Lunge | neutral | Deal 10 damage. Apply 2 Mark. | Deal 10 damage. Deal 4 damage to each enemy with Doom. | Phantom Stab |

## v0.12 "Fewer, Better": cards cut (459)

Cut after the v0.12 card lab and play-pattern check (docs/14-V12-FEWER-BETTER.md). A card that played like another one turns into that card in old saves.

| Card | Faction | Type | Cost | Text | Why |
|---|---|---|---|---|---|
| Aetheric Gambit | aether | skill | 1 | Draw 1 card. Apply 1 Exposed. | plays like Saline Tactic |
| Aetheric Rebuke | aether | counter | 1 | Counter (an attack): gain 6 Guard and attune to the element that beats the attacker. | plays like Buffer Solution |
| Alchemical Vial | aether | attack | 2 | Deal 7 damage. Draw 1 card. | plays like Torrent Smite |
| Alkahest Focus | aether | skill | 0 | Apply 1 Exposed to ALL enemies. Chain 2: Gain 1 energy. | its gate (Chain 2:) is true under 20% of the time |
| Alkahest Smite | aether | attack | 2 | Deal 4 damage twice. Chain 2: Apply 3 Exposed. | plays like Aqua Regia |
| Calcined Posture | aether | skill | 2 | Gain 4 Guard. Draw 1 card. If you are attuned to the element that beats the target, apply 2 Exposed. | plays like Hermetic Omen |
| Distilled Gambit | aether | skill | 1 | Gain 6 Guard. | plays like Scorching Charm |
| Effervescent Parry | aether | counter | 1 | Counter (an attack): gain 4 Guard. If you played 2+ elements this turn, apply 2 Exposed to ALL enemies. | plays like Sulfuric Rebuff |
| Elemental Fume | aether | attack | 3 | Deal 13 damage. Gain 6 Guard. | plays like Furnace Barrage |
| Essential Mantle | aether | skill | 1 | Gain 4 Guard. Attune to the element that beats the target. | plays like Elemental Focus |
| Fixative Aegis | aether | skill | 0 | Attune to the element that beats the target. Chain 2: Apply 1 Exposed to ALL enemies. | its gate (Chain 2:) is true under 20% of the time |
| Fixative Deadfall | aether | reaction | 1 | When attacked: deal 6 damage to the attacker. If you are attuned to the element that beats the target, apply 1 Exposed to ALL enemies. | plays like Vitriol Mirror |
| Fixative Flourish | aether | attack | 2 | Deal 5 damage twice. If the target has Exposed, draw 1 card. | plays like Calcined Thrust |
| Fixative Shroud | aether | skill | 1 | Gain 4 Guard. If the target has Exposed, apply 1 Exposed to ALL enemies. | plays like Lunar Veil |
| Gilded-Lead Jaw | aether | reaction | 1 | When attacked: deal 6 damage to the attacker. If the attacker has Exposed, apply 1 Exposed to ALL enemies. | plays like Vitriol Mirror |
| Gilded-Lead Lash | aether | attack | 2 | Deal 9 damage. Attune to the element that beats the first enemy. If the target has Exposed, draw 1 card. | plays like Quicksilver Solution |
| Gilded-Lead Sunder | aether | attack | 0 | Deal 3 damage. If this is the first card you played this turn, apply 1 Exposed. | plays like Fixative Pierce |
| Gilded-Lead Veil | aether | skill | 1 | Attune to the element that beats the target. Chain 2: Draw 1 card. | plays like Transmute |
| Hermetic Clasp | aether | reaction | 1 | When an enemy uses a non-attack: gain 6 Guard. If you played 2+ elements this turn, draw 1 card. | plays like Second Thoughts |
| Hermetic Gambit | aether | skill | 1 | Gain 4 Guard. Chain 2: Apply 2 Exposed. | plays like Rubedo Drill |
| Hermetic Mantra | aether | skill | 2 | Gain 4 Guard. Draw 1 card. Chain 2: Apply 2 Exposed. | plays like Hermetic Omen |
| Hermetic Rebuke | aether | counter | 1 | Counter (an attack): gain 5 Guard and attune to the element that beats the first enemy. | plays like Buffer Solution |
| Lunar Strike | aether | attack | 3 | Deal 12 damage. Apply 2 Exposed. Chain 2: Gain 1 energy. | its gate (Chain 2:) is true under 20% of the time |
| Nigredo Canticle | aether | skill | 2 | Gain 6 Guard. Gain 1 energy. Chain 2: Draw 1 card. | plays like Saline Ward |
| Nigredo Gambit | aether | skill | 0 | Attune to the element that beats the target. If this is the first card you played this turn, apply 2 Exposed. | plays like Calcined Mantra |
| Nigredo Vow | aether | skill | 1 | Gain 4 Guard. If the target has Exposed, apply 2 Exposed. | plays like Rubedo Drill |
| Prismatic Salt | aether | attack | 2 | Deal 5 damage twice. Apply 2 Exposed. | plays like Aqua Regia |
| Prismatic Solution | aether | attack | 2 | Deal 9 damage. Apply 2 Exposed. | plays like Vitriol Sunder |
| Quicksilver Salt | aether | attack | 3 | Deal 13 damage. Draw 1 card. | plays like Sulfuric Jab |
| Saline Omen | aether | skill | 2 | Gain 10 Guard. If this is the first card you played this turn, draw 1 card. | plays like Quicksilver Shroud |
| Sublimated Aegis | aether | skill | 1 | Gain 4 Guard. Apply 1 Exposed. | plays like Rubedo Drill |
| Vitriol Recital | aether | skill | 1 | Gain 4 Guard. If you played 2+ elements this turn, apply 2 Exposed. | plays like Rubedo Drill |
| Volatile Dose | aether | attack | 2 | Deal 3 damage twice. Draw 1 card. | plays like Calcined Thrust |
| Volatile Powder | aether | attack | 2 | Deal 5 damage to ALL enemies. Draw 1 card. | plays like Splashing Smite |
| Alpha Stance | beast | skill | 1 | Gain 2 Guard for each companion you have. Chain 2: Summon Hawk 1. | its gate (Chain 2:) is true under 20% of the time |
| Bristled Omen | beast | skill | 1 | Gain 4 Guard. Chain 2: Summon Wolf 1. | its gate (Chain 2:) is true under 20% of the time |
| Ferocious Gash | beast | attack | 2 | Deal 4 damage twice. Chain 2: Summon Wolf 2. | its gate (Chain 2:) is true under 20% of the time |
| Ferocious Ploy | beast | skill | 1 | Gain 4 Guard. Chain 2: Apply 2 Shaken. | plays like Ursine Drill |
| Grizzled Bait | beast | reaction | 1 | When an enemy uses a non-attack: gain 5 Guard. If it is below half HP, apply 3 Shaken to it. | plays like Dawnlit Rune |
| Grizzled Ploy | beast | skill | 0 | Apply 1 Shaken. Chain 2: Summon Serpent 1. | its gate (Chain 2:) is true under 20% of the time |
| Grizzled Rune | beast | reaction | 1 | When an enemy uses a non-attack: gain 5 Guard. If there are 2+ enemies, your companions act. | plays like Nocturnal Coil |
| Grizzled Tactic | beast | skill | 1 | Gain 5 Guard. If this is the first card you played this turn, your companions act. | plays like Wildborn Ward |
| Hunting Canticle | beast | skill | 1 | Gain 4 Guard. Chain 2: Summon Bear 1. | its gate (Chain 2:) is true under 20% of the time |
| Hunting Deflection | beast | counter | 0 | Counter (an attack): gain 1 Guard for each companion you have. If you have a companion, apply 1 Shaken to the attacker. | plays like Ferocious Deflection |
| Lupine Tactic | beast | skill | 0 | Summon Wolf 1. If the target is below half HP, apply 1 Shaken. | plays like Wildborn Trick |
| Mangy Focus | beast | skill | 2 | Gain 7 Guard. If you have a companion, Summon Bear 2. | plays like Thunderhoof Charm |
| Nocturnal Feint | beast | attack | 0 | Deal 3 damage. If the target is below half HP, Summon Serpent 1. | bottom 7% of attacks at cost 0 (value 9.34/draw, played 90% of draws) |
| Nocturnal Spike | beast | attack | 2 | Deal 9 damage. Chain 2: Gain 4 Guard for each companion you have. | its gate (Chain 2:) is true under 20% of the time |
| Pack Ambush | beast + dusk | attack | 1 | Deal 5 damage. If you have a companion, apply 1 Mark. | plays like Eclipse Swipe |
| Primal Rake | beast | attack | 2 | Deal 6 damage to ALL enemies. Gain 5 Guard. | plays like Skyborn Cut |
| Prowling Maul | beast | attack | 1 | Deal 5 damage. Summon Hawk 1. | plays like Bristled Rend |
| Ravening Gash | beast | attack | 2 | Deal 10 damage. Chain 2: Summon Bear 3. | its gate (Chain 2:) is true under 20% of the time |
| Ravening Rebuff | beast | counter | 1 | Counter (a trap or Reaction): gain 4 Guard. If its owner is below half HP, Summon Wolf 2. | plays like Untamed Rebuke |
| Ravening Veil | beast | skill | 2 | Gain 7 Guard. If you have a companion, Summon Wolf 2. | plays like Scaled Omen |
| Snarling Ploy | beast | skill | 2 | Gain 7 Guard. Summon Wolf 2. | plays like Scaled Omen |
| Tusked Sunder | beast | attack | 2 | Deal 6 damage to ALL enemies. If there are 2+ enemies, Summon Serpent 2. | plays like Stalking Rush |
| Untamed Lunge | beast | attack | 1 | Deal 4 damage. Summon Bear 1. | bottom 7% of attacks at cost 1 (value 2.31/draw, played 89% of draws) |
| Ursine Riposte | beast | counter | 1 | Counter (an attack): gain 4 Guard. If there are 2+ enemies, Summon Wolf 2. | plays like Savage Reply |
| Wildborn Jab | beast | attack | 0 | Deal 3 damage. If you have a companion, apply 1 Shaken. | plays like Chilly Hammer |
| Wildborn Ploy | beast | skill | 1 | Summon Serpent 1. Chain 2: Gain 3 Guard for each companion you have. | its gate (Chain 2:) is true under 20% of the time |
| Anointed Omen | dawn | skill | 2 | Gain 7 Guard. Chain 2: Heal 5 HP. | plays like Lawful Trick |
| Anointed Rite | dawn | skill | 1 | Gain 2 Verdict. If you played a Counter this turn, draw 1 card. | plays like Faithful Shroud |
| Aurora Blow | dawn | attack | 3 | Deal 13 damage. Draw 1 card. | plays like Rippling Strike |
| Blessed Trap | dawn | reaction | 1 | When an enemy uses a non-attack: gain 4 Guard and apply 2 Shaken to it. | plays like Tidal Rune |
| Bright Charm | dawn | skill | 0 | Heal 2 HP. Chain 2: Spend all Verdict: gain 2 Guard per Verdict spent. | plays like Bright Vow |
| Bright Pierce | dawn | attack | 1 | Deal 4 damage. Heal 1 HP. If you have Guard, apply 1 Shaken. | plays like Shining Smite |
| Bright Stance | dawn | skill | 1 | Gain 4 Guard. If you played a Counter this turn, heal 4 HP. | its gate (If you played a Counter this turn,) is true under 20% of the time |
| Clarion Focus | dawn | skill | 2 | Apply 3 Shaken. Chain 2: Spend all Verdict: gain 6 Guard per Verdict spent. | its gate (Chain 2:) is true under 20% of the time |
| Clarion Posture | dawn | skill | 2 | Gain 11 Guard. If you are below half HP, gain 2 Verdict. | plays like Honest Ward |
| Clarion Thrust | dawn | attack | 0 | Deal 3 damage. If this is the first card you played this turn, apply 1 Shaken. | plays like Chilly Hammer |
| Devout Trick | dawn | skill | 0 | Heal 1 HP. If you played a Counter this turn, draw 1 card. | plays like Gilded-Sun Stance |
| Exalted Ward | dawn | skill | 1 | Gain 4 Guard. If you played a Counter this turn, draw 1 card. | plays like Second Wind |
| Faithful Barrage | dawn | attack | 1 | Deal 5 damage. If you played a Counter this turn, draw 1 card. | plays like Neap Crash |
| Faithful Pierce | dawn | attack | 2 | Deal 4 damage twice. If this is the first card you played this turn, heal 6 HP. | plays like Dawn Jab |
| Gilded-Sun Gesture | dawn | skill | 1 | Gain 4 Guard. Heal 1 HP. If you are below half HP, gain 2 Verdict. | plays like Halo |
| Gilded-Sun Net | dawn | reaction | 1 | When an enemy uses a non-attack: gain 4 Guard and gain 2 Verdict. If you played a Counter this turn, apply 2 Shaken to it. | plays like Devout Mirror |
| Gilded-Sun Reversal | dawn | counter | 1 | Counter (a trap or Reaction): gain 6 Guard. If you are below half HP, gain 1 Verdict. | plays like Sacred Ruling |
| Gleaming Seal | dawn | reaction | 1 | When attacked: deal 5 damage to the attacker and heal 2 HP. | plays like Wildflower Lure |
| Hallowed Bait | dawn | reaction | 1 | When attacked: deal 6 damage to the attacker and apply 1 Shaken to the attacker. If you have Verdict, gain 2 Verdict. | plays like Shining Trap |
| Hallowed Flourish | dawn | attack | 2 | Deal 9 damage. If you have Guard, apply 3 Shaken. | plays like Sworn Cleave |
| Haloed Strike | dawn | attack | 1 | Deal 5 damage. Apply 1 Shaken. | plays like Bright Burst |
| Honest Blow | dawn | attack | 1 | Deal 4 damage. Heal 1 HP. | plays like Lumen Lance |
| Hunter's Warrant | dawn + dusk | attack | 1 | Deal 4 damage. Apply 1 Mark. If you have Verdict, apply 1 Mark. | plays like Eclipse Swipe |
| Illumined Feint | dawn | attack | 2 | Deal 4 damage twice. Chain 2: Spend all Verdict: gain 5 Guard per Verdict spent. | its gate (Chain 2:) is true under 20% of the time |
| Illumined Net | dawn | reaction | 1 | When an enemy uses a non-attack: gain 5 Guard and spend all Verdict: gain 2 Guard per Verdict spent. | bottom 7% of reactions at cost 1 (value 2.01/draw, played 48% of draws) |
| Judicial Rite | dawn | skill | 1 | Apply 2 Shaken. | plays like Mist Aegis |
| Judicial Snare | dawn | reaction | 0 | When attacked: apply 2 Shaken to the attacker. | plays like Ebbing Snare |
| Judicial Stance | dawn | skill | 1 | Draw 1 card. Apply 1 Shaken. | plays like Moonwater Focus |
| Judicial Thrust | dawn | attack | 1 | Deal 4 damage. Gain 1 Verdict. | plays like Hallowed Cleave |
| Just Pit | dawn | reaction | 1 | When attacked: gain 5 Guard. If you played a Counter this turn, heal 5 HP. | plays like Noble Net |
| Lion's Verdict | dawn + beast | attack | 1 | Deal 6 damage. If you have a companion, gain 1 Verdict. | plays like Hallowed Cleave |
| Lucent Cut | dawn | attack | 2 | Deal 5 damage to ALL enemies. Gain 1 Verdict. Chain 2: Heal 4 HP. | its gate (Chain 2:) is true under 20% of the time |
| Lucent Gash | dawn | attack | 2 | Deal 6 damage twice. If you have Verdict, gain 1 Verdict. | plays like Judicial Rend |
| Lucent Return | dawn | counter | 1 | Counter (a trap or Reaction): gain 4 Guard. If you have Verdict, gain 2 Verdict. | plays like Sacred Ruling |
| Merciful Gash | dawn | attack | 2 | Deal 3 damage to ALL enemies. Draw 1 card. Chain 2: Gain 2 Verdict. | plays like Hallowed Smite |
| Merciful Rite | dawn | skill | 2 | Gain 6 Guard. Draw 1 card. If this is the first card you played this turn, gain 1 Verdict. | plays like Haloed Sigil |
| Morning Rune | dawn | reaction | 1 | When attacked: gain 4 Guard and apply 1 Shaken to the attacker. | plays like Coral Glyph |
| Morning Ward | dawn | skill | 1 | Gain 4 Guard. Apply 1 Shaken. | plays like Noble Gesture |
| Noble Catch | dawn | reaction | 1 | When an enemy uses a non-attack: gain 5 Guard and apply 1 Shaken to it. If you are below half HP, gain 2 Verdict. | plays like Devout Mirror |
| Noble Shroud | dawn | skill | 2 | Gain 7 Guard. Apply 2 Shaken. If you played a Counter this turn, gain 1 Verdict. | plays like Temple Canticle |
| Noble Spring | dawn | reaction | 1 | When attacked: gain 6 Guard. If you played a Counter this turn, draw 1 card. | plays like Maelstrom Tripwire |
| Paladin Pit | dawn | reaction | 1 | When an enemy trap activates: apply 3 Shaken to its owner. If you have Guard, spend all Verdict: gain 5 Guard per Verdict spent. | bottom 7% of reactions at cost 1 (value 0.23/draw, played 89% of draws) |
| Paladin Snag | dawn | reaction | 1 | When an enemy uses a non-attack: gain 3 Guard and gain 2 Verdict. | plays like Glowing Jaw |
| Radiant Reagent | dawn + aether | attack | 1 | Deal 6 damage. If you are attuned to the element that beats the target, gain 1 Verdict. | plays like Lion's Verdict |
| Radiant Rend | dawn | attack | 2 | Deal 5 damage twice. Gain 1 Verdict. Heal 3 HP. | plays like Illumined Barrage |
| Radiant Shroud | dawn | skill | 0 | Apply 1 Shaken. | plays like Ebbing Rite |
| Sacred Barrage | dawn | attack | 2 | Deal 5 damage to ALL enemies. Gain 5 Guard. | plays like Current Barrage |
| Shining Aegis | dawn | skill | 1 | Gain 1 Verdict. If you have Guard, apply 3 Shaken. | plays like Just Rite |
| Shining Ram | dawn | attack | 2 | Deal 4 damage to ALL enemies. Spend all Verdict: gain 2 Guard per Verdict spent. If you have Guard, draw 1 card. | plays like Paladin Ram |
| Shining Sigil | dawn | skill | 1 | Heal 3 HP. If this is the first card you played this turn, gain 2 Verdict. | plays like Sacred Grove |
| Solemn Stance | dawn | skill | 1 | Draw 1 card. Heal 1 HP. | plays like Leaf Sigil |
| Sunlit Slash | dawn | attack | 2 | Deal 4 damage twice. Apply 2 Shaken. | plays like Rainy Ram |
| Sunlit Tripwire | dawn | reaction | 1 | When attacked: deal 5 damage to the attacker and apply 1 Shaken to the attacker. | plays like Saltwater Trap |
| Temple Barrage | dawn | attack | 2 | Deal 7 damage. Heal 2 HP. Chain 2: Spend all Verdict: gain 4 Guard per Verdict spent. | its gate (Chain 2:) is true under 20% of the time |
| Thunder Verdict | dawn + storm | attack | 1 | Deal 5 damage. If you have Verdict, apply 4 Shock. | plays like Stormcloud Barrage |
| Vigilant Trap | dawn | reaction | 1 | When an enemy trap activates: deal 6 damage to its owner and gain 1 Verdict. | bottom 7% of reactions at cost 1 (value 2.08/draw, played 84% of draws) |
| Assassin Focus | dusk | skill | 2 | Gain 6 Guard. Deal 3 damage to each enemy with Mark. Chain 2: Apply 3 Shaken. | its gate (Chain 2:) is true under 20% of the time |
| Assassin Ploy | dusk | skill | 1 | Gain 4 Guard. Chain 2: Apply 1 Mark to ALL enemies. | plays like Cloak and Dagger |
| Assassin Spike | dusk | attack | 2 | Deal 9 damage. If you hold 3 or fewer other cards, apply 14 Doom. | plays like Annihilating Rend |
| Blackout Lunge | dusk | attack | 2 | Deal 12 damage. Chain 2: Gain 1 Veil. | plays like Dusk Sting |
| Blackout Slash | dusk | attack | 2 | Deal 9 damage. If you hold 3 or fewer other cards, apply 2 Mark to ALL enemies. | plays like Twilight Flurry |
| Dim Strike | dusk | attack | 0 | Deal 3 damage. Chain 2: Deal 2 damage to each enemy with Mark. | plays like Penumbral Cut |
| Eventide Pit | dusk | reaction | 1 | When attacked: gain 5 Guard. If the attacker is below half HP, apply 2 Mark to the attacker. | plays like Sly Deadfall |
| Faceless Feint | dusk | attack | 0 | Deal 3 damage. Chain 2: Apply 1 Mark. | plays like Inky Slash |
| Ghostly Refusal | dusk | counter | 1 | Counter (a trap or Reaction): gain 4 Guard. If its owner has Mark, apply 2 Mark to its owner. | plays like Umbral Retort |
| Hidden Canticle | dusk | skill | 1 | Apply 1 Mark to ALL enemies. | bottom 7% of skills at cost 1 (value 2.76/draw, played 60% of draws) |
| Hidden Knife | dusk | attack | 3 | Deal 15 damage. Apply 2 Mark. | bottom 7% of attacks at cost 3 (value 14.75/draw, played 71% of draws) |
| Hidden Kunai | dusk | attack | 1 | Deal 4 damage. Apply 1 Mark to ALL enemies. | bottom 7% of attacks at cost 1 (value 10.66/draw, played 78% of draws) |
| Hidden Tripwire | dusk | reaction | 1 | When attacked: deal 5 damage to the attacker and apply 1 Mark to the attacker. | plays like Duskfall Deadfall |
| Inky Trick | dusk | skill | 2 | Gain 6 Guard. Apply 2 Shaken. If the target is below half HP, gain 1 Veil. | plays like Crow Canticle |
| Nightfall Cut | dusk | attack | 2 | Deal 9 damage. If you have Veil, apply 3 Mark. | plays like Phantom Stab |
| Nightfall Gambit | dusk | skill | 2 | Gain 8 Guard. If the target is below half HP, apply 3 Mark to ALL enemies. | plays like Whispering Ploy |
| Nightfall Lure | dusk | reaction | 1 | When attacked: gain 5 Guard. If the attacker is below half HP, apply 3 Shaken to the attacker. | plays like Hidden Pit |
| Obscure Recital | dusk | skill | 1 | Apply 1 Mark to ALL enemies. If you have Veil, apply 9 Doom. | plays like Penumbral Ritual |
| Raven Canticle | dusk | skill | 0 | Apply 1 Mark. Chain 2: Deal 3 damage to each enemy with Mark. | plays like Shadowy Stance |
| Silent Mirror | dusk | reaction | 1 | When attacked: gain 4 Guard and apply 5 Doom to the attacker. | plays like Ossuary Ward |
| Sly Charm | dusk | skill | 2 | Gain 8 Guard. Chain 2: Gain 1 Veil. | plays like Smoky Gambit |
| Twilight Blade | dusk | attack | 3 | Deal 13 damage. Apply 1 Mark to ALL enemies. | plays like Dim Lunge |
| Unseen Jab | dusk | attack | 2 | Deal 7 damage. Gain 1 Veil. If the target has Mark, apply 2 Shaken. | plays like Lurking Jab |
| Blistering Rend | ember | attack | 2 | Deal 9 damage. Chain 2: Apply 3 Burn to ALL enemies. | plays like Wildfire |
| Bonfire Onslaught | ember | attack | 3 | Deal 9 damage. Double the target's Burn. Chain 2: Deal 7 damage to each enemy with Burn. | its gate (Chain 2:) is true under 20% of the time |
| Branded Mark | ember + dusk | attack | 1 | Deal 4 damage. Apply 1 Mark. If the target has Burn, apply 1 Mark. | plays like Eclipse Swipe |
| Brimstone Burst | ember | attack | 2 | Deal 4 damage to ALL enemies. Apply 1 Burn to ALL enemies. Chain 2: Gain 1 Edge. | its gate (Chain 2:) is true under 20% of the time |
| Brimstone Return | ember | counter | 1 | Counter (an attack): gain 4 Guard. If the attacker has Burn, apply 3 Burn to the attacker. | plays like Smouldering Rebuff |
| Cinder Crash | ember | attack | 1 | Deal 4 damage. Apply 1 Burn. | plays like Scorched Pack |
| Cinder Mirror | ember | reaction | 1 | When an enemy trap activates: deal 5 damage to its owner and apply 2 Burn to ALL enemies. | plays like Stolen Spark |
| Coal Posture | ember | skill | 0 | Apply 1 Burn. If this is the first card you played this turn, apply 1 Exposed. | plays like Sulphur Canticle |
| Firebrand Clasp | ember | reaction | 1 | When attacked: gain 5 Guard. If the attacker is below half HP, apply 4 Burn to the attacker. | plays like Cinder Cloak |
| Flashpoint Tripwire | ember | reaction | 1 | When an enemy trap activates: deal 4 damage to its owner and apply 1 Exposed to its owner. If you are below half HP, gain 1 Edge. | bottom 7% of reactions at cost 1 (value 3.25/draw, played 60% of draws) |
| Flashpoint Vow | ember | skill | 2 | Gain 1 energy. Chain 2: Apply 5 Burn to ALL enemies. | plays like Firebrand Gambit |
| Hearth Aegis | ember | skill | 1 | Gain 4 Guard. Apply 1 Exposed. Chain 2: Deal 3 damage to each enemy with Burn. | its gate (Chain 2:) is true under 20% of the time |
| Ignited Vow | ember | skill | 2 | Gain 4 Guard. Double the target's Burn. If you played 2+ other cards this turn, apply 3 Burn. | plays like Bonfire Aegis |
| Incandescent Parry | ember | counter | 1 | Counter (a non-attack): gain 5 Guard. If it has Burn, deal 4 damage to each enemy with Burn. | plays like Flashpoint Deflection |
| Kindled Coil | ember | reaction | 1 | When an enemy trap activates: deal 5 damage to its owner and apply 3 Burn to its owner. | bottom 7% of reactions at cost 1 (value -0.01/draw, played 71% of draws) |
| Kindled Smite | ember | attack | 2 | Deal 5 damage to ALL enemies. Gain 5 Guard. | plays like Night Burst |
| Lava Mirror | ember | reaction | 1 | When attacked: gain 5 Guard. If you are below half HP, apply 3 Burn to ALL enemies. | plays like Smouldering Trap |
| Lava Recital | ember | skill | 0 | Deal 2 damage to each enemy with Burn. If you have Edge, apply 1 Exposed. | its gate (If you have Edge,) is true under 20% of the time |
| Lava Smite | ember | attack | 1 | Deal 4 damage. Chain 2: Apply 2 Exposed. | its gate (Chain 2:) is true under 20% of the time |
| Lava Veil | ember | skill | 1 | Apply 2 Exposed. If this is the first card you played this turn, double the target's Burn. | plays like Lava Charm |
| Pyre Tripwire | ember | reaction | 1 | When attacked: gain 5 Guard and deal 3 damage to each enemy with Burn. | plays like Kindle Rune |
| Pyroclast Hook | ember | attack | 3 | Deal 13 damage. If you played 2+ other cards this turn, apply 8 Burn. | plays like Fire Lunge |
| Pyroclast Stance | ember | skill | 2 | Gain 4 Guard. Double the target's Burn. If the target is below half HP, apply 3 Burn. | plays like Bonfire Aegis |
| Scald Spring | ember | reaction | 1 | When attacked: gain 8 Guard and lose 3 HP. If the attacker has Burn, deal 7 damage to each enemy with Burn. | plays like Flashpoint Rune |
| Searing Glyph | ember | reaction | 1 | When attacked: deal 5 damage to the attacker and apply 2 Burn to the attacker. | plays like Blaze Ward |
| Searing Lash | ember | attack | 2 | Deal 9 damage. Apply 2 Burn to ALL enemies. | plays like Wildfire |
| Tinder Drill | ember | skill | 2 | Gain 12 Guard. Lose 3 HP. If you have Edge, gain 1 Edge. | its gate (If you have Edge,) is true under 20% of the time |
| Tinder Gambit | ember | skill | 2 | Gain 6 Guard. Apply 1 Exposed. If you have Edge, apply 4 Burn. | its gate (If you have Edge,) is true under 20% of the time |
| Volcanic Smite | ember | attack | 0 | Deal 3 damage. If you played 2+ other cards this turn, apply 1 Burn to ALL enemies. | plays like Hearth Strike |
| Volcanic Tactic | ember | skill | 2 | Gain 7 Guard. If you have Edge, apply 4 Burn to ALL enemies. | plays like Pyroclast Focus |
| Baroque Focus | gilt | skill | 2 | Gain 6 Guard. ☀ Apply 3 Shaken. ☾ Draw 1 card. Flip your Fate Coin. | plays like Emerald Sigil |
| Bullion Ritual | gilt | skill | 2 | Gain 7 Guard. If your Ante is 3+, apply 3 Shaken. | plays like Iced Omen |
| Bullion Sunder | gilt | attack | 2 | Deal 7 damage. Cash in your Ante: deal 2 damage per Ante. Chain 2: Draw 1 card. | its gate (Chain 2:) is true under 20% of the time |
| Casino Canticle | gilt | skill | 2 | Gain 1 energy. If this is the first card you played this turn, draw 1 card. | plays like Estuary Omen |
| Casino Coil | gilt | reaction | 1 | When attacked: gain 5 Guard. If your Ante is 3+, raise your Ante by 4. | plays like Ducat Seal |
| Casino Rite | gilt | skill | 1 | Apply 2 Shaken. If your Ante is 3+, draw 1 card. | plays like Marked Posture |
| Counterfeit Focus | gilt | skill | 1 | Draw 1 card. Raise your Ante by 1. | plays like Null Dividend |
| Counterfeit Rebuke | gilt | counter | 1 | Counter (an attack): gain 4 Guard and raise your Ante by 3. | plays like Bail Bond |
| Crowned Deal | gilt | attack | 3 | ☀ deal 15 damage. ☾ draw 1 card. Flip. | plays like Rippling Strike |
| Crowned Raise | gilt | attack | 2 | Deal 5 damage to ALL enemies. Draw 1 card. | plays like Splashing Smite |
| Dealer Barrage | gilt | attack | 1 | Deal 4 damage. If your Ante is 3+, draw 1 card. | plays like Neap Crash |
| Dealer Canticle | gilt | skill | 2 | Gain 6 Guard. ☀ Apply 3 Shaken. ☾ Gain 1 energy. Flip your Fate Coin. | plays like Opulent Tactic |
| Dealer Snare | gilt | reaction | 1 | When attacked: gain 5 Guard. If your Ante is 3+, apply 2 Shaken to the attacker. | plays like Coral Glyph |
| Fortune Flip | gilt | attack | 2 | Deal 5 damage twice. Gain 4 Guard. | plays like Brine Crash |
| Gilt-Edged Drill | gilt | skill | 1 | ☀ Draw 1 card. ☾ Bank 1 energy for next turn. Flip your Fate Coin. | plays like Surge |
| Gilt-Edged Hammer | gilt | attack | 0 | Deal 3 damage. Chain 2: Cash in your Ante: deal 1 damage per Ante. | its gate (Chain 2:) is true under 20% of the time |
| Gilt-Edged Smite | gilt | attack | 2 | Deal 4 damage twice. ☀ Draw 1 card. ☾ Raise your Ante by 6. Flip your Fate Coin. | plays like Ducat Bribe |
| Gilt-Edged Snare | gilt | reaction | 1 | When attacked: deal 3 damage to the attacker and bank 1 energy for next turn. If your Ante is 3+, raise your Ante by 2. | plays like Raffle Bait |
| Highroller Lash | gilt | attack | 2 | Deal 9 damage. Apply 2 Shaken. Chain 2: Gain 1 energy. | its gate (Chain 2:) is true under 20% of the time |
| Marked Jab | gilt | attack | 2 | Deal 7 damage. Raise your Ante by 3. If this is the first card you played this turn, apply 3 Shaken. | plays like Lucre Swipe |
| Raffle Canticle | gilt | skill | 0 | Cash in your Ante: deal 1 damage per Ante. Chain 2: Bank 1 energy for next turn. | plays like Velvet Gambit |
| Silver Clasp | gilt | reaction | 1 | When an enemy trap activates: ☀ Apply 3 Shaken to its owner. ☾ Cash in your Ante: deal 5 damage per Ante. Flip your Fate Coin. | plays like Fortunate Jaw |
| Silver Tactic | gilt | skill | 1 | ☀ Draw 1 card. ☾ Gain 1 energy. Flip your Fate Coin. | plays like Highroller Mantle |
| Wagered Stance | gilt | skill | 2 | Gain 7 Guard. Draw 1 card. | plays like Silver Mantra |
| Beveled Shroud | glass | skill | 2 | Deal 3 damage for each card in your hand. If you have a stolen trap set, add 2 Glints to your hand. | its gate (If you have a stolen trap set,) is true under 20% of the time |
| Beveled Sunder | glass | attack | 1 | Deal 6 damage. If this is the first card you played this turn, add a Glint to your hand. | plays like Glass Gavel |
| Diamond Strike | glass | attack | 1 | Deal 5 damage. If you hold 3 or fewer other cards, apply 2 Exposed. | plays like Rend |
| Diamond Sunder | glass | attack | 2 | Deal 9 damage. Chain 2: Apply 3 Exposed. | its gate (Chain 2:) is true under 20% of the time |
| Filched Gesture | glass | skill | 2 | Gain 9 Guard. If this is the first card you played this turn, Steal 1. | plays like Crystal Ward |
| Filched Rend | glass | attack | 2 | Deal 5 damage twice. If you hold 3 or fewer other cards, Steal 1. | plays like Lens Barrage |
| Glass Crash | glass | attack | 3 | Deal 18 damage. Add a Glint to your hand. | plays like Window Jab |
| Kaleido Charm | glass | skill | 1 | Gain 3 Guard. Chain 2: Steal 1. | its gate (Chain 2:) is true under 20% of the time |
| Mirror Strike | glass | attack | 2 | Deal 4 damage to ALL enemies. Draw 1 card. | plays like Hourglass Burst |
| Mosaic Crash | glass | attack | 2 | Deal 9 damage. Steal 1. Chain 2: Draw 1 card. | its gate (Chain 2:) is true under 20% of the time |
| Mosaic Rebuff | glass | counter | 2 | Counter (anything an enemy does): draw 1 card. If you have a stolen trap set, add 2 Glints to your hand. | plays like Filched Reversal |
| Mosaic Smite | glass | attack | 3 | Deal 20 damage. Chain 2: Add a Glint to your hand. | plays like Window Jab |
| Opal Uppercut | glass | attack | 2 | Deal 8 damage to ALL enemies. If this is the first card you played this turn, Steal 1. | plays like Smash and Grab |
| Pane Denial | glass | counter | 0 | Counter (an attack): gain 4 Guard. | bottom 7% of counters at cost 0 (value -0.72/draw, played 57% of draws) |
| Pilfered Feint | glass | attack | 2 | Deal 5 damage twice. If you hold a Glint, Steal 1. | plays like Lens Barrage |
| Pilfered Jab | glass | attack | 2 | Deal 7 damage to ALL enemies. If you have a stolen trap set, draw 1 card. | plays like Hourglass Burst |
| Quartz Focus | glass | skill | 2 | Gain 10 Guard. If you hold 3 or fewer other cards, Steal 1. | plays like Crystal Ward |
| Quartz Hook | glass | attack | 2 | Deal 6 damage to ALL enemies. If you hold 3 or fewer other cards, draw 1 card. | plays like Hourglass Burst |
| Quartz Rebuke | glass | counter | 1 | Counter (a trap or Reaction): gain 5 Guard. If you have 2+ Reactions set, deal 2 damage to its owner for each card in your hand. | bottom 7% of counters at cost 1 (value 0.21/draw, played 22% of draws) |
| Quartz Refusal | glass | counter | 1 | Counter (an attack): gain 4 Guard. If you have 2+ Reactions set, add 2 Glints to your hand. | plays like Prism Parry |
| Quartz Trance | glass | skill | 1 | Deal 1 damage for each card in your hand. If you have a stolen trap set, apply 3 Exposed. | plays like Opal Drill |
| Splinter Rend | glass | attack | 2 | Deal 5 damage to ALL enemies. Steal 1. | plays like Smash and Grab |
| Stained Tactic | glass | skill | 0 | Apply 1 Exposed. Chain 2: Add 2 Glints to your hand. | plays like Stained Mantra |
| Thieving Seal | glass | reaction | 1 | When attacked: gain 4 Guard and add a Glint to your hand. | plays like Filched Mirror |
| Thieving Thrust | glass | attack | 2 | Deal 3 damage twice. Draw 1 card. Add a Glint to your hand. | plays like Etched Hook |
| Tinted Gambit | glass | skill | 1 | Gain 4 Guard. Chain 2: Add a Glint to your hand. | plays like Etched Recital |
| Tinted Sigil | glass | skill | 1 | Gain 3 Guard. If this is the first card you played this turn, draw 1 card. | plays like Filched Ritual |
| Window Charm | glass | skill | 1 | Gain 4 Guard. If you have 2+ Reactions set, add a Glint to your hand. | plays like Etched Recital |
| Window Cut | glass | attack | 2 | Deal 6 damage to ALL enemies. If you hold 3 or fewer other cards, add 2 Glints to your hand. | plays like Magpie Rend |
| Window Hammer | glass | attack | 2 | Deal 4 damage twice. Apply 2 Exposed. Chain 2: Add 2 Glints to your hand. | its gate (Chain 2:) is true under 20% of the time |
| Window Pierce | glass | attack | 2 | Deal 5 damage twice. If this is the first card you played this turn, Steal 1. | plays like Lens Barrage |
| Banshee Posture | grave | skill | 2 | Gain 7 Guard. Heal 3 HP. If you are below half HP, Bury 2. | plays like Bone Shroud |
| Banshee Smite | grave | attack | 2 | Deal 13 damage. Bury 2. If you Exhumed this turn, Exhume 1. | plays like Marrow Feint |
| Bone Pit | grave | reaction | 0 | When attacked: heal 3 HP. | plays like Barbed Ambush |
| Carrion Feast | grave + beast | attack | 1 | Deal 5 damage. If your Crypt holds 3+ cards, heal 3 HP. | plays like Tomb Cleave |
| Catacomb Pierce | grave | attack | 1 | Deal 4 damage. If you have 2+ Reactions set, heal 3 HP. | plays like Tomb Cleave |
| Catacomb Rebuke | grave | counter | 1 | Counter (a non-attack): gain 4 Guard and apply 1 Shaken to it. If you are below half HP, deal 3 damage to a random enemy for each card in your Crypt. | plays like Lantern Rebuttal |
| Crypt Coil | grave | reaction | 1 | When an enemy trap activates: deal 5 damage to its owner and gain 4 Guard. | plays like Bramble Coil |
| Dirge Answer | grave | counter | 1 | Counter (an attack): gain 5 Guard. If you have 2+ Reactions set, Bury 4. | plays like Bone Reply |
| Dirge Jaw | grave | reaction | 1 | When an enemy uses a non-attack: gain 4 Guard and apply 1 Shaken to it. If you have 2+ Reactions set, deal 2 damage to a random enemy for each card in your Crypt. | bottom 7% of reactions at cost 1 (value 0.83/draw, played 47% of draws) |
| Dirge Retaliation | grave | counter | 1 | Counter (an attack): gain 6 Guard. If your Crypt holds 3+ cards, Bury 2. | plays like Bone Reply |
| Elegy Pierce | grave | attack | 2 | Deal 4 damage twice. If you Exhumed this turn, heal 7 HP. | plays like Headstone Lash |
| Elegy Retort | grave | counter | 1 | Counter (a non-attack): gain 5 Guard. If you are below half HP, Bury 4. | plays like Marrow Answer |
| Funeral Snare | grave | reaction | 0 | When attacked: gain 4 Guard. | plays like Harden |
| Funeral Strike | grave | attack | 2 | Deal 8 damage. Bury 2. Exhume 1. | plays like Marrow Feint |
| Gallows Hook | grave | attack | 2 | Deal 10 damage. If you have 2+ Reactions set, Exhume 1. | plays like Epitaph |
| Gallows Rejoinder | grave | counter | 1 | Counter (an attack): gain 4 Guard. If your Crypt holds 3+ cards, deal 2 damage to a random enemy for each card in your Crypt. | bottom 7% of counters at cost 1 (value -2.15/draw, played 29% of draws) |
| Gallows Thrust | grave | attack | 0 | Deal 3 damage. If you have 2+ Reactions set, apply 1 Shaken. | plays like Gnarled Hook |
| Ghoul Lash | grave | attack | 2 | Deal 12 damage. If your Crypt holds 3+ cards, Bury 2. | plays like Headstone Volley |
| Ghoul Sweep | grave | attack | 3 | Deal 13 damage. Heal 4 HP. Chain 2: Bury 2. | plays like Elegy Swipe |
| Gravebound Crash | grave | attack | 1 | Deal 2 damage to a random enemy 3 times. Heal 1 HP. | plays like Rooted Lash |
| Gravedigger's Knife | grave + dusk | attack | 1 | Deal 5 damage. If your Crypt holds 3+ cards, apply 2 Mark. | plays like Eclipse Swipe |
| Lantern Drill | grave | skill | 1 | Apply 1 Shaken. If your Crypt holds 3+ cards, Exhume 1. | plays like Revenant Focus |
| Lantern Lunge | grave | attack | 2 | Deal 4 damage to ALL enemies. Exhume 1. If your Crypt holds 3+ cards, heal 4 HP. | plays like Catacomb Cut |
| Lich Blow | grave | attack | 2 | Deal 5 damage to ALL enemies. Heal 3 HP. | plays like Verdant Cleave |
| Lich Cut | grave | attack | 2 | Deal 5 damage twice. Bury 2. | plays like Skeletal Spike |
| Necro Coil | grave | reaction | 1 | When an enemy uses a non-attack: gain 5 Guard. If you are below half HP, apply 3 Shaken to it. | plays like Dawnlit Rune |
| Necro Rend | grave | attack | 2 | Deal 11 damage. If you are below half HP, Exhume 1. | plays like Epitaph |
| Pale Slash | grave | attack | 3 | Deal 13 damage. Heal 4 HP. | plays like Halo Cut |
| Requiem Ritual | grave | skill | 2 | Gain 8 Guard. Heal 3 HP. If you Exhumed this turn, Bury 4. | plays like Bone Shroud |
| Requiem Sweep | grave | attack | 2 | Deal 7 damage. Exhume 1. Chain 2: Bury 2. | plays like Marrow Feint |
| Restless Blow | grave | attack | 1 | Deal 2 damage to a random enemy 3 times. Bury 2. | plays like Catacomb Crash |
| Restless Pit | grave | reaction | 1 | When attacked: gain 5 Guard and heal 2 HP. | plays like Nettle Mirror |
| Revenant Clasp | grave | reaction | 0 | When attacked: deal 2 damage to a random enemy for each card in your Crypt. If you have 2+ Reactions set, apply 2 Shaken to the attacker. | plays like Banshee Lure |
| Revenant Crash | grave | attack | 2 | Deal 4 damage twice. If your Crypt holds 3+ cards, apply 3 Shaken. | plays like Rainy Ram |
| Revenant Sunder | grave | attack | 1 | Deal 3 damage. Bury 2. Chain 2: Heal 2 HP. | its gate (Chain 2:) is true under 20% of the time |
| Shade Ritual | grave | skill | 0 | Apply 1 Shaken. If you are below half HP, Exhume 1. | plays like Catacomb Tactic |
| Shade Shroud | grave | skill | 1 | Gain 5 Guard. Chain 2: Bury 2. | plays like Gravewalker |
| Shade Spring | grave | reaction | 1 | When an enemy trap activates: apply 2 Shaken to its owner. If you have 2+ Reactions set, deal 3 damage to a random enemy for each card in your Crypt. | plays like Vigil Snare |
| Shroud Mirror | grave | reaction | 1 | When an enemy uses a non-attack: gain 4 Guard and heal 2 HP. | plays like Starlight Mirror |
| Skeletal Rite | grave | skill | 1 | Gain 4 Guard. If you Exhumed this turn, Exhume 1. | plays like Skeletal Trick |
| Vigil Lunge | grave | attack | 3 | Deal 13 damage. Exhume 1. If you have 2+ Reactions set, Bury 4. | plays like Shroud Slash |
| Vigil Mantle | grave | skill | 0 | Deal 1 damage to a random enemy for each card in your Crypt. If you are below half HP, Exhume 1. | plays like Revenant Posture |
| Wraith Gambit | grave | skill | 1 | Gain 4 Guard. If you have 2+ Reactions set, Bury 4. | plays like Gravewalker |
| Wraith Rebuttal | grave | counter | 1 | Counter (an attack): gain 6 Guard. If you are below half HP, Bury 4. | plays like Bone Reply |
| Wraith Slash | grave | attack | 3 | Deal 13 damage. Heal 4 HP. If you Exhumed this turn, Bury 2. | plays like Elegy Swipe |
| Bonfire Shroud | neutral | skill | 0 | Apply 1 Exposed to ALL enemies. | bottom 7% of skills at cost 0 (value 3.25/draw, played 55% of draws) |
| Brooking Ploy | neutral | skill | 1 | Gain 4 Guard. Chain 2: Apply 2 Shaken. | its gate (Chain 2:) is true under 20% of the time |
| Brooking Strike | neutral | attack | 3 | Deal 13 damage. If you are attuned to the element that beats the target, deal 10 damage to each enemy with Shaken. | plays like Monsoon Volley |
| Brooking Trick | neutral | skill | 1 | Deal 4 damage to each enemy with Shaken. Chain 2: Draw 1 card. | plays like Brooking Drill |
| Coldsnap Tactic | neutral | skill | 2 | Gain 7 Guard. If you are attuned to the element that beats the target, apply 3 Shaken. | plays like Iced Omen |
| Flicker Retort | neutral | counter | 1 | Counter (an attack): gain 3 Guard. If the attacker has Burn, gain 1 Edge. | bottom 7% of counters at cost 1 (value 0.22/draw, played 31% of draws) |
| Greenleaf Denial | neutral | counter | 1 | Counter (a non-attack): gain 4 Guard. If you are below half HP, heal 4 HP. | plays like Glowing Veto |
| Iced Volley | neutral | attack | 0 | Deal 3 damage. If you are attuned to the element that beats the target, apply 1 Shaken. | plays like Chilly Hammer |
| Landslide Answer | neutral | counter | 1 | Counter (an attack): gain 4 Guard and deal 3 damage to each enemy with Tremor. | bottom 7% of counters at cost 1 (value 1.82/draw, played 31% of draws) |
| Murky Blow | neutral | attack | 3 | Deal 14 damage. If the target has Doom, apply 18 Doom. | plays like Shade Lunge |
| Rainy Recital | neutral | skill | 0 | Deal 2 damage to each enemy with Shaken. Chain 2: Apply 1 Shaken. | its gate (Chain 2:) is true under 20% of the time |
| Rainy Tactic | neutral | skill | 2 | Gain 7 Guard. If you are attuned to the element that beats the target, apply 3 Shaken. | plays like Iced Omen |
| Root Swipe | neutral | attack | 3 | Deal 13 damage. Heal 4 HP. | plays like Halo Cut |
| Splashing Smite | neutral | attack | 2 | Deal 7 damage to ALL enemies. Chain 2: Draw 1 card. | its gate (Chain 2:) is true under 20% of the time |
| Sprouting Burst | neutral | attack | 1 | Deal 4 damage. If you are attuned to the element that beats the target, heal 3 HP. | plays like Vine Slash |
| Sprouting Return | neutral | counter | 1 | Counter (a non-attack): gain 5 Guard. If there are 2+ enemies, heal 4 HP. | plays like Glowing Veto |
| Zappy Smite | neutral | attack | 2 | Deal 10 damage. If you played 2+ other cards this turn, gain 5 Charge. | plays like Bolt Rend |
| Arctic Reply | rime | counter | 1 | Counter (a trap or Reaction): gain 4 Guard and apply 1 Shaken to its owner. | plays like Drenching Rebuttal |
| Avalanche Comeback | rime | counter | 1 | Counter (a trap or Reaction): gain 4 Guard. If there are 2+ enemies, deal 5 damage to each enemy with Chill. | plays like Shiver Reply |
| Avalanche Refusal | rime | counter | 0 | Counter (a trap or Reaction): next turn, gain 4 Guard. If its owner has Chill, apply 1 Shaken to its owner. | bottom 7% of counters at cost 0 (value 0.68/draw, played 54% of draws) |
| Avalanche Reply | rime | counter | 1 | Counter (a trap or Reaction): gain 4 Guard. If its owner is below half HP, apply 5 Chill to its owner. | bottom 7% of counters at cost 1 (value 2.73/draw, played 29% of draws) |
| Floe Pierce | rime | attack | 2 | Deal 3 damage twice. Deal 3 damage to each enemy with Chill. If there are 2+ enemies, apply 5 Chill. | plays like Ice-Bound Smite |
| Frigid Smite | rime | attack | 3 | Deal 13 damage. Chain 2: Next turn, gain 13 Guard. | its gate (Chain 2:) is true under 20% of the time |
| Frostbitten Trick | rime | skill | 1 | Draw 1 card. Apply 1 Chill. | plays like Cold Snap |
| Glacier Blow | rime | attack | 1 | Deal 5 damage. If the target is Frozen, double the target's Chill. | bottom 7% of attacks at cost 1 (value 10.64/draw, played 59% of draws) |
| Glacier Gash | rime | attack | 1 | Deal 4 damage. If you have Guard, apply 3 Chill. | plays like Arctic Slash |
| Glacier Mirror | rime | reaction | 1 | When an enemy trap activates: deal 7 damage to its owner. If its owner is below half HP, apply 3 Shaken to its owner. | plays like Icebound Glyph |
| Glacier Trance | rime | skill | 1 | Deal 4 damage to each enemy with Chill. Chain 2: Apply 2 Chill to ALL enemies. | its gate (Chain 2:) is true under 20% of the time |
| Hoarfrost Refusal | rime | counter | 0 | Counter (an attack): deal 3 damage to each enemy with Chill. | bottom 7% of counters at cost 0 (value 4.02/draw, played 55% of draws) |
| Ice-Bound Crash | rime | attack | 2 | Deal 7 damage. Next turn, gain 4 Guard. Chain 2: Apply 3 Shaken. | plays like Rimed Flourish |
| Ice-Bound Omen | rime | skill | 1 | Gain 4 Guard. If the target is below half HP, apply 2 Shaken. | plays like Silverfrost Ritual |
| Northern Comeback | rime | counter | 1 | Counter (an attack): gain 4 Guard. If there are 2+ enemies, apply 3 Chill to ALL enemies. | plays like Hailstone Comeback |
| Northern Sigil | rime | skill | 1 | Gain 4 Guard. Deal 2 damage to each enemy with Chill. Chain 2: Apply 3 Chill. | its gate (Chain 2:) is true under 20% of the time |
| Northern Sunder | rime | attack | 3 | Deal 10 damage. Deal 5 damage to each enemy with Chill. Chain 2: Next turn, gain 10 Guard. | its gate (Chain 2:) is true under 20% of the time |
| Numbing Pit | rime | reaction | 0 | When attacked: apply 2 Chill to ALL enemies. | bottom 7% of reactions at cost 0 (value 0.09/draw, played 80% of draws) |
| Permafrost Ambush | rime | reaction | 0 | When attacked: apply 3 Chill to the attacker. | bottom 7% of reactions at cost 0 (value 3.32/draw, played 80% of draws) |
| Polar Denial | rime | counter | 1 | Counter (an attack): gain 4 Guard and apply 3 Chill to the attacker. | plays like Ice-Bound Veto |
| Powder Comeback | rime | counter | 0 | Counter (an attack): apply 1 Shaken to the attacker. If the attacker is Frozen, double the attacker's Chill. | plays like Ice-Bound Deflection |
| Powder Spring | rime | reaction | 1 | When an enemy trap activates: apply 3 Chill to ALL enemies. If there are 2+ enemies, apply 3 Shaken to its owner. | plays like Avalanche Tripwire |
| Powder Thrust | rime | attack | 2 | Deal 4 damage twice. If the target is below half HP, next turn, gain 11 Guard. | plays like Rambling Lash |
| Rime Rebuff | rime | counter | 1 | Counter (a trap or Reaction): gain 4 Guard and apply 2 Chill to ALL enemies. | bottom 7% of counters at cost 1 (value 1.12/draw, played 26% of draws) |
| Rimed Gainsay | rime | counter | 0 | Counter (a trap or Reaction): deal 2 damage to each enemy with Chill. If its owner is below half HP, double its Chill. | bottom 7% of counters at cost 0 (value 9.65/draw, played 56% of draws) |
| Shiver Mantle | rime | skill | 2 | Gain 7 Guard. If the target has Chill, apply 4 Chill to ALL enemies. | plays like Glacier Wall |
| Shiver Net | rime | reaction | 1 | When an enemy trap activates: deal 6 damage to its owner. If you have Guard, apply 2 Shaken to its owner. | plays like Icebound Glyph |
| Shiver Thrust | rime | attack | 2 | Deal 5 damage to ALL enemies. Apply 2 Chill to ALL enemies. Chain 2: Deal 7 damage to each enemy with Chill. | its gate (Chain 2:) is true under 20% of the time |
| Sleet Trap | rime | reaction | 1 | When an enemy uses a non-attack: gain 4 Guard and apply 2 Chill to ALL enemies. | bottom 7% of reactions at cost 1 (value 2.32/draw, played 48% of draws) |
| Snowdrift Retort | rime | counter | 1 | Counter (an attack): gain 4 Guard and apply 1 Shaken to the attacker. | plays like Silverfrost Quip |
| Tundra Hook | rime | attack | 0 | Deal 3 damage. If the target is Frozen, apply 3 Chill. | plays like Rime Shard |
| Tundra Retort | rime | counter | 1 | Counter (an attack): gain 5 Guard. If the attacker is Frozen, deal 8 damage to each enemy with Chill. | plays like Glacier Reply |
| Whiteout Deadfall | rime | reaction | 1 | When an enemy trap activates: apply 2 Shaken to its owner. If its owner has Chill, next turn, gain 6 Guard. | bottom 7% of reactions at cost 1 (value 2.77/draw, played 63% of draws) |
| Whiteout Trance | rime | skill | 1 | Gain 3 Guard. Chain 2: Double the target's Chill. | plays like Avalanche Drill |
| Wintry Glyph | rime | reaction | 1 | When an enemy trap activates: deal 5 damage to its owner and apply 2 Chill to ALL enemies. | plays like Rimed Tripwire |
| Aftershock Uppercut | stone | attack | 2 | Deal 4 damage twice. Apply 3 Tremor. Chain 2: Apply 3 Shaken. | its gate (Chain 2:) is true under 20% of the time |
| Basalt Crash | stone | attack | 2 | Deal 5 damage to ALL enemies. Apply 2 Tremor to ALL enemies. | plays like Tectonic Shift |
| Basalt Rune | stone | reaction | 1 | When an enemy trap activates: deal 5 damage to its owner and apply 2 Tremor to ALL enemies. | bottom 7% of reactions at cost 1 (value 2.6/draw, played 58% of draws) |
| Bastion Sweep | stone | attack | 3 | Deal 10 damage. Apply 4 Tremor. Chain 2: Gain 8 Fortify. | plays like Seismic Blow |
| Cairn Coil | stone | reaction | 1 | When an enemy trap activates: double its Tremor. If you have Guard, gain 6 Fortify. | plays like Aftershock Lure |
| Cavern Barrage | stone | attack | 1 | Deal 2 damage to a random enemy 3 times. Apply 1 Tremor to ALL enemies. | bottom 7% of attacks at cost 1 (value 6.61/draw, played 60% of draws) |
| Craggy Rune | stone | reaction | 1 | When an enemy trap activates: deal 5 damage to its owner and deal 4 damage to each enemy with Tremor. | bottom 7% of reactions at cost 1 (value 2.06/draw, played 53% of draws) |
| Craggy Smite | stone | attack | 1 | Deal 2 damage to a random enemy 3 times. Gain 1 Fortify. | bottom 7% of attacks at cost 1 (value 5.45/draw, played 58% of draws) |
| Dolmen Sunder | stone | attack | 1 | Deal 4 damage. If you have Fortify, apply 2 Shaken. | plays like Bloom Barrage |
| Earthen Shroud | stone | skill | 2 | Gain 7 Guard. Chain 2: Apply 4 Tremor to ALL enemies. | plays like Shale Trance |
| Geode Coil | stone | reaction | 1 | When an enemy trap activates: double its Tremor. If you have Guard, apply 3 Tremor to its owner. | bottom 7% of reactions at cost 1 (value 2.66/draw, played 61% of draws) |
| Geode Ward | stone | skill | 2 | Gain 8 Guard. If there are 2+ enemies, apply 8 Tremor. | plays like Rampart Trick |
| Granite Tripwire | stone | reaction | 1 | When attacked: deal 6 damage to the attacker and gain 3 Fortify. | plays like Earthen Deadfall |
| Hewn Sunder | stone | attack | 2 | Deal 4 damage twice. If the target has Tremor, double the target's Tremor. | plays like Lodestone Thrust |
| Hewn Trick | stone | skill | 2 | Gain 6 Guard. Deal 3 damage to each enemy with Tremor. Chain 2: Apply 3 Shaken. | its gate (Chain 2:) is true under 20% of the time |
| Iron Trap | stone | reaction | 1 | When attacked: deal 5 damage to the attacker and apply 2 Tremor to ALL enemies. | plays like Rampart Tripwire |
| Ironstone Glyph | stone | reaction | 1 | When attacked: gain 5 Guard and gain 3 Fortify. | plays like Bullion Wall |
| Keystone Cleave | stone | attack | 0 | Deal 3 damage. If there are 2+ enemies, apply 2 Tremor. | bottom 7% of attacks at cost 0 (value 7.08/draw, played 80% of draws) |
| Keystone Swipe | stone | attack | 3 | Deal 13 damage. Chain 2: Deal 10 damage to each enemy with Tremor. | plays like Granite Cut |
| Lodestone Mantra | stone | skill | 2 | Gain 6 Guard. Apply 2 Tremor to ALL enemies. Chain 2: Apply 3 Shaken. | its gate (Chain 2:) is true under 20% of the time |
| Lodestone Recital | stone | skill | 1 | Gain 4 Guard. If the target has Tremor, gain 3 Fortify. | plays like Stone Tablet |
| Lodestone Trap | stone | reaction | 1 | When an enemy trap activates: deal 6 damage to its owner. If its owner has Tremor, gain 4 Fortify. | plays like Quarry Seal |
| Marble Blow | stone | attack | 1 | Deal 4 damage. Apply 2 Tremor. | plays like Ice Wedge |
| Menhir Snare | stone | reaction | 0 | When an enemy uses a non-attack: gain 2 Fortify. If you have Guard, apply 2 Tremor to ALL enemies. | bottom 7% of reactions at cost 0 (value 3.9/draw, played 93% of draws) |
| Menhir Vow | stone | skill | 1 | Gain 4 Guard. Chain 2: Apply 2 Shaken. | plays like Orchard Gambit |
| Monolithic Coil | stone | reaction | 0 | When attacked: apply 3 Tremor to the attacker. | bottom 7% of reactions at cost 0 (value 3.49/draw, played 78% of draws) |
| Petrified Hammer | stone | attack | 3 | Deal 9 damage. Double the target's Tremor. Chain 2: Apply 3 Shaken. | its gate (Chain 2:) is true under 20% of the time |
| Petrified Ploy | stone | skill | 2 | Gain 7 Guard. Apply 2 Tremor to ALL enemies. Chain 2: Deal 7 damage to each enemy with Tremor. | its gate (Chain 2:) is true under 20% of the time |
| Quarry Crash | stone | attack | 3 | Deal 13 damage. Apply 3 Tremor to ALL enemies. | plays like Petrified Swipe |
| Rampart Coil | stone | reaction | 1 | When an enemy trap activates: deal 5 damage to its owner and gain 2 Fortify. If you have Guard, deal 4 damage to each enemy with Tremor. | bottom 7% of reactions at cost 1 (value 2.77/draw, played 78% of draws) |
| Sandstone Ram | stone | attack | 2 | Deal 3 damage twice. Gain 3 Fortify. If there are 2+ enemies, deal 6 damage to each enemy with Tremor. | plays like Terrace Jab |
| Sandstone Riposte | stone | counter | 1 | Counter (a trap or Reaction): gain 4 Guard. If its owner has Tremor, apply 2 Shaken to its owner. | plays like Drenching Rebuttal |
| Sandstone Slash | stone | attack | 2 | Deal 9 damage. Chain 2: Apply 3 Shaken. | its gate (Chain 2:) is true under 20% of the time |
| Slate Cleave | stone | attack | 2 | Deal 5 damage to ALL enemies. Gain 5 Guard. | plays like Night Burst |
| Slate Coil | stone | reaction | 1 | When attacked: deal 6 damage to the attacker and apply 2 Tremor to the attacker and gain 2 Fortify. | plays like Rocky Tripline |
| Terrace Vow | stone | skill | 2 | Deal 7 damage to each enemy with Tremor. Chain 2: Gain 7 Fortify. | its gate (Chain 2:) is true under 20% of the time |
| Ampere Mantle | storm | skill | 2 | Gain 6 Guard. Gain 1 energy. Chain 2: Apply 4 Shock to ALL enemies. | plays like Overcharged Aegis |
| Blitz Comeback | storm | counter | 1 | Counter (a trap or Reaction): gain 4 Guard and spend all Charge: deal 1 damage per Charge spent. If its owner has Shock, deal 3 damage to each enemy with Shock. | plays like Plasma Comeback |
| Blitz Gesture | storm | skill | 1 | Gain 4 Guard. Apply 2 Shock. Chain 2: Deal 3 damage to each enemy with Shock. | plays like Coil Ritual |
| Blitz Posture | storm | skill | 2 | Gain 7 Guard. Chain 2: Gain 4 Charge. | plays like Windshear Charm |
| Blitz Uppercut | storm | attack | 3 | Deal 17 damage. If you played 2+ other cards this turn, gain 1 energy. | plays like Hailstorm Onslaught |
| Coil Trap | storm | reaction | 1 | When attacked: gain 5 Guard. If you have Charge, deal 4 damage to each enemy with Shock. | plays like Stormcloud Tripwire |
| Cyclone Coil | storm | reaction | 1 | When an enemy trap activates: deal 5 damage to its owner and apply 4 Shock to its owner. | plays like Coil Net |
| Cyclone Ward | storm | skill | 2 | Gain 6 Guard. Gain 2 Charge. | plays like Windshear Charm |
| Downpour Retaliation | storm | counter | 1 | Counter (an attack): gain 4 Guard. If the attacker has Shock, apply 5 Shock to the attacker. | plays like Electric Rebuke |
| Electric Gesture | storm | skill | 1 | Apply 5 Shock. Chain 2: Spend all Charge: deal 3 damage per Charge spent. | its gate (Chain 2:) is true under 20% of the time |
| Flash Blow | storm | attack | 3 | Deal 13 damage. Gain 1 energy. Chain 2: Deal 10 damage to each enemy with Shock. | its gate (Chain 2:) is true under 20% of the time |
| Flash Slash | storm | attack | 1 | Deal 4 damage. If you played 2+ other cards this turn, apply 5 Shock. | plays like Stormcloud Barrage |
| Fulgurite Lunge | storm | attack | 2 | Deal 5 damage to ALL enemies. Chain 2: Gain 4 Charge. | plays like Ionized Rend |
| Fulgurite Retaliation | storm | counter | 1 | Counter (an attack): gain 5 Guard. If you have Charge, gain 2 Charge. | plays like Volt Comeback |
| Gale Tripwire | storm | reaction | 0 | When attacked: gain 2 Charge. | bottom 7% of reactions at cost 0 (value 4.29/draw, played 91% of draws) |
| Hailstorm Coil | storm | reaction | 1 | When attacked: deal 6 damage to the attacker. If the attacker has Shock, gain 2 Charge. | plays like Overcharged Bait |
| Hailstorm Vow | storm | skill | 0 | Apply 2 Shock to ALL enemies. Chain 2: Gain 1 Charge. | its gate (Chain 2:) is true under 20% of the time |
| Jolt Volley | storm | attack | 2 | Deal 3 damage twice. Gain 2 Charge. If you played 2+ other cards this turn, apply 7 Shock. | plays like Galvanic Lash |
| Monsoon Catch | storm | reaction | 1 | When an enemy uses a non-attack: gain 5 Guard. If you played 2+ elements this turn, apply 9 Shock to it. | plays like Static Tripwire |
| Monsoon Pit | storm | reaction | 1 | When an enemy trap activates: apply 5 Shock to its owner. If you have Charge, gain 2 Charge. | bottom 7% of reactions at cost 1 (value 3.22/draw, played 64% of draws) |
| Overcharged Return | storm | counter | 1 | Counter (a non-attack): gain 4 Guard and spend all Charge: deal 1 damage per Charge spent. | bottom 7% of counters at cost 1 (value 5.57/draw, played 31% of draws) |
| Overcharged Veil | storm | skill | 2 | Gain 7 Guard. If you have Charge, gain 3 Charge. | plays like Windshear Charm |
| Rolling Ritual | storm | skill | 1 | Deal 4 damage to each enemy with Shock. Chain 2: Gain 1 energy. | its gate (Chain 2:) is true under 20% of the time |
| Rolling Tactic | storm | skill | 1 | Gain 4 Guard. Chain 2: Apply 4 Shock. | plays like Hailstorm Aegis |
| Skyborn Cut | storm | attack | 2 | Deal 5 damage to ALL enemies. Gain 5 Guard. | plays like Night Burst |
| Sparking Burst | storm | attack | 1 | Deal 5 damage. Apply 2 Shock to ALL enemies. | plays like Nimbus Spike |
| Storm Pack | storm + beast | attack | 1 | Deal 5 damage. If you have a companion, gain 2 Charge. | plays like Ionized Lash |
| Storm Reply | storm | counter | 1 | Counter (an attack): gain 4 Guard and apply 3 Shock to the attacker. | plays like Electric Rebuke |
| Surge Tripline | storm | reaction | 1 | When an enemy trap activates: apply 4 Shock to ALL enemies. If you have Charge, deal 4 damage to each enemy with Shock. | bottom 7% of reactions at cost 1 (value 2.41/draw, played 55% of draws) |
| Tempest Coil | storm | reaction | 1 | When an enemy trap activates: deal 5 damage to its owner and gain 4 Guard. | bottom 7% of reactions at cost 1 (value 2.99/draw, played 56% of draws) |
| Tempest Slash | storm | attack | 3 | Deal 13 damage. Apply 4 Shock to ALL enemies. | bottom 7% of attacks at cost 3 (value 15.77/draw, played 59% of draws) |
| Windshear Stance | storm | skill | 1 | Apply 3 Shock to ALL enemies. If you have Charge, gain 2 Charge. | plays like Storm Front |
| Barbed Focus | thorn | skill | 1 | Gain 4 Guard. Gain 1 Barbs. | plays like Blackthorn Tactic |
| Blackthorn Cut | thorn | attack | 2 | Deal 5 damage to ALL enemies. Gain 1 Barbs. Chain 2: Gain 4 Guard for each enemy. | its gate (Chain 2:) is true under 20% of the time |
| Blackthorn Flourish | thorn | attack | 2 | Deal 4 damage twice. If you have Barbs, gain 4 Guard for each enemy. | plays like Dewy Lunge |
| Briar Oath | thorn + dawn | reaction | 1 | When attacked: gain 2 Barbs. If you have Verdict, gain 5 Guard. | plays like Petal Pit |
| Burr Coat | thorn + beast | reaction | 1 | When attacked: gain 2 Barbs. If you have a companion, gain 5 Guard. | plays like Petal Pit |
| Canopy Crash | thorn | attack | 1 | Deal 5 damage. If you are below half HP, gain 3 Barbs. | plays like Briar Lash |
| Canopy Trance | thorn | skill | 0 | Heal 2 HP. If the target is below half HP, gain 1 Barbs. | plays like Lucky Clover |
| Evergreen Gambit | thorn | skill | 2 | Gain 4 Guard for each enemy. If you have Barbs, gain 3 Barbs. | plays like Acorn Recital |
| Fern Mantle | thorn | skill | 1 | Next turn, gain 6 Guard. | plays like Ice Gambit |
| Gnarled Hook | thorn | attack | 0 | Deal 3 damage. If you have Barbs, apply 1 Shaken. | plays like Chilly Hammer |
| Hedgerow Barrage | thorn | attack | 1 | Deal 4 damage. Apply 1 Shaken. Chain 2: Gain 1 Barbs. | plays like Rosethorn Volley |
| Hedgerow Strike | thorn | attack | 3 | Deal 10 damage. Gain 2 Barbs. If you have Guard, heal 6 HP. | plays like Willow Hook |
| Lichen Pierce | thorn | attack | 2 | Deal 5 damage twice. If there are 2+ enemies, heal 6 HP. | plays like Evergreen Lash |
| Lichen Riposte | thorn | counter | 0 | Counter (an attack): gain 1 Barbs. If the attacker is below half HP, next turn, gain 4 Guard. | plays like Rosethorn Reversal |
| Lichen Veil | thorn | skill | 1 | Gain 3 Guard. Apply 1 Shaken. If the target is below half HP, heal 3 HP. | plays like Dawnlit Ploy |
| Mossy Glyph | thorn | reaction | 1 | When an enemy uses a non-attack: gain 4 Guard and heal 2 HP. | plays like Pinecone Net |
| Mossy Lash | thorn | attack | 2 | Deal 10 damage. Heal 3 HP. | plays like Glowing Swipe |
| Nettle Mirror | thorn | reaction | 1 | When attacked: gain 5 Guard and heal 2 HP. | plays like Beacon Rune |
| Orchard Gambit | thorn | skill | 1 | Gain 4 Guard. If you have Barbs, apply 2 Shaken. | plays like Pearl Sigil |
| Orchard Hammer | thorn | attack | 2 | Deal 10 damage. Chain 2: Gain 3 Barbs. | plays like Leaf Lash |
| Pinecone Blow | thorn | attack | 2 | Deal 3 damage twice. Next turn, gain 4 Guard. If you are below half HP, gain 3 Barbs. | plays like Fern Cut |
| Pinecone Drill | thorn | skill | 2 | Next turn, gain 9 Guard. Chain 2: Heal 5 HP. | its gate (Chain 2:) is true under 20% of the time |
| Pinecone Onslaught | thorn | attack | 2 | Deal 5 damage to ALL enemies. If you have Barbs, next turn, gain 8 Guard. | plays like Ivy Blow |
| Root and Bone | thorn + grave | reaction | 1 | When attacked: gain 5 Guard. If your Crypt holds 3+ cards, gain 2 Barbs. | plays like Petal Pit |
| Static Bramble | thorn + storm | attack | 1 | Deal 5 damage. If you have Barbs, apply 4 Shock. | plays like Stormcloud Barrage |
| Verdant Answer | thorn | counter | 1 | Counter (an attack): gain 4 Guard and heal 2 HP. | plays like Heartwood Rebuke |
| Verdant Cleave | thorn | attack | 2 | Deal 5 damage to ALL enemies. Heal 3 HP. | plays like Light Strike |
| Yew Rend | thorn | attack | 2 | Deal 5 damage to ALL enemies. Chain 2: Gain 4 Guard for each enemy. | its gate (Chain 2:) is true under 20% of the time |
| Yew Stance | thorn | skill | 1 | Gain 4 Guard. If you have Barbs, gain 2 Barbs. | plays like Blackthorn Tactic |
| Abyssal Blow | tide | attack | 2 | Deal 5 damage twice. If you have Guard, bank 1 energy for next turn. | plays like Pearl Volley |
| Abyssal Hammer | tide | attack | 2 | Deal 5 damage to ALL enemies. Deal 3 damage to each enemy with Shaken. If you hold 3 or fewer other cards, draw 1 card. | plays like Harbor Lunge |
| Abyssal Rite | tide | skill | 1 | Apply 1 Shaken to ALL enemies. Chain 2: Deal 1 damage for each card in your hand. | its gate (Chain 2:) is true under 20% of the time |
| Abyssal Stance | tide | skill | 1 | Bank 1 energy for next turn. Chain 2: Deal 6 damage to each enemy with Shaken. | its gate (Chain 2:) is true under 20% of the time |
| Billow Gesture | tide | skill | 1 | Gain 4 Guard. Chain 3: Deal 2 damage for each card in your hand. | plays like Brackish Sigil |
| Brackish Catch | tide | reaction | 1 | When an enemy uses a non-attack: gain 5 Guard. If there are 2+ enemies, apply 2 Shaken to it. | plays like Tidal Rune |
| Brackish Seal | tide | reaction | 0 | When attacked: deal 3 damage to each enemy with Shaken. If there are 2+ enemies, apply 2 Shaken to the attacker. | bottom 7% of reactions at cost 0 (value 3.94/draw, played 83% of draws) |
| Breaker Sweep | tide | attack | 2 | Deal 6 damage twice. Chain 3: Gain 1 energy. | its gate (Chain 3:) is true under 20% of the time |
| Current Barrage | tide | attack | 2 | Deal 6 damage to ALL enemies. Gain 5 Guard. | plays like Kindled Smite |
| Ebbing Mantle | tide | skill | 1 | Gain 6 Guard. | plays like Scorching Charm |
| Estuary Sunder | tide | attack | 2 | Deal 9 damage. If the target has Shaken, apply 3 Shaken. | plays like Undertow Strike |
| Floodgate Return | tide | counter | 0 | Counter (an attack): deal 2 damage to each enemy with Shaken. If there are 2+ enemies, apply 1 Shaken to ALL enemies. | bottom 7% of counters at cost 0 (value -1.03/draw, played 56% of draws) |
| Floodgate Shroud | tide | skill | 2 | Gain 7 Guard. Chain 2: Apply 2 Shaken to ALL enemies. | plays like Tidal Ploy |
| Floodgate Uppercut | tide | attack | 2 | Deal 11 damage. Chain 3: Gain 1 energy. | its gate (Chain 3:) is true under 20% of the time |
| Harbor Mantra | tide | skill | 2 | Gain 9 Guard. If there are 2+ enemies, bank 1 energy for next turn. | plays like Undertow Trick |
| Kelp Shroud | tide | skill | 1 | Gain 4 Guard. If the target has Shaken, apply 2 Shaken. | plays like Pearl Sigil |
| Maelstrom Lash | tide | attack | 1 | Deal 4 damage. If the target has Shaken, draw 1 card. | plays like Neap Crash |
| Maelstrom Mantle | tide | skill | 2 | Gain 10 Guard. Chain 3: Gain 1 energy. | plays like Brackish Gambit |
| Maelstrom Volley | tide | attack | 2 | Deal 7 damage. Apply 1 Shaken to ALL enemies. Chain 3: Deal 9 damage to each enemy with Shaken. | its gate (Chain 3:) is true under 20% of the time |
| Neap Flourish | tide | attack | 2 | Deal 4 damage to ALL enemies. Draw 1 card. If the target has Shaken, deal 5 damage to each enemy with Shaken. | plays like Harbor Lunge |
| Neap Mantra | tide | skill | 1 | Gain 4 Guard. If there are 2+ enemies, apply 2 Shaken. | plays like Pearl Sigil |
| Saltwater Cleave | tide | attack | 2 | Deal 4 damage twice. Deal 4 damage to each enemy with Shaken. Chain 2: Apply 3 Shaken. | its gate (Chain 2:) is true under 20% of the time |
| Saltwater Strike | tide | attack | 2 | Deal 6 damage to ALL enemies. Chain 2: Apply 2 Shaken to ALL enemies. | plays like Tidal Strike |
| Shoal Onslaught | tide | attack | 2 | Deal 4 damage to ALL enemies. Apply 1 Shaken to ALL enemies. If there are 2+ enemies, deal 6 damage to each enemy with Shaken. | bottom 7% of attacks at cost 2 (value 11.3/draw, played 56% of draws) |
| Undertow Smite | tide | attack | 2 | Deal 5 damage to ALL enemies. Draw 1 card. | plays like Splashing Smite |
| Wavecrest Feint | tide | attack | 2 | Deal 6 damage. Gain 1 energy. Chain 3: Draw 1 card. | its gate (Chain 3:) is true under 20% of the time |
| Wavecrest Recital | tide | skill | 2 | Gain 8 Guard. If there are 2+ enemies, apply 3 Shaken to ALL enemies. | plays like Tidal Ploy |
| Annihilating Shroud | void | skill | 1 | Apply 1 Exposed to ALL enemies. Chain 2: Deal 4 damage to each enemy with Doom. | its gate (Chain 2:) is true under 20% of the time |
| Chasm Omen | void | skill | 0 | Apply 4 Doom. If the target is below half HP, apply 1 Exposed. | plays like Hungering Trance |
| Chasm Ploy | void | skill | 1 | Disrupt 1. Chain 2: Deal 5 damage to each enemy with Doom. | its gate (Chain 2:) is true under 20% of the time |
| Desolate Burst | void | attack | 2 | Deal 12 damage. Chain 3: Double the target's Doom. | plays like Desolate Ram |
| Eclipse Blade | void + dusk | attack | 1 | Deal 4 damage. Apply 1 Mark. If the target has Doom, apply 1 Mark. | plays like Eclipse Swipe |
| Forsaken Ambush | void | reaction | 1 | When attacked: deal 5 damage to the attacker and Disrupt 1. If the attacker is below half HP, apply 2 Exposed to the attacker. | plays like Wane Catch |
| Forsaken Gesture | void | skill | 1 | Gain 4 Guard. Chain 2: Apply 1 Exposed to ALL enemies. | its gate (Chain 2:) is true under 20% of the time |
| Hungering Drill | void | skill | 2 | Gain 6 Guard. Apply 1 Exposed to ALL enemies. Chain 2: Apply 6 Doom to ALL enemies. | plays like Ruinous Charm |
| Oblivion Mantle | void | skill | 2 | Apply 2 Exposed to ALL enemies. Chain 2: Apply 14 Doom. | its gate (Chain 2:) is true under 20% of the time |
| Ruinous Cleave | void | attack | 2 | Deal 6 damage. Double the target's Doom. If there are 2+ enemies, apply 9 Doom. | plays like Mark of Ending |
| Severed Answer | void | counter | 1 | Counter (a trap or Reaction): Negate it and apply 3 Doom to its owner. | plays like Null Retort |
| Shadowless Gash | void | attack | 1 | Deal 5 damage. If there are 2+ enemies, apply 5 Doom to ALL enemies. | plays like Dread Thrust |
| Wane Sweep | void | attack | 1 | Deal 5 damage. Chain 3: Apply 12 Doom. | plays like Ruinous Burst |
| Wane Ward | void | skill | 1 | Apply 2 Exposed. Chain 2: Apply 7 Doom. | its gate (Chain 2:) is true under 20% of the time |

## Enemy traps (act 1 / 2 / 3 values)

| Trap | Trigger | Text |
|---|---|---|
| Spike Shell | attack | When attacked: gain 6 / 10 / 14 Guard. |
| Snap Jaw | attack | When attacked: deal 5 / 8 / 11 damage to the attacker. |
| Hex Mirror | skill | When a foe uses a non-attack: apply 1 / 2 / 2 Shaken to it. |
| Ambush | skill | When a foe uses a non-attack: deal 5 / 8 / 11 damage to it. |
| Counter Glyph | attack | When attacked: Negate the attack. |
| Smother | reaction | When a foe's Reaction or trap activates: Negate it. |
| Mirror Veil | skill | When a foe uses a non-attack: gain 6 / 10 / 14 Guard. |
| Thorn Snare | attack | When attacked: gain 2 / 3 / 4 Barbs first. |
| Tripwire | skill | When a foe uses a non-attack: apply 1 / 2 / 2 Exposed to it. |
| Bear Trap | attack | When attacked: apply 1 / 2 / 2 Shaken to the attacker before it hits. |
| Ember Pod | attack | When attacked: apply 2 / 3 / 4 Burn to the attacker. |
| Feral Howl | attack | When attacked: gain 1 / 1 / 2 Edge. |
| Undertow Charm | reaction | When a foe's Reaction or trap activates: gain 5 / 8 / 11 Guard. |
| Soul Snare | reaction | When a foe's Reaction or trap activates: deal 4 / 6 / 8 damage to its owner. |
| Gainsay | reaction | When a foe's Reaction, trap or Counter activates: Negate it, then gain 3 / 5 / 8 Guard. |
| Static Rune | attack | When attacked: apply 3 / 5 / 7 Shock to the attacker. |
| Frost Rune | attack | When attacked: apply 2 / 3 / 4 Chill to the attacker. |
| Quake Rune | skill | When a foe uses a non-attack: gain 4 / 6 / 9 Guard and 1 Edge. |

## Relics

| Relic | Rarity | Effect | Unlock |
|---|---|---|---|
| 🪭 Duelist's Fan | starter | The first chain of 2+ links each turn draws you 1 card. The first one each combat also gives 1 energy. |  |
| 🌳 Root Heart | starter | Start each combat with 2 Barbs. |  |
| 🜲 Hollow Crown | starter | Whenever one of your set Reactions leaves play (fires or is Sacrificed), apply 6 Doom to ALL enemies. |  |
| 🪙 Loaded Coin | starter | Whenever your Fate Coin flips, raise your Ante by 1. Start each combat with 3 Ante. |  |
| ⚖️ Scales of Dawn | starter | Your first Counter each turn costs 0. Start each combat with 1 Verdict. |  |
| 🫙 Storm in a Bottle | starter | Start each combat with 4 Charge. Whenever you spend 5 or more Charge at once, draw 2 cards. |  |
| 💠 Rime Heart | starter | At the start of each combat, apply 3 Chill to ALL enemies. Frozen enemies take 50% more damage from you. |  |
| 🦴 Bone Whistle | starter | Start each combat with Wolf 2. |  |
| 🧲 Lodestone | starter | Start each combat with 4 Fortify and 4 Guard. |  |
| ⚗️ Philosopher's Flask | starter | Resonance happens after 2 cards of an element instead of 3. |  |
| 🥷 Smoke Cowl | starter | At the start of each combat, apply 1 Mark to ALL enemies. |  |
| 🪶 Retort Quill | common | Whenever you play a Counter, draw 1 card. |  |
| 🫙 Storm Jar | common | Start each combat with 3 Charge. |  |
| 📈 Seismograph | common | Start each combat with 3 Fortify. |  |
| 🖍️ Hunter's Chalk | common | At the start of each combat, apply 1 Mark to ALL enemies. |  |
| 🦷 Beast Tooth | common | Start each combat with Bear 2. |  |
| 🧭 Elemental Compass | uncommon | At the start of each combat, attune to the element that beats the first enemy. |  |
| 🔔 Resonant Bell | uncommon | Whenever Resonance happens, gain 1 energy. |  |
| 💨 Smoke Pellet | uncommon | Start each combat with 1 Veil. |  |
| ❄️ Frost Brooch | uncommon | Whenever an enemy Freezes, gain 1 energy. |  |
| 🧤 Quickdraw Glove | rare | Your Counters cost 1 less. |  |
| 👑 Prism Crown | rare | Resonance happens after 2 cards of an element instead of 3. |  |
| 🔨 Silver Gavel | rare | Whenever you play a Counter, deal 5 damage to the enemy it answers. |  |
| 🔰 Iron Buckle | common | Start each combat with 8 Guard. |  |
| 🪨 Whetstone | common | Start each combat with 1 Edge. |  |
| ⏳ Tide Glass | common | You can bank 1 more unspent energy as Flux. |  |
| 🪙 Lucky Coin | common | Gain 25% more gold from combats. |  |
| 🏺 Ember Jar | common | At the start of each combat, apply 3 Burn to ALL enemies. |  |
| 🩸 Bloodstone | common | Heal 5 HP after each combat. |  |
| 👝 Prep Pouch | common | Draw 2 extra cards on your first turn. |  |
| 🔎 Trap Lens | common | At the start of each combat, destroy one enemy trap. Enemy traps are shown face-up. |  |
| 🎴 Spare Slot | uncommon | You have 1 more Reaction slot. |  |
| 🪞 Mirror Shard | uncommon | Whenever an enemy trap fires, gain 4 Guard. |  |
| ⛓️ Linked Ring | uncommon | Whenever a chain of 3+ links resolves, draw 1 card. |  |
| 🥁 War Drum | uncommon | The 4th card you play each turn refunds 1 energy. |  |
| 🦾 Spiked Bracer | uncommon | Whenever you set a Reaction, gain 3 Guard. |  |
| 🧿 Cracked Lens | uncommon | Exposed enemies take 65% more damage instead of 40%. |  |
| 🔔 Grave Bell | uncommon | Whenever an enemy dies, gain 1 energy. | L2 |
| 🎴 Tarot Pouch | common | You can hold 1 more Omen. On pickup, gain a random Omen. |  |
| 🥠 Fortune Cookie | common | Every 3rd combat you win drops an Omen. |  |
| 🐈 Maneki Cat | uncommon | Gain 10 more gold from every combat. Mrrp. |  |
| 🎼 Metronome | uncommon | Every 3rd chain you resolve in a combat gives 1 energy. |  |
| ⌛ Hourglass | uncommon | At the start of your 3rd turn each combat, gain 2 energy and draw 2 cards. |  |
| 🎭 Masquerade Mask | rare | The first Reaction you set each turn costs 0. |  |
| 🪶 Phoenix Feather | rare | Once per run, when you would die, heal to 30% HP instead. |  |
| ⚖️ Counterweight | rare | Whenever you Negate something, bank 2 energy for next turn. |  |
| 🗡️ Sharpened Edge | rare | Your attacks and cards deal 2 more damage. | L3 |
| 💠 Chain Crown | rare | Whenever a chain of 3+ links resolves, gain 1 energy. | L6 |
| 🧤 Chain Gauntlet | uncommon | Whenever a chain of 2+ links resolves, gain 3 Guard. | trophy: Five-Link Fugue |
| 🫅 King's Reserve | rare | Start each combat with 1 extra energy. | trophy: Riposte! |
| 🥇 Trophy Belt | uncommon | Whenever a rival or boss dies, heal 8 HP. | trophy: Champion Slayer |
| 📜 Merchant's Seal | shop | Shop prices are 15% lower and you gain 15% more gold. | trophy: Deep Pockets |
| 📒 Golden Ledger | shop | Shop prices are 25% lower. |  |
| 🗃️ Deck Box | shop | On pickup, upgrade 2 random cards. |  |
| 🪺 Magpie's Nest | starter | At the start of each combat, Steal 1. If there was nothing to steal, add 2 Glints to your hand. |  |
| 🔘 Shiny Button | common | Start each combat with a Glint in your hand. |  |
| 🪣 Bait Bucket | common | The first time an enemy trap fires on your turn, draw 1 card. |  |
| 🧲 Horseshoe | common | Start each combat with 4 Guard for each Reaction slot you have. |  |
| 🪡 Silver Thimble | common | The first time you would lose HP in each combat, lose only 1. |  |
| 🔊 Echo Chamber | uncommon | Whenever a chain of 4+ links resolves, gain 1 Edge. |  |
| 🌀 Coiled Spring | uncommon | Whenever one of your Reactions fires, deal 3 damage to a random enemy. |  |
| 📕 Debt Ledger | uncommon | Whenever you Steal a trap, gain 4 Guard. |  |
| 🔷 Prism Lens | uncommon | Your Glints deal 3 more damage. Start each combat with a Glint in your hand. |  |
| 💍 Ouroboros Ring | rare | Chains can have 1 more link (7). Whenever a chain of 6+ links resolves, heal 5 HP. |  |
| 🔦 Lantern of Truth | rare | Enemy traps are shown face-up. Whenever you Negate something, deal 5 damage to ALL enemies. |  |
| 💳 Membership Card | shop | Shops offer 1 more card, and removing a card costs 25% less. |  |
| 🥚 Nest Egg | uncommon | Whenever you Steal a trap, gain 5 gold. | trophy: Sticky Fingers |
| 🌹 Crown of Thorns | boss | +1 energy each turn. Enemies start each combat with 3 Barbs. |  |
| ⏳ Cracked Hourglass | boss | +1 energy each turn. Your Reactions cost 1 more. |  |
| ❤️‍🔥 Ember Heart | boss | +1 energy each turn. You can no longer bank Flux. |  |
| ⚙️ Void Engine | boss | +1 energy each turn. On pickup, add 2 Wounds to your deck. |  |
| 🌊 Tide Crown | boss | Draw 1 extra card each turn. On pickup, lose 8 Max HP. |  |
| 🕰️ Pocket Watch | boss | +1 energy each turn. Draw 1 fewer card on your first 2 turns of each combat. |  |
| 🎪 Grand Stage | boss | +1 Reaction slot and bank 1 more Flux. Start each combat with 1 Exposed. |  |
| 🪏 Gravedigger's Spade | starter | Your Reactions go to your Crypt when they leave play, not the discard pile. At the start of your 2nd turn and every 2nd turn after, Exhume 1. |  |
| 🔔 Funeral Bell | common | Whenever a card enters your Crypt, deal 2 damage to a random enemy. |  |
| 🧤 Gravedigger's Gloves | uncommon | Whenever you Exhume, gain 3 Guard. | trophy: Gravedigger |
| 🏮 Grave Lantern | rare | At the start of each combat, Bury 3. Whenever a chain of 3+ links resolves, Exhume 1. |  |
| 🌞 Prime Sundial | uncommon | Reactions with Prime gain 2 Prime each turn instead of 1. Start each combat with 4 Guard. |  |
| 🪧 Crossroads Signpost | uncommon | Converge counts 1 extra faction. The first time each turn you play cards from 3 different factions, draw 1 card. |  |
| 🧻 Ink Blotter | common | Your cards cannot be Blotted. Whenever an enemy tries, gain 3 Guard per card instead. |  |
| 🎫 Stagehand's Pass | common | In fights at a Venue, start with 8 Guard and draw 1 extra card on turn 1. |  |
| 🎟️ Season Ticket | uncommon | Winning a fight at a Venue pays 25 extra gold. |  |
| 🔁 Echo Stone | rare | The first Attack or Trick you play each combat happens twice. |  |
| 💐 Mourning Wreath | common | Whenever an enemy dies, heal 2 HP. |  |
| 🪙 Grudge Token | uncommon | Rivals and bosses start each combat with 2 Shaken. | trophy: Settled Score |
| 🌙 Night Lamp | uncommon | Heal 4 HP after each combat. +6 Max HP on pickup. | trophy: Night Owl |
| 🫀 Tolling Heart | boss | +1 energy each turn. Whenever a chain of 3+ links resolves, you lose 3 HP. |  |
| 🔏 Patron's Seal | boss | +1 energy each turn. Patrons no longer visit you this run. |  |
| 🗺️ Impresario's Itinerary | shop | Every fight takes place at a Venue. Start each Venue fight with 1 extra energy. |  |
| 🧭 Lucky Compass | uncommon | Mystery nodes never turn out to be fights or rivals. |  |
| 🌡️ Storm Glass | common | Fog never hides your map. Start each combat with 3 Guard. |  |
| 🐾 Rabbit's Foot | uncommon | Rare monsters take 1 more turn to flee, and catching one pays 40 extra gold. |  |
| 🥾 Wayfarer's Boots | common | Roadside encounters happen 50% more often, and each one heals you 4 HP. |  |
| 🎖️ Pilgrim's Badge | common | Whenever you visit a Shrine, heal 8 HP. |  |
| 🐓 Weather Vane | uncommon | Harsh Skies (Heatwave, Hard Frost, Eclipse, Fog) never roll for you. Rerolls this act's Sky if it is one. |  |
| 🎉 Party Popper | common | Mid-fight Surprises are always good ones. |  |
| 🃏 Jester's Bell | uncommon | Mid-fight Surprises happen three times as often, and each one gives you 1 energy. |  |
| 🗺️ Treasure Map | shop | Each new act, two Fights on the map become Treasure. |  |
| 📯 Hunter's Horn | uncommon | Whenever you defeat a rival, gain 15 gold and a random Omen. |  |
| 🌰 Golden Acorn | common | Whenever you enter a new act, gain 5 Max HP. |  |
| 🐚 Conch Shell | uncommon | Start each combat with an Undertow Charm set: when an enemy trap fires, gain Guard. |  |
| ❤️‍🔥 Forge Heart | rare | Start each combat with an Ember Pod set: the first enemy to attack you is Burned. |  |
| 🦌 Antler Crown | boss | +1 energy each turn. Mystery nodes are always fights. |  |
| 🐉 Leviathan Scale | boss | +1 energy each turn. Enemies start each combat with 6 Guard. |  |
| 🥅 Golden Net | uncommon | Rare monsters take 2 more turns to flee. | trophy: Golden Net |
| 🌅 Shard of Dawn | rare | In the Long Night, enemies have 20% less HP. Elsewhere, start each combat with 1 Edge. | trophy: Dawn Never Comes |
| 🔔 Long Peal | blessing | Blessing of the Bellmaiden: chains can be 1 link longer. |  |
| 🛎️ Answering Bell | blessing | Blessing of the Bellmaiden: the first chain of 2+ links each combat draws 2 cards and gives 1 energy. |  |
| 🪢 Extra Rope | blessing | Blessing of the Bellmaiden: +1 Reaction slot. |  |
| ⚱️ Toll for Thee | blessing | Blessing of the Bellmaiden: whenever a chain of 3+ links resolves, apply 4 Doom to ALL enemies. |  |
| 🍂 Mulch | blessing | Blessing of the Gardener: start each combat with 6 Guard. |  |
| 🌼 Perennial | blessing | Blessing of the Gardener: heal 3 HP after each combat. |  |
| 🎭 Second Face | blessing | Blessing of the Masked Patron: +1 energy each turn, but enemies have 15% more HP. |  |

## Sigils (card mods)

| Sigil | Dust | Effect |
|---|---|---|
| ◈ Keen | 60 | Its damage, Guard, Doom and healing numbers are 25% higher (at least +2). |
| ⛓ Linked | 80 | Counts as 1 extra chain link for its own Chain bonuses. |
| ↩ Ricochet | 50 | If it is Negated, it bounces back to your hand instead of the discard pile. |
| ⚡ Swift | 150 | Costs 1 less. |
| ⏳ Lasting | 40 | Palm: stays in your hand at the end of your turn. |
| ☀ Opening | 40 | Opener: always in your opening hand. |
| ☠ Reckless | 50 | Deals 50% more damage, but you lose 2 HP whenever you play it. |
| 🔁 Echoing | 160 | The first time you play it each fight, it happens twice. |
| 👻 Haunted | 60 | When this Reaction leaves play (fires, is pushed out, Sacrificed or destroyed), gain 5 Guard. |

## Booster packs

| Pack | Coins | Cards | Last-card odds | Foil |
|---|---|---|---|---|
| Duelist Pack | 100 | 5 | Legendary 4%, rare 30% | 6% |
| Ember Pack | 130 | 5 | Legendary 6%, rare 40% | 7% |
| Tide Pack | 130 | 5 | Legendary 6%, rare 40% | 7% |
| Thorn Pack | 130 | 5 | Legendary 6%, rare 40% | 7% |
| Void Pack | 130 | 5 | Legendary 6%, rare 40% | 7% |
| Gilt Pack | 130 | 5 | Legendary 6%, rare 40% | 8% |
| Glass Pack | 130 | 5 | Legendary 6%, rare 40% | 8% |
| Grave Pack | 130 | 5 | Legendary 6%, rare 40% | 8% |
| Dawn Pack | 130 | 5 | Legendary 6%, rare 40% | 8% |
| Storm Pack | 130 | 5 | Legendary 6%, rare 40% | 8% |
| Rime Pack | 130 | 5 | Legendary 6%, rare 40% | 8% |
| Beast Pack | 130 | 5 | Legendary 6%, rare 40% | 8% |
| Stone Pack | 130 | 5 | Legendary 6%, rare 40% | 8% |
| Aether Pack | 130 | 5 | Legendary 6%, rare 40% | 8% |
| Dusk Pack | 130 | 5 | Legendary 6%, rare 40% | 8% |
| Legend Pack | 400 | 3 | Legendary 25%, rare 100% | 15% |

Craft cost (Dust): common 40, uncommon 100, rare 400, legendary 1600. Dust value: common 5, uncommon 20, rare 100, legendary 400 (foil ×4).

## Talents

| School | Tier | Talent | Max | Effect per rank |
|---|---|---|---|---|
| School of Guard | 1 | Vitality | 3 | +3 Max HP. |
| School of Guard | 2 | Opening Guard | 1 | Start each combat with 3 Guard. |
| School of Guard | 3 | Field Dressing | 2 | Heal 5 HP after every rival and boss fight. |
| School of Guard | 4 | Heirloom | 1 | Start each run with a random common keepsake. |
| School of Coin | 1 | Pocket Money | 2 | Start runs with 20 more gold. |
| School of Coin | 2 | Haggler | 2 | Shop prices 6% lower. |
| School of Coin | 3 | Bounty Hunter | 2 | 10% more gold from combats. |
| School of Coin | 4 | Patron | 2 | 15% more Coins after every run. |
| School of Feint | 1 | Signature Moves | 1 | +1 Loadout slot: swap more starter cards for cards you own. |
| School of Feint | 2 | Second Look | 2 | Reroll a card reward 1 time per run. |
| School of Feint | 3 | Prepared | 1 | Draw 1 extra card on the first turn of each combat. |
| School of Feint | 4 | Connoisseur | 1 | Card rewards offer 4 choices instead of 3. |

## Trophies (achievements)

| Trophy | Goal | Reward |
|---|---|---|
| 🗡 First Blood | Win your first fight. | 50 Coins |
| 🏮 Lantern Snuffed | Defeat the Act 1 boss. | 50 Coins · Duelist Pack |
| ⟲ Call and Answer | Resolve a chain of 3 links. | 60 Coins |
| ⛓ Five-Link Fugue | Resolve a chain of 5 links. | 100 Dust · keepsake: Chain Gauntlet |
| 👹 Rival Hunter | Defeat 5 rivals. | Duelist Pack |
| 🔥 Champion Slayer | Defeat 3 Champion rivals. | 100 Coins · keepsake: Trophy Belt |
| 🎲 Daredevil | Win 3 Dares. | Legend Pack |
| 🏆 Riposte! | Win a run. | Legend Pack · keepsake: King's Reserve |
| 🎖 Three Styles | Win a run with every duelist. | 300 Coins · card: Grand Riposte |
| 🎩 House Rules | Win a run with the Cardsharp. | 150 Coins · card: Golden Riposte |
| 🌡 Turn Up the Wager | Win a run at Wager 5 or more. | Legend Pack · 🕳️ Abyssal |
| 🏟 Rising Rival | Win 3 Arena duels. | 120 Coins · 🦉 Professor Hoot |
| 🏆 Seven Straight | Reach 7 wins in one Arena run. | 300 Dust · Legend Pack |
| 🔮 Reader of Omens | Use 10 Omens. | 100 Coins · 🦋 Lanternwing |
| 🗺 Other Roads | Defeat the boss of an alternate act. | 100 Coins · 🐸 Sir Croaksworth |
| 📜 Living Legend | Raise a card to mastery 5 (Living). | 300 Dust · 📜 Card Master |
| 🎖 Four Styles | Win a run with all four duelists. | 300 Coins · 🦇 Nibbles |
| ⛰ Climbing | Unlock Stakes 3 on any duelist. | 200 Coins · 200 Dust |
| 🎁 Pack Rat | Open 5 booster packs. | 150 Coins |
| ⚒ Apprentice Smith | Craft a card. | 60 Dust |
| ◈ Sigil Scribe | Imprint a sigil on a card. | 80 Dust |
| 📚 Collector | Own 40 different cards. | Legend Pack |
| 🌟 Legend in Hand | Own a Legendary card. | 150 Coins |
| 💰 Deep Pockets | Earn 1,000 gold across all runs. | keepsake: Merchant's Seal |
| 🍀 Lucky Riposte | Win a Riposte gamble on a booster pack. | 100 Dust |
| 🪞 Leave a Mark | Mint a Legacy deck. | 100 Coins |
| 🐦‍⬛ Birds of a Feather | Win a run with the Magpie. | card: The Gilded Nest · 🦝 Bandit |
| 🫳 Sticky Fingers | Steal 25 enemy traps. | 100 Coins · keepsake: Nest Egg |
| 🎖 Five Styles | Win a run with all five duelists. | 300 Coins · card: Mirror Riposte · 🐦‍⬛ Head of the Flock |
| 🪞 Face Yourself | Defeat the Reflection in Act 4. | Legend Pack · 🐉 Smolder |
| 👑 Wandering Royalty | Defeat the Briar Queen, the Magpie King and the Orrery. | 250 Coins · 🌹 Briar Rose |
| 🧩 Riddler | Solve 6 Riddles of the Chain. | 150 Coins · Duelist Pack · 🐌 Escargot |
| ♛ Grandmaster of Riddles | Solve every Riddle of the Chain. | Legend Pack · 🪞 Silvered |
| 🎼 Seven-Link Sonata | Resolve a chain of 7 links. | 300 Dust · 🎼 Chain Virtuoso |
| 👥 Copycat | Mimic 10 cards. | 120 Coins |
| ⚰️ Six Feet Under | Win a run with the Sexton. | card: The Charnel Throne · 💀 Yorick |
| 🎖 Six Styles | Win a run with all six duelists. | 400 Coins · card: Requiem Eternal · ⚰️ Keeper of the Crypt |
| 🪏 Gravedigger | Exhume 25 Reactions. | 100 Coins · keepsake: Gravedigger's Gloves |
| ☠️ Settled Score | Defeat your Nemesis. | keepsake: Grudge Token · ☠️ Grudge Settled |
| 🌙 Night Owl | Clear the first night of the Long Night. | keepsake: Night Lamp · 🕯️ Wisp |
| 🌅 Until Dawn | Clear three nights of the Long Night. | Legend Pack · 🌅 Dawnbreaker |
| 🎪 World Tour | Win 15 fights at a Venue. | 150 Coins · 🎪 Velvet Curtain |
| 📚 Patronage | Accept 5 Patron blessings. | 120 Coins · 120 Dust |
| 🌞 Patience Pays | Fire a Reaction with 3 or more Prime. | 150 Dust |
| 🐇 Lucky Catch | Catch a rare monster before it runs away. | 100 Coins |
| 🥅 Golden Net | Catch 5 rare monsters. | 100 Coins · keepsake: Golden Net |
| 🌲 Into the Wilds | Defeat the Antlered King, the Leviathan or the Forgemother. | 100 Coins · Duelist Pack |
| 🦌 Lord of the Wilds | Defeat the Antlered King, the Leviathan and the Forgemother. | 300 Coins · Legend Pack |
| 🎴 Fated | Win a run with a Fate. | 150 Coins · 100 Dust |
| 🎉 Expect the Unexpected | Live through 10 mid-fight Surprises. | 100 Coins · 100 Dust |
| 🥾 Road Warrior | Meet 20 roadside encounters. | 120 Coins |
| ⛩️ Devout | Visit 10 Shrines. | 150 Dust |
| 🔮 Curiouser | Open 15 Mystery nodes. | 120 Coins |
| 🌑 Dawn Never Comes | Clear five nights of the Long Night. | Legend Pack · keepsake: Shard of Dawn |
| 🐦‍🔥 Ashes to Ashes | Defeat the Ash Phoenix (both times). | 150 Dust |
| 🐴 Nightmare's End | Defeat the Night Mare or the Dawn-Eater. | Legend Pack |
| 🪧 Confluence | Play a Converge card with 3 factions played that turn. | 150 Dust · ⚰️ Gravestone |

## Champion affixes

- 🛡 **Armored**: Starts with Guard equal to 25% of its HP, kept through your first turn.
- 💢 **Enraged**: Starts with 2 extra Edge.
- 💗 **Vigorous**: Has 30% more HP.
- 🂠 **Trapper**: Has 1 more trap slot and starts with a Snap Jaw set.
- 🌵 **Thorned**: Starts with 3 Barbs.

## Dares

- ⏱ **Swift Blade**: elite: Win by the end of turn 4. boss: Win by the end of turn 7.
- 🪶 **Untouchable**: elite: Lose at most 10 HP this fight. boss: Lose at most 18 HP this fight.
- 🎭 **Showman**: elite: Resolve a chain of 4 or more links. boss: Resolve a chain of 4 or more links.
- ⟲ **Riposte!**: elite: Negate at least 2 enemy actions. boss: Negate at least 2 enemy actions.
- ⛓ **Chainmaker**: elite: Resolve 5 or more chains this fight. boss: Resolve 5 or more chains this fight.

## Omens (tarot consumables)

- 🃏 **0 The Fool**: Draw 3 cards.
- 🪄 **I The Magician**: Gain 2 energy (Flux if it is the enemy turn).
- 🏮 **IX The Hermit**: Gain 14 Guard before the attack lands.
- 🎡 **X Wheel of Fortune**: Add 2 random cards from your factions to your hand. They cost 0 until played. Flip your Fate Coin.
- 🛞 **VII The Chariot**: Gain 2 Edge.
- 🙃 **XII The Hanged Man**: Negate the attack it answers.
- 💀 **XIII Death**: Apply 12 Doom to ALL enemies.
- 🗼 **XVI The Tower**: Destroy ALL enemy traps, then deal 8 damage to ALL enemies.
- ⭐ **XVII The Star**: Heal 15 HP. Also usable on the map.
- 🌙 **XVIII The Moon**: Apply 2 Shaken and 2 Exposed to ALL enemies.
- 📯 **XX Judgement**: Double the Burn and Doom on ALL enemies.
- ⚗️ **XIV Temperance**: Bank 3 energy for next turn and gain 5 Ante.
- 💞 **VI The Lovers**: Upgrade every card in your hand for this fight.
- 🌹 **III The Empress**: Gain 6 Barbs and 6 Guard before the attack lands.
- 📿 **II The High Priestess**: Reveal every enemy trap for this fight. Draw 2 cards.
- 🤴 **IV The Emperor**: Gain 1 extra Reaction slot for this fight and 6 Guard.
- ⛪ **V The Hierophant**: Upgrade 2 random cards in your deck for the rest of the run. Also usable on the map.
- 🦁 **VIII Strength**: Double your Edge, then gain 2 more.
- ⚖️ **XI Justice**: Each enemy takes 7 damage for each trap it has set, then those traps are destroyed.
- 😈 **XV The Devil**: Gain 3 energy (Flux if it is the enemy turn). Add 2 Wounds to your discard pile.
- ☀️ **XIX The Sun**: Heal 8 HP and gain 8 Guard. Your Fate Coin turns ☀.
- 🌍 **XXI The World**: Steal ALL enemy traps still set. Draw 1 card.

## Vows (Heat)

- 🛡 **Vow of Iron** (max 3): Enemies have 10% more HP.
- 💢 **Vow of Fury** (max 2): Enemies start each fight with 1 extra Edge.
- 🂠 **Vow of Snares** (max 2): Every enemy starts each fight with a Spike Shell set.
- 🪙 **Vow of Poverty** (max 2): Combats pay 25% less gold.
- 🏜 **Vow of Thirst** (max 2): Mending at the Candle heals half as much.
- 🔥 **Vow of the Hunt** (max 1): Every rival is a Champion (random affix).
- 👑 **Vow of the Crown** (max 1): Bosses carry a Champion affix.
- 😞 **Vow of Regret** (max 2): Start the run with 1 Regret jinx.
- ⏰ **Vow of the Clock** (max 1): From turn 8 of any fight, enemies gain 3 Edge (Overtime).
- 🔍 **Vow of Glass** (max 2): You start each fight with 1 Exposed.
- 💸 **Vow of Greed** (max 2): Shop prices are 25% higher.
- 🐝 **Vow of the Swarm** (max 1): Normal fights bring one extra small enemy.
- 🖋️ **Vow of Ink** (max 2): At the start of each fight, 2 random cards in your draw pile are Blotted (cost 1 more).
- 🎪 **Vow of the Stage** (max 1): Every fight takes place at a Venue.

## Weekly twists

- 🪞 **Hall of Mirrors**: Every rival is an Echo of a saved deck.
- 💰 **Gold Rush**: Combats pay double gold, but shop prices are 50% higher.
- ⛓ **Chainmail**: Whenever a chain of 3+ links resolves, heal 2 HP.
- 💔 **Sudden Death**: You and every enemy start each fight with 2 Exposed.
- 🔮 **Night of Omens**: Start with 3 random Omens. Omens drop twice as often.
- 🌟 **Borrowed Legend**: Start with a random Legendary card from your factions, owned or not.
- 🫳 **Thieves' Guild**: Start each fight by Stealing 1 enemy trap (a Glint if there is none).
- 👥 **Mimicry**: The first Attack or Trick you play each fight happens twice.
- ⚱️ **Graveyard Shift**: Your Reactions go to the Crypt when they leave play, and you Exhume 1 at the start of each turn after the first.
- 🎪 **Grand Tour**: Every fight takes place at a Venue, and Venue fights pay 50% more gold.

## Season 1 track

1: coins 60 · 2: dust 60 · 3: pack standard · 4: coins 80 · 5: cosmetic fam_inkwell · 6: dust 80 · 7: pack gilt · 8: coins 100 · 9: dust 100 · 10: cosmetic back_gilded · 11: pack standard · 12: coins 120 · 13: cosmetic title_masked · 14: dust 120 · 15: pack legend · 16: coins 140 · 17: cosmetic fam_fox · 18: dust 140 · 19: pack gilt · 20: cosmetic back_tarot · 21: coins 160 · 22: dust 160 · 23: cosmetic fam_ghost · 24: pack standard · 25: pack legend · 26: coins 200 · 27: cosmetic back_clock · 28: dust 200 · 29: cosmetic fam_crow · 30: card house_wins + cosmetic title_gilded

## Cosmetics

- 🐈‍⬛ **Inkwell the Cat** (familiar): Mrrp! Purrs at every 3-link chain.
- 🦉 **Professor Hoot** (familiar): Nods sagely at a Negate.
- 🐸 **Sir Croaksworth** (familiar): Ribbit. Has seen things in the Drowned Market.
- 🦇 **Nibbles** (familiar): Squeaks for Doom.
- 🦊 **Vesper the Fox** (familiar): Grins at a well-laid trap.
- 👻 **Boo** (familiar): A friendly Echo of an Echo.
- 🐦‍⬛ **Old Caw** (familiar): Collects shiny Ante.
- 🦋 **Lanternwing** (familiar): Drawn to the Lantern Warden. Unwisely.
- 🂠 **Duelist Classic** (back): The original crossed blades.
- 🎭 **Gilded Masquerade** (back): Season 1 gold filigree.
- 🔮 **Arcana** (back): Star-chart tarot back.
- 🕳️ **Abyssal** (back): A back that stares back.
- ⚙️ **Clockwork** (back): Brass gears, always turning.
- 🎗 **Novice Duelist** (title)
- 🎭 **The Masked** (title)
- 🔥 **High Roller** (title)
- 🏟 **Arena Champion** (title)
- 👑 **Gilded Legend** (title)
- 📜 **Card Master** (title)
- 🦝 **Bandit** (familiar): Steals the spotlight. And your snacks.
- 🐉 **Smolder** (familiar): Hatched from the Reflection's last ember.
- 🐌 **Escargot** (familiar): Takes its time. Always finds the answer.
- 🌹 **Briar Rose** (back): Thorned vines over black lacquer.
- 🪞 **Silvered** (back): A back that shows the card in front.
- 🐦‍⬛ **Head of the Flock** (title)
- 🎼 **Chain Virtuoso** (title)
- 🪞 **Unbroken Mirror** (title)
- 🧩 **Riddler** (title)
- 💀 **Yorick** (familiar): Alas. Chatters its teeth at every Exhume.
- 🕯️ **Wisp** (familiar): A little flame that followed you out of the Long Night.
- ⚰️ **Gravestone** (back): Lichen on granite. Rest in pieces.
- 🎪 **Velvet Curtain** (back): For duelists who have played every room.
- ⚰️ **Keeper of the Crypt** (title)
- ☠️ **Grudge Settled** (title)
- 🌅 **Dawnbreaker** (title)

## Act 1 encounters: The Lantern Road

- **Easy:** Cinder Rats, Gloom Moth, Bramble Beetle, Magpie
- **Normal:** Hex & Moth, Rust Knight, Bog & Rat, Beetle Swarm, Acolyte & Rat, Bog Lurker, Lattice Spider, Spider & Imp, Magpies, Wick Imps, Ink Imps, Bell Ringer, Gravemoss & Imp
- **Elite:** Gatekeeper, Twin Blades, Trapmaster Vex, The Hedge Witch
- **Boss:** The Lantern Warden

## Act 2 encounters: The Chorus Halls

- **Easy:** Tide Wraith, Mirror Imp
- **Normal:** Iron Hounds, Cult & Imp, Thorn Golem, Spore Mother, Cultist & Hound, Tide Wraith, Chain Warden, Trapper & Leech, Grave Leech, Warden & Trapper, Debt Collector, Gravecaller, Collector & Ringer
- **Elite:** Echo, Chorus Knight, Warden of Seals, The Executioner
- **Boss:** Chorus of Knives

## Act 3 encounters: The Dealer's Abyss

- **Easy:** Phase Stalker, Abyss Eye
- **Normal:** Eye & Mage, Bone Choir, Iron Colossus, Stalker & Eye, Mage & Choir, Phase Stalker, Seraph & Caller, Rift Caller, Null Seraph, Lich Archivist, Archivist & Eye
- **Elite:** Echo Champion, Grand Sentinel, The Mirror Knight
- **Boss:** The Last Dealer

## Act 1B encounters: The Drowned Market

- **Easy:** Pickpockets, Drowned Bell, Jar Mimic
- **Normal:** Eel Merchant, Bell & Rat, Mimic & Bell, Eel & Rat, Hex & Mimic, Rust Knight, Lattice Spider, Spider & Imp, Magpies, Wick Imps, Ink Imps, Bell Ringer, Gravemoss & Imp
- **Elite:** The Auctioneer, Trapmaster Vex, Gatekeeper, The Hedge Witch
- **Boss:** The Tide Broker

## Act 2B encounters: The Gilded Masquerade

- **Easy:** Masked Dancer, Velvet Knife
- **Normal:** Jester & Doll, Porcelain Doll, Dancers, Knife & Jester, Doll & Imp, Iron Hounds, Chain Warden, Trapper & Leech, Grave Leech, Warden & Trapper, Debt Collector, Gravecaller, Collector & Ringer
- **Elite:** Sun & Moon, Echo, Chorus Knight, The Executioner
- **Boss:** The Impresario

## Act 3B encounters: The Clockwork Abyss

- **Easy:** Gear Sentry, Paradox Moth
- **Normal:** Wraith & Sentry, Brass Scorpion, Moth & Wraith, Scorpion & Moth, Hour Wraith, Eye & Mage, Seraph & Caller, Rift Caller, Null Seraph, Lich Archivist, Archivist & Eye
- **Elite:** Clockwork Knight, Echo Champion, Grand Sentinel, The Mirror Knight
- **Boss:** The Clockmaker

## Enemies

| Enemy | Aspect | HP | Moves | Traps |
|---|---|---|---|---|
| 🐀 Cinder Rat | Blaze | 13–16 | Bite: atk 5 · Singe: atk 3, burn 2 |  |
| 🪲 Bramble Beetle | Wild | 24–28 | Harden: block 4, trap spike_shell · Horn: atk 8 | spike_shell |
| 🦋 Gloom Moth | Umbral | 15–18 | Gloom Dust: atk 3, weak 2 · Flutter: atk 3, times 2 |  |
| 🧙 Hex Acolyte | Umbral | 22–26 | Hex: trap hex_mirror, block 3 · Bolt: atk 7 · Chant: str 2 | hex_mirror |
| ⚔️ Rust Knight | Stone | 32–36 | Slash: atk 10 · Brace: block 9, trap snap_jaw | snap_jaw |
| 🐸 Bog Lurker | Flood | 27–31 | Tongue Lash: atk 6, vuln 1 · Lurk: block 5, trap ambush | ambush |
| 🗿 Gatekeeper | Stone | 66–70 | Smash: atk 14 · Fortify: block 10, str 2 · Seal: atk 6, trap counter_glyph | counter_glyph |
| 🗡️ Left Blade | Storm | 29–31 | Flurry: atk 5, times 2 · Snap Guard: atk 4, trap snap_jaw | snap_jaw |
| 🔪 Right Blade | Frost | 29–31 | Thrust: atk 9 · Hone: block 6, str 1 |  |
| 🎭 Trapmaster Vex | Storm | 56–60 | Lay Trap: atk 5, fnLabel Set trap · Spring: atk 11 | ambush, spike_shell, smother |
| 🏮 The Lantern Warden | Radiant | 128–128 | Searing Sweep: atk 6, times 2, burn 2 · Kindle: str 2, trap spike_shell2 · Lantern Glare: weak 2, vuln 1, block 12 · FLARE: atk 18, burn 3 | spike_shell2 |
| 👻 Tide Wraith | Flood | 42–46 | Drain: atk 9, heal 4 · Veil: block 8, trap smother2 | smother2 |
| 🐺 Iron Hound | Stone | 30–34 | Savage Bite: atk 6, times 2 · Howl: str 2, block 5 |  |
| 🕯️ Ash Cultist | Blaze | 46–50 | Ritual: self ritual,2 · Flame: atk 6, burn 2 |  |
| 😈 Mirror Imp | Frost | 34–38 | Glyph: atk 5, trap counter_glyph2 · Claw: atk 12 | counter_glyph2 |
| 🌵 Thorn Golem | Wild | 62–66 | Slam: atk 12 · Grow: block 14, self thorns,2 |  |
| 🍄 Spore Mother | Wild | 48–52 | Spores: weak 2, vuln 2 · Lash: atk 9 · Seed: atk 5, wound 1 |  |
| 🪞 Echo | None | 84–88 | Plays a saved deck (Echo) |  |
| 🛡️ Chorus Knight | Radiant | 104–110 | Cleave: atk 11, times 2 · Ward: block 16, trap counter_glyph2 · Rally: str 3, trap snap_jaw2 | counter_glyph2, snap_jaw2 |
| 🔒 Warden of Seals | Stone | 96–100 | Seal: atk 9, fnLabel Set trap · Crush: atk 18 | mirror_veil2, counter_glyph2, ambush2 |
| 🎼 Chorus of Knives | Storm | 150–150 | Verse:  · Refrain: block 12, trap counter_glyph2; trap smother2 · Harmonics: str 2, weak 2 · CRESCENDO: atk 28 | counter_glyph2, smother2 |
| 🕷️ Phase Stalker | Umbral | 58–62 | Rake: atk 6, times 3 · Vanish: block 18, trap ambush3 | ambush3 |
| 👁️ Abyss Eye | Umbral | 52–56 | Gaze: vuln 2, weak 2, block 8 · Beam: atk 14 |  |
| 💀 Bone Choir | Umbral | 38–42 | Dirge: fnLabel All +2 Str · Rattle: atk 7, times 2 |  |
| 🤖 Iron Colossus | Stone | 105–112 | Colossal Smash: atk 22 · Charge: block 20, str 3, trap spike_shell3 | spike_shell3 |
| 🔮 Void Mage | Umbral | 50–54 | Hex: atk 9, trap hex_mirror3 · Nova: atk 4, times 3 | hex_mirror3 |
| 🪞 Echo | None | 120–125 | Plays a saved deck (Echo) |  |
| 🛕 Grand Sentinel | Radiant | 150–155 | Judgement: atk 20 · Flurry: atk 8, times 3 · Bastion: block 22, trap counter_glyph3; trap thorn_snare3 | counter_glyph3, thorn_snare3 |
| 🃏 The Last Dealer | Radiant | 192–192 | The Deal: atk 10, fnLabel Set 2 traps · Call: atk 4, times 4 · Raise: str 2, block 20 · ALL IN: atk 30 | counter_glyph3, smother3, ambush3, snap_jaw3, mirror_veil3 |
| 🐭 Pickpocket Rat | Wild | 14–17 | Pilfer: atk 4, fnLabel Steal gold · Scurry: block 6 |  |
| 🐍 Eel Merchant | Storm | 26–30 | Haggle: weak 1, trap hex_mirror, block 4 · Shock: atk 9 | hex_mirror |
| 🏺 Jar Mimic | Stone | 30–34 | Chomp: atk 11 · Rattle: block 7, trap snap_jaw | spike_shell, snap_jaw |
| 🔔 Drowned Bell | Flood | 20–24 | Toll: atk 3, times 2 · Knell: vuln 2, block 5 |  |
| 🧑‍⚖️ The Auctioneer | Radiant | 70–74 | Going Once: block 10, trap counter_glyph · Going Twice: atk 8, str 1 · SOLD!: atk 22 | counter_glyph |
| 🐙 The Tide Broker | Flood | 133–133 | Ink Cloud: weak 2, block 10 · Tentacles: atk 4, times 4 · Collect: trap ambush; trap snap_jaw; block 6 · MARGIN CALL: atk 20, vuln 2 | ambush, snap_jaw |
| 💃 Masked Dancer | Umbral | 38–42 | Waltz: atk 7, times 2 · Pirouette: block 12, trap mirror_veil2 | mirror_veil2 |
| 🎎 Porcelain Doll | Frost | 44–48 | Weep: weak 2, vuln 1, block 6 · Shatter: atk 14 |  |
| 🤡 Jester | Storm | 34–38 | Juggle: atk 3, times 3 · Prank: block 5, fnLabel Set trap | ambush2, smother2 |
| 🥷 Velvet Knife | Umbral | 40–44 | Backstab: atk 13 · Vanish: block 14, trap ambush2 | ambush2 |
| 🌞 Mask of the Sun | Radiant | 54–58 | Blaze: atk 12 · Dawn: fnLabel Heal all 8; str 1 |  |
| 🌚 Mask of the Moon | Umbral | 54–58 | Eclipse: weak 2, fnLabel Guard all 8 · Night Tide: atk 6, times 2, trap counter_glyph2 | counter_glyph2 |
| 🎩 The Impresario | Radiant | 150–150 | Overture: str 2, trap counter_glyph2; block 8 · Spotlight: atk 9, times 2, vuln 1 · Intermission: block 16, trap smother2 · GRAND FINALE: atk 26 | counter_glyph2, smother2, mirror_veil2 |
| ⚙️ Gear Sentry | Stone | 54–58 | Tick: block 12 · Tock: atk 17 |  |
| ⏳ Hour Wraith | Frost | 48–52 | Rewind: heal 10, trap counter_glyph3 · Sandblast: atk 6, times 3 | counter_glyph3 |
| 🦂 Brass Scorpion | Blaze | 58–62 | Sting: atk 11, weak 2 · Burrow: block 16, trap ambush3 | ambush3 |
| 🦋 Paradox Moth | Storm | 44–48 | Flicker: atk 5, times 2, vuln 2 · Mirror: block 10, trap mirror_veil3 | mirror_veil3 |
| 🕹️ Clockwork Knight | Stone | 148–154 | Wind Up: str 2, block 14, trap snap_jaw3 · Cogs: atk 10, times 2 · MIDNIGHT: atk 30 | snap_jaw3 |
| 🕰️ The Clockmaker | Storm | 212–212 | Gear Storm:  · Wind the Spring: str 3, block 18 · Stop Time: weak 2, trap counter_glyph3; trap smother3 · TWELVE: atk 34 | counter_glyph3, smother3, ambush3 |
| 🐦 Magpie | Frost | 16–19 | Snatch: atk 4, fnLabel Steal a Reaction · Peck: atk 3, times 2 |  |
| 🕸️ Lattice Spider | Frost | 20–24 | Weave: block 5, trap tripwire · Bite: atk 7 · Venom: atk 4, weak 1 | tripwire |
| 👺 Wick Imp | Blaze | 15–18 | Flicker: block 4, str 1 · Spit: atk 4, burn 2 |  |
| 🧹 Broomling | Wild | 10–12 | Sweep: atk 5 |  |
| 🧙 The Hedge Witch | Wild | 62–66 | Brew: block 6, fnLabel Summon Broomling · Cackle: atk 7, times 2 · Hex: weak 2, vuln 1, trap hex_mirror | tripwire, hex_mirror |
| 🥀 Briarling | Wild | 12–14 | Stab: atk 5 |  |
| 🌹 The Briar Queen | Wild | 120–120 | Hold Court: block 8, fnLabel Summon Briarling · Rose Lash: atk 7, times 2 · Crown of Thorns: str 1, self thorns,1, trap bear_trap · WRATH OF ROSES: atk 5, times 4 | thorn_snare, bear_trap |
| ⛓️ Chain Warden | Stone | 44–48 | Chain Lash: atk 10 · Bind: weak 1, block 10 |  |
| 🏹 Trapper | Wild | 36–40 | Set Snares: block 6, trap bear_trap2 · Volley: atk 5, times 2 | bear_trap2 |
| 🪱 Grave Leech | Umbral | 38–42 | Drain: atk 7, heal 4 · Coil: block 8, trap soul_snare2 | soul_snare2 |
| 🪓 The Executioner | Stone | 100–106 | Mark: vuln 2, block 14 · Chop: atk 12 · EXECUTE: atk 32 |  |
| 🦚 The Magpie King | Radiant | 180–180 | Pilfer: atk 6, fnLabel Steal a Reaction · Swoop: atk 5, times 3 · Hoard: fnLabel Guard; trap smother2 · TREASURE STORM:  | snap_jaw2, smother2 |
| 👼 Null Seraph | Radiant | 52–56 | Smite: atk 9, times 2 · Hymn: fnLabel Heal all 6, trap smother3 | smother3 |
| 🌀 Rift Caller | Storm | 46–50 | Open Rift: block 10, fnLabel Summon Rift Spawn · Rift Bolt: atk 13 |  |
| 👾 Rift Spawn | Storm | 16–18 | Claw: atk 7 |  |
| 🪞 The Mirror Knight | Frost | 140–146 | Reflect:  · Mirror Guard: block 18, trap counter_glyph3 · Silver Cleave: atk 10, times 2 | counter_glyph3 |
| 🪐 The Orrery | Radiant | 222–222 | ☀ Solar Flare: atk 12, times 2, fnLabel Flip · ☾ Lunar Tide: block 16, heal 10, fnLabel Set trap, flip · Alignment: str 3, block 12 · ECLIPSE: atk 36 | counter_glyph3, mirror_veil3, tripwire3 |
| 🖋️ Ink Imp | Umbral | 17–20 | Ink Splash: atk 5, fnLabel Blot 1 · Scribble: atk 3, times 2 |  |
| 🔔 Bell Ringer | Storm | 28–32 | Toll: atk 8 · Peal: block 5, trap soul_snare | soul_snare |
| 🍄 Gravemoss | Wild | 24–28 | Spore Cloud: atk 4, weak 1 · Creep: block 6, self thorns,1, trap thorn_snare | thorn_snare |
| 🛎️ The Bell Tyrant | Storm | 106–106 | Great Toll: atk 7, times 2 · Call the Ringers: block 8, fnLabel Summon Bell Ringer · Deafening Peal: weak 2, trap soul_snare, block 6 · DEATH KNELL: atk 16 | soul_snare, snap_jaw |
| 🧙‍♀️ The Inkwitch | Umbral | 86–92 | Blot Storm: atk 6, fnLabel Blot 3 · Quill: atk 8, times 2 · Smudge: block 12, trap tripwire2 | hex_mirror2, tripwire2 |
| 💼 Debt Collector | Stone | 44–48 | Audit: atk 6, fnLabel Take 8 gold · Repossess: atk 6, times 2 |  |
| 🪦 Gravecaller | Umbral | 40–44 | Raise Dead: block 6, trap snap_jaw2, fnLabel Summon Skeleton · Bone Spear: atk 11 | snap_jaw2 |
| 💀 Skeleton | Stone | 10–12 | Rattle: atk 6 |  |
| 📜 The Blotted Saint | Radiant | 178–178 | Excommunicate: atk 10, fnLabel Blot 3 · Inkfall: atk 5, times 4 · Vellum Ward: block 18, fnLabel Set a trap · ILLUMINATE: heal 20, str 3 | hex_mirror2, tripwire2, counter_glyph2 |
| 📕 Lich Archivist | Frost | 56–60 | Burn the Pages: atk 6, fnLabel Fold 2 from your draw pile · Shadow Bolt: atk 14 · Ward: block 15, trap smother3 | smother3 |
| ☠️ The Bone Bishop | Umbral | 148–154 | Last Rites: fnLabel Heal all 10; fnLabel Summon Skeleton · Sermon: atk 9, times 2, vuln 1 · Absolution: block 20, str 2, trap counter_glyph3 | counter_glyph3, soul_snare3 |
| ⚰️ The Gravelord | Umbral | 212–212 | Raise the Fallen: block 10, fnLabel Summon Skeleton · Scythe: atk 12, times 2 · Tomb Ward: block 16, fnLabel Set a trap · THE REAPING: atk 30 | snap_jaw3, counter_glyph3, soul_snare3 |
| 🪞 The Reflection | None | 240–240 | Plays a saved deck (Echo) |  |
| 🤺 Rival | None | 56–56 | Plays a saved deck (Echo) |  |
| 🦊 Briar Fox | Wild | 17–20 | Nip: atk 3, times 2 · Dash: atk 7 · Slink: block 5, weak 1 |  |
| 🐺 Grey Wolf | Frost | 23–27 | Maul:  · Howl: block 4, str 1 |  |
| 🐢 Mossback Tortoise | Stone | 32–36 | Retreat: block 7, trap spike_shell · Snap: atk 9 | spike_shell |
| 🦉 Hollow Owl | Storm | 16–19 | Watch: block 3, trap hex_mirror · Swoop: atk 6, weak 1 | hex_mirror |
| 💡 Will-o'-Wisp | Radiant | 12–15 | Lure: vuln 1, weak 1 · Flicker: atk 4, burn 1 |  |
| 🐗 Bramble Boar | Wild | 29–33 | Root Around: block 6, str 1 · Gore: atk 11 |  |
| 🐝 Bee Swarm | Wild | 19–23 | Sting: atk 2, times 4 · Buzz: block 5, self thorns,1 |  |
| 🐺 The Alpha | Frost | 60–64 | Rend: atk 7, times 2 · Call the Pack: block 8, fnLabel Summon Grey Wolf · Rally: fnLabel All +1 Str |  |
| 🌳 Old Oak | Wild | 76–82 | Crushing Bough: atk 16 · Grow: block 12, self thorns,1, trap thorn_snare · Scatter Seeds: atk 4, fnLabel Summon Briarling | thorn_snare |
| 🐻 Hexed Bear | Umbral | 68–72 | Maul: atk 13 · Swipe: atk 5, times 2, weak 1 · Den: block 10, trap bear_trap · FRENZY: str 3, atk 8 | bear_trap |
| 🦌 The Antlered King | Wild | 106–106 | Trample: atk 7, times 2 · Call of the Wild: block 8, fnLabel Summon Grey Wolf · Crown of Antlers: self thorns,2, trap feral_howl; trap thorn_snare · THE WILD HUNT: atk 4, times 4 | thorn_snare, feral_howl |
| 🕊️ Gull Flock | Storm | 26–30 | Peck: atk 3, times 3 · Snatch: atk 5, fnLabel Take 6 gold |  |
| 🦀 Shore Crab | Flood | 40–44 | Pinch: atk 10 · Scuttle: block 10, trap spike_shell2 | spike_shell2 |
| 🧟 Drowned Sailor | Flood | 40–44 | Haul: atk 8, wound 1 · Anchor: block 9, vuln 1 · Gnaw: atk 6, times 2 |  |
| 🧜 Siren | Flood | 36–40 | Siren Song: weak 2, fnLabel Set a trap · Lure: atk 10, vuln 1 | hex_mirror2, undertow_charm2 |
| 💣 Cannoneer | Blaze | 36–40 | Load the Cannon: block 6 · FIRE!: atk 20 |  |
| 🏴‍☠️ Wrecker | Storm | 46–50 | Cutlass: atk 7, times 2 · Plunder: str 1, trap snap_jaw2, block 6 | snap_jaw2 |
| 🪼 Lantern Jelly | Storm | 30–34 | Sting: atk 7, weak 1 · Drift: block 8, self thorns,1 |  |
| 🪝 Deckhand | Flood | 14–16 | Hook: atk 6 |  |
| ☠️ Captain Saltbones | Flood | 96–102 | Broadside: atk 6, times 3 · All Hands!: block 10, fnLabel Summon Deckhand · Grog: heal 10, str 2, trap bear_trap2 | snap_jaw2, bear_trap2 |
| 🧙 The Sea Hag | Frost | 88–94 | Curse of the Deep: wound 2, weak 2 · Tidal Hex: atk 12, fnLabel Blot 2 · Brine Ward: block 15, fnLabel Set a trap | tripwire2, smother2 |
| 🦑 Kraken Arm | Flood | 50–54 | Grab: atk 9, vuln 1 · Squeeze: atk 5, times 2 · Coil: block 12 |  |
| 🐋 The Leviathan | Flood | 180–180 | Tidal Wave: atk 8, times 2, weak 1 · Dive: block 18, fnLabel Set a trap · Into the Depths: atk 7, fnLabel Fold 2 from your draw pile · BREACH: atk 24 · MAELSTROM: atk 4, times 5 | undertow_charm2, smother2, spike_shell2 |
| 🦎 Salamander | Blaze | 50–54 | Flame Tongue: atk 8, burn 3 · Bask: heal 8, str 2 |  |
| 🗿 Slag Golem | Stone | 96–104 | Smelt: block 18, trap ember_pod3 · Pound: atk 23 | ember_pod3 |
| 👹 Forge Imp | Blaze | 26–30 | Hammer: atk 6, times 2 · Stoke: fnLabel All +1 Str |  |
| 🐉 Cinder Wyrmling | Blaze | 58–62 | Cinder Breath: atk 5, times 3, burn 2 · Wingbeat: block 12, weak 2 |  |
| 🛡️ Obsidian Knight | Stone | 74–80 | Smite: atk 17 · Bulwark: block 18, trap counter_glyph3 | counter_glyph3 |
| 🫠 Magma Ooze | Blaze | 66–70 | Engulf: atk 13 · Ooze: burn 4, block 8 |  |
| 🔥 Ember Blob | Blaze | 13–15 | Splash: atk 6, burn 1 |  |
| 💨 Bellows Spirit | Storm | 44–48 | Gust: fnLabel All enemies +8 Guard · Furnace Roar: atk 10, weak 2 |  |
| 🔨 The Ironmonger | Stone | 146–152 | Temper: str 3, block 14 · Hammerfall: atk 22 · Quench: heal 12, fnLabel Set a trap · Sparks: atk 6, times 2, burn 2 | counter_glyph3, ember_pod3 |
| 🐦‍🔥 Ash Phoenix | Blaze | 108–114 | Firestorm: atk 7, times 2, burn 2 · Ember Dive: atk 19 · Preen: block 14, str 2 |  |
| 🌋 The Forgemother | Blaze | 210–210 | Pour the Mould: block 18, fnLabel Summon a Forge Imp · Molten Rain: atk 5, times 4, burn 2 · Anvil Strike: atk 24 · Temper: str 2, fnLabel Set a trap; block 12 · THE CRUCIBLE: atk 32 | ember_pod3, counter_glyph3, spike_shell3 |
| 👺 Card Goblin | Storm | 18–22 | Cheat: atk 4, wound 1 · Cackle: block 4, str 1 · Stab: atk 7 |  |
| 🟤 Mudling | Stone | 22–26 | Glob: atk 5, weak 1 · Wallow: block 8 · Slam: atk 8 |  |
| 🎃 Scarecrow | Wild | 28–32 | Stare: vuln 1, block 6 · Scythe: atk 9 | tripwire |
| 🧰 Chest Mimic | Stone | 40–44 | Chomp: atk 13 · Slam the Lid: block 12, trap snap_jaw2 | snap_jaw2 |
| 🐀 The Rat King | Umbral | 38–42 | Squeak: block 6, fnLabel Summon Cinder Rat · Gnaw: atk 8, wound 1 |  |
| 🗡️ Shadow Duelist | Umbral | 42–46 | Feint: block 6, fnLabel Set a trap · Lunge: atk 11 · Riposte: atk 5, times 2 | counter_glyph2, ambush2 |
| 🪆 Puppeteer | Umbral | 34–38 | Pull Strings: block 8, fnLabel Summon Marionette · Jab: atk 9 |  |
| 🎎 Marionette | Wild | 15–17 | Dance: atk 4, times 2 |  |
| 🌠 Star Eater | Umbral | 60–64 | Devour: atk 15, heal 6 · Void Pull: vuln 2, weak 1, block 10 |  |
| 😈 Chain Devil | Blaze | 56–60 | Chain Lash: atk 6, times 3 · Bind: str 2, trap soul_snare3, block 8 | soul_snare3 |
| 🫧 Void Jelly | Umbral | 48–52 | Pulse: atk 13 · Absorb: block 14, self thorns,2 |  |
| ❄️ Frost Wraith | Frost | 50–54 | Chill: atk 9, weak 2 · Freeze: block 10, fnLabel Blot 2 |  |
| 🧌 Bridge Troll | Stone | 42–46 | Club: atk 10 · Bellow: str 2, block 6 · Stomp: atk 4, times 2, weak 1 |  |
| 🐇 Gilded Hare | Radiant | 28–28 | Hop Away: block 6 · Kick: atk 3 |  |
| 🦞 Treasure Crab | Flood | 52–52 | Burrow: block 12 · Nip: atk 6 |  |
| 🌟 Wishing Star | Radiant | 76–76 | Twinkle: block 14 · Starflare: atk 9, weak 1 |  |
| 👻 Phantom | Umbral | 18–20 | Wail: atk 7, weak 1 |  |
| 🐴 The Night Mare | Umbral | 226–226 | Nightmare Gallop: atk 10, times 2 · Bad Dreams: weak 2, vuln 2, fnLabel Blot 2 · Ride of Phantoms: block 16, fnLabel Summon Phantom · Veil of Sleep: block 12, fnLabel Set a trap | smother3, tripwire3, soul_snare3 |
| 🌑 The Dawn-Eater | Umbral | 250–250 | Eclipse: str 2, block 18 · Devour Light: atk 28 · Long Shadows: atk 6, times 3, fnLabel Set a trap · HUNGER: self ritual,2, heal 20 | counter_glyph3, smother3, ember_pod3 |
