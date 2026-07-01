# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

> **Self-Maintaining Document**: As you work in this codebase, keep this file current. When you discover new conventions, add projects, change tooling, or encounter caveats — update this file immediately so future sessions start with accurate context. Remove anything that becomes stale.

## Workspace Structure

Multi-repo workspace. Each subdirectory is its own GitHub repository with independent git history, dependencies, and deployment. No root-level package.json or monorepo tooling.

| Directory | Description | Status |
|-----------|-------------|--------|
| `davega-code.github.io/` | Personal website at davega.net (React 19 + Vite + TypeScript) | Active |
| `ux-experiments/` | Archived UX experiments | Archive - ignore |

## Task Tracking

Always use the todo list (`/todo`) when implementing changes to maintain a concise order of operations. Create tasks before starting multi-step work.

## Website (`cd davega-code.github.io`)

### Commands

pnpm is the package manager.

```bash
pnpm install          # Install dependencies
pnpm dev              # Dev server (port 3000, auto-opens browser)
pnpm build            # Type-check (tsc -b) + Vite build to ./build
pnpm lint             # ESLint
pnpm preview          # Serve production build locally
```

### Deployment

Auto-deploys to GitHub Pages via GitHub Actions on push to `main`. Custom domain: **davega.net**.

### Architecture

Desktop metaphor personal website — visitors interact with draggable icons on a desktop surface; clicking an icon opens a content section in a window (with minimize, enlarge, close controls). React 19 SPA on Vite. Build output: `./build`. GitHub Pages SPA redirect pattern (`public/404.html` + inline script in `index.html`).

**Folder structure** (`src/`):
- `desktop/` — Desktop shell: `background/`, `toolbar/`, `icon/`, `window/`
- `sections/` — Co-located content: `about/`, `contact/`, `newsletter/`, `photography/`
- `shared/` — Cross-cutting utilities, hooks, types

Sections are pure content (no desktop shell awareness). Adding a new section = one new folder in `sections/`.

See `davega-code.github.io/.claude/rules` for full project-specific conventions.

### Conventions

- TypeScript strict mode, ESM modules
- ESLint 9 flat config, kebab-case folders, PascalCase components
- Co-location: each component folder holds all related files
- No test framework configured
