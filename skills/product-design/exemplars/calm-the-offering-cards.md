# Exemplar: calm the offering cards

Status: accepted
Product: BirthGuide, landing hero offering pair
Source: BirthGuide commit "feat(landing): calm the offering cards down"
Rules: rule/one-emphasis-signal, rule/concentric-radii, rule/semantic-first

## Decision

The two hero cards carried four emphasis signals at once: a tinted border,
a heavy drop shadow, a bold uppercase chip and an accent CTA. Cut to the
chip and the CTA. Both cards moved onto the same hairline and the same soft
shadow, and onto the treatment the testimonial cards already used
(`rounded-20 p-7 shadow-warm-sm`). Type and ornament came down with it:
icon tiles 54px to 40px, title capped at 24px, the accent semibold tagline
became a muted caption, accent ticks became muted dots. The comparison band
took the same surface so the two pairs still read as siblings.

## Why it matters

Emphasis is a budget. When everything on a card is loud, nothing is. The
fix was subtraction and reuse of an existing surface, not a new style.

## Repeat

- Count the signals on a surface before styling it. If more than one, remove.
- Borrow the surface an adjacent component already uses before inventing one.
- Bring siblings along so a calmer card does not look like the odd one out.

## Avoid

- Answering "this card does not stand out" with a stronger border or shadow.
- A new radius, shadow or tint for one card.
