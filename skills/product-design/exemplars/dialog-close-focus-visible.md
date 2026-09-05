# Exemplar: dialog close ring only for keyboard users

Status: accepted
Product: BirthGuide, now the package's Dialog
Source: BirthGuide commit "fix(ui): show the dialog close ring only for keyboard users"
Rules: rule/focus-visible

## Decision

Three PDF-preview modals showed a focus ring on their close button when
opened with a mouse; the birth-webpage preview did not. The modals were the
same component. Radix autofocuses the first focusable element on open, and
the close button carried `focus:ring-2`, so the ring painted wherever the
dialog body had no controls of its own. Switching to `focus-visible:`
removed the ring for pointer users on every dialog and kept it for
keyboard users. Verified both ways: after a click the computed box-shadow
was none; after Shift+Tab the button matched `:focus-visible` and rendered
the brand ring.

## Why it matters

The reader saw a mystery highlight on a button they had not touched. It
looked like a bug and it was one, in the shadcn default. The comment above
the element records the reason because `shadcn add dialog` reverts it.

## Repeat

- Measure before changing: the two modals were compared property by
  property and only the focused element differed.
- Verify accessibility fixes in both directions, pointer and keyboard.
- Write the reason next to a deliberate deviation from a generator's default.

## Avoid

- Fixing one modal. The component is shared; fix it once, upstream.
- Removing the ring for everyone.
