"use client";

// Adapted from the ALS 3D asset pack's example component: each object is an
// independent absolutely-positioned layer animated via its own wrapper
// (transform/opacity only), never flattened into one background image.
//
// Two nested elements, not one — the entrance animation (framer-motion) and
// the continuous CSS float/spin/pulse animation both need to drive
// `transform`, and having both target the same element fights over it.
// The outer element owns positioning + the one-time entrance transform; the
// inner element owns the never-ending CSS keyframe motion.
import { useAnimationControls, motion, useReducedMotion, type TargetAndTransition } from "framer-motion";
import { useEffect, type CSSProperties } from "react";
import { withBasePath } from "@/lib/utils";
import "./als-3d.css";

export type FloatingAssetMotion = "float" | "portal-spin" | "connector-pulse" | "particle-drift";

// Each motion type gets its own tap/touch reaction — a distinct "shake" that
// matches the flavor of its continuous idle animation — so tapping around
// different objects on a page doesn't feel like the same canned wiggle.
const TAP_REACTIONS: Record<FloatingAssetMotion, TargetAndTransition> = {
  float: { rotate: [0, -8, 6, -4, 2, 0], y: [0, -8, 4, -2, 0], transition: { duration: 0.65, ease: "easeInOut" } },
  "portal-spin": {
    rotate: [0, 22, -14, 8, 0],
    scale: [1, 1.08, 0.95, 1.03, 1],
    transition: { duration: 0.7, ease: "easeInOut" }
  },
  "connector-pulse": {
    scale: [1, 1.18, 0.9, 1.06, 1],
    opacity: [1, 0.65, 1],
    transition: { duration: 0.55, ease: "easeInOut" }
  },
  "particle-drift": {
    x: [0, 10, -9, 6, -3, 0],
    y: [0, -9, 7, -4, 0],
    transition: { duration: 0.7, ease: "easeInOut" }
  }
};

const REST_STATE = { opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 };

export type FloatingAssetProps = {
  src: string;
  alt?: string;
  className?: string;
  depth?: number;
  delay?: number;
  duration?: number;
  motion?: FloatingAssetMotion;
  interactive?: boolean;
  /** Entrance direction on first mount — lets a multi-part scene "assemble"
   * with the hero object appearing first and satellites popping in from
   * alternating sides shortly after, instead of everything appearing at once. */
  enterFrom?: "left" | "right" | "fade";
  /** Seconds to wait before this layer's entrance animation starts. */
  enterDelay?: number;
};

export function FloatingAsset({
  src,
  alt = "",
  className = "",
  depth = 1,
  delay = 0,
  duration = 6,
  motion: motionType = "float",
  interactive = false,
  enterFrom = "fade",
  enterDelay = 0
}: FloatingAssetProps) {
  const prefersReducedMotion = useReducedMotion();
  const controls = useAnimationControls();
  const style = {
    "--depth": depth,
    "--delay": `${delay}s`,
    "--duration": `${duration}s`
  } as CSSProperties;

  const enterX = enterFrom === "left" ? -50 : enterFrom === "right" ? 50 : 0;

  // Entrance runs once via controls (instead of a static animate prop) so
  // the same controls object can later drive the tap reaction without the
  // two fighting over the "animate" target.
  useEffect(() => {
    if (prefersReducedMotion) {
      controls.set(REST_STATE);
      return;
    }
    controls.start({
      ...REST_STATE,
      transition: { duration: 0.7, delay: enterDelay, ease: [0.22, 1, 0.36, 1] }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefersReducedMotion]);

  // Tap/click/touch reaction — a quick shake/wave burst on the entrance
  // element (transform only, so it never fights the inner element's
  // continuous CSS float/spin/pulse keyframe animation), then settles back
  // to rest. Ignored when not interactive or under reduced motion.
  const handleTap = () => {
    if (!interactive || prefersReducedMotion) return;
    controls.stop();
    controls.start(TAP_REACTIONS[motionType]).then(() => controls.start({ ...REST_STATE, transition: { duration: 0.3 } }));
  };

  return (
    <motion.div
      className={`als-3d-slot ${className}`.trim()}
      aria-hidden={alt ? undefined : true}
      initial={prefersReducedMotion ? false : { opacity: 0, x: enterX, scale: 0.7 }}
      animate={controls}
      onTap={interactive ? handleTap : undefined}
      whileTap={interactive && !prefersReducedMotion ? { scale: 0.96 } : undefined}
    >
      <div
        className={`als-3d-object als-motion-${motionType} ${interactive ? "is-interactive" : ""}`.trim()}
        style={style}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={withBasePath(src)} alt={alt} draggable={false} />
      </div>
    </motion.div>
  );
}
