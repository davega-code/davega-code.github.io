import React, { useState, useEffect } from 'react';
import { IsometricGrid } from './IsometricGrid';
import { BuildingWrapper } from './buildings/BuildingWrapper';
import { TownCenter } from './buildings/TownCenter';
import { Newspaper } from './buildings/Newspaper';
import { ArtGallery } from './buildings/ArtGallery';
import { PostOffice } from './buildings/PostOffice';
import { BUILDINGS } from './buildings/buildingConfigs';
import { ENVIRONMENT_ELEMENTS } from './environment/environmentConfigs';
import { Tree } from './environment/Tree';
import { Bench } from './environment/Bench';
import { LampPost } from './environment/LampPost';
import { Path } from './environment/Path';
import { StickFigureManager } from './animation/StickFigureManager';
import { toIsometric } from '../../utils/isometric';
import { useIsometricViewport } from '../../hooks/useIsometricViewport';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import './TownsquareScene.css';

/** Map building IDs to their SVG illustration components, centering offsets, and label position */
const BUILDING_COMPONENTS: Record<
  string,
  { Component: React.FC; offsetX: number; offsetY: number; labelX: number; labelY: number }
> = {
  'town-center': { Component: TownCenter, offsetX: -60, offsetY: -60, labelX: 60, labelY: 130 },
  newspaper: { Component: Newspaper, offsetX: -50, offsetY: -50, labelX: 50, labelY: 112 },
  'art-gallery': { Component: ArtGallery, offsetX: -55, offsetY: -50, labelX: 55, labelY: 118 },
  'post-office': { Component: PostOffice, offsetX: -45, offsetY: -45, labelX: 45, labelY: 112 },
};

/**
 * Path connections between buildings.
 * Each entry defines a walkway from one building to another.
 */
const PATH_CONNECTIONS: Array<{
  from: { gridX: number; gridY: number };
  to: { gridX: number; gridY: number };
}> = [
  // Town Center ↔ Newspaper
  { from: { gridX: 0, gridY: 0 }, to: { gridX: -5, gridY: -2 } },
  // Town Center ↔ Art Gallery
  { from: { gridX: 0, gridY: 0 }, to: { gridX: 5, gridY: -2 } },
  // Town Center ↔ Post Office
  { from: { gridX: 0, gridY: 0 }, to: { gridX: 0, gridY: -6 } },
  // Newspaper ↔ Post Office
  { from: { gridX: -5, gridY: -2 }, to: { gridX: 0, gridY: -6 } },
  // Art Gallery ↔ Post Office
  { from: { gridX: 5, gridY: -2 }, to: { gridX: 0, gridY: -6 } },
];

/**
 * Determine the number of stick figures based on viewport width (T055).
 * Desktop (1280px+): 10–13, Tablet (768px+): 6–8, Mobile: 4–5.
 */
function useResponsiveFigureCount(): number {
  const [count, setCount] = useState(() => {
    if (typeof window === 'undefined') return 10;
    const w = window.innerWidth;
    if (w >= 1280) return 12;
    if (w >= 768) return 7;
    return 4;
  });

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w >= 1280) setCount(12);
      else if (w >= 768) setCount(7);
      else setCount(4);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return count;
}

export interface TownsquareSceneProps {
  /** Callback when a building is clicked */
  onBuildingClick: (buildingId: string) => void;
  /** Whether a zoom navigation transition is currently active */
  isNavigating?: boolean;
}

/**
 * Main SVG container component for the isometric townsquare scene.
 *
 * Renders all buildings, connecting paths, and environmental elements
 * (trees, benches, lamp posts) in proper depth-sorted order.
 *
 * Integrates d3-zoom for viewport management (zoom, pan, pinch-to-zoom)
 * via the {@link useIsometricViewport} hook.
 */
export const TownsquareScene: React.FC<TownsquareSceneProps> = ({
  onBuildingClick,
  isNavigating = false,
}) => {
  const { reducedMotion } = useReducedMotion();
  const figureCount = useResponsiveFigureCount();
  const {
    viewBox,
    transformString,
    svgRef,
    setEnabled,
    isTouchDevice,
  } = useIsometricViewport(reducedMotion);

  // Disable d3-zoom interactions during navigation transitions
  // so ZoomTransition can control the scene without interference
  React.useEffect(() => {
    setEnabled(!isNavigating);
  }, [isNavigating, setEnabled]);

  // Sort buildings by zIndex for proper depth rendering
  const sortedBuildings = [...BUILDINGS].sort((a, b) => a.zIndex - b.zIndex);

  // Sort environment elements by zIndex
  const sortedEnvironment = [...ENVIRONMENT_ELEMENTS].sort(
    (a, b) => a.zIndex - b.zIndex,
  );

  return (
    <div className="townsquare-scene">
      <svg
        ref={svgRef}
        className="townsquare-scene__svg"
        viewBox={viewBox}
        role="navigation"
        aria-label="Website sections"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Hand-drawn imperfection filter — subtle turbulence displacement */}
        <defs>
          <filter id="hand-drawn" x="-2%" y="-2%" width="104%" height="104%">
            <feTurbulence
              type="turbulence"
              baseFrequency="0.1"
              numOctaves={2}
              seed={42}
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={0.1}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
        {/* Inner <g> controlled by d3-zoom — receives transform for pan/zoom */}
        <g
          className="townsquare-scene__zoom-group"
          transform={transformString}
          filter="url(#hand-drawn)"
        >
        <IsometricGrid>
          {/* ── Paths (rendered first, behind everything) ── */}
          {PATH_CONNECTIONS.map((conn, i) => (
            <Path key={`path-${i}`} from={conn.from} to={conn.to} />
          ))}

          {/* ── Environment elements (trees, benches, lamps) ── */}
          {sortedEnvironment.map((elem) => {
            switch (elem.type) {
              case 'tree':
                return <Tree key={elem.id} position={elem.position} />;
              case 'bench':
                return <Bench key={elem.id} position={elem.position} />;
              case 'lamp-post':
                return <LampPost key={elem.id} position={elem.position} />;
              default:
                return null;
            }
          })}

          {/* ── Stick figures (after environment, before buildings) ── */}
          <StickFigureManager
            reducedMotion={reducedMotion}
            isVisible={!isNavigating}
            figureCount={figureCount}
          />

          {/* ── Buildings (depth-sorted, rendered last / on top) ── */}
          {sortedBuildings.map((config) => {
            const entry = BUILDING_COMPONENTS[config.id];
            if (!entry) return null;

            const { Component, offsetX, offsetY, labelX, labelY } = entry;
            const { screenX, screenY } = toIsometric(
              config.position.gridX,
              config.position.gridY,
            );

            return (
              <g
                key={config.id}
                transform={`translate(${screenX + offsetX}, ${screenY + offsetY})`}
              >
                <BuildingWrapper
                  config={config}
                  onClick={onBuildingClick}
                  isTouchDevice={isTouchDevice}
                >
                  <Component />
                </BuildingWrapper>
                {/* Building name label at bottom-front corner */}
                <text
                  x={labelX}
                  y={labelY}
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="600"
                  fontFamily="Georgia, serif"
                  fill="var(--line-color)"
                  opacity={0.8}
                  style={{ pointerEvents: 'none' }}
                >
                  {config.name}
                </text>
              </g>
            );
          })}
        </IsometricGrid>
        </g>
      </svg>
    </div>
  );
};
