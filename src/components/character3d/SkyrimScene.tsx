"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const TIER_LIGHTS: Record<string, { color: string; intensity: number }> = {
  common: { color: "#334466", intensity: 0.3 },
  uncommon: { color: "#22c55e", intensity: 0.6 },
  rare: { color: "#3b82f6", intensity: 0.9 },
  epic: { color: "#a855f7", intensity: 1.3 },
  legendary: { color: "#f59e0b", intensity: 1.8 },
};

interface SkyrimSceneProps {
  tier: string;
}

export function SkyrimScene({ tier }: SkyrimSceneProps) {
  const rimLight = useRef<THREE.PointLight>(null!);
  const { color, intensity } = TIER_LIGHTS[tier] ?? TIER_LIGHTS.common;

  useFrame(({ clock }) => {
    if (rimLight.current) {
      const t = clock.elapsedTime;
      rimLight.current.intensity = intensity + Math.sin(t * 1.8) * intensity * 0.2;
    }
  });

  return (
    <>
      {/* Fog */}
      <fog attach="fog" args={["#0a0a1a", 6, 18]} />

      {/* Ambient — cold dungeon feel */}
      <ambientLight intensity={0.25} color="#2a3a55" />

      {/* Key light — top front */}
      <directionalLight
        position={[1.5, 4, 3]}
        intensity={1.4}
        color="#c8d8f0"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={0.5}
        shadow-camera-far={20}
      />

      {/* Rim light — back left, cold blue */}
      <pointLight position={[-2.5, 2.5, -2]} color="#4488cc" intensity={0.7} />

      {/* Tier aura light — behind/below character */}
      <pointLight ref={rimLight} position={[0, -0.5, -1.5]} color={color} intensity={intensity} />

      {/* Fill light — front low */}
      <pointLight position={[0, -1.5, 3]} color="#1a1a2e" intensity={0.4} />

      {/* Ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.0, 0]} receiveShadow>
        <planeGeometry args={[8, 8]} />
        <meshStandardMaterial
          color="#0e0e1a"
          roughness={0.95}
          metalness={0.1}
        />
      </mesh>

      {/* Ground reflection ring — subtle glow under character */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.99, 0]}>
        <ringGeometry args={[0.3, 0.9, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0.08} />
      </mesh>
    </>
  );
}
