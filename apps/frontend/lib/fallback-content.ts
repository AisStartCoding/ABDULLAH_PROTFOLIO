import type { PortfolioHome } from "@/types/portfolio";

export const fallbackPortfolio: PortfolioHome = {
  settings: {
    name: "Abdullah Ibna Siddiquie",
    role: "Backend Engineer • Python / Django / DevOps",
    email: "abdullahibnasiddiquie12688@gmail.com",
    location: "Dhaka, Bangladesh",
    open_status: "Open to Remote",
    seo_title: "Abdullah Ibna Siddiquie | Backend Engineer & DevOps Builder",
    seo_description: "Backend command center portfolio for Django, APIs, PostgreSQL, CI/CD, Docker, Nginx, SaaS, and healthcare architecture."
  },
  hero: {
    headline: "Backend systems, APIs, and infrastructure that ship fast.",
    subtext: "I build reliable backend systems, database structures, deployment pipelines, and production infrastructure for SaaS, healthcare, booking, and business platforms.",
    primary_button: "View Projects",
    secondary_button: "See Deployment Workflow",
    architecture_button: "Architecture Lab",
    contact_button: "Contact Me",
    terminal_title: "deployment@abdullah",
    terminal_lines: ["$ git push origin production", "github-actions: build, test, dockerize", "ssh deploy@vps: rolling restart", "nginx + gunicorn: healthy", "live in 48s"]
  },
  metrics: [
    { id: 1, value: "40%", label: "Deployment Efficiency", description: "via CI/CD automation", order: 0 },
    { id: 2, value: "30%", label: "Server Downtime Cut", description: "with Nginx configuration", order: 1 },
    { id: 3, value: "25%", label: "Application Speed Boost", description: "via backend optimization", order: 2 },
    { id: 4, value: "<1 min", label: "Zero-Downtime Deploy", description: "on every production push", order: 3 }
  ],
  skill_categories: [
    { id: 1, title: "Backend", order: 0, skills: ["Python", "Django", "FastAPI", "Flask"].map((name, index) => ({ id: index + 1, name, order: index })) },
    { id: 2, title: "APIs & Database", order: 1, skills: ["REST API", "PostgreSQL", "SQL", "RBAC", "Auth"].map((name, index) => ({ id: index + 10, name, order: index })) },
    { id: 3, title: "DevOps & Infra", order: 2, skills: ["Docker", "Nginx", "Gunicorn", "CI/CD", "GitHub Actions", "VPS", "Linux", "SSH"].map((name, index) => ({ id: index + 20, name, order: index })) },
    { id: 4, title: "Security", order: 3, skills: ["Firewall", "HTTPS/SSL", "UFW", "server hardening"].map((name, index) => ({ id: index + 30, name, order: index })) },
    { id: 5, title: "Frontend Integration", order: 4, skills: ["React", "Next.js", "API Integration"].map((name, index) => ({ id: index + 40, name, order: index })) }
  ],
  experiences: [
    {
      id: 1,
      title: "DevOps & Backend Engineer",
      company: "Logic Gate Software Solutions BD",
      date: "Oct 2025 - Present",
      location: "Dhaka, Bangladesh",
      bullets: [
        "Deployed SaaS, eCommerce, and travel platforms end-to-end in production",
        "Built CI/CD pipelines with GitHub Actions to VPS",
        "Containerized services with Docker and configured Nginx + SSL + domain routing",
        "Led incident recovery, malware cleanup, and server hardening",
        "Hardened servers with SSH key authentication, UFW firewall, and automated patching"
      ].map((text, index) => ({ id: index + 1, text, order: index }))
    }
  ],
  projects: [
    ["E-commerce SaaS Platform", "Scalable REST APIs for products, orders, users, admin, and multi-tenant business logic. Full CI/CD pipeline with automated deployment to VPS.", ["Django", "PostgreSQL", "Nginx", "Gunicorn", "Docker", "CI/CD"]],
    ["Travel & Booking Platform", "Booking backend with third-party API integrations, real-time availability logic, user authentication, and production deployment.", ["Django", "PostgreSQL", "APIs", "Nginx", "Docker"]],
    ["Hotel & Flight Booking System", "Multi-module booking engine for reservations, conflict handling, lifecycle management, and deployment on VPS.", ["Django", "Booking Logic", "PostgreSQL", "VPS", "Docker"]],
    ["Coaching Management System", "Role-based platform for admin, teacher, and student workflows with scheduling, assignments, attendance, and notifications.", ["Django", "RBAC", "APIs", "PostgreSQL", "Docker"]]
  ].map(([title, description, tags], index) => ({
    id: index + 1,
    title: title as string,
    status: "Deployed",
    description: description as string,
    tags: (tags as string[]).map((name, tagIndex) => ({ id: index * 10 + tagIndex, name, order: tagIndex }))
  })),
  pipeline_steps: [
    ["GitHub Push", "Code committed to repository", "git push origin production"],
    ["GitHub Actions", "Automated build, test, and lint", "npm run build && python manage.py check"],
    ["Docker Build", "Build and prepare production image", "docker compose build"],
    ["Deploy to VPS", "Secure SSH deployment", "ssh deploy@vps"],
    ["Nginx + Gunicorn", "Production routing and app serving", "systemctl reload nginx"],
    ["Live in < 1 min", "Zero-downtime deployment", "curl /healthz"]
  ].map(([title, description, command], index) => ({ id: index + 1, title, description, command, order: index })),
  architecture_blueprints: [
    {
      id: 1,
      title: "SaaS Platform Blueprint",
      description: "A scalable SaaS architecture for multi-tenant business platforms.",
      accent: "#22d3ee",
      modules: ["Tenant Management", "User & Role Management", "Subscription Plans", "Product/Service Module", "Order/Booking Module", "Payment Tracking", "Audit Logs", "Admin Dashboard", "Notification System"].map((name, index) => ({ id: index + 1, name, order: index })),
      api_groups: ["/api/auth/", "/api/tenants/", "/api/users/", "/api/roles/", "/api/subscriptions/", "/api/products/", "/api/orders/", "/api/audit-logs/", "/api/notifications/"].map((path, index) => ({ id: index + 1, path, order: index })),
      relationships: [["Tenant", "Users", "owns"], ["Users", "Roles", "assigned"], ["Tenant", "Subscription", "billed"], ["Tenant", "Products", "catalog"], ["Products", "Orders", "sold"], ["Orders", "Payments", "settled"], ["Users", "AuditLogs", "writes"]].map(([source, target, label], index) => ({ id: index + 1, source, target, label, order: index }))
    },
    {
      id: 2,
      title: "Nirog Healthcare Platform Blueprint",
      description: "A healthcare platform architecture for patients, doctors, moderators, consultations, prescriptions, payments, and records.",
      accent: "#10b981",
      modules: ["Patient Profiles", "Doctor Profiles", "Moderator Role", "Appointment Booking", "Live Consultation", "Prescription Management", "Medical Records", "Payment System", "Notifications", "Admin Dashboard", "Audit & Security Logs"].map((name, index) => ({ id: index + 20, name, order: index })),
      api_groups: ["/api/auth/", "/api/patients/", "/api/doctors/", "/api/moderators/", "/api/appointments/", "/api/consultations/", "/api/prescriptions/", "/api/medical-records/", "/api/payments/", "/api/notifications/", "/api/admin/"].map((path, index) => ({ id: index + 20, path, order: index })),
      relationships: [["User", "PatientProfile", "extends"], ["User", "DoctorProfile", "extends"], ["User", "ModeratorProfile", "extends"], ["Patient", "Appointment", "books"], ["Appointment", "Consultation", "opens"], ["Consultation", "Prescription", "generates"], ["Patient", "MedicalRecord", "owns"], ["Appointment", "Payment", "charges"], ["System", "AuditLog", "records"]].map(([source, target, label], index) => ({ id: index + 20, source, target, label, order: index }))
    }
  ],
  tech_stack: ["Next.js", "TypeScript", "Django", "DRF", "PostgreSQL", "Docker", "Nginx", "Gunicorn", "GitHub Actions", "Linux"].map((name, index) => ({ id: index + 1, name, category: "Production Stack", icon: "" })),
  theme: { primary: "#22d3ee", secondary: "#10b981", violet: "#8b5cf6", background: "#020617" },
  animation: { intensity: 0.85, speed: 0.75, enable_3d: true, enable_particles: true },
  social_links: [
    { id: 1, label: "GitHub", url: "https://github.com/AisStartCoding" },
    { id: 2, label: "Email", url: "mailto:abdullahibnasiddiquie12688@gmail.com" }
  ]
};
