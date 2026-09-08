import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  BrandScene,
  ButtonsScene,
  CardsScene,
  ChoiceScene,
  CloseScene,
  DisclosureScene,
  EmphasisScene,
  FormScene,
  IntroScene,
  LayersScene,
  NineteenScene,
  OverlaysScene,
  QueueScene,
  RankScene,
  SkillScene,
  TokensScene,
} from "./scenes";

type Scene = {
  id: string;
  n: string;
  title: string;
  move: string;
  node: ReactNode;
};

const scenes: Scene[] = [
  { id: "intro", n: "01", title: "The System Proposes", move: "Hover the card, then the primary button.", node: <IntroScene /> },
  { id: "queue", n: "02", title: "The queue", move: "Hover Continue. One signal, then rest.", node: <QueueScene /> },
  { id: "layers", n: "03", title: "Three layers", move: "Hover Lint, Components, Skill left to right.", node: <LayersScene /> },
  { id: "brand", n: "04", title: "One brand file", move: "Hover rose, then periwinkle.", node: <BrandScene /> },
  { id: "nineteen", n: "05", title: "Nineteen", move: "Hover Default, then switch the tab.", node: <NineteenScene /> },
  { id: "buttons", n: "06", title: "Button", move: "Hover each variant top to bottom. Pause on Default.", node: <ButtonsScene /> },
  { id: "form", n: "07", title: "Form", move: "Click Email, type, then grow the notes field.", node: <FormScene /> },
  { id: "choice", n: "08", title: "Choice", move: "Open the select, pick Birth centre.", node: <ChoiceScene /> },
  { id: "overlays", n: "09", title: "Overlays", move: "Open Preview the plan, close, then Did you know.", node: <OverlaysScene /> },
  { id: "disclosure", n: "10", title: "Accordion and Tabs", move: "Collapse Labour, open Birth, then switch to Notes.", node: <DisclosureScene /> },
  { id: "cards", n: "11", title: "OfferCard and ArticleCard", move: "Hover each card. Watch the lift, scale and arrow.", node: <CardsScene /> },
  { id: "rank", n: "12", title: "SortableList", move: "Drag Immediate skin to skin to the top.", node: <RankScene /> },
  { id: "skill", n: "13", title: "Focus-visible", move: "Click the page, then Tab through the three buttons.", node: <SkillScene /> },
  { id: "tokens", n: "14", title: "Both themes", move: "Click Dark, pause, click Light.", node: <TokensScene /> },
  { id: "emphasis", n: "15", title: "One emphasis", move: "Hover the middle card, then a neighbour.", node: <EmphasisScene /> },
  { id: "close", n: "16", title: "ds-init", move: "Hover Start a product.", node: <CloseScene /> },
];

function readHash() {
  const raw = window.location.hash.replace(/^#\/?/, "");
  const id = raw.split("?")[0] || "intro";
  return scenes.some((scene) => scene.id === id) ? id : "intro";
}

function readRecord() {
  const params = new URLSearchParams(window.location.search);
  if (params.get("record") === "1") return true;
  return /[?&]record=1/.test(window.location.hash);
}

export function App() {
  const [id, setId] = useState(readHash);
  const [record, setRecord] = useState(readRecord);

  useEffect(() => {
    const sync = () => {
      setId(readHash());
      setRecord(readRecord());
    };
    window.addEventListener("hashchange", sync);
    window.addEventListener("popstate", sync);
    return () => {
      window.removeEventListener("hashchange", sync);
      window.removeEventListener("popstate", sync);
    };
  }, []);

  useEffect(() => {
    document.documentElement.dataset.record = record ? "true" : "false";
    if (!record) document.documentElement.classList.remove("dark");
  }, [record, id]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
        return;
      }
      const index = scenes.findIndex((scene) => scene.id === id);
      if (event.key === "ArrowRight" || event.key === "n") {
        const next = scenes[(index + 1) % scenes.length];
        window.location.hash = `/${next.id}${record ? "?record=1" : ""}`;
      }
      if (event.key === "ArrowLeft" || event.key === "p") {
        const prev = scenes[(index - 1 + scenes.length) % scenes.length];
        window.location.hash = `/${prev.id}${record ? "?record=1" : ""}`;
      }
      if (event.key === "r") {
        window.location.hash = `/${id}?record=1`;
      }
      if (event.key === "Escape" && record) {
        window.location.hash = `/${id}`;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [id, record]);

  const scene = useMemo(() => scenes.find((item) => item.id === id) ?? scenes[0], [id]);

  return (
    <div>
      <aside
        data-studio-chrome
        className="fixed top-0 left-0 z-40 flex h-svh w-64 flex-col border-r border-border bg-surface/95 backdrop-blur-sm"
      >
        <div className="px-5 py-5">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-3">
            The System Proposes
          </p>
          <p className="mt-2 text-sm text-ink-2">Recording studio</p>
        </div>
        <nav className="min-h-0 flex-1 overflow-y-auto px-2 pb-4">
          {scenes.map((item) => {
            const active = item.id === scene.id;
            return (
              <a
                key={item.id}
                href={`#/${item.id}`}
                className={
                  active
                    ? "block rounded-lg bg-brand-soft px-3 py-2 text-sm text-brand-ink"
                    : "block rounded-lg px-3 py-2 text-sm text-ink-2 hover:bg-band"
                }
              >
                <span className="font-mono text-[11px] text-ink-3">{item.n}</span>
                <span className="ml-2">{item.title}</span>
              </a>
            );
          })}
        </nav>
        <div className="border-t border-border px-5 py-4 text-xs text-ink-3">
          <p>{scene.move}</p>
          <p className="mt-2">
            <a href={`#/${scene.id}?record=1`} className="text-brand-ink underline-offset-2 hover:underline">
              Hide chrome
            </a>
            <span className="mx-2">·</span>
            arrows to step
          </p>
        </div>
      </aside>
      <div className={record ? "" : "pl-64"}>{scene.node}</div>
    </div>
  );
}
