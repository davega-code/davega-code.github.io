import React, { useState, useCallback, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import {
  AboutSection,
  BlogSection,
  PhotographySection,
  ContactSection,
} from './components/sections';
import { TownsquareScene } from './components/townsquare';
import { ZoomTransition } from './components/transitions';
import { useReducedMotion } from './hooks/useReducedMotion';
import { getBuildingCenter } from './utils/isometric';
import { BUILDINGS } from './components/townsquare/buildings/buildingConfigs';
import './App.css';

/**
 * Inner app component that uses React Router hooks (must be inside <Router>).
 * Manages the zoom transition state and navigation orchestration.
 */
const AppContent: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { reducedMotion } = useReducedMotion();

  // Zoom transition state
  const [zoomActive, setZoomActive] = useState(false);
  const [zoomDirection, setZoomDirection] = useState<'zoom-in' | 'zoom-out'>('zoom-in');
  const [targetPosition, setTargetPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [sceneHidden, setSceneHidden] = useState(false);

  // Track the last-visited building for zoom-out on back navigation
  const lastBuildingIdRef = useRef<string | null>(null);
  // Track the route to navigate to after zoom-in completes
  const pendingRouteRef = useRef<string | null>(null);

  // Whether we're on a section page (not the townsquare root)
  const isOnSection = location.pathname !== '/';

  /**
   * Handle building click: start zoom-in animation toward the clicked building.
   */
  const handleBuildingClick = useCallback(
    (buildingId: string) => {
      const building = BUILDINGS.find((b) => b.id === buildingId);
      if (!building) return;

      const center = getBuildingCenter(building);
      lastBuildingIdRef.current = buildingId;
      pendingRouteRef.current = building.route;

      if (reducedMotion) {
        // Skip animation: navigate instantly
        setSceneHidden(true);
        navigate(building.route);
        return;
      }

      // Start zoom-in animation
      setTargetPosition(center);
      setZoomDirection('zoom-in');
      setZoomActive(true);
    },
    [navigate, reducedMotion],
  );

  /**
   * Called when zoom-in animation completes: navigate to the section route
   * and hide the townsquare scene.
   */
  const handleZoomInComplete = useCallback(() => {
    if (pendingRouteRef.current) {
      setSceneHidden(true);
      navigate(pendingRouteRef.current);
      pendingRouteRef.current = null;
      setZoomActive(false);
    }
  }, [navigate]);

  /**
   * Called when zoom-out animation completes: reset viewport to default.
   */
  const handleZoomOutComplete = useCallback(() => {
    setZoomActive(false);
    lastBuildingIdRef.current = null;
  }, []);

  /**
   * Handle "Back to Townsquare" click from any section page.
   * Navigate to `/`, show the townsquare at zoomed-in state, then animate zoom-out.
   */
  const handleBackToTownsquare = useCallback(() => {
    if (reducedMotion) {
      // Skip animation: navigate instantly
      setSceneHidden(false);
      navigate('/');
      return;
    }

    // Compute the target position for the last-visited building
    const lastBuilding = BUILDINGS.find((b) => b.id === lastBuildingIdRef.current);
    if (lastBuilding) {
      const center = getBuildingCenter(lastBuilding);
      setTargetPosition(center);
    }

    // Navigate to root, show scene at zoomed-in state, then animate zoom-out
    navigate('/');
    setSceneHidden(false);

    // Use requestAnimationFrame to ensure the scene is visible before starting zoom-out
    requestAnimationFrame(() => {
      setZoomDirection('zoom-out');
      setZoomActive(true);
    });
  }, [navigate, reducedMotion]);

  /**
   * Dispatch onComplete based on current zoom direction.
   */
  const handleZoomComplete = useCallback(() => {
    if (zoomDirection === 'zoom-in') {
      handleZoomInComplete();
    } else {
      handleZoomOutComplete();
    }
  }, [zoomDirection, handleZoomInComplete, handleZoomOutComplete]);

  // Build zoom container class names
  const zoomContainerClasses = sceneHidden ? 'zoom-container--hidden' : '';

  return (
    <div className="app">
      {/* Townsquare scene: always mounted, hidden via CSS when on a section page */}
      <div className={zoomContainerClasses} style={sceneHidden ? undefined : undefined}>
        <ZoomTransition
          isActive={zoomActive}
          direction={zoomDirection}
          targetPosition={targetPosition}
          onComplete={handleZoomComplete}
          reducedMotion={reducedMotion}
        >
          <TownsquareScene onBuildingClick={handleBuildingClick} isNavigating={zoomActive} />
        </ZoomTransition>
      </div>

      {/* Section pages: rendered on top when navigated to */}
      {isOnSection && (
        <div className="section-overlay">
          <Routes>
            <Route path="/about" element={<AboutSection onBack={handleBackToTownsquare} />} />
            <Route path="/blog" element={<BlogSection onBack={handleBackToTownsquare} />} />
            <Route path="/photography" element={<PhotographySection onBack={handleBackToTownsquare} />} />
            <Route path="/contact" element={<ContactSection onBack={handleBackToTownsquare} />} />
          </Routes>
        </div>
      )}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
