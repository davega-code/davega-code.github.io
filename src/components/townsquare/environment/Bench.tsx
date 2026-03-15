import React from 'react';
import type { IsometricPosition } from '../../../types';
import { toIsometric } from '../../../utils/isometric';

export interface BenchProps {
  position: IsometricPosition;
}

/**
 * Isometric line-art bench (~25×15px).
 * Positioned via `toIsometric()` from grid coordinates.
 *
 * Consistent stroke style: var(--line-color), var(--stroke-width),
 * strokeLinecap="round", strokeLinejoin="round" for hand-drawn feel.
 */
export const Bench: React.FC<BenchProps> = ({ position }) => {
  const { screenX, screenY } = toIsometric(position.gridX, position.gridY);

  return (
    <g transform={`translate(${screenX}, ${screenY})`} data-testid="env-bench">
      {/* Seat */}
      <polygon
        points="-12,-4 0,-8 12,-4 0,0"
        fill="#A0845C" stroke="var(--line-color)" strokeWidth="var(--stroke-width)"
        strokeLinecap="round" strokeLinejoin="round"
      />
      {/* Front face */}
      <polygon
        points="-12,-4 0,0 0,4 -12,0"
        fill="#8B7350" stroke="var(--line-color)" strokeWidth="1"
        strokeLinecap="round" strokeLinejoin="round"
      />
      {/* Right face */}
      <polygon
        points="0,0 12,-4 12,0 0,4"
        fill="#96794E" stroke="var(--line-color)" strokeWidth="1"
        strokeLinecap="round" strokeLinejoin="round"
      />
      {/* Left leg */}
      <line x1={-10} y1={0} x2={-10} y2={6}
        stroke="var(--line-color)" strokeWidth="1.5" strokeLinecap="round" />
      {/* Right leg */}
      <line x1={10} y1={-2} x2={10} y2={4}
        stroke="var(--line-color)" strokeWidth="1.5" strokeLinecap="round" />
    </g>
  );
};
