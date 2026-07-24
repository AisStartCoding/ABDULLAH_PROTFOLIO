"use client";

import { Tilt3D } from "@/components/ui/Tilt3D";
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
 * float via the site's existing CSS keyframes, layered with a cursor-driven
 * 3D tilt (same technique as the Home portrait) so it reads as a real 3D
 * object reacting to the viewport, not a flat floating image. Both respect
 * prefers-reduced-motion.
 */
export function LayeredObject({ family, className = "" }: { family: keyof typeof OBJECT_MANIFEST; className?: string }) {
  const data = OBJECT_MANIFEST[family];
  const aspect = ASPECT[family] ?? 16 / 9;

  return (
    <div className={`relative select-none ${className}`} style={{ aspectRatio: aspect }}>
      <Tilt3D maxTilt={7} globalTilt className="h-full w-full">
        <div className="motion-float-slow pointer-events-none h-full w-full">
          <div aria-hidden className="absolute inset-0 -z-10 scale-90 rounded-full bg-electric-blue/15 blur-3xl" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={withBasePath(data.fallback)} alt="" className="h-full w-full object-contain" draggable={false} />
        </div>
      </Tilt3D>
    </div>
  );
}
