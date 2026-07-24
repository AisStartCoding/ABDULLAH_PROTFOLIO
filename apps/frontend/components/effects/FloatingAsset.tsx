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
import { motion, useReducedMotion } from "framer-motion";
import { type CSSProperties } from "react";
import { withBasePath } from "@/lib/utils";
import "./als-3d.css";

export type FloatingAssetMotion = "float" | "portal-spin" | "connector-pulse" | "particle-drift";

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
  const style = {
    "--depth": depth,
    "--delay": `${delay}s`,
    "--duration": `${duration}s`
  } as CSSProperties;

  const enterX = enterFrom === "left" ? -50 : enterFrom === "right" ? 50 : 0;

  return (
    <motion.div
      className={`als-3d-slot ${className}`.trim()}
      aria-hidden={alt ? undefined : true}
      initial={prefersReducedMotion ? false : { opacity: 0, x: enterX, scale: 0.7 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.7, delay: enterDelay, ease: [0.22, 1, 0.36, 1] }}
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
