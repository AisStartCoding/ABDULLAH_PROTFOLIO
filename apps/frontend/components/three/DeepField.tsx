"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { CanvasTexture, Group, Mesh } from "three";

// A handful of large, soft, blurred distant "galaxy/nebula" blobs, placed far
// behind the orbit scene. Each is one textured plane (cheap: no per-frame
// texture regeneration, texture built once via useMemo from a runtime-drawn
// radial gradient canvas — no external image assets).

export type GalaxyPreset = {
  name: string;
  colors: string[]; // radial gradient stops, inner -> outer, per blob (cycled)
  positions: Array<[number, number, number]>;
  scales: number[];
};

// A few presets within the site's established green/blue/violet theme family,
// plus one warm-accent variant, so double-click "jump to another galaxy" can
// swap the whole field's palette/layout without loading any new assets.
export const galaxyPresets: GalaxyPreset[] = [
  {
    name: "verdant",
    colors: ["#22c55e", "#0ea5e9", "#7c3aed", "#4ade80"],
    positions: [
      [-9, 3, -18],
      [8, -2.5, -22],
      [-5, -4, -26],
      [6, 4, -16],
      [0, 1, -30],
      [-11, -1, -24]
    ],
    scales: [7, 6, 8.5, 5.5, 9, 6.5]
  },
  {
    name: "azure",
    colors: ["#2563eb", "#06b6d4", "#22c55e", "#0ea5e9"],
    positions: [
      [7, 3.5, -20],
      [-8, -3, -24],
      [4, -4.5, -17],
      [-6, 4, -28],
      [10, 0, -26],
      [-2, -2, -32],
      [3, 5, -22]
    ],
    scales: [6.5, 8, 5.5, 7.5, 6, 9, 5]
  },
  {
    name: "violet",
    colors: ["#7c3aed", "#8b5cf6", "#ec4899", "#2563eb"],
    positions: [
      [-7, -3.5, -19],
      [9, 2.5, -25],
      [-4, 4.5, -22],
      [5, -2, -30],
      [0, -4, -18],
      [-10, 1.5, -27]
    ],
    scales: [7.5, 6, 8, 5.5, 6.5, 9]
  },
  {
    name: "ember",
    colors: ["#f59e0b", "#ec4899", "#7c3aed", "#22c55e"],
    positions: [
      [6, -3, -21],
      [-8, 2, -26],
      [3, 4.5, -17],
      [-4, -4.5, -29],
      [10, 1, -23],
      [-2, 3, -31],
      [-11, -2, -19]
    ],
    scales: [6, 7, 5.5, 8.5, 6.5, 7.5, 5]
  }
];

function buildBlobTexture(hex: string) {
  const size = 128;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  gradient.addColorStop(0, `${hex}ff`);
  gradient.addColorStop(0.35, `${hex}aa`);
  gradient.addColorStop(0.7, `${hex}33`);
  gradient.addColorStop(1, `${hex}00`);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  const texture = new CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

function Blob({
  color,
  position,
  scale,
  index,
  reduced
}: {
  color: string;
  position: [number, number, number];
  scale: number;
  index: number;
  reduced: boolean;
}) {
  const mesh = useRef<Mesh>(null);
  const texture = useMemo(() => buildBlobTexture(color), [color]);
  const spin = useMemo(() => 0.01 + (index % 3) * 0.006, [index]);
  const driftOffset = useMemo(() => index * 1.7, [index]);
  const baseOpacity = useMemo(() => 0.08 + (index % 3) * 0.03, [index]);

  useFrame((state) => {
    if (!mesh.current) return;
    const motion = reduced ? 0.2 : 1;
    const t = state.clock.elapsedTime;
    mesh.current.rotation.z += spin * motion * 0.016;
    mesh.current.position.y = position[1] + Math.sin(t * 0.05 + driftOffset) * 0.4 * motion;
  });

  if (!texture) return null;

  return (
    <mesh ref={mesh} position={position}>
      <planeGeometry args={[scale, scale]} />
      <meshBasicMaterial map={texture} transparent opacity={baseOpacity} depthWrite={false} />
    </mesh>
  );
}

export function DeepField({ reduced, preset }: { reduced: boolean; preset: GalaxyPreset }) {
  const group = useRef<Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    const motion = reduced ? 0.15 : 1;
    group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.01) * 0.05 * motion;
  });

  return (
    <group ref={group}>
      {preset.positions.map((position, index) => (
        <Blob
          key={`${preset.name}-blob-${index}`}
          color={preset.colors[index % preset.colors.length]}
          position={position}
          scale={preset.scales[index % preset.scales.length]}
          index={index}
          reduced={reduced}
        />
      ))}
    </group>
  );
}
