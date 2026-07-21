"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

// Short, rhetorical, DevOps/backend-engineer-voiced questions — ambient detail,
// not a headline. Cycles one at a time, crossfading in the background HUD.
const questions = [
  "What breaks first at 10x traffic?",
  "Have you automated your rollback?",
  "Is your CI/CD pipeline boring yet?",
  "Zero-downtime — every time?",
  "Who's watching your servers at 3am?",
  "Does your staging actually match prod?",
  "What happens when the queue backs up?",
  "Could you redeploy this in under a minute?",
  "Is that secret really out of git history?",
  "How fast does your healthcheck catch a bad deploy?"
];

export function QuestionHud({ reduced }: { reduced: boolean }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalMs = reduced ? 9000 : 5500;
    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % questions.length);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [reduced]);

  return (
    <div className="pointer-events-none absolute bottom-5 left-4 z-10 max-w-[min(80vw,20rem)] sm:bottom-8 sm:left-8">
      <div className="rounded-md border border-slate-500/20 bg-slate-950/40 px-3 py-2 backdrop-blur-sm">
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: -4 }}
            transition={{ duration: reduced ? 0.15 : 0.6, ease: "easeInOut" }}
            className="select-none font-mono text-[11px] leading-relaxed tracking-tight text-slate-300/70 sm:text-xs"
          >
            {questions[index]}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
