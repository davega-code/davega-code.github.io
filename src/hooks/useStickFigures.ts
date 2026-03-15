import { useState, useEffect, useRef, useCallback } from 'react';
import type { WalkPath } from '../types';
import { WALK_PATHS } from '../components/townsquare/animation/walkPaths';
import { STICK_FIGURES } from '../components/townsquare/animation/figureConfigs';
import {
  interpolatePath,
  advanceAlongPath,
  isMovingLeft,
  findNearbyInteractionPoint,
} from '../components/townsquare/animation/pathInterpolation';
import {
  startWalking,
  startSitting,
  startIdle,
  enterBuilding,
  exitBuilding,
  updateIdleAnimation,
} from '../components/townsquare/animation/behaviors';
import type { FigureState } from '../components/townsquare/animation/behaviors';
import type { StickFigureConfig, FigureBehavior } from '../types';

/** Data returned per figure for rendering */
export interface FigureRenderData {
  id: string;
  gridX: number;
  gridY: number;
  behavior: FigureBehavior;
  walkPhase: number;
  facingLeft: boolean;
}

/** Build a path lookup map */
const PATH_MAP = new Map<string, WalkPath>();
for (const path of WALK_PATHS) {
  PATH_MAP.set(path.id, path);
}

/**
 * Initialize a FigureState from a StickFigureConfig.
 */
function initFigure(config: StickFigureConfig): FigureState {
  const path = PATH_MAP.get(config.pathId);
  const pos = path
    ? interpolatePath(path, config.startOffset)
    : { gridX: 0, gridY: 0 };

  return {
    id: config.id,
    pathId: config.pathId,
    progress: config.startOffset,
    speed: config.speed,
    behavior: 'walking',
    walkPhase: Math.random(), // Stagger walk cycles
    facingLeft: false,
    gridX: pos.gridX,
    gridY: pos.gridY,
    direction: 1,
    pauseRemaining: 0,
    idleVariant: 'standing',
    idleTimer: 0,
  };
}

/**
 * Hook for managing stick figure animation state.
 *
 * Uses `requestAnimationFrame` to update figure positions each frame.
 * Handles walking, interaction points (benches, building entrances),
 * idle animations, and reduced motion.
 *
 * @param reducedMotion - When true, figures are static (no animation loop)
 * @param isVisible - When false, pauses the animation loop
 * @param figureCount - Number of active figures (responsive)
 */
export function useStickFigures(
  reducedMotion: boolean = false,
  isVisible: boolean = true,
  figureCount: number = 6,
): FigureRenderData[] {
  const [renderData, setRenderData] = useState<FigureRenderData[]>([]);
  const [initialized, setInitialized] = useState(false);
  const figuresRef = useRef<FigureState[]>([]);
  const rafRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const interactionCooldownRef = useRef<Map<string, number>>(new Map());

  // Initialize figures using requestIdleCallback (T056 perf optimization)
  const initializeFigures = useCallback((count: number) => {
    const configs = STICK_FIGURES.slice(0, count);
    const states = configs.map(initFigure);
    figuresRef.current = states;
    interactionCooldownRef.current.clear();

    // Set initial render data
    setRenderData(
      states.map((f) => ({
        id: f.id,
        gridX: f.gridX,
        gridY: f.gridY,
        behavior: f.behavior,
        walkPhase: f.walkPhase,
        facingLeft: f.facingLeft,
      })),
    );
    setInitialized(true);
  }, []);

  // Initialize on mount or when figureCount changes
  useEffect(() => {
    if (typeof window.requestIdleCallback === 'function') {
      const handle = window.requestIdleCallback(() => initializeFigures(figureCount));
      return () => window.cancelIdleCallback(handle);
    } else {
      const handle = setTimeout(() => initializeFigures(figureCount), 0);
      return () => clearTimeout(handle);
    }
  }, [figureCount, initializeFigures]);

  // Animation loop
  useEffect(() => {
    // Don't run animation if reduced motion, not visible, or not initialized
    if (reducedMotion || !isVisible || !initialized) {
      return;
    }

    let running = true;

    const animate = (timestamp: number) => {
      if (!running) return;

      if (!lastTimeRef.current) {
        lastTimeRef.current = timestamp;
      }

      let deltaTime = timestamp - lastTimeRef.current;
      lastTimeRef.current = timestamp;

      // T056: Clamp deltaTime to prevent large jumps after tab switch
      if (deltaTime > 100) {
        deltaTime = 16;
      }

      const figures = figuresRef.current;
      if (figures.length === 0) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }

      for (let i = 0; i < figures.length; i++) {
        let figure = figures[i];
        const path = PATH_MAP.get(figure.pathId);
        if (!path) continue;

        if (figure.behavior === 'walking') {
          // Advance along path
          const { progress, direction } = advanceAlongPath(
            figure.progress,
            figure.speed,
            deltaTime,
            path,
            figure.direction,
          );

          // Update walk phase (cycle every ~600ms for natural gait)
          const WALK_CYCLE_SPEED = 1 / 600;
          const newWalkPhase = (figure.walkPhase + deltaTime * WALK_CYCLE_SPEED) % 1;

          // Get new position
          const pos = interpolatePath(path, progress);
          const facingLeft = isMovingLeft(path, progress, direction);

          figure = {
            ...figure,
            progress,
            direction,
            walkPhase: newWalkPhase,
            gridX: pos.gridX,
            gridY: pos.gridY,
            facingLeft,
          };

          // Check for nearby interaction points
          const cooldownKey = `${figure.id}-${figure.pathId}`;
          const cooldown = interactionCooldownRef.current.get(cooldownKey) ?? 0;

          if (cooldown <= 0) {
            const ipIdx = findNearbyInteractionPoint(path, pos.gridX, pos.gridY);
            if (ipIdx >= 0) {
              const ip = path.interactionPoints[ipIdx];
              // Set cooldown to prevent re-triggering immediately
              interactionCooldownRef.current.set(cooldownKey, ip.duration + 2000);

              switch (ip.type) {
                case 'bench':
                  figure = startSitting(figure, ip.duration);
                  break;
                case 'building-entrance':
                  figure = enterBuilding(figure, ip.duration);
                  break;
                case 'pause':
                  figure = startIdle(figure, ip.duration);
                  break;
              }
            }
          } else {
            interactionCooldownRef.current.set(cooldownKey, cooldown - deltaTime);
          }
        } else if (
          figure.behavior === 'sitting' ||
          figure.behavior === 'idle' ||
          figure.behavior === 'entering-building'
        ) {
          // Count down pause timer
          const remaining = figure.pauseRemaining - deltaTime;
          if (remaining <= 0) {
            // Resume walking (or exit building)
            figure =
              figure.behavior === 'entering-building'
                ? exitBuilding(figure)
                : startWalking(figure);
          } else {
            figure = { ...figure, pauseRemaining: remaining };
            // Update idle animation cycling
            figure = updateIdleAnimation(figure, deltaTime);
          }
        }

        figures[i] = figure;
      }

      // Update render data
      setRenderData(
        figures.map((f) => ({
          id: f.id,
          gridX: f.gridX,
          gridY: f.gridY,
          behavior: f.behavior,
          walkPhase: f.walkPhase,
          facingLeft: f.facingLeft,
        })),
      );

      rafRef.current = requestAnimationFrame(animate);
    };

    // Reset timestamp on start
    lastTimeRef.current = 0;
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      running = false;
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = 0;
      }
    };
  }, [reducedMotion, isVisible, initialized]);

  // T056: Pause when tab is not visible
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = 0;
        lastTimeRef.current = 0; // Reset so next frame doesn't have huge deltaTime
      }
      // When tab becomes visible, the animation loop will be restarted
      // by the effect cleanup/re-run cycle
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return renderData;
}
