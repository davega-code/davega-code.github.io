import React from 'react';
import { useNavigate } from 'react-router-dom';
import HeroBanner from '../hero/HeroBanner';
import SectionCard from '../cards/SectionCard';
import { SectionCard as SectionCardType } from '../../types';
import './HomePage.css';

// Placeholder images (replace with actual images later)
const placeholderImage = 'https://via.placeholder.com/300x200';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  
  const sections: SectionCardType[] = [
    {
      id: 'about',
      title: 'Who am I?',
      description: 'Learn about me, my background, and what I do.',
      image: placeholderImage,
      path: '/about'
    },
    {
      id: 'blog',
      title: 'Blog',
      description: 'Read my thoughts and articles on various topics.',
      image: placeholderImage,
      path: '/blog'
    },
    {
      id: 'photography',
      title: 'Photography Portfolio',
      description: 'Explore my photography work and projects.',
      image: placeholderImage,
      path: '/photography'
    },
    {
      id: 'contact',
      title: 'Contact',
      description: 'Get in touch with me for collaborations or inquiries.',
      image: placeholderImage,
      path: '/contact'
    }
  ];

  const handleCardClick = (path: string) => {
    navigate(path);
  };

  return (
    <div className="home-page">
      <HeroBanner 
        title="Welcome to My Portfolio" 
        subtitle="Explore my work, thoughts, and passions through an immersive experience" 
      />
      
      <div className="content-section">
        <h2 className="section-title">Trending</h2>
        <div className="cards-slider">
          <div className="cards-container" >
            {sections.map(section => (
              <SectionCard 
                key={section.id} 
                card={section} 
                onClick={handleCardClick} 
              />
            ))}
          </div>
        </div>
        
        {/* Add more content sections as needed */}
        <div className="featured-section">
          <h2 className="section-title">Featured Work</h2>
          <div className="featured-content">
            <div className="featured-item">
              <div className="featured-image" style={{ backgroundImage: `url(${placeholderImage})` }}></div>
              <h3>Featured Project</h3>
              <p>A brief description of your featured project or work goes here.</p>
            </div>
            {/* Add more featured items as needed */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;