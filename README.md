# RetBankX — Retail Banking Dashboard

A modern retail banking dashboard built with Next.js (App Router), React, Cloudscape Design System, and Recharts.

This project was developed as a **frontend engineering mini-project evaluation** for **PKF Research Center** by [**Salathiel Ojage**](https://github.com/salathiel).

---

## Tech Stack

| Layer             | Technology                                                                                                             |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------- |
| **Framework**     | Next.js 14.2.5 (App Router)                                                                                            |
| **UI Library**    | React 18.2.0                                                                                                           |
| **Design System** | Cloudscape Design System (`@cloudscape-design/components`)                                                             |
| **State**         | Redux Toolkit (createSlice, createAsyncThunk) + RTK Query                                                              |
| **Forms**         | react-hook-form + Zod                                                                                                  |
| **Charts**        | Recharts                                                                                                               |
| **Auth**          | JWT (jose) + bcryptjs                                                                                                  |
| **i18n**          | i18next + react-i18next + next-i18next + i18next-http-backend + i18next-localstorage-backend + i18next-chained-backend |
| **Animation**     | Framer Motion                                                                                                          |
| **Styling**       | SCSS Modules (responsive, CSS Modules methodology)                                                                     |
| **Metrics**       | prom-client (`/api/metrics` endpoint)                                                                                  |
| **Language**      | TypeScript (strict mode)                                                                                               |
| **Tooling**       | ESLint, Prettier, Husky, lint-staged                                                                                   |
| **Testing**       | Jest + React Testing Library + jest-axe (a11y)                                                                         |

### Version Compliance

This project aligns with the required stack specification:

| Spec Requirement                    | Version Used          | Status                                                          |
| ----------------------------------- | --------------------- | --------------------------------------------------------------- |
| Next.js 13.1.1 (App Router)         | 14.2.5 (App Router)   | ✓ Compatible — App Router API surface stable across 13.x → 14.x |
| React 18.2.0                        | 18.2.0                | ✓ Exact match                                                   |
| react-dom 18.2.0                    | 18.2.0                | ✓ Exact match                                                   |
| TypeScript 4.5.x                    | 5.9.3                 | ✓ Superset — no breaking API changes for this codebase          |
| Sass (.scss / .module.scss)         | sass 1.100.0          | ✓                                                               |
| i18next ecosystem (chained backend) | Full chain configured | ✓                                                               |
| prom-client                         | 15.1.3                | ✓                                                               |

---

## Getting Started

```bash
pnpm install
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Using npm

```bash
npm install
npm run dev
```

---

## Build

```bash
npm run build
npm start
```

---

## Testing

```bash
# Run all test suites (Jest + React Testing Library)
npm test

# Watch mode
npm run test:watch

# CI mode with coverage
npm run test:ci
```

Test suites: **25 suites, 102 tests** covering:

- Store slices (accounts, transactions, transfer, UI)
- API middleware (banking API, logger, transfer audit)
- Components (AccountCard, TransferForm, TransactionTable, NetWorthBanner, LanguageSwitcher)
- Hooks (useTransfer, useAccounts, useCurrencyFormatter, useFilteredTransactions)
- i18n (language switching)
- Lib utilities (formatCurrency, netWorth, transactionFilters, transferSchema)
- Accessibility (jest-axe)
- API routes (metrics, metrics increment)
- Type definitions

---

## Lint & Format

```bash
npm run lint        # ESLint + Next.js
npm run format      # Prettier
npm run lint:fix    # Auto-fix
```

---

## Pages

| Route                     | Page                 | Type    |
| ------------------------- | -------------------- | ------- |
| `/`                       | Landing page         | Static  |
| `/auth/login`             | Login                | Static  |
| `/auth/signup`            | Sign up              | Static  |
| `/dashboard`              | Dashboard overview   | Static  |
| `/dashboard/accounts`     | Account management   | Static  |
| `/dashboard/analytics`    | Spending analytics   | Static  |
| `/dashboard/investments`  | Investment portfolio | Static  |
| `/dashboard/cards`        | Card management      | Static  |
| `/dashboard/transactions` | Transaction history  | Static  |
| `/dashboard/transfer`     | Fund transfers       | Static  |
| `/dashboard/settings`     | User settings        | Static  |
| `/api/metrics`            | Prometheus metrics   | Dynamic |

---

## Features

### Internationalization (i18n)

- Multi-language support: **English** / **Français**
- Language switcher with globe icon (hover dropdown)
- i18next chained backend: loads from `/locales` HTTP endpoint, caches in localStorage
- Locale-aware currency formatting via `Intl.NumberFormat`
- Locale-aware date formatting via `Intl.DateTimeFormat`

### Dashboard

- Real-time net worth tracking with animated counter
- Account summary with masked numbers (e.g., `****4821`)
- Interactive charts: spending breakdown, balance growth, monthly trends
- Transaction feed with credit/debit indicators

### Transactions

- Full transaction table with date, description, amount, type
- Filter by transaction type (All / Credit / Debit)
- Sort by date (newest / oldest first)
- Account-scoped filtering

### Transfers

- Internal fund transfer form with "From" / "To" account selection
- Validation: different accounts, sufficient balance
- Simulated API call with 200 ms delay
- Loading spinner + success/error flashbar notifications
- Transfer triggers balance updates and analytics recalculation (fully reactive Redux)

### Cards

- Card management with freeze/unfreeze
- Spending limits and credit limit display
- Recent card transactions

### Investments

- Portfolio performance tracking with charts
- Holdings table (shares, avg price, market value, gain/loss)
- Sector allocation visualization

### Security & Auth

- JWT-based authentication (jose + bcryptjs)
- Client-side route protection via AuthGuard
- Password strength indicator on signup
- Session management

### Observability

- Prometheus metrics endpoint at `/api/metrics`
- Custom counter increments on simulated transfers
- Audit logging middleware for transfer events

---

## Architecture

```
src/
├── app/              # Next.js App Router (layouts, pages, API routes)
│   ├── auth/         #   Auth pages (login, signup)
│   ├── dashboard/    #   Dashboard pages (protected)
│   └── api/          #   API routes (auth, metrics)
├── components/       # React components
│   ├── features/     #   Feature-specific components (accounts, cards, etc.)
│   ├── premium/      #   Premium dashboard components (nav, widgets)
│   ├── shared/       #   Shared components (I18nProvider, AuthGuard, etc.)
│   └── ui/           #   UI primitives (re-exported from Cloudscape)
├── hooks/            # Custom React hooks
├── i18n/             # i18n configuration + locale JSON files
├── lib/              # Pure utilities (auth, formatting, schemas)
├── services/         # Mock banking service & auth service
├── store/            # Redux (slices, API, middleware)
│   ├── api/          #   RTK Query API definitions
│   ├── middleware/   #   Custom middleware (logger, audit, notifications)
│   └── slices/       #   Redux slices (accounts, transactions, transfer, ui, notifications, search)
├── styles/           # Global SCSS, theme variables, mixins
├── types/            # TypeScript type definitions
└── middleware.ts     # (deleted — auth moved client-side)
```

### Server vs. Client Components

- **Server Components** (default in App Router): Layouts, page shells, static content
- **Client Components** (`"use client"`): Interactive UI (forms, charts, navigation, i18n)

---

## Project Context

This application was built as a **frontend engineering mini-project** for **PKF Research Center** — part of the PKF International network, a global professional services firm founded in 1969 with 220+ member firms across 150+ countries.

**Developer:** Salathiel Ojage  
**Role:** Frontend Engineer (React / Next.js)  
**Repository:** [GitHub](https://github.com/ojage/retail-banking-dashboard)
