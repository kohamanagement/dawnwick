// v0.11 "Branching Paths": every card has two upgrades. Path A (Name+) is the classic upgrade: bigger
// numbers, or the cost cut / lost Exhaust some cards print. Path B (Name✦) trades those numbers for a
// keyword: it costs 1 less, Retains, is Innate or stops Exhausting. Which keyword a card gets follows
// from the card (see `altPath`); hand-made cards can name their own B with `alt` (a different set of
// numbers, e.g. more Burn instead of more damage). A copy is upgraded once, down one path.
import type { CardDef, CardInst, Vals } from '../engine/types';

export type AltKind = 'cheap' | 'retain' | 'innate' | 'keep' | 'alt';
export interface AltPath { kind: AltKind; label: string }

type Copy = Pick<CardInst, 'up'> & { path?: CardInst['path'] };

export const isPathB = (c: Copy): boolean => !!c.up && c.path === 'b';

/** What path B does for this card. */
export function altPath(d: CardDef): AltPath {
  if (d.alt) return { kind: d.alt.kind, label: d.alt.label ?? LABEL[d.alt.kind] };
  if (d.exhaust && !d.upNoExhaust) return { kind: 'keep', label: LABEL.keep };
  if (d.cost >= 2 && d.upCost === undefined) return { kind: 'cheap', label: LABEL.cheap };
  if ((d.type === 'attack' || d.type === 'skill') && !d.retain) return { kind: 'retain', label: LABEL.retain };
  if (!d.innate) return { kind: 'innate', label: LABEL.innate };
  return { kind: 'retain', label: LABEL.retain };
}
const LABEL: Record<AltKind, string> = {
  cheap: 'Costs 1 less', retain: 'Gains Palm', innate: 'Gains Opener', keep: 'No longer Folds', alt: 'Different numbers',
};

/** What path A does, in words (for the upgrade picker). */
export function pathALabel(d: CardDef): string {
  const parts: string[] = [];
  if (d.up && Object.keys(d.up).length) parts.push('Bigger numbers');
  if (d.upCost !== undefined) parts.push(`Costs ${d.upCost}`);
  if (d.upNoExhaust) parts.push('No longer Folds');
  return parts.join(', ') || 'Bigger numbers';
}

/** The card's numbers for this copy. */
export function upVals(d: CardDef, c: Copy): Vals {
  if (!c.up) return d.v;
  if (c.path === 'b') return d.alt?.kind === 'alt' && d.alt.v ? { ...d.v, ...d.alt.v } : d.v;
  return d.up ? { ...d.v, ...d.up } : d.v;
}

/** Printed cost of this copy (before sigils, relics and statuses). */
export function printedCost(d: CardDef, c: Copy): number {
  if (!c.up) return d.cost;
  if (c.path === 'b') return altPath(d).kind === 'cheap' ? Math.max(0, d.cost - 1) : d.cost;
  return d.upCost ?? d.cost;
}

export function exhaustsCopy(d: CardDef, c: Copy): boolean {
  if (!d.exhaust) return false;
  if (!c.up) return true;
  if (c.path === 'b') return altPath(d).kind !== 'keep';
  return !d.upNoExhaust;
}
export const retainsCopy = (d: CardDef, c: Copy): boolean => !!d.retain || (isPathB(c) && altPath(d).kind === 'retain');
export const innateCopy = (d: CardDef, c: Copy): boolean => !!d.innate || (isPathB(c) && altPath(d).kind === 'innate');

/** Deck-code suffix: +1 for path A, +2 for path B. */
export const upCode = (c: Copy): string => (!c.up ? '' : c.path === 'b' ? '+2' : '+1');
/** Parse a `+1` / `+2` suffix. */
export function parseUp(code: string): { id: string; up: boolean; path?: 'b' } {
  const [id, u] = code.split('+');
  return u === '2' ? { id, up: true, path: 'b' } : { id, up: u === '1' };
}
