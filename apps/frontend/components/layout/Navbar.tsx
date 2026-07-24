"use client";

import { motion } from "framer-motion";
import { Activity, Github } from "lucide-react";
import Link from "next/link";
import { QuestionTicker } from "@/components/layout/QuestionTicker";
import { ProfileAvatar } from "@/components/ui/ProfileAvatar";
import type { Experience, SiteSettings, SkillCategory, SocialLink } from "@/types/portfolio";

export function Navbar({
  settings,
  socialLinks,
  skillCategories,
  experiences
}: {
  settings: SiteSettings;
  socialLinks: SocialLink[];
  skillCategories: SkillCategory[];
  experiences: Experience[];
}) {
  const github = socialLinks.find((link) => link.label.toLowerCase() === "github");

  return (
    <header className="fixed left-0 right-0 top-0 z-50">
      <nav className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex shrink-0 items-center gap-3">
          <ProfileAvatar settings={settings} skillCategories={skillCategories} experiences={experiences} />
          <Link href="/" className="cursor-target hidden items-center gap-2 text-sm font-semibold text-slate-50 sm:flex">
            <motion.span
              whileHover={{ rotate: 8, scale: 1.04 }}
              className="flex h-9 w-9 items-center justify-center rounded-md border border-green-500/30 bg-green-500/10 shadow-sm"
            >
              <Activity className="h-4 w-4 text-green-400" />
            </motion.span>
            <span>{settings.name}</span>
          </Link>
        </div>

        <QuestionTicker />

        <div className="flex shrink-0 items-center gap-3">
          {github ? (
            <motion.a
              href={github.url}
              aria-label="GitHub"
              whileTap={{ scale: 0.88 }}
              whileHover={{ scale: 1.05 }}
              className="cursor-target inline-flex rounded-md border border-slate-700/60 bg-slate-900 p-2 text-slate-400 transition-colors hover:border-green-500/40 hover:text-green-400 active:border-green-500/60 active:bg-green-500/10 active:text-green-400"
            >
              <Github className="h-4 w-4" />
            </motion.a>
          ) : null}
        </div>
      </nav>
    </header>
  );
}
