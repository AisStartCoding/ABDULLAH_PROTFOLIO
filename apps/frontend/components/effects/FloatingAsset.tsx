"use client";

// Adapted from the ALS 3D asset pack's example component: each object is an
// independent absolutely-positioned layer animated via its own wrapper
// (transform/opacity only), never flattened into one background image.
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
};

export function FloatingAsset({
  src,
  alt = "",
  className = "",
  depth = 1,
  delay = 0,
  duration = 6,
  motion = "float",
  interactive = false
}: FloatingAssetProps) {
  const style = {
    "--depth": depth,
    "--delay": `${delay}s`,
    "--duration": `${duration}s`
  } as CSSProperties;

  return (
    <div
      className={`als-3d-object als-motion-${motion} ${interactive ? "is-interactive" : ""} ${className}`.trim()}
      style={style}
      aria-hidden={alt ? undefined : true}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={withBasePath(src)} alt={alt} draggable={false} />
    </div>
  );
}
