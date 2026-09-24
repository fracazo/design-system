import { useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@fracazo/design-system/ui/button";
import { JacarandaLockup } from "./mark";

const toc = [
  { id: "quick-start-with-ai", label: "Quick start with AI" },
  { id: "start-a-product", label: "Start a product" },
  { id: "add-it-to-an-existing-project", label: "Add it to an existing project" },
  { id: "import-the-roles", label: "Import the roles" },
  { id: "add-your-first-component", label: "Add your first component" },
  { id: "tell-the-agent", label: "Tell the agent" },
  { id: "wire-the-guardrails", label: "Wire the guardrails" },
  { id: "what-ships", label: "What ships" },
  { id: "recording-studio", label: "Recording studio" },
] as const;

const setupPrompt = `Scaffold a new product on Jacaranda.

Run \`pnpm dlx --package @fracazo/design-system ds-init my-product\`.
Then \`cd my-product && pnpm install\`. Read CLAUDE.md and
node_modules/@fracazo/design-system/skills/product-design/SKILL.md
for the conventions.

Do not add colour, radius or clamp literals. The brand file owns
every value. Keep every property name.`;

const lookPrompt = `Ask me what this product should feel like. The brand lives in
src/system/brands/*.css and nowhere else.

Keep every property name. Replace the achromatic placeholders in
the light and dark blocks. Point --font-sans and --font-mono at
the typeface in layout.tsx.

Run \`pnpm brand:contract\` and show me the first surface before
building more screens. Default to the starter placeholders if I
have no preference, and show me the result before moving on.`;

const initCommand = `pnpm dlx --package @fracazo/design-system ds-init my-product`;

const installCommand = `pnpm add @fracazo/design-system`;

const cssSnippet = `@import "tailwindcss";
@import "@fracazo/design-system/roles.css";
@import "./system/brands/my-product.css";

@source "../../node_modules/@fracazo/design-system/dist";`;

const componentSnippet = `import { Button } from "@fracazo/design-system/ui/button";
import { cn } from "@fracazo/design-system";

export function Page() {
  return (
    <div className={cn("flex flex-wrap gap-3")}>
      <Button>Walk the street</Button>
      <Button variant="outline">Save the route</Button>
    </div>
  );
}`;

const skillSnippet = `When shaping, building, reviewing or writing copy for user-facing UI, load
node_modules/@fracazo/design-system/skills/product-design/SKILL.md first.
Skip it for backend-only work, telemetry, generated files and tests with no
shipped UI.`;

const eslintSnippet = `import { designSystemGuardrails } from "@fracazo/design-system/eslint";

export default defineConfig([
  // ...your base config
  designSystemGuardrails({
    files: ["src/**/*.{ts,tsx}"],
    ignores: ["src/components/pdf/**", "src/lib/email.ts"],
  }),
]);`;

const scriptsSnippet = `{
  "scripts": {
    "brand:contract": "ds-check-brand src/system/brands/my-product.css",
    "brand:build": "ds-build-brand-css --brand src/system/brands/my-product.css --out public/brand.css --name MyProduct --url https://my-product.example",
    "brand:check": "ds-build-brand-css --brand src/system/brands/my-product.css --out public/brand.css --name MyProduct --url https://my-product.example --check",
    "lint": "eslint && pnpm brand:check && pnpm brand:contract"
  }
}`;

function CodeBlock({
  label,
  code,
  copyLabel,
}: {
  label: string;
  code: string;
  copyLabel: string;
}) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timer);
  }, [copied]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="overflow-hidden rounded-20 bg-dark text-dark-ink shadow-card">
      <div className="flex items-center justify-between gap-3 px-4 py-2">
        <p className="font-mono text-[12px] tracking-[0.06em] text-dark-muted">{label}</p>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          onClick={copy}
          aria-label={copied ? "Copied" : copyLabel}
          className="text-dark-ink hover:bg-dark-2 hover:text-dark-ink"
        >
          {copied ? <Check aria-hidden /> : <Copy aria-hidden />}
        </Button>
      </div>
      <pre className="overflow-x-auto px-4 pb-4 font-mono text-[13px] leading-relaxed text-dark-ink-2">
        <code>{code}</code>
      </pre>
      <p className="sr-only" role="status" aria-live="polite">
        {copied ? "Copied" : ""}
      </p>
    </div>
  );
}

function SectionHeading({ id, children }: { id: string; children: string }) {
  return (
    <h2
      id={id}
      className="scroll-mt-28 text-section-title font-semibold tracking-tight text-ink"
    >
      <a href={`#${id}`} className="text-ink no-underline hover:text-headline-accent">
        {children}
      </a>
    </h2>
  );
}

export function GettingStartedPage() {
  return (
    <div>
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-brand focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
          <JacarandaLockup className="text-[21px] text-ink" subtitle="design system" />
          <nav aria-label="Docs" className="flex items-center gap-4 text-sm">
            <a href="/getting-started.html" className="text-brand-ink" aria-current="page">
              Get started
            </a>
            <a
              href="/"
              className="text-ink-2 underline-offset-2 hover:text-ink hover:underline"
            >
              Studio
            </a>
            <a
              href="https://github.com/fracazo/design-system"
              className="text-ink-2 underline-offset-2 hover:text-ink hover:underline"
            >
              GitHub
            </a>
          </nav>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-12 lg:grid-cols-[minmax(0,1fr)_14rem] lg:py-16">
        <main id="content">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-ink-3">
            Docs
          </p>
          <h1 className="mt-3 text-display font-bold tracking-tight text-ink">Getting started</h1>
          <p className="mt-5 max-w-prose text-lede text-ink-2">
            Add the design system to a product and start building. The package on npm is
            {" "}
            <code className="font-mono text-[0.95em] text-ink">@fracazo/design-system</code>
            . Jacaranda is the name you say.
          </p>

          <details className="mt-8 rounded-20 border border-border bg-card px-5 py-3 lg:hidden">
            <summary className="cursor-pointer text-sm font-medium text-ink">On this page</summary>
            <ol className="mt-3 list-none space-y-2 pb-2">
              {toc.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className="text-sm text-ink-2 hover:text-brand-ink">
                    {item.label}
                  </a>
                </li>
              ))}
            </ol>
          </details>

          <section className="mt-14" aria-labelledby="quick-start-with-ai">
            <SectionHeading id="quick-start-with-ai">Quick start with AI</SectionHeading>
            <p className="mt-4 max-w-prose text-ink-2">
              Paste this into your AI coding tool and let it handle the setup:
            </p>
            <p className="mt-6 font-mono text-[12px] tracking-[0.06em] text-ink-3">
              Set up the design system
            </p>
            <div className="mt-3">
              <CodeBlock label="text" code={setupPrompt} copyLabel="Copy the setup prompt" />
            </div>
            <p className="mt-6 max-w-prose text-ink-2">
              Then give it a look. Every product gets a brand file whether or not anyone
              paints it, so it is worth one question at setup rather than revisiting
              screens later that were built around the wrong feel:
            </p>
            <p className="mt-6 font-mono text-[12px] tracking-[0.06em] text-ink-3">
              Give it a look
            </p>
            <div className="mt-3">
              <CodeBlock label="text" code={lookPrompt} copyLabel="Copy the look prompt" />
            </div>
          </section>

          <section className="mt-16" aria-labelledby="start-a-product">
            <SectionHeading id="start-a-product">Start a product</SectionHeading>
            <p className="mt-4 max-w-prose text-ink-2">
              <code className="font-mono text-[0.95em] text-ink">ds-init</code>
              {" "}
              writes Next 16, Tailwind v4, this package, a blank brand file and the
              guardrails on, pinned to the version that ran. It refuses a non-empty
              directory.
            </p>
            <div className="mt-5">
              <CodeBlock label="bash" code={initCommand} copyLabel="Copy the init command" />
            </div>
            <ol className="mt-6 max-w-prose list-decimal space-y-3 ps-5 text-ink-2">
              <li>
                <code className="font-mono text-[0.95em] text-ink">pnpm install</code>
                .
              </li>
              <li>
                Rename the brand file to the product and update the two paths that name
                it: the
                {" "}
                <code className="font-mono text-[0.95em] text-ink">@import</code>
                {" "}
                in
                {" "}
                <code className="font-mono text-[0.95em] text-ink">globals.css</code>
                {" "}
                and the
                {" "}
                <code className="font-mono text-[0.95em] text-ink">brand:*</code>
                {" "}
                scripts.
              </li>
              <li>
                Replace every value in the brand file, light and dark. Keep the property
                names.
                {" "}
                <code className="font-mono text-[0.95em] text-ink">pnpm brand:contract</code>
                {" "}
                holds you to them.
              </li>
              <li>
                Pick the typeface in
                {" "}
                <code className="font-mono text-[0.95em] text-ink">layout.tsx</code>
                {" "}
                and point the brand file&apos;s
                {" "}
                <code className="font-mono text-[0.95em] text-ink">@theme</code>
                {" "}
                block at its variable.
              </li>
              <li>
                Rewrite the top of
                {" "}
                <code className="font-mono text-[0.95em] text-ink">CLAUDE.md</code>
                , delete
                {" "}
                <code className="font-mono text-[0.95em] text-ink">page.tsx</code>
                , build the first surface.
                {" "}
                <code className="font-mono text-[0.95em] text-ink">pnpm lint && pnpm typecheck && pnpm build</code>
                {" "}
                before every merge.
              </li>
            </ol>
          </section>

          <section className="mt-16" aria-labelledby="add-it-to-an-existing-project">
            <SectionHeading id="add-it-to-an-existing-project">Add it to an existing project</SectionHeading>
            <p className="mt-4 max-w-prose text-ink-2">
              Tailwind v4 is a peer. So are the libraries the components sit on. A
              product that only wants the roles and guardrails can leave the component
              peers uninstalled.
            </p>
            <div className="mt-5">
              <CodeBlock label="bash" code={installCommand} copyLabel="Copy the install command" />
            </div>
          </section>

          <section className="mt-16" aria-labelledby="import-the-roles">
            <SectionHeading id="import-the-roles">Import the roles</SectionHeading>
            <p className="mt-4 max-w-prose text-ink-2">
              Import the roles, then exactly one brand file, at the top of the global
              stylesheet. Order matters: roles first.
              {" "}
              <code className="font-mono text-[0.95em] text-ink">roles.css</code>
              {" "}
              also brings in the motion vocabulary, so no animation library is needed.
              Then tell Tailwind to scan the package, so it generates the utilities the
              components use.
            </p>
            <div className="mt-5">
              <CodeBlock label="css" code={cssSnippet} copyLabel="Copy the stylesheet imports" />
            </div>
          </section>

          <section className="mt-16" aria-labelledby="add-your-first-component">
            <SectionHeading id="add-your-first-component">Add your first component</SectionHeading>
            <p className="mt-4 max-w-prose text-ink-2">
              Import from a per-component subpath. That keeps each one&apos;s client
              boundary where it declares it. Pull
              {" "}
              <code className="font-mono text-[0.95em] text-ink">cn</code>
              {" "}
              from the root.
            </p>
            <div className="mt-5">
              <CodeBlock label="tsx" code={componentSnippet} copyLabel="Copy the first component example" />
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button>Walk the street</Button>
              <Button variant="outline">Save the route</Button>
            </div>
          </section>

          <section className="mt-16" aria-labelledby="tell-the-agent">
            <SectionHeading id="tell-the-agent">Tell the agent</SectionHeading>
            <p className="mt-4 max-w-prose text-ink-2">
              Put this in the product&apos;s
              {" "}
              <code className="font-mono text-[0.95em] text-ink">CLAUDE.md</code>
              {" "}
              or
              {" "}
              <code className="font-mono text-[0.95em] text-ink">AGENTS.md</code>
              . The skill names the request mode, routes to the reference that applies,
              and cites rules by stable ID.
              {" "}
              <code className="font-mono text-[0.95em] text-ink">DESIGN.md</code>
              {" "}
              is the narrative those rules point back to.
            </p>
            <div className="mt-5">
              <CodeBlock label="text" code={skillSnippet} copyLabel="Copy the agent pointer" />
            </div>
          </section>

          <section className="mt-16" aria-labelledby="wire-the-guardrails">
            <SectionHeading id="wire-the-guardrails">Wire the guardrails</SectionHeading>
            <p className="mt-4 max-w-prose text-ink-2">
              Nine ESLint rules catch what a reviewer would. Exempt only renderers that
              cannot use CSS variables: PDF, email, OG images. Then hold the brand file
              to core, plus any extension it declares. Nothing missing from that set, nothing extra.
            </p>
            <div className="mt-5">
              <CodeBlock label="js" code={eslintSnippet} copyLabel="Copy the ESLint config" />
            </div>
            <div className="mt-5">
              <CodeBlock label="json" code={scriptsSnippet} copyLabel="Copy the brand scripts" />
            </div>
          </section>

          <section className="mt-16" aria-labelledby="what-ships">
            <SectionHeading id="what-ships">What ships</SectionHeading>
            <ul className="mt-4 max-w-prose list-disc space-y-2 ps-5 text-ink-2">
              <li>Eight lint rules: colour literals, arbitrary clamps, dark pairs, radius literals, stock palette, focus rings, text on always-dark surfaces, em dashes.</li>
              <li>Twenty-one components, each with use for, avoid when, and variants in JSDoc.</li>
              <li>One agent skill, with request modes, stable rule IDs, exemplars and intake.</li>
              <li>
                Four bins:
                {" "}
                <code className="font-mono text-[0.95em] text-ink">ds-init</code>
                ,
                {" "}
                <code className="font-mono text-[0.95em] text-ink">ds-check-brand</code>
                ,
                {" "}
                <code className="font-mono text-[0.95em] text-ink">ds-build-brand-css</code>
                ,
                {" "}
                <code className="font-mono text-[0.95em] text-ink">ds-intake</code>
                .
              </li>
            </ul>
          </section>

          <section className="mt-16 pb-16" aria-labelledby="recording-studio">
            <SectionHeading id="recording-studio">Recording studio</SectionHeading>
            <p className="mt-4 max-w-prose text-ink-2">
              From the package root, after
              {" "}
              <code className="font-mono text-[0.95em] text-ink">pnpm install</code>
              {" "}
              and
              {" "}
              <code className="font-mono text-[0.95em] text-ink">pnpm build</code>
              :
            </p>
            <div className="mt-5">
              <CodeBlock label="bash" code="pnpm studio" copyLabel="Copy the studio command" />
            </div>
            <p className="mt-5 max-w-prose text-ink-2">
              Open
              {" "}
              <a href="/" className="text-brand-ink underline-offset-2 hover:underline">
                the recording studio
              </a>
              {" "}
              for the X series. Nothing in that folder publishes.
            </p>
          </section>
        </main>

        <aside className="hidden lg:block">
          <nav aria-label="On this page" className="sticky top-28">
            <p className="font-mono text-[12px] tracking-[0.06em] text-ink-3">On this page</p>
            <ol className="mt-3 list-none space-y-2">
              {toc.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className="text-sm text-ink-2 hover:text-brand-ink">
                    {item.label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </aside>
      </div>
    </div>
  );
}
