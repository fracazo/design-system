# Exemplar: blend the hero glow into the next section

Status: accepted
Product: BirthGuide, landing hero to curriculum boundary
Source: BirthGuide commit "fix(landing): blend the hero glow into the curriculum section"
Rules: rule/no-clipped-ambient

## Decision

The hero's ambient glow layer kept `overflow-hidden` because its blobs sit
past the left and right edges, but the same clip sat at `bottom-0` and cut
the second blob flat at the hero's last pixel. Measured at 1280x800, the
boundary carried a luminance step of 16.99 in dark and 5.63 in light,
exactly on the row where the sections meet. Three changes together: the
layer extends 280px past the bottom (blob offset plus blur), a mask
dissolves the overhang across that distance, and the next section takes
`relative z-10` so the glow paints behind its content.

## Why it matters

A hard horizontal seam between sections is the kind of defect nobody can
name but everyone feels. It was invisible in source and obvious once
measured on the rendered page.

## Repeat

- Verify ambient effects rendered, at the seam, in both themes; measure the
  luminance step if unsure.
- Extend the clip past blob plus blur, then mask; do not just remove the clip.
- Give the following section a stacking context so the overhang stays behind.

## Avoid

- Shrinking or moving the blob to dodge the clip; the composition changes.
