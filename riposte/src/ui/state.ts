// Shared UI state and helpers, so screens can live in separate modules.
import type { CardInst, CharId, RunState, UiEvent, ModId } from '../engine/types';
import { type Profile, type RunResult, loadProfile, loadRun } from '../engine/meta';
import type { PickKind } from '../data/events';
import type { Pull } from '../engine/economy';

export type View = 'title' | 'chars' | 'run' | 'collection' | 'store' | 'forge' | 'events' | 'profile' | 'settings' | 'howto' | 'end';

export interface Picker { kind: PickKind | 'view' | 'forge'; title: string; onPick?: (uid: number) => void; cards: CardInst[]; chosen?: number; /** v0.10: show identical copies once with a ×N badge. */ group?: boolean; /** v0.10: a line under the title. */ sub?: string }

export interface PackOpen { pack: string; pulls: Pull[]; flipped: boolean[]; stage: 'sealed' | 'open'; gambled: boolean; gambleSel: number | null; gambleMsg: string | null; shattered?: number }

export const app = {
  profile: loadProfile() as Profile,
  run: loadRun() as RunState | null,
  view: 'title' as View,
  sel: null as number | null,
  busy: false,
  modal: null as string | null,
  picker: null as Picker | null,
  result: null as RunResult | null,
  endRun: null as RunState | null,
  minted: false,
  kept: [] as string[],
  charPick: 'duelist' as CharId,
  ascPick: 0,
  collTab: 'cards' as 'cards' | 'decks' | 'relics' | 'legacy' | 'bestiary',
  collFilter: 'all' as string,
  /** v0.7: element filter ('' = any) and page for the ~1000-card collection; page for the Forge list. */
  collElem: '' as string,
  collPage: 0,
  forgePage: 0,
  deckChar: 'duelist' as CharId,
  forgeSel: null as string | null,
  forgeFilter: 'owned' as 'owned' | 'all' | 'extras',
  profTab: 'talents' as 'talents' | 'achievements' | 'quests' | 'cosmetics' | 'stats',
  rewardCardSel: null as string | null,
  tipIdx: 0,
  chainShow: null as UiEvent | null,
  /** v0.13: the chain recap link the player tapped open (the recap then stays up and the fight waits). */
  chainPin: null as number | null,
  /** v0.13: how long the chain recap stays up on its own, for its timer bar. */
  chainMs: 0,
  /**
   * v0.7: an open counter window waiting for the player's answer.
   * v0.13: `focus` is the chain link being read (default: the one about to resolve), `sel` the Counter picked.
   */
  counterAsk: null as { win: import('../engine/combat').CounterWindow; resolve: (uid: number) => void; focus?: number; sel?: number } | null,
  confirmFn: null as (() => void) | null,
  pack: null as PackOpen | null,
  forgeMod: null as ModId | null,
  /** v0.11: the upgrade path picked in the upgrade picker. */
  upPath: 'a' as 'a' | 'b',
  // v0.3
  /** The roguelike run, parked while an Arena duel uses app.run. */
  stash: null as RunState | null,
  arenaChar: 'duelist' as CharId,
  weekly: false,
};

export const ui = {
  render: (): void => {},
  persist: (): void => {},
  modal: (_html: string): void => {},
  ask: (_q: string, _yes: string, _fn: () => void): void => {},
  toast: (_html: string, _kind?: string): void => {},
};

export const root = document.getElementById('app')!;
