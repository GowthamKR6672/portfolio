import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { profile } from '../data/resume.js'
import { THEMES } from '../lib/theme.js'
import { prefersReducedMotion } from '../lib/motion.js'
import './welcome.css'

const ease = [0.22, 1, 0.36, 1]
const BLURB = {
  neon: 'Immersive particle world — scroll and watch it morph.',
  studio: 'Warm and editorial — a classic portfolio, reimagined.',
  orbit: 'Cinematic space journey — best with sound on.',
}
// Mini, CSS-drawn previews of each world for the cards.
function Art({ id }) {
  return (
    <span className={`wcard__art wcard__art--${id}`} aria-hidden="true">
      {id === 'neon' && (
        <>
          <i className="n-glow" />
          <i className="n-ring n-ring--a" />
          <i className="n-ring n-ring--b" />
          <i className="n-ring n-ring--c" />
          <i className="n-core" />
        </>
      )}
      {id === 'studio' && (
        <>
          <b className="s-name">GOWTHAM</b>
          <i className="s-body" />
          <i className="s-pill" />
          <i className="s-side" />
        </>
      )}
      {id === 'orbit' && (
        <>
          <i className="o-stars" />
          <i className="o-earth" />
          <b className="o-title">REAL-TIME</b>
          <i className="o-btn" />
        </>
      )}
    </span>
  )
}

// First screen: the cartoon, a short intro and a choice of worlds.
export default function Welcome({ current, onPick, onPreload }) {
  const [look, setLook] = useState(current || 'neon')
  const stage = useRef(null)

  // The character leans toward the cursor.
  useEffect(() => {
    if (prefersReducedMotion()) return
    const move = (e) => {
      const x = e.clientX / window.innerWidth - 0.5
      const y = e.clientY / window.innerHeight - 0.5
      stage.current?.style.setProperty('--mx', x.toFixed(3))
      stage.current?.style.setProperty('--my', y.toFixed(3))
    }
    window.addEventListener('pointermove', move, { passive: true })
    return () => window.removeEventListener('pointermove', move)
  }, [])

  const preview = (id) => {
    setLook(id)
    onPreload?.(id)
  }

  return (
    <div className={`wel wel--${look}`}>
      <div className="wel__bg" aria-hidden="true">
        <div className="wel__layer wel__layer--neon">
          <i className="wn-glow wn-glow--a" />
          <i className="wn-glow wn-glow--b" />
          <i className="wn-dots" />
        </div>
        <div className="wel__layer wel__layer--studio">
          <b className="ws-name">GOWTHAM</b>
        </div>
        <div className="wel__layer wel__layer--orbit">
          <i className="wo-stars" />
          <i className="wo-stars wo-stars--far" />
        </div>
      </div>

      <header className="wel__top">
        <span className="wel__logo">
          gowtham<span>.kr</span>
        </span>
        <span className="wel__meta">Portfolio · {new Date().getFullYear()}</span>
      </header>

      <div className="wel__main">
        <section className="wel__stage" ref={stage}>
          <span className="wel__platform" aria-hidden="true" />
          <motion.div className="wel__me" initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, ease, delay: 0.15 }}>
            <div className="wel__float">
              <img src="/me-cartoon.webp" alt="Cartoon illustration of Gowtham K R" width="681" height="1520" />
            </div>
          </motion.div>
        </section>

        <motion.section className="wel__intro" initial="hide" animate="show" variants={{ show: { transition: { staggerChildren: 0.08, delayChildren: 0.35 } } }}>
          {[
            <p className="wel__kicker" key="k">
              <i className="wel__live" /> Open to full-stack & automation roles
            </p>,
            <h1 className="wel__name" key="n">
              Gowtham K R
            </h1>,
            <p className="wel__role" key="r">
              {profile.current.role} <span>@ {profile.current.company}</span>
              <br />
              <em>Full-Stack Developer · Erode, India</em>
            </p>,
            <p className="wel__about" key="a">
              {profile.lead}
            </p>,
            <ul className="wel__facts" key="f">
              <li>
                <b>15+</b> public repos
              </li>
              <li>
                <b>40+</b> sites migrated
              </li>
              <li>
                <b>4</b> real-time projects
              </li>
            </ul>,
            <h2 className="wel__choose" key="c">
              Choose your world
            </h2>,
          ].map((el) => (
            <motion.div key={el.key} variants={{ hide: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } } }}>
              {el}
            </motion.div>
          ))}

          <motion.div className="wel__cards" variants={{ hide: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } } }}>
            {THEMES.map((t) => (
              <button
                key={t.id}
                className={`wcard ${look === t.id ? 'is-on' : ''}`}
                onPointerEnter={() => preview(t.id)}
                onFocus={() => preview(t.id)}
                onClick={(e) => onPick(t.id, e)}
                aria-label={`Open the ${t.label} world`}
              >
                <Art id={t.id} />
                <span className="wcard__body">
                  <span className="wcard__name">
                    {t.label}
                    {t.id === current && <small>Last visited</small>}
                  </span>
                  <span className="wcard__hint">{BLURB[t.id]}</span>
                  <span className="wcard__go">Enter →</span>
                </span>
              </button>
            ))}
          </motion.div>
          <motion.p className="wel__note" variants={{ hide: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.8 } } }}>
            You can switch worlds anytime from the top of the page.
          </motion.p>
        </motion.section>
      </div>
    </div>
  )
}
