import * as css from "../coming-soon.css.ts";

export function Photography() {
  return (
    <div className={css.root}>
      <svg className={css.illustration} viewBox="0 0 144 112" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle className={css.yellow} cx="112" cy="24" r="16" />
        <path className={css.paper} d="M16 36h28l8-12h34l8 12h34v64H16z" />
        <circle className={css.blue} cx="72" cy="68" r="24" />
        <circle className={css.blue} cx="72" cy="68" r="14" />
        <circle className={css.red} cx="112" cy="48" r="4" />
        <path className={css.blue} d="m20 16 8 8m-16 0 8-8" />
      </svg>
      <h2 className={css.heading}>Coming soon</h2>
      <p className={css.caption}>A little more looking, a little less scrolling.</p>
      <p className={css.description}>
        Places, details, and moments through my lens. I'm putting a collection together;
        the gallery will live here.
      </p>
    </div>
  );
}
