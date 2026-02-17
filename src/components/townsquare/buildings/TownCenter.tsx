import React from 'react';

/**
 * Isometric line-art SVG illustration of the Town Center building.
 *
 * True isometric 3D building with three visible faces (top, left, right).
 * Grand civic building with cupola, arched windows, columns, and double doors.
 * The building is drawn as a self-contained isometric illustration.
 *
 * Isometric angles: left face goes down-left at 30°, right face goes down-right at 30°.
 * Building dimensions: ~120w × ~140h (including roof/cupola).
 */
export const TownCenter: React.FC = () => {
  // Isometric building geometry constants
  // Base footprint center at (60, 90), building rises upward
  const W = 60; // half-width of the building footprint
  const D = 30; // half-depth
  const H = 70; // wall height
  const roofH = 25; // roof peak height above walls

  // Ground-level diamond (base of building)
  const baseTop = { x: 60, y: 90 - D };       // back
  const baseRight = { x: 60 + W, y: 90 };      // right
  const baseBottom = { x: 60, y: 90 + D };      // front
  const baseLeft = { x: 60 - W, y: 90 };        // left

  // Top of walls (same diamond, shifted up by H)
  const wallTop = { x: baseTop.x, y: baseTop.y - H };
  const wallRight = { x: baseRight.x, y: baseRight.y - H };
  const wallBottom = { x: baseBottom.x, y: baseBottom.y - H };
  const wallLeft = { x: baseLeft.x, y: baseLeft.y - H };

  // Roof peak
  const roofPeak = { x: 60, y: wallTop.y - roofH };

  return (
    <g data-testid="building-town-center">
      {/* ── Ground shadow ── */}
      <polygon
        points={`${baseTop.x},${baseTop.y} ${baseRight.x},${baseRight.y} ${baseBottom.x},${baseBottom.y} ${baseLeft.x},${baseLeft.y}`}
        fill="var(--line-color)" opacity={0.08}
      />

      {/* ══════════════════════════════════════
          LEFT FACE (front-left wall)
          ══════════════════════════════════════ */}
      <polygon
        points={`${baseLeft.x},${baseLeft.y} ${baseBottom.x},${baseBottom.y} ${wallBottom.x},${wallBottom.y} ${wallLeft.x},${wallLeft.y}`}
        fill="var(--accent-town-center)"
        stroke="var(--line-color)"
        strokeWidth="var(--stroke-width)"
        strokeLinejoin="round"
      />

      {/* ══════════════════════════════════════
          RIGHT FACE (front-right wall)
          ══════════════════════════════════════ */}
      <polygon
        points={`${baseBottom.x},${baseBottom.y} ${baseRight.x},${baseRight.y} ${wallRight.x},${wallRight.y} ${wallBottom.x},${wallBottom.y}`}
        fill="var(--accent-town-center)"
        stroke="var(--line-color)"
        strokeWidth="var(--stroke-width)"
        strokeLinejoin="round"
        opacity={0.82}
      />

      {/* ══════════════════════════════════════
          ROOF — two sloping faces
          ══════════════════════════════════════ */}
      {/* Left roof slope */}
      <polygon
        points={`${wallLeft.x},${wallLeft.y} ${wallBottom.x},${wallBottom.y} ${roofPeak.x},${roofPeak.y - D}`}
        fill="var(--accent-town-center)"
        stroke="var(--line-color)"
        strokeWidth="var(--stroke-width)"
        strokeLinejoin="round"
        opacity={0.6}
      />
      {/* Right roof slope */}
      <polygon
        points={`${wallBottom.x},${wallBottom.y} ${wallRight.x},${wallRight.y} ${roofPeak.x},${roofPeak.y - D}`}
        fill="var(--accent-town-center)"
        stroke="var(--line-color)"
        strokeWidth="var(--stroke-width)"
        strokeLinejoin="round"
        opacity={0.5}
      />
      {/* Roof ridge line (back slopes - partially visible) */}
      <polygon
        points={`${wallLeft.x},${wallLeft.y} ${wallTop.x},${wallTop.y} ${roofPeak.x},${roofPeak.y - D}`}
        fill="var(--accent-town-center)"
        stroke="var(--line-color)"
        strokeWidth="1"
        strokeLinejoin="round"
        opacity={0.45}
      />
      <polygon
        points={`${wallTop.x},${wallTop.y} ${wallRight.x},${wallRight.y} ${roofPeak.x},${roofPeak.y - D}`}
        fill="var(--accent-town-center)"
        stroke="var(--line-color)"
        strokeWidth="1"
        strokeLinejoin="round"
        opacity={0.4}
      />

      {/* ══════════════════════════════════════
          CUPOLA on roof ridge
          ══════════════════════════════════════ */}
      {/* Cupola base */}
      <rect x={54} y={roofPeak.y - D - 18} width={12} height={14} rx={1}
        fill="var(--accent-town-center)" stroke="var(--line-color)" strokeWidth="1.2" />
      {/* Cupola window */}
      <rect x={57} y={roofPeak.y - D - 15} width={6} height={6} rx={0.5}
        fill="var(--bg-color)" stroke="var(--line-color)" strokeWidth="0.8" />
      {/* Cupola roof */}
      <polygon
        points={`52,${roofPeak.y - D - 18} 60,${roofPeak.y - D - 26} 68,${roofPeak.y - D - 18}`}
        fill="var(--accent-town-center)" stroke="var(--line-color)" strokeWidth="1"
        opacity={0.7}
      />
      {/* Spire */}
      <line x1={60} y1={roofPeak.y - D - 26} x2={60} y2={roofPeak.y - D - 36}
        stroke="var(--line-color)" strokeWidth="1.5" />
      {/* Flag */}
      <polygon
        points={`60,${roofPeak.y - D - 36} 60,${roofPeak.y - D - 30} 68,${roofPeak.y - D - 33}`}
        fill="var(--accent-town-center)" stroke="var(--line-color)" strokeWidth="0.8"
      />

      {/* ══════════════════════════════════════
          LEFT FACE DETAILS — Windows & Door
          ══════════════════════════════════════ */}
      {/* The left face runs from baseLeft to baseBottom, wall height H */}
      {/* We place windows as parallelograms following the isometric angle */}

      {/* Upper arched windows — 3 across */}
      {[0.2, 0.45, 0.7].map((t, i) => {
        const wx = baseLeft.x + (baseBottom.x - baseLeft.x) * t;
        const wy = baseLeft.y + (baseBottom.y - baseLeft.y) * t - H * 0.55;
        return (
          <g key={`lw-${i}`}>
            <rect x={wx - 5} y={wy - 7} width={10} height={14} rx={0}
              fill="var(--bg-color)" stroke="var(--line-color)" strokeWidth="1.2"
              transform={`skewY(26.57)`}
            />
          </g>
        );
      })}

      {/* Since skewY on individual windows is complex, let's use simpler parallelogram windows */}
      {/* Clear the skewed windows and use proper isometric window shapes */}

      {/* LEFT FACE — Row of 3 arched windows (upper) */}
      {[0.18, 0.42, 0.66].map((t, i) => {
        const cx = baseLeft.x + (baseBottom.x - baseLeft.x) * t;
        const cy = baseLeft.y + (baseBottom.y - baseLeft.y) * t;
        const winY = cy - H * 0.6;
        const ww = 8; // window width along face
        const wh = 14; // window height
        // Parallelogram: top-left, top-right, bottom-right, bottom-left
        // On left face, x increases as we go right, y increases by half
        const dx = ww * 0.5; // isometric x offset
        const dy = ww * 0.25; // isometric y offset (30° angle ≈ rise/run of 0.5)
        return (
          <g key={`lwin-${i}`}>
            <polygon
              points={`${cx - dx},${winY - dy} ${cx + dx},${winY + dy} ${cx + dx},${winY + dy + wh} ${cx - dx},${winY - dy + wh}`}
              fill="var(--bg-color)" stroke="var(--line-color)" strokeWidth="1.2"
            />
            {/* Arch */}
            <path
              d={`M${cx - dx},${winY - dy} Q${cx},${winY - dy - 4} ${cx + dx},${winY + dy}`}
              fill="var(--bg-color)" stroke="var(--line-color)" strokeWidth="1.2"
            />
            {/* Mullion */}
            <line x1={cx} y1={winY - dy - 2} x2={cx} y2={winY + wh}
              stroke="var(--line-color)" strokeWidth="0.5" />
          </g>
        );
      })}

      {/* LEFT FACE — Grand double door */}
      {(() => {
        const t = 0.42;
        const cx = baseLeft.x + (baseBottom.x - baseLeft.x) * t;
        const cy = baseLeft.y + (baseBottom.y - baseLeft.y) * t;
        const doorTop = cy - H * 0.32;
        const doorBot = cy;
        const dw = 12;
        const dx = dw * 0.5;
        const dy = dw * 0.25;
        return (
          <g>
            {/* Door frame */}
            <polygon
              points={`${cx - dx},${doorTop - dy} ${cx + dx},${doorTop + dy} ${cx + dx},${doorBot + dy} ${cx - dx},${doorBot - dy}`}
              fill="var(--bg-color)" stroke="var(--line-color)" strokeWidth="1.5"
            />
            {/* Door split */}
            <line x1={cx} y1={doorTop} x2={cx} y2={doorBot}
              stroke="var(--line-color)" strokeWidth="0.8" />
            {/* Pediment above door */}
            <polygon
              points={`${cx - dx - 2},${doorTop - dy - 1} ${cx},${doorTop - dy - 6} ${cx + dx + 2},${doorTop + dy - 1}`}
              fill="var(--bg-color)" stroke="var(--line-color)" strokeWidth="1"
            />
            {/* Steps */}
            <polygon
              points={`${cx - dx - 3},${doorBot - dy + 2} ${cx + dx + 3},${doorBot + dy + 2} ${cx + dx + 3},${doorBot + dy + 5} ${cx - dx - 3},${doorBot - dy + 5}`}
              fill="var(--bg-color)" stroke="var(--line-color)" strokeWidth="0.8"
            />
          </g>
        );
      })()}

      {/* ══════════════════════════════════════
          RIGHT FACE DETAILS — Windows
          ══════════════════════════════════════ */}
      {/* Right face runs from baseBottom to baseRight */}
      {[0.2, 0.45, 0.7].map((t, i) => {
        const cx = baseBottom.x + (baseRight.x - baseBottom.x) * t;
        const cy = baseBottom.y + (baseRight.y - baseBottom.y) * t;
        const winY = cy - H * 0.6;
        const ww = 8;
        const wh = 14;
        const dx = ww * 0.5;
        const dy = ww * 0.25;
        return (
          <g key={`rwin-${i}`}>
            <polygon
              points={`${cx - dx},${winY + dy} ${cx + dx},${winY - dy} ${cx + dx},${winY - dy + wh} ${cx - dx},${winY + dy + wh}`}
              fill="var(--bg-color)" stroke="var(--line-color)" strokeWidth="1.2"
            />
            {/* Arch */}
            <path
              d={`M${cx - dx},${winY + dy} Q${cx},${winY - 4} ${cx + dx},${winY - dy}`}
              fill="var(--bg-color)" stroke="var(--line-color)" strokeWidth="1.2"
            />
            {/* Mullion */}
            <line x1={cx} y1={winY - 2} x2={cx} y2={winY + wh}
              stroke="var(--line-color)" strokeWidth="0.5" />
          </g>
        );
      })}

      {/* Right face — lower windows */}
      {[0.2, 0.45, 0.7].map((t, i) => {
        const cx = baseBottom.x + (baseRight.x - baseBottom.x) * t;
        const cy = baseBottom.y + (baseRight.y - baseBottom.y) * t;
        const winY = cy - H * 0.25;
        const ww = 8;
        const wh = 12;
        const dx = ww * 0.5;
        const dy = ww * 0.25;
        return (
          <g key={`rwin-lower-${i}`}>
            <polygon
              points={`${cx - dx},${winY + dy} ${cx + dx},${winY - dy} ${cx + dx},${winY - dy + wh} ${cx - dx},${winY + dy + wh}`}
              fill="var(--bg-color)" stroke="var(--line-color)" strokeWidth="1"
            />
            <line x1={cx} y1={winY} x2={cx} y2={winY + wh}
              stroke="var(--line-color)" strokeWidth="0.4" />
          </g>
        );
      })}

      {/* ══════════════════════════════════════
          HORIZONTAL TRIM LINES
          ══════════════════════════════════════ */}
      {/* Left face cornice */}
      <line
        x1={baseLeft.x} y1={baseLeft.y - H - 3}
        x2={baseBottom.x} y2={baseBottom.y - H - 3}
        stroke="var(--line-color)" strokeWidth="0.8" opacity={0.5}
      />
      {/* Right face cornice */}
      <line
        x1={baseBottom.x} y1={baseBottom.y - H - 3}
        x2={baseRight.x} y2={baseRight.y - H - 3}
        stroke="var(--line-color)" strokeWidth="0.8" opacity={0.5}
      />
    </g>
  );
};
