import { lazy, Suspense, useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion'
import Lenis from 'lenis'
import { profile, sphereSkills } from '../../data/resume.js'
import { ease, prefersReducedMotion, scrollToId } from '../../lib/motion.js'
import ThemeSwitcher from '../../components/ThemeSwitcher.jsx'
import { Check, Copy, Download, GitHub, Mail } from '../../components/Icons.jsx'
import { hero, navLeft, navRight } from './content.js'
import { Icon } from './icons.jsx'
import useFitText from './useFitText.js'
import { Journey, Work, WhatYouGet, Toolkit, Transform, Learning, Faq, StudioFooter } from './StudioSections.jsx'
import './studio.css'

const Centerpiece = lazy(() => import('./Centerpiece.jsx'))

const NAME = 'GOWTHAM'
const NAME_FONT = { weight: 800, stretch: 'condensed', family: 'Archivo' }
const SIDEBAR_LOGO = { x: 34, y: 32, w: 108 }
const allNav = [...navLeft, ...navRight]
const navIcons = { home: 'home', journey: 'user', work: 'layers', what: 'stack', toolkit: 'code', learning: 'badge', faq: 'help' }

function useViewport() {
  const [vp, setVp] = useState(() => ({ w: window.innerWidth, h: window.innerHeight }))
  useEffect(() => {
    const on = () => setVp({ w: window.innerWidth, h: window.innerHeight })
    window.addEventListener('resize', on)
    return () => window.removeEventListener('resize', on)
  }, [])
  return vp
}

function useActiveSection() {
  const [active, setActive] = useState('home')
  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: '-45% 0px -50% 0px' })
    document.querySelectorAll('.st-main > section[id], .st-hero').forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [])
  return active
}

const go = (id) => (e) => {
  e.preventDefault()
  scrollToId(id)
}

function CopyEmail({ className }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      className={className}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(profile.email)
          setCopied(true)
          setTimeout(() => setCopied(false), 1500)
        } catch {
          window.location.href = `mailto:${profile.email}`
        }
      }}
    >
      <span>{copied ? 'Copied!' : profile.email}</span>
      {copied ? <Check width={14} height={14} /> : <Copy width={14} height={14} />}
    </button>
  )
}

function Sidebar({ show, active }) {
  const logos = sphereSkills.filter((s) => s.icon).slice(0, 12)
  return (
    <motion.aside className={`st-side ${active === 'work' ? 'is-dark' : ''}`} initial={false} animate={{ opacity: show ? 1 : 0, x: show ? 0 : -30, pointerEvents: show ? 'auto' : 'none' }} transition={{ duration: 0.5, ease }} aria-label="Sections">
      <div className="st-card st-side__intro">
        <div className="st-side__brand">
          <span className="st-tag">GOWTHAM®</span>
          <span className="st-side__mini">
            <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub">
              <GitHub width={12} height={12} />
            </a>
            <a href={`mailto:${profile.email}`} aria-label="Email">
              <Mail width={12} height={12} />
            </a>
          </span>
        </div>
        <p>{hero.blurb}</p>
      </div>
      <div className="st-card st-side__stats">
        <div>
          <strong>15+</strong>
          <span>GitHub repos</span>
        </div>
        <div>
          <strong>40+</strong>
          <span>Sites migrated</span>
        </div>
      </div>
      <nav className="st-card st-side__nav">
        {allNav.map(([id, label], i) => (
          <motion.a
            key={id}
            href={`#${id}`}
            onClick={go(id)}
            className={active === id ? 'is-active' : ''}
            initial={false}
            animate={{ opacity: show ? 1 : 0, x: show ? 0 : -16 }}
            transition={{ delay: show ? 0.05 + i * 0.04 : 0, duration: 0.4, ease }}
          >
            <Icon name={navIcons[id]} size={13} />
            {label}
          </motion.a>
        ))}
      </nav>
      <div className="st-side__logos" aria-hidden="true">
        <div className="st-side__logos-track">
          {[...logos, ...logos].map((s, i) => (
            <span key={i}>
              <img src={s.icon} alt="" width="16" height="16" className={s.invert ? 'invert' : ''} />
              {s.name}
            </span>
          ))}
        </div>
      </div>
      <CopyEmail className="st-side__mail" />
      <a href="#transform" onClick={go('transform')} className="st-btn st-btn--block">
        Let&apos;s Talk
      </a>
    </motion.aside>
  )
}

function MobileBar({ theme, onTheme }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <header className="st-mbar">
        <a href="#home" onClick={go('home')} className="st-tag">
          GOWTHAM®
        </a>
        <ThemeSwitcher theme={theme} onChange={onTheme} />
        <button className={`st-mbar__burger ${open ? 'is-open' : ''}`} onClick={() => setOpen((o) => !o)} aria-label="Menu" aria-expanded={open}>
          <span />
          <span />
        </button>
      </header>
      <AnimatePresence>
        {open && (
          <motion.nav className="st-mmenu" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.35, ease }}>
            {allNav.map(([id, label]) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={(e) => {
                  setOpen(false)
                  go(id)(e)
                }}
              >
                <Icon name={navIcons[id]} size={16} />
                {label}
              </a>
            ))}
            <a href="#transform" onClick={(e) => (setOpen(false), go('transform')(e))} className="st-btn st-btn--block">
              Let&apos;s Talk
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  )
}

function Hero({ desktop, vp, progress }) {
  const nameWidth = (vp.w - (desktop ? 48 : 32)) * 0.95
  const size = useFitText(NAME, nameWidth, NAME_FONT)
  const fade = useTransform(progress, [0, 0.55], [1, 0])
  const lift = useTransform(progress, [0, 1], [0, -60])
  const navX = useTransform(progress, [0, 0.6], [0, -40])

  return (
    <section id="home" className="st-hero" style={{ '--name-size': `${size}px` }}>
      {!desktop && (
        <h1 className="st-bigname st-bigname--static" style={{ fontSize: size }}>
          {NAME}
        </h1>
      )}
      <motion.nav className="st-hero__nav" style={{ opacity: fade, x: navX }} aria-label="Primary">
        <div>
          {navLeft.map(([id, label]) => (
            <a key={id} href={`#${id}`} onClick={go(id)}>
              {label}
            </a>
          ))}
        </div>
        <div>
          {navRight.map(([id, label]) => (
            <a key={id} href={`#${id}`} onClick={go(id)}>
              {label}
            </a>
          ))}
        </div>
      </motion.nav>

      <motion.div className="st-hero__stats" style={{ opacity: fade, y: lift }}>
        <div className="st-glass st-stat st-stat--a">
          <Icon name="code" size={34} className="st-yellow" />
          <span>
            <b>15+</b>
            <br />
            Repos
          </span>
        </div>
        <div className="st-glass st-stat st-stat--b">
          <strong>40+</strong>
          <span>US sites migrated</span>
        </div>
      </motion.div>

      <motion.div className="st-hero__copy" style={{ opacity: fade, y: lift }}>
        <h2 className="st-hero__headline">
          {hero.headline.map((l, i) => (
            <span className="st-mask" key={l}>
              <motion.span initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: 1, delay: 0.4 + i * 0.1, ease }}>
                {l}
              </motion.span>
            </span>
          ))}
        </h2>
        <div className="st-hero__ctas">
          <a href="#transform" onClick={go('transform')} className="st-btn">
            Let&apos;s Talk
          </a>
          <a href="#journey" onClick={go('journey')} className="st-btn">
            About Me
          </a>
        </div>
      </motion.div>

      <motion.ul className="st-glass st-hero__traits" style={{ opacity: fade, y: lift }}>
        {hero.traits.map((t, i) => (
          <li key={t}>
            <Icon name={['bolt', 'grid', 'chart', 'stack', 'flow'][i]} size={13} className="st-yellow" />
            {t}
          </li>
        ))}
      </motion.ul>

      <motion.p className="st-hero__tagline" style={{ opacity: fade }}>
        {hero.tagline[0]}
        <br />
        {hero.tagline[1]}
      </motion.p>
      <motion.p className="st-hero__blurb" style={{ opacity: fade }}>
        {hero.blurb}
      </motion.p>
    </section>
  )
}

// Studio: a warm, editorial one-pager modelled on heynesh.com — giant name,
// sticky sidebar, curving journey, dark horizontal work strip and more.
export default function StudioSite({ theme, onTheme }) {
  const vp = useViewport()
  const desktop = vp.w >= 1100
  const active = useActiveSection()
  const { scrollY } = useScroll()
  const progress = useTransform(scrollY, [0, vp.h * 0.85], [0, 1], { clamp: true })
  const [past, setPast] = useState(false)
  useMotionValueEvent(progress, 'change', (v) => setPast(v > 0.92))

  // Fixed giant name that flies into the sidebar logo as you leave the hero.
  // Leave a little room on the right for the ® mark.
  const nameW = (vp.w - 48) * 0.95
  const size = useFitText(NAME, nameW, NAME_FONT)
  const e = useTransform(progress, (p) => 1 - Math.pow(1 - p, 3))
  const nameX = useTransform(e, (t) => t * (SIDEBAR_LOGO.x - 24))
  const nameY = useTransform(e, (t) => t * SIDEBAR_LOGO.y)
  const nameScale = useTransform(e, (t) => 1 + t * (SIDEBAR_LOGO.w / nameW - 1))
  const nameOpacity = useTransform(progress, [0.86, 1], [1, 0])
  const nameZ = useTransform(progress, (p) => (p > 0.25 ? 60 : 1))

  // The centrepiece blurs into a soft backdrop that stays behind the page.
  const blur = useTransform(progress, [0, 1], ['blur(0px)', 'blur(38px)'])
  const centerScale = useTransform(progress, [0, 1], [1, 1.12])
  const centerOpacity = useTransform(progress, [0, 1], [1, 0.5])

  useEffect(() => {
    if (prefersReducedMotion()) return
    const lenis = new Lenis({ autoRaf: true, lerp: 0.1 })
    window.__lenis = lenis
    return () => {
      lenis.destroy()
      window.__lenis = null
    }
  }, [])

  return (
    <div className="studio">
      <motion.div className="st-center" style={{ filter: blur, scale: centerScale, opacity: centerOpacity }} aria-hidden="true">
        {profile.photo ? (
          <img src={profile.photo} alt="" className="st-center__photo" />
        ) : (
          <>
            <div className="st-center__body" />
            <div className="st-center__head">
              <Suspense fallback={null}>
                <Centerpiece />
              </Suspense>
            </div>
          </>
        )}
      </motion.div>

      {desktop && (
        <motion.div className="st-bigname" style={{ fontSize: size, x: nameX, y: nameY, scale: nameScale, opacity: nameOpacity, zIndex: nameZ }} aria-hidden="true">
          {NAME}
          <sup>®</sup>
        </motion.div>
      )}

      {desktop ? (
        <>
          <Sidebar show={past} active={active} />
          <div className="st-dock">
            <ThemeSwitcher theme={theme} onChange={onTheme} />
          </div>
        </>
      ) : (
        <MobileBar theme={theme} onTheme={onTheme} />
      )}

      <Hero desktop={desktop} vp={vp} progress={progress} />

      <main className="st-main">
        <Journey />
        <Work />
        <WhatYouGet />
        <Toolkit />
        <Transform />
        <Learning />
        <Faq />
      </main>
      <StudioFooter />
      <a href={profile.resume} download className="st-resume" aria-label="Download resume">
        <Download width={15} height={15} /> Resume
      </a>
    </div>
  )
}
