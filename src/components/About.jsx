import { useEffect, useRef } from 'react'
import { animate, motion, useInView, useScroll, useTransform } from 'framer-motion'
import { profile, stats } from '../data/resume.js'
import { Reveal, SectionHeading } from './Reveal.jsx'
import HoloCard from './HoloCard.jsx'

function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.12, 1])
  const y = useTransform(progress, range, [8, 0])
  return (
    <>
      <motion.span className="scroll-text__word" style={{ opacity, y }}>
        {children}
      </motion.span>{' '}
    </>
  )
}

function ScrollText({ text }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] })
  const words = text.split(' ')
  return (
    <p ref={ref} className="scroll-text">
      {words.map((w, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
          {w}
        </Word>
      ))}
    </p>
  )
}

function Counter({ value, suffix, plain }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  useEffect(() => {
    if (!inView) return
    const c = animate(plain ? value - 12 : 0, value, {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => ref.current && (ref.current.textContent = Math.round(v) + suffix),
    })
    return () => c.stop()
  }, [inView, value, suffix, plain])
  return (
    <span ref={ref} className="stat__value">
      {plain ? value : 0}
      {suffix}
    </span>
  )
}

export default function About() {
  return (
    <section id="about" className="section about">
      <div className="container about__grid">
        <Reveal className="about__card" y={80}>
          <HoloCard />
        </Reveal>
        <div className="about__body">
          <SectionHeading index="01" kicker="About me" title="Turning messy processes into real-time software." />
          <ScrollText text={profile.summary} />
          <div className="about__stats">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08} className="stat">
                <Counter value={s.value} suffix={s.suffix} plain={s.plain} />
                <span className="stat__label">{s.label}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
