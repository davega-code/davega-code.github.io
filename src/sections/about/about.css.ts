/* About — who I am, career timeline, stack and side projects */

export const root = "flex flex-col gap-8";

export const intro = "flex items-center gap-4";

/** Initials stand in until a portrait photo is added */
export const portrait =
  "flex size-16 shrink-0 items-center justify-center rounded-full border-2 border-(--color-bauhaus-red) bg-(--color-surface-overlay) font-mono text-lg font-semibold text-(--color-text-primary)";

export const greeting = "text-xl font-semibold tracking-tight text-(--color-text-primary)";

/** "Who am I" story: short paragraphs with a larger opening line */
export const story = "flex max-w-prose flex-col gap-3 text-base leading-relaxed";

export const opener = "text-lg leading-snug text-(--color-text-primary)";

export const block = "flex flex-col gap-3";

export const heading =
  "font-mono text-xs font-semibold tracking-[0.2em] uppercase text-(--color-text-muted)";

export const timeline = "flex flex-col gap-8 border-l-2 border-(--color-border) pl-4";

export const entry = "flex flex-col gap-2";

export const entryHeader = "flex items-center gap-3";

/** 16px pixel icon drawn at 2×; the tile keeps it legible on both themes */
export const entryIcon =
  "flex size-10 shrink-0 items-center justify-center rounded-md border border-(--color-border) bg-(--color-surface-overlay)";

/** Parent the scene canvas measures to pick its whole-number scale */
export const scene = "mt-1 w-full";

export const when = "font-mono text-xs text-(--color-text-muted)";

export const role = "font-semibold text-(--color-text-primary)";

export const tags = "flex flex-wrap gap-2";

export const tag =
  "rounded-full border border-(--color-border) px-3 py-1 font-mono text-xs text-(--color-text-secondary)";

export const projects = "flex flex-col gap-3";

export const link =
  "font-semibold text-(--color-accent) underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-accent)";
