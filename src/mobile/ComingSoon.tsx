import { useTheme, useDeviceLayout } from "../shared/index.ts";

const btnClass =
  "flex h-8 w-8 items-center justify-center rounded-full border border-(--color-border) bg-(--color-surface-raised) text-(--color-text-secondary) transition-colors hover:text-(--color-accent) hover:border-(--color-accent)";

export function ComingSoon() {
  const { theme, toggleTheme } = useTheme();
  const { toggleLayout } = useDeviceLayout();

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-(--color-surface) px-8 text-center">
      {/* Decorative grid dots */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--color-text-primary) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Toggle buttons — top right */}
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <button
          onClick={toggleTheme}
          className={btnClass}
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        >
          {theme === "dark" ? (
            <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
              <path
                fillRule="evenodd"
                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          )}
        </button>

        <button
          onClick={toggleLayout}
          className={btnClass}
          aria-label="Switch to desktop view"
        >
          <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
            <path
              fillRule="evenodd"
              d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm11 1H6v6h8V6z"
              clipRule="evenodd"
            />
            <path d="M7 17h6v-2H7v2z" />
          </svg>
        </button>
      </div>

      <div className="relative z-10 max-w-md">
        <div className="mb-8 font-mono text-xs font-medium tracking-[0.3em] uppercase text-(--color-accent)">
          davega.net
        </div>

        <h1 className="mb-4 text-4xl font-bold tracking-tight text-(--color-text-primary)">
          Mobile experience
          <br />
          <span className="text-(--color-accent)">coming soon</span>
        </h1>

        <p className="mb-10 text-base leading-relaxed text-(--color-text-secondary)">
          This site is built as an interactive desktop — best experienced on a
          larger screen. A dedicated mobile layout is on the way.
        </p>

        <div className="inline-flex items-center gap-2 rounded-full border border-(--color-border) bg-(--color-surface-raised) px-4 py-2 font-mono text-xs text-(--color-text-muted)">
          <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-(--color-accent)" />
          Under construction
        </div>
      </div>
    </div>
  );
}
