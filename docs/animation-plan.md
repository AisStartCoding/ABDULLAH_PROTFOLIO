# Animation Plan

## Global Motion

- Motion should feel polished and professional, not distracting.
- Cards reveal on scroll, lift on hover, and show soft glow around the edge.
- Reduced-motion users receive static states through `prefers-reduced-motion`.

## Card Behavior

- Shared card wrapper handles reveal and hover motion.
- Metric cards use a subtle stagger.
- Project, skill, architecture, and pipeline cards use consistent elevation.
- Glow effects stay soft and readable on the light theme.

## Performance

- Avoid heavy 3D scenes by default.
- Avoid images entirely.
- Keep animations CSS/Framer Motion based.
- Keep layout dimensions stable so hover states do not shift surrounding content.
