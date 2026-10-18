/* Background — dust of ink and Bauhaus primaries drifting behind the desktop */

/** Full-screen base surface behind all content */
export const background = "fixed inset-0 -z-10 overflow-hidden bg-(--color-surface)";

/** Outer: random spot + travel path (duration/phase inline) */
export const particle = "absolute motion-reduce:animate-none";

/** Inner: the dot itself, with a gentle sway; glows in dark mode */
export const dot =
  "size-full rounded-full bg-current animate-particle-sway motion-reduce:animate-none dark:shadow-[0_0_10px_currentColor]";

export const sizes = {
  small: "size-[3px] opacity-40",
  medium: "size-[7px] opacity-60",
  large: "size-[14px] opacity-75",
} as const;

export const paths = {
  drift: "animate-particle-drift",
  rise: "animate-particle-rise",
  diagonal: "animate-particle-diagonal",
} as const;

export const colors = {
  ink: "text-(--color-text-primary)",
  red: "text-(--color-bauhaus-red)",
  yellow: "text-(--color-bauhaus-yellow)",
  blue: "text-(--color-bauhaus-blue)",
} as const;
