import React from 'react';
import { useNavigate } from 'react-router-dom';
import HeroBanner from '../../shared/hero/HeroBanner';
import BaseCard from '../../shared/cards/BaseCard';
import RowContainer from '../../shared/row-container/RowContainer';
import '../../../styles/sections.css';
import './HomePage.css';

// Placeholder image (replace with actual images later)
const placeholderImage = 'https://via.placeholder.com/300x200';

/**
 * Section interface for main navigation cards
 */
interface Section {
  id: string;
  title: string;
  description: string;
  image: string;
  path: string;
}

/**
 * HomePage Component
 * The main landing page featuring Netflix-style layout with:
 * - Hero banner with main message
 * - Navigation section with preview cards
 * - Featured content section
 * - Recent photography previews
 */
const HomePage: React.FC = () => {
  const navigate = useNavigate();
  
  // Define main navigation sections
  const sections: Section[] = [
    {
      id: 'about',
      title: 'About Me',
      description: 'Learn about my journey and expertise',
      image: placeholderImage,
      path: '/about'
    },
    {
      id: 'blog',
      title: 'Blog',
      description: 'Thoughts on technology and development',
      image: placeholderImage,
      path: '/blog'
    },
    {
      id: 'photography',
      title: 'Photography',
      description: 'Capturing moments through my lens',
      image: placeholderImage,
      path: '/photography'
    },
    {
      id: 'contact',
      title: 'Contact',
      description: 'Let\'s connect and collaborate',
      image: placeholderImage,
      path: '/contact'
    }
  ];

  // Featured content examples
  const featuredPosts = [
    {
      id: 'post1',
      title: 'Latest Article',
      description: 'Exploring modern web development trends',
      image: placeholderImage,
      path: '/blog/latest-article'
    },
    {
      id: 'post2',
      title: 'Photo Series',
      description: 'Urban landscapes collection',
      image: placeholderImage,
      path: '/photography/urban-landscapes'
    }
    // Add more featured posts as needed
  ];

  // Recent photography examples
  const recentPhotos = [
    {
      id: 'photo1',
      title: 'City Lights',
      description: 'Night photography series',
      image: placeholderImage,
      path: '/photography/city-lights'
    },
    {
      id: 'photo2',
      title: 'Nature\'s Beauty',
      description: 'Landscape collection',
      image: placeholderImage,
      path: '/photography/landscapes'
    }
    // Add more photos as needed
  ];

  /**
   * Handle navigation to different sections
   * @param path - The route path to navigate to
   */
  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <div className="home-page">
      {/* Main hero banner */}
      <HeroBanner 
        title="Welcome to My Portfolio" 
        subtitle="Explore my work, thoughts, and photography" 
      />
      
      {/* Main content section with Netflix-style rows */}
      <div className="home-content">
        {/* Main navigation row */}
        <RowContainer title="Explore">
          {sections.map(section => (
            <BaseCard
              key={section.id}
              title={section.title}
              subtitle={section.description}
              imageUrl={section.image}
              onClick={() => handleNavigation(section.path)}
              className="section-preview-card"
            />
          ))}
        </RowContainer>

        {/* Featured content row */}
        <RowContainer title="Featured Content">
          {featuredPosts.map(post => (
            <BaseCard
              key={post.id}
              title={post.title}
              subtitle={post.description}
              imageUrl={post.image}
              onClick={() => handleNavigation(post.path)}
              className="featured-content-card"
            />
          ))}
        </RowContainer>

        {/* Recent photography row */}
        <RowContainer title="Recent Photography">
          {recentPhotos.map(photo => (
            <BaseCard
              key={photo.id}
              title={photo.title}
              subtitle={photo.description}
              imageUrl={photo.image}
              onClick={() => handleNavigation(photo.path)}
              className="photo-preview-card"
            />
          ))}
        </RowContainer>
      </div>
    </div>
  );
};

export default HomePage;