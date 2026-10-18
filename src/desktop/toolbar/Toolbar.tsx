import * as css from "./toolbar.css.ts";
import { ThemeToggle } from "../../shared/index.ts";

interface ToolbarProps {
  onToggleLayout: () => void;
}

export function Toolbar({ onToggleLayout }: ToolbarProps) {
  return (
    <header className={css.toolbar}>
      <div className={css.wordmark}>davega.net</div>

      <div className={css.actions}>
        <ThemeToggle className={css.btn} iconClassName={css.icon} />

        <button
          onClick={onToggleLayout}
          className={css.btn}
          aria-label="Toggle mobile preview"
          title="Toggle mobile preview"
        >
          <svg viewBox="0 0 20 20" fill="currentColor" className={css.icon}>
            <path d="M7 2a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V4a2 2 0 00-2-2H7zm3 14a1 1 0 100-2 1 1 0 000 2z" />
          </svg>
        </button>
      </div>
    </header>
  );
}
