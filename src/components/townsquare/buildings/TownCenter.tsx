import React from 'react';

/**
 * Isometric line-art SVG illustration of the Town Center building.
 *
 * Simplified isometric 3D building with three visible faces (top, left, right).
 * Grand civic building with flat roof, cupola/spire, arched windows, and double doors.
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ ISOMETRIC GEOMETRY REFERENCE                                    │
 * │                                                                 │
 * │ The building footprint is a diamond (rhombus) on the ground:    │
 * │                                                                 │
 * │              bT (back/top)                                      │
 * │             ╱    ╲                                               │
 * │           ╱        ╲                                             │
 * │    bL (left)      bR (right)                                    │
 * │           ╲        ╱                                             │
 * │             ╲    ╱                                               │
 * │              bB (front/bottom)                                   │
 * │                                                                 │
 * │ Walls rise vertically from base → wall-top (wT, wR, wB, wL).   │
 * │ Three visible faces: left wall, right wall, flat roof (top).    │
 * │                                                                 │
 * │ Polygon point order: always clockwise from viewer perspective.  │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * Line art style: consistent stroke via var(--stroke-width) / var(--line-color),
 * strokeLinecap="round", strokeLinejoin="round" for hand-drawn feel.
 */
export const TownCenter: React.FC = () => {
  const W = 60; // half-width of building footprint (left-right extent)
  const D = 30; // half-depth of building footprint (front-back extent)
  const H = 70; // wall height (vertical rise from ground to roof)

  // ── Ground-level diamond corners (base of building) ──
  // Center of footprint is at (60, 90)
  const bT = { x: 60, y: 90 - D };   // back corner (top of diamond)
  const bR = { x: 60 + W, y: 90 };   // right corner
  const bB = { x: 60, y: 90 + D };   // front corner (bottom of diamond)
  const bL = { x: 60 - W, y: 90 };   // left corner

  // ── Wall-top corners (same diamond shifted up by H) ──
  const wT = { x: bT.x, y: bT.y - H }; // back corner at roof level
  const wR = { x: bR.x, y: bR.y - H }; // right corner at roof level
  const wB = { x: bB.x, y: bB.y - H }; // front corner at roof level
  const wL = { x: bL.x, y: bL.y - H }; // left corner at roof level

  return (
    <g data-testid="building-town-center">

      {/* ── GROUND SHADOW ──
          Diamond on the ground plane matching the building footprint.
          Points: bT(back) → bR(right) → bB(front) → bL(left)
          Very low opacity dark fill to simulate shadow. */}
      <polygon
        points={`${bT.x},${bT.y} ${bR.x},${bR.y} ${bB.x},${bB.y} ${bL.x},${bL.y}`}
        fill="var(--line-color)" opacity={0.08}
      />

      {/* ── LEFT FACE (front-left wall, visible to viewer) ──
          Parallelogram from ground-left → ground-front → wall-front → wall-left.
          Points: bL(ground-left) → bB(ground-front) → wB(wall-front) → wL(wall-left)
          This is the brighter of the two wall faces. */}
      <polygon
        points={`${bL.x},${bL.y} ${bB.x},${bB.y} ${wB.x},${wB.y} ${wL.x},${wL.y}`}
        fill="var(--accent-town-center)"
        stroke="var(--line-color)" strokeWidth="var(--stroke-width)"
        strokeLinecap="round" strokeLinejoin="round"
      />

      {/* ── RIGHT FACE (front-right wall, visible to viewer) ──
          Parallelogram from ground-front → ground-right → wall-right → wall-front.
          Points: bB(ground-front) → bR(ground-right) → wR(wall-right) → wB(wall-front)
          Slightly darker (opacity 0.82) to simulate shadow on this face. */}
      <polygon
        points={`${bB.x},${bB.y} ${bR.x},${bR.y} ${wR.x},${wR.y} ${wB.x},${wB.y}`}
        fill="var(--accent-town-center)"
        stroke="var(--line-color)" strokeWidth="var(--stroke-width)"
        strokeLinecap="round" strokeLinejoin="round"
        opacity={0.82}
      />

      {/* ── FLAT ROOF (top face — isometric diamond) ──
          Diamond at wall-top level showing the roof surface.
          Points: wT(back) → wR(right) → wB(front) → wL(left)
          Lower opacity to appear lighter than walls. */}
      <polygon
        points={`${wT.x},${wT.y} ${wR.x},${wR.y} ${wB.x},${wB.y} ${wL.x},${wL.y}`}
        fill="var(--accent-town-center)"
        stroke="var(--line-color)" strokeWidth="var(--stroke-width)"
        strokeLinecap="round" strokeLinejoin="round"
        opacity={0.55}
      />

      {/* ── ROOF PARAPET — left edge ──
          Thin raised strip along the left-front edge of the roof.
          Points: wL(left-base) → wB(front-base) → wB-3(front-raised) → wL-3(left-raised)
          Creates a small lip/wall at the roof edge. */}
      <polygon
        points={`${wL.x},${wL.y} ${wB.x},${wB.y} ${wB.x},${wB.y - 3} ${wL.x},${wL.y - 3}`}
        fill="var(--accent-town-center)" stroke="var(--line-color)" strokeWidth="1"
        strokeLinecap="round" strokeLinejoin="round" opacity={0.65}
      />

      {/* ── ROOF PARAPET — right edge ──
          Thin raised strip along the right-front edge of the roof.
          Points: wB(front-base) → wR(right-base) → wR-3(right-raised) → wB-3(front-raised) */}
      <polygon
        points={`${wB.x},${wB.y} ${wR.x},${wR.y} ${wR.x},${wR.y - 3} ${wB.x},${wB.y - 3}`}
        fill="var(--accent-town-center)" stroke="var(--line-color)" strokeWidth="1"
        strokeLinecap="round" strokeLinejoin="round" opacity={0.55}
      />

      {/* ── CUPOLA BASE ──
          Small rectangular tower sitting on the roof center.
          Positioned at x=54, y=wT.y-18, 12px wide × 14px tall. */}
      <rect x={54} y={wT.y - 18} width={12} height={14} rx={1}
        fill="var(--accent-town-center)" stroke="var(--line-color)" strokeWidth="1.2"
        strokeLinecap="round" strokeLinejoin="round" />

      {/* ── CUPOLA WINDOW ──
          Small window opening in the cupola.
          Positioned at x=57, y=wT.y-15, 6px wide × 6px tall. */}
      <rect x={57} y={wT.y - 15} width={6} height={6} rx={0.5}
        fill="var(--bg-color)" stroke="var(--line-color)" strokeWidth="0.8"
        strokeLinecap="round" strokeLinejoin="round" />

      {/* ── CUPOLA CAP ──
          Triangular roof on top of the cupola.
          Points: left-base(52) → peak(60, higher) → right-base(68) */}
      <polygon
        points={`52,${wT.y - 18} 60,${wT.y - 26} 68,${wT.y - 18}`}
        fill="var(--accent-town-center)" stroke="var(--line-color)" strokeWidth="1.2"
        strokeLinecap="round" strokeLinejoin="round" opacity={0.7}
      />

      {/* ── SPIRE ──
          Vertical line extending upward from the cupola cap peak.
          From cupola peak (y=wT.y-26) up to spire tip (y=wT.y-36). */}
      <line x1={60} y1={wT.y - 26} x2={60} y2={wT.y - 36}
        stroke="var(--line-color)" strokeWidth="1.5" strokeLinecap="round" />

      {/* ── FLAG ──
          Small triangular flag at the top of the spire.
          Points: pole-top(60, wT.y-36) → pole-mid(60, wT.y-30) → flag-tip(68, wT.y-33) */}
      <polygon
        points={`60,${wT.y - 36} 60,${wT.y - 30} 68,${wT.y - 33}`}
        fill="var(--accent-town-center)" stroke="var(--line-color)" strokeWidth="0.8"
        strokeLinecap="round" strokeLinejoin="round"
      />

      {/* ── LEFT FACE — ROW OF 3 ARCHED WINDOWS (upper) ──
          Windows are isometric parallelograms placed along the left face.
          Each window is positioned at t% along the bL→bB edge, raised to 60% wall height.
          Window shape: parallelogram with arch curve on top.
          - dx/dy: half-width offsets accounting for isometric skew
          - Points: top-left → top-right → bottom-right → bottom-left */}
      {[0.18, 0.42, 0.66].map((t, i) => {
        const cx = bL.x + (bB.x - bL.x) * t; // x center along left face
        const cy = bL.y + (bB.y - bL.y) * t; // y center along left face
        const winY = cy - H * 0.6;            // window vertical position (60% up wall)
        const ww = 8;                          // window width along face
        const wh = 14;                         // window height
        const dx = ww * 0.5;                   // isometric x half-offset
        const dy = ww * 0.25;                  // isometric y half-offset (30° angle)
        return (
          <g key={`lwin-${i}`}>
            {/* Window frame — isometric parallelogram
                Points: top-left(cx-dx, winY-dy) → top-right(cx+dx, winY+dy)
                      → bottom-right(cx+dx, winY+dy+wh) → bottom-left(cx-dx, winY-dy+wh) */}
            <polygon
              points={`${cx - dx},${winY - dy} ${cx + dx},${winY + dy} ${cx + dx},${winY + dy + wh} ${cx - dx},${winY - dy + wh}`}
              fill="var(--bg-color)" stroke="var(--line-color)" strokeWidth="1.2"
              strokeLinecap="round" strokeLinejoin="round"
            />
            {/* Arch curve above window — quadratic bezier
                From top-left corner, curves up through center, to top-right corner */}
            <path
              d={`M${cx - dx},${winY - dy} Q${cx},${winY - dy - 4} ${cx + dx},${winY + dy}`}
              fill="var(--bg-color)" stroke="var(--line-color)" strokeWidth="1.2"
              strokeLinecap="round" strokeLinejoin="round"
            />
            {/* Mullion — vertical divider line through window center */}
            <line x1={cx} y1={winY - dy - 2} x2={cx} y2={winY + wh}
              stroke="var(--line-color)" strokeWidth="0.5" strokeLinecap="round" />
          </g>
        );
      })}

      {/* ── LEFT FACE — GRAND DOUBLE DOOR ──
          Positioned at 42% along the left face, spanning ground to 32% wall height.
          Includes door frame, center split line, pediment above, and entry steps. */}
      {(() => {
        const t = 0.42;
        const cx = bL.x + (bB.x - bL.x) * t; // door center x along left face
        const cy = bL.y + (bB.y - bL.y) * t; // door center y along left face
        const doorTop = cy - H * 0.32;         // top of door (32% up wall)
        const doorBot = cy;                     // bottom of door (ground level)
        const dw = 12;                          // door width
        const dx = dw * 0.5;                    // isometric x half-offset
        const dy = dw * 0.25;                   // isometric y half-offset
        return (
          <g>
            {/* Door frame — isometric parallelogram
                Points: top-left → top-right → bottom-right → bottom-left */}
            <polygon
              points={`${cx - dx},${doorTop - dy} ${cx + dx},${doorTop + dy} ${cx + dx},${doorBot + dy} ${cx - dx},${doorBot - dy}`}
              fill="var(--bg-color)" stroke="var(--line-color)" strokeWidth="1.5"
              strokeLinecap="round" strokeLinejoin="round"
            />
            {/* Door split — vertical center line dividing the double doors */}
            <line x1={cx} y1={doorTop} x2={cx} y2={doorBot}
              stroke="var(--line-color)" strokeWidth="0.8" strokeLinecap="round" />
            {/* Pediment — triangular decorative element above door
                Points: left-base → peak(center, higher) → right-base */}
            <polygon
              points={`${cx - dx - 2},${doorTop - dy - 1} ${cx},${doorTop - dy - 1} ${cx + dx + 1},${doorTop + dy - 1}`}
              fill="var(--bg-color)" stroke="var(--line-color)" strokeWidth="1"
              strokeLinecap="round" strokeLinejoin="round"
            />
            {/* Entry steps — isometric parallelogram below door
                Points: step-top-left → step-top-right → step-bottom-right → step-bottom-left */}
            <polygon
              points={`${cx - dx - 3},${doorBot - dy} ${cx + dx + 3},${doorBot + dy + 2} ${cx + dx},${doorBot + dy + 7} ${cx - dx - 5},${doorBot - dy + 5}`}
              fill="var(--bg-color)" stroke="var(--line-color)" strokeWidth="0.8"
              strokeLinecap="round" strokeLinejoin="round"
            />
          </g>
        );
      })()}

      {/* ── RIGHT FACE — UPPER WINDOWS (row of 3) ──
          Windows placed along the right face (bB→bR edge) at 60% wall height.
          Right-face parallelograms are mirrored: isometric skew goes the other way.
          - Points: bottom-left(cx-dx, winY+dy) → top-right(cx+dx, winY-dy)
                  → bottom-right(cx+dx, winY-dy+wh) → bottom-left(cx-dx, winY+dy+wh) */}
      {[0.2, 0.45, 0.7].map((t, i) => {
        const cx = bB.x + (bR.x - bB.x) * t; // x center along right face
        const cy = bB.y + (bR.y - bB.y) * t; // y center along right face
        const winY = cy - H * 0.6;            // window vertical position
        const ww = 8;
        const wh = 14;
        const dx = ww * 0.5;
        const dy = ww * 0.25;
        return (
          <g key={`rwin-${i}`}>
            {/* Window frame — right-face isometric parallelogram */}
            <polygon
              points={`${cx - dx},${winY + dy} ${cx + dx},${winY - dy} ${cx + dx},${winY - dy + wh} ${cx - dx},${winY + dy + wh}`}
              fill="var(--bg-color)" stroke="var(--line-color)" strokeWidth="1.2"
              strokeLinecap="round" strokeLinejoin="round"
            />
            {/* Arch curve above window */}
            <path
              d={`M${cx - dx},${winY + dy} Q${cx},${winY - 4} ${cx + dx},${winY - dy}`}
              fill="var(--bg-color)" stroke="var(--line-color)" strokeWidth="1.2"
              strokeLinecap="round" strokeLinejoin="round"
            />
            {/* Mullion — vertical center divider */}
            <line x1={cx} y1={winY - 2} x2={cx} y2={winY + wh}
              stroke="var(--line-color)" strokeWidth="0.5" strokeLinecap="round" />
          </g>
        );
      })}

      {/* ── RIGHT FACE — LOWER WINDOWS (row of 3) ──
          Smaller windows at 25% wall height on the right face. */}
      {[0.2, 0.45, 0.7].map((t, i) => {
        const cx = bB.x + (bR.x - bB.x) * t;
        const cy = bB.y + (bR.y - bB.y) * t;
        const winY = cy - H * 0.25;
        const ww = 8;
        const wh = 12;
        const dx = ww * 0.5;
        const dy = ww * 0.25;
        return (
          <g key={`rwin-lower-${i}`}>
            {/* Window frame — right-face isometric parallelogram */}
            <polygon
              points={`${cx - dx},${winY + dy} ${cx + dx},${winY - dy} ${cx + dx},${winY - dy + wh} ${cx - dx},${winY + dy + wh}`}
              fill="var(--bg-color)" stroke="var(--line-color)" strokeWidth="1"
              strokeLinecap="round" strokeLinejoin="round"
            />
            {/* Mullion — vertical center divider */}
            <line x1={cx} y1={winY} x2={cx} y2={winY + wh}
              stroke="var(--line-color)" strokeWidth="0.4" strokeLinecap="round" />
          </g>
        );
      })}

      {/* ── CORNICE LINES ──
          Decorative horizontal trim lines just below the roofline.
          Left cornice: from bL(left) to bB(front), 3px below wall-top.
          Right cornice: from bB(front) to bR(right), 3px below wall-top. */}
      <line x1={bL.x} y1={wL.y - 3} x2={bB.x} y2={wB.y - 3}
        stroke="var(--line-color)" strokeWidth="0.8" strokeLinecap="round" opacity={0.5}
      />
      <line x1={bB.x} y1={wB.y - 3} x2={bR.x} y2={wR.y - 3}
        stroke="var(--line-color)" strokeWidth="0.8" strokeLinecap="round" opacity={0.5}
      />
    </g>
  );
};
