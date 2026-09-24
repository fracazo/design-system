import { readRoleRgb, type Rgb } from "./colour.js"

export type FieldProgramName = "wash" | "motes" | "ripple" | "orb"

type RuntimeOptions = {
  canvas: HTMLCanvasElement
  fragment: string
  reducedMotion: boolean
}

export type FieldRuntime = {
  draw: (timeMs: number) => void
  setPointer: (x: number, y: number, active: boolean) => void
  setPaused: (paused: boolean) => void
  syncTokens: () => void
  resize: () => void
  dispose: () => void
  start: () => void
  stop: () => void
}

const TOKEN_ROLES = [
  { uniform: "u_band", role: "--band", fallback: "--background" },
  { uniform: "u_brand", role: "--brand" },
  { uniform: "u_soft", role: "--brand-soft" },
  { uniform: "u_ink", role: "--ink" },
  { uniform: "u_card", role: "--card" },
] as const

const VERTEX_SOURCE = `
attribute vec2 a_pos;
void main() {
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`

export function createFieldRuntime(
  options: RuntimeOptions
): FieldRuntime | null {
  const { canvas, fragment, reducedMotion } = options
  const context = canvas.getContext("webgl", {
    alpha: true,
    antialias: false,
    depth: false,
    stencil: false,
    premultipliedAlpha: true,
    powerPreference: "low-power",
  })
  if (!context) return null
  const gl: WebGLRenderingContext = context

  let program: WebGLProgram
  try {
    program = link(gl, VERTEX_SOURCE, fragment)
  } catch {
    return null
  }

  const buffer = gl.createBuffer()
  if (!buffer) return null
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 3, -1, -1, 3]),
    gl.STATIC_DRAW
  )

  const aPos = gl.getAttribLocation(program, "a_pos")
  const uRes = gl.getUniformLocation(program, "u_res")
  const uTime = gl.getUniformLocation(program, "u_time")
  const uPointer = gl.getUniformLocation(program, "u_pointer")
  const tokenLocs = TOKEN_ROLES.map((token) => ({
    ...token,
    loc: gl.getUniformLocation(program, token.uniform),
  }))

  const pointer = { x: 0.5, y: 0.5, active: 0 }
  const tokens: Record<string, Rgb> = {}
  let paused = reducedMotion
  let raf = 0
  let disposed = false
  let inView = true
  let pageVisible = document.visibilityState === "visible"
  let startMs = 0
  let frozenSeconds = 0

  const io =
    typeof IntersectionObserver === "function"
      ? new IntersectionObserver(
          (entries) => {
            inView = entries.some((entry) => entry.isIntersecting)
            if (inView) pump()
          },
          { threshold: 0.05 }
        )
      : null
  io?.observe(canvas)

  const onVisibility = () => {
    pageVisible = document.visibilityState === "visible"
    if (pageVisible) pump()
  }
  document.addEventListener("visibilitychange", onVisibility)

  const themeRoot = canvas.ownerDocument.documentElement
  const mo = new MutationObserver(() => {
    syncTokens()
    draw(performance.now())
  })
  mo.observe(themeRoot, { attributes: true, attributeFilter: ["class", "style"] })

  const ro = new ResizeObserver(() => {
    resize()
    draw(performance.now())
  })
  ro.observe(canvas)

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    const width = Math.max(1, Math.floor(canvas.clientWidth * dpr))
    const height = Math.max(1, Math.floor(canvas.clientHeight * dpr))
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width
      canvas.height = height
    }
    gl.viewport(0, 0, canvas.width, canvas.height)
  }

  function syncTokens() {
    const host = canvas.parentElement ?? canvas
    for (const token of tokenLocs) {
      tokens[token.uniform] = readRoleRgb(
        host,
        token.role,
        "fallback" in token ? token.fallback : undefined
      )
    }
  }

  function draw(timeMs: number) {
    if (disposed) return
    if (startMs === 0) startMs = timeMs
    const seconds = reducedMotion ? frozenSeconds : (timeMs - startMs) / 1000
    if (reducedMotion) frozenSeconds = 0

    resize()
    gl.useProgram(program)
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.enableVertexAttribArray(aPos)
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)
    gl.uniform2f(uRes, canvas.width, canvas.height)
    gl.uniform1f(uTime, seconds)
    gl.uniform4f(uPointer, pointer.x, pointer.y, 0, pointer.active)
    for (const token of tokenLocs) {
      const rgb = tokens[token.uniform] ?? [0, 0, 0]
      gl.uniform3f(token.loc, rgb[0], rgb[1], rgb[2])
    }
    gl.enable(gl.BLEND)
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)
    gl.clearColor(0, 0, 0, 0)
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.drawArrays(gl.TRIANGLES, 0, 3)
  }

  function tick(now: number) {
    raf = 0
    if (disposed || paused || !inView || !pageVisible || reducedMotion) return
    draw(now)
    raf = requestAnimationFrame(tick)
  }

  function pump() {
    if (disposed || paused || !inView || !pageVisible || reducedMotion) return
    if (raf === 0) raf = requestAnimationFrame(tick)
  }

  function stop() {
    if (raf !== 0) {
      cancelAnimationFrame(raf)
      raf = 0
    }
  }

  syncTokens()
  resize()
  draw(performance.now())

  return {
    draw,
    setPointer(x, y, active) {
      pointer.x = x
      pointer.y = y
      pointer.active = active ? 1 : 0
    },
    setPaused(next) {
      paused = next || reducedMotion
      if (paused) stop()
      else pump()
    },
    syncTokens,
    resize,
    start: pump,
    stop,
    dispose() {
      disposed = true
      stop()
      io?.disconnect()
      mo.disconnect()
      ro.disconnect()
      document.removeEventListener("visibilitychange", onVisibility)
      gl.deleteBuffer(buffer)
      gl.deleteProgram(program)
    },
  }
}

function link(
  gl: WebGLRenderingContext,
  vertexSrc: string,
  fragmentSrc: string
): WebGLProgram {
  const vertex = compile(gl, gl.VERTEX_SHADER, vertexSrc)
  const fragment = compile(gl, gl.FRAGMENT_SHADER, fragmentSrc)
  const program = gl.createProgram()
  if (!program) throw new Error("program")
  gl.attachShader(program, vertex)
  gl.attachShader(program, fragment)
  gl.linkProgram(program)
  gl.deleteShader(vertex)
  gl.deleteShader(fragment)
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const log = gl.getProgramInfoLog(program)
    gl.deleteProgram(program)
    throw new Error(log ?? "link")
  }
  return program
}

function compile(
  gl: WebGLRenderingContext,
  type: number,
  source: string
): WebGLShader {
  const shader = gl.createShader(type)
  if (!shader) throw new Error("shader")
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(shader)
    gl.deleteShader(shader)
    throw new Error(log ?? "compile")
  }
  return shader
}
