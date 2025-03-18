import React from 'react';
import HeroBanner from '../hero/HeroBanner';
import './Sections.css';

const PhotographySection: React.FC = () => {
  return (
    <div className="section-page">
      <HeroBanner 
        title="My Photos" 
        subtitle="A Collection of my favorite photos" 
      />
      <div className="section-content">
        <h2>Photos</h2>
        <p>This is where your about content will go. Share your story, background, and what drives you.</p>
        
        {/* Add more content as needed */}
      </div>
    </div>
  );
};
export default PhotographySection;