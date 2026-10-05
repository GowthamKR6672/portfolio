// Live, canvas-drawn app screens for the 3D laptop and phone — one pair per project.
// Figures shown on these screens are illustrative.

const C = {
  bg: '#0a0d18',
  side: '#0c0f1c',
  panel: '#121729',
  line: '#1f2640',
  text: '#e8eaf3',
  muted: '#7f86a3',
  faint: '#4b5270',
  cyan: '#22d3ee',
  violet: '#8b5cf6',
  pink: '#f472b6',
  lime: '#a3e635',
  red: '#ef4444',
}
const F = {
  display: (s, w = 600) => `${w} ${s}px "Space Grotesk", system-ui, sans-serif`,
  body: (s, w = 500) => `${w} ${s}px Inter, system-ui, sans-serif`,
  mono: (s, w = 500) => `${w} ${s}px "JetBrains Mono", ui-monospace, monospace`,
}

function rr(ctx, x, y, w, h, r) {
  ctx.beginPath()
  ctx.roundRect(x, y, w, h, r)
}
function box(ctx, x, y, w, h, r, fill, stroke) {
  rr(ctx, x, y, w, h, r)
  if (fill) {
    ctx.fillStyle = fill
    ctx.fill()
  }
  if (stroke) {
    ctx.strokeStyle = stroke
    ctx.lineWidth = 1.5
    ctx.stroke()
  }
}
function txt(ctx, s, x, y, font, color, align = 'left') {
  ctx.font = font
  ctx.fillStyle = color
  ctx.textAlign = align
  ctx.textBaseline = 'alphabetic'
  ctx.fillText(s, x, y)
}
function grad(ctx, x0, y0, x1, y1, stops) {
  const g = ctx.createLinearGradient(x0, y0, x1, y1)
  stops.forEach((c, i) => g.addColorStop(i / (stops.length - 1), c))
  return g
}

function chrome(ctx, w, url) {
  ctx.fillStyle = '#0e1120'
  ctx.fillRect(0, 0, w, 44)
  ;['#ff5f57', '#febc2e', '#28c840'].forEach((c, i) => {
    ctx.beginPath()
    ctx.arc(24 + i * 20, 22, 6, 0, Math.PI * 2)
    ctx.fillStyle = c
    ctx.fill()
  })
  box(ctx, w / 2 - 200, 10, 400, 24, 12, '#161a2c')
  txt(ctx, `🔒 ${url}`, w / 2, 27, F.mono(13), C.muted, 'center')
}

function sidebar(ctx, h, name, color, items, active) {
  ctx.fillStyle = C.side
  ctx.fillRect(0, 44, 230, h - 44)
  ctx.fillStyle = C.line
  ctx.fillRect(229, 44, 1, h - 44)
  box(ctx, 24, 70, 34, 34, 10, grad(ctx, 24, 70, 58, 104, [color, C.violet]))
  txt(ctx, name, 70, 94, F.display(20), C.text)
  items.forEach((it, i) => {
    const y = 140 + i * 46
    if (i === active) box(ctx, 14, y - 4, 202, 38, 10, 'rgba(34,211,238,0.10)')
    ctx.beginPath()
    ctx.arc(36, y + 15, 5, 0, Math.PI * 2)
    ctx.fillStyle = i === active ? color : C.faint
    ctx.fill()
    txt(ctx, it, 54, y + 20, F.body(15, i === active ? 600 : 500), i === active ? C.text : C.muted)
  })
}

function statusBar(ctx, w) {
  txt(ctx, '9:41', 30, 40, F.body(15, 600), C.text)
  box(ctx, w / 2 - 55, 18, 110, 30, 15, '#000')
  box(ctx, w - 62, 28, 30, 13, 4, null, C.muted)
  box(ctx, w - 59, 31, 20, 7, 2, C.text)
}

// Shared route geometry for Routo.
const ROUTE = [
  [0.08, 0.86], [0.18, 0.66], [0.32, 0.72], [0.42, 0.52], [0.56, 0.56], [0.64, 0.36], [0.8, 0.32], [0.92, 0.12],
]
function routeAt(pts, u) {
  const seg = []
  let total = 0
  for (let i = 1; i < pts.length; i++) {
    const l = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1])
    seg.push(l)
    total += l
  }
  let d = u * total
  for (let i = 0; i < seg.length; i++) {
    if (d <= seg[i]) {
      const k = d / seg[i]
      return { i, p: [pts[i][0] + (pts[i + 1][0] - pts[i][0]) * k, pts[i][1] + (pts[i + 1][1] - pts[i][1]) * k] }
    }
    d -= seg[i]
  }
  return { i: seg.length - 1, p: pts[pts.length - 1] }
}
function drawMap(ctx, x, y, w, h, t, compact) {
  ctx.save()
  rr(ctx, x, y, w, h, compact ? 18 : 0)
  ctx.clip()
  ctx.fillStyle = '#0a1122'
  ctx.fillRect(x, y, w, h)
  // park + river
  ctx.fillStyle = 'rgba(163,230,53,0.06)'
  ctx.fillRect(x + w * 0.62, y + h * 0.62, w * 0.22, h * 0.24)
  ctx.strokeStyle = '#0f1d3a'
  ctx.lineWidth = compact ? 14 : 26
  ctx.beginPath()
  ctx.moveTo(x, y + h * 0.28)
  ctx.bezierCurveTo(x + w * 0.3, y + h * 0.1, x + w * 0.5, y + h * 0.45, x + w, y + h * 0.2)
  ctx.stroke()
  // streets
  for (let i = 0; i < 14; i++) {
    const major = i % 4 === 0
    ctx.strokeStyle = major ? '#1c2846' : '#141d34'
    ctx.lineWidth = major ? (compact ? 4 : 7) : compact ? 1.5 : 2.5
    const gx = x + ((i * 0.083 + 0.02) % 1) * w
    ctx.beginPath()
    ctx.moveTo(gx, y)
    ctx.lineTo(gx + w * 0.04, y + h)
    ctx.stroke()
    const gy = y + ((i * 0.077 + 0.04) % 1) * h
    ctx.beginPath()
    ctx.moveTo(x, gy)
    ctx.lineTo(x + w, gy - h * 0.03)
    ctx.stroke()
  }
  const pts = ROUTE.map(([px, py]) => [x + px * w, y + py * h])
  const u = (t * 0.05) % 1
  const cur = routeAt(pts, u)
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'
  ctx.strokeStyle = '#2b3760'
  ctx.lineWidth = compact ? 5 : 8
  ctx.beginPath()
  pts.forEach(([px, py], i) => (i ? ctx.lineTo(px, py) : ctx.moveTo(px, py)))
  ctx.stroke()
  ctx.shadowColor = C.cyan
  ctx.shadowBlur = 18
  ctx.strokeStyle = C.cyan
  ctx.beginPath()
  ctx.moveTo(pts[0][0], pts[0][1])
  for (let i = 1; i <= cur.i; i++) ctx.lineTo(pts[i][0], pts[i][1])
  ctx.lineTo(cur.p[0], cur.p[1])
  ctx.stroke()
  ctx.shadowBlur = 0
  // stops
  ;[0, 3, 5, pts.length - 1].forEach((k, j) => {
    const [px, py] = pts[k]
    const c = j === 0 ? C.lime : j === 3 ? C.pink : C.violet
    ctx.beginPath()
    ctx.arc(px, py, compact ? 7 : 10, 0, Math.PI * 2)
    ctx.fillStyle = c
    ctx.fill()
    ctx.beginPath()
    ctx.arc(px, py, compact ? 3 : 4, 0, Math.PI * 2)
    ctx.fillStyle = '#0a1122'
    ctx.fill()
  })
  // vehicle + pulse
  const pulse = (t * 1.2) % 1
  ctx.beginPath()
  ctx.arc(cur.p[0], cur.p[1], (compact ? 10 : 14) + pulse * (compact ? 22 : 34), 0, Math.PI * 2)
  ctx.fillStyle = `rgba(34,211,238,${0.35 * (1 - pulse)})`
  ctx.fill()
  ctx.beginPath()
  ctx.arc(cur.p[0], cur.p[1], compact ? 9 : 12, 0, Math.PI * 2)
  ctx.fillStyle = '#e0f7ff'
  ctx.fill()
  ctx.beginPath()
  ctx.arc(cur.p[0], cur.p[1], compact ? 5 : 7, 0, Math.PI * 2)
  ctx.fillStyle = C.cyan
  ctx.fill()
  ctx.restore()
  return u
}

const ROUTE_KM = 24.6
const RATE = 12

function routoLaptop(ctx, w, h, t) {
  chrome(ctx, w, 'routo.app/live')
  sidebar(ctx, h, 'Routo', C.cyan, ['Live map', 'Drivers', 'Trips', 'Payouts', 'Reports'], 0)
  txt(ctx, 'ON TRIP NOW', 24, 420, F.mono(12), C.faint)
  ;[['D7', 'Driver 07', 'On trip'], ['D3', 'Driver 03', 'Loading'], ['D12', 'Driver 12', 'Idle']].forEach(([ini, name, st], i) => {
    const y = 440 + i * 62
    box(ctx, 14, y, 202, 52, 12, i === 0 ? '#141a30' : null, C.line)
    box(ctx, 26, y + 10, 32, 32, 16, i === 0 ? C.cyan : '#232a45')
    txt(ctx, ini, 42, y + 31, F.body(12, 700), i === 0 ? '#06121a' : C.muted, 'center')
    txt(ctx, name, 70, y + 23, F.body(14, 600), C.text)
    txt(ctx, st, 70, y + 41, F.body(12), i === 0 ? C.lime : C.muted)
  })
  const u = drawMap(ctx, 230, 44, w - 230, h - 44, t)
  const km = u * ROUTE_KM
  box(ctx, 260, 70, 340, 40, 20, 'rgba(14,18,34,0.9)', C.line)
  txt(ctx, '⌕  Search driver, vehicle or route', 282, 96, F.body(14), C.muted)
  // stat cards
  const cx = w - 290
  box(ctx, cx, 70, 260, 196, 18, 'rgba(14,18,34,0.92)', C.line)
  txt(ctx, 'DISTANCE', cx + 22, 104, F.mono(12), C.faint)
  txt(ctx, `${km.toFixed(1)} km`, cx + 22, 150, F.display(40), C.text)
  txt(ctx, 'AUTO PAYOUT', cx + 22, 190, F.mono(12), C.faint)
  txt(ctx, `₹ ${(km * RATE).toFixed(2)}`, cx + 22, 234, F.display(34), C.lime)
  txt(ctx, `₹${RATE}/km`, cx + 238, 234, F.mono(12), C.muted, 'right')
  box(ctx, cx, 284, 260, 150, 18, 'rgba(14,18,34,0.92)', C.line)
  txt(ctx, 'TRIPS THIS WEEK', cx + 22, 316, F.mono(12), C.faint)
  for (let i = 0; i < 7; i++) {
    const bh = 30 + ((Math.sin(i * 1.7) + 1) / 2) * 60
    box(ctx, cx + 24 + i * 32, 414 - bh, 20, bh, 5, i === 6 ? C.cyan : '#26304f')
  }
}

function routoPhone(ctx, w, h, t) {
  statusBar(ctx, w)
  txt(ctx, 'Good morning, Driver 07', 28, 100, F.body(15), C.muted)
  txt(ctx, "Today's trip", 28, 140, F.display(32), C.text)
  const u = drawMap(ctx, 20, 164, w - 40, 300, t, true)
  const km = u * ROUTE_KM
  txt(ctx, `${km.toFixed(1)}`, 28, 560, F.display(76, 700), C.text)
  txt(ctx, 'km', 28 + ctx.measureText(km.toFixed(1)).width + 10, 560, F.display(28), C.muted)
  txt(ctx, `₹ ${(km * RATE).toFixed(2)} earned`, 28, 600, F.body(20, 600), C.lime)
  box(ctx, 20, 626, (w - 52) / 2, 64, 16, C.panel, C.line)
  box(ctx, 32 + (w - 52) / 2, 626, (w - 52) / 2, 64, 16, C.panel, C.line)
  txt(ctx, 'STOPS', 38, 652, F.mono(11), C.faint)
  txt(ctx, `${Math.min(4, 1 + Math.floor(u * 4))} / 4`, 38, 678, F.display(20), C.text)
  txt(ctx, 'STATUS', 50 + (w - 52) / 2, 652, F.mono(11), C.faint)
  txt(ctx, 'On route', 50 + (w - 52) / 2, 678, F.display(20), C.cyan)
  box(ctx, 20, h - 104, w - 40, 62, 31, grad(ctx, 20, 0, w - 20, 0, [C.cyan, C.violet]))
  txt(ctx, 'End trip', w / 2, h - 64, F.body(19, 700), '#06121a', 'center')
}

function ictLaptop(ctx, w, h, t) {
  chrome(ctx, w, 'ict-report/dashboard')
  sidebar(ctx, h, 'ICT Report', C.violet, ['Dashboard', 'Employees', 'Production', 'Reports', 'Settings'], 0)
  const x0 = 260
  txt(ctx, 'Productivity dashboard', x0, 100, F.display(30), C.text)
  txt(ctx, 'Live · updated just now', x0, 126, F.body(14), C.muted)
  box(ctx, w - 160, 74, 128, 36, 18, C.panel, C.line)
  txt(ctx, 'Today ▾', w - 96, 98, F.body(14, 600), C.text, 'center')
  const kpis = [
    ['PRODUCTION', (1284 + Math.floor(Math.sin(t) * 6 + t * 2) % 40).toLocaleString('en-IN'), C.cyan],
    ['EFFICIENCY', `${86 + Math.round(Math.sin(t * 0.7) * 2)}%`, C.violet],
    ['ACTIVE STAFF', '42', C.pink],
    ['TARGETS MET', `${92 + Math.round(Math.sin(t * 0.5))}%`, C.lime],
  ]
  const kw = (w - x0 - 30 - 3 * 18) / 4
  kpis.forEach(([l, v, c], i) => {
    const x = x0 + i * (kw + 18)
    box(ctx, x, 150, kw, 120, 16, C.panel, C.line)
    txt(ctx, l, x + 18, 180, F.mono(11), C.faint)
    txt(ctx, v, x + 18, 226, F.display(34), C.text)
    ctx.strokeStyle = c
    ctx.lineWidth = 2.5
    ctx.beginPath()
    for (let k = 0; k < 12; k++) {
      const px = x + kw - 110 + k * 8
      const py = 238 + Math.sin(k * 0.9 + t * 1.5 + i) * 8
      k ? ctx.lineTo(px, py) : ctx.moveTo(px, py)
    }
    ctx.stroke()
  })
  // bar chart
  const bw = (w - x0 - 30) * 0.64
  box(ctx, x0, 290, bw, 300, 18, C.panel, C.line)
  txt(ctx, 'Output by hour', x0 + 22, 324, F.display(18), C.text)
  for (let i = 0; i < 12; i++) {
    const v = 0.35 + (Math.sin(t * 1.1 + i * 0.75) * 0.5 + 0.5) * 0.6
    const bh = v * 200
    const bx = x0 + 28 + i * ((bw - 56) / 12)
    box(ctx, bx, 560 - bh, (bw - 56) / 12 - 12, bh, 6, grad(ctx, 0, 560 - bh, 0, 560, [i % 3 ? C.violet : C.pink, 'rgba(34,211,238,0.35)']))
    txt(ctx, `${9 + i}`, bx + ((bw - 56) / 12 - 12) / 2, 580, F.mono(11), C.faint, 'center')
  }
  // donut
  const dx = x0 + bw + 18
  const dw = w - 30 - dx
  box(ctx, dx, 290, dw, 300, 18, C.panel, C.line)
  txt(ctx, 'Shift split', dx + 22, 324, F.display(18), C.text)
  const cxd = dx + dw / 2
  const cyd = 452
  const segs = [[0.46, C.cyan], [0.32, C.violet], [0.22, C.pink]]
  let a0 = -Math.PI / 2 + t * 0.15
  segs.forEach(([f, c]) => {
    ctx.beginPath()
    ctx.strokeStyle = c
    ctx.lineWidth = 22
    ctx.arc(cxd, cyd, 82, a0, a0 + f * Math.PI * 2 - 0.05)
    ctx.stroke()
    a0 += f * Math.PI * 2
  })
  txt(ctx, '3 shifts', cxd, cyd + 8, F.display(22), C.text, 'center')
  // table
  box(ctx, x0, 610, w - x0 - 30, h - 640, 18, C.panel, C.line)
  ;['Team A', 'Team B', 'Team C'].forEach((name, i) => {
    const y = 648 + i * 40
    txt(ctx, name, x0 + 22, y, F.body(15, 600), C.text)
    const pct = 0.55 + (Math.sin(t * 0.6 + i * 2) * 0.5 + 0.5) * 0.4
    box(ctx, x0 + 160, y - 12, w - x0 - 330, 10, 5, '#1d2440')
    box(ctx, x0 + 160, y - 12, (w - x0 - 330) * pct, 10, 5, [C.cyan, C.violet, C.pink][i])
    txt(ctx, `${Math.round(pct * 100)}%`, w - 60, y, F.mono(14), C.muted, 'right')
  })
}

function ictPhone(ctx, w, h, t) {
  statusBar(ctx, w)
  txt(ctx, 'ICT Report', 28, 104, F.display(30), C.text)
  txt(ctx, 'Live productivity', 28, 130, F.body(15), C.muted)
  const cw = (w - 52) / 2
  ;[['OUTPUT', '1,284', C.cyan], ['EFFICIENCY', `${86 + Math.round(Math.sin(t * 0.7) * 2)}%`, C.violet], ['STAFF', '42', C.pink], ['TARGETS', '92%', C.lime]].forEach(([l, v, c], i) => {
    const x = 20 + (i % 2) * (cw + 12)
    const y = 160 + Math.floor(i / 2) * 112
    box(ctx, x, y, cw, 100, 18, C.panel, C.line)
    box(ctx, x + 16, y + 18, 8, 8, 4, c)
    txt(ctx, l, x + 32, y + 27, F.mono(11), C.faint)
    txt(ctx, v, x + 16, y + 76, F.display(32), C.text)
  })
  box(ctx, 20, 396, w - 40, 250, 20, C.panel, C.line)
  txt(ctx, 'Output by hour', 38, 432, F.display(17), C.text)
  for (let i = 0; i < 8; i++) {
    const v = 0.3 + (Math.sin(t * 1.1 + i * 0.8) * 0.5 + 0.5) * 0.65
    const bh = v * 160
    box(ctx, 40 + i * 40, 622 - bh, 24, bh, 6, grad(ctx, 0, 622 - bh, 0, 622, [C.violet, 'rgba(34,211,238,0.4)']))
  }
  box(ctx, 20, h - 104, w - 40, 62, 31, grad(ctx, 20, 0, w - 20, 0, [C.violet, C.pink]))
  txt(ctx, 'Export report', w / 2, h - 64, F.body(19, 700), '#0b0716', 'center')
}

function photo(ctx, x, y, w, h, r, t, hue) {
  ctx.save()
  rr(ctx, x, y, w, h, r)
  ctx.clip()
  ctx.fillStyle = grad(ctx, x, y, x + w, y + h, [`hsl(${hue} 70% 18%)`, `hsl(${hue + 20} 80% 38%)`, `hsl(${hue - 10} 60% 10%)`])
  ctx.fillRect(x, y, w, h)
  for (let i = 0; i < 7; i++) {
    const bx = x + ((i * 0.37 + Math.sin(t * 0.2 + i) * 0.05) % 1) * w
    const by = y + ((i * 0.53 + 0.2) % 1) * h
    const br = (0.08 + (i % 3) * 0.05) * Math.min(w, h)
    const g = ctx.createRadialGradient(bx, by, 0, bx, by, br)
    g.addColorStop(0, `hsla(${hue + 30} 100% 70% / 0.55)`)
    g.addColorStop(1, `hsla(${hue + 30} 100% 70% / 0)`)
    ctx.fillStyle = g
    ctx.beginPath()
    ctx.arc(bx, by, br, 0, Math.PI * 2)
    ctx.fill()
  }
  // a silhouette horizon
  ctx.fillStyle = 'rgba(0,0,0,0.45)'
  ctx.beginPath()
  ctx.moveTo(x, y + h)
  ctx.quadraticCurveTo(x + w * 0.3, y + h * 0.62, x + w * 0.55, y + h * 0.78)
  ctx.quadraticCurveTo(x + w * 0.8, y + h * 0.66, x + w, y + h * 0.8)
  ctx.lineTo(x + w, y + h)
  ctx.fill()
  ctx.restore()
}

function studioLaptop(ctx, w, h, t) {
  chrome(ctx, w, 'redstudio.in')
  ctx.fillStyle = '#0b0708'
  ctx.fillRect(0, 44, w, h - 44)
  ctx.beginPath()
  ctx.arc(52, 92, 10, 0, Math.PI * 2)
  ctx.fillStyle = C.red
  ctx.fill()
  txt(ctx, 'RED STUDIO', 72, 100, F.display(22, 700), C.text)
  ;['Services', 'Packages', 'Gallery', 'Team', 'Careers'].forEach((l, i) => txt(ctx, l, 430 + i * 112, 99, F.body(15), C.muted))
  box(ctx, w - 170, 74, 136, 40, 20, C.red)
  txt(ctx, 'Book now', w - 102, 100, F.body(15, 700), '#fff', 'center')
  txt(ctx, 'PHOTOGRAPHY · FILM · EVENTS', 52, 220, F.mono(14), '#f87171')
  txt(ctx, 'Every frame', 50, 300, F.display(70, 700), C.text)
  txt(ctx, 'tells a', 50, 378, F.display(70, 700), C.text)
  ctx.font = F.display(70, 700)
  const off = ctx.measureText('tells a ').width
  txt(ctx, 'story.', 50 + off, 378, F.display(70, 700), grad(ctx, 50 + off, 0, 50 + off + 220, 0, ['#f87171', '#fb923c']))
  txt(ctx, 'Portraits, weddings and events — shot with care,', 52, 430, F.body(18), C.muted)
  txt(ctx, 'delivered beautifully.', 52, 456, F.body(18), C.muted)
  box(ctx, 52, 494, 170, 52, 26, C.red)
  txt(ctx, 'Book a shoot', 137, 526, F.body(16, 700), '#fff', 'center')
  box(ctx, 238, 494, 170, 52, 26, null, '#3b2224')
  txt(ctx, 'View gallery', 323, 526, F.body(16, 600), C.text, 'center')
  photo(ctx, 640, 170, 340, 420, 20, t, 0)
  photo(ctx, 1000, 170, 240, 200, 20, t + 3, 20)
  photo(ctx, 1000, 390, 240, 200, 20, t + 6, 340)
  // viewfinder
  ctx.strokeStyle = 'rgba(255,255,255,0.7)'
  ctx.lineWidth = 2
  ;[[660, 190, 1, 1], [960, 190, -1, 1], [660, 570, 1, -1], [960, 570, -1, -1]].forEach(([x, y, sx, sy]) => {
    ctx.beginPath()
    ctx.moveTo(x, y + 26 * sy)
    ctx.lineTo(x, y)
    ctx.lineTo(x + 26 * sx, y)
    ctx.stroke()
  })
  if (Math.floor(t * 1.5) % 2 === 0) {
    ctx.beginPath()
    ctx.arc(684, 222, 7, 0, Math.PI * 2)
    ctx.fillStyle = C.red
    ctx.fill()
  }
  txt(ctx, 'REC', 698, 228, F.mono(14, 600), C.text)
  ;['Portraits', 'Weddings', 'Events', 'Films'].forEach((l, i) => {
    box(ctx, 52 + i * 146, 640, 130, 110, 16, '#140c0e', '#2a1a1c')
    txt(ctx, `0${i + 1}`, 70 + i * 146, 676, F.mono(13), '#f87171')
    txt(ctx, l, 70 + i * 146, 728, F.display(20), C.text)
  })
}

function studioPhone(ctx, w, h, t) {
  ctx.fillStyle = '#0b0708'
  ctx.fillRect(0, 0, w, h)
  statusBar(ctx, w)
  ctx.beginPath()
  ctx.arc(34, 94, 8, 0, Math.PI * 2)
  ctx.fillStyle = C.red
  ctx.fill()
  txt(ctx, 'RED STUDIO', 50, 101, F.display(18, 700), C.text)
  ;[0, 1, 2].forEach((i) => box(ctx, w - 52, 84 + i * 8, 26, 3, 2, C.text))
  photo(ctx, 20, 130, w - 40, 300, 22, t, 0)
  txt(ctx, 'Every frame', 28, 490, F.display(38, 700), C.text)
  txt(ctx, 'tells a story.', 28, 534, F.display(38, 700), '#f87171')
  box(ctx, 28, 560, 170, 50, 25, C.red)
  txt(ctx, 'Book a shoot', 113, 591, F.body(16, 700), '#fff', 'center')
  const tw = (w - 52) / 2
  photo(ctx, 20, 636, tw, 150, 16, t + 2, 20)
  photo(ctx, 32 + tw, 636, tw, 150, 16, t + 5, 340)
}

const SITES = ['Church site · Texas', 'Community site · Ohio', 'Church site · Georgia', 'Ministry site · Florida', 'Church site · Tennessee', 'Community site · Iowa', 'Church site · Arizona']

function weconnectLaptop(ctx, w, h, t) {
  chrome(ctx, w, 'weconnectonline.com/admin')
  sidebar(ctx, h, 'WeConnect', C.pink, ['Sites', 'Content transfer', 'Media', 'QA checks', 'Publish'], 1)
  const x0 = 260
  txt(ctx, 'Content transfer', x0, 100, F.display(30), C.text)
  txt(ctx, 'Church & community websites · United States', x0, 126, F.body(14), C.muted)
  // ring
  box(ctx, x0, 150, 330, 420, 20, C.panel, C.line)
  const cx = x0 + 165
  const cy = 330
  ctx.lineWidth = 20
  ctx.strokeStyle = '#1d2440'
  ctx.beginPath()
  ctx.arc(cx, cy, 110, 0, Math.PI * 2)
  ctx.stroke()
  const fill = Math.min(1, ((t * 0.12) % 1.25))
  ctx.strokeStyle = grad(ctx, cx - 110, 0, cx + 110, 0, [C.cyan, C.violet, C.pink])
  ctx.lineCap = 'round'
  ctx.beginPath()
  ctx.arc(cx, cy, 110, -Math.PI / 2, -Math.PI / 2 + fill * Math.PI * 2)
  ctx.stroke()
  ctx.lineCap = 'butt'
  txt(ctx, '40+', cx, cy + 14, F.display(56, 700), C.text, 'center')
  txt(ctx, 'sites migrated', cx, cy + 44, F.body(15), C.muted, 'center')
  txt(ctx, '✓ Content accuracy', x0 + 30, 506, F.body(15, 600), C.lime)
  txt(ctx, '✓ Formatting consistency', x0 + 30, 536, F.body(15, 600), C.lime)
  // list
  const lx = x0 + 350
  const lw = w - lx - 30
  box(ctx, lx, 150, lw, h - 180, 20, C.panel, C.line)
  txt(ctx, 'MIGRATION QUEUE', lx + 24, 186, F.mono(12), C.faint)
  const step = (t * 0.6) % SITES.length
  SITES.forEach((s, i) => {
    const y = 214 + i * 76
    box(ctx, lx + 16, y, lw - 32, 62, 14, '#0f1426', C.line)
    box(ctx, lx + 32, y + 15, 32, 32, 9, i % 2 ? 'rgba(244,114,182,0.15)' : 'rgba(34,211,238,0.15)')
    txt(ctx, '⌂', lx + 48, y + 38, F.body(16, 700), i % 2 ? C.pink : C.cyan, 'center')
    txt(ctx, s, lx + 80, y + 37, F.body(16, 600), C.text)
    const pct = i < Math.floor(step) ? 1 : i === Math.floor(step) ? step % 1 : 0
    box(ctx, lx + lw - 330, y + 27, 170, 8, 4, '#1d2440')
    box(ctx, lx + lw - 330, y + 27, 170 * pct, 8, 4, pct === 1 ? C.lime : C.cyan)
    const done = pct === 1
    box(ctx, lx + lw - 140, y + 16, 110, 30, 15, done ? 'rgba(163,230,53,0.14)' : 'rgba(34,211,238,0.12)')
    txt(ctx, done ? 'Migrated' : pct > 0 ? 'Moving…' : 'Queued', lx + lw - 85, y + 36, F.body(13, 600), done ? C.lime : pct > 0 ? C.cyan : C.muted, 'center')
  })
}

function weconnectPhone(ctx, w, h, t) {
  statusBar(ctx, w)
  txt(ctx, 'Community Church', 28, 100, F.display(20, 700), C.text)
  ;[0, 1, 2].forEach((i) => box(ctx, w - 52, 84 + i * 8, 26, 3, 2, C.text))
  ctx.save()
  rr(ctx, 20, 126, w - 40, 280, 22)
  ctx.clip()
  ctx.fillStyle = grad(ctx, 20, 126, w - 20, 406, ['#1e1b4b', '#6d28d9', '#db2777'])
  ctx.fillRect(20, 126, w - 40, 280)
  const g = ctx.createRadialGradient(w * 0.7, 180 + Math.sin(t) * 10, 0, w * 0.7, 200, 160)
  g.addColorStop(0, 'rgba(255,220,180,0.55)')
  g.addColorStop(1, 'rgba(255,220,180,0)')
  ctx.fillStyle = g
  ctx.fillRect(20, 126, w - 40, 280)
  ctx.restore()
  txt(ctx, 'Welcome home.', 40, 350, F.display(36, 700), '#fff')
  txt(ctx, 'Join us this Sunday', 40, 382, F.body(16), 'rgba(255,255,255,0.8)')
  txt(ctx, 'SERVICE TIMES', 28, 448, F.mono(12), C.faint)
  ;['Sunday · 9:00 AM', 'Sunday · 11:00 AM', 'Wednesday · 7:00 PM'].forEach((s, i) => {
    box(ctx, 20, 464 + i * 70, w - 40, 58, 14, C.panel, C.line)
    txt(ctx, s, 40, 500 + i * 70, F.body(16, 600), C.text)
    txt(ctx, '›', w - 44, 501 + i * 70, F.body(22, 600), C.muted, 'right')
  })
  box(ctx, 20, h - 104, w - 40, 62, 31, grad(ctx, 20, 0, w - 20, 0, [C.pink, C.violet]))
  txt(ctx, 'Plan a visit', w / 2, h - 64, F.body(19, 700), '#fff', 'center')
}

const PAIRS = [
  [routoLaptop, routoPhone],
  [ictLaptop, ictPhone],
  [studioLaptop, studioPhone],
  [weconnectLaptop, weconnectPhone],
]

export const LAPTOP_SIZE = [1280, 800]
export const PHONE_SIZE = [400, 840]

export function createScreens() {
  const make = ([w, h]) => {
    const c = document.createElement('canvas')
    c.width = w
    c.height = h
    return c
  }
  const laptop = PAIRS.map(() => make(LAPTOP_SIZE))
  const phone = PAIRS.map(() => make(PHONE_SIZE))
  const draw = (i, t) => {
    const lc = laptop[i].getContext('2d')
    lc.fillStyle = C.bg
    lc.fillRect(0, 0, ...LAPTOP_SIZE)
    PAIRS[i][0](lc, ...LAPTOP_SIZE, t)
    const pc = phone[i].getContext('2d')
    pc.fillStyle = C.bg
    pc.fillRect(0, 0, ...PHONE_SIZE)
    PAIRS[i][1](pc, ...PHONE_SIZE, t)
  }
  PAIRS.forEach((_, i) => draw(i, 0))
  return { laptop, phone, draw }
}
