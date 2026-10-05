import { lazy, Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { profile } from '../../data/resume.js'
import { prefersReducedMotion } from '../../lib/motion.js'
import ThemeSwitcher from '../../components/ThemeSwitcher.jsx'
import { chapters, gate } from './chapters.js'
import { createAmbience } from './audio.js'
import './orbit.css'

const OrbitScene = lazy(() => import('./OrbitScene.jsx'))
const LAST = chapters.length - 1
const SIDES = [1, -1, 1, -1]
const ease = [0.22, 1, 0.36, 1]

// Letters fade in out of order, like a signal resolving.
function Assemble({ text, delay = 0, className = '' }) {
  const order = useMemo(() => text.split('').map(() => Math.random()), [text])
  return (
    <span className={className} aria-label={text}>
      {text.split('').map((ch, i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          initial={{ opacity: 0, filter: 'blur(8px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, delay: delay + order[i] * 0.6 }}
        >
          {ch === ' ' ? ' ' : ch}
        </motion.span>
      ))}
    </span>
  )
}

function Heading({ lines, className = '' }) {
  return (
    <h2 className={`ob-h ${className}`}>
      {lines.map((l, i) => (
        <Assemble key={l} text={l} delay={i * 0.12} className="ob-h__line" />
      ))}
    </h2>
  )
}

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease, delay: 0.25 } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.35 } },
}

function Mono({ children, className = '' }) {
  return <p className={`ob-mono ${className}`}>{children}</p>
}

function Chapter({ c, index }) {
  if (c.kind === 'profile')
    return (
      <motion.div className="ob-ch ob-ch--bl" exit={{ opacity: 0 }}>
        <Heading lines={c.heading} />
        <motion.div {...fadeUp}>
          {c.text.map((t) => (
            <Mono key={t}>{t}</Mono>
          ))}
        </motion.div>
      </motion.div>
    )
  if (c.kind === 'stack')
    return (
      <motion.div className="ob-ch ob-ch--tl" {...fadeUp}>
        <span className="ob-label">+ {c.label}</span>
        <Mono>The stack behind Routo, ICT Report and 15+ public repositories.</Mono>
      </motion.div>
    )
  if (c.kind === 'experience')
    return (
      <motion.div className="ob-ch ob-ch--left" exit={{ opacity: 0 }}>
        <Heading lines={c.heading} />
        <motion.div {...fadeUp} className="ob-entries">
          {c.entries.map((e) => (
            <div key={e.title} className="ob-entry">
              <span className="ob-label">+ {e.period}</span>
              <b>{e.title}</b>
              {e.points.map((p) => (
                <Mono key={p}>{p}</Mono>
              ))}
            </div>
          ))}
        </motion.div>
      </motion.div>
    )
  if (c.kind === 'atmosphere')
    return (
      <motion.div className="ob-ch ob-ch--center" {...fadeUp}>
        <span className="ob-label">+ {c.label}</span>
        <p className="ob-center-text">
          {c.text[0]}
          <br />
          {c.text[1]}
        </p>
      </motion.div>
    )
  if (c.kind === 'project') {
    const side = SIDES[index - 4] > 0 ? 'right' : 'left'
    return (
      <motion.div className={`ob-ch ob-ch--${side}`} exit={{ opacity: 0 }}>
        <motion.span className="ob-label" {...fadeUp}>
          + {c.label}
        </motion.span>
        <Heading lines={c.heading} className={side === 'right' ? 'ob-h--right' : ''} />
        <motion.div {...fadeUp} className="ob-project">
          {c.text.map((t) => (
            <Mono key={t}>{t}</Mono>
          ))}
          <p className="ob-stack">{c.stack.join(' · ')}</p>
          {c.link && (
            <a className="ob-link" href={c.link} target="_blank" rel="noreferrer">
              [ View source ]
            </a>
          )}
        </motion.div>
      </motion.div>
    )
  }
  if (c.kind === 'array')
    return (
      <motion.div className="ob-ch ob-ch--bl" exit={{ opacity: 0 }}>
        <motion.span className="ob-label" {...fadeUp}>
          + {c.label}
        </motion.span>
        <Heading lines={c.heading} />
      </motion.div>
    )
  if (c.kind === 'education')
    return (
      <motion.div className="ob-ch ob-ch--edu" exit={{ opacity: 0 }}>
        <motion.span className="ob-label" {...fadeUp}>
          + {c.label}
        </motion.span>
        <Heading lines={c.heading} className="ob-h--light" />
        <motion.div {...fadeUp}>
          <Mono>Four stations, oldest to newest — commerce first, computers alongside.</Mono>
        </motion.div>
      </motion.div>
    )
  if (c.kind === 'credentials')
    return (
      <motion.div className="ob-ch ob-ch--bl ob-ch--low" exit={{ opacity: 0 }}>
        <motion.span className="ob-label" {...fadeUp}>
          + {c.label}
        </motion.span>
        <Heading lines={c.heading} />
        <motion.div {...fadeUp}>
          <Mono>Five certifications and two achievements, in orbit.</Mono>
        </motion.div>
      </motion.div>
    )
  return (
    <motion.div className="ob-ch ob-ch--end" exit={{ opacity: 0 }}>
      {c.lines.map((pair, i) => (
        <motion.p key={i} className="ob-end-line" initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.3 + i * 1.1, duration: 1 } }}>
          <span className="ob-end-line__light">{pair[0]}</span> <b>{pair[1]}</b>
        </motion.p>
      ))}
      <motion.div className="ob-contact" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0, transition: { delay: 3.6, duration: 0.9, ease } }}>
        <a className="ob-btn" href={`mailto:${profile.email}`}>
          Initiate contact
        </a>
        <dl>
          <div>
            <dt>Email</dt>
            <dd>
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </dd>
          </div>
          <div>
            <dt>Phone</dt>
            <dd>
              <a href={`tel:${profile.phone.replace(/\s/g, '')}`}>{profile.phone}</a>
            </dd>
          </div>
          <div>
            <dt>GitHub</dt>
            <dd>
              <a href={profile.github} target="_blank" rel="noreferrer">
                {profile.githubUser}
              </a>
            </dd>
          </div>
          <div>
            <dt>Resume</dt>
            <dd>
              <a href={profile.resume} download>
                Download
              </a>
            </dd>
          </div>
        </dl>
      </motion.div>
    </motion.div>
  )
}

function AudioToggle({ on, onClick }) {
  return (
    <button className={`ob-audio ${on ? 'is-on' : ''}`} onClick={onClick} aria-pressed={on} aria-label={on ? 'Mute audio' : 'Play audio'}>
      <span className="ob-audio__bars" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
      </span>
      Audio
    </button>
  )
}

// Orbit: a cinematic, scroll-driven journey modelled on edolus.com.
export default function OrbitSite({ theme, onTheme }) {
  const journey = useRef({ progress: -1, target: -1, onSky: null })
  const audio = useRef(null)
  const [phase, setPhase] = useState('loading')
  const [count, setCount] = useState(0)
  const [sceneReady, setSceneReady] = useState(false)
  const [active, setActive] = useState(-1)
  const [audioOn, setAudioOn] = useState(false)

  // The journey replaces normal page scrolling.
  useEffect(() => {
    const html = document.documentElement
    const prev = [html.style.overflow, document.body.style.overflow]
    html.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'
    return () => {
      html.style.overflow = prev[0]
      document.body.style.overflow = prev[1]
      audio.current?.close()
    }
  }, [])

  // Loader: count up, finish once the scene has started (or after a few seconds).
  useEffect(() => {
    if (phase !== 'loading') return
    const start = performance.now()
    let raf
    const tick = (now) => {
      const el = now - start
      const cap = sceneReady || el > 7000 ? 100 : 92
      const v = Math.min(cap, Math.round((1 - Math.pow(1 - Math.min(el / 2200, 1), 2)) * 100))
      setCount(v)
      if (v >= 100 && el > 1600) {
        setTimeout(() => setPhase('gate'), 400)
        return
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [phase, sceneReady])

  // Track which chapter the camera is at.
  useEffect(() => {
    let raf
    const loop = () => {
      const p = journey.current.progress
      const a = p < -0.5 ? -1 : Math.round(p)
      setActive((cur) => (cur === a ? cur : a))
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [])

  // Wheel / touch / keys drive the journey once it has started.
  useEffect(() => {
    if (phase !== 'journey') return
    const j = journey.current
    let snap
    const clamp = (v) => Math.min(LAST, Math.max(0, v))
    const nudge = (d) => {
      j.target = clamp(j.target + d)
      clearTimeout(snap)
      snap = setTimeout(() => (j.target = Math.round(j.target)), 260)
    }
    const step = (d) => (j.target = clamp(Math.round(j.target) + d))
    const wheel = (e) => {
      e.preventDefault()
      nudge(Math.max(-60, Math.min(60, e.deltaY)) * 0.0028)
    }
    let ty = null
    const ts = (e) => (ty = e.touches[0].clientY)
    const tm = (e) => {
      if (ty === null) return
      const y = e.touches[0].clientY
      nudge((ty - y) * 0.008)
      ty = y
    }
    const te = () => (ty = null)
    const key = (e) => {
      if (['ArrowDown', 'PageDown', ' '].includes(e.key)) step(1)
      else if (['ArrowUp', 'PageUp'].includes(e.key)) step(-1)
      else if (e.key === 'Home') j.target = 0
      else if (e.key === 'End') j.target = LAST
      else return
      e.preventDefault()
    }
    window.addEventListener('wheel', wheel, { passive: false })
    window.addEventListener('touchstart', ts, { passive: true })
    window.addEventListener('touchmove', tm, { passive: true })
    window.addEventListener('touchend', te)
    window.addEventListener('keydown', key)
    return () => {
      clearTimeout(snap)
      window.removeEventListener('wheel', wheel)
      window.removeEventListener('touchstart', ts)
      window.removeEventListener('touchmove', tm)
      window.removeEventListener('touchend', te)
      window.removeEventListener('keydown', key)
    }
  }, [phase])

  const ensureAudio = () => {
    if (!audio.current) {
      audio.current = createAmbience()
      journey.current.onSky = (v) => audio.current?.setWind(v)
    }
    return audio.current
  }
  const toggleAudio = () => {
    const a = ensureAudio()
    if (!a) return
    a.setOn(!audioOn)
    setAudioOn(!audioOn)
  }
  const initiate = () => {
    const a = ensureAudio()
    if (a) {
      a.setOn(true)
      setAudioOn(true)
    }
    setPhase('journey')
    journey.current.target = 0
  }

  const reduced = prefersReducedMotion()
  return (
    <div className="orbit">
      <Suspense fallback={null}>
        <OrbitScene journey={journey} active={active} onReady={() => setSceneReady(true)} />
      </Suspense>

      <div className="ob-shade" aria-hidden="true" />

      {/* HUD */}
      <header className="ob-top">
        <span className="ob-wordmark">GOWTHAM</span>
        <div className="ob-top__right">
          {phase !== 'loading' && <AudioToggle on={audioOn} onClick={toggleAudio} />}
          <ThemeSwitcher theme={theme} onChange={onTheme} />
        </div>
      </header>

      <AnimatePresence>
        {phase === 'journey' && (
          <motion.div className="ob-hud" initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 1 } }} exit={{ opacity: 0 }}>
            <AnimatePresence>
              {active === 0 && (
                <motion.span className="ob-scrollcue" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  Scroll to begin <span aria-hidden="true">↓</span>
                </motion.span>
              )}
            </AnimatePresence>
            <a className="ob-mail" href={`mailto:${profile.email}`}>
              [ {profile.email.toUpperCase()} ]
            </a>
            <nav className="ob-ticks" aria-label="Chapters">
              {chapters.map((c, i) => (
                <button key={i} className={i === active ? 'is-on' : ''} onClick={() => (journey.current.target = i)} aria-label={`Go to chapter ${i + 1}`}>
                  <i />
                </button>
              ))}
            </nav>
            <span className="ob-count">
              {String(Math.max(active, 0) + 1).padStart(2, '0')} / {String(chapters.length).padStart(2, '0')}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chapter copy */}
      <div className="ob-stage">
        <AnimatePresence mode="wait">
          {phase === 'journey' && active >= 0 && <Chapter key={active} c={chapters[active]} index={active} />}
        </AnimatePresence>
      </div>

      {/* Gate */}
      <AnimatePresence>
        {phase === 'gate' && (
          <motion.section className="ob-gate" exit={{ opacity: 0, transition: { duration: 0.8 } }}>
            <h1 className="ob-gate__title">
              {gate.title.map((l, i) => (
                <Assemble key={l} text={l} delay={0.2 + i * 0.25} className="ob-h__line" />
              ))}
            </h1>
            <motion.p className="ob-gate__sub" initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 1.2, duration: 1 } }}>
              {gate.sub}
            </motion.p>
            <motion.button className="ob-btn" onClick={initiate} initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 1.5, duration: 0.8 } }}>
              Initiate system
            </motion.button>
            <motion.p className="ob-gate__phones" initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 1.9 } }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M4 15v-3a8 8 0 0 1 16 0v3" />
                <rect x="3" y="14" width="4" height="6" rx="1.5" />
                <rect x="17" y="14" width="4" height="6" rx="1.5" />
              </svg>
              Experience with headphones
            </motion.p>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Loader */}
      <AnimatePresence>
        {phase === 'loading' && !reduced && (
          <motion.div className="ob-loader" exit={{ opacity: 0, transition: { duration: 0.9 } }}>
            <span className="ob-wordmark ob-wordmark--lg">GOWTHAM</span>
            <span className="ob-loader__count">{count}%</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
