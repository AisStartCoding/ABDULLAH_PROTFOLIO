# Design System

## Direction

The interface is a light, polished backend engineering portfolio. It should feel credible to recruiters, founders, and technical hiring teams while still showing Abdullah's production mindset.

## Visual Language

- Background: white, soft gray, and very light blue
- Accents: blue, emerald, amber, and restrained violet
- Surfaces: white cards with soft borders, depth, and animated glow on hover
- Typography: `Space Grotesk` for headings and `Inter` for body/UI text
- Imagery: no profile images, project images, stock images, or generated images

## Components

- `SectionHeader`: compact eyebrow, title, and supporting text
- `GlowButton`: primary and secondary CTAs
- `CommandCard`: shared animated card wrapper
- `MetricCard`: animated KPI card
- `TerminalPanel`: light proof/log panel
- `/studio`: custom private content manager

## Accessibility

- Text remains semantic HTML
- Focus states remain visible
- Motion honors `prefers-reduced-motion`
- Cards use stable spacing and responsive grids
- Contrast should stay readable on all light surfaces
