import { useRef, useState, useEffect, type ComponentType } from "react";
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

const ANIM_DURATION = 250;
const ANIM_EASING = "cubic-bezier(0.2, 0, 0, 1)";

type MountPhase = "pre-mount" | "mounted" | "settled";

interface WindowProps {
  sectionId: string;
  label: string;
  x: number;
  y: number;
  expanded: boolean;
  zIndex: number;
  closing?: boolean;
  iconX: number;
  iconY: number;
  onClose: () => void;
  onClosed: () => void;
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
  closing,
  iconX,
  iconY,
  onClose,
  onClosed,
  onExpand,
  onFocus,
}: WindowProps) {
  const handleRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<MountPhase>("pre-mount");

  // Drag ID is prefixed "window-" so DesktopSurface.onDragEnd can distinguish
  // window drags from icon drags (which use bare section IDs like "about").
  const { ref: dragRef } = useDraggable({
    id: `window-${sectionId}`,
    modifiers: [RestrictToWindow],
    handle: handleRef,
  });

  // First frame renders at scale(0); next frame triggers the open transition.
  useEffect(() => {
    const frame = requestAnimationFrame(() => setPhase("mounted"));
    return () => cancelAnimationFrame(frame);
  }, []);

  const Content = SECTION_CONTENT[sectionId];

  // Derive animation state from mount phase + closing prop (no syncing effects).
  const isCollapsed = phase === "pre-mount" || closing;
  const hasTransition = (phase === "mounted" && !closing) || closing;
  const isIdle = phase === "settled" && !closing;

  // Window's visual top-left depends on expanded state.
  const winX = expanded ? 0 : x;
  const winY = expanded ? 40 : y; // 40 = toolbar height

  const originX = iconX - winX;
  const originY = iconY - winY;

  // Build inline style: position + animation transforms.
  const style: React.CSSProperties = expanded
    ? { zIndex, height: `calc(100vh - var(--spacing-toolbar-h))` }
    : { left: x, top: y, zIndex };

  if (!isIdle) {
    style.transformOrigin = `${originX}px ${originY}px`;
  }

  if (isCollapsed) {
    style.transform = "scale(0)";
    style.opacity = 0;
  }

  // Only apply transition during enter/exit — NOT during idle,
  // otherwise dnd-kit drag transforms would animate with our duration.
  if (hasTransition) {
    style.transition = `transform ${ANIM_DURATION}ms ${ANIM_EASING}, opacity ${ANIM_DURATION}ms ${ANIM_EASING}`;
  }

  function handleTransitionEnd(e: React.TransitionEvent) {
    if (e.propertyName !== "opacity") return;
    if (closing) onClosed();
    else if (phase === "mounted") setPhase("settled");
  }

  return (
    <div
      ref={dragRef}
      className={`${css.container} ${expanded ? css.expanded : css.defaultSize}`}
      style={style}
      onMouseDown={onFocus}
      onTransitionEnd={handleTransitionEnd}
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
