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

const tasting: SortableItem[] = [
  { id: "meia", label: "Canastra meia-cura" },
  { id: "curado", label: "Canastra curado" },
  { id: "serro", label: "Queijo do Serro" },
  { id: "araxa", label: "Araxá" },
  { id: "alagoa", label: "Alagoa" },
  { id: "pao", label: "Pão de queijo" },
];

export function IntroScene() {
  return (
    <Stage width="max-w-lg">
      <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-ink-3">
        Um cafezinho e um queijinho
      </p>
      <h1 className="mt-3 text-display">
        <span className="text-headline-accent">Canastra</span>
      </h1>
      <p className="mt-5 max-w-prose text-lede text-ink-2">
        A cheese you cannot fake. A design system that works the same way.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button>Order a wheel</Button>
        <Button variant="outline">Save the route</Button>
      </div>
      <div className="mt-10">
        <OfferCard
          href="#intro"
          onClick={holdLink}
          media={<Tile letter="C" wash="cafe" />}
          tag="Serra da Canastra"
          title="A wheel from São Roque de Minas"
          description="Raw milk, yellow rind, only this if it comes from that serra."
          footer={{
            avatar: <Initials letters="SR" />,
            name: "São Roque de Minas",
            meta: "Meia-cura · 1 kg",
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
          media={<Tile letter="C" wash="cafe" />}
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
            Canastra
          </p>
          <OfferCard
            href="#brand"
            onClick={holdLink}
            media={<Tile letter="C" wash="cafe" />}
            tag="Serra da Canastra"
            title="Cafezinho e queijinho"
            description="Same roles. One brand file. Coffee for the action, casca for the name."
            footer={{ avatar: <Initials letters="SR" />, name: "São Roque de Minas", meta: "Meia-cura" }}
          />
        </div>
        <div className="skin-pampulha">
          <p className="mb-4 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-ink-3">
            Pampulha
          </p>
          <OfferCard
            href="#brand"
            onClick={holdLink}
            media={<Tile letter="P" wash="peri" />}
            tag="Belo Horizonte"
            title="The lake, the concrete"
            description="Same roles. Hue rotated. Niemeyer blue over the water."
            footer={{
              avatar: (
                <span className="grid size-full place-items-center bg-chip-3-soft text-sm font-semibold text-chip-3-ink">
                  BH
                </span>
              ),
              name: "Pampulha",
              meta: "Igreja de São Francisco",
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
        <Button>Order a wheel</Button>
        <Button variant="outline">Save the route</Button>
        <Button variant="ghost">Back</Button>
        <Button variant="destructive">Cancel the order</Button>
      </div>
    </Stage>
  );
}

export function FormScene() {
  const [notes, setNotes] = useState("");

  return (
    <Stage width="max-w-md">
      <div className="rounded-20 bg-card p-6 shadow-card">
        <h2 className="text-section-title">A note for the producer</h2>
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
            placeholder="Meia-cura, a kilo, leave it at the café in Medeiros."
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
          <Label>Micro-region</Label>
          <Select defaultValue="canastra">
            <SelectTrigger className="w-full min-h-12">
              <SelectValue placeholder="Choose a region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="canastra">Serra da Canastra</SelectItem>
              <SelectItem value="serro">Serro</SelectItem>
              <SelectItem value="araxa">Araxá</SelectItem>
              <SelectItem value="alagoa">Alagoa</SelectItem>
              <SelectItem value="cerrado">Cerrado Mineiro</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <RadioGroup defaultValue="one" className="mt-6">
          <label className="flex items-center gap-3 text-sm">
            <RadioGroupItem value="one" id="r1" />
            Meia-cura
          </label>
          <label className="flex items-center gap-3 text-sm">
            <RadioGroupItem value="two" id="r2" />
            Curado
          </label>
        </RadioGroup>
        <label className="mt-6 flex items-center gap-3 text-sm">
          <Checkbox defaultChecked id="c1" />
          Include pão de queijo
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
            <Button>Preview the wheel</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Canastra meia-cura</DialogTitle>
              <DialogDescription>
                A focused task over dimmed content. Close uses focus-visible, so a mouse open does not paint a ring.
              </DialogDescription>
            </DialogHeader>
            <p className="text-sm text-foreground">
              São Roque de Minas. Yellow rind. Butter and toasted corn on the break.
            </p>
            <DialogFooter>
              <Button>Order this wheel</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">How to keep it</Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="rounded-t-xl">
            <SheetHeader>
              <SheetTitle>The casca is the point</SheetTitle>
              <SheetDescription>
                Supplementary mobile detail. On desktop this content sits as an aside.
              </SheetDescription>
            </SheetHeader>
            <p className="px-4 pb-6 text-sm text-foreground">
              Cloth, not plastic. Room temperature. Turn it once a day. The rind is doing the work.
            </p>
          </SheetContent>
        </Sheet>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost">Find a fazenda</Button>
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
      <Tabs defaultValue="ages">
        <TabsList>
          <TabsTrigger value="ages">Ages</TabsTrigger>
          <TabsTrigger value="route">Route</TabsTrigger>
        </TabsList>
        <TabsContent value="ages">
          <div className="mt-2 rounded-20 bg-card px-5 shadow-card">
            <Accordion type="single" collapsible defaultValue="fresco">
              <AccordionItem value="fresco">
                <AccordionTrigger>Fresco</AccordionTrigger>
                <AccordionContent>
                  Soft, white, a few days old. Eat it with goiabada.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="meia">
                <AccordionTrigger>Meia-cura</AccordionTrigger>
                <AccordionContent>
                  Two to four weeks. The break turns yellow. This is the one most tables want.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="curado">
                <AccordionTrigger>Curado</AccordionTrigger>
                <AccordionContent>
                  Months on the shelf. Dry, sharp, the rind does most of the talking.
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
          media={<Tile letter="C" wash="moss" />}
          tag="Meia-cura"
          title="Wheel from Medeiros"
          description="The whole card is one link. highlighted is the one emphasis signal."
          footer={{
            avatar: <Initials letters="MD" />,
            name: "Medeiros",
            meta: (
              <span>
                <span className="line-through">R$96</span> R$78
              </span>
            ),
          }}
        />
        <ArticleCard
          href="#cards"
          onClick={holdLink}
          media={<Tile letter="S" wash="sand" />}
          tags={["Canastra", "Serra"]}
          title="Why this cheese only tastes like this above 700 metres"
          excerpt="Altitude, the grass, the raw milk. A two-line excerpt. Tags are text, not badges."
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
  const [ranked, setRanked] = useState<SortableItem[]>(tasting.slice(0, 3));

  return (
    <Stage width="max-w-md">
      <div className="rounded-20 bg-card p-6 shadow-card">
        <SortableList
          available={tasting}
          ranked={ranked}
          maxRanked={5}
          onRankedChange={setRanked}
          rankedLabel="Tasting order"
          availableLabel="The board"
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
          media={<Tile letter="S" wash="sand" />}
          tag="Serro"
          title="Queijo do Serro"
          description="A peer in the grid."
          footer={{ name: "Serro", meta: "R$64" }}
        />
        <OfferCard
          href="#emphasis"
          onClick={holdLink}
          highlighted
          media={<Tile letter="C" wash="cafe" />}
          tag="Canastra"
          title="Meia-cura, São Roque"
          description="highlighted tints the body. Nothing else changes."
          footer={{ name: "São Roque de Minas", meta: "R$78" }}
        />
        <OfferCard
          href="#emphasis"
          onClick={holdLink}
          media={<Tile letter="A" wash="peri" />}
          tag="Alagoa"
          title="Alagoa, Sul de Minas"
          description="A peer in the grid."
          footer={{ name: "Alagoa", meta: "R$70" }}
        />
      </div>
    </Stage>
  );
}

export function CloseScene() {
  return (
    <Stage width="max-w-lg">
      <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-ink-3">
        Canastra
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
