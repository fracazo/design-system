import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "../cn.js"

const buttonVariants = cva(
  "cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-[color,background-color,border-color,box-shadow,translate,scale] active:scale-[0.96] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 hover:-translate-y-0.5 active:translate-y-0",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        // Optical alignment (SPEC_021): only the icon side tightens, so
        // icon-plus-text buttons read centred. Works because Button wraps
        // bare text children in a span (CSS cannot see text nodes, so
        // without the wrap an only-icon-element is both :first-child and
        // :last-child). Spinner-only buttons tighten both sides, which is
        // the old symmetric behaviour.
        default: "min-h-[48px] px-5 py-2 has-[>svg:first-child]:pl-4 has-[>svg:last-child]:pr-4",
        xs: "h-6 gap-1 rounded-sm px-2 text-xs has-[>svg:first-child]:pl-1.5 has-[>svg:last-child]:pr-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "min-h-[44px] rounded-md gap-1.5 px-4 has-[>svg:first-child]:pl-3 has-[>svg:last-child]:pr-3",
        lg: "min-h-[52px] rounded-xl px-8 text-[15px] has-[>svg:first-child]:pl-6 has-[>svg:last-child]:pr-6",
        icon: "size-9 rounded-full",
        "icon-xs": "size-6 rounded-full [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8 rounded-full",
        "icon-lg": "size-10 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

/**
 * The tappable action primitive for everything except landing page pills.
 *
 * Use for: any action in the questionnaire, plan, checkout and download flows.
 * Avoid when: styling a navigation link as text; use a plain anchor. On landing
 * sections, follow the local pill pattern for now.
 * Variants: default carries the step's one primary action; outline is the
 * standard secondary (copy, save, discard, dismiss); ghost is back, cancel and
 * edit-in-place; destructive is reserved for irreversible acts (unused today).
 * Sizes: default (48px) almost always; sm in compact rows; lg only for
 * money-adjacent hero actions like checkout.
 * Radius: text buttons are rounded rectangles on a size-scaled corner ladder
 * (xs rounded-sm, sm rounded-md, default rounded-lg, lg rounded-xl), so a
 * flush full-bleed button can go concentric with its container (outer = inner
 * radius + padding, e.g. default in a p-4 card resolves to rounded-4xl).
 * Icon-only sizes (icon, icon-sm, icon-lg, icon-xs) stay circular.
 */
function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  // SPEC_021: wrap bare text children in a span so the directional
  // has-[>svg:first-child] padding above can tell icon-leading from
  // icon-trailing (text nodes are invisible to CSS child selectors).
  // Skipped for asChild, where the single child element owns its content.
  const { children, ...rest } = props
  const content =
    asChild
      ? children
      : React.Children.map(children, (child) =>
          typeof child === "string" || typeof child === "number" ? (
            <span>{child}</span>
          ) : (
            child
          ),
        )

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...rest}
    >
      {content}
    </Comp>
  )
}

export { Button, buttonVariants }
