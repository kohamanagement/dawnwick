# Riposte v0.5: "Graves & Venues"

_2026-10-25. Builds on v0.4 ("Thieves & Mirrors", [06-V4-EXPANSION.md](06-V4-EXPANSION.md))._

v0.5 answers one question: **what are the best card games and roguelikes of 2026 doing that Riposte still is not?** I looked at the big releases and announcements of the year, listed the mechanics and structures Riposte lacked, and built each one with a twist that runs through the chain, so none of it is a plain copy.

## 1. What the research found

| Trend (2026) | Where it shows up | What Riposte lacked | What v0.5 built |
|---|---|---|---|
| **The graveyard as a resource** | Slay the Spire II's Necrobinder; Yu-Gi-Oh!'s long tradition of graveyard effects | Discarded cards were dead. Nothing cared about *where* a card went after it was used | **The Sexton** and the **Crypt** (Exhume, Bury, Haunt) |
| **Cards that charge up while you wait** | StS2's Regent (Stars); Hearthstone's *Prepare* keyword (Fall of the Crimson Fort) | Set Reactions were static: the same on turn 1 and turn 6 | **Prime** Reactions that grow each turn they stay set |
| **Rewarding a rainbow of colours** | MTG *Secrets of Strixhaven* (Converge returns); Lorcana's multi-ink decks | Two-faction characters had no reason to dip into neutral or splash | **Converge** cards that count the factions you played this turn |
| **Battlefields that change the rules** | *Riftbound* (League of Legends TCG) battlefields; Marvel Snap locations; Lorcana *Hyperia City* locations | Every fight happened in the same blank room | **16 Venues** that bend the chain for everyone |
| **A run-shaping visitor between acts** | StS2's **Ancients** (Neow and friends at every act boundary) | Act transitions were a heal and nothing else | **5 Patrons** offering **20 blessings** at the start of Acts 2 and 3 |
| **Card enchantments with a price** | StS2 Enchantments | Sigils were all upside | **Reckless**, **Echoing**, **Haunted** sigils (two have drawbacks) |
| **Persistence between runs** | Shadow of Mordor's Nemesis system; roguelites that remember your killer (Rogueliker's 2026 roundups) | Death had no memory | **The Nemesis**: whatever killed you comes back promoted, with a title and a grudge |
| **Endless modes** | Balatro's endless, StS2 and most 2026 roguelites (mobile deckbuilder lists rank "post-game" highly) | A win ended the run | **The Long Night**: endless scaling acts after a win, with a rotating boss |

Also considered and left out: Hearthstone *Cataclysm*'s **Shatter** (cards that split in two). It overlaps with the Magpie's Glints and the v0.4 Mimic, so it would add a keyword without a new decision.

## 2. The Sexton ⚰️ and the Grave faction

The 6th character (unlocks at level 6). 78 HP, factions **Grave + Thorn**, starter relic **Gravedigger's Spade**.

- **Crypt:** while the Sexton plays, Reactions that leave play (fire, get pushed out, are Sacrificed or destroyed) go to the Crypt instead of the discard pile. There is a Crypt pile button in combat.
- **Exhume N:** take the newest Reaction out of the Crypt and **set it straight into a free slot** (into your hand if the slots are full). The Spade Exhumes 1 on every even turn.
- **Bury N:** move the top N cards of your draw pile into the Crypt (Reactions only stay; they become Exhume fuel).
- **Haunt:** a second effect that fires when the card is Buried or enters the Crypt.

**The twist:** in Yu-Gi-Oh! and StS2 the graveyard is a pile you recur from. In Riposte the Crypt **refills your chain**. An Exhumed trap is set at no energy cost, so the Sexton's turns are "fire a Reaction, get it back, fire it again". The bot logs ~50 chains per run as the Sexton, the most of any character.

27 cards: 3 starters (Tombstone, Gravedig, Spade Strike), 7 commons, 10 uncommons, 5 rares, and 2 Legendaries: **Charnel Throne** (every Reaction you fire deals damage equal to your Crypt size) and **Requiem Eternal** (a Negate whose Haunt returns it to your hand).

## 3. Prime and Converge (16 cards across every faction)

- **Prime** (Neutral *Slow Fuse*, Ember *Banked Embers*, Tide *Still Water*, Thorn *Heartwood Ward*, Void *Gathering Dark*, Gilt *Compound Interest*, Glass *Long Con*, Grave *Cairn* and *Wailing Wall*): a set Reaction gains 1 Prime at the start of each of your turns (cap 9) and its effect scales with it. **Twist:** in Hearthstone, Prepare is a hand card. Here the waiting card sits in a slot, so it competes with the slot you would use for an answer, and every enemy that pushes traps out of slots (the Executioner, the thieves) now threatens your investment. Prime shows as a badge on the slot.
- **Converge** (Neutral *Confluence*, *Harmony*, *Clean Slate*; one pair per faction): "+X per Converge", where Converge is the number of different factions played this turn. **Twist:** every character has exactly two factions plus neutral, so Converge 3 means playing all three in one turn. It rewards drafting neutral cards, which were the least-picked cards in v0.4. The **Signpost** relic counts as an extra faction.

## 4. Venues (16)

Every **elite and boss** fight now shows its Venue on the map in advance (a badge on the node, the boss's Venue in the map header). From Act 2, normal fights have a 30% chance to roll one. A Venue applies to **everyone**, so an enemy deck that relies on traps may love the Grand Hall as much as you do.

| Venue | Rule |
|---|---|
| 🌉 The Narrow Bridge | Everyone has 1 fewer Reaction slot (min 1) |
| 🏛️ The Grand Hall | +1 Reaction slot for everyone; every enemy starts with a trap |
| 🔔 Hall of Echoes | Chains can be 2 links longer; Style doubled |
| 🕯️ Candlelit Crypt | Enemy traps face-up; enemies gain 2 Block each turn |
| 🌹 The Rose Garden | Everyone starts with 3 Thorns |
| 🎲 The Gambling Den | Your Fate Coin flips every turn; +6 gold per enemy killed |
| ⛈️ The Storm Roof | Lightning hits a random combatant for 5 each turn, you included |
| ⛪ The Sanctuary | No one can gain Strength |
| 💀 The Ossuary | When a Reaction or trap leaves play, its owner's foes gain 2 Doom |
| ⚔️ The Dueling Ground | All damage +2, for everyone |
| ⏳ The Hourglass Chamber | You get +1 energy each turn; enemies gain 1 Strength each turn |
| 🌊 The Flooded Cellar | Carry 2 more Flux; Burn is washed away each turn |
| 🌿 The Overgrown Ruin | Everyone gains 3 Block each turn |
| 🛎️ The Bell Tower | Chains of 3+ links deal 4 to every enemy, and 4 to you |
| 📚 The Silent Library | You draw +1 each turn; enemies start with a Hex Mirror |
| 🫳 The Thieves' Market | Enemies start with a Snap Jaw; you Steal 1 at the start; on turn 3 every enemy steals one of yours |

**The twist:** Marvel Snap's locations change *where* you play; Riftbound's battlefields are something you *fight over*. Riposte's Venues mostly change **the chain's shape** (slots, length, face-up traps, what a chain does when it resolves), so the same deck plays differently from one room to the next, and you can route the map around Venues that suit you. Relics: *Stage Pass*, *Season Ticket*, *Venue Map* (shop). Vow: *Vow of the Stage*. Twist: *Grand Tour*.

## 5. Patrons (5 × 4 blessings)

At the start of Acts 2 and 3, a Patron offers 3 of its 4 blessings. Take one or decline.

- 📚 **The Archivist**: upgrade 3 cards · choose 1 of 3 rares · remove 2 basics · duplicate your rarest card
- 🔔 **The Bellmaiden**: chains +1 link · first 2+ chain each fight draws 2 and gives 1 energy · +1 slot for −10 Max HP · chains of 3+ apply 4 Doom to all
- ⛴️ **The Ferryman**: 120 gold · full heal · random rare relic + a curse · 2 Omens
- 🌱 **The Gardener**: +10 Max HP · 6 Block each fight · transform 2 basics · heal 3 after each fight
- 🎭 **The Masked Patron**: +1 energy, enemies +15% HP · every elite left in the act becomes a Champion, +80 gold · boss relic for −8 Max HP · −30% HP to upgrade 5 cards

**The twist:** StS2's Ancients hand out stat bumps and relics. A third of these blessings bend the **chain** (length, slots, payoff), and each Patron has a personality and a price. The *Patron's Seal* boss relic skips Patrons for a bigger reward.

## 6. The Nemesis

If a **normal or elite** fight kills you, that encounter becomes your Nemesis. It shows on the next run's map as a pill, appears as a forced fight in the act it killed you in, and is **promoted**: a title ("the Grudging", "the Vengeful", "the Undying", "the Inevitable"), +HP and +Strength. Each time it beats you again its **grudge** grows (more HP, more Strength). Beat it for 60 gold, a rare card reward, the *Grudge Token* trophy relic and +100 score.

**The twist:** Shadow of Mordor's Nemesis is a story system. Here it is a deck-building target. You know what is coming a whole run ahead, so you can draft for it.

## 7. The Long Night

After a win, the Crossroads screen offers the Act 4 Reflection (if earned), **the Long Night**, or walking away. The Long Night is an endless sequence of acts. Each night picks a boss from a rotation of 8, enemies get +20% HP and +1 Strength per night, and you heal half your missing HP on entry. The run already counts as a win, so dying in the night still ends on the victory screen. Every night cleared adds +150 score and XP. Trophies: *Night Owl* (clear a night), *Until Dawn* (clear 3).

## 8. Everything else

- **Sigils:** *Reckless* (+50% damage, lose 2 HP per play), *Echoing* (first play each fight happens twice), *Haunted* (gain 5 Block when this Reaction leaves play).
- **Blot**, a new enemy debuff: a Blotted card costs 1 more. The Inkwitch, Ink Imp and Blotted Saint use it; *Ink Blotter* turns blots into Block; *Vow of Ink* blots cards at the start of each fight.
- **12 enemies.** Act 1: Ink Imp, Bell Ringer, Gravemoss, boss **the Bell Tyrant**. Act 2: Inkwitch (elite), Debt Collector, Gravecaller, Skeleton, boss **the Blotted Saint**. Act 3: Lich Archivist, Bone Bishop (elite), boss **the Gravelord**. The three new bosses are a second set of wandering bosses, so each act's boss pool grew from 2 to 3.
- **16 relics + 7 blessing relics**, including *Funeral Bell*, *Grave Lantern*, *Sundial* (Prime +2), *Signpost*, *Echo Stone*, *Wreath*, *Tolling Heart* (boss).
- **5 events:** the Gravedigger's Bargain, the Bell Tower, the Ink Seller, the Converging Roads, the Mourner.
- **2 Vows** (Ink, Stage), **2 Weekly Twists** (Graveyard Shift: anyone gets the Crypt; Grand Tour), **10 trophies**, a Grave booster pack, 2 Familiars (Skull, Wisp), 2 card backs, 3 titles.
- **Open question from v0.4 answered:** the Hollow never beat the Reflection in the sim. Doom the Reflection applies to you is now halved. Hollow now wins the Reflection in about 1 of 4 tries.
- **Bug fixed along the way:** enemy trap tiers were computed from the act number, so Champion affixes and Vow traps tried to create trap cards like `snap_jaw5` that do not exist past Act 3. The Long Night exposed it. Tiers now cap at Act 3, and a test covers it.

## 9. Balance

See [BALANCE.md](BALANCE.md). After tuning, every character wins 21–40% at Ascension 0 in the bot sim (100 runs each). Act 2 reach recovered to 86–99% after the Bell Tyrant was toned down (122 → 112 HP, Death Knell 20 → 16).

## 10. Sources

- Slay the Spire II, Regent's Stars and Necrobinder's graveyard: https://metabot.gg/en/slay-the-spire-2/guides/regent-stars-and-necrobinder-graveyard
- Slay the Spire II, Ancients: https://mobalytics.gg/slay-the-spire-2/guides/ancients
- Slay the Spire II, Enchantments: https://mobalytics.gg/slay-the-spire-2/guides/enchantments
- Slay the Spire II mechanics guide: https://sts2.untapped.gg/en/articles/slay-the-spire-2-mechanics-guide
- MTG Secrets of Strixhaven mechanics (Converge): https://www.cgmagonline.com/news/magic-the-gathering-secrets-of-strixhaven-new-mechanics-archives-where-to-find-them
- Hearthstone Cataclysm (Shatter): https://www.gosugamers.net/entertainment/news/77966-hearthstone-announces-cataclysm-expansion-launching-in-march-2026
- Hearthstone Prepare keyword: https://www.playnews.gg/en/guides/hearthstone-preparation-keyword-from-fall-of-the-crimson-fort
- Riftbound battlefields: https://www.wargamer.com/riftbound-league-of-legends-trading-card-game/preview-impressions-interview
- Lorcana Hyperia City (locations): https://nerdist.com/article/ravensburger-disney-lorcana-hyperia-city-review/
- Best mobile deckbuilders 2026: https://choostgames.com/blog/best-mobile-deckbuilders-2026/
- New roguelikes, May 2026: https://rogueliker.com/new-roguelikes-and-roguelites-in-may-2026-the-monthly-update/
