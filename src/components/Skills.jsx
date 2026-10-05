import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { skillGroups } from '../data/resume.js'
import { ease } from '../lib/motion.js'
import { world } from '../three/store.js'
import { SectionHeading } from './Reveal.jsx'

export default function Skills() {
  const [active, setActive] = useState(skillGroups[0].title)
  const lastTouch = useRef(0)

  // Auto-cycle the highlighted group until the visitor takes over.
  useEffect(() => {
    const id = setInterval(() => {
      if (Date.now() - lastTouch.current < 6000) return
      setActive((cur) => {
        const i = skillGroups.findIndex((g) => g.title === cur)
        return skillGroups[(i + 1) % skillGroups.length].title
      })
    }, 3200)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    world.skillHover = active === 'Process & Ops' ? null : active
  }, [active])

  const pick = (title) => {
    lastTouch.current = Date.now()
    setActive(title)
  }

  return (
    <section id="skills" className="section skills">
      <div className="container skills__grid">
        <div className="skills__col">
          <SectionHeading index="02" kicker="Skills & stack" title="A full-stack toolkit, from pixels to process.">
            Hover a category — the matching tools light up in the 3D orbit.
          </SectionHeading>
          <ul className="skill-rows">
            {skillGroups.map((g, i) => {
              const on = active === g.title
              return (
                <li key={g.title} className={`skill-row accent-${g.accent} ${on ? 'is-active' : ''}`}>
                  <button className="skill-row__head" onPointerEnter={() => pick(g.title)} onFocus={() => pick(g.title)} onClick={() => pick(g.title)} aria-expanded={on}>
                    <span className="skill-row__idx">0{i + 1}</span>
                    <span className="skill-row__title">{g.title}</span>
                    <span className="skill-row__glyph">{g.glyph}</span>
                  </button>
                  <AnimatePresence initial={false}>
                    {on && (
                      <motion.div
                        className="skill-row__body"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.45, ease }}
                      >
                        <ul className="chips">
                          {g.items.map((s) => (
                            <li key={s} className="chip">
                              {s}
                            </li>
                          ))}
                          {g.extra.map((s) => (
                            <li key={s} className="chip chip--soft" title="Also used across my GitHub projects">
                              {s}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              )
            })}
          </ul>
          <p className="skills__legend">
            <span className="chip">solid</span> on my resume · <span className="chip chip--soft">dashed</span> also used in my repos
          </p>
        </div>
        <div className="skills__stage" aria-hidden="true" />
      </div>
    </section>
  )
}
