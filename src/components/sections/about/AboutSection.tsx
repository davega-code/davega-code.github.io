import React from 'react';
import { BackToTownsquare, SectionHeader } from '../../shared';
import './AboutSection.css';

export interface AboutSectionProps {
  /** Callback fired when the back button is clicked */
  onBack: () => void;
}

/**
 * AboutSection — About page with BackToTownsquare navigation
 * and shared SectionHeader decorative header.
 */
const AboutSection: React.FC<AboutSectionProps> = ({ onBack }) => {
  return (
    <div className="section-page section-page--about">
      <BackToTownsquare onClick={onBack} sectionName="About" />
      <div className="about-content">
        <SectionHeader title="About Me" />
        <p className="intro-text">
          A passionate software engineer with expertise in web development
          and a love for creating elegant solutions to complex problems.
        </p>
      </div>
    </div>
  );
};

export default AboutSection;
