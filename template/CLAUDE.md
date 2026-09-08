# CLAUDE.md

## What this is

A new product on `@fracazo/design-system`, written by `ds-init` from the
package's `template/`: Next 16, Tailwind v4, the package, one blank brand
file, the guardrails on. Rewrite the top of this file to describe the
product and keep the rules below.

## Read first

When shaping, building, reviewing or writing copy for user-facing UI, load
`node_modules/@fracazo/design-system/skills/product-design/SKILL.md` first
It
names the request mode, routes to the reference that applies and cites rules
by stable ID. Skip it for backend-only work, telemetry, generated files and
tests with no shipped UI.

`node_modules/@fracazo/design-system/DESIGN.md` is the written authority:
who the reader is, the priority order, how a page is composed, the reject
list. `css/roles.css` in the same package holds the roles and the brand
contract. The component intent lives in each component's source.

## Rules

- The brand lives in `src/system/brands/*.css` and nowhere else. No colour
  literal, radius literal or clamp() size in a `className`; ESLint errors on
  them. A value the roles do not cover is a proposal for the design-system
  repo, not a local addition.
- Components come from `@fracazo/design-system/ui/*`. Never copy one into
  this repo to change it; change it upstream and bump the dependency. A
  component that must import app code is the exception and stays here.
- `pnpm lint` runs ESLint and the brand contract check and must pass before
  a merge. `pnpm typecheck` and `pnpm build` too.
- Never use em dashes, anywhere. Commas, colons, full stops instead.
- Feature branch, then fast-forward merge to `main`; no PRs. Conventional
  Commits, present tense.
- Do not add dependencies without discussing first.

## Tooling notes

- pnpm 11: `pnpm-workspace.yaml` approves the native build scripts and
  excludes `@fracazo/design-system` from the minimum-release-age gate, so a
  fresh release of the package installs the day it ships.
- The site follows the system colour scheme; there is no manual toggle. The
  inline script in `layout.tsx` sets `.dark` before first paint and
  `ThemeSync` follows live changes.
