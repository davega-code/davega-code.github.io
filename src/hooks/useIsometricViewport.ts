import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { zoom as d3Zoom, zoomIdentity, ZoomBehavior, ZoomTransform } from 'd3-zoom';
import { select, Selection } from 'd3-selection';
import type { ViewportState } from '../types';

/* ── Scene viewBox constants ── */

/** Base viewBox dimensions for the isometric scene (desktop) */
const BASE_VIEWBOX = { minX: -620, minY: -340, width: 1240, height: 680 };

/** Breakpoint below which we use the mobile-optimized viewBox */
const MOBILE_BREAKPOINT = 480;

/** Breakpoint below which we use the tablet-optimized viewBox */
const TABLET_BREAKPOINT = 768;

/** Zoom scale constraints — d3-zoom scaleExtent */
const MIN_ZOOM = 0.5;
const MAX_ZOOM = 2.0;

/**
 * Compute a responsive viewBox string based on window dimensions.
 *
 * - **Mobile portrait** (≤480px): wider viewBox so all buildings are visible
 *   without horizontal clipping.
 * - **Tablet** (≤768px): slightly wider viewBox for comfortable spacing.
 * - **Desktop** (>768px): standard viewBox.
 */
export function computeViewBox(windowWidth: number, windowHeight: number): string {
  const aspect = windowWidth / windowHeight;

  if (windowWidth <= MOBILE_BREAKPOINT) {
    // Mobile: widen the viewBox to prevent buildings from being cut off
    const mobileWidth = BASE_VIEWBOX.width * 1.3;
    const mobileHeight = mobileWidth / aspect;
    const minX = BASE_VIEWBOX.minX - (mobileWidth - BASE_VIEWBOX.width) / 2;
    const minY = BASE_VIEWBOX.minY - (mobileHeight - BASE_VIEWBOX.height) / 2;
    return `${minX} ${minY} ${mobileWidth} ${mobileHeight}`;
  }

  if (windowWidth <= TABLET_BREAKPOINT) {
    // Tablet: slightly wider viewBox
    const tabletWidth = BASE_VIEWBOX.width * 1.1;
    const tabletHeight = tabletWidth / aspect;
    const minX = BASE_VIEWBOX.minX - (tabletWidth - BASE_VIEWBOX.width) / 2;
    const minY = BASE_VIEWBOX.minY - (tabletHeight - BASE_VIEWBOX.height) / 2;
    return `${minX} ${minY} ${tabletWidth} ${tabletHeight}`;
  }

  // Desktop: fit viewBox to the window aspect ratio
  let vbWidth = BASE_VIEWBOX.width;
  let vbHeight = BASE_VIEWBOX.height;
  const baseAspect = vbWidth / vbHeight;

  if (aspect > baseAspect) {
    // Window is wider than scene — expand width
    vbWidth = vbHeight * aspect;
  } else {
    // Window is taller than scene — expand height
    vbHeight = vbWidth / aspect;
  }

  const minX = BASE_VIEWBOX.minX - (vbWidth - BASE_VIEWBOX.width) / 2;
  const minY = BASE_VIEWBOX.minY - (vbHeight - BASE_VIEWBOX.height) / 2;
  return `${minX} ${minY} ${vbWidth} ${vbHeight}`;
}

/** Return value from the useIsometricViewport hook */
export interface UseIsometricViewportReturn {
  /** Current viewport state (zoom, panX, panY, transition info) */
  viewport: ViewportState;
  /** Computed SVG viewBox string, responsive to window size */
  viewBox: string;
  /** CSS transform string for the inner <g> container (from d3-zoom) */
  transformString: string;
  /** Ref to attach to the outer <svg> element */
  svgRef: React.RefObject<SVGSVGElement | null>;
  /** Programmatically reset viewport to identity (zoom=1, pan=0,0) */
  resetViewport: () => void;
  /** Enable or disable d3-zoom interactions (disable during nav transitions) */
  setEnabled: (enabled: boolean) => void;
  /** Whether the device supports touch */
  isTouchDevice: boolean;
}

/**
 * Hook for managing the isometric viewport with d3-zoom.
 *
 * Provides:
 * - Pinch-to-zoom on touch devices (d3-zoom native — T042)
 * - Pan/drag on touch and mouse (d3-zoom native — T043)
 * - Mouse wheel zoom toward cursor (d3-zoom native — T044)
 * - Responsive SVG viewBox based on window size (T045)
 * - Window resize handling (T047)
 * - Ability to disable zoom during navigation transitions (T047)
 * - Reduced motion support — disables smooth zoom animations
 *
 * @param reducedMotion Whether the user prefers reduced motion
 */
export function useIsometricViewport(
  reducedMotion = false,
): UseIsometricViewportReturn {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const zoomBehaviorRef = useRef<ZoomBehavior<SVGSVGElement, unknown> | null>(null);
  const enabledRef = useRef(true);

  // Viewport state synced from d3-zoom events
  const [viewport, setViewport] = useState<ViewportState>({
    zoom: 1.0,
    panX: 0,
    panY: 0,
    isTransitioning: false,
    transitionTarget: null,
  });

  // Transform string for the inner <g> element
  const [transformString, setTransformString] = useState('translate(0,0) scale(1)');

  // Window dimensions for responsive viewBox
  const [windowSize, setWindowSize] = useState(() => ({
    width: typeof window !== 'undefined' ? window.innerWidth : 1280,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
  }));

  // Detect touch device
  const isTouchDevice = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  }, []);

  // Compute responsive viewBox
  const viewBox = useMemo(
    () => computeViewBox(windowSize.width, windowSize.height),
    [windowSize.width, windowSize.height],
  );

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Initialize d3-zoom behavior
  useEffect(() => {
    const svgElement = svgRef.current;
    if (!svgElement) return;

    const svgSelection = select(svgElement) as Selection<SVGSVGElement, unknown, null, undefined>;

    // Compute translate extent based on the scene bounds
    // Allow panning up to 50% beyond the scene edges
    const padding = 400;
    const translateExtent: [[number, number], [number, number]] = [
      [BASE_VIEWBOX.minX - padding, BASE_VIEWBOX.minY - padding],
      [
        BASE_VIEWBOX.minX + BASE_VIEWBOX.width + padding,
        BASE_VIEWBOX.minY + BASE_VIEWBOX.height + padding,
      ],
    ];

    const zoomBehavior = d3Zoom<SVGSVGElement, unknown>()
      .scaleExtent([MIN_ZOOM, MAX_ZOOM])
      .translateExtent(translateExtent)
      .filter((event: Event) => {
        // Don't intercept if zoom is disabled (e.g., during nav transitions)
        if (!enabledRef.current) return false;

        // Allow wheel events and touch events
        // Block right-click drag
        if ('button' in event && (event as MouseEvent).button === 2) return false;

        return true;
      })
      .on('zoom', (event) => {
        const t: ZoomTransform = event.transform;

        // Update the transform string for the inner <g>
        setTransformString(t.toString());

        // Sync to React state
        setViewport((prev) => ({
          ...prev,
          zoom: t.k,
          panX: t.x,
          panY: t.y,
        }));
      });

    // If reduced motion is preferred, disable smooth zoom transitions
    // by setting the zoom duration to 0
    if (reducedMotion) {
      zoomBehavior.duration(0);
    }

    // Attach the zoom behavior to the SVG element
    svgSelection.call(zoomBehavior);

    // Prevent default touch behavior on the SVG to avoid browser zoom conflicts
    svgSelection.on('touchstart.preventDefault', (event: Event) => {
      // Only prevent default for multi-touch (pinch) gestures
      if ((event as TouchEvent).touches && (event as TouchEvent).touches.length >= 2) {
        event.preventDefault();
      }
    }, { passive: false } as unknown as boolean);

    // Store ref for programmatic control
    zoomBehaviorRef.current = zoomBehavior;

    // Cleanup
    return () => {
      svgSelection.on('.zoom', null);
      svgSelection.on('touchstart.preventDefault', null);
      zoomBehaviorRef.current = null;
    };
  }, [reducedMotion]);

  /** Programmatically reset viewport to identity transform */
  const resetViewport = useCallback(() => {
    const svgElement = svgRef.current;
    const zoomBehavior = zoomBehaviorRef.current;
    if (!svgElement || !zoomBehavior) return;

    const svgSelection = select(svgElement) as Selection<SVGSVGElement, unknown, null, undefined>;

    // Always use instant reset via d3-zoom's transform call.
    // The <g> element can use a CSS transition for smooth visual feedback
    // when reducedMotion is false (handled in TownsquareScene.css).
    svgSelection.call(zoomBehavior.transform, zoomIdentity);
  }, []);

  /** Enable or disable d3-zoom interactions */
  const setEnabled = useCallback((enabled: boolean) => {
    enabledRef.current = enabled;
  }, []);

  return {
    viewport,
    viewBox,
    transformString,
    svgRef,
    resetViewport,
    setEnabled,
    isTouchDevice,
  };
}
