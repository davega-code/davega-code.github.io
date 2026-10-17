# AGENTS.md

Guidance for AI coding agents (Copilot, Claude, Codex, etc.) working in this repository.

> Keep this file current. When conventions, folders, tooling or architecture change, update it in the same change. Remove anything stale.

## Overview

Personal website at **davega.net** with a desktop-metaphor UI. Visitors drag icons on a desktop surface; clicking one opens that section in a window (minimize, enlarge, close). Sections: About, Contact, Newsletter, Photography. Mobile visitors (viewport < 768px) see a "coming soon" placeholder.

## Commands

pnpm is the package manager.

```bash
pnpm install   # Install dependencies
pnpm dev       # Dev server on port 3000
pnpm build     # Type-check (tsc -b) + Vite build to ./build
pnpm lint      # ESLint
pnpm preview   # Serve production build locally
```

No test framework is configured. Validate changes with `pnpm lint` and `pnpm build`.

## Tech stack

- React 19, TypeScript (strict, ESM), Vite, pnpm
- Tailwind CSS v4 via `@tailwindcss/vite`; dark mode via `@custom-variant dark`
- @dnd-kit v2 (`@dnd-kit/react`, `@dnd-kit/dom`) for drag-and-drop
- Build output is `./build`, not `dist/`

## Deployment

Auto-deploys to GitHub Pages via `.github/workflows/deploy.yml` on push to `main`. Custom domain in `CNAME`. SPA routing uses the GitHub Pages redirect pattern (`public/404.html` + inline script in `index.html`).

## Folder structure

```
src/
├── desktop/          # Desktop shell: background/, toolbar/, icon/, window/, DesktopSurface.tsx
├── mobile/           # Coming-soon placeholder
├── sections/         # Pure content: about/, contact/, newsletter/, photography/
├── shared/           # hooks/ (use-theme, use-device-layout), types.ts (SECTIONS), barrel
├── App.tsx           # Layout router: desktop vs mobile via useDeviceLayout()
├── index.css         # Tailwind entry, theme tokens, dark overrides
└── main.tsx
```

## Conventions

- **Folders** kebab-case; **components** PascalCase (`Window.tsx`); **hooks** in `shared/hooks/` as `use-*.ts`.
- **Barrel exports**: each folder exposes its public API via `index.ts`.
- **Co-location**: everything for a component lives in its folder.
- **Styling**: Tailwind class strings live in a co-located `<name>.css.ts` file as named exports (e.g. `window/window.css.ts`), using CSS custom-property tokens like `bg-(--color-surface-raised)`. Dark mode via `.dark` on `<html>` and `dark:` variants.
- ESLint 9 flat config (`eslint.config.js`).

## Architecture

- `desktop/` and `mobile/` are sibling layout trees; shared concerns live in `shared/`.
- **Sections are pure content** — no knowledge of icons, windows or drag behavior. The desktop shell owns all chrome.
- **Theme**: `useTheme()` toggles `.dark` on `<html>`; an inline script in `index.html` prevents FOUC.
- Single package; no workspaces or monorepo tooling.

### Adding a section

1. Create `src/sections/<id>/` with `<Name>.tsx` and `index.ts`.
2. Add `{ id, label, icon }` to `SECTIONS` in `src/shared/types.ts`.
3. Map the id to the component in `SECTION_CONTENT` in `src/desktop/window/Window.tsx`.
4. If using a new icon name, add its SVG path to `ICON_GLYPHS` in `src/desktop/icon/Icon.tsx` (unknown names fall back to `user`).

## Agent skills

Project skills live in `.agents/skills/<name>/SKILL.md` (the open Agent Skills format, read by Copilot and other agents). They are copied from upstream at the pinned commit below and trimmed to this stack: no Next.js, SSR/RSC or server rules, and no compiled `AGENTS.md`/README/metadata build files (a nested `AGENTS.md` gets loaded as instructions). To update one, re-copy from upstream and re-apply the trim.

| Skill | Use for | Source | Pinned commit | Local changes |
|-------|---------|--------|---------------|---------------|
| `frontend-design` | Visual direction, typography, non-generic UI | [anthropics/skills](https://github.com/anthropics/skills/tree/main/skills/frontend-design) | `dbd4588` | None |
| `web-design-guidelines` | Accessibility / UX review (fetches rules live) | [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills/tree/main/skills/web-design-guidelines) | `063bee9` | None |
| `composition-patterns` | Component APIs, compound components | [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills/tree/main/skills/composition-patterns) | `063bee9` | Build files removed; `name` matches folder |
| `react-best-practices` | React performance and correctness | [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills/tree/main/skills/react-best-practices) | `063bee9` | 30 of 70 rules kept; index rewritten for a client-only Vite SPA |
