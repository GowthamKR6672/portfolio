import { motion } from 'framer-motion'
import { achievements, certifications, education, studies } from '../data/resume.js'
import { ease } from '../lib/motion.js'
import { Reveal, SectionHeading } from './Reveal.jsx'
import TiltCard from './TiltCard.jsx'
import { Award, Check, Star } from './Icons.jsx'

function Ring({ pct, label, size = 72 }) {
  const r = 30
  const c = 2 * Math.PI * r
  return (
    <div className="ring" role="img" aria-label={label}>
      <svg viewBox="0 0 72 72" width={size} height={size}>
        <circle cx="36" cy="36" r={r} className="ring__track" />
        <motion.circle
          cx="36"
          cy="36"
          r={r}
          className="ring__value"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          whileInView={{ strokeDashoffset: c * (1 - pct / 100) }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease }}
        />
      </svg>
      <span>{label}</span>
    </div>
  )
}

export default function Education() {
  const [pg, ug, ...school] = education
  return (
    <section id="education" className="section education">
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <defs>
          <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#22d3ee" />
            <stop offset="0.6" stopColor="#8b5cf6" />
            <stop offset="1" stopColor="#f472b6" />
          </linearGradient>
        </defs>
      </svg>
      <div className="container">
        <SectionHeading index="06" kicker="Education & growth" title="Commerce roots, engineering mindset." />

        <div className="bento">
          <Reveal className="bento__pg">
            <TiltCard className="glass bcard bcard--hero" max={6}>
              <p className="bcard__kicker">{pg.years}</p>
              <h3 className="bcard__big">{pg.degree}</h3>
              <p className="bcard__sub">
                {pg.school}, {pg.place}
              </p>
              <Ring pct={pg.pct} label={pg.score} size={120} />
              <span className="bcard__deco" aria-hidden="true">
                PG
              </span>
            </TiltCard>
          </Reveal>

          <Reveal className="bento__ug" delay={0.05}>
            <TiltCard className="glass bcard" max={8}>
              <p className="bcard__kicker">{ug.years}</p>
              <h3 className="bcard__title">{ug.degree}</h3>
              <p className="bcard__sub">
                {ug.school}, {ug.place}
              </p>
              <Ring pct={ug.pct} label={ug.score} />
            </TiltCard>
          </Reveal>

          <Reveal className="bento__school" delay={0.1}>
            <TiltCard className="glass bcard bcard--split" max={8}>
              {school.map((e) => (
                <div key={e.degree}>
                  <p className="bcard__kicker">{e.years}</p>
                  <h3 className="bcard__title">{e.degree}</h3>
                  <p className="bcard__sub">{e.school}</p>
                  <Ring pct={e.pct} label={e.score} size={60} />
                </div>
              ))}
            </TiltCard>
          </Reveal>

          <Reveal className="bento__certs" delay={0.1}>
            <TiltCard className="glass bcard" max={6}>
              <p className="bcard__kicker">Certifications</p>
              <ul className="certs">
                {certifications.map((c) => (
                  <li key={c} className="cert">
                    <Award width={18} height={18} />
                    {c}
                  </li>
                ))}
              </ul>
            </TiltCard>
          </Reveal>

          <Reveal className="bento__study" delay={0.05}>
            <TiltCard className="glass bcard" max={5}>
              <p className="bcard__kicker">Study projects · Tata Motors</p>
              <div className="studies">
                {studies.map((s) => (
                  <div key={s.title} className="study">
                    <h4>{s.title}</h4>
                    <ul>
                      {s.points.slice(0, 3).map((p) => (
                        <li key={p}>
                          <Check width={14} height={14} />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </TiltCard>
          </Reveal>

          <Reveal className="bento__ach" delay={0.1}>
            <TiltCard className="glass bcard" max={8}>
              <p className="bcard__kicker">Achievements</p>
              {achievements.map((a) => (
                <div key={a.title} className="achievement">
                  <Star width={20} height={20} />
                  <div>
                    <strong>{a.title}</strong>
                    <span>{a.note}</span>
                  </div>
                </div>
              ))}
            </TiltCard>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
