import { useEffect, useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { buildShapes, layoutFor, PALETTE } from './shapes.js'
import { WORLD_THEMES } from './themes.js'
import { particleFragment, particleVertex } from './particleShaders.js'
import { isNarrow, world } from './store.js'

export default function Particles({ count, theme = 'neon' }) {
  const look = WORLD_THEMES[theme]
  const mat = useRef()
  const { size, gl } = useThree()

  const geometry = useMemo(() => {
    const shapes = buildShapes(count)
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(shapes[0], 3))
    shapes.slice(1).forEach((s, i) => g.setAttribute(`aS${i + 1}`, new THREE.BufferAttribute(s, 3)))
    const r = new Float32Array(count)
    for (let i = 0; i < count; i++) r[i] = Math.random()
    g.setAttribute('aRandom', new THREE.BufferAttribute(r, 1))
    return g
  }, [count])

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uProgress: { value: 0 },
      uSize: { value: 5.5 },
      uPixelRatio: { value: 1 },
      uDim: { value: 1 },
      uTilt: { value: new THREE.Vector4(1, 0, 1, 0) },
      uShift: { value: new THREE.Vector2() },
      uLayout: { value: Array.from({ length: 8 }, () => new THREE.Vector4()) },
      uRot: { value: Array.from({ length: 8 }, () => new THREE.Vector2(1, 0)) },
      uColA: { value: PALETTE.map(([a]) => new THREE.Color(a)) },
      uColB: { value: PALETTE.map(([, b]) => new THREE.Color(b)) },
    }),
    [],
  )
  const spins = useRef(new Array(8).fill(0))
  const layout = useRef(layoutFor(isNarrow()))

  // R3F copies each uniform when applying the prop, so always write through
  // the material's own uniforms rather than the object passed in.
  useEffect(() => {
    const u = mat.current.uniforms
    const narrow = isNarrow()
    layout.current = layoutFor(narrow).map((l, k) => (!narrow && look.layout?.[k]) || l)
    layout.current.forEach(([x, y, z, s], k) => u.uLayout.value[k].set(x, y, z, s))
    u.uPixelRatio.value = gl.getPixelRatio()
    u.uSize.value = (isNarrow() ? 4.6 : 5.5) * look.size
    // Text sits over the particles on small screens, so tone them down there.
    u.uDim.value = (isNarrow() ? 0.55 : 1) * look.dim
    look.palette.forEach(([a, b], k) => {
      u.uColA.value[k].set(a)
      u.uColB.value[k].set(b)
    })
  }, [size, gl, look])

  useFrame((state, dt) => {
    const u = mat.current.uniforms
    u.uTime.value += dt
    u.uProgress.value = world.section
    const m = world.mouse
    u.uTilt.value.set(Math.cos(m.yaw), Math.sin(m.yaw), Math.cos(m.pitch), Math.sin(m.pitch))
    u.uShift.value.set(m.x, m.y)
    layout.current.forEach((l, k) => {
      spins.current[k] += dt * l[4]
      u.uRot.value[k].set(Math.cos(spins.current[k]), Math.sin(spins.current[k]))
    })
  })

  return (
    <points geometry={geometry} frustumCulled={false}>
      <shaderMaterial
        ref={mat}
        vertexShader={particleVertex}
        fragmentShader={particleFragment}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={look.blending === 'normal' ? THREE.NormalBlending : THREE.AdditiveBlending}
      />
    </points>
  )
}
