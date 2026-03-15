import { useRef, type ComponentType } from "react";
import { useDraggable } from "@dnd-kit/react";
import { RestrictToWindow } from "@dnd-kit/dom/modifiers";
import { About } from "../../sections/about/index.ts";
import { Contact } from "../../sections/contact/index.ts";
import { Newsletter } from "../../sections/newsletter/index.ts";
import { Photography } from "../../sections/photography/index.ts";
import * as css from "./window.css.ts";

/** Maps section IDs to their content components. Adding a section here makes it renderable in a window. */
const SECTION_CONTENT: Record<string, ComponentType> = {
  about: About,
  contact: Contact,
  newsletter: Newsletter,
  photography: Photography,
};

interface WindowProps {
  sectionId: string;
  label: string;
  x: number;
  y: number;
  expanded: boolean;
  zIndex: number;
  onClose: () => void;
  onExpand: () => void;
  onFocus: () => void;
}

/**
 * Window — desktop-metaphor window with title bar chrome and section content.
 *
 * Two refs work together for drag:
 *  - `dragRef` on the container → entire window moves as a unit during drag
 *  - `handleRef` on the title bar → only the title bar initiates drag
 *
 * Minimize and close both call `onClose` (same behavior for now).
 */
export function Window({
  sectionId,
  label,
  x,
  y,
  expanded,
  zIndex,
  onClose,
  onExpand,
  onFocus,
}: WindowProps) {
  const handleRef = useRef<HTMLDivElement>(null);

  // Drag ID is prefixed "window-" so DesktopSurface.onDragEnd can distinguish
  // window drags from icon drags (which use bare section IDs like "about").
  const { ref: dragRef } = useDraggable({
    id: `window-${sectionId}`,
    modifiers: [RestrictToWindow],
    handle: handleRef,
  });

  const Content = SECTION_CONTENT[sectionId];

  // Expanded windows use CSS class for fixed full-width, but still need
  // height via inline style (calc against toolbar token) and zIndex for stacking.
  // Default windows use inline left/top for drag-computed pixel positions.
  const positionStyle: React.CSSProperties = expanded
    ? { zIndex, height: `calc(100vh - var(--spacing-toolbar-h))` }
    : { left: x, top: y, zIndex };

  return (
    <div
      ref={dragRef}
      className={`${css.container} ${expanded ? css.expanded : css.defaultSize}`}
      style={positionStyle}
      onMouseDown={onFocus}
    >
      <div className={css.titleBar}>
        {/* Handle ref is only on the label area so @dnd-kit never intercepts
            pointer events on the buttons — they live outside the handle subtree. */}
        <div ref={handleRef} className={css.titleDragZone}>
          <span className={css.titleLabel}>{label}</span>
        </div>
        <div className={css.titleActions}>
          <button
            className={`${css.titleBtn} ${css.titleBtnMinimize}`}
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            aria-label={`Minimize ${label}`}
          >
            <svg viewBox="0 0 24 24" className={css.titleIcon} fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M5 12h14" />
            </svg>
          </button>
          <button
            className={`${css.titleBtn} ${css.titleBtnExpand}`}
            onClick={(e) => { e.stopPropagation(); onExpand(); }}
            aria-label={`Expand ${label}`}
          >
            <svg viewBox="0 0 24 24" className={css.titleIcon} fill="none" stroke="currentColor" strokeWidth={2}>
              {expanded
                ? <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
                : <rect x="3" y="3" width="18" height="18" rx="2" />
              }
            </svg>
          </button>
          <button
            className={`${css.titleBtn} ${css.titleBtnClose}`}
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            aria-label={`Close ${label}`}
          >
            <svg viewBox="0 0 24 24" className={css.titleIcon} fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
      <div className={css.content}>
        {Content ? <Content /> : null}
      </div>
    </div>
  );
}
