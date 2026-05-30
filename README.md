# RetBankX — Retail Banking Dashboard

A modern retail banking dashboard built with Next.js 14, Cloudscape Design System, and Recharts.

This project was developed as a **frontend engineering mini-project evaluation** for **PKF Research Center** by **Salathiel Ojage**.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **UI:** Cloudscape Design System (`@cloudscape-design/components`)
- **State:** Redux Toolkit + RTK Query
- **Forms:** react-hook-form + Zod
- **Charts:** Recharts
- **Auth:** JWT (jose) + bcryptjs
- **i18n:** i18next + react-i18next (English / Français)
- **Animation:** Framer Motion
- **Styling:** SCSS Modules with dark premium theme
- **Metrics:** prom-client (Prometheus endpoint)
- **Tooling:** TypeScript, ESLint, Prettier, Husky, lint-staged

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Lint & Format

```bash
npm run lint
npm run format
```

## Pages

| Route                     | Page                 |
| ------------------------- | -------------------- |
| `/`                       | Landing page         |
| `/auth/login`             | Login                |
| `/auth/signup`            | Sign up              |
| `/dashboard`              | Dashboard overview   |
| `/dashboard/accounts`     | Account management   |
| `/dashboard/analytics`    | Spending analytics   |
| `/dashboard/investments`  | Investment portfolio |
| `/dashboard/cards`        | Card management      |
| `/dashboard/transactions` | Transaction history  |
| `/dashboard/transfer`     | Fund transfers       |
| `/dashboard/settings`     | User settings        |

## Features

- Real-time dashboard with net worth tracking
- Interactive charts (spending breakdown, balance growth, monthly trends)
- Transaction filtering and sorting
- Instant fund transfers with validation
- Investment portfolio tracking
- Card management (freeze/unfreeze, spending limits)
- Bilingual support (English / French)
- Dark premium theme with glassmorphism
- JWT-based authentication
- Prometheus metrics endpoint at `/api/metrics`

## Project Structure

```
src/
├── app/           # Next.js App Router pages
├── components/    # React components (features, premium, shared, ui)
├── hooks/         # Custom React hooks
├── i18n/          # i18n configuration and locale files
├── lib/           # Utilities (auth, formatting, schemas)
├── services/      # Mock banking and auth services
├── store/         # Redux store, slices, API, middleware
├── styles/        # Global styles, theme variables, mixins
└── types/         # TypeScript type definitions
```
