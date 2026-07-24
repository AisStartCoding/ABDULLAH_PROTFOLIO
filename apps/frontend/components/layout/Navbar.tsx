"use client";

import { Github } from "lucide-react";
import { motion } from "framer-motion";
import { QuestionTicker } from "@/components/layout/QuestionTicker";
import { ProfileAvatar } from "@/components/ui/ProfileAvatar";
import GlareHover from "@/components/effects/GlareHover";
import type { SiteSettings, SocialLink } from "@/types/portfolio";

// Transparent bar — each group keeps its own small chip background instead
// of a bar-wide background, so scrolled content never visually collides
// with a solid header. Two compact corners: logo+name top-left, questions+
// GitHub top-right.
export function Navbar({ settings, socialLinks }: { settings: SiteSettings; socialLinks: SocialLink[] }) {
  const github = socialLinks.find((link) => link.label.toLowerCase() === "github");

  return (
    <header className="fixed left-0 right-0 top-0 z-50">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-5 sm:px-6 lg:px-8">
        <div className="flex min-w-0 shrink-0 items-center gap-2">
          <ProfileAvatar />
          <span className="hidden truncate text-sm font-semibold text-slate-50 sm:inline">{settings.name}</span>
        </div>

        <div className="flex min-w-0 shrink-0 items-center gap-2">
          <QuestionTicker />
          {github ? (
            <GlareHover
              width="2.5rem"
              height="2.5rem"
              background="transparent"
              borderRadius="0.375rem"
              borderColor="transparent"
              glareColor="#00d1ff"
              glareOpacity={0.35}
              glareAngle={-30}
              glareSize={300}
              transitionDuration={700}
              className="shrink-0"
            >
              <motion.a
                href={github.url}
                aria-label="GitHub"
                whileTap={{ scale: 0.88 }}
                whileHover={{ scale: 1.05 }}
                className="cursor-target inline-flex h-full w-full items-center justify-center rounded-md border border-slate-700/60 bg-slate-900 text-slate-400 transition-colors hover:border-green-500/40 hover:text-green-400 active:border-green-500/60 active:bg-green-500/10 active:text-green-400"
              >
                <Github className="h-4 w-4" />
              </motion.a>
            </GlareHover>
          ) : null}
        </div>
      </nav>
    </header>
  );
}
