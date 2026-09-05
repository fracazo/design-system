# Coverage gaps

Decisions we do not have a standard for yet, and rules that exist in prose
but could be code. A gap is a decision to raise, not a licence to invent.

## Lint candidates (checkable by code, not written)

- rule/no-dark-pairs: `dark:` colour utility with an arbitrary value or a
  light twin.
- rule/no-radius-literal: `rounded(-[a-z]+)?-\[`.
- rule/no-stock-palette: default hue name followed by a numeric step in a
  className. Known violation to clear first: BirthGuide
  `PregnancyProgress.tsx` uses stock `amber-*`.
- rule/focus-visible: `focus:ring` in a className.
- rule/no-em-dash: U+2014 anywhere in `src`, docs and commit messages.
- rule/on-dark-ramp: theme-varying text token inside a `bg-dark` subtree
  (needs a small JSX walker; likely warning level).
- A `className` on a package component that overrides its colour, radius or
  shadow (layout classes allowed).

## Missing decisions

- Loading, empty and error state patterns for engagement surfaces beyond
  optimistic writes: no written standard; each product improvised.
- Destructive action wording and confirmation shape: not standardised
  (current usage: the questionnaire discard flow, plan deletion).
- Toast or inline confirmation after a save: no standard.
- Form validation timing (on blur, on submit) and error placement: follow
  the package's FormMessage, but no written rule.
- A house table treatment: none; the price tracker and calculators each
  built their own.
- Illustration style for conversion surfaces: the brand spec's guidance
  predates the warm palette and names colours that are not in production.
- birthplans.app type-role pass: fourteen clamp literals await convergence
  before its fluid-type lint can switch on.
- Whether a product may ship a manual theme toggle: today, none do, by
  decision; not recorded as a rule.

## Evals

None yet. When the exemplars reach ten, build before and after fixtures
from them and hold two out.
