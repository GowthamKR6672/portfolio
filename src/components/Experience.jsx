import { experience } from '../data/resume.js'
import { Reveal, SectionHeading } from './Reveal.jsx'
import TiltCard from './TiltCard.jsx'

export default function Experience() {
  return (
    <section id="experience" className="section experience">
      <div className="container">
        <SectionHeading index="03" kicker="Experience" title="Where I've been putting it to work." />
        <div className="jobs">
          {experience.map((job) => (
            <article className="jobx" key={job.role}>
              <Reveal className="jobx__year" y={60}>
                <span className="jobx__yr">{job.period.slice(0, 4)}</span>
                {job.current ? (
                  <span className="jobx__now">
                    <span className="pulse-dot" /> Now
                  </span>
                ) : (
                  <span className="jobx__to">{job.period.split('—')[1]?.trim()}</span>
                )}
              </Reveal>
              <Reveal y={40} delay={0.1}>
                <TiltCard className="glass jobx__card" max={5}>
                  <p className="jobx__period">{job.period}</p>
                  <h3 className="jobx__role">{job.role}</h3>
                  <p className="jobx__company">{job.company}</p>
                  <ul className="jobx__points">
                    {job.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                  <ul className="chips">
                    {job.tags.map((t) => (
                      <li key={t} className="chip chip--soft">
                        {t}
                      </li>
                    ))}
                  </ul>
                </TiltCard>
              </Reveal>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
