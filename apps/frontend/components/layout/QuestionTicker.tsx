"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

// Short, rhetorical, full-stack/DevOps-voiced questions — cycles one at a
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
  "How fast does your healthcheck catch a bad deploy?",
  "Does your UI stay responsive under load?",
  "Is that API contract actually typed end-to-end?"
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
    <div className="flex min-w-0">
      <motion.div
        key={pulseKey}
        initial={{ boxShadow: "0 0 0px rgba(34,197,94,0)" }}
        animate={
          reduced
            ? { boxShadow: "0 0 14px rgba(34,197,94,0.35)" }
            : { boxShadow: ["0 0 0px rgba(34,197,94,0)", "0 0 22px rgba(34,197,94,0.55)", "0 0 10px rgba(34,197,94,0.25)"] }
        }
        transition={{ duration: 1.1, ease: "easeOut" }}
        className="flex max-w-[52vw] items-center gap-1.5 rounded-full border border-green-500/40 bg-green-950/90 px-2.5 py-1.5 backdrop-blur-sm sm:max-w-[16rem] sm:gap-2 sm:px-4 md:max-w-[20rem]"
      >
        <span className="mt-0.5 h-1.5 w-1.5 shrink-0 animate-pulse self-start rounded-full bg-green-400" />
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: -4 }}
            transition={{ duration: reduced ? 0.15 : 0.4, ease: "easeInOut" }}
            className="min-w-0 select-none whitespace-normal break-words font-mono text-[10px] font-medium leading-snug tracking-tight text-green-300 sm:text-xs"
          >
            {questions[index]}
          </motion.p>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
