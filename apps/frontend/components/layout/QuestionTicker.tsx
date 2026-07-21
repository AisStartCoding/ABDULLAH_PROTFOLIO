"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

// Short, rhetorical, DevOps/backend-engineer-voiced questions — cycles one at a
// time in the navbar so it stays visible and highlighted on every page/scroll
// position, instead of being buried behind section content.
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

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return reduced;
}

export function QuestionTicker() {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [pulseKey, setPulseKey] = useState(0);

  useEffect(() => {
    const intervalMs = reduced ? 9000 : 5500;
    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % questions.length);
      setPulseKey((prev) => prev + 1);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [reduced]);

  return (
    <div className="hidden flex-1 justify-center md:flex">
      <motion.div
        key={pulseKey}
        initial={{ boxShadow: "0 0 0px rgba(34,197,94,0)" }}
        animate={
          reduced
            ? { boxShadow: "0 0 14px rgba(34,197,94,0.35)" }
            : { boxShadow: ["0 0 0px rgba(34,197,94,0)", "0 0 22px rgba(34,197,94,0.55)", "0 0 10px rgba(34,197,94,0.25)"] }
        }
        transition={{ duration: 1.1, ease: "easeOut" }}
        className="flex max-w-md items-center gap-2 rounded-full border border-green-500/40 bg-green-500/10 px-4 py-1.5"
      >
        <span className="h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-green-400" />
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: -4 }}
            transition={{ duration: reduced ? 0.15 : 0.4, ease: "easeInOut" }}
            className="select-none truncate font-mono text-xs font-medium tracking-tight text-green-300"
          >
            {questions[index]}
          </motion.p>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
