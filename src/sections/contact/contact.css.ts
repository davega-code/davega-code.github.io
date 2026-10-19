/* Contact — headline plus one card per channel; cards sit side by side once the container is wide enough */

export const root = "@container flex flex-col gap-6";

export const title = "text-2xl font-semibold tracking-tight text-(--color-text-primary)";

export const cards = "grid gap-3 @md:grid-cols-2";

/** Whole card is the link; arrow nudges out on hover */
export const card =
  "group relative flex items-start gap-4 rounded-lg border border-(--color-border) bg-(--color-surface-raised) p-4 transition-colors hover:border-(--color-accent) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-accent)";

export const tile = "flex size-11 shrink-0 items-center justify-center rounded-md text-(--color-surface)";

export const tileColors = {
  blue: "bg-(--color-bauhaus-blue)",
  ink: "bg-(--color-text-primary)",
} as const;

export const glyph = "size-5";

export const body = "flex min-w-0 flex-col gap-1 pr-6";

export const label = "font-semibold text-(--color-text-primary)";

export const handle = "font-mono text-xs text-(--color-text-muted) break-all";

export const blurb = "text-(--color-text-secondary)";

export const arrow =
  "absolute top-4 right-4 size-4 text-(--color-text-muted) transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-(--color-accent) motion-reduce:transition-none";

export const footnote = "font-mono text-xs text-(--color-text-muted)";