# v0.14.1 · Renamed: Riposte → Dawnwick: The Last Word

On 2026-10-26 Mike found that "Riposte" is taken (for example [Riposte! on Steam](https://store.steampowered.com/search/?term=riposte), several itch.io games and a Riposte! card game). This note records the new name, why, and what was checked.

## The name

**Dawnwick: The Last Word.** Tagline: *Every move has an answer.* Genre in one phrase: *a counter-chain roguelike deckbuilder.*

The Dawnwick is the great lamp at the Last Table whose flame was Vesper's sun (docs/13-STORY.md). It cracked when Cassius Vane took the last word, and Wick is its last ember. The title is the goal of the story; "The Last Word" (the story's name, and a phrase many games already use) becomes the subtitle.

**Mechanic name: the Answer Chain**, from the law of the world. Vocabulary: set Reactions are Answers, Counters played mid-chain from hand are Ripostes (a common fencing word, fine as a keyword), boss Rebuttals are counter-counters.

## Clearance (2026-10-26)

| Check | Dawnwick | Source |
|---|---|---|
| US trademarks | 0 results | [Trademarkia](https://www.trademarkia.com/search/trademarks?query=dawnwick) (USPTO data), Justia trademarks: 0 |
| Steam | No game | Steam store search suggest: empty (control query "riposte" returns Riposte!) |
| App Store / Google Play / itch.io | Nothing found in web search | store search pages block automated fetches |
| Other uses | A fan-wiki place, a small musician on Amazon Music, a person's Instagram (@dawnwick1); "Wick" (2016 horror) on Steam is a different name | web search |
| dawnwick.com | **Registered** 2026-07-19 at Namecheap (owner hidden; site blocks fetches) | Verisign RDAP |
| dawnwick.net, dawnwick.app, playdawnwick.com | Not registered | Verisign / Google registry RDAP |
| dawnwick.org | A throwaway email domain | check-mail.org |
| EUIPO / WIPO / TMview | **Not checked**: the search apps are not reachable from the build machine | |
| X / Instagram / TikTok handles | **Not checked**: those sites block fetches | |

Other shortlist names: Contretemps (0 US marks, .com taken since 2003), Dawnhand (0 US marks, .com taken Sept 2026), Duskdeal (0 US marks, .com taken Oct 2026), Countertime (live US mark COUNTERTIME, class 3 cosmetics; .com taken since 2005), Wick & Wager (no exact mark, but close to WITS & WAGERS, a live class 28/41 game mark), Ante Meridiem (no exact mark; awkward). Ruled out earlier as existing games: Rejoinder, Unanswered, Gainsay (MTG card), The Last Word, Nightlong, Vesper, Undercroft, Touché, Final Answer.

**To do before store upload (owner):** EUIPO/WIPO search for DAWNWICK in classes 9 and 41; register dawnwick.net or playdawnwick.com (or ask about dawnwick.com); claim @dawnwick / @playdawnwick handles; search both stores on a phone.

## What changed in the build

- Title screen logo DAWNWICK + "The Last Word"; page title, manifest, Capacitor `appName` Dawnwick; app id `com.dawnwick.game` (Android namespace/applicationId/MainActivity package, iOS bundle id). Package name `dawnwick`, version 0.14.1.
- UI calls the chain the **Answer Chain** (tutorial tip, how-to heading, chain overlay title, welcome).
- Story book chapter 12 is now "The Dawnwick" (same id `riposte`, so unlocks carry over); its beats end on the Dawnwick catching light.
- Returning players get a one-time "Riposte is now Dawnwick" note (`seen.dawnwick`).
- Kept on purpose: localStorage keys (`riposte.*`), daily/weekly seeds, `RIP1.` deck codes, the `window.__riposte` debug handle, the project folder name, and the card/status/achievement names that use the fencing word riposte.
