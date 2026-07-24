"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { withBasePath } from "@/lib/utils";

/**
 * Nav-persistent home link — the same backend 3D object used elsewhere
 * (not a personal photo), just a static icon button. The previous
 * expandable profile-card popover was removed per feedback; this is now a
 * plain link, no dropdown state.
 */
export function ProfileAvatar() {
  return (
    <Link
      href="/"
      aria-label="Home"
      className="cursor-target relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
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
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={withBasePath("/objects/backend/parts/central-python-core.png")}
          alt=""
          className="h-full w-full scale-125 object-contain"
        />
      </span>
    </Link>
  );
}
