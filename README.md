[![CI](https://github.com/Stellar-Unified-Price-Oracle/Stellar-Unified-Price-Oracle-Frontend-/actions/workflows/ci.yml/badge.svg)](https://github.com/Stellar-Unified-Price-Oracle/Stellar-Unified-Price-Oracle-Frontend-/actions/workflows/ci.yml)
[![Bundle JS](https://img.shields.io/badge/JS-%3C200%20kB-44cc11?logo=javascript&labelColor=1a1a2e)](https://github.com/Stellar-Unified-Price-Oracle/Stellar-Unified-Price-Oracle-Frontend-/actions/workflows/ci.yml)
[![Bundle CSS](https://img.shields.io/badge/CSS-%3C50%20kB-44cc11?logo=css3&labelColor=1a1a2e)](https://github.com/Stellar-Unified-Price-Oracle/Stellar-Unified-Price-Oracle-Frontend-/actions/workflows/ci.yml)

# Stellar Unified Price Oracle — Frontend

**Developer Portal & Oracle Analytics Dashboard**

A real-time dashboard for the Stellar Unified Price Oracle & Aggregator. Displays aggregated price feeds from Chainlink, Redstone, Band, and Reflector — powered by the [Aggregator API](https://github.com/Stellar-Unified-Price-Oracle/Stellar-Unified-Price-Oracle-Aggregator-API).

## Features

- **Live price feeds** — Real-time updates via WebSocket with auto-reconnect
- **Multi-source aggregation** — See which oracles contributed to each price
- **Historical charts** — Area chart with price history for any asset pair
- **Source health** — Visual indicators for Chainlink, Redstone, Band & Reflector
- **Responsive** — Works on desktop and mobile
- **Dark theme** — Low-light UI designed for monitoring dashboards

## Stack

| Layer | Tech |
|---|---|
| Framework | React 19 + TypeScript |
| Build | Vite 6 |
| Styling | Tailwind CSS v4 |
| Charts | Recharts |
| Routing | React Router v7 |
| Real-time | Native WebSocket |

## Getting Started

```bash
npm install
npm run dev
```

The dev server starts at `http://localhost:5173` and proxies `/api` and `/ws` to `http://localhost:3000`.

### Environment Variables

Copy `.env.example` to `.env` to override defaults:

| Variable | Default | Description |
|---|---|---|
| `VITE_API_URL` | `/api` | REST API base URL |
| `VITE_WS_URL` | `ws://localhost:3000` | WebSocket endpoint |

## Build

```bash
npm run build          # outputs to dist/
npm run build:analyze  # build + generate bundle analysis report (reports/bundle-stats.html)
npm run check:budgets  # structural bundle budget guard (run after build)
npm run size-limit     # size-limit backstop over the initial-load set
npm run preview        # preview production build locally
```

### Bundle Size Budgets

Budgets live in [budgets.config.json](./budgets.config.json) — the single source of truth — and are enforced in CI by `npm run check:budgets` (scripts/bundle-budgets), with `npm run size-limit` as a redundant backstop over the same initial-load set. All sizes are brotli.

The guard is structural, not just a global number:

- **Coverage** — every emitted JS/CSS file must be classified (initial, vendor, or a declared lazy route). An unclaimed chunk fails the build instead of silently escaping the budgets.
- **Initial-load boundary** — the initial download is the entry chunk plus statically reachable vendor chunks only. The set of lazy-loaded route entries is pinned by an explicit allowlist, so moving code into a `lazy()` chunk that still loads on every visit is a reviewable config diff, not a way around the budget.
- **Vendor attribution** — each named vendor chunk has its own size budget and an exact allowlist of npm packages, verified against the build's chunk→module map (`dist/.vite/chunk-modules.json`, emitted by a small Vite plugin). Vendoring a heavy dependency into the "react" chunk fails with the package named.
- **Lazy-route budgets** — each lazy route's own chunk and its non-initial subtree are budgeted, so deferring code cannot just relocate the weight.

| Budget | Limit |
|---|---|
| Initial JS — entry chunk | 12 kB |
| Initial JS — entry + always-loaded vendors | 78 kB |
| Initial CSS | 6 kB |
| `vendor-react` | 55 kB |
| `vendor-router` | 13 kB |
| `vendor-charts` (lazy, `mustBeLazy`) | 90 kB |
| PriceDetail lazy route (chunk / subtree) | 4 kB / 95 kB |

Adding a dependency: bundle it, run `npm run check:budgets`, and add the package to the correct vendor chunk's `packages` allowlist (or create a new vendor chunk) in `budgets.config.json` — the failure message names the exact spot.

The CI pipeline generates a [bundle-stats.html](./reports/bundle-stats.html) report using `rollup-plugin-visualizer` — an interactive treemap of the production bundle. This report is uploaded as a CI artifact on every build.

## API Endpoints Consumed

| Method | Path | Source |
|---|---|---|
| `GET` | `/api/prices` | All latest prices |
| `GET` | `/api/prices/:pair` | Single pair price |
| `GET` | `/api/prices/:pair/history` | Price history |
| `WS` | `/ws` | Real-time price updates |

## Directory Structure

```
src/
├── api/          # REST + WebSocket clients
├── components/   # Reusable UI components
├── config/       # Environment configuration
├── hooks/        # React hooks for data fetching
├── pages/        # Route pages
└── types/        # TypeScript definitions
```

## License

MIT
