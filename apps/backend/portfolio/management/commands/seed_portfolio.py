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
    help = "Seed Abdullah's command center portfolio content."

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
            role="Backend Engineer • Python / Django / DevOps",
            email="abdullahibnasiddiquie12688@gmail.com",
            location="Dhaka, Bangladesh",
            open_status="Open to Remote",
            seo_title="Abdullah Ibna Siddiquie | Backend Engineer & DevOps Builder",
            seo_description="Backend command center portfolio for Django, APIs, PostgreSQL, CI/CD, Docker, Nginx, SaaS, and healthcare architecture.",
        )
        HeroContent.objects.create(
            headline="Backend systems, APIs, and infrastructure that ship fast.",
            subtext="I build reliable backend systems, database structures, deployment pipelines, and production infrastructure for SaaS, healthcare, booking, and business platforms.",
            terminal_lines=[
                "$ git push origin production",
                "github-actions: build, test, dockerize",
                "ssh deploy@vps: rolling restart",
                "nginx + gunicorn: healthy",
                "live in 48s",
            ],
        )
        ThemeSettings.objects.create()
        AnimationSettings.objects.create()

        metrics = [
            ("40%", "Deployment Efficiency", "via CI/CD automation"),
            ("30%", "Server Downtime Cut", "with Nginx configuration"),
            ("25%", "Application Speed Boost", "via backend optimization"),
            ("<1 min", "Zero-Downtime Deploy", "on every production push"),
        ]
        for order, (value, label, description) in enumerate(metrics):
            Metric.objects.create(order=order, value=value, label=label, description=description)

        skills = {
            "Backend": ["Python", "Django", "FastAPI", "Flask"],
            "APIs & Database": ["REST API", "PostgreSQL", "SQL", "RBAC", "Auth"],
            "DevOps & Infra": ["Docker", "Nginx", "Gunicorn", "CI/CD", "GitHub Actions", "VPS", "Linux", "SSH"],
            "Security": ["Firewall", "HTTPS/SSL", "UFW", "server hardening"],
            "Frontend Integration": ["React", "Next.js", "API Integration"],
        }
        for category_order, (title, names) in enumerate(skills.items()):
            category = SkillCategory.objects.create(order=category_order, title=title)
            for order, name in enumerate(names):
                Skill.objects.create(category=category, order=order, name=name)

        experience = Experience.objects.create(
            title="DevOps & Backend Engineer",
            company="Logic Gate Software Solutions BD",
            date="Oct 2025 - Present",
            location="Dhaka, Bangladesh",
        )
        for order, text in enumerate(
            [
                "Deployed SaaS, eCommerce, and travel platforms end-to-end in production",
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
                "Scalable REST APIs for products, orders, users, admin, and multi-tenant business logic. Full CI/CD pipeline with automated deployment to VPS.",
                ["Django", "PostgreSQL", "Nginx", "Gunicorn", "Docker", "CI/CD"],
            ),
            (
                "Travel & Booking Platform",
                "Deployed",
                "Booking backend with third-party API integrations, real-time availability logic, user authentication, and production deployment.",
                ["Django", "PostgreSQL", "APIs", "Nginx", "Docker"],
            ),
            (
                "Hotel & Flight Booking System",
                "Deployed",
                "Multi-module booking engine for reservations, conflict handling, lifecycle management, and deployment on VPS.",
                ["Django", "Booking Logic", "PostgreSQL", "VPS", "Docker"],
            ),
            (
                "Coaching Management System",
                "Deployed",
                "Role-based platform for admin, teacher, and student workflows with scheduling, assignments, attendance, and notifications.",
                ["Django", "RBAC", "APIs", "PostgreSQL", "Docker"],
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
            accent="#22d3ee",
            modules=[
                "Tenant Management",
                "User & Role Management",
                "Subscription Plans",
                "Product/Service Module",
                "Order/Booking Module",
                "Payment Tracking",
                "Audit Logs",
                "Admin Dashboard",
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
                "Admin Dashboard",
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
                "/api/admin/",
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

        for order, name in enumerate(["Next.js", "TypeScript", "Django", "DRF", "PostgreSQL", "Docker", "Nginx", "Gunicorn", "GitHub Actions", "Linux"]):
            TechStackItem.objects.create(order=order, name=name, category="Production Stack")

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
