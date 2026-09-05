# Surfaces

Load when: starting any work, to name the scope; and for product-specific
routes.
Canonical owner: BirthGuide `_context/PRINCIPLES.md` (scopes and budgets);
`DESIGN.md`, Two surface scopes and the brand chapters.

## Scopes

**Engagement**: the product itself. Failure is "it did not load when I
needed it". Cold start under 1.5s on a three-year-old phone on slow 4G,
first paint under 1s; no hero imagery, no decorative motion; optimistic
writes; 44px targets; 16px inputs.

**Conversion**: landing, guides, articles. Failure is "it looked cheap" or
"search buried it". LCP under 2.5s, CLS under 0.1, INP under 200ms, first
load under 1MB, images under 200KB each and 500KB per page. Illustration
over photography, custom only; one custom typeface; entrance motion once
per visit.

The hospital case applies to both: a landing page opened on a ward tour is
still read under pressure.

## BirthGuide (Australian English)

- Conversion: `/` (hero, offerings, program curriculum, comparison,
  testimonials, pricing, FAQ, footer), `/guides/*`, `/tools/*`.
- Engagement: `/questionnaire`, `/plan/edit/*`, `/plan/[slug]` (the
  published plan read at the bedside), downloads, `/program/*` sessions,
  `/resume`, `/unsubscribe`.
- Always-dark: footer and showcase bands. Landing phone mock uses `dark-3`
  and `dark-4`.
- Served token API: `public/brand.css` (generated; lint fails when stale).
- Local Storybook is the component gallery for both products.

## birthplans.app (US English)

- Conversion: `/` (hero, plan comparison, free answers, pricing, FAQ, stat
  band), guides.
- Engagement: `/questionnaire` (with the did-you-know bar and the
  preference status ramp), `/plan/*` preview and download; one output, the
  PDF.
- Always-dark: footer.
- Fluid-type lint rule is off until the type-role pass; no new clamps.
- No Storybook, no served brand.css.

## Starter

One proof page. Delete it. Everything else here applies once the product
has surfaces.
