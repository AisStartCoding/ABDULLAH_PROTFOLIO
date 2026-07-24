"use client";

// Vertical slice of the requested scroll-driven navigation system: once a
// page's own scene reports it has reached its completed boundary (via
// `enabledRef`), one more deliberate scroll/swipe in `direction` navigates
// to `href`. Wheel/touch deltas are accumulated past a threshold rather than
// reacting to a single event, so a single trackpad "flick" (which fires many
// small wheel events) can't fire multiple navigations, and reversing
// direction resets the accumulator instead of triggering anything.
//
// Deliberately NOT wired up under prefers-reduced-motion — per spec, reduced
// motion means Previous/Next buttons and normal links are the only way to
// change routes, wheel/touch/keyboard auto-navigation is disabled entirely.
import { useRouter } from "next/navigation";
import { type RefObject, useEffect, useRef } from "react";

export type ScrollAdvanceParams = {
  enabledRef: RefObject<boolean>;
  href: string | null;
  direction?: 1 | -1;
  wheelThreshold?: number;
  touchThreshold?: number;
  cooldownMs?: number;
};

function isFormFieldActive() {
  const el = document.activeElement as HTMLElement | null;
  if (!el) return false;
  const tag = el.tagName.toLowerCase();
  return tag === "input" || tag === "textarea" || tag === "select" || el.isContentEditable;
}

function isDialogOpen() {
  return !!document.querySelector('[role="dialog"][data-state="open"]');
}

export function useScrollAdvance({
  enabledRef,
  href,
  direction = 1,
  wheelThreshold = 90,
  touchThreshold = 55,
  cooldownMs = 700
}: ScrollAdvanceParams) {
  const router = useRouter();
  const accumRef = useRef(0);
  const lockRef = useRef(false);
  const touchStartYRef = useRef<number | null>(null);

  useEffect(() => {
    if (!href) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const navigate = () => {
      if (lockRef.current) return;
      lockRef.current = true;
      accumRef.current = 0;
      router.push(href);
      window.setTimeout(() => {
        lockRef.current = false;
      }, cooldownMs);
    };

    const tryAdvance = (rawDelta: number, threshold: number) => {
      if (!enabledRef.current || lockRef.current || isFormFieldActive() || isDialogOpen()) return;
      const delta = rawDelta * direction;
      if (delta <= 0) {
        accumRef.current = 0;
        return;
      }
      accumRef.current += delta;
      if (accumRef.current >= threshold) navigate();
    };

    const onWheel = (e: WheelEvent) => tryAdvance(e.deltaY, wheelThreshold);

    const onTouchStart = (e: TouchEvent) => {
      touchStartYRef.current = e.touches[0]?.clientY ?? null;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (touchStartYRef.current === null) return;
      const currentY = e.touches[0]?.clientY ?? touchStartYRef.current;
      tryAdvance(touchStartYRef.current - currentY, touchThreshold);
    };
    const onTouchEnd = () => {
      touchStartYRef.current = null;
      accumRef.current = 0;
    };

    // A discrete key press doesn't need threshold accumulation — it's
    // already a single deliberate gesture. This also gives a guaranteed,
    // deterministic way to navigate that doesn't depend on wheel-event
    // quirks (trackpad inertia, OS-level rubber-banding, etc.).
    const onKeyDown = (e: KeyboardEvent) => {
      if (isFormFieldActive() || isDialogOpen() || !enabledRef.current || lockRef.current) return;
      const isForwardKey = e.key === "ArrowDown" || e.key === "PageDown";
      const isBackwardKey = e.key === "ArrowUp" || e.key === "PageUp";
      if ((direction === 1 && isForwardKey) || (direction === -1 && isBackwardKey)) {
        e.preventDefault();
        navigate();
      }
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [enabledRef, href, direction, wheelThreshold, touchThreshold, cooldownMs, router]);
}
