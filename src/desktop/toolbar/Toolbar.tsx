import * as css from "./toolbar.css.ts";
import { ThemeToggle } from "../../shared/index.ts";

export function Toolbar() {
  return (
    <header className={css.toolbar}>
      <div className={css.wordmark}>davega.net</div>
      <ThemeToggle className={css.btn} iconClassName={css.icon} />
    </header>
  );
}
