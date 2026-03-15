import React from 'react';
import './SectionHeader.css';

export interface SectionHeaderProps {
  /** The heading text displayed in the section header */
  title: string;
}

/**
 * SectionHeader — shared decorative header for content section pages.
 *
 * Renders a CSS-based line-diamond-line decoration above the heading,
 * matching the townsquare line art aesthetic. Used by all section pages
 * (About, Blog, Photography, Contact) to avoid duplication.
 */
export const SectionHeader: React.FC<SectionHeaderProps> = ({ title }) => {
  return (
    <header className="section-header">
      {/* Decorative line-diamond-line divider (purely visual) */}
      <div className="section-header__decoration" aria-hidden="true">
        <span className="section-header__line" />
        <span className="section-header__diamond" />
        <span className="section-header__line" />
      </div>
      <h1 className="section-header__title">{title}</h1>
    </header>
  );
};
