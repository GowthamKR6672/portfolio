import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, RoundedBox } from '@react-three/drei'
import * as THREE from 'three'
import { createScreens } from './screens.js'
import { isNarrow, world } from './store.js'
import { WORLD_THEMES } from './themes.js'

const screenVertex = /* glsl */ `
varying vec2 vUv;
void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
`
// Cross-fades two app screens with a short RGB-split glitch, plus faint scanlines.
const screenFragment = /* glsl */ `
uniform sampler2D uA;
uniform sampler2D uB;
uniform float uMix;
uniform float uTime;
uniform float uPower;
varying vec2 vUv;
float hash(float n){ return fract(sin(n) * 43758.5453); }
void main(){
  float g = sin(clamp(uMix, 0.0, 1.0) * 3.14159);
  vec2 uv = vUv;
  float band = hash(floor(uv.y * 36.0) + floor(uTime * 24.0));
  uv.x += (band - 0.5) * 0.06 * g * step(0.55, band);
  float k = smoothstep(0.35, 0.65, uMix);
  vec2 o = vec2(0.008 * g, 0.0);
  vec3 a = vec3(texture2D(uA, uv + o).r, texture2D(uA, uv).g, texture2D(uA, uv - o).b);
  vec3 b = vec3(texture2D(uB, uv + o).r, texture2D(uB, uv).g, texture2D(uB, uv - o).b);
  vec3 col = mix(a, b, k) + g * 0.06;
  col *= 0.95 + 0.05 * sin(vUv.y * 900.0);
  // power-on: a bright line that opens into the picture
  float open = smoothstep(0.0, 1.0, uPower);
  float lineMask = smoothstep(0.5 - open * 0.5 - 0.01, 0.5 - open * 0.5, vUv.y) * (1.0 - smoothstep(0.5 + open * 0.5, 0.5 + open * 0.5 + 0.01, vUv.y));
  col = col * lineMask * open + vec3(0.6, 0.9, 1.0) * lineMask * (1.0 - open) * step(0.01, uPower);
  gl_FragColor = vec4(col, 1.0);
  #include <colorspace_fragment>
}
`

function toTexture(canvas) {
  const t = new THREE.CanvasTexture(canvas)
  t.colorSpace = THREE.SRGBColorSpace
  t.anisotropy = 8
  return t
}

function keyboardTexture() {
  const c = document.createElement('canvas')
  c.width = 1024
  c.height = 380
  const ctx = c.getContext('2d')
  ctx.fillStyle = '#0d0f15'
  ctx.beginPath()
  ctx.roundRect(0, 0, 1024, 380, 24)
  ctx.fill()
  const rows = [14, 14, 13, 12, 11]
  rows.forEach((n, r) => {
    const kw = (1024 - 40 - (n - 1) * 8) / n
    for (let i = 0; i < n; i++) {
      const x = 20 + i * (kw + 8)
      const y = 18 + r * 70
      ctx.fillStyle = '#1b1e28'
      ctx.beginPath()
      ctx.roundRect(x, y, kw, 60, 8)
      ctx.fill()
      ctx.fillStyle = 'rgba(139,92,246,0.18)'
      ctx.fillRect(x + 6, y + 54, kw - 12, 2)
    }
  })
  const t = new THREE.CanvasTexture(c)
  t.colorSpace = THREE.SRGBColorSpace
  return t
}

function logoTexture() {
  const c = document.createElement('canvas')
  c.width = c.height = 256
  const ctx = c.getContext('2d')
  const g = ctx.createLinearGradient(0, 0, 256, 256)
  g.addColorStop(0, '#22d3ee')
  g.addColorStop(0.55, '#8b5cf6')
  g.addColorStop(1, '#f472b6')
  ctx.strokeStyle = g
  ctx.lineWidth = 26
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'
  ctx.beginPath()
  ctx.arc(128, 128, 78, -0.35, Math.PI * 1.65)
  ctx.moveTo(128, 128)
  ctx.lineTo(206, 128)
  ctx.stroke()
  const t = new THREE.CanvasTexture(c)
  t.colorSpace = THREE.SRGBColorSpace
  return t
}

function glowTexture([inner, outer]) {
  const c = document.createElement('canvas')
  c.width = c.height = 256
  const ctx = c.getContext('2d')
  const g = ctx.createRadialGradient(128, 128, 0, 128, 128, 128)
  g.addColorStop(0, inner)
  g.addColorStop(0.4, outer)
  g.addColorStop(1, 'rgba(0,0,0,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, 256, 256)
  return new THREE.CanvasTexture(c)
}

const ease = (x) => 1 - Math.pow(1 - x, 3)
const clamp01 = (x) => Math.min(1, Math.max(0, x))

export default function Devices({ theme = 'neon' }) {
  const group = useRef()
  const lid = useRef()
  const glow = useRef()
  const laptopMat = useRef()
  const phoneMat = useRef()
  const screens = useMemo(() => createScreens(), [])
  const tex = useMemo(() => ({ laptop: screens.laptop.map(toTexture), phone: screens.phone.map(toTexture) }), [screens])
  const keyboard = useMemo(keyboardTexture, [])
  const logo = useMemo(logoTexture, [])
  const glowMap = useMemo(() => glowTexture(WORLD_THEMES[theme].glow), [theme])
  const laptopU = useMemo(() => ({ uA: { value: tex.laptop[0] }, uB: { value: tex.laptop[0] }, uMix: { value: 1 }, uTime: { value: 0 }, uPower: { value: 0 } }), [tex])
  const phoneU = useMemo(() => ({ uA: { value: tex.phone[0] }, uB: { value: tex.phone[0] }, uMix: { value: 1 }, uTime: { value: 0 }, uPower: { value: 0 } }), [tex])
  const s = useRef({ from: 0, to: 0, mix: 1, acc: 0 })

  useFrame(({ clock }, dt) => {
    const { enter, progress } = world.projects
    const g = group.current
    g.visible = enter > 0.002
    if (!g.visible) return
    const t = clock.elapsedTime
    const e = ease(enter)
    const narrow = isNarrow()

    const bx = narrow ? -0.5 : 2.45
    const by = narrow ? 1.35 : -0.8
    const m = world.mouse
    g.position.set(bx + m.x * 0.6, by + m.y * 0.6 - (1 - e) * 7, 0)
    g.scale.setScalar((narrow ? 0.64 : 1.22) * (0.75 + 0.25 * e))
    const idx = Math.min(3, Math.floor(progress * 4))
    const sway = idx % 2 ? 0.1 : -0.1
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, -0.42 + sway - (1 - e) * 1.4 + m.yaw * 0.55, 3, dt)
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, 0.22 + m.pitch * 0.4, 3, dt)

    const open = clamp01((enter - 0.3) / 0.7)
    lid.current.rotation.x = THREE.MathUtils.lerp(Math.PI / 2 - 0.02, -0.3, ease(open))
    const power = clamp01((open - 0.55) / 0.45)
    glow.current.material.opacity = 0.55 * e

    world.projects.active = idx
    const st = s.current
    if (idx !== st.to) {
      st.from = st.mix < 0.5 ? st.from : st.to
      st.to = idx
      st.mix = 0
    }
    st.mix = Math.min(1, st.mix + dt * 1.8)

    // Redraw the live screens at ~20fps.
    st.acc += dt
    if (st.acc > 0.05) {
      st.acc = 0
      const ids = st.mix < 1 ? [st.from, st.to] : [st.to]
      ids.forEach((i) => {
        screens.draw(i, t)
        tex.laptop[i].needsUpdate = true
        tex.phone[i].needsUpdate = true
      })
    }
    // R3F copies uniforms on mount, so write through the live materials.
    const lu = laptopMat.current.uniforms
    const pu = phoneMat.current.uniforms
    for (const u of [lu, pu]) {
      u.uTime.value = t
      u.uMix.value = st.mix
      u.uPower.value = power
    }
    lu.uA.value = tex.laptop[st.from]
    lu.uB.value = tex.laptop[st.to]
    pu.uA.value = tex.phone[st.from]
    pu.uB.value = tex.phone[st.to]
  })

  const body = <meshStandardMaterial color="#2a2e3b" metalness={0.85} roughness={0.32} envMapIntensity={1.2} />

  return (
    <group ref={group} visible={false}>
      {/* soft floor glow */}
      <mesh ref={glow} rotation-x={-Math.PI / 2} position={[0, -0.02, 0.2]} scale={[7, 5, 1]}>
        <planeGeometry />
        <meshBasicMaterial map={glowMap} transparent depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>

      {/* laptop base */}
      <RoundedBox args={[3.6, 0.1, 2.4]} radius={0.045} smoothness={4} position={[0, 0.05, 0]}>
        {body}
      </RoundedBox>
      <mesh rotation-x={-Math.PI / 2} position={[0, 0.101, -0.36]}>
        <planeGeometry args={[3.15, 1.17]} />
        <meshStandardMaterial map={keyboard} roughness={0.7} metalness={0.2} />
      </mesh>
      <mesh rotation-x={-Math.PI / 2} position={[0, 0.101, 0.7]}>
        <planeGeometry args={[1.2, 0.72]} />
        <meshStandardMaterial color="#232733" metalness={0.75} roughness={0.22} />
      </mesh>

      {/* lid — pivots on the back edge */}
      <group ref={lid} position={[0, 0.1, -1.2]} rotation-x={Math.PI / 2}>
        <RoundedBox args={[3.6, 2.34, 0.06]} radius={0.04} smoothness={4} position={[0, 1.17, -0.03]}>
          {body}
        </RoundedBox>
        <mesh position={[0, 1.17, 0.001]}>
          <planeGeometry args={[3.5, 2.26]} />
          <meshBasicMaterial color="#030407" />
        </mesh>
        <mesh position={[0, 1.2, 0.002]}>
          <planeGeometry args={[3.36, 2.1]} />
          <shaderMaterial ref={laptopMat} vertexShader={screenVertex} fragmentShader={screenFragment} uniforms={laptopU} toneMapped={false} />
        </mesh>
        <mesh position={[0, 1.17, -0.062]} rotation-y={Math.PI}>
          <planeGeometry args={[0.42, 0.42]} />
          <meshBasicMaterial map={logo} transparent toneMapped={false} />
        </mesh>
      </group>

      {/* phone */}
      <Float speed={1.6} rotationIntensity={0.25} floatIntensity={0.5}>
        <group position={[2.35, 1.05, 0.95]} rotation={[0.06, -0.5, 0.05]}>
          <RoundedBox args={[0.8, 1.66, 0.085]} radius={0.11} smoothness={5}>
            <meshStandardMaterial color="#181b24" metalness={0.8} roughness={0.28} envMapIntensity={1.4} />
          </RoundedBox>
          <mesh position={[0, 0, 0.0435]}>
            <planeGeometry args={[0.74, 1.555]} />
            <shaderMaterial ref={phoneMat} vertexShader={screenVertex} fragmentShader={screenFragment} uniforms={phoneU} toneMapped={false} />
          </mesh>
          <mesh position={[0.18, 0.62, -0.05]}>
            <boxGeometry args={[0.3, 0.3, 0.03]} />
            <meshStandardMaterial color="#101219" metalness={0.9} roughness={0.2} />
          </mesh>
        </group>
      </Float>
    </group>
  )
}
