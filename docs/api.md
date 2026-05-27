# API Documentation

## Base Context

- Service root: `server/server.js`
- Route registration:
  - Direct routes in `server/src/app.js`
  - Aggregated router in `server/src/routes/index.route.js` (currently empty)

## Authentication

- Not currently implemented.
- All currently available endpoints are public.

## Endpoint List

| Method | Path | Auth Required | Description | Response |
| --- | --- | --- | --- | --- |
| GET | `/` | No | Basic service greeting endpoint. | Plain text `"Hello World!"` |
| GET | `/status/healthz` | No | Liveness check endpoint. | `{ "status": "ok" }` |
| GET | `/status/readyz` | No | Readiness check endpoint. | `{ "status": "ok" }` |

## Request/Response Conventions

### Content type
- JSON parsing middleware is globally enabled via `express.json()`.
- Current endpoints do not require request bodies.

### Error format (available but partially wired)
Central error shape in `errorHandler.middleware.js`:

```json
{
  "success": false,
  "message": "Internal Server Error",
  "stack": "only in development"
}
```

Note: Central error middleware is present but not currently mounted in `app.js`.

## Planned API Evolution (recommended)

- Add versioned namespace (e.g., `/api/v1`).
- Group routes by domain under `src/modules`.
- Add request validation per route.
- Add OpenAPI/Swagger docs generation once endpoints stabilize.
