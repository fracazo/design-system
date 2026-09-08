# CLAUDE.md - @fracazo/design-system

## What this is

The brand-agnostic half of an agent-native design system, published to
npm as `@fracazo/design-system` (public, MIT). "Agent-native" is Vercel's
phrase (their product-design and design.md posts); it lives in the
description and README, the package name stays plain. It ships the roles
a product can name (tokens, the Tailwind v4 theme mapping, radius ramp, fluid type,
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
- `skills/product-design/`: the agent skill (Vercel's product-design
  shape). `SKILL.md` routes by mode; `references/rules.md` is the rule
  registry (stable IDs, source, enforcement status, bad and good);
  `exemplars/` are decisions from shipped commits; `coverage-gaps.md` holds
  lint candidates and missing decisions. A rule is added only when the same
  correction has recurred and Alex accepts it; lintable rules move to
  `guardrails/eslint.ts`.
- `css/roles.css`: the system. The brand contract is the comment block at
  the top (`brand-contract:theme` / `:light` / `:dark`); the bins parse it.
  It imports `css/motion.css`, the animation vocabulary the components use
  (values matching `tw-animate-css` 1.4.0 for the subset in use); add a
  utility there only when a component or a product needs it.
- `template/`: what `ds-init` writes for a new product (Next 16, Tailwind
  v4, the package, the blank brand file, the guardrails). Ships in the
  tarball. `gitignore` is undotted because npm renames a packed
  `.gitignore`; `ds-init` restores the dot. Never install or build inside
  it in this repo; scaffold into a scratch directory instead.
- `guardrails/*.ts`: compiled by `tsc` to `dist/`, which is what publishes.
  `check-brand.ts`, `build-brand-css.ts`, `intake.ts` and `init.ts` are bins
  (`ds-check-brand`, `ds-build-brand-css`, `ds-intake`, `ds-init`); `eslint.ts` is a flat-config plugin, one rule per
  ID in `rules.md`, exported through `designSystemGuardrails()`. It has no
  dependency on eslint: the rule shapes are typed locally. Test a rule
  change by linting a fixture inside a consumer with a temporary config that
  imports this repo's `dist/guardrails/eslint.js`.
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
- `node dist/guardrails/check-brand.js template/src/system/brands/starter.css`
  must pass, and before a release: `pnpm pack`, `ds-init` into a scratch
  directory with the dependency pointed at the tarball, then `pnpm install`,
  `pnpm lint`, `pnpm typecheck`, `pnpm build` there.
- Anything that can change a consumer's rendering is verified in the
  consumer with its snapshot harness (`pnpm design:snapshot` /
  `design:compare` in BirthGuide), never here by eye. Claude here is DRI for
  this package only: work needed in a consumer becomes a prompt for that
  repo's agent, handed to Alex, never an edit from here.

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
- 6 DONE, then folded in (8 Sep 2026, 0.6.0): the starter was a separate
  repo, github.com/fracazo/design-system-starter, pinned to `^0.2.0` with
  nothing tying it to the package version. It now lives in `template/` and
  `ds-init` writes it, pinned to the version that ran. Same content: Next
  16, Tailwind v4, `src/system/brands/starter.css` with achromatic
  placeholders for all 63/48/2 contract properties, the house base layer,
  the pre-paint dark script plus `ThemeSync`, `designSystemGuardrails()`
  with no exemptions, `pnpm lint` = eslint plus `ds-check-brand`, the
  `pnpm-workspace.yaml` that approves native builds and excludes the
  package from pnpm 11's minimum-release-age gate. The old repo was deleted
  on 8 Sep 2026; nothing referenced it.
- 7 (5 Sep 2026, evening): reframed after Vercel's "Teaching agents
  product design" post. The system is how agents building Alex's products
  make his design decisions for the right reasons: the package is the
  mechanical half, `skills/product-design` the judgment half. 7a DONE: the
  skill (0.3.0, unpublished; 0.2.1 is on npm). 7b DONE (0.4.0): eight
  plugin rules with per-rule severities; against the products, dark pairs
  are clean, radius literals are 8 and 2 (phone bezel and two tiny corners),
  and stock palette, focus:, em dashes and on-dark text ship as warnings
  until a cleanup pass. Consumers bump, rename their inline disables to
  `design-system/<id>`, and birthplans drops `noArbitraryColour` for
  `designSystemGuardrails({ severity: { 'no-arbitrary-clamp': 'warn' } })`.
  7c DONE (0.5.0): `ds-intake` collects, the agent proposes inside the
  packet, a human reviews and accepts (`references/intake.md`); first packet at
  `skills/product-design/intake/2026-09-07.md`, candidates pending. Publish
  note: 0.3.0 and 0.4.0 never reached npm (registry checked 7 Sep); 0.5.0
  carries all three. 7d: evals once exemplars reach ten. Still open:
  the birthplans type-role pass, and which BirthGuide-shaped roles become
  optional modules (a 7b-adjacent decision, not a rewrite).
