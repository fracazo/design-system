#!/usr/bin/env node
// =============================================================================
// ds-init: write a new product from the package's template.
//
//   ds-init <dir> [--name <package-name>]
//
// Copies template/ (Next 16, Tailwind v4, the package, one blank brand file,
// the guardrails on) into <dir>, which must not exist or must be empty.
// The package name defaults to the directory's basename, and the dependency
// on @fracazo/design-system is set to the version of the package that ran
// this, so the template and the contract it satisfies always match. Then
// prints the steps that make it a product: install, rename the brand file,
// replace its values, pick a typeface. No overwriting, ever: a non-empty
// directory is an error, not a merge.
// =============================================================================

import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, renameSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

function fail(message: string): never {
  console.error(`ds-init: ${message}`)
  process.exit(1)
}

const argv = process.argv.slice(2)
const positional = argv.filter((a, i) => !a.startsWith('--') && argv[i - 1] !== '--name')
const nameFlag = argv.indexOf('--name')
const nameArg = nameFlag >= 0 ? argv[nameFlag + 1] : undefined

if (positional.length !== 1) fail('usage: ds-init <dir> [--name <package-name>]')
const dir = path.resolve(positional[0])
const name = nameArg ?? path.basename(dir)
if (!/^(@[a-z0-9-~][a-z0-9-._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/.test(name)) fail(`"${name}" is not a valid package name; pass --name`)

if (existsSync(dir) && readdirSync(dir).length > 0) fail(`${dir} is not empty; ds-init writes into a new or empty directory only`)

// dist/guardrails/init.js sits two levels below the package root.
const packageRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..')
const template = path.join(packageRoot, 'template')
const own = JSON.parse(readFileSync(path.join(packageRoot, 'package.json'), 'utf8')) as { name: string; version: string }
if (!existsSync(template)) fail(`template not found at ${template}`)

mkdirSync(dir, { recursive: true })
cpSync(template, dir, { recursive: true })
// npm renames a packed .gitignore, so the template carries it undotted.
renameSync(path.join(dir, 'gitignore'), path.join(dir, '.gitignore'))

const pkgPath = path.join(dir, 'package.json')
const pkg = JSON.parse(readFileSync(pkgPath, 'utf8')) as { name: string; dependencies: Record<string, string> }
pkg.name = name
pkg.dependencies[own.name] = `^${own.version}`
writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n')

const relative = path.relative(process.cwd(), dir)
const rel = relative === '' ? '.' : relative.startsWith('..') ? dir : relative
console.log(`ds-init: wrote ${name} to ${rel} on ${own.name} ${own.version}

Next:
  1. cd ${rel} && pnpm install
  2. Rename src/system/brands/starter.css to the product and update the two
     paths that name it: the @import in src/app/globals.css and the brand:*
     scripts in package.json.
  3. Replace every value in the brand file, light and dark. Keep the property
     names; pnpm brand:contract holds you to the contract.
  4. Pick the typeface in src/app/layout.tsx and point the brand file's
     @theme block at its variable.
  5. Rewrite the top of CLAUDE.md and README.md for the product, delete
     src/app/page.tsx and build the first surface.
  6. pnpm lint && pnpm typecheck && pnpm build, before every merge.`)
