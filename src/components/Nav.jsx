import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { scrollToId, ease } from '../lib/motion.js'
import { profile } from '../data/resume.js'

const links = [
  ['about', 'About'],
  ['skills', 'Skills'],
  ['experience', 'Experience'],
  ['projects', 'Projects'],
  ['github', 'GitHub'],
  ['education', 'Education'],
]

export default function Nav() {
  const [active, setActive] = useState('home')
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    document.querySelectorAll('main > section[id]').forEach((s) => io.observe(s))
    return () => {
      window.removeEventListener('scroll', onScroll)
      io.disconnect()
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    if (window.__lenis) open ? window.__lenis.stop() : window.__lenis.start()
  }, [open])

  const go = (id) => (e) => {
    e.preventDefault()
    setOpen(false)
    // Unlock scrolling now — the effect above only runs after the next render.
    document.body.style.overflow = ''
    window.__lenis?.start()
    scrollToId(id)
  }

  return (
    <>
      <header className={`nav ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="nav__inner">
          <a href="#home" className="nav__logo" onClick={go('home')} aria-label="Back to top">
            <span className="nav__logo-mark">G</span>
            <span className="nav__logo-text">
              gowtham<span className="grad">.kr</span>
            </span>
          </a>
          <nav className="nav__links" aria-label="Primary">
            {links.map(([id, label]) => (
              <a key={id} href={`#${id}`} onClick={go(id)} className={active === id ? 'is-active' : ''}>
                {label}
                {active === id && <motion.span layoutId="nav-pill" className="nav__pill" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
              </a>
            ))}
          </nav>
          <a href="#contact" onClick={go('contact')} className="btn btn--sm btn--primary nav__cta">
            Let's talk
          </a>
          <button className={`nav__burger ${open ? 'is-open' : ''}`} onClick={() => setOpen((o) => !o)} aria-label="Menu" aria-expanded={open}>
            <span />
            <span />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="menu"
            initial={{ clipPath: 'circle(0% at 100% 0%)' }}
            animate={{ clipPath: 'circle(150% at 100% 0%)' }}
            exit={{ clipPath: 'circle(0% at 100% 0%)' }}
            transition={{ duration: 0.7, ease }}
          >
            <nav aria-label="Mobile">
              {[...links, ['contact', 'Contact']].map(([id, label], i) => (
                <motion.a
                  key={id}
                  href={`#${id}`}
                  onClick={go(id)}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.05, ease }}
                >
                  <span className="menu__index">0{i + 1}</span>
                  {label}
                </motion.a>
              ))}
            </nav>
            <p className="menu__foot">{profile.email}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
