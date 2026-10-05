import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { prefersReducedMotion } from '../lib/motion.js'
import { world } from '../three/store.js'

const LINES = ['compiling shaders', 'spawning particles', 'assembling devices', 'syncing scroll']

// Counts up while the 3D world boots; finishes once its first frame renders
// (or after a few seconds, so the page is never held hostage).
export default function Loader({ onDone }) {
  const [count, setCount] = useState(0)
  const [done, setDone] = useState(false)
  const doneRef = useRef(onDone)

  useEffect(() => {
    if (prefersReducedMotion()) {
      setDone(true)
      doneRef.current()
      return
    }
    let raf
    let timer
    const start = performance.now()
    const tick = (now) => {
      const el = now - start
      const soft = Math.min(el / 1600, 1)
      const target = world.ready || el > 6000 ? 100 : Math.round((1 - Math.pow(1 - soft, 3)) * 90)
      setCount((c) => Math.min(100, Math.max(c, c + Math.ceil((target - c) * 0.18))))
      if (target === 100 && el > 1400) {
        setCount(100)
        timer = setTimeout(() => {
          setDone(true)
          doneRef.current()
        }, 300)
        return
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(timer)
    }
  }, [])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="loader"
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          aria-hidden="true"
        >
          <div className="loader__core">
            <span className="loader__ring" />
            <span className="loader__count">{String(count).padStart(3, '0')}</span>
          </div>
          <p className="loader__name">Gowtham K R</p>
          <p className="loader__log">{LINES[Math.min(LINES.length - 1, Math.floor(count / 26))]}…</p>
          <div className="loader__bar">
            <span style={{ transform: `scaleX(${count / 100})` }} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
