---
name: product-design
description: >-
  Single entry point for product design and user-facing implementation in a
  product built on @fracazo/design-system. Use whenever work changes what a
  reader sees, understands, chooses or does: shaping a flow, building or
  restyling a page or component, reviewing a route, screenshot or diff,
  improving copy, hierarchy, layout, interaction, accessibility, responsive
  behaviour or loading, empty, error and destructive states. Trigger on
  design, UX, UI, layout, styling, tokens, colour, type, spacing, motion,
  copy, polish, audit, review, accessibility, dark mode, mobile. Not for
  backend-only work, telemetry, generated files, or tests with no shipped UI.
---

# Product design on @fracazo/design-system

Make the surface correct for the reader, the product and the system. Working
code is not enough: choose the right composition, spend emphasis once, cover
the states the product can really enter, and verify the rendered result in
both themes. The stylesheet and the lint do the visual work; this skill
carries the judgment and the reasons.

## Operating contract

- **Start with the reader's job, not the pixels.** Who is reading, on what
  device, under what pressure, and what they must decide or do here.
- **Name the surface scope first.** Engagement (the product) or conversion
  (landing, guides). Budgets, imagery and motion rules differ. See
  `references/surfaces.md`.
- **Use evidence, not taste.** Trace a decision to a rule in
  `references/rules.md`, a section of `DESIGN.md`, a component's intent
  block, or an exemplar. Shipped code proves what exists, not that it is
  right.
- **Decide before decorating.** Composition, component choice and states
  before colour, radius or copy.
- **Spend emphasis once.** One focal relationship per screen. When a surface
  shouts, remove signals; never add a louder one.
- **Values live in tokens.** Never a colour, radius or fluid size literal in a
  className. A missing value is a proposal for the design-system repo.
- **Verify the real surface.** Source inspection establishes behaviour; a
  rendered page in light and dark establishes quality. Token work runs the
  product's snapshot compare.
- **Keep one entry point.** Load this file; route to the references below.
  Do not paste their content into answers; cite the rule ID or section.

## Request modes

Resolve the mode from the verb before acting. Use the narrowest mode the
verb supports. A URL, screenshot or route sets scope; it does not authorise
edits.

| Mode | Typical request | Required behaviour |
|---|---|---|
| Shape | "Design this flow", "how should this work?" | Frame reader, job, evidence; compare material alternatives; define flow, states, acceptance criteria and open decisions. No edits unless asked. |
| Implement | "Build", "fix", "improve", "make it compliant" | Resolve material decisions, then the smallest coherent end-to-end change. Do not absorb unrelated findings. |
| Review | "Audit", "critique", "what's wrong?" | Inspect source and rendered evidence; report prioritised findings with rule IDs. No edits unless asked. |
| Copy | "Fix the copy", "rewrite this error" | Edit user-facing language and accessible names only. Report structural blockers; do not widen scope. |
| Harden | "Polish", "production-ready", "edge cases" | Keep the settled direction; fix state, resilience, responsive, accessibility and finish defects. |

A material decision changes the reader's task, default, consequence,
navigation, interaction surface or reachable states. Token substitution and
established component swaps are not material.

## Decision authority

Resolve conflicts in this order.

1. The user's explicit goal and constraints.
2. Verified product behaviour and system truth (what the tokens and
   components actually do).
3. The product's CLAUDE.md, then this skill's `references/rules.md`,
   `DESIGN.md`, `css/roles.css` and the component intent blocks.
4. Exemplars with stable evidence (`exemplars/`).
5. Verified adjacent shipped patterns in the same product area.
6. General interface heuristics.

## Workflow

1. **Set scope and mode.** Name the product, the route or component, the
   surface scope and the mode.
2. **Load product context.** The product's CLAUDE.md design section, the
   brand file, the product chapter in `DESIGN.md`, and the code that
   decides what the surface can show.
3. **Model the decision** (Shape, Implement, Harden, full Review). Reader,
   job, current behaviour, desired outcome, success signal, non-goals,
   consequence, reversibility, open decisions. Keep it compact.
4. **Map the surface and states.** Entry points, regions, overlays,
   transitions, exits. Only reachable states: loading, empty, populated,
   validation, error, disabled, optimistic, destructive, both themes,
   360px and 1280px.
5. **Load the routed references.**

   | Need | Load |
   |---|---|
   | Any styling or token decision | `references/tokens.md` |
   | Sizes, radius, spacing, rhythm | `references/type-and-space.md` |
   | Hover, entrance, transitions, reduced motion | `references/motion.md` |
   | Which component, house patterns | `references/components.md` + the component's intent block |
   | Copy, labels, errors, English variant | `references/copy.md` |
   | Which surface, budgets, imagery | `references/surfaces.md` |
   | Any rule by ID, lint status, examples | `references/rules.md` |
   | Before claiming zero visual change | `references/verification.md` |

6. **Decide, then implement.** For each non-mechanical change be able to
   say: what reader problem it solves, why this component, what consequence
   the surface must communicate, which rule or exemplar supports it, and
   what the smallest coherent change is.
7. **Verify.** Lint (`pnpm lint`), typecheck, both themes, compact and wide
   viewports, keyboard order and focus, every materially changed state, long
   content. Token work: snapshot compare, delta stated.

## Review output

Lead with findings, ordered by reader impact.

- **P0** blocks the primary task, severe accessibility failure, or harm the
  reader cannot undo.
- **P1** likely task failure, misleading consequence, missing critical
  state, major responsive or accessibility defect.
- **P2** meaningful friction, weak hierarchy, inconsistency, recoverability.
- **P3** minor craft.

Each finding: location (file and line, or rendered), verification status
(seen rendered, inferred from source), rule ID or source, reader
consequence, smallest concrete fix.

## Skill integrity

- Add or change a rule only after the same correction has recurred and a
  human has accepted it. One screenshot, one file or one review comment is
  never a rule by itself.
- Record scope, rule, why, exceptions, source and a bad and good example
  (`references/rules.md` format).
- Prefer the narrowest destination: a token or contract entry, a lint rule,
  a rule record, an exemplar, or a coverage gap. Deterministic checks stay
  mechanical; judgment stays in prose with its evidence.
- Keep `coverage-gaps.md` honest. A missing rule is not a licence to invent
  one; it is a decision to raise.
