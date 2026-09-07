# Coverage gaps

Decisions we do not have a standard for yet, and rules that exist in prose
but could be code. A gap is a decision to raise, not a licence to invent.

## Lint candidates (checkable by code, not written)

Shipped in 0.4.0 as `design-system/*` rules: no-colour-literal,
no-arbitrary-clamp, no-dark-pairs, no-radius-literal, no-stock-palette,
focus-visible, on-dark-ramp, no-em-dash. Still candidates:

- A `className` on a package component that overrides its colour, radius or
  shadow (layout classes allowed). Needs the imported component names.
- rule/no-dark-pairs, second form: a `dark:` token utility beside its light
  twin (`bg-band dark:bg-dark`), which usually means a missing token.
- rule/voice-bans as a word list over string literals in JSX.
- Warnings to turn into errors once each product is clean: no-stock-palette
  (BirthGuide 48, birthplans 5), focus-visible (24, 2), no-em-dash (47, 23).

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
