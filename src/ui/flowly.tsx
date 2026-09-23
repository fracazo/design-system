"use client"

import * as React from "react"

import { cn } from "../cn.js"

/**
 * The system's 3-lobe flowy shape: three merged circles, one silhouette.
 *
 * Use for: marketing and product alike. Sit it behind a layout, on an
 * empty state, or as a band. It is a rule, not a marketing ornament.
 * Avoid when: inventing another blob, a decorative gradient, or a second
 * silhouette. Shape 8 is the only lobe set; colour and fill resolve from
 * existing roles, never a literal.
 * Colour: `brand` is the default (the brand fill). `highlight` and
 * `primary` are the other core fills that read as a mark. Gradient lights
 * the chosen role toward white so it still grades when a brand's ink
 * matches its fill.
 * Fill: `solid` paints the role flat; `gradient` is the lit mark from the
 * spec. Size is Tailwind through `className` (`w-72`, `w-full`).
 * Motion: `organic` (default) writes each lobe's cx, cy and r on its own
 * incommensurate loop so the silhouette breathes and the valleys merge,
 * never a bounce or a spin. Sit still under `prefers-reduced-motion`.
 * Pass `motion="none"` to keep a still mark. Decorative: aria-hidden and
 * pointer-events-none, so it never steals clicks or a name from the
 * layout it sits behind.
 */

const colourRole = {
  brand: "--brand",
  highlight: "--highlight",
  primary: "--primary",
} as const

type FlowlyColour = keyof typeof colourRole
type FlowlyFill = "solid" | "gradient"
type FlowlyShape = 8
type FlowlyMotion = "organic" | "none"

type FlowlyProps = Omit<React.ComponentProps<"svg">, "children" | "color"> & {
  /** Silhouette id. 8 is the horizontal 3-lobe capsule; the only one that ships. */
  shape?: FlowlyShape
  /** `gradient` is the lit mark; `solid` is the flat role. */
  fill?: FlowlyFill
  /** Core fill role. Australian spelling, matching the spec. */
  colour?: FlowlyColour
  /** `organic` undulates the lobes; `none` is a still mark. */
  motion?: FlowlyMotion
}

const REST = [
  { cx: 94, cy: 80, r: 52 },
  { cx: 180, cy: 80, r: 52 },
  { cx: 266, cy: 80, r: 52 },
] as const

/** Incommensurate periods so the silhouette never repeats on a beat. */
const LOOPS = [
  { period: 5.5, cx: 9, cy: 7, r: 5.5, phase: 0.2 },
  { period: 7.2, cx: 6, cy: 8, r: 6, phase: 1.7 },
  { period: 6.3, cx: 9, cy: 7, r: 5.5, phase: 3.1 },
] as const

function useOrganicMotion(enabled: boolean) {
  const [live, setLive] = React.useState(false)

  React.useEffect(() => {
    if (!enabled) {
      setLive(false)
      return
    }
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    const sync = () => setLive(!media.matches)
    sync()
    media.addEventListener("change", sync)
    return () => media.removeEventListener("change", sync)
  }, [enabled])

  return live
}

function writeLobe(el: SVGCircleElement | null, cx: number, cy: number, r: number) {
  if (!el) return
  el.setAttribute("cx", cx.toFixed(2))
  el.setAttribute("cy", cy.toFixed(2))
  el.setAttribute("r", r.toFixed(2))
}

function Flowly({
  shape = 8,
  fill = "gradient",
  colour = "brand",
  motion = "organic",
  className,
  ...props
}: FlowlyProps) {
  const uid = React.useId().replace(/:/g, "")
  const role = `var(${colourRole[colour]})`
  const gradientId = `${uid}-fill`
  const gooId = `${uid}-goo`
  const paint = fill === "gradient" ? `url(#${gradientId})` : role
  const live = useOrganicMotion(motion === "organic")
  const aRef = React.useRef<SVGCircleElement>(null)
  const bRef = React.useRef<SVGCircleElement>(null)
  const cRef = React.useRef<SVGCircleElement>(null)

  React.useEffect(() => {
    const nodes = [aRef.current, bRef.current, cRef.current]
    const restLobes = () => {
      REST.forEach((rest, i) => writeLobe(nodes[i], rest.cx, rest.cy, rest.r))
    }

    if (!live || nodes.some((node) => !node)) {
      restLobes()
      return
    }

    let frame = 0
    const origin = performance.now()
    const tick = (now: number) => {
      const t = (now - origin) / 1000
      LOOPS.forEach((loop, i) => {
        const rest = REST[i]
        const w = (Math.PI * 2) / loop.period
        const drift = t * 0.55 + loop.phase
        writeLobe(
          nodes[i],
          rest.cx + Math.sin(t * w + loop.phase) * loop.cx + Math.sin(drift) * loop.cx * 0.28,
          rest.cy + Math.sin(t * w + loop.phase + 1.15) * loop.cy + Math.cos(drift * 1.1) * loop.cy * 0.3,
          rest.r + Math.sin(t * w + loop.phase + 0.4) * loop.r + Math.sin(drift * 0.8) * loop.r * 0.22,
        )
      })
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(frame)
      restLobes()
    }
  }, [live])

  return (
    <svg
      data-slot="flowly"
      data-shape={shape}
      data-fill={fill}
      data-colour={colour}
      data-motion={motion}
      viewBox="0 0 360 160"
      aria-hidden="true"
      className={cn("pointer-events-none block w-64 select-none overflow-visible", className)}
      {...props}
    >
      <defs>
        {fill === "gradient" ? (
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={`color-mix(in oklab, ${role} 62%, white)`} />
            <stop offset="100%" stopColor={role} />
          </linearGradient>
        ) : null}
        <filter id={gooId} x="-20%" y="-30%" width="140%" height="160%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="7" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -8"
            result="goo"
          />
        </filter>
      </defs>
      <g filter={`url(#${gooId})`} fill={paint}>
        <circle ref={aRef} className="flowly-lobe-a" cx="94" cy="80" r="52" />
        <circle ref={bRef} className="flowly-lobe-b" cx="180" cy="80" r="52" />
        <circle ref={cRef} className="flowly-lobe-c" cx="266" cy="80" r="52" />
      </g>
    </svg>
  )
}

export {
  Flowly,
  type FlowlyColour,
  type FlowlyFill,
  type FlowlyMotion,
  type FlowlyProps,
  type FlowlyShape,
}
