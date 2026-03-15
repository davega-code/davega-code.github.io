import type { EnvironmentElement } from '../../../types';

/**
 * Decorative (non-interactive) environment elements placed along the streets
 * connecting the four buildings.
 *
 * Positions adjusted for wider building spacing:
 *   Town Center (0,0) ↔ Newspaper (-5,-2)
 *   Town Center (0,0) ↔ Art Gallery (5,-2)
 *   Town Center (0,0) ↔ Post Office (0,-6)
 *   Newspaper (-5,-2) ↔ Post Office (0,-6)
 *   Art Gallery (5,-2) ↔ Post Office (0,-6)
 */
export const ENVIRONMENT_ELEMENTS: EnvironmentElement[] = [
  // --- Trees along Town Center → Newspaper path ---
  { id: 'tree-1', type: 'tree', position: { gridX: -1.5, gridY: -0.5 }, zIndex: 5 },
  { id: 'tree-2', type: 'tree', position: { gridX: -3, gridY: -1.2 }, zIndex: 5 },

  // --- Trees along Town Center → Art Gallery path ---
  { id: 'tree-3', type: 'tree', position: { gridX: 1.5, gridY: -0.5 }, zIndex: 5 },
  { id: 'tree-4', type: 'tree', position: { gridX: 3, gridY: -1.2 }, zIndex: 5 },

  // --- Trees along Town Center → Post Office path ---
  { id: 'tree-5', type: 'tree', position: { gridX: 0.6, gridY: -2.5 }, zIndex: 5 },
  { id: 'tree-6', type: 'tree', position: { gridX: -0.6, gridY: -4 }, zIndex: 5 },

  // --- Benches ---
  { id: 'bench-1', type: 'bench', position: { gridX: -2.2, gridY: -1 }, zIndex: 4 },
  { id: 'bench-2', type: 'bench', position: { gridX: 2.2, gridY: -1 }, zIndex: 4 },
  { id: 'bench-3', type: 'bench', position: { gridX: 0, gridY: -3.2 }, zIndex: 4 },

  // --- Lamp posts ---
  { id: 'lamp-1', type: 'lamp-post', position: { gridX: -4, gridY: -1.8 }, zIndex: 6 },
  { id: 'lamp-2', type: 'lamp-post', position: { gridX: 4, gridY: -1.8 }, zIndex: 6 },
  { id: 'lamp-3', type: 'lamp-post', position: { gridX: 0, gridY: -1.8 }, zIndex: 6 },

  // --- Extra trees near Newspaper ↔ Post Office path ---
  { id: 'tree-7', type: 'tree', position: { gridX: -3, gridY: -4 }, zIndex: 5 },
  { id: 'tree-8', type: 'tree', position: { gridX: 3, gridY: -4 }, zIndex: 5 },

  // --- Extra lamp post near Post Office ---
  { id: 'lamp-4', type: 'lamp-post', position: { gridX: -1, gridY: -5.5 }, zIndex: 6 },
];
