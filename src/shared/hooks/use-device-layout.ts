import { useState, useEffect, useCallback, useMemo } from "react";
import { Layout } from "../types.ts";
import type { LayoutMode } from "../types.ts";

const DESKTOP_MQ = "(min-width: 768px)";

function detectLayout(): LayoutMode {
  return window.matchMedia(DESKTOP_MQ).matches ? Layout.DESKTOP : Layout.MOBILE;
}

export function useDeviceLayout() {
  const [detected, setDetected] = useState<LayoutMode>(detectLayout);
  const [override, setOverride] = useState<LayoutMode | null>(null);

  // Track viewport width changes to auto-switch layout
  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_MQ);
    const handler = (e: MediaQueryListEvent) => {
      setDetected(e.matches ? Layout.DESKTOP : Layout.MOBILE);
      setOverride(null); // FR-004a: resize cancels manual override
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const layout = override ?? detected;

  const toggleLayout = useCallback(() => {
    setOverride((prev) => {
      if (prev !== null) return null; // toggle back to auto-detect
      return detected === Layout.DESKTOP ? Layout.MOBILE : Layout.DESKTOP;
    });
  }, [detected]);

  const isOverridden = override !== null;

  return useMemo(
    () => ({ layout, toggleLayout, isOverridden }),
    [layout, toggleLayout, isOverridden],
  );
}
