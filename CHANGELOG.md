# Changelog

Semantic versioning by hand. Australian English, no em dashes.

## 0.8.0 (unreleased)

- `ArticleCard` (`@fracazo/design-system/ui/article-card`): the second
  house primitive, a linked article surface for a grid of blog posts and
  articles. Cover on top as a node slot (a product passes its own tile or
  next/image), the tags the piece files under as one muted text row behind
  a Lucide icon, a title, a two-line excerpt and a byline footer (avatar
  slot, author name, a time element for the date, reading time with a
  clock). The whole card is one link; `external` opens a new tab and says
  so in the accessible name. Hover lift and cover scale are CSS transitions
  gated to motion-safe; under reduced motion only the shadow deepens.
  Tokens only (card, muted, border, ring, the shadow-card pair, the radius
  ramp); no client directive, no new dependency. Adapted from a 21st.dev
  glass blog card, and deliberately not that card: DESIGN.md rejects glass,
  gradient overlays and badges as metadata, so the backdrop blur, the
  gradient over the cover, the badge tags and the framer-motion entrance
  are gone, and the "Read article" button that only appeared on hover is
  gone because hover-only content never reaches touch or keyboard readers.
  An entrance, if a product wants one, is motion.css classes through
  className, gated once per visit. Minor version: a new export, no
  contract change.

## 0.7.0 (8 Sep 2026)

- `OfferCard` (`@fracazo/design-system/ui/offer-card`): the first house
  primitive, a linked offer surface for a grid of peer offers. Media on
  top as a node slot (a product passes its own tile or next/image), a tag
  with a Lucide icon, a title, a description and a source footer (avatar
  slot, name, a meta node for a code or a was-price) with a 44px arrow
  that fills and rotates on hover. `highlighted` tints the body with the
  primary at low opacity, the one emphasis signal. `external` opens a new
  tab and says so in the accessible name. Hover lift, media scale and
  arrow rotate are CSS transitions gated to motion-safe; under reduced
  motion the card sits still. Tokens only (card, muted, secondary, border,
  primary, ring, the shadow-card pair, the radius ramp); no client
  directive, no new dependency. A scroll-snap row was considered and left
  out: DESIGN.md rejects carousels, and the card fills a grid column at
  360px and 1280px. Minor version: a new export, no contract change.

## 0.6.0 (unreleased)

- `css/motion.css`: the package owns its animation vocabulary. The enter,
  exit and accordion keyframes, `animate-in` and `animate-out`, and the
  fade, zoom, blur and slide utilities the components and the products use,
  with class names and values matching `tw-animate-css` 1.4.0 for that
  subset. `roles.css` imports it, and it is also exported as
  `@fracazo/design-system/motion.css`. Consumers drop the
  `tw-animate-css` and `shadcn/tailwind.css` imports from their stylesheet;
  nothing else changes. Closes a gap where the components emitted animation
  classes no peer supplied. Verified in BirthGuide with its animation probe
  (`pnpm design:animation`, added in BirthGuide `3fae451`): dialog, sheet,
  select, popover and accordion, open and closed, computed identical before
  and after; the only differences are the accordion keyframes dropping
  fallback variables for frameworks not in use, and source whitespace.
  Snapshot identical, 349 keys.
- `ds-init` and `template/`: the starter repo folded in. `ds-init <dir>`
  writes a new product from the template, pinned to the package version
  that ran it, and refuses a non-empty directory. The template no longer
  imports `tw-animate-css` or `shadcn/tailwind.css`. Verified by scaffolding
  from the packed tarball and running lint, typecheck and a Next build.

## 0.5.0 (unreleased)

- `ds-intake`: the collector half of the intake loop. Gathers design-relevant
  commits from one or more product repos since a date or ref into a review
  packet with empty judge and human-review sections. The procedure is in
  `skills/product-design/references/intake.md`; packets live under
  `skills/product-design/intake/` as the decision log. First packet
  included, judged, pending review.

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
