# Design System

## Direction

The interface is a backend command center: dense, operational, cinematic, and technical. It avoids a resume look and instead presents Abdullah as someone who builds APIs, production infrastructure, SaaS architecture, and deployment systems.

## Visual Language

- Background: deep graphite and navy black
- Accents: electric cyan, teal, neon green, restrained violet
- Surfaces: glass panels with subtle border glow
- Typography: crisp sans-serif hierarchy with compact dashboard spacing
- Cards: system modules with status badges, telemetry rows, and terminal details

## Components

- `SectionHeader`: compact title, eyebrow, and supporting text
- `GlowButton`: command-style CTA buttons
- `CommandCard`: reusable glass system panel
- `MetricCard`: animated KPI card
- `TerminalPanel`: deployment log display
- `ProjectCard`: project module with status and architecture actions
- `Pipeline`: scroll-aware CI/CD workflow

## Accessibility

- Text remains HTML, never canvas-only
- Focus states are visible
- Motion honors `prefers-reduced-motion`
- Color contrast uses bright foreground values on dark surfaces
- Layout uses responsive constraints to avoid horizontal overflow
