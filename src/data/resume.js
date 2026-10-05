// All portfolio content lives here — edit this file to update the site.

export const profile = {
  name: 'Gowtham K R',
  roles: ['Full-Stack Developer', 'Process Analyst', 'Automation Builder', 'Android Developer'],
  email: 'gowthamkr6672@gmail.com',
  phone: '+91 87780 76672',
  location: 'Erode, Tamil Nadu, India',
  github: 'https://github.com/Gowtham-KR6672',
  githubUser: 'Gowtham-KR6672',
  resume: '/Gowtham_KR_Resume.docx',
  current: { role: 'Process Analyst', company: 'I-Cons Technologies' },
  lead:
    'I build real-time business apps — GPS driver tracking, productivity dashboards, billing and attendance systems — and automate the processes behind them.',
  summary:
    'Results-oriented Process Analyst with experience across business operations, software development, website management and process automation. I develop real-time business applications, employee productivity systems, driver tracking solutions and website migration projects — bringing strong analytical, problem-solving and communication skills, and a genuine passion for technology and continuous learning.',
}

export const stats = [
  { value: 40, suffix: '+', label: 'Websites migrated for US churches & communities' },
  { value: 15, suffix: '+', label: 'Public repositories shipped on GitHub' },
  { value: 4, suffix: '', label: 'Real-time business projects delivered' },
  { value: 2024, suffix: '', label: 'Joined I-Cons Technologies as Process Analyst', plain: true },
]

const di = (path) => `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${path}.svg`

// `invert` flips dark logos so they read on the dark background.
export const sphereSkills = [
  { name: 'React.js', icon: di('react/react-original'), group: 'Frontend' },
  { name: 'Node.js', icon: di('nodejs/nodejs-original'), group: 'Backend & APIs' },
  { name: 'JavaScript', icon: di('javascript/javascript-original'), group: 'Frontend' },
  { name: 'TypeScript', icon: di('typescript/typescript-original'), group: 'Frontend' },
  { name: 'Python', icon: di('python/python-original'), group: 'Backend & APIs' },
  { name: 'Kotlin', icon: di('kotlin/kotlin-original'), group: 'Mobile' },
  { name: 'HTML5', icon: di('html5/html5-original'), group: 'Frontend' },
  { name: 'CSS3', icon: di('css3/css3-original'), group: 'Frontend' },
  { name: 'MongoDB', icon: di('mongodb/mongodb-original'), group: 'Data' },
  { name: 'SQL', icon: di('mysql/mysql-original'), group: 'Data' },
  { name: 'Express.js', icon: di('express/express-original'), invert: true, group: 'Backend & APIs' },
  { name: 'Bootstrap', icon: di('bootstrap/bootstrap-original'), group: 'Frontend' },
  { name: 'Android', icon: di('android/android-original'), group: 'Mobile' },
  { name: 'Git', icon: di('git/git-original'), group: 'Tooling' },
  { name: 'GitHub', icon: di('github/github-original'), invert: true, group: 'Tooling' },
  { name: 'VS Code', icon: di('vscode/vscode-original'), group: 'Tooling' },
  { name: 'Postman', icon: di('postman/postman-original'), group: 'Tooling' },
  { name: 'Next.js', icon: di('nextjs/nextjs-original'), invert: true, group: 'Frontend' },
  { name: 'Tailwind', icon: di('tailwindcss/tailwindcss-original'), group: 'Frontend' },
  { name: 'Flask', icon: di('flask/flask-original'), invert: true, group: 'Backend & APIs' },
  { name: 'FastAPI', icon: di('fastapi/fastapi-original'), group: 'Backend & APIs' },
  { name: 'PostgreSQL', icon: di('postgresql/postgresql-original'), group: 'Data' },
  { name: 'Socket.IO', icon: di('socketio/socketio-original'), invert: true, group: 'Backend & APIs' },
  { name: 'Three.js', icon: di('threejs/threejs-original'), invert: true, group: 'Frontend' },
  { name: 'Vite', icon: di('vitejs/vitejs-original'), group: 'Tooling' },
  { name: 'REST APIs', glyph: '{ }', group: 'Backend & APIs' },
]

export const skillGroups = [
  {
    title: 'Frontend',
    glyph: '</>',
    accent: 'cyan',
    items: ['HTML5', 'CSS3', 'JavaScript', 'React.js', 'Bootstrap'],
    extra: ['TypeScript', 'Next.js', 'Tailwind CSS'],
  },
  {
    title: 'Backend & APIs',
    glyph: '{ }',
    accent: 'violet',
    items: ['Node.js', 'Express.js', 'REST API Development', 'Python'],
    extra: ['Flask', 'FastAPI', 'Socket.IO', 'JWT auth'],
  },
  {
    title: 'Mobile',
    glyph: '▣',
    accent: 'lime',
    items: ['Kotlin', 'Android Application Development', 'GPS & location tracking'],
    extra: ['PWA'],
  },
  {
    title: 'Data',
    glyph: '◈',
    accent: 'pink',
    items: ['MongoDB', 'SQL', 'Data validation', 'Reporting & dashboards'],
    extra: ['PostgreSQL', 'Advanced Excel'],
  },
  {
    title: 'Tooling',
    glyph: '⌘',
    accent: 'cyan',
    items: ['Git', 'GitHub', 'VS Code', 'Postman'],
    extra: ['Vercel', 'Docker'],
  },
  {
    title: 'Process & Ops',
    glyph: '↻',
    accent: 'violet',
    items: ['Workflow analysis', 'Process automation', 'Quality assurance', 'Documentation'],
    extra: ['Digital marketing'],
  },
]

export const experience = [
  {
    role: 'Process Analyst',
    company: 'I-Cons Technologies',
    period: '2024 — Present',
    current: true,
    points: [
      'Manage business process operations and ensure timely delivery of client requirements.',
      'Analyze workflows and identify opportunities for process improvement and automation.',
      'Handle data validation, reporting, quality assurance and documentation activities.',
      'Collaborate with development and operations teams to improve productivity and efficiency.',
      'Support web applications, internal tools and reporting systems used across the organization.',
    ],
    tags: ['Process automation', 'Reporting', 'QA', 'Internal tools', 'Web apps'],
  },
  {
    role: 'Accounting Intern',
    company: 'Stark Logistics, Pune',
    period: 'May 2020 — Dec 2020',
    points: [
      'Maintained accounting records and inventory data.',
      'Assisted with accounts payable, receivable and bank reconciliations.',
      'Prepared financial reports and bookkeeping records.',
      'Worked with accounting software to track client accounts and transactions.',
    ],
    tags: ['Accounting', 'Reconciliation', 'Bookkeeping', 'Financial reports'],
  },
]

export const featuredProjects = [
  {
    id: 'routo',
    title: 'Routo',
    kind: 'Transportation management app',
    tagline: 'Real-time driver tracking with automatic, kilometre-based payouts.',
    stack: ['Kotlin', 'Node.js', 'React.js', 'SQL'],
    points: [
      'Tracks drivers in real time with GPS-based location tracking.',
      'Calculates distance travelled and automates kilometre-based driver payments.',
      'Generates travel reports and route summaries for management.',
    ],
    url: 'routo.app/live',
  },
  {
    id: 'ict',
    title: 'ICT Report',
    kind: 'Employee productivity system',
    tagline: 'Production counts, performance and operational metrics in one live dashboard.',
    stack: ['React.js', 'Node.js', 'MongoDB'],
    points: [
      'Monitors production counts, employee performance and operational metrics.',
      'Generates dashboards and reports for management review.',
      'Improved visibility into workforce productivity and reporting accuracy.',
    ],
    url: 'ict-report/dashboard',
  },
  {
    id: 'studio',
    title: 'Red Studio',
    kind: 'Photography studio website',
    tagline: 'A responsive, mobile-first site for a studio business — built to feel cinematic.',
    stack: ['HTML', 'CSS', 'JavaScript', 'React'],
    points: [
      'Designed and developed a responsive website for a studio business.',
      'Applied modern UI/UX principles with mobile-friendly layouts.',
      'Optimized performance and the overall user experience.',
    ],
    url: 'redstudio/home',
    repo: 'https://github.com/Gowtham-KR6672/Joystudio',
  },
  {
    id: 'globe',
    title: 'WeConnectOnline.com',
    kind: 'Website content transfer',
    tagline: 'Content migration for 40+ church and community websites across the United States.',
    stack: ['Content migration', 'CMS', 'QA'],
    points: [
      'Transferred content for 40+ church and community websites in the US.',
      'Ensured content accuracy, formatting consistency and site quality.',
      'Collaborated with teams on ongoing website updates and maintenance.',
    ],
    url: 'weconnectonline.com',
  },
]

// Descriptions come from each repo's README and source.
// Add a `live` URL to any repo to show a "Live" button on its card.
export const repos = [
  { name: 'SocialPlatform', title: 'SocialPlatform', description: 'Multi-client dashboard to plan, approve, publish and track social media content across eight platforms.', stack: ['Python', 'Flask', 'PostgreSQL', 'Docker', 'Capacitor'], category: 'Web App', language: 'Python' },
  { name: 'Buildmax', title: 'Build Max', description: 'Responsive Next.js landing page and lead-capture form for Build Max, a Chennai luxury home developer.', stack: ['Next.js', 'React', 'TypeScript', 'CSS'], category: 'Business Website', language: 'CSS' },
  { name: 'Restaurant', title: 'Gourmet Scan', description: 'QR-code digital menu and real-time ordering with admin, cashier, kitchen, delivery and tracking views.', stack: ['Next.js', 'TypeScript', 'Tailwind', 'MongoDB', 'Pusher'], category: 'Web App', language: 'TypeScript' },
  { name: 'Attendance', title: 'Team Attendance Admin', description: 'Admin attendance app to manage employees, mark Present / Absent / Leave / WFH and view filtered summaries.', stack: ['React', 'Vite', 'Express', 'MongoDB', 'Socket.IO'], category: 'Web App', language: 'JavaScript' },
  { name: 'Resume-Format', title: '6Degrees CV Formatter', description: 'AI tool that reformats uploaded candidate resumes into client-specific DOCX templates.', stack: ['JavaScript', 'Claude API', 'JSZip', 'Serverless'], category: 'Tool', language: 'HTML' },
  { name: 'Construction', title: 'Valar Construction Workforce', description: 'Workforce portal for attendance, salary, overtime, leave approvals and construction site management.', stack: ['React', 'Vite', 'Express', 'MongoDB', 'PWA'], category: 'Web App', language: 'JavaScript' },
  { name: 'Driverlogin', title: 'Driver Login & Live Tracking', description: 'Driver work-entry system with admin user management, live GPS tracking, route history and report downloads.', stack: ['Python', 'Flask', 'Socket.IO', 'PostgreSQL'], category: 'Web App', language: 'HTML' },
  { name: 'Chemist', title: 'Quantum Chemistry Analyzer', description: 'Enter a compound name to get AI-generated chemical properties and a 2D SVG molecular diagram.', stack: ['Python', 'FastAPI', 'Anthropic API', 'JavaScript'], category: 'Tool', language: 'HTML' },
  { name: 'MMMTraders', title: 'MMM Traders', description: 'Retail management PWA for products, orders, sales, income and customers, plus a customer bills portal.', stack: ['Next.js', 'TypeScript', 'shadcn/ui', 'MongoDB', 'Recharts'], category: 'Web App', language: 'TypeScript' },
  { name: 'HB-Solutions', title: 'HB Solutions', description: 'Company website offering enterprise data automation, custom web platforms and 3D web experiences.', stack: ['Vite', 'Three.js', 'GSAP', 'MongoDB'], category: 'Business Website', language: 'HTML' },
  { name: 'Hb-Habits', title: 'HB Habits', description: 'Habit tracker with a dashboard, analytics and GPS-based activity tracking on maps.', stack: ['React', 'Vite', 'Leaflet', 'Express', 'MongoDB'], category: 'Productivity', language: 'JavaScript' },
  { name: 'HB-Notes', title: 'HB Notes', description: 'Markdown notes PWA with auto-save, tags, search, pinning, trash, public share links and uploads.', stack: ['Next.js', 'TypeScript', 'MongoDB', 'Zustand', 'Cloudinary'], category: 'Productivity', language: 'TypeScript' },
  { name: 'Joystudio', title: 'Red Studio Photography', description: 'Studio site with services, packages, gallery, video, team, careers, booking and an admin dashboard.', stack: ['React', 'Vite', 'Tailwind', 'Framer Motion'], category: 'Business Website', language: 'JavaScript' },
  { name: 'billing-vercel', title: 'Billing Workspace', description: 'Invoice billing tracker with assignable sheets, UOM quantities, billed status and Excel export.', stack: ['React', 'Express', 'MongoDB', 'SheetJS'], category: 'Finance', language: 'JavaScript' },
  { name: 'Hb-Money', title: 'HB Money', description: 'Personal finance app for income and expenses, with analytics, OTP login and monthly PDF statements.', stack: ['React', 'Recharts', 'Express', 'MongoDB', 'PDFKit'], category: 'Finance', language: 'JavaScript' },
]

// Last-updated fallbacks, used if the live GitHub API can't be reached.
export const repoUpdated = {
  SocialPlatform: '2026-10-05', Buildmax: '2026-10-01', Restaurant: '2026-08-19', Attendance: '2026-07-27',
  'Resume-Format': '2026-06-17', Construction: '2026-06-12', Driverlogin: '2026-05-28', Chemist: '2026-05-20',
  MMMTraders: '2026-05-10', 'HB-Solutions': '2026-05-05', 'Hb-Habits': '2026-04-27', 'HB-Notes': '2026-04-21',
  Joystudio: '2026-04-14', 'billing-vercel': '2026-04-08', 'Hb-Money': '2026-03-20',
}

export const education = [
  { school: 'Wisdom School of Management', place: 'Coimbatore', degree: 'Post Graduate Degree', years: '2022 — 2024', score: '70%', pct: 70 },
  { school: 'K S Rangasamy College of Arts and Science', place: 'Tiruchengode', degree: 'B.Com (Computer Applications)', years: '2019 — 2022', score: '6.65 CGPA', pct: 66.5 },
  { school: 'Sri Valliappa Vidhyalayam', place: '', degree: 'Higher Secondary (HSC)', years: '2018 — 2019', score: '65%', pct: 65 },
  { school: 'Valliappa Vidhyalayam', place: '', degree: 'Secondary School (SSC)', years: '2016 — 2017', score: '80%', pct: 80 },
]

export const studies = [
  {
    title: 'Customer Satisfaction Analysis',
    org: 'Tata Motors',
    points: [
      'Studied customer satisfaction levels in detail.',
      'Collected and analyzed customer feedback data.',
      'Identified key factors affecting customer experience and service quality.',
      'Prepared reports and recommendations from the findings.',
    ],
  },
  {
    title: 'Work-Life Balance Study',
    org: 'Tata Motors',
    points: [
      'Studied work-life balance among employees across departments.',
      'Analyzed factors affecting employee productivity and satisfaction.',
      'Evaluated the challenges employees face balancing work and personal life.',
      'Presented findings and improvement recommendations.',
    ],
  },
]

export const certifications = [
  'Full Stack Web Development',
  'Python Programming',
  'HTML5 & CSS3 Development',
  'Advanced Excel',
  'Digital Marketing',
]

export const achievements = [
  { title: 'State Level Javelin Throw', note: 'Athletics' },
  { title: 'National Level Seminar', note: 'Productive Resources Cost Management' },
]
