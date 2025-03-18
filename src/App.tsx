import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './components/sections/HomePage';
import AboutSection from './components/sections/AboutSection';
import BlogSection from './components/sections/BlogSection';
import PhotographySection from './components/sections/PhotographySection';
import ContactSection from './components/sections/ContactSection';
import './App.css';

/**
 * App Component
 * Root component that sets up routing and global layout.
 * Wraps all routes in the Layout component for consistent
 * header, navigation, and footer across all pages.
 */
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