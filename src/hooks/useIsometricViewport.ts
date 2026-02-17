import type { ViewportState } from '../types';

/**
 * Hook for managing the isometric viewport (zoom, pan, resize).
 * Stub — returns default viewport state.
 */
export function useIsometricViewport(): ViewportState {
  return {
    zoom: 1.0,
    panX: 0,
    panY: 0,
    isTransitioning: false,
    transitionTarget: null,
  };
}
