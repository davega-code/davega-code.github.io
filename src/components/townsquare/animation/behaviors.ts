import type { FigureBehavior } from '../../../types';

/**
 * Runtime state for a single stick figure managed by the animation loop.
 */
export interface FigureState {
  /** Unique identifier */
  id: string;
  /** Walk path this figure follows */
  pathId: string;
  /** Current progress along the path (0.0–1.0) */
  progress: number;
  /** Movement speed multiplier */
  speed: number;
  /** Current behavior */
  behavior: FigureBehavior;
  /** Walk cycle phase (0–1, drives arm/leg animation) */
  walkPhase: number;
  /** Whether the figure is currently facing left */
  facingLeft: boolean;
  /** Grid position (updated each frame) */
  gridX: number;
  /** Grid position (updated each frame) */
  gridY: number;
  /** Direction of travel along path: 1 = forward, -1 = reverse */
  direction: 1 | -1;
  /** Remaining pause time in ms (for interaction points) */
  pauseRemaining: number;
  /** Idle animation variant when paused */
  idleVariant: 'standing' | 'looking-left' | 'looking-right';
  /** Timer for cycling idle variants */
  idleTimer: number;
}

/**
 * Transition a figure to the walking state.
 */
export function startWalking(figure: FigureState): FigureState {
  return {
    ...figure,
    behavior: 'walking',
    pauseRemaining: 0,
  };
}

/**
 * Transition a figure to the sitting state for a given duration.
 */
export function startSitting(figure: FigureState, duration: number): FigureState {
  return {
    ...figure,
    behavior: 'sitting',
    pauseRemaining: duration,
  };
}

/**
 * Transition a figure to idle (paused) state for a given duration.
 */
export function startIdle(figure: FigureState, duration: number): FigureState {
  return {
    ...figure,
    behavior: 'idle',
    pauseRemaining: duration,
    idleVariant: 'standing',
    idleTimer: 0,
  };
}

/**
 * Transition a figure to the entering-building state.
 */
export function enterBuilding(figure: FigureState, duration: number): FigureState {
  return {
    ...figure,
    behavior: 'entering-building',
    pauseRemaining: duration,
  };
}

/**
 * Transition a figure to the exiting-building state, then resume walking.
 */
export function exitBuilding(figure: FigureState): FigureState {
  return {
    ...figure,
    behavior: 'walking',
    pauseRemaining: 0,
  };
}

/**
 * Update idle animation variant cycling.
 * Cycles through standing → looking-left → looking-right every ~1.5s.
 */
export function updateIdleAnimation(figure: FigureState, deltaTime: number): FigureState {
  if (figure.behavior !== 'idle' && figure.behavior !== 'sitting') {
    return figure;
  }

  const newTimer = figure.idleTimer + deltaTime;
  const IDLE_CYCLE_MS = 1500;

  if (newTimer >= IDLE_CYCLE_MS) {
    const variants: Array<'standing' | 'looking-left' | 'looking-right'> = [
      'standing',
      'looking-left',
      'looking-right',
    ];
    const currentIdx = variants.indexOf(figure.idleVariant);
    const nextIdx = (currentIdx + 1) % variants.length;
    return {
      ...figure,
      idleTimer: 0,
      idleVariant: variants[nextIdx],
    };
  }

  return {
    ...figure,
    idleTimer: newTimer,
  };
}
