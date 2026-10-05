import { PALETTE } from './shapes.js'

// How the Neon 3D world looks (kept as config so it's easy to tweak).
// palette: [colorA, colorB] per particle shape (hero, about, skills, experience,
// projects, github, education, contact).
export const WORLD_THEMES = {
  neon: {
    bg: '#05060a',
    palette: PALETTE,
    blending: 'additive',
    bloom: true,
    size: 1,
    dim: 1,
    glow: ['rgba(139,92,246,0.9)', 'rgba(34,211,238,0.35)'],
    badge: { fill: 'rgba(10,12,22,0.92)', ring: ['#22d3ee', '#8b5cf6', '#f472b6'], text: '#eceef6' },
  },
}
