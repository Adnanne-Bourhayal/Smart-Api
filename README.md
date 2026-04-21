# Smart API Monitor

Smart API Monitor is a full-stack portfolio project built to showcase how I design, structure, and ship production-style software across frontend, backend, AI integration, and deployment.

The project simulates a modern security monitoring product for API traffic. It allows a user to inspect suspicious requests, score risk, simulate attacks, import request batches, and review metrics from a SaaS-style dashboard powered by a Spring Boot API and a FastAPI AI analysis service.

## Why This Project Exists

This repository is part of my software engineering portfolio.

I built it to demonstrate practical skills that companies usually look for in a full-stack engineer:

- Designing a clean multi-service architecture
- Building a polished frontend with a clear user flow
- Creating a backend API with persistence and service orchestration
- Integrating an AI-oriented microservice in a realistic way
- Managing environment variables, deployment configuration, and security basics
- Organizing a monorepo so it is understandable, maintainable, and deployable

## What It Demonstrates

- Frontend engineering with `Next.js`, `React`, `TypeScript`, and `Tailwind CSS`
- Backend development with `Java 17`, `Spring Boot`, `Spring Web MVC`, and `Spring Data JPA`
- AI service integration with `Python`, `FastAPI`, and `Pydantic`
- Data persistence with `PostgreSQL`
- Deployment-ready configuration for `Vercel` and `Render`
- Basic security-oriented thinking such as environment-based configuration, CORS setup, and removal of hardcoded local dependencies

## Product Overview

The application behaves like a lightweight API threat monitoring platform:

`landing -> login -> dashboard -> analyze / simulate / batch import -> metrics`

Main user flow:

1. The visitor lands on a marketing-style page.
2. A password gate protects the dashboard.
3. The user enters the monitoring dashboard.
4. The user can analyze a single request, simulate malicious traffic, or import a batch of requests.
5. The dashboard displays risk scores, explanations, trends, and recent findings.

## Architecture

```text
Browser
  -> Next.js frontend (Vercel)
    -> Spring Boot API (Render)
      -> PostgreSQL
      -> FastAPI AI analyzer (Render)
```

High-level responsibility split:

- Frontend: UI, authentication gate, dashboard workflows, and data visualization
- Backend: persistence, request analysis orchestration, heuristics, and API endpoints
- AI service: externalized analysis service used by the backend for scoring and explanation

The frontend never talks directly to the database. The backend owns the persistence layer and communicates with the AI service over HTTP.

## Tech Stack

- Frontend: `Next.js 16`, `React 19`, `TypeScript`, `Tailwind CSS`
- Backend: `Spring Boot`, `Java 17`, `Spring Web MVC`, `Spring Data JPA`
- AI service: `FastAPI`, `Python`, `Pydantic`
- Database: `PostgreSQL`
- Build tools: `npm`, `Maven`, `uvicorn`
- Deployment targets:
  - Frontend -> `Vercel`
  - Backend -> `Render`
  - AI service -> `Render`

## Monorepo Structure

```text
.
├── ai-service/                          # FastAPI analyzer service
├── smart-api-monitor/                   # Spring Boot backend API
├── smart-api-monitor-frontend/
│   └── front-saas/                      # Next.js frontend application
├── docs/
│   └── PROJECT-STRUCTURE.md             # Quick navigation guide
├── render.yaml                          # Render blueprint for backend + AI
└── README.md
```

Quick map:

- Frontend app: `smart-api-monitor-frontend/front-saas`
- Backend API: `smart-api-monitor`
- AI service: `ai-service`
- Supporting docs: `docs`

If you want the fastest overview of the codebase, start here and then open `docs/PROJECT-STRUCTURE.md`.

## Portfolio Notes For Recruiters And Engineers

If you are reviewing this project as part of my profile, the most relevant things to look at are:

- The separation of concerns between the three services
- The deploy-ready environment variable setup
- The dashboard UX and frontend structure
- The backend controllers and service layer
- The integration between Spring Boot and FastAPI
- The effort to keep the repository clean, documented, and presentation-ready

Good entry points:

- Frontend dashboard: [index.tsx](/Users/adnannnebourhayal/smart-api-monitor-backend/smart-api-monitor-frontend/front-saas/components/dashboard/index.tsx)
- Backend analysis flow: [AnalysisController.java](/Users/adnannnebourhayal/smart-api-monitor-backend/smart-api-monitor/src/main/java/com/adnan/smartapimonitor/controller/AnalysisController.java)
- Backend service logic: [RiskAnalysisService.java](/Users/adnannnebourhayal/smart-api-monitor-backend/smart-api-monitor/src/main/java/com/adnan/smartapimonitor/service/RiskAnalysisService.java)
- AI service entry point: [main.py](/Users/adnannnebourhayal/smart-api-monitor-backend/ai-service/main.py)
- Deployment setup: [render.yaml](/Users/adnannnebourhayal/smart-api-monitor-backend/render.yaml)

## Local Development

### 1. Frontend

```bash
cd smart-api-monitor-frontend/front-saas
npm install
```

Create `.env.local` from `.env.example` and configure:

```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
DASHBOARD_PASSWORD=demo-only-change-me
```

Run:

```bash
npm run dev
```

### 2. Backend

```bash
cd smart-api-monitor
```

Create a local `.env` or export variables from `.env.example`:

```bash
SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/smart_api_monitor
SPRING_DATASOURCE_USERNAME=postgres
SPRING_DATASOURCE_PASSWORD=postgres
FRONTEND_URL=http://localhost:3000
AI_SERVICE_URL=http://localhost:8000
PORT=8080
```

Run:

```bash
./mvnw spring-boot:run
```

### 3. AI Service

```bash
cd ai-service
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

Run:

```bash
uvicorn main:app --host 0.0.0.0 --port 8000
```

## Environment Variables

### Frontend

- `NEXT_PUBLIC_API_BASE_URL`: Public base URL for the Spring Boot API
- `DASHBOARD_PASSWORD`: Password used by the login gate

### Backend

- `PORT`: HTTP port for local runs or Render
- `SPRING_DATASOURCE_URL`: PostgreSQL JDBC URL
- `SPRING_DATASOURCE_USERNAME`: PostgreSQL username
- `SPRING_DATASOURCE_PASSWORD`: PostgreSQL password
- `FRONTEND_URL`: Allowed frontend origin for CORS
- `AI_SERVICE_URL`: Base URL of the FastAPI analyzer

### AI Service

- `PORT`: HTTP port injected by Render

## Deployment

### Frontend -> Vercel

Use `smart-api-monitor-frontend/front-saas` as the project root in Vercel.

Suggested settings:

- Framework preset: `Next.js`
- Root directory: `smart-api-monitor-frontend/front-saas`
- Build command: `npm run build`
- Output directory: default

Required environment variables:

- `NEXT_PUBLIC_API_BASE_URL=https://<your-render-backend>.onrender.com`
- `DASHBOARD_PASSWORD=<strong-password>`

### Backend -> Render

You can deploy from the included `render.yaml`, or configure it manually.

Manual settings:

- Root directory: `smart-api-monitor`
- Build command: `./mvnw clean package -DskipTests`
- Start command: `java -jar target/*.jar`

Required environment variables:

- `PORT`
- `SPRING_DATASOURCE_URL`
- `SPRING_DATASOURCE_USERNAME`
- `SPRING_DATASOURCE_PASSWORD`
- `FRONTEND_URL=https://<your-vercel-app>.vercel.app`
- `AI_SERVICE_URL=https://<your-render-ai>.onrender.com`

### AI Service -> Render

Manual settings:

- Root directory: `ai-service`
- Build command: `pip install -r requirements.txt`
- Start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`

Required environment variables:

- `PORT`

## Demo Access

For a public portfolio demo, you can use a clearly disposable password such as:

```text
demo-only-change-me
```

This is intentionally demo-only and must not grant access to anything sensitive.

## Screenshots

This repository is prepared for screenshots in:

- `docs/screenshots/landing.png`
- `docs/screenshots/login.png`
- `docs/screenshots/dashboard.png`
- `docs/screenshots/detail-panel.png`

## Validation

Frontend:

```bash
cd smart-api-monitor-frontend/front-saas
npx eslint .
npm run build
```

Backend:

```bash
cd smart-api-monitor
./mvnw -q -DskipTests compile
```

AI service:

```bash
cd ai-service
python -m py_compile main.py
```

## Closing Note

This project is intended to reflect how I approach software engineering work end to end: product thinking, architecture, code organization, backend and frontend implementation, external service integration, and deployment preparation.

If you would like to discuss the design decisions, tradeoffs, or implementation choices in this repository, that conversation is very welcome.

## License

This project is licensed under the `MIT` License. See the [LICENSE](/Users/adnannnebourhayal/smart-api-monitor-backend/LICENSE) file for details.
