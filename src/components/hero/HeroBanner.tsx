import React, { useState, useEffect } from 'react';
import './HeroBanner.css';

interface HeroBannerProps {
  title: string;
  subtitle: string;
}

const HeroBanner: React.FC<HeroBannerProps> = ({ title, subtitle }) => {
  // Mock images for slideshow - replace with your own
  const images = [
    'https://via.placeholder.com/1920x1080/333333',
    'https://via.placeholder.com/1920x1080/444444',
    'https://via.placeholder.com/1920x1080/555555',
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="hero-banner">
      <div className="slideshow-container">
        {images.map((image, index) => (
          <div
            key={index}
            className={`slide ${index === currentImageIndex ? 'active' : ''}`}
            style={{ backgroundImage: `url(${image})` }}
          />
        ))}
      </div>
      <div className="hero-content">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
    </div>
  );
};

export default HeroBanner;