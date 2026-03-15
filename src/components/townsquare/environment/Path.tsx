import React from 'react';
import type { IsometricPosition } from '../../../types';
import { toIsometric } from '../../../utils/isometric';

export interface PathProps {
  /** Start position on the isometric grid */
  from: IsometricPosition;
  /** End position on the isometric grid */
  to: IsometricPosition;
}

/**
 * SVG `<path>` element drawing a street/walkway between two IsometricPosition points.
 * Uses a dashed, lighter stroke to differentiate from building outlines.
 *
 * Consistent stroke style: var(--line-color), strokeLinecap="round"
 * for hand-drawn feel. Dashed pattern for path differentiation.
 */
export const Path: React.FC<PathProps> = ({ from, to }) => {
  const start = toIsometric(from.gridX, from.gridY);
  const end = toIsometric(to.gridX, to.gridY);

  const d = `M ${start.screenX} ${start.screenY} L ${end.screenX} ${end.screenY}`;

  return (
    <path
      d={d}
      stroke="var(--line-color)"
      strokeWidth="4"
      strokeLinecap="round"
      strokeDasharray="8 4"
      fill="none"
      opacity={0.25}
      data-testid="env-path"
    />
  );
};
