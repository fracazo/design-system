"use client"

import * as React from "react"

import { cn } from "../cn.js"
import { FieldPauseControl } from "../webgl/pause-control.js"
import {
  MOTES_FRAGMENT,
  RIPPLE_FRAGMENT,
  WASH_FRAGMENT,
} from "../webgl/programs.js"
import { useFieldRuntime, usePrefersReducedMotion } from "../webgl/use-field.js"

/**
 * A brand-sampled GPU field. Decorative illustration, never content.
 *
 * Use for: conversion-surface illustration (a landing hero, a showcase
 * band, OfferCard or ArticleCard media) where photography is refused and
 * a CSS wash is not enough. Every colour is a computed brand role, so the
 * field reskins with the brand file and with dark.
 * Avoid when: engagement surfaces (questionnaire, editor, account), when
 * the reader must read anything from the field, when a `bg-band` or
 * `bg-brand-soft` wash already does the job, or as garnish behind a form.
 * The field is illustration, not a second accent.
 * Variants: `wash` is a slow domain-warped field (the default hero);
 * `motes` is sparse drifting points; `ripple` displaces the wash around
 * the pointer. All three freeze to one frame under prefers-reduced-motion,
 * pause when off-screen or hidden, and cap device pixel ratio at 1.5.
 * `controls` (default true) is the WCAG 2.2.2 pause for looping motion;
 * set it false when the field sits inside a link and drive `paused` from
 * a page-level control instead. WebGL failure falls back to `bg-brand-soft`.
 * The canvas is aria-hidden. Nothing the reader needs lives in the shader.
 */

export type ShaderFieldProgram = "wash" | "motes" | "ripple"

type ShaderFieldProps = Omit<React.ComponentProps<"div">, "children"> & {
  program?: ShaderFieldProgram
  /** Controlled pause. When set, the pause button calls `onPausedChange`. */
  paused?: boolean
  defaultPaused?: boolean
  onPausedChange?: (paused: boolean) => void
  /**
   * Show the pause control. Default true. False when the field is media
   * inside a link, or when a parent already exposes a pause.
   */
  controls?: boolean
}

const FRAGMENTS: Record<ShaderFieldProgram, string> = {
  wash: WASH_FRAGMENT,
  motes: MOTES_FRAGMENT,
  ripple: RIPPLE_FRAGMENT,
}

function ShaderField({
  program = "wash",
  paused: pausedProp,
  defaultPaused = false,
  onPausedChange,
  controls = true,
  className,
  ...props
}: ShaderFieldProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const [uncontrolled, setUncontrolled] = React.useState(defaultPaused)
  const reduced = usePrefersReducedMotion()
  const paused = reduced ? true : (pausedProp ?? uncontrolled)
  const ready = useFieldRuntime({
    canvasRef,
    fragment: FRAGMENTS[program],
    interactive: program === "ripple" && !reduced,
    paused,
    enabled: true,
  })

  function setPaused(next: boolean) {
    if (pausedProp === undefined) setUncontrolled(next)
    onPausedChange?.(next)
  }

  return (
    <div
      data-slot="shader-field"
      data-program={program}
      className={cn(
        "relative isolate min-h-40 overflow-hidden bg-brand-soft",
        className
      )}
      {...props}
    >
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className={cn(
          "absolute inset-0 size-full",
          program === "ripple" ? "pointer-events-auto touch-none" : "pointer-events-none",
          !ready && "opacity-0"
        )}
      />
      {controls && !reduced ? (
        <FieldPauseControl paused={paused} onPausedChange={setPaused} />
      ) : null}
    </div>
  )
}

export { ShaderField, type ShaderFieldProps }
