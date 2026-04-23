# JusticeWatch

JusticeWatch is a frontend-only incident briefing map built with React, Vite, Leaflet, and Tailwind.

## Current Product Behavior
- Users see a mandatory waitlist modal on load.
- Users must submit an email to unlock the map view.
- The map displays curated 2026 incident pinpoints with detailed incident cards and source links.
- No Firebase, Supabase, or auth dependency is used.

## Local Development
1. Install dependencies:
   `npm install`
2. Start dev server:
   `npm run dev`
3. Validate:
   `npm run lint`
   `npm run build`

## Netlify Notes
- A static hidden form (`waitlist`) is included in `index.html` so Netlify can detect submissions.
- For production, deploy with:
  - Build command: `npm run build`
  - Publish directory: `dist`
