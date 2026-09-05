# Exemplar: converge near-miss clamp drift onto named roles

Status: accepted
Product: BirthGuide landing, then the package's type roles
Source: BirthGuide commits "refactor(design): name the fluid type and band rhythm tokens", "fix(landing): converge near-miss clamp drift onto the named tokens", "feat(lint): guard arbitrary fluid type sizes in className"
Rules: rule/no-arbitrary-clamp

## Decision

A typography audit found five bespoke h1 clamps, eight section-title
clamps and seven lede clamps, most within a pixel or two of each other.
The exact current hero scale became `text-display` (byte-identical, with
its 0.9 line-height companion); section titles and ledes converged onto
`text-section-title` and `text-lede`, with two approved rewraps checked
from renders (lede cap 20px to 19px, guides gap 48px to 52px). The final
CTA kept its bespoke 62px clamp by decision, as did the benched sections
and the mobile-link h1; each carries an inline disable with the reason.
Then the lint rule went on so no new clamp literal lands.

## Why it matters

Near-miss sizes are invisible drift: nobody can say which of eight almost
identical clamps is the intended one. Naming the role settles it, and the
lint keeps it settled. The deliberate one-offs stay visible in review
because the disable states why.

## Repeat

- Name the role at the exact current value first (zero change), then
  converge the near misses in a separate, render-reviewed step.
- Turn the lint on only after the codebase is clean or every exception is
  disabled with a reason.

## Avoid

- Converging by eye in one pass with the rename.
- Silencing the rule file-wide.
