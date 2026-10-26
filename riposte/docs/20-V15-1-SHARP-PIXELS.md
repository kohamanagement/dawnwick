# v0.15.1 · Sharp Pixels and the Merchant

On 2026-10-26 Mike asked for three things after v0.15 "Pixel Icons": the Merchant should be a merchant trader instead of a shopping cart, the icon lines should be sharper, and the art should be as good as it can be while keeping its authentic hi-bit, dark card-table feel.

## Why the icons looked soft

The art itself was drawn on a hard 16x16 grid, but the way it reached the screen smeared it:

- **Odd scale factors.** Icons were sized at 1.25em of the text around them, so a 14 px label gave a 17.5 px icon: 52.5 device pixels on a 3x iPhone, a scale of 3.28. Every sprite pixel came out 3 or 4 device pixels wide, so lines wobbled and diagonals looked fuzzy. The tiny corner pips on map cards were even shrunk below 1:1, which drops pixels.
- **Scale and tilt transforms.** Reachable map cards were lifted with `scale(1.1)`, the selected hand card with `scale(1.06)`/`scale(1.08)`, the active nav tab with `scale(1.08)`, and every map card has a small hand-dealt tilt. Each of those resamples the sprite again.
- **Open edges.** 40 icons ran right up to the edge of their 16x16 cell, so the 1 px outline was missing on that side and the edge read as cut off next to the crisp outlined ones.
- **Dark on dark.** Near-black icons (top hat, crow, cat, bomb, hood, black heart…) had only a black outline, which disappears on the dark table.

## What changed

**Rendering (src/style.css, src/ui/px.ts, src/ui/map.css)**
- Each context now asks for a size (`--want`), and `--s` rounds it to a whole number of device pixels per sprite pixel (16, 32, 48… device px) using `--dpr`, which `installPx()` keeps in step with `devicePixelRatio` (it also follows browser zoom). Every sprite pixel is now exactly 2 device px wide on a 2x phone or 3 on a 3x phone, or another whole number. Browsers without CSS `round()` keep the old sizing.
- Never below 1:1: pips and other tiny icons get at least one device pixel per sprite pixel.
- The pseudo-element badges (champion flame, face-down cloud, shattered pull) use the same snap.
- No more `scale()` on anything that holds an icon at rest: reachable map cards grow by layout size (64x88 instead of 58x80 scaled 1.1), the selected/aiming hand card lifts a bit higher instead of growing, the nav tab only lifts. Map-card icons are counter-rotated against the card's tilt, so they sit on the pixel grid while the card keeps its hand-dealt angle.
- Map icons have fixed sizes (32 px icon, 11 px pip, 48 px boss) that land on whole pixels at 2x and 3x, and no longer overlap the stop's name. Their shadow is a hard 1 px drop instead of a blurred one.

**Art (tools/pixel)**
- **Merchant:** a travelling trader in a wide hat with a grey beard and a red coat, a pack with a rolled bedroll and a pan on his back, holding up a coin. It is the 🛒 icon, so it shows on Merchant map stops, the shop header ("The Card Merchant"), map info and tutorial text, and is now also the icon of the Jinx Merchant event, the Merchant Caravan wayside and the Merchant fate. The Runaway Cart surprise keeps a cart (a new turnip cart, `:px-cart:`).
- **Closed edges:** the outline pass now closes art that touches the cell edge, so every icon has a full 1 px outline.
- **Rim light:** near-black bodies get a 1 px lighter rim on their top and left edges (the light direction used across the set), from the same grey ramp, so they read on the dark table.
- **Redrawn:** the coin (struck coin with a square hole and a lit rim instead of a soft gradient disc), the cloud (lit lobes), the Forge anvil (one iron anvil and a resting hammer instead of two hammers over a pale anvil).
- The palette is unchanged (same ~45 colours), and so is the 16x16 grid and the style.

Contact sheet: [img/19-pixel-icons.png](img/19-pixel-icons.png). Before/after, magnified so you can see each pixel: [map at 3x](img/20-sharp-map-3x.png), [fight HUD at 2x](img/20-sharp-fight-2x.png).

## Checked

- `npm test` (103 rules + 6 story) and `npm run build`.
- Screenshots in headless Chromium at 390x844, deviceScaleFactor 2 and 3, same seed before and after (title, map, shop, fight). Full set in the project folder `tcg-roguelike/sharp-pixels/`.

## Open questions

- Hand cards are still fanned at an angle, so their art icons are resampled while in the fan; they are upright and crisp when selected. Counter-rotating art inside a tilted card looked wrong, so it was left.
- Real-device check on an iPhone and an Android phone is still worth doing; Safari supports CSS `round()` from 15.4 and Android WebView from Chrome 125.
