import * as React from "react"

import { cn } from "../cn.js"

// Shared so other inputs (e.g. PlaceAutocomplete) can match the shadcn look
// without duplicating the class string.
const inputBaseClassName = cn(
  "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input min-h-[48px] w-full min-w-0 rounded-md border bg-card px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
  "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
  "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
)

/**
 * Single-line text field, controlled-first (coerces value to empty string).
 *
 * Use for: react-hook-form fields via FormControl, and standalone controlled
 * fields like the delivery email. inputBaseClassName lets lookalike inputs
 * (PlaceAutocomplete) match without duplicating classes.
 * Avoid when: capturing an enumerable choice; use OptionCard groups.
 */
function Input({ className, type, value, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      // Coerce undefined/null to '' to prevent React uncontrolled-to-controlled warnings
      value={value ?? ''}
      className={cn(inputBaseClassName, className)}
      {...props}
    />
  )
}

export { Input, inputBaseClassName }
