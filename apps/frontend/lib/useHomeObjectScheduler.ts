"use client";

// The single scheduler driving Home's 3D object showcase — shared by
// HomeObjectShowcase (the corner-zone objects) and Portrait (which needs to
// know when "devops" is active so it can render it directly inside its own
// container, exactly behind the character, instead of guessing at that
// position from a separate absolutely-positioned sibling).
import { useCallback, useEffect, useRef, useState } from "react";
import { getHomeObject, objectTiming, PAIR_WITH, SHOWCASE_SEQUENCE } from "@/lib/homeObjectShowcase";

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

export function useHomeObjectScheduler(reducedMotion: boolean) {
  const pageVisible = usePageVisible();
  const isMobile = useIsMobile();

  const [primaryId, setPrimaryId] = useState<string | null>(null);
  const [secondaryId, setSecondaryId] = useState<string | null>(null);

  const indexRef = useRef(0);
  const reverseRef = useRef(false);
  const timeoutsRef = useRef<number[]>([]);
  const runStepRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const clearTimers = () => {
      timeoutsRef.current.forEach((t) => window.clearTimeout(t));
      timeoutsRef.current = [];
    };
    const schedule = (fn: () => void, ms: number) => {
      const id = window.setTimeout(fn, ms);
      timeoutsRef.current.push(id);
    };

    // Reduced motion: one static supporting object, no scheduler/cycling —
    // tapping the background doesn't advance anything in this mode either.
    if (reducedMotion) {
      setPrimaryId("devops");
      setSecondaryId(null);
      runStepRef.current = null;
      return () => clearTimers();
    }

    if (!pageVisible) {
      clearTimers();
      return;
    }

    let cancelled = false;

    const advanceToNext = () => {
      indexRef.current += 1;
      const sequence = reverseRef.current ? [...SHOWCASE_SEQUENCE].reverse() : SHOWCASE_SEQUENCE;
      if (indexRef.current % sequence.length === 0) {
        reverseRef.current = !reverseRef.current;
      }
      runStep();
    };

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
        schedule(advanceToNext, objectTiming.gapBetweenObjects * 1000);
      }, objectTiming.enterDuration * 1000 + holdMs);
    };

    // Exposed so a tap on empty background space can skip straight to the
    // next scene instead of waiting out the current hold — cancels whatever
    // timers were pending first so nothing double-fires.
    runStepRef.current = () => {
      clearTimers();
      setPrimaryId(null);
      setSecondaryId(null);
      schedule(advanceToNext, objectTiming.gapBetweenObjects * 1000);
    };

    schedule(runStep, objectTiming.startDelay * 1000);

    return () => {
      cancelled = true;
      clearTimers();
    };
  }, [reducedMotion, pageVisible, isMobile]);

  const advance = useCallback(() => {
    runStepRef.current?.();
  }, []);

  return { primaryId, secondaryId, isMobile, advance };
}
