import { useState } from 'react'
import { motion } from 'framer-motion'
import { profile } from '../data/resume.js'
import { ease } from '../lib/motion.js'
import { Reveal } from './Reveal.jsx'
import Magnetic from './Magnetic.jsx'
import { ArrowUpRight, Check, Copy, Download, GitHub, Mail, Phone, Pin } from './Icons.jsx'

// The trigger sits on the line itself: masked letters start clipped, so an
// observer on each letter would never fire.
function BigLine({ text, delay, className = '' }) {
  return (
    <motion.span className={`contact__line ${className}`} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.5 }}>
      {text.split('').map((ch, i) => (
        <span className="mask" key={i}>
          <motion.span
            className="mask__inner"
            variants={{ hidden: { y: '110%' }, show: { y: 0, transition: { duration: 1, delay: delay + i * 0.04, ease } } }}
          >
            {ch === ' ' ? ' ' : ch}
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  const cards = [
    { icon: <Mail />, label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
    { icon: <Phone />, label: 'Phone', value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, '')}` },
    { icon: <GitHub />, label: 'GitHub', value: `@${profile.githubUser}`, href: profile.github, external: true },
    { icon: <Pin />, label: 'Location', value: profile.location },
  ]

  return (
    <section id="contact" className="section contact">
      <div className="container contact__inner">
        <Reveal className="sec-head__kicker" y={12}>
          <span className="sec-head__index">07</span>
          <span className="sec-head__line" />
          Contact
        </Reveal>
        <h2 className="contact__title" aria-label="Let's talk">
          <BigLine text="Let's" delay={0} />
          <BigLine text="talk." delay={0.2} className="contact__line--grad" />
        </h2>
        <Reveal className="contact__lead" delay={0.1}>
          Hiring for a full-stack, automation or process role — or have a business workflow that needs real-time software? I'd love to hear about it.
        </Reveal>

        <Reveal className="contact__actions" delay={0.15}>
          <Magnetic strength={0.25}>
            <a href={`mailto:${profile.email}`} className="btn btn--primary btn--xl">
              {profile.email} <ArrowUpRight />
            </a>
          </Magnetic>
          <button className="btn btn--ghost btn--lg" onClick={copy}>
            {copied ? <Check /> : <Copy />} {copied ? 'Copied!' : 'Copy email'}
          </button>
          <a href={profile.resume} className="btn btn--ghost btn--lg" download>
            <Download /> Resume
          </a>
        </Reveal>

        <div className="contact__cards">
          {cards.map((c, i) => {
            const inner = (
              <>
                <span className="ccard__icon">{c.icon}</span>
                <span className="ccard__label">{c.label}</span>
                <span className="ccard__value">{c.value}</span>
              </>
            )
            return (
              <Reveal key={c.label} delay={0.1 + i * 0.06}>
                {c.href ? (
                  <a className="glass ccard" href={c.href} {...(c.external ? { target: '_blank', rel: 'noreferrer' } : {})}>
                    {inner}
                  </a>
                ) : (
                  <div className="glass ccard">{inner}</div>
                )}
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
