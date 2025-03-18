import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/shared';
import {
  HomePage,
  AboutSection,
  BlogSection,
  PhotographySection,
  ContactSection
} from './components/sections';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutSection />} />
            <Route path="/blog" element={<BlogSection />} />
            <Route path="/photography" element={<PhotographySection />} />
            <Route path="/contact" element={<ContactSection />} />
          </Routes>
        </Layout>
      </div>
    </Router>
  );
};

export default App;