"use client";

import { useState } from "react";
import { Award, Briefcase, Mail, User, Wrench } from "lucide-react";
import Link from "next/link";
import BorderGlow from "@/components/effects/BorderGlow";
import Folder from "@/components/effects/Folder";

const CARDS = [
  {
    href: "/about",
    icon: User,
    title: "About",
    description: "Engineering approach, principles, and journey.",
    glowColor: "217 91% 65%",
    palette: ["#3b82f6", "#60a5fa", "#1d4ed8"]
  },
  {
    href: "/skills",
    icon: Wrench,
    title: "Skills",
    description: "The stack I use to build, ship, and scale.",
    glowColor: "160 84% 55%",
    palette: ["#10b981", "#34d399", "#047857"]
  },
  {
    href: "/projects",
    icon: Briefcase,
    title: "Projects",
    description: "Production systems, architecture, and CI/CD.",
    glowColor: "262 83% 68%",
    palette: ["#8b5cf6", "#a78bfa", "#6d28d9"]
  },
  {
    href: "/certificates",
    icon: Award,
    title: "Certificates",
    description: "Credentials and continuous technical growth.",
    glowColor: "38 92% 60%",
    palette: ["#f59e0b", "#fbbf24", "#b45309"]
  },
  {
    href: "/contact",
    icon: Mail,
    title: "Contact",
    description: "Have a product that needs a reliable backend?",
    glowColor: "189 94% 55%",
    palette: ["#06b6d4", "#22d3ee", "#0e7490"]
  }
];

function NavCard({ card, compact, folderOpen }: { card: (typeof CARDS)[number]; compact: boolean; folderOpen: boolean }) {
  return (
    <BorderGlow
      className="nav-card h-full"
      backgroundColor="#0b0f19"
      borderRadius={16}
      glowColor={card.glowColor}
      glowIntensity={1.1}
      glowRadius={28}
      colors={card.palette}
    >
      <Link
        href={card.href}
        className={`cursor-target flex ${
          compact ? "h-24" : "h-28"
        } w-full items-center gap-3 rounded-2xl p-4 transition-transform duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-blue ${
          folderOpen ? "-translate-y-1" : ""
        }`}
      >
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-white/10">
          <card.icon className="h-5 w-5 text-white" />
        </span>
        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-white sm:text-base">{card.title}</h3>
          <p className="truncate text-xs leading-5 text-white/70">{card.description}</p>
        </div>
      </Link>
    </BorderGlow>
  );
}

/**
 * A single Folder is the visual "source" for page navigation: hovering (or
 * focusing) it — or scrolling further into view — fans its pages out as
 * cards below it. Clicking any card navigates to that page. Entrance stagger
 * (when embedded in Hero) is driven by the parent's own window-scroll
 * timeline via the `.nav-card` class, not a nested scroll container.
 */
export function ScrollStackNav({ compact = false }: { compact?: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="flex flex-col items-center gap-4"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      <div className="pointer-events-none select-none" aria-hidden>
        <Folder color="#00d1ff" size={compact ? 1.1 : 1.4} open={hovered} items={[]} />
      </div>

      <div
        className={`grid w-full gap-3 sm:gap-4 ${
          compact ? "grid-cols-2" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        }`}
      >
        {CARDS.map((card, i) => (
          <div key={card.href} className={compact && i === CARDS.length - 1 ? "col-span-2" : ""}>
            <NavCard card={card} compact={compact} folderOpen={hovered} />
          </div>
        ))}
      </div>
    </div>
  );
}
