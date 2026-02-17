/**
 * Shared TypeScript types for the Townsquare City Layout.
 * Derived from specs/001-townsquare-revamp/data-model.md
 */

/** Position on the isometric grid */
export interface IsometricPosition {
  /** X position on the isometric grid */
  gridX: number;
  /** Y position on the isometric grid */
  gridY: number;
}

/** Stick figure behavior state */
export type FigureBehavior =
  | 'walking'
  | 'sitting'
  | 'entering-building'
  | 'exiting-building'
  | 'idle';

/** Interactive building in the townsquare that navigates to a website section */
export interface BuildingConfig {
  /** Unique identifier (e.g., 'town-center', 'newspaper') */
  id: string;
  /** Display name shown on hover/focus (e.g., 'Town Center') */
  name: string;
  /** React Router path to navigate to (e.g., '/about', '/blog') */
  route: string;
  /** Position on the isometric grid */
  position: IsometricPosition;
  /** Unique color fill/accent for identification */
  accentColor: string;
  /** Intensified accent color for hover state */
  accentColorHover: string;
  /** Accessibility label (e.g., 'Newspaper - Navigate to Blog') */
  ariaLabel: string;
  /** Rendering order for isometric depth sorting */
  zIndex: number;
}

/** Configuration for an animated stick figure character */
export interface StickFigureConfig {
  /** Unique identifier (e.g., 'figure-1') */
  id: string;
  /** Reference to the WalkPath this figure follows */
  pathId: string;
  /** Movement speed multiplier (1.0 = normal) */
  speed: number;
  /** Starting position along the path (0.0 to 1.0) */
  startOffset: number;
  /** Current behavior type */
  behavior: FigureBehavior;
}

/** A predefined route that stick figures follow through the townsquare */
export interface WalkPath {
  /** Unique identifier (e.g., 'main-street', 'park-loop') */
  id: string;
  /** Ordered array of positions defining the path */
  waypoints: IsometricPosition[];
  /** Whether the path loops back to the start */
  loop: boolean;
  /** Points where figures can pause/interact */
  interactionPoints: InteractionPoint[];
}

/** A point along a walk path where a stick figure can perform an action */
export interface InteractionPoint {
  /** Location on the isometric grid */
  position: IsometricPosition;
  /** Type of interaction */
  type: 'bench' | 'building-entrance' | 'pause';
  /** Associated building (for building-entrance type) */
  buildingId: string | null;
  /** How long the figure pauses here (milliseconds) */
  duration: number;
}

/** A decorative non-interactive element in the scene */
export interface EnvironmentElement {
  /** Unique identifier */
  id: string;
  /** Element type */
  type: 'tree' | 'bench' | 'lamp-post';
  /** Position on the isometric grid */
  position: IsometricPosition;
  /** Rendering order for isometric depth sorting */
  zIndex: number;
}

/** Runtime state for the scene viewport (zoom, pan) */
export interface ViewportState {
  /** Current zoom level (1.0 = default, range: 1.0–3.0) */
  zoom: number;
  /** Horizontal pan offset in pixels */
  panX: number;
  /** Vertical pan offset in pixels */
  panY: number;
  /** Whether a zoom-in/out navigation transition is active */
  isTransitioning: boolean;
  /** Building ID being zoomed into (null if not transitioning) */
  transitionTarget: string | null;
}
