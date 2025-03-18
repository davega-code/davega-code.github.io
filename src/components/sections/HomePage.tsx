import React from 'react';
import { useNavigate } from 'react-router-dom';
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
      <div className="intro-section">
        <h1>Welcome to My Personal Website</h1>
        <p>
          Here you can explore different aspects of my life and work. Click on any card below to dive deeper.
        </p>
      </div>
      
      <div className="cards-container">
        {sections.map(section => (
          <SectionCard 
            key={section.id} 
            card={section} 
            onClick={handleCardClick} 
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;