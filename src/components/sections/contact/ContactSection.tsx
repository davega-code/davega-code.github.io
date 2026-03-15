import React from 'react';
import { BackToTownsquare, SectionHeader } from '../../shared';
import './ContactSection.css';

export interface ContactSectionProps {
  /** Callback fired when the back button is clicked */
  onBack: () => void;
}

/**
 * ContactSection — Contact page with BackToTownsquare navigation
 * and shared SectionHeader decorative header.
 */
const ContactSection: React.FC<ContactSectionProps> = ({ onBack }) => {
  return (
    <div className="section-page section-page--contact">
      <BackToTownsquare onClick={onBack} sectionName="Contact" />
      <div className="contact-content">
        <SectionHeader title="Contact" />
        <p>Let's connect and collaborate — coming soon.</p>
      </div>
    </div>
  );
};

export default ContactSection;
