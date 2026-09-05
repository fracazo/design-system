# Motion

Load when: hover and state transitions, entrance sequences, ambient
layers, reduced motion.
Canonical owner: `DESIGN.md`, Motion; the product's `globals.css`
(reduced-motion block, entrance keyframes).

- Default to stillness. Motion explains a state change, preserves
  continuity or confirms an action. It never gates reading.
- Reversible state: transitions (rule/transition-for-interactive-state).
  One-shot staged sequences: keyframes, gated once per visit
  (rule/entrance-once-per-visit), at rest under reduced motion.
- Ambient layers (glow blobs) are decorative and stay behind content; they
  must not clip at a boundary (rule/no-clipped-ambient). Verify rendered at
  the seam, in both themes; a luminance step on the exact pixel row where
  sections meet is the failure.
- Hover on buttons: colour, shadow and a half-pixel lift
  (`hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.96]`),
  already in the Button primitive. Do not add a second hover language.
- No animation libraries without a written justification; the conversion
  surface budget for animation JavaScript is 30KB compressed
  (PRINCIPLES.md).
