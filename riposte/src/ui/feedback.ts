// v0.16 "Every Action Sounds": feedback that follows the run's state rather than one button.
// After each render we compare the run with the last render and give every change a sound and a small motion:
// gold ticks up with a coin shower, a new keepsake pops into the bar, a card slides into the deck, HP flashes,
// and each place you arrive at (chest, Merchant, Candle, forge, event) has its own entry sound.
// Actions that already make a specific sound (buying, resting, honing) are not doubled: the shared 35 ms
// de-duplication in audio.sfx() and playedWithin() keep it to one.
import type { RunState } from '../engine/types';
import { app, root } from './state';
import * as audio from './audio';
import { burstAt } from './hub';

interface Snap { seed: number | string; gold: number; hp: number; maxHp: number; deck: number; deckSig: string; ups: number; mods: number; relics: number; omens: number; screen: string; fate: string; patron: boolean }
let last: Snap | null = null;

function snap(r: RunState): Snap {
  return {
    seed: r.seed, gold: r.gold, hp: r.hp, maxHp: r.maxHp, deck: r.deck.length,
    deckSig: r.deck.map((c) => c.id).sort().join(','),
    ups: r.deck.filter((c) => c.up).length, mods: r.deck.filter((c) => c.mod).length,
    relics: r.relics.length, omens: (r.omens ?? []).length, screen: r.screen, fate: r.fate ?? '', patron: !!r.patron?.done,
  };
}

const motion = (): boolean => !app.profile.settings.reduceMotion;

/** Restart a CSS animation class on an element. */
export function kick(el: Element | null | undefined, cls: string): void {
  if (!el || !motion()) return;
  el.classList.remove(cls); void (el as HTMLElement).offsetWidth; el.classList.add(cls);
}

/** A "+12" / "-30" that floats off a HUD stat. */
function floatOn(el: Element | null, text: string, cls: string): void {
  if (!el || !motion()) return;
  const f = document.createElement('span');
  f.className = `hudfloat ${cls}`;
  f.textContent = text;
  el.appendChild(f);
  setTimeout(() => f.remove(), 1000);
}

/** Count the gold number from its old value to the new one. */
function tickNumber(el: HTMLElement | null, from: number, to: number): void {
  if (!el || !motion() || from === to) return;
  const t0 = performance.now(), dur = Math.min(700, 250 + Math.abs(to - from) * 4);
  const step = (now: number) => {
    if (!el.isConnected) return;
    const k = Math.min(1, (now - t0) / dur);
    el.textContent = String(Math.round(from + (to - from) * (1 - (1 - k) ** 3)));
    if (k < 1) requestAnimationFrame(step);
  };
  el.textContent = String(from);
  requestAnimationFrame(step);
}

const ENTER: Partial<Record<string, audio.Sfx>> = { treasure: 'chest', shop: 'shopBell', rest: 'campfire', forge: 'forge', event: 'event', fate: 'fate', patron: 'fate' };

/** Called at the end of every render. */
export function runFeedback(): void {
  const r = app.view === 'run' ? app.run : null;
  if (!r || r.arena || r.puzzle) { last = null; return; }
  const now = snap(r);
  const was = last;
  last = now;
  // Fights narrate themselves (hits, Block, gold from cards); a new run is a fresh start.
  if (!was || was.seed !== now.seed || now.screen === 'combat' || was.screen === 'combat') return;

  let d = 0;
  const play = (name: audio.Sfx) => { audio.sfx(name, d); d += 0.12; };

  if (now.screen !== was.screen) {
    const s = ENTER[now.screen];
    if (s) play(s);
    if (now.screen === 'treasure') {
      const chest = root.querySelector('.chest');
      kick(chest, 'opening');
      if (chest && motion()) setTimeout(() => chest.isConnected && burstAt(chest as HTMLElement, 18, '#ffd25e'), 420);
    }
    if (now.screen === 'map') kick(root.querySelector('.node.here'), 'landed');
  }

  if (now.relics > was.relics) {
    play('item');
    const chips = root.querySelectorAll('.relicbar .relicchip, .relicbar [data-a="relic"]');
    const chip = chips[chips.length - 1];
    kick(chip, 'newchip');
    if (chip && motion()) burstAt(chip as HTMLElement, 12, '#ffd25e');
  }
  if (now.omens > was.omens) { play('omen'); kick(root.querySelector('.relicbar .omens .omen:last-child'), 'newchip'); }
  if (now.fate && now.fate !== was.fate && now.screen === was.screen) play('fate');

  const deckBtn = root.querySelector('.hud [data-a="deck"]');
  if (now.deck > was.deck) { play('cardGain'); kick(deckBtn, 'bump'); floatOn(deckBtn, `+${now.deck - was.deck}`, 'up'); }
  else if (now.deck < was.deck) { play('remove'); kick(deckBtn, 'bump'); floatOn(deckBtn, `${now.deck - was.deck}`, 'down'); }
  else if (now.deckSig !== was.deckSig) { play('transform'); kick(deckBtn, 'bump'); }
  if (now.ups > was.ups) play('upgrade');
  if (now.mods > was.mods) play('forge');

  const goldEl = root.querySelector<HTMLElement>('.hud .stat.gold');
  if (now.gold !== was.gold) {
    const diff = now.gold - was.gold;
    if (diff > 0) { audio.coins(diff, d); d += 0.12; }
    else if (!audio.playedWithin('buy', 200) && !audio.playedWithin('coin', 200)) play('spend');
    kick(goldEl, diff > 0 ? 'gain' : 'loss');
    floatOn(goldEl, `${diff > 0 ? '+' : ''}${diff}`, diff > 0 ? 'up' : 'down');
    tickNumber(goldEl?.querySelector<HTMLElement>('.num') ?? null, was.gold, now.gold);
  }

  const hpEl = root.querySelector('.hud .stat.hp');
  if (now.maxHp > was.maxHp) { play('maxhp'); kick(hpEl, 'gain'); floatOn(hpEl, `+${now.maxHp - was.maxHp} max`, 'up'); }
  if (now.hp !== was.hp) {
    const diff = now.hp - was.hp;
    if (diff > 0 && !audio.playedWithin('rest', 300)) play('heal');
    if (diff < 0) { play('hurt'); kick(root, 'shake'); }
    kick(hpEl, diff > 0 ? 'gain' : 'loss');
    floatOn(hpEl, `${diff > 0 ? '+' : ''}${diff}`, diff > 0 ? 'up' : 'down');
  }
}
