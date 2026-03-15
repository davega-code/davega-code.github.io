export type ThemeMode = "light" | "dark";

export type LayoutMode = "desktop" | "mobile";

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

export const SECTIONS: SectionDefinition[] = [
  { id: "about", label: "About", icon: "user" },
  { id: "contact", label: "Contact", icon: "mail" },
  { id: "newsletter", label: "Newsletter", icon: "file-text" },
  { id: "photography", label: "Photography", icon: "camera" },
];
