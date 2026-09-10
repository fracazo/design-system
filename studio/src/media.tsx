import type { ReactNode } from "react";

/** Editorial tile for card media. No photography, no stock. */
export function Tile({
  letter,
  wash = "bloom",
}: {
  letter: string;
  wash?: "bloom" | "mist" | "grafton" | "leaf";
}) {
  const washes = {
    bloom: "bg-brand-soft text-brand-ink",
    mist: "bg-highlight-soft text-highlight-ink",
    grafton: "bg-chip-3-soft text-chip-3-ink",
    leaf: "bg-chip-1-soft text-chip-1-ink",
  } as const;

  return (
    <div className={`grid size-full place-items-center ${washes[wash]}`}>
      <span className="font-semibold tracking-tight text-5xl">{letter}</span>
    </div>
  );
}

export function Initials({ letters }: { letters: string }) {
  return (
    <span className="grid size-full place-items-center bg-brand-soft text-sm font-semibold text-brand-ink">
      {letters}
    </span>
  );
}

export function holdLink(event: { preventDefault(): void }) {
  event.preventDefault();
}

export function Stage({
  children,
  width = "max-w-xl",
}: {
  children: ReactNode;
  width?: string;
}) {
  return (
    <div className="flex min-h-svh items-center justify-center bg-background px-8 py-16">
      <div className={`w-full ${width}`}>{children}</div>
    </div>
  );
}
