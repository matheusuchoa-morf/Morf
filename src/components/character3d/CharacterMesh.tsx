"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Character } from "@/types";
import { EQUIPMENT_CATALOG } from "@/data/character";
import { EquipmentMesh } from "./EquipmentMesh";

// ─── Body colors per equipped body item ───────────────────────────────────────
const BODY_COLORS: Record<string, { torso: string; pants: string; boots: string; skin: string }> = {
  "camisa-startup":   { torso: "#d4d4d4", pants: "#2d3748", boots: "#1a1008", skin: "#c4a882" },
  "blazer-closer":    { torso: "#5b21b6", pants: "#1e1b4b", boots: "#0f0f1a", skin: "#c4a882" },
  "armadura-revenue": { torso: "#64748b", pants: "#334155", boots: "#1e293b", skin: "#c4a882" },
  "manto-cro":        { torso: "#7c2d12", pants: "#1c0a05", boots: "#0f0705", skin: "#c4a882" },
};

const DEFAULT_COLORS = { torso: "#3d3228", pants: "#2a1f14", boots: "#1a1008", skin: "#c4a882" };

interface CharacterMeshProps {
  character: Character;
  tier: string;
}

export function CharacterMesh({ character, tier }: CharacterMeshProps) {
  const rootRef = useRef<THREE.Group>(null!);
  const torsoRef = useRef<THREE.Mesh>(null!);
  const headRef = useRef<THREE.Group>(null!);

  const equippedItems = useMemo(
    () => EQUIPMENT_CATALOG.filter((e) => character.equipment.includes(e.id)),
    [character.equipment]
  );

  const bodyItem = equippedItems.find((e) => e.slot === "body");
  const colors = bodyItem ? (BODY_COLORS[bodyItem.id] ?? DEFAULT_COLORS) : DEFAULT_COLORS;

  const skinMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: colors.skin, roughness: 0.6, metalness: 0.05 }),
    [colors.skin]
  );
  const torsoMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: colors.torso, roughness: 0.7, metalness: bodyItem?.id === "armadura-revenue" ? 0.5 : 0.05 }),
    [colors.torso, bodyItem?.id]
  );
  const pantsMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: colors.pants, roughness: 0.85 }),
    [colors.pants]
  );
  const bootsMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: colors.boots, roughness: 0.9 }),
    [colors.boots]
  );

  // Idle animation
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (rootRef.current) {
      rootRef.current.position.y = Math.sin(t * 0.9) * 0.025;
    }
    if (torsoRef.current) {
      torsoRef.current.scale.x = 1 + Math.sin(t * 1.6) * 0.012;
      torsoRef.current.scale.z = 1 + Math.sin(t * 1.6 + Math.PI) * 0.008;
    }
    if (headRef.current) {
      headRef.current.rotation.z = Math.sin(t * 0.5) * 0.025;
      headRef.current.rotation.y = Math.sin(t * 0.35) * 0.04;
    }
  });

  return (
    <group ref={rootRef}>
      {/* ── LEGS ── */}

      {/* Left upper leg */}
      <mesh position={[-0.10, -0.40, 0]} castShadow material={pantsMat}>
        <cylinderGeometry args={[0.085, 0.095, 0.36, 8]} />
      </mesh>
      {/* Right upper leg */}
      <mesh position={[0.10, -0.40, 0]} castShadow material={pantsMat}>
        <cylinderGeometry args={[0.085, 0.095, 0.36, 8]} />
      </mesh>

      {/* Left lower leg */}
      <mesh position={[-0.10, -0.70, 0]} castShadow material={pantsMat}>
        <cylinderGeometry args={[0.07, 0.08, 0.30, 8]} />
      </mesh>
      {/* Right lower leg */}
      <mesh position={[0.10, -0.70, 0]} castShadow material={pantsMat}>
        <cylinderGeometry args={[0.07, 0.08, 0.30, 8]} />
      </mesh>

      {/* Left foot */}
      <mesh position={[-0.10, -0.88, 0.04]} castShadow material={bootsMat}>
        <boxGeometry args={[0.10, 0.08, 0.18]} />
      </mesh>
      {/* Right foot */}
      <mesh position={[0.10, -0.88, 0.04]} castShadow material={bootsMat}>
        <boxGeometry args={[0.10, 0.08, 0.18]} />
      </mesh>

      {/* ── TORSO ── */}
      <mesh ref={torsoRef} position={[0, 0.10, 0]} castShadow material={torsoMat}>
        <cylinderGeometry args={[0.20, 0.23, 0.52, 10]} />
      </mesh>

      {/* Shoulder pads */}
      <mesh position={[-0.25, 0.30, 0]} castShadow material={torsoMat}>
        <sphereGeometry args={[0.075, 8, 8]} />
      </mesh>
      <mesh position={[0.25, 0.30, 0]} castShadow material={torsoMat}>
        <sphereGeometry args={[0.075, 8, 8]} />
      </mesh>

      {/* ── ARMS ── */}

      {/* Left upper arm */}
      <mesh position={[-0.30, 0.17, 0]} castShadow material={skinMat}>
        <cylinderGeometry args={[0.058, 0.065, 0.28, 8]} />
      </mesh>
      {/* Left lower arm */}
      <mesh position={[-0.31, -0.10, 0]} castShadow material={skinMat}>
        <cylinderGeometry args={[0.048, 0.055, 0.26, 8]} />
      </mesh>
      {/* Left hand */}
      <mesh position={[-0.32, -0.30, 0]} castShadow material={skinMat}>
        <boxGeometry args={[0.08, 0.10, 0.06]} />
      </mesh>

      {/* Right upper arm */}
      <mesh position={[0.30, 0.17, 0]} castShadow material={skinMat}>
        <cylinderGeometry args={[0.058, 0.065, 0.28, 8]} />
      </mesh>
      {/* Right lower arm */}
      <mesh position={[0.31, -0.10, 0]} castShadow material={skinMat}>
        <cylinderGeometry args={[0.048, 0.055, 0.26, 8]} />
      </mesh>
      {/* Right hand */}
      <mesh position={[0.32, -0.30, 0]} castShadow material={skinMat}>
        <boxGeometry args={[0.08, 0.10, 0.06]} />
      </mesh>

      {/* ── NECK ── */}
      <mesh position={[0, 0.40, 0]} castShadow material={skinMat}>
        <cylinderGeometry args={[0.07, 0.09, 0.10, 8]} />
      </mesh>

      {/* ── HEAD ── */}
      <group ref={headRef} position={[0, 0.57, 0]}>
        {/* Head */}
        <mesh castShadow material={skinMat}>
          <sphereGeometry args={[0.135, 16, 12]} />
        </mesh>
        {/* Eyes */}
        <mesh position={[-0.05, 0.01, 0.12]}>
          <sphereGeometry args={[0.018, 8, 6]} />
          <meshStandardMaterial color="#1a1a2e" />
        </mesh>
        <mesh position={[0.05, 0.01, 0.12]}>
          <sphereGeometry args={[0.018, 8, 6]} />
          <meshStandardMaterial color="#1a1a2e" />
        </mesh>
        {/* Eye glow (tiny emissive) */}
        <mesh position={[-0.05, 0.01, 0.135]}>
          <sphereGeometry args={[0.008, 6, 4]} />
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} />
        </mesh>
        <mesh position={[0.05, 0.01, 0.135]}>
          <sphereGeometry args={[0.008, 6, 4]} />
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} />
        </mesh>
      </group>

      {/* ── EQUIPMENT OVERLAYS ── */}
      <EquipmentMesh equippedItems={equippedItems} tier={tier} />
    </group>
  );
}
