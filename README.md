# Multi-domain Anti-Fake Information
Projec

A simple sports-focused system to crowd-verify information and rumors about sports events, teams, and players. Users can view items, filter by status (All / Fake / Not Fake / Uncertain), open details, see comments and vote with reasoning and optional evidence image links. Votes determine the computed status of each item. This app uses mock data and client-side storage only.

## Group Information

- Group Name: `GROUP_NAME_HERE`
- Members:
  - Member 1: `STUDENT_ID_1` — `STUDENT_NAME_1`
  - Member 2: `STUDENT_ID_2` — `STUDENT_NAME_2`
  - Member 3: `STUDENT_ID_3` — `STUDENT_NAME_3`

## URLs

- Deployed Website (Vercel): `https://YOUR-VERCEL-APP.vercel.app/`
- Demo Video (2–3 minutes): `https://YOUR-VIDEO-URL`

## Project Goal

Project goal: <<fill in your information>>

Hints (choose one domain or combine several):
- Fake information about sports (transfers, match-fixing, injuries, coaching changes)
- Fake information about music (concert cancellations, artist scandals, forged announcements)
- Fake information about gaming (release delays, studio closures, e-sports controversies)
- Fake information about weather (extreme events rumors, city-wide shutdown claims)
- Fake information about economics (market crashes, policy rumors, company insolvency hoaxes)
- Fake information about anime (production delays, cast changes, licensing disputes)
- Fake information about drama/TV (season cancellations, cast departures, ratings manipulations)

## Features

- Home page: paginated list of 100 English sports items with filters (All / Fake / Not Fake / Uncertain) and adjustable items per page.
- Details page: full item details, status, reporter, date/time, and image link (clickable) with embedded preview.
- Details page also includes a structured Sources section listing league office, club, and sports media references.
- Comments page: paginated list of comments and vote results.
- Loading skeletons: Home and Comments show lightweight loading skeletons for better UX.
- Vote page: select Fake or Not Fake, add a comment and an optional image URL; updates are stored locally and reflected immediately.
- Status is computed from vote counts (mock base votes + your session votes).
- Storage: votes/comments you add are stored in `sessionStorage` during the session. On a full page reload, session votes are cleared (acceptable per requirement).

## Tech Stack

- React + Vite
- React Router for routing
- Session Storage for temporary client-side persistence
- Tailwind CSS for responsive UI and utility-first styling (configured via PostCSS).

## Local Development

```bash
npm install
npm run dev
```

Open the shown `Local` URL in your browser.

## Vercel Deployment

1. Push this repo to GitHub.
2. Visit Vercel and import the GitHub repository.
3. Framework preset: `Vite` (or `Other`).
4. Build command: `npm run build`
5. Output directory: `dist`
6. Deploy. Copy the URL into the README above.

Alternatively with CLI:

```bash
npm i -g vercel
vercel
vercel --prod
```

## Notes

- This is a single-page application demo. No real backend.
- Comments and votes added during the session are visible immediately; they may be removed after a hard reload.
- Mock data is provided to exercise pagination and filtering.

## License

Public educational sample. Replace group details with your own before submission.