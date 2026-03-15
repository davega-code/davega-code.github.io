/* Toolbar — fixed top bar with site wordmark and action buttons */

/** Pinned to top, semi-transparent with backdrop blur for depth.
 *  Height set via --spacing-toolbar-h token so icons can offset below it. */
export const toolbar =
  "fixed top-0 right-0 left-0 z-50 flex h-(--spacing-toolbar-h) items-center justify-between border-b border-(--color-toolbar-border) bg-(--color-toolbar-bg)/80 px-4 backdrop-blur-md";

/** Site wordmark — monospace uppercase for a terminal/developer aesthetic */
export const wordmark = "font-mono text-xs font-semibold tracking-[0.2em] uppercase text-(--color-text-primary)";

/** Button group with tight spacing */
export const actions = "flex items-center gap-1.5";

/** Toolbar button — bordered card style with accent highlight on hover */
export const btn =
  "flex h-7 w-7 items-center justify-center rounded-md border border-(--color-border) bg-(--color-surface-raised) text-(--color-text-secondary) transition-colors hover:text-(--color-accent) hover:border-(--color-accent)";

/** SVG icon sizing inside toolbar buttons */
export const icon = "h-3.5 w-3.5";
