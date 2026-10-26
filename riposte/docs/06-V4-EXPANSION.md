# Riposte v0.4: "Thieves & Mirrors"

v0.4 adds as much as fits around one idea: **the chain is a conversation, so let players steal the other side's lines.** Every addition either feeds that idea (Steal, Mimic, the Reflection, Riddles) or widens the game around it (summoners, wandering bosses, more cards for every faction, UX).

All decisions below were made without a playtest round. Each is reversible, and the reasons are written down so a later pass can undo the wrong ones.

## 1. The Magpie (5th character) and the Glass faction

| | |
|---|---|
| Unlock | Level 5 |
| HP / slots | 72 HP, 2 Reaction slots |
| Factions | Glass + Void + Neutral |
| Starter relic | **Magpie's Nest**: at the start of each combat, Steal 1; if there was nothing to steal, add 2 Glints to your hand |
| Starting deck | Strike ×4, Guard ×3, Snatch ×2, Glass Edge, Sleight |

**Why a thief.** Every other character answers enemy traps (negate, bait, break). Nobody *takes* them. Stealing turns the enemy's hidden information into your resource, which no deckbuilder we benchmarked does (Slay the Spire, Monster Train, Balatro, Inscryption, Wildfrost; Hearthstone's "steal" effects take cards from decks, not set traps). It is also readable on a phone: the trap physically slides from their row into your slot.

New keywords:

- **Steal N**: take the opponent's oldest face-down trap(s) into your own free Reaction slots. A stolen enemy trap fires *for you* on its usual trigger, then vanishes (it never enters your deck). With no free slot, an enemy trap becomes a Glint instead. With nothing to steal, many Glass cards give a Glint.
- **Glint**: a 0-cost special Skill, Exhaust: deal 4 damage to a random enemy. Prism (status) and Prism Lens (relic) add to it.
- **Mimic**: replay the last Attack or Skill you played this turn (Powers and Mimic cards themselves are never copied).

The faction has 25 cards plus 2 Legendaries (*Gilded Nest*, *Mirror Riposte*). Highlights: *Glass Cannon* (damage per Glint in hand), *Hall of Mirrors* (copies the trap it negates into your slot), *Doppelgänger* (your next card this turn happens twice), *Crow Court* (Power: steal at the start of each turn), *Kleptomania* (each steal draws and gives Block).

**Enemies steal back.** The Magpie (Act 1) and the Magpie King (wandering Act 2 boss) steal *your* Reactions and set them against you. Kill the thief and the card returns to your discard pile. That makes "who holds which card" a real board state, which the chain needed.

## 2. Riddles of the Chain (puzzle mode)

14 one-turn puzzles in the Events tab, three difficulty tiers, paying 30 / 60 / 100 Coins on first solve. Every enemy trap is face-up and nothing is random.

**Why.** Yu-Gi-Oh! duel puzzles and Hearthstone's Puzzle Lab are the best tutorials either game ever had: they teach interactions by forcing you to find the one line. Riposte's chain is its hardest concept, so a puzzle mode teaches it better than any tooltip. It also gives a short, offline, no-run activity for a commute.

**Quality bar.** `sim/solver.ts` searches every play order and target, memoised on game state. `npm test` proves for each riddle that (a) a solution exists and (b) playing the hand left to right fails. Each riddle's HP was then set to the highest value that is still solvable, so there is no slack.

## 3. Act 4: the Reflection

Beat the Act 3 boss after slaying 2+ Champion elites and you are offered an epilogue. The Reflection has 240 HP, your Reaction slot count, +1 energy, 2 Strength, and it plays **a copy of your own deck** with the Echo ghost engine. You heal half your missing HP first. The run already counts as won; the fight adds +400 score, +80 XP, a trophy and the "Unbroken Mirror" title.

**Why.** It gives strong runs a final exam that is different every time, because your deck is the boss. It reuses the Echo engine, so it costs rules, not content.

## 4. Wandering bosses

Each act has a 1 in 3 chance to swap its boss for a wanderer, whichever act variant you rolled:

- **The Briar Queen** (Act 1): summons Briarlings, grows Thorns, Wrath of Roses below half HP.
- **The Magpie King** (Act 2): steals your Reactions or 10 gold; you get the gold back when it dies.
- **The Orrery** (Act 3): has its own Fate Coin and cycles sun, moon, alignment and eclipse moves.

The map header shows a pill when a wanderer is waiting at the end of the act.

## 5. New enemies and traps

18 new enemies: Magpie, Lattice Spider, Wick Imp, Broomling, Briarling, Chain Warden (gains Strength from chains of 3+), Trapper, Grave Leech, Null Seraph, Rift Caller, Rift Spawn; elites the Hedge Witch (summons Broomlings that die with her), the Executioner and the Mirror Knight (replays your last card back at you); the three wandering bosses; and the Reflection.

**Summons** are new to the engine: an enemy can bring in another (max 3 alive), the newcomer sleeps for one turn, and it reuses a fallen enemy's position so targeting stays stable.

3 new trap types, each in 3 tiers: **Tripwire** (answers a Skill: Vulnerable), **Bear Trap** (answers an Attack: Weak), **Soul Snare** (answers a Reaction: damage).

## 6. More for everyone

- **22 cards** for the existing factions: *Lure*, *Tempo*, *Second Thoughts*, *Hair Trigger*, *Chainbreaker* (Neutral); *Flashpoint*, *Cinder Cloak*, *Smoulder*, *Pyroclasm* (Ember); *Low Tide*, *Whirlpool*, *Undercurrent* (Tide); *Nettle Wall*, *Pollen Burst*, *Briar Lash*, *Ancient Bark* (Thorn); *Last Rites*, *Grave Robber*, *Soul Fracture* (Void); *Lucky Charm*, *Card Counting*, *Bankroll* (Gilt). Plus the Legendary **Ouroboros**: chains can be 8 links long, and every chain of 4+ draws you cards.
- **15 relics**, e.g. Silver Thimble (the first HP loss each fight is only 1), Ouroboros Ring (7-link chains, heal on 6+), Lantern of Truth (enemy traps face-up, Negates hit everyone), the boss relic Cracked Hourglass (+1 energy, Reactions cost 1 more) and the trophy relic Nest Egg (gold per Steal). Exact text for all of them is in [CATALOG.md](CATALOG.md).
- **8 Omens**: The High Priestess, The Emperor, The Hierophant, Strength, Justice, The Devil, The Sun, The World.
- **3 Vows**: Vow of Glass (start fights Vulnerable), Vow of Greed (pricier shops), Vow of the Swarm (an extra small enemy in normal fights). **2 Weekly Twists**: Thieves' Guild (steal a trap at the start of each fight), Mimicry (your first Attack or Skill each fight happens twice).
- **6 events**: The Magpie's Hoard, The Trapsmith, The Shattered Mirror, The Wishing Well, The Chained Duelist, The Owl of Riddles.
- **9 trophies**, 3 Familiars (Bandit, Smolder, Escargot), 2 card backs (Rose, Mirror), 4 titles. A Glass booster pack.

## 7. UX and graphics

- **Damage preview**: select a card and every enemy's HP bar shows the loss as a striped segment, with a "−N" / "KILL" tag. It runs the real rules on a copy of the fight with hidden traps removed, so it never leaks information (the trap warning line under the card says how many face-down traps could still answer it). Can be turned off in Settings.
- **Combat log**: a 📜 button opens the full text log of the fight.
- **Run highlights** on the victory/defeat screen: biggest hit, longest chain, steals, mimics, Act 4 result.
- Glass card art: a procedural shattered-pane motif with a moving sheen; 50+ new card icons; enemy trap icons when you steal them; stolen traps shown dashed in your slots.
- Act 4 palette and music mood; a riddle music mood; new sound effects for steal, summon and solve.
- A one-time "What's new in v0.4" note for returning players.

## 8. Balance

See [BALANCE.md](BALANCE.md). The bot win rate at Ascension 0 is 17–43% for all five characters.
