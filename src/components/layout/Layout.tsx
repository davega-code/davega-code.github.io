import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Layout.css';

/**
 * Layout Props Interface
 * @interface LayoutProps
 * @property {React.ReactNode} children - Child components to be rendered within the layout
 */
interface LayoutProps {
  children: React.ReactNode;
}

/**
 * Layout Component
 * Main layout wrapper providing the site structure with:
 * - Responsive header with navigation
 * - Scroll-aware styling
 * - Consistent footer
 * 
 * The header becomes translucent and adds background when scrolled
 * for better content visibility.
 *
 * @component
 * @example
 * ```jsx
 * <Layout>
 *   <YourPageContent />
 * </Layout>
 * ```
 */
const Layout: React.FC<LayoutProps> = ({ children }) => {
  // Track scroll position for header styling
  const [scrolled, setScrolled] = useState(false);

  // Set up scroll listener for header transformation
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Clean up listener on unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <div className="layout">
      {/* Header with dynamic styling based on scroll position */}
      <header className={`layout-header ${scrolled ? 'scrolled' : ''}`}>
        <div className="header-content">
          {/* Site logo/name */}
          <div className="logo">
            <Link to="/">YOUR NAME</Link>
          </div>
          {/* Main navigation */}
          <nav className="main-nav">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/blog">Blog</Link>
            <Link to="/photography">Photography</Link>
            <Link to="/contact">Contact</Link>
          </nav>
        </div>
      </header>

      {/* Main content area */}
      <main className="layout-content">
        {children}
      </main>

      {/* Footer with copyright */}
      <footer className="layout-footer">
        <p>© {new Date().getFullYear()} Your Name. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;