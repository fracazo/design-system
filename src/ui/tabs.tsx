"use client"

import * as React from "react"
import { Tabs as TabsPrimitive } from "radix-ui"

import { cn } from "../cn.js"

/**
 * Segmented tab switcher (Radix) for swapping between views of the same thing.
 *
 * Use for: two or three peer views a reader flips between (overview against a
 * detailed comparison), where every view is worth the same weight.
 * Avoid when: the second view is secondary detail (use Accordion), or the
 * content must exist for search engines; inactive panels are unmounted.
 * Variants: none. The list renders as a pill-track segmented control; the
 * active trigger lifts onto the card surface.
 */
function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-6", className)}
      {...props}
    />
  )
}

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        // p-1 on a rounded-20 track puts the triggers on rounded-2xl, per the
        // concentric rule (md + p-2.5 is the documented neighbour; this pairing
        // holds the same relationship one step in).
        "inline-flex w-fit items-center gap-1 rounded-20 bg-secondary p-1",
        className
      )}
      {...props}
    />
  )
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "cursor-pointer inline-flex items-center justify-center rounded-2xl px-4 py-2 text-[14.5px] font-medium whitespace-nowrap",
        "text-muted-foreground transition-[background-color,color,box-shadow]",
        "hover:text-foreground",
        "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50",
        "disabled:pointer-events-none disabled:opacity-50",
        "data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-warm-sm",
        className
      )}
      {...props}
    />
  )
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("outline-none", className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
