"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { CharacterEquipment } from "@/types";

interface EquipmentMeshProps {
  equippedItems: CharacterEquipment[];
  tier: string;
}

// ─── HEAD EQUIPMENT ─────────────────────────────────────────────────────────

function HeadsetBasico() {
  return (
    <group position={[0, 0.57, 0]}>
      {/* Headband */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.145, 0.012, 8, 24]} />
        <meshStandardMaterial color="#64748b" roughness={0.5} metalness={0.6} />
      </mesh>
      {/* Left ear cup */}
      <mesh position={[-0.155, 0, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.025, 12]} />
        <meshStandardMaterial color="#475569" roughness={0.4} metalness={0.7} />
      </mesh>
      {/* Right ear cup */}
      <mesh position={[0.155, 0, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.025, 12]} />
        <meshStandardMaterial color="#475569" roughness={0.4} metalness={0.7} />
      </mesh>
    </group>
  );
}

function OculosAnalitico() {
  return (
    <group position={[0, 0.575, 0.12]}>
      {/* Bridge */}
      <mesh>
        <boxGeometry args={[0.04, 0.008, 0.01]} />
        <meshStandardMaterial color="#60a5fa" emissive="#3b82f6" emissiveIntensity={0.4} />
      </mesh>
      {/* Left lens */}
      <mesh position={[-0.065, 0, 0]}>
        <boxGeometry args={[0.06, 0.04, 0.006]} />
        <meshStandardMaterial color="#93c5fd" transparent opacity={0.35} emissive="#3b82f6" emissiveIntensity={0.8} />
      </mesh>
      {/* Right lens */}
      <mesh position={[0.065, 0, 0]}>
        <boxGeometry args={[0.06, 0.04, 0.006]} />
        <meshStandardMaterial color="#93c5fd" transparent opacity={0.35} emissive="#3b82f6" emissiveIntensity={0.8} />
      </mesh>
      {/* Left arm */}
      <mesh position={[-0.12, 0, -0.06]} rotation={[0, -0.5, 0]}>
        <boxGeometry args={[0.1, 0.007, 0.007]} />
        <meshStandardMaterial color="#60a5fa" metalness={0.6} />
      </mesh>
      {/* Right arm */}
      <mesh position={[0.12, 0, -0.06]} rotation={[0, 0.5, 0]}>
        <boxGeometry args={[0.1, 0.007, 0.007]} />
        <meshStandardMaterial color="#60a5fa" metalness={0.6} />
      </mesh>
    </group>
  );
}

function CoroaCloser() {
  const crownRef = useRef<THREE.Group>(null!);
  useFrame(({ clock }) => {
    if (crownRef.current) {
      crownRef.current.rotation.y = clock.elapsedTime * 0.4;
    }
  });

  const points = [0, 1, 2, 3, 4].map((i) => {
    const angle = (i / 5) * Math.PI * 2;
    return { x: Math.sin(angle) * 0.13, z: Math.cos(angle) * 0.13 };
  });

  return (
    <group position={[0, 0.74, 0]} ref={crownRef}>
      {/* Crown base ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.13, 0.018, 8, 20]} />
        <meshStandardMaterial color="#ca8a04" roughness={0.2} metalness={0.9} emissive="#92400e" emissiveIntensity={0.3} />
      </mesh>
      {/* Crown spikes */}
      {points.map((p, i) => (
        <mesh key={i} position={[p.x, 0.04, p.z]}>
          <coneGeometry args={[0.018, 0.08, 6]} />
          <meshStandardMaterial color="#eab308" roughness={0.2} metalness={0.9} emissive="#854d0e" emissiveIntensity={0.4} />
        </mesh>
      ))}
      {/* Central gem */}
      <mesh position={[0, 0.08, 0.13]}>
        <sphereGeometry args={[0.022, 8, 6]} />
        <meshStandardMaterial color="#ef4444" emissive="#dc2626" emissiveIntensity={1.2} />
      </mesh>
    </group>
  );
}

function CapaceteLendario() {
  return (
    <group position={[0, 0.57, 0]}>
      {/* Helmet dome */}
      <mesh position={[0, 0.04, 0]}>
        <sphereGeometry args={[0.155, 16, 10, 0, Math.PI * 2, 0, Math.PI * 0.65]} />
        <meshStandardMaterial color="#92400e" roughness={0.4} metalness={0.7} emissive="#451a03" emissiveIntensity={0.2} />
      </mesh>
      {/* Nose guard */}
      <mesh position={[0, -0.05, 0.148]} rotation={[0.2, 0, 0]}>
        <boxGeometry args={[0.025, 0.08, 0.01]} />
        <meshStandardMaterial color="#78350f" roughness={0.4} metalness={0.8} />
      </mesh>
      {/* Eye slits */}
      <mesh position={[-0.055, 0.01, 0.145]}>
        <boxGeometry args={[0.045, 0.014, 0.008]} />
        <meshStandardMaterial color="#0a0a0f" />
      </mesh>
      <mesh position={[0.055, 0.01, 0.145]}>
        <boxGeometry args={[0.045, 0.014, 0.008]} />
        <meshStandardMaterial color="#0a0a0f" />
      </mesh>
      {/* Left horn */}
      <mesh position={[-0.14, 0.06, 0]} rotation={[0, 0, -0.5]}>
        <coneGeometry args={[0.025, 0.22, 8]} />
        <meshStandardMaterial color="#d4a373" roughness={0.3} metalness={0.2} emissive="#92400e" emissiveIntensity={0.15} />
      </mesh>
      {/* Right horn */}
      <mesh position={[0.14, 0.06, 0]} rotation={[0, 0, 0.5]}>
        <coneGeometry args={[0.025, 0.22, 8]} />
        <meshStandardMaterial color="#d4a373" roughness={0.3} metalness={0.2} emissive="#92400e" emissiveIntensity={0.15} />
      </mesh>
      {/* Dragon eye glow */}
      <mesh position={[-0.055, 0.01, 0.15]}>
        <sphereGeometry args={[0.01, 6, 4]} />
        <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={2} />
      </mesh>
      <mesh position={[0.055, 0.01, 0.15]}>
        <sphereGeometry args={[0.01, 6, 4]} />
        <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={2} />
      </mesh>
    </group>
  );
}

// ─── TOOL EQUIPMENT (right hand) ────────────────────────────────────────────

function AdagaFerro() {
  return (
    <group position={[0.32, -0.36, 0.04]} rotation={[0.2, 0, 0.15]}>
      {/* Blade */}
      <mesh position={[0, -0.10, 0]}>
        <boxGeometry args={[0.018, 0.22, 0.008]} />
        <meshStandardMaterial color="#94a3b8" roughness={0.3} metalness={0.85} />
      </mesh>
      {/* Guard */}
      <mesh position={[0, 0.01, 0]}>
        <boxGeometry args={[0.07, 0.014, 0.016]} />
        <meshStandardMaterial color="#475569" roughness={0.4} metalness={0.8} />
      </mesh>
      {/* Handle */}
      <mesh position={[0, 0.08, 0]}>
        <cylinderGeometry args={[0.012, 0.012, 0.10, 8]} />
        <meshStandardMaterial color="#3d2b1a" roughness={0.8} />
      </mesh>
    </group>
  );
}

function EspadaEncantada() {
  const glowRef = useRef<THREE.Mesh>(null!);
  useFrame(({ clock }) => {
    if (glowRef.current) {
      const mat = glowRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 1.5 + Math.sin(clock.elapsedTime * 2.5) * 0.5;
    }
  });
  return (
    <group position={[0.32, -0.30, 0.04]} rotation={[0.15, 0, 0.1]}>
      {/* Blade */}
      <mesh ref={glowRef} position={[0, -0.16, 0]}>
        <boxGeometry args={[0.016, 0.38, 0.007]} />
        <meshStandardMaterial color="#93c5fd" roughness={0.1} metalness={0.9} emissive="#3b82f6" emissiveIntensity={1.5} />
      </mesh>
      {/* Guard */}
      <mesh>
        <boxGeometry args={[0.09, 0.016, 0.018]} />
        <meshStandardMaterial color="#1e40af" roughness={0.3} metalness={0.9} emissive="#1d4ed8" emissiveIntensity={0.6} />
      </mesh>
      {/* Handle */}
      <mesh position={[0, 0.09, 0]}>
        <cylinderGeometry args={[0.013, 0.013, 0.12, 8]} />
        <meshStandardMaterial color="#1e3a5f" roughness={0.6} />
      </mesh>
      {/* Pommel */}
      <mesh position={[0, 0.16, 0]}>
        <sphereGeometry args={[0.022, 8, 6]} />
        <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={1.2} />
      </mesh>
    </group>
  );
}

function MachadoOrcish() {
  return (
    <group position={[0.32, -0.30, 0.04]} rotation={[0.15, 0.2, 0.1]}>
      {/* Handle */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.013, 0.016, 0.50, 8]} />
        <meshStandardMaterial color="#2d1b0e" roughness={0.8} />
      </mesh>
      {/* Axe head */}
      <mesh position={[0.06, 0.20, 0]}>
        <boxGeometry args={[0.14, 0.16, 0.025]} />
        <meshStandardMaterial color="#4a7c59" roughness={0.3} metalness={0.7} emissive="#166534" emissiveIntensity={0.3} />
      </mesh>
      {/* Axe edge */}
      <mesh position={[0.13, 0.20, 0]}>
        <boxGeometry args={[0.02, 0.18, 0.018]} />
        <meshStandardMaterial color="#86efac" roughness={0.2} metalness={0.85} emissive="#22c55e" emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
}

function MarteloVolendrung() {
  const hammerRef = useRef<THREE.Group>(null!);
  useFrame(({ clock }) => {
    if (hammerRef.current) {
      hammerRef.current.children.forEach((child) => {
        const mesh = child as THREE.Mesh;
        if (mesh.material) {
          const mat = mesh.material as THREE.MeshStandardMaterial;
          if (mat.emissiveIntensity > 0) {
            mat.emissiveIntensity = 0.8 + Math.sin(clock.elapsedTime * 1.8) * 0.4;
          }
        }
      });
    }
  });
  return (
    <group ref={hammerRef} position={[0.35, -0.20, 0.04]} rotation={[0.1, 0.15, 0.05]}>
      {/* Handle */}
      <mesh position={[0, -0.15, 0]}>
        <cylinderGeometry args={[0.016, 0.019, 0.55, 8]} />
        <meshStandardMaterial color="#422006" roughness={0.7} />
      </mesh>
      {/* Hammer head */}
      <mesh position={[0, 0.20, 0]}>
        <boxGeometry args={[0.12, 0.14, 0.10]} />
        <meshStandardMaterial color="#f59e0b" roughness={0.2} metalness={0.9} emissive="#b45309" emissiveIntensity={0.8} />
      </mesh>
      {/* Runes on hammer */}
      <mesh position={[0, 0.20, 0.055]}>
        <boxGeometry args={[0.08, 0.08, 0.005]} />
        <meshStandardMaterial color="#fbbf24" emissive="#f59e0b" emissiveIntensity={1.5} transparent opacity={0.7} />
      </mesh>
    </group>
  );
}

// ─── ACCESSORY EQUIPMENT ────────────────────────────────────────────────────

function AmuletoMara() {
  const orbRef = useRef<THREE.Mesh>(null!);
  useFrame(({ clock }) => {
    if (orbRef.current) {
      const mat = orbRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 0.8 + Math.sin(clock.elapsedTime * 1.5) * 0.4;
    }
  });
  return (
    <group position={[0, 0.42, 0.08]}>
      <mesh ref={orbRef}>
        <sphereGeometry args={[0.025, 10, 8]} />
        <meshStandardMaterial color="#f9a8d4" emissive="#ec4899" emissiveIntensity={0.8} />
      </mesh>
      {/* Chain hint */}
      <mesh position={[0, 0.04, 0]} rotation={[0.5, 0, 0]}>
        <torusGeometry args={[0.035, 0.004, 6, 16, Math.PI]} />
        <meshStandardMaterial color="#d4a5b5" metalness={0.6} roughness={0.3} />
      </mesh>
    </group>
  );
}

function AnelVelocidade() {
  const ringRef = useRef<THREE.Mesh>(null!);
  useFrame(({ clock }) => {
    if (ringRef.current) {
      ringRef.current.rotation.y = clock.elapsedTime * 3;
    }
  });
  return (
    <group position={[-0.32, -0.30, 0]}>
      <mesh ref={ringRef}>
        <torusGeometry args={[0.035, 0.008, 8, 20]} />
        <meshStandardMaterial color="#93c5fd" emissive="#3b82f6" emissiveIntensity={1.2} metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  );
}

function ColarTalos() {
  const groupRef = useRef<THREE.Group>(null!);
  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        const mesh = child as THREE.Mesh;
        if (mesh.material) {
          const mat = mesh.material as THREE.MeshStandardMaterial;
          mat.emissiveIntensity = 0.8 + Math.sin(clock.elapsedTime * 2 + i * 0.8) * 0.5;
        }
      });
    }
  });
  const orbs = [-0.06, 0, 0.06];
  return (
    <group ref={groupRef} position={[0, 0.44, 0.08]}>
      {orbs.map((x, i) => (
        <mesh key={i} position={[x, 0, 0]}>
          <sphereGeometry args={[0.016, 8, 6]} />
          <meshStandardMaterial color="#fbbf24" emissive="#f59e0b" emissiveIntensity={0.8} />
        </mesh>
      ))}
    </group>
  );
}

function AmuletoAkatosh() {
  const gemRef = useRef<THREE.Mesh>(null!);
  useFrame(({ clock }) => {
    if (gemRef.current) {
      gemRef.current.rotation.y = clock.elapsedTime * 0.8;
      const mat = gemRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 1.5 + Math.sin(clock.elapsedTime * 1.2) * 0.8;
    }
  });
  return (
    <group position={[0, 0.42, 0.10]}>
      {/* Dragon amulet disc */}
      <mesh>
        <cylinderGeometry args={[0.045, 0.045, 0.01, 12]} />
        <meshStandardMaterial color="#854d0e" roughness={0.3} metalness={0.8} />
      </mesh>
      {/* Central gem */}
      <mesh ref={gemRef} position={[0, 0.01, 0]}>
        <octahedronGeometry args={[0.03]} />
        <meshStandardMaterial color="#fbbf24" emissive="#f59e0b" emissiveIntensity={1.5} metalness={0.5} />
      </mesh>
    </group>
  );
}

// ─── BODY ARMOR EXTRAS (chest plates and capes) ─────────────────────────────

function ArmaduraRevenuePlate() {
  return (
    <group position={[0, 0.12, 0.18]}>
      {/* Chest plate */}
      <mesh>
        <boxGeometry args={[0.30, 0.32, 0.04]} />
        <meshStandardMaterial color="#7f8c9a" roughness={0.2} metalness={0.85} />
      </mesh>
      {/* Center ridge */}
      <mesh position={[0, 0, 0.02]}>
        <boxGeometry args={[0.04, 0.28, 0.02]} />
        <meshStandardMaterial color="#94a3b8" roughness={0.2} metalness={0.9} />
      </mesh>
    </group>
  );
}

function MantoCroCloak() {
  return (
    <group>
      {/* Cape — plane behind character */}
      <mesh position={[0, 0.05, -0.22]}>
        <planeGeometry args={[0.55, 0.90]} />
        <meshStandardMaterial color="#7f1d1d" side={THREE.DoubleSide} roughness={0.85} />
      </mesh>
      {/* Dragon chest emblem */}
      <mesh position={[0, 0.14, 0.21]}>
        <cylinderGeometry args={[0.045, 0.045, 0.012, 12]} />
        <meshStandardMaterial color="#92400e" roughness={0.3} metalness={0.7} />
      </mesh>
      <mesh position={[0, 0.145, 0.22]}>
        <octahedronGeometry args={[0.025]} />
        <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={1.0} />
      </mesh>
    </group>
  );
}

// ─── MAIN COMPONENT ─────────────────────────────────────────────────────────

export function EquipmentMesh({ equippedItems }: EquipmentMeshProps) {
  const headItem = equippedItems.find((e) => e.slot === "head");
  const bodyItem = equippedItems.find((e) => e.slot === "body");
  const toolItem = equippedItems.find((e) => e.slot === "tool");
  const accessoryItem = equippedItems.find((e) => e.slot === "accessory");

  return (
    <>
      {/* Head */}
      {headItem?.id === "headset-basico" && <HeadsetBasico />}
      {headItem?.id === "oculos-analitico" && <OculosAnalitico />}
      {headItem?.id === "coroa-closer" && <CoroaCloser />}
      {headItem?.id === "capacete-lendario" && <CapaceteLendario />}

      {/* Body extras */}
      {bodyItem?.id === "armadura-revenue" && <ArmaduraRevenuePlate />}
      {bodyItem?.id === "manto-cro" && <MantoCroCloak />}

      {/* Tool */}
      {toolItem?.id === "adaga-ferro" && <AdagaFerro />}
      {toolItem?.id === "espada-encantada" && <EspadaEncantada />}
      {toolItem?.id === "machado-orcish" && <MachadoOrcish />}
      {toolItem?.id === "martelo-volendrung" && <MarteloVolendrung />}

      {/* Accessory */}
      {accessoryItem?.id === "amuleto-mara" && <AmuletoMara />}
      {accessoryItem?.id === "anel-velocidade" && <AnelVelocidade />}
      {accessoryItem?.id === "colar-talos" && <ColarTalos />}
      {accessoryItem?.id === "amuleto-akatosh" && <AmuletoAkatosh />}
    </>
  );
}
