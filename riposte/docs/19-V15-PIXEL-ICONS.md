# v0.15 · Pixel Icons: no more emoji

On 2026-10-26 Mike approved the pixel-art plan: every emoji and placeholder glyph in the game is replaced with a hi-bit pixel icon that shows what it stands for, readable at phone size.

## What changed

- **247 hand-drawn 16×16 icons** in one shared palette (about 45 colours, the same family as the pixel-art samples), each with a 1 px dark outline so it reads on both the dark table and the light map cards. They cover **506 glyphs**: every emoji, suit and symbol used in card art, card text, keywords, statuses, elements, factions, map stops, keepsakes, enemies, buttons and the hub tabs.
- **Factions get real icons.** The old shape glyphs (▲ ◆ ● ✦ ✧ ◇ ■ ✖ ◼ ϟ ⬢ …) are now fire, wave, thorn vine, void spiral, coin, glass shard, urn, card back, black heart (Jinx), demon (enemy), bolt, snowflake, rock, sun, alembic, paw and moon, on card type lines, pack art and the How to play page.
- **Card types:** Attack is crossed swords, Skill/Trick is an open hand, Reaction is a violet answering arrow, Counter (↯) is a red strike-back bolt.
- Arrows (→ ← ↔ ⬆ ⬇) and the story progress dots stay as plain text, since they are punctuation, not pictures.
- Layout and balance are unchanged: icons take the same space as the emoji they replace (1.25 em, sized by the surrounding font), and no card data changed.

Contact sheet of every icon: [img/19-pixel-icons.png](img/19-pixel-icons.png).

## How it works

- `tools/pixel/` holds the icons as character grids (one character = one palette colour) plus a few drawn with shape helpers. `python3 tools/pixel/build_icons.py` packs them into one sprite sheet (31 KB PNG, 1 px gutter so scaled cells never bleed) and writes `src/ui/pxicons.ts` (the sheet as a data URI, icon index, glyph → icon map). Add `--sheet out.png` for a labelled contact sheet.
- `src/ui/px.ts` `pixify(html)` runs on every HTML string just before it reaches the DOM (main render, toasts, banners, floating numbers, familiar barks). It swaps known glyphs in text for `<i class="px">` sprites, strips them from attributes, `<option>` and `<textarea>` text (where images can't go), and wraps "icon + words" in one span so flex layouts keep them together. `:px-name:` tokens give icons that have no emoji (factions, shard, vine).
- Data keeps its emoji, so card definitions, the sims and saves are untouched; the art is a presentation layer. To add an icon: draw a grid in the right `icons_*.py`, list its glyphs, rebuild. A rules test fails if any glyph in `src/` has no icon.
- `image-rendering: pixelated` keeps edges hard. Pseudo-element badges (champion flame, face-down map card cloud, shattered pack pull) get their sprite through rules `installPx()` adds at start-up.

## Size

The single-file build grows by about 55 KB (sheet + glyph map). No new files or network requests.

## Open questions

- Icons are generic per glyph, so cards that shared an emoji still share an icon (for example every 🔥 card). The next art step is per-card motifs (the ~400 shared motifs from the art plan) and commissioned faces for classes and bosses.
- A few rarely seen glyphs share a nearby icon (🦞 uses the crab, 🐫 the horse, 🍋 the cherries).
