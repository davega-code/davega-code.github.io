import { useState, useEffect, useCallback, useMemo } from "react";
import type { LayoutMode } from "../types.ts";

const DESKTOP_MQ = "(min-width: 768px)";

function detectLayout(): LayoutMode {
  return window.matchMedia(DESKTOP_MQ).matches ? "desktop" : "mobile";
}

export function useDeviceLayout() {
  const [detected, setDetected] = useState<LayoutMode>(detectLayout);
  const [override, setOverride] = useState<LayoutMode | null>(null);

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_MQ);
    const handler = (e: MediaQueryListEvent) => {
      setDetected(e.matches ? "desktop" : "mobile");
      setOverride(null); // FR-004a: resize cancels manual override
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const layout = override ?? detected;

  const toggleLayout = useCallback(() => {
    setOverride((prev) => {
      if (prev !== null) return null; // toggle back to auto-detect
      return detected === "desktop" ? "mobile" : "desktop";
    });
  }, [detected]);

  const isOverridden = override !== null;

  return useMemo(
    () => ({ layout, toggleLayout, isOverridden }),
    [layout, toggleLayout, isOverridden],
  );
}
