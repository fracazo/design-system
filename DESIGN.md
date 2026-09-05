---
name: fracazo-design-system
description: The written authority for products built on @fracazo/design-system. Judgment, composition and the rejection list for surfaces a parent under pressure will read; the stylesheet and the guardrails do the visual work.
version: 1.0.0
applies_to: any product that imports @fracazo/design-system/roles.css and one brand file
enforced_by: css/roles.css (brand contract, held by ds-check-brand), @fracazo/design-system/eslint, each product's design snapshot harness
---

# DESIGN.md

This file is for whoever builds a surface on the system, person or agent.
It says what the reader's job is, how a page is composed, what the system
refuses to ship, and where each brand differs. It is deliberately short.
The stylesheet carries the visual decisions; this file carries judgment,
and gains a rule only when the same correction has been made twice.

Agents load `skills/product-design/SKILL.md` first: it names the request
mode, routes to the reference that applies, and cites rules by stable ID
from `skills/product-design/references/rules.md`. This file stays the
narrative those rules point back to.

Read `css/roles.css` for the roles and the brand contract, the component
source in `src/ui/*` for each component's intent, and the product's own
CLAUDE.md for the rules that are local to it.

## Who the reader is

Every product on this system is used by people close to a birth: a parent
in the third trimester on a phone, a partner at a bedside on hospital
wifi, someone reading at 3am with one hand. They are tired, sometimes
frightened, and they came for one answer. The surface earns trust by being
fast, calm and exact, the way a good midwife is. It never earns it with
decoration, hype or novelty.

Two products run on it today: BirthGuide (Australia) and birthplans.app
(English-speaking markets, primarily the US). Their chapters are at the
end. Everything before them applies to both, and to the next product.

## Priority order

When rules conflict, the lower number wins.

1. **Performance is the brand.** A fast page feels more premium than any
   palette. If a feature cannot meet its surface's budget, cut or simplify
   it until it can.
2. **Preserve the reader's decision.** Facts, options and consequences stay
   exact and complete. Copy claims only what the product delivers.
3. **Respect the host and the contract.** Work inside the product's
   framework, its brand file and this package's roles. Never fork a
   component or invent a token locally; raise it in the system.
4. **Keep the surface unmistakably the product's.** The brand file does
   this. Do not add a second accent, a new typeface or a new radius to
   make a page feel special.
5. **Choose a specific composition.** Let the material set the layout.
   Reject the template reflex (centred hero, three cards, metric boxes).

## Two surface scopes

Name the scope before designing anything.

**Engagement surfaces** are the product itself: questionnaire, plan
editor, the published plan page, downloads, account. Failure mode: "it
did not load when I needed it." Strict budgets (cold start under 1.5s on
a three-year-old phone on slow 4G, first paint under 1s), no hero imagery,
no decorative motion, optimistic UI on every write, tap targets at least
44px, inputs at least 16px so iOS never zooms.

**Conversion surfaces** are the landing pages, guides and articles a
reader sees while deciding. Failure mode: "it looked cheap, or it was slow
and search buried it." Core Web Vitals "Good" thresholds apply (LCP under
2.5s, CLS under 0.1, INP under 200ms, first load under 1MB). Illustration,
one custom typeface and staged entrance motion are permitted within those
budgets. The hospital case still applies: a landing page opened on a ward
tour is still read under pressure.

## Work in four passes

**Frame the reader's job.** Who is reading, what they must decide or do
on this surface, what the one strongest piece of evidence or the one
primary action is. Support two reading speeds: the scan (headings, the
key value, the primary button) and the careful read (the detail, the
caveat, the "if necessary" path).

**Choose the composition.** One focal relationship per screen. Prose for
reasoning, a list for parallel items, a table for exact comparison, a
card only when the surface is genuinely a unit the reader picks up. Cards
do not nest. Emphasis is spent once: a surface that carries a tinted
border, a heavy shadow, an uppercase chip and an accent button at the
same time is shouting, and the fix is always to remove signals, not to
add a stronger one.

**Apply the system.** Semantic utilities first, primitives where no
semantic role fits, tokens for everything that varies by theme, named
roles for every size and radius. The sections below say how.

**Inspect privately, then verify with tooling.** Read the page aloud;
if the rhythm is wrong, rewrite. Check both themes and a 360px viewport.
Then run the product's snapshot compare: a refactor must compare
identical, and an intentional change must show only the keys you meant
to move, with the count stated in the handback.

## The visual system

### Tokens, two tiers

Primitives hold literals and live in the brand file: `--band`, `--ink`,
`--line`, `--brand`, `--dark` and their families. Semantics are the roles
components consume: `--primary`, `--border`, `--muted-foreground`. Eight
semantics alias a primitive with `var()` in `roles.css`, once, because
they are identical in light and dark: foreground, card, popover, primary,
accent, ring and the card and popover foregrounds. Six diverge in dark
and hold brand-tuned literals in the brand file: secondary, muted, border,
input, muted-foreground, accent-foreground. Dark border and input as
translucent white hairlines is a design decision. Never "fix" a divergent
semantic by aliasing it; the dark rendering changes.

Every token has a utility (`bg-band`, `text-ink-3`, `shadow-card`,
`rounded-20`, `text-display`, `py-band`). The utility is the only way a
value reaches a component.

### Colour

Semantic utilities first: `bg-background`, `bg-card`, `text-foreground`,
`text-muted-foreground`, `border-border`, `ring-ring`, `bg-primary`.
Primitives where no role fits:

- Alternating page bands: `bg-band`, then `bg-band-2` or `bg-surface-2`.
- Captions and hints on light surfaces: `text-ink-3`.
- Accent chips: `bg-chip-1-soft text-chip-1-ink`, `chip-2`, `chip-3`.
- The "new" or "note" pair: `bg-highlight text-highlight-ink`, with
  `highlight-soft` and `highlight-deep` for two-tone stat pills.
- Preference state, and only preference state: `status-want`,
  `status-ifnec`, `status-no`, each with a `-soft` wash. Colour carries
  meaning here; it is never decoration.

Always-dark surfaces (footer, showcase bands) are `bg-dark` or `bg-dark-2`
and their text comes from the mode-constant on-dark ramp, `text-dark-ink`
down to `text-dark-faint-2`, with `text-dark-brand` for the one accent.
A theme-varying token such as `text-ink` on a dark band renders espresso
on espresso in light mode.

Design in the neutrals; the brand hue appears on the primary action,
links, the focus ring and small accents. Never use Tailwind's stock
palette (`amber-500`, `blue-600`) in product UI; it competes with the
brand and looks generic.

### Radius

The ramp derives from the brand's `--radius`: `rounded-sm` through
`rounded-4xl` are calc offsets. One absolute value sits off the ramp,
`rounded-20`. There are no other radii. Where a rounded child's corners
co-locate with a rounded parent's, the outer radius is the inner radius
plus the padding, and the result is always a named token (`rounded-lg`
plus `p-4` gives `rounded-4xl`; `rounded-md` plus `p-3` gives
`rounded-20`; `rounded-sm` plus `p-4` gives `rounded-3xl`). Concentric
corners read as one shape; equal radii at different depths read as a
mistake. The rule applies where corners meet, not to every nested corner.

Text buttons are rounded rectangles on a size-scaled ladder (xs `sm`,
sm `md`, default `lg`, lg `xl`); icon-only buttons are circles.

### Type

One sans family per product, set by the brand file's `@theme` block, and
one mono. Headings are weight 600, tracking -0.02em, `text-wrap: balance`;
paragraphs `text-wrap: pretty`. Numbers that line up in columns use
tabular numerals; headline figures stay proportional.

Fluid sizes are named roles, never `text-[clamp(...)]`: `text-display`
for the one display headline (line-height 0.9 travels with it),
`text-section-title` for section headings, `text-lede` for the lede
under them (leading is left to the use site). Landing sections keep their
vertical rhythm with `py-band` and `mt-band-gap`. A size the roles do not
cover is a token to add, not a literal to type; a deliberate one-off
carries an inline lint disable that states why.

Mono is for code, identifiers and the small uppercase kicker label with
wide tracking, and nothing else. All caps appears only on that label.

### Surfaces and shadows

Depth comes from the shadow-border system (`shadow-card`,
`shadow-card-hover`, `shadow-card-selected`, which embeds the primary as
a ring) rather than from flat borders, and from the warm soft shadows on
landing cards (`shadow-warm-sm` to `-lg`; the brand file swaps them for
black-based shadows in dark, where light shadows vanish). `shadow-bar` is
the upward shadow under a floating bottom bar. Spacing separates before a
border does. No glass, no decorative gradients, no dark rounded frames
around content.

### Motion

Default to stillness. Interactive state changes (hover, select, expand)
use CSS transitions, which retarget when interrupted mid-flight.
Keyframes are reserved for one-shot staged sequences such as a hero
entrance, gated to play once per visit so a reload does not replay them,
and collapsed to nothing under `prefers-reduced-motion`. Nothing the
reader needs is behind an animation. Ambient effects (glow blobs) must
not clip at a section edge; a hard horizontal seam where two sections
meet is a defect.

### Imagery and icons

Engagement surfaces carry no photography and no decorative illustration;
icons are SVG (lucide). Conversion surfaces may use illustration over
photography, custom, editorial and restrained, never stock, never
photographs of pregnant women and babies, never carousels or autoplay.
Icons label actions when they make the action faster to recognise; they
never decorate a heading.

### Accessibility

WCAG AA (4.5:1 for body text, 3:1 for large text and controls). Rose or
periwinkle text on a light surface uses the brand ink, not the brand.
Native controls where they exist; the date picker is the OS one. Focus is
shown with `focus-visible`, so a modal opened with the mouse does not
paint a ring on its close button while keyboard users still get one.
Source order is reading order; landmarks and heading levels are real;
44px targets on coarse pointers.

## Components

The package ships seventeen shadcn-based components under
`@fracazo/design-system/ui/*`. Each carries an intent block at the top of
its source (one line, then Use for, Avoid when, Variants); that block is
the contract and is updated whenever variants change. In brief:

- **Button** is the tappable action primitive. Default carries the one
  primary action of a step; outline is the standard secondary; ghost is
  back, cancel and edit-in-place; destructive is reserved for irreversible
  acts. Default height 48px; sm in compact rows; lg only for
  money-adjacent hero actions.
- **Input**, **Textarea**, **Label** and the **Form** glue serve
  react-hook-form fields. Textarea auto-grows. A field outside RHF uses
  Label plus Input directly.
- **Checkbox**, **RadioGroup** and **Select** are for dense or
  utilitarian UI. Questionnaire answers use the house icon-card groups,
  never bare radios or checkboxes.
- **Dialog** is a centred modal for a focused task (a preview, a
  confirmation). **Sheet** is the mobile bottom sheet for supplementary
  content; on desktop the same content renders as an aside. **Popover**
  anchors transient UI to a control without moving focus.
- **Accordion** is progressive disclosure inside the app; a public FAQ
  uses native details and summary so answers exist without JavaScript.
  **Tabs** switch between peer views of equal weight; inactive panels
  unmount, so never for content search engines must see.
- **Card** is the stock surface family for quick composition; the house
  card (rounded-20, warm shadow) is composed from utilities.
- **Progress** is a flat determinate bar; brand-moment progress bars are
  bespoke. **Calendar** exists for range selection; a single date uses a
  native input. **SortableList** ranks a small capped set with drag,
  touch and keyboard.

A component that must import app code (stores, data clients, routes)
does not belong in the package; it stays in the product, like
`place-autocomplete`. Dependencies point one way: the app consumes the
system, never the reverse.

## Guardrails and verification

- **Brand contract.** `roles.css` lists every property a brand file must
  define, light, dark and theme. `ds-check-brand` fails lint when a file
  defines less or more. A new role is a minor version and a changelog
  note; a contract change a brand must satisfy anew is a major version.
- **ESLint.** No raw colour in a `className` (hex, oklch, rgb, hsl,
  including arbitrary utilities) and no `text-[clamp(...)]`. Renderers
  that cannot use CSS variables (react-pdf, email HTML, OG images) are
  exempt per product; nothing else is.
- **Zero visual change.** Token and component refactors are verified by
  each product's snapshot harness, which rasterises resolved colours to
  sRGB bytes and probes the utility layer and real pages, never by eye.
  Snapshot before editing; compare after; clear the framework's build
  cache after restructuring the CSS import graph. An intentional change
  regenerates the committed baseline in the same branch and names its
  delta.

## Reject these reflexes

Each of these has been corrected more than once. Treat them as defects.

- A colour literal in a class, in any form, including a "temporary" one.
- A hand-authored light and dark pair (`bg-[...] dark:bg-[...]`). The
  token owns both themes; write one class.
- Theme-varying text on an always-dark surface.
- A new radius literal, or equal radii on nested corners that meet.
- An arbitrary clamp() size where a named role exists, or a near-miss
  clamp that drifts a few pixels from one.
- Four emphasis signals on one card. Remove until one remains.
- A focus ring painted for pointer users. Use `focus-visible`.
- A hard seam where an ambient glow is clipped at a section boundary.
- Tailwind's stock palette in product UI.
- Values invented in a story or a demo. Storybook and the showcase are
  consumers; a missing value is a finding to raise.
- Em dashes, anywhere: copy, comments, commit messages, generated
  documents. Use commas, colons, full stops, parentheses.
- Wellness-speak ("your journey", "mama", "you've got this"), filler
  affirmations ("amazing", "incredible"), AI marketing words
  ("seamless", "empower", "unlock", "cutting-edge", "revolutionise").
- All caps outside the micro kicker label, or Title Case in a heading,
  button or label. The system is sentence case.
- Centred hero plus three cards, metric boxes, badges as metadata,
  nested cards, decorative gradients, glass, stock imagery, carousels,
  autoplay, a visible theme switcher.

Do not answer restraint with a sterile template. Restraint here is a
precise hierarchy, one warm accent used with intent, exact evidence and
strong alignment, on a page that loads before the reader's patience runs
out.

## Brand: BirthGuide

Australian, trusted, quiet. A companion through pregnancy and the first
weeks, endorsed by midwives; it reads as something a midwife would
recommend without hesitation, never as a children's app. Australian
English throughout: caesarean, labour, antenatal, nappy. "Birth plan" for
search, "birth preferences" in clinical and community copy; both coexist.

- **Palette.** Cream page (`#FAF6EF`), espresso ink (`#2B2620`), rose
  accent (`--brand` `#C2727A`, `--brand-ink` for text on light). Dark is
  espresso surfaces with cream text and a lightened rose.
  `--headline-accent` rides the brand ink in light and turns warm sand in
  dark, because on the espresso page rose barely separates from body
  text. `--dark-brand` (`#DE949A`) is the one non-grey in the on-dark
  ramp, used for the footer heart. `chip-3` is the sister product's
  periwinkle; its ink is that product's exact brand value and is not
  nudged.
- **Type.** Hanken Grotesk via next/font (`--font-hanken`), Geist Mono,
  both `display: optional` so text never blocks on a webfont.
- **Surfaces.** Landing page and guides to convert; questionnaire, plan
  editor, published plan page and downloads to engage. Illustration is
  welcome on the landing page and absent from the product.
- **Repo.** `~/Developer/birthguide`. Brand file
  `src/system/brands/birthguide.css`; `public/brand.css` is the served
  token API, generated by `ds-build-brand-css` and checked in lint. The
  local Storybook is the component gallery for both products; it consumes
  the package and defines nothing.

## Brand: birthplans.app

The same warm system with the brand hue rotated to periwinkle, for
English-speaking markets, primarily the US. One output: the birth plan
PDF, paginated to match its live preview. US English throughout: cesarean,
labor, color, anesthesiologist, operating room; `nitrous oxide (gas and
air)`, `oxytocin drip (Pitocin)`. Same voice rules as BirthGuide.

- **Palette.** Cream and espresso as BirthGuide; `--brand` `#7480C6`
  periwinkle, `--brand-ink` `#4A529E`, `--brand-soft` `#E8EAF8`; dark
  brand at hue 276. `--headline-accent` is warm sand in both modes, and
  the hero applies it only in dark. `accent-foreground` follows the brand
  ink in light, the one semantic this product tuned. `chip-3` is BirthGuide's
  rose, reasoned and unused. The status ramp is live in the questionnaire:
  want, if necessary, don't want, each with a soft wash.
- **Type.** Hanken Grotesk and Geist Mono, as BirthGuide.
- **Guardrails.** The colour rule is on. The fluid-type rule is off until
  a type-role pass converges the landing sections' fourteen clamp
  literals onto the named roles; switch to `designSystemGuardrails()` when
  it lands.
- **Repo.** `~/Developer/birthplans`. Brand file
  `src/system/brands/birthplans.css`. No Storybook and no served
  `brand.css`; BirthGuide's Storybook documents the shared components.

## Maintaining this file

Add a prose rule here only when the same correction has been made twice;
once is a review comment. Prefer moving a rule into the stylesheet or the
guardrails over writing it down: a token, a lint rule or a contract entry
enforces itself. Brand chapters state what differs and nothing that the
core already says. Semantic versioning by hand: a clarification is a
patch, a new rule a minor, a change to the priority order or the surface
scopes a major.
