import { Fragment, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useMotionValueEvent, useScroll, useSpring, useTransform } from 'framer-motion'
import { featuredProjects, profile, repos } from '../../data/resume.js'
import { ease, scrollToId } from '../../lib/motion.js'
import { createScreens } from '../../three/screens.js'
import { capabilities, faq, journey, learning, statement, toolkit } from './content.js'
import { Icon } from './icons.jsx'
import useFitText from './useFitText.js'

function Label({ children, dark }) {
  return <span className={`st-label ${dark ? 'st-label--dark' : ''}`}>{children}</span>
}

function Rise({ children, delay = 0, className = '', y = 40 }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.8, delay, ease }}>
      {children}
    </motion.div>
  )
}

function Heading({ lines, className = '' }) {
  return (
    <motion.h2 className={`st-h2 ${className}`} initial="hide" whileInView="show" viewport={{ once: true, amount: 0.5 }}>
      {lines.map((l, i) => (
        <span className="st-mask" key={i}>
          <motion.span variants={{ hide: { y: '110%' }, show: { y: 0, transition: { duration: 0.9, delay: i * 0.08, ease } } }}>{l}</motion.span>
        </span>
      ))}
    </motion.h2>
  )
}

// Smooth curve through points (Catmull-Rom converted to cubic Béziers).
function curve(pts) {
  let d = `M ${pts[0].x} ${pts[0].y}`
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i]
    const p1 = pts[i]
    const p2 = pts[i + 1]
    const p3 = pts[i + 2] || p2
    const c1 = { x: p1.x + (p2.x - p0.x) / 5, y: p1.y + (p2.y - p0.y) / 5 }
    const c2 = { x: p2.x - (p3.x - p1.x) / 5, y: p2.y - (p3.y - p1.y) / 5 }
    d += ` C ${c1.x} ${c1.y}, ${c2.x} ${c2.y}, ${p2.x} ${p2.y}`
  }
  return d
}

/* ───────────────────────── journey ───────────────────────── */
const SPOTS = ['58%', '20%', '56%', '6%', '44%']

export function Journey() {
  const wrap = useRef(null)
  const cards = useRef([])
  const [geo, setGeo] = useState({ d: '', tail: '', dots: [], w: 0, h: 0 })
  const [open, setOpen] = useState(null)
  const { scrollYProgress } = useScroll({ target: wrap, offset: ['start 0.7', 'end 0.6'] })
  const draw = useSpring(scrollYProgress, { stiffness: 90, damping: 26 })

  useLayoutEffect(() => {
    const measure = () => {
      const box = wrap.current?.getBoundingClientRect()
      if (!box || window.innerWidth < 900) return setGeo((g) => ({ ...g, d: '' }))
      const dots = cards.current.map((el, i) => {
        const r = el.getBoundingClientRect()
        const right = i % 2 === 0
        return { x: (right ? r.left - 30 : r.right + 30) - box.left, y: r.top - box.top + r.height * 0.72 }
      })
      const pts = [{ x: box.width * 0.99, y: dots[0].y - 230 }, ...dots]
      const last = dots[dots.length - 1]
      setGeo({ d: curve(pts), tail: `M ${last.x} ${last.y} q 80 40 170 58`, dots, w: box.width, h: box.height })
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(wrap.current)
    document.fonts?.ready.then(measure)
    return () => ro.disconnect()
  }, [])

  const item = open !== null ? journey[open] : null
  return (
    <section id="journey" className="st-sec st-journey">
      <div className="st-sec__head">
        <Label>Start small · grow big</Label>
        <Heading lines={['About Me (&)', 'My Journey']} />
        <Rise>
          <p className="st-lead">From a commerce degree to shipping real-time apps. It&apos;s easier to show than to explain.</p>
        </Rise>
      </div>

      <div className="st-timeline" ref={wrap}>
        {geo.d && (
          <svg className="st-timeline__line" width={geo.w} height={geo.h} aria-hidden="true">
            <motion.path d={geo.d} style={{ pathLength: draw }} />
            <path d={geo.tail} className="st-timeline__tail" />
            {geo.dots.map((p, i) => (
              <circle key={i} cx={p.x} cy={p.y} r="6" />
            ))}
          </svg>
        )}
        {journey.map((j, i) => (
          <motion.article
            key={j.year}
            ref={(el) => (cards.current[i] = el)}
            className="st-card st-jcard"
            style={{ '--spot': SPOTS[i % SPOTS.length], top: i * 330 + 40 }}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease }}
          >
            <span className="st-jcard__year">{j.year}</span>
            <h3>{j.title}</h3>
            <p>{j.short}</p>
            <div className="st-jcard__foot">
              <span className="st-avatar">
                <Icon name={['badge', 'chart', 'user', 'flow', 'code'][i]} size={14} />
              </span>
              <span className="st-jcard__who">
                {j.handle}
                <small>{j.ago}</small>
              </span>
              <button className={`st-pill ${i === 2 ? 'st-pill--yellow' : ''}`} onClick={() => setOpen(i)}>
                Read more
              </button>
            </div>
          </motion.article>
        ))}
      </div>

      <AnimatePresence>
        {item && (
          <motion.div className="st-modal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(null)} role="dialog" aria-modal="true" aria-label={item.title}>
            <motion.div className="st-modal__card" initial={{ y: 40, scale: 0.97 }} animate={{ y: 0, scale: 1 }} exit={{ y: 30, opacity: 0 }} transition={{ duration: 0.45, ease }} onClick={(e) => e.stopPropagation()}>
              <button className="st-modal__close" onClick={() => setOpen(null)} aria-label="Close">
                <Icon name="plus" size={18} />
              </button>
              <span className="st-modal__year">{item.full}</span>
              <h3>{item.title}</h3>
              <p>{item.long}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

/* ───────────────────────── work (dark, horizontal) ───────────────────────── */
const extraRepos = ['Restaurant', 'MMMTraders', 'Construction', 'HB-Notes', 'billing-vercel', 'SocialPlatform']

function useScreenshots() {
  const [shots, setShots] = useState(null)
  useEffect(() => {
    let alive = true
    const make = () => {
      const s = createScreens()
      const out = [0, 1, 2, 3].map((i) => {
        s.draw(i, 3.4)
        return { laptop: s.laptop[i].toDataURL('image/jpeg', 0.82), phone: s.phone[i].toDataURL('image/jpeg', 0.82) }
      })
      if (alive) setShots(out)
    }
    ;(document.fonts?.ready || Promise.resolve()).then(make)
    return () => {
      alive = false
    }
  }, [])
  return shots
}

function hue(name) {
  let h = 0
  for (const c of name) h = (h * 31 + c.charCodeAt(0)) | 0
  return Math.abs(h) % 360
}

export function Work() {
  const ref = useRef(null)
  const track = useRef(null)
  const [dist, setDist] = useState(0)
  const [active, setActive] = useState(0)
  const shots = useScreenshots()
  const items = useMemo(
    () => [
      ...featuredProjects.map((p, i) => ({ id: p.id, title: p.title, text: p.tagline, tags: p.stack.slice(0, 3), href: p.repo, shot: i })),
      ...extraRepos.map((n) => {
        const r = repos.find((x) => x.name === n)
        return { id: n, title: r.title, text: r.description, tags: r.stack.slice(0, 3), href: `${profile.github}/${n}`, hue: hue(n) }
      }),
    ],
    [],
  )

  useLayoutEffect(() => {
    const measure = () => {
      const t = track.current
      if (!t) return
      setDist(Math.max(0, t.scrollWidth - t.parentElement.clientWidth))
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(track.current)
    return () => ro.disconnect()
  }, [])

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, (v) => -v * dist)
  useMotionValueEvent(scrollYProgress, 'change', (v) => setActive(Math.round(v * (items.length - 1))))

  return (
    <section id="work" ref={ref} className="st-work" style={{ height: `calc(100vh + ${dist}px)` }}>
      <div className="st-work__sticky">
        <div className="st-work__head">
          <div>
            <Label dark>Selected work</Label>
            <Heading lines={['Built for Business,', 'Made to Run Live']} />
          </div>
          <p>Driver tracking, productivity dashboards, studio sites and business tools — software that real teams use every day. Here&apos;s a look at some of it.</p>
        </div>
        <div className="st-work__viewport">
          <motion.div className="st-work__track" ref={track} style={{ x }}>
            {items.map((it, i) => (
              <article key={it.id} className={`st-wcard ${i === active ? 'is-active' : ''}`} style={{ '--h': it.hue ?? 50 }}>
                <div className="st-wcard__top">
                  <span className="st-wcard__num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="st-wcard__tags">
                    {it.tags.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </span>
                </div>
                <div className="st-wcard__art" aria-hidden="true">
                  {it.shot !== undefined ? (
                    shots && (
                      <>
                        <img className="st-wcard__laptop" src={shots[it.shot].laptop} alt="" />
                        <img className="st-wcard__phone" src={shots[it.shot].phone} alt="" />
                      </>
                    )
                  ) : (
                    <div className="st-wcard__mock">
                      <i />
                      <i />
                      <i />
                      <b>{it.title}</b>
                    </div>
                  )}
                </div>
                <div className="st-wcard__body">
                  <h3>{it.title}</h3>
                  <p>{it.text}</p>
                </div>
                {it.href && (
                  <a className="st-wcard__go" href={it.href} target="_blank" rel="noreferrer" aria-label={`${it.title} on GitHub`}>
                    <Icon name="arrow" size={16} />
                  </a>
                )}
              </article>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ───────────────────────── what you get ───────────────────────── */
function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.18, 1])
  return <motion.span style={{ opacity }}>{children}</motion.span>
}

export function WhatYouGet() {
  const big = useRef(null)
  const text = useRef(null)
  const { scrollYProgress: bigP } = useScroll({ target: big, offset: ['start end', 'center center'] })
  const scale = useTransform(bigP, [0, 1], [1.35, 1])
  const { scrollYProgress } = useScroll({ target: text, offset: ['start 0.85', 'end 0.55'] })
  const tokens = statement.flatMap((t) => (typeof t === 'string' ? t.split(' ').map((w) => ({ w })) : [t]))

  return (
    <section id="what" className="st-sec st-what">
      <div className="st-what__big" ref={big}>
        <motion.h2 style={{ scale }}>
          What
          <br />
          You Get?
        </motion.h2>
        <Label>Capabilities overview</Label>
      </div>
      <p className="st-statement" ref={text}>
        {tokens.map((t, i) => {
          const range = [i / tokens.length, (i + 1) / tokens.length]
          return (
            <Fragment key={i}>
              {t.icon ? (
                <Word progress={scrollYProgress} range={range}>
                  <span className="st-ipill">
                    <Icon name={t.icon} size={22} />
                  </span>
                </Word>
              ) : (
                <Word progress={scrollYProgress} range={range}>
                  {t.w}
                </Word>
              )}{' '}
            </Fragment>
          )
        })}
      </p>
      <div className="st-caps">
        {capabilities.map((c, i) => (
          <Rise key={c.title} delay={i * 0.06} className="st-card st-cap">
            <span className="st-cap__icon">
              <Icon name={c.icon} size={18} />
            </span>
            <h3>{c.title}</h3>
            <p>{c.text}</p>
          </Rise>
        ))}
      </div>
    </section>
  )
}

/* ───────────────────────── toolkit (services) ───────────────────────── */
export function Toolkit() {
  return (
    <section id="toolkit" className="st-sec">
      <div className="st-sec__head">
        <Label>Toolkit</Label>
        <Heading lines={['Tools', 'That Deliver']} />
        <Rise>
          <p className="st-lead">Same care, any size of project. The only difference is which part of the stack your problem lives in.</p>
        </Rise>
      </div>
      <Rise className="st-card st-tools">
        {toolkit.map((t, i) => (
          <div key={t.title} className={`st-tool ${i === 0 ? 'st-tool--hi' : ''}`}>
            <div className="st-tool__title">
              <span className="st-cap__icon">
                <Icon name={t.icon} size={16} />
              </span>
              {t.title}
            </div>
            <div className="st-tool__lead">{t.lead}</div>
            <p>{t.text}</p>
            <ul>
              {t.items.map((x) => (
                <li key={x}>
                  <Icon name="check" size={14} className="st-yellow-dark" />
                  {x}
                </li>
              ))}
            </ul>
            <p className="st-tool__note">
              <Icon name="info" size={13} /> {t.note}
            </p>
          </div>
        ))}
      </Rise>
    </section>
  )
}

/* ───────────────────────── transform CTA ───────────────────────── */
export function Transform() {
  const [step, setStep] = useState(0)
  const ref = useRef(null)
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      setTimeout(() => setStep(1), 300)
      setTimeout(() => setStep(2), 1500)
      io.disconnect()
    }, { threshold: 0.5 })
    io.observe(ref.current)
    return () => io.disconnect()
  }, [])
  return (
    <section id="transform" className="st-sec st-transform">
      <h2 className="st-transform__title">
        <span>Turn Your</span>
        <span>Workflow</span>
        <span className="st-light">Into Real-Time</span>
        <span className="st-light">Software</span>
      </h2>
      <Rise>
        <p className="st-lead">Every business process has a slow, manual step. Tell me about yours — and let&apos;s see what it looks like as software.</p>
      </Rise>
      <div className="st-chat" ref={ref}>
        <span className="st-avatar st-avatar--lg">G</span>
        <div className="st-chat__msgs">
          <AnimatePresence>
            {step === 1 && (
              <motion.span key="typing" className="st-bubble st-bubble--typing" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <i />
                <i />
                <i />
              </motion.span>
            )}
          </AnimatePresence>
          {step >= 2 && (
            <>
              <motion.span className="st-bubble" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                Have something in mind?
              </motion.span>
              <motion.a href={`mailto:${profile.email}`} className="st-btn" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.5 }}>
                Let&apos;s Talk
              </motion.a>
            </>
          )}
        </div>
      </div>
    </section>
  )
}

/* ───────────────────────── learning (draggable) ───────────────────────── */
export function Learning() {
  const area = useRef(null)
  const track = useRef(null)
  const [limit, setLimit] = useState(0)
  const [page, setPage] = useState(0)
  const [cursor, setCursor] = useState({ x: 0, y: 0, on: false })
  const x = useMotionValue(0)
  useMotionValueEvent(x, 'change', (v) => setPage(Math.min(learning.length - 1, Math.round((-v / Math.max(limit, 1)) * (learning.length - 1)))))

  useLayoutEffect(() => {
    const m = () => setLimit(Math.max(0, track.current.scrollWidth - area.current.clientWidth))
    m()
    const ro = new ResizeObserver(m)
    ro.observe(area.current)
    return () => ro.disconnect()
  }, [])

  return (
    <section id="learning" className="st-sec">
      <div className="st-sec__head st-sec__head--row">
        <div>
          <Label>Learning</Label>
          <Heading lines={['From the Places', "I've Learned"]} />
        </div>
        <div className="st-dashes" aria-hidden="true">
          {learning.map((_, i) => (
            <i key={i} className={i === page ? 'on' : ''} />
          ))}
        </div>
      </div>
      <div
        className="st-drag"
        ref={area}
        onPointerMove={(e) => {
          const r = area.current.getBoundingClientRect()
          setCursor({ x: e.clientX - r.left, y: e.clientY - r.top, on: e.pointerType === 'mouse' })
        }}
        onPointerLeave={() => setCursor((c) => ({ ...c, on: false }))}
      >
        <motion.div className="st-drag__track" ref={track} drag="x" dragConstraints={{ left: -limit, right: 0 }} dragElastic={0.08} style={{ x }}>
          {learning.map((l) => (
            <article key={l.title.join()} className="st-card st-lcard">
              <div className="st-lcard__top">
                <h3>
                  {l.title[0]}
                  <br />
                  {l.title[1]}
                </h3>
                <span className="st-qmark">
                  <Icon name="badge" size={14} />
                </span>
              </div>
              <p>{l.text}</p>
              <div className="st-lcard__foot">
                <span className="st-avatar">
                  <Icon name="user" size={14} />
                </span>
                <span>
                  {l.who}
                  <small>{l.sub}</small>
                </span>
              </div>
            </article>
          ))}
        </motion.div>
        <span className={`st-dragcursor ${cursor.on ? 'on' : ''}`} style={{ transform: `translate(${cursor.x}px, ${cursor.y}px)` }} aria-hidden="true">
          Drag
        </span>
      </div>
    </section>
  )
}

/* ───────────────────────── faq ───────────────────────── */
export function Faq() {
  const [open, setOpen] = useState(-1)
  const cols = [faq.filter((_, i) => i % 2 === 0), faq.filter((_, i) => i % 2 === 1)]
  return (
    <section id="faq" className="st-sec">
      <div className="st-sec__head">
        <Label>FAQ</Label>
        <Heading lines={['Got any', 'questions?']} />
      </div>
      <div className="st-faq">
        {cols.map((col, c) => (
          <div key={c}>
            {col.map(([q, a]) => {
              const id = faq.findIndex((f) => f[0] === q)
              const on = open === id
              return (
                <div key={q} className={`st-faq__item ${on ? 'is-open' : ''}`}>
                  <button onClick={() => setOpen(on ? -1 : id)} aria-expanded={on}>
                    {q}
                    <Icon name="plus" size={16} />
                  </button>
                  <AnimatePresence initial={false}>
                    {on && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease }}>
                        <p>{a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </section>
  )
}

/* ───────────────────────── footer ───────────────────────── */
export function StudioFooter() {
  const ref = useRef(null)
  const [w, setW] = useState(0)
  useLayoutEffect(() => {
    const m = () => setW(ref.current.clientWidth)
    m()
    const ro = new ResizeObserver(m)
    ro.observe(ref.current)
    return () => ro.disconnect()
  }, [])
  const size = useFitText('GOWTHAM®', w, { weight: 800, stretch: 'condensed', family: 'Archivo' })
  return (
    <footer className="st-footer">
      <div className="st-footer__row">
        <span>© {new Date().getFullYear()} Gowtham K R</span>
        <span>
          <a href={`mailto:${profile.email}`}>{profile.email}</a> · <a href={`tel:${profile.phone.replace(/\s/g, '')}`}>{profile.phone}</a> ·{' '}
          <a href={profile.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
        </span>
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault()
            scrollToId('home')
          }}
        >
          Back to top ↑
        </a>
      </div>
      <div className="st-footer__name" ref={ref} style={{ fontSize: size }} aria-hidden="true">
        GOWTHAM<sup>®</sup>
      </div>
    </footer>
  )
}
