import { Component, Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Center, Environment, Float, Lightformer, Text3D } from '@react-three/drei'
import * as THREE from 'three'
import { pointer } from '../../lib/motion.js'

const FONT = 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/fonts/helvetiker_bold.typeface.json'

class Quiet extends Component {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  render() {
    return this.state.failed ? null : this.props.children
  }
}

function Monogram() {
  const g = useRef()
  useFrame((_, dt) => {
    const on = pointer.active
    g.current.rotation.y = THREE.MathUtils.damp(g.current.rotation.y, (on ? pointer.x : 0) * 0.55 - 0.18, 2.5, dt)
    g.current.rotation.x = THREE.MathUtils.damp(g.current.rotation.x, (on ? -pointer.y : 0) * 0.3, 2.5, dt)
  })
  return (
    <group ref={g}>
      <Float speed={1.4} rotationIntensity={0.15} floatIntensity={0.5}>
        <Center>
          <Text3D font={FONT} size={2.6} height={0.85} curveSegments={24} bevelEnabled bevelThickness={0.08} bevelSize={0.05} bevelSegments={8}>
            G
            <meshPhysicalMaterial color="#121211" metalness={0.55} roughness={0.22} clearcoat={1} clearcoatRoughness={0.15} />
          </Text3D>
        </Center>
      </Float>
    </group>
  )
}

// Studio's hero centrepiece: a glossy 3D "G" that turns toward the cursor.
// (Swap for a portrait by setting profile.photo in src/data/resume.js.)
export default function Centerpiece() {
  return (
    <Quiet>
      <Canvas camera={{ position: [0, 0, 7], fov: 35 }} dpr={[1, 1.75]} gl={{ alpha: true, antialias: true }}>
        <Suspense fallback={null}>
          <Monogram />
          <Environment resolution={256} frames={1}>
            <Lightformer form="rect" intensity={3} color="#ffffff" position={[0, 4, 4]} scale={[8, 3, 1]} />
            <Lightformer form="rect" intensity={6} color="#ffff23" position={[-5, 0, 2]} rotation-y={Math.PI / 2} scale={[4, 8, 1]} />
            <Lightformer form="rect" intensity={2} color="#ffffff" position={[5, -1, 2]} rotation-y={-Math.PI / 2} scale={[4, 6, 1]} />
          </Environment>
        </Suspense>
      </Canvas>
    </Quiet>
  )
}
