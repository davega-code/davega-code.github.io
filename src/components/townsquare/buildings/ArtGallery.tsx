import React from 'react';

/**
 * Isometric line-art SVG illustration of the Art Gallery building.
 *
 * True isometric 3D building with three visible faces.
 * Modern gallery with flat roof, floor-to-ceiling windows showing artwork,
 * GALLERY lettering, and abstract sculpture.
 */
export const ArtGallery: React.FC = () => {
  const W = 55;
  const D = 28;
  const H = 50;

  const bT = { x: 55, y: 78 - D };
  const bR = { x: 55 + W, y: 78 };
  const bB = { x: 55, y: 78 + D };
  const bL = { x: 55 - W, y: 78 };

  const wT = { x: bT.x, y: bT.y - H };
  const wR = { x: bR.x, y: bR.y - H };
  const wB = { x: bB.x, y: bB.y - H };
  const wL = { x: bL.x, y: bL.y - H };

  return (
    <g data-testid="building-art-gallery">
      {/* Ground shadow */}
      <polygon
        points={`${bT.x},${bT.y} ${bR.x},${bR.y} ${bB.x},${bB.y} ${bL.x},${bL.y}`}
        fill="var(--line-color)" opacity={0.08}
      />

      {/* LEFT FACE */}
      <polygon
        points={`${bL.x},${bL.y} ${bB.x},${bB.y} ${wB.x},${wB.y} ${wL.x},${wL.y}`}
        fill="var(--accent-art-gallery)"
        stroke="var(--line-color)" strokeWidth="var(--stroke-width)" strokeLinejoin="round"
      />

      {/* RIGHT FACE */}
      <polygon
        points={`${bB.x},${bB.y} ${bR.x},${bR.y} ${wR.x},${wR.y} ${wB.x},${wB.y}`}
        fill="var(--accent-art-gallery)"
        stroke="var(--line-color)" strokeWidth="var(--stroke-width)" strokeLinejoin="round"
        opacity={0.82}
      />

      {/* FLAT ROOF (top face) */}
      <polygon
        points={`${wT.x},${wT.y} ${wR.x},${wR.y} ${wB.x},${wB.y} ${wL.x},${wL.y}`}
        fill="var(--accent-art-gallery)"
        stroke="var(--line-color)" strokeWidth="var(--stroke-width)" strokeLinejoin="round"
        opacity={0.55}
      />

      {/* Roof parapet (slightly raised edge) */}
      <polygon
        points={`${wL.x},${wL.y} ${wB.x},${wB.y} ${wB.x},${wB.y - 3} ${wL.x},${wL.y - 3}`}
        fill="var(--accent-art-gallery)" stroke="var(--line-color)" strokeWidth="0.8"
        opacity={0.7}
      />
      <polygon
        points={`${wB.x},${wB.y} ${wR.x},${wR.y} ${wR.x},${wR.y - 3} ${wB.x},${wB.y - 3}`}
        fill="var(--accent-art-gallery)" stroke="var(--line-color)" strokeWidth="0.8"
        opacity={0.6}
      />

      {/* Rooftop skylight */}
      <polygon
        points={`${wT.x},${wT.y - 1} ${wT.x + 12},${wT.y + 5} ${wT.x},${wT.y + 11} ${wT.x - 12},${wT.y + 5}`}
        fill="var(--bg-color)" stroke="var(--line-color)" strokeWidth="0.8" opacity={0.7}
      />

      {/* LEFT FACE — GALLERY text */}
      {(() => {
        const cx = bL.x + (bB.x - bL.x) * 0.4;
        const cy = bL.y + (bB.y - bL.y) * 0.4 - H * 0.85;
        return (
          <text x={cx} y={cy} textAnchor="middle"
            fontSize="6" fontWeight="300" fill="var(--line-color)"
            fontFamily="Helvetica, Arial, sans-serif" letterSpacing="2">
            GALLERY
          </text>
        );
      })()}

      {/* LEFT FACE — Floor-to-ceiling windows */}
      {[0.15, 0.4, 0.65].map((t, i) => {
        const cx = bL.x + (bB.x - bL.x) * t;
        const cy = bL.y + (bB.y - bL.y) * t;
        const winY = cy - H * 0.7;
        const ww = 12;
        const wh = H * 0.6;
        const dx = ww * 0.5;
        const dy = ww * 0.25;
        return (
          <g key={`lwin-${i}`}>
            <polygon
              points={`${cx - dx},${winY - dy} ${cx + dx},${winY + dy} ${cx + dx},${winY + dy + wh} ${cx - dx},${winY - dy + wh}`}
              fill="var(--bg-color)" stroke="var(--line-color)" strokeWidth="1.2"
            />
            {/* Artwork frames visible inside */}
            <polygon
              points={`${cx - dx + 2},${winY - dy + 3} ${cx + dx - 2},${winY + dy + 3} ${cx + dx - 2},${winY + dy + 10} ${cx - dx + 2},${winY - dy + 10}`}
              fill="none" stroke="var(--line-color)" strokeWidth="0.6"
            />
            {i === 1 && (
              <polygon
                points={`${cx - dx + 2},${winY - dy + 14} ${cx + dx - 2},${winY + dy + 14} ${cx + dx - 2},${winY + dy + 22} ${cx - dx + 2},${winY - dy + 22}`}
                fill="none" stroke="var(--line-color)" strokeWidth="0.6"
              />
            )}
          </g>
        );
      })}

      {/* LEFT FACE — Wide glass entrance */}
      {(() => {
        const t = 0.82;
        const cx = bL.x + (bB.x - bL.x) * t;
        const cy = bL.y + (bB.y - bL.y) * t;
        const doorTop = cy - H * 0.65;
        const doorBot = cy;
        const dw = 10;
        const dx = dw * 0.5;
        const dy = dw * 0.25;
        return (
          <g>
            <polygon
              points={`${cx - dx},${doorTop - dy} ${cx + dx},${doorTop + dy} ${cx + dx},${doorBot + dy} ${cx - dx},${doorBot - dy}`}
              fill="var(--bg-color)" stroke="var(--line-color)" strokeWidth="1.5"
            />
            <line x1={cx} y1={doorTop} x2={cx} y2={doorBot}
              stroke="var(--line-color)" strokeWidth="0.8" />
            {/* Door handles */}
            <line x1={cx - 1.5} y1={doorTop + (doorBot - doorTop) * 0.4}
              x2={cx - 1.5} y2={doorTop + (doorBot - doorTop) * 0.6}
              stroke="var(--line-color)" strokeWidth="1.5" />
            <line x1={cx + 1.5} y1={doorTop + (doorBot - doorTop) * 0.4}
              x2={cx + 1.5} y2={doorTop + (doorBot - doorTop) * 0.6}
              stroke="var(--line-color)" strokeWidth="1.5" />
          </g>
        );
      })()}

      {/* RIGHT FACE — Windows */}
      {[0.18, 0.45, 0.72].map((t, i) => {
        const cx = bB.x + (bR.x - bB.x) * t;
        const cy = bB.y + (bR.y - bB.y) * t;
        const winY = cy - H * 0.7;
        const ww = 10;
        const wh = H * 0.55;
        const dx = ww * 0.5;
        const dy = ww * 0.25;
        return (
          <g key={`rwin-${i}`}>
            <polygon
              points={`${cx - dx},${winY + dy} ${cx + dx},${winY - dy} ${cx + dx},${winY - dy + wh} ${cx - dx},${winY + dy + wh}`}
              fill="var(--bg-color)" stroke="var(--line-color)" strokeWidth="1.2"
            />
            {/* Artwork inside */}
            <polygon
              points={`${cx - dx + 2},${winY + dy + 3} ${cx + dx - 2},${winY - dy + 3} ${cx + dx - 2},${winY - dy + 10} ${cx - dx + 2},${winY + dy + 10}`}
              fill="none" stroke="var(--line-color)" strokeWidth="0.5"
            />
          </g>
        );
      })}

      {/* Abstract sculpture near entrance */}
      {(() => {
        const sx = bL.x - 8;
        const sy = bL.y + 4;
        return (
          <g>
            <rect x={sx - 4} y={sy - 8} width={8} height={8} rx={0}
              fill="var(--bg-color)" stroke="var(--line-color)" strokeWidth="1" />
            <circle cx={sx} cy={sy - 14} r={4}
              fill="none" stroke="var(--line-color)" strokeWidth="1.2" />
            <line x1={sx} y1={sy - 18} x2={sx} y2={sy - 22}
              stroke="var(--line-color)" strokeWidth="1" />
          </g>
        );
      })()}

      {/* Cornice lines */}
      <line x1={bL.x} y1={wL.y - 1} x2={bB.x} y2={wB.y - 1}
        stroke="var(--line-color)" strokeWidth="0.8" opacity={0.4} />
      <line x1={bB.x} y1={wB.y - 1} x2={bR.x} y2={wR.y - 1}
        stroke="var(--line-color)" strokeWidth="0.8" opacity={0.4} />
    </g>
  );
};
