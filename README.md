# SafeDrop Solutions(https://safedrop-solutions.vercel.app/)

SafeDrop Solutions is a Vite + React + TypeScript web application focused on safe medicine disposal, AMR awareness, and community engagement features, with a small Node/Express backend for API development.

## Tech Stack

- Frontend: React 18, TypeScript, Vite, React Router, TanStack Query
- UI: Tailwind CSS, Radix UI primitives, shadcn-style components, Framer Motion
- Backend (local dev): Node.js + Express with JSON file persistence
- Tests: Vitest + Testing Library, Playwright config included

## Quick Start

### 1) Install

```bash
npm install
```

### 2) Run local backend

```bash
npm run backend
```

Backend runs at `http://localhost:8787`.

### 3) Run frontend

```bash
npm run dev
```

Frontend dev server runs at `http://localhost:8080`.

Vite proxies `/api/*` to `http://localhost:8787` (see `vite.config.ts`), so frontend API calls can use relative `/api/...` paths.

## Scripts

- `npm run dev`: start Vite dev server
- `npm run backend`: start Express backend (`server/index.js`)
- `npm run build`: production build
- `npm run build:dev`: development-mode build
- `npm run preview`: preview production build
- `npm run lint`: run ESLint
- `npm run test`: run Vitest once
- `npm run test:watch`: run Vitest in watch mode

## Project Structure

```text
safedrop-solutions/
	api/                       # Serverless-style handlers (deployment-friendly API shape)
		auth/login.js
		health.js
		pickups.js
		reminders/index.js
		reminders/[id].js
	server/                    # Local Express backend used by npm run backend
		db.json                  # JSON data store for reminders/pickups
		index.js                 # Express routes and CRUD logic
	public/                    # Static public assets
	src/
		components/
			ui/                    # Reusable UI primitives/components
			AuthProvider.tsx       # Auth context provider
			Navbar.tsx             # Global navigation
			ProtectedRoute.tsx     # Route guard for authenticated pages
			ThemeProvider.tsx      # Theme handling
		hooks/                   # Custom React hooks
		lib/
			api.ts                 # Frontend API client wrappers
			impact.ts              # Impact/helper logic
			utils.ts               # Utility helpers (class merging etc.)
		pages/                   # Route-level pages
			Index.tsx
			MapPage.tsx
			GamePage.tsx
			Awareness.tsx
			Login.tsx
			Dashboard.tsx
			Missions.tsx
			PartnerPortal.tsx
			Reminders.tsx
			PickupScheduler.tsx
			Compliance.tsx
			Marketplace.tsx
			Innovation.tsx
			NotFound.tsx
		test/
			setup.ts               # Vitest setup
			example.test.ts
		App.tsx                  # App composition and routing
		main.tsx                 # React root mount
```

## Frontend Architecture

### App entry

- `src/main.tsx` mounts `<App />` via `createRoot`.

### Root providers in `src/App.tsx`

`App.tsx` wraps the application with:

- `QueryClientProvider` from `@tanstack/react-query`
- `ThemeProvider`
- `TooltipProvider`
- `AuthProvider`
- Global notification toasters (`Toaster`, `Sonner`)
- `BrowserRouter` + route definitions

### Routing

Public routes:

- `/` -> `Index`
- `/map` -> `MapPage`
- `/game` -> `GamePage`
- `/awareness` -> `Awareness`
- `/login` -> `Login`

Protected routes (wrapped by `ProtectedRoute`):

- `/dashboard`, `/missions`, `/partner`, `/reminders`, `/pickup`, `/compliance`, `/marketplace`, `/innovation`

Fallback route:

- `*` -> `NotFound`

## Backend/API Overview

### Local Express API (`server/index.js`)

Endpoints:

- `GET /api/health`
- `POST /api/auth/login`
- `GET /api/reminders`
- `PATCH /api/reminders/:id`
- `POST /api/pickups`

Notes:

- Data persistence uses `server/db.json`.
- CORS and JSON body parsing are enabled.

### Serverless handlers (`api/`)

The `api/` folder mirrors similar endpoint behavior for serverless-style deployments. This is useful when deploying to platforms that map files to API routes.

## Important Imports and Integrations

- Path alias: `@` -> `src` (configured in `vite.config.ts` and `tsconfig.json`)
- API client functions in `src/lib/api.ts`:
	- `loginApi(email, password)`
	- `listRemindersApi()`
	- `updateReminderApi(id, enabled)`
	- `createPickupApi(input)`
- `src/lib/api.ts` centralizes fetch calls, JSON parsing, and API error normalization.

## Testing

- Unit/component tests run with Vitest in `jsdom` environment.
- Test setup file: `src/test/setup.ts`
- Included test files pattern: `src/**/*.{test,spec}.{ts,tsx}`

## Configuration Notes

- Frontend dev port and proxy are defined in `vite.config.ts`.
- TypeScript project references are in `tsconfig.json`.
- Tailwind/PostCSS configuration lives in:
	- `tailwind.config.ts`
	- `postcss.config.js`

## Recommended Development Flow

1. Start backend: `npm run backend`
2. Start frontend: `npm run dev`
3. Run tests when changing behavior: `npm run test`
4. Run lint before pushing: `npm run lint`
