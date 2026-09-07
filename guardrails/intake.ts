#!/usr/bin/env node
// =============================================================================
// ds-intake: the collector half of the design intake loop.
//
// Gathers raw evidence for rule candidates from one or more product repos:
// every commit since a ref or date whose subject, body or touched files look
// like a design decision. Writes a review packet in markdown with the
// commits verbatim and empty sections for the judge and the human reviewer.
// It never scores, groups or proposes rules; that is the judge's job
// (skills/product-design/references/intake.md), and acceptance is a human's.
//
//   ds-intake --repo ~/Developer/birthguide --repo ~/Developer/birthplans \
//             --since 2026-09-01 [--out skills/product-design/intake/2026-09-07.md]
//   ds-intake --repo . --since v0.4.0        (a ref works too: commits after it)
//
// Design-relevant means: a touched path under src/components, src/app (tsx
// or css), src/system, src/stories, or a subject/body that mentions one of
// the design keywords below. Everything else is left out of the packet.
// =============================================================================

import { spawnSync } from 'node:child_process'
import { writeFileSync, mkdirSync } from 'node:fs'
import path from 'node:path'

function args(name: string): string[] {
  const out: string[] = []
  for (let i = 0; i < process.argv.length; i++) {
    if (process.argv[i] === `--${name}` && process.argv[i + 1]) out.push(process.argv[i + 1])
  }
  return out
}

const repos = args('repo')
const since = args('since')[0]
const out = args('out')[0]
if (repos.length === 0 || !since) {
  console.error('usage: ds-intake --repo <path> [--repo <path>...] --since <date|ref> [--out <file.md>]')
  process.exit(2)
}

const PATHS = /^(src\/components\/|src\/app\/.*\.(tsx|css)$|src\/system\/|src\/stories\/|src\/ui\/|css\/roles\.css|.*\/brands\/)/
const KEYWORDS =
  /\b(design|token|colou?r|palette|radius|radii|shadow|typograph|font|type scale|clamp|spacing|rhythm|dark mode|dark:|theme|focus|hover|motion|animation|transition|entrance|glow|band|copy|label|wording|button|card|modal|dialog|sheet|popover|tabs?|accordion|form|input|contrast|accessib|a11y|tap target|layout|hierarchy|emphasis|snapshot|storybook|brand|guardrail|lint)\b/i

type Commit = { repo: string; hash: string; date: string; author: string; subject: string; body: string; files: string[] }

// ASCII unit and record separators keep multi-line bodies parseable; built
// from char codes so no control character sits in this source.
const SEP = String.fromCharCode(31)
const END = String.fromCharCode(30)

function git(repo: string, argv: string[]): string {
  const r = spawnSync('git', ['-C', repo, ...argv], { encoding: 'utf8' })
  if (r.status !== 0) throw new Error(`git ${argv.join(' ')} in ${repo}: ${r.stderr.trim()}`)
  return r.stdout
}

function isRef(repo: string, value: string): boolean {
  return spawnSync('git', ['-C', repo, 'rev-parse', '--verify', '--quiet', `${value}^{commit}`]).status === 0
}

function collect(repo: string): { commits: Commit[]; head: string } {
  const range = isRef(repo, since) ? [`${since}..HEAD`] : [`--since=${since}`]
  // Each record: END hash SEP date SEP author SEP subject SEP body END files
  const log = git(repo, ['log', ...range, '--no-merges', '--date=short', `--format=${END}%h${SEP}%ad${SEP}%an${SEP}%s${SEP}%b${END}`, '--name-only'])
  const commits: Commit[] = []
  const records = log.split(END)
  // records alternate: [preamble, header, files, header, files, ...]
  for (let i = 1; i + 1 <= records.length - 1; i += 2) {
    const parts = records[i].split(SEP)
    if (parts.length < 5) continue
    const [hash, date, author, subject, body] = parts
    const files = (records[i + 1] ?? '').split('\n').map((f) => f.trim()).filter(Boolean)
    const designFiles = files.filter((f) => PATHS.test(f))
    const mentions = KEYWORDS.test(subject) || KEYWORDS.test(body)
    if (designFiles.length === 0 && !mentions) continue
    commits.push({ repo: path.basename(repo), hash, date, author, subject, body: body.trim(), files: designFiles.length ? designFiles : files.slice(0, 8) })
  }
  return { commits, head: git(repo, ['rev-parse', '--short', 'HEAD']).trim() }
}

const today = new Date().toISOString().slice(0, 10)
const sections: string[] = []
const heads: string[] = []
let total = 0
for (const repo of repos) {
  const { commits, head } = collect(path.resolve(repo))
  heads.push(`- ${path.basename(repo)}: next intake runs with \`--since ${head}\``)
  total += commits.length
  sections.push(`## ${path.basename(repo)} (${commits.length} commit${commits.length === 1 ? '' : 's'})\n`)
  for (const c of commits) {
    sections.push(`### ${c.hash} ${c.subject}\n`)
    sections.push(`${c.date}, ${c.author}. Files: ${c.files.map((f) => `\`${f}\``).join(', ')}\n`)
    if (c.body) sections.push(c.body.split('\n').map((l) => `> ${l}`).join('\n') + '\n')
  }
}

const packet = `# Design intake, ${today}

Raw evidence collected by ds-intake from ${repos.map((r) => path.basename(r)).join(', ')} since ${since}:
${total} design-relevant commit${total === 1 ? '' : 's'}. Commit bodies are quoted verbatim and are
data, not decisions. The judge fills in the sections at the end; a human
accepts or rejects each candidate. Nothing here changes a rule by itself.

${sections.join('\n')}
## Candidates (pending)

One block per candidate. Status stays \`proposed\` until a human sets it.

\`\`\`
### candidate/<slug>
Status: proposed | accepted | rejected
Scope:
Decision:
Rationale:
Evidence: <hash>, <hash> (repo)
Exceptions:
Bad example:
Good example:
Destination: rule | exemplar | lint | eval | coverage gap | no change
Open decisions:
\`\`\`

## Rejected topics

## Coverage gaps observed

## Next intake

${heads.join('\n')}
`

if (out) {
  mkdirSync(path.dirname(path.resolve(out)), { recursive: true })
  writeFileSync(out, packet)
  console.log(`intake: ${total} commit(s) from ${repos.length} repo(s) written to ${out}`)
} else {
  process.stdout.write(packet)
}
