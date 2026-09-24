/**
 * Fragment programs for the GPU field components.
 *
 * WebGL 1, mediump, a full-screen triangle. Colours arrive as uniforms
 * sampled from brand roles. Time is seconds. Pointer is 0-1 in canvas
 * space, with w as 1 when the pointer is over the field.
 */

const COMMON = `
precision mediump float;
uniform vec2 u_res;
uniform float u_time;
uniform vec4 u_pointer;
uniform vec3 u_band;
uniform vec3 u_brand;
uniform vec3 u_soft;
uniform vec3 u_ink;
uniform vec3 u_card;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = p * 2.02 + vec2(1.7, 9.2);
    a *= 0.5;
  }
  return v;
}

vec2 aspectUv() {
  vec2 uv = gl_FragCoord.xy / max(u_res, vec2(1.0));
  float aspect = u_res.x / max(u_res.y, 1.0);
  return (uv - 0.5) * vec2(aspect, 1.0);
}

vec3 grain(vec3 col, vec2 uv) {
  float g = hash(uv * u_res) - 0.5;
  return col + (u_ink - col) * g * 0.035;
}
`

export const WASH_FRAGMENT = `
${COMMON}
void main() {
  vec2 uv = gl_FragCoord.xy / max(u_res, vec2(1.0));
  vec2 p = aspectUv();
  float t = u_time * 0.035;
  vec2 q = vec2(fbm(p + t), fbm(p + vec2(5.2, 1.3) - t));
  vec2 r = vec2(
    fbm(p + 1.5 * q + vec2(1.7, 9.2) + t * 0.35),
    fbm(p + 1.5 * q + vec2(8.3, 2.8) - t * 0.28)
  );
  float n = fbm(p + 1.7 * r);
  vec3 col = mix(u_band, u_soft, smoothstep(0.22, 0.68, n));
  col = mix(col, u_brand, smoothstep(0.52, 0.96, n) * 0.48);
  gl_FragColor = vec4(grain(col, uv), 1.0);
}
`

export const MOTES_FRAGMENT = `
${COMMON}
void main() {
  vec2 uv = gl_FragCoord.xy / max(u_res, vec2(1.0));
  vec2 p = aspectUv();
  float t = u_time * 0.08;
  vec3 col = mix(u_band, u_soft, 0.35 + 0.2 * fbm(p * 0.9 + t * 0.15));

  float glow = 0.0;
  for (int i = 0; i < 18; i++) {
    float fi = float(i);
    vec2 seed = vec2(hash(vec2(fi, 2.1)), hash(vec2(3.7, fi)));
    vec2 drift = vec2(
      sin(t * 0.7 + fi * 0.6) * 0.18,
      cos(t * 0.5 + fi * 0.9) * 0.22
    );
    vec2 pos = (seed - 0.5) * vec2(1.6, 1.2) + drift;
    float radius = 0.012 + hash(vec2(fi, 9.4)) * 0.018;
    float d = length(p - pos);
    glow += smoothstep(radius * 3.4, 0.0, d) * (0.35 + 0.65 * hash(vec2(fi, 1.1)));
  }

  col = mix(col, u_brand, clamp(glow * 0.55, 0.0, 0.65));
  col = mix(col, u_ink, clamp(glow * 0.12, 0.0, 0.2));
  gl_FragColor = vec4(grain(col, uv), 1.0);
}
`

export const RIPPLE_FRAGMENT = `
${COMMON}
void main() {
  vec2 uv = gl_FragCoord.xy / max(u_res, vec2(1.0));
  vec2 p = aspectUv();
  float t = u_time * 0.04;
  vec2 pointer = (u_pointer.xy - 0.5) * vec2(u_res.x / max(u_res.y, 1.0), 1.0);
  float active = u_pointer.w;
  float dist = length(p - pointer);
  float ripple = sin(dist * 18.0 - t * 6.0) * exp(-dist * 3.2) * active;
  vec2 warp = p + normalize(p - pointer + 0.0001) * ripple * 0.12;

  vec2 q = vec2(fbm(warp + t), fbm(warp + vec2(4.1, 2.6) - t));
  float n = fbm(warp + 1.4 * q);
  vec3 col = mix(u_band, u_soft, smoothstep(0.2, 0.7, n));
  col = mix(col, u_brand, smoothstep(0.5, 0.95, n) * 0.5 + ripple * 0.2 * active);
  gl_FragColor = vec4(grain(col, uv), 1.0);
}
`

export const ORB_FRAGMENT = `
${COMMON}
void main() {
  vec2 uv = gl_FragCoord.xy / max(u_res, vec2(1.0));
  vec2 p = aspectUv() * 1.15;
  vec3 ro = vec3(0.0, 0.0, 2.35);
  vec3 rd = normalize(vec3(p, -1.4));

  float r = 0.72;
  float b = dot(ro, rd);
  float c = dot(ro, ro) - r * r;
  float h = b * b - c;
  if (h < 0.0) {
    gl_FragColor = vec4(0.0);
    return;
  }

  float tHit = -b - sqrt(h);
  vec3 pos = ro + rd * tHit;
  vec3 n = normalize(pos);

  vec3 lightDir = normalize(vec3(
    (u_pointer.x - 0.5) * 1.6,
    (u_pointer.y - 0.5) * 1.6,
    0.85
  ));
  if (u_pointer.w < 0.5) {
    lightDir = normalize(vec3(0.35, 0.45, 0.8));
  }

  float diff = clamp(dot(n, lightDir), 0.0, 1.0);
  vec3 halfV = normalize(lightDir - rd);
  float spec = pow(clamp(dot(n, halfV), 0.0, 1.0), 48.0);
  float fres = pow(1.0 - clamp(dot(n, -rd), 0.0, 1.0), 2.4);
  float ao = 0.55 + 0.45 * n.z;

  vec3 albedo = mix(u_brand, u_soft, 0.28 + 0.2 * n.y);
  vec3 col = albedo * (0.18 * ao + 0.82 * diff);
  col += u_card * spec * 0.45;
  col = mix(col, u_soft, fres * 0.55);
  col = mix(col, u_ink, 0.06);

  float edge = smoothstep(0.0, 0.04, h);
  gl_FragColor = vec4(col, edge);
}
`
