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
 * Motion: `organic` (default) undulates each lobe on its own loop so the
 * silhouette breathes and the valleys merge, never a bounce or a spin.
 * Sit still under `prefers-reduced-motion`. Pass `motion="none"` to keep
 * a still mark. Decorative: aria-hidden and pointer-events-none, so it
 * never steals clicks or a name from the layout it sits behind.
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
        <circle className="flowly-lobe-a" cx="94" cy="80" r="52" />
        <circle className="flowly-lobe-b" cx="180" cy="80" r="52" />
        <circle className="flowly-lobe-c" cx="266" cy="80" r="52" />
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
