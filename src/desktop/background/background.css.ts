/* Background — three-layer desktop backdrop */

/** Layer 1: full-screen base surface, behind all content */
export const background = "fixed inset-0 -z-10 bg-(--color-surface)";

/** Layer 2: dot-grid texture at near-invisible opacity for subtle depth.
 *  Slightly higher opacity in dark mode where the surface is darker. */
export const texture = "absolute inset-0 dot-grid opacity-[0.025] dark:opacity-[0.04]";

/** Layer 3: diagonal gradient wash — accent fades into overlay for warmth */
export const gradient =
  "absolute inset-0 bg-gradient-to-br from-(--color-accent)/3 via-transparent to-(--color-surface-overlay)/30";
