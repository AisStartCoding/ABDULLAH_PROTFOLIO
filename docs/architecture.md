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

The public frontend renders a light, animated, image-free portfolio. The `/studio` route provides a private dashboard for editing content through protected API calls with credentials and CSRF tokens.

## Data Strategy

Seed data creates Abdullah's initial portfolio. The `ensure_owner_user` management command creates or updates the private owner account from `PORTFOLIO_OWNER_PASSWORD`.
