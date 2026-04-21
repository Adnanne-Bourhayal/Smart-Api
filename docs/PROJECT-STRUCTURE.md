# Project Structure

This repository is organized as a small monorepo with three deployable services.

## Services

### Frontend

- Path: `smart-api-monitor-frontend/front-saas`
- Runtime: Next.js on Vercel
- Responsibility:
  - Landing page
  - Password-protected login gate
  - Dashboard UI
  - Analysis, simulation, batch import, metrics, and operator workflows

### Backend

- Path: `smart-api-monitor`
- Runtime: Spring Boot on Render
- Responsibility:
  - Persist analyzed API requests
  - Expose REST endpoints for single and batch analysis
  - Coordinate with the AI service
  - Apply CORS and deployment configuration

### AI Service

- Path: `ai-service`
- Runtime: FastAPI on Render
- Responsibility:
  - Health endpoint for backend checks
  - AI-oriented risk scoring and explanation generation

## Deployment Topology

```text
Browser
  -> Frontend: smart-api-monitor-frontend/front-saas
    -> Backend: smart-api-monitor
      -> PostgreSQL
      -> AI service: ai-service
```

## Recommended Entry Points

- Product overview: [README.md](/Users/adnannnebourhayal/smart-api-monitor-backend/README.md)
- Frontend notes: [smart-api-monitor-frontend/README.md](/Users/adnannnebourhayal/smart-api-monitor-backend/smart-api-monitor-frontend/README.md)
- Backend notes: [smart-api-monitor/README.md](/Users/adnannnebourhayal/smart-api-monitor-backend/smart-api-monitor/README.md)
- AI service notes: [ai-service/README.md](/Users/adnannnebourhayal/smart-api-monitor-backend/ai-service/README.md)
