"use client"

import * as React from "react"

import { cn } from "../cn.js"
import { FieldPauseControl } from "../webgl/pause-control.js"
import { ORB_FRAGMENT } from "../webgl/programs.js"
import { useFieldRuntime, usePrefersReducedMotion } from "../webgl/use-field.js"

/**
 * A brand-lit sphere, raymarched in WebGL. Decorative, never content.
 *
 * Use for: a conversion-surface figure (a landing aside, a showcase mark)
 * when the product wants a single three-dimensional object and refuses
 * photography or a stock 3D file. Albedo, rim and highlight come from
 * `--brand`, `--brand-soft` and `--card`. The pointer is the light.
 * Avoid when: engagement surfaces, when the orb would sit behind copy the
 * reader must read, or when a Lucide mark or the Jacaranda lockup already
 * carries the identity. One orb per surface. It is not a loader and not
 * a logo replacement unless the product says so in its brand chapter.
 * Motion: the light follows the pointer; under prefers-reduced-motion the
 * sphere holds a still three-quarter key light. Off-screen and hidden
 * tabs pause the loop. `controls` (default true) is the WCAG 2.2.2 pause.
 * WebGL failure falls back to a `bg-brand` circle. The canvas is
 * aria-hidden.
 */

type LightOrbProps = Omit<React.ComponentProps<"div">, "children"> & {
  paused?: boolean
  defaultPaused?: boolean
  onPausedChange?: (paused: boolean) => void
  controls?: boolean
}

function LightOrb({
  paused: pausedProp,
  defaultPaused = false,
  onPausedChange,
  controls = true,
  className,
  ...props
}: LightOrbProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const [uncontrolled, setUncontrolled] = React.useState(defaultPaused)
  const reduced = usePrefersReducedMotion()
  const paused = reduced ? true : (pausedProp ?? uncontrolled)
  const ready = useFieldRuntime({
    canvasRef,
    fragment: ORB_FRAGMENT,
    interactive: !reduced,
    paused,
    enabled: true,
  })

  function setPaused(next: boolean) {
    if (pausedProp === undefined) setUncontrolled(next)
    onPausedChange?.(next)
  }

  return (
    <div
      data-slot="light-orb"
      className={cn(
        "relative isolate grid min-h-48 place-items-center overflow-hidden bg-background",
        className
      )}
      {...props}
    >
      <span
        aria-hidden="true"
        className={cn(
          "size-40 rounded-full bg-brand",
          ready && "hidden"
        )}
      />
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className={cn("absolute inset-0 size-full touch-none", !ready && "opacity-0")}
      />
      {controls && !reduced ? (
        <FieldPauseControl paused={paused} onPausedChange={setPaused} />
      ) : null}
    </div>
  )
}

export { LightOrb, type LightOrbProps }
