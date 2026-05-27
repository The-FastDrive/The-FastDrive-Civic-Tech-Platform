# Contributing Guide

## Current Engineering Baseline

Repository currently contains a backend scaffold in `server/`. Contribution priorities are:
1. Add domain routes/modules cleanly.
2. Preserve startup/security/logging conventions.
3. Keep formatting consistent with current Prettier config.

## Coding Standards (based on existing code)

### Naming conventions observed
- Files use lower camel or descriptive names with suffixes where meaningful:
  - `errorHandler.middleware.js`
  - `corsOptions.js`
  - `index.route.js`
- Utility exports use clear identifiers (`asyncHandler`, `AppError`, `connectDB`).

### Module conventions observed
- `configs/` for environment and infrastructure configuration.
- `utils/` for reusable helper primitives (logger, errors, async wrapper).
- `middlewares/` for Express middleware functions.
- `routes/` for router composition and endpoint registration.

### Recommended extension pattern
- Add feature modules under `src/modules/<feature>/` with:
  - `<feature>.route.js`
  - `<feature>.controller.js`
  - `<feature>.service.js`
  - `<feature>.repository.js` (if data access complexity grows)
  - `<feature>.validator.js`
- Mount feature routers from `src/routes/index.route.js`.

## Async & Error Handling Standard

- Wrap async route handlers with `asyncHandler`.
- Throw `AppError(message, statusCode, error?)` for expected API failures.
- Route all errors to centralized middleware (`errorHandler`) once mounted in `app.js`.

## Response Pattern Standard (recommended)

Current code returns direct JSON/text. For consistency as API grows, use:
- Success: `{ success: true, data, message? }`
- Failure: `{ success: false, message, details? }`

## Formatting Standards

Prettier config (`server/.prettierrc`) is:
- `semi: true` -> always terminate statements with semicolons.
- `singleQuote: true` -> use single quotes in JS.
- `tabWidth: 4` -> indentation width of 4 spaces.
- `trailingComma: "es5"` -> trailing commas where valid in ES5 structures.
- `printWidth: 100` -> wrap lines near 100 chars for readability.
- `arrowParens: "always"` -> always include parentheses around arrow params.

### Why it matters
- Reduces style drift in reviews.
- Makes diffs cleaner and collaboration faster.
- Keeps generated and manual code visually consistent.

## Local Workflow

```bash
cd server
npm install
npm run dev
```

Before committing:

```bash
cd server
npm run format
npm run format:check
```

## Testing Status

- Automated tests are **not currently implemented** (`npm test` is placeholder).
- For now, validate changes via endpoint smoke tests and startup checks.

## Pull Request Expectations

- Keep PRs scoped to one concern.
- Update docs when adding routes, env vars, or security-sensitive behavior.
- Include API examples when adding/modifying endpoints.
- Avoid committing `.env`, logs, and `node_modules` (already ignored).
