"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const TIER_CONFIG = {
  common:    { count: 0,   color: "#6b7280", speed: 0.4, radius: 0.5, ringColor: "#6b7280", ringIntensity: 0 },
  uncommon:  { count: 20,  color: "#22c55e", speed: 0.5, radius: 0.55, ringColor: "#22c55e", ringIntensity: 0.4 },
  rare:      { count: 50,  color: "#3b82f6", speed: 0.7, radius: 0.65, ringColor: "#3b82f6", ringIntensity: 0.7 },
  epic:      { count: 100, color: "#a855f7", speed: 1.0, radius: 0.75, ringColor: "#a855f7", ringIntensity: 1.2 },
  legendary: { count: 180, color: "#f59e0b", speed: 1.4, radius: 0.85, ringColor: "#f59e0b", ringIntensity: 2.0 },
};

interface AuraParticlesProps {
  tier: string;
}

function ParticleCloud({ count, color, speed, radius }: { count: number; color: string; speed: number; radius: number }) {
  const pointsRef = useRef<THREE.Points>(null!);

  const { positions, velocities, phases } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    const phases = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = radius * (0.3 + Math.random() * 0.7);
      const h = (Math.random() - 0.5) * 2.2;

      positions[i * 3]     = Math.cos(angle) * r;
      positions[i * 3 + 1] = h;
      positions[i * 3 + 2] = Math.sin(angle) * r;

      velocities[i * 3]     = (Math.random() - 0.5) * 0.01;
      velocities[i * 3 + 1] = (0.005 + Math.random() * 0.015) * speed;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.01;

      phases[i] = Math.random() * Math.PI * 2;
    }

    return { positions, velocities, phases };
  }, [count, radius, speed]);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    const geo = pointsRef.current.geometry;
    const pos = geo.attributes.position.array as Float32Array;
    const t = clock.elapsedTime;

    for (let i = 0; i < count; i++) {
      pos[i * 3 + 1] += velocities[i * 3 + 1] * 0.016;

      // Orbit
      const angle = t * speed * 0.3 + phases[i];
      const r = radius * (0.3 + 0.7 * (0.5 + 0.5 * Math.sin(t + phases[i])));
      pos[i * 3]     = Math.cos(angle) * r;
      pos[i * 3 + 2] = Math.sin(angle) * r;

      // Reset when particle goes too high
      if (pos[i * 3 + 1] > 1.2) {
        pos[i * 3 + 1] = -1.0;
      }
    }

    geo.attributes.position.needsUpdate = true;
  });

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [positions]);

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        color={color}
        size={0.022}
        transparent
        opacity={0.75}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

function AuraRing({ color, tier }: { color: string; tier: string }) {
  const ring1Ref = useRef<THREE.Mesh>(null!);
  const ring2Ref = useRef<THREE.Mesh>(null!);
  const isLegendary = tier === "legendary";

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;

    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = t * 0.8;
      const mat = ring1Ref.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.3 + Math.sin(t * 2) * 0.15;
    }

    if (ring2Ref.current && isLegendary) {
      ring2Ref.current.rotation.z = -t * 1.1;
      const mat = ring2Ref.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.2 + Math.sin(t * 2.5 + 1) * 0.12;
    }
  });

  return (
    <group position={[0, -0.15, 0]} rotation={[Math.PI / 2, 0, 0]}>
      {/* Primary ring */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[0.55, 0.018, 8, 48]} />
        <meshBasicMaterial color={color} transparent opacity={0.35} depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>

      {/* Secondary ring for legendary */}
      {isLegendary && (
        <mesh ref={ring2Ref}>
          <torusGeometry args={[0.72, 0.012, 8, 48]} />
          <meshBasicMaterial color={color} transparent opacity={0.25} depthWrite={false} blending={THREE.AdditiveBlending} />
        </mesh>
      )}
    </group>
  );
}

export function AuraParticles({ tier }: AuraParticlesProps) {
  const config = TIER_CONFIG[tier as keyof typeof TIER_CONFIG] ?? TIER_CONFIG.common;

  if (config.count === 0) return null;

  return (
    <group>
      <ParticleCloud
        count={config.count}
        color={config.color}
        speed={config.speed}
        radius={config.radius}
      />
      <AuraRing color={config.ringColor} tier={tier} />
    </group>
  );
}
