import * as css from "../coming-soon.css.ts";

export function Blog() {
  return (
    <div className={css.root}>
      <svg className={css.illustration} viewBox="0 0 144 112" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path className={css.paper} d="M28 12h66l18 18v70H28zM94 12v18h18" />
        <path className={css.blue} d="M44 46h48M44 58h48M44 70h30" />
        <circle className={css.yellow} cx="112" cy="84" r="18" />
        <path className={css.red} stroke="none" d="m87 83 31-31 8 8-31 31-12 4z" />
      </svg>
      <h2 className={css.heading}>Coming soon</h2>
      <p className={css.caption}>Notes from the workbench.</p>
      <p className={css.description}>
        A space for writing about software, side projects, and things I learn along the way.
        Nothing published just yet. Check back soon.
      </p>
    </div>
  );
}