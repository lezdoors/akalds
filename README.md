# akalds

Corporate site for **Akal Digital Services Ltd** — a UK private limited holding company.

Live: <https://www.akalds.com>

## Stack

- Vite + React + TypeScript
- Tailwind CSS + shadcn-ui
- React Router, React Query, Framer Motion
- Lovable project: <https://lovable.dev/projects/e1b43d07-278b-4ff4-88e0-fc0234fbe156>
- Deployed via Vercel (project `akalds`, team Haddaoui Pro)

## Local

```sh
npm install
npm run dev      # http://localhost:8080
npm run build    # production build into dist/
npm run preview  # preview the build
```

## Deploy

Pushes to `main` auto-deploy to `www.akalds.com`. Apex `akalds.com` 308-redirects to `www`.

Edits made via Lovable also commit automatically to this repo.
