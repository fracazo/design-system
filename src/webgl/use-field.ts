import * as React from "react"

import { createFieldRuntime, type FieldRuntime } from "./runtime.js"

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return false
  }
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = React.useState(false)

  React.useEffect(() => {
    setReduced(prefersReducedMotion())
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    const onChange = () => setReduced(media.matches)
    media.addEventListener("change", onChange)
    return () => media.removeEventListener("change", onChange)
  }, [])

  return reduced
}

export function useFieldRuntime({
  canvasRef,
  fragment,
  interactive,
  paused,
  enabled,
}: {
  canvasRef: React.RefObject<HTMLCanvasElement | null>
  fragment: string
  interactive: boolean
  paused: boolean
  enabled: boolean
}): boolean {
  const [ready, setReady] = React.useState(false)
  const runtimeRef = React.useRef<FieldRuntime | null>(null)

  React.useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !enabled) {
      setReady(false)
      return
    }

    const reduced = prefersReducedMotion()
    const runtime = createFieldRuntime({
      canvas,
      fragment,
      reducedMotion: reduced,
    })
    runtimeRef.current = runtime
    setReady(Boolean(runtime))
    if (!runtime) return

    runtime.setPaused(paused || reduced)
    if (!paused && !reduced) runtime.start()

    return () => {
      runtime.dispose()
      runtimeRef.current = null
    }
  }, [canvasRef, enabled, fragment])

  React.useEffect(() => {
    runtimeRef.current?.setPaused(paused || prefersReducedMotion())
    if (!paused && !prefersReducedMotion()) runtimeRef.current?.start()
  }, [paused])

  React.useEffect(() => {
    const canvas = canvasRef.current
    const runtime = runtimeRef.current
    if (!canvas || !runtime || !interactive) return

    const read = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = (event.clientX - rect.left) / Math.max(rect.width, 1)
      const y = 1 - (event.clientY - rect.top) / Math.max(rect.height, 1)
      runtime.setPointer(x, y, true)
    }
    const leave = () => runtime.setPointer(0.5, 0.5, false)

    canvas.addEventListener("pointermove", read)
    canvas.addEventListener("pointerdown", read)
    canvas.addEventListener("pointerenter", read)
    canvas.addEventListener("pointerleave", leave)
    canvas.addEventListener("pointercancel", leave)
    return () => {
      canvas.removeEventListener("pointermove", read)
      canvas.removeEventListener("pointerdown", read)
      canvas.removeEventListener("pointerenter", read)
      canvas.removeEventListener("pointerleave", leave)
      canvas.removeEventListener("pointercancel", leave)
    }
  }, [canvasRef, interactive, ready])

  return ready
}
