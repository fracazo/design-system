import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Merge class names with Tailwind-aware conflict resolution: later classes
 * win over earlier ones for the same utility (twMerge), and falsy or nested
 * inputs are flattened away (clsx). Every component in `./ui` composes its
 * className through this, so a consumer's override always wins.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
