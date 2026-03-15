import React from 'react';
import type { IsometricPosition } from '../../types';
import { toIsometric } from '../../utils/isometric';

/**
 * Convert an {@link IsometricPosition} to screen-space pixel coordinates
 * using the shared isometric projection utilities.
 */
export function gridToPixel(pos: IsometricPosition): {
  x: number;
  y: number;
} {
  const { screenX, screenY } = toIsometric(pos.gridX, pos.gridY);
  return { x: screenX, y: screenY };
}

export interface IsometricGridProps {
  /** Scene elements to render inside the isometric coordinate system */
  children: React.ReactNode;
}

/**
 * SVG `<g>` group that establishes the isometric coordinate system.
 *
 * All child elements are positioned relative to the center of the
 * SVG viewport so that grid coordinate (0, 0) maps to the visual center.
 */
export const IsometricGrid: React.FC<IsometricGridProps> = ({ children }) => {
  return (
    <g data-testid="isometric-grid" className="isometric-grid">
      {children}
    </g>
  );
};
