import React from 'react';
import { BackToTownsquare, SectionHeader } from '../../shared';
import './BlogSection.css';

export interface BlogSectionProps {
  /** Callback fired when the back button is clicked */
  onBack: () => void;
}

/**
 * BlogSection — Blog page with BackToTownsquare navigation
 * and shared SectionHeader decorative header.
 */
const BlogSection: React.FC<BlogSectionProps> = ({ onBack }) => {
  return (
    <div className="section-page section-page--blog">
      <BackToTownsquare onClick={onBack} sectionName="Blog" />
      <div className="blog-content">
        <SectionHeader title="Blog" />
        <p>Thoughts, tutorials, and insights — coming soon.</p>
      </div>
    </div>
  );
};

export default BlogSection;
