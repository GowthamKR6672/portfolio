import { useRef } from 'react'
import { motion, useAnimationFrame, useMotionValue, useScroll, useSpring, useTransform, useVelocity } from 'framer-motion'

const wrap = (min, max, v) => {
  const r = max - min
  return ((((v - min) % r) + r) % r) + min
}

// Endless text band that speeds up, reverses and skews with scroll velocity.
export default function VelocityMarquee({ children, baseVelocity = -2.5, className = '' }) {
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const velocity = useVelocity(scrollY)
  const smooth = useSpring(velocity, { damping: 50, stiffness: 400 })
  const factor = useTransform(smooth, [0, 1000], [0, 4], { clamp: false })
  const skewX = useTransform(smooth, [-2500, 2500], [10, -10])
  const x = useTransform(baseX, (v) => `${wrap(-50, -25, v)}%`)
  const dir = useRef(1)

  useAnimationFrame((_, delta) => {
    let move = dir.current * baseVelocity * (delta / 1000)
    const f = factor.get()
    if (f < 0) dir.current = -1
    else if (f > 0) dir.current = 1
    move += dir.current * move * f
    baseX.set(baseX.get() + move)
  })

  return (
    <div className={`vmarquee ${className}`} aria-hidden="true">
      <motion.div className="vmarquee__track" style={{ x, skewX }}>
        {[0, 1, 2, 3].map((i) => (
          <span key={i}>{children}</span>
        ))}
      </motion.div>
    </div>
  )
}
