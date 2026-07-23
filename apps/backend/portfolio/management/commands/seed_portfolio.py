from django.core.management.base import BaseCommand

from portfolio.models import (
    AnimationSettings,
    ArchitectureApiGroup,
    ArchitectureBlueprint,
    ArchitectureModule,
    ArchitectureRelationship,
    Experience,
    ExperienceBullet,
    HeroContent,
    Metric,
    PipelineStep,
    Project,
    ProjectTag,
    SiteSettings,
    Skill,
    SkillCategory,
    SocialLink,
    TechStackItem,
    ThemeSettings,
)


class Command(BaseCommand):
    help = "Seed Abdullah's full-stack engineering portfolio content."

    def handle(self, *args, **options):
        SiteSettings.objects.all().delete()
        HeroContent.objects.all().delete()
        Metric.objects.all().delete()
        SkillCategory.objects.all().delete()
        Experience.objects.all().delete()
        Project.objects.all().delete()
        PipelineStep.objects.all().delete()
        ArchitectureBlueprint.objects.all().delete()
        TechStackItem.objects.all().delete()
        ThemeSettings.objects.all().delete()
        AnimationSettings.objects.all().delete()
        SocialLink.objects.all().delete()

        SiteSettings.objects.create(
            name="Abdullah Ibna Siddiquie",
            role="Full-Stack Engineer | Django & Next.js | DevOps",
            email="abdullahibnasiddiquie12688@gmail.com",
            location="Dhaka, Bangladesh",
            open_status="Open to Remote",
            seo_title="Abdullah Ibna Siddiquie | Full-Stack Engineer & DevOps Builder",
            seo_description="Full-stack engineering portfolio spanning Django/DRF backends, Next.js/React frontends, PostgreSQL, CI/CD, Docker, Nginx, SaaS, and healthcare architecture.",
        )
        HeroContent.objects.create(
            headline="Full-stack systems, interfaces, and deployments built for real products.",
            subtext="I build Django backends, Next.js/React frontends, REST APIs, database structures, CI/CD pipelines, and VPS production infrastructure for SaaS, healthcare, booking, and business platforms.",
            terminal_lines=[
                "$ git push origin production",
                "github-actions: build, test, dockerize",
                "ssh deploy@vps: rolling restart",
                "nginx + gunicorn: healthy",
                "live in 48s",
            ],
        )
        ThemeSettings.objects.create(primary="#3b82f6", secondary="#22c55e", violet="#8b5cf6", background="#020617")
        AnimationSettings.objects.create(intensity=0.75, speed=0.7, enable_3d=False, enable_particles=False)

        metrics = [
            ("40%", "Deployment Efficiency", "via CI/CD automation"),
            ("30%", "Server Downtime Cut", "with Nginx configuration"),
            ("25%", "Application Speed Boost", "via full-stack optimization"),
            ("<1 min", "Zero-Downtime Deploy", "on every production push"),
        ]
        for order, (value, label, description) in enumerate(metrics):
            Metric.objects.create(order=order, value=value, label=label, description=description)

        skills = {
            "Backend": ["Python", "Django", "FastAPI", "Flask", "Celery", "Django Channels"],
            "Frontend": ["React", "Next.js", "TypeScript", "Vite", "Tailwind CSS", "REST/API Integration"],
            "APIs & Database": ["REST API", "PostgreSQL", "SQL", "RBAC", "Auth", "Webhooks", "WebSockets"],
            "Async & Caching": ["Redis", "Celery Workers", "Pub/Sub", "Task Queues", "Cache Invalidation"],
            "DevOps & Infra": ["Docker", "Nginx", "Gunicorn", "CI/CD", "GitHub Actions", "VPS", "Linux", "SSH"],
            "Cloud & Scalability": ["AWS S3", "CloudFront CDN", "Horizontal Scaling", "Load Balancing", "Rate Limiting"],
            "Security": ["Firewall", "HTTPS/SSL", "UFW", "server hardening"],
            "Node Services": ["Node.js", "Express"],
        }
        for category_order, (title, names) in enumerate(skills.items()):
            category = SkillCategory.objects.create(order=category_order, title=title)
            for order, name in enumerate(names):
                Skill.objects.create(category=category, order=order, name=name)

        experience = Experience.objects.create(
            title="Full-Stack & DevOps Engineer",
            company="Logic Gate Software Solutions BD",
            date="Oct 2025 - Present",
            location="Dhaka, Bangladesh",
        )
        for order, text in enumerate(
            [
                "Built and deployed SaaS, eCommerce, and travel platforms end-to-end: Django/DRF APIs, React/Next.js frontends, and production infrastructure",
                "Built CI/CD pipelines with GitHub Actions to VPS",
                "Containerized services with Docker and configured Nginx + SSL + domain routing",
                "Led incident recovery, malware cleanup, and server hardening",
                "Hardened servers with SSH key authentication, UFW firewall, and automated patching",
            ]
        ):
            ExperienceBullet.objects.create(experience=experience, order=order, text=text)

        projects = [
            (
                "E-commerce SaaS Platform",
                "Deployed",
                "Full-stack SaaS platform: React/Next.js storefront and admin UI on scalable Django REST APIs for products, orders, users, and multi-tenant business logic. Full CI/CD pipeline with automated deployment to VPS.",
                ["Django", "React", "Next.js", "PostgreSQL", "Nginx", "Gunicorn", "Docker", "CI/CD"],
            ),
            (
                "Travel & Booking Platform",
                "Deployed",
                "Booking platform with a React frontend, Django backend, third-party API integrations, real-time availability logic, user authentication, and production deployment.",
                ["Django", "React", "PostgreSQL", "APIs", "Nginx", "Docker"],
            ),
            (
                "Hotel & Flight Booking System",
                "Deployed",
                "Multi-module booking engine with a React/Next.js UI for reservations, conflict handling, lifecycle management, and deployment on VPS.",
                ["Django", "Next.js", "Booking Logic", "PostgreSQL", "VPS", "Docker"],
            ),
            (
                "Coaching Management System",
                "Deployed",
                "Role-based full-stack platform for admin, teacher, and student workflows with a React frontend, Django RBAC backend, scheduling, assignments, attendance, and notifications.",
                ["Django", "React", "RBAC", "APIs", "PostgreSQL", "Docker"],
            ),
        ]
        for order, (title, status, description, tags) in enumerate(projects):
            project = Project.objects.create(order=order, title=title, status=status, description=description)
            for tag_order, tag in enumerate(tags):
                ProjectTag.objects.create(project=project, order=tag_order, name=tag)

        pipeline = [
            ("GitHub Push", "Code committed to repository", "git push origin production"),
            ("GitHub Actions", "Automated build, test, and lint", "npm run build && python manage.py check"),
            ("Docker Build", "Build and prepare production image", "docker compose build"),
            ("Deploy to VPS", "Secure SSH deployment", "ssh deploy@vps"),
            ("Nginx + Gunicorn", "Production routing and app serving", "systemctl reload nginx"),
            ("Live in < 1 min", "Zero-downtime deployment", "curl /healthz"),
        ]
        for order, (title, description, command) in enumerate(pipeline):
            PipelineStep.objects.create(order=order, title=title, description=description, command=command)

        self._blueprint(
            order=0,
            title="SaaS Platform Blueprint",
            description="A scalable SaaS architecture for multi-tenant business platforms.",
            accent="#2563eb",
            modules=[
                "Tenant Management",
                "User & Role Management",
                "Subscription Plans",
                "Product/Service Module",
                "Order/Booking Module",
                "Payment Tracking",
                "Audit Logs",
                "Operations Console",
                "Notification System",
            ],
            api_groups=[
                "/api/auth/",
                "/api/tenants/",
                "/api/users/",
                "/api/roles/",
                "/api/subscriptions/",
                "/api/products/",
                "/api/orders/",
                "/api/audit-logs/",
                "/api/notifications/",
            ],
            relationships=[
                ("Tenant", "Users", "owns"),
                ("Users", "Roles", "assigned"),
                ("Tenant", "Subscription", "billed"),
                ("Tenant", "Products", "catalog"),
                ("Products", "Orders", "sold"),
                ("Orders", "Payments", "settled"),
                ("Users", "AuditLogs", "writes"),
            ],
        )
        self._blueprint(
            order=1,
            title="Nirog Healthcare Platform Blueprint",
            description="A healthcare platform architecture for patients, doctors, moderators, consultations, prescriptions, payments, and records.",
            accent="#10b981",
            modules=[
                "Patient Profiles",
                "Doctor Profiles",
                "Moderator Role",
                "Appointment Booking",
                "Live Consultation",
                "Prescription Management",
                "Medical Records",
                "Payment System",
                "Notifications",
                "Operations Console",
                "Audit & Security Logs",
            ],
            api_groups=[
                "/api/auth/",
                "/api/patients/",
                "/api/doctors/",
                "/api/moderators/",
                "/api/appointments/",
                "/api/consultations/",
                "/api/prescriptions/",
                "/api/medical-records/",
                "/api/payments/",
                "/api/notifications/",
                "/api/ops/",
            ],
            relationships=[
                ("User", "PatientProfile", "extends"),
                ("User", "DoctorProfile", "extends"),
                ("User", "ModeratorProfile", "extends"),
                ("Patient", "Appointment", "books"),
                ("Appointment", "Consultation", "opens"),
                ("Consultation", "Prescription", "generates"),
                ("Patient", "MedicalRecord", "owns"),
                ("Appointment", "Payment", "charges"),
                ("System", "AuditLog", "records"),
            ],
        )

        self._blueprint(
            order=2,
            title="Scalable Real-Time Platform Blueprint",
            description="A horizontally scalable, event-driven architecture combining Django, async workers, websockets, a Node.js service, and a CDN-fronted edge for high-throughput production traffic.",
            accent="#7c3aed",
            modules=[
                "Django API (DRF)",
                "Celery Workers",
                "Redis (cache/broker/pub-sub)",
                "Django Channels (WebSockets)",
                "Webhook Dispatcher (HMAC-signed)",
                "Node.js/Express Service",
                "React + Vite Micro-Frontend",
                "Nginx Reverse Proxy",
                "CloudFront CDN",
                "AWS S3 (media/static)",
            ],
            api_groups=[
                "/api/portfolio/",
                "/api/webhooks/",
                "/ws/analytics/",
                "/gateway/health",
                "/gateway/webhook",
            ],
            relationships=[
                ("Client", "CDN", "cached"),
                ("CDN", "Nginx", "origin"),
                ("Nginx", "Django API", "routes"),
                ("Nginx", "Node.js Service", "routes"),
                ("Django API", "Redis", "caches"),
                ("Django API", "Celery Workers", "queues"),
                ("Celery Workers", "Webhook Dispatcher", "delivers"),
                ("Django Channels", "Redis", "pub/sub"),
                ("Client", "Django Channels", "subscribes"),
                ("Django API", "AWS S3", "stores"),
            ],
        )

        for order, name in enumerate(["Next.js", "TypeScript", "Django", "DRF", "PostgreSQL", "Docker", "Nginx", "Gunicorn", "GitHub Actions", "Linux"]):
            TechStackItem.objects.create(order=order, name=name, category="Production Stack")

        for order, name in enumerate(["Redis", "Celery", "Django Channels", "WebSockets", "Webhooks (HMAC-signed)"]):
            TechStackItem.objects.create(order=order, name=name, category="Async & Real-Time")

        for order, name in enumerate(["Node.js", "Express", "React", "Vite"]):
            TechStackItem.objects.create(order=order, name=name, category="Services & Micro-Frontends")

        for order, name in enumerate(["AWS S3", "CloudFront CDN", "Horizontal Scaling", "Rate Limiting", "Zero-Downtime Deploys"]):
            TechStackItem.objects.create(order=order, name=name, category="Cloud & Scalability")

        SocialLink.objects.create(order=0, label="GitHub", url="https://github.com/AisStartCoding")
        SocialLink.objects.create(order=1, label="Email", url="mailto:abdullahibnasiddiquie12688@gmail.com")

        self.stdout.write(self.style.SUCCESS("Portfolio seed data created."))

    def _blueprint(self, order, title, description, accent, modules, api_groups, relationships):
        blueprint = ArchitectureBlueprint.objects.create(order=order, title=title, description=description, accent=accent)
        for item_order, name in enumerate(modules):
            ArchitectureModule.objects.create(blueprint=blueprint, order=item_order, name=name)
        for item_order, path in enumerate(api_groups):
            ArchitectureApiGroup.objects.create(blueprint=blueprint, order=item_order, path=path)
        for item_order, (source, target, label) in enumerate(relationships):
            ArchitectureRelationship.objects.create(blueprint=blueprint, order=item_order, source=source, target=target, label=label)
