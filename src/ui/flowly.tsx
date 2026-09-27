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
 * `primary` are the other core fills that read as a mark. Gradient does
 * not paint a flat ramp: diffuse and specular lights ride the merged
 * form, so crests catch light and the waists hold the shadow.
 * Fill: `solid` paints the role flat; `gradient` is the lit mark from the
 * spec. Size is Tailwind through `className` (`w-72`, `w-full`).
 * Motion: `organic` (default) sends a slow wave along the three lobes and
 * moves the key light with the crest, so the shading travels with the
 * silhouette. Never a bounce or a spin. Sit still under
 * `prefers-reduced-motion`.
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
  { cx: 88, cy: 80, r: 46 },
  { cx: 180, cy: 80, r: 50 },
  { cx: 272, cy: 80, r: 46 },
] as const

/** One wave along the chain. Neighbours stay out of phase, never a beat. */
const WAVE = 0.95

/** Keep a goo neck between neighbours. Slack is the widest allowed gap. */
const NECK_SLACK = 6

type Lobe = { cx: number; cy: number; r: number }

function pinchChain(lobes: Lobe[]) {
  const mid = lobes[1]
  for (const i of [0, 2] as const) {
    const lobe = lobes[i]
    const dx = lobe.cx - mid.cx
    const dy = lobe.cy - mid.cy
    const dist = Math.hypot(dx, dy)
    const limit = lobe.r + mid.r + NECK_SLACK
    if (dist > limit && dist > 0) {
      const scale = limit / dist
      lobe.cx = mid.cx + dx * scale
      lobe.cy = mid.cy + dy * scale
    }
  }
}

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

function writeLight(el: SVGFEPointLightElement | null, x: number, y: number, z: number) {
  if (!el) return
  el.setAttribute("x", x.toFixed(1))
  el.setAttribute("y", y.toFixed(1))
  el.setAttribute("z", z.toFixed(1))
}

function waveLobes(t: number): Lobe[] {
  return REST.map((rest, i) => {
    const phase = t * WAVE - i * 1.15
    const swell = Math.sin(phase)
    const breath = Math.sin(phase * 0.7 + 0.5)
    return {
      cx: rest.cx + Math.sin(phase * 0.4) * 2.2,
      cy: rest.cy + swell * (i === 1 ? 11 : 8),
      r: rest.r + breath * (i === 1 ? 5.5 : 4.5),
    }
  })
}

function placeLights(
  lobes: readonly Lobe[],
  key: SVGFEPointLightElement | null,
  spec: SVGFEPointLightElement | null,
  fill: SVGFEPointLightElement | null,
  t: number | null,
) {
  const crest = lobes.reduce((best, lobe) => (lobe.cy < best.cy ? lobe : best))
  const drift = t === null ? 0 : Math.sin(t * 0.32) * 14
  writeLight(key, crest.cx - 16 + drift, crest.cy - 74, 128)
  writeLight(spec, crest.cx - 4 + drift * 0.35, crest.cy - 62, 72)
  writeLight(fill, 196 - drift * 0.6, 172, 200)
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
  const lit = fill === "gradient"
  const gooId = `${uid}-goo`
  const lightId = `${uid}-light`
  const live = useOrganicMotion(motion === "organic")
  const aRef = React.useRef<SVGCircleElement>(null)
  const bRef = React.useRef<SVGCircleElement>(null)
  const cRef = React.useRef<SVGCircleElement>(null)
  const probeRef = React.useRef<SVGRectElement>(null)
  const inkRef = React.useRef<SVGFEFloodElement>(null)
  const keyRef = React.useRef<SVGFEPointLightElement>(null)
  const specRef = React.useRef<SVGFEPointLightElement>(null)
  const fillRef = React.useRef<SVGFEPointLightElement>(null)

  React.useEffect(() => {
    const probe = probeRef.current
    const ink = inkRef.current
    if (!probe || !ink) return
    const sync = () => {
      const painted = getComputedStyle(probe).fill
      if (painted) ink.setAttribute("flood-color", painted)
    }
    sync()
    const root = document.documentElement
    const mo = new MutationObserver(sync)
    mo.observe(root, { attributes: true, attributeFilter: ["class", "style"] })
    return () => mo.disconnect()
  }, [colour, lit])

  React.useEffect(() => {
    const nodes = [aRef.current, bRef.current, cRef.current]
    const apply = (lobes: Lobe[], t: number | null) => {
      lobes.forEach((lobe, i) => writeLobe(nodes[i], lobe.cx, lobe.cy, lobe.r))
      if (!lit) return
      placeLights(lobes, keyRef.current, specRef.current, fillRef.current, t)
    }
    const rest = REST.map((lobe) => ({ ...lobe }))

    if (!live || nodes.some((node) => !node)) {
      apply(rest, null)
      return
    }

    let frame = 0
    const origin = performance.now()
    const tick = (now: number) => {
      const t = (now - origin) / 1000
      const lobes = waveLobes(t)
      pinchChain(lobes)
      apply(lobes, t)
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(frame)
      apply(rest, null)
    }
  }, [live, lit])

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
        <filter
          id={gooId}
          x="-28%"
          y="-45%"
          width="156%"
          height="190%"
          colorInterpolationFilters="sRGB"
        >
          <feGaussianBlur in="SourceGraphic" stdDeviation="14" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -8"
            result="goo"
          />
        </filter>
        {lit ? (
          <filter
            id={lightId}
            filterUnits="userSpaceOnUse"
            primitiveUnits="userSpaceOnUse"
            x="-70"
            y="-90"
            width="500"
            height="340"
            colorInterpolationFilters="sRGB"
          >
            <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="goo"
            />
            <feGaussianBlur in="goo" stdDeviation="2.2" result="form" />
            <feDiffuseLighting
              in="form"
              surfaceScale="7"
              diffuseConstant="0.78"
              kernelUnitLength="1 1"
              lightingColor="white"
              result="key"
            >
              <fePointLight ref={keyRef} x="150" y="8" z="128" />
            </feDiffuseLighting>
            <feDiffuseLighting
              in="form"
              surfaceScale="4"
              diffuseConstant="0.42"
              kernelUnitLength="1 1"
              lightingColor="white"
              result="fillLight"
            >
              <fePointLight ref={fillRef} x="200" y="172" z="200" />
            </feDiffuseLighting>
            <feComposite in="key" in2="fillLight" operator="arithmetic" k2="1" k3="0.7" k4="0.06" result="diff" />
            <feComponentTransfer in="diff" result="soft">
              <feFuncR type="gamma" amplitude="1" exponent="0.82" offset="0.1" />
              <feFuncG type="gamma" amplitude="1" exponent="0.82" offset="0.1" />
              <feFuncB type="gamma" amplitude="1" exponent="0.82" offset="0.1" />
              <feFuncA type="identity" />
            </feComponentTransfer>
            <feSpecularLighting
              in="form"
              surfaceScale="3.2"
              specularConstant="0.2"
              specularExponent="8"
              kernelUnitLength="1 1"
              lightingColor="white"
              result="spec"
            >
              <fePointLight ref={specRef} x="160" y="4" z="72" />
            </feSpecularLighting>
            <feFlood ref={inkRef} floodColor={role} result="ink" />
            <feBlend in="soft" in2="ink" mode="multiply" result="body" />
            <feComposite in="spec" in2="body" operator="arithmetic" k2="0.7" k3="1" k4="0" result="lit" />
            <feComposite in="lit" in2="goo" operator="in" />
          </filter>
        ) : null}
      </defs>
      <rect ref={probeRef} width="1" height="1" fill={role} opacity="0" />
      <g filter={`url(#${lit ? lightId : gooId})`} fill={lit ? "white" : role}>
        <circle ref={aRef} className="flowly-lobe-a" cx={REST[0].cx} cy={REST[0].cy} r={REST[0].r} />
        <circle ref={bRef} className="flowly-lobe-b" cx={REST[1].cx} cy={REST[1].cy} r={REST[1].r} />
        <circle ref={cRef} className="flowly-lobe-c" cx={REST[2].cx} cy={REST[2].cy} r={REST[2].r} />
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
