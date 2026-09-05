/**
 * Root entry: `cn` and every component, re-exported from `./ui/*`.
 *
 * Prefer the per-component subpaths (`@fracazo/design-system/ui/button`) in
 * app code; they keep the client boundary at the component that declares it.
 * This barrel exists for quick imports and for tooling that wants one map of
 * everything the package ships.
 */
export { cn } from "./cn.js"

export * from "./ui/accordion.js"
export * from "./ui/button.js"
export * from "./ui/calendar.js"
export * from "./ui/card.js"
export * from "./ui/checkbox.js"
export * from "./ui/dialog.js"
export * from "./ui/form.js"
export * from "./ui/input.js"
export * from "./ui/label.js"
export * from "./ui/popover.js"
export * from "./ui/progress.js"
export * from "./ui/radio-group.js"
export * from "./ui/select.js"
export * from "./ui/sheet.js"
export * from "./ui/sortable-list.js"
export * from "./ui/tabs.js"
export * from "./ui/textarea.js"
