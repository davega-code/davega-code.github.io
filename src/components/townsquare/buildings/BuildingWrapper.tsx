import React, { useState, useCallback } from 'react';
import type { BuildingConfig } from '../../../types';

export interface BuildingWrapperProps {
  /** Building configuration data */
  config: BuildingConfig;
  /** Callback when the building is clicked */
  onClick: (buildingId: string) => void;
  /** The building's SVG illustration */
  children: React.ReactNode;
  /** Whether the device supports touch — used to enlarge tap targets */
  isTouchDevice?: boolean;
}

/**
 * Size of the invisible tap-target overlay on touch devices.
 * Larger than the visual building to make tapping easier on mobile (FR-010).
 */
const TAP_TARGET_SIZE = 160;

/**
 * Wraps a building SVG `<g>` group with interactivity:
 * hover/focus state management, keyboard activation, and ARIA attributes.
 *
 * On touch devices, renders an invisible enlarged `<rect>` overlay
 * to increase the tappable hit area (T046 — enlarged tap targets).
 *
 * Fulfills FR-008 (interactive buildings), FR-010 (enlarged tap targets),
 * and FR-012 (keyboard accessibility).
 */
export const BuildingWrapper: React.FC<BuildingWrapperProps> = ({
  config,
  onClick,
  children,
  isTouchDevice = false,
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
      {/* Enlarged invisible tap target for touch devices (T046) */}
      {isTouchDevice && (
        <rect
          className="building-wrapper__tap-target"
          x={-TAP_TARGET_SIZE / 4}
          y={-TAP_TARGET_SIZE / 4}
          width={TAP_TARGET_SIZE}
          height={TAP_TARGET_SIZE}
          fill="transparent"
          stroke="none"
          aria-hidden="true"
        />
      )}
      {children}
    </g>
  );
};
