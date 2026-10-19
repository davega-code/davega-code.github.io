import { useState, useEffect } from "react";
import { Layout } from "../types.ts";
import type { LayoutMode } from "../types.ts";

const DESKTOP_MQ = "(min-width: 768px)";

function detectLayout(): LayoutMode {
  return window.matchMedia(DESKTOP_MQ).matches ? Layout.DESKTOP : Layout.MOBILE;
}

/** Desktop or mobile, following the viewport width. */
export function useDeviceLayout(): LayoutMode {
  const [layout, setLayout] = useState<LayoutMode>(detectLayout);

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_MQ);
    const handler = (e: MediaQueryListEvent) => setLayout(e.matches ? Layout.DESKTOP : Layout.MOBILE);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return layout;
}
