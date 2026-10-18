import { useState } from "react";
import * as css from "./background.css.ts";

const MIN_COUNT = 60;
const MAX_COUNT = 140;

/** Seconds to cross the screen per size: larger (nearer) particles move faster for depth. */
const SPEED = { small: [70, 100], medium: [45, 70], large: [30, 45] } as const;

type Size = keyof typeof css.sizes;
type Path = keyof typeof css.paths;
type Color = keyof typeof css.colors;

interface Particle {
  size: Size;
  path: Path;
  color: Color;
  left: number;
  top: number;
  duration: number;
  /** Seconds into the journey to start, so the screen is never empty */
  phase: number;
  sway: number;
  swayPhase: number;
}

const between = (min: number, max: number) => min + Math.random() * (max - min);
const pick = <T,>(items: readonly T[]) => items[Math.floor(Math.random() * items.length)];

function makeParticle(): Particle {
  const r = Math.random();
  const size: Size = r < 0.55 ? "small" : r < 0.85 ? "medium" : "large";
  const duration = between(SPEED[size][0], SPEED[size][1]);
  const sway = between(4, 9);
  return {
    size,
    path: pick(["drift", "rise", "diagonal"] as const),
    // Half ink, half primaries keeps the field calm
    color: Math.random() < 0.5 ? "ink" : pick(["red", "yellow", "blue"] as const),
    left: between(0, 100),
    top: between(0, 100),
    duration,
    phase: between(0, duration),
    sway,
    swayPhase: between(0, sway),
  };
}

function makeParticles(): Particle[] {
  const count = MIN_COUNT + Math.floor(Math.random() * (MAX_COUNT - MIN_COUNT + 1));
  return Array.from({ length: count }, makeParticle);
}

export function Background() {
  // All randomness is fixed here: re-renders (e.g. dragging icons) must not change styles, or the animations restart
  const [particles] = useState(makeParticles);

  return (
    <div className={css.background} aria-hidden="true">
      {particles.map((p, i) => (
        <div
          key={i}
          className={`${css.particle} ${css.sizes[p.size]} ${css.paths[p.path]} ${css.colors[p.color]}`}
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            animationDuration: `${p.duration}s`,
            animationDelay: `-${p.phase}s`,
          }}
        >
          <div className={css.dot} style={{ animationDuration: `${p.sway}s`, animationDelay: `-${p.swayPhase}s` }} />
        </div>
      ))}
    </div>
  );
}
