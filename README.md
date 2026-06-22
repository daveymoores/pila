# PILA

PILA is a not-for-profit, open-source platform for innovative learning assessments. Teachers use PILA to monitor student learning and gain insights into concepts and skills demonstrated in technology-enhanced tasks. Each module includes dynamic assessment with adaptive feedback.

This site is the public marketing and content site for PILA, powered by [Prismic CMS](https://prismic.io/) and deployed on [Vercel](https://vercel.com/?utm_source=pila-app&utm_campaign=oss).

[![Powered By Vercel](https://github.com/daveymoores/pila/blob/main/public/powered-by-vercel.svg?raw=true)](https://vercel.com/?utm_source=pila-app&utm_campaign=oss)

## Stack

- **Next.js 16** (Pages Router) + **React 19**
- **TypeScript 5.9**
- **Prismic** — `@prismicio/client`, `@prismicio/next`, Slice Machine
- **styled-components 6**, **Grommet**, **Framer Motion 12**
- **Firebase** (auth), **SendGrid** (contact form)
- **Node.js 22+**

## Requirements

- Node.js **22** or later
- Yarn

## Getting started

### Install dependencies

```bash
yarn install
```

### Environment variables

Copy the example env file:

```bash
cp .env.example .env.local
```

Fill in `.env.local` with credentials from Vercel, Prismic, Firebase, and SendGrid for full functionality.

| Variable | Purpose |
| --- | --- |
| `PRISMIC_ACCESS_TOKEN` | Prismic API (optional for published content) |
| `NEXT_PUBLIC_FIREBASE_*` | Firebase client auth |
| `FIREBASE_PRIVATE_KEY`, `FIREBASE_CLIENT_EMAIL` | Firebase Admin (API routes) |
| `SENDGRID_API_KEY`, `SENDGRID_TEMPLATE_ID`, `PILA_EMAIL` | Contact form emails |
| `NEXT_PUBLIC_GOOGLE_ANALYTICS` | Google Tag Manager |
| `NEXT_PUBLIC_GOOGLE_RECAPTCHA` | Contact form reCAPTCHA |
| `SITE_URL` | Canonical URL for sitemap generation |

### Run locally without real credentials

Published Prismic content works without a token. For Firebase, SendGrid, and auth bypasses, use mock mode:

```bash
yarn dev:mock
```

Or copy the mock env once and use normal dev:

```bash
cp .env.mock .env.local
yarn dev
```

Mock mode sets `MOCK_INTEGRATIONS=true`. **Do not enable this in production.**

Open [http://localhost:3000](http://localhost:3000).

### Run with production credentials

```bash
yarn dev
```

## Scripts

| Command | Description |
| --- | --- |
| `yarn dev` | Start development server |
| `yarn dev:mock` | Start dev server with mock env |
| `yarn build` | Production build |
| `yarn start` | Serve production build |
| `yarn test` | Run Jest unit tests |
| `yarn lint` | ESLint |
| `yarn tsc` | TypeScript check |
| `yarn checklist` | Lint + tsc + tests |
| `yarn slicemachine` | Slice Machine UI (port 9999) |
| `yarn storybook` | Storybook (port 8888) |

## Prismic & Slice Machine

- Repository: `pila`
- Client config: `prismicio.ts`
- Slices: `slices/`
- Slice simulator: `/slice-simulator` (local dev)

Start Slice Machine:

```bash
yarn slicemachine
```

## Testing & CI

```bash
yarn checklist
```

GitHub Actions runs lint, TypeScript, tests, and build on pushes to `main` and `development`.

## Deployment

The site deploys to Vercel. Set environment variables in the Vercel project dashboard — do not commit `.env.local`.

Production URL: [https://pila.vercel.app](https://pila.vercel.app)

## Project structure

```
pages/           Next.js routes
slices/          Prismic slice components
src/             React components (atoms → organisms)
helpers/         Data fetching & parsing utilities
lib/             Firebase, auth, Prismic helpers
prismicio.ts     Prismic client & link resolvers
fixtures/        Local fallbacks (e.g. contact form)
```