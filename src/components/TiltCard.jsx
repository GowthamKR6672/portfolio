import { useRef } from 'react'

// Pointer-driven 3D tilt with a moving glare highlight (mouse only).
export default function TiltCard({ children, className = '', max = 10, glare = true, as: Tag = 'div', ...rest }) {
  const ref = useRef(null)

  const onMove = (e) => {
    if (e.pointerType !== 'mouse') return
    const el = ref.current
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    el.style.setProperty('--rx', `${(0.5 - py) * max}deg`)
    el.style.setProperty('--ry', `${(px - 0.5) * max}deg`)
    el.style.setProperty('--gx', `${px * 100}%`)
    el.style.setProperty('--gy', `${py * 100}%`)
    el.classList.add('is-tilting')
  }
  const onLeave = () => {
    const el = ref.current
    el.style.setProperty('--rx', '0deg')
    el.style.setProperty('--ry', '0deg')
    el.classList.remove('is-tilting')
  }

  return (
    <Tag ref={ref} className={`tilt ${className}`} onPointerMove={onMove} onPointerLeave={onLeave} {...rest}>
      {children}
      {glare && <span className="tilt__glare" aria-hidden="true" />}
    </Tag>
  )
}
