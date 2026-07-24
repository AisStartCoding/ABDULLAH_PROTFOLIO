// Central configuration for the Home page's 3D object showcase — one
// object (occasionally two, paired) cycles through in a controlled
// sequence, never all nine at once. Kept in one file per the "don't scatter
// configuration across JSX components" requirement.

export type ObjectSize = "small" | "medium" | "large";
export type Zone = "top-left" | "mid-left" | "bottom-left" | "top-right" | "mid-right" | "bottom-right";

export type HomeObjectConfig = {
  id: string;
  src: string;
  alt: string;
  size: ObjectSize;
  zone: Zone;
  holdSeconds: number;
  aspect: number;
  mobileEnabled: boolean;
};

// Percentage-based placement zones, relative to the full-bleed hero
// viewport (not the centered max-w-6xl content column) — these land in the
// page's open gutter space rather than colliding with the hero text/cards
// column, and everything renders at a lower z-index than that content
// regardless, so proximity on narrower widths never blocks interaction.
// Every pair in PAIR_WITH below deliberately spans a left zone and a right
// zone — never two objects on the same side at once — so a pair always
// reads as two distinct, non-overlapping objects.
export const ZONE_CLASSES: Record<Zone, string> = {
  "top-left": "left-[3%] top-[10%] sm:left-[5%]",
  "mid-left": "left-[2%] top-1/2 -translate-y-1/2 sm:left-[4%]",
  "bottom-left": "left-[4%] bottom-[12%] sm:left-[6%]",
  "top-right": "right-[3%] top-[10%] sm:right-[5%]",
  "mid-right": "right-[2%] top-1/2 -translate-y-1/2 sm:right-[4%]",
  "bottom-right": "right-[4%] bottom-[12%] sm:right-[6%]"
};

export const HOME_OBJECTS: HomeObjectConfig[] = [
  {
    // Renders in the corner-zone layer like every other object now — no
    // longer anchored behind the character's portrait. Placed on the right
    // side specifically, since the portrait sits in the left column and a
    // left-side zone would still read as "behind the character."
    id: "devops",
    src: "/images/home-objects/devops-infinity.webp",
    alt: "",
    size: "large",
    zone: "top-right",
    holdSeconds: 6.5,
    aspect: 1322 / 633,
    // Large + wide (2:1 aspect) — disabled on mobile like the other "large"
    // objects (workstation/backend) so it never crowds the hero text column
    // on narrow screens.
    mobileEnabled: false
  },
  {
    id: "portal",
    src: "/images/home-objects/nextjs-portal.webp",
    alt: "",
    size: "small",
    zone: "top-left",
    holdSeconds: 5,
    aspect: 1,
    mobileEnabled: true
  },
  {
    id: "python",
    src: "/images/home-objects/python-core-cube.webp",
    alt: "",
    size: "medium",
    zone: "mid-right",
    holdSeconds: 5.5,
    aspect: 1,
    mobileEnabled: true
  },
  {
    id: "redis",
    src: "/images/home-objects/redis-node.webp",
    alt: "",
    size: "small",
    zone: "mid-left",
    holdSeconds: 4.5,
    aspect: 827 / 885,
    mobileEnabled: true
  },
  {
    // Deliberately on the opposite side from "workstation" below — the two
    // largest/most detailed scenes should never read as being in the same
    // spot even though they never appear simultaneously.
    id: "cloud",
    src: "/images/home-objects/cloud-infrastructure.webp",
    alt: "",
    size: "medium",
    zone: "top-left",
    holdSeconds: 5.5,
    aspect: 1,
    mobileEnabled: true
  },
  {
    id: "workstation",
    src: "/images/home-objects/workstation-full.png",
    alt: "",
    size: "large",
    zone: "mid-right",
    holdSeconds: 6,
    aspect: 1672 / 941,
    mobileEnabled: false
  },
  {
    id: "backend",
    src: "/images/home-objects/backend-full.png",
    alt: "",
    size: "large",
    zone: "mid-right",
    holdSeconds: 6,
    aspect: 1672 / 941,
    mobileEnabled: false
  },
  {
    id: "django",
    src: "/images/home-objects/django-node.webp",
    alt: "",
    size: "small",
    zone: "bottom-right",
    holdSeconds: 4.5,
    aspect: 794 / 856,
    mobileEnabled: true
  },
  {
    id: "infra",
    src: "/images/home-objects/infrastructure-01.png",
    alt: "",
    size: "small",
    zone: "bottom-left",
    holdSeconds: 4.5,
    aspect: 634 / 945,
    mobileEnabled: true
  }
];

// Deterministic showcase order. A secondary (paired) object may appear
// alongside the primary one — never two "large" objects together, and
// never more than two objects at once. Django and Infrastructure lead so
// they're what's visible on the very first page load.
export const SHOWCASE_SEQUENCE = [
  "django",
  "infra",
  "devops",
  "portal",
  "python",
  "redis",
  "cloud",
  "workstation",
  "backend"
];

// devops(right) + portal(left), python(right) + redis(left),
// cloud(left) + django(right), workstation(right) + infra(left) — every
// pair spans opposite sides, and devops is deliberately kept off the left
// side entirely so it never reads as sitting behind the character.
export const PAIR_WITH: Record<string, string | null> = {
  devops: "portal",
  portal: null,
  python: "redis",
  redis: null,
  cloud: "django",
  django: null,
  workstation: "infra",
  infra: null,
  backend: null
};

export const objectTiming = {
  enterDuration: 1.1,
  moveDuration: 3.5,
  exitDuration: 1.0,
  gapBetweenObjects: 0.7,
  startDelay: 1.6
};

export function getHomeObject(id: string) {
  return HOME_OBJECTS.find((obj) => obj.id === id) ?? null;
}
