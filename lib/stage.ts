export type StageImage = {
  src: string
  width: number
  height: number
  focus?: [number, number]
  horizon?: number
  water?: number
  sun?: [number, number, number]
}

const VERTEX = `
attribute vec2 p;
varying vec2 v;
void main() {
  v = p * 0.5 + 0.5;
  gl_Position = vec4(p, 0.0, 1.0);
}
`

const FRAGMENT = `
precision highp float;
varying vec2 v;
uniform sampler2D uA;
uniform sampler2D uB;
uniform vec4 uRectA;
uniform vec4 uRectB;
uniform vec3 uSunA;
uniform vec3 uSunB;
uniform vec2 uHorizon;
uniform vec2 uWater;
uniform vec2 uAspect;
uniform float uMix;
uniform float uNight;
uniform vec3 uTint;
uniform float uTintAmount;
uniform float uFlare;
uniform float uTime;
uniform vec2 uMouse;
uniform vec2 uRes;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

vec3 shade(sampler2D t, vec4 r, vec2 uv, float horizon, float water, vec3 sun, float aspect) {
  vec2 iu = uv * r.xy + r.zw;
  iu -= uMouse * r.xy * 0.016;
  float band = horizon < 0.0 ? 0.0 : exp(-pow((iu.y - horizon) * 20.0, 2.0));
  float n = noise(vec2(iu.x * 70.0, iu.y * 26.0 - uTime * 1.6));
  iu.x += (n - 0.5) * 0.006 * band;
  float below = horizon < 0.0 ? 0.0 : smoothstep(horizon, horizon + 0.03, iu.y);
  float w = sin(iu.y * 260.0 - uTime * 2.4 + noise(vec2(iu.x * 9.0, iu.y * 40.0 - uTime * 0.7)) * 5.0);
  iu.x += w * 0.0022 * water * below * (0.4 + (iu.y - horizon) * 3.0);
  iu = clamp(iu, vec2(0.001), vec2(0.999));
  vec3 c = texture2D(t, iu).rgb;
  vec2 d = (iu - sun.xy) * vec2(aspect, 1.0);
  float l = length(d);
  c += vec3(1.0, 0.78, 0.5) * sun.z * (exp(-l * 9.0) * 0.55 + exp(-l * 2.6) * 0.18);
  return c;
}

void main() {
  vec2 uv = vec2(v.x, 1.0 - v.y);
  vec3 col = shade(uA, uRectA, uv, uHorizon.x, uWater.x, uSunA, uAspect.x);
  if (uMix > 0.001) {
    vec3 b = shade(uB, uRectB, uv, uHorizon.y, uWater.y, uSunB, uAspect.y);
    float n = noise(uv * 3.5 + uTime * 0.03) * 0.35;
    float edge = uv.x * 0.75 + (1.0 - uv.y) * 0.25 + n;
    float front = mix(-0.35, 1.45, uMix);
    float t = 1.0 - smoothstep(front - 0.14, front + 0.14, edge);
    col = mix(col, b, t);
    float line = exp(-pow((edge - front) / 0.05, 2.0)) * sin(3.14159 * uMix);
    col += uTint * line * 0.5;
  }
  float lum = dot(col, vec3(0.299, 0.587, 0.114));
  vec3 night = col * vec3(0.17, 0.23, 0.37) + vec3(0.004, 0.008, 0.02);
  float s = hash(floor(uv * uRes / 2.0));
  float twinkle = 0.55 + 0.45 * sin(uTime * (1.5 + s * 3.0) + s * 40.0);
  float star = step(0.9966, s) * twinkle * smoothstep(0.58, 0.18, uv.y) * (1.0 - lum * 0.6);
  night += vec3(0.85, 0.9, 1.0) * star;
  col = mix(col, night, uNight);
  col = mix(col, col * uTint * 1.2, uTintAmount);
  vec2 m = vec2(uMouse.x * 0.5 + 0.5, 0.5 - uMouse.y * 0.5);
  float spot = exp(-length((v - m) * vec2(uRes.x / uRes.y, 1.0)) * 3.2);
  col += uTint * spot * uFlare * 0.12;
  float vig = smoothstep(1.15, 0.35, length((v - 0.5) * vec2(1.1, 1.3)));
  col *= mix(0.72, 1.0, vig);
  col += (hash(v * uRes + fract(uTime) * 100.0) - 0.5) * 0.03;
  gl_FragColor = vec4(col, 1.0);
}
`

const UNIFORMS = [
  'uA', 'uB', 'uRectA', 'uRectB', 'uSunA', 'uSunB', 'uHorizon', 'uWater', 'uAspect', 'uMix', 'uNight',
  'uTint', 'uTintAmount', 'uFlare', 'uTime', 'uMouse', 'uRes',
] as const

type UniformName = (typeof UNIFORMS)[number]

export type StageState = {
  a: number
  b: number
  mix: number
  night: number
  tint: [number, number, number]
  tintAmount: number
  flare: number
  sunPulse: number
}

export const optimizedSrc = (src: string, width: number) => `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=75`

export function coverRect(cw: number, ch: number, iw: number, ih: number, fx: number, fy: number, zoom: number) {
  const canvasAspect = cw / ch
  const imageAspect = iw / ih
  let sx = 1
  let sy = 1
  if (canvasAspect > imageAspect) sy = imageAspect / canvasAspect
  else sx = canvasAspect / imageAspect
  sx /= zoom
  sy /= zoom
  return [sx, sy, (1 - sx) * fx, (1 - sy) * fy] as const
}

export function hexToRgb(hex: string): [number, number, number] {
  const value = parseInt(hex.replace('#', ''), 16)
  return [((value >> 16) & 255) / 255, ((value >> 8) & 255) / 255, (value & 255) / 255]
}

export class Stage {
  state: StageState = { a: 0, b: 0, mix: 0, night: 0, tint: [1, 0.85, 0.7], tintAmount: 0, flare: 0, sunPulse: 0 }
  zoom = 1.06
  onReady?: () => void

  private gl: WebGLRenderingContext
  private program: WebGLProgram
  private textures: (WebGLTexture | null)[] = []
  private locations = {} as Record<UniformName, WebGLUniformLocation | null>
  private frame = 0
  private running = false
  private visible = true
  private started = performance.now()
  private mouse = [0, 0]
  private mouseTarget = [0, 0]
  private observer?: IntersectionObserver
  private resizer?: ResizeObserver
  private destroyed = false

  static supported(): boolean {
    try {
      const canvas = document.createElement('canvas')
      return Boolean(canvas.getContext('webgl'))
    } catch {
      return false
    }
  }

  constructor(private canvas: HTMLCanvasElement, private images: StageImage[], private textureWidth: number) {
    const gl = canvas.getContext('webgl', { antialias: false, alpha: false, premultipliedAlpha: false, powerPreference: 'high-performance' })
    if (!gl) throw new Error('webgl unavailable')
    this.gl = gl
    this.program = this.link()
    gl.useProgram(this.program)
    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const position = gl.getAttribLocation(this.program, 'p')
    gl.enableVertexAttribArray(position)
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)
    for (const name of UNIFORMS) this.locations[name] = gl.getUniformLocation(this.program, name)
    gl.uniform1i(this.locations.uA, 0)
    gl.uniform1i(this.locations.uB, 1)
    this.textures = images.map(() => null)
    this.resize()
    this.resizer = new ResizeObserver(() => this.resize())
    this.resizer.observe(canvas)
    this.observer = new IntersectionObserver(([entry]) => {
      this.visible = entry.isIntersecting
      if (this.visible) this.start()
    })
    this.observer.observe(canvas)
    this.load()
  }

  pointer(x: number, y: number) {
    this.mouseTarget = [x, y]
  }

  start() {
    if (this.running || this.destroyed) return
    this.running = true
    this.frame = requestAnimationFrame(this.tick)
  }

  destroy() {
    this.destroyed = true
    cancelAnimationFrame(this.frame)
    this.observer?.disconnect()
    this.resizer?.disconnect()
    for (const texture of this.textures) if (texture) this.gl.deleteTexture(texture)
    this.gl.deleteProgram(this.program)
  }

  private link(): WebGLProgram {
    const gl = this.gl
    const compile = (type: number, source: string) => {
      const shader = gl.createShader(type)!
      gl.shaderSource(shader, source)
      gl.compileShader(shader)
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(shader) ?? 'shader')
      return shader
    }
    const program = gl.createProgram()!
    gl.attachShader(program, compile(gl.VERTEX_SHADER, VERTEX))
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, FRAGMENT))
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program) ?? 'program')
    return program
  }

  private async load() {
    const order = this.images.map((_, index) => index)
    let first = true
    for (const index of order) {
      const image = new Image()
      image.decoding = 'async'
      image.src = optimizedSrc(this.images[index].src, this.textureWidth)
      try {
        await image.decode()
      } catch {
        continue
      }
      if (this.destroyed) return
      const gl = this.gl
      const texture = gl.createTexture()
      gl.bindTexture(gl.TEXTURE_2D, texture)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image)
      this.textures[index] = texture
      if (first) {
        first = false
        this.start()
        this.onReady?.()
      }
    }
  }

  private resize() {
    const ratio = Math.min(window.devicePixelRatio || 1, 1.75)
    const width = Math.max(1, Math.round(this.canvas.clientWidth * ratio))
    const height = Math.max(1, Math.round(this.canvas.clientHeight * ratio))
    if (this.canvas.width !== width || this.canvas.height !== height) {
      this.canvas.width = width
      this.canvas.height = height
    }
    this.gl.viewport(0, 0, width, height)
  }

  private bind(unit: number, index: number) {
    const gl = this.gl
    gl.activeTexture(unit === 0 ? gl.TEXTURE0 : gl.TEXTURE1)
    gl.bindTexture(gl.TEXTURE_2D, this.textures[index] ?? this.textures.find(Boolean) ?? null)
  }

  private rect(index: number) {
    const image = this.images[index]
    const [fx, fy] = image.focus ?? [0.5, 0.5]
    return coverRect(this.canvas.width, this.canvas.height, image.width, image.height, fx, fy, this.zoom)
  }

  private tick = (now: number) => {
    if (this.destroyed) return
    if (!this.visible) {
      this.running = false
      return
    }
    const gl = this.gl
    const l = this.locations
    const s = this.state
    const time = (now - this.started) / 1000
    this.mouse[0] += (this.mouseTarget[0] - this.mouse[0]) * 0.06
    this.mouse[1] += (this.mouseTarget[1] - this.mouse[1]) * 0.06
    const a = this.images[s.a]
    const b = this.images[s.b]
    const pulse = 1 + Math.sin(time * 1.3) * 0.12 * s.sunPulse
    this.bind(0, s.a)
    this.bind(1, s.b)
    gl.uniform4fv(l.uRectA, this.rect(s.a))
    gl.uniform4fv(l.uRectB, this.rect(s.b))
    gl.uniform3f(l.uSunA, a.sun?.[0] ?? 0, a.sun?.[1] ?? 0, (a.sun?.[2] ?? 0) * pulse)
    gl.uniform3f(l.uSunB, b.sun?.[0] ?? 0, b.sun?.[1] ?? 0, (b.sun?.[2] ?? 0) * pulse)
    gl.uniform2f(l.uHorizon, a.horizon ?? -1, b.horizon ?? -1)
    gl.uniform2f(l.uWater, a.water ?? 0, b.water ?? 0)
    gl.uniform2f(l.uAspect, a.width / a.height, b.width / b.height)
    gl.uniform1f(l.uMix, s.mix)
    gl.uniform1f(l.uNight, s.night)
    gl.uniform3fv(l.uTint, s.tint)
    gl.uniform1f(l.uTintAmount, s.tintAmount)
    gl.uniform1f(l.uFlare, s.flare)
    gl.uniform1f(l.uTime, time)
    gl.uniform2f(l.uMouse, this.mouse[0], this.mouse[1])
    gl.uniform2f(l.uRes, this.canvas.width, this.canvas.height)
    gl.drawArrays(gl.TRIANGLES, 0, 3)
    this.frame = requestAnimationFrame(this.tick)
  }
}
