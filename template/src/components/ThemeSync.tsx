'use client'

import { useEffect } from 'react'

/**
 * Keeps the `.dark` class on <html> in sync with the operating system's
 * colour scheme while the page is open. First paint is handled by the inline
 * script in the root layout, so there is no flash; this only reacts to live
 * changes. There is no manual toggle: the product follows system settings.
 */
export function ThemeSync() {
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const apply = (dark: boolean) => document.documentElement.classList.toggle('dark', dark)
    apply(mq.matches)
    const onChange = (event: MediaQueryListEvent) => apply(event.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return null
}
