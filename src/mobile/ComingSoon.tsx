import { useTheme, useDeviceLayout, Theme } from "../shared/index.ts";
import * as css from "./coming-soon.css.ts";

export function ComingSoon() {
  const { theme, toggleTheme } = useTheme();
  const { toggleLayout } = useDeviceLayout();

  const oppositeTheme = theme === Theme.DARK ? Theme.LIGHT : Theme.DARK;

  return (
    <div className={css.root}>
      <div className={css.texture} />

      <div className={css.actions}>
        <button
          onClick={toggleTheme}
          className={css.btn}
          aria-label={`Switch to ${oppositeTheme} mode`}
        >
          {theme === Theme.DARK ? (
            <svg viewBox="0 0 20 20" fill="currentColor" className={css.icon}>
              <path
                fillRule="evenodd"
                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg viewBox="0 0 20 20" fill="currentColor" className={css.icon}>
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          )}
        </button>

        <button
          onClick={toggleLayout}
          className={css.btn}
          aria-label="Switch to desktop view"
        >
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

      <div className={css.content}>
        <div className={css.wordmark}>davega.net</div>

        <h1 className={css.title}>
          Mobile experience
          <br />
          <span className="text-(--color-accent)">coming soon</span>
        </h1>

        <p className={css.subtitle}>
          This site is built as an interactive desktop — best experienced on a
          larger screen. A dedicated mobile layout is on the way.
        </p>

        <div className={css.badge}>
          <span className={css.pulse} />
          Under construction
        </div>
      </div>
    </div>
  );
}
