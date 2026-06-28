# Deployment

## VPS Layout

Recommended production services:

- `frontend`: Next.js standalone server
- `backend`: Gunicorn serving Django
- `db`: PostgreSQL
- `nginx`: reverse proxy and static/media delivery

## Environment

Use `.env.example` files as templates. Never commit real secrets.

Required backend values:

- `DJANGO_SECRET_KEY`
- `DJANGO_DEBUG`
- `DJANGO_ALLOWED_HOSTS`
- `DATABASE_URL`
- `CORS_ALLOWED_ORIGINS`

Required frontend values:

- `NEXT_PUBLIC_API_BASE_URL`

## Docker

```bash
docker compose -f infra/docker-compose.yml up -d --build
docker compose -f infra/docker-compose.yml exec backend python manage.py migrate
docker compose -f infra/docker-compose.yml exec backend python manage.py seed_portfolio
docker compose -f infra/docker-compose.yml exec backend python manage.py createsuperuser
```

## GitHub Actions

The workflow builds frontend and backend checks, then deploys to a VPS over SSH. Configure repository secrets:

- `VPS_HOST`
- `VPS_USER`
- `VPS_SSH_KEY`
- `VPS_APP_PATH`

The deploy step pulls the branch on the server and rebuilds Docker Compose services.
