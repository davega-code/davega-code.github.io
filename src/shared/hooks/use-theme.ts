import { useState, useEffect, useCallback } from "react";
import { Theme } from "../types.ts";
import type { ThemeMode } from "../types.ts";

const DARK_MQ = "(prefers-color-scheme: dark)";

function getSystemTheme(): ThemeMode {
  return window.matchMedia(DARK_MQ).matches ? Theme.DARK : Theme.LIGHT;
}

/** Syncs the "dark" CSS class on <html> to activate dark-mode CSS variable overrides. */
function syncClass(theme: ThemeMode) {
  document.documentElement.classList.toggle("dark", theme === Theme.DARK);
}

export function useTheme() {
  const [theme, setTheme] = useState<ThemeMode>(getSystemTheme);

  // Apply the CSS class whenever theme changes
  useEffect(() => {
    syncClass(theme);
  }, [theme]);

  // Track OS-level color-scheme preference changes
  useEffect(() => {
    const mq = window.matchMedia(DARK_MQ);
    const handler = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? Theme.DARK : Theme.LIGHT);
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === Theme.DARK ? Theme.LIGHT : Theme.DARK));
  }, []);

  return { theme, toggleTheme } as const;
}
