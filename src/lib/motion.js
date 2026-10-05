export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export const ease = [0.22, 1, 0.36, 1]

// Window-wide pointer in normalized device coords (-1..1), so 3D scenes
// can react to the mouse even when the canvas sits behind other content.
export const pointer = { x: 0, y: 0, active: false }
if (typeof window !== 'undefined') {
  window.addEventListener(
    'pointermove',
    (e) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1
      pointer.y = -(e.clientY / window.innerHeight) * 2 + 1
      pointer.active = true
    },
    { passive: true },
  )
  document.addEventListener('pointerleave', () => (pointer.active = false))
}

export function scrollToId(id) {
  const el = document.getElementById(id)
  if (!el) return
  if (window.__lenis) window.__lenis.scrollTo(el, { offset: id === 'home' ? 0 : -72 })
  else el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
}
