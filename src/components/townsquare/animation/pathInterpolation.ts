import type { IsometricPosition, WalkPath } from '../../../types';

/**
 * Calculate the Euclidean distance between two grid positions.
 */
export function getPathSegmentLength(
  p1: IsometricPosition,
  p2: IsometricPosition,
): number {
  const dx = p2.gridX - p1.gridX;
  const dy = p2.gridY - p1.gridY;
  return Math.sqrt(dx * dx + dy * dy);
}

/**
 * Calculate the total length of a walk path (sum of all segment lengths).
 */
export function getTotalPathLength(path: WalkPath): number {
  let total = 0;
  for (let i = 0; i < path.waypoints.length - 1; i++) {
    total += getPathSegmentLength(path.waypoints[i], path.waypoints[i + 1]);
  }
  return total;
}

/**
 * Interpolate a position along a walk path at a given progress (0.0–1.0).
 *
 * Progress is mapped proportionally to segment lengths so that movement
 * speed appears constant regardless of segment length.
 */
export function interpolatePath(
  path: WalkPath,
  progress: number,
): IsometricPosition {
  const waypoints = path.waypoints;
  if (waypoints.length === 0) {
    return { gridX: 0, gridY: 0 };
  }
  if (waypoints.length === 1) {
    return { ...waypoints[0] };
  }

  // Clamp progress
  const clampedProgress = Math.max(0, Math.min(1, progress));

  // Calculate cumulative distances
  const totalLength = getTotalPathLength(path);
  if (totalLength === 0) {
    return { ...waypoints[0] };
  }

  const targetDist = clampedProgress * totalLength;
  let accumulated = 0;

  for (let i = 0; i < waypoints.length - 1; i++) {
    const segLen = getPathSegmentLength(waypoints[i], waypoints[i + 1]);
    if (accumulated + segLen >= targetDist) {
      // Interpolate within this segment
      const segProgress = segLen > 0 ? (targetDist - accumulated) / segLen : 0;
      return {
        gridX: waypoints[i].gridX + (waypoints[i + 1].gridX - waypoints[i].gridX) * segProgress,
        gridY: waypoints[i].gridY + (waypoints[i + 1].gridY - waypoints[i].gridY) * segProgress,
      };
    }
    accumulated += segLen;
  }

  // At the end of the path
  return { ...waypoints[waypoints.length - 1] };
}

/**
 * Advance progress along a path based on speed and elapsed time.
 *
 * @param currentProgress - Current progress (0.0–1.0)
 * @param speed - Speed multiplier (1.0 = base speed)
 * @param deltaTime - Elapsed time in milliseconds
 * @param path - The walk path
 * @returns New progress value, handling loop wrapping or clamping
 */
export function advanceAlongPath(
  currentProgress: number,
  speed: number,
  deltaTime: number,
  path: WalkPath,
  direction: 1 | -1,
): { progress: number; direction: 1 | -1 } {
  const totalLength = getTotalPathLength(path);
  if (totalLength === 0) {
    return { progress: currentProgress, direction };
  }

  // Base speed: traverse the full path in ~8 seconds
  const BASE_SPEED = 1 / 8000;
  const progressDelta = speed * BASE_SPEED * deltaTime * direction;
  let newProgress = currentProgress + progressDelta;
  let newDirection = direction;

  if (path.loop) {
    // Wrap around for looping paths
    if (newProgress > 1) newProgress -= 1;
    if (newProgress < 0) newProgress += 1;
  } else {
    // Bounce at endpoints for non-looping paths
    if (newProgress >= 1) {
      newProgress = 1;
      newDirection = -1;
    } else if (newProgress <= 0) {
      newProgress = 0;
      newDirection = 1;
    }
  }

  return { progress: newProgress, direction: newDirection };
}

/**
 * Determine the movement direction at a given progress point.
 * Returns true if the figure is moving leftward in screen space.
 */
export function isMovingLeft(
  path: WalkPath,
  progress: number,
  direction: 1 | -1,
): boolean {
  const epsilon = 0.001;
  const p1 = interpolatePath(path, progress);
  const p2 = interpolatePath(
    path,
    Math.max(0, Math.min(1, progress + epsilon * direction)),
  );
  // In isometric: screenX = (gridX - gridY) * tileWidth/2
  // So moving left means (gridX - gridY) is decreasing
  const dx = (p2.gridX - p2.gridY) - (p1.gridX - p1.gridY);
  return dx < 0;
}

/**
 * Check if a figure's current position is near an interaction point.
 * Returns the interaction point index if within threshold, or -1.
 */
export function findNearbyInteractionPoint(
  path: WalkPath,
  gridX: number,
  gridY: number,
  threshold: number = 0.3,
): number {
  for (let i = 0; i < path.interactionPoints.length; i++) {
    const ip = path.interactionPoints[i];
    const dx = ip.position.gridX - gridX;
    const dy = ip.position.gridY - gridY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < threshold) {
      return i;
    }
  }
  return -1;
}
