"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Activity, Github, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState, type ReactNode } from "react";
import { QuestionTicker } from "@/components/layout/QuestionTicker";
import { ProfileAvatar } from "@/components/ui/ProfileAvatar";
import type { Experience, SiteSettings, SkillCategory, SocialLink } from "@/types/portfolio";

const navItems = [
  { href: "#projects", label: "Projects" },
  { href: "#pipeline", label: "Pipeline" },
  { href: "#architecture", label: "Architecture" },
  { href: "#contact", label: "Contact" }
];

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
  const [open, setOpen] = useState(false);
  const github = socialLinks.find((link) => link.label.toLowerCase() === "github");

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-slate-700/60 bg-slate-950/80 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex shrink-0 items-center gap-3">
          <ProfileAvatar settings={settings} skillCategories={skillCategories} experiences={experiences} />
          <Link href="#hero" onClick={() => setOpen(false)} className="hidden items-center gap-2 text-sm font-semibold text-slate-50 sm:flex">
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

        <div className="hidden shrink-0 items-center gap-6 text-xs font-medium uppercase tracking-[0.16em] text-slate-400 lg:flex">
          {navItems.map((item) => (
            <DesktopNavLink key={item.href} href={item.href}>
              {item.label}
            </DesktopNavLink>
          ))}
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-3 md:ml-0">
          <span className="hidden rounded-md border border-green-500/30 bg-green-500/10 px-3 py-1 text-xs text-green-400 sm:inline-flex">
            {settings.open_status}
          </span>
          {github ? (
            <Link href={github.url} aria-label="GitHub" className="hidden rounded-md border border-slate-700/60 bg-slate-900 p-2 text-slate-400 hover:border-green-500/40 hover:text-green-400 sm:inline-flex">
              <Github className="h-4 w-4" />
            </Link>
          ) : null}
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-slate-700/60 bg-slate-900 text-slate-300 shadow-sm md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="mx-4 mb-4 overflow-hidden rounded-lg border border-slate-700/60 bg-slate-900/94 p-3 shadow-[0_22px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl md:hidden"
          >
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.055 } }, hidden: {} }}
              className="grid gap-1"
            >
              {navItems.map((item) => (
                <motion.div key={item.href} variants={{ hidden: { opacity: 0, y: -8 }, visible: { opacity: 1, y: 0 } }}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between rounded-md px-3 py-3 text-sm font-semibold text-slate-300 hover:bg-green-500/10 hover:text-green-400"
                  >
                    {item.label}
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                  </Link>
                </motion.div>
              ))}
              {github ? (
                <motion.div variants={{ hidden: { opacity: 0, y: -8 }, visible: { opacity: 1, y: 0 } }}>
                  <Link
                    href={github.url}
                    onClick={() => setOpen(false)}
                    className="mt-1 flex items-center gap-2 rounded-md border border-slate-700/60 px-3 py-3 text-sm font-semibold text-slate-300 hover:border-green-500/30 hover:bg-green-500/10 hover:text-green-400"
                  >
                    <Github className="h-4 w-4" /> GitHub
                  </Link>
                </motion.div>
              ) : null}
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

function DesktopNavLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="group relative py-2 hover:text-green-400">
      {children}
      <span className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-green-500 via-blue-500 to-violet-500 transition-transform duration-200 group-hover:scale-x-100" />
    </Link>
  );
}
