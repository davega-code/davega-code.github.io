import React, { useRef, useEffect, useCallback } from 'react';
import './ZoomTransition.css';

export interface ZoomTransitionProps {
  /** Whether the zoom transition is currently active */
  isActive: boolean;
  /** Direction of the zoom animation */
  direction: 'zoom-in' | 'zoom-out';
  /** Screen coordinates of the target building center */
  targetPosition: { x: number; y: number };
  /** Callback fired when the transition animation completes */
  onComplete: () => void;
  /** When true, skip animation and call onComplete immediately */
  reducedMotion: boolean;
  /** The townsquare scene content to wrap */
  children: React.ReactNode;
}

/**
 * ZoomTransition wraps the townsquare scene container and manages
 * CSS transform animations for zoom-in/out navigation transitions.
 *
 * - zoom-in: scale(1) translate(0,0) → scale(5) translate(-Xpx, -Ypx)
 * - zoom-out: reverse of zoom-in
 * - reducedMotion: skips animation, calls onComplete immediately
 */
export const ZoomTransition: React.FC<ZoomTransitionProps> = ({
  isActive,
  direction,
  targetPosition,
  onComplete,
  reducedMotion,
  children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasCalledComplete = useRef(false);

  // Reset the completion guard when activation state changes
  useEffect(() => {
    if (isActive) {
      hasCalledComplete.current = false;
    }
  }, [isActive, direction]);

  // Handle reduced motion: skip animation, call onComplete immediately
  useEffect(() => {
    if (isActive && reducedMotion && !hasCalledComplete.current) {
      hasCalledComplete.current = true;
      onComplete();
    }
  }, [isActive, reducedMotion, onComplete]);

  const handleTransitionEnd = useCallback(
    (e: React.TransitionEvent<HTMLDivElement>) => {
      // Only respond to transform transitions on this element
      if (
        e.propertyName === 'transform' &&
        e.target === containerRef.current &&
        !hasCalledComplete.current
      ) {
        hasCalledComplete.current = true;
        onComplete();
      }
    },
    [onComplete],
  );

  // Compute the inline transform style
  const getTransformStyle = (): React.CSSProperties => {
    if (!isActive && direction === 'zoom-in') {
      // Default state: no zoom
      return { transform: 'scale(1) translate(0px, 0px)' };
    }

    if (isActive && direction === 'zoom-in') {
      // Zooming in: scale up and translate to center on building
      return {
        transform: `scale(5) translate(${-targetPosition.x}px, ${-targetPosition.y}px)`,
      };
    }

    if (isActive && direction === 'zoom-out') {
      // Start of zoom-out: still at zoomed-in position (will animate to default)
      // This is handled by removing the zoomed class, so we return default
      return { transform: 'scale(1) translate(0px, 0px)' };
    }

    // Default / idle
    return { transform: 'scale(1) translate(0px, 0px)' };
  };

  // Build CSS class names
  const classNames = ['zoom-container'];
  if (isActive && !reducedMotion) {
    classNames.push(
      direction === 'zoom-in'
        ? 'zoom-container--zooming-in'
        : 'zoom-container--zooming-out',
    );
  }

  return (
    <div
      ref={containerRef}
      className={classNames.join(' ')}
      style={reducedMotion ? undefined : getTransformStyle()}
      onTransitionEnd={reducedMotion ? undefined : handleTransitionEnd}
    >
      {children}
    </div>
  );
};
