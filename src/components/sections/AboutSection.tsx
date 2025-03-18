import React from 'react';
import HeroBanner from '../hero/HeroBanner';
import './Sections.css';

const AboutSection: React.FC = () => {
  return (
    <div className="section-page">
      <HeroBanner 
        title="About Me" 
        subtitle="Get to know who I am and what I do" 
      />
      <div className="section-content">
        <h2>My Story</h2>
        <p>This is where your about content will go. Share your story, background, and what drives you.</p>
        
        {/* Add more content as needed */}
      </div>
    </div>
  );
};

export default AboutSection;