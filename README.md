# @fracazo/design-system

Roles, a brand contract, guardrails and components for a warm, evidence-led
product design system. The package ships the half of the system that is the same
for every product; each product supplies one brand file with its values.
Change the brand file and the whole product re-skins; the roles never move.

Built for [BirthGuide](https://birthguide.com.au) and
[birthplans.app](https://www.birthplans.app), designed to start the next
product from.

## What is in the package

| Path | What it is |
|---|---|
| `css/roles.css` | The system: the dark variant, the Tailwind v4 `@theme` mapping, the radius ramp, fluid type roles, band rhythm, the eight aliasing semantics, and the **brand contract** at the top |
| `ds-check-brand` | Holds a brand file to the contract: nothing missing, nothing extra |
| `ds-build-brand-css` | Composes the plain-CSS token file a product serves publicly (e.g. `/brand.css`) |
| `@fracazo/design-system` and `./ui/*` | `cn` and seventeen shadcn-based components (button, card, dialog, form, select, sortable-list and the rest), each with intent JSDoc: use for, avoid when, variants |
| `@fracazo/design-system/eslint` | Two guardrails: no raw colours and no arbitrary fluid type sizes in a `className` |
| `demo/index.html` | A showcase page that renders the roles in both modes off a served `/brand.css` |
| `DESIGN.md` | The written authority: who the reader is, the priority order, how a page is composed, the rejection list, one short chapter per brand |

Brand files live in each product repo, not here. The contract is what keeps
them honest. A new product starts from the `design-system-starter` template:
Next 16, Tailwind v4, this package, a blank brand file and the guardrails on.

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
stylesheet. Order matters: roles first.

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
  }),
])
```

## The two tiers, in one paragraph

Primitives hold literals (`--brand`, `--band`, `--ink`) and live in the brand
file. Semantics either alias a primitive via `var()` in `roles.css` (the
eight that are identical in light and dark: foreground, card, popover,
primary, accent, ring and their foregrounds) or hold a brand-tuned literal
in the brand file (the six that diverge in dark: secondary, muted, border,
input, muted-foreground, accent-foreground). Dark border and input as
translucent hairlines is a design decision, not duplication; never "fix" a
divergent semantic by aliasing it.

## Versioning

Semantic versioning by hand. A new role or a renamed role is a minor bump
and a note in the changelog; a changed contract that a brand file must
satisfy anew is a major bump.

## Licence

MIT.
