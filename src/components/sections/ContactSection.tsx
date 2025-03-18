import React from 'react';
import HeroBanner from '../hero/HeroBanner';
import './Sections.css';

const ContactSection: React.FC = () => {
  return (
    <div className="section-page">
      <HeroBanner 
        title="Contact Me" 
        subtitle="Get in touch with me for collaborations or inquiries" 
      />
      <div className="section-content">
        <h2>Linkedin</h2>
        <p>This is where your about content will go. Share your story, background, and what drives you.</p>
        
        {/* Add more content as needed */}
      </div>
    </div>
  );
};

export default ContactSection;