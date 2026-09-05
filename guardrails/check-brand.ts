#!/usr/bin/env node
// =============================================================================
// Brand contract check.
//
// roles.css declares the custom properties a brand file must define, in a
// machine-readable comment block (brand-contract:theme / :light / :dark).
// This holds every brand file you pass to that contract: nothing missing,
// nothing extra. Wire it into your lint chain.
//
//   ds-check-brand src/system/brands/birthguide.css [more brand files]
// =============================================================================

import { readFileSync } from 'node:fs'
import path from 'node:path'

const ROLES = path.resolve(import.meta.dirname, '../../css/roles.css')
const roles = readFileSync(ROLES, 'utf8')

function contractList(section: 'theme' | 'light' | 'dark'): Set<string> {
  const re = new RegExp(`brand-contract:${section}\\n([\\s\\S]*?)\\n\\s*brand-contract:`)
  const m = roles.match(re)
  if (!m) throw new Error(`roles.css: brand-contract:${section} block not found`)
  return new Set(m[1].match(/--[\w-]+/g) ?? [])
}

// Custom properties declared inside the first block whose selector matches.
function declared(css: string, selectorRe: RegExp): Set<string> {
  const stripped = css.replace(/\/\*[\s\S]*?\*\//g, '')
  const blockRe = /([^{}]+)\{([^{}]*)\}/g
  for (const m of stripped.matchAll(blockRe)) {
    const selector = (m[1].split(';').pop() ?? '').trim()
    if (!selectorRe.test(selector)) continue
    return new Set([...m[2].matchAll(/(--[\w-]+)\s*:/g)].map((d) => d[1]))
  }
  return new Set()
}

function diff(expected: Set<string>, actual: Set<string>) {
  const missing = [...expected].filter((p) => !actual.has(p))
  const extra = [...actual].filter((p) => !expected.has(p))
  return { missing, extra }
}

const contract = {
  theme: contractList('theme'),
  light: contractList('light'),
  dark: contractList('dark'),
}

const brandFiles = process.argv.slice(2)
if (brandFiles.length === 0) {
  console.error('usage: ds-check-brand <brand.css> [more brand files]')
  process.exit(2)
}

let failed = false
for (const file of brandFiles) {
  const css = readFileSync(path.resolve(file), 'utf8')
  const checks: Array<[string, Set<string>, Set<string>]> = [
    ['@theme inline', contract.theme, declared(css, /^@theme\b/)],
    [':root, .force-light', contract.light, declared(css, /^:root,\s*\.force-light$/)],
    ['.dark', contract.dark, declared(css, /^\.dark$/)],
  ]
  for (const [label, expected, actual] of checks) {
    const { missing, extra } = diff(expected, actual)
    if (missing.length || extra.length) {
      failed = true
      console.error(`${file} ${label}:`)
      for (const p of missing) console.error(`  missing ${p}`)
      for (const p of extra) console.error(`  extra   ${p} (not a role; declare it in roles.css first)`)
    }
  }
}

if (failed) process.exit(1)
console.log(
  `brand contract: ${brandFiles.length} brand file(s) satisfy roles.css ` +
    `(${contract.light.size} light, ${contract.dark.size} dark, ${contract.theme.size} theme).`,
)
