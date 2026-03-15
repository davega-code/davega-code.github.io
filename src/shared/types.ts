export type ThemeMode = "light" | "dark";

export const Theme = {
  DARK: "dark",
  LIGHT: "light",
} as const satisfies Record<string, ThemeMode>;

export type LayoutMode = "desktop" | "mobile";

export const Layout = {
  DESKTOP: "desktop",
  MOBILE: "mobile",
} as const satisfies Record<string, LayoutMode>;

export interface SectionDefinition {
  id: string;
  label: string;
  icon: string;
}

export interface IconPosition {
  id: string;
  x: number;
  y: number;
}

/** Tracks an open window on the desktop surface. Presence in state = visible; removal = closed. */
export interface WindowState {
  /** Section ID (matches SectionDefinition.id) — one window per section */
  id: string;
  /** Horizontal pixel offset from left edge of desktop */
  x: number;
  /** Vertical pixel offset from top edge of desktop */
  y: number;
  /** When true, window fills the viewport below the toolbar */
  expanded: boolean;
  /** Stacking order — higher value renders on top of lower values */
  zIndex: number;
}

export const SECTIONS: SectionDefinition[] = [
  { id: "about", label: "About", icon: "user" },
  { id: "contact", label: "Contact", icon: "mail" },
  { id: "newsletter", label: "Newsletter", icon: "file-text" },
  { id: "photography", label: "Photography", icon: "camera" },
];
