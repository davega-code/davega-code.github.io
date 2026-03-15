/* ComingSoon — mobile placeholder with centered content and decorative backdrop */

/** Root: vertically and horizontally centered flex layout */
export const root = "flex min-h-svh flex-col items-center justify-center bg-(--color-surface) px-8 text-center";

/** Decorative dot-grid backdrop — larger dots than desktop, slightly higher opacity in dark mode.
 *  pointer-events-none so it doesn't block interaction. */
export const texture = "pointer-events-none fixed inset-0 dot-grid-lg opacity-[0.03] dark:opacity-[0.05]";

/** Floating toggle buttons — fixed top-right so they stay visible on scroll */
export const actions = "fixed top-4 right-4 z-50 flex gap-2";

/** Circular toggle button — rounder than toolbar variant for a floating-button look */
export const btn =
  "flex h-8 w-8 items-center justify-center rounded-full border border-(--color-border) bg-(--color-surface-raised) text-(--color-text-secondary) transition-colors hover:text-(--color-accent) hover:border-(--color-accent)";

/** SVG icon sizing inside toggle buttons */
export const icon = "h-4 w-4";

/** Content card — elevated above the dot-grid */
export const content = "relative z-10 max-w-md";

/** Monospace wordmark — wide letter-spacing for a terminal/developer aesthetic */
export const wordmark = "mb-8 font-mono text-xs font-medium tracking-[0.3em] uppercase text-(--color-accent)";

/** Page title — large bold text with tight tracking */
export const title = "mb-4 text-4xl font-bold tracking-tight text-(--color-text-primary)";

/** Description paragraph — relaxed line-height for readability */
export const subtitle = "mb-10 text-base leading-relaxed text-(--color-text-secondary)";

/** Status badge — pill shape with monospace text */
export const badge =
  "inline-flex items-center gap-2 rounded-full border border-(--color-border) bg-(--color-surface-raised) px-4 py-2 font-mono text-xs text-(--color-text-muted)";

/** Pulsing accent dot inside the status badge */
export const pulse = "inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-(--color-accent)";
