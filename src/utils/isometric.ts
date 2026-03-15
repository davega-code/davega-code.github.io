import type { BuildingConfig, IsometricPosition } from '../types';

/**
 * Standard isometric tile dimensions.
 * TILE_WIDTH is the horizontal span of one grid cell in screen pixels.
 * TILE_HEIGHT is the vertical span (typically half of width for 2:1 isometric).
 */
export const TILE_WIDTH = 120;
export const TILE_HEIGHT = 60;

/**
 * Convert 2D grid coordinates to isometric screen coordinates.
 *
 * Uses the standard isometric projection:
 *   screenX = (gridX - gridY) * (TILE_WIDTH / 2)
 *   screenY = (gridX + gridY) * (TILE_HEIGHT / 2)
 */
export function toIsometric(
  gridX: number,
  gridY: number,
): { screenX: number; screenY: number } {
  return {
    screenX: (gridX - gridY) * (TILE_WIDTH / 2),
    screenY: (gridX + gridY) * (TILE_HEIGHT / 2),
  };
}

/**
 * Convert isometric screen coordinates back to 2D grid coordinates.
 *
 * Inverse of {@link toIsometric}:
 *   gridX = (screenX / (TILE_WIDTH/2) + screenY / (TILE_HEIGHT/2)) / 2
 *   gridY = (screenY / (TILE_HEIGHT/2) - screenX / (TILE_WIDTH/2)) / 2
 */
export function fromIsometric(
  screenX: number,
  screenY: number,
): IsometricPosition {
  const gridX =
    (screenX / (TILE_WIDTH / 2) + screenY / (TILE_HEIGHT / 2)) / 2;
  const gridY =
    (screenY / (TILE_HEIGHT / 2) - screenX / (TILE_WIDTH / 2)) / 2;
  return { gridX, gridY };
}

/**
 * Return the screen-space center point for a building, based on its grid position.
 * Useful for computing zoom-transition targets.
 */
export function getBuildingCenter(
  config: BuildingConfig,
): { x: number; y: number } {
  const { screenX, screenY } = toIsometric(
    config.position.gridX,
    config.position.gridY,
  );
  return { x: screenX, y: screenY };
}
