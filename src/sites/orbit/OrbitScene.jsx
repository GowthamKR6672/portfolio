import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, Html, Lightformer, Line, RoundedBox, Stars } from '@react-three/drei'
import { Bloom, EffectComposer, Vignette } from '@react-three/postprocessing'
import * as THREE from 'three'
import { createScreens } from '../../three/screens.js'
import { pointer, prefersReducedMotion } from '../../lib/motion.js'
import { earthFragment, earthVertex, haloFragment, haloVertex } from './earthShaders.js'
import { chapters } from './chapters.js'

const v3 = (a) => new THREE.Vector3(...a)
const smooth = (t) => t * t * t * (t * (t * 6 - 15) + 10)

// World layout ───────────────────────────────────────────────
// Phones get taller arrangements for the array, education and credentials.
const NARROW = typeof window !== 'undefined' && window.innerWidth < 760
const NODES = [
  [0, -22, -6],
  [7, -22, -17],
  [-3, -22, -28],
  [5, -22, -39],
]
const ARRAY = [0, -22, -56]
const SIDES = [1, -1, 1, -1] // +1: node sits left, copy on the right

// Camera keyframes, indexed by chapter + 1 (index 0 is the gate).
const KEYS = [
  { pos: [-1, 3, 26], look: [5, -6, -10] },
  { pos: [3.2, 2.4, 9.5], look: [0.2, 0.6, 0] },
  { pos: [1.75, 1.6, 3.4], look: [0, 1.1, 0] },
  { pos: [-1.6, 1.55, 1.6], look: [-4.4, 0.95, -2.2] },
  { pos: [-1, -4.2, 6], look: [0, -10, -8] },
  ...NODES.map((n, i) => ({ pos: [n[0] - 1.2 * SIDES[i], n[1] + 0.7, n[2] + 6.2], look: [n[0] + 1.9 * SIDES[i], n[1], n[2]] })),
  NARROW ? { pos: [0, -20.6, -41], look: [0, -22.6, -56] } : { pos: [0, -20.6, -43], look: [0, -22.6, -56] },
  NARROW ? { pos: [0.3, -20, -65.5], look: [0.3, -21.5, -78] } : { pos: [0, -19.7, -66.5], look: [0, -20.2, -78] },
  NARROW ? { pos: [0, -13.3, -88], look: [0, -14.1, -100] } : { pos: [-1.6, -13.3, -89], look: [-1.6, -14.1, -100] },
  { pos: [0, 3.2, 17], look: [1.5, -1, -4] },
]
export const LAST = KEYS.length - 2

// Textures ───────────────────────────────────────────────────
function canvasTex(w, h, draw, srgb = true) {
  const c = document.createElement('canvas')
  c.width = w
  c.height = h
  draw(c.getContext('2d'), w, h)
  const t = new THREE.CanvasTexture(c)
  if (srgb) t.colorSpace = THREE.SRGBColorSpace
  t.anisotropy = 8
  return t
}

const goldFoil = () =>
  canvasTex(512, 512, (g, w, h) => {
    g.fillStyle = '#a8792a'
    g.fillRect(0, 0, w, h)
    let s = 7
    const r = () => ((s = (s * 16807) % 2147483647) / 2147483647)
    for (let i = 0; i < 520; i++) {
      const x = r() * w
      const y = r() * h
      const l = 40 + r() * 50
      g.fillStyle = `hsla(${36 + r() * 10}, ${55 + r() * 30}%, ${l}%, 0.55)`
      g.beginPath()
      g.moveTo(x, y)
      g.lineTo(x + (r() - 0.5) * 90, y + (r() - 0.5) * 90)
      g.lineTo(x + (r() - 0.5) * 90, y + (r() - 0.5) * 90)
      g.fill()
    }
  })

const solarCells = () =>
  canvasTex(512, 640, (g, w, h) => {
    g.fillStyle = '#8f9aab'
    g.fillRect(0, 0, w, h)
    const cols = 6
    const rows = 8
    const cw = w / cols
    const ch = h / rows
    for (let i = 0; i < cols; i++)
      for (let j = 0; j < rows; j++) {
        const grd = g.createLinearGradient(i * cw, j * ch, (i + 1) * cw, (j + 1) * ch)
        grd.addColorStop(0, '#1b2f5c')
        grd.addColorStop(0.5, '#0c1835')
        grd.addColorStop(1, '#14264d')
        g.fillStyle = grd
        g.fillRect(i * cw + 3, j * ch + 3, cw - 6, ch - 6)
        g.strokeStyle = 'rgba(160,180,220,0.18)'
        g.lineWidth = 1
        for (let k = 1; k < 4; k++) {
          g.beginPath()
          g.moveTo(i * cw + 3, j * ch + (k * ch) / 4)
          g.lineTo((i + 1) * cw - 3, j * ch + (k * ch) / 4)
          g.stroke()
        }
      }
  })

const cloudPuff = () =>
  canvasTex(256, 256, (g, w, h) => {
    let s = 3
    const r = () => ((s = (s * 16807) % 2147483647) / 2147483647)
    for (let i = 0; i < 14; i++) {
      const x = w * (0.3 + r() * 0.4)
      const y = h * (0.35 + r() * 0.3)
      const rad = w * (0.12 + r() * 0.2)
      const grd = g.createRadialGradient(x, y, 0, x, y, rad)
      grd.addColorStop(0, 'rgba(255,255,255,0.55)')
      grd.addColorStop(1, 'rgba(255,255,255,0)')
      g.fillStyle = grd
      g.fillRect(0, 0, w, h)
    }
  })

const rayTex = () =>
  canvasTex(64, 512, (g, w, h) => {
    const grd = g.createLinearGradient(0, 0, 0, h)
    grd.addColorStop(0, 'rgba(255,255,255,0.9)')
    grd.addColorStop(1, 'rgba(255,255,255,0)')
    g.fillStyle = grd
    g.fillRect(0, 0, w, h)
    const side = g.createLinearGradient(0, 0, w, 0)
    side.addColorStop(0, 'rgba(0,0,0,1)')
    side.addColorStop(0.5, 'rgba(0,0,0,0)')
    side.addColorStop(1, 'rgba(0,0,0,1)')
    g.globalCompositeOperation = 'destination-out'
    g.fillStyle = side
    g.fillRect(0, 0, w, h)
  })

const glowTex = (color) =>
  canvasTex(256, 256, (g, w, h) => {
    const grd = g.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w / 2)
    grd.addColorStop(0, color)
    grd.addColorStop(1, 'rgba(0,0,0,0)')
    g.fillStyle = grd
    g.fillRect(0, 0, w, h)
  })

// Pieces ─────────────────────────────────────────────────────
function Earth({ sky }) {
  const group = useRef()
  const mat = useRef()
  const light = useMemo(() => new THREE.Vector3(-0.6, 0.75, 0.55).normalize(), [])
  const uniforms = useMemo(() => ({ uTime: { value: 0 }, uLight: { value: light } }), [light])
  const halo = useMemo(() => ({ uLight: { value: light } }), [light])
  useFrame((_, dt) => {
    mat.current.uniforms.uTime.value += dt
    group.current.rotation.y += dt * 0.004
    group.current.visible = sky.current < 0.35
  })
  return (
    <group ref={group} position={[10, -34, -30]} rotation={[0.3, 0, 0]}>
      <mesh>
        <sphereGeometry args={[30, 160, 160]} />
        <shaderMaterial ref={mat} vertexShader={earthVertex} fragmentShader={earthFragment} uniforms={uniforms} />
      </mesh>
      <mesh scale={1.035}>
        <sphereGeometry args={[30, 96, 96]} />
        <shaderMaterial vertexShader={haloVertex} fragmentShader={haloFragment} uniforms={halo} side={THREE.BackSide} transparent depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
  )
}

function Satellite({ active }) {
  const g = useRef()
  const gold = useMemo(goldFoil, [])
  const cells = useMemo(solarCells, [])
  useFrame(({ clock }) => {
    g.current.rotation.y = -0.5 + Math.sin(clock.elapsedTime * 0.08) * 0.12
    g.current.rotation.z = 0.05 + Math.sin(clock.elapsedTime * 0.11) * 0.03
  })
  const metal = <meshStandardMaterial color="#c9ced6" metalness={0.9} roughness={0.25} />
  return (
    <group ref={g} position={[0, 1, 0]} rotation={[0.12, -0.5, 0.05]}>
      <mesh>
        <boxGeometry args={[1.1, 1.5, 1.1]} />
        <meshStandardMaterial map={gold} color="#f0c069" metalness={1} roughness={0.36} />
      </mesh>
      <mesh position={[0, 0.79, 0]}>
        <boxGeometry args={[1.16, 0.08, 1.16]} />
        {metal}
      </mesh>
      <mesh position={[0, -0.79, 0]}>
        <boxGeometry args={[1.16, 0.08, 1.16]} />
        {metal}
      </mesh>
      <group position={[0.18, 1.0, 0.12]} rotation={[0.55, 0, 0.35]}>
        <mesh>
          <sphereGeometry args={[0.4, 40, 16, 0, Math.PI * 2, 0, Math.PI / 3.1]} />
          <meshStandardMaterial color="#e9ebee" metalness={0.5} roughness={0.3} side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[0, 0.12, 0]}>
          <cylinderGeometry args={[0.015, 0.015, 0.45, 8]} />
          {metal}
        </mesh>
      </group>
      {[
        [0.3, 0.2, 0.56],
        [-0.25, -0.3, 0.56],
      ].map((p, i) => (
        <mesh key={i} position={p} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.09, 0.11, 0.14, 24]} />
          <meshStandardMaterial color="#1a1d24" metalness={0.8} roughness={0.2} />
        </mesh>
      ))}
      {[-1, 1].map((side) => (
        <group key={side} position={[side * 0.55, 0.05, 0]}>
          <mesh position={[side * 0.42, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.03, 0.03, 0.85, 10]} />
            {metal}
          </mesh>
          {[0, 1, 2, 3].map((i) => (
            <mesh key={i} position={[side * (1.4 + i * 1.12), 0, 0]}>
              <boxGeometry args={[1.07, 0.035, 1.35]} />
              <meshStandardMaterial map={cells} metalness={0.7} roughness={0.28} envMapIntensity={1.4} />
            </mesh>
          ))}
        </group>
      ))}
      {chapters[1].callouts.map((c) => (
        <Html key={c.title} position={[c.at[0], c.at[1] - 1, c.at[2]]} center={false} zIndexRange={[20, 0]}>
          <div className={`ob-callout ${active === 1 ? 'is-on' : ''}`}>
            <span className="ob-callout__ring" />
            <span className="ob-callout__text">
              <b>{c.title}</b>
              {c.sub}
            </span>
          </div>
        </Html>
      ))}
    </group>
  )
}

function Constellation() {
  const geo = useMemo(() => {
    let s = 42
    const r = () => ((s = (s * 16807) % 2147483647) / 2147483647)
    const nodes = Array.from({ length: 46 }, () => new THREE.Vector3((r() - 0.5) * 34, (r() - 0.2) * 16, -8 - r() * 14))
    const seg = []
    nodes.forEach((a, i) => {
      nodes
        .map((b, j) => ({ j, d: a.distanceTo(b) }))
        .filter((o) => o.j > i && o.d < 6)
        .sort((x, y) => x.d - y.d)
        .slice(0, 2)
        .forEach(({ j }) => seg.push(a, nodes[j]))
    })
    const cross = []
    nodes.forEach((n) => {
      cross.push(v3([n.x - 0.18, n.y, n.z]), v3([n.x + 0.18, n.y, n.z]), v3([n.x, n.y - 0.18, n.z]), v3([n.x, n.y + 0.18, n.z]))
    })
    return { lines: new THREE.BufferGeometry().setFromPoints(seg), cross: new THREE.BufferGeometry().setFromPoints(cross) }
  }, [])
  return (
    <group>
      <lineSegments geometry={geo.lines}>
        <lineBasicMaterial color="#cfe9ff" transparent opacity={0.14} depthWrite={false} />
      </lineSegments>
      <lineSegments geometry={geo.cross}>
        <lineBasicMaterial color="#ffffff" transparent opacity={0.55} depthWrite={false} />
      </lineSegments>
    </group>
  )
}

// Cloud layer + cloud floor; hidden in orbit, fading in as the sky does.
function Clouds({ sky }) {
  const group = useRef()
  const mats = useRef([])
  const tex = useMemo(cloudPuff, [])
  const puffs = useMemo(() => {
    let s = 11
    const r = () => ((s = (s * 16807) % 2147483647) / 2147483647)
    const layer = Array.from({ length: 110 }, () => ({ p: [(r() - 0.5) * 34, -6 - r() * 13, 14 - r() * 80], s: 5 + r() * 9, o: 0.35 + r() * 0.4 }))
    const floor = Array.from({ length: 110 }, () => ({ p: [(r() - 0.5) * 44, -26.5 - r() * 2.5, 6 - r() * 120], s: 8 + r() * 10, o: 0.6 + r() * 0.3 }))
    return [...layer, ...floor]
  }, [])
  useFrame(() => {
    const k = THREE.MathUtils.smoothstep(sky.current, 0.12, 0.6)
    group.current.visible = k > 0.01
    mats.current.forEach((m, i) => m && (m.opacity = puffs[i].o * k))
  })
  return (
    <group ref={group}>
      {puffs.map((c, i) => (
        <sprite key={i} position={c.p} scale={[c.s, c.s * 0.6, 1]}>
          <spriteMaterial ref={(m) => (mats.current[i] = m)} map={tex} transparent opacity={0} depthWrite={false} color="#e9eef5" />
        </sprite>
      ))}
    </group>
  )
}

function Rays({ position }) {
  const tex = useMemo(rayTex, [])
  return (
    <group position={position}>
      {[-0.9, 0, 0.8].map((x, i) => (
        <mesh key={i} position={[x, 5.5, -0.6 + i * 0.3]} rotation={[0, 0, (i - 1) * 0.12]}>
          <planeGeometry args={[0.9 + i * 0.3, 9]} />
          <meshBasicMaterial map={tex} transparent opacity={0.22} blending={THREE.AdditiveBlending} depthWrite={false} fog={false} />
        </mesh>
      ))}
    </group>
  )
}

function Nodes({ active, sky }) {
  const group = useRef()
  const screens = useMemo(() => createScreens(), [])
  const tex = useMemo(
    () =>
      screens.laptop.map((c) => {
        const t = new THREE.CanvasTexture(c)
        t.colorSpace = THREE.SRGBColorSpace
        t.anisotropy = 8
        return t
      }),
    [screens],
  )
  const acc = useRef(0)
  const rings = useRef([])
  useFrame(({ clock }, dt) => {
    acc.current += dt
    const i = active - 4
    if (i >= 0 && i < 4 && acc.current > 0.07) {
      acc.current = 0
      screens.draw(i, clock.elapsedTime)
      tex[i].needsUpdate = true
    }
    rings.current.forEach((r, k) => r && (r.rotation.z += dt * (k % 2 ? -0.2 : 0.25)))
    group.current.visible = sky.current > 0.3
  })
  return (
    <group ref={group}>
      {NODES.map((n, i) => (
    <group key={i} position={n} rotation={[0, -SIDES[i] * 0.22, 0]}>
      <RoundedBox args={[3.9, 2.55, 0.32]} radius={0.08} smoothness={4}>
        <meshStandardMaterial color="#cfd5dc" metalness={0.75} roughness={0.32} />
      </RoundedBox>
      <mesh position={[0, 0, 0.165]}>
        <planeGeometry args={[3.6, 2.28]} />
        <meshBasicMaterial color="#05070b" />
      </mesh>
      <mesh position={[0, 0, 0.17]}>
        <planeGeometry args={[3.44, 2.15]} />
        <meshBasicMaterial map={tex[i]} toneMapped={false} />
      </mesh>
      {[
        [-1.8, 1.12],
        [1.8, 1.12],
        [-1.8, -1.12],
        [1.8, -1.12],
      ].map(([x, y], k) => (
        <mesh key={k} position={[x, y, 0.18]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 0.04, 12]} />
          <meshStandardMaterial color="#8a939f" metalness={0.9} roughness={0.2} />
        </mesh>
      ))}
      <mesh ref={(el) => (rings.current[i] = el)} position={[0, 0, -0.4]}>
        <torusGeometry args={[2.6, 0.012, 8, 160]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.55} fog={false} />
      </mesh>
      <Rays position={[0, 0, 0]} />
    </group>
      ))}
    </group>
  )
}

// Chapter indices, kept in sync with the order in chapters.js.
const CH = Object.fromEntries(chapters.map((c, i) => [c.kind === 'project' ? c.id : c.kind, i]))
const clamp01 = (x) => Math.min(1, Math.max(0, x))
const easeOut = (x) => 1 - Math.pow(1 - x, 3)
// Html "transform" maps CSS px into the scene; at this factor 200px ≈ 1 world unit.
const DF = 2

// Replays an entrance each time its chapter becomes active.
function useEntrance(on) {
  const st = useRef({ on: false, t0: 0 })
  return (t) => {
    if (on && !st.current.on) st.current = { on: true, t0: t }
    if (!on) st.current.on = false
    return st.current.on ? t - st.current.t0 : Infinity
  }
}

const REPO = { w: 1.5, h: 1.75, d: 0.7, gx: 1.75, gy: 2.0 }
const cell = (i) =>
  NARROW
    ? [ARRAY[0] + ((i % 3) - 1) * REPO.gx, ARRAY[1] + (2 - Math.floor(i / 3)) * REPO.gy + 1.6]
    : [ARRAY[0] + ((i % 5) - 2) * REPO.gx, ARRAY[1] + (1 - Math.floor(i / 5)) * REPO.gy + 0.4]

function RepoArray({ sky, active }) {
  const root = useRef()
  const blocks = useRef([])
  const strips = useRef([])
  const lift = useRef(new Array(15).fill(0))
  const [hover, setHover] = useState(-1)
  const glow = useMemo(() => glowTex('rgba(255,140,60,0.9)'), [])
  const repos = chapters[CH.array].repos
  const on = active === CH.array
  const since = useEntrance(on)

  useFrame(({ clock }, dt) => {
    root.current.visible = on && sky.current > 0.3
    const t = clock.elapsedTime
    const el = since(t)
    blocks.current.forEach((g, i) => {
      if (!g) return
      const e = easeOut(clamp01((el - 0.15 - i * 0.06) / 0.9))
      lift.current[i] = THREE.MathUtils.damp(lift.current[i], hover === i ? 0.45 : 0, 8, dt)
      const [x, y] = cell(i)
      g.position.set(x, y - (1 - e) * 1.2, ARRAY[2] - (1 - e) * 7 + lift.current[i])
      g.rotation.y = (1 - e) * (i % 2 ? 0.9 : -0.9)
      const k = hover === i ? 1.6 : 0.6 + 0.4 * Math.sin(t * 1.6 + i * 1.3)
      strips.current[i]?.color.setRGB(2 * k, 0.9 * k, 0.3 * k)
    })
  })

  return (
    <group ref={root}>
      {repos.map((r, i) => (
        <group key={r.url} ref={(g) => (blocks.current[i] = g)} position={[...cell(i), ARRAY[2]]}>
          <RoundedBox args={[REPO.w, REPO.h, REPO.d]} radius={0.05} smoothness={3}>
            <meshStandardMaterial color="#1a1d24" metalness={0.85} roughness={0.32} />
          </RoundedBox>
          <mesh position={[0, REPO.h / 2 - 0.2, REPO.d / 2 + 0.006]}>
            <planeGeometry args={[REPO.w - 0.3, 0.08]} />
            <meshBasicMaterial ref={(m) => (strips.current[i] = m)} toneMapped={false} />
          </mesh>
          {on && (
            <Html transform position={[0, -0.08, REPO.d / 2 + 0.01]} distanceFactor={DF} zIndexRange={[4, 1]}>
              <a
                className={`ob-rcard ${hover === i ? 'is-hover' : ''}`}
                href={r.url}
                target="_blank"
                rel="noreferrer"
                style={{ '--d': `${0.7 + i * 0.06}s` }}
                onPointerEnter={() => setHover(i)}
                onPointerLeave={() => setHover(-1)}
                onFocus={() => setHover(i)}
                onBlur={() => setHover(-1)}
              >
                <span className="ob-rcard__top">
                  <span>{String(i + 1).padStart(2, '0')}</span>
                  <span>{r.category}</span>
                </span>
                <b className="ob-rcard__title">{r.title}</b>
                <span className="ob-rcard__stack">{r.stack.join(' · ')}</span>
                <span className="ob-rcard__link">GitHub ↗</span>
              </a>
            </Html>
          )}
        </group>
      ))}
      <sprite position={[ARRAY[0], ARRAY[1] + 0.5, ARRAY[2] - 3]} scale={[16, 10, 1]}>
        <spriteMaterial map={glow} transparent opacity={0.5} blending={THREE.AdditiveBlending} depthWrite={false} />
      </sprite>
    </group>
  )
}

// Education: a chronology rail. Stations (oldest → newest) light up in turn,
// each with a gauge ring that fills to the score, while a pulse runs the rail.
const EDU = [0, -20, -78]
const RAIL = NARROW ? { from: 3.6, to: -3.6, at: -1.3 } : { from: -6.2, to: 6.2, at: -0.6 }
const STATIONS = NARROW ? [2.7, 0.9, -0.9, -2.7] : [-4.5, -1.5, 1.5, 4.5]
const railPoint = (u) => {
  const v = RAIL.from + (RAIL.to - RAIL.from) * u
  return NARROW ? [EDU[0] + RAIL.at, EDU[1] + v, EDU[2]] : [EDU[0] + v, EDU[1] + RAIL.at, EDU[2]]
}
const stationPos = (i) => (NARROW ? [EDU[0] + RAIL.at, EDU[1] + STATIONS[i], EDU[2]] : [EDU[0] + STATIONS[i], EDU[1] + RAIL.at, EDU[2]])
const GAUGE_R = 0.62

function Gauge({ arc }) {
  // arc: 0..1 of a full turn; geometry is rebuilt only while it changes.
  const mesh = useRef()
  const last = useRef(-1)
  useFrame(() => {
    const a = Math.max(0.002, arc.current)
    if (Math.abs(a - last.current) < 0.004) return
    last.current = a
    mesh.current.geometry.dispose()
    mesh.current.geometry = new THREE.TorusGeometry(GAUGE_R, 0.035, 10, 120, a * Math.PI * 2)
  })
  return (
    <mesh ref={mesh} rotation={[0, Math.PI, Math.PI / 2]}>
      <torusGeometry args={[GAUGE_R, 0.035, 10, 120, 0.01]} />
      <meshBasicMaterial color="#e8f6ff" toneMapped={false} />
    </mesh>
  )
}

function EducationZone({ sky, active }) {
  const root = useRef()
  const rail = useRef()
  const pulse = useRef()
  const nodes = useRef([])
  const arcs = useRef([0, 0, 0, 0].map(() => ({ current: 0 })))
  const entries = useMemo(() => [...chapters[CH.education].entries].reverse(), [])
  const on = active === CH.education
  const since = useEntrance(on)
  const len = Math.abs(RAIL.to - RAIL.from)
  const ticks = useMemo(() => {
    const pts = []
    for (let k = 0; k <= 40; k++) {
      const p = railPoint(k / 40)
      const s = k % 5 === 0 ? 0.14 : 0.06
      if (NARROW) pts.push(v3([p[0] - s, p[1], p[2]]), v3([p[0] + s, p[1], p[2]]))
      else pts.push(v3([p[0], p[1] - s, p[2]]), v3([p[0], p[1] + s, p[2]]))
    }
    return new THREE.BufferGeometry().setFromPoints(pts)
  }, [])

  useFrame(({ clock }) => {
    root.current.visible = on && sky.current > 0.3
    if (!on) return
    const t = clock.elapsedTime
    const el = since(t)
    // the rail draws itself from the oldest end
    const k = easeOut(clamp01((el - 0.1) / 1.3))
    const mid = railPoint(k / 2)
    rail.current.position.set(...mid)
    rail.current.scale.set(NARROW ? 1 : Math.max(k, 0.001), NARROW ? Math.max(k, 0.001) : 1, 1)
    // a pulse rides the rail once it is drawn
    const u = k < 1 ? k : (t * 0.22) % 1
    pulse.current.position.set(...railPoint(u))
    pulse.current.visible = el > 0.1
    nodes.current.forEach((g, i) => {
      if (!g) return
      const s = easeOut(clamp01((el - 0.45 - i * 0.32) / 0.6))
      g.scale.setScalar(Math.max(s, 0.001))
      g.rotation.z = (1 - s) * 1.2
      arcs.current[i].current = (entries[i].pct / 100) * easeOut(clamp01((el - 0.75 - i * 0.32) / 1.3))
    })
  })

  return (
    <group ref={root}>
      <mesh ref={rail}>
        <boxGeometry args={NARROW ? [0.02, len, 0.02] : [len, 0.02, 0.02]} />
        <meshBasicMaterial color="#e8f6ff" toneMapped={false} />
      </mesh>
      <lineSegments geometry={ticks}>
        <lineBasicMaterial color="#cfe9ff" transparent opacity={0.35} />
      </lineSegments>
      <mesh ref={pulse}>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshBasicMaterial color="#ffffff" toneMapped={false} />
      </mesh>
      {entries.map((e, i) => (
        <group key={e.degree} position={stationPos(i)}>
          <group ref={(g) => (nodes.current[i] = g)}>
            <mesh>
              <torusGeometry args={[GAUGE_R, 0.012, 8, 120]} />
              <meshBasicMaterial color="#cfe9ff" transparent opacity={0.28} />
            </mesh>
            <Gauge arc={arcs.current[i]} />
            <mesh>
              <sphereGeometry args={[0.13, 24, 24]} />
              <meshBasicMaterial color="#ffffff" toneMapped={false} />
            </mesh>
            <mesh>
              <sphereGeometry args={[0.3, 24, 24]} />
              <meshBasicMaterial color="#9ad9ff" transparent opacity={0.18} depthWrite={false} />
            </mesh>
          </group>
          <Line points={NARROW ? [[GAUGE_R + 0.08, 0, 0], [GAUGE_R + 0.45, 0, 0]] : [[0, -GAUGE_R - 0.08, 0], [0, -GAUGE_R - 0.5, 0]]} color="#ffffff" lineWidth={1} transparent opacity={0.7} />
          {on && (
            <>
              {!NARROW && (
                <Html position={[0, 0.98, 0]} center zIndexRange={[9, 6]}>
                  <span className="ob-eduS" style={{ '--d': `${0.9 + i * 0.32}s` }}>
                    {e.score}
                  </span>
                </Html>
              )}
              <Html position={NARROW ? [GAUGE_R + 0.55, 0, 0] : [0, -GAUGE_R - 0.6, 0]} zIndexRange={[9, 6]}>
                <div className={`ob-eduL ${NARROW ? 'ob-eduL--side' : ''}`} style={{ '--d': `${0.8 + i * 0.32}s` }}>
                  <span className="ob-eduL__years">
                    + {e.years}
                    {NARROW && <em> · {e.score}</em>}
                  </span>
                  <b className="ob-eduL__degree">{e.degree}</b>
                  <span className="ob-eduL__school">
                    {e.school}
                    {e.place ? `, ${e.place}` : ''}
                  </span>
                </div>
              </Html>
            </>
          )}
        </group>
      ))}
    </group>
  )
}

// Credentials: medallions burst out of a core and settle into a tilted orbit.
const CRED = [0, NARROW ? -12.4 : -14, -100]
const RX = NARROW ? 2.4 : 3.9
const RY = NARROW ? 2.3 : 1.8

function CredentialZone({ sky, active }) {
  const root = useRef()
  const core = useRef()
  const shell = useRef()
  const meds = useRef([])
  const items = chapters[CH.credentials].items
  const on = active === CH.credentials
  const since = useEntrance(on)
  const orbit = useMemo(() => {
    const pts = []
    for (let i = 0; i <= 96; i++) {
      const a = (i / 96) * Math.PI * 2
      pts.push(v3([CRED[0] + Math.cos(a) * RX, CRED[1] + Math.sin(a) * RY - 0.2, CRED[2] + Math.sin(a) * 1.2]))
    }
    return pts
  }, [])

  useFrame(({ clock }, dt) => {
    root.current.visible = on && sky.current > 0.3
    const t = clock.elapsedTime
    const el = since(t)
    core.current.rotation.x += dt * 0.3
    core.current.rotation.y += dt * 0.4
    shell.current.scale.setScalar(1 + Math.sin(t * 2) * 0.06)
    const base = t * 0.12
    meds.current.forEach((g, k) => {
      if (!g) return
      const e = easeOut(clamp01((el - 0.2 - k * 0.12) / 1.1))
      const a = base + (k / items.length) * Math.PI * 2
      g.position.set(CRED[0] + Math.cos(a) * RX * e, CRED[1] + (Math.sin(a) * RY - 0.2) * e, CRED[2] + Math.sin(a) * 1.2 * e)
      g.scale.setScalar(0.2 + 0.8 * e)
      g.rotation.y = Math.sin(t * 0.8 + k) * 0.35
    })
  })

  return (
    <group ref={root}>
      <Line points={orbit} color="#cfe9ff" lineWidth={1} transparent opacity={0.35} />
      <group position={CRED}>
        <mesh ref={core}>
          <icosahedronGeometry args={[1, 1]} />
          <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.55} />
        </mesh>
        <mesh ref={shell}>
          <sphereGeometry args={[0.55, 32, 32]} />
          <meshBasicMaterial color="#cfe9ff" toneMapped={false} />
        </mesh>
      </group>
      {items.map((it, k) => {
        const gold = it.type === 'Achievement'
        return (
          <group key={it.title} ref={(g) => (meds.current[k] = g)} position={CRED}>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.62, 0.62, 0.14, 6]} />
              <meshStandardMaterial color={gold ? '#c9a24f' : '#cfd6de'} metalness={0.9} roughness={0.25} />
            </mesh>
            <mesh position={[0, 0, 0.075]}>
              <torusGeometry args={[0.44, 0.025, 8, 48]} />
              <meshBasicMaterial color={gold ? '#ffd27a' : '#e8f6ff'} toneMapped={false} />
            </mesh>
            {on && (
              <Html position={[0, -0.95, 0]} center zIndexRange={[9, 6]}>
                <div className={`ob-cred ${gold ? 'ob-cred--gold' : ''}`} style={{ '--d': `${0.9 + k * 0.12}s` }}>
                  <span>{it.type}</span>
                  <b>{it.title}</b>
                  {it.sub && <small>{it.sub}</small>}
                </div>
              </Html>
            )}
          </group>
        )
      })}
    </group>
  )
}

// Camera, sky and fog, all driven by the journey progress.
function Director({ journey, sky }) {
  const { camera, scene } = useThree()
  const look = useMemo(() => new THREE.Vector3(), [])
  const tmp = useMemo(() => ({ a: new THREE.Vector3(), b: new THREE.Vector3(), c: new THREE.Vector3(), d: new THREE.Vector3() }), [])
  const space = useMemo(() => new THREE.Color('#02040a'), [])
  const skyCol = useMemo(() => new THREE.Color('#93a6bc'), [])
  useLayoutEffect(() => {
    scene.background = new THREE.Color('#02040a')
    scene.fog = new THREE.FogExp2('#02040a', 0)
  }, [scene])

  useFrame((state, dt) => {
    const j = journey.current
    j.progress = prefersReducedMotion() ? j.target : THREE.MathUtils.damp(j.progress, j.target, 1.6, dt)
    const p = Math.min(Math.max(j.progress + 1, 0), KEYS.length - 1)
    const k0 = Math.floor(p)
    const k1 = Math.min(k0 + 1, KEYS.length - 1)
    const t = smooth(p - k0)
    tmp.a.fromArray(KEYS[k0].pos)
    tmp.b.fromArray(KEYS[k1].pos)
    tmp.c.fromArray(KEYS[k0].look)
    tmp.d.fromArray(KEYS[k1].look)
    const time = state.clock.elapsedTime
    const px = pointer.active ? pointer.x : 0
    const py = pointer.active ? pointer.y : 0
    camera.position.lerpVectors(tmp.a, tmp.b, t)
    camera.position.x += Math.sin(time * 0.2) * 0.08 + px * 0.35
    camera.position.y += Math.cos(time * 0.17) * 0.06 + py * 0.2
    look.lerpVectors(tmp.c, tmp.d, t)
    camera.lookAt(look)

    const s = THREE.MathUtils.smoothstep(-camera.position.y, 1.5, 6.5) // 0 in orbit, 1 in the sky
    sky.current = s
    scene.background.lerpColors(space, skyCol, s)
    scene.fog.color.copy(scene.background)
    scene.fog.density = s * 0.03
    // Wind is loudest inside the cloud layer.
    j.onSky?.(THREE.MathUtils.smoothstep(-camera.position.y, 5, 8) * (1 - THREE.MathUtils.smoothstep(-camera.position.y, 18, 21)))
  })
  return null
}

function Starfield({ sky }) {
  const g = useRef()
  useFrame(() => {
    g.current.visible = sky.current < 0.7
  })
  return (
    <group ref={g}>
      <Stars radius={90} depth={50} count={4000} factor={3.2} saturation={0} fade speed={0.3} />
      <Constellation />
    </group>
  )
}

export default function OrbitScene({ journey, active, onReady }) {
  const sky = useRef(0)
  const narrow = typeof window !== 'undefined' && window.innerWidth < 760
  return (
    <Canvas
      className="ob-canvas"
      camera={{ position: KEYS[0].pos, fov: narrow ? 60 : 42, near: 0.1, far: 400 }}
      dpr={[1, 1.6]}
      gl={{ antialias: true, powerPreference: 'high-performance' }}
      onCreated={() => onReady?.()}
    >
      <Director journey={journey} sky={sky} />
      <ambientLight intensity={0.35} />
      <directionalLight position={[-6, 8, 6]} intensity={2.2} color="#fff6e8" />
      <Environment resolution={256} frames={1}>
        <Lightformer form="rect" intensity={3} color="#ffffff" position={[-4, 6, 4]} scale={[10, 4, 1]} />
        <Lightformer form="rect" intensity={2} color="#9ad9ff" position={[6, -2, 3]} rotation-y={-Math.PI / 2} scale={[6, 6, 1]} />
        <Lightformer form="ring" intensity={1.5} color="#4da6ff" position={[0, -6, -6]} scale={8} />
      </Environment>
      <Starfield sky={sky} />
      <Earth sky={sky} />
      <Satellite active={active} />
      <Clouds sky={sky} />
      <Nodes active={active} sky={sky} />
      <RepoArray sky={sky} active={active} />
      <EducationZone sky={sky} active={active} />
      <CredentialZone sky={sky} active={active} />
      {!narrow && (
        <EffectComposer multisampling={4}>
          <Bloom mipmapBlur intensity={0.55} luminanceThreshold={0.62} luminanceSmoothing={0.2} />
          <Vignette offset={0.3} darkness={0.7} />
        </EffectComposer>
      )}
    </Canvas>
  )
}
