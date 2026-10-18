import { useEffect, useRef, useState } from "react";
import { Background, SECTIONS, ThemeToggle } from "../shared/index.ts";
import { SECTION_CONTENT } from "../sections/index.ts";
import * as css from "./mobile-layout.css.ts";

/** Intro timing (ms): particles fade in, rows rise in one by one, then About opens. */
const ROWS_START = 400;
const ROW_STAGGER = 90;
const AUTO_OPEN_DELAY = 1300;
const AUTO_OPEN_ID = "about";

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

interface MobileLayoutProps {
  onToggleLayout: () => void;
}

export function MobileLayout({ onToggleLayout }: MobileLayoutProps) {
  const [openId, setOpenId] = useState<string | null>(() => (prefersReducedMotion() ? AUTO_OPEN_ID : null));
  const autoOpenTimer = useRef<number>(undefined);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    autoOpenTimer.current = window.setTimeout(() => setOpenId(AUTO_OPEN_ID), AUTO_OPEN_DELAY);
    return () => window.clearTimeout(autoOpenTimer.current);
  }, []);

  function toggle(id: string) {
    // A tap before the auto-open wins over it
    window.clearTimeout(autoOpenTimer.current);
    setOpenId((prev) => (prev === id ? null : id));
  }

  return (
    <div className={css.root}>
      <div className={css.backdrop}>
        <Background />
      </div>

      <header className={css.header} style={{ animationDelay: `${ROWS_START}ms` }}>
        <div className={css.wordmark}>davega.net</div>
        <div className={css.actions}>
          <ThemeToggle className={css.btn} iconClassName={css.icon} />
          <button onClick={onToggleLayout} className={css.btn} aria-label="Switch to desktop view" title="Switch to desktop view">
            <svg viewBox="0 0 20 20" fill="currentColor" className={css.icon}>
              <path
                fillRule="evenodd"
                d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm11 1H6v6h8V6z"
                clipRule="evenodd"
              />
              <path d="M7 17h6v-2H7v2z" />
            </svg>
          </button>
        </div>
      </header>

      <main className={css.list}>
        {SECTIONS.map((section, i) => {
          const Content = SECTION_CONTENT[section.id];
          const open = openId === section.id;
          const panelId = `section-panel-${section.id}`;
          return (
            <section
              key={section.id}
              className={css.row}
              style={{ animationDelay: `${ROWS_START + i * ROW_STAGGER}ms` }}
            >
              <button
                className={css.rowButton}
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => toggle(section.id)}
              >
                <span className={css.rowLabel}>{section.label}</span>
                <svg
                  viewBox="0 0 24 24"
                  className={`${css.indicator} ${open ? css.indicatorOpen : css.indicatorClosed}`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.75}
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </button>
              <div id={panelId} className={`${css.panel} ${open ? css.panelOpen : css.panelClosed}`} inert={!open}>
                <div className={css.panelInner}>
                  <div className={css.panelContent}>{Content ? <Content /> : null}</div>
                </div>
              </div>
            </section>
          );
        })}
      </main>
    </div>
  );
}
