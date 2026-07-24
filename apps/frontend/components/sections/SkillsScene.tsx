import { FloatingAsset } from "@/components/effects/FloatingAsset";

/**
 * Skills' 3D scene: python-core-cube as the centered hero, Django/DRF/
 * Postgres/Redis as orbiting satellite nodes, data-connector pulsing behind
 * them all — per the ALS asset pack's page mapping, each layer is its own
 * independently animated wrapper (never flattened into one image).
 */
export function SkillsScene({ className = "" }: { className?: string }) {
  return (
    <div className={`als-3d-scene relative ${className}`.trim()}>
      <FloatingAsset
        src="/als-3d/data-connector.webp"
        className="inset-0"
        depth={2}
        motion="connector-pulse"
        duration={4.5}
      />
      <FloatingAsset src="/als-3d/python-core-cube.webp" className="inset-[18%]" depth={3} duration={7} />
      <FloatingAsset
        src="/als-3d/django-node.webp"
        className="left-[0%] top-[6%] h-[32%] w-[32%]"
        depth={4}
        delay={-1}
        duration={5}
      />
      <FloatingAsset
        src="/als-3d/drf-api-node.webp"
        className="right-[0%] top-[8%] h-[30%] w-[30%]"
        depth={4}
        delay={-2.6}
        duration={5.6}
      />
      <FloatingAsset
        src="/als-3d/postgresql-stack.webp"
        className="left-[2%] bottom-[4%] h-[32%] w-[32%]"
        depth={4}
        delay={-1.8}
        duration={6.2}
      />
      <FloatingAsset
        src="/als-3d/redis-node.webp"
        className="right-[2%] bottom-[6%] h-[28%] w-[28%]"
        depth={4}
        delay={-3.4}
        duration={5.3}
      />
    </div>
  );
}
