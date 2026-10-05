import { lazy, Suspense, useEffect, useState } from 'react'
import Lenis from 'lenis'
import Loader from './components/Loader.jsx'
import Cursor from './components/Cursor.jsx'
import ScrollProgress from './components/ScrollProgress.jsx'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Skills from './components/Skills.jsx'
import Experience from './components/Experience.jsx'
import Projects from './components/Projects.jsx'
import GitHubWork from './components/GitHubWork.jsx'
import Education from './components/Education.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import { prefersReducedMotion } from './lib/motion.js'

// The full-screen WebGL world loads in parallel with the page content.
const World = lazy(() => import('./three/World.jsx'))

export default function App() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const lenis = new Lenis({ autoRaf: true, lerp: 0.09 })
    window.__lenis = lenis
    return () => {
      lenis.destroy()
      window.__lenis = null
    }
  }, [])

  return (
    <>
      <Suspense fallback={null}>
        <World />
      </Suspense>
      <Loader onDone={() => setReady(true)} />
      <Cursor />
      <ScrollProgress />
      <Nav />
      <main>
        <Hero ready={ready} />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <GitHubWork />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
