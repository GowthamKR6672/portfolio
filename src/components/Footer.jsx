import { profile } from '../data/resume.js'
import { scrollToId } from '../lib/motion.js'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p>
          © {new Date().getFullYear()} {profile.name}. Built with React, Three.js & Framer Motion.
        </p>
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
    </footer>
  )
}
