# Changelog

Semantic versioning by hand. Australian English, no em dashes.

## 0.4.0 (unreleased)

- `@fracazo/design-system/eslint` is a flat-config plugin: eight rules
  named after their records in `rules.md` (`design-system/no-colour-literal`,
  `no-arbitrary-clamp`, `no-dark-pairs`, `no-radius-literal`,
  `no-stock-palette`, `focus-visible`, `on-dark-ramp`, `no-em-dash`), each
  with its own message citing the rule ID and its own severity.
  `designSystemGuardrails({ files, ignores, severity })` returns one config
  block as before; clean rules default to error, the four that need a
  cleanup pass first default to warn.
- Migration: inline disables change from `no-restricted-syntax` to the
  specific rule, e.g. `eslint-disable-next-line
  design-system/no-arbitrary-clamp -- reason`. The selector arrays
  `noArbitraryColour` and `noArbitraryTypeClamp` still export, deprecated.

## 0.3.0

- `skills/product-design`: the judgment half of the system as an agent
  skill. `SKILL.md` routes by request mode (shape, implement, review, copy,
  harden) to focused references; `references/rules.md` holds every rule
  with a stable ID, scope, why, exceptions, source, enforcement status and
  an example pair; five exemplars written from BirthGuide's design commits;
  `coverage-gaps.md` lists lint candidates and missing decisions. Products
  load it from `node_modules/@fracazo/design-system/skills/product-design`.

## 0.2.1

- `DESIGN.md` authored: the written authority for products on the system,
  in the design.md shape. Judgment and the rejection list only; the
  stylesheet and guardrails keep doing the visual work.

## 0.2.0

- Components: `cn` and the seventeen shadcn-based components extracted from
  BirthGuide (accordion, button, calendar, card, checkbox, dialog, form,
  input, label, popover, progress, radio-group, select, sheet,
  sortable-list, tabs, textarea), each with its intent JSDoc. Exported as
  `@fracazo/design-system` and `@fracazo/design-system/ui/*`.
- Peer dependencies for the libraries the components sit on: react,
  radix-ui, lucide-react, react-hook-form, react-day-picker, the three
  `@dnd-kit` packages, clsx, tailwind-merge, class-variance-authority.
- `sideEffects` declared so bundlers can tree-shake unused components while
  keeping CSS imports.

## 0.1.0

- Initial scaffold: `roles.css` with the brand contract, `ds-check-brand`,
  `ds-build-brand-css`, the ESLint guardrails and the showcase page.
