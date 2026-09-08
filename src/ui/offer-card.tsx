import * as React from "react"
import { ArrowRight, Tag, type LucideIcon } from "lucide-react"

import { cn } from "../cn.js"

/**
 * A linked offer surface: media on top, a tag, a title, a line of
 * description and a footer that names the source, with an arrow that
 * answers hover.
 *
 * Use for: a grid of peer offers the reader picks from (deals, price
 * matches, plans), where the whole card is one link and the footer
 * carries the source (a retailer, a brand, a promo code, a was-price).
 * Avoid when: the item has more than one action (use a house card with
 * Buttons), or when the cards would sit in a carousel; the system rejects
 * carousels, so lay OfferCards in a grid and let it wrap.
 * Slots: `media` is a node, not a URL, so a product can pass its own tile
 * (an initial-letter fallback, a next/image) and it fills a 16:9 area;
 * `footer.avatar` fills a 40px circle; `footer.meta` is a node so it can
 * carry a struck-through was-price, not only a code. `tagIcon` defaults to
 * Lucide's Tag.
 * States: `highlighted` tints the body with the primary at low opacity, the
 * one emphasis signal for "cheapest" or "best"; nothing else changes, so a
 * grid keeps one signal per card. `external` opens in a new tab and says so
 * in the accessible name.
 * Motion: hover lifts the card 8px, scales the media and rotates the arrow,
 * all as CSS transitions on the anchor's hover, and only under
 * motion-safe; with reduced motion the card sits still and the arrow only
 * fills. The card fills its column at any width; height follows a grid
 * row's tallest card because the anchor is h-full and the body flexes.
 */
type OfferCardProps = Omit<React.ComponentProps<"a">, "href" | "title" | "media"> & {
  href: string
  /** Opens in a new tab, with rel and an sr-only note on the accessible name. */
  external?: boolean
  /** Fills a 16:9 area; give an image `fill` (next/image) or `size-full object-cover`. */
  media?: React.ReactNode
  tag?: string
  tagIcon?: LucideIcon
  title: string
  description?: string
  footer?: {
    /** Fills a 40px circle. */
    avatar?: React.ReactNode
    name: string
    /** Second line under the name: a code, a was-price, a note. */
    meta?: React.ReactNode
  }
  /** The one emphasis signal: a subtle primary tint on the body. */
  highlighted?: boolean
  /** Heading level for the title; h3 suits a card under a section heading. */
  titleAs?: "h2" | "h3" | "h4" | "p"
}

function OfferCard({
  href,
  external = false,
  media,
  tag,
  tagIcon: TagIcon = Tag,
  title,
  description,
  footer,
  highlighted = false,
  titleAs: TitleTag = "h3",
  className,
  ...props
}: OfferCardProps) {
  return (
    <a
      data-slot="offer-card"
      data-highlighted={highlighted || undefined}
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-2xl bg-card text-card-foreground shadow-card",
        "transition-[translate,box-shadow] duration-200 ease-out hover:shadow-card-hover motion-safe:hover:-translate-y-2",
        "outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50",
        className
      )}
      {...props}
    >
      {media !== undefined && media !== null ? (
        <div className="aspect-video overflow-hidden bg-muted">
          <div className="relative size-full transition-transform duration-300 ease-out *:size-full *:object-cover motion-safe:group-hover:scale-105">
            {media}
          </div>
        </div>
      ) : null}

      <div
        className={cn(
          "flex flex-1 flex-col",
          highlighted && "bg-primary/5"
        )}
      >
        <div className="flex flex-1 flex-col gap-2 px-5 pt-5 pb-4">
          {tag ? (
            <span className="flex items-center gap-2 text-sm text-muted-foreground">
              <TagIcon aria-hidden="true" className="size-4 shrink-0" />
              {tag}
            </span>
          ) : null}
          <TitleTag className="text-xl font-semibold tracking-tight text-balance">
            {title}
          </TitleTag>
          {description ? (
            <p className="text-sm text-muted-foreground text-pretty">
              {description}
            </p>
          ) : null}
        </div>

        {footer ? (
          <div className="mx-5 mb-4 flex items-center gap-3 border-t border-border pt-4">
            {footer.avatar !== undefined && footer.avatar !== null ? (
              <span className="size-10 shrink-0 overflow-hidden rounded-full *:size-full *:object-cover">
                {footer.avatar}
              </span>
            ) : null}
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-semibold">
                {footer.name}
              </span>
              {footer.meta !== undefined && footer.meta !== null ? (
                <span className="block truncate text-sm text-muted-foreground">
                  {footer.meta}
                </span>
              ) : null}
            </span>
            <span
              aria-hidden="true"
              className="flex size-11 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground transition-[background-color,color,rotate] duration-200 ease-out group-hover:bg-primary group-hover:text-primary-foreground motion-safe:group-hover:-rotate-45"
            >
              <ArrowRight className="size-4" />
            </span>
          </div>
        ) : null}
      </div>

      {external ? <span className="sr-only"> (opens in a new tab)</span> : null}
    </a>
  )
}

export { OfferCard, type OfferCardProps }
