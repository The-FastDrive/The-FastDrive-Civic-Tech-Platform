# Security Documentation

## Implemented Security Controls

### HTTP header hardening
- `helmet()` enabled globally in `server/src/app.js`.
- Benefit: reduces exposure to common browser-based attack vectors via secure headers.

### HTTP Parameter Pollution protection
- `hpp()` enabled globally.
- Benefit: mitigates abuse from duplicate query parameter injection patterns.

### CORS policy
- `cors(corsOptions)` with custom callback in `server/src/configs/corsOptions.js`.
- Current behavior:
  - Allows requests with no `Origin` header.
  - Allows any `http://localhost:*` origin.
  - Rejects other origins with `Not allowed by CORS`.
- `credentials: true` is enabled.

### Environment-based error stack exposure
- `errorHandler.middleware.js` includes stack trace only when `NODE_ENV === "development"`.

## Logging & Operational Security

- Winston logs to:
  - Console
  - `logs/error.log`
  - `logs/combined.log`
- Benefit: creates forensic trail for runtime incidents.
- Risk: ensure logs never include secrets or raw credentials.

## Not Currently Implemented

- JWT or session authentication
- Password hashing flow
- Authorization (RBAC/ABAC)
- Rate limiting
- CSRF protections
- Input validation/sanitization layer
- Mongo query sanitization middleware
- Cookie security strategy
- Security headers policy customization beyond Helmet defaults

## Environment Security Guidance

Current required env vars:
- `SERVER_HOST`
- `PORT`
- `MONGO_URI`

Recommendations:
- Never commit `.env` (already ignored).
- Store secrets in secret manager/CI variables in production.
- Rotate DB credentials periodically.
- Use least-privilege MongoDB users per environment.

## CORS Production Recommendations

- Replace broad localhost pattern with explicit environment-driven allowlist:
  - `ALLOWED_ORIGINS=https://app.example.com,https://admin.example.com`
- Keep `credentials: true` only when cookies or auth headers need it.

## Mongo Security Recommendations

- Enforce TLS in Mongo connection strings.
- Use separate users/databases per environment.
- Validate and whitelist query fields in future repository/service layers.

## Immediate Hardening Backlog

1. Mount centralized `errorHandler` in `app.js`.
2. Add rate limiter for public endpoints.
3. Add request body/query validation.
4. Add auth foundation (JWT + refresh/session management).
5. Introduce dependency scanning and SAST in CI.
