import { Pause, Play } from "lucide-react"

import { cn } from "../cn.js"

export function FieldPauseControl({
  paused,
  onPausedChange,
}: {
  paused: boolean
  onPausedChange: (paused: boolean) => void
}) {
  const Icon = paused ? Play : Pause
  return (
    <button
      type="button"
      aria-pressed={paused}
      aria-label={paused ? "Play the field" : "Pause the field"}
      onClick={() => onPausedChange(!paused)}
      className={cn(
        "absolute right-3 bottom-3 z-10 grid size-11 place-items-center rounded-full",
        "bg-card text-foreground shadow-card",
        "transition-[translate,box-shadow] duration-150 ease-out",
        "hover:shadow-card-hover motion-safe:hover:-translate-y-0.5",
        "active:translate-y-0 active:scale-[0.96]",
        "outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
      )}
    >
      <Icon aria-hidden="true" className="size-4" />
    </button>
  )
}
