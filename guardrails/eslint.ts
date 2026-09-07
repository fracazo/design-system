// =============================================================================
// ESLint guardrails.
//
// The mechanical half of the design system's rules, as a flat-config plugin.
// Every rule here has a record in skills/product-design/references/rules.md
// under the same ID (design-system/<id> matches rule/<id>), which carries the
// scope, the why, the exceptions and an example pair. The message cites the
// ID so a finding can be traced.
//
//   import { designSystemGuardrails } from '@fracazo/design-system/eslint'
//   export default defineConfig([
//     ...,
//     designSystemGuardrails({
//       files: ['src/**/*.{ts,tsx}'],
//       ignores: ['src/components/pdf/**'],   // renderers that cannot use CSS vars
//       severity: { 'no-stock-palette': 'error' },   // override a default
//     }),
//   ])
//
// Defaults: the rules a clean codebase already satisfies are errors; the ones
// that need a cleanup pass first (stock palette, focus: rings, em dashes,
// on-dark text) are warnings, so they surface without blocking a merge. Turn
// each up to error once the product is clean. A deliberate one-off carries
// `// eslint-disable-next-line design-system/<id> -- <reason>` so the
// exception is visible in review.
//
// No dependency on eslint's types: the rule shapes below are the subset the
// plugin needs, typed locally so the package stays dependency-free.
// =============================================================================

type Node = {
  type: string
  [key: string]: unknown
}

type ReportDescriptor = {
  node?: Node
  loc?: { line: number; column: number } | { start: { line: number; column: number }; end: { line: number; column: number } }
  messageId: string
  data?: Record<string, string>
}

type RuleContext = {
  report(descriptor: ReportDescriptor): void
  sourceCode: { text: string }
}

type RuleModule = {
  meta: {
    type: 'problem' | 'suggestion'
    docs: { description: string; url?: string }
    messages: Record<string, string>
    schema: []
  }
  create(context: RuleContext): Record<string, (node: Node) => void>
}

const RULES_DOC = 'skills/product-design/references/rules.md'

// ─── helpers ─────────────────────────────────────────────────────────────────

const SKIP_KEYS = new Set(['parent', 'loc', 'range', 'tokens', 'comments'])

/** Depth-first walk over every ESTree node under `node`, including itself. */
function walk(node: Node, visit: (n: Node) => void): void {
  visit(node)
  for (const key of Object.keys(node)) {
    if (SKIP_KEYS.has(key)) continue
    const value = node[key]
    if (Array.isArray(value)) {
      for (const item of value) if (item && typeof item === 'object' && 'type' in item) walk(item as Node, visit)
    } else if (value && typeof value === 'object' && 'type' in (value as object)) {
      walk(value as Node, visit)
    }
  }
}

/** Every string chunk inside a className attribute: literals and template quasis. */
function classChunks(attr: Node): Array<{ node: Node; text: string }> {
  const out: Array<{ node: Node; text: string }> = []
  walk(attr, (n) => {
    if (n.type === 'Literal' && typeof n.value === 'string') out.push({ node: n, text: n.value })
    if (n.type === 'TemplateElement') {
      const cooked = (n.value as { cooked?: string } | undefined)?.cooked
      if (typeof cooked === 'string') out.push({ node: n, text: cooked })
    }
  })
  return out
}

function isClassName(attr: Node): boolean {
  const name = attr.name as { name?: string } | undefined
  return attr.type === 'JSXAttribute' && name?.name === 'className'
}

/** A rule that reports any className chunk matching `pattern`. */
function classNameRule(id: string, description: string, pattern: RegExp, message: string): RuleModule {
  return {
    meta: {
      type: 'problem',
      docs: { description, url: `${RULES_DOC}#rule${id}` },
      messages: { violation: `${message} (rule/${id})` },
      schema: [],
    },
    create(context) {
      return {
        JSXAttribute(node) {
          if (!isClassName(node)) return
          for (const chunk of classChunks(node)) {
            const match = chunk.text.match(pattern)
            if (match) context.report({ node: chunk.node, messageId: 'violation', data: { match: match[0] } })
          }
        },
      }
    },
  }
}

// ─── rules ───────────────────────────────────────────────────────────────────

const STOCK_HUES =
  'red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|slate|gray|zinc|neutral|stone'
const COLOUR_UTILITIES =
  'bg|text|border|ring|from|to|via|fill|stroke|outline|decoration|divide|accent|caret|placeholder|shadow'

export const rules: Record<string, RuleModule> = {
  'no-colour-literal': classNameRule(
    'no-colour-literal',
    'No raw colour value (hex, oklch, rgb, hsl) in a className',
    /#[0-9a-fA-F]{3,8}|oklch\(|rgba?\(|hsla?\(/,
    'Arbitrary colour value in className. Use a semantic or primitive utility (bg-primary, text-muted-foreground, border-border, bg-surface); a missing value is a role to add, not a literal to inline',
  ),
  'no-arbitrary-clamp': classNameRule(
    'no-arbitrary-clamp',
    'No arbitrary fluid type size in a className',
    /text-\[clamp\(/,
    'Arbitrary fluid type size in className. Use a named type role (text-display, text-section-title, text-lede) or add a token to roles.css',
  ),
  'no-dark-pairs': classNameRule(
    'no-dark-pairs',
    'No hand-authored dark: colour with an arbitrary value',
    new RegExp(`(^|[\\s"'\`])dark:(${COLOUR_UTILITIES})-\\[`),
    'Hand-authored dark colour pair in className. The token owns both themes; write the single theme-aware class',
  ),
  'no-radius-literal': classNameRule(
    'no-radius-literal',
    'No arbitrary radius in a className',
    /(^|[\s"'`])rounded(-[a-z]{1,2})?-\[/,
    'Arbitrary radius in className. The ramp is rounded-sm to rounded-4xl plus rounded-20; a new radius becomes a token first',
  ),
  'no-stock-palette': classNameRule(
    'no-stock-palette',
    "No Tailwind default palette colour in product UI",
    new RegExp(`(^|[\\s"'\`:])(${COLOUR_UTILITIES})-(${STOCK_HUES})-(50|[1-9]00|950)(?![\\w-])`),
    "Tailwind's stock palette in className ({{match}}). It competes with the brand and ignores dark mode; use a token",
  ),
  'focus-visible': classNameRule(
    'focus-visible',
    'Focus rings use focus-visible:, not focus:',
    /(^|[\s"'`])focus:(ring|outline|border)/,
    'focus: paints a ring for pointer users too (Radix autofocus makes this visible on open). Use focus-visible:',
  ),
  'on-dark-ramp': {
    meta: {
      type: 'problem',
      docs: { description: 'Text on an always-dark surface comes from the on-dark ramp', url: `${RULES_DOC}#ruleon-dark-ramp` },
      messages: {
        violation:
          'Theme-varying text token ({{match}}) inside an always-dark surface (bg-dark). It only matches in one theme; use the on-dark ramp, text-dark-ink to text-dark-faint-2 (rule/on-dark-ramp)',
      },
      schema: [],
    },
    create(context) {
      const DARK_SURFACE = /(^|[\s"'`])bg-dark(-2)?(?![\w-])/
      // A light surface nested inside a dark one (a phone mock's screen, a
      // force-light document preview) resets the context; its subtree is
      // not walked.
      const LIGHT_SURFACE = /(^|[\s"'`])(bg-(white|background|card|popover|surface|surface-2|band|band-2|primary|secondary|muted|accent)|force-light)(?![\w-])/
      const VARYING_TEXT = /(^|[\s"'`:])text-(ink|ink-2|ink-3|foreground|muted-foreground)(?![\w-])/
      const attributes = (el: Node): Node[] => {
        const opening = el.openingElement as Node | undefined
        return ((opening?.attributes as Node[] | undefined) ?? []).filter(isClassName)
      }
      const hasClass = (el: Node, re: RegExp) => attributes(el).some((a) => classChunks(a).some((c) => re.test(c.text)))
      const check = (el: Node) => {
        for (const attr of attributes(el)) {
          for (const chunk of classChunks(attr)) {
            const match = chunk.text.match(VARYING_TEXT)
            if (match) context.report({ node: chunk.node, messageId: 'violation', data: { match: match[0].trim() } })
          }
        }
        for (const child of (el.children as Node[] | undefined) ?? []) walkJsx(child)
      }
      // Walk JSX children, descending through expressions (ternaries, maps)
      // but stopping at any element that paints a light surface.
      const walkJsx = (n: Node) => {
        if (n.type === 'JSXElement') {
          if (hasClass(n, LIGHT_SURFACE)) return
          check(n)
          return
        }
        for (const key of Object.keys(n)) {
          if (SKIP_KEYS.has(key)) continue
          const v = n[key]
          if (Array.isArray(v)) v.forEach((x) => x && typeof x === 'object' && 'type' in x && walkJsx(x as Node))
          else if (v && typeof v === 'object' && 'type' in (v as object)) walkJsx(v as Node)
        }
      }
      return {
        JSXElement(node) {
          if (!hasClass(node, DARK_SURFACE)) return
          for (const child of (node.children as Node[] | undefined) ?? []) walkJsx(child)
        },
      }
    },
  },
  'no-em-dash': {
    meta: {
      type: 'suggestion',
      docs: { description: 'No em dashes anywhere in source, comments included', url: `${RULES_DOC}#ruleno-em-dash` },
      messages: { violation: 'Em dash. Use a comma, colon, full stop or parentheses (rule/no-em-dash)' },
      schema: [],
    },
    create(context) {
      return {
        Program() {
          const lines = context.sourceCode.text.split('\n')
          lines.forEach((line, i) => {
            let col = line.indexOf('—')
            while (col !== -1) {
              context.report({ loc: { start: { line: i + 1, column: col }, end: { line: i + 1, column: col + 1 } }, messageId: 'violation' })
              col = line.indexOf('—', col + 1)
            }
          })
        },
      }
    },
  },
}

/**
 * @deprecated Selector arrays for `no-restricted-syntax`, kept so configs
 * written against 0.2 and 0.3 keep working. Use designSystemGuardrails()
 * or the plugin's rules instead; they carry per-rule IDs and severities.
 */
type Restriction = { selector: string; message: string }
const forClassName = (regex: string, message: string): Restriction[] => [
  { selector: `JSXAttribute[name.name='className'] Literal[value=/${regex}/]`, message },
  { selector: `JSXAttribute[name.name='className'] TemplateElement[value.cooked=/${regex}/]`, message },
]
export const noArbitraryColour: Restriction[] = forClassName(
  '(#[0-9a-fA-F]{3,8}|oklch\\(|rgba?\\(|hsla?\\()',
  'Arbitrary colour value in className. Use a semantic or primitive utility instead (rule/no-colour-literal).',
)
export const noArbitraryTypeClamp: Restriction[] = forClassName(
  'text-\\[clamp\\(',
  'Arbitrary fluid type size in className. Use a named type role (rule/no-arbitrary-clamp).',
)

export type RuleId = keyof typeof rules & string
export type Severity = 'error' | 'warn' | 'off'

/** The plugin object, for configs that want to wire rules by hand. */
export const plugin = {
  meta: { name: '@fracazo/design-system', version: '0.4.0' },
  rules,
}

/** Defaults: clean rules are errors; rules that need a cleanup pass first are warnings. */
export const defaultSeverity: Record<RuleId, Severity> = {
  'no-colour-literal': 'error',
  'no-arbitrary-clamp': 'error',
  'no-dark-pairs': 'error',
  'no-radius-literal': 'error',
  'no-stock-palette': 'warn',
  'focus-visible': 'warn',
  'on-dark-ramp': 'warn',
  'no-em-dash': 'warn',
}

export interface GuardrailOptions {
  /** Glob(s) the rules apply to. Default: src/**\/*.{ts,tsx}. */
  files?: string[]
  /** Glob(s) exempt from every rule: renderers that genuinely cannot use CSS variables. */
  ignores?: string[]
  /** Per-rule overrides of the default severities. */
  severity?: Partial<Record<RuleId, Severity>>
}

/** A flat-config block: put it in your eslint.config array. */
export function designSystemGuardrails({ files = ['src/**/*.{ts,tsx}'], ignores = [], severity = {} }: GuardrailOptions = {}) {
  const ruleConfig: Record<string, Severity> = {}
  for (const id of Object.keys(rules) as RuleId[]) ruleConfig[`design-system/${id}`] = severity[id] ?? defaultSeverity[id]
  return {
    files,
    ignores,
    plugins: { 'design-system': plugin },
    rules: ruleConfig,
  }
}
