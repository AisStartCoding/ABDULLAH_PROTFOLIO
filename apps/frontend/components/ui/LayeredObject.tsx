"use client";

import { OBJECT_MANIFEST } from "@/lib/object-manifest";
import { withBasePath } from "@/lib/utils";

const ASPECT: Record<string, number> = {
  backend: 1672 / 941,
  workstation: 1672 / 941,
  projects: 1672 / 941,
  devops: 1672 / 941,
  certificate: 1254 / 1254
};

/**
 * Renders a family's single flattened composition (not the individual
 * percent-positioned parts — those didn't line up cleanly across screen
 * sizes and broke the connecting lines between nodes). Motion is a gentle
 * float + slow rotation on the whole image via the site's existing CSS
 * keyframes, which already respect prefers-reduced-motion globally.
 */
export function LayeredObject({ family, className = "" }: { family: keyof typeof OBJECT_MANIFEST; className?: string }) {
  const data = OBJECT_MANIFEST[family];
  const aspect = ASPECT[family] ?? 16 / 9;

  return (
    <div className={`relative pointer-events-none select-none ${className}`} style={{ aspectRatio: aspect }}>
      <div className="motion-float-slow h-full w-full">
        <div aria-hidden className="absolute inset-0 -z-10 scale-90 rounded-full bg-electric-blue/15 blur-3xl" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={withBasePath(data.fallback)} alt="" className="h-full w-full object-contain" draggable={false} />
      </div>
    </div>
  );
}
