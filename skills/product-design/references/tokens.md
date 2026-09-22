# Tokens

Load when: any decision that picks a colour, surface, shadow or theme
behaviour.
Canonical owner: `css/roles.css` (roles and the brand contract) and the
product's brand file (values). `DESIGN.md`, Tokens and Colour, explains the
model. Do not restate values here; read them.

## Decide in this order

1. Is there a shadcn semantic for it? `bg-background`, `bg-card`,
   `bg-popover`, `bg-primary`, `bg-secondary`, `bg-muted`, `bg-accent`,
   `text-foreground`, `text-muted-foreground`, `border-border`,
   `border-input`, `ring-ring`, `bg-destructive`. Use it
   (rule/semantic-first).
2. Is the surface an alternating band, a caption on a light surface, an
   accent chip, a glow, or a highlight pill? Use the primitive that names
   it: `bg-band`, `bg-band-2`, `bg-surface-2`, `text-ink-3`, `chip-1/2/3`,
   `glow-1/2`, `highlight`.
3. Is the surface always dark in both themes? `bg-dark` or `bg-dark-2`, and
   every foreground on it from the on-dark ramp (rule/on-dark-ramp).
4. Does the colour encode a preference state? `status-*`
   (rule/status-colour-means-preference).
5. None of the above: the value does not exist. Do not inline it. Raise a
   role proposal in the design-system repo (minor version, contract entry,
   both brand files).

## Things that look wrong and are not

- The six divergent semantics hold literals in both themes and are not
  aliased (rule/divergent-six). Dark `border` and `input` are translucent
  white hairlines.
- `--dark-3` and `--dark-4` are the showcase bezel. Declare the showcase
  extension before using them.
- `--headline-accent` is a core brand role. How it differs per product is
  in that product's chapter of DESIGN.md.
- Chips and glows are the landing extension. Declare it before using them.
- Text on a status wash uses `--status-want-ink` or `--status-no-ink`, not
  the fill.

## Shadows

`shadow-card`, `shadow-card-hover`, `shadow-card-selected` replace flat
borders with layered depth; selected embeds `var(--primary)` as a ring.
`shadow-warm-sm/md/lg` for landing cards (dark swaps to black-based
shadows). `shadow-bar` under a floating bottom bar. Spacing separates
before a border does. No raw `shadow-[...]`.

## Adding a role

A new or renamed role: add to `roles.css` (theme mapping and the contract
lists), value it in every brand file, bump the package minor, note it in
the changelog, then bump each product and snapshot compare (additions
only). A change that a brand must satisfy anew is a major.
