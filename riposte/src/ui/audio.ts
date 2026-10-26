// v0.13 "Table Music": every sound is synthesized with WebAudio at runtime, so the game still ships as one
// small file with no audio assets. Two halves:
//  - SFX: short synth patches (card snaps, hits, clanks, bells), one call each: sfx('card').
//  - Music: a small sequencer that plays composed loops on a lookahead clock. Each act has its own theme
//    (the Dealer's table at night), played sparse on the map, fuller in fights, and as a tense variant
//    (harmonic minor, faster, drone + heartbeat) for the boss. Moods crossfade at the bar line.
// Nothing here runs without a browser AudioContext, and nothing starts before the first tap (mobile autoplay
// rules), so tests and sims (which never import ui/) stay silent.
import type { Settings } from '../engine/meta';

// ───────── graph ─────────

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let sfxBus: GainNode | null = null;
let musicIn: GainNode | null = null; // songs connect here
let musicTone: BiquadFilterNode | null = null; // lowpass: closes while the Counter window holds time still
let musicBus: GainNode | null = null; // music volume
let duckGain: GainNode | null = null; // dips the music under stingers
let reverb: ConvolverNode | null = null;
let noiseBuf: AudioBuffer | null = null;
let unlocked = false;

// The game hands us its settings (kept out of ui/state so this module loads anywhere, tests included).
let settings: () => Partial<Settings> = () => ({});
export function configure(get: () => Partial<Settings>): void { settings = get; }
const sfxLevel = () => (settings().sfxOff ? 0 : settings().sfx ?? 0.7);
const musicLevel = () => (settings().musicOff ? 0 : settings().music ?? 0.5);

function ac(): AudioContext | null {
  if (ctx) return ctx;
  if (typeof window === 'undefined') return null;
  try {
    const C = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!C) return null;
    ctx = new C({ latencyHint: 'interactive' });
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -14; comp.knee.value = 12; comp.ratio.value = 4; comp.attack.value = 0.004; comp.release.value = 0.2;
    comp.connect(ctx.destination);
    master = ctx.createGain(); master.gain.value = 0.9; master.connect(comp);
    reverb = ctx.createConvolver(); reverb.buffer = impulse(ctx, 2.4); reverb.connect(master);
    sfxBus = ctx.createGain(); sfxBus.connect(master);
    const sfxSend = ctx.createGain(); sfxSend.gain.value = 0.12; sfxBus.connect(sfxSend); sfxSend.connect(reverb);
    musicBus = ctx.createGain(); musicBus.connect(master);
    const musicSend = ctx.createGain(); musicSend.gain.value = 0.5; musicBus.connect(musicSend); musicSend.connect(reverb);
    duckGain = ctx.createGain(); duckGain.connect(musicBus);
    musicTone = ctx.createBiquadFilter(); musicTone.type = 'lowpass'; musicTone.frequency.value = 16000; musicTone.Q.value = 0.4; musicTone.connect(duckGain);
    musicIn = ctx.createGain(); musicIn.connect(musicTone);
    noiseBuf = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
    const d = noiseBuf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    applyVolumes();
  } catch { ctx = null; }
  return ctx;
}

/** A synthetic room: decaying stereo noise, darker towards the tail. */
function impulse(c: AudioContext, sec: number): AudioBuffer {
  const n = Math.floor(c.sampleRate * sec);
  const b = c.createBuffer(2, n, c.sampleRate);
  for (let ch = 0; ch < 2; ch++) {
    const d = b.getChannelData(ch);
    let lp = 0;
    for (let i = 0; i < n; i++) {
      const k = i / n;
      lp += (Math.random() * 2 - 1 - lp) * (0.9 - 0.75 * k);
      d[i] = lp * (1 - k) ** 2.6 * (i < c.sampleRate * 0.012 ? i / (c.sampleRate * 0.012) : 1);
    }
  }
  return b;
}

const SFX_GAIN = 2, MUSIC_GAIN = 3.2;

export function applyVolumes(): void {
  if (!ctx || !sfxBus || !musicBus) return;
  const t = ctx.currentTime;
  const s = sfxLevel(), m = musicLevel();
  // Sliders feel linear when the gain follows a square curve; the constants set the mix (music under SFX).
  sfxBus.gain.setTargetAtTime(s > 0 ? 0.1 + s * s * SFX_GAIN : 0, t, 0.03);
  musicBus.gain.setTargetAtTime(m > 0 ? 0.1 + m * m * MUSIC_GAIN : 0, t, 0.08);
  if (m <= 0) stopMusic();
  else if (wanted && !song) setMood(wanted);
}

/** iPhone: let the game be heard with the ring/silent switch on (an opt-in setting). */
function applySession(): void {
  try {
    const nav = navigator as unknown as { audioSession?: { type: string } };
    if (nav.audioSession) nav.audioSession.type = settings().ignoreSilent ? 'playback' : 'auto';
  } catch { /* not supported */ }
}

/** Unlock audio on the first user gesture (mobile autoplay rules), then start whatever mood is waiting. */
export function unlock(): void {
  const c = ac();
  if (!c) return;
  applySession();
  if (c.state === 'suspended') void c.resume().then(() => { if (wanted && !song) setMood(wanted); });
  if (!unlocked) {
    unlocked = true;
    // A silent one-sample buffer: older iOS only unlocks after something actually plays inside the gesture.
    try { const b = c.createBufferSource(); b.buffer = c.createBuffer(1, 1, 22050); b.connect(c.destination); b.start(0); } catch { /* ignore */ }
    if (wanted) setMood(wanted);
  }
}

export function refreshSession(): void { applySession(); }

if (typeof document !== 'undefined') {
  // Quiet in the background (switching apps, locking the phone), back on return.
  document.addEventListener('visibilitychange', () => {
    if (!ctx || !unlocked) return;
    if (document.hidden) void ctx.suspend();
    else void ctx.resume();
  });
}

// ───────── voices ─────────

const mtof = (m: number) => 440 * 2 ** ((m - 69) / 12);
const jitter = (f: number, amt = 0.025) => f * (1 + (Math.random() * 2 - 1) * amt);

type Out = AudioNode;

function env(g: GainNode, t: number, a: number, peak: number, d: number, sus = 0.0001, rel = 0): void {
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(Math.max(0.0002, peak), t + a);
  g.gain.exponentialRampToValueAtTime(Math.max(0.0001, sus), t + a + d);
  if (rel) g.gain.exponentialRampToValueAtTime(0.0001, t + a + d + rel);
}

function osc(out: Out, type: OscillatorType, f: number, t: number, dur: number, vol: number, opts: { a?: number; slide?: number; detune?: number; lp?: number } = {}): void {
  const c = ctx!;
  const o = c.createOscillator();
  const g = c.createGain();
  o.type = type;
  o.frequency.setValueAtTime(f, t);
  if (opts.detune) o.detune.value = opts.detune;
  if (opts.slide) o.frequency.exponentialRampToValueAtTime(Math.max(20, f * opts.slide), t + dur);
  env(g, t, opts.a ?? 0.005, vol, dur);
  let node: AudioNode = o;
  if (opts.lp) { const f2 = c.createBiquadFilter(); f2.type = 'lowpass'; f2.frequency.value = opts.lp; o.connect(f2); node = f2; }
  node.connect(g); g.connect(out);
  o.start(t); o.stop(t + (opts.a ?? 0.005) + dur + 0.05);
}

function noise(out: Out, t: number, dur: number, vol: number, type: BiquadFilterType, freq: number, opts: { q?: number; sweep?: number; a?: number } = {}): void {
  const c = ctx!;
  const src = c.createBufferSource();
  src.buffer = noiseBuf;
  src.loop = true;
  const f = c.createBiquadFilter();
  f.type = type; f.frequency.setValueAtTime(freq, t); f.Q.value = opts.q ?? 0.8;
  if (opts.sweep) f.frequency.exponentialRampToValueAtTime(Math.max(40, freq * opts.sweep), t + dur);
  const g = c.createGain();
  env(g, t, opts.a ?? 0.002, vol, dur);
  src.connect(f); f.connect(g); g.connect(out);
  src.start(t, Math.random() * 0.5); src.stop(t + (opts.a ?? 0.002) + dur + 0.05);
}

/** Music box / celesta: a sine with an inharmonic partial that dies fast. */
function bell(out: Out, f: number, t: number, dur: number, vol: number): void {
  osc(out, 'sine', f, t, dur, vol);
  osc(out, 'sine', f * 2.76, t, dur * 0.25, vol * 0.35);
  osc(out, 'sine', f * 5.4, t, dur * 0.08, vol * 0.12);
}

/** A plucked string: bright attack, a lowpass that closes as it rings. */
function pluck(out: Out, f: number, t: number, dur: number, vol: number): void {
  const c = ctx!;
  const o = c.createOscillator(), o2 = c.createOscillator();
  const lp = c.createBiquadFilter(), g = c.createGain();
  o.type = 'sawtooth'; o.frequency.value = f;
  o2.type = 'triangle'; o2.frequency.value = f * 2; o2.detune.value = 4;
  lp.type = 'lowpass'; lp.Q.value = 2;
  lp.frequency.setValueAtTime(Math.min(9000, f * 9), t);
  lp.frequency.exponentialRampToValueAtTime(Math.max(120, f * 1.2), t + Math.min(0.5, dur));
  env(g, t, 0.003, vol, dur);
  o.connect(lp); o2.connect(lp); lp.connect(g); g.connect(out);
  o.start(t); o2.start(t); o.stop(t + dur + 0.05); o2.stop(t + dur + 0.05);
}

/** A soft reed / flute-ish lead with a little vibrato. */
function reed(out: Out, f: number, t: number, dur: number, vol: number): void {
  const c = ctx!;
  const o = c.createOscillator(), lfo = c.createOscillator(), lg = c.createGain();
  const lp = c.createBiquadFilter(), g = c.createGain();
  o.type = 'triangle'; o.frequency.value = f;
  lfo.frequency.value = 5.2; lg.gain.value = f * 0.006;
  lfo.connect(lg); lg.connect(o.frequency);
  lp.type = 'lowpass'; lp.frequency.value = f * 4;
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(vol, t + 0.06);
  g.gain.setValueAtTime(vol, t + Math.max(0.07, dur - 0.08));
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur + 0.12);
  o.connect(lp); lp.connect(g); g.connect(out);
  o.start(t); lfo.start(t); o.stop(t + dur + 0.2); lfo.stop(t + dur + 0.2);
}

/** Pad: two detuned saws through a dark lowpass, slow in and out. */
function pad(out: Out, freqs: number[], t: number, dur: number, vol: number, bright = 900): void {
  const c = ctx!;
  const lp = c.createBiquadFilter(), g = c.createGain();
  lp.type = 'lowpass'; lp.frequency.value = bright * 0.8; lp.Q.value = 0.3;
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(vol, t + Math.min(0.8, dur * 0.35));
  g.gain.setValueAtTime(vol, t + dur * 0.75);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur + 0.6);
  lp.connect(g); g.connect(out);
  // One soft saw and one triangle per note: warm, not buzzy.
  for (const f of freqs) for (const det of [-6, 6]) {
    const o = c.createOscillator();
    o.type = det < 0 ? 'sawtooth' : 'triangle'; o.frequency.value = f; o.detune.value = det;
    o.connect(lp); o.start(t); o.stop(t + dur + 0.7);
  }
}

function bass(out: Out, f: number, t: number, dur: number, vol: number): void {
  osc(out, 'sine', f, t, dur, vol, { a: 0.008 });
  osc(out, 'triangle', f * 2, t, dur * 0.5, vol * 0.25, { lp: 600 });
}

function kick(out: Out, t: number, vol: number): void { osc(out, 'sine', 120, t, 0.28, vol, { slide: 0.33 }); }
function brush(out: Out, t: number, vol: number, long = false): void { noise(out, t, long ? 0.22 : 0.07, vol, 'bandpass', 5200, { q: 0.6, a: long ? 0.03 : 0.002 }); }
/** Knuckles on the table: the Dealer's tick. */
function knock(out: Out, t: number, vol: number): void { osc(out, 'sine', 360, t, 0.07, vol, { slide: 0.7 }); noise(out, t, 0.03, vol * 0.5, 'bandpass', 1400, { q: 3 }); }
function tremolo(out: Out, freqs: number[], t: number, dur: number, vol: number): void {
  const c = ctx!;
  const g = c.createGain(), am = c.createGain(), lfo = c.createOscillator(), lfoG = c.createGain(), lp = c.createBiquadFilter();
  lp.type = 'lowpass'; lp.frequency.value = 1800;
  am.gain.value = 0.5; lfo.frequency.value = 9; lfoG.gain.value = 0.5;
  lfo.connect(lfoG); lfoG.connect(am.gain);
  env(g, t, 0.05, vol, dur, vol * 0.6, 0.15);
  lp.connect(am); am.connect(g); g.connect(out);
  for (const f of freqs) { const o = c.createOscillator(); o.type = 'sawtooth'; o.frequency.value = f; o.connect(lp); o.start(t); o.stop(t + dur + 0.3); }
  lfo.start(t); lfo.stop(t + dur + 0.3);
}

// ───────── SFX ─────────

export type Sfx =
  | 'card' | 'draw' | 'select' | 'hit' | 'bighit' | 'block' | 'heal' | 'negate' | 'death' | 'coin' | 'buy' | 'flip' | 'deal'
  | 'pack' | 'rare' | 'legend' | 'turn' | 'enemyTurn' | 'win' | 'lose' | 'click' | 'warn' | 'omen' | 'trap' | 'trapFlip'
  | 'counter' | 'rebuttal' | 'steal' | 'summon' | 'solve' | 'fight' | 'elite' | 'bossIntro' | 'runWin' | 'runLose' | 'rest' | 'upgrade' | 'status';

const lastAt: Partial<Record<Sfx, number>> = {};

export function sfx(name: Sfx, delay = 0): void {
  const c = ctx;
  if (!c || !sfxBus || !unlocked || sfxLevel() <= 0 || c.state !== 'running') return;
  const t = c.currentTime + 0.005 + delay;
  // Same sound twice inside 35 ms is one sound (bursts of events would otherwise stack into a buzz).
  if (!delay && (lastAt[name] ?? -1) > t - 0.035) return;
  lastAt[name] = t;
  const o = sfxBus;
  switch (name) {
    case 'click': osc(o, 'triangle', jitter(1900), t, 0.018, 0.05); break;
    case 'select': osc(o, 'triangle', jitter(880), t, 0.05, 0.07); noise(o, t, 0.03, 0.04, 'highpass', 4000); break;
    case 'warn': osc(o, 'square', 196, t, 0.09, 0.05, { lp: 1200 }); osc(o, 'square', 185, t + 0.1, 0.12, 0.05, { lp: 1200 }); break;
    case 'card': // a card slapped on felt: swish, then snap
      noise(o, t, 0.11, 0.16, 'bandpass', 900, { sweep: 4, q: 1.2 });
      osc(o, 'triangle', jitter(620), t + 0.06, 0.05, 0.08, { slide: 0.6 });
      noise(o, t + 0.06, 0.03, 0.12, 'highpass', 3000);
      break;
    case 'draw': noise(o, t, 0.07, 0.07, 'bandpass', jitter(3200, 0.1), { sweep: 1.6, q: 1.5, a: 0.015 }); break;
    case 'trap': // setting a card face-down: a muffled thunk and a low two-note
      noise(o, t, 0.06, 0.12, 'lowpass', 900);
      osc(o, 'triangle', 220, t, 0.12, 0.08); osc(o, 'triangle', 330, t + 0.08, 0.14, 0.07);
      break;
    case 'trapFlip': // an enemy trap springs: snap, then a low minor-second sting
      noise(o, t, 0.035, 0.2, 'highpass', 2500);
      osc(o, 'triangle', 1400, t, 0.04, 0.06, { slide: 1.3 });
      osc(o, 'sawtooth', 110, t + 0.04, 0.55, 0.07, { lp: 700 });
      osc(o, 'sawtooth', 116.5, t + 0.04, 0.55, 0.07, { lp: 700 });
      osc(o, 'sine', 55, t + 0.04, 0.5, 0.12);
      break;
    case 'counter': // your Counter cuts in: a bright blade ring
      noise(o, t, 0.18, 0.14, 'highpass', 5000, { sweep: 0.5 });
      osc(o, 'sine', 1568, t + 0.02, 0.7, 0.07); osc(o, 'sine', 2093, t + 0.04, 0.6, 0.06); osc(o, 'sine', 3136, t + 0.05, 0.3, 0.03);
      osc(o, 'triangle', 392, t, 0.25, 0.08, { slide: 2 });
      break;
    case 'rebuttal': // the enemy answers back: the same ring, falling
      noise(o, t, 0.16, 0.12, 'highpass', 3000, { sweep: 0.4 });
      osc(o, 'sawtooth', 1046, t, 0.45, 0.05, { slide: 0.5, lp: 3000 }); osc(o, 'sine', 523, t + 0.05, 0.5, 0.07, { slide: 0.7 });
      break;
    case 'hit':
      osc(o, 'sine', jitter(150), t, 0.14, 0.32, { slide: 0.4 });
      noise(o, t, 0.08, 0.2, 'lowpass', jitter(2200, 0.1));
      break;
    case 'bighit':
      osc(o, 'sine', 120, t, 0.32, 0.45, { slide: 0.3 });
      osc(o, 'sawtooth', 90, t, 0.22, 0.1, { slide: 0.5, lp: 900 });
      noise(o, t, 0.22, 0.28, 'lowpass', 3000, { sweep: 0.2 });
      duck(0.55, 0.4);
      break;
    case 'block': // a shield clank: inharmonic metal
      osc(o, 'sine', jitter(620), t, 0.18, 0.1); osc(o, 'sine', jitter(1340), t, 0.12, 0.07); osc(o, 'sine', 2210, t, 0.06, 0.04);
      noise(o, t, 0.05, 0.1, 'bandpass', 2400, { q: 2 });
      break;
    case 'heal': [0, 4, 7, 12].forEach((s, i) => bell(o, mtof(76 + s), t + i * 0.06, 0.5, 0.06)); noise(o, t, 0.4, 0.03, 'highpass', 7000, { a: 0.1 }); break;
    case 'status': osc(o, 'sine', 300, t, 0.2, 0.06, { slide: 1.5 }); break;
    case 'negate': // denied: a glassy downward smear
      osc(o, 'sawtooth', 1200, t, 0.3, 0.06, { slide: 0.25, lp: 4000 });
      osc(o, 'square', 600, t + 0.03, 0.18, 0.04, { slide: 0.5, lp: 2000 });
      noise(o, t, 0.12, 0.1, 'highpass', 3500);
      break;
    case 'death': // a card burns away
      noise(o, t, 0.7, 0.18, 'lowpass', 4000, { sweep: 0.06, a: 0.02 });
      osc(o, 'triangle', 330, t, 0.6, 0.1, { slide: 0.3 });
      break;
    case 'coin': osc(o, 'square', 1318, t, 0.07, 0.05, { lp: 5000 }); osc(o, 'square', 1760, t + 0.06, 0.16, 0.05, { lp: 5000 }); break;
    case 'buy': // coins on the counter and the shop bell
      for (let i = 0; i < 4; i++) osc(o, 'triangle', jitter(2600, 0.15), t + i * 0.035, 0.05, 0.04);
      bell(o, 1568, t + 0.12, 0.9, 0.08); bell(o, 2093, t + 0.18, 0.7, 0.05);
      break;
    case 'flip': // a map card turned over
      noise(o, t, 0.05, 0.14, 'bandpass', 2500, { sweep: 2, q: 1 });
      osc(o, 'triangle', 900, t + 0.03, 0.06, 0.06, { slide: 1.5 });
      break;
    case 'deal': for (let i = 0; i < 4; i++) noise(o, t + i * 0.07, 0.04, 0.1, 'bandpass', jitter(2800, 0.15), { sweep: 1.8, q: 1.2 }); break;
    case 'pack': noise(o, t, 0.4, 0.2, 'bandpass', 1500, { sweep: 3, q: 0.7, a: 0.05 }); noise(o, t + 0.3, 0.08, 0.12, 'highpass', 3000); break;
    case 'rare': [0, 7, 12].forEach((s, i) => bell(o, mtof(76 + s), t + i * 0.07, 0.6, 0.08)); break;
    case 'legend': [0, 4, 7, 12, 16, 19].forEach((s, i) => bell(o, mtof(72 + s), t + i * 0.07, 1.1, 0.08)); pad(o, [mtof(60), mtof(64), mtof(67)], t, 1.2, 0.03, 2400); break;
    case 'turn': bell(o, mtof(79), t, 0.5, 0.07); bell(o, mtof(84), t + 0.09, 0.6, 0.06); break;
    case 'enemyTurn': knock(o, t, 0.16); knock(o, t + 0.14, 0.12); break;
    case 'fight': noise(o, t, 0.05, 0.12, 'highpass', 2500); kick(o, t + 0.03, 0.3); break;
    case 'elite': kick(o, t, 0.4); kick(o, t + 0.22, 0.4); osc(o, 'sawtooth', mtof(45), t + 0.22, 0.6, 0.08, { lp: 900 }); osc(o, 'sawtooth', mtof(52), t + 0.22, 0.6, 0.06, { lp: 900 }); break;
    case 'bossIntro': // a gong, three drums, and a rising swell
      [55, 82.4, 111, 148].forEach((f, i) => osc(o, 'sine', f, t, 3.2 - i * 0.5, 0.16 / (i + 1) + 0.04));
      noise(o, t, 0.12, 0.2, 'lowpass', 1800);
      [0.5, 0.8, 1.1].forEach((d) => kick(o, t + d, 0.45));
      noise(o, t + 0.2, 1.2, 0.08, 'bandpass', 300, { sweep: 12, a: 1.0 });
      duck(0.25, 2.2);
      break;
    case 'win': // a fight won
      [0, 4, 7, 12].forEach((s, i) => bell(o, mtof(72 + s), t + i * 0.1, 0.8, 0.09));
      pad(o, [mtof(60), mtof(67), mtof(76)], t + 0.3, 1.0, 0.035, 2000);
      duck(0.4, 1.4);
      break;
    case 'lose': [7, 3, 0, -5].forEach((s, i) => reed(o, mtof(64 + s), t + i * 0.22, 0.32, 0.07)); duck(0.3, 1.6); break;
    case 'runWin': // the last word is yours: I–IV–V–I in bells over a pad
      [[0, 4, 7], [5, 9, 12], [7, 11, 14], [12, 16, 19]].forEach((ch, i) => {
        pad(o, ch.map((s) => mtof(55 + s)), t + i * 0.45, 0.6, 0.035, 2200);
        ch.forEach((s, j) => bell(o, mtof(72 + s), t + i * 0.45 + j * 0.05, 0.9, 0.07));
      });
      duck(0.15, 3);
      break;
    case 'runLose': // Wick goes out: a breath, then a falling minor line
      noise(o, t, 0.6, 0.14, 'bandpass', 1200, { sweep: 0.3, a: 0.08 });
      [0, -2, -4, -7].forEach((s, i) => reed(o, mtof(69 + s), t + 0.4 + i * 0.35, 0.5, 0.07));
      osc(o, 'sine', mtof(38), t + 0.4, 2, 0.1);
      duck(0.15, 3);
      break;
    case 'rest': [0, 7, 12].forEach((s, i) => bell(o, mtof(67 + s), t + i * 0.15, 1.2, 0.05)); noise(o, t, 0.8, 0.03, 'bandpass', 800, { a: 0.3 }); break;
    case 'upgrade': noise(o, t, 0.05, 0.12, 'bandpass', 3000, { q: 3 }); osc(o, 'sine', 1760, t, 0.4, 0.05); [0, 4, 7].forEach((s, i) => bell(o, mtof(79 + s), t + 0.1 + i * 0.05, 0.5, 0.05)); break;
    case 'omen': [12, 7, 14].forEach((s, i) => bell(o, mtof(69 + s), t + i * 0.09, 0.5, 0.07)); noise(o, t, 0.3, 0.05, 'highpass', 5000); break;
    case 'steal': osc(o, 'triangle', 1760, t, 0.18, 0.06, { slide: 0.5 }); osc(o, 'sine', 2640, t + 0.05, 0.12, 0.04); noise(o, t, 0.08, 0.05, 'highpass', 6000); break;
    case 'summon': osc(o, 'sawtooth', 140, t, 0.45, 0.07, { slide: 1.8, lp: 1500 }); noise(o, t + 0.05, 0.3, 0.07, 'lowpass', 600); break;
    case 'solve': [0, 4, 7, 11, 14].forEach((s, i) => bell(o, mtof(72 + s), t + i * 0.07, 0.7, 0.08)); break;
  }
}

/** One bell per chain link, rising through the current song's pentatonic: the chain plays a melody. */
export function chainNotes(links: { mine: boolean; negated: boolean; counter?: boolean; card?: unknown }[], gap = 0.16): void {
  if (!ctx || !sfxBus || !unlocked || sfxLevel() <= 0 || ctx.state !== 'running') return;
  const PENTA = [0, 2, 4, 7, 9, 12, 14, 16, 19, 21, 24];
  const root = 60 + (((song?.root ?? 57) - 60) % 12 + 12) % 12;
  const t0 = ctx.currentTime + 0.02;
  links.forEach((l, i) => {
    const f = mtof(root + PENTA[Math.min(i, PENTA.length - 1)]);
    const t = t0 + i * gap;
    if (l.mine) bell(sfxBus!, f, t, 0.6, l.negated ? 0.025 : 0.08);
    else pluck(sfxBus!, f, t, 0.45, l.negated ? 0.02 : 0.06);
    if (l.negated) osc(sfxBus!, 'square', f * 0.94, t + 0.05, 0.2, 0.025, { lp: 1500 });
  });
  // The link that started it all: your Counter rings, an enemy trap stings, an enemy Rebuttal falls.
  const top = links[links.length - 1];
  if (links.some((l) => l.mine && l.counter)) sfx('counter', 0);
  else if (links.some((l) => !l.mine && l.counter)) sfx('rebuttal', 0);
  if (links.some((l) => !l.mine && l.card) && top) sfx('trapFlip', 0.02);
}

/** Dip the music for a stinger. */
function duck(to: number, sec: number): void {
  if (!ctx || !duckGain) return;
  const t = ctx.currentTime;
  duckGain.gain.cancelScheduledValues(t);
  duckGain.gain.setTargetAtTime(to, t, 0.04);
  duckGain.gain.setTargetAtTime(1, t + sec, 0.5);
}

// ───────── music ─────────

const MINOR = [0, 2, 3, 5, 7, 8, 10];
const DORIAN = [0, 2, 3, 5, 7, 9, 10];
const HARM = [0, 2, 3, 5, 7, 8, 11];
const MAJOR = [0, 2, 4, 5, 7, 9, 11];
const PHRYG = [0, 1, 3, 5, 7, 8, 10];
const WHOLE = [0, 2, 4, 6, 8, 10, 12];

type Lead = 'bell' | 'pluck' | 'reed';

interface Song {
  name: string;
  bpm: number;
  beats: 3 | 4;
  root: number; // midi note of the key
  scale: number[];
  /** One chord (a scale degree) per bar. */
  chords: number[];
  /** Melody, one string per bar, one token per 8th: scale degree, '.' rest, '-' hold. */
  mel: string[];
  lead: Lead;
  /** Bass per bar, one token per 8th: r root, f fifth, o octave, '.' rest. */
  bassPat: string;
  /** 16th-step patterns per bar ('x' hit, 'o' soft). */
  kick?: string;
  brush?: string;
  knock?: string;
  swing?: number;
  padBright?: number;
}

// The Last Word: the Dealer's table at night. Act 1 is the back room of a tavern (minor, a walking pluck);
// Act 2 the Masquerade (a waltz on a music box); Act 3 the Fog (slow dorian, distant reed).
const SONGS: Record<string, Song> = {
  title: {
    name: 'Candlelight', bpm: 84, beats: 3, root: 62, scale: MINOR, lead: 'bell', padBright: 1100,
    chords: [0, 5, 3, 4, 0, 5, 6, 4],
    mel: ['4 - 2 3 4 .', '5 - 4 2 0 .', '2 - 3 5 4 2', '1 - - . . .', '4 - 2 3 4 7', '9 - 8 7 5 .', '6 - 5 4 2 4', '4 - - . . .'],
    bassPat: 'r - f - o -', brush: 'o...o...o...', swing: 0,
  },
  act1: {
    name: 'The Back Room', bpm: 96, beats: 4, root: 57, scale: MINOR, lead: 'pluck', padBright: 900,
    chords: [0, 5, 2, 6, 0, 5, 3, 4],
    mel: ['4 . 4 2 3 . 2 0', '0 - . 2 4 - 5 .', '4 . 2 . 4 5 7 .', '6 - - . 4 . . .', '7 . 7 5 6 . 5 4', '2 - . 4 5 - 4 .', '3 . 5 . 4 3 2 .', '1 - - - . . . .'],
    bassPat: 'r . f . o . f .', kick: 'x.......x.......', brush: '..o...o...o...oo', knock: '....x.......x...', swing: 0.14,
  },
  act2: {
    name: 'Masquerade', bpm: 138, beats: 3, root: 64, scale: HARM, lead: 'bell', padBright: 1400,
    chords: [0, 3, 4, 0, 5, 3, 1, 4],
    mel: ['4 - 5 4 2 4', '3 - - 2 3 5', '6 - 5 4 3 1', '2 - - 0 . .', '7 - 6 5 4 5', '5 - 4 3 2 3', '4 - 3 1 2 6', '4 - - . . .'],
    bassPat: 'r - f - f -', kick: 'x...........', brush: '....o...o...', knock: '....x...x...',
  },
  act3: {
    name: 'The Fog', bpm: 72, beats: 4, root: 50, scale: DORIAN, lead: 'reed', padBright: 700,
    chords: [0, 3, 0, 6, 0, 3, 5, 4],
    mel: ['7 - - - 8 - 7 -', '5 - - - . . . .', '4 - 5 - 7 - 5 4', '3 - - - . . 2 -', '7 - - - 9 - 8 -', '7 - - - 5 - . .', '4 - 5 - 6 - 5 -', '4 - - - . . . .'],
    bassPat: 'r - - - f - - -', kick: 'x...............', brush: '........o.......', knock: '..............o.',
  },
  act4: {
    name: 'The Reflection', bpm: 88, beats: 4, root: 54, scale: WHOLE, lead: 'bell', padBright: 1000,
    chords: [0, 1, 0, 2],
    mel: ['4 . 3 . 2 . 1 .', '0 - - - . . . .', '2 . 3 . 4 . 5 .', '6 - - - . . . .'],
    bassPat: 'r . . . r . . .', brush: '..o...o...o...o.',
  },
  shop: {
    name: 'The Pawnbroker', bpm: 112, beats: 4, root: 60, scale: MAJOR, lead: 'pluck', padBright: 1600,
    chords: [0, 5, 1, 4],
    mel: ['4 . 2 4 5 . 4 .', '2 . 0 . 5 4 2 .', '1 . 3 5 6 . 5 .', '4 - . 2 4 - . .'],
    bassPat: 'r . f . r . f .', brush: '..o...o...o...o.', knock: 'x.......x.......', swing: 0.2,
  },
  rest: {
    name: 'Embers', bpm: 66, beats: 3, root: 55, scale: MAJOR, lead: 'bell', padBright: 800,
    chords: [0, 3, 0, 4],
    mel: ['4 - - 2 - -', '3 - - . . .', '2 - - 4 - -', '1 - - . . .'],
    bassPat: 'r - - - - -',
  },
  event: {
    name: 'Strange Hands', bpm: 80, beats: 4, root: 59, scale: PHRYG, lead: 'reed', padBright: 800,
    chords: [0, 1, 0, 6],
    mel: ['4 - 3 - 1 - . .', '0 - - - . . . .', '4 - 5 - 4 - 3 -', '1 - - - . . . .'],
    bassPat: 'r - - - r - - -', knock: '..........o.....',
  },
  riddle: {
    name: 'Riddles', bpm: 70, beats: 4, root: 62, scale: MAJOR, lead: 'bell', padBright: 1000,
    chords: [0, 5, 3, 4],
    mel: ['6 . . 4 . . 2 .', '5 - - - . . . .', '3 . . 5 . . 7 .', '6 - - - . . . .'],
    bassPat: 'r - - - f - - -',
  },
  end: {
    name: 'Last Light', bpm: 70, beats: 3, root: 62, scale: MINOR, lead: 'bell', padBright: 800,
    chords: [0, 5, 3, 4],
    mel: ['4 - - 2 - -', '5 - - . . .', '2 - - 3 - -', '1 - - . . .'],
    bassPat: 'r - - - - -',
  },
};

/** Intensity: 0 explore (map, reward), 1 fight, 2 elite, 3 boss (the tense variant). */
interface Playing extends Song { intensity: number; out: GainNode; step: number; next: number; loop: number }

let song: Playing | null = null;
let wanted = '';
let mood = '';
let timer: number | null = null;
let tension = 0; // 0..1: low HP adds a heartbeat in fights
let rng = 1;
const rand = () => ((rng = (rng * 16807) % 2147483647) / 2147483647);

function parseMood(m: string): { key: string; intensity: number } {
  const [k, i] = m.split(':');
  return { key: SONGS[k] ? k : 'title', intensity: Number(i ?? 0) || 0 };
}

/**
 * Moods: 'title', 'act1' … 'act4' (+ ':1' fight, ':2' elite, ':3' boss), 'shop', 'rest', 'event', 'riddle', 'end'.
 * Called on every render; only a change does anything. Changes land on the next beat with a short crossfade.
 */
export function setMood(m: string): void {
  wanted = m;
  if (!ctx || !unlocked || musicLevel() <= 0) return;
  if (m === mood && song) return;
  mood = m;
  const { key, intensity } = parseMood(m);
  const base = SONGS[key];
  const boss = intensity >= 3;
  const c = ctx;
  const out = c.createGain();
  out.gain.value = 0.0001;
  out.connect(musicIn!);
  const start = song ? Math.max(c.currentTime + 0.05, song.next) : c.currentTime + 0.1;
  out.gain.setTargetAtTime(1, start, 0.35);
  if (song) {
    // Same song, new intensity (map → fight): keep the bar position so the band just leans in.
    const keep = song.name === base.name && !boss && song.intensity < 3;
    const old = song.out;
    old.gain.setTargetAtTime(0.0001, start, 0.4);
    setTimeout(() => { try { old.disconnect(); } catch { /* gone */ } }, 4000);
    song = { ...variant(base, boss), intensity, out, step: keep ? song.step : 0, next: start, loop: keep ? song.loop : 0 };
  } else song = { ...variant(base, boss), intensity, out, step: 0, next: start, loop: 0 };
  rng = 1 + key.length * 977 + intensity * 131;
  if (timer === null) timer = window.setInterval(pump, 25);
}

/** The boss variant: harmonic minor, faster, lower, with a drone, tremolo strings and a heartbeat. */
function variant(s: Song, boss: boolean): Song {
  if (!boss) return s;
  return {
    ...s, name: `${s.name} (boss)`, bpm: Math.round(s.bpm * (s.beats === 3 ? 1.0 : 1.15)), root: s.root - 2, scale: s.scale === WHOLE ? WHOLE : HARM, lead: 'pluck',
    chords: s.chords.map((d, i) => (i % 4 === 3 ? 4 : i % 2 ? 5 : 0)),
    kick: s.beats === 3 ? 'x...x...x...' : 'x.x.....x.x.....', knock: s.beats === 3 ? '........o...' : '....x.......x..x', brush: s.beats === 3 ? 'oooooooooooo' : 'oooooooooooooooo',
    padBright: 600,
  };
}

export function setTension(x: number): void { tension = Math.max(0, Math.min(1, x)); }

/** The Counter window holds time still: the music goes muffled and quiet until you answer. */
export function hush(on: boolean): void {
  if (!ctx || !musicTone) return;
  musicTone.frequency.setTargetAtTime(on ? 650 : 16000, ctx.currentTime, on ? 0.08 : 0.3);
}

export function stopMusic(): void {
  if (timer !== null) { clearInterval(timer); timer = null; }
  if (song && ctx) { const old = song.out; old.gain.setTargetAtTime(0.0001, ctx.currentTime, 0.2); setTimeout(() => { try { old.disconnect(); } catch { /* gone */ } }, 1500); }
  song = null;
  mood = '';
}

function deg(s: Song, d: number): number {
  const n = s.scale.length;
  const oct = Math.floor(d / n);
  return s.root + s.scale[((d % n) + n) % n] + 12 * oct;
}

function pump(): void {
  if (!ctx || !song || ctx.state !== 'running') return;
  const ahead = ctx.currentTime + 0.14;
  if (song.next < ctx.currentTime - 0.3) song.next = ctx.currentTime + 0.02; // woke from a suspend: don't rush to catch up
  while (song.next < ahead) {
    playStep(song, song.next);
    const dur = 60 / song.bpm / 4;
    song.step++;
    song.next += dur;
  }
}

function playStep(s: Playing, t0: number): void {
  const out = s.out;
  const per = s.beats * 4; // 16ths per bar
  const bars = s.chords.length;
  const inBar = s.step % per;
  const bar = Math.floor(s.step / per) % bars;
  if (inBar === 0 && bar === 0 && s.step > 0) s.loop++;
  const sixteenth = 60 / s.bpm / 4;
  const t = t0 + (inBar % 2 === 1 && s.swing ? s.swing * sixteenth : 0);
  const I = s.intensity, boss = I >= 3;
  const chordRoot = s.chords[bar];
  const triad = [0, 2, 4].map((k) => deg(s, chordRoot + k));
  const barSec = sixteenth * per;

  // Pad: the felt under everything.
  if (inBar === 0) pad(out, triad.map((m) => mtof(m - 12)), t, barSec * 0.98, boss ? 0.026 : 0.02 + 0.004 * Math.min(I, 2), s.padBright ?? 900);
  if (boss && inBar === 0) {
    osc(out, 'sawtooth', mtof(s.root - 24), t, barSec, 0.03, { lp: 220, a: 0.2 });
    tremolo(out, triad.map((m) => mtof(m)), t, barSec * 0.95, 0.014);
  }

  // Bass (fights and up), one token per 8th.
  if (I >= 1 && inBar % 2 === 0) {
    const tok = s.bassPat.split(' ')[inBar / 2];
    const b = tok === 'r' ? triad[0] : tok === 'f' ? deg(s, chordRoot + 4) : tok === 'o' ? triad[0] + 12 : null;
    if (b !== null) bass(out, mtof(b - 24), t, sixteenth * (tok === 'r' && s.bassPat.includes('-') ? 4 : 1.8), boss ? 0.2 : 0.16);
  }

  // Arpeggio: quiet chord tones on 8ths when exploring, 16ths in a boss fight.
  if ((I === 0 && inBar % 4 === 2) || (I >= 2 && inBar % 2 === 1) || (boss && inBar % 2 === 0)) {
    const n = triad[[0, 1, 2, 1][(inBar >> 1) % 4]] + 12;
    if (boss) pluck(out, mtof(n), t, sixteenth * 1.5, 0.03);
    else bell(out, mtof(n + 12), t, 0.4, 0.016);
  }

  // Melody: every loop but each 4th (a breath for the arpeggio), lightly varied on odd loops.
  const rest = s.loop % 4 === 3 && I < 3;
  if (!rest && inBar % 2 === 0) {
    const toks = s.mel[bar % s.mel.length].split(' ');
    const i = inBar / 2;
    const tok = toks[i];
    if (tok && tok !== '.' && tok !== '-') {
      let d = Number(tok);
      if (s.loop % 2 === 1 && rand() < 0.18) d += rand() < 0.5 ? 2 : -2;
      let held = 1;
      while (toks[i + held] === '-') held++;
      const dur = sixteenth * 2 * held;
      const m = deg(s, d) + (boss ? -12 : 0) + (s.lead === 'bell' ? 12 : 0);
      const v = I === 0 ? 0.6 : 1;
      if (s.lead === 'bell') bell(out, mtof(m), t, Math.max(0.5, dur * 1.4), 0.055 * v);
      else if (s.lead === 'pluck') pluck(out, mtof(m), t, Math.max(0.3, dur), (boss ? 0.06 : 0.07) * v);
      else reed(out, mtof(m), t, dur, 0.05 * v);
    }
  }

  // Percussion: knuckles and brushes on the table; a kick from elites on.
  const hit = (p: string | undefined) => p?.[inBar];
  if (I >= 1) {
    const b = hit(s.brush); if (b === 'x' || b === 'o') brush(out, t, b === 'x' ? 0.05 : 0.025 + (boss ? 0.008 : 0));
    const k = hit(s.knock); if (k === 'x' || k === 'o') knock(out, t, k === 'x' ? 0.09 : 0.05);
  }
  if (I >= 2 || (I === 1 && s.beats === 3)) { const k = hit(s.kick); if (k === 'x') kick(out, t, boss ? 0.3 : 0.2); }
  // Low HP in a fight: a heartbeat (lub-dub) on beat one.
  if (I >= 1 && tension > 0.5 && inBar === 0) { kick(out, t, 0.12 + 0.18 * tension); kick(out, t + sixteenth * 1.5, 0.08 + 0.12 * tension); }
}

/** For the settings screen: what is playing now. */
export function nowPlaying(): string { return song ? song.name : ''; }
