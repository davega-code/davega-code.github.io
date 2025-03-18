import React from 'react';
import './BaseCard.css';

/**
 * BaseCard Props Interface
 * @interface BaseCardProps
 * @property {string} title - The main title of the card
 * @property {string} [subtitle] - Optional subtitle text
 * @property {string} [imageUrl] - URL for the card's background image
 * @property {Function} [onClick] - Click handler for the card
 * @property {string} [className] - Additional CSS classes
 * @property {React.ReactNode} [children] - Optional child elements
 */
export interface BaseCardProps {
  title: string;
  subtitle?: string;
  imageUrl?: string;
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
}

/**
 * BaseCard Component
 * A Netflix-style card component used across different sections of the website.
 * Features hover effects, image backgrounds, and optional content overlay.
 *
 * @component
 * @example
 * ```jsx
 * <BaseCard
 *   title="Card Title"
 *   subtitle="Optional subtitle"
 *   imageUrl="/path/to/image.jpg"
 *   onClick={() => handleClick()}
 * />
 * ```
 */
const BaseCard: React.FC<BaseCardProps> = ({
  title,
  subtitle,
  imageUrl,
  onClick,
  className = '',
  children
}) => {
  return (
    <div 
      className={`base-card ${className}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <div className="base-card-image-container">
        {/* Background image container */}
        {imageUrl && (
          <div 
            className="base-card-image"
            style={{ backgroundImage: `url(${imageUrl})` }}
          />
        )}
        {/* Content overlay with gradient background */}
        <div className="base-card-overlay">
          <h3 className="base-card-title">{title}</h3>
          {subtitle && (
            <p className="base-card-subtitle">{subtitle}</p>
          )}
        </div>
      </div>
      {/* Optional additional content */}
      {children && (
        <div className="base-card-content">
          {children}
        </div>
      )}
    </div>
  );
};

export default BaseCard;