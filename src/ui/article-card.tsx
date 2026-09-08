import * as React from "react"
import { Clock, Tag, type LucideIcon } from "lucide-react"

import { cn } from "../cn.js"

/**
 * A linked article surface: cover on top, the tags the piece files under,
 * a title, a two-line excerpt and a byline footer with the author, the
 * date and the reading time.
 *
 * Use for: a grid or list of blog posts and articles the reader picks
 * from, where the whole card is one link to the piece and the footer
 * answers who wrote it, when, and how long it takes.
 * Avoid when: the item has more than one action (use a house card with
 * Buttons), or for a single featured piece with a lede; compose that from
 * utilities. Lay ArticleCards in a grid and let it wrap, never a carousel.
 * The card is a plain surface: no glass, no gradient over the cover and no
 * action revealed on hover. DESIGN.md rejects the first two, and content
 * that only appears on hover never reaches touch or keyboard readers; the
 * card itself is the link.
 * Slots: `media` is a node, not a URL, so a product passes its own tile or
 * next/image and it fills a 16:9 area; `author.avatar` fills a 40px circle.
 * `tags` render as one muted text row behind a Lucide icon (`tagIcon`,
 * default Tag), never as badges; DESIGN.md rejects badges as metadata.
 * `date` is the display string and `dateTime` the machine value for the
 * time element. `readTime` sits at the footer's right with a clock.
 * Motion: hover lifts the card 8px and scales the cover, both CSS
 * transitions on the anchor's hover and only under motion-safe; with
 * reduced motion only the shadow deepens. An entrance animation is the
 * product's call, not the card's: pass motion.css classes through
 * className (`animate-in fade-in slide-in-from-bottom-4`) and gate them
 * once per visit, as rule/entrance-once-per-visit asks.
 */
type ArticleCardProps = Omit<React.ComponentProps<"a">, "href" | "title" | "media"> & {
  href: string
  /** Opens in a new tab, with rel and an sr-only note on the accessible name. */
  external?: boolean
  /** Fills a 16:9 area; give an image `fill` (next/image) or `size-full object-cover`. */
  media?: React.ReactNode
  /** Rendered as one text row, in order given. */
  tags?: string[]
  tagIcon?: LucideIcon
  title: string
  /** Clamped to two lines. */
  excerpt?: string
  author?: {
    /** Fills a 40px circle. */
    avatar?: React.ReactNode
    name: string
  }
  /** Display form of the date, e.g. "2 Dec 2025". */
  date?: string
  /** Machine form for the time element, e.g. "2025-12-02". */
  dateTime?: string
  /** e.g. "5 min read". */
  readTime?: string
  /** Heading level for the title; h3 suits a card under a section heading. */
  titleAs?: "h2" | "h3" | "h4" | "p"
}

function ArticleCard({
  href,
  external = false,
  media,
  tags,
  tagIcon: TagIcon = Tag,
  title,
  excerpt,
  author,
  date,
  dateTime,
  readTime,
  titleAs: TitleTag = "h3",
  className,
  ...props
}: ArticleCardProps) {
  const hasFooter = Boolean(author || date || readTime)

  return (
    <a
      data-slot="article-card"
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

      <div className={cn("flex flex-1 flex-col gap-2 px-5 pt-5", hasFooter ? "pb-4" : "pb-5")}>
        {tags && tags.length > 0 ? (
          <span className="flex items-center gap-2 text-sm text-muted-foreground">
            <TagIcon aria-hidden="true" className="size-4 shrink-0" />
            <span className="truncate">{tags.join(", ")}</span>
          </span>
        ) : null}
        <TitleTag className="text-xl font-semibold tracking-tight text-balance">
          {title}
        </TitleTag>
        {excerpt ? (
          <p className="line-clamp-2 text-sm text-muted-foreground text-pretty">
            {excerpt}
          </p>
        ) : null}
      </div>

      {hasFooter ? (
        <div className="mx-5 mb-4 flex items-center gap-3 border-t border-border pt-4">
          {author?.avatar !== undefined && author?.avatar !== null ? (
            <span className="size-10 shrink-0 overflow-hidden rounded-full *:size-full *:object-cover">
              {author.avatar}
            </span>
          ) : null}
          <span className="min-w-0 flex-1">
            {author ? (
              <span className="block truncate text-sm font-semibold">
                {author.name}
              </span>
            ) : null}
            {date ? (
              <time dateTime={dateTime} className="block truncate text-sm text-muted-foreground">
                {date}
              </time>
            ) : null}
          </span>
          {readTime ? (
            <span className="flex shrink-0 items-center gap-1.5 text-sm text-muted-foreground">
              <Clock aria-hidden="true" className="size-4" />
              {readTime}
            </span>
          ) : null}
        </div>
      ) : null}

      {external ? <span className="sr-only"> (opens in a new tab)</span> : null}
    </a>
  )
}

export { ArticleCard, type ArticleCardProps }
