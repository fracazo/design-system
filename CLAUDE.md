# CLAUDE.md - @fracazo/design-system

## What this is

The brand-agnostic half of a product design system, published to npm as
`@fracazo/design-system` (public, MIT). It ships the roles a product can
name (tokens, the Tailwind v4 theme mapping, radius ramp, fluid type,
band rhythm, the eight aliasing semantics), a machine-readable brand
contract, two bins that hold a product's brand file to that contract and
compose its public `brand.css`, ESLint guardrails, and a showcase page.
Each product keeps its own brand file in its own repo; nothing brand-
specific lives here.

Consumers today: BirthGuide (`~/Developer/birthguide`, warm cream / espresso
/ rose) and birthplans.app (`~/Developer/birthplans`, same palette, brand
hue rotated to periwinkle). Both depend on the npm package and keep only a
brand file of their own. The system was extracted
from BirthGuide in September 2026; both products stay byte-identical in
rendering through every step, proven with BirthGuide's snapshot harness.

## Layout

- `src/`: `cn.ts`, `index.ts` (the `.` export) and `ui/*.tsx`, the 17
  shadcn-based components with their intent JSDoc, exported as `./ui/*`.
  Compiled by `tsc` to `dist/src/`; the class strings and `"use client"`
  directives survive compilation, which is what lets a consumer `@source`
  the dist. Stories stay in BirthGuide.
- `css/roles.css`: the system. The brand contract is the comment block at
  the top (`brand-contract:theme` / `:light` / `:dark`); the bins parse it.
- `guardrails/*.ts`: compiled by `tsc` to `dist/`, which is what publishes.
  `check-brand.ts` and `build-brand-css.ts` are bins (`ds-check-brand`,
  `ds-build-brand-css`); `eslint.ts` exports `designSystemGuardrails()`.
- `demo/index.html`: showcase template that links a served `/brand.css`.
- `DESIGN.md`: the written authority, in Vercel's design.md shape (front
  matter, reader, priority order, surface scopes, four passes, the visual
  system, components, guardrails, reject list, one chapter per brand). A
  prose rule is added only when the same correction has recurred; prefer a
  token, lint rule or contract entry that enforces itself.

## Rules

- Australian English everywhere, including comments and commit messages.
- Never use em dashes, anywhere. Commas, colons, full stops instead.
- No brand literal in `css/roles.css`, ever. If a value is needed, it is a
  role the brand file must supply; add it to the contract.
- The eight aliasing semantics (foreground, card, popover, primary, accent,
  ring and their foregrounds) live here once. The six divergent ones
  (secondary, muted, border, input, muted-foreground, accent-foreground)
  are brand values by design; never alias them.
- A new or renamed role is a minor version and a changelog note; a contract
  change a brand file must satisfy anew is a major version.
- Feature branch, then fast-forward merge to `main`; no PRs. Conventional
  Commits, present tense. (The initial scaffold went straight to main;
  that was the exception.)
- Do not add dependencies without discussing first. The package has no
  runtime dependencies: everything the components sit on is a peer, and
  each peer is mirrored as a devDependency only so `tsc` can resolve types.
  Dev tooling beyond that is `typescript`, `@types/node` and `@types/react`;
  there is deliberately no Storybook here (BirthGuide's local Storybook
  consumes the components instead).

## Verify a change

- `pnpm check` (tsc, no emit) and `pnpm build`. After a component change,
  confirm the compiled file still opens with its `"use client"` directive
  (13 of the 17 carry one) and that `pnpm pack` lists `dist/src/ui/*.js`.
- `node dist/guardrails/check-brand.js <a brand file>`: both product brand
  files must still satisfy the contract (currently 63 light, 48 dark,
  2 theme).
- `node dist/guardrails/build-brand-css.js --brand <file> --out /tmp/x.css
  --name X --url https://x --check` against a product's committed
  `public/brand.css`: declarations must match.
- Anything that can change a consumer's rendering is verified in the
  consumer with its snapshot harness (`pnpm design:snapshot` /
  `design:compare` in BirthGuide), never here by eye.

## Publishing

Alex publishes; it needs his npm login and a 2FA code at publish time:
`pnpm publish --access public` from this folder (it builds first), then
tag `vX.Y.Z` and push the tag. 0.1.0 and 0.2.0 are published (5 Sep 2026) and tagged
`v0.1.0`, `v0.2.0`. Enabling 2FA on the npm account had to be done on npmjs.com; the
CLI route (`npm profile enable-2fa`) is refused by the registry now.

## Roadmap (state as of 5 Sep 2026, evening)

- 4a DONE: this repo, first commit `d714eaa`, pushed to
  github.com/fracazo/design-system.
- 4b DONE (branch `claude/claude-md-phase-4b-5a17c7`, version 0.2.0):
  BirthGuide's 17 `src/components/ui/*` components and `cn` live in `src/`,
  exported as `.` and `./ui/*`, with the peerDependencies listed in
  `package.json`. `place-autocomplete` stayed in BirthGuide (it imports app
  code), as did the stories. The only source edits were the import paths
  and the `SortableList` banner comment, which named the product. BirthGuide
  still has its own copies until 4c deletes them. Not yet merged to `main`
  or published.
- 4c DONE: BirthGuide main (`d3f1dcc`) depends on `@fracazo/design-system`
  `^0.2.0` from npm. `globals.css` imports the package's roles.css, then the
  brand, then `@source`s the package `dist`; the local components,
  `src/system/roles.css` and the brand scripts are gone; imports point at
  `@fracazo/design-system/ui/*` (stories included); `cn` is re-exported
  from `@/lib/utils`; ESLint pulls `designSystemGuardrails`; the snapshot
  harness reads roles from the package. Snapshot identical (349 keys).
  Lesson: after merging a version that adds devDependencies, run
  `pnpm install` in the main checkout before `pnpm publish`, or the
  pre-publish `tsc` fails on missing types.
- 4d DONE, awaiting merge: birthplans.app on branch
  `feature/consume-design-system` (two commits, `aa49ed0` renames the
  colour-literal tokens to the roles with 329 keys pairwise identical under
  the rename map, `3a98e2c` swaps to the package and its own
  `src/system/brands/birthplans.css` with exactly six token additions, the
  reasoned chip-3 pair and dark-brand, and nothing changed). The package's
  fluid-type ESLint rule stays off there until a type-role pass converges
  fourteen clamp literals. BirthGuide branch
  `feature/retire-birthplans-brand-copy` (`0754afa`) removes its validated
  copy. Both branches fast-forward cleanly; Alex merges.
- 5 DONE: `DESIGN.md` authored (version 1.0.0 in its front matter,
  package 0.2.1), assembled from BirthGuide's PRINCIPLES.md, the Storybook
  principles/tokens/usage prose, the component intent JSDoc and the
  corrections that recurred in git history. Consumer CLAUDE.md files still
  carry their full design sections; slimming them to hard in-context rules
  plus a pointer here is optional follow-up.
- 6 DONE: github.com/fracazo/design-system-starter (public, template flag
  on), local at `~/Developer/design-system-starter`. Next 16 via create-next-app 16.1.6,
  Tailwind v4, the package and its peers, `src/system/brands/starter.css`
  with achromatic placeholders for all 63/48/2 contract properties, the
  house base layer in `globals.css`, the pre-paint dark script plus
  `ThemeSync`, `designSystemGuardrails()` with no exemptions, `pnpm lint`
  = eslint plus `ds-check-brand`. Lint, typecheck and build pass; both
  themes verified in a browser. Its `pnpm-workspace.yaml` approves the
  native builds and excludes the package from pnpm 11's minimum-release-age
  gate.
- Later: publish 0.2.1 (DESIGN.md); slim the consumers' CLAUDE.md design
  sections to hard rules plus a pointer to DESIGN.md; a type-role pass in
  birthplans so its fluid-type guardrail can switch on.
