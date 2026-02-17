import React from 'react';

/**
 * Isometric line-art SVG illustration of the Post Office building.
 *
 * True isometric 3D building with three visible faces.
 * Traditional post office with peaked roof, bell tower,
 * shuttered windows, letter slot door, and mailbox.
 */
export const PostOffice: React.FC = () => {
  const W = 45;
  const D = 22;
  const H = 55;
  const roofH = 20;

  const bT = { x: 45, y: 72 - D };
  const bR = { x: 45 + W, y: 72 };
  const bB = { x: 45, y: 72 + D };
  const bL = { x: 45 - W, y: 72 };

  const wT = { x: bT.x, y: bT.y - H };
  const wR = { x: bR.x, y: bR.y - H };
  const wB = { x: bB.x, y: bB.y - H };
  const wL = { x: bL.x, y: bL.y - H };

  const roofPk = { x: 45, y: wT.y - roofH };

  return (
    <g data-testid="building-post-office">
      {/* Ground shadow */}
      <polygon
        points={`${bT.x},${bT.y} ${bR.x},${bR.y} ${bB.x},${bB.y} ${bL.x},${bL.y}`}
        fill="var(--line-color)" opacity={0.08}
      />

      {/* LEFT FACE */}
      <polygon
        points={`${bL.x},${bL.y} ${bB.x},${bB.y} ${wB.x},${wB.y} ${wL.x},${wL.y}`}
        fill="var(--accent-post-office)"
        stroke="var(--line-color)" strokeWidth="var(--stroke-width)" strokeLinejoin="round"
      />

      {/* RIGHT FACE */}
      <polygon
        points={`${bB.x},${bB.y} ${bR.x},${bR.y} ${wR.x},${wR.y} ${wB.x},${wB.y}`}
        fill="var(--accent-post-office)"
        stroke="var(--line-color)" strokeWidth="var(--stroke-width)" strokeLinejoin="round"
        opacity={0.82}
      />

      {/* ROOF — peaked, 4 slopes */}
      <polygon
        points={`${wL.x},${wL.y} ${wB.x},${wB.y} ${roofPk.x},${roofPk.y - D}`}
        fill="var(--accent-post-office)" stroke="var(--line-color)" strokeWidth="var(--stroke-width)"
        strokeLinejoin="round" opacity={0.6}
      />
      <polygon
        points={`${wB.x},${wB.y} ${wR.x},${wR.y} ${roofPk.x},${roofPk.y - D}`}
        fill="var(--accent-post-office)" stroke="var(--line-color)" strokeWidth="var(--stroke-width)"
        strokeLinejoin="round" opacity={0.5}
      />
      <polygon
        points={`${wL.x},${wL.y} ${wT.x},${wT.y} ${roofPk.x},${roofPk.y - D}`}
        fill="var(--accent-post-office)" stroke="var(--line-color)" strokeWidth="1"
        strokeLinejoin="round" opacity={0.45}
      />
      <polygon
        points={`${wT.x},${wT.y} ${wR.x},${wR.y} ${roofPk.x},${roofPk.y - D}`}
        fill="var(--accent-post-office)" stroke="var(--line-color)" strokeWidth="1"
        strokeLinejoin="round" opacity={0.4}
      />

      {/* BELL TOWER on roof */}
      {(() => {
        const ty = roofPk.y - D - 4;
        return (
          <g>
            <rect x={41} y={ty - 14} width={8} height={12} rx={0}
              fill="var(--accent-post-office)" stroke="var(--line-color)" strokeWidth="1" />
            <rect x={43} y={ty - 11} width={4} height={5} rx={0.5}
              fill="var(--bg-color)" stroke="var(--line-color)" strokeWidth="0.8" />
            <polygon points={`39,${ty - 14} 45,${ty - 20} 51,${ty - 14}`}
              fill="var(--accent-post-office)" stroke="var(--line-color)" strokeWidth="1" opacity={0.7} />
            <line x1={45} y1={ty - 20} x2={45} y2={ty - 26}
              stroke="var(--line-color)" strokeWidth="1.5" />
          </g>
        );
      })()}

      {/* LEFT FACE — POST OFFICE sign */}
      {(() => {
        const cx = bL.x + (bB.x - bL.x) * 0.42;
        const cy = bL.y + (bB.y - bL.y) * 0.42 - H * 0.82;
        const sw = 20;
        const dx = sw * 0.5;
        const dy = sw * 0.25;
        return (
          <g>
            <polygon
              points={`${cx - dx},${cy - dy} ${cx + dx},${cy + dy} ${cx + dx},${cy + dy + 8} ${cx - dx},${cy - dy + 8}`}
              fill="var(--bg-color)" stroke="var(--line-color)" strokeWidth="1.2"
            />
            <text x={cx} y={cy + 5} textAnchor="middle"
              fontSize="4.5" fontWeight="bold" fill="var(--line-color)"
              fontFamily="Georgia, serif" letterSpacing="0.5">
              POST OFFICE
            </text>
          </g>
        );
      })()}

      {/* LEFT FACE — Windows with shutters */}
      {[0.2, 0.65].map((t, i) => {
        const cx = bL.x + (bB.x - bL.x) * t;
        const cy = bL.y + (bB.y - bL.y) * t;
        const winY = cy - H * 0.55;
        const ww = 8;
        const wh = 14;
        const dx = ww * 0.5;
        const dy = ww * 0.25;
        return (
          <g key={`lwin-${i}`}>
            {/* Window */}
            <polygon
              points={`${cx - dx},${winY - dy} ${cx + dx},${winY + dy} ${cx + dx},${winY + dy + wh} ${cx - dx},${winY - dy + wh}`}
              fill="var(--bg-color)" stroke="var(--line-color)" strokeWidth="1.2"
            />
            {/* Mullion cross */}
            <line x1={cx} y1={winY} x2={cx} y2={winY + wh}
              stroke="var(--line-color)" strokeWidth="0.5" />
            <line x1={cx - dx} y1={winY - dy + wh * 0.5} x2={cx + dx} y2={winY + dy + wh * 0.5}
              stroke="var(--line-color)" strokeWidth="0.5" />
            {/* Left shutter */}
            <polygon
              points={`${cx - dx - 3},${winY - dy - 1.5} ${cx - dx},${winY - dy} ${cx - dx},${winY - dy + wh} ${cx - dx - 3},${winY - dy + wh - 1.5}`}
              fill="var(--accent-post-office)" stroke="var(--line-color)" strokeWidth="0.8"
            />
            {/* Right shutter */}
            <polygon
              points={`${cx + dx},${winY + dy} ${cx + dx + 3},${winY + dy + 1.5} ${cx + dx + 3},${winY + dy + wh + 1.5} ${cx + dx},${winY + dy + wh}`}
              fill="var(--accent-post-office)" stroke="var(--line-color)" strokeWidth="0.8"
            />
          </g>
        );
      })}

      {/* LEFT FACE — Door with letter slot */}
      {(() => {
        const t = 0.42;
        const cx = bL.x + (bB.x - bL.x) * t;
        const cy = bL.y + (bB.y - bL.y) * t;
        const doorTop = cy - H * 0.35;
        const doorBot = cy;
        const dw = 9;
        const dx = dw * 0.5;
        const dy = dw * 0.25;
        return (
          <g>
            {/* Transom */}
            <polygon
              points={`${cx - dx},${doorTop - dy - 4} ${cx + dx},${doorTop + dy - 4} ${cx + dx},${doorTop + dy} ${cx - dx},${doorTop - dy}`}
              fill="var(--bg-color)" stroke="var(--line-color)" strokeWidth="1"
            />
            {/* Door */}
            <polygon
              points={`${cx - dx},${doorTop - dy} ${cx + dx},${doorTop + dy} ${cx + dx},${doorBot + dy} ${cx - dx},${doorBot - dy}`}
              fill="var(--bg-color)" stroke="var(--line-color)" strokeWidth="1.5"
            />
            {/* Letter slot */}
            <polygon
              points={`${cx - 3},${doorTop + 6} ${cx + 3},${doorTop + 8} ${cx + 3},${doorTop + 10} ${cx - 3},${doorTop + 8}`}
              fill="var(--line-color)" opacity={0.7}
            />
            {/* Door knob */}
            <circle cx={cx + 2} cy={doorTop + (doorBot - doorTop) * 0.55} r={0.8}
              fill="var(--line-color)" />
            {/* Steps */}
            <polygon
              points={`${cx - dx - 2},${doorBot - dy + 1} ${cx + dx + 2},${doorBot + dy + 1} ${cx + dx + 2},${doorBot + dy + 4} ${cx - dx - 2},${doorBot - dy + 4}`}
              fill="var(--bg-color)" stroke="var(--line-color)" strokeWidth="0.8"
            />
          </g>
        );
      })()}

      {/* RIGHT FACE — Windows */}
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
            <polygon
              points={`${cx - dx},${winY + dy} ${cx + dx},${winY - dy} ${cx + dx},${winY - dy + wh} ${cx - dx},${winY + dy + wh}`}
              fill="var(--bg-color)" stroke="var(--line-color)" strokeWidth="1.2"
            />
            <line x1={cx} y1={winY} x2={cx} y2={winY + wh}
              stroke="var(--line-color)" strokeWidth="0.5" />
            <line x1={cx - dx} y1={winY + dy + wh * 0.5} x2={cx + dx} y2={winY - dy + wh * 0.5}
              stroke="var(--line-color)" strokeWidth="0.5" />
          </g>
        );
      })}

      {/* RIGHT FACE — Lower windows */}
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
            <polygon
              points={`${cx - dx},${winY + dy} ${cx + dx},${winY - dy} ${cx + dx},${winY - dy + wh} ${cx - dx},${winY + dy + wh}`}
              fill="var(--bg-color)" stroke="var(--line-color)" strokeWidth="1"
            />
          </g>
        );
      })}

      {/* MAILBOX out front */}
      {(() => {
        const mx = bL.x - 10;
        const my = bL.y + 6;
        return (
          <g>
            <rect x={mx - 5} y={my - 12} width={10} height={10} rx={2}
              fill="var(--accent-post-office)" stroke="var(--line-color)" strokeWidth="1.5" />
            <path d={`M${mx - 5},${my - 12} Q${mx},${my - 17} ${mx + 5},${my - 12}`}
              fill="var(--accent-post-office)" stroke="var(--line-color)" strokeWidth="1.2" />
            <rect x={mx - 2.5} y={my - 9} width={5} height={2} rx={0.5}
              fill="var(--line-color)" opacity={0.8} />
            <line x1={mx} y1={my - 2} x2={mx} y2={my + 8}
              stroke="var(--line-color)" strokeWidth="2.5" />
          </g>
        );
      })()}

      {/* FLAG */}
      {(() => {
        const fx = bB.x + 8;
        const fy = bB.y - 2;
        return (
          <g>
            <line x1={fx} y1={fy} x2={fx} y2={fy - 30}
              stroke="var(--line-color)" strokeWidth="1.5" />
            <polygon
              points={`${fx},${fy - 30} ${fx},${fy - 22} ${fx + 8},${fy - 26}`}
              fill="var(--accent-post-office)" stroke="var(--line-color)" strokeWidth="0.8"
            />
          </g>
        );
      })()}

      {/* Cornice lines */}
      <line x1={bL.x} y1={wL.y - 2} x2={bB.x} y2={wB.y - 2}
        stroke="var(--line-color)" strokeWidth="0.8" opacity={0.4} />
      <line x1={bB.x} y1={wB.y - 2} x2={bR.x} y2={wR.y - 2}
        stroke="var(--line-color)" strokeWidth="0.8" opacity={0.4} />
    </g>
  );
};
