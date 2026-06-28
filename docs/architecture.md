# Architecture

## System Shape

The portfolio is intentionally dynamic. Django Admin owns content, DRF exposes a single optimized homepage payload, and Next.js renders the command center experience.

```txt
Visitor -> Next.js frontend -> DRF API -> PostgreSQL
Admin -> Django Admin -> PostgreSQL
GitHub Actions -> SSH -> Docker/Nginx/Gunicorn on VPS
```

## Backend

The `portfolio` Django app models editable site content:

- Site settings, hero content, theme, animation settings
- Metrics, skills, experience, projects, pipeline steps
- Architecture blueprints with modules, API groups, and relationships
- Tech stack items, social links, contact messages

The homepage endpoint returns all public content in one payload:

```txt
GET /api/portfolio/home/
POST /api/contact/
```

## Frontend

The frontend uses typed API contracts and a fallback content file. Important content flows through the API layer so production edits can happen from Django Admin without rebuilding the frontend.

## Data Strategy

Seed data creates Abdullah's initial portfolio. Admin users can edit records after deployment. Ordering fields keep dashboard sections predictable.
