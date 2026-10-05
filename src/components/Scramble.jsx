import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { prefersReducedMotion } from '../lib/motion.js'

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>/{}[]=+*#_'

// Decodes text from random glyphs when it scrolls into view or changes.
export default function Scramble({ text, className, duration = 800, as: Tag = 'span' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const [out, setOut] = useState(text)

  useEffect(() => {
    if (!inView || prefersReducedMotion()) {
      setOut(text)
      return
    }
    let raf
    const start = performance.now()
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1)
      const shown = Math.floor(p * text.length)
      let s = ''
      for (let i = 0; i < text.length; i++) {
        const ch = text[i]
        s += i < shown || ch === ' ' ? ch : GLYPHS[(Math.random() * GLYPHS.length) | 0]
      }
      setOut(s)
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [text, inView, duration])

  return (
    <Tag ref={ref} className={className} aria-label={text}>
      <span aria-hidden="true">{out}</span>
    </Tag>
  )
}
