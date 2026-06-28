"use client";

import { Float, Line, Stars } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useMemo, useRef } from "react";
import type { Mesh } from "three";

function ServerCore() {
  const mesh = useRef<Mesh>(null);
  useFrame((_, delta) => {
    if (mesh.current) {
      mesh.current.rotation.x += delta * 0.18;
      mesh.current.rotation.y += delta * 0.28;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.35} floatIntensity={1.5}>
      <mesh ref={mesh} position={[0, 0.4, 0]}>
        <boxGeometry args={[1.8, 1.8, 1.8]} />
        <meshStandardMaterial color="#0f172a" emissive="#0891b2" emissiveIntensity={0.55} metalness={0.65} roughness={0.28} />
      </mesh>
    </Float>
  );
}

function Network() {
  const points = useMemo(
    () => [
      [-3, -1, -1],
      [-1.5, 1.2, 0.3],
      [0, 0.2, 0],
      [1.6, 1, -0.4],
      [3, -0.8, 0.5]
    ] as [number, number, number][],
    []
  );

  return (
    <group>
      <Line points={points} color="#22d3ee" lineWidth={1.4} transparent opacity={0.65} />
      {points.map((point) => (
        <mesh key={point.join(":")} position={point}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#67e8f9" emissive="#22d3ee" emissiveIntensity={1.2} />
        </mesh>
      ))}
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[3, 4, 4]} intensity={2} color="#22d3ee" />
      <pointLight position={[-4, -2, 3]} intensity={1.4} color="#10b981" />
      <Stars radius={50} depth={30} count={900} factor={3} fade speed={0.35} />
      <ServerCore />
      <Network />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.2, 0]}>
        <planeGeometry args={[16, 16, 24, 24]} />
        <meshBasicMaterial color="#0e7490" wireframe transparent opacity={0.16} />
      </mesh>
    </>
  );
}

export function CommandScene() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 opacity-70">
      <Canvas camera={{ position: [0, 0.4, 6], fov: 55 }} dpr={[1, 1.5]} gl={{ antialias: false, powerPreference: "high-performance" }}>
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
