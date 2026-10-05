// Point-cloud targets for the particle world. Every shape has the same number
// of points and is centred on the origin; per-section offsets/scales live in
// uniforms so layouts can change without regenerating geometry.

let seed = 1337
const rand = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646
const gauss = () => {
  let u = 0
  let v = 0
  while (u === 0) u = rand()
  while (v === 0) v = rand()
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v)
}

function rotate(arr, ax, ay, az) {
  const [cx, sx, cy, sy, cz, sz] = [Math.cos(ax), Math.sin(ax), Math.cos(ay), Math.sin(ay), Math.cos(az), Math.sin(az)]
  for (let i = 0; i < arr.length; i += 3) {
    let x = arr[i]
    let y = arr[i + 1]
    let z = arr[i + 2]
    let t = y * cx - z * sx
    z = y * sx + z * cx
    y = t
    t = x * cy + z * sy
    z = -x * sy + z * cy
    x = t
    t = x * cz - y * sz
    y = x * sz + y * cz
    x = t
    arr[i] = x
    arr[i + 1] = y
    arr[i + 2] = z
  }
  return arr
}

// 0 — React-style atom: nucleus + three elliptical orbits.
function atom(n) {
  const a = new Float32Array(n * 3)
  for (let i = 0; i < n; i++) {
    let x, y, z
    if (i < n * 0.32) {
      const u = rand() * 2 - 1
      const th = rand() * Math.PI * 2
      const r = 1.05 + gauss() * 0.1
      const s = Math.sqrt(1 - u * u)
      x = Math.cos(th) * s * r
      y = u * r
      z = Math.sin(th) * s * r
    } else {
      const ring = i % 3
      const t = rand() * Math.PI * 2
      const ex = Math.cos(t) * 3.3 + gauss() * 0.05
      const ey = Math.sin(t) * 1.15 + gauss() * 0.05
      const ang = (ring * Math.PI) / 3
      x = ex * Math.cos(ang) - ey * Math.sin(ang)
      y = ex * Math.sin(ang) + ey * Math.cos(ang)
      z = gauss() * 0.05
    }
    a.set([x, y, z], i * 3)
  }
  return rotate(a, 0.45, 0, 0.1)
}

// 1 — DNA double helix with rungs.
function helix(n) {
  const a = new Float32Array(n * 3)
  const turns = 3.2
  const len = 8.5
  for (let i = 0; i < n; i++) {
    let x, y, z
    if (i < n * 0.72) {
      const t = rand()
      const ang = t * Math.PI * 2 * turns + (i % 2) * Math.PI
      const r = 1.35 + gauss() * 0.06
      x = Math.cos(ang) * r
      z = Math.sin(ang) * r
      y = (t - 0.5) * len + gauss() * 0.04
    } else {
      const rung = Math.floor(rand() * 34)
      const t = (rung + 0.5) / 34
      const ang = t * Math.PI * 2 * turns
      const k = rand() * 2 - 1
      x = Math.cos(ang) * 1.35 * k
      z = Math.sin(ang) * 1.35 * k
      y = (t - 0.5) * len + gauss() * 0.02
    }
    a.set([x, y, z], i * 3)
  }
  return rotate(a, 0, 0, -0.42)
}

// 2 — Sphere shell (skills globe) with a faint inner core.
function sphere(n) {
  const a = new Float32Array(n * 3)
  for (let i = 0; i < n; i++) {
    const inner = i > n * 0.86
    const k = inner ? rand() : i / (n * 0.86)
    const y = 1 - k * 2
    const rad = Math.sqrt(Math.max(0, 1 - y * y))
    const th = inner ? rand() * Math.PI * 2 : i * Math.PI * (3 - Math.sqrt(5))
    const r = inner ? 0.4 + rand() * 0.9 : 2.5 + gauss() * 0.03
    a.set([Math.cos(th) * rad * r, y * r, Math.sin(th) * rad * r], i * 3)
  }
  return a
}

// 3 — Data terrain: a wide grid of points (animated in the shader).
function terrain(n) {
  const a = new Float32Array(n * 3)
  const cols = Math.round(Math.sqrt(n * 2.2))
  const rows = Math.ceil(n / cols)
  for (let i = 0; i < n; i++) {
    const c = i % cols
    const r = Math.floor(i / cols)
    a.set([(c / cols - 0.5) * 22, 0, (r / rows - 0.5) * 10], i * 3)
  }
  return a
}

// 4 — Portal ring framing the laptop, plus drifting dust.
function ring(n) {
  const a = new Float32Array(n * 3)
  for (let i = 0; i < n; i++) {
    if (i < n * 0.8) {
      const t = rand() * Math.PI * 2
      const r = 4.4 + gauss() * 0.16 + (i % 7 === 0 ? gauss() * 0.5 : 0)
      a.set([Math.cos(t) * r, Math.sin(t) * r, gauss() * 0.2], i * 3)
    } else {
      a.set([gauss() * 6, gauss() * 4, -2 - rand() * 6], i * 3)
    }
  }
  return a
}

// 5 — Spiral galaxy (the "code galaxy" behind the repos).
function galaxy(n) {
  const a = new Float32Array(n * 3)
  const arms = 3
  for (let i = 0; i < n; i++) {
    const r = Math.pow(rand(), 0.7) * 6
    const arm = ((i % arms) / arms) * Math.PI * 2
    const spin = r * 0.95
    const spread = (0.12 + r * 0.09) * gauss()
    const ang = arm + spin + spread
    const y = gauss() * 0.18 * (1 - r / 7)
    a.set([Math.cos(ang) * r + gauss() * 0.08, y, Math.sin(ang) * r + gauss() * 0.08], i * 3)
  }
  return rotate(a, 1.05, 0, 0.25)
}

// 6 — Lattice cube (structured learning).
function lattice(n) {
  const a = new Float32Array(n * 3)
  const g = 4
  const s = 3.4
  const step = s / (g - 1)
  for (let i = 0; i < n; i++) {
    const axis = i % 3
    const p = [Math.floor(rand() * g) * step - s / 2, Math.floor(rand() * g) * step - s / 2, Math.floor(rand() * g) * step - s / 2]
    p[axis] = rand() * s - s / 2
    if (i % 9 === 0) {
      // nodes glow a little brighter via density
      p[axis] = Math.round((p[axis] + s / 2) / step) * step - s / 2 + gauss() * 0.04
    }
    a.set(p, i * 3)
  }
  return rotate(a, 0.6, 0.75, 0)
}

// 7 — Wave sea for the contact section.
function wave(n) {
  const a = new Float32Array(n * 3)
  const cols = Math.round(Math.sqrt(n * 2.6))
  const rows = Math.ceil(n / cols)
  for (let i = 0; i < n; i++) {
    const c = i % cols
    const r = Math.floor(i / cols)
    a.set([(c / cols - 0.5) * 26, 0, (r / rows - 0.5) * 12 - 1], i * 3)
  }
  return a
}

export const SHAPES = [atom, helix, sphere, terrain, ring, galaxy, lattice, wave]

export function buildShapes(n) {
  seed = 1337
  return SHAPES.map((fn) => fn(n))
}

// Where each shape sits, per layout. [x, y, z, scale, spinSpeed]
export function layoutFor(narrow) {
  return narrow
    ? [
        [0, 1.9, 0, 0.62, 0.12],
        [0, 1.2, 0, 0.62, 0.25],
        [0, 2.0, 0, 0.7, 0.1],
        [0, -2.4, 0, 0.75, 0],
        [0, 1.6, -1, 0.55, 0.05],
        [0, 1.2, -1, 0.7, 0.05],
        [0, 1.4, 0, 0.7, 0.12],
        [0, -3.0, 0, 0.8, 0],
      ]
    : [
        [3.6, 0.15, 0, 1, 0.12],
        [-4.4, -0.3, 0, 0.95, 0.25],
        [3.9, -0.1, 0, 1, 0.1],
        [0, -3.3, 0, 1, 0],
        [2.6, 0, -1.2, 1, 0.05],
        [2.4, -0.4, -2, 1, 0.05],
        [4.7, 1.5, 0, 0.82, 0.12],
        [0, -3.6, 0, 1, 0],
      ]
}

// Two-tone palette per shape.
export const PALETTE = [
  ['#22d3ee', '#8b5cf6'],
  ['#8b5cf6', '#f472b6'],
  ['#22d3ee', '#a78bfa'],
  ['#6366f1', '#22d3ee'],
  ['#f472b6', '#8b5cf6'],
  ['#22d3ee', '#f472b6'],
  ['#a3e635', '#22d3ee'],
  ['#8b5cf6', '#f472b6'],
]
