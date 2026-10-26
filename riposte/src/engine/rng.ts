// Deterministic, serializable RNG (mulberry32). Each stream keeps its state in a plain
// object so runs can be saved mid-fight and daily seeds replay identically for everyone.

export function hashStr(s: string): number {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619) >>> 0;
  }
  return h >>> 0 || 1;
}

export class Rng {
  constructor(private holder: Record<string, number>, private key: string) {
    if (!holder[key]) holder[key] = 1;
  }

  static streams(seed: number, names: string[]): Record<string, number> {
    const out: Record<string, number> = {};
    for (const n of names) out[n] = hashStr(`${seed}:${n}`);
    return out;
  }

  next(): number {
    let t = (this.holder[this.key] = (this.holder[this.key] + 0x6d2b79f5) >>> 0);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }

  int(a: number, b: number): number {
    return a + Math.floor(this.next() * (b - a + 1));
  }

  chance(p: number): boolean {
    return this.next() < p;
  }

  pick<T>(arr: readonly T[]): T {
    return arr[Math.floor(this.next() * arr.length)];
  }

  shuffle<T>(arr: T[]): T[] {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(this.next() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  weighted<T>(items: [T, number][]): T {
    const total = items.reduce((s, [, w]) => s + w, 0);
    let r = this.next() * total;
    for (const [v, w] of items) {
      r -= w;
      if (r < 0) return v;
    }
    return items[items.length - 1][0];
  }

  sample<T>(arr: readonly T[], n: number): T[] {
    return this.shuffle([...arr]).slice(0, n);
  }
}
