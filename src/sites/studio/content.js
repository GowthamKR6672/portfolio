// Copy for the Studio site. Everything here is drawn from src/data/resume.js
// (and the GitHub repos) — edit freely.

export const hero = {
  headline: ['Real-Time Apps,', 'Built for', 'Real Business.'],
  tagline: ['The Full-Stack Developer.', "That's Gowtham."],
  blurb: 'Working with teams to turn business workflows into real-time software — tracking, dashboards and automation that hold up in daily use.',
  traits: ['Real-time', 'Reliable', 'Analytical', 'Builder', 'Automator'],
}

export const navLeft = [
  ['home', 'Home'],
  ['journey', 'About me'],
  ['work', 'Projects'],
]
export const navRight = [
  ['what', 'What you get'],
  ['toolkit', 'Toolkit'],
  ['learning', 'Learning'],
  ['faq', 'FAQ'],
]

export const journey = [
  {
    year: "'19",
    full: '2019',
    title: 'Commerce meets computers',
    short: 'After HSC, I picked a degree that mixes business and technology.',
    long: 'After finishing HSC at Sri Valliappa Vidhyalayam (2018–2019, 65%), I joined K S Rangasamy College of Arts and Science, Tiruchengode for a B.Com in Computer Applications (2019–2022, CGPA 6.65) — commerce fundamentals alongside computer applications.',
    handle: '@ksr-college',
    ago: '7 years ago',
  },
  {
    year: "'20",
    full: '2020',
    title: 'First job, real books',
    short: 'An accounting internship in Pune: ledgers, reconciliations and the first look at how a business runs.',
    long: 'From May to December 2020 I interned in accounting at Stark Logistics, Pune — maintaining accounting records and inventory data, helping with accounts payable, receivable and bank reconciliations, preparing financial reports, and tracking client accounts in accounting software.',
    handle: '@stark-logistics',
    ago: '6 years ago',
  },
  {
    year: "'22",
    full: '2022',
    title: 'Studying how businesses work',
    short: 'A postgraduate degree, and two field studies at Tata Motors on customers and employees.',
    long: 'I joined Wisdom School of Management, Coimbatore for a postgraduate degree (2022–2024, 70%). Alongside it I ran two study projects at Tata Motors: a customer satisfaction analysis built on real feedback data, and a work-life balance study across departments — each ending in a report with recommendations.',
    handle: '@wisdom-school',
    ago: '4 years ago',
  },
  {
    year: "'24",
    full: '2024',
    title: 'Process Analyst at I-Cons',
    short: 'Where operations and software met: workflows, automation, reporting and the tools behind them.',
    long: 'At I-Cons Technologies I manage business process operations and make sure client requirements ship on time. I analyse workflows for improvement and automation, handle data validation, reporting, QA and documentation, and work with development and operations teams on the web apps, internal tools and reporting systems the organisation runs on.',
    handle: '@i-cons',
    ago: '2 years ago',
  },
  {
    year: "'26",
    full: '2026',
    title: 'The journey continues',
    short: 'Shipping real-time apps — GPS tracking, dashboards, billing, attendance — and pushing every one to GitHub.',
    long: 'Routo tracks drivers live and automates kilometre-based payouts. ICT Report turns production counts into dashboards. Red Studio, 40+ migrated church and community sites, and 15+ public repositories later, the work keeps moving toward real-time systems.',
    handle: '@github',
    ago: 'just now',
  },
]

export const statement = [
  'Process thinking, clean code and real-time systems combined — turning',
  { icon: 'flow' },
  'messy workflows into',
  { icon: 'bolt' },
  'software that teams',
  { icon: 'heart' },
  'actually enjoy using.',
]

export const capabilities = [
  { icon: 'stack', title: 'Full-Stack Web Apps', text: 'React front ends on Node.js and Express APIs, with MongoDB or SQL keeping the data in order.' },
  { icon: 'pin', title: 'Real-Time Tracking', text: 'GPS location tracking, distance calculation and live updates — as built for Routo.' },
  { icon: 'chart', title: 'Dashboards & Reports', text: 'Production counts, performance and operational metrics turned into reports managers read.' },
  { icon: 'flow', title: 'Process Automation', text: 'Finding the repetitive step in a workflow and replacing it with a tool that does it for you.' },
  { icon: 'phone', title: 'Android Apps', text: 'Native Kotlin apps for people who work on the move, not at a desk.' },
]

export const toolkit = [
  {
    icon: 'code',
    title: 'Frontend',
    lead: 'React.js',
    text: 'Interfaces that stay fast and readable — from studio websites to live dashboards.',
    items: ['HTML5 & CSS3', 'JavaScript & TypeScript', 'React.js & Next.js', 'Bootstrap & Tailwind CSS', 'Responsive, mobile-first layouts'],
    note: 'For websites and web apps people use every day.',
  },
  {
    icon: 'server',
    title: 'Backend & Data',
    lead: 'Node.js',
    text: 'APIs and data models that keep the business numbers correct.',
    items: ['Node.js & Express.js', 'REST API development', 'Python — Flask & FastAPI', 'MongoDB & SQL', 'Socket.IO for live updates'],
    note: 'For systems where the data has to be right.',
  },
  {
    icon: 'phone',
    title: 'Mobile & Tooling',
    lead: 'Kotlin',
    text: 'Android apps, and the tooling that gets everything shipped.',
    items: ['Android development with Kotlin', 'GPS & location features', 'Git & GitHub', 'Postman & VS Code', 'Vercel deployments'],
    note: 'For teams that work in the field.',
  },
]

export const learning = [
  { title: ['Post Graduate', 'Degree'], text: 'Wisdom School of Management, Coimbatore. Field studies at Tata Motors on customer satisfaction and work-life balance.', who: 'Wisdom School of Management', sub: '2022 — 2024 · 70%' },
  { title: ['B.Com', '(Computer Applications)'], text: 'Commerce fundamentals with computer applications — the start of building software for business.', who: 'K S Rangasamy College', sub: '2019 — 2022 · CGPA 6.65' },
  { title: ['Full Stack Web', 'Development'], text: 'Certification covering front-end, back-end and how the two talk to each other.', who: 'Certification', sub: 'Web development' },
  { title: ['Python', 'Programming'], text: 'Certification in Python — the language behind my Flask and FastAPI projects.', who: 'Certification', sub: 'Programming' },
  { title: ['HTML5 & CSS3', 'Development'], text: 'Certification in semantic markup and modern, responsive styling.', who: 'Certification', sub: 'Web foundations' },
  { title: ['Advanced Excel', '& Digital Marketing'], text: 'Two certifications from the business side: data handling in Excel, and how products reach people online.', who: 'Certifications', sub: 'Business tools' },
  { title: ['State Level', 'Javelin Throw'], text: 'Competed in the javelin throw at state level.', who: 'Achievement', sub: 'Athletics' },
  { title: ['National Level', 'Seminar'], text: 'Took part in a national-level seminar on Productive Resources Cost Management.', who: 'Achievement', sub: 'Cost management' },
]

export const faq = [
  ['What do you do at I-Cons Technologies?', "I'm a Process Analyst: I manage business process operations, analyse workflows for automation opportunities, handle data validation, reporting and QA, and support the web apps and internal tools the team relies on."],
  ['Which stack do you build with?', 'React.js on the front end, Node.js and Express for APIs, MongoDB or SQL for data, plus Python and Kotlin where they fit. My GitHub projects also use Next.js, TypeScript, Tailwind, Flask and FastAPI.'],
  ['Can you build real-time features?', 'Yes. Routo tracks drivers live with GPS and calculates kilometre-based payouts, and several of my GitHub apps use Socket.IO or Pusher for live updates.'],
  ['Do you build mobile apps?', 'Yes — Android apps in Kotlin. Routo’s driver tracking is one example.'],
  ['Have you handled website migrations?', 'For WeConnectOnline.com I transferred content for 40+ church and community websites in the United States, checking accuracy and formatting on each one.'],
  ['What did you do before development?', 'Commerce: a B.Com in Computer Applications, an accounting internship at Stark Logistics in Pune, and a postgraduate degree from Wisdom School of Management. It’s why I care about the numbers being right.'],
  ['Where are you based?', 'Erode, Tamil Nadu, India.'],
  ['How do I get in touch?', 'Email gowthamkr6672@gmail.com or call +91 87780 76672 — or use the Let’s Talk button anywhere on this page.'],
]
