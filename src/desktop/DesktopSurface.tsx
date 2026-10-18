import { useState, useRef } from "react";
import { DragDropProvider } from "@dnd-kit/react";
import { Background } from "../shared/index.ts";
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

/** Where a new (or un-expanded) window lands: offset from the top-left, below the toolbar. */
function defaultWindowPosition() {
  return { x: window.innerWidth * 0.2, y: window.innerHeight * 0.15 + 40 };
}

interface DesktopSurfaceProps {
  onToggleLayout: () => void;
}

/**
 * DesktopSurface — root container for the desktop metaphor.
 * Manages icon positions, window state, and drag-end deltas.
 */
export function DesktopSurface({ onToggleLayout }: DesktopSurfaceProps) {
  const [positions, setPositions] =
    useState<IconPosition[]>(calcInitialPositions);
  const [openWindows, setOpenWindows] = useState<WindowState[]>([]);

  /** Monotonically increasing counter for z-index stacking — each open/focus bumps it. */
  const zCounter = useRef(1);

  /**
   * Drag guard: when a drag finishes, onClick still fires on the icon.
   * This flag is set on dragEnd and cleared next frame to suppress the
   * spurious click that would otherwise re-open or focus a window.
   */
  const justDragged = useRef(false);

  /** Opens a new window centered on screen, or brings an existing one to front (FR-008). */
  function openWindow(sectionId: string) {
    if (justDragged.current) return;

    setOpenWindows((prev) => {
      const existing = prev.find((w) => w.id === sectionId);
      if (existing) {
        const z = ++zCounter.current;
        return prev.map((w) =>
          w.id === sectionId ? { ...w, zIndex: z, closing: false } : w,
        );
      }
      return [
        ...prev,
        {
          id: sectionId,
          ...defaultWindowPosition(),
          expanded: false,
          zIndex: ++zCounter.current,
        },
      ];
    });
  }

  /** Marks a window as closing — triggers exit animation. */
  function closeWindow(sectionId: string) {
    setOpenWindows((prev) =>
      prev.map((w) => (w.id === sectionId ? { ...w, closing: true } : w)),
    );
  }

  /** Removes a window from state after its exit animation completes. */
  function removeWindow(sectionId: string) {
    setOpenWindows((prev) => prev.filter((w) => w.id !== sectionId));
  }

  /** Toggles between default (centered) and expanded (full desktop area) size. */
  function toggleExpand(sectionId: string) {
    setOpenWindows((prev) =>
      prev.map((w) =>
        w.id === sectionId ? { ...w, expanded: !w.expanded } : w,
      ),
    );
  }

  /** Brings a window to front by bumping its z-index. No-op if already on top. */
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

        // Window drag IDs are prefixed "window-" (e.g. "window-about").
        // Icon drag IDs are bare section IDs (e.g. "about").
        if (id.startsWith("window-")) {
          const sectionId = id.slice(7);
          setOpenWindows((prev) =>
            prev.map((w) => {
              if (w.id !== sectionId) return w;
              // Dragging an expanded window drops it back to the default spot before applying the delta
              const from = w.expanded ? defaultWindowPosition() : w;
              return { ...w, x: from.x + transform.x, y: from.y + transform.y, expanded: false };
            }),
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
        <Toolbar onToggleLayout={onToggleLayout} />
        <IconGrid positions={positions} onIconClick={openWindow} />
        {openWindows.map((w) => {
          const section = SECTIONS.find((s) => s.id === w.id);
          // Every section has a position from calcInitialPositions
          const iconPos = positions.find((p) => p.id === w.id)!;
          return (
            <Window
              key={w.id}
              sectionId={w.id}
              label={section?.label ?? w.id}
              x={w.x}
              y={w.y}
              expanded={w.expanded}
              zIndex={w.zIndex}
              closing={w.closing}
              iconX={iconPos.x + 36}
              iconY={iconPos.y + 36}
              onClose={() => closeWindow(w.id)}
              onClosed={() => removeWindow(w.id)}
              onExpand={() => toggleExpand(w.id)}
              onFocus={() => focusWindow(w.id)}
            />
          );
        })}
      </div>
    </DragDropProvider>
  );
}
