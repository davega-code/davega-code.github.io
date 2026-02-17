import React from 'react';
import './AboutSection.css';

/**
 * AboutSection Component
 * Placeholder section page — internal layout redesign is out of scope
 * for the townsquare revamp. Content will be updated in a future phase.
 */
const AboutSection: React.FC = () => {
  return (
    <div className="section-page">
      <div className="about-content">
        <section className="intro-section">
          <h1>About Me</h1>
          <p className="intro-text">
            A passionate software engineer with expertise in web development
            and a love for creating elegant solutions to complex problems.
          </p>
        </section>
      </div>
    </div>
  );
};

export default AboutSection;
