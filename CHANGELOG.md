# Changelog

Semantic versioning by hand. Australian English, no em dashes.

## 0.2.0 (unreleased)

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
