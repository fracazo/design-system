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

const priorities: SortableItem[] = [
  { id: "calm", label: "A calm room" },
  { id: "partner", label: "Partner stays with me" },
  { id: "skin", label: "Immediate skin to skin" },
  { id: "music", label: "Music I chose" },
  { id: "delay", label: "Delayed cord clamping" },
  { id: "dim", label: "Dim lights" },
];

export function IntroScene() {
  return (
    <Stage width="max-w-lg">
      <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-ink-3">
        The System Proposes
      </p>
      <h1 className="mt-3 text-display">
        Design decisions <span className="text-headline-accent">as code</span>
      </h1>
      <p className="mt-5 max-w-prose text-lede text-ink-2">
        Nineteen components, a brand contract, eight lint rules. The bar lives in the tooling.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button>Start a product</Button>
        <Button variant="outline">Secondary</Button>
      </div>
      <div className="mt-10">
        <OfferCard
          href="#intro"
          onClick={holdLink}
          media={<Tile letter="B" wash="rose" />}
          tag="Birth preferences"
          title="A plan your team can actually use"
          description="Facts, options and consequences. One primary action per step."
          footer={{
            avatar: <Initials letters="BG" />,
            name: "BirthGuide",
            meta: "Evidence-based",
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
          media={<Tile letter="L" wash="sand" />}
          tag="Lint"
          title="Eight rules"
          description="Colour, radius, dark pairs, stock palette. The build fails first."
          footer={{ name: "design-system/*", meta: "ESLint plugin" }}
        />
        <OfferCard
          href="#layers"
          onClick={holdLink}
          highlighted
          media={<Tile letter="C" wash="rose" />}
          tag="Components"
          title="Use for, avoid when"
          description="The decision sits in the source, not in a doc nobody opens."
          footer={{ name: "src/ui/*", meta: "19 exports" }}
        />
        <OfferCard
          href="#layers"
          onClick={holdLink}
          media={<Tile letter="S" wash="peri" />}
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
            Rose
          </p>
          <OfferCard
            href="#brand"
            onClick={holdLink}
            media={<Tile letter="B" wash="rose" />}
            tag="BirthGuide"
            title="Feel calm and prepared"
            description="Same roles. One brand file. Cream, espresso, rose."
            footer={{ avatar: <Initials letters="BG" />, name: "BirthGuide", meta: "Australia" }}
          />
        </div>
        <div className="skin-bp">
          <p className="mb-4 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-ink-3">
            Periwinkle
          </p>
          <OfferCard
            href="#brand"
            onClick={holdLink}
            media={<Tile letter="P" wash="peri" />}
            tag="birthplans.app"
            title="Your plan, ready to share"
            description="Same roles. Hue rotated. The system never moved."
            footer={{
              avatar: (
                <span className="grid size-full place-items-center bg-chip-3-soft text-sm font-semibold text-chip-3-ink">
                  BP
                </span>
              ),
              name: "birthplans.app",
              meta: "US English",
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
                Nineteen components. Each one carries its own guidance in JSDoc.
              </p>
            </TabsContent>
            <TabsContent value="detail">
              <p className="mt-4 text-sm text-muted-foreground">
                Seventeen sit on shadcn. OfferCard and ArticleCard are house primitives.
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
        <Button>Start your plan</Button>
        <Button variant="outline">Save draft</Button>
        <Button variant="ghost">Back</Button>
        <Button variant="destructive">Delete plan</Button>
      </div>
    </Stage>
  );
}

export function FormScene() {
  const [notes, setNotes] = useState("");

  return (
    <Stage width="max-w-md">
      <div className="rounded-20 bg-card p-6 shadow-card">
        <h2 className="text-section-title">Anything else your team should know</h2>
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
            placeholder="Allergies, support people, a song you want in the room."
          />
        </div>
        <div className="mt-6">
          <Button className="w-full">Save</Button>
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
          Dense forms only. Questionnaire answers use icon cards, never these.
        </p>
        <div className="mt-6 grid gap-2">
          <Label>Hospital filter</Label>
          <Select defaultValue="public">
            <SelectTrigger className="w-full min-h-12">
              <SelectValue placeholder="Choose a hospital" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="public">Public maternity</SelectItem>
              <SelectItem value="private">Private hospital</SelectItem>
              <SelectItem value="birth-centre">Birth centre</SelectItem>
              <SelectItem value="home">Planned home birth</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <RadioGroup defaultValue="one" className="mt-6">
          <label className="flex items-center gap-3 text-sm">
            <RadioGroupItem value="one" id="r1" />
            Single choice
          </label>
          <label className="flex items-center gap-3 text-sm">
            <RadioGroupItem value="two" id="r2" />
            Another option
          </label>
        </RadioGroup>
        <label className="mt-6 flex items-center gap-3 text-sm">
          <Checkbox defaultChecked id="c1" />
          Email me the PDF
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
            <Button>Preview the plan</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Your plan preview</DialogTitle>
              <DialogDescription>
                A focused task over dimmed content. Close uses focus-visible, so a mouse open does not paint a ring.
              </DialogDescription>
            </DialogHeader>
            <p className="text-sm text-foreground">
              Partner stays. Immediate skin to skin. Delayed cord clamping.
            </p>
            <DialogFooter>
              <Button>Download PDF</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">Did you know</Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="rounded-t-xl">
            <SheetHeader>
              <SheetTitle>Skin to skin</SheetTitle>
              <SheetDescription>
                Supplementary mobile detail. On desktop this content sits as an aside.
              </SheetDescription>
            </SheetHeader>
            <p className="px-4 pb-6 text-sm text-foreground">
              Holding the baby on bare chest in the first hour helps regulate temperature and heart rate.
            </p>
          </SheetContent>
        </Sheet>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost">Hospital search</Button>
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
      <Tabs defaultValue="plan">
        <TabsList>
          <TabsTrigger value="plan">Plan</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
        </TabsList>
        <TabsContent value="plan">
          <div className="mt-2 rounded-20 bg-card px-5 shadow-card">
            <Accordion type="single" collapsible defaultValue="labour">
              <AccordionItem value="labour">
                <AccordionTrigger>Labour</AccordionTrigger>
                <AccordionContent>
                  Dim lights, music I chose, freedom to move.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="birth">
                <AccordionTrigger>Birth</AccordionTrigger>
                <AccordionContent>
                  Immediate skin to skin. Delayed cord clamping.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="after">
                <AccordionTrigger>After</AccordionTrigger>
                <AccordionContent>
                  Partner stays. No visitors for the first two hours.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </TabsContent>
        <TabsContent value="notes">
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
          media={<Tile letter="M" wash="moss" />}
          tag="Matched price"
          title="Midwife-led antenatal course"
          description="The whole card is one link. highlighted is the one emphasis signal."
          footer={{
            avatar: <Initials letters="BG" />,
            name: "BirthGuide",
            meta: (
              <span>
                <span className="line-through">$240</span> $180
              </span>
            ),
          }}
        />
        <ArticleCard
          href="#cards"
          onClick={holdLink}
          media={<Tile letter="A" wash="sand" />}
          tags={["Labour", "Evidence"]}
          title="What delayed cord clamping actually does"
          excerpt="A two-line excerpt. Tags are text, not badges. No glass, no hover-only action."
          author={{ avatar: <Initials letters="AF" />, name: "Alex Fracazo" }}
          date="8 Sep 2026"
          dateTime="2026-09-08"
          readTime="4 min"
        />
      </div>
    </Stage>
  );
}

export function RankScene() {
  const [ranked, setRanked] = useState<SortableItem[]>(priorities.slice(0, 3));

  return (
    <Stage width="max-w-md">
      <div className="rounded-20 bg-card p-6 shadow-card">
        <SortableList
          available={priorities}
          ranked={ranked}
          maxRanked={5}
          onRankedChange={setRanked}
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
          media={<Tile letter="1" wash="sand" />}
          tag="Course"
          title="Antenatal basics"
          description="A peer in the grid."
          footer={{ name: "Host A", meta: "$90" }}
        />
        <OfferCard
          href="#emphasis"
          onClick={holdLink}
          highlighted
          media={<Tile letter="2" wash="rose" />}
          tag="Best match"
          title="Midwife-led course"
          description="highlighted tints the body. Nothing else changes."
          footer={{ name: "Host B", meta: "$80" }}
        />
        <OfferCard
          href="#emphasis"
          onClick={holdLink}
          media={<Tile letter="3" wash="peri" />}
          tag="Course"
          title="Weekend intensive"
          description="A peer in the grid."
          footer={{ name: "Host C", meta: "$120" }}
        />
      </div>
    </Stage>
  );
}

export function CloseScene() {
  return (
    <Stage width="max-w-lg">
      <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-ink-3">
        ds-init
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
