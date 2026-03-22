"use client";

import { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { User, Character } from "@/types";
import { EQUIPMENT_CATALOG } from "@/data/character";
import { SkyrimScene } from "./SkyrimScene";
import { CharacterMesh } from "./CharacterMesh";
import { AuraParticles } from "./AuraParticles";

// Reuse getLevelTier logic from SkyrimAvatar
function getLevelTier(level: number): string {
  if (level >= 25) return "legendary";
  if (level >= 16) return "epic";
  if (level >= 10) return "rare";
  if (level >= 5) return "uncommon";
  return "common";
}

const TIER_BLOOM: Record<string, number> = {
  common:    0.4,
  uncommon:  0.7,
  rare:      1.0,
  epic:      1.6,
  legendary: 2.5,
};

interface Character3DProps {
  user: User;
  character: Character;
  className?: string;
}

function Scene({ user, character }: { user: User; character: Character }) {
  const tier = getLevelTier(user.level);
  const bloomIntensity = TIER_BLOOM[tier] ?? 0.4;

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0.2, 3.2]} fov={48} />

      <SkyrimScene tier={tier} />

      {/* Character group — slightly offset so feet align with ground */}
      <group position={[0, 0.05, 0]}>
        <CharacterMesh character={character} tier={tier} />
        <AuraParticles tier={tier} />
      </group>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI * 0.25}
        maxPolarAngle={Math.PI * 0.75}
        autoRotate
        autoRotateSpeed={0.6}
        target={[0, 0.1, 0]}
      />

      <EffectComposer>
        <Bloom
          intensity={bloomIntensity}
          luminanceThreshold={0.3}
          luminanceSmoothing={0.9}
          mipmapBlur
        />
        <Vignette
          offset={0.38}
          darkness={0.72}
          blendFunction={BlendFunction.NORMAL}
        />
      </EffectComposer>
    </>
  );
}

export default function Character3D({ user, character, className }: Character3DProps) {
  return (
    <div className={`w-full relative ${className ?? ""}`} style={{ height: "340px" }}>
      {/* Tier badge overlay */}
      <TierBadge level={user.level} />

      <Canvas
        dpr={[1, 1.5]}
        shadows
        gl={{ antialias: true, alpha: false }}
        style={{ background: "#080812", borderRadius: "16px" }}
      >
        <Suspense fallback={null}>
          <Scene user={user} character={character} />
        </Suspense>
      </Canvas>

      {/* Drag hint */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-xs text-gray-500 pointer-events-none select-none">
        ◄ arraste para girar ►
      </div>
    </div>
  );
}

function TierBadge({ level }: { level: number }) {
  const tier = getLevelTier(level);
  const colors: Record<string, string> = {
    common:    "#6b7280",
    uncommon:  "#22c55e",
    rare:      "#3b82f6",
    epic:      "#a855f7",
    legendary: "#f59e0b",
  };
  const labels: Record<string, string> = {
    common:    "Comum",
    uncommon:  "Incomum",
    rare:      "Raro",
    epic:      "Épico",
    legendary: "Lendário",
  };
  const color = colors[tier];
  return (
    <div
      className="absolute top-3 right-3 z-10 px-2 py-0.5 rounded-full text-xs font-bold border pointer-events-none"
      style={{
        backgroundColor: `${color}22`,
        borderColor: `${color}66`,
        color,
      }}
    >
      Lv.{level} · {labels[tier]}
    </div>
  );
}
