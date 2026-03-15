import React, { useMemo } from 'react';
import { StickFigure } from './StickFigure';
import { useStickFigures } from '../../../hooks/useStickFigures';

export interface StickFigureManagerProps {
  /** Whether the user prefers reduced motion */
  reducedMotion: boolean;
  /** Whether the townsquare scene is currently visible */
  isVisible: boolean;
  /** Number of active figures (adjusted by viewport size) */
  figureCount?: number;
}

/**
 * Manages and renders multiple stick figures in the townsquare scene.
 *
 * Uses the {@link useStickFigures} hook to get current figure states,
 * then renders each as a `<StickFigure>` component sorted by Y position
 * for correct isometric depth ordering.
 */
export const StickFigureManager: React.FC<StickFigureManagerProps> = ({
  reducedMotion,
  isVisible,
  figureCount = 6,
}) => {
  const figures = useStickFigures(reducedMotion, isVisible, figureCount);

  // Sort figures by gridY (ascending) for correct depth ordering
  // In isometric view, higher gridY values are "closer" to the viewer
  const sortedFigures = useMemo(
    () => [...figures].sort((a, b) => a.gridY - b.gridY),
    [figures],
  );

  if (sortedFigures.length === 0) return null;

  return (
    <g className="stick-figures" aria-hidden="true">
      {sortedFigures.map((figure) => (
        <StickFigure
          key={figure.id}
          position={{ gridX: figure.gridX, gridY: figure.gridY }}
          behavior={figure.behavior}
          walkPhase={figure.walkPhase}
          facingLeft={figure.facingLeft}
        />
      ))}
    </g>
  );
};
