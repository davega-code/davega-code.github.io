import React from 'react';
import type { IsometricPosition, FigureBehavior } from '../../../types';
import { toIsometric } from '../../../utils/isometric';

export interface StickFigureProps {
  /** Grid position of the figure */
  position: IsometricPosition;
  /** Current behavior state */
  behavior: FigureBehavior;
  /** Walk cycle phase 0–1 (controls arm/leg swing) */
  walkPhase: number;
  /** Whether the figure is walking to the left (flip horizontally) */
  facingLeft: boolean;
}

/**
 * A simple stick figure rendered as an SVG `<g>` group.
 *
 * Anatomy (in local coordinates, origin at feet):
 * - Head: circle at (0, -28), r=4
 * - Body: line from (0, -24) to (0, -12)
 * - Arms: two lines from shoulder (0, -22), swinging with walkPhase
 * - Legs: two lines from hip (0, -12), swinging with walkPhase
 *
 * When `behavior='walking'`, arms and legs rotate based on `walkPhase`.
 * When `behavior='sitting'`, legs are bent at 90°.
 * When `behavior='idle'`, static standing pose.
 */
export const StickFigure: React.FC<StickFigureProps> = ({
  position,
  behavior,
  walkPhase,
  facingLeft,
}) => {
  const { screenX, screenY } = toIsometric(position.gridX, position.gridY);

  // Arm and leg swing angle in degrees (±25° range for walking)
  const swingAngle = behavior === 'walking'
    ? Math.sin(walkPhase * Math.PI * 2) * 25
    : 0;

  // Scale factor for isometric — figures should be proportional to buildings
  const scale = 0.8;
  const flipX = facingLeft ? -1 : 1;

  return (
    <g
      transform={`translate(${screenX}, ${screenY}) scale(${scale * flipX}, ${scale})`}
      style={{ pointerEvents: 'none' }}
      aria-hidden="true"
    >
      {/* Head */}
      <circle
        cx={0}
        cy={-28}
        r={4}
        stroke="var(--line-color)"
        strokeWidth="var(--stroke-width)"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Body */}
      <line
        x1={0}
        y1={-24}
        x2={0}
        y2={-12}
        stroke="var(--line-color)"
        strokeWidth="var(--stroke-width)"
        strokeLinecap="round"
      />

      {/* Arms */}
      {behavior === 'sitting' ? (
        /* Sitting: arms resting on lap */
        <>
          <line
            x1={0} y1={-20}
            x2={-5} y2={-15}
            stroke="var(--line-color)"
            strokeWidth="var(--stroke-width)"
            strokeLinecap="round"
          />
          <line
            x1={0} y1={-20}
            x2={5} y2={-15}
            stroke="var(--line-color)"
            strokeWidth="var(--stroke-width)"
            strokeLinecap="round"
          />
        </>
      ) : (
        /* Walking / idle: arms swing from shoulder */
        <>
          <line
            x1={0} y1={-22}
            x2={0} y2={-22}
            stroke="var(--line-color)"
            strokeWidth="var(--stroke-width)"
            strokeLinecap="round"
            transform={`rotate(${swingAngle}, 0, -22)`}
            style={{ transformOrigin: '0px -22px' }}
          >
            {/* Arm endpoint via transform — draw arm as line from shoulder down */}
          </line>
          {/* Left arm */}
          <g transform={`rotate(${swingAngle}, 0, -22)`}>
            <line
              x1={0} y1={-22}
              x2={-6} y2={-14}
              stroke="var(--line-color)"
              strokeWidth="var(--stroke-width)"
              strokeLinecap="round"
            />
          </g>
          {/* Right arm */}
          <g transform={`rotate(${-swingAngle}, 0, -22)`}>
            <line
              x1={0} y1={-22}
              x2={6} y2={-14}
              stroke="var(--line-color)"
              strokeWidth="var(--stroke-width)"
              strokeLinecap="round"
            />
          </g>
        </>
      )}

      {/* Legs */}
      {behavior === 'sitting' ? (
        /* Sitting: legs bent at 90° */
        <>
          <line
            x1={0} y1={-12}
            x2={-4} y2={-6}
            stroke="var(--line-color)"
            strokeWidth="var(--stroke-width)"
            strokeLinecap="round"
          />
          <line
            x1={-4} y1={-6}
            x2={-4} y2={0}
            stroke="var(--line-color)"
            strokeWidth="var(--stroke-width)"
            strokeLinecap="round"
          />
          <line
            x1={0} y1={-12}
            x2={4} y2={-6}
            stroke="var(--line-color)"
            strokeWidth="var(--stroke-width)"
            strokeLinecap="round"
          />
          <line
            x1={4} y1={-6}
            x2={4} y2={0}
            stroke="var(--line-color)"
            strokeWidth="var(--stroke-width)"
            strokeLinecap="round"
          />
        </>
      ) : (
        /* Walking / idle: legs swing from hip */
        <>
          <g transform={`rotate(${-swingAngle}, 0, -12)`}>
            <line
              x1={0} y1={-12}
              x2={-4} y2={0}
              stroke="var(--line-color)"
              strokeWidth="var(--stroke-width)"
              strokeLinecap="round"
            />
          </g>
          <g transform={`rotate(${swingAngle}, 0, -12)`}>
            <line
              x1={0} y1={-12}
              x2={4} y2={0}
              stroke="var(--line-color)"
              strokeWidth="var(--stroke-width)"
              strokeLinecap="round"
            />
          </g>
        </>
      )}
    </g>
  );
};
