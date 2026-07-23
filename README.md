# Abdullah Portfolio

A dark, animated full-stack engineering portfolio for Abdullah Ibna Siddiquie. The project combines a Next.js App Router frontend with a Django REST Framework backend, PostgreSQL-ready data models, a custom private `/studio` admin panel, Docker/Nginx deployment assets, and CI/CD documentation. The portfolio content itself also documents the wider production stack Abdullah builds with (see "Stack Represented" below).

## Stack (this repo)

- Frontend: Next.js, TypeScript, Tailwind CSS, Framer Motion, react-three-fiber, lucide-react
- Backend: Django, Django REST Framework, Django sessions, PostgreSQL-ready settings
- Deployment: Docker Compose, Gunicorn, Nginx, GitHub Actions

## Stack Represented (portfolio content, not run in this repo)

Showcased via tech-stack/architecture-blueprint content in `/api/portfolio/home/` and `/studio`:

- Async & real-time: Redis, Celery, Django Channels (WebSockets), HMAC-signed webhooks
- Services & micro-frontends: Node.js/Express, React + Vite
- Cloud & scalability: AWS S3, CloudFront CDN, horizontal scaling, rate limiting, zero-downtime deploys

See `docs/architecture.md` for details.

## Local Setup

Backend:

```bash
cd apps/backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py seed_portfolio
$env:PORTFOLIO_OWNER_PASSWORD="your-secure-password"
python manage.py ensure_owner_user
python manage.py runserver 8000
```

Frontend:

```bash
cd apps/frontend
npm install
npm run dev
```

Open `http://localhost:3000`.

## Private Studio

Portfolio content is managed from `http://localhost:3000/studio`. Only the Django user named `Abdullah` can access protected studio APIs. Create or update that user with `python manage.py ensure_owner_user` and the `PORTFOLIO_OWNER_PASSWORD` environment variable.

Public API:

- `GET /api/portfolio/home/`
- `POST /api/contact/`

Private API:

- `/api/studio/*`

## Checks

```bash
cd apps/backend && python manage.py check
cd apps/frontend && npm run lint && npm run typecheck && npm run build
```
