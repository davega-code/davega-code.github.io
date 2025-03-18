import React from 'react';
import HeroBanner from '../../shared/hero/HeroBanner';
import BaseCard from '../../shared/cards/BaseCard';
import RowContainer from '../../shared/row-container/RowContainer';
import '../../../styles/sections.css';
import './ContactSection.css';

// Placeholder image (replace with actual images later)
const placeholderImage = 'https://via.placeholder.com/300x200';

/**
 * Social Link Interface
 * @interface SocialLink
 * @property {string} id - Unique identifier for the social link
 * @property {string} platform - Social media platform name
 * @property {string} url - Profile or contact URL
 * @property {string} icon - Platform icon image URL
 * @property {string} description - Brief description of the profile
 */
interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon: string;
  description: string;
}

/**
 * ContactSection Component
 * Contact and social media section featuring:
 * - Contact form
 * - Social media links
 * - Professional profiles
 * - Contact information
 *
 * Provides various ways to get in touch, presented in a
 * Netflix-style card layout with interactive elements.
 *
 * @component
 * @example
 * ```jsx
 * <ContactSection />
 * ```
 */
const ContactSection: React.FC = () => {
  // Example social links data (replace with real data)
  const socialLinks: SocialLink[] = [
    {
      id: '1',
      platform: 'LinkedIn',
      url: 'https://linkedin.com/in/yourprofile',
      icon: placeholderImage,
      description: 'Connect professionally'
    },
    {
      id: '2',
      platform: 'GitHub',
      url: 'https://github.com/yourusername',
      icon: placeholderImage,
      description: 'Check out my code'
    },
    // Additional social links...
  ];

  /**
   * Handle opening social media links
   * @param url - The URL to open
   */
  const handleSocialClick = (url: string) => {
    window.open(url, '_blank', 'noopener noreferrer');
  };

  return (
    <div className="section-page">
      {/* Hero banner */}
      <HeroBanner 
        title="Contact Me" 
        subtitle="Let's connect and collaborate" 
      />
      
      <div className="contact-content">
        {/* Social media links */}
        <RowContainer title="Connect With Me">
          {socialLinks.map(link => (
            <BaseCard
              key={link.id}
              title={link.platform}
              subtitle={link.description}
              imageUrl={link.icon}
              onClick={() => handleSocialClick(link.url)}
              className="social-card"
            />
          ))}
        </RowContainer>

      </div>
    </div>
  );
};

export default ContactSection;