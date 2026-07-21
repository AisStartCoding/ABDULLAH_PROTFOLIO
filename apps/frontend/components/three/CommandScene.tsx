"use client";

import { Stars } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useCallback, useEffect, useRef, useState, type MutableRefObject } from "react";
import { DeepField, galaxyPresets } from "@/components/three/DeepField";
import { Meteors } from "@/components/three/Meteors";
import { StackOrbit } from "@/components/three/StackOrbit";
import { gsap } from "@/lib/gsap";

const REST_ZOOM = 7.1;

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

function useScrollProgress() {
  const progress = useRef(0);

  useEffect(() => {
    const update = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      progress.current = window.scrollY / max;
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return progress;
}

function CameraRig({
  scroll,
  reduced,
  shakeRef,
  zoomRef
}: {
  scroll: MutableRefObject<number>;
  reduced: boolean;
  shakeRef: MutableRefObject<number>;
  zoomRef: MutableRefObject<number>;
}) {
  const { camera, pointer } = useThree();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const motion = reduced ? 0.22 : 1;
    camera.position.x += (pointer.x * 0.45 * motion - camera.position.x) * 0.035;
    camera.position.y += (0.5 + pointer.y * 0.25 * motion + scroll.current * 0.55 - camera.position.y) * 0.035;
    const targetZ = zoomRef.current + Math.sin(t * 0.18) * 0.28 * motion;
    camera.position.z += (targetZ - camera.position.z) * 0.06;
    camera.lookAt(0, 0.15 + scroll.current * 0.45, 0);

    // decaying camera-shake offset, layered on top of the lerped rig position
    // above (added last so it doesn't get smoothed away by the lerp itself).
    // Reduced-motion keeps a tiny hit-flash-only jitter, no real vestibular motion.
    if (shakeRef.current > 0.001) {
      const amount = shakeRef.current * (reduced ? 0.015 : 0.14);
      camera.position.x += (Math.random() - 0.5) * amount;
      camera.position.y += (Math.random() - 0.5) * amount;
      shakeRef.current *= 0.85;
    } else if (shakeRef.current !== 0) {
      shakeRef.current = 0;
    }
  });

  return null;
}

function Scene({
  categories,
  shakeRef,
  zoomRef,
  presetIndex
}: {
  categories: string[];
  shakeRef: MutableRefObject<number>;
  zoomRef: MutableRefObject<number>;
  presetIndex: number;
}) {
  const reduced = useReducedMotion();
  const scroll = useScrollProgress();
  const preset = galaxyPresets[presetIndex % galaxyPresets.length];

  return (
    <>
      <CameraRig scroll={scroll} reduced={reduced} shakeRef={shakeRef} zoomRef={zoomRef} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 5, 4]} intensity={0.55} color="#f8fafc" />
      <pointLight position={[-4, 2.5, 3]} intensity={1.1} color="#22c55e" />
      <pointLight position={[4, -2, 3]} intensity={0.7} color="#8b5cf6" />
      <Stars
        radius={48}
        depth={24}
        count={reduced ? 180 : 650}
        factor={3.2}
        saturation={0.85}
        fade
        speed={reduced ? 0.03 : 0.08}
      />
      <DeepField reduced={reduced} preset={preset} />
      <StackOrbit categories={categories} scroll={scroll} reduced={reduced} />
      <Meteors reduced={reduced} shakeRef={shakeRef} />
    </>
  );
}

function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return { ref, inView };
}

export function CommandScene({ categories = [] }: { categories?: string[] }) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const reduced = useReducedMotion();
  const shakeRef = useRef(0);
  const zoomRef = useRef(REST_ZOOM);
  const [presetIndex, setPresetIndex] = useState(0);
  const jumpTween = useRef<gsap.core.Timeline | null>(null);

  // Double-click "jump to another galaxy": a fast dolly-zoom in, swap the
  // DeepField color/layout preset partway through, then dolly back out.
  // Reduced-motion gets an instant palette swap instead, no camera motion.
  const handleDoubleClick = useCallback(() => {
    if (reduced) {
      setPresetIndex((prev) => (prev + 1 + Math.floor(Math.random() * (galaxyPresets.length - 1))) % galaxyPresets.length);
      return;
    }

    jumpTween.current?.kill();
    const proxy = { z: zoomRef.current };
    jumpTween.current = gsap
      .timeline()
      .to(proxy, {
        z: 2.6,
        duration: 0.35,
        ease: "power2.in",
        onUpdate: () => {
          zoomRef.current = proxy.z;
        }
      })
      .call(() => {
        setPresetIndex((prev) => (prev + 1 + Math.floor(Math.random() * (galaxyPresets.length - 1))) % galaxyPresets.length);
      })
      .to(proxy, {
        z: REST_ZOOM,
        duration: 0.55,
        ease: "power2.out",
        onUpdate: () => {
          zoomRef.current = proxy.z;
        }
      });
  }, [reduced]);

  useEffect(() => {
    return () => {
      jumpTween.current?.kill();
    };
  }, []);

  return (
    <div ref={ref} className="pointer-events-none fixed inset-0 z-0 opacity-70">
      <Canvas
        className="pointer-events-auto"
        onDoubleClick={handleDoubleClick}
        camera={{ position: [0, 0.5, REST_ZOOM], fov: 48 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        frameloop={inView ? "always" : "never"}
      >
        <Suspense fallback={null}>
          <Scene categories={categories} shakeRef={shakeRef} zoomRef={zoomRef} presetIndex={presetIndex} />
        </Suspense>
      </Canvas>
      <div className="pointer-events-none absolute inset-0 bg-slate-950/65 backdrop-blur-[1px]" />
    </div>
  );
}
