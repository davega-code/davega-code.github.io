import React from 'react';

/**
 * Isometric line-art SVG illustration of the Newspaper building.
 *
 * True isometric 3D building with three visible faces.
 * Craftsman-style newspaper office with "DAILY NEWS" sign,
 * large display window, chimney, and stacked papers.
 */
export const Newspaper: React.FC = () => {
  const W = 50; // half-width
  const D = 25; // half-depth
  const H = 55; // wall height
  const roofH = 18;

  // Ground diamond
  const baseTop = { x: 50, y: 75 - D };
  const baseRight = { x: 50 + W, y: 75 };
  const baseBottom = { x: 50, y: 75 + D };
  const baseLeft = { x: 50 - W, y: 75 };

  // Wall tops
  const wallTop = { x: baseTop.x, y: baseTop.y - H };
  const wallRight = { x: baseRight.x, y: baseRight.y - H };
  const wallBottom = { x: baseBottom.x, y: baseBottom.y - H };
  const wallLeft = { x: baseLeft.x, y: baseLeft.y - H };

  const roofPeak = { x: 50, y: wallTop.y - roofH };

  return (
    <g data-testid="building-newspaper">
      {/* Ground shadow */}
      <polygon
        points={`${baseTop.x},${baseTop.y} ${baseRight.x},${baseRight.y} ${baseBottom.x},${baseBottom.y} ${baseLeft.x},${baseLeft.y}`}
        fill="var(--line-color)" opacity={0.08}
      />

      {/* LEFT FACE */}
      <polygon
        points={`${baseLeft.x},${baseLeft.y} ${baseBottom.x},${baseBottom.y} ${wallBottom.x},${wallBottom.y} ${wallLeft.x},${wallLeft.y}`}
        fill="var(--accent-newspaper)"
        stroke="var(--line-color)" strokeWidth="var(--stroke-width)" strokeLinejoin="round"
      />

      {/* RIGHT FACE */}
      <polygon
        points={`${baseBottom.x},${baseBottom.y} ${baseRight.x},${baseRight.y} ${wallRight.x},${wallRight.y} ${wallBottom.x},${wallBottom.y}`}
        fill="var(--accent-newspaper)"
        stroke="var(--line-color)" strokeWidth="var(--stroke-width)" strokeLinejoin="round"
        opacity={0.82}
      />

      {/* ROOF — low-pitched */}
      <polygon
        points={`${wallLeft.x},${wallLeft.y} ${wallBottom.x},${wallBottom.y} ${roofPeak.x},${roofPeak.y - D}`}
        fill="var(--accent-newspaper)" stroke="var(--line-color)" strokeWidth="var(--stroke-width)"
        strokeLinejoin="round" opacity={0.6}
      />
      <polygon
        points={`${wallBottom.x},${wallBottom.y} ${wallRight.x},${wallRight.y} ${roofPeak.x},${roofPeak.y - D}`}
        fill="var(--accent-newspaper)" stroke="var(--line-color)" strokeWidth="var(--stroke-width)"
        strokeLinejoin="round" opacity={0.5}
      />
      <polygon
        points={`${wallLeft.x},${wallLeft.y} ${wallTop.x},${wallTop.y} ${roofPeak.x},${roofPeak.y - D}`}
        fill="var(--accent-newspaper)" stroke="var(--line-color)" strokeWidth="1"
        strokeLinejoin="round" opacity={0.45}
      />
      <polygon
        points={`${wallTop.x},${wallTop.y} ${wallRight.x},${wallRight.y} ${roofPeak.x},${roofPeak.y - D}`}
        fill="var(--accent-newspaper)" stroke="var(--line-color)" strokeWidth="1"
        strokeLinejoin="round" opacity={0.4}
      />

      {/* CHIMNEY on right face */}
      {(() => {
        const cx = baseRight.x - 12;
        const cy = baseRight.y - H - 8;
        return (
          <g>
            <rect x={cx - 4} y={cy - 16} width={8} height={20} rx={0}
              fill="var(--accent-newspaper)" stroke="var(--line-color)" strokeWidth="1.2" />
            <rect x={cx - 5} y={cy - 18} width={10} height={3} rx={0}
              fill="var(--accent-newspaper)" stroke="var(--line-color)" strokeWidth="1" />
          </g>
        );
      })()}

      {/* LEFT FACE — "DAILY NEWS" sign */}
      {(() => {
        const t = 0.42;
        const cx = baseLeft.x + (baseBottom.x - baseLeft.x) * t;
        const cy = baseLeft.y + (baseBottom.y - baseLeft.y) * t;
        const signY = cy - H * 0.82;
        return (
          <g>
            <polygon
              points={`${cx - 18},${signY - 4} ${cx + 6},${signY + 8} ${cx + 6},${signY + 18} ${cx - 18},${signY + 6}`}
              fill="var(--bg-color)" stroke="var(--line-color)" strokeWidth="1.2"
            />
            <text x={cx - 6} y={signY + 12} textAnchor="middle"
              fontSize="5.5" fontWeight="bold" fill="var(--line-color)"
              fontFamily="Georgia, serif" letterSpacing="0.5">
              NEWS
            </text>
          </g>
        );
      })()}

      {/* LEFT FACE — Large display window */}
      {[0.22, 0.58].map((t, i) => {
        const cx = baseLeft.x + (baseBottom.x - baseLeft.x) * t;
        const cy = baseLeft.y + (baseBottom.y - baseLeft.y) * t;
        const winY = cy - H * 0.55;
        const ww = 10;
        const wh = 16;
        const dx = ww * 0.5;
        const dy = ww * 0.25;
        return (
          <g key={`lwin-${i}`}>
            <polygon
              points={`${cx - dx},${winY - dy} ${cx + dx},${winY + dy} ${cx + dx},${winY + dy + wh} ${cx - dx},${winY - dy + wh}`}
              fill="var(--bg-color)" stroke="var(--line-color)" strokeWidth="1.2"
            />
            {/* Mullion cross */}
            <line x1={cx} y1={winY} x2={cx} y2={winY + wh}
              stroke="var(--line-color)" strokeWidth="0.5" />
            <line x1={cx - dx} y1={winY - dy + wh * 0.5} x2={cx + dx} y2={winY + dy + wh * 0.5}
              stroke="var(--line-color)" strokeWidth="0.5" />
          </g>
        );
      })}

      {/* LEFT FACE — Door */}
      {(() => {
        const t = 0.4;
        const cx = baseLeft.x + (baseBottom.x - baseLeft.x) * t;
        const cy = baseLeft.y + (baseBottom.y - baseLeft.y) * t;
        const doorTop = cy - H * 0.3;
        const doorBot = cy;
        const dw = 9;
        const dx = dw * 0.5;
        const dy = dw * 0.25;
        return (
          <g>
            <polygon
              points={`${cx - dx},${doorTop - dy} ${cx + dx},${doorTop + dy} ${cx + dx},${doorBot + dy} ${cx - dx},${doorBot - dy}`}
              fill="var(--bg-color)" stroke="var(--line-color)" strokeWidth="1.5"
            />
            <line x1={cx} y1={doorTop} x2={cx} y2={doorBot}
              stroke="var(--line-color)" strokeWidth="0.6" />
            {/* Door knob */}
            <circle cx={cx + 2} cy={doorTop + (doorBot - doorTop) * 0.6} r={0.8}
              fill="var(--line-color)" />
          </g>
        );
      })()}

      {/* Newspaper bundles near door */}
      {(() => {
        const t = 0.58;
        const cx = baseLeft.x + (baseBottom.x - baseLeft.x) * t;
        const cy = baseLeft.y + (baseBottom.y - baseLeft.y) * t;
        return (
          <g>
            <rect x={cx - 2} y={cy - 8} width={6} height={3} rx={0.5}
              fill="var(--bg-color)" stroke="var(--line-color)" strokeWidth="0.8" />
            <rect x={cx - 2} y={cy - 11} width={6} height={3} rx={0.5}
              fill="var(--bg-color)" stroke="var(--line-color)" strokeWidth="0.8" />
            <rect x={cx - 2} y={cy - 14} width={6} height={3} rx={0.5}
              fill="var(--bg-color)" stroke="var(--line-color)" strokeWidth="0.8" />
          </g>
        );
      })()}

      {/* RIGHT FACE — Windows */}
      {[0.22, 0.5, 0.78].map((t, i) => {
        const cx = baseBottom.x + (baseRight.x - baseBottom.x) * t;
        const cy = baseBottom.y + (baseRight.y - baseBottom.y) * t;
        const winY = cy - H * 0.55;
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
            <line x1={cx} y1={winY} x2={cx} y2={winY + wh}
              stroke="var(--line-color)" strokeWidth="0.4" />
          </g>
        );
      })}

      {/* RIGHT FACE — Lower windows */}
      {[0.22, 0.5, 0.78].map((t, i) => {
        const cx = baseBottom.x + (baseRight.x - baseBottom.x) * t;
        const cy = baseBottom.y + (baseRight.y - baseBottom.y) * t;
        const winY = cy - H * 0.22;
        const ww = 8;
        const wh = 10;
        const dx = ww * 0.5;
        const dy = ww * 0.25;
        return (
          <g key={`rwin-l-${i}`}>
            <polygon
              points={`${cx - dx},${winY + dy} ${cx + dx},${winY - dy} ${cx + dx},${winY - dy + wh} ${cx - dx},${winY + dy + wh}`}
              fill="var(--bg-color)" stroke="var(--line-color)" strokeWidth="1"
            />
          </g>
        );
      })}

      {/* Cornice lines */}
      <line x1={baseLeft.x} y1={wallLeft.y - 2} x2={baseBottom.x} y2={wallBottom.y - 2}
        stroke="var(--line-color)" strokeWidth="0.8" opacity={0.4} />
      <line x1={baseBottom.x} y1={wallBottom.y - 2} x2={baseRight.x} y2={wallRight.y - 2}
        stroke="var(--line-color)" strokeWidth="0.8" opacity={0.4} />
    </g>
  );
};
