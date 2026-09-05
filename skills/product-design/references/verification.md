# Verification

Load when: before claiming a change is safe, complete or zero-visual.
Canonical owner: each product's CLAUDE.md verification section and
`scripts/design-snapshot.ts`; the package's `pnpm check` and `pnpm build`.

## Every UI change

1. `pnpm lint` (ESLint guardrails plus the brand contract; BirthGuide also
   checks the served brand.css).
2. `pnpm typecheck` or `tsc --noEmit`; `pnpm build`.
3. Render it: both themes, 360px and 1280px, every materially changed
   state, keyboard order and focus, long content. Say what you saw; never
   claim visual verification from source alone.

## Token, role or component work

- Snapshot before editing (`pnpm design:snapshot baseline.json`), after
  (`after.json`), compare. A refactor compares identical. An intentional
  change shows only the keys you meant to move; state the count.
- Renames: apply the rename map to the baseline's keys and require zero
  value differences (a small comparer script did this twice on 5 Sep 2026;
  map order matters, longest names first).
- Clear `.next` after restructuring the CSS import graph; stop any other
  dev server on the same checkout first.
- `design-baseline.json` is the committed intended state. An intentional
  change regenerates it in the same branch and the commit names the delta.

## Package release

`pnpm check`, `pnpm build`, `ds-check-brand` against both product brand
files, `ds-build-brand-css --check` against BirthGuide's committed
`public/brand.css`. Alex publishes (browser auth); tag `vX.Y.Z`. After a
merge that adds devDependencies, `pnpm install` in the main checkout before
publishing.
