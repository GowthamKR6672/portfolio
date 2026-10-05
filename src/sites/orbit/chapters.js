import { education, featuredProjects, certifications, achievements, experience, repos, profile } from '../../data/resume.js'

// The Orbit journey: one chapter per scroll "stop". Camera keyframes live in
// OrbitScene.jsx and are indexed the same way (the gate is chapter -1).

export const gate = {
  title: ['Software at', 'real-time scale'],
  sub: 'Building real-time business systems — tracking, dashboards and automation — from Erode, India.',
}

const proj = featuredProjects.map((p) => ({
  kind: 'project',
  id: p.id,
  label: p.kind,
  heading: p.title.replace('.com', '').replace('WeConnectOnline', 'WeConnect Online').toUpperCase().split(' '),
  text: [p.tagline, ...p.points.slice(0, 2)],
  stack: p.stack,
  link: p.repo,
}))

export const chapters = [
  {
    kind: 'profile',
    label: 'Profile',
    heading: ['Real-time', 'engineering'],
    text: [`${profile.name} — ${profile.current.role} at ${profile.current.company}, ${profile.location}.`, 'I build real-time business software: GPS tracking, productivity dashboards and process automation.'],
  },
  {
    kind: 'stack',
    label: 'Systems onboard',
    callouts: [
      { title: 'Core stack', sub: 'React · Node.js · Express', at: [0.62, 1.65, 0.62] },
      { title: 'Languages', sub: 'JavaScript · Python · Kotlin', at: [-0.62, 1.95, 0.5] },
      { title: 'Data layer', sub: 'MongoDB · SQL · PostgreSQL', at: [0.6, 0.55, 0.6] },
      { title: 'Tooling', sub: 'Git · GitHub · Postman · VS Code', at: [-0.55, 0.45, 0.62] },
    ],
  },
  {
    kind: 'experience',
    label: 'Field record',
    heading: ['Field', 'record'],
    entries: experience.map((e) => ({ title: `${e.role} — ${e.company}`, period: e.period, points: e.points.slice(0, 3) })),
  },
  {
    kind: 'atmosphere',
    label: 'Entering atmosphere',
    text: ['From orbit to the real world —', 'the systems I’ve shipped.'],
  },
  ...proj,
  {
    kind: 'array',
    label: `${repos.length} systems online · tap a block to open it`,
    heading: ['Repository', 'array'],
    repos: repos.map((r) => ({ title: r.title, url: `${profile.github}/${r.name}`, category: r.category, stack: r.stack.slice(0, 2) })),
  },
  {
    kind: 'education',
    label: 'Training log',
    heading: ['Education'],
    entries: education.map((e) => ({ degree: e.degree, school: e.school, place: e.place, years: e.years, score: e.score, pct: e.pct })),
  },
  {
    kind: 'credentials',
    label: `${certifications.length} certifications · ${achievements.length} achievements`,
    heading: ['Credentials'],
    items: [
      ...certifications.map((c) => ({ title: c, type: 'Certification' })),
      ...achievements.map((a) => ({ title: a.title, sub: a.note, type: 'Achievement' })),
    ],
  },
  {
    kind: 'end',
    lines: [['This orbit', 'never existed.'], ['The work', 'did.'], ['Now imagine', 'yours.']],
  },
]
