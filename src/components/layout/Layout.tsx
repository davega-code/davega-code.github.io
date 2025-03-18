import React from 'react';
import { Link } from 'react-router-dom';
import './Layout.css';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="layout">
      <header className="layout-header">
        <div className="logo">
          <Link to="/">My Portfolio</Link>
        </div>
        <nav className="main-nav">
          <Link to="/about">About</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/photography">Photography</Link>
          <Link to="/contact">Contact</Link>
        </nav>
      </header>
      <main className="layout-content">
        {children}
      </main>
      <footer className="layout-footer">
        <p>© {new Date().getFullYear()} Your Name. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;