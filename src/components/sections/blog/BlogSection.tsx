import React from 'react';
import { useNavigate } from 'react-router-dom';
import HeroBanner from '../../shared/hero/HeroBanner';
import BaseCard from '../../shared/cards/BaseCard';
import RowContainer from '../../shared/row-container/RowContainer';
import '../../../styles/sections.css';
import './BlogSection.css';

// Placeholder image (replace with actual images later)
const placeholderImage = 'https://via.placeholder.com/300x200';

/**
 * Blog Post Interface
 * @interface BlogPost
 * @property {string} id - Unique identifier for the post
 * @property {string} title - Post title
 * @property {string} description - Brief description or excerpt
 * @property {string} category - Post category for organization
 * @property {string} image - Featured image URL
 * @property {string} date - Publication date
 * @property {string} readTime - Estimated reading time
 * @property {string} slug - URL-friendly identifier
 */
interface BlogPost {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  date: string;
  readTime: string;
  slug: string;
}

/**
 * BlogSection Component
 * Netflix-style blog section featuring:
 * - Category-based content organization
 * - Horizontal scrollable rows
 * - Featured posts section
 * - Post previews with metadata
 *
 * Organizes blog posts into categories and presents them
 * in a Netflix-style layout with horizontal scrolling rows.
 *
 * @component
 * @example
 * ```jsx
 * <BlogSection />
 * ```
 */
const BlogSection: React.FC = () => {
  const navigate = useNavigate();

  // Example blog posts data (replace with real data)
  const blogPosts: BlogPost[] = [
    {
      id: '1',
      title: 'Modern Web Development',
      description: 'Exploring the latest trends in web development',
      category: 'Technology',
      image: placeholderImage,
      date: 'March 15, 2024',
      readTime: '5 min read',
      slug: 'modern-web-development'
    },
    // Additional posts...
  ];

  // Organize posts into categories for row display
  const categories = [
    {
      title: 'Featured Posts',
      posts: blogPosts.slice(0, 4) // First 4 posts as featured
    },
    {
      title: 'Technology',
      posts: blogPosts.filter(post => post.category === 'Technology')
    },
    {
      title: 'Photography',
      posts: blogPosts.filter(post => post.category === 'Photography')
    }
  ];

  /**
   * Handle navigation to individual blog posts
   * @param slug - URL-friendly identifier for the post
   */
  const handlePostClick = (slug: string) => {
    navigate(`/blog/${slug}`);
  };

  return (
    <div className="section-page">
      {/* Hero banner */}
      <HeroBanner 
        title="Blog" 
        subtitle="Thoughts, tutorials, and insights" 
      />
      
      {/* Blog content organized in rows by category */}
      <div className="blog-content">
        {categories.map((category, index) => (
          <RowContainer 
            key={index}
            title={category.title}
          >
            {/* Post preview cards */}
            {category.posts.map(post => (
              <BaseCard
                key={post.id}
                title={post.title}
                subtitle={post.description}
                imageUrl={post.image}
                onClick={() => handlePostClick(post.slug)}
                className="blog-post-card"
              >
                {/* Post metadata */}
                <div className="blog-post-meta">
                  <span className="post-date">{post.date}</span>
                  <span className="post-read-time">{post.readTime}</span>
                </div>
              </BaseCard>
            ))}
          </RowContainer>
        ))}
      </div>
    </div>
  );
};

export default BlogSection;