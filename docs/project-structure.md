# Project Structure Documentation

## Repository Layout

```text
The FastDrive/
  .mdx
  README.md
  docs/
    architecture.md
    api.md
    contributing.md
    database.md
    project-structure.md
    security.md
  server/
    server.js
    package.json
    package-lock.json
    .env.example
    .prettierrc
    .prettierignore
    .gitignore
    src/
      app.js
      configs/
        corsOptions.js
        database.js
        environment.js
      middlewares/
        errorHandler.middleware.js
      routes/
        index.route.js
      utils/
        asyncHandler.js
        errors.js
        logger.js
```

## Folder Responsibilities

### `server/`
- Backend service root package.
- Contains runtime entrypoint, dependencies, env template, formatting config.
- Should contain backend-specific assets only.

### `server/src/`
- Main application source.
- Separation by concern (configs, middlewares, routes, utils).
- Future domain modules should be added here.

### `server/src/configs/`
- Centralized infrastructure/application configuration.
- Current files:
  - `environment.js`: env loading and config object export.
  - `database.js`: MongoDB connection function.
  - `corsOptions.js`: CORS strategy.
- Should not contain business logic.

### `server/src/middlewares/`
- Express middleware functions.
- Current: `errorHandler.middleware.js` (central error formatter).
- Should contain reusable request/response lifecycle behaviors.

### `server/src/routes/`
- Router composition and route mount points.
- Current `index.route.js` exists as placeholder.
- Should be the integration layer for feature routers.

### `server/src/utils/`
- Cross-cutting helper modules.
- Current:
  - `logger.js`: Winston logger singleton.
  - `asyncHandler.js`: async wrapper for route handlers.
  - `errors.js`: custom `AppError` class.
- Should remain framework-oriented and generic.

### `docs/`
- Project technical documentation.
- Maintains architecture, security, API, and contribution references.

### `server/logs/`
- Runtime log outputs from Winston file transports.
- Should remain ignored in VCS (already in `.gitignore`).

## File-Level Responsibilities

### `server/server.js`
- Application bootstrap and DB-first startup sequencing.
- Responsible for process exit on critical startup failures.

### `server/src/app.js`
- Express app assembly.
- Houses middleware chain and current public health endpoints.

### `server/src/configs/environment.js`
- Loads `.env` through `dotenv`.
- Checks required keys and exposes normalized config object.

### `server/src/configs/database.js`
- Contains `connectDB()` and logs successful/failed DB connection attempts.

### `server/src/configs/corsOptions.js`
- Defines dynamic origin policy callback and CORS option object.

### `server/src/middlewares/errorHandler.middleware.js`
- Standardizes API error responses and conditional stack traces.

### `server/src/routes/index.route.js`
- Main route registry placeholder; currently exports empty router.

### `server/src/utils/logger.js`
- Winston logger instance with console + file outputs.

### `server/src/utils/asyncHandler.js`
- Promise-aware wrapper to forward async errors to `next()`.

### `server/src/utils/errors.js`
- Custom `AppError` class for structured operational errors.

## What Should Not Go Where

- Do not place business logic in `configs/` or `middlewares/`.
- Do not embed DB queries directly in route files once domain modules exist.
- Do not place feature-specific constants inside generic `utils/`.
- Do not store secrets in tracked files; use `.env` and secret managers.
