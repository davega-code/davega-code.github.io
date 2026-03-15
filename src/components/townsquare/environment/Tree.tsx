import React from 'react';
import type { IsometricPosition } from '../../../types';
import { toIsometric } from '../../../utils/isometric';

export interface TreeProps {
  position: IsometricPosition;
}

/**
 * Isometric line-art tree (~20×30px).
 * Positioned via `toIsometric()` from grid coordinates.
 *
 * Consistent stroke style: var(--line-color), var(--stroke-width),
 * strokeLinecap="round", strokeLinejoin="round" for hand-drawn feel.
 */
export const Tree: React.FC<TreeProps> = ({ position }) => {
  const { screenX, screenY } = toIsometric(position.gridX, position.gridY);

  return (
    <g transform={`translate(${screenX}, ${screenY})`} data-testid="env-tree">
      {/* Trunk */}
      <rect x={-2} y={-5} width={4} height={14} rx={1}
        fill="#8B6F47" stroke="var(--line-color)" strokeWidth="var(--stroke-width)"
        strokeLinecap="round" strokeLinejoin="round" />
      {/* Foliage layers */}
      <ellipse cx={0} cy={-14} rx={10} ry={8}
        fill="#6B8E5A" stroke="var(--line-color)" strokeWidth="var(--stroke-width)"
        strokeLinecap="round" strokeLinejoin="round" />
      <ellipse cx={0} cy={-20} rx={7} ry={6}
        fill="#7DA06A" stroke="var(--line-color)" strokeWidth="var(--stroke-width)"
        strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
};
