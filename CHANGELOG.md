# Changelog

Semantic versioning by hand. Australian English, no em dashes.

## 0.3.0 (unreleased)

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
