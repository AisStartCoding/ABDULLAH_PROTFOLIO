# Design System

## Direction

The interface is a dark, command-center backend/full-stack engineering portfolio. It reads like an operations console — credible to recruiters, founders, and technical hiring teams — while showcasing production, real-time, and scalability engineering depth.

## Visual Language

- Background: deep navy/near-black (`#020617`) with subtle blue/emerald radial gradients
- Accents: blue (`#3b82f6`), emerald (`#22c55e`), amber (`#d97706`), restrained violet (`#8b5cf6`)
- Surfaces: glass panels (`glass-panel`) — translucent dark cards with soft borders, blur, and animated glow on hover (`card-glow`)
- Typography: `JetBrains Mono` for headings and UI (monospace-first, terminal feel) across the whole site
- Imagery: no profile images, project images, stock images, or generated images

## Components

- `SectionHeader`: compact eyebrow, title, and supporting text
- `GlowButton`: primary and secondary CTAs
- `CommandCard`: shared animated card wrapper
- `MetricCard`: animated KPI card
- `TerminalPanel`: terminal-style proof/log panel
- `CaseStudyCard`, `Chip`, `ProfileAvatar`: supporting content primitives
- Three.js scenes (`CommandScene`, `DeepField`, `Meteors`, `StackOrbit`): ambient background visuals, not decorative-only — echo the "systems" theme
- `/studio`: custom private content manager, same dark theme, shadcn/ui structural components (table, tabs, dialog, toast) for CRUD and the new webhook/celery/analytics-style content panels

## Showcase Sections (async/real-time/scalability)

New content leans on existing `TerminalPanel`/`CommandCard` components rather than new visual language:
- Tech stack grid now includes Async & Real-Time (Redis, Celery, Channels, WebSockets, Webhooks), Services & Micro-Frontends (Node/Express, React+Vite), and Cloud & Scalability (AWS S3, CloudFront, horizontal scaling, rate limiting) categories.
- A third `ArchitectureBlueprint` ("Scalable Real-Time Platform Blueprint") documents the event-driven architecture (Django + Celery + Redis + Channels + Node/Express + CDN) using the existing architecture-explorer UI — no new component types required.

## Accessibility

- Text remains semantic HTML
- Focus states remain visible against the dark background
- Motion honors `prefers-reduced-motion`
- Cards use stable spacing and responsive grids
- Contrast (light text on dark surfaces) verified at 4.5:1+ for body copy
