import React from 'react';
import HeroBanner from '../hero/HeroBanner';
import './Sections.css';

const BlogSection: React.FC = () => {
  return (
    <div className="section-page">
      <HeroBanner 
        title="David's Blog" 
        subtitle="My thoughts, articles, and more" 
      />
      <div className="section-content">
        <h2>Blog</h2>
        <p>This is where your about content will go. Share your story, background, and what drives you.</p>
        
        {/* Add more content as needed */}
      </div>
      <div className="section-content">
        <h2>Blog 2</h2>
        <p>This is where your about content will go. Share your story, background, and what drives you.</p>
        
        {/* Add more content as needed */}
      </div>
      <div className="section-content">
        <h2>Blog 3</h2>
        <p>This is where your about content will go. Share your story, background, and what drives you.</p>
        
        {/* Add more content as needed */}
      </div>
    </div>
  );
};

export default BlogSection;