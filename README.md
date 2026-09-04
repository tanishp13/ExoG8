# ExoGait

Interactive dark-mode product showcase and pitch deck for **ExoGait**, a mechatronic exosleeve — built with React, Vite, Tailwind CSS, Framer Motion, and `@react-three/fiber` + `@react-three/drei`.

## Getting started

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

## 3D model

The interactive inspector loads `public/models/exogait.glb`. Drop your own file at that path to replace it — the scene automatically normalizes whatever geometry it finds to fit the camera views and hotspot markers. If the file is missing or fails to load, a stylized fallback mesh renders instead so the page never breaks.

## Structure

- `src/components/Navbar.jsx` — fixed header with smooth-scroll nav
- `src/components/Hero.jsx` — headline, CTAs, key stats
- `src/components/ExoGait3D.jsx` — interactive 3D hotspot inspector
- `src/components/SpecsGrid.jsx` — performance cards + spec/comparison matrices
- `src/components/Applications.jsx` — use-case cards
- `src/components/PitchDeck.jsx` — problem/solution/how-it-works/roadmap
- `src/components/WaitlistFooter.jsx` — waitlist form + contact footer
