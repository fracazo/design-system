'use client'

// =============================================================================
// SortableList
//
// Reusable drag-to-rank component for ranking a small capped set.
// Two zones: "Ranked" (sortable via @dnd-kit, max N items) and
// "Available" (tap to add). Touch + mouse + keyboard support.
//
// Drag listeners are scoped to the grip handle only so that taps on
// the remove button and item body work normally on touch devices.
// =============================================================================

import { useCallback, useId } from 'react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { cn } from '../cn.js'

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

export interface SortableItem {
  id: string
  label: string
}

export interface SortableListProps {
  /** All available items (unranked pool) */
  available: SortableItem[]
  /** Currently ranked items (in order) */
  ranked: SortableItem[]
  /** Maximum items in the ranked list */
  maxRanked: number
  /** Called when ranked list changes */
  onRankedChange: (ranked: SortableItem[]) => void
  /** Label for the ranked zone */
  rankedLabel?: string
  /** Label for the available zone */
  availableLabel?: string
}

// -----------------------------------------------------------------------------
// Drag Handle (visual grip icon; only this element receives drag listeners)
// -----------------------------------------------------------------------------

function DragHandle({
  listeners,
  attributes,
}: {
  listeners: ReturnType<typeof useSortable>['listeners']
  attributes: ReturnType<typeof useSortable>['attributes']
}) {
  return (
    <button
      type="button"
      className="flex h-8 w-8 shrink-0 cursor-grab items-center justify-center rounded text-muted-foreground touch-none hover:text-foreground active:cursor-grabbing"
      aria-label="Drag to reorder"
      {...attributes}
      {...listeners}
    >
      <svg
        className="h-4 w-4"
        viewBox="0 0 16 16"
        fill="currentColor"
        aria-hidden="true"
      >
        <circle cx="5" cy="3" r="1.5" />
        <circle cx="11" cy="3" r="1.5" />
        <circle cx="5" cy="8" r="1.5" />
        <circle cx="11" cy="8" r="1.5" />
        <circle cx="5" cy="13" r="1.5" />
        <circle cx="11" cy="13" r="1.5" />
      </svg>
    </button>
  )
}

// -----------------------------------------------------------------------------
// Sortable Item (ranked zone)
// -----------------------------------------------------------------------------

function SortableRankedItem({
  item,
  rank,
  onRemove,
}: {
  item: SortableItem
  rank: number
  onRemove: () => void
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'flex items-center gap-2 rounded-lg border bg-card p-3 select-none',
        isDragging
          ? 'z-50 shadow-lg border-primary ring-2 ring-primary/20'
          : 'border-border',
      )}
    >
      {/* Rank badge */}
      <span
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold"
        aria-hidden="true"
      >
        {rank}
      </span>

      {/* Drag handle: the only element that receives drag listeners */}
      <DragHandle listeners={listeners} attributes={attributes} />

      {/* Label */}
      <span className="flex-1 text-sm font-medium">{item.label}</span>

      {/* Remove button */}
      <button
        type="button"
        onClick={onRemove}
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
        aria-label={`Remove ${item.label} from ranked list`}
      >
        <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 4l8 8M12 4l-8 8" />
        </svg>
      </button>
    </div>
  )
}

// -----------------------------------------------------------------------------
// Available Item (unranked pool)
// -----------------------------------------------------------------------------

function AvailableItem({
  item,
  onAdd,
  disabled,
}: {
  item: SortableItem
  onAdd: () => void
  disabled: boolean
}) {
  return (
    <button
      type="button"
      onClick={onAdd}
      disabled={disabled}
      className={cn(
        'flex w-full items-center gap-3 rounded-lg border border-dashed p-3 text-left transition-colors',
        disabled
          ? 'border-border/50 text-muted-foreground/50 cursor-not-allowed'
          : 'border-border text-foreground hover:border-primary hover:bg-primary/5 cursor-pointer',
      )}
      aria-label={`Add ${item.label} to ranked list`}
    >
      {/* Plus icon */}
      <span
        className={cn(
          'flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-sm',
          disabled
            ? 'border-border/50 text-muted-foreground/50'
            : 'border-primary/30 text-primary',
        )}
        aria-hidden="true"
      >
        +
      </span>
      <span className="flex-1 text-sm">{item.label}</span>
    </button>
  )
}

// -----------------------------------------------------------------------------
// Main Component
// -----------------------------------------------------------------------------

/**
 * Drag-to-rank with two zones: a capped ranked list and a tap-to-add pool.
 * Touch, mouse and keyboard support; drag is scoped to the grip handle.
 *
 * Use for: ranking a small capped set, like the Top 5 priorities editor.
 * Avoid when: order does not matter; use MultiSelectCardGroup.
 */
export function SortableList({
  available,
  ranked,
  maxRanked,
  onRankedChange,
  rankedLabel = 'Your top priorities',
  availableLabel = 'Available priorities',
}: SortableListProps) {
  const dndId = useId()
  const isFull = ranked.length >= maxRanked

  // Sensors: pointer (mouse), touch, keyboard
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 150, tolerance: 5 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  // Unranked items = available items not already in ranked
  const rankedIds = new Set(ranked.map((r) => r.id))
  const unranked = available.filter((a) => !rankedIds.has(a.id))

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event
      if (!over || active.id === over.id) return

      const oldIndex = ranked.findIndex((r) => r.id === active.id)
      const newIndex = ranked.findIndex((r) => r.id === over.id)
      if (oldIndex === -1 || newIndex === -1) return

      onRankedChange(arrayMove(ranked, oldIndex, newIndex))
    },
    [ranked, onRankedChange],
  )

  const handleAdd = useCallback(
    (item: SortableItem) => {
      if (isFull) return
      onRankedChange([...ranked, item])
    },
    [ranked, isFull, onRankedChange],
  )

  const handleRemove = useCallback(
    (id: string) => {
      onRankedChange(ranked.filter((r) => r.id !== id))
    },
    [ranked, onRankedChange],
  )

  return (
    <div className="space-y-6">
      {/* Ranked zone */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-foreground">{rankedLabel}</h3>
          <span className="text-xs text-muted-foreground tabular-nums">
            {ranked.length}/{maxRanked}
          </span>
        </div>

        {ranked.length === 0 ? (
          <div className="rounded-lg border-2 border-dashed border-border/60 p-6 text-center">
            <p className="text-sm text-muted-foreground">
              Tap items below to add your top {maxRanked}
            </p>
          </div>
        ) : (
          <DndContext
            id={dndId}
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={ranked.map((r) => r.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-2" role="list" aria-label="Ranked priorities">
                {ranked.map((item, index) => (
                  <SortableRankedItem
                    key={item.id}
                    item={item}
                    rank={index + 1}
                    onRemove={() => handleRemove(item.id)}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}
      </div>

      {/* Available zone */}
      {unranked.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-1">
            {availableLabel}
          </h3>
          <p className="text-xs text-muted-foreground mb-2">
            {isFull
              ? `You\u2019ve chosen ${maxRanked}. Remove one above to swap in another.`
              : `Choose up to ${maxRanked}. ${maxRanked - ranked.length} remaining.`}
          </p>
          <div className="space-y-2" role="list" aria-label="Available priorities">
            {unranked.map((item) => (
              <AvailableItem
                key={item.id}
                item={item}
                onAdd={() => handleAdd(item)}
                disabled={isFull}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
