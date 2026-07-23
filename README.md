# justice-watch

Join the JusticeWatch waitlist to unlock a 2026 incident briefing map with source-linked, area-specific case details.

## Overview
Join the JusticeWatch waitlist to unlock a 2026 incident briefing map with source-linked, area-specific case details.

## Tech Stack
- React
- Vite
- Netlify (deployed)

## Project Structure
```
justice-watch/
  - public
  - src
  (25 files total)
```

## Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Installation
```bash
git clone https://github.com/1nc0gn30/justice-watch.git
cd justice-watch
npm install
```

### Development
```bash
npm run dev
```

### Build
```bash
npm run build
```

### Available Scripts
  npm run dev - vite --port=3000 --host=0.0.0.0
  npm run build - vite build
  npm run preview - vite preview
  npm run clean - rm -rf dist
  npm run lint - tsc --noEmit

## Original README
<details>
<summary>Click to expand original README</summary>

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

</details>

## TODO / Roadmap
- [ ] Add unit tests
- [ ] Add LICENSE file
- [ ] Add Dockerfile for containerized deployment
- [ ] Consider adding Tailwind CSS
- [ ] Add CI/CD pipeline
- [ ] Add contribution guidelines (CONTRIBUTING.md)
- [ ] Improve error handling and edge cases
- [ ] Add environment variable documentation
- [ ] Update dependencies to latest versions
- [ ] Add code comments and inline documentation

## Deployment
This project is deployed on Netlify. See netlify.toml for configuration.

## Author
**Neal Frazier** - [@AshAmplifies](https://github.com/1nc0gn30)

## Links
- GitHub: https://github.com/1nc0gn30/justice-watch

---
*This README was enhanced as part of the neals-projects-2026 batch update.*
