# Multi-domain Anti-Fake Information

A lightweight demo to crowd-verify and explain claims across multiple domains (sports, music, gaming, weather, economics, anime, drama). The app supports domain tagging and filtering, evidence links, community voting and comments, and transparent status computation (Fake / Not Fake / Uncertain). It uses mock data and client-side storage only (no backend).

**Tips**
Because we have already done it and pushed it directly, the amount of modifications that individuals push may differ from the actual situation

**Project Goal**
- Aggregate suspicious/rumor-like items across domains and surface transparent evidence.
- Build community consensus via votes and comments, aiming for explainable outcomes.
- Provide simple filters and pagination for classroom demo and evaluation.

**Suggested Themes (choose or mix)**
- Sports: transfers, match-fixing, injuries, coaching changes
- Music: concert cancellations, artist scandals, forged announcements
- Gaming: release delays, studio closures, e-sports controversies
- Weather: extreme events rumors, city-wide shutdown claims
- Economics: market crashes, policy rumors, insolvency hoaxes
- Anime: production delays, cast changes, licensing disputes
- Drama/TV: season cancellations, cast departures, ratings manipulation
- Other: health, tech, education, social topics

**Features**
- Home: paginated list with domain and status filters; adjustable items per page; loading skeletons.
- Details: full item info, status, reporter, time, and evidence image link.
- Comments: paginated comments with aggregated vote results; loading skeletons.
- Vote: choose Fake/Not Fake, add reasoning and optional image URL; immediate local updates.
- Status: computed from vote counts (mock base votes + your session votes).
- Storage: session-only via `sessionStorage` (clears on hard reload; fine for demo).

**Recent UI Polish**
- Sticky, blurred header; gradient brand text; centered footer with comfortable spacing.
- Home cards with soft background, hover shadow and border highlight; domain as badge.
- Comments skeletons and items card-styled for better readability.
- Vote form card-styled with tactile radio interactions; unified button/pagination hover.

**Tech Stack**
- React 19, React Router 7
- Vite (rolldown-vite@7.1.14)
- Tailwind CSS 4 + PostCSS
- ESLint (React Hooks/Refresh)

**Team (小组信息)**
- Rushford — 20232066
- Rance — 20232038
- S1mple — 20232035

**Project Structure**
```
src/
  App.jsx, App.css, index.css, main.jsx
  data/mockNews.js
  pages/{Home, NewsDetails, Comments, Vote}.jsx
  components/Pagination.jsx
  store/StoreContext.jsx
```

**Local Development**
- Install & run:
  - `npm install`
  - `npm run dev`
- Build & preview:
  - `npm run build`
  - `npm run preview`

**Deployment (Vercel)**
- Recommended settings:
  - Build command: `npm run build`
  - Output directory: `dist`
- Reminder: use a verified GitHub email and make non-empty commits to ensure contribution and deployment attribution (see Deployment Note below).

**Data & Routes**
- Mock data: `src/data/mockNews.js`
- Routes: `/` (Home), `/news/:id` (Details), `/news/:id/comments` (Comments), `/news/:id/vote` (Vote)
- Storage: comments/votes are kept in `sessionStorage` during the session

**Roadmap (TODO)**
- Search and richer filtering (domain/time/source)
- i18n (keep default English UI; optional Chinese)
- Theme switcher and broader responsive tuning
- Backend integration (auth, persistence, source verification)

**Video Demo**
- [Watch on YouTube](https://youtu.be/snlc9JK9Qpo)