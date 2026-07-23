# Architecture

## System Shape

The portfolio is dynamic but does not use Django Admin for portfolio management. Public visitors read optimized portfolio data from DRF, while the owner manages content through the custom Next.js `/studio` dashboard.

```txt
Visitor -> Next.js frontend -> DRF public API -> database
Owner -> /studio -> DRF protected studio API -> database
GitHub Actions -> SSH -> Docker/Nginx/Gunicorn on VPS
```

## Backend

The `portfolio` Django app models editable site content:

- Site settings, hero content, theme, animation settings
- Metrics, skills, experience, projects, pipeline steps
- Architecture blueprints with modules, API groups, and relationships
- Tech stack items, social links, contact messages

The public homepage endpoint returns all public content in one payload:

```txt
GET /api/portfolio/home/
POST /api/contact/
```

Protected studio endpoints live under:

```txt
/api/studio/*
```

Studio access uses Django session authentication and is restricted to username `Abdullah`.

## Frontend

The public frontend renders a dark, animated, image-free command-center portfolio. The `/studio` route provides a private dashboard for editing content through protected API calls with credentials and CSRF tokens.

## Data Strategy

Seed data creates Abdullah's initial portfolio. The `ensure_owner_user` management command creates or updates the private owner account from `PORTFOLIO_OWNER_PASSWORD`.

## Broader Stack Represented in the Portfolio Content

The tech-stack, skills, and architecture-blueprint content (seeded via `seed_portfolio`) documents the wider production stack Abdullah has real experience with, beyond what this repo runs directly:

- **Async & real-time**: Redis, Celery (task queues, retries, scheduled jobs), Django Channels (WebSockets), HMAC-signed webhooks
- **Services & micro-frontends**: Node.js/Express services, React + Vite micro-frontends
- **Cloud & scalability**: AWS S3 + CloudFront CDN, horizontal scaling, rate limiting, zero-downtime deploys

These are represented as a dedicated "Scalable Real-Time Platform Blueprint" (`ArchitectureBlueprint`) and tech-stack categories in the API payload/`/studio` content, not as running services in this repository — this repo's actual runtime remains Django + DRF + Postgres + Next.js + Docker + Nginx, as described above.
