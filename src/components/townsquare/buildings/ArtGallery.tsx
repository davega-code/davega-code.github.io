import React from 'react';

/**
 * Isometric line-art SVG illustration of the Art Gallery building.
 *
 * Simplified isometric 3D building with flat roof and rooftop skylight.
 * Modern gallery with floor-to-ceiling windows showing artwork,
 * wide glass entrance, and abstract sculpture outside.
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ ISOMETRIC GEOMETRY — same pattern as all buildings              │
 * │                                                                 │
 * │              bT (back)          Footprint center: (55, 78)      │
 * │             ╱    ╲              W=55, D=28, H=50                │
 * │    bL (left)      bR (right)                                    │
 * │             ╲    ╱                                               │
 * │              bB (front)                                          │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * Line art style: consistent stroke via var(--stroke-width) / var(--line-color),
 * strokeLinecap="round", strokeLinejoin="round" for hand-drawn feel.
 */
export const ArtGallery: React.FC = () => {
  const W = 55; // half-width of building footprint
  const D = 28; // half-depth of building footprint
  const H = 50; // wall height

  // ── Ground-level diamond corners ──
  const bT = { x: 55, y: 78 - D };   // back corner
  const bR = { x: 55 + W, y: 78 };   // right corner
  const bB = { x: 55, y: 78 + D };   // front corner
  const bL = { x: 55 - W, y: 78 };   // left corner

  // ── Wall-top corners (base diamond shifted up by H) ──
  const wT = { x: bT.x, y: bT.y - H };
  const wR = { x: bR.x, y: bR.y - H };
  const wB = { x: bB.x, y: bB.y - H };
  const wL = { x: bL.x, y: bL.y - H };

  return (
    <g data-testid="building-art-gallery">

      {/* ── GROUND SHADOW ──
          Diamond footprint on the ground plane.
          Points: bT(back) → bR(right) → bB(front) → bL(left) */}
      <polygon
        points={`${bT.x},${bT.y} ${bR.x},${bR.y} ${bB.x},${bB.y} ${bL.x},${bL.y}`}
        fill="var(--line-color)" opacity={0.08}
      />

      {/* ── LEFT FACE (front-left wall) ──
          Points: bL(ground-left) → bB(ground-front) → wB(wall-front) → wL(wall-left) */}
      <polygon
        points={`${bL.x},${bL.y} ${bB.x},${bB.y} ${wB.x},${wB.y} ${wL.x},${wL.y}`}
        fill="var(--accent-art-gallery)"
        stroke="var(--line-color)" strokeWidth="var(--stroke-width)"
        strokeLinecap="round" strokeLinejoin="round"
      />

      {/* ── RIGHT FACE (front-right wall, slightly darker) ──
          Points: bB(ground-front) → bR(ground-right) → wR(wall-right) → wB(wall-front) */}
      <polygon
        points={`${bB.x},${bB.y} ${bR.x},${bR.y} ${wR.x},${wR.y} ${wB.x},${wB.y}`}
        fill="var(--accent-art-gallery)"
        stroke="var(--line-color)" strokeWidth="var(--stroke-width)"
        strokeLinecap="round" strokeLinejoin="round"
        opacity={0.82}
      />

      {/* ── FLAT ROOF (top face — isometric diamond) ──
          Points: wT(back) → wR(right) → wB(front) → wL(left) */}
      <polygon
        points={`${wT.x},${wT.y} ${wR.x},${wR.y} ${wB.x},${wB.y} ${wL.x},${wL.y}`}
        fill="var(--accent-art-gallery)"
        stroke="var(--line-color)" strokeWidth="var(--stroke-width)"
        strokeLinecap="round" strokeLinejoin="round"
        opacity={0.55}
      />

      {/* ── ROOF PARAPET — left edge ──
          Thin raised strip along left-front roof edge.
          Points: wL(left-base) → wB(front-base) → wB-3(front-raised) → wL-3(left-raised) */}
      <polygon
        points={`${wL.x},${wL.y} ${wB.x},${wB.y} ${wB.x},${wB.y - 3} ${wL.x},${wL.y - 3}`}
        fill="var(--accent-art-gallery)" stroke="var(--line-color)" strokeWidth="1"
        strokeLinecap="round" strokeLinejoin="round" opacity={0.65}
      />

      {/* ── ROOF PARAPET — right edge ──
          Points: wB(front-base) → wR(right-base) → wR-3(right-raised) → wB-3(front-raised) */}
      <polygon
        points={`${wB.x},${wB.y} ${wR.x},${wR.y} ${wR.x},${wR.y - 3} ${wB.x},${wB.y - 3}`}
        fill="var(--accent-art-gallery)" stroke="var(--line-color)" strokeWidth="1"
        strokeLinecap="round" strokeLinejoin="round" opacity={0.55}
      />

      {/* ── ROOFTOP SKYLIGHT ──
          Small diamond shape on the roof surface, centered near wT.
          Points: top(wT.x, wT.y-1) → right(wT.x+12, wT.y+5)
                → bottom(wT.x, wT.y+11) → left(wT.x-12, wT.y+5) */}
      <polygon
        points={`${wT.x},${wT.y - 1} ${wT.x + 12},${wT.y + 5} ${wT.x},${wT.y + 11} ${wT.x - 12},${wT.y + 5}`}
        fill="var(--bg-color)" stroke="var(--line-color)" strokeWidth="0.8"
        strokeLinecap="round" strokeLinejoin="round" opacity={0.7}
      />

      {/* ── LEFT FACE — FLOOR-TO-CEILING WINDOWS (3 windows) ──
          Tall windows at 15%, 40%, 65% along the left face, spanning 70% wall height.
          Each window contains small artwork frame rectangles visible inside. */}
      {[0.15, 0.4, 0.65].map((t, i) => {
        const cx = bL.x + (bB.x - bL.x) * t; // window center x along left face
        const cy = bL.y + (bB.y - bL.y) * t; // window center y along left face
        const winY = cy - H * 0.7;            // window top position (70% up wall)
        const ww = 12;                          // window width
        const wh = H * 0.6;                    // window height (60% of wall = 30px)
        const dx = ww * 0.5;                    // isometric x half-offset
        const dy = ww * 0.25;                   // isometric y half-offset
        return (
          <g key={`lwin-${i}`}>
            {/* Window frame — left-face isometric parallelogram
                Points: top-left → top-right → bottom-right → bottom-left */}
            <polygon
              points={`${cx - dx},${winY - dy} ${cx + dx},${winY + dy} ${cx + dx},${winY + dy + wh} ${cx - dx},${winY - dy + wh}`}
              fill="var(--bg-color)" stroke="var(--line-color)" strokeWidth="1.2"
              strokeLinecap="round" strokeLinejoin="round"
            />
            {/* Artwork frame visible inside window — upper painting
                Inset 2px from window edges, 7px tall parallelogram */}
            <polygon
              points={`${cx - dx + 2},${winY - dy + 3} ${cx + dx - 2},${winY + dy + 3} ${cx + dx - 2},${winY + dy + 10} ${cx - dx + 2},${winY - dy + 10}`}
              fill="none" stroke="var(--line-color)" strokeWidth="0.6"
              strokeLinecap="round" strokeLinejoin="round"
            />
            {/* Second artwork frame — only in center window (i===1)
                Lower painting, 8px tall */}
            {i === 1 && (
              <polygon
                points={`${cx - dx + 2},${winY - dy + 14} ${cx + dx - 2},${winY + dy + 14} ${cx + dx - 2},${winY + dy + 22} ${cx - dx + 2},${winY - dy + 22}`}
                fill="none" stroke="var(--line-color)" strokeWidth="0.6"
                strokeLinecap="round" strokeLinejoin="round"
              />
            )}
          </g>
        );
      })}

      {/* ── LEFT FACE — WIDE GLASS ENTRANCE ──
          Positioned at 82% along the left face (near the front corner).
          Tall glass door spanning 65% of wall height to ground.
          Includes center split line and two vertical door handles. */}
      {(() => {
        const t = 0.82;
        const cx = bL.x + (bB.x - bL.x) * t;
        const cy = bL.y + (bB.y - bL.y) * t;
        const doorTop = cy - H * 0.65; // top of door (65% up wall)
        const doorBot = cy;             // bottom of door (ground level)
        const dw = 10;                  // door width
        const dx = dw * 0.5;
        const dy = dw * 0.25;
        return (
          <g>
            {/* Door frame — isometric parallelogram
                Points: top-left → top-right → bottom-right → bottom-left */}
            <polygon
              points={`${cx - dx},${doorTop - dy} ${cx + dx},${doorTop + dy} ${cx + dx},${doorBot + dy} ${cx - dx},${doorBot - dy}`}
              fill="var(--bg-color)" stroke="var(--line-color)" strokeWidth="1.5"
              strokeLinecap="round" strokeLinejoin="round"
            />
            {/* Door split — vertical center line dividing the double glass doors */}
            <line x1={cx} y1={doorTop} x2={cx} y2={doorBot}
              stroke="var(--line-color)" strokeWidth="0.8" strokeLinecap="round" />
            {/* Left door handle — short vertical line at 40-60% door height */}
            <line x1={cx - 1.5} y1={doorTop + (doorBot - doorTop) * 0.4}
              x2={cx - 1.5} y2={doorTop + (doorBot - doorTop) * 0.6}
              stroke="var(--line-color)" strokeWidth="1.5" strokeLinecap="round" />
            {/* Right door handle — matching handle on right panel */}
            <line x1={cx + 1.5} y1={doorTop + (doorBot - doorTop) * 0.4}
              x2={cx + 1.5} y2={doorTop + (doorBot - doorTop) * 0.6}
              stroke="var(--line-color)" strokeWidth="1.5" strokeLinecap="round" />
          </g>
        );
      })()}

      {/* ── RIGHT FACE — TALL WINDOWS (row of 3) ──
          Positioned along the right face at 70% wall height.
          Each window contains a small artwork frame inside. */}
      {[0.18, 0.45, 0.72].map((t, i) => {
        const cx = bB.x + (bR.x - bB.x) * t;
        const cy = bB.y + (bR.y - bB.y) * t;
        const winY = cy - H * 0.7;
        const ww = 10;
        const wh = H * 0.55; // 55% of wall height = 27.5px
        const dx = ww * 0.5;
        const dy = ww * 0.25;
        return (
          <g key={`rwin-${i}`}>
            {/* Window frame — right-face isometric parallelogram
                Points: bottom-left → top-right → bottom-right → far-bottom-left */}
            <polygon
              points={`${cx - dx},${winY + dy} ${cx + dx},${winY - dy} ${cx + dx},${winY - dy + wh} ${cx - dx},${winY + dy + wh}`}
              fill="var(--bg-color)" stroke="var(--line-color)" strokeWidth="1.2"
              strokeLinecap="round" strokeLinejoin="round"
            />
            {/* Artwork frame inside window — small inset parallelogram */}
            <polygon
              points={`${cx - dx + 2},${winY + dy + 3} ${cx + dx - 2},${winY - dy + 3} ${cx + dx - 2},${winY - dy + 10} ${cx - dx + 2},${winY + dy + 10}`}
              fill="none" stroke="var(--line-color)" strokeWidth="0.5"
              strokeLinecap="round" strokeLinejoin="round"
            />
          </g>
        );
      })}

      {/* ── ABSTRACT SCULPTURE ──
          Positioned outside the gallery near the left corner (bL.x-8, bL.y+4).
          Consists of: rectangular pedestal, circle on top, vertical line above. */}
      {(() => {
        const sx = bL.x - 8; // sculpture center x (8px left of building)
        const sy = bL.y + 4; // sculpture base y (4px below building left corner)
        return (
          <g>
            {/* Pedestal — square base, 8×8px */}
            <rect x={sx - 4} y={sy - 8} width={8} height={8} rx={0}
              fill="var(--bg-color)" stroke="var(--line-color)" strokeWidth="1"
              strokeLinecap="round" strokeLinejoin="round" />
            {/* Sphere — circle sitting on top of pedestal */}
            <circle cx={sx} cy={sy - 14} r={4}
              fill="none" stroke="var(--line-color)" strokeWidth="1.2" />
            {/* Vertical accent — line extending upward from sphere */}
            <line x1={sx} y1={sy - 18} x2={sx} y2={sy - 22}
              stroke="var(--line-color)" strokeWidth="1" strokeLinecap="round" />
          </g>
        );
      })()}

      {/* ── CORNICE LINES ──
          Decorative horizontal trim just below the roofline.
          Left cornice: bL → bB, 1px below wall-top.
          Right cornice: bB → bR, 1px below wall-top. */}
      <line x1={bL.x} y1={wL.y - 1} x2={bB.x} y2={wB.y - 1}
        stroke="var(--line-color)" strokeWidth="0.8" strokeLinecap="round" opacity={0.4} />
      <line x1={bB.x} y1={wB.y - 1} x2={bR.x} y2={wR.y - 1}
        stroke="var(--line-color)" strokeWidth="0.8" strokeLinecap="round" opacity={0.4} />
    </g>
  );
};
