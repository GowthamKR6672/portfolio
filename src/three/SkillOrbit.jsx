import { useEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { sphereSkills } from '../data/resume.js'
import { layoutFor } from './shapes.js'
import { isNarrow, world } from './store.js'
import { WORLD_THEMES } from './themes.js'

const W = 192
const H = 240

function drawBadge(canvas, skill, img, look = WORLD_THEMES.neon.badge) {
  const ctx = canvas.getContext('2d')
  ctx.clearRect(0, 0, W, H)
  ctx.beginPath()
  ctx.arc(96, 92, 80, 0, Math.PI * 2)
  ctx.fillStyle = look.fill
  ctx.fill()
  const g = ctx.createLinearGradient(16, 12, 176, 172)
  g.addColorStop(0, look.ring[0])
  g.addColorStop(0.55, look.ring[1])
  g.addColorStop(1, look.ring[2])
  ctx.lineWidth = 5
  ctx.strokeStyle = g
  ctx.stroke()
  if (img) {
    ctx.save()
    if (skill.invert) ctx.filter = 'invert(1) brightness(1.2)'
    ctx.drawImage(img, 50, 46, 92, 92)
    ctx.restore()
  } else {
    ctx.font = '600 52px "JetBrains Mono", monospace'
    ctx.fillStyle = look.ring[0]
    ctx.textAlign = 'center'
    ctx.fillText(skill.glyph || skill.name.slice(0, 2), 96, 110)
  }
  ctx.font = '600 28px "Space Grotesk", system-ui, sans-serif'
  ctx.fillStyle = look.text
  ctx.textAlign = 'center'
  ctx.fillText(skill.name, 96, 228)
}

// SVGs without width/height can't be drawn to canvas in every browser,
// so fetch the markup, give it a size and load it from a blob URL.
async function loadIcon(url) {
  const svg = await (await fetch(url)).text()
  const sized = svg.replace(/<svg\b/, '<svg width="128" height="128"')
  const blobUrl = URL.createObjectURL(new Blob([sized], { type: 'image/svg+xml' }))
  const img = new Image()
  img.src = blobUrl
  await img.decode()
  return img
}

export default function SkillOrbit({ theme = 'neon' }) {
  const group = useRef()
  const spin = useRef(0)
  const sprites = useRef([])
  const items = useMemo(
    () =>
      sphereSkills.map((s) => {
        const canvas = document.createElement('canvas')
        canvas.width = W
        canvas.height = H
        drawBadge(canvas, s)
        const tex = new THREE.CanvasTexture(canvas)
        tex.colorSpace = THREE.SRGBColorSpace
        return { skill: s, canvas, tex }
      }),
    [],
  )
  const positions = useMemo(() => {
    const n = items.length
    return items.map((_, i) => {
      const y = 1 - ((i + 0.5) / n) * 2
      const r = Math.sqrt(1 - y * y)
      const th = i * Math.PI * (3 - Math.sqrt(5))
      return new THREE.Vector3(Math.cos(th) * r, y, Math.sin(th) * r).multiplyScalar(3.25)
    })
  }, [items])

  const look = useRef(WORLD_THEMES[theme].badge)
  const redraw = (it) => {
    drawBadge(it.canvas, it.skill, it.img, look.current)
    it.tex.needsUpdate = true
  }

  useEffect(() => {
    let alive = true
    document.fonts?.ready.then(() => alive && items.forEach(redraw))
    items.forEach((it) => {
      if (!it.skill.icon) return
      loadIcon(it.skill.icon)
        .then((img) => {
          if (!alive) return
          it.img = img
          redraw(it)
        })
        .catch(() => {})
    })
    return () => {
      alive = false
    }
  }, [items])

  // Restyle the badges when the theme changes.
  useEffect(() => {
    look.current = WORLD_THEMES[theme].badge
    items.forEach(redraw)
  }, [theme, items])

  useFrame(({ clock }, dt) => {
    const w = Math.max(0, 1 - Math.abs(world.section - 2) * 1.4)
    const g = group.current
    g.visible = w > 0.01
    if (!g.visible) return
    const [x, y, z, scale] = layoutFor(isNarrow())[2]
    const m = world.mouse
    g.position.set(x + m.x, y + m.y, z)
    g.scale.setScalar(scale * (0.7 + 0.3 * w))
    spin.current += dt * 0.16
    g.rotation.y = spin.current + m.yaw
    g.rotation.x = Math.sin(clock.elapsedTime * 0.2) * 0.18 + m.pitch
    const hl = world.skillHover
    sprites.current.forEach((sp, i) => {
      if (!sp) return
      const match = !hl || items[i].skill.group === hl
      const target = (hl && match ? 0.86 : match ? 0.66 : 0.5) * w
      const sc = THREE.MathUtils.damp(sp.scale.x / 0.8, target, 6, dt)
      sp.scale.set(sc * 0.8, sc, 1)
      sp.material.opacity = THREE.MathUtils.damp(sp.material.opacity, w * (match ? 1 : 0.22), 6, dt)
    })
  })

  return (
    <group ref={group} visible={false}>
      {items.map((it, i) => (
        <sprite key={it.skill.name} ref={(el) => (sprites.current[i] = el)} position={positions[i]} scale={[0.5, 0.62, 1]}>
          <spriteMaterial map={it.tex} transparent opacity={0} depthWrite={false} toneMapped={false} />
        </sprite>
      ))}
    </group>
  )
}
