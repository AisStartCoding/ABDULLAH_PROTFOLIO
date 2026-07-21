"use client";

import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import {
  Boxes,
  Cloud,
  Code2,
  Database,
  Server,
  ShieldCheck,
  Sparkles,
  type LucideIcon
} from "lucide-react";
import { useMemo, useRef, useState, type MutableRefObject } from "react";
import { DoubleSide, Group, Mesh, Vector3 } from "three";

const orbitPalette = ["#22c55e", "#2563eb", "#7c3aed", "#06b6d4", "#ec4899", "#f59e0b"];

// data-driven icon matching: keyword -> icon, with a graceful fallback for
// any category label the API might send that we don't recognize.
const iconKeywordMap: Array<{ keywords: string[]; icon: LucideIcon }> = [
  { keywords: ["backend", "server", "api"], icon: Server },
  { keywords: ["database", "data", "sql", "storage"], icon: Database },
  { keywords: ["devops", "infra", "cloud", "deploy", "ci", "cd"], icon: Cloud },
  { keywords: ["security", "auth", "shield"], icon: ShieldCheck },
  { keywords: ["frontend", "ui", "integration", "web", "client"], icon: Code2 },
  { keywords: ["container", "orchestration", "kubernetes", "docker"], icon: Boxes }
];

function matchIcon(label: string): LucideIcon {
  const normalized = label.toLowerCase();
  for (const entry of iconKeywordMap) {
    if (entry.keywords.some((keyword) => normalized.includes(keyword))) {
      return entry.icon;
    }
  }
  return Sparkles;
}

type OrbitNodeProps = {
  label: string;
  index: number;
  total: number;
  radius: number;
  scroll: MutableRefObject<number>;
  reduced: boolean;
};

function OrbitNode({ label, index, total, radius, scroll, reduced }: OrbitNodeProps) {
  const mesh = useRef<Mesh>(null);
  const group = useRef<Group>(null);
  const [hovered, setHovered] = useState(false);
  const color = orbitPalette[index % orbitPalette.length];
  const Icon = useMemo(() => matchIcon(label), [label]);

  // stable per-node constants, computed once
  const baseAngle = useMemo(() => (index / total) * Math.PI * 2, [index, total]);
  const speed = useMemo(() => 0.12 + (index % 3) * 0.035, [index]);
  const pulseOffset = useMemo(() => index * 1.15, [index]);
  const tilt = useMemo(() => (index % 2 === 0 ? 0.18 : -0.14), [index]);

  // reused vector, avoid per-frame allocation
  const position = useMemo(() => new Vector3(), []);

  useFrame((state) => {
    if (!group.current || !mesh.current) return;
    const motion = reduced ? 0.25 : 1;
    const t = state.clock.elapsedTime;
    const scrollBoost = 1 + scroll.current * 0.6;
    const angle = baseAngle + t * speed * motion * scrollBoost;
    const r = radius * (1 + scroll.current * 0.12);

    position.set(Math.cos(angle) * r, Math.sin(angle * 0.6 + tilt) * 0.9, Math.sin(angle) * r);
    group.current.position.copy(position);

    const pulse = 0.55 + Math.sin(t * 1.6 + pulseOffset) * 0.25;
    mesh.current.scale.setScalar(hovered ? 1.4 : 1 + pulse * 0.25);
  });

  return (
    <group ref={group}>
      <mesh
        ref={mesh}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[0.16, 24, 24]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered ? 1.4 : 0.85}
        />
      </mesh>
      <Html center distanceFactor={8} occlude={false} zIndexRange={[10, 0]}>
        <span
          className="pointer-events-none flex select-none items-center gap-1.5 whitespace-nowrap rounded-md border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] transition-colors duration-200"
          style={{
            borderColor: hovered ? color : `${color}55`,
            color: hovered ? "#f8fafc" : color,
            background: hovered ? `${color}33` : "rgba(2, 6, 23, 0.55)"
          }}
        >
          <Icon size={11} strokeWidth={2.25} aria-hidden="true" />
          {label}
        </span>
      </Html>
    </group>
  );
}

function OrbitLine({
  index,
  total,
  radius,
  scroll,
  reduced
}: {
  index: number;
  total: number;
  radius: number;
  scroll: MutableRefObject<number>;
  reduced: boolean;
}) {
  const mesh = useRef<Mesh>(null);
  const color = orbitPalette[index % orbitPalette.length];

  const baseAngle = useMemo(() => (index / total) * Math.PI * 2, [index, total]);
  const speed = useMemo(() => 0.12 + (index % 3) * 0.035, [index]);
  const pulseOffset = useMemo(() => index * 1.15, [index]);
  const tilt = useMemo(() => (index % 2 === 0 ? 0.18 : -0.14), [index]);

  const start = useMemo(() => new Vector3(0, 0, 0), []);
  const end = useMemo(() => new Vector3(), []);
  const mid = useMemo(() => new Vector3(), []);

  useFrame((state) => {
    if (!mesh.current) return;
    const motion = reduced ? 0.25 : 1;
    const t = state.clock.elapsedTime;
    const scrollBoost = 1 + scroll.current * 0.6;
    const angle = baseAngle + t * speed * motion * scrollBoost;
    const r = radius * (1 + scroll.current * 0.12);

    end.set(Math.cos(angle) * r, Math.sin(angle * 0.6 + tilt) * 0.9, Math.sin(angle) * r);
    mid.copy(start).lerp(end, 0.5);
    mid.y += 0.25;

    // rebuild the line geometry from the two points each frame (cheap: 3 points)
    const positions = mesh.current.geometry.attributes.position;
    if (positions) {
      positions.setXYZ(0, start.x, start.y, start.z);
      positions.setXYZ(1, mid.x, mid.y, mid.z);
      positions.setXYZ(2, end.x, end.y, end.z);
      positions.needsUpdate = true;
    }

    const material = mesh.current.material as THREELineMaterial;
    const pulse = 0.2 + Math.sin(t * 1.4 + pulseOffset) * 0.16;
    if (material && "opacity" in material) {
      material.opacity = Math.max(0.05, pulse);
    }
  });

  return (
    // @ts-expect-error - line is a valid three.js primitive via reconciler
    <line ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={3} array={new Float32Array(9)} itemSize={3} />
      </bufferGeometry>
      <lineBasicMaterial color={color} transparent opacity={0.3} />
    </line>
  );
}

// minimal local type alias to avoid importing three's LineBasicMaterial type directly
type THREELineMaterial = { opacity?: number };

// visible orbit-path ring for a single node radius, drawn flat-ish like a
// textbook solar-system diagram (slight tilt to match node's vertical drift).
function OrbitRing({ index, radius, scroll }: { index: number; radius: number; scroll: MutableRefObject<number> }) {
  const group = useRef<Group>(null);
  const color = orbitPalette[index % orbitPalette.length];

  useFrame(() => {
    if (!group.current) return;
    const scale = 1 + scroll.current * 0.12;
    group.current.scale.setScalar(scale);
  });

  return (
    <group ref={group} rotation={[Math.PI / 2 - 0.12, 0, 0]}>
      <mesh>
        <ringGeometry args={[radius - 0.01, radius + 0.01, 96]} />
        <meshBasicMaterial color={color} transparent opacity={0.14} side={DoubleSide} />
      </mesh>
    </group>
  );
}

function Core({ reduced }: { reduced: boolean }) {
  const mesh = useRef<Mesh>(null);
  const halo = useRef<Mesh>(null);

  useFrame((state) => {
    const motion = reduced ? 0.3 : 1;
    const t = state.clock.elapsedTime;
    const breathe = 1 + Math.sin(t * 0.9) * 0.06 * motion;
    if (mesh.current) {
      mesh.current.scale.setScalar(breathe);
    }
    if (halo.current) {
      halo.current.scale.setScalar(breathe * 1.05);
    }
  });

  return (
    <group>
      {/* soft corona behind the core, warm-tinted but still on-theme */}
      <mesh ref={halo}>
        <sphereGeometry args={[1.02, 32, 32]} />
        <meshBasicMaterial color="#86efac" transparent opacity={0.08} />
      </mesh>
      <mesh ref={mesh}>
        <sphereGeometry args={[0.78, 48, 48]} />
        <meshStandardMaterial color="#22c55e" emissive="#4ade80" emissiveIntensity={1.15} roughness={0.3} />
      </mesh>
      <pointLight color="#4ade80" intensity={1.6} distance={6} decay={2} />
    </group>
  );
}

export function StackOrbit({
  categories,
  scroll,
  reduced
}: {
  categories: string[];
  scroll: MutableRefObject<number>;
  reduced: boolean;
}) {
  const labels = categories.length > 0 ? categories : ["Backend", "APIs & Database", "DevOps & Infra", "Security", "Frontend Integration"];
  const total = labels.length;
  const radius = 2.1;

  return (
    <group position={[0, 0.2, -0.6]}>
      <Core reduced={reduced} />
      {labels.map((label, index) => (
        <OrbitRing key={`ring-${label}`} index={index} radius={radius} scroll={scroll} />
      ))}
      {labels.map((label, index) => (
        <OrbitLine key={`line-${label}`} index={index} total={total} radius={radius} scroll={scroll} reduced={reduced} />
      ))}
      {labels.map((label, index) => (
        <OrbitNode key={`node-${label}`} label={label} index={index} total={total} radius={radius} scroll={scroll} reduced={reduced} />
      ))}
    </group>
  );
}
