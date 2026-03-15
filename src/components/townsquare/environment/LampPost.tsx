import React from 'react';
import type { IsometricPosition } from '../../../types';
import { toIsometric } from '../../../utils/isometric';

export interface LampPostProps {
  position: IsometricPosition;
}

/**
 * Isometric line-art lamp post (~10×35px).
 * Positioned via `toIsometric()` from grid coordinates.
 *
 * Consistent stroke style: var(--line-color), var(--stroke-width),
 * strokeLinecap="round", strokeLinejoin="round" for hand-drawn feel.
 */
export const LampPost: React.FC<LampPostProps> = ({ position }) => {
  const { screenX, screenY } = toIsometric(position.gridX, position.gridY);

  return (
    <g transform={`translate(${screenX}, ${screenY})`} data-testid="env-lamp-post">
      {/* Base */}
      <ellipse cx={0} cy={2} rx={5} ry={2}
        fill="#555" stroke="var(--line-color)" strokeWidth="var(--stroke-width)"
        strokeLinecap="round" strokeLinejoin="round" />
      {/* Pole */}
      <line x1={0} y1={2} x2={0} y2={-30}
        stroke="var(--line-color)" strokeWidth="var(--stroke-width)" strokeLinecap="round" />
      {/* Lamp housing */}
      <polygon
        points="-6,-30 0,-35 6,-30 4,-28 -4,-28"
        fill="#F5E6B8" stroke="var(--line-color)" strokeWidth="1.2"
        strokeLinecap="round" strokeLinejoin="round"
      />
      {/* Light glow */}
      <ellipse cx={0} cy={-28} rx={4} ry={2}
        fill="#F5E6B8" opacity={0.5} />
    </g>
  );
};
