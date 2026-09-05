// =============================================================================
// ESLint guardrails.
//
// Two rules that keep design decisions in the token layer instead of in
// component files:
//   1. No raw colour values in a className (hex, oklch(), rgb(), hsl()),
//      including Tailwind arbitrary utilities like bg-[#fff]. Colours come
//      from the semantic or primitive utilities the roles define.
//   2. No arbitrary fluid type size in a className (text-[clamp(...)]).
//      Fluid sizes are named roles (text-display, text-section-title,
//      text-lede); a genuinely new size becomes a token first.
//
// Both match string literals and template-literal chunks nested under any
// className attribute, so cn() and ternaries are covered. Non-className
// colour (JS colour maps, inline style objects) is deliberately not matched.
//
//   import { designSystemGuardrails } from '@fracazo/design-system/eslint'
//   export default defineConfig([
//     ...,
//     designSystemGuardrails({
//       files: ['src/**/*.{ts,tsx}'],
//       ignores: ['src/components/pdf/**'],   // renderers that cannot use CSS vars
//     }),
//   ])
//
// A deliberate one-off carries `// eslint-disable-next-line
// no-restricted-syntax -- <reason>` so the exception is visible in review.
// =============================================================================

const COLOUR_REGEX = '(#[0-9a-fA-F]{3,8}|oklch\\(|rgba?\\(|hsla?\\()'
const COLOUR_MESSAGE =
  'Arbitrary colour value in className. Use a semantic or primitive utility (bg-primary, text-muted-foreground, border-border, bg-surface) instead; see DESIGN.md. A deliberate one-off carries an eslint-disable-next-line stating why.'

const TYPE_CLAMP_REGEX = 'text-\\[clamp\\('
const TYPE_CLAMP_MESSAGE =
  'Arbitrary fluid type size in className. Use a named type role (text-display, text-section-title, text-lede) or add a token to roles.css; a deliberate one-off carries an eslint-disable-next-line stating why.'

type Restriction = { selector: string; message: string }

const forClassName = (regex: string, message: string): Restriction[] => [
  { selector: `JSXAttribute[name.name='className'] Literal[value=/${regex}/]`, message },
  {
    selector: `JSXAttribute[name.name='className'] TemplateElement[value.cooked=/${regex}/]`,
    message,
  },
]

export const noArbitraryColour: Restriction[] = forClassName(COLOUR_REGEX, COLOUR_MESSAGE)
export const noArbitraryTypeClamp: Restriction[] = forClassName(TYPE_CLAMP_REGEX, TYPE_CLAMP_MESSAGE)

export interface GuardrailOptions {
  /** Glob(s) the rules apply to. Default: src/**\/*.{ts,tsx}. */
  files?: string[]
  /** Glob(s) exempt from the rules: renderers that genuinely cannot use CSS variables. */
  ignores?: string[]
}

/** A flat-config block: spread it into your eslint.config array. */
export function designSystemGuardrails({
  files = ['src/**/*.{ts,tsx}'],
  ignores = [],
}: GuardrailOptions = {}) {
  return {
    files,
    ignores,
    rules: {
      'no-restricted-syntax': ['error', ...noArbitraryColour, ...noArbitraryTypeClamp],
    },
  }
}
