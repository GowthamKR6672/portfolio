import { useRef } from 'react'

export default function Magnetic({ children, strength = 0.3 }) {
  const ref = useRef(null)
  const onMove = (e) => {
    if (e.pointerType !== 'mouse') return
    const r = ref.current.getBoundingClientRect()
    const x = (e.clientX - (r.left + r.width / 2)) * strength
    const y = (e.clientY - (r.top + r.height / 2)) * strength
    ref.current.style.transform = `translate3d(${x}px, ${y}px, 0)`
  }
  const onLeave = () => {
    ref.current.style.transform = ''
  }
  return (
    <span ref={ref} className="magnetic" onPointerMove={onMove} onPointerLeave={onLeave}>
      {children}
    </span>
  )
}
