# akalds

Corporate site for **Akal Digital Services Ltd** — a UK private limited holding company.

Live: <https://www.akalds.com>

## Stack

- Vite + React + TypeScript
- Tailwind CSS v4 (via `@tailwindcss/vite`)
- Deployed via Vercel (project `akalds`, team Haddaoui Pro)

## Local

```sh
pnpm install
pnpm dev      # http://localhost:5173
pnpm build    # production build into dist/
pnpm preview  # preview the build
```

## Deploy

Pushes to `main` auto-deploy to `www.akalds.com`. Apex `akalds.com` 308-redirects to `www`.
