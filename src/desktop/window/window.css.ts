/* Window — desktop window with title bar and content frame */

/** Window container: absolute positioned, rounded with shadow */
export const container =
  "absolute flex flex-col rounded-lg border border-(--color-border) bg-(--color-surface-raised) shadow-lg overflow-hidden";

/** Default window size — ~60% width, ~70% height */
export const defaultSize = "w-[60vw] h-[70vh]";

/** Expanded window: fixed, fills viewport below toolbar */
export const expanded =
  "!fixed !top-(--spacing-toolbar-h) !left-0 !w-screen !rounded-none !border-x-0";

/** Title bar: flex row with label left, buttons right */
export const titleBar =
  "flex h-9 shrink-0 cursor-grab items-center justify-between border-b border-(--color-border) bg-(--color-surface-overlay) px-3 active:cursor-grabbing";

/** Section label in the title bar */
export const titleLabel =
  "select-none font-mono text-xs font-semibold tracking-wide text-(--color-text-primary)";

/** Button group in the title bar */
export const titleActions = "flex items-center gap-1";

/** Title bar button — small circle with hover accent */
export const titleBtn =
  "flex h-5 w-5 items-center justify-center rounded-full text-(--color-text-muted) transition-colors hover:text-(--color-text-primary)";

/** Close button hover — red accent */
export const titleBtnClose =
  "hover:bg-red-500/15 hover:text-red-500 dark:hover:bg-red-400/15 dark:hover:text-red-400";

/** Expand button hover — green accent */
export const titleBtnExpand =
  "hover:bg-green-500/15 hover:text-green-500 dark:hover:bg-green-400/15 dark:hover:text-green-400";

/** Minimize button hover — yellow accent */
export const titleBtnMinimize =
  "hover:bg-yellow-500/15 hover:text-yellow-600 dark:hover:bg-yellow-400/15 dark:hover:text-yellow-400";

/** SVG icon size in title bar buttons */
export const titleIcon = "h-3 w-3";

/** Content area: scrollable, padded */
export const content =
  "flex-1 overflow-auto p-4 text-sm text-(--color-text-secondary)";
