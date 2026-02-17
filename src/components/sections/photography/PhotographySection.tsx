import React from 'react';
import { BackToTownsquare, SectionHeader } from '../../shared';
import './PhotographySection.css';

export interface PhotographySectionProps {
  /** Callback fired when the back button is clicked */
  onBack: () => void;
}

/**
 * PhotographySection — Photography page with BackToTownsquare navigation
 * and shared SectionHeader decorative header.
 */
const PhotographySection: React.FC<PhotographySectionProps> = ({ onBack }) => {
  return (
    <div className="section-page section-page--photography">
      <BackToTownsquare onClick={onBack} sectionName="Photography" />
      <div className="photography-content">
        <SectionHeader title="Photography" />
        <p>Capturing moments through my lens — coming soon.</p>
      </div>
    </div>
  );
};

export default PhotographySection;
