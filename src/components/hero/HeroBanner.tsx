import React from 'react';
import './HeroBanner.css';

/**
 * HeroBanner Props Interface
 * @interface HeroBannerProps
 * @property {string} title - Main heading text for the banner
 * @property {string} subtitle - Secondary text below the main heading
 */
interface HeroBannerProps {
  title: string;
  subtitle: string;
}

/**
 * HeroBanner Component
 * A Netflix-style hero banner section featuring:
 * - Large background image/slideshow
 * - Gradient overlay for text legibility
 * - Responsive title and subtitle
 * - Positioned at the top of each main section
 *
 * Used as the main visual element at the top of major sections
 * with a consistent dark gradient overlay to maintain text legibility
 * and create visual hierarchy.
 *
 * @component
 * @example
 * ```jsx
 * <HeroBanner
 *   title="Welcome to My Portfolio"
 *   subtitle="Explore my work and projects"
 * />
 * ```
 */
const HeroBanner: React.FC<HeroBannerProps> = ({ title, subtitle }) => {
  return (
    <div className="hero-banner">
      {/* Optional: Background slideshow container */}
      <div className="slideshow-container">
        {/* Add slideshow images here if needed */}
      </div>
      
      {/* Hero content with title and subtitle */}
      <div className="hero-content">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>

      {/* 
        Note: The gradient overlay is handled by CSS using a pseudo-element
        to maintain separation of concerns and allow for easy modification
        of the gradient values.
      */}
    </div>
  );
};

export default HeroBanner;