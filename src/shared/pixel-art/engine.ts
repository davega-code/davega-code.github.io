/** Tiny pixel-art engine: colour-indexed sprites painted onto a canvas at a whole-number scale. */

/** Advance Wars-flavoured palette; sprite rows use these single-character keys. "." is transparent. */
export const PALETTE: Record<string, string> = {
  k: "#1b1b2f", // outline
  w: "#ffffff",
  l: "#d8d8e4", // light grey
  m: "#9a9ab0", // mid grey
  d: "#5a5a74", // dark grey
  r: "#e8402e",
  R: "#a02018",
  o: "#f08a24",
  y: "#f8d040",
  Y: "#c89820",
  b: "#3a70e0",
  B: "#1d3f8f",
  c: "#8ae0ff", // screen glow
  C: "#3aa0d0",
  g: "#58c048",
  G: "#2e8a2e",
  s: "#f8c8a0", // skin
  S: "#d89870",
  h: "#6a3a20", // hair
  n: "#b87838", // wood
  N: "#7a4a20",
  p: "#f4ecd8", // paper
  t: "#40e8d0", // gem
  v: "#9a58d8",
};

export interface Sprite {
  w: number;
  h: number;
  rows: readonly string[];
}

export function sprite(rows: readonly string[]): Sprite {
  const w = rows[0].length;
  if (import.meta.env.DEV && rows.some((row) => row.length !== w)) {
    throw new Error(`Sprite rows must all be ${w} wide: ${rows.join("|")}`);
  }
  return { w, h: rows.length, rows };
}

const spriteCache = new WeakMap<Sprite, HTMLCanvasElement>();

/** Renders a sprite once at 1px per cell; later draws reuse the bitmap */
function bitmap(s: Sprite): HTMLCanvasElement {
  let canvas = spriteCache.get(s);
  if (canvas) return canvas;
  canvas = document.createElement("canvas");
  canvas.width = s.w;
  canvas.height = s.h;
  const ctx = canvas.getContext("2d")!;
  s.rows.forEach((row, y) => {
    for (let x = 0; x < row.length; x++) {
      const color = PALETTE[row[x]];
      if (!color) continue;
      ctx.fillStyle = color;
      ctx.fillRect(x, y, 1, 1);
    }
  });
  spriteCache.set(s, canvas);
  return canvas;
}

export interface Painter {
  /** Milliseconds into the current loop */
  t: number;
  dark: boolean;
  /** Draws a sprite with its top-left at (x, y); positions are rounded to whole pixels */
  draw(s: Sprite, x: number, y: number, flip?: boolean): void;
  /** Fills a rectangle with a palette key or any CSS colour */
  rect(x: number, y: number, w: number, h: number, color: string): void;
}

export function createPainter(ctx: CanvasRenderingContext2D, t: number, dark: boolean): Painter {
  return {
    t,
    dark,
    draw(s, x, y, flip = false) {
      const px = Math.round(x);
      const py = Math.round(y);
      if (!flip) {
        ctx.drawImage(bitmap(s), px, py);
        return;
      }
      ctx.save();
      ctx.translate(px + s.w, py);
      ctx.scale(-1, 1);
      ctx.drawImage(bitmap(s), 0, 0);
      ctx.restore();
    },
    rect(x, y, w, h, color) {
      ctx.fillStyle = PALETTE[color] ?? color;
      ctx.fillRect(Math.round(x), Math.round(y), Math.round(w), Math.round(h));
    },
  };
}

export interface Scene {
  width: number;
  height: number;
  /** Loop length in ms */
  duration: number;
  /** Time shown as a still frame under reduced motion */
  poster: number;
  paint(p: Painter): void;
}

/** 0 → 1 progress of t through [start, end], clamped */
export function seg(t: number, start: number, end: number): number {
  return Math.min(1, Math.max(0, (t - start) / (end - start)));
}

export function lerp(a: number, b: number, k: number): number {
  return a + (b - a) * k;
}

export function easeOut(k: number): number {
  return 1 - (1 - k) * (1 - k);
}

/** Point along a parabolic hop from (x0, y0) to (x1, y1) that peaks `lift` px above the straight line */
export function hop(k: number, x0: number, y0: number, x1: number, y1: number, lift: number): [number, number] {
  return [lerp(x0, x1, k), lerp(y0, y1, k) - Math.sin(Math.PI * k) * lift];
}

/** Picks one of `n` animation frames, switching every `ms` */
export function frame(t: number, ms: number, n: number): number {
  return Math.floor(t / ms) % n;
}

export function between(t: number, start: number, end: number): boolean {
  return t >= start && t < end;
}
