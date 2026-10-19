import { sprite } from "../../../shared/pixel-art/index.ts";

const row = (...parts: [string, number][]) => parts.map(([c, n]) => c.repeat(n)).join("");

/** Desk monitor; screen interior is 8×4 at (3, 3) */
export const monitor = sprite([
  row(["k", 14]),
  row(["k", 1], ["l", 12], ["k", 1]),
  row(["k", 1], ["l", 1], ["k", 10], ["l", 1], ["k", 1]),
  ...Array.from({ length: 4 }, () => row(["k", 1], ["l", 1], ["k", 1], ["C", 8], ["k", 1], ["l", 1], ["k", 1])),
  row(["k", 1], ["l", 1], ["k", 10], ["l", 1], ["k", 1]),
  row(["k", 1], ["l", 12], ["k", 1]),
  row(["k", 14]),
  ".....kmmk.....",
  "...kkkkkkkk...",
]);

/** Small networked monitor; screen interior is 4×2 at (3, 3) */
export const miniMonitor = sprite([
  row(["k", 10]),
  row(["k", 1], ["l", 8], ["k", 1]),
  row(["k", 1], ["l", 1], ["k", 6], ["l", 1], ["k", 1]),
  row(["k", 1], ["l", 1], ["k", 1], ["C", 4], ["k", 1], ["l", 1], ["k", 1]),
  row(["k", 1], ["l", 1], ["k", 1], ["C", 4], ["k", 1], ["l", 1], ["k", 1]),
  row(["k", 1], ["l", 1], ["k", 6], ["l", 1], ["k", 1]),
  row(["k", 10]),
  "....kk....",
  "..kkkkkk..",
]);

/** Wide dashboard screen; interior is 16×7 at (3, 3) */
export const dashboard = sprite([
  row(["k", 22]),
  row(["k", 1], ["l", 20], ["k", 1]),
  row(["k", 1], ["l", 1], ["k", 18], ["l", 1], ["k", 1]),
  ...Array.from({ length: 7 }, () => row(["k", 1], ["l", 1], ["k", 1], ["B", 16], ["k", 1], ["l", 1], ["k", 1])),
  row(["k", 1], ["l", 1], ["k", 18], ["l", 1], ["k", 1]),
  row(["k", 1], ["l", 20], ["k", 1]),
  row(["k", 22]),
  row([".", 9], ["k", 1], ["m", 2], ["k", 1], [".", 9]),
  row([".", 6], ["k", 10], [".", 6]),
]);

/** 26×9 desk; the top is at row 0 */
export const desk = sprite([
  row(["k", 26]),
  row(["k", 1], ["n", 24], ["k", 1]),
  row(["k", 1], ["N", 24], ["k", 1]),
  row(["k", 26]),
  ...Array.from({ length: 5 }, () => row([".", 1], ["k", 1], ["N", 1], ["k", 1], [".", 18], ["k", 1], ["N", 1], ["k", 1], [".", 1])),
]);

/** Seated reviewer facing right; hands at (8, 10), feet on row 17 */
export const worker = sprite([
  "...kkkkkk.....",
  "..khhhhhhk....",
  ".khhhhhhhhk...",
  ".khhhhssssk...",
  ".khhhsskssk...",
  ".khhssssssk...",
  "..khssssSk....",
  "...kkSSkk.....",
  "..kbbbbbbk....",
  ".kbbbbbbbbk...",
  ".kbbbbbbsskk..",
  ".kbbbbbbk.....",
  ".kddddddddddk.",
  ".kkkkkkkkkddk.",
  ".........kddk.",
  ".........kddk.",
  ".........kddk.",
  ".........kkkkk",
]);

/** Seated robot reviewer facing right; antenna tip at (5, 0), eyes at (7, 4) */
export const robot = sprite([
  ".....r........",
  ".....k........",
  "..kkkkkkkk....",
  "..kllllllk....",
  "..kllllcck....",
  "..kllllcck....",
  "..kllllllk....",
  "..kmmmmmmk....",
  "..kkkkkkkk....",
  "....kmmk......",
  "..kllllllk....",
  ".klllyyllmmk..",
  ".kllllllk.....",
  ".kmmmmmmmmmmk.",
  ".kkkkkkkkkmmk.",
  ".........kmmk.",
  ".........kmmk.",
  ".........kkkkk",
]);

export const report = sprite([
  "kkkkkkkkk",
  "kkpppppkk",
  "kpkpppkpk",
  "kppkpkppk",
  "kpppkpppk",
  "kpppppppk",
  "kkkkkkkkk",
]);

export const file = sprite([
  "kkkkk..",
  "kpppkk.",
  "kpppppk",
  "kpkkkpk",
  "kpppppk",
  "kpkkkpk",
  "kpppppk",
  "kpkkppk",
  "kkkkkkk",
]);

export const bigX = sprite([
  "kk.....kk",
  "krk...krk",
  ".krk.krk.",
  "..krkrk..",
  "...krk...",
  "..krkrk..",
  ".krk.krk.",
  "krk...krk",
  "kk.....kk",
]);

/** Ban hammer held up; handle bottom at (5, 11) */
export const hammerUp = sprite([
  "kkkkkkkkkk",
  "klllllllmk",
  "kmmmmmmmdk",
  "kmmmmmmmdk",
  "kkkkkkkkkk",
  "...knnk...",
  "...knNk...",
  "...knNk...",
  "...knNk...",
  "...knNk...",
  "...knNk...",
  "...kkkk...",
]);

/** Ban hammer mid-slam: head on the right, striking downward */
export const hammerDown = sprite([
  ".......kkkkk",
  ".......klmdk",
  ".......klmdk",
  "kkkkkkkklmdk",
  "knnnnnnklmdk",
  "kNNNNNNklmdk",
  "kkkkkkkklmdk",
  ".......klmdk",
  ".......klmdk",
  ".......kkkkk",
]);

export const burst = sprite([
  "....y....",
  ".y..y..y.",
  "..y...y..",
  ".........",
  "yy.....yy",
  ".........",
  "..y...y..",
  ".y..y..y.",
  "....y....",
]);

export const banText = sprite([
  "rr...r..r..r",
  "r.r.r.r.rr.r",
  "rr..rrr.r.rr",
  "r.r.r.r.r..r",
  "rr..r.r.r..r",
]);

export const controller = sprite([
  ".kkkkkkkkkk.",
  "kddddddddddk",
  "kdlddddddrdk",
  "klllddddrdbk",
  "kdlddddddbdk",
  "kddddkkddddk",
  "kdddk..kdddk",
  ".kkk....kkk.",
]);

export const grassBlock = sprite([
  "kkkkkkkkkk",
  "kggggGgggk",
  "kgGggggGgk",
  "kGGgGGGgGk",
  "knnNnnnNnk",
  "knNnnNnnnk",
  "knnnnnNnnk",
  "kNnnNnnnNk",
  "knnnnNnnnk",
  "kkkkkkkkkk",
]);

export const crosshair = sprite([
  "...kkkk...",
  ".kkrrrrkk.",
  ".krkkkkrk.",
  "krkwkkwkrk",
  "krkkrrkkrk",
  "krkkrrkkrk",
  "krkwkkwkrk",
  ".krkkkkrk.",
  ".kkrrrrkk.",
  "...kkkk...",
]);

export const ore = sprite([
  "kkkkkkkkkkkk",
  "kmmmlmmmmdmk",
  "kmttmmmdmmmk",
  "kmtwtmmmmlmk",
  "kmmttmmmtmmk",
  "kdmmmmmtwtmk",
  "kmmlmmmmttmk",
  "kmmmmtmmmmdk",
  "kmdmtwtmmmmk",
  "kmmmmttmmlmk",
  "kmmlmmmmdmmk",
  "kkkkkkkkkkkk",
]);

export const gem = sprite([
  ".kkk.",
  "kttwk",
  "ktttk",
  ".ktk.",
  "..k..",
]);

/** Pickaxe raised; handle bottom at (5, 10) */
export const pickUp = sprite([
  "..kkkkkkk..",
  ".kmmmmmmmk.",
  "kmkkknkkkmk",
  "kk..knk..kk",
  "....knk....",
  "....knk....",
  "....kNk....",
  "....kNk....",
  "....kNk....",
  "....kNk....",
  "....kkk....",
]);

/** Pickaxe striking left; head on the left, handle end at (10, 5) */
export const pickHit = sprite([
  "..kk.......",
  ".kmk.......",
  "kmk........",
  "kmk........",
  "kmkkkkkkkkk",
  "kmnnnnNNNNk",
  "kmkkkkkkkkk",
  "kmk........",
  "kmk........",
  ".kmk.......",
  "..kk.......",
]);

export const terminal = sprite([
  "kkkkkkkk",
  "kllllllk",
  "kkkkkkkk",
  "kgkkkkkk",
  "kkgkkkkk",
  "kgkkggkk",
  "kkkkkkkk",
]);

export const chart = sprite([
  "kkkkkkkk",
  "kwwwwwrk",
  "kwwwbwrk",
  "kwywbwrk",
  "kwywbwrk",
  "kwwwwwwk",
  "kkkkkkkk",
]);

export const cloud = sprite([
  "...kkk....",
  "..kwwwk...",
  ".kwwwwwkk.",
  "kwwwwwwwwk",
  "kwlwwwwwlk",
  "kllllllllk",
  ".kkkkkkkk.",
]);

export const sun = sprite([
  "....y....",
  ".y.....y.",
  "...kkk...",
  "..kyyyk..",
  "y.kyyyk.y",
  "..kyyyk..",
  "...kkk...",
  ".y.....y.",
  "....y....",
]);

export const school = sprite([
  row([".", 11], ["k", 2], [".", 11]),
  row([".", 9], ["k", 2], ["r", 2], ["k", 2], [".", 9]),
  row([".", 7], ["k", 2], ["r", 6], ["k", 2], [".", 7]),
  row([".", 5], ["k", 2], ["r", 10], ["k", 2], [".", 5]),
  row([".", 3], ["k", 2], ["r", 14], ["k", 2], [".", 3]),
  row([".", 1], ["k", 2], ["r", 18], ["k", 2], [".", 1]),
  row(["k", 24]),
  row(["k", 1], ["l", 22], ["k", 1]),
  row(["k", 24]),
  ...Array.from({ length: 8 }, () => "kwlkdkwlkdkwlkdkwlkdkwlk"),
  row(["k", 24]),
  row(["k", 1], ["l", 22], ["k", 1]),
  row(["k", 24]),
]);

/** Graduate facing the viewer; head top at row 0 */
export const student = sprite([
  "..kkkkkk..",
  ".khhhhhhk.",
  ".khhhhhhk.",
  ".kssssssk.",
  ".kskssksk.",
  ".kssssssk.",
  "..kSSSSk..",
  ".kkbbbbkk.",
  "kbkbbbbkbk",
  "kbkbbbbkbk",
  "kskbbbbksk",
  ".kkbbbbkk.",
  "..kddddk..",
  "..kdkkdk..",
  "..kdkkdk..",
  ".kkk..kkk.",
]);

export const cap = sprite([
  "...kkk...",
  ".kkdddkk.",
  "kdddddddk",
  ".kkdddkky",
  "..kkkkk.y",
]);

export const plane = sprite([
  "kk..........",
  "kwk...kk....",
  "kwwkkkwwkkk.",
  ".kwwwwwwwwwk",
  "..kkkkwwkkk.",
  ".....kk.....",
]);

/** Front-facing robot head for the icon; eyes are 2×2 at (3, 4) and (7, 4) */
export const robotHead = sprite([
  ".....rr.....",
  ".....kk.....",
  ".kkkkkkkkkk.",
  ".kllllllllk.",
  ".klccllcclk.",
  ".klccllcclk.",
  ".kllllllllk.",
  ".klmmmmmmlk.",
  ".kkkkkkkkkk.",
  "...kmmmmk...",
]);
