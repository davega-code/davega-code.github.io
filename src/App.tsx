import React, { useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  AboutSection,
  BlogSection,
  PhotographySection,
  ContactSection,
} from './components/sections';
import { TownsquareScene } from './components/townsquare';
import './App.css';

const App: React.FC = () => {
  const handleBuildingClick = useCallback((buildingId: string) => {
    console.log(`Building clicked: ${buildingId}`);
  }, []);

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route
            path="/"
            element={
              <TownsquareScene onBuildingClick={handleBuildingClick} />
            }
          />
          <Route path="/about" element={<AboutSection />} />
          <Route path="/blog" element={<BlogSection />} />
          <Route path="/photography" element={<PhotographySection />} />
          <Route path="/contact" element={<ContactSection />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
