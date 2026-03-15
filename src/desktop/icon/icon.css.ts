/* Icon — draggable desktop icon with resting and dragging states */

/** Base: absolutely positioned column layout, non-selectable for drag UX */
export const iconBase =
  "group absolute flex w-20 cursor-pointer select-none flex-col items-center gap-1.5 rounded-lg p-2 transition-colors";

/** Resting state: subtle hover highlight */
export const iconResting = "hover:bg-(--color-icon-hover)";

/** Dragging state: lift above everything, scale up, fade for a "lifted" feel */
export const iconDragging = "z-50 scale-105 opacity-80 shadow-lg";

/** Icon card — frosted glass effect via backdrop-blur */
export const cardBase =
  "flex h-14 w-14 items-center justify-center rounded-xl border border-(--color-border) bg-(--color-icon-bg) backdrop-blur-sm transition-shadow";

/** Card resting state: small shadow, grows on group hover */
export const cardResting = "shadow-sm group-hover:shadow-md";

/** Card dragging state: deep shadow for elevation */
export const cardDragging = "shadow-xl";

/** SVG glyph — accent-colored stroke icon */
export const glyph = "h-6 w-6 text-(--color-accent)";

/** Label — monospace to match the developer/terminal aesthetic */
export const label = "max-w-full font-mono text-[11px] font-medium text-(--color-icon-label)";
