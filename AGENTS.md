# AGENTS.md

Guidance for AI coding agents (Copilot, Claude, Codex, etc.) working in this repository.

> Keep this file current. When conventions, folders, tooling or architecture change, update it in the same change. Remove anything stale.

## Overview

Personal website at **davega.net** with a desktop-metaphor UI. Visitors drag icons on a desktop surface; clicking one opens that section in a window (minimize, enlarge, close). Sections: About, Contact, Newsletter, Photography. Mobile visitors (viewport < 768px) get the same sections as full-width expandable rows over the particle background; About opens automatically after the intro.

## Commands

pnpm is the only package manager: never use `npm`, `npx` or `yarn`, even when a skill or doc says to. Use `pnpm dlx` for one-off tools.

Work on a feature branch in the main checkout; do not create git worktrees for this repo.

```bash
pnpm install   # Install dependencies
pnpm dev       # Dev server on port 3000
pnpm build     # Type-check (tsc -b) + Vite build to ./build
pnpm lint      # ESLint
pnpm preview   # Serve production build locally
```

No test framework is configured. Validate changes with `pnpm lint` and `pnpm build`.

A Copilot CLI `sessionEnd` hook (`.github/hooks/stop-dev-servers.json`) stops this repo's Vite dev/preview servers when a session ends. The `record-pid` plugin in `vite.config.ts` lists each server's PID in `<tmp>/davega-net-dev-servers/`, and `.github/hooks/stop-dev-servers.mjs` stops them. The hook uses Node rather than PowerShell because the CLI aborts `sessionEnd` hooks after about 1.5s.

### Browser validation

Always validate UI changes in a real browser with Playwright, using the **accessibility snapshot** (roles, names, `expanded`/`checked` state), not screenshots or pictures. Snapshots are text, so they can be diffed and asserted. Use either:

- the Playwright MCP servers in `.mcp.json`: `playwright` (own browser) or `playwright-cdp` (attaches to a browser started with `--remote-debugging-port=9222`). Use `browser_snapshot`, not `browser_take_screenshot`.
- the `playwright-cli` skill (`.agents/skills/playwright-cli/`): `pnpm dlx @playwright/cli snapshot`. The skill is upstream and says `npm`/`npx`; this repo uses pnpm only, so run every command through `pnpm dlx @playwright/cli` instead.

Run `pnpm dev` (or `pnpm build && pnpm preview`) and check both layouts. Phone-sized viewports (< 768px) get the mobile layout.

## Tech stack

- React 19, TypeScript (strict, ESM), Vite, pnpm
- Tailwind CSS v4 via `@tailwindcss/vite`; dark mode via `@custom-variant dark`
- @dnd-kit v2 (`@dnd-kit/react`, `@dnd-kit/dom`) for drag-and-drop
- Build output is `./build`, not `dist/`

## Deployment

Auto-deploys to GitHub Pages via `.github/workflows/deploy.yml` on push to `main`. Custom domain in `CNAME`. There is no client-side routing; unknown paths get GitHub Pages' own 404.

## Folder structure

```
src/
├── desktop/          # Desktop shell: toolbar/, icon/, window/, DesktopSurface.tsx
├── mobile/           # MobileLayout: particle intro, then sections as expandable rows
├── sections/         # Pure content: about/, contact/, newsletter/, photography/; index.ts (SECTION_CONTENT)
├── shared/           # background/ (particles), theme-toggle/, hooks/ (use-theme, use-device-layout), types.ts (SECTIONS), barrel
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
3. Map the id to the component in `SECTION_CONTENT` in `src/sections/index.ts` (used by both layouts).
4. If using a new icon name, add its SVG path to `ICON_GLYPHS` in `src/desktop/icon/Icon.tsx` (unknown names fall back to `user`).

### Background

The particle background is `src/shared/background/Background.tsx`, used by both layouts: 60–140 dots (random count per page load) in three sizes, half ink and half Bauhaus primaries, glowing in dark mode. Each follows one of three CSS keyframe paths (drift, rise, diagonal) with a sway; larger dots move faster for depth. Keyframes are `--animate-particle-*` in `src/index.css`; the mobile intro uses `--animate-fade-in` and `--animate-row-in`.

- All randomness (positions, durations, phases) is generated once in `makeParticles` and kept in state. Never call `Math.random()` during render: desktop re-renders (dragging icons, opening windows) would change the inline styles and restart every animation.
- Animate only `transform`/`opacity` and keep `motion-reduce:animate-none`; under reduced motion the dots sit still at their random spots.
- Known accessibility gap (owner decision): the motion loops forever with no pause control, which falls short of WCAG 2.2.2 (Pause, Stop, Hide). Only `prefers-reduced-motion` stops it.

Light-mode colours are paper grey `#ebe9e4` with Bauhaus primaries; all text tokens are checked to ≥4.5:1 on every surface in both themes. Re-check contrast when changing them.

## Agent skills

Project skills live in `.agents/skills/<name>/SKILL.md` (the open Agent Skills format, read by Copilot and other agents). They are copied from upstream at the pinned commit below and trimmed to this stack: no Next.js, SSR/RSC or server rules, and no compiled `AGENTS.md`/README/metadata build files (a nested `AGENTS.md` gets loaded as instructions). To update one, re-copy from upstream and re-apply the trim.

| Skill | Use for | Source | Pinned commit | Local changes |
|-------|---------|--------|---------------|---------------|
| `frontend-design` | Visual direction, typography, non-generic UI | [anthropics/skills](https://github.com/anthropics/skills/tree/main/skills/frontend-design) | `dbd4588` | None |
| `web-design-guidelines` | Accessibility / UX review (fetches rules live) | [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills/tree/main/skills/web-design-guidelines) | `063bee9` | None |
| `composition-patterns` | Component APIs, compound components | [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills/tree/main/skills/composition-patterns) | `063bee9` | Build files removed; `name` matches folder |
| `react-best-practices` | React performance and correctness | [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills/tree/main/skills/react-best-practices) | `063bee9` | 30 of 70 rules kept; index rewritten for a client-only Vite SPA |
| `playwright-cli` | Browser validation via accessibility snapshots | [microsoft/playwright-cli](https://github.com/microsoft/playwright-cli/tree/main/skills/playwright-cli) | `83368cb` | None |
