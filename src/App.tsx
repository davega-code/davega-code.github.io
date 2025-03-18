import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './components/sections/HomePage';
import AboutSection from './components/sections/AboutSection';
import BlogSection from './components/sections/BlogSection';
import PhotographySection from './components/sections/PhotographySection';
import ContactSection from './components/sections/ContactSection';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutSection />} />
          <Route path="/blog" element={<BlogSection />} />
          <Route path="/photography" element={<PhotographySection />} />
          <Route path="/contact" element={<ContactSection />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;