# Backend Service

This folder contains the Spring Boot backend for Smart API Monitor.

## Responsibilities

- Expose analysis endpoints consumed by the Next.js frontend
- Persist request logs in PostgreSQL
- Apply heuristic scoring and call the FastAPI AI service
- Control CORS through environment configuration

## Main entry points

- Application bootstrap: `src/main/java/com/adnan/smartapimonitor/SmartApiMonitorApplication.java`
- Controllers: `src/main/java/com/adnan/smartapimonitor/controller`
- Services: `src/main/java/com/adnan/smartapimonitor/service`
- Configuration: `src/main/java/com/adnan/smartapimonitor/config`
- Runtime settings: `src/main/resources/application.properties`

## Deployment target

- Platform: Render
- Build command: `./mvnw clean package -DskipTests`
- Start command: `java -jar target/*.jar`
