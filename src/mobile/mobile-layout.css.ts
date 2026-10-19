/* MobileLayout — particle backdrop with the sections as full-width expandable rows */

/** Surface colour on the root so the particle fade starts from the theme background, not white */
export const root = "relative min-h-svh bg-(--color-surface) text-(--color-text-primary)";

/** Fades the shared particle background in first; Background itself is fixed behind everything */
export const backdrop = "animate-fade-in motion-reduce:animate-none";

export const header =
  "relative flex items-center justify-between px-6 pt-6 pb-10 animate-fade-in motion-reduce:animate-none";

export const wordmark = "font-mono text-xs font-semibold tracking-[0.2em] uppercase";

/** Circular toggle button, 40px for a comfortable tap target */
export const btn =
  "flex size-10 items-center justify-center rounded-full border border-(--color-border) bg-(--color-surface-raised) text-(--color-text-secondary) transition-colors hover:text-(--color-accent) hover:border-(--color-accent) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-accent)";

export const icon = "size-4";

export const list = "relative";

/** Each row rises in on load; delay is set inline to stagger them */
export const row = "border-b first:border-t border-(--color-border) animate-row-in motion-reduce:animate-none";

export const rowButton =
  "flex w-full items-center justify-between px-6 py-5 text-left focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-(--color-accent)";

export const rowLabel = "text-3xl font-semibold tracking-tight";

/** Plus that turns into a cross when the row is open */
export const indicator =
  "size-6 shrink-0 transition-transform duration-300 ease-out motion-reduce:transition-none";
export const indicatorClosed = "text-(--color-text-muted)";
export const indicatorOpen = "rotate-45 text-(--color-accent)";

/** Collapsible panel: animates grid rows from 0fr to 1fr so height follows the content.
 *  Visibility is transitioned too, so closed content leaves the accessibility tree and tab order only after it collapses. */
export const panel =
  "grid transition-[grid-template-rows,visibility] duration-400 ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none";
export const panelClosed = "grid-rows-[0fr] invisible";
export const panelOpen = "grid-rows-[1fr]";

export const panelInner = "overflow-hidden";

export const panelContent = "px-6 pb-6 text-base leading-relaxed text-(--color-text-secondary)";
