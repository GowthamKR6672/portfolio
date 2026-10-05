import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { profile } from '../data/resume.js'
import { ease, scrollToId } from '../lib/motion.js'
import Magnetic from './Magnetic.jsx'
import Scramble from './Scramble.jsx'
import VelocityMarquee from './VelocityMarquee.jsx'
import { ArrowDown, ArrowUpRight, Download, GitHub } from './Icons.jsx'

function SplitWord({ text, delay, ready, className = '' }) {
  return (
    <span className={`hero__word ${className}`} aria-hidden="true">
      {text.split('').map((ch, i) => (
        <span className="mask" key={i}>
          <motion.span
            className="mask__inner"
            initial={{ y: '115%', rotate: 10 }}
            animate={ready ? { y: 0, rotate: 0 } : undefined}
            transition={{ duration: 1.1, delay: delay + i * 0.05, ease }}
          >
            {ch === ' ' ? ' ' : ch}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

function RoleCycle({ roles }) {
  const [i, setI] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % roles.length), 2800)
    return () => clearInterval(id)
  }, [roles.length])
  return (
    <span className="role">
      <span className="role__prompt">~/gowtham $</span>
      <Scramble text={roles[i]} className="role__text" duration={600} />
      <span className="role__caret" />
    </span>
  )
}

const chips = [
  { k: 'Live', v: 'Real-time business apps', cls: 'chip3d--a' },
  { k: '40+', v: 'US websites migrated', cls: 'chip3d--b' },
  { k: 'Stack', v: 'React · Node · Kotlin · Python', cls: 'chip3d--c' },
]

export default function Hero({ ready }) {
  const chipsRef = useRef(null)

  // Floating chips drift against the cursor for depth.
  useEffect(() => {
    const el = chipsRef.current
    const move = (e) => {
      const x = e.clientX / window.innerWidth - 0.5
      const y = e.clientY / window.innerHeight - 0.5
      el?.style.setProperty('--px', x.toFixed(3))
      el?.style.setProperty('--py', y.toFixed(3))
    }
    window.addEventListener('pointermove', move, { passive: true })
    return () => window.removeEventListener('pointermove', move)
  }, [])

  const fade = (d) => ({
    initial: { opacity: 0, y: 24 },
    animate: ready ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: 1, delay: d, ease },
  })

  return (
    <section id="home" className="hero">
      <div className="container hero__inner">
        <motion.p className="eyebrow" {...fade(0.1)}>
          <span className="pulse-dot" /> Open to full-stack & automation roles
        </motion.p>

        <h1 className="hero__title" aria-label={profile.name}>
          <SplitWord text="Gowtham" delay={0.2} ready={ready} />
          <SplitWord text="K R." delay={0.55} ready={ready} className="hero__word--grad" />
        </h1>

        <motion.div className="hero__role" {...fade(0.8)}>
          <RoleCycle roles={profile.roles} />
        </motion.div>

        <motion.p className="hero__lead" {...fade(0.95)}>
          {profile.lead}
        </motion.p>

        <motion.div className="hero__ctas" {...fade(1.1)}>
          <Magnetic>
            <a
              href="#projects"
              className="btn btn--primary btn--lg"
              onClick={(e) => {
                e.preventDefault()
                scrollToId('projects')
              }}
            >
              Enter my work <ArrowUpRight />
            </a>
          </Magnetic>
          <Magnetic>
            <a href={profile.resume} className="btn btn--ghost btn--lg" download>
              <Download /> Resume
            </a>
          </Magnetic>
          <a href={profile.github} className="icon-btn" target="_blank" rel="noreferrer" aria-label="GitHub profile">
            <GitHub />
          </a>
        </motion.div>
      </div>

      <div className="hero__chips" ref={chipsRef} aria-hidden="true">
        {chips.map((c, i) => (
          <motion.div
            key={c.k}
            className={`chip3d ${c.cls}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={ready ? { opacity: 1, scale: 1 } : undefined}
            transition={{ duration: 0.9, delay: 1.3 + i * 0.15, ease }}
          >
            <strong>{c.k}</strong>
            <span>{c.v}</span>
          </motion.div>
        ))}
      </div>

      <div className="hero__band">
        <VelocityMarquee>
          Full-Stack Developer <i>✦</i> Process Analyst <i>✦</i> Android Developer <i>✦</i> Automation Builder <i>✦</i>{' '}
        </VelocityMarquee>
      </div>

      <a
        href="#about"
        className="scroll-cue"
        onClick={(e) => {
          e.preventDefault()
          scrollToId('about')
        }}
        aria-label="Scroll to about"
      >
        <span>Scroll to explore</span>
        <ArrowDown width={14} height={14} />
      </a>
    </section>
  )
}
