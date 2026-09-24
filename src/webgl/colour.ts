/**
 * Read brand roles as GPU colours.
 *
 * A field never invents a hue. It samples computed CSS custom properties
 * from a host in the document, so light and dark both come from the brand
 * file. `getComputedStyle().color` is sRGB in every browser we support,
 * which is what WebGL consumes.
 */

export type Rgb = [number, number, number]

export function parseCssColour(value: string): Rgb | null {
  const raw = value.trim().toLowerCase()
  if (!raw || raw === "transparent") return null

  if (raw[0] === "#") return parseHex(raw)

  const rgb = raw.match(/^rgba?\((.+)\)$/)
  if (rgb) return parseRgbList(rgb[1])

  const colour = raw.match(/^color\(\s*srgb\s+(.+)\)$/)
  if (colour) return parseRgbList(colour[1])

  return null
}

export function readRoleRgb(
  host: Element,
  role: string,
  fallbackRole?: string
): Rgb {
  const style = getComputedStyle(host)
  const chosen =
    style.getPropertyValue(role).trim() !== ""
      ? role
      : fallbackRole && style.getPropertyValue(fallbackRole).trim() !== ""
        ? fallbackRole
        : role

  const probe = document.createElement("span")
  probe.setAttribute("aria-hidden", "true")
  probe.style.color = `var(${chosen})`
  probe.style.position = "absolute"
  probe.style.width = "0"
  probe.style.height = "0"
  probe.style.overflow = "hidden"
  host.appendChild(probe)
  const computed = getComputedStyle(probe).color
  probe.remove()
  return parseCssColour(computed) ?? [0, 0, 0]
}

function parseHex(raw: string): Rgb | null {
  const hex = raw.slice(1)
  if (hex.length === 3 || hex.length === 4) {
    const r = Number.parseInt(hex[0] + hex[0], 16)
    const g = Number.parseInt(hex[1] + hex[1], 16)
    const b = Number.parseInt(hex[2] + hex[2], 16)
    return Number.isFinite(r + g + b) ? scaleByte(r, g, b) : null
  }
  if (hex.length === 6 || hex.length === 8) {
    const r = Number.parseInt(hex.slice(0, 2), 16)
    const g = Number.parseInt(hex.slice(2, 4), 16)
    const b = Number.parseInt(hex.slice(4, 6), 16)
    return Number.isFinite(r + g + b) ? scaleByte(r, g, b) : null
  }
  return null
}

function parseRgbList(list: string): Rgb | null {
  const parts = list
    .trim()
    .split(/[\s,/]+/)
    .filter((part) => part.length > 0 && part !== "/")
  if (parts.length < 3) return null
  const channels = [parts[0], parts[1], parts[2]].map(parseChannel)
  if (channels.some((channel) => channel === null)) return null
  const [r, g, b] = channels as [number, number, number]
  const bytes = r > 1 || g > 1 || b > 1
  return bytes
    ? [clamp01(r / 255), clamp01(g / 255), clamp01(b / 255)]
    : [clamp01(r), clamp01(g), clamp01(b)]
}

function parseChannel(part: string): number | null {
  if (part.endsWith("%")) {
    const n = Number.parseFloat(part.slice(0, -1))
    return Number.isFinite(n) ? n / 100 : null
  }
  const n = Number.parseFloat(part)
  return Number.isFinite(n) ? n : null
}

function scaleByte(r: number, g: number, b: number): Rgb {
  return [r / 255, g / 255, b / 255]
}

function clamp01(n: number): number {
  return Math.min(1, Math.max(0, n))
}
