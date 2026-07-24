<!-- xonettn -->
<div align="center">

# ⚛️ JusticeWatch

JusticeWatch is a frontend-only incident briefing map built with React, Vite, Leaflet, and Tailwind.


![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB) ![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white) ![Netlify](https://img.shields.io/badge/Netlify-00C7B7?logo=netlify&logoColor=white)

![Deploy](https://img.shields.io/badge/Deployed-Netlify-00C7B7?logo=netlify&logoColor=white)

</div>

---

## Current Product Behavior
- Users see a mandatory waitlist modal on load.
- Users must submit an email to unlock the map view.
- The map displays curated 2026 incident pinpoints with detailed incident cards and source links.
- No Firebase, Supabase, or auth dependency is used.

## 💻 Local Development
1. Install dependencies:
   `npm install`
2. Start dev server:
   `npm run dev`
3. Validate:
   `npm run lint`
   `npm run build`

## 📝 Netlify Notes
- A static hidden form (`waitlist`) is included in `index.html` so Netlify can detect submissions.
- For production, deploy with:
  - Build command: `npm run build`
  - Publish directory: `dist`

---

<div align="center">

**[xonettn]** · Built by [Neal Frazier](https://github.com/1nc0gn30) · [@AshAmplifies](https://twitter.com/AshAmplifies)

</div>
