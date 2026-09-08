import { Button } from "@fracazo/design-system/ui/button";
import { Input } from "@fracazo/design-system/ui/input";
import { Label } from "@fracazo/design-system/ui/label";

/**
 * A one-screen proof that the system is wired: the roles resolve through the
 * brand file, the package's components render, both themes work. Replace it
 * with the product's first surface; nothing here is meant to survive.
 */
export default function Home() {
  return (
    <main>
      <section className="mx-auto max-w-3xl px-6 py-band">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-ink-3">
          Starter
        </p>
        <h1 className="mt-3 text-display">
          A new product on the <span className="text-headline-accent">system</span>
        </h1>
        <p className="mt-5 max-w-prose text-lede text-ink-2">
          The roles come from the package, the values from one brand file.
          Replace every value in <code className="font-mono text-sm">src/system/brands/starter.css</code>,
          then delete this page.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button>Primary action</Button>
          <Button variant="outline">Secondary</Button>
          <Button variant="ghost">Back</Button>
        </div>
      </section>

      <section className="bg-band py-band">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-section-title">A form on a band</h2>
          <div className="mt-band-gap rounded-20 bg-card p-6 shadow-card">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" />
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="rounded-full bg-status-want-soft px-3 py-1 text-xs font-medium text-status-want">Want</span>
              <span className="rounded-full bg-status-ifnec-soft px-3 py-1 text-xs font-medium text-highlight-ink">If necessary</span>
              <span className="rounded-full bg-status-no-soft px-3 py-1 text-xs font-medium text-status-no">Don&apos;t want</span>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-dark py-band text-dark-ink-2">
        <div className="mx-auto max-w-3xl px-6">
          <h4 className="text-dark-faint-2">Always-dark surface</h4>
          <p className="mt-2 text-dark-soft">
            Text here comes from the on-dark ramp, which does not change with the theme.
          </p>
        </div>
      </footer>
    </main>
  );
}
