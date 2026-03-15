import { useState, useRef } from "react";
import { DragDropProvider } from "@dnd-kit/react";
import { Background } from "./background/index.ts";
import { Toolbar } from "./toolbar/index.ts";
import { IconGrid } from "./icon/index.ts";
import { Window } from "./window/index.ts";
import { SECTIONS } from "../shared/types.ts";
import type { IconPosition, WindowState } from "../shared/types.ts";
import * as css from "./desktop-surface.css.ts";

/** Stacks icons vertically in a left column, spaced 100px apart below the toolbar. */
function calcInitialPositions(): IconPosition[] {
  return SECTIONS.map((s, i) => ({
    id: s.id,
    x: 24,
    y: 64 + i * 100,
  }));
}

/**
 * DesktopSurface — root container for the desktop metaphor.
 * Manages icon positions, window state, and drag-end deltas.
 */
export function DesktopSurface() {
  const [positions, setPositions] =
    useState<IconPosition[]>(calcInitialPositions);
  const [openWindows, setOpenWindows] = useState<WindowState[]>([]);
  const zCounter = useRef(1);
  const justDragged = useRef(false);

  function openWindow(sectionId: string) {
    if (justDragged.current) return;

    setOpenWindows((prev) => {
      const existing = prev.find((w) => w.id === sectionId);
      if (existing) {
        const z = ++zCounter.current;
        return prev.map((w) => (w.id === sectionId ? { ...w, zIndex: z } : w));
      }
      return [
        ...prev,
        {
          id: sectionId,
          x: window.innerWidth * 0.2,
          y: window.innerHeight * 0.15 + 40,
          expanded: false,
          zIndex: ++zCounter.current,
        },
      ];
    });
  }

  function closeWindow(sectionId: string) {
    setOpenWindows((prev) => prev.filter((w) => w.id !== sectionId));
  }

  function toggleExpand(sectionId: string) {
    setOpenWindows((prev) =>
      prev.map((w) =>
        w.id === sectionId ? { ...w, expanded: !w.expanded } : w,
      ),
    );
  }

  function focusWindow(sectionId: string) {
    setOpenWindows((prev) => {
      const win = prev.find((w) => w.id === sectionId);
      if (!win || win.zIndex === zCounter.current) return prev;
      const z = ++zCounter.current;
      return prev.map((w) => (w.id === sectionId ? { ...w, zIndex: z } : w));
    });
  }

  return (
    <DragDropProvider
      onDragEnd={(event) => {
        justDragged.current = true;
        requestAnimationFrame(() => {
          justDragged.current = false;
        });

        if (event.canceled) return;

        const { source, transform } = event.operation;
        if (!source || (!transform.x && !transform.y)) return;

        const id = String(source.id);

        if (id.startsWith("window-")) {
          const sectionId = id.slice(7);
          setOpenWindows((prev) =>
            prev.map((w) =>
              w.id === sectionId
                ? {
                    ...w,
                    x: w.expanded ? window.innerWidth * 0.2 + transform.x : w.x + transform.x,
                    y: w.expanded ? window.innerHeight * 0.15 + 40 + transform.y : w.y + transform.y,
                    expanded: false,
                  }
                : w,
            ),
          );
        } else {
          setPositions((prev) =>
            prev.map((p) =>
              p.id === id
                ? { ...p, x: p.x + transform.x, y: p.y + transform.y }
                : p,
            ),
          );
        }
      }}
    >
      <div className={css.surface}>
        <Background />
        <Toolbar />
        <IconGrid positions={positions} onIconClick={openWindow} />
        {openWindows.map((w) => {
          const section = SECTIONS.find((s) => s.id === w.id);
          return (
            <Window
              key={w.id}
              sectionId={w.id}
              label={section?.label ?? w.id}
              x={w.x}
              y={w.y}
              expanded={w.expanded}
              zIndex={w.zIndex}
              onClose={() => closeWindow(w.id)}
              onExpand={() => toggleExpand(w.id)}
              onFocus={() => focusWindow(w.id)}
            />
          );
        })}
      </div>
    </DragDropProvider>
  );
}
