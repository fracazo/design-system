# Exemplar: craft pass, concentric radii and button optics

Status: accepted
Product: BirthGuide, then the package's Button
Source: BirthGuide commits "feat(design): craft pass tier 1: tabular numerals, concentric radii, button optics", "feat(ui): move button primitive from pill to size-scaled rounded-rect" (SPEC_021)
Rules: rule/concentric-radii, rule/no-radius-literal

## Decision

Exact-token radius renames first (`rounded-[26px]` to `4xl`,
`rounded-[14px]` to `xl`, `rounded-[10px]` to `lg`), zero rendering change.
Then concentric corners where a rounded child meets a rounded parent, each
landing on a named token. Tabular numerals on five column surfaces only;
headline figures stayed proportional. Buttons moved from pills to rounded
rectangles on a size-scaled corner ladder so a flush button can go
concentric with its container, and only the icon side of a button tightens
so icon-plus-text reads centred (the primitive wraps bare text in a span so
CSS can tell which side the icon is on).

## Why it matters

The snapshot harness compared identical on all 311 covered keys, which
proved no incidental drift; the intended changes sat below the tool's
resolution and were reviewed as source diff plus live probes. Craft work
and refactor work were separated so each could be verified its own way.

## Repeat

- Split exact renames (identical snapshot) from intended changes (reviewed
  renders), even inside one spec.
- Apply the concentric formula only where corners meet.

## Avoid

- Tabular numerals everywhere; they are for columns.
- A pill button inside a rounded card; the corners can never be concentric.
