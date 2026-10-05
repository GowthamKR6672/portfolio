import { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { profile, repos as curated, repoUpdated } from '../data/resume.js'
import { prefersReducedMotion } from '../lib/motion.js'
import { Reveal, SectionHeading } from './Reveal.jsx'
import { ArrowUpRight, GitHub } from './Icons.jsx'

const langColor = { JavaScript: '#f1e05a', TypeScript: '#3178c6', Python: '#3572a5', HTML: '#e34c26', CSS: '#a970ff', Kotlin: '#a97bff' }

function hash(str) {
  let h = 0
  for (const c of str) h = (h * 31 + c.charCodeAt(0)) | 0
  return Math.abs(h)
}
const prettify = (name) => name.replace(/[-_]/g, ' ').replace(/([a-z])([A-Z])/g, '$1 $2')
const fmtDate = (d) => new Date(d).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })

function useRepos() {
  const [list, setList] = useState(() => curated.map((r) => ({ ...r, url: `${profile.github}/${r.name}`, updated: repoUpdated[r.name] })))
  useEffect(() => {
    const ctrl = new AbortController()
    fetch(`https://api.github.com/users/${profile.githubUser}/repos?per_page=100&sort=pushed`, { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((api) => {
        const known = new Map(curated.map((r) => [r.name, r]))
        const merged = api
          .filter((r) => !r.fork && r.name.toLowerCase() !== profile.githubUser.toLowerCase())
          .map((r) => {
            const c = known.get(r.name)
            return {
              name: r.name,
              title: c?.title || prettify(r.name),
              description: c?.description || r.description || 'A fresh project on GitHub — open the repo to explore.',
              stack: c?.stack || (r.language ? [r.language] : []),
              category: c?.category || 'Other',
              language: r.language || c?.language,
              live: c?.live,
              url: r.html_url,
              updated: r.pushed_at,
            }
          })
        if (merged.length) setList(merged)
      })
      .catch(() => {})
    return () => ctrl.abort()
  }, [])
  return list
}

function RepoCard({ r }) {
  const h = hash(r.name)
  const initials = r.title.replace(/[^A-Za-z0-9 ]/g, '').split(' ').filter(Boolean).slice(0, 2).map((w) => w[0]).join('')
  return (
    <article className="rcard" style={{ '--ha': h % 360, '--hb': (h % 360) + 80 }}>
      <div className="rcard__art" aria-hidden="true">
        <span className="rcard__mono">{initials}</span>
        <span className="rcard__orb" />
      </div>
      <div className="rcard__body">
        <div className="rcard__meta">
          <span className="rcard__cat">{r.category}</span>
          {r.updated && <span>{fmtDate(r.updated)}</span>}
        </div>
        <h3 className="rcard__title">{r.title}</h3>
        <p className="rcard__desc">{r.description}</p>
        <ul className="chips chips--sm">
          {r.stack.slice(0, 4).map((s) => (
            <li key={s} className="chip chip--soft">
              {s}
            </li>
          ))}
        </ul>
        <div className="rcard__foot">
          {r.language && (
            <span className="rcard__lang">
              <i style={{ background: langColor[r.language] || '#94a3b8' }} />
              {r.language}
            </span>
          )}
          <span className="rcard__links">
            {r.live && (
              <a href={r.live} target="_blank" rel="noreferrer" className="link-arrow" draggable="false">
                Live <ArrowUpRight width={14} height={14} />
              </a>
            )}
            <a href={r.url} target="_blank" rel="noreferrer" className="link-arrow" draggable="false" aria-label={`${r.title} source code on GitHub`}>
              <GitHub width={14} height={14} /> Code
            </a>
          </span>
        </div>
      </div>
    </article>
  )
}

// Cards on a rotating cylinder. Drag to spin; it drifts on its own otherwise.
function Carousel({ items }) {
  const wrap = useRef(null)
  const ring = useRef(null)
  const n = items.length
  const cardW = 300
  const radius = Math.round((cardW + 40) / (2 * Math.tan(Math.PI / n)))

  useEffect(() => {
    const el = wrap.current
    const st = { angle: 0, vel: 0.05, drag: false, x: 0, moved: 0, visible: true }
    const idle = prefersReducedMotion() ? 0 : 0.05
    let raf
    const loop = () => {
      if (!st.drag) {
        st.vel += (idle - st.vel) * 0.02
        st.angle += st.vel
      }
      ring.current.style.transform = `translateZ(${-radius}px) rotateY(${st.angle}deg)`
      raf = st.visible ? requestAnimationFrame(loop) : null
    }
    const down = (e) => {
      st.drag = true
      st.x = e.clientX
      st.moved = 0
    }
    const move = (e) => {
      if (!st.drag) return
      const dx = e.clientX - st.x
      st.x = e.clientX
      st.moved += Math.abs(dx)
      st.vel = dx * 0.18
      st.angle += st.vel
      if (st.moved > 6) el.classList.add('is-dragging')
    }
    const up = () => {
      st.drag = false
      setTimeout(() => el.classList.remove('is-dragging'), 0)
    }
    // Ignore the click that ends a drag.
    const click = (e) => {
      if (st.moved > 6) {
        e.preventDefault()
        e.stopPropagation()
      }
    }
    el.addEventListener('pointerdown', down)
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up)
    el.addEventListener('click', click, true)
    const io = new IntersectionObserver(([en]) => {
      st.visible = en.isIntersecting
      if (st.visible && !raf) raf = requestAnimationFrame(loop)
    })
    io.observe(el)
    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      el.removeEventListener('pointerdown', down)
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
      el.removeEventListener('click', click, true)
    }
  }, [radius])

  return (
    <div className="carousel" ref={wrap} data-cursor>
      <div className="carousel__ring" ref={ring}>
        {items.map((r, i) => (
          <div key={r.name} className="carousel__cell" style={{ transform: `rotateY(${(360 / n) * i}deg) translateZ(${radius}px)` }}>
            <RepoCard r={r} />
          </div>
        ))}
      </div>
      <span className="carousel__hint">drag to spin</span>
    </div>
  )
}

export default function GitHubWork() {
  const repos = useRepos()
  const categories = useMemo(() => ['All', ...new Set(repos.map((r) => r.category))], [repos])
  const [filter, setFilter] = useState('All')
  const shown = filter === 'All' ? repos : repos.filter((r) => r.category === filter)
  const [wide, setWide] = useState(() => window.innerWidth > 720)
  useEffect(() => {
    const on = () => setWide(window.innerWidth > 720)
    window.addEventListener('resize', on)
    return () => window.removeEventListener('resize', on)
  }, [])

  return (
    <section id="github" className="section github">
      <div className="container">
        <SectionHeading index="05" kicker="Open source" title="A galaxy of shipped code.">
          {repos.length} public repositories — business apps, tools and sites. This list updates itself from GitHub.
        </SectionHeading>

        <Reveal className="filters" role="tablist" aria-label="Filter repositories">
          {categories.map((c) => (
            <button key={c} role="tab" aria-selected={filter === c} className={`filter ${filter === c ? 'is-active' : ''}`} onClick={() => setFilter(c)}>
              {filter === c && <motion.span layoutId="filter-pill" className="filter__pill" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />}
              <span>{c}</span>
              <small>{c === 'All' ? repos.length : repos.filter((r) => r.category === c).length}</small>
            </button>
          ))}
        </Reveal>
      </div>

      {wide && shown.length >= 6 ? (
        <Carousel key={filter + shown.length} items={shown} />
      ) : (
        <div className="repo-row container">
          {shown.map((r) => (
            <RepoCard key={r.name} r={r} />
          ))}
        </div>
      )}

      <div className="container github__cta">
        <a href={profile.github} target="_blank" rel="noreferrer" className="btn btn--ghost">
          <GitHub /> See everything on GitHub <ArrowUpRight />
        </a>
      </div>
    </section>
  )
}
