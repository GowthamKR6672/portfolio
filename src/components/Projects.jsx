import { useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion'
import { featuredProjects } from '../data/resume.js'
import { ease } from '../lib/motion.js'
import Scramble from './Scramble.jsx'
import { ArrowUpRight, Check, GitHub } from './Icons.jsx'

const N = featuredProjects.length

function Step({ i, progress, active, onPick, title }) {
  const fill = useTransform(progress, [i / N, (i + 1) / N], [0, 1])
  return (
    <button className={`pstep ${active ? 'is-active' : ''}`} onClick={() => onPick(i)}>
      <span className="pstep__bar">
        <motion.span style={{ scaleX: fill }} />
      </span>
      <span className="pstep__label">
        0{i + 1} <b>{title}</b>
      </span>
    </button>
  )
}

export default function Projects() {
  const ref = useRef(null)
  const [active, setActive] = useState(0)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  useMotionValueEvent(scrollYProgress, 'change', (v) => setActive(Math.min(N - 1, Math.floor(v * N))))
  const p = featuredProjects[active]

  const pick = (i) => {
    const el = ref.current
    const top = el.getBoundingClientRect().top + window.scrollY
    const y = top + ((i + 0.5) / N) * (el.offsetHeight - window.innerHeight)
    if (window.__lenis) window.__lenis.scrollTo(y, { duration: 1.2 })
    else window.scrollTo({ top: y, behavior: 'smooth' })
  }

  return (
    <section id="projects" ref={ref} className="projects" style={{ height: `${N * 90 + 100}vh` }}>
      <div className="projects__sticky">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={active}
            className="projects__bignum"
            aria-hidden="true"
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -80 }}
            transition={{ duration: 0.8, ease }}
          >
            0{active + 1}
          </motion.div>
        </AnimatePresence>

        <div className="container projects__grid">
          <div className="projects__panel">
            <div className="sec-head__kicker">
              <span className="sec-head__index">04</span>
              <span className="sec-head__line" />
              Real-time projects
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={p.id}
                initial={{ opacity: 0, x: 50, filter: 'blur(8px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: -50, filter: 'blur(8px)' }}
                transition={{ duration: 0.55, ease }}
              >
                <p className="project__kind">{p.kind}</p>
                <h3 className={`project__title ${p.title.length > 14 ? 'project__title--long' : ''}`}>
                  <Scramble text={p.title} duration={700} />
                </h3>
                <p className="project__tagline">{p.tagline}</p>
                <ul className="project__points">
                  {p.points.map((pt) => (
                    <li key={pt}>
                      <Check width={16} height={16} />
                      {pt}
                    </li>
                  ))}
                </ul>
                <div className="project__foot">
                  <ul className="chips">
                    {p.stack.map((s) => (
                      <li key={s} className="chip">
                        {s}
                      </li>
                    ))}
                  </ul>
                  {p.repo && (
                    <a href={p.repo} className="link-arrow" target="_blank" rel="noreferrer">
                      <GitHub width={16} height={16} /> View code <ArrowUpRight width={16} height={16} />
                    </a>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="projects__steps">
              {featuredProjects.map((q, i) => (
                <Step key={q.id} i={i} progress={scrollYProgress} active={i === active} onPick={pick} title={q.title} />
              ))}
            </div>
          </div>
          <div className="projects__stage" aria-hidden="true" />
        </div>
        <p className="projects__hint" aria-hidden="true">
          Keep scrolling — the screens switch project
        </p>
      </div>
    </section>
  )
}
