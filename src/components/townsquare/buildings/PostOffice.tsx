import React from 'react';

/**
 * Isometric line-art SVG illustration of the Post Office building.
 *
 * Simplified isometric 3D building with flat roof and bell tower.
 * Traditional post office with shuttered windows, letter slot door,
 * mailbox out front, and flag pole.
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ ISOMETRIC GEOMETRY — same pattern as all buildings              │
 * │                                                                 │
 * │              bT (back)          Footprint center: (45, 72)      │
 * │             ╱    ╲              W=45, D=22, H=55                │
 * │    bL (left)      bR (right)                                    │
 * │             ╲    ╱                                               │
 * │              bB (front)                                          │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * Line art style: consistent stroke via var(--stroke-width) / var(--line-color),
 * strokeLinecap="round", strokeLinejoin="round" for hand-drawn feel.
 */
export const PostOffice: React.FC = () => {
  const W = 45; // half-width of building footprint
  const D = 22; // half-depth of building footprint
  const H = 55; // wall height

  // ── Ground-level diamond corners ──
  const bT = { x: 45, y: 72 - D };   // back corner
  const bR = { x: 45 + W, y: 72 };   // right corner
  const bB = { x: 45, y: 72 + D };   // front corner
  const bL = { x: 45 - W, y: 72 };   // left corner

  // ── Wall-top corners (base diamond shifted up by H) ──
  const wT = { x: bT.x, y: bT.y - H };
  const wR = { x: bR.x, y: bR.y - H };
  const wB = { x: bB.x, y: bB.y - H };
  const wL = { x: bL.x, y: bL.y - H };

  return (
    <g data-testid="building-post-office">

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
        fill="var(--accent-post-office)"
        stroke="var(--line-color)" strokeWidth="var(--stroke-width)"
        strokeLinecap="round" strokeLinejoin="round"
      />

      {/* ── RIGHT FACE (front-right wall, slightly darker) ──
          Points: bB(ground-front) → bR(ground-right) → wR(wall-right) → wB(wall-front) */}
      <polygon
        points={`${bB.x},${bB.y} ${bR.x},${bR.y} ${wR.x},${wR.y} ${wB.x},${wB.y}`}
        fill="var(--accent-post-office)"
        stroke="var(--line-color)" strokeWidth="var(--stroke-width)"
        strokeLinecap="round" strokeLinejoin="round"
        opacity={0.82}
      />

      {/* ── FLAT ROOF (top face — isometric diamond) ──
          Points: wT(back) → wR(right) → wB(front) → wL(left) */}
      <polygon
        points={`${wT.x},${wT.y} ${wR.x},${wR.y} ${wB.x},${wB.y} ${wL.x},${wL.y}`}
        fill="var(--accent-post-office)"
        stroke="var(--line-color)" strokeWidth="var(--stroke-width)"
        strokeLinecap="round" strokeLinejoin="round"
        opacity={0.55}
      />

      {/* ── ROOF PARAPET — left edge ──
          Points: wL(left-base) → wB(front-base) → wB-3(front-raised) → wL-3(left-raised) */}
      <polygon
        points={`${wL.x},${wL.y} ${wB.x},${wB.y} ${wB.x},${wB.y - 3} ${wL.x},${wL.y - 3}`}
        fill="var(--accent-post-office)" stroke="var(--line-color)" strokeWidth="1"
        strokeLinecap="round" strokeLinejoin="round" opacity={0.65}
      />

      {/* ── ROOF PARAPET — right edge ──
          Points: wB(front-base) → wR(right-base) → wR-3(right-raised) → wB-3(front-raised) */}
      <polygon
        points={`${wB.x},${wB.y} ${wR.x},${wR.y} ${wR.x},${wR.y - 3} ${wB.x},${wB.y - 3}`}
        fill="var(--accent-post-office)" stroke="var(--line-color)" strokeWidth="1"
        strokeLinecap="round" strokeLinejoin="round" opacity={0.55}
      />

      {/* ── BELL TOWER ──
          Small tower structure sitting on the roof center.
          ty = wT.y - 4 (base of tower, 4px above roof back corner). */}
      {(() => {
        const ty = wT.y - 4; // tower base y position
        return (
          <g>
            {/* Tower shaft — rectangular body, 8×12px
                Positioned at x=41, y=ty-14 */}
            <rect x={41} y={ty - 14} width={8} height={12} rx={0}
              fill="var(--accent-post-office)" stroke="var(--line-color)" strokeWidth="1"
              strokeLinecap="round" strokeLinejoin="round" />
            {/* Tower window — small opening in the shaft, 4×5px
                Positioned at x=43, y=ty-11 */}
            <rect x={43} y={ty - 11} width={4} height={5} rx={0.5}
              fill="var(--bg-color)" stroke="var(--line-color)" strokeWidth="0.8"
              strokeLinecap="round" strokeLinejoin="round" />
            {/* Tower cap — triangular roof on top of shaft
                Points: left-base(39) → peak(45, higher) → right-base(51) */}
            <polygon points={`39,${ty - 14} 45,${ty - 20} 51,${ty - 14}`}
              fill="var(--accent-post-office)" stroke="var(--line-color)" strokeWidth="1"
              strokeLinecap="round" strokeLinejoin="round" opacity={0.7} />
            {/* Tower spire — vertical line from cap peak upward */}
            <line x1={45} y1={ty - 20} x2={45} y2={ty - 26}
              stroke="var(--line-color)" strokeWidth="1.5" strokeLinecap="round" />
          </g>
        );
      })()}

      {/* ── LEFT FACE — SHUTTERED WINDOWS (2 windows) ──
          Positioned at 20% and 65% along the left face, at 55% wall height.
          Each window has a parallelogram frame, mullion cross, and two shutters. */}
      {[0.2, 0.65].map((t, i) => {
        const cx = bL.x + (bB.x - bL.x) * t; // window center x
        const cy = bL.y + (bB.y - bL.y) * t; // window center y
        const winY = cy - H * 0.55;            // window vertical position
        const ww = 8;                           // window width
        const wh = 14;                          // window height
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
            {/* Left shutter — narrow parallelogram to the left of window
                Points: outer-top → inner-top → inner-bottom → outer-bottom
                Offset 3px outward with 1.5px isometric y shift */}
            <polygon
              points={`${cx - dx - 3},${winY - dy - 1.5} ${cx - dx},${winY - dy} ${cx - dx},${winY - dy + wh} ${cx - dx - 3},${winY - dy + wh - 1.5}`}
              fill="var(--accent-post-office)" stroke="var(--line-color)" strokeWidth="0.8"
              strokeLinecap="round" strokeLinejoin="round"
            />
            {/* Right shutter — narrow parallelogram to the right of window
                Points: inner-top → outer-top → outer-bottom → inner-bottom */}
            <polygon
              points={`${cx + dx},${winY + dy} ${cx + dx + 3},${winY + dy + 1.5} ${cx + dx + 3},${winY + dy + wh + 1.5} ${cx + dx},${winY + dy + wh}`}
              fill="var(--accent-post-office)" stroke="var(--line-color)" strokeWidth="0.8"
              strokeLinecap="round" strokeLinejoin="round"
            />
          </g>
        );
      })}

      {/* ── LEFT FACE — DOOR WITH LETTER SLOT ──
          Positioned at 42% along the left face, from ground to 35% wall height.
          Includes transom window above, main door, letter slot, knob, and steps. */}
      {(() => {
        const t = 0.42;
        const cx = bL.x + (bB.x - bL.x) * t;
        const cy = bL.y + (bB.y - bL.y) * t;
        const doorTop = cy - H * 0.35; // top of door (35% up wall)
        const doorBot = cy;             // bottom of door (ground level)
        const dw = 9;                   // door width
        const dx = dw * 0.5;
        const dy = dw * 0.25;
        return (
          <g>
            {/* Transom — narrow horizontal window above the door
                Points: top-left → top-right → bottom-right → bottom-left
                4px tall strip above the door frame */}
            <polygon
              points={`${cx - dx},${doorTop - dy - 4} ${cx + dx},${doorTop + dy - 4} ${cx + dx},${doorTop + dy} ${cx - dx},${doorTop - dy}`}
              fill="var(--bg-color)" stroke="var(--line-color)" strokeWidth="1"
              strokeLinecap="round" strokeLinejoin="round"
            />
            {/* Door frame — isometric parallelogram
                Points: top-left → top-right → bottom-right → bottom-left */}
            <polygon
              points={`${cx - dx},${doorTop - dy} ${cx + dx},${doorTop + dy} ${cx + dx},${doorBot + dy} ${cx - dx},${doorBot - dy}`}
              fill="var(--bg-color)" stroke="var(--line-color)" strokeWidth="1.5"
              strokeLinecap="round" strokeLinejoin="round"
            />
            {/* Letter slot — small diamond-shaped mail slot on the door
                Points: left → right-upper → right-lower → left-lower */}
            <polygon
              points={`${cx - 3},${doorTop + 6} ${cx + 3},${doorTop + 8} ${cx + 3},${doorTop + 10} ${cx - 3},${doorTop + 8}`}
              fill="var(--line-color)" opacity={0.7}
            />
            {/* Door knob — small filled circle on right side of door */}
            <circle cx={cx + 2} cy={doorTop + (doorBot - doorTop) * 0.55} r={0.8}
              fill="var(--line-color)" />
            {/* Entry steps — isometric parallelogram below door
                Points: step-top-left → step-top-right → step-bottom-right → step-bottom-left */}
            <polygon
              points={`${cx - dx - 2},${doorBot - dy + 1} ${cx + dx + 2},${doorBot + dy + 1} ${cx + dx + 2},${doorBot + dy + 4} ${cx - dx - 2},${doorBot - dy + 4}`}
              fill="var(--bg-color)" stroke="var(--line-color)" strokeWidth="0.8"
              strokeLinecap="round" strokeLinejoin="round"
            />
          </g>
        );
      })()}

      {/* ── RIGHT FACE — UPPER WINDOWS (row of 3) ──
          Positioned along the right face at 55% wall height.
          Each window has mullion cross dividers. */}
      {[0.2, 0.5, 0.8].map((t, i) => {
        const cx = bB.x + (bR.x - bB.x) * t;
        const cy = bB.y + (bR.y - bB.y) * t;
        const winY = cy - H * 0.55;
        const ww = 7;
        const wh = 13;
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
            {/* Mullion — vertical center divider */}
            <line x1={cx} y1={winY} x2={cx} y2={winY + wh}
              stroke="var(--line-color)" strokeWidth="0.5" strokeLinecap="round" />
            {/* Mullion — horizontal center divider (follows isometric angle) */}
            <line x1={cx - dx} y1={winY + dy + wh * 0.5} x2={cx + dx} y2={winY - dy + wh * 0.5}
              stroke="var(--line-color)" strokeWidth="0.5" strokeLinecap="round" />
          </g>
        );
      })}

      {/* ── RIGHT FACE — LOWER WINDOWS (row of 3) ──
          Smaller windows at 22% wall height. */}
      {[0.2, 0.5, 0.8].map((t, i) => {
        const cx = bB.x + (bR.x - bB.x) * t;
        const cy = bB.y + (bR.y - bB.y) * t;
        const winY = cy - H * 0.22;
        const ww = 7;
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

      {/* ── MAILBOX ──
          Freestanding mailbox positioned outside the building (bL.x-10, bL.y+6).
          Consists of: rounded box body, curved top, mail slot, and post. */}
      {(() => {
        const mx = bL.x - 10; // mailbox center x (10px left of building)
        const my = bL.y + 6;  // mailbox base y (6px below building left corner)
        return (
          <g>
            {/* Mailbox body — rounded rectangle, 10×10px */}
            <rect x={mx - 5} y={my - 12} width={10} height={10} rx={2}
              fill="var(--accent-post-office)" stroke="var(--line-color)" strokeWidth="1.5"
              strokeLinecap="round" strokeLinejoin="round" />
            {/* Mailbox curved top — quadratic bezier arc above the body
                From left-top corner, curves up through center, to right-top corner */}
            <path d={`M${mx - 5},${my - 12} Q${mx},${my - 17} ${mx + 5},${my - 12}`}
              fill="var(--accent-post-office)" stroke="var(--line-color)" strokeWidth="1.2"
              strokeLinecap="round" strokeLinejoin="round" />
            {/* Mail slot — small dark rectangle on the front of the mailbox */}
            <rect x={mx - 2.5} y={my - 9} width={5} height={2} rx={0.5}
              fill="var(--line-color)" opacity={0.8} />
            {/* Post — thick vertical line supporting the mailbox */}
            <line x1={mx} y1={my - 2} x2={mx} y2={my + 8}
              stroke="var(--line-color)" strokeWidth="2.5" strokeLinecap="round" />
          </g>
        );
      })()}

      {/* ── FLAG POLE ──
          Positioned near the front-right of the building (bB.x+8, bB.y-2).
          Vertical pole with triangular flag at the top. */}
      {(() => {
        const fx = bB.x + 8; // flag pole x position
        const fy = bB.y - 2; // flag pole base y position
        return (
          <g>
            {/* Pole — vertical line from base to top */}
            <line x1={fx} y1={fy} x2={fx} y2={fy - 30}
              stroke="var(--line-color)" strokeWidth="1.5" strokeLinecap="round" />
            {/* Flag — triangular pennant at the top of the pole
                Points: pole-top(fx, fy-30) → pole-mid(fx, fy-22) → flag-tip(fx+8, fy-26) */}
            <polygon
              points={`${fx},${fy - 30} ${fx},${fy - 22} ${fx + 8},${fy - 26}`}
              fill="var(--accent-post-office)" stroke="var(--line-color)" strokeWidth="0.8"
              strokeLinecap="round" strokeLinejoin="round"
            />
          </g>
        );
      })()}

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
