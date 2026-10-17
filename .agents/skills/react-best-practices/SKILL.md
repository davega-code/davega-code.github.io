---
name: react-best-practices
description: React performance and correctness rules for this client-only React 19 + Vite SPA. Use when writing, reviewing or refactoring React components, hooks, drag/window interactions, or code-splitting sections.
license: MIT
metadata:
  author: vercel (trimmed for davega.net)
  version: "1.0.0"
---

# React Best Practices

Trimmed from Vercel's react-best-practices for a static, client-rendered Vite SPA. Server, RSC, SSR/hydration, Next.js and data-fetching-library rules were removed because they do not apply here.

## Quick Reference

### Code splitting (HIGH)

- `bundle-conditional` - `import()` / `React.lazy` modules only when a feature (e.g. a section window) opens
- `bundle-preload` - Preload a chunk on hover/focus of the icon that opens it

### Re-render optimization (MEDIUM)

- `rerender-no-inline-components` - Don't define components inside components
- `rerender-derived-state-no-effect` - Derive state during render, not in effects
- `rerender-move-effect-to-event` - Put interaction logic in event handlers
- `rerender-functional-setstate` - Use functional setState for stable callbacks
- `rerender-use-ref-transient-values` - Use refs for high-frequency values (drag positions)
- `rerender-derived-state` - Subscribe to derived booleans, not raw values
- `rerender-dependencies` - Use primitive dependencies in effects
- `rerender-split-combined-hooks` - Split hooks with independent dependencies
- `rerender-lazy-state-init` - Pass a function to useState for expensive initial values
- `rerender-memo` - Extract expensive work into memoized components
- `rerender-memo-with-default-value` - Hoist default non-primitive props
- `rerender-simple-expression-in-memo` - Don't memo simple primitives
- `rerender-transitions` - Use startTransition for non-urgent updates
- `rerender-use-deferred-value` - Defer expensive renders to keep input responsive

### Rendering (MEDIUM)

- `rendering-activity` - Use `<Activity>` to hide (e.g. minimized windows) without losing state
- `rendering-conditional-render` - Use ternary, not `&&`, when the condition can be `0`
- `rendering-animate-svg-wrapper` - Animate a wrapper div, not the SVG element
- `rendering-svg-precision` - Reduce SVG coordinate precision
- `rendering-hoist-jsx` - Extract static JSX outside components
- `rendering-content-visibility` - `content-visibility: auto` for long lists/grids
- `rendering-usetransition-loading` - Prefer useTransition over manual loading flags

### Client (MEDIUM)

- `client-passive-event-listeners` - Passive listeners for touch/wheel
- `client-localstorage-schema` - Version, minimize and try/catch localStorage data

### JavaScript (MEDIUM)

- `js-batch-dom-css` - Avoid layout thrashing; don't interleave style writes and layout reads
- `js-tosorted-immutable` - Use `toSorted()` etc. so state is never mutated

### Advanced (LOW)

- `advanced-use-latest` - `useEffectEvent` for latest-value callbacks in effects
- `advanced-effect-event-deps` - Never put Effect Events in dependency arrays
- `advanced-init-once` - App-wide init once per load, not per mount

## How to Use

Read the rule file for details and examples: `rules/<rule-name>.md`.
