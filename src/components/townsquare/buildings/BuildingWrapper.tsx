import React, { useState, useCallback } from 'react';
import type { BuildingConfig } from '../../../types';

export interface BuildingWrapperProps {
  /** Building configuration data */
  config: BuildingConfig;
  /** Callback when the building is clicked */
  onClick: (buildingId: string) => void;
  /** The building's SVG illustration */
  children: React.ReactNode;
}

/**
 * Wraps a building SVG `<g>` group with interactivity:
 * hover/focus state management, keyboard activation, and ARIA attributes.
 *
 * Fulfills FR-008 (interactive buildings) and FR-012 (keyboard accessibility).
 */
export const BuildingWrapper: React.FC<BuildingWrapperProps> = ({
  config,
  onClick,
  children,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = useCallback(() => {
    onClick(config.id);
  }, [onClick, config.id]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onClick(config.id);
      }
    },
    [onClick, config.id],
  );

  const fillColor = isHovered ? config.accentColorHover : config.accentColor;

  return (
    <g
      role="button"
      aria-label={config.ariaLabel}
      tabIndex={0}
      className={`building-wrapper building-wrapper--${config.id}`}
      style={{ cursor: 'pointer' }}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => {}}
      onBlur={() => {}}
      data-building-id={config.id}
      data-hovered={isHovered}
      fill={fillColor}
    >
      {children}
    </g>
  );
};
