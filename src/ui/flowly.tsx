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
 * Decorative: aria-hidden and pointer-events-none, so it never steals
 * clicks or a name from the layout it sits behind.
 */

const FLOWLY_SHAPE_8_PATH =
  "M34.5 80.0C34.6 78.4 34.8 73.4 35.4 70.2C35.9 66.9 36.8 63.7 38.0 60.6C39.1 57.5 40.5 54.5 42.2 51.7C43.9 48.8 45.8 46.1 47.9 43.6C50.0 41.1 52.4 38.8 54.9 36.7C57.5 34.5 60.2 32.6 63.0 31.0C65.9 29.3 68.9 27.8 71.9 26.6C75.0 25.4 78.2 24.5 81.4 23.7C84.6 22.9 87.9 22.4 91.1 22.1C94.4 21.8 97.7 21.7 101.0 21.6C104.3 21.6 107.6 21.8 110.9 22.0C114.2 22.2 117.5 22.5 120.8 22.6C124.1 22.7 127.4 22.9 130.7 22.8C134.0 22.6 137.3 22.3 140.5 21.9C143.8 21.5 147.1 20.9 150.3 20.4C153.6 19.8 156.8 19.2 160.1 18.7C163.3 18.3 166.6 17.8 169.9 17.6C173.2 17.3 176.5 17.1 179.8 17.1C183.1 17.1 186.4 17.3 189.7 17.5C193.0 17.8 196.3 18.2 199.5 18.7C202.8 19.1 206.0 19.8 209.3 20.3C212.5 20.8 215.8 21.5 219.1 21.9C223.3 22.3 225.6 22.6 228.9 22.7C232.2 22.9 235.5 22.8 238.8 22.6C242.1 22.5 245.4 22.2 248.7 22.0C252.0 21.9 255.3 21.6 258.6 21.7C261.9 21.7 265.2 21.7 268.5 22.1C271.8 22.4 275.0 22.9 278.2 23.6C281.5 24.4 284.6 25.3 287.7 26.5C290.8 27.7 293.8 29.1 296.6 30.8C299.5 32.4 302.2 34.3 304.8 36.4C307.3 38.5 309.7 40.8 311.8 43.3C314.0 45.8 315.9 48.5 317.6 51.3C319.3 54.2 320.7 57.2 321.9 60.2C323.1 63.3 324.0 66.5 324.6 69.8C325.2 73.0 325.5 76.3 325.5 79.6C325.5 82.9 325.3 86.2 324.7 89.5C324.2 92.7 323.3 95.9 322.2 99.0C321.1 102.1 319.6 105.1 318.0 108.0C316.4 110.8 314.4 113.6 312.3 116.1C310.2 118.6 307.9 121.0 305.4 123.1C302.9 125.2 300.1 127.1 297.3 128.8C294.5 130.5 291.5 132.0 288.5 133.2C285.4 134.4 282.2 135.4 279.0 136.2C275.8 137.0 272.5 137.5 269.3 137.9C266.0 138.2 262.7 138.3 259.4 138.4C256.1 138.4 252.8 138.2 249.5 138.0C246.2 137.9 242.9 137.5 239.6 137.4C236.3 137.3 233.0 137.1 229.7 137.2C226.4 137.3 223.1 137.6 219.9 138.0C216.6 138.4 213.3 139.0 210.1 139.6C206.8 140.1 203.6 140.7 200.3 141.2C197.0 141.7 193.8 142.1 190.5 142.4C187.2 142.7 183.9 142.8 180.6 142.9C177.3 142.9 174.0 142.7 170.7 142.5C167.4 142.3 164.1 141.8 160.9 141.4C157.6 140.9 154.4 140.3 151.1 139.8C147.9 139.2 144.6 138.6 141.3 138.2C138.1 137.8 134.8 137.4 131.5 137.3C128.2 137.1 124.9 137.2 121.6 137.3C118.3 137.5 115.0 137.8 111.7 137.9C108.4 138.1 105.1 138.3 101.8 138.3C98.5 138.3 95.2 138.3 91.9 138.0C88.6 137.7 85.4 137.2 82.1 136.5C78.9 135.8 75.7 134.8 72.7 133.7C69.6 132.5 66.6 131.1 63.7 129.4C60.9 127.8 58.1 125.9 55.6 123.9C53.0 121.8 50.6 119.5 48.4 117.0C46.3 114.5 44.3 111.8 42.6 109.0C40.9 106.2 39.4 103.2 38.2 100.1C37.1 97.1 36.1 93.9 35.5 90.6C34.9 87.4 34.6 82.6 34.5 80.8C34.3 79.0 34.5 80.1 34.5 80.0Z"

const FLOWLY_SHAPE_8_MASK = `url("data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 160"><path fill="black" d="${FLOWLY_SHAPE_8_PATH}"/></svg>`,
)}")`

const colourRole = {
  brand: "--brand",
  highlight: "--highlight",
  primary: "--primary",
} as const

const solidColourClass = {
  brand: "bg-brand",
  highlight: "bg-highlight",
  primary: "bg-primary",
} as const

type FlowlyColour = keyof typeof colourRole
type FlowlyFill = "solid" | "gradient"
type FlowlyShape = 8

type FlowlyProps = Omit<React.ComponentProps<"div">, "children" | "color"> & {
  /** Silhouette id. 8 is the horizontal 3-lobe capsule; the only one that ships. */
  shape?: FlowlyShape
  /** `gradient` is the lit mark; `solid` is the flat role. */
  fill?: FlowlyFill
  /** Core fill role. Australian spelling, matching the spec. */
  colour?: FlowlyColour
}

function flowlyMaskStyle(fill: FlowlyFill, colour: FlowlyColour): React.CSSProperties {
  const role = `var(${colourRole[colour]})`
  return {
    maskImage: FLOWLY_SHAPE_8_MASK,
    maskSize: "contain",
    maskRepeat: "no-repeat",
    maskPosition: "center",
    WebkitMaskImage: FLOWLY_SHAPE_8_MASK,
    WebkitMaskSize: "contain",
    WebkitMaskRepeat: "no-repeat",
    WebkitMaskPosition: "center",
    ...(fill === "gradient"
      ? {
          backgroundImage: `linear-gradient(135deg, color-mix(in oklab, ${role} 62%, white), ${role})`,
        }
      : {}),
  }
}

function Flowly({
  shape = 8,
  fill = "gradient",
  colour = "brand",
  className,
  style,
  ...props
}: FlowlyProps) {
  return (
    <div
      data-slot="flowly"
      data-shape={shape}
      data-fill={fill}
      data-colour={colour}
      aria-hidden="true"
      className={cn(
        "pointer-events-none block aspect-[360/160] w-64 select-none",
        fill === "solid" && solidColourClass[colour],
        className,
      )}
      style={{ ...flowlyMaskStyle(fill, colour), ...style }}
      {...props}
    />
  )
}

export { Flowly, type FlowlyColour, type FlowlyFill, type FlowlyProps, type FlowlyShape }
