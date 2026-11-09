# Sanskar Pandey — Portfolio

Personal portfolio for **Sanskar Pandey**, an app & software developer building
Android, iOS, Flutter and web products. Built with React 19, Vite 8, Tailwind v4
and Framer Motion, and deployed as a static site on Vercel.

**Live:** https://sanskar-pandey.vercel.app

## Overview

- **Dark, gold-accented theme** with animated background atmosphere
- **Sections:** Hero, About, Services, Skills, Work, Experience, Contact
- **Project modals** with detail views
- **Contact section without a form** — direct email and WhatsApp calls to action,
  a "how it works" walkthrough, and a fit checklist
- **Responsive** from mobile to desktop, with reduced-motion support

## Getting started

### Prerequisites

- Node.js 18 or newer
- npm

### Install

```bash
npm install
```

### Environment

The site is fully static and needs no API keys. Copy the optional example file
only if you want to change the local server port:

```bash
cp .env.example .env
```

```env
PORT=8787
```

### Run

```bash
npm run dev     # CSS build + Vite + local Express server
```

Other scripts:

| Script | Description |
| --- | --- |
| `npm run dev` | CSS build, Vite dev server, and local Express server |
| `npm run build` | Generate CSS and build the production bundle into `dist/` |
| `npm start` | Serve the built `dist/` folder with the Express server |
| `npm run preview` | Preview the production build with Vite |
| `npm run css` | Generate `src/generated.css` once |
| `npm run css:watch` | Regenerate CSS on change |

`src/generated.css` is generated from the Tailwind sources by
`scripts/build-css.mjs` and is git-ignored — always build with `npm run build`
(not a bare `vite build`).

## Project structure

```
.
├── src/
│   ├── components/        # Section and UI components
│   │   ├── Header.jsx
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Services.jsx
│   │   ├── Skills.jsx
│   │   ├── Projects.jsx
│   │   ├── Experience.jsx
│   │   ├── Contact.jsx    # Direct contact panel (no form)
│   │   ├── Footer.jsx
│   │   └── ...
│   ├── data/portfolio.js  # Profile, services, projects, experience
│   ├── App.jsx
│   └── index.css
├── server/index.js        # Static file server + /api/health
├── scripts/build-css.mjs  # Tailwind CSS generation
├── vercel.json            # Vercel build configuration
└── package.json
```

## Deployment

Hosted on Vercel and auto-deployed from the `master` branch. `vercel.json`
runs `npm run build` (so the CSS is generated first) and serves `dist/`.

## Tech stack

- **Frontend:** React 19, Vite 8, Framer Motion, Tailwind v4
- **Icons:** Lucide React
- **Server:** Express 5 (local/static serving and `/api/health`)

## License

MIT
