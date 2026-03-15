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

export interface WindowState {
  id: string;
  x: number;
  y: number;
  expanded: boolean;
  zIndex: number;
}

export const SECTIONS: SectionDefinition[] = [
  { id: "about", label: "About", icon: "user" },
  { id: "contact", label: "Contact", icon: "mail" },
  { id: "newsletter", label: "Newsletter", icon: "file-text" },
  { id: "photography", label: "Photography", icon: "camera" },
];
