import React, { useState, useRef, useCallback } from 'react';
import './RowContainer.css';

/**
 * RowContainer Props Interface
 * @interface RowContainerProps
 * @property {string} title - The title of the row section
 * @property {React.ReactNode} children - The cards or content to be displayed in the row
 * @property {string} [className] - Optional additional CSS classes
 */
interface RowContainerProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * RowContainer Component
 * A Netflix-style horizontal scrollable row container with navigation arrows.
 * Features smooth scrolling, dynamic arrow visibility, and touch device support.
 *
 * @component
 * @example
 * ```jsx
 * <RowContainer title="Featured Content">
 *   <Card />
 *   <Card />
 *   <Card />
 * </RowContainer>
 * ```
 */
const RowContainer: React.FC<RowContainerProps> = ({
  title,
  children,
  className = ''
}) => {
  // Track arrow visibility based on scroll position
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  /**
   * Updates arrow visibility based on scroll position
   */
  const handleScroll = useCallback(() => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      // Show left arrow if not at start
      setShowLeftArrow(scrollLeft > 0);
      // Show right arrow if not at end (with small buffer)
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  }, []);

  /**
   * Handles row scrolling in specified direction
   * @param direction - 'left' or 'right'
   */
  const scroll = useCallback((direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      // Scroll by 80% of container width
      const scrollAmount = scrollContainerRef.current.clientWidth * 0.8;
      const newScrollPosition = scrollContainerRef.current.scrollLeft + 
        (direction === 'left' ? -scrollAmount : scrollAmount);
      
      scrollContainerRef.current.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth'
      });
    }
  }, []);

  return (
    <div className={`row-container ${className}`}>
      <h2 className="row-title">{title}</h2>
      <div className="row-content-wrapper">
        {/* Left scroll button */}
        {showLeftArrow && (
          <button 
            className="scroll-button left"
            onClick={() => scroll('left')}
            aria-label="Scroll left"
          >
            <svg 
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
        )}
        {/* Scrollable content container */}
        <div 
          className="row-content"
          ref={scrollContainerRef}
          onScroll={handleScroll}
        >
          {children}
        </div>
        {/* Right scroll button */}
        {showRightArrow && (
          <button 
            className="scroll-button right"
            onClick={() => scroll('right')}
            aria-label="Scroll right"
          >
            <svg 
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default RowContainer;