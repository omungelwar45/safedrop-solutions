# SafeDrop Solutions

SafeDrop Solutions is a web application for safe antibiotic disposal, AMR awareness, mission-based community engagement, and partner operations.

## Run Locally

- Install dependencies: `npm install`
- Start backend API: `npm run backend`
- Start frontend dev server: `npm run dev`
- Build production bundle: `npm run build`

## Backend API

The backend runs on `http://localhost:8787` and provides:

- `GET /api/health`
- `POST /api/auth/login`
- `GET /api/reminders`
- `PATCH /api/reminders/:id`
- `POST /api/pickups`

In development, Vite proxies `/api/*` calls from the frontend to the backend.
