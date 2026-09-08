import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import { designSystemGuardrails } from "@fracazo/design-system/eslint";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
  // Both design system guardrails, on from day one: no raw colour values and
  // no arbitrary clamp() type sizes in a className. Add an exemption only for
  // a renderer that genuinely cannot use CSS variables (react-pdf, email HTML,
  // OG images), and say why in a comment next to it.
  designSystemGuardrails({
    files: ["src/**/*.{ts,tsx}"],
    ignores: [],
  }),
]);

export default eslintConfig;
