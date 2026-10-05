import { motion } from 'framer-motion'
import { THEMES } from '../lib/theme.js'

export default function ThemeSwitcher({ theme, onChange }) {
  return (
    <div className="themes" role="radiogroup" aria-label="Choose a theme">
      {THEMES.map((t) => {
        const on = t.id === theme
        return (
          <button
            key={t.id}
            role="radio"
            aria-checked={on}
            title={`${t.label} — ${t.hint}`}
            className={`themes__opt ${on ? 'is-active' : ''}`}
            onClick={(e) => onChange(t.id, e)}
          >
            {on && <motion.span layoutId="theme-pill" className="themes__pill" transition={{ type: 'spring', stiffness: 420, damping: 34 }} />}
            <span className="themes__swatch" style={{ '--s1': t.swatch[0], '--s2': t.swatch[1] }} aria-hidden="true" />
            <span className="themes__label">{t.label}</span>
          </button>
        )
      })}
    </div>
  )
}
