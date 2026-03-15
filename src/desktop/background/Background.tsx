import * as css from "./background.css.ts";

export function Background() {
  return (
    <div className={css.background}>
      <div className={css.texture} />
      <div className={css.gradient} />
    </div>
  );
}
