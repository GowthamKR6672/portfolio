# Gowtham K R — Portfolio

An immersive 3D portfolio built with **React, Three.js (react-three-fiber), postprocessing, Framer Motion and Lenis**.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
npm run preview  # serve the production build
```

## Edit the content

Everything on the page — profile, stats, skills, experience, projects, repos, education, certifications — lives in
[`src/data/resume.js`](src/data/resume.js). Change it there; no component edits needed.

- **Live demo links:** add `live: 'https://…'` to any entry in `repos` to show a "Live" button on its card.
- **New GitHub repos** appear automatically (the GitHub section reads the public GitHub API, and falls back to the
  list in `resume.js` if the API is unavailable). Add an entry to `repos` to give it a title, description and category.
- **Skill logos** in the 3D orbit come from `sphereSkills`; `group` decides which category lights them up.
- **Resume download:** replace `public/Gowtham_KR_Resume.docx` (or point `profile.resume` at a PDF).

## Welcome screen

Every visit opens on a "choose your world" screen ([`src/welcome/`](src/welcome)): a cartoon of Gowtham,
his designation and a short intro, and three world cards. Hovering a card previews that world behind the
character; clicking opens the site in it (the last choice is marked "Last visited"). The switcher inside
each world changes it later.

The cartoon (`public/me-cartoon.webp`, plus the waist-up `me-cartoon-bust.webp` used in the Studio hero)
is `Image Cartoon.png` with its background removed (rembg). To change it, replace those two WebPs with
transparent cut-outs. The source images (`Image.PNG`, `Image Cartoon.png`) are kept out of git.

## Themes

A switcher at the top swaps between three complete sites (each visitor's choice is remembered,
and it switches with a circular reveal). All three read the same content from `src/data/resume.js`.

| Theme | Modelled on | What it is |
| --- | --- | --- |
| **Neon** (default) | — | Immersive particle world: scroll-morphing particles, 3D laptop & phone, repo carousel. [`src/sites/neon/`](src/sites/neon) + `src/components/` + `src/three/` |
| **Studio** | heynesh.com | Warm editorial one-pager: giant name that flies into a sticky sidebar, 3D "G" centrepiece that blurs into the backdrop, curving journey timeline with stories, dark horizontal work strip, capabilities, toolkit, chat CTA, draggable learning cards, FAQ, giant footer name. [`src/sites/studio/`](src/sites/studio) — copy in `content.js` |
| **Orbit** | edolus.com | Cinematic scroll journey: loader → "Initiate system" gate → camera flight from a satellite over a procedural Earth, down through the clouds to project nodes showing live app screens, a repository array, and back to orbit. Generated ambient audio. [`src/sites/orbit/`](src/sites/orbit) — copy in `chapters.js`, camera keyframes in `OrbitScene.jsx` |

Studio's hero centrepiece is a 3D "G"; set `photo` in `resume.js` to a transparent cut-out portrait
(e.g. `public/gowtham.png`) to use a photo instead, like the reference site.

## How the 3D world works

One fixed, full-screen WebGL canvas ([`src/three/World.jsx`](src/three/World.jsx)) sits behind the whole page.

| Section | What the particles become | Extra |
| --- | --- | --- |
| Hero | React-style atom | Floating chips, scroll-velocity marquee |
| About | DNA helix | Holographic developer ID card |
| Skills | Sphere | 26 tech logos orbit it; hovering a category highlights its logos |
| Experience | Data terrain | Sticky year numbers |
| Projects | Portal ring | Pinned scroll: a 3D laptop + phone open up and show live app screens per project |
| GitHub | Spiral galaxy | Draggable 3D card carousel |
| Education | Lattice cube | Bento grid |
| Contact | Wave sea | — |

- **Particles** — [`shapes.js`](src/three/shapes.js) builds every shape with the same point count;
  [`particleShaders.js`](src/three/particleShaders.js) blends between them on the GPU, with a staggered swirl. Every
  shape turns to face the cursor and drifts after it (`MouseRig` in `World.jsx`; strength set there). Per-section positions/scales are in `layoutFor()`.
- **Scroll → world** — `ScrollDriver` in `World.jsx` turns scroll position into a section index and the projects
  progress, stored in [`store.js`](src/three/store.js).
- **Devices** — [`Devices.jsx`](src/three/Devices.jsx) models the laptop and phone; their screens are canvases drawn
  in [`screens.js`](src/three/screens.js) (illustrative UIs) and switch with a glitch transition.

Desktop renders ~16k particles with bloom; phones render ~7k without bloom. `prefers-reduced-motion` turns off
smooth scrolling, the loader and continuous animation.

## Deploy to Vercel

1. Push this folder to a GitHub repo.
2. In Vercel, **Add New → Project**, import the repo. Vercel detects Vite automatically
   (build `npm run build`, output `dist`).
