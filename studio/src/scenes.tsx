import { useEffect, useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@fracazo/design-system/ui/accordion";
import { ArticleCard } from "@fracazo/design-system/ui/article-card";
import { Button } from "@fracazo/design-system/ui/button";
import { Checkbox } from "@fracazo/design-system/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@fracazo/design-system/ui/dialog";
import { Input } from "@fracazo/design-system/ui/input";
import { Label } from "@fracazo/design-system/ui/label";
import { Flowly } from "@fracazo/design-system/ui/flowly";
import { OfferCard } from "@fracazo/design-system/ui/offer-card";
import { Popover, PopoverContent, PopoverTrigger } from "@fracazo/design-system/ui/popover";
import { Progress } from "@fracazo/design-system/ui/progress";
import { RadioGroup, RadioGroupItem } from "@fracazo/design-system/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@fracazo/design-system/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@fracazo/design-system/ui/sheet";
import { SortableList, type SortableItem } from "@fracazo/design-system/ui/sortable-list";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@fracazo/design-system/ui/tabs";
import { Textarea } from "@fracazo/design-system/ui/textarea";
import { Initials, Stage, Tile, holdLink } from "./media";
import { JacarandaMark } from "./mark";

const streets: SortableItem[] = [
  { id: "grafton", label: "Grafton" },
  { id: "brisbane", label: "Brisbane" },
  { id: "sydney", label: "Sydney" },
  { id: "rio", label: "Rio de Janeiro" },
  { id: "bh", label: "Belo Horizonte" },
  { id: "buenos", label: "Buenos Aires" },
];

export function IntroScene() {
  return (
    <Stage width="max-w-lg">
      <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-ink-3">
        Brazil, then Australia
      </p>
      <h1 className="mt-3 text-display">
        <span className="font-bold tracking-tight text-headline-accent">Jacaranda</span>
      </h1>
      <p className="mt-5 max-w-prose text-lede text-ink-2">
        A South American tree that became Australian spring. I named a design system after that crossing.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button>Walk the street</Button>
        <Button variant="outline">Save the route</Button>
      </div>
      <div className="mt-10">
        <OfferCard
          href="#intro"
          onClick={holdLink}
          media={
            <div className="grid size-full place-items-center bg-brand-soft">
              <JacarandaMark density="full" className="size-28" />
            </div>
          }
          tag="Jacaranda mimosifolia"
          title="Streets of purple haze"
          description="Native to Brazil. Shipped through Kew in London. Blooming in Grafton, Brisbane, Sydney."
          footer={{
            avatar: <Initials letters="GR" />,
            name: "Grafton",
            meta: "Jacaranda festival · NSW",
          }}
          className="animate-in fade-in slide-in-from-bottom-4 duration-500"
        />
      </div>
    </Stage>
  );
}

export function QueueScene() {
  return (
    <Stage width="max-w-md">
      <div className="rounded-20 bg-card p-6 shadow-card">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-ink-3">
          One signal
        </p>
        <h2 className="mt-3 text-section-title">The review queue is not the bar</h2>
        <p className="mt-3 text-sm text-muted-foreground">
          Emphasis is spent once. A tinted border, a heavy shadow, an uppercase chip and an accent button together is shouting.
        </p>
        <div className="mt-6">
          <Button className="w-full">Continue</Button>
        </div>
      </div>
    </Stage>
  );
}

export function LayersScene() {
  return (
    <Stage width="max-w-4xl">
      <div className="grid gap-5 md:grid-cols-3">
        <OfferCard
          href="#layers"
          onClick={holdLink}
          media={<Tile letter="L" wash="mist" />}
          tag="Lint"
          title="Eight rules"
          description="Colour, radius, dark pairs, stock palette. The build fails first."
          footer={{ name: "design-system/*", meta: "ESLint plugin" }}
        />
        <OfferCard
          href="#layers"
          onClick={holdLink}
          highlighted
          media={<Tile letter="C" wash="bloom" />}
          tag="Components"
          title="Use for, avoid when"
          description="The decision sits in the source, not in a doc nobody opens."
          footer={{ name: "src/ui/*", meta: "19 exports" }}
        />
        <OfferCard
          href="#layers"
          onClick={holdLink}
          media={<Tile letter="S" wash="grafton" />}
          tag="Skill"
          title="The system proposes"
          description="Agents load the rules before they touch any UI. A human commits."
          footer={{ name: "product-design", meta: "Stable IDs" }}
        />
      </div>
    </Stage>
  );
}

export function BrandScene() {
  return (
    <Stage width="max-w-4xl">
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <p className="mb-4 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-ink-3">
            Brazil
          </p>
          <OfferCard
            href="#brand"
            onClick={holdLink}
            media={<Tile letter="J" wash="bloom" />}
            tag="Jacaranda mimosifolia"
            title="The native range"
            description="Same roles. One brand file. Bloom purple for the action and the name."
            footer={{ avatar: <Initials letters="RJ" />, name: "Rio de Janeiro", meta: "Kew, London, 1818" }}
          />
        </div>
        <div className="skin-grafton">
          <p className="mb-4 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-ink-3">
            Australia
          </p>
          <OfferCard
            href="#brand"
            onClick={holdLink}
            media={<Tile letter="G" wash="grafton" />}
            tag="Grafton"
            title="The spring it became"
            description="Same roles. Hue rotated cooler. Lilac for the Jacaranda festival."
            footer={{
              avatar: (
                <span className="grid size-full place-items-center bg-chip-3-soft text-sm font-semibold text-chip-3-ink">
                  NSW
                </span>
              ),
              name: "Grafton",
              meta: "Jacaranda festival",
            }}
          />
        </div>
      </div>
    </Stage>
  );
}

export function NineteenScene() {
  return (
    <Stage width="max-w-2xl">
      <div className="rounded-20 bg-card p-6 shadow-card">
        <div className="flex flex-wrap gap-2">
          <Button>Default</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
        </div>
        <div className="mt-6 grid gap-2">
          <Label htmlFor="nineteen-email">Email</Label>
          <Input id="nineteen-email" type="email" placeholder="you@example.com" />
        </div>
        <div className="mt-6">
          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="detail">Detail</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              <p className="mt-4 text-sm text-muted-foreground">
                Twenty components. Each one carries its own guidance in JSDoc.
              </p>
            </TabsContent>
            <TabsContent value="detail">
              <p className="mt-4 text-sm text-muted-foreground">
                Seventeen sit on shadcn. OfferCard, ArticleCard and Flowly are house primitives.
              </p>
            </TabsContent>
          </Tabs>
        </div>
        <div className="mt-6">
          <Progress value={64} />
        </div>
      </div>
    </Stage>
  );
}

export function ButtonsScene() {
  return (
    <Stage width="max-w-md">
      <div className="flex flex-col gap-4">
        <Button>Walk the street</Button>
        <Button variant="outline">Save the route</Button>
        <Button variant="ghost">Back</Button>
        <Button variant="destructive">Leave the walk</Button>
      </div>
    </Stage>
  );
}

export function FormScene() {
  const [notes, setNotes] = useState("");

  return (
    <Stage width="max-w-md">
      <div className="rounded-20 bg-card p-6 shadow-card">
        <h2 className="text-section-title">A note for spring</h2>
        <div className="mt-6 grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="you@example.com" />
        </div>
        <div className="mt-5 grid gap-2">
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            id="notes"
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            placeholder="Grafton in late October. Walk Prince Street for the Jacaranda festival."
          />
        </div>
        <div className="mt-6">
          <Button className="w-full">Send</Button>
        </div>
      </div>
    </Stage>
  );
}

export function ChoiceScene() {
  return (
    <Stage width="max-w-md">
      <div className="rounded-20 bg-card p-6 shadow-card">
        <h2 className="text-section-title">Utilitarian controls</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Dense filters only. A short list of peers uses cards, not these.
        </p>
        <div className="mt-6 grid gap-2">
          <Label>City</Label>
          <Select defaultValue="grafton">
            <SelectTrigger className="w-full min-h-12">
              <SelectValue placeholder="Choose a city" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="grafton">Grafton</SelectItem>
              <SelectItem value="brisbane">Brisbane</SelectItem>
              <SelectItem value="sydney">Sydney</SelectItem>
              <SelectItem value="rio">Rio de Janeiro</SelectItem>
              <SelectItem value="bh">Belo Horizonte</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <RadioGroup defaultValue="one" className="mt-6">
          <label className="flex items-center gap-3 text-sm">
            <RadioGroupItem value="one" id="r1" />
            In bloom
          </label>
          <label className="flex items-center gap-3 text-sm">
            <RadioGroupItem value="two" id="r2" />
            In leaf
          </label>
        </RadioGroup>
        <label className="mt-6 flex items-center gap-3 text-sm">
          <Checkbox defaultChecked id="c1" />
          Include the fallen carpet
        </label>
      </div>
    </Stage>
  );
}

export function OverlaysScene() {
  return (
    <Stage width="max-w-md">
      <div className="flex flex-col gap-3">
        <Dialog>
          <DialogTrigger asChild>
            <Button>Preview the street</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Prince Street, Grafton</DialogTitle>
              <DialogDescription>
                A focused task over dimmed content. Close uses focus-visible, so a mouse open does not paint a ring.
              </DialogDescription>
            </DialogHeader>
            <p className="text-sm text-foreground">
              Festival week. The canopy goes violet first, then the pavement.
            </p>
            <DialogFooter>
              <Button>Walk this street</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">How they arrived</Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="rounded-t-xl">
            <SheetHeader>
              <SheetTitle>Rio, Kew in London, then here</SheetTitle>
              <SheetDescription>
                Supplementary mobile detail. On desktop this content sits as an aside.
              </SheetDescription>
            </SheetHeader>
            <p className="px-4 pb-6 text-sm text-foreground">
              Specimens left Rio for Kew in London around 1818. Seeds followed the imperial plant routes. Brisbane planted one in 1864.
            </p>
          </SheetContent>
        </Sheet>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost">Find a street</Button>
          </PopoverTrigger>
          <PopoverContent>
            <p className="text-sm font-medium">Suggestions stay anchored</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Focus never moves off the control.
            </p>
          </PopoverContent>
        </Popover>
      </div>
    </Stage>
  );
}

export function DisclosureScene() {
  return (
    <Stage width="max-w-lg">
      <Tabs defaultValue="bloom">
        <TabsList>
          <TabsTrigger value="bloom">Bloom</TabsTrigger>
          <TabsTrigger value="route">Route</TabsTrigger>
        </TabsList>
        <TabsContent value="bloom">
          <div className="mt-2 rounded-20 bg-card px-5 shadow-card">
            <Accordion type="single" collapsible defaultValue="bud">
              <AccordionItem value="bud">
                <AccordionTrigger>Bud</AccordionTrigger>
                <AccordionContent>
                  Tight clusters, still green. The street looks ordinary until it does not.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="open">
                <AccordionTrigger>Bloom</AccordionTrigger>
                <AccordionContent>
                  The canopy turns violet. This is the week people come for.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="carpet">
                <AccordionTrigger>Carpet</AccordionTrigger>
                <AccordionContent>
                  Flowers on the pavement. The tree is done talking. The street is not.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </TabsContent>
        <TabsContent value="route">
          <div className="mt-2 rounded-20 bg-card p-6 shadow-card">
            <p className="text-sm text-muted-foreground">
              Peer views of equal weight. Inactive panels unmount.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </Stage>
  );
}

export function CardsScene() {
  return (
    <Stage width="max-w-4xl">
      <div className="grid gap-6 md:grid-cols-2">
        <OfferCard
          href="#cards"
          onClick={holdLink}
          highlighted
          media={<Tile letter="G" wash="leaf" />}
          tag="Grafton"
          title="Prince Street in festival week"
          description="The whole card is one link. highlighted is the one emphasis signal."
          footer={{
            avatar: <Initials letters="GR" />,
            name: "Grafton",
            meta: "Jacaranda festival",
          }}
        />
        <ArticleCard
          href="#cards"
          onClick={holdLink}
          media={<Tile letter="K" wash="mist" />}
          tags={["Jacaranda", "Kew"]}
          title="How a Rio specimen became Australian spring"
          excerpt="Kew in London took the cuttings. Trade ships did the rest. A two-line excerpt. Tags are text, not badges."
          author={{ avatar: <Initials letters="AF" />, name: "Alex Fracazo" }}
          date="10 Sep 2026"
          dateTime="2026-09-10"
          readTime="4 min"
        />
      </div>
    </Stage>
  );
}

export function RankScene() {
  const [ranked, setRanked] = useState<SortableItem[]>(streets.slice(0, 3));

  return (
    <Stage width="max-w-md">
      <div className="rounded-20 bg-card p-6 shadow-card">
        <SortableList
          available={streets}
          ranked={ranked}
          maxRanked={5}
          onRankedChange={setRanked}
          rankedLabel="Walk order"
          availableLabel="The map"
        />
      </div>
    </Stage>
  );
}

export function SkillScene() {
  return (
    <Stage width="max-w-md">
      <p className="mb-6 text-center text-sm text-muted-foreground">
        Tab through. The ring is focus-visible, not focus.
      </p>
      <div className="flex flex-col gap-3">
        <Button>Shape the flow</Button>
        <Button variant="outline">Implement</Button>
        <Button variant="ghost">Review</Button>
      </div>
    </Stage>
  );
}

export function TokensScene() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    return () => {
      document.documentElement.classList.remove("dark");
    };
  }, [dark]);

  return (
    <Stage width="max-w-md">
      <div className="rounded-20 bg-card p-6 shadow-card">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-ink-3">
          One class
        </p>
        <h2 className="mt-3 text-section-title">
          The token owns <span className="text-headline-accent">both themes</span>
        </h2>
        <p className="mt-3 text-sm text-muted-foreground">
          Write bg-card once. Never a hand-authored light and dark pair.
        </p>
        <div className="mt-6 flex gap-3">
          <Button onClick={() => setDark(false)} variant={dark ? "outline" : "default"}>
            Light
          </Button>
          <Button onClick={() => setDark(true)} variant={dark ? "default" : "outline"}>
            Dark
          </Button>
        </div>
      </div>
    </Stage>
  );
}

export function EmphasisScene() {
  return (
    <Stage width="max-w-4xl">
      <div className="grid gap-5 md:grid-cols-3">
        <OfferCard
          href="#emphasis"
          onClick={holdLink}
          media={<Tile letter="R" wash="mist" />}
          tag="Rio"
          title="The native range"
          description="A peer in the grid."
          footer={{ name: "Rio de Janeiro", meta: "1818" }}
        />
        <OfferCard
          href="#emphasis"
          onClick={holdLink}
          highlighted
          media={<Tile letter="G" wash="bloom" />}
          tag="Grafton"
          title="Australian spring"
          description="highlighted tints the body. Nothing else changes."
          footer={{ name: "Grafton", meta: "Jacaranda festival" }}
        />
        <OfferCard
          href="#emphasis"
          onClick={holdLink}
          media={<Tile letter="B" wash="grafton" />}
          tag="Brisbane"
          title="City Botanic Gardens"
          description="A peer in the grid."
          footer={{ name: "Brisbane", meta: "1864" }}
        />
      </div>
    </Stage>
  );
}

export function FlowlyScene() {
  return (
    <div
      className="relative flex min-h-svh flex-col items-center justify-center bg-dark px-8 py-16 text-dark-ink"
      style={{
        backgroundImage: "radial-gradient(circle, var(--dark-line) 1px, transparent 1px)",
        backgroundSize: "22px 22px",
      }}
    >
      <Flowly shape={8} fill="gradient" colour="brand" className="w-96" />
      <p className="mt-16 font-mono text-sm text-dark-ink-2">
        {'Flowly shape={8} fill="gradient" colour="brand" motion="organic"'}
      </p>
      <div className="mt-10 max-w-md text-sm text-dark-ink-2">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-dark-muted">
          Guidelines
        </p>
        <p className="mt-3">
          Use it for marketing and product alike: it is a rule, not a marketing ornament.
        </p>
        <p className="mt-2">Sit it behind a layout, on an empty state, or as a band.</p>
      </div>
      <div className="relative mt-14 w-full max-w-md overflow-hidden rounded-20 bg-card p-8 text-card-foreground shadow-card">
        <Flowly
          shape={8}
          fill="gradient"
          colour="brand"
          className="absolute -top-5 left-1/2 w-64 -translate-x-1/2 opacity-70"
        />
        <p className="relative font-mono text-xs font-semibold uppercase tracking-[0.16em] text-ink-3">
          Empty state
        </p>
        <p className="relative mt-3 text-sm text-muted-foreground">
          No streets saved yet. The mark sits behind the copy, same component as the band above.
        </p>
      </div>
    </div>
  );
}

export function CloseScene() {
  return (
    <Stage width="max-w-lg">
      <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-ink-3">
        Jacaranda
      </p>
      <h1 className="mt-3 text-display">
        The next product starts with the <span className="text-headline-accent">bar already in</span>
      </h1>
      <p className="mt-5 text-lede text-ink-2">
        @fracazo/design-system. Public, MIT. Lint, components, skill. One brand file.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button>
          Start a product
          <ArrowRight />
        </Button>
        <Button variant="outline">
          <Check />
          Contract holds
        </Button>
      </div>
    </Stage>
  );
}
