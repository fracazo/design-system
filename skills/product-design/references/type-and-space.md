# Type and space

Load when: sizes, weights, radii, spacing rhythm, alignment.
Canonical owner: `css/roles.css` (fluid type roles, radius ramp, band
rhythm); `DESIGN.md`, Radius and Type.

## Type

- One sans per product, one mono, mapped in the brand file's `@theme` block
  from `next/font` variables. `display: optional` so text never blocks.
- Headings: weight 600, tracking -0.02em, `text-wrap: balance` (base
  layer). Paragraphs `text-wrap: pretty`.
- Fluid sizes are roles (rule/no-arbitrary-clamp): `text-display` (with its
  0.9 line-height companion) for the one display headline,
  `text-section-title` for section headings, `text-lede` for the lede
  (leading set at the use site). Everything else is the static scale.
- Numbers in columns: `tabular-nums`. Headline figures stay proportional.
- Mono is for code, identifiers and the small uppercase kicker
  (`font-mono text-xs font-semibold uppercase tracking-[0.16em]
  text-ink-3`); nothing else, and nothing else is all caps
  (rule/sentence-case).
- Prose measure around 60 to 68 characters (`max-w-prose`).

## Radius

Ramp from the brand's `--radius`: `sm` to `4xl`, plus `rounded-20`
(rule/no-radius-literal). Concentric corners: outer = inner + padding on a
named token (rule/concentric-radii). Text buttons sit on a size-scaled
ladder (xs sm, sm md, default lg, lg xl); icon-only buttons are circles.

## Rhythm

Landing sections: `py-band` for section verticals, `mt-band-gap` between a
section header and its content. Inside a card the padding steps are `p-4`,
`p-6`, `p-7` (the house card is `rounded-20 p-7 shadow-warm-sm`). Spacing
off the 4px grid is a smell; check whether an existing step fits first.

## Alignment

Shared baselines and unmistakable gutters. A narrow table in a wide
section, or a card that is the only misaligned element in a row, is a
defect at P2.
