"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Briefcase, X } from "lucide-react";
import { useState } from "react";
import { Chip } from "@/components/ui/Chip";
import type { Experience, SiteSettings, SkillCategory } from "@/types/portfolio";

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

function AvatarImage({ name, size }: { name: string; size: number }) {
  const [broken, setBroken] = useState(false);

  if (broken) {
    return (
      <div
        className="flex h-full w-full items-center justify-center bg-gradient-to-br from-green-500/30 via-blue-500/20 to-violet-500/30 font-mono font-semibold text-green-300"
        style={{ fontSize: size * 0.36 }}
      >
        {initials(name)}
      </div>
    );
  }

  // Drop a real photo at apps/frontend/public/profile.jpg to replace this
  // placeholder automatically — no code change needed.
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/profile.jpg`}
      alt={name}
      className="h-full w-full object-cover"
      onError={() => setBroken(true)}
    />
  );
}

export function ProfileAvatar({
  settings,
  skillCategories,
  experiences
}: {
  settings: SiteSettings;
  skillCategories: SkillCategory[];
  experiences: Experience[];
}) {
  const [open, setOpen] = useState(false);
  const topSkills = skillCategories.flatMap((category) => category.skills).slice(0, 8);
  const latestExperience = experiences[0];

  return (
    <div className="relative shrink-0">
      <motion.button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label={open ? "Close profile card" : "Open profile card"}
        aria-expanded={open}
        whileTap={{ scale: 0.88 }}
        className="relative flex h-10 w-10 items-center justify-center rounded-full"
      >
        <motion.span
          aria-hidden
          className="absolute inset-[-3px] rounded-full"
          style={{
            background: "conic-gradient(from 0deg, #22c55e, #3b82f6, #8b5cf6, #22c55e)"
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 6, ease: "linear", repeat: Infinity }}
        />
        <motion.span
          aria-hidden
          className="absolute inset-[-6px] rounded-full bg-green-500/40 blur-md"
          animate={{ opacity: [0.35, 0.7, 0.35] }}
          transition={{ duration: 2.4, ease: "easeInOut", repeat: Infinity }}
        />
        <span className="relative h-9 w-9 overflow-hidden rounded-full border-2 border-slate-950 bg-slate-900">
          <AvatarImage name={settings.name} size={36} />
        </span>
      </motion.button>

      <AnimatePresence>
        {open ? (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.97 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="absolute left-0 top-full z-50 mt-3 w-[min(18rem,calc(100vw-2rem))] rounded-lg border border-slate-700/60 bg-slate-950/95 p-4 shadow-[0_24px_70px_rgba(0,0,0,0.5)] backdrop-blur-xl sm:p-5"
            >
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close profile card"
                className="absolute right-3 top-3 rounded-md p-1 text-slate-500 hover:text-green-400"
              >
                <X className="h-3.5 w-3.5" />
              </button>

              <div className="flex items-center gap-3">
                <span className="h-14 w-14 shrink-0 overflow-hidden rounded-full border-2 border-green-500/40 bg-slate-900 shadow-[0_0_18px_rgba(34,197,94,0.35)]">
                  <AvatarImage name={settings.name} size={56} />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-slate-50">{settings.name}</p>
                  <p className="truncate text-xs text-green-400">{settings.role}</p>
                </div>
              </div>

              {topSkills.length > 0 ? (
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {topSkills.map((skill) => (
                    <Chip key={skill.id}>{skill.name}</Chip>
                  ))}
                </div>
              ) : null}

              {latestExperience ? (
                <div className="mt-4 flex gap-2 border-t border-slate-800 pt-4 text-xs">
                  <Briefcase className="mt-0.5 h-3.5 w-3.5 shrink-0 text-blue-400" />
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-slate-200">
                      {latestExperience.title} · {latestExperience.company}
                    </p>
                    <p className="text-slate-500">{latestExperience.date}</p>
                  </div>
                </div>
              ) : null}

              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-4 block rounded-md border border-green-500/30 bg-green-500/10 px-3 py-2 text-center text-xs font-semibold text-green-400 hover:bg-green-500/20"
              >
                Get in touch
              </a>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
