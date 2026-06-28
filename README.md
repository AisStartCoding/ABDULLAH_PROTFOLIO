# Backend Command Center Portfolio

A dynamic DevOps command center portfolio for Abdullah Ibna Siddiquie. The project combines a Next.js App Router frontend with a Django REST Framework backend, PostgreSQL-ready data models, admin-editable content, Docker/Nginx deployment assets, and CI/CD documentation.

## Stack

- Frontend: Next.js, TypeScript, Tailwind CSS, Motion, React Three Fiber, Drei
- Backend: Django, Django REST Framework, PostgreSQL-ready settings, Django Admin
- Deployment: Docker Compose, Gunicorn, Nginx, GitHub Actions

## Local Setup

Backend:

```bash
cd apps/backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py seed_portfolio
python manage.py createsuperuser
python manage.py runserver 8000
```

Frontend:

```bash
cd apps/frontend
npm install
npm run dev
```

Open `http://localhost:3000`. The frontend reads `NEXT_PUBLIC_API_BASE_URL`; if the API is unavailable it falls back to typed local content.

## Admin Editing

Run the backend, open `http://localhost:8000/admin/`, sign in with your superuser, and edit portfolio content from the `portfolio` models. The homepage API is available at:

- `GET /api/portfolio/home/`
- `POST /api/contact/`

## Deployment

Copy `.env.example` files, set production values, then run:

```bash
docker compose -f infra/docker-compose.yml up -d --build
```

See [deployment.md](docs/deployment.md) for VPS, Nginx, and GitHub Actions details.

## Checks

```bash
cd apps/backend && python manage.py check
cd apps/frontend && npm run lint && npm run typecheck && npm run build
```
