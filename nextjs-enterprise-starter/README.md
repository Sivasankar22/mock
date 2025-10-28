# Next.js Enterprise Starter (Admin/HR/Finance/Sales/Employee)

## What you get
- Next.js React frontend (frontend/)
  - Redux Toolkit for state management
  - Tailwind CSS for styling
  - Chart.js (react-chartjs-2) for charts (lazy-loaded)
  - Dark/light mode, accessibility features
  - WebSocket client to receive live notifications
  - Role-based simple login (in-memory, demo)

- Backend WebSocket + REST API (backend/)
  - Express server with a simple REST users endpoint and a WebSocket (ws) server that broadcasts notifications.

## Run locally (requirements)
- Node 18+ and npm
- From project root:
  - `npm install`
  - `npm run dev`
- Open frontend at: http://localhost:3000

## Notes
- This is a demo starter: replace in-memory auth and mock data with your real backend.
- The frontend port: 3000 (Next.js), backend: 4000 (WS + REST)
