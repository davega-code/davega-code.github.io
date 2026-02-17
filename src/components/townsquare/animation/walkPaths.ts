import type { WalkPath } from '../../../types';

/**
 * Predefined walk paths that stick figures follow through the townsquare.
 *
 * Each path connects buildings via streets with waypoints and interaction
 * points (benches to sit on, building entrances to enter/exit).
 *
 * Building positions for reference:
 *   Town Center  (0, 0)
 *   Newspaper    (-3, -2)
 *   Art Gallery  (3, -2)
 *   Post Office  (0, -4)
 */
export const WALK_PATHS: WalkPath[] = [
  {
    id: 'main-street',
    waypoints: [
      { gridX: -3, gridY: -2 },   // Newspaper
      { gridX: -2, gridY: -1.2 },
      { gridX: -1, gridY: -0.5 },
      { gridX: 0, gridY: 0 },     // Town Center
      { gridX: 1, gridY: -0.5 },
      { gridX: 2, gridY: -1.2 },
      { gridX: 3, gridY: -2 },    // Art Gallery
    ],
    loop: false,
    interactionPoints: [
      {
        position: { gridX: -3, gridY: -2 },
        type: 'building-entrance',
        buildingId: 'newspaper',
        duration: 3000,
      },
      {
        position: { gridX: -1.5, gridY: -1 },
        type: 'bench',
        buildingId: null,
        duration: 5000,
      },
      {
        position: { gridX: 0, gridY: 0 },
        type: 'building-entrance',
        buildingId: 'town-center',
        duration: 3000,
      },
      {
        position: { gridX: 1.5, gridY: -1 },
        type: 'bench',
        buildingId: null,
        duration: 5000,
      },
      {
        position: { gridX: 3, gridY: -2 },
        type: 'building-entrance',
        buildingId: 'art-gallery',
        duration: 3000,
      },
    ],
  },
  {
    id: 'north-avenue',
    waypoints: [
      { gridX: 0, gridY: 0 },     // Town Center
      { gridX: 0, gridY: -1 },
      { gridX: 0, gridY: -2 },
      { gridX: 0, gridY: -3 },
      { gridX: 0, gridY: -4 },    // Post Office
    ],
    loop: false,
    interactionPoints: [
      {
        position: { gridX: 0, gridY: 0 },
        type: 'building-entrance',
        buildingId: 'town-center',
        duration: 3000,
      },
      {
        position: { gridX: 0, gridY: -2.5 },
        type: 'bench',
        buildingId: null,
        duration: 4000,
      },
      {
        position: { gridX: 0, gridY: -4 },
        type: 'building-entrance',
        buildingId: 'post-office',
        duration: 3000,
      },
    ],
  },
  {
    id: 'park-loop',
    waypoints: [
      { gridX: 0, gridY: 0 },     // Town Center
      { gridX: -1, gridY: -0.5 },
      { gridX: -2, gridY: -1.2 },
      { gridX: -3, gridY: -2 },   // Newspaper
      { gridX: -2, gridY: -3 },
      { gridX: 0, gridY: -4 },    // Post Office
      { gridX: 2, gridY: -3 },
      { gridX: 3, gridY: -2 },    // Art Gallery
      { gridX: 2, gridY: -1.2 },
      { gridX: 1, gridY: -0.5 },
      { gridX: 0, gridY: 0 },     // back to Town Center
    ],
    loop: true,
    interactionPoints: [
      {
        position: { gridX: -3, gridY: -2 },
        type: 'building-entrance',
        buildingId: 'newspaper',
        duration: 2000,
      },
      {
        position: { gridX: 0, gridY: -4 },
        type: 'building-entrance',
        buildingId: 'post-office',
        duration: 2000,
      },
      {
        position: { gridX: 3, gridY: -2 },
        type: 'building-entrance',
        buildingId: 'art-gallery',
        duration: 2000,
      },
      {
        position: { gridX: -1.5, gridY: -1 },
        type: 'pause',
        buildingId: null,
        duration: 1500,
      },
    ],
  },
  {
    id: 'side-street',
    waypoints: [
      { gridX: -3, gridY: -2 },   // Newspaper
      { gridX: -2, gridY: -3 },
      { gridX: 0, gridY: -4 },    // Post Office
      { gridX: 2, gridY: -3 },
      { gridX: 3, gridY: -2 },    // Art Gallery
    ],
    loop: false,
    interactionPoints: [
      {
        position: { gridX: -3, gridY: -2 },
        type: 'building-entrance',
        buildingId: 'newspaper',
        duration: 2500,
      },
      {
        position: { gridX: 0, gridY: -4 },
        type: 'building-entrance',
        buildingId: 'post-office',
        duration: 2500,
      },
      {
        position: { gridX: 3, gridY: -2 },
        type: 'building-entrance',
        buildingId: 'art-gallery',
        duration: 2500,
      },
    ],
  },
];
