import React, { useRef, useEffect } from 'react';
import rough from 'roughjs';
import './BackToTownsquare.css';

export interface BackToTownsquareProps {
  /** Callback fired when the back button is clicked */
  onClick: () => void;
  /** Name of the current section (used in aria-label) */
  sectionName: string;
}

/**
 * BackToTownsquare — a styled button that navigates back to the townsquare.
 *
 * Positioned at the top-left of section pages with a line-art aesthetic.
 * Uses rough.js to render a hand-drawn left-arrow icon that matches
 * the townsquare sketch style.
 */
export const BackToTownsquare: React.FC<BackToTownsquareProps> = ({
  onClick,
  sectionName,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    // Clear any previous rough.js drawings
    while (svg.firstChild) {
      svg.removeChild(svg.firstChild);
    }

    const rc = rough.svg(svg);

    // Draw a hand-drawn left-pointing arrow: shaft + chevron head
    // Shaft: horizontal line from right to left
    const shaft = rc.line(16, 10, 4, 10, {
      stroke: 'currentColor',
      strokeWidth: 1.5,
      roughness: 0.8,
    });

    // Arrow head: two lines forming a "<" chevron
    const headTop = rc.line(8, 5, 3, 10, {
      stroke: 'currentColor',
      strokeWidth: 1.5,
      roughness: 0.8,
    });
    const headBottom = rc.line(8, 15, 3, 10, {
      stroke: 'currentColor',
      strokeWidth: 1.5,
      roughness: 0.8,
    });

    svg.appendChild(shaft);
    svg.appendChild(headTop);
    svg.appendChild(headBottom);
  }, []);

  return (
    <button
      className="back-to-townsquare"
      onClick={onClick}
      aria-label={`Return to townsquare from ${sectionName}`}
      type="button"
    >
      <svg
        ref={svgRef}
        className="back-to-townsquare__icon"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        aria-hidden="true"
      />
      <span className="back-to-townsquare__label">Back to Townsquare</span>
    </button>
  );
};
