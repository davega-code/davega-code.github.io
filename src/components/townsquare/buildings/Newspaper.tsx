import React from 'react';

/**
 * Isometric line-art SVG illustration of the Newspaper building.
 *
 * Simplified isometric 3D building with flat roof.
 * Craftsman-style newspaper office with large display windows,
 * chimney, stacked newspaper bundles, and a front door.
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ ISOMETRIC GEOMETRY — same pattern as all buildings              │
 * │                                                                 │
 * │              bT (back)          Footprint center: (50, 75)      │
 * │             ╱    ╲              W=50, D=25, H=55                │
 * │    bL (left)      bR (right)                                    │
 * │             ╲    ╱                                               │
 * │              bB (front)                                          │
 * │                                                                 │
 * │ Walls: bL→bB→wB→wL (left face), bB→bR→wR→wB (right face)     │
 * │ Roof: wT→wR→wB→wL (flat top diamond)                          │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * Line art style: consistent stroke via var(--stroke-width) / var(--line-color),
 * strokeLinecap="round", strokeLinejoin="round" for hand-drawn feel.
 */
export const Newspaper: React.FC = () => {
  const W = 50; // half-width of building footprint
  const D = 25; // half-depth of building footprint
  const H = 55; // wall height

  // ── Ground-level diamond corners ──
  const bT = { x: 50, y: 75 - D };   // back corner
  const bR = { x: 50 + W, y: 75 };   // right corner
  const bB = { x: 50, y: 75 + D };   // front corner
  const bL = { x: 50 - W, y: 75 };   // left corner

  // ── Wall-top corners (base diamond shifted up by H) ──
  const wT = { x: bT.x, y: bT.y - H };
  const wR = { x: bR.x, y: bR.y - H };
  const wB = { x: bB.x, y: bB.y - H };
  const wL = { x: bL.x, y: bL.y - H };

  return (
    <g data-testid="building-newspaper">

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
        fill="var(--accent-newspaper)"
        stroke="var(--line-color)" strokeWidth="var(--stroke-width)"
        strokeLinecap="round" strokeLinejoin="round"
      />

      {/* ── RIGHT FACE (front-right wall, slightly darker) ──
          Points: bB(ground-front) → bR(ground-right) → wR(wall-right) → wB(wall-front) */}
      <polygon
        points={`${bB.x},${bB.y} ${bR.x},${bR.y} ${wR.x},${wR.y} ${wB.x},${wB.y}`}
        fill="var(--accent-newspaper)"
        stroke="var(--line-color)" strokeWidth="var(--stroke-width)"
        strokeLinecap="round" strokeLinejoin="round"
        opacity={0.82}
      />

      {/* ── FLAT ROOF (top face — isometric diamond) ──
          Points: wT(back) → wR(right) → wB(front) → wL(left) */}
      <polygon
        points={`${wT.x},${wT.y} ${wR.x},${wR.y} ${wB.x},${wB.y} ${wL.x},${wL.y}`}
        fill="var(--accent-newspaper)"
        stroke="var(--line-color)" strokeWidth="var(--stroke-width)"
        strokeLinecap="round" strokeLinejoin="round"
        opacity={0.55}
      />

      {/* ── ROOF PARAPET — left edge ──
          Thin raised strip along left-front roof edge.
          Points: wL(left-base) → wB(front-base) → wB-3(front-raised) → wL-3(left-raised) */}
      <polygon
        points={`${wL.x},${wL.y} ${wB.x},${wB.y} ${wB.x},${wB.y - 3} ${wL.x},${wL.y - 3}`}
        fill="var(--accent-newspaper)" stroke="var(--line-color)" strokeWidth="1"
        strokeLinecap="round" strokeLinejoin="round" opacity={0.65}
      />

      {/* ── ROOF PARAPET — right edge ──
          Points: wB(front-base) → wR(right-base) → wR-3(right-raised) → wB-3(front-raised) */}
      <polygon
        points={`${wB.x},${wB.y} ${wR.x},${wR.y} ${wR.x},${wR.y - 3} ${wB.x},${wB.y - 3}`}
        fill="var(--accent-newspaper)" stroke="var(--line-color)" strokeWidth="1"
        strokeLinecap="round" strokeLinejoin="round" opacity={0.55}
      />

      {/* ── CHIMNEY ──
          Rectangular chimney on the right side of the roof.
          cx is 12px left of bR, cy is at wall-top minus 4px. */}
      {(() => {
        const cx = bR.x - 12; // chimney center x
        const cy = bR.y - H - 4; // chimney base y (just above roof)
        return (
          <g>
            {/* Chimney shaft — tall narrow rectangle
                8px wide × 20px tall, positioned above roof level */}
            <rect x={cx - 4} y={cy - 16} width={8} height={20} rx={0}
              fill="var(--accent-newspaper)" stroke="var(--line-color)" strokeWidth="1.2"
              strokeLinecap="round" strokeLinejoin="round" />
            {/* Chimney cap — wider rectangle at the top
                10px wide × 3px tall, overhangs the shaft by 1px each side */}
            <rect x={cx - 5} y={cy - 18} width={10} height={3} rx={0}
              fill="var(--accent-newspaper)" stroke="var(--line-color)" strokeWidth="1"
              strokeLinecap="round" strokeLinejoin="round" />
          </g>
        );
      })()}

      {/* ── LEFT FACE — LARGE DISPLAY WINDOWS (2 windows) ──
          Positioned at 22% and 58% along the left face, at 55% wall height.
          Each window is an isometric parallelogram with mullion cross. */}
      {[0.22, 0.58].map((t, i) => {
        const cx = bL.x + (bB.x - bL.x) * t; // window center x along left face
        const cy = bL.y + (bB.y - bL.y) * t; // window center y along left face
        const winY = cy - H * 0.55;            // window vertical position
        const ww = 10;                          // window width
        const wh = 16;                          // window height
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
            {/* Mullion — vertical center divider */}
            <line x1={cx} y1={winY} x2={cx} y2={winY + wh}
              stroke="var(--line-color)" strokeWidth="0.5" strokeLinecap="round" />
            {/* Mullion — horizontal center divider (follows isometric angle) */}
            <line x1={cx - dx} y1={winY - dy + wh * 0.5} x2={cx + dx} y2={winY + dy + wh * 0.5}
              stroke="var(--line-color)" strokeWidth="0.5" strokeLinecap="round" />
          </g>
        );
      })}

      {/* ── LEFT FACE — FRONT DOOR ──
          Positioned at 40% along the left face, from ground to 30% wall height.
          Includes door frame, center split, and door knob. */}
      {(() => {
        const t = 0.4;
        const cx = bL.x + (bB.x - bL.x) * t;
        const cy = bL.y + (bB.y - bL.y) * t;
        const doorTop = cy - H * 0.3;  // top of door (30% up wall)
        const doorBot = cy;              // bottom of door (ground level)
        const dw = 9;                    // door width
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
            {/* Door split — vertical center line */}
            <line x1={cx} y1={doorTop} x2={cx} y2={doorBot}
              stroke="var(--line-color)" strokeWidth="0.6" strokeLinecap="round" />
            {/* Door knob — small filled circle on right door panel */}
            <circle cx={cx + 2} cy={doorTop + (doorBot - doorTop) * 0.6} r={0.8}
              fill="var(--line-color)" />
          </g>
        );
      })()}

      {/* ── NEWSPAPER BUNDLES ──
          Three stacked rectangular bundles near the door (at 58% along left face).
          Each bundle is a small rect, stacked vertically. */}
      {(() => {
        const t = 0.58;
        const cx = bL.x + (bB.x - bL.x) * t;
        const cy = bL.y + (bB.y - bL.y) * t;
        return (
          <g>
            {/* Bottom bundle */}
            <rect x={cx - 2} y={cy - 8} width={6} height={3} rx={0.5}
              fill="var(--bg-color)" stroke="var(--line-color)" strokeWidth="0.8"
              strokeLinecap="round" strokeLinejoin="round" />
            {/* Middle bundle */}
            <rect x={cx - 2} y={cy - 11} width={6} height={3} rx={0.5}
              fill="var(--bg-color)" stroke="var(--line-color)" strokeWidth="0.8"
              strokeLinecap="round" strokeLinejoin="round" />
            {/* Top bundle */}
            <rect x={cx - 2} y={cy - 14} width={6} height={3} rx={0.5}
              fill="var(--bg-color)" stroke="var(--line-color)" strokeWidth="0.8"
              strokeLinecap="round" strokeLinejoin="round" />
          </g>
        );
      })()}

      {/* ── RIGHT FACE — UPPER WINDOWS (row of 3) ──
          Positioned along the right face (bB→bR edge) at 55% wall height.
          Right-face parallelograms have mirrored isometric skew. */}
      {[0.22, 0.5, 0.78].map((t, i) => {
        const cx = bB.x + (bR.x - bB.x) * t;
        const cy = bB.y + (bR.y - bB.y) * t;
        const winY = cy - H * 0.55;
        const ww = 8;
        const wh = 14;
        const dx = ww * 0.5;
        const dy = ww * 0.25;
        return (
          <g key={`rwin-${i}`}>
            {/* Window frame — right-face isometric parallelogram
                Points: bottom-left(cx-dx, winY+dy) → top-right(cx+dx, winY-dy)
                      → bottom-right(cx+dx, winY-dy+wh) → bottom-left(cx-dx, winY+dy+wh) */}
            <polygon
              points={`${cx - dx},${winY + dy} ${cx + dx},${winY - dy} ${cx + dx},${winY - dy + wh} ${cx - dx},${winY + dy + wh}`}
              fill="var(--bg-color)" stroke="var(--line-color)" strokeWidth="1.2"
              strokeLinecap="round" strokeLinejoin="round"
            />
            {/* Mullion — vertical center divider */}
            <line x1={cx} y1={winY} x2={cx} y2={winY + wh}
              stroke="var(--line-color)" strokeWidth="0.4" strokeLinecap="round" />
          </g>
        );
      })}

      {/* ── RIGHT FACE — LOWER WINDOWS (row of 3) ──
          Smaller windows at 22% wall height on the right face. */}
      {[0.22, 0.5, 0.78].map((t, i) => {
        const cx = bB.x + (bR.x - bB.x) * t;
        const cy = bB.y + (bR.y - bB.y) * t;
        const winY = cy - H * 0.22;
        const ww = 8;
        const wh = 10;
        const dx = ww * 0.5;
        const dy = ww * 0.25;
        return (
          <g key={`rwin-l-${i}`}>
            {/* Window frame — right-face isometric parallelogram */}
            <polygon
              points={`${cx - dx},${winY + dy} ${cx + dx},${winY - dy} ${cx + dx},${winY - dy + wh} ${cx - dx},${winY + dy + wh}`}
              fill="var(--bg-color)" stroke="var(--line-color)" strokeWidth="1"
              strokeLinecap="round" strokeLinejoin="round"
            />
          </g>
        );
      })}

      {/* ── CORNICE LINES ──
          Decorative horizontal trim just below the roofline.
          Left cornice: bL → bB, 2px below wall-top.
          Right cornice: bB → bR, 2px below wall-top. */}
      <line x1={bL.x} y1={wL.y - 2} x2={bB.x} y2={wB.y - 2}
        stroke="var(--line-color)" strokeWidth="0.8" strokeLinecap="round" opacity={0.4} />
      <line x1={bB.x} y1={wB.y - 2} x2={bR.x} y2={wR.y - 2}
        stroke="var(--line-color)" strokeWidth="0.8" strokeLinecap="round" opacity={0.4} />
    </g>
  );
};
