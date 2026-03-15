import { useState, useEffect, useCallback } from "react";
import type { ThemeMode } from "../types.ts";

const DARK_MQ = "(prefers-color-scheme: dark)";

function getSystemTheme(): ThemeMode {
  return window.matchMedia(DARK_MQ).matches ? "dark" : "light";
}

function syncClass(theme: ThemeMode) {
  document.documentElement.classList.toggle("dark", theme === "dark");
}

export function useTheme() {
  const [theme, setTheme] = useState<ThemeMode>(getSystemTheme);

  useEffect(() => {
    syncClass(theme);
  }, [theme]);

  useEffect(() => {
    const mq = window.matchMedia(DARK_MQ);
    const handler = (e: MediaQueryListEvent) => {
      const next = e.matches ? "dark" : "light";
      setTheme(next);
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  return { theme, toggleTheme } as const;
}
