# Getting started

Add the design system to a product and start building. The package on npm is `@fracazo/design-system`. Jacaranda is the name you say.

A designed version of this page lives in the recording studio at `/getting-started.html` after `pnpm studio`.

## Quick start with AI

Paste this into your AI coding tool and let it handle the setup:

**Set up the design system**

```
Scaffold a new product on Jacaranda.

Run `pnpm dlx --package @fracazo/design-system ds-init my-product`.
Then `cd my-product && pnpm install`. Read CLAUDE.md and
node_modules/@fracazo/design-system/skills/product-design/SKILL.md
for the conventions.

Do not add colour, radius or clamp literals. The brand file owns
every value. Keep every property name.
```

Then give it a look. Every product gets a brand file whether or not anyone paints it, so it is worth one question at setup rather than revisiting screens later that were built around the wrong feel:

**Give it a look**

```
Ask me what this product should feel like. The brand lives in
src/system/brands/*.css and nowhere else.

Keep every property name. Replace the achromatic placeholders in
the light and dark blocks. Point --font-sans and --font-mono at
the typeface in layout.tsx.

Run `pnpm brand:contract` and show me the first surface before
building more screens. Default to the starter placeholders if I
have no preference, and show me the result before moving on.
```

## Start a product

`ds-init` writes Next 16, Tailwind v4, this package, a blank brand file and the guardrails on, pinned to the version that ran. It refuses a non-empty directory.

```bash
pnpm dlx --package @fracazo/design-system ds-init my-product
```

Then:

1. `pnpm install`.
2. Rename the brand file to the product and update the two paths that name it: the `@import` in `globals.css` and the `brand:*` scripts.
3. Replace every value in the brand file, light and dark. Keep the property names. `pnpm brand:contract` holds you to them.
4. Pick the typeface in `layout.tsx` and point the brand file's `@theme` block at its variable.
5. Rewrite the top of `CLAUDE.md`, delete `page.tsx`, build the first surface. `pnpm lint && pnpm typecheck && pnpm build` before every merge.

## Add it to an existing project

Tailwind v4 is a peer. So are the libraries the components sit on. A product that only wants the roles and guardrails can leave the component peers uninstalled.

```bash
pnpm add @fracazo/design-system
```

## Import the roles

Import the roles, then exactly one brand file, at the top of the global stylesheet. Order matters: roles first. `roles.css` also brings in the motion vocabulary, so no animation library is needed. Then tell Tailwind to scan the package, so it generates the utilities the components use.

```css
@import "tailwindcss";
@import "@fracazo/design-system/roles.css";
@import "./system/brands/my-product.css";

@source "../../node_modules/@fracazo/design-system/dist";
```

## Products without Tailwind

A static page can consume the roles with plain CSS. React, Tailwind and Next are not required. The components are React-only; leave them out.

Import order matters. The package's `roles.css` first, then exactly one brand file.

```html
<link rel="stylesheet" href="node_modules/@fracazo/design-system/css/roles.css" />
<link rel="stylesheet" href="brand.css" />
```

The radius ramp (`--radius-sm` through `--radius-4xl`) and the two font roles (`--font-sans`, `--font-mono`) are ordinary custom properties on `:root` in `roles.css`, so they resolve when `@theme` is inert. Set the real stacks on `:root` in the brand file. A plain stack, not `next/font`:

```css
:root {
  --font-sans: "Source Sans 3", ui-sans-serif, system-ui, sans-serif;
  --font-mono: ui-monospace, monospace;
  --radius: 0.5rem;
}
```

Repeat the font lines in `@theme inline` only when the product also uses Tailwind, so the `font-sans` utility matches.

The brand file must satisfy core. Declare `brand-extensions: landing` or `showcase` only when every property in that set is defined. `ds-check-brand` accepts core alone.

A git install has no `dist/` until `prepare` runs the TypeScript build, which is what publishes `ds-check-brand`.

## Add your first component

Import from a per-component subpath. That keeps each one's client boundary where it declares it. Pull `cn` from the root.

```tsx
import { Button } from "@fracazo/design-system/ui/button";
import { cn } from "@fracazo/design-system";

export function Page() {
  return (
    <div className={cn("flex flex-wrap gap-3")}>
      <Button>Walk the street</Button>
      <Button variant="outline">Save the route</Button>
    </div>
  );
}
```

## Tell the agent

Put this in the product's `CLAUDE.md` or `AGENTS.md`. The skill names the request mode, routes to the reference that applies, and cites rules by stable ID. `DESIGN.md` is the narrative those rules point back to.

```
When shaping, building, reviewing or writing copy for user-facing UI, load
node_modules/@fracazo/design-system/skills/product-design/SKILL.md first.
Skip it for backend-only work, telemetry, generated files and tests with no
shipped UI.
```

## Wire the guardrails

Nine ESLint rules catch what a reviewer would. `no-em-dash` is an error. `no-ai-language` is a warning. Exempt only renderers that cannot use CSS variables: PDF, email, OG images. Then hold the brand file to the contract: core, plus any extension the file declares. Nothing missing from that set, nothing extra.

```js
import { designSystemGuardrails } from "@fracazo/design-system/eslint";

export default defineConfig([
  // ...your base config
  designSystemGuardrails({
    files: ["src/**/*.{ts,tsx}"],
    ignores: ["src/components/pdf/**", "src/lib/email.ts"],
  }),
]);
```

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

## What ships

- Nine lint rules: colour literals, arbitrary clamps, dark pairs, radius literals, stock palette, focus rings, text on always-dark surfaces, em dashes (error), machine-written language (warning).
- Twenty-one components, each with use for, avoid when, and variants in JSDoc. React only. ShaderField and LightOrb are conversion-surface GPU illustration.
- Eight agent skills: six domain skills, an interface orchestrator, and product-design for request modes, roles and intake.
- Four bins: `ds-init`, `ds-check-brand`, `ds-build-brand-css`, `ds-intake`.

## Recording studio

From the package root, after `pnpm install` and `pnpm build`:

```bash
pnpm studio
```

Open `http://localhost:5173` for the X series, or `http://localhost:5173/getting-started.html` for this page. Nothing in the studio folder publishes.
