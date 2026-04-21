# AI Service

This folder contains the FastAPI service used by the backend for AI-assisted request analysis.

## Responsibilities

- Expose the `/health` endpoint for backend connectivity checks
- Expose the analysis endpoint consumed by Spring Boot
- Run independently from the frontend and backend deployment units

## Main entry points

- Application file: `main.py`
- Dependencies: `requirements.txt`

## Deployment target

- Platform: Render
- Build command: `pip install -r requirements.txt`
- Start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
