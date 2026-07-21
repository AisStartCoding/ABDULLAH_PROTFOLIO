"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef, type MutableRefObject } from "react";
import { BufferGeometry, Line as ThreeLine, Points as ThreePoints, Vector3 } from "three";

const MAX_METEORS = 2;
const TRAIL_LENGTH = 1.6;
const HIT_PARTICLES = 8;
const HIT_DURATION = 0.45;

// Fixed hit-test target for the "collision" feature: the StackOrbit sun/Core
// sits at world position (0, 0.2, -0.6) (see StackOrbit.tsx's group offset).
// Hit-testing meteors against this single fixed point is simpler and more
// robust than lifting live per-frame planet-node positions up from
// StackOrbit into Meteors (which would need a shared ref/context per node
// just for a rare cosmetic effect) — it still reads as a genuine "collision"
// since the core is the visual focal point of the scene.
const CORE_POSITION = new Vector3(0, 0.2, -0.6);
const HIT_RADIUS = 0.55;

type MeteorState = {
  active: boolean;
  elapsed: number;
  duration: number;
  nextSpawnAt: number;
  start: Vector3;
  dir: Vector3;
  color: string;
  willCollide: boolean;
  collided: boolean;
};

type HitEffectState = {
  active: boolean;
  elapsed: number;
  position: Vector3;
};

const meteorColors = ["#e2e8f0", "#bae6fd", "#d9f99d"];

function randomRange(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function spawnMeteor(state: MeteorState, elapsedTime: number, reduced: boolean) {
  // start somewhere off to one side/top, aim diagonally across the scene
  const startX = randomRange(-7, -3) * (Math.random() < 0.5 ? 1 : -1);
  const startY = randomRange(3, 5.5);
  const startZ = randomRange(-6, 2);
  state.start.set(startX, startY, startZ);

  // rare (~1 in 5 spawns), and skipped entirely under reduced motion: bias the
  // trajectory to actually pass near the core so a "collision" can occur.
  state.willCollide = !reduced && Math.random() < 0.2;
  state.collided = false;

  if (state.willCollide) {
    state.dir
      .set(
        CORE_POSITION.x - startX + randomRange(-0.3, 0.3),
        CORE_POSITION.y - startY + randomRange(-0.3, 0.3),
        CORE_POSITION.z - startZ + randomRange(-0.3, 0.3)
      )
      .normalize();
  } else {
    const dirX = randomRange(0.6, 1) * (startX > 0 ? -1 : 1);
    const dirY = -randomRange(0.5, 0.9);
    const dirZ = randomRange(-0.3, 0.3);
    state.dir.set(dirX, dirY, dirZ).normalize();
  }

  state.duration = randomRange(1.1, 1.9) * (reduced ? 1.6 : 1);
  state.elapsed = 0;
  state.active = true;
  state.color = meteorColors[Math.floor(Math.random() * meteorColors.length)];

  // schedule the following meteor well after this one finishes, sparse by design
  const gap = reduced ? randomRange(14, 24) : randomRange(4.5, 10);
  state.nextSpawnAt = elapsedTime + state.duration + gap;
}

function Meteor({
  reduced,
  initialDelay,
  hitEffect,
  shakeRef
}: {
  reduced: boolean;
  initialDelay: number;
  hitEffect: MutableRefObject<HitEffectState>;
  shakeRef: MutableRefObject<number>;
}) {
  const line = useRef<ThreeLine>(null);

  const meteorState = useMemo<MeteorState>(
    () => ({
      active: false,
      elapsed: 0,
      duration: 1.4,
      nextSpawnAt: initialDelay,
      start: new Vector3(),
      dir: new Vector3(1, -1, 0),
      color: meteorColors[0],
      willCollide: false,
      collided: false
    }),
    [initialDelay]
  );

  const head = useMemo(() => new Vector3(), []);
  const tail = useMemo(() => new Vector3(), []);
  const lastElapsed = useRef<number | null>(null);

  useFrame((state) => {
    if (!line.current) return;
    const t = state.clock.elapsedTime;
    const delta = lastElapsed.current === null ? 0 : t - lastElapsed.current;
    lastElapsed.current = t;

    if (!meteorState.active) {
      if (t >= meteorState.nextSpawnAt) {
        spawnMeteor(meteorState, t, reduced);
      } else {
        // parked off-screen, invisible, no draw cost beyond a hidden line
        const material = line.current.material as { opacity?: number };
        if (material) material.opacity = 0;
        return;
      }
    }

    meteorState.elapsed += delta;
    const progress = meteorState.elapsed / meteorState.duration;

    if (progress >= 1) {
      meteorState.active = false;
      const material = line.current.material as { opacity?: number };
      if (material) material.opacity = 0;
      return;
    }

    const travel = progress * 9;
    head.copy(meteorState.start).addScaledVector(meteorState.dir, travel);
    tail.copy(head).addScaledVector(meteorState.dir, -TRAIL_LENGTH);

    // rare "collision" check against the fixed core position
    if (meteorState.willCollide && !meteorState.collided) {
      const distance = head.distanceTo(CORE_POSITION);
      if (distance < HIT_RADIUS) {
        meteorState.collided = true;
        // cut the flight short so the trail fades out right at the impact
        meteorState.duration = meteorState.elapsed + 0.15;
        hitEffect.current.active = true;
        hitEffect.current.elapsed = 0;
        hitEffect.current.position.copy(CORE_POSITION);
        shakeRef.current = reduced ? 0.15 : 1;
      }
    }

    const positions = line.current.geometry.attributes.position;
    if (positions) {
      positions.setXYZ(0, tail.x, tail.y, tail.z);
      positions.setXYZ(1, head.x, head.y, head.z);
      positions.needsUpdate = true;
    }

    // fade in for the first 15%, hold, fade out for the last 25%
    let fade = 1;
    if (progress < 0.15) fade = progress / 0.15;
    else if (progress > 0.75) fade = Math.max(0, (1 - progress) / 0.25);

    const material = line.current.material as { opacity?: number; color?: { set: (c: string) => void } };
    if (material) {
      material.opacity = fade * 0.85;
      material.color?.set(meteorState.color);
    }
  });

  return (
    // @ts-expect-error - line is a valid three.js primitive via reconciler
    <line ref={line}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={2} array={new Float32Array(6)} itemSize={3} />
      </bufferGeometry>
      <lineBasicMaterial color="#e2e8f0" transparent opacity={0} />
    </line>
  );
}

// One-shot, self-cleaning particle burst rendered at the collision point:
// a handful of points that scale/fade out over ~300-500ms then go inert.
// Shared across meteors (rare event, one slot is enough) via the hitEffect ref.
function HitEffect({ hitEffect, reduced }: { hitEffect: MutableRefObject<HitEffectState>; reduced: boolean }) {
  const points = useRef<ThreePoints>(null);

  const offsets = useMemo(() => {
    const arr: Vector3[] = [];
    for (let i = 0; i < HIT_PARTICLES; i += 1) {
      const angle = (i / HIT_PARTICLES) * Math.PI * 2;
      const tilt = ((i % 3) - 1) * 0.4;
      arr.push(new Vector3(Math.cos(angle), Math.sin(angle) * 0.6 + tilt, Math.sin(angle) * 0.4));
    }
    return arr;
  }, []);

  const scratch = useMemo(() => new Vector3(), []);

  useFrame((state, delta) => {
    if (!points.current) return;
    const geometry = points.current.geometry as BufferGeometry;
    const positions = geometry.attributes.position;
    const material = points.current.material as { opacity?: number; size?: number };
    if (!hitEffect.current.active) {
      if (material) material.opacity = 0;
      return;
    }

    const motion = reduced ? 0.5 : 1;
    hitEffect.current.elapsed += delta;
    const progress = hitEffect.current.elapsed / HIT_DURATION;

    if (progress >= 1) {
      hitEffect.current.active = false;
      if (material) material.opacity = 0;
      return;
    }

    const spread = progress * 0.9 * motion;
    if (positions) {
      for (let i = 0; i < HIT_PARTICLES; i += 1) {
        scratch
          .copy(hitEffect.current.position)
          .addScaledVector(offsets[i], spread);
        positions.setXYZ(i, scratch.x, scratch.y, scratch.z);
      }
      positions.needsUpdate = true;
    }

    if (material) {
      material.opacity = Math.max(0, 1 - progress);
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={HIT_PARTICLES}
          array={new Float32Array(HIT_PARTICLES * 3)}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial color="#f8fafc" size={0.09} transparent opacity={0} sizeAttenuation depthWrite={false} />
    </points>
  );
}

export function Meteors({ reduced, shakeRef }: { reduced: boolean; shakeRef: MutableRefObject<number> }) {
  const hitEffect = useRef<HitEffectState>({ active: false, elapsed: 0, position: new Vector3() });

  if (reduced) {
    // rare and slow under reduced motion, but not entirely absent
    return (
      <>
        <Meteor reduced key="meteor-reduced" initialDelay={8} hitEffect={hitEffect} shakeRef={shakeRef} />
        <HitEffect hitEffect={hitEffect} reduced={reduced} />
      </>
    );
  }

  return (
    <>
      {Array.from({ length: MAX_METEORS }).map((_, index) => (
        <Meteor
          key={`meteor-${index}`}
          reduced={reduced}
          initialDelay={randomRange(1, 6) + index * 3}
          hitEffect={hitEffect}
          shakeRef={shakeRef}
        />
      ))}
      <HitEffect hitEffect={hitEffect} reduced={reduced} />
    </>
  );
}
