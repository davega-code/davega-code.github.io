import { between, easeOut, frame, hop, lerp, seg, type Painter, type Scene } from "../../../shared/pixel-art/index.ts";
import * as S from "./sprites.ts";

const W = 112;
const H = 44;
const FLOOR = 36;

type Point = [number, number];

/* ---------- Backdrops: day in light mode, night in dark mode ---------- */

function border(p: Painter) {
  p.rect(0, 0, W, 1, "k");
  p.rect(0, H - 1, W, 1, "k");
  p.rect(0, 0, 1, H, "k");
  p.rect(W - 1, 0, 1, H, "k");
}

function office(p: Painter, { sunK, window: showWindow = true }: { sunK?: number; window?: boolean } = {}) {
  const d = p.dark;
  p.rect(0, 0, W, FLOOR, d ? "#2a2d44" : "#f4e7c8");
  p.rect(0, FLOOR - 5, W, 1, d ? "#1b1d2e" : "#b89a6a");
  p.rect(0, FLOOR - 4, W, 4, d ? "#23263a" : "#dcc69c");

  if (showWindow) {
    p.rect(8, 4, 18, 14, "k");
    p.rect(9, 5, 16, 12, d ? "#141833" : "#9fd8f8");
    if (sunK !== undefined) p.draw(S.sun, lerp(9, 16, sunK), 8 - Math.sin(Math.PI * sunK) * 3);
    else if (d) {
      p.rect(12, 7, 1, 1, "y");
      p.rect(21, 9, 1, 1, "w");
      p.rect(18, 13, 1, 1, "y");
    } else {
      p.rect(11, 12, 6, 2, "w");
      p.rect(12, 11, 3, 1, "w");
    }
    p.rect(16, 5, 1, 12, "k");
    p.rect(9, 10, 16, 1, "k");
  }

  p.rect(0, FLOOR, W, H - FLOOR, d ? "#3a3148" : "#c89868");
  for (let x = 4; x < W; x += 8) p.rect(x, FLOOR + 1, 1, H - FLOOR, d ? "#2e2740" : "#a87848");
  p.rect(0, FLOOR, W, 1, d ? "#1b1d2e" : "#8a6038");
}

function outdoor(p: Painter) {
  const d = p.dark;
  p.rect(0, 0, W, FLOOR, d ? "#1c2340" : "#9fd8f8");
  if (d) {
    for (const [x, y] of [[14, 5], [40, 3], [63, 8], [88, 4], [104, 10], [30, 12], [76, 14]]) p.rect(x, y, 1, 1, "w");
    p.rect(96, 3, 4, 4, "p");
    p.rect(98, 3, 2, 2, "#1c2340");
  } else {
    p.rect(70, 6, 12, 3, "w");
    p.rect(73, 4, 6, 2, "w");
    p.rect(30, 10, 9, 2, "w");
    p.rect(32, 9, 4, 1, "w");
  }
  p.rect(0, FLOOR, W, H - FLOOR, d ? "#2e6a3a" : "#58c048");
  p.rect(0, FLOOR, W, 1, d ? "#1f4a28" : "#2e8a2e");
  for (let x = 3; x < W; x += 7) p.rect(x, FLOOR + 3 + (x % 3), 2, 1, d ? "#1f4a28" : "#2e8a2e");
}

/* ---------- Shared props ---------- */

const DESK_X = 40;
const MON_X = 46;
const MON_Y = 15;
const SCREEN: Point = [MON_X + 3, MON_Y + 3];
const SEAT_Y = 18;

function chair(p: Painter, x: number, flip: boolean) {
  const back = flip ? x + 11 : x + 1;
  p.rect(back, 20, 2, 14, "k");
  p.rect(back + (flip ? 0 : 1), 21, 1, 12, "d");
  p.rect(x + 1, 32, 12, 2, "k");
  p.rect(x + 3, 34, 1, 2, "k");
  p.rect(x + 10, 34, 1, 2, "k");
}

function workstation(p: Painter, bob: number) {
  chair(p, 30, false);
  p.draw(S.desk, DESK_X, 27);
  p.draw(S.monitor, MON_X, MON_Y);
  p.draw(S.worker, 30, SEAT_Y + bob);
}

/** Text-like lines that change as someone types */
function screenIdle(p: Painter, t: number) {
  const f = frame(t, 250, 4);
  p.rect(SCREEN[0] + 1, SCREEN[1] + 1, 3 + (f % 3), 1, "c");
  p.rect(SCREEN[0] + 1, SCREEN[1] + 3, 2 + ((f + 1) % 4), 1, "c");
}

function cable(p: Painter, points: Point[], color = "d") {
  for (let i = 1; i < points.length; i++) {
    const [x0, y0] = points[i - 1];
    const [x1, y1] = points[i];
    p.rect(Math.min(x0, x1), Math.min(y0, y1), Math.abs(x1 - x0) + 1, Math.abs(y1 - y0) + 1, color);
  }
}

/** Point k (0 → 1) of the way along an axis-aligned polyline */
function along(points: Point[], k: number): Point {
  const lengths = points.slice(1).map((pt, i) => Math.abs(pt[0] - points[i][0]) + Math.abs(pt[1] - points[i][1]));
  let remaining = k * lengths.reduce((a, b) => a + b, 0);
  for (let i = 0; i < lengths.length; i++) {
    if (remaining <= lengths[i]) {
      const f = lengths[i] ? remaining / lengths[i] : 0;
      return [lerp(points[i][0], points[i + 1][0], f), lerp(points[i][1], points[i + 1][1], f)];
    }
    remaining -= lengths[i];
  }
  return points[points.length - 1];
}

function pulse(p: Painter, points: Point[], k: number) {
  const [tx, ty] = along(points, Math.max(0, k - 0.06));
  const [x, y] = along(points, k);
  p.rect(tx, ty, 1, 1, "o");
  p.rect(x - 1, y - 1, 3, 3, "k");
  p.rect(x, y, 1, 1, "y");
}

function speechBubble(p: Painter, x: number, y: number) {
  p.rect(x, y, 16, 9, "k");
  p.rect(x + 1, y + 1, 14, 7, "w");
  p.rect(x + 3, y + 9, 2, 2, "k");
  p.draw(S.banText, x + 2, y + 2);
}

/* ---------- Scenes ---------- */

/** Xbox Safety: a report flies in, the reviewer stamps an X, and the X becomes the ban hammer */
export const reviewScene: Scene = {
  width: W,
  height: H,
  duration: 5000,
  poster: 3900,
  paint(p) {
    const { t } = p;
    office(p);
    workstation(p, between(t, 1100, 2100) ? frame(t, 250, 2) : 0);

    if (between(t, 1100, 2700)) {
      p.rect(SCREEN[0] + 1, SCREEN[1], 5, 4, "p");
      p.rect(SCREEN[0] + 2, SCREEN[1] + 1, 3, 1, "k");
      if (frame(t, 200, 2)) p.rect(SCREEN[0] + 7, SCREEN[1], 1, 2, "r");
    } else screenIdle(p, t);

    if (t < 1100) {
      const [x, y] = hop(easeOut(seg(t, 0, 1100)), -10, 2, SCREEN[0], SCREEN[1] - 2, 8);
      p.rect(x - 6, y + 2, 4, 1, "w");
      p.rect(x - 9, y + 4, 3, 1, "w");
      p.draw(S.report, x, y + frame(t, 150, 2));
    }

    if (between(t, 2100, 2700) && (t < 2400 || frame(t, 100, 2))) p.draw(S.bigX, MON_X + 2, MON_Y + 1);
    if (between(t, 2700, 3300)) {
      const [x, y] = hop(seg(t, 2700, 3300), MON_X + 2, MON_Y + 1, 84, 27, 12);
      p.draw(S.bigX, x, y);
    }
    if (between(t, 3300, 3450)) p.draw(S.burst, 84, 26);
    if (between(t, 3350, 3700)) p.draw(S.hammerUp, 84, 13 + frame(t, 120, 2));
    if (between(t, 3700, 4600)) {
      if (frame(t, 150, 2) === 0) p.draw(S.burst, 84, 27);
      p.draw(S.hammerDown, 79, 26);
      speechBubble(p, 82, 6);
    }
    border(p);
  },
};

const NODES: Point[] = [
  [80, 4],
  [98, 15],
  [80, 27],
];
const PIPE_DESK = 26;
const PIPE_MON: Point = [32, 15];
const pipePath = ([x, y]: Point): Point[] => [
  [PIPE_MON[0] + 14, 21],
  [70, 21],
  [70, y + 4],
  [x - 1, y + 4],
];

/** Xbox Safety II: files stream into one computer, which feeds a network of others */
export const pipelineScene: Scene = {
  width: W,
  height: H,
  duration: 4800,
  poster: 2800,
  paint(p) {
    const { t } = p;
    office(p);
    p.draw(S.desk, PIPE_DESK, 27);
    p.draw(S.monitor, PIPE_MON[0], PIPE_MON[1]);
    for (const node of NODES) cable(p, pipePath(node));
    for (const [x, y] of NODES.slice(0, 2)) {
      p.rect(x - 2, y + 9, 14, 2, "k");
      p.rect(x - 1, y + 9, 12, 1, "n");
    }

    let flash = false;
    NODES.forEach((node, i) => {
      const start = i * 600;
      const arrive = start + 800;
      const sent = arrive + 700;
      if (between(t, start, arrive)) {
        const [x, y] = hop(seg(t, start, arrive), -8, 4 + i * 6, PIPE_MON[0] + 3, PIPE_MON[1] + 1, 10);
        p.draw(S.file, x, y);
      }
      if (between(t, arrive, arrive + 200)) flash = true;
      if (between(t, arrive, sent)) pulse(p, pipePath(node), seg(t, arrive, sent));
      p.draw(S.miniMonitor, node[0], node[1]);
      if (between(t, sent, 4400)) {
        p.rect(node[0] + 3, node[1] + 3, 4, 2, "g");
        p.rect(node[0] + 5, node[1] + 3, 1, 1, "w");
      }
    });

    if (flash) p.rect(PIPE_MON[0] + 3, PIPE_MON[1] + 3, 8, 4, "c");
    else {
      const f = frame(t, 250, 4);
      p.rect(PIPE_MON[0] + 4, PIPE_MON[1] + 4, 3 + (f % 3), 1, "c");
      p.rect(PIPE_MON[0] + 4, PIPE_MON[1] + 6, 2 + ((f + 1) % 4), 1, "c");
    }
    border(p);
  },
};

const GAMES = [
  { sprite: S.controller, x: 6, y: 4, c: [12, 8] as Point },
  { sprite: S.grassBlock, x: 7, y: 15, c: [12, 20] as Point },
  { sprite: S.crosshair, x: 7, y: 26, c: [12, 31] as Point },
];
const gamePath = ([, cy]: Point): Point[] => [
  [20, cy],
  [30, cy],
  [30, 21],
  [MON_X - 1, 21],
];

/** Gaming Safety & Trust: games feed one computer, a robot reviews, and ban hammers fly back */
export const leadScene: Scene = {
  width: W,
  height: H,
  duration: 5600,
  poster: 4300,
  paint(p) {
    const { t } = p;
    office(p, { window: false });
    for (const g of GAMES) cable(p, gamePath(g.c));
    chair(p, 60, true);
    p.draw(S.desk, DESK_X, 27);
    p.draw(S.monitor, MON_X, MON_Y);
    const scanning = between(t, 1400, 2200);
    p.draw(S.robot, 60, SEAT_Y + (scanning ? frame(t, 200, 2) : 0), true);
    p.rect(68, SEAT_Y + (scanning ? frame(t, 200, 2) : 0), 1, 1, scanning && frame(t, 100, 2) ? "y" : "r");

    if (scanning) p.rect(SCREEN[0], SCREEN[1] + frame(t, 100, 4), 8, 1, "c");
    else screenIdle(p, t);
    if (between(t, 2200, 2700) && (t < 2450 || frame(t, 100, 2))) p.draw(S.bigX, MON_X + 2, MON_Y + 1);

    GAMES.forEach((g, i) => {
      const send = 200 + i * 300;
      const bob = between(t, send, send + 300) ? -1 : 0;
      p.draw(g.sprite, g.x, g.y + bob);
      if (between(t, send, send + 700)) pulse(p, gamePath(g.c), seg(t, send, send + 700));

      const [cx, cy] = g.c;
      const fly = 2700 + i * 150;
      const slam = 3300 + i * 300;
      if (between(t, fly, fly + 500)) {
        const [x, y] = hop(seg(t, fly, fly + 500), MON_X + 2, MON_Y, cx + 6, cy - 6, 8);
        p.draw(S.hammerUp, x, y);
      } else if (between(t, fly + 500, slam)) p.draw(S.hammerUp, cx + 6, cy - 6);
      if (between(t, slam, slam + 250)) p.draw(S.burst, cx - 4, cy - 4);
      if (between(t, slam, slam + 350)) p.draw(S.hammerDown, cx - 2, cy - 5, true);
      if (between(t, slam + 350, 5300)) p.draw(S.bigX, cx - 4, cy - 4);
    });
    border(p);
  },
};

const ORE: Point = [8, 24];
const CRACKS: Point[][] = [
  [[6, 3], [5, 4], [6, 5], [7, 6]],
  [[4, 6], [3, 7], [8, 7], [9, 8], [5, 8], [6, 9]],
];
const SHARDS = [
  [-8, 10, "m"],
  [-3, 14, "t"],
  [4, 12, "m"],
  [9, 8, "t"],
  [12, 11, "m"],
] as const;
const DASH: Point = [86, 21];
const dashPath: Point[] = [
  [MON_X + 14, 21],
  [76, 21],
  [76, 28],
  [DASH[0] - 1, 28],
];
const BARS = [
  [3, "y"],
  [5, "g"],
  [4, "c"],
  [6, "o"],
  [7, "t"],
] as const;

/** Mojang: an ore breaks, its signal reaches a computer, and the computer fills a dashboard */
export const telemetryScene: Scene = {
  width: W,
  height: H,
  duration: 5200,
  poster: 4700,
  paint(p) {
    const { t } = p;
    outdoor(p);

    if (t < 1800) {
      p.draw(S.ore, ORE[0], ORE[1]);
      CRACKS.slice(0, Math.floor(t / 600)).flat().forEach(([x, y]) => p.rect(ORE[0] + x, ORE[1] + y, 1, 1, "k"));
      const swing = t % 600;
      if (swing < 350) p.draw(S.pickUp, 18, 8);
      else {
        p.draw(S.pickHit, 15, 21);
        if (swing < 450) p.draw(S.burst, 10, 22);
      }
    } else if (t < 2300) {
      const k = seg(t, 1800, 2300);
      for (const [dx, lift, color] of SHARDS) {
        const [x, y] = hop(k, 14, 30, 14 + dx, 34, lift);
        p.rect(x, y, 2, 2, color);
      }
    }
    if (t >= 1900) {
      const [gx, gy] = hop(seg(t, 1900, 2200), 12, 31, 12, 31, 6);
      p.draw(S.gem, gx, gy - (t >= 2200 ? frame(t, 300, 2) : 0));
    }

    p.draw(S.desk, DESK_X, 27);
    p.draw(S.monitor, MON_X, MON_Y);
    cable(p, dashPath);
    p.draw(S.dashboard, DASH[0], DASH[1]);

    let flash = false;
    for (let i = 0; i < 3; i++) {
      const start = 2300 + i * 250;
      if (between(t, start, start + 700)) {
        const [x, y] = hop(seg(t, start, start + 700), 14, 28, SCREEN[0] + 3, SCREEN[1] + 1, 14);
        p.rect(x - 1, y - 1, 3, 3, "k");
        p.rect(x, y, 1, 1, "c");
      }
      if (between(t, start + 700, start + 850)) flash = true;
    }
    if (flash) p.rect(SCREEN[0], SCREEN[1], 8, 4, "c");
    else screenIdle(p, t);

    if (between(t, 3300, 3800)) pulse(p, dashPath, seg(t, 3300, 3800));
    const base = DASH[1] + 10;
    BARS.forEach(([height, color], i) => {
      const h = Math.round(height * easeOut(seg(t, 3800 + i * 120, 4300 + i * 120)));
      if (h) p.rect(DASH[0] + 4 + i * 3, base - h, 2, h, color);
    });
    if (t >= 4500 && frame(t, 200, 2)) p.rect(DASH[0] + 16, base - 8, 1, 1, "w");
    border(p);
  },
};

const SHELF = [
  { sprite: S.terminal, x: 76 },
  { sprite: S.chart, x: 88 },
  { sprite: S.cloud, x: 99 },
];
const SUMMER = 1600;

/** Internships: three summers, three things shipped to the shelf */
export const internScene: Scene = {
  width: W,
  height: H,
  duration: 5400,
  poster: 5000,
  paint(p) {
    const { t } = p;
    const summers = Math.min(3, Math.floor(t / SUMMER) + 1);
    office(p, { sunK: t < SUMMER * 3 ? (t % SUMMER) / SUMMER : 1 });

    p.rect(30, 4, 11, 10, "k");
    p.rect(31, 5, 9, 8, "w");
    p.rect(31, 5, 9, 2, "r");
    for (let j = 0; j < summers; j++) p.rect(32 + j * 3, 9, 2, 2, "k");

    p.rect(73, 22, 36, 3, "k");
    p.rect(74, 23, 34, 1, "n");
    p.rect(76, 25, 1, 3, "k");
    p.rect(105, 25, 1, 3, "k");

    workstation(p, frame(t, 200, 2));
    screenIdle(p, t);

    SHELF.forEach((item, i) => {
      const born = i * SUMMER + 400;
      const land = born + 700;
      if (t < born) return;
      const [x, y] = t < land ? hop(seg(t, born, land), SCREEN[0], MON_Y + 1, item.x, 15, 10) : [item.x, 15];
      p.draw(item.sprite, x, y);
    });
    border(p);
  },
};

const CONFETTI = ["r", "y", "b", "g"];

/** Degree: a cap toss outside school, with a plane overhead for the semester abroad */
export const degreeScene: Scene = {
  width: W,
  height: H,
  duration: 5200,
  poster: 1900,
  paint(p) {
    const { t } = p;
    outdoor(p);
    p.draw(S.school, 6, 16);

    const dy = between(t, 800, 1000) ? 1 : between(t, 1000, 1400) ? -Math.sin(Math.PI * seg(t, 1000, 1400)) * 4 : 0;
    p.draw(S.student, 50, 20 + dy);
    if (between(t, 1000, 2600)) {
      const [x, y] = hop(seg(t, 1000, 2600), 50, 16, 50, 16, 14);
      p.draw(S.cap, x, y, frame(t, 120, 2) === 1);
    } else p.draw(S.cap, 50, 16 + dy);

    for (let j = 0; j < 10; j++) {
      const k = seg(t, 1100 + j * 60, 2300 + j * 60);
      if (k <= 0 || k >= 1) continue;
      p.rect(40 + j * 3 + Math.round(Math.sin(k * 6 + j) * 2), lerp(2, 34, k), 1, 1, CONFETTI[j % 4]);
    }

    if (between(t, 2600, 4600)) {
      const x = lerp(-14, 114, seg(t, 2600, 4600));
      const y = 5 + frame(t, 250, 2);
      for (let i = 1; i <= 3; i++) p.rect(x - i * 5, y + 3, 3, 1, p.dark ? "m" : "w");
      p.draw(S.plane, x, y);
    }
    border(p);
  },
};

/* ---------- 16×16 icons ---------- */

const ICON = 16;

export const hammerIcon: Scene = {
  width: ICON,
  height: ICON,
  duration: 1200,
  poster: 800,
  paint(p) {
    if (p.t < 700) p.draw(S.hammerUp, 3, 2);
    else {
      if (p.t < 900) p.draw(S.burst, 7, 7);
      p.draw(S.hammerDown, 2, 5);
    }
  },
};

export const fileIcon: Scene = {
  width: ICON,
  height: ICON,
  duration: 1600,
  poster: 1000,
  paint(p) {
    p.draw(S.miniMonitor, 6, 7);
    if (p.t < 900) {
      const [x, y] = hop(seg(p.t, 0, 900), 0, 0, 7, 6, 3);
      p.draw(S.file, x, y);
    } else if (p.t < 1400) p.rect(9, 10, 4, 2, "g");
  },
};

export const robotIcon: Scene = {
  width: ICON,
  height: ICON,
  duration: 2000,
  poster: 0,
  paint(p) {
    p.draw(S.robotHead, 2, 3);
    p.rect(7, 3, 2, 1, frame(p.t, 250, 2) ? "y" : "r");
    if (between(p.t, 1500, 1650)) {
      p.rect(4, 7, 8, 2, "l");
      p.rect(5, 8, 2, 1, "k");
      p.rect(9, 8, 2, 1, "k");
    }
  },
};

const SPARKLES: Point[] = [
  [5, 4],
  [10, 7],
  [6, 11],
];

export const oreIcon: Scene = {
  width: ICON,
  height: ICON,
  duration: 1800,
  poster: 300,
  paint(p) {
    p.draw(S.ore, 2, 2);
    const [x, y] = SPARKLES[frame(p.t, 600, 3)];
    p.rect(x, y, 1, 1, "w");
    if (p.t % 600 < 300) {
      p.rect(x - 1, y, 3, 1, "w");
      p.rect(x, y - 1, 1, 3, "w");
    }
  },
};

export const sunIcon: Scene = {
  width: ICON,
  height: ICON,
  duration: 1000,
  poster: 0,
  paint(p) {
    p.draw(S.sun, 4, 4);
    if (frame(p.t, 500, 2) === 0) {
      p.rect(8, 1, 1, 1, "y");
      p.rect(8, 14, 1, 1, "y");
      p.rect(1, 8, 1, 1, "y");
      p.rect(14, 8, 1, 1, "y");
    }
  },
};

export const capIcon: Scene = {
  width: ICON,
  height: ICON,
  duration: 1200,
  poster: 0,
  paint(p) {
    p.draw(S.cap, 3, 6 - frame(p.t, 300, 2), frame(p.t, 600, 2) === 1);
  },
};
