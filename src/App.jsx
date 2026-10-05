import { lazy, Suspense, useEffect, useState } from 'react'
import { flushSync } from 'react-dom'
import Welcome from './welcome/Welcome.jsx'
import { prefersReducedMotion } from './lib/motion.js'
import { initialTheme, savedTheme, saveTheme } from './lib/theme.js'

// Each theme is a whole site of its own; only the active one is loaded.
const LOADERS = {
  neon: () => import('./sites/neon/NeonSite.jsx'),
  studio: () => import('./sites/studio/StudioSite.jsx'),
  orbit: () => import('./sites/orbit/OrbitSite.jsx'),
}
const SITES = Object.fromEntries(Object.entries(LOADERS).map(([k, load]) => [k, lazy(load)]))

// Runs a state change behind a circular reveal from the click point, where supported.
function reveal(apply, e) {
  if (!document.startViewTransition || prefersReducedMotion()) return apply()
  const root = document.documentElement
  root.style.setProperty('--vt-x', `${e?.clientX ?? window.innerWidth - 120}px`)
  root.style.setProperty('--vt-y', `${e?.clientY ?? 30}px`)
  // A quick second click shouldn't wait on the previous reveal.
  window.__themeTransition?.skipTransition()
  const t = document.startViewTransition(apply)
  // The browser may abort the animation (e.g. the mobile viewport resizes); the switch still happens.
  t.ready.catch(() => {})
  t.finished.catch(() => {})
  window.__themeTransition = t
}

export default function App() {
  const [theme, setTheme] = useState(initialTheme)
  // Every visit starts on the welcome screen; the last world chosen is pre-selected there.
  const [entered, setEntered] = useState(false)

  useEffect(() => {
    document.documentElement.dataset.theme = entered ? theme : 'welcome'
    if (entered) saveTheme(theme)
  }, [theme, entered])

  const enter = (id, e) =>
    reveal(() => {
      flushSync(() => {
        setTheme(id)
        setEntered(true)
      })
      document.documentElement.dataset.theme = id
      window.scrollTo(0, 0)
    }, e)

  const changeTheme = (id, e) => {
    if (id === theme) return
    reveal(() => {
      flushSync(() => setTheme(id))
      document.documentElement.dataset.theme = id
      window.scrollTo(0, 0)
    }, e)
  }

  if (!entered) return <Welcome current={savedTheme()} onPick={enter} onPreload={(id) => LOADERS[id]()} />

  const Site = SITES[theme]
  return (
    <Suspense fallback={<div className="site-fallback" />}>
      <Site theme={theme} onTheme={changeTheme} />
    </Suspense>
  )
}
