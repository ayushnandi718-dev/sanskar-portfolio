# Sanskar Pandey - Portfolio

A modern, interactive portfolio for **Sanskar Pandey**, an app and software developer.
Built with **React 19 + Vite + Tailwind CSS v4** on the front end and a small
**Express** API for the contact form.

Dark, developer-focused interface with an aurora backdrop, cursor glow, scroll
reveals, magnetic buttons, a 3D tilt code card, animated counters, tabbed skill
groups, and full project case-study modals with keyboard navigation.

---

## Tech stack

| Layer      | Tools                                                          |
| ---------- | -------------------------------------------------------------- |
| Front end  | React 19, Vite 8, Tailwind CSS v4, Framer Motion, Lucide icons |
| Backend    | Node.js, Express 5, Nodemailer, dotenv                         |
| Fonts      | Space Grotesk, Inter, JetBrains Mono (Google Fonts)            |
| Contact    | Optional SMTP email + local JSON storage fallback              |

---

## Getting started

Requirements: **Node.js 20+** and npm.

```bash
npm install
npm run dev
```

- Web app: <http://localhost:5173>
- API: <http://localhost:8787>
- Vite proxies `/api` requests to the Express server.

### Production build

```bash
npm run build
npm start
```

`npm start` serves the built `dist/` folder and the API from
<http://localhost:8787> on a single port. Use `npm run serve` to build and start
in one command.

### Available scripts

| Script  | Description                                         |
| ------- | --------------------------------------------------- |
| `dev`   | API with file watching + Vite dev server            |
| `build` | Production build into `dist/`                       |
| `start` | Run the Express server (serves `dist/` and the API) |
| `serve` | `build` followed by `start`                         |
| `preview` | Preview the Vite build locally                    |

---

## Contact form

The form posts to `POST /api/contact`.

- Validates name, email and message on both client and server.
- Rate limits to **5 submissions per 10 minutes per IP**.
- Uses a hidden honeypot field to reject basic bots.
- Always stores submissions in `data/messages.json` (git-ignored).
- Sends an email when SMTP credentials are present.

### Optional email delivery

Copy `.env.example` to `.env` and fill in your mail provider details:

```ini
PORT=8787
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-address@gmail.com
SMTP_PASS=your-app-password
CONTACT_TO=pyc0453@gmail.com
CONTACT_FROM=your-address@gmail.com
```

For Gmail, use an **App Password** rather than your account password. Without
SMTP values, messages are still saved locally and the health endpoint reports
`"email": "stored"`. Check `GET /api/health` to confirm the running mode.

---

## Project structure

```text
.
├── index.html              # Meta tags, fonts, JSON-LD, favicon
├── vite.config.js          # React + Tailwind plugins, /api proxy
├── public/
│   └── favicon.svg
├── server/
│   └── index.js            # Express API, validation, rate limit, static host
├── src/
│   ├── main.jsx
│   ├── App.jsx             # Section composition, scroll progress, modal state
│   ├── index.css           # Tailwind theme, components, animations
│   ├── data/
│   │   └── portfolio.js    # Profile, services, projects, skills, experience
│   └── components/
│       ├── Header.jsx      # Sticky nav, active-section pill, mobile menu
│       ├── Hero.jsx        # Intro, stats, socials, marquee
│       ├── DevCard.jsx     # Tabbed code window with copy + typewriter
│       ├── About.jsx
│       ├── Services.jsx
│       ├── Skills.jsx
│       ├── Projects.jsx    # Tilt cards + case-study trigger
│       ├── ProjectModal.jsx
│       ├── Experience.jsx
│       ├── Contact.jsx
│       ├── Footer.jsx      # Includes AUX STUDIO credit
│       ├── ui.jsx          # Reveal, Magnetic, SpotlightCard, Counter, etc.
│       └── icons.jsx       # Brand icons (GitHub, LinkedIn, WhatsApp, Play)
└── .env.example
```

All editable content lives in `src/data/portfolio.js` - update profile links,
services, projects, skills and experience there.

---

## Editing content

- **Profile & links** - `profile` in `src/data/portfolio.js`.
- **Services** - `services` array (icon keys map to Lucide icons in `Services.jsx`).
- **Projects** - `projects` array. Each entry includes accent colours, a
  `rotation` value for the phone mockup, case-study copy and a Play Store link.
- **Skills / experience / marquee** - matching arrays in the same file.
- **Metadata** - `index.html` (`<title>`, description, Open Graph, JSON-LD).

---

## Deployment

Any Node host works (Render, Railway, Fly.io, a VPS, etc.):

1. Build command: `npm install && npm run build`
2. Start command: `npm start`
3. Set `PORT` if the platform requires it, plus the optional SMTP variables.
4. Persist the `data/` directory if you want stored messages to survive
   redeploys (or rely on SMTP delivery).

The app is a standard static SPA plus one API route, so a platform that runs
Node is the simplest option. `dist/` is generated and should not be committed.

---

## Notes & caveats

- No personal photo or résumé is included; the site uses an initials-based
  identity. A résumé can be provided on request.
- The exact Firebase technologies used by **NMJ** and **ApnaFood** have not been
  independently verified, so those projects list only **Android + Firebase**.
  **ApplyZ** includes the fuller Kotlin / Compose / Firestore stack.
- Phone numbers, email and social links are taken from the details provided by
  Sanskar. Double-check them before publishing.

---

## Credits

Designed and built with care. Footer credit:
**Made by [AUX STUDIO](https://aux-studio.vercel.app)**.

© Sanskar Pandey. All rights reserved.
