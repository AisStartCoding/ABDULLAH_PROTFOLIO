// Central configuration for the Home page's 3D object showcase — one
// object (occasionally two, paired) cycles through in a controlled
// sequence, never all nine at once. Kept in one file per the "don't scatter
// configuration across JSX components" requirement.

export type ObjectSize = "small" | "medium" | "large";
export type Zone = "top-right" | "mid-right" | "bottom-right";

export type HomeObjectConfig = {
  id: string;
  src: string;
  alt: string;
  size: ObjectSize;
  /** Absent for "devops" — it doesn't use the generic corner-zone layer at
   * all. It's anchored directly inside the portrait's own container (see
   * Portrait in Hero.tsx) so it's guaranteed to sit exactly behind the
   * character rather than approximating that position from a sibling. */
  zone?: Zone;
  holdSeconds: number;
  aspect: number;
  mobileEnabled: boolean;
};

// Percentage-based placement zones, relative to the full-bleed hero
// viewport (not the centered max-w-6xl content column) — these land in the
// page's open gutter space rather than colliding with the hero text/cards
// column, and everything renders at a lower z-index than that content
// regardless, so proximity on narrower widths never blocks interaction.
// Each zone is unique per pair (see PAIR_WITH) so two simultaneously visible
// objects never land on top of each other.
export const ZONE_CLASSES: Record<Zone, string> = {
  "top-right": "right-[3%] top-[8%] sm:right-[5%]",
  "mid-right": "right-[2%] top-1/2 -translate-y-1/2 sm:right-[4%]",
  "bottom-right": "right-[4%] bottom-[10%] sm:right-[6%]"
};

export const HOME_OBJECTS: HomeObjectConfig[] = [
  {
    id: "devops",
    src: "/images/home-objects/devops-infinity.webp",
    alt: "",
    size: "large",
    holdSeconds: 6.5,
    aspect: 1322 / 633,
    mobileEnabled: true
  },
  {
    id: "portal",
    src: "/images/home-objects/nextjs-portal.webp",
    alt: "",
    size: "small",
    zone: "top-right",
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
    zone: "bottom-right",
    holdSeconds: 4.5,
    aspect: 827 / 885,
    mobileEnabled: true
  },
  {
    id: "cloud",
    src: "/images/home-objects/cloud-infrastructure.webp",
    alt: "",
    size: "medium",
    zone: "top-right",
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
    zone: "bottom-right",
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
    zone: "bottom-right",
    holdSeconds: 4.5,
    aspect: 634 / 945,
    mobileEnabled: true
  }
];

// Deterministic showcase order. A secondary (paired) object may appear
// alongside the primary one — never two "large" objects together, and
// never more than two objects at once.
export const SHOWCASE_SEQUENCE = [
  "devops",
  "portal",
  "python",
  "redis",
  "cloud",
  "workstation",
  "backend",
  "django",
  "infra"
];

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
