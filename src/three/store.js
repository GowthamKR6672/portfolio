// Shared, mutable state between the DOM and the WebGL world.
// Written from scroll / hover handlers, read inside useFrame — never triggers React renders.
export const world = {
  // Float section index (0 = hero … 7 = contact); drives the particle morph.
  section: 0,
  // Pinned projects sequence: 0..1 across the section, and how "on stage" the devices are.
  projects: { progress: 0, enter: 0, active: 0 },
  // Smoothed mouse response shared by every 3D object: yaw/pitch (radians)
  // and a drift (world units) toward the cursor.
  mouse: { yaw: 0, pitch: 0, x: 0, y: 0 },
  // Skill group highlighted from the DOM list (null = none).
  skillHover: null,
  // Set by the World once the first frame has rendered.
  ready: false,
}

export const SECTION_IDS = ['home', 'about', 'skills', 'experience', 'projects', 'github', 'education', 'contact']

export const isNarrow = () => typeof window !== 'undefined' && window.innerWidth <= 900

// Handy for inspecting the world from the console while developing.
if (import.meta.env.DEV && typeof window !== 'undefined') window.__world = world
