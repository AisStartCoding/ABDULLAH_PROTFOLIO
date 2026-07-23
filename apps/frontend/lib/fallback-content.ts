import type { PortfolioHome, ProjectCaseStudyStage } from "@/types/portfolio";

const caseStudies: Record<string, Omit<ProjectCaseStudyStage, "id">[]> = {
  "Nirog Healthcare Platform": [
    { stage: "problem", title: "Problem", body: "Patients and clinics needed one platform to manage bookings, consultations, prescriptions, and records instead of juggling phone calls and paper files." },
    { stage: "architecture", title: "Architecture", body: "Django REST APIs modeled patient, doctor, and moderator profiles with appointment, consultation, and prescription resources, plus an audit-logged operations console." },
    { stage: "design", title: "Design", body: "Separate patient and doctor flows shared one auth system, with moderators overseeing appointment conflicts and content moderation." },
    { stage: "technology", title: "Technology", body: "Built on Django, DRF, PostgreSQL, Docker, and Nginx/Gunicorn, deployed to a production VPS with SSL." },
    { stage: "result", title: "Result", body: "Live production platform handling real patient-doctor consultations and prescription management end-to-end." }
  ],
  "STech Holidays — Travel & Flight Booking": [
    { stage: "problem", title: "Problem", body: "Travel inventory from third-party providers had to be combined with real-time flight/package availability while keeping bookings consistent under concurrent requests." },
    { stage: "architecture", title: "Architecture", body: "A Django backend orchestrated third-party API integrations behind a unified booking service, normalizing external responses into internal availability models." },
    { stage: "design", title: "Design", body: "Authenticated user flows separated browsing, holding, and confirming a booking, so partial or failed reservations never left orphaned records." },
    { stage: "technology", title: "Technology", body: "Built with Django, PostgreSQL, external REST API clients, containerized with Docker, and served through Nginx in production." },
    { stage: "result", title: "Result", body: "Live production booking platform for flights and holiday packages, reflecting real third-party availability." }
  ],
  "JG Pharmacy — Online Medicine Delivery": [
    { stage: "problem", title: "Problem", body: "Customers needed a trustworthy way to order licensed medicines and lab tests online instead of relying on in-person pharmacy visits." },
    { stage: "architecture", title: "Architecture", body: "Product catalog, prescription upload, and order/lab-test booking modules backed by a Django REST API and PostgreSQL." },
    { stage: "design", title: "Design", body: "A simple customer-facing ordering flow paired with an admin backend for verifying prescriptions and fulfilling orders." },
    { stage: "technology", title: "Technology", body: "Django, PostgreSQL, Docker, Nginx, Gunicorn, and a CI/CD pipeline to production VPS." },
    { stage: "result", title: "Result", body: "Live platform serving real medicine and lab-test orders with home delivery in Dhaka." }
  ],
  "Mamun Sir Physics — O/A Level Coaching Platform": [
    { stage: "problem", title: "Problem", body: "Students needed structured, exam-focused physics instruction and resources beyond ad-hoc tutoring." },
    { stage: "architecture", title: "Architecture", body: "A role-based admin/teacher/student platform for course modules, scheduling, and resource delivery, extending the same RBAC pattern used across other coaching-style builds." },
    { stage: "design", title: "Design", body: "Modules organized by topic (mechanics, electricity, waves, optics, modern physics) with a student-facing learning dashboard." },
    { stage: "technology", title: "Technology", body: "Django, PostgreSQL, Docker, Nginx, Gunicorn, deployed to a production VPS." },
    { stage: "result", title: "Result", body: "Live coaching platform actively used by O/A Level students for structured physics preparation." }
  ],
  "The Food Park — Food Ordering Platform": [
    { stage: "problem", title: "Problem", body: "Local food vendors needed an online storefront and order pipeline instead of relying purely on walk-in and phone orders." },
    { stage: "architecture", title: "Architecture", body: "Menu/catalog, cart, and order-management REST API backed by PostgreSQL, with an admin console for vendors." },
    { stage: "design", title: "Design", body: "A straightforward browse-to-checkout customer flow paired with order tracking for fulfillment." },
    { stage: "technology", title: "Technology", body: "Django, DRF, PostgreSQL, Docker, Nginx, Gunicorn, and automated CI/CD deployment." },
    { stage: "result", title: "Result", body: "Deployed food ordering platform live in production, connecting customers with local vendors." }
  ],
  "Nomad — Social Travel Platform": [
    { stage: "problem", title: "Problem", body: "Travelers wanted to document journeys chronologically and discover authentic recommendations, instead of fragmented, disconnected social posts." },
    { stage: "architecture", title: "Architecture", body: "A REST API for day-by-day trip timelines and social discovery/feed features, backed by PostgreSQL." },
    { stage: "design", title: "Design", body: "A chronological trip-narrative UX paired with community discovery, so recommendations stay tied to a real traveler's journey." },
    { stage: "technology", title: "Technology", body: "Django, DRF, PostgreSQL, Docker, Nginx, Gunicorn, deployed to a production VPS." },
    { stage: "result", title: "Result", body: "Live social travel platform used by real travelers to share and discover trip experiences." }
  ]
};

export const fallbackPortfolio: PortfolioHome = {
  settings: {
    name: "Abdullah Ibna Siddiquie",
    role: "Full-Stack Engineer | Django & Next.js | DevOps",
    email: "abdullahibnasiddiquie12688@gmail.com",
    location: "Dhaka, Bangladesh",
    open_status: "Open to Remote",
    seo_title: "Abdullah Ibna Siddiquie | Full-Stack Engineer & DevOps Builder",
    seo_description: "Full-stack engineering portfolio spanning Django/DRF backends, Next.js/React frontends, PostgreSQL, CI/CD, Docker, Nginx, SaaS, and healthcare architecture."
  },
  hero: {
    headline: "Full-stack systems, interfaces, and deployments built for real products.",
    subtext: "I build Django backends, Next.js/React frontends, REST APIs, database structures, CI/CD pipelines, and VPS production infrastructure for SaaS, healthcare, booking, and business platforms.",
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
    { id: 3, value: "25%", label: "Application Speed Boost", description: "via full-stack optimization", order: 2 },
    { id: 4, value: "<1 min", label: "Zero-Downtime Deploy", description: "on every production push", order: 3 }
  ],
  skill_categories: [
    { id: 1, title: "Backend", order: 0, skills: ["Python", "Django", "FastAPI", "Flask", "Celery", "Django Channels"].map((name, index) => ({ id: index + 1, name, order: index })) },
    { id: 2, title: "Frontend", order: 1, skills: ["React", "Next.js", "TypeScript", "Vite", "Tailwind CSS", "REST/API Integration"].map((name, index) => ({ id: index + 6, name, order: index })) },
    { id: 3, title: "APIs & Database", order: 2, skills: ["REST API", "PostgreSQL", "SQL", "RBAC", "Auth", "Webhooks", "WebSockets"].map((name, index) => ({ id: index + 10, name, order: index })) },
    { id: 4, title: "Async & Caching", order: 3, skills: ["Redis", "Celery Workers", "Pub/Sub", "Task Queues", "Cache Invalidation"].map((name, index) => ({ id: index + 15, name, order: index })) },
    { id: 5, title: "DevOps & Infra", order: 4, skills: ["Docker", "Nginx", "Gunicorn", "CI/CD", "GitHub Actions", "VPS", "Linux", "SSH"].map((name, index) => ({ id: index + 20, name, order: index })) },
    { id: 6, title: "Cloud & Scalability", order: 5, skills: ["AWS S3", "CloudFront CDN", "Horizontal Scaling", "Load Balancing", "Rate Limiting"].map((name, index) => ({ id: index + 28, name, order: index })) },
    { id: 7, title: "Security", order: 6, skills: ["Firewall", "HTTPS/SSL", "UFW", "server hardening"].map((name, index) => ({ id: index + 30, name, order: index })) },
    { id: 8, title: "Node Services", order: 7, skills: ["Node.js", "Express"].map((name, index) => ({ id: index + 40, name, order: index })) }
  ],
  experiences: [
    {
      id: 1,
      title: "Full-Stack & DevOps Engineer",
      company: "Logic Gate Software Solutions BD",
      date: "Oct 2025 - Present",
      location: "Dhaka, Bangladesh",
      bullets: [
        "Built and deployed SaaS, eCommerce, and travel platforms end-to-end: Django/DRF APIs, React/Next.js frontends, and production infrastructure",
        "Built CI/CD pipelines with GitHub Actions to VPS",
        "Containerized services with Docker and configured Nginx + SSL + domain routing",
        "Led incident recovery, malware cleanup, and server hardening",
        "Hardened servers with SSH key authentication, UFW firewall, and automated patching"
      ].map((text, index) => ({ id: index + 1, text, order: index }))
    }
  ],
  projects: [
    ["Nirog Healthcare Platform", "Telehealth platform connecting patients, doctors, and moderators for appointments, live consultations, prescriptions, and medical records.", ["Django", "DRF", "PostgreSQL", "RBAC", "Docker"], "https://niroghealthapp.com/"],
    ["STech Holidays — Travel & Flight Booking", "Travel booking platform for flights and holiday packages with real-time availability, third-party API integrations, and a full booking-to-payment flow.", ["Django", "PostgreSQL", "APIs", "Nginx", "Docker"], "https://www.stechholidays.com/"],
    ["JG Pharmacy — Online Medicine Delivery", "E-commerce platform for ordering genuine medicines, booking lab tests, and submitting prescriptions for home delivery.", ["Django", "PostgreSQL", "E-commerce", "Docker"], "https://jgpharmacy.com/"],
    ["Mamun Sir Physics — O/A Level Coaching Platform", "Online physics coaching platform with structured course modules, problem-solving sessions, and free learning resources for O/A Level students.", ["Django", "RBAC", "PostgreSQL", "Docker"], "https://mamunsirphysics.com/"],
    ["The Food Park — Food Ordering Platform", "Food ordering and delivery platform connecting customers with local restaurants and vendors.", ["Django", "DRF", "PostgreSQL", "Nginx"], "https://thefoodpark.xyz/"],
    ["Nomad — Social Travel Platform", "Social platform for travelers to document trips as day-by-day narratives, discover recommendations, and build community around shared travel experiences.", ["Django", "DRF", "PostgreSQL", "Docker"], "https://nomadtravelapp.com/"]
  ].map(([title, description, tags, detailUrl], index) => ({
    id: index + 1,
    title: title as string,
    status: "Deployed",
    description: description as string,
    detail_url: detailUrl as string,
    tags: (tags as string[]).map((name, tagIndex) => ({ id: index * 10 + tagIndex, name, order: tagIndex })),
    case_study: (caseStudies[title as string] ?? []).map((stage, stageIndex) => ({ id: index * 10 + stageIndex, ...stage }))
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
      accent: "#2563eb",
      modules: ["Tenant Management", "User & Role Management", "Subscription Plans", "Product/Service Module", "Order/Booking Module", "Payment Tracking", "Audit Logs", "Operations Console", "Notification System"].map((name, index) => ({ id: index + 1, name, order: index })),
      api_groups: ["/api/auth/", "/api/tenants/", "/api/users/", "/api/roles/", "/api/subscriptions/", "/api/products/", "/api/orders/", "/api/audit-logs/", "/api/notifications/"].map((path, index) => ({ id: index + 1, path, order: index })),
      relationships: [["Tenant", "Users", "owns"], ["Users", "Roles", "assigned"], ["Tenant", "Subscription", "billed"], ["Tenant", "Products", "catalog"], ["Products", "Orders", "sold"], ["Orders", "Payments", "settled"], ["Users", "AuditLogs", "writes"]].map(([source, target, label], index) => ({ id: index + 1, source, target, label, order: index }))
    },
    {
      id: 2,
      title: "Nirog Healthcare Platform Blueprint",
      description: "A healthcare platform architecture for patients, doctors, moderators, consultations, prescriptions, payments, and records.",
      accent: "#10b981",
      modules: ["Patient Profiles", "Doctor Profiles", "Moderator Role", "Appointment Booking", "Live Consultation", "Prescription Management", "Medical Records", "Payment System", "Notifications", "Operations Console", "Audit & Security Logs"].map((name, index) => ({ id: index + 20, name, order: index })),
      api_groups: ["/api/auth/", "/api/patients/", "/api/doctors/", "/api/moderators/", "/api/appointments/", "/api/consultations/", "/api/prescriptions/", "/api/medical-records/", "/api/payments/", "/api/notifications/", "/api/ops/"].map((path, index) => ({ id: index + 20, path, order: index })),
      relationships: [["User", "PatientProfile", "extends"], ["User", "DoctorProfile", "extends"], ["User", "ModeratorProfile", "extends"], ["Patient", "Appointment", "books"], ["Appointment", "Consultation", "opens"], ["Consultation", "Prescription", "generates"], ["Patient", "MedicalRecord", "owns"], ["Appointment", "Payment", "charges"], ["System", "AuditLog", "records"]].map(([source, target, label], index) => ({ id: index + 20, source, target, label, order: index }))
    },
    {
      id: 3,
      title: "Scalable Real-Time Platform Blueprint",
      description: "A horizontally scalable, event-driven architecture combining Django, async workers, websockets, a Node.js service, and a CDN-fronted edge for high-throughput production traffic.",
      accent: "#7c3aed",
      modules: ["Django API (DRF)", "Celery Workers", "Redis (cache/broker/pub-sub)", "Django Channels (WebSockets)", "Webhook Dispatcher (HMAC-signed)", "Node.js/Express Service", "React + Vite Micro-Frontend", "Nginx Reverse Proxy", "CloudFront CDN", "AWS S3 (media/static)"].map((name, index) => ({ id: index + 40, name, order: index })),
      api_groups: ["/api/portfolio/", "/api/webhooks/", "/ws/analytics/", "/gateway/health", "/gateway/webhook"].map((path, index) => ({ id: index + 40, path, order: index })),
      relationships: [["Client", "CDN", "cached"], ["CDN", "Nginx", "origin"], ["Nginx", "Django API", "routes"], ["Nginx", "Node.js Service", "routes"], ["Django API", "Redis", "caches"], ["Django API", "Celery Workers", "queues"], ["Celery Workers", "Webhook Dispatcher", "delivers"], ["Django Channels", "Redis", "pub/sub"], ["Client", "Django Channels", "subscribes"], ["Django API", "AWS S3", "stores"]].map(([source, target, label], index) => ({ id: index + 40, source, target, label, order: index }))
    }
  ],
  tech_stack: [
    ...["Next.js", "TypeScript", "Django", "DRF", "PostgreSQL", "Docker", "Nginx", "Gunicorn", "GitHub Actions", "Linux"].map((name, index) => ({ id: index + 1, name, category: "Production Stack", icon: "" })),
    ...["Redis", "Celery", "Django Channels", "WebSockets", "Webhooks (HMAC-signed)"].map((name, index) => ({ id: index + 20, name, category: "Async & Real-Time", icon: "" })),
    ...["Node.js", "Express", "React", "Vite"].map((name, index) => ({ id: index + 30, name, category: "Services & Micro-Frontends", icon: "" })),
    ...["AWS S3", "CloudFront CDN", "Horizontal Scaling", "Rate Limiting", "Zero-Downtime Deploys"].map((name, index) => ({ id: index + 40, name, category: "Cloud & Scalability", icon: "" }))
  ],
  theme: { primary: "#3b82f6", secondary: "#22c55e", violet: "#8b5cf6", background: "#020617" },
  animation: { intensity: 0.75, speed: 0.7, enable_3d: false, enable_particles: false },
  social_links: [
    { id: 1, label: "GitHub", url: "https://github.com/AisStartCoding" },
    { id: 2, label: "Email", url: "mailto:abdullahibnasiddiquie12688@gmail.com" }
  ]
};
