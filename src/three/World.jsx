import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, Lightformer, PerformanceMonitor } from '@react-three/drei'
import { Bloom, EffectComposer, Vignette } from '@react-three/postprocessing'
import * as THREE from 'three'
import Particles from './Particles.jsx'
import Devices from './Devices.jsx'
import SkillOrbit from './SkillOrbit.jsx'
import { SECTION_IDS, isNarrow, world } from './store.js'
import { WORLD_THEMES } from './themes.js'
import { pointer, prefersReducedMotion } from '../lib/motion.js'

const smooth = (a, b, x) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)))
  return t * t * (3 - 2 * t)
}

// Maps page scroll to the world's state: which shape to show, and where the
// pinned projects sequence is.
function ScrollDriver() {
  const anchors = useRef([])
  const invalidate = useThree((s) => s.invalidate)

  useEffect(() => {
    const measure = () => {
      anchors.current = SECTION_IDS.map((id) => {
        const el = document.getElementById(id)
        return el ? { top: el.getBoundingClientRect().top + window.scrollY, h: el.offsetHeight } : null
      })
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(document.body)
    window.addEventListener('resize', measure)
    window.addEventListener('scroll', invalidate, { passive: true })
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
      window.removeEventListener('scroll', invalidate)
    }
  }, [invalidate])

  useFrame((_, dt) => {
    const a = anchors.current
    if (a.length !== SECTION_IDS.length || a.some((x) => !x)) return
    const y = window.scrollY
    const vh = window.innerHeight
    let s = 0
    for (let i = 0; i < a.length - 1; i++) {
      const b = a[i + 1].top - vh * 0.45
      s += smooth(b - vh * 0.35, b + vh * 0.35, y)
    }
    world.section = prefersReducedMotion() ? s : THREE.MathUtils.damp(world.section, s, 3.5, dt)

    const pr = a[SECTION_IDS.indexOf('projects')]
    world.projects.progress = Math.min(1, Math.max(0, (y - pr.top) / (pr.h - vh)))
    const enterIn = (y - (pr.top - vh * 0.85)) / (vh * 0.85)
    const exitOut = (pr.top + pr.h - vh * 0.15 - y) / (vh * 0.85)
    world.projects.enter = Math.min(1, Math.max(0, Math.min(enterIn, exitOut)))
  })
  return null
}

// Eases every object toward the cursor: shapes turn to face it and drift
// after it. Settles back to centre when the mouse leaves (or on touch).
function MouseRig() {
  useFrame(({ camera }, dt) => {
    const on = pointer.active && !prefersReducedMotion()
    const px = on ? pointer.x : 0
    const py = on ? pointer.y : 0
    const m = world.mouse
    m.yaw = THREE.MathUtils.damp(m.yaw, px * 0.6, 2.5, dt)
    m.pitch = THREE.MathUtils.damp(m.pitch, -py * 0.38, 2.5, dt)
    m.x = THREE.MathUtils.damp(m.x, px * 0.55, 2, dt)
    m.y = THREE.MathUtils.damp(m.y, py * 0.32, 2, dt)
    // A touch of camera parallax for depth.
    camera.position.x = THREE.MathUtils.damp(camera.position.x, px * 0.2, 2, dt)
    camera.position.y = THREE.MathUtils.damp(camera.position.y, py * 0.12, 2, dt)
    camera.lookAt(0, 0, 0)
  })
  return null
}

function Ready() {
  const done = useRef(false)
  useFrame(() => {
    if (!done.current) {
      done.current = true
      world.ready = true
    }
  })
  return null
}

export default function World() {
  const look = WORLD_THEMES.neon

  const narrow = isNarrow()
  const reduced = prefersReducedMotion()
  const [dpr, setDpr] = useState(1.5)

  return (
    <div className="world" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 11], fov: 45 }}
        dpr={[1, dpr]}
        frameloop={reduced ? 'demand' : 'always'}
        gl={{ antialias: narrow, powerPreference: 'high-performance', alpha: false }}
      >
        <color attach="background" args={[look.bg]} />
        <PerformanceMonitor onDecline={() => setDpr(1)} />
        <ScrollDriver />
        <MouseRig />
        <Ready />
        <Particles count={narrow ? 7000 : 16000} />
        <SkillOrbit />
        <Devices />
        <ambientLight intensity={0.25} />
        <Environment resolution={256} frames={1}>
          <Lightformer form="rect" intensity={2.5} color="#ffffff" position={[0, 5, 3]} rotation-x={Math.PI / 2} scale={[10, 3, 1]} />
          <Lightformer form="rect" intensity={5} color="#22d3ee" position={[-6, 1, 2]} rotation-y={Math.PI / 2} scale={[5, 6, 1]} />
          <Lightformer form="rect" intensity={5} color="#f472b6" position={[6, 0, 2]} rotation-y={-Math.PI / 2} scale={[5, 6, 1]} />
          <Lightformer form="ring" intensity={3} color="#8b5cf6" position={[0, 2, -8]} scale={6} />
        </Environment>
        {!narrow && look.bloom && (
          <EffectComposer multisampling={4}>
            <Bloom mipmapBlur intensity={0.85} luminanceThreshold={0.18} luminanceSmoothing={0.25} radius={0.75} />
            <Vignette offset={0.25} darkness={0.75} />
          </EffectComposer>
        )}
      </Canvas>
    </div>
  )
}
