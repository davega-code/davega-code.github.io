import React from 'react';
import HeroBanner from '../hero/HeroBanner';
import BaseCard from '../shared/cards/BaseCard';
import RowContainer from '../shared/layout/RowContainer';
import './Sections.css';

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
        {/* Contact form section */}
        <section className="contact-form-section">
          <h2>Get in Touch</h2>
          <form className="contact-form">
            {/* Add contact form fields */}
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows={5} />
            </div>
            <button type="submit" className="submit-button">
              Send Message
            </button>
          </form>
        </section>

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

        {/* Additional contact information */}
        <section className="additional-info">
          <h2>Other Ways to Reach Me</h2>
          <div className="contact-info">
            {/* Add additional contact information */}
            <p>Based in [Your Location]</p>
            <p>Available for remote collaboration</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ContactSection;