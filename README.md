# @fracazo/design-system

An agent-native design system. Design decisions as code, so the quality bar lives in the tooling.

When a team ships faster, the design review queue is the first thing that breaks. Either every change waits on a designer, or the bar drops quietly. Neither works.

This package moves the bar out of the review queue and into the tooling, where it holds whether a designer is in the room or not.

It lives in three places.

**Lint.** Eight ESLint rules catch what a reviewer would: colour literals, radius literals, stock palette, dark pairs, arbitrary sizes, focus rings, text on dark surfaces. The build fails before anyone posts a screenshot.

**Components.** Each of the eighteen components carries its own guidance in JSDoc: use for, avoid when, variants. The decision sits where it gets made, not in a doc nobody opens.

**The agent skill.** AI tools load the design rules before they build or review any UI, route to the reference that applies, and cite rules by stable ID. The system proposes, the human commits.

Built for BirthGuide and birthplans.app, and designed to start the next product from.

## What is in the package

| Path | What it is |
|---|---|
| `css/roles.css` | The system: the dark variant, the Tailwind v4 `@theme` mapping, the radius ramp, fluid type roles, band rhythm, the eight aliasing semantics, and the **brand contract** at the top |
| `ds-check-brand` | Holds a brand file to the contract: nothing missing, nothing extra |
| `ds-intake` | Collects design-relevant commits from product repos into an intake packet the agent proposes and a human commits (see the skill's `references/intake.md`) |
| `ds-build-brand-css` | Composes the plain-CSS token file a product serves publicly (e.g. `/brand.css`) |
| `ds-init` and `template/` | Writes a new product: Next 16, Tailwind v4, this package, a blank brand file and the guardrails on, pinned to the package version that wrote it |
| `css/motion.css` | The animation vocabulary the components use (enter, exit, accordion, the fade, zoom, blur and slide utilities); `roles.css` imports it |
| `@fracazo/design-system` and `./ui/*` | `cn` and eighteen components (button, card, dialog, form, select, sortable-list, offer-card and the rest), each with intent JSDoc: use for, avoid when, variants |
| `@fracazo/design-system/eslint` | Eight guardrails as an ESLint plugin, one per rule ID: colour literals, arbitrary clamp sizes, dark pairs, radius literals, stock palette, `focus:` rings, text on always-dark surfaces, em dashes |
| `demo/index.html` | A showcase page that renders the roles in both modes off a served `/brand.css` |
| `skills/product-design/` | The agent skill: request modes, routed references, rules with stable IDs, exemplars, coverage gaps. Point your CLAUDE.md or AGENTS.md at its `SKILL.md` |
| `DESIGN.md` | The written authority: who the reader is, the priority order, how a page is composed, the rejection list, one short chapter per brand |

Brand files live in each product repo, not here. The contract is what keeps
them honest.

## Start a product

```bash
pnpm dlx --package @fracazo/design-system ds-init my-product
```

That writes `template/` into `my-product`: Next 16, Tailwind v4, this
package, every role with an achromatic placeholder in
`src/system/brands/starter.css`, the house base layer in `globals.css`, the
pre-paint dark script, `designSystemGuardrails()` with no exemptions, and
`pnpm lint` running ESLint plus `ds-check-brand`. It refuses a non-empty
directory. Then:

1. `pnpm install`.
2. Rename the brand file to the product and update the two paths that name
   it: the `@import` in `globals.css` and the `brand:*` scripts.
3. Replace every value in the brand file, light and dark. Keep the property
   names; `pnpm brand:contract` holds you to them. `DESIGN.md` says what
   each role is for and which six semantics are meant to diverge in dark.
4. Pick the typeface in `layout.tsx` and point the brand file's `@theme`
   block at its variable.
5. Rewrite the top of `CLAUDE.md`, delete `page.tsx`, build the first
   surface. `pnpm lint && pnpm typecheck && pnpm build` before every merge.

The template is proven against the package it ships with: its brand file
passes the contract and a product written from it lints, typechecks and
builds before a release.

## Consume it

Install. Tailwind v4 is a peer dependency; so are the libraries the
components sit on (react, radix-ui, lucide-react, react-hook-form,
react-day-picker, the three `@dnd-kit` packages, clsx, tailwind-merge and
class-variance-authority). A product that only wants the roles and
guardrails can leave the component peers uninstalled.

```bash
pnpm add @fracazo/design-system
```

Import the roles, then exactly one brand file, at the top of your global
stylesheet. Order matters: roles first. `roles.css` also brings in the
motion vocabulary the components use, so no animation library is needed.

```css
@import "tailwindcss";
@import "@fracazo/design-system/roles.css";
@import "./system/brands/my-product.css";
```

Then tell Tailwind to scan the package, so it generates the utilities the
components use. The package ships compiled JavaScript, and the class strings
survive compilation verbatim:

```css
@source "../../node_modules/@fracazo/design-system/dist";
```

Import components from their subpath, which keeps each one's client
boundary where it declares it, or `cn` and everything else from the root:

```tsx
import { Button } from '@fracazo/design-system/ui/button'
import { cn } from '@fracazo/design-system'
```

Write the brand file to the contract printed at the top of `roles.css`: one
`@theme inline` block for the typeface mapping, one `:root, .force-light`
block with every light value, one `.dark` block with every theme-varying
value. Then wire the checks into your lint chain:

```json
{
  "scripts": {
    "brand:contract": "ds-check-brand src/system/brands/my-product.css",
    "brand:build": "ds-build-brand-css --brand src/system/brands/my-product.css --out public/brand.css --name MyProduct --url https://my-product.example",
    "brand:check": "ds-build-brand-css --brand src/system/brands/my-product.css --out public/brand.css --name MyProduct --url https://my-product.example --check",
    "lint": "eslint && pnpm brand:check && pnpm brand:contract"
  }
}
```

And the ESLint guardrails, with your own exemptions for renderers that
genuinely cannot use CSS variables (PDF and email builders, OG images):

```js
import { designSystemGuardrails } from '@fracazo/design-system/eslint'

export default defineConfig([
  // ...your base config
  designSystemGuardrails({
    files: ['src/**/*.{ts,tsx}'],
    ignores: ['src/components/pdf/**', 'src/lib/email.ts'],
    // Clean rules are errors by default; stock palette, focus: rings,
    // on-dark text and em dashes start as warnings. Turn each up once
    // the product is clean, or down while a pass is pending.
    severity: { 'no-stock-palette': 'error', 'no-arbitrary-clamp': 'warn' },
  }),
])
```

A deliberate one-off names the rule and the reason:

```tsx
{/* eslint-disable-next-line design-system/no-radius-literal -- phone bezel, not a UI corner */}
```

## Tell your agent when to load the skill

In the product's CLAUDE.md or AGENTS.md:

```
When shaping, building, reviewing or writing copy for user-facing UI, load
node_modules/@fracazo/design-system/skills/product-design/SKILL.md first.
Skip it for backend-only work, telemetry, generated files and tests with no
shipped UI.
```

The skill names the request mode, routes to the reference that applies and
cites rules by stable ID. `DESIGN.md` is the narrative those rules point
back to.

## The two tiers, in one paragraph

Primitives hold literals (`--brand`, `--band`, `--ink`) and live in the brand
file. Semantics either alias a primitive via `var()` in `roles.css` (the
eight that are identical in light and dark: foreground, card, popover,
primary, accent, ring and their foregrounds) or hold a brand-tuned literal
in the brand file (the six that diverge in dark: secondary, muted, border,
input, muted-foreground, accent-foreground). Dark border and input as
translucent hairlines is a design decision, not duplication; never "fix" a
divergent semantic by aliasing it. Change the brand file and the whole product
re-skins; the roles never move.

## Versioning

Semantic versioning by hand. A new role or a renamed role is a minor bump
and a note in the changelog; a changed contract that a brand file must
satisfy anew is a major bump.

## Licence

MIT.
