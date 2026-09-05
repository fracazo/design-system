# Rules

Every rule has a stable ID, a scope, the rule, why, exceptions, its source
and an example pair. `Enforced by` says who catches a violation today:
`lint` (the package's ESLint export), `contract` (ds-check-brand), `base`
(the house base layer in globals.css), `prose` (this skill and review), or
`lint candidate` (checkable by code, not yet written; see coverage-gaps.md).
Cite the ID in findings. Add a rule only per SKILL.md's integrity section.

## Colour

### rule/no-colour-literal
Scope: any `className` in product code, stories and the showcase.
Rule: no hex, oklch(), rgb() or hsl() value, including arbitrary utilities
like `bg-[#fff]`.
Why: a literal drifts from the brand file and breaks dark mode silently.
Exceptions: renderers that cannot use CSS variables (react-pdf, email HTML,
OG images), listed per product in its ESLint config.
Source: DESIGN.md, Guardrails; guardrails/eslint.ts.
Enforced by: lint.
Bad: `className="bg-[#c2727a] text-white"`
Good: `className="bg-primary text-primary-foreground"`

### rule/no-dark-pairs
Scope: any `className`.
Rule: never a hand-authored light and dark pair (`bg-x dark:bg-y`) for a
colour. The token owns both themes; write one class.
Why: two literals drift independently and the dark half is never reviewed.
Exceptions: `dark:` on a non-colour property (opacity, display) is fine.
Source: DESIGN.md, Reject list; BirthGuide SPEC_016.
Enforced by: lint candidate (`dark:(bg|text|border|ring|from|to|via)-\[`
or a `dark:` colour utility beside its light twin).
Bad: `bg-[#E6EFE2] dark:bg-[oklch(0.34_0.045_150)]`
Good: `bg-chip-1-soft`

### rule/on-dark-ramp
Scope: children of an always-dark surface (`bg-dark`, `bg-dark-2`).
Rule: text and icons use the mode-constant on-dark ramp (`text-dark-ink` to
`text-dark-faint-2`, `text-dark-brand` for the one accent), never a
theme-varying token such as `text-ink` or `text-ink-3`.
Why: the surface never changes theme, so its text must not; `text-ink` on
the footer renders espresso on espresso in light mode.
Exceptions: none.
Source: DESIGN.md, Colour; BirthGuide usage story.
Enforced by: prose (lint candidate: a theme-varying text token inside a
JSX subtree whose root carries `bg-dark`).
Bad: `<footer className="bg-dark"><p className="text-ink">`
Good: `<footer className="bg-dark"><p className="text-dark-ink-2">`

### rule/semantic-first
Scope: any styling decision.
Rule: semantic utilities (`bg-card`, `text-muted-foreground`,
`border-border`) before primitives (`bg-band`, `text-ink-3`); primitives
only where no role fits.
Why: semantics move together across products and themes; primitives are
brand material.
Exceptions: alternating bands, captions on light surfaces, chips, glows and
the always-dark family, which have no semantic role by design.
Source: DESIGN.md, Colour.
Enforced by: prose.
Bad: `text-ink-2` for body copy under a heading.
Good: `text-muted-foreground`.

### rule/divergent-six
Scope: brand files and roles.css.
Rule: secondary, muted, border, input, muted-foreground and
accent-foreground hold their own literals per theme. Never alias them to a
primitive.
Why: dark tuned them away from the primitives; dark border and input are
translucent hairlines, nothing like the opaque warm line.
Exceptions: none.
Source: DESIGN.md, Tokens; roles.css header.
Enforced by: contract (the six are required in both light and dark) and
prose.
Bad: `--border: var(--line);` in the dark block.
Good: `--border: oklch(1 0 0 / 10%);`

### rule/no-stock-palette
Scope: product UI (not PDFs or emails).
Rule: no Tailwind default palette colour (`amber-500`, `blue-600`,
`gray-200`) in a className.
Why: it competes with the brand, ignores dark mode and looks generic.
Exceptions: none in UI. Known violation: BirthGuide `PregnancyProgress.tsx`
(coverage gap).
Source: BirthGuide brand spec 9.2; DESIGN.md, Colour.
Enforced by: lint candidate (regex on the 22 default hue names followed by
a numeric step).
Bad: `bg-amber-100 text-amber-800`
Good: `bg-highlight-soft text-highlight-ink`

### rule/status-colour-means-preference
Scope: `status-want`, `status-ifnec`, `status-no` and their `-soft` washes.
Rule: use only to encode a reader's preference state; never as decoration
or as generic success and danger colours.
Why: colour that carries meaning must carry only that meaning.
Exceptions: none. Destructive actions use `destructive`.
Source: DESIGN.md, Colour; roles.css comment.
Enforced by: prose.
Bad: a green `bg-status-want-soft` behind a marketing testimonial.
Good: the "Want" chip on a preference card.

## Radius, type and space

### rule/no-radius-literal
Scope: any `className`.
Rule: radii are `rounded-sm` to `rounded-4xl` plus `rounded-20`. No
`rounded-[Npx]`.
Why: a new radius is a design decision; 34 hand-written 20px radii once
drifted before `rounded-20` named them.
Exceptions: none. A genuinely new radius becomes a token first.
Source: DESIGN.md, Radius.
Enforced by: lint candidate (`rounded(-[a-z]+)?-\[`).
Bad: `rounded-[14px]`
Good: `rounded-xl`

### rule/concentric-radii
Scope: a rounded child whose corners meet a rounded parent's.
Rule: outer radius = inner radius + padding, landing on a named token
(lg + p-4 = 4xl, md + p-3 = rounded-20, sm + p-4 = 3xl, md + p-2.5 = 2xl,
sm + p-3 = 2xl).
Why: concentric corners read as one shape; equal radii at different depths
read as a mistake.
Exceptions: corners that never meet; gaps that would need a negative inner
radius.
Source: DESIGN.md, Radius; BirthGuide SPEC_021 (exemplar
concentric-radii-and-button-optics).
Enforced by: prose.
Bad: `rounded-lg p-4` parent around a `rounded-lg` child.
Good: `rounded-4xl p-4` parent around a `rounded-lg` child.

### rule/no-arbitrary-clamp
Scope: any `className`.
Rule: fluid sizes are the named roles `text-display`, `text-section-title`,
`text-lede`, `py-band`, `mt-band-gap`. No `text-[clamp(...)]`.
Why: near-miss clamps drift a few pixels from one another and nobody can
tell which is intended.
Exceptions: a deliberate one-off with an inline disable stating why (five
exist in BirthGuide). birthplans.app has the rule off pending its type-role
pass; no new clamp literals there either.
Source: DESIGN.md, Type; exemplar clamp-drift-to-named-roles.
Enforced by: lint (BirthGuide, starter); prose (birthplans until the pass).
Bad: `text-[clamp(1.9rem,4vw,3rem)]`
Good: `text-section-title`

### rule/tap-targets
Scope: interactive elements on coarse pointers.
Rule: at least 44px; buttons and inputs 48px.
Why: one-handed use, at 3am, on a phone.
Exceptions: inline text links.
Source: PRINCIPLES.md technical rules; DESIGN.md, Accessibility.
Enforced by: base (`@media (pointer: coarse)` block) for the package
components; prose for custom controls.

### rule/inputs-16px
Scope: text inputs, selects, textareas.
Rule: font-size at least 16px.
Why: iOS Safari zooms into smaller inputs on focus.
Exceptions: none.
Source: base layer comment.
Enforced by: base.

## Motion

### rule/transition-for-interactive-state
Scope: hover, selection, expand, collapse and any state the reader can
reverse mid-animation.
Rule: CSS transitions, not keyframes.
Why: transitions retarget when interrupted; keyframes restart from zero.
Exceptions: one-shot staged sequences such as a hero entrance.
Source: DESIGN.md, Motion; BirthGuide principles story.
Enforced by: prose.

### rule/entrance-once-per-visit
Scope: entrance and load animations.
Rule: play once per visit (session flag set before first paint), render at
rest on reloads and in-visit navigation, collapse under
`prefers-reduced-motion`.
Why: replaying an entrance on every reload reads as a bug and costs the
reader time.
Exceptions: none.
Source: BirthGuide layout.tsx; DESIGN.md, Motion.
Enforced by: prose.

### rule/no-clipped-ambient
Scope: glow blobs, gradients and other ambient layers.
Rule: an ambient layer must not be clipped at a section boundary; dissolve
it with a mask or extend the clip past the blob and its blur.
Why: a clipped blur draws a hard horizontal seam exactly where two sections
meet.
Exceptions: none.
Source: exemplar hero-glow-seam.
Enforced by: prose (verify rendered).

## Interaction and components

### rule/focus-visible
Scope: any element with a focus ring.
Rule: use `focus-visible:` for rings, not `focus:`.
Why: Radix autofocuses the first control on open, so a `focus:` ring paints
on a modal the reader opened with a mouse. Keyboard users still get the
ring with `focus-visible:`.
Exceptions: none. Re-running `shadcn add` reverts the dialog; the reason is
recorded above the element.
Source: exemplar dialog-close-focus-visible.
Enforced by: lint candidate (`focus:ring` in a className).
Bad: `focus:ring-2 focus:ring-ring`
Good: `focus-visible:ring-2 focus-visible:ring-ring`

### rule/one-emphasis-signal
Scope: cards, offers, any surface competing for attention.
Rule: a surface carries one emphasis signal (a chip, a tinted border, a
heavy shadow, an accent button, bold uppercase type). When it carries
several, remove until one remains.
Why: stacked signals cancel each other and read as shouting.
Exceptions: the single primary action of a step may sit inside an
emphasised card.
Source: exemplar calm-the-offering-cards.
Enforced by: prose.

### rule/house-pattern-for-answers
Scope: questionnaire and preference capture in both products.
Rule: enumerable answers use the house icon-card groups (single or multi
select), not bare radios, checkboxes or selects. A single date uses a
native date input.
Why: 44px tappable cards with icons are the product's tested answer
pattern; the OS date picker beats any custom one on mobile.
Exceptions: dense utilitarian or admin UI may use RadioGroup, Checkbox,
Select.
Source: component intent blocks (radio-group, checkbox, select, calendar).
Enforced by: prose.

### rule/sheet-on-mobile-aside-on-desktop
Scope: supplementary content beside a flow.
Rule: a bottom Sheet on mobile; an aside on desktop, split at the
breakpoint. Dialog only for a focused task that needs full attention.
Why: a modal is the heaviest surface; supplementary content should not
take the whole screen on desktop.
Exceptions: previews and confirmations use Dialog on all sizes.
Source: component intent blocks (sheet, dialog, popover).
Enforced by: prose.

### rule/no-template-reflexes
Scope: composition.
Rule: no centred hero plus three cards by default, no metric boxes, no
badges as metadata, no nested cards, no decorative gradients or glass, no
carousels or autoplay, no visible theme switcher.
Why: these are the shapes a generator reaches for when it has not framed
the reader's job.
Exceptions: a card grid when the items are genuinely peer units.
Source: DESIGN.md, Reject list.
Enforced by: prose.

### rule/no-values-in-stories
Scope: Storybook stories and the package showcase.
Rule: stories import components and tokens; they never define a colour,
spacing or variant of their own.
Why: Storybook is a consumer; a missing value is a finding, not a local
fix.
Exceptions: none.
Source: BirthGuide usage story.
Enforced by: lint (colour rule covers stories); prose.

## Copy

### rule/no-em-dash
Scope: everything: UI copy, comments, commit messages, generated documents,
metadata.
Rule: never an em dash. Commas, colons, full stops, parentheses instead.
Why: house style across every product and repo.
Exceptions: none (legacy occurrences are removed when a file is touched).
Source: every CLAUDE.md; DESIGN.md.
Enforced by: lint candidate (grep for U+2014 in src and docs).

### rule/voice-bans
Scope: all user-facing writing.
Rule: no wellness-speak ("your journey", "mama", "you've got this"), no
filler affirmations ("amazing", "incredible"), no AI marketing words
("seamless", "empower", "unlock", "cutting-edge", "revolutionise",
"great question"). Short sentences, one idea each. Read aloud.
Why: the products earn trust by sounding like a midwife who respects the
reader.
Exceptions: none.
Source: PRINCIPLES.md voice rules; both CLAUDE.md copy sections.
Enforced by: prose (a word list is a lint candidate).

### rule/sentence-case
Scope: headings, buttons, labels, navigation.
Rule: sentence case. All caps only on the mono kicker label with wide
tracking.
Why: Title Case reads as marketing; all caps reads as shouting.
Exceptions: proper nouns.
Source: PRINCIPLES.md; DESIGN.md, Type.
Enforced by: prose.

### rule/english-per-product
Scope: copy, comments, commit messages.
Rule: BirthGuide is Australian English (caesarean, labour, colour);
birthplans.app is US English (cesarean, labor, color, anesthesiologist).
The package and the starter are Australian English.
Why: each product speaks to its market; mixing reads as carelessness.
Exceptions: Tailwind class names stay US spelling everywhere.
Source: each CLAUDE.md language section.
Enforced by: prose.

### rule/claim-only-what-ships
Scope: landing and product copy.
Rule: outcomes and features named in copy are ones the product delivers
today.
Why: the reader is deciding under pressure; an overclaim is a broken
promise at the bedside.
Exceptions: none.
Source: BirthGuide landing commits ("make the outcome copy claim only what
the product delivers").
Enforced by: prose.
