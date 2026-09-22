#!/usr/bin/env node
// =============================================================================
// Brand contract check.
//
// roles.css declares the custom properties a brand file must define, in a
// machine-readable comment block. Core is required. Named extensions are
// opt-in: a brand file lists them with `brand-extensions:` and must then
// define every property in each named set. Nothing from an undeclared set,
// and nothing missing from a declared one.
//
//   ds-check-brand src/system/brands/starter.css [more brand files]
// =============================================================================

import { readFileSync } from 'node:fs'
import path from 'node:path'

const ROLES = path.resolve(import.meta.dirname, '../../css/roles.css')
const roles = readFileSync(ROLES, 'utf8')

function contractList(id: string): Set<string> {
  const re = new RegExp(`brand-contract:${id}\\n([\\s\\S]*?)\\n\\s*brand-contract:`)
  const m = roles.match(re)
  if (!m) throw new Error(`roles.css: brand-contract:${id} block not found`)
  return new Set(m[1].match(/--[\w-]+/g) ?? [])
}

function extensionNames(): string[] {
  const names = new Set<string>()
  for (const m of roles.matchAll(/brand-contract:([a-z0-9-]+):(light|dark)\n/g)) {
    if (m[1] !== 'core') names.add(m[1])
  }
  return [...names]
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

function declaredExtensions(css: string): string[] {
  const names: string[] = []
  for (const line of css.split('\n')) {
    // A declaration is its own line: `brand-extensions: landing showcase`.
    // Mentions inside a sentence do not count.
    const m = line.match(/^\s*(?:\/\*\s*)?brand-extensions:\s*([a-z][a-z0-9,\s-]*)\s*(?:\*\/\s*)?$/)
    if (!m) continue
    names.push(...m[1].split(/[\s,]+/).filter(Boolean))
  }
  return names
}

const extensions = extensionNames()
const contract = {
  theme: contractList('theme'),
  core: { light: contractList('core:light'), dark: contractList('core:dark') },
  ext: Object.fromEntries(
    extensions.map((name) => [
      name,
      { light: contractList(`${name}:light`), dark: contractList(`${name}:dark`) },
    ]),
  ) as Record<string, { light: Set<string>; dark: Set<string> }>,
}

const brandFiles = process.argv.slice(2)
if (brandFiles.length === 0) {
  console.error('usage: ds-check-brand <brand.css> [more brand files]')
  process.exit(2)
}

let failed = false
for (const file of brandFiles) {
  const css = readFileSync(path.resolve(file), 'utf8')
  const chosen = declaredExtensions(css)
  const unknown = chosen.filter((name) => !contract.ext[name])
  if (unknown.length) {
    failed = true
    console.error(`${file}: unknown extension(s): ${unknown.join(', ')}`)
    console.error(`  known: ${extensions.join(', ')}`)
    continue
  }

  const expect = {
    light: new Set(contract.core.light),
    dark: new Set(contract.core.dark),
  }
  for (const name of chosen) {
    for (const mode of ['light', 'dark'] as const) {
      for (const prop of contract.ext[name][mode]) expect[mode].add(prop)
    }
  }

  const themeActual = new Set([
    ...declared(css, /^@theme\b/),
    ...[...declared(css, /^:root(?:,\s*\.force-light)?$/)].filter((p) => contract.theme.has(p)),
  ])
  const lightActual = declared(css, /^:root,\s*\.force-light$/)
  const darkActual = declared(css, /^\.dark$/)

  const checks: Array<[string, Set<string>, Set<string>, Set<string>]> = [
    ['theme (--font-sans, --font-mono on :root or in @theme)', contract.theme, themeActual, new Set()],
    [':root, .force-light', expect.light, lightActual, contract.theme],
    ['.dark', expect.dark, darkActual, contract.theme],
  ]
  for (const [label, expected, actual, ignoreExtra] of checks) {
    const missing = [...expected].filter((p) => !actual.has(p))
    const extra = [...actual].filter((p) => !expected.has(p) && !ignoreExtra.has(p))
    if (missing.length || extra.length) {
      failed = true
      console.error(`${file} ${label}:`)
      for (const p of missing) console.error(`  missing ${p}`)
      for (const p of extra) {
        console.error(`  extra   ${p} (not in core${chosen.length ? ' or ' + chosen.join(', ') : ''}; declare the extension or remove it)`)
      }
    }
  }
}

if (failed) process.exit(1)
console.log(
  `brand contract: ${brandFiles.length} brand file(s) satisfy core ` +
    `(${contract.core.light.size} light, ${contract.core.dark.size} dark, ${contract.theme.size} theme)` +
    (extensions.length ? `; extensions available: ${extensions.join(', ')}` : '') +
    '.',
)
