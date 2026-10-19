import * as css from "./toolbar.css.ts";
import { ThemeToggle } from "../../shared/index.ts";

export function Toolbar() {
  return (
    <header className={css.toolbar}>
      <h1 className={css.wordmark}>David Vega Ramirez</h1>
      <ThemeToggle className={css.btn} iconClassName={css.icon} />
    </header>
  );
}
