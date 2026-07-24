"use client";

// Replaces the old corner-cycling floating icons: a controlled showcase of
// the site's 3D objects, one (occasionally a compatible pair) active at a
// time, cycling through a deterministic sequence. Never mounts more than
// two objects, never blurs/washes them out while active, and stays behind
// interactive hero content (pointer-events: none, lower z-index).
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  getHomeObject,
  objectTiming,
  PAIR_WITH,
  SHOWCASE_SEQUENCE,
  ZONE_CLASSES,
  type ObjectSize
} from "@/lib/homeObjectShowcase";
import { withBasePath } from "@/lib/utils";

const SIZE_CLASSES: Record<ObjectSize, string> = {
  small: "w-28 sm:w-36",
  medium: "w-44 sm:w-60",
  large: "w-64 sm:w-[24rem]"
};

function usePageVisible() {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const onVisibility = () => setVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);
  return visible;
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(max-width: 767px)");
    setIsMobile(query.matches);
    const update = () => setIsMobile(query.matches);
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return isMobile;
}

export function HomeObjectShowcase() {
  const reducedMotion = useReducedMotion();
  const pageVisible = usePageVisible();
  const isMobile = useIsMobile();

  const [primaryId, setPrimaryId] = useState<string | null>(null);
  const [secondaryId, setSecondaryId] = useState<string | null>(null);

  const indexRef = useRef(0);
  const reverseRef = useRef(false);
  const timeoutsRef = useRef<number[]>([]);

  useEffect(() => {
    const clearTimers = () => {
      timeoutsRef.current.forEach((t) => window.clearTimeout(t));
      timeoutsRef.current = [];
    };
    const schedule = (fn: () => void, ms: number) => {
      const id = window.setTimeout(fn, ms);
      timeoutsRef.current.push(id);
    };

    // Reduced motion: one static supporting object, no scheduler/cycling.
    if (reducedMotion) {
      setPrimaryId("devops");
      setSecondaryId(null);
      return () => clearTimers();
    }

    if (!pageVisible) {
      clearTimers();
      return;
    }

    let cancelled = false;

    const runStep = () => {
      if (cancelled) return;
      const sequence = reverseRef.current ? [...SHOWCASE_SEQUENCE].reverse() : SHOWCASE_SEQUENCE;
      const id = sequence[indexRef.current % sequence.length];
      const obj = getHomeObject(id);
      if (!obj) return;

      const pairId = PAIR_WITH[id];
      const pairObj = pairId ? getHomeObject(pairId) : null;
      const canPair = pairObj && !isMobile && !(obj.size === "large" && pairObj.size === "large");

      setPrimaryId(id);
      setSecondaryId(canPair ? pairId : null);

      const holdMs = obj.holdSeconds * 1000;

      schedule(() => {
        setPrimaryId(null);
        setSecondaryId(null);
        schedule(() => {
          indexRef.current += 1;
          if (indexRef.current % sequence.length === 0) {
            reverseRef.current = !reverseRef.current;
          }
          runStep();
        }, objectTiming.gapBetweenObjects * 1000);
      }, objectTiming.enterDuration * 1000 + holdMs);
    };

    schedule(runStep, objectTiming.startDelay * 1000);

    return () => {
      cancelled = true;
      clearTimers();
    };
  }, [reducedMotion, pageVisible, isMobile]);

  const renderObject = (id: string | null, isPrimary: boolean) => {
    if (!id) return null;
    const obj = getHomeObject(id);
    if (!obj) return null;
    if (isMobile && !obj.mobileEnabled) return null;

    const enterX = isPrimary ? 40 : -30;

    return (
      <motion.div
        key={id}
        aria-hidden
        className={`absolute ${ZONE_CLASSES[obj.zone]} ${SIZE_CLASSES[obj.size]} ${
          obj.zone === "behind-character" ? "z-[5]" : "z-[6]"
        } pointer-events-none`}
        style={{ aspectRatio: obj.aspect }}
        initial={reducedMotion ? false : { opacity: 0, scale: 0.86, x: enterX }}
        animate={
          reducedMotion
            ? { opacity: 1, scale: 1, x: 0 }
            : { opacity: 1, scale: 1, x: 0, y: [0, -10, 0] }
        }
        exit={reducedMotion ? undefined : { opacity: 0, scale: 0.92, x: enterX }}
        transition={
          reducedMotion
            ? { duration: 0.6 }
            : {
                opacity: { duration: objectTiming.enterDuration },
                scale: { duration: objectTiming.enterDuration },
                x: { duration: objectTiming.enterDuration },
                y: { duration: obj.holdSeconds, repeat: Infinity, ease: "easeInOut" }
              }
        }
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={withBasePath(obj.src)} alt={obj.alt} className="h-full w-full object-contain" draggable={false} />
      </motion.div>
    );
  };

  return (
    <div className="absolute inset-0 overflow-hidden">
      <AnimatePresence>
        {renderObject(primaryId, true)}
        {renderObject(secondaryId, false)}
      </AnimatePresence>
    </div>
  );
}
