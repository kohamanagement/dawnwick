# v0.13 "Table Music": a real soundtrack and sound effects

**Date:** 2026-10-26 · **Asked by:** Mike ("can you include some sound or musics with effects as well too?").

## Before

The game had a small synth from v0.3: about 20 beeps and a looping chord-plus-arpeggio per act, all quiet (music bus at 9% by default), timed with `setInterval` (it drifted and stuttered under load), no reverb, no percussion, no boss music beyond a faster loop, one shared volume path, and it only started on a tap if the screen happened to re-render afterwards. Many moments had no sound at all: drawing, map travel, traps springing, your Counter cutting in, the boss arriving, the end of a run.

## What changed

Everything is still synthesized live with Web Audio. There are **no audio files**, so the single-file artifact grew by only ~34 KB (808 → 842 KB) and the iOS/Android wrappers need nothing new.

**Music engine** (`src/ui/audio.ts`)
- A small sequencer on a lookahead clock (schedules 140 ms ahead on the audio clock, so timing is sample-accurate even when the UI is busy).
- Instruments: music box bell, plucked string, soft reed with vibrato, warm pad, sine bass, kick, brushes, and a "knuckles on the table" knock for the Dealer. A synthetic room reverb and a master compressor glue it together.
- Composed 8-bar themes, one per place, fitting the story *The Last Word* (a candle-lit card table at night):

| Where | Piece | Feel |
|---|---|---|
| Title, hub | *Candlelight* | D minor waltz on a music box |
| Act 1 | *The Back Room* | A minor, swung pluck melody, walking bass, table knocks |
| Act 2 | *Masquerade* | E harmonic minor waltz, music box over a ballroom pulse |
| Act 3 | *The Fog* | slow D dorian, distant reed, sparse drums |
| Act 4 (the Reflection) | *The Reflection* | whole-tone, unsettled |
| Shop | *The Pawnbroker* | swung C major |
| Rest, forge | *Embers* | slow G major bells |
| Events | *Strange Hands* | phrygian reed |
| Riddles | *Riddles* | slow, thinking music |
| Run end | *Last Light* | quiet minor waltz |

- **Layers by intensity**: the map plays the act theme sparse (pad, melody, soft bell arpeggio); a fight adds bass, brushes and knocks; an elite adds the kick and a faster arpeggio. Going from the map into a fight keeps the bar position, so the band simply leans in.
- **Boss variant** of each act theme: harmonic minor, a tone lower, 15% faster, a low drone, tremolo strings, a 16th-note pluck ostinato, the melody down an octave and a driving kick.
- **Low HP heartbeat**: below about 30% HP in a fight, a lub-dub kick joins on beat one and gets louder as HP drops.
- **The Counter window hushes the music** (it goes muffled and quiet) while the chain is paused, and opens back up when you answer.
- Every 4th loop the melody rests and the arpeggio carries it; odd loops vary a few notes, so it doesn't drill into your head.
- Mood changes crossfade on the next beat. Music pauses when the app goes to the background and resumes on return.

**Sound effects** (38, up from 21): card swish-and-snap, card select, card draw (one per new card in hand), setting a trap, **enemy trap springs** (snap and a low minor-second sting), **your Counter** (a bright blade ring), **enemy Rebuttal** (the ring, falling), hit, big hit (ducks the music), shield clank, heal shimmer, status, Negate, death (a card burning away), coin, **shop purchase** (coins and a shop bell), **map card flip** on travel, pack tear and rare/legendary reveals, your turn chime, enemy turn knocks, fight / elite / **boss intro** (a gong, three drums and a rising swell), fight won / lost stingers, **run won** (I–IV–V–I fanfare) and **run lost** (Wick's flame blown out, then a falling line), rest, upgrade, omen, steal, summon, riddle solved, warning buzz on "not enough energy" style toasts, and a soft click on other buttons. The chain melody now uses the current song's key, so it sits in tune with the music.

**Settings** (Profile → Settings → Sound), all saved in the profile:
- Music on/off and Music volume.
- Sound effects on/off and Effects volume (the slider keeps its level while switched off).
- **Play with the iPhone silent switch on** (off by default): on iOS Safari 16.4+ this sets the audio session to "playback" so the game is heard even in silent mode. Off, the game respects the switch like other games.
- The settings note names the piece that is playing.

**Mobile autoplay**: nothing plays until the first tap, touch or key press; that gesture creates the audio context, plays a silent buffer (older iOS needs it) and starts whatever music the current screen wants.

**Off-safe**: the module reads settings through `audio.configure()` instead of importing UI state, so it loads in Node; with no AudioContext every call is a silent no-op. Sims never import `ui/`. A new rules test checks the no-op path (96 rules + 6 story tests).

## How it was checked

- `npm test`: 96 rules + 6 story tests pass; `tsc` clean.
- Headless Chromium recorded the real output for the title, Act 1 map, a fight, playing cards and ending a turn, all act fights, all three boss variants, shop/rest/event and every sound effect. Spectrograms show the melodies, chord changes and drum hits where expected; no page errors. Levels (rms, default volumes): map/title ≈ 0.025, fights ≈ 0.04–0.06, bosses ≈ 0.07, sound effects peak ≈ 0.55, so effects sit clearly above the music.

## Not done / next

- No human ears yet: tastes differ, and the mix on a phone speaker vs. headphones should get a real listen. Levels are two constants (`SFX_GAIN`, `MUSIC_GAIN`) at the top of the volume code.
- Per-class or per-boss leitmotifs would be a natural next step (the engine takes new songs as 15-line data entries).
