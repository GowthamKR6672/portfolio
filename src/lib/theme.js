// Visual themes. The DOM side is driven by `data-theme` on <html> (see styles.css);
// the 3D side reads the matching entry in src/three/themes.js.
export const THEMES = [
  { id: 'neon', label: 'Neon', hint: 'Glowing particle world', swatch: ['#22d3ee', '#8b5cf6'] },
  { id: 'studio', label: 'Studio', hint: 'Warm paper & electric yellow', swatch: ['#d5cfbe', '#ffff23'] },
  { id: 'orbit', label: 'Orbit', hint: 'Cinematic space mission', swatch: ['#02040a', '#9ad9ff'] },
]

const KEY = 'gkr-theme'

// The world this visitor picked last time, or null on a first visit.
export function savedTheme() {
  try {
    const saved = localStorage.getItem(KEY)
    if (THEMES.some((t) => t.id === saved)) return saved
  } catch {
    // storage unavailable (private mode etc.)
  }
  return null
}

export function initialTheme() {
  return savedTheme() || 'neon'
}

export function saveTheme(id) {
  try {
    localStorage.setItem(KEY, id)
  } catch {
    // ignore
  }
}
