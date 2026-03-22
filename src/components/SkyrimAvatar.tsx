"use client";

import { useRef, useState, useEffect } from "react";
import { User, Character } from "@/types";
import { EQUIPMENT_CATALOG } from "@/data/character";

interface SkyrimAvatarProps {
  user: User;
  character: Character;
  size?: "sm" | "md" | "lg";
  onPhotoChange?: (photo: string) => void;
  editable?: boolean;
}

const SIZE_CONFIG = {
  sm: { container: "w-12 h-12", icon: "text-lg", frame: 48 },
  md: { container: "w-36 h-36", icon: "text-4xl", frame: 144 },
  lg: { container: "w-52 h-52", icon: "text-6xl", frame: 208 },
};

// Skyrim-style level tiers for visual progression
function getLevelTier(level: number) {
  if (level >= 25) return { tier: "legendary", color: "#f59e0b", glow: "rgba(245,158,11,0.6)", label: "Lendario" };
  if (level >= 16) return { tier: "epic", color: "#a855f7", glow: "rgba(168,85,247,0.5)", label: "Epico" };
  if (level >= 10) return { tier: "rare", color: "#3b82f6", glow: "rgba(59,130,246,0.4)", label: "Raro" };
  if (level >= 5) return { tier: "uncommon", color: "#22c55e", glow: "rgba(34,197,94,0.3)", label: "Incomum" };
  return { tier: "common", color: "#6b7280", glow: "rgba(107,114,128,0.2)", label: "Comum" };
}

// Get equipped overlay visuals
function getEquipmentOverlays(character: Character) {
  const equipped = EQUIPMENT_CATALOG.filter((e) => character.equipment.includes(e.id));
  return {
    head: equipped.find((e) => e.slot === "head"),
    body: equipped.find((e) => e.slot === "body"),
    accessory: equipped.find((e) => e.slot === "accessory"),
    tool: equipped.find((e) => e.slot === "tool"),
  };
}

// SVG frame for Skyrim-style portrait
function SkyrimFrame({ size, levelTier, hasPhoto }: { size: number; levelTier: ReturnType<typeof getLevelTier>; hasPhoto: boolean }) {
  const s = size;
  const pad = 4;
  return (
    <svg
      className="absolute inset-0 pointer-events-none"
      width={s}
      height={s}
      viewBox={`0 0 ${s} ${s}`}
    >
      <defs>
        <filter id="frame-glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="frame-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={levelTier.color} stopOpacity="0.9" />
          <stop offset="50%" stopColor={levelTier.color} stopOpacity="0.5" />
          <stop offset="100%" stopColor={levelTier.color} stopOpacity="0.9" />
        </linearGradient>
        <clipPath id="portrait-clip">
          <rect x={pad + 4} y={pad + 4} width={s - (pad + 4) * 2} height={s - (pad + 4) * 2} rx="8" />
        </clipPath>
      </defs>

      {/* Outer ornate frame */}
      <rect
        x={pad}
        y={pad}
        width={s - pad * 2}
        height={s - pad * 2}
        rx="12"
        fill="none"
        stroke="url(#frame-gradient)"
        strokeWidth="3"
        filter={levelTier.tier !== "common" ? "url(#frame-glow)" : undefined}
      />

      {/* Inner frame line */}
      <rect
        x={pad + 6}
        y={pad + 6}
        width={s - (pad + 6) * 2}
        height={s - (pad + 6) * 2}
        rx="8"
        fill="none"
        stroke={levelTier.color}
        strokeWidth="1"
        strokeOpacity="0.4"
      />

      {/* Corner ornaments */}
      {[
        [pad, pad],
        [s - pad - 16, pad],
        [pad, s - pad - 16],
        [s - pad - 16, s - pad - 16],
      ].map(([x, y], i) => (
        <g key={i}>
          <rect
            x={x}
            y={y}
            width="16"
            height="16"
            fill="none"
            stroke={levelTier.color}
            strokeWidth="2"
            rx="2"
            opacity="0.7"
          />
          <rect
            x={x + 4}
            y={y + 4}
            width="8"
            height="8"
            fill={levelTier.color}
            opacity="0.3"
            rx="1"
          />
        </g>
      ))}

      {/* Top center diamond ornament */}
      <polygon
        points={`${s / 2},${pad - 2} ${s / 2 + 8},${pad + 6} ${s / 2},${pad + 14} ${s / 2 - 8},${pad + 6}`}
        fill={levelTier.color}
        opacity="0.6"
      />
    </svg>
  );
}

// Helmet overlay SVG based on equipped head item
function HelmetOverlay({ itemId, size }: { itemId?: string; size: number }) {
  if (!itemId) return null;
  const s = size;
  const cx = s / 2;

  const helmets: Record<string, React.JSX.Element> = {
    "headset-basico": (
      <g opacity="0.85">
        {/* Simple headband */}
        <ellipse cx={cx} cy={s * 0.15} rx={s * 0.28} ry={s * 0.06} fill="none" stroke="#94a3b8" strokeWidth="2.5" />
        <circle cx={cx - s * 0.3} cy={s * 0.17} r={s * 0.04} fill="#475569" stroke="#94a3b8" strokeWidth="1.5" />
      </g>
    ),
    "oculos-analitico": (
      <g opacity="0.85">
        {/* Analytical visor */}
        <path d={`M${cx - s * 0.22},${s * 0.28} Q${cx},${s * 0.22} ${cx + s * 0.22},${s * 0.28}`} fill="none" stroke="#60a5fa" strokeWidth="2" />
        <rect x={cx - s * 0.18} y={s * 0.24} width={s * 0.14} height={s * 0.06} rx="2" fill="rgba(96,165,250,0.2)" stroke="#60a5fa" strokeWidth="1.5" />
        <rect x={cx + s * 0.04} y={s * 0.24} width={s * 0.14} height={s * 0.06} rx="2" fill="rgba(96,165,250,0.2)" stroke="#60a5fa" strokeWidth="1.5" />
      </g>
    ),
    "coroa-closer": (
      <g opacity="0.9">
        {/* Crown */}
        <path
          d={`M${cx - s * 0.2},${s * 0.18} L${cx - s * 0.15},${s * 0.08} L${cx - s * 0.05},${s * 0.14} L${cx},${s * 0.04} L${cx + s * 0.05},${s * 0.14} L${cx + s * 0.15},${s * 0.08} L${cx + s * 0.2},${s * 0.18} Z`}
          fill="rgba(234,179,8,0.3)"
          stroke="#eab308"
          strokeWidth="2"
        />
        <circle cx={cx} cy={s * 0.06} r={s * 0.015} fill="#ef4444" />
        <circle cx={cx - s * 0.15} cy={s * 0.1} r={s * 0.012} fill="#3b82f6" />
        <circle cx={cx + s * 0.15} cy={s * 0.1} r={s * 0.012} fill="#22c55e" />
      </g>
    ),
    "capacete-lendario": (
      <g opacity="0.9">
        {/* Viking/Dragonborn style helmet */}
        <path
          d={`M${cx - s * 0.25},${s * 0.25} Q${cx - s * 0.25},${s * 0.05} ${cx},${s * 0.02} Q${cx + s * 0.25},${s * 0.05} ${cx + s * 0.25},${s * 0.25}`}
          fill="rgba(161,98,7,0.4)"
          stroke="#a16207"
          strokeWidth="2.5"
        />
        {/* Horns */}
        <path
          d={`M${cx - s * 0.22},${s * 0.12} Q${cx - s * 0.35},${s * 0.02} ${cx - s * 0.38},${s * -0.05}`}
          fill="none"
          stroke="#d4a373"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d={`M${cx + s * 0.22},${s * 0.12} Q${cx + s * 0.35},${s * 0.02} ${cx + s * 0.38},${s * -0.05}`}
          fill="none"
          stroke="#d4a373"
          strokeWidth="3"
          strokeLinecap="round"
        />
        {/* Nose guard */}
        <line x1={cx} y1={s * 0.08} x2={cx} y2={s * 0.22} stroke="#a16207" strokeWidth="2" />
        {/* Eye slits */}
        <line x1={cx - s * 0.12} y1={s * 0.18} x2={cx - s * 0.03} y2={s * 0.18} stroke="#1c1917" strokeWidth="2.5" />
        <line x1={cx + s * 0.03} y1={s * 0.18} x2={cx + s * 0.12} y2={s * 0.18} stroke="#1c1917" strokeWidth="2.5" />
      </g>
    ),
  };

  return (
    <svg className="absolute inset-0 pointer-events-none" width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
      {helmets[itemId] || null}
    </svg>
  );
}

// Armor overlay based on equipped body
function ArmorOverlay({ itemId, size }: { itemId?: string; size: number }) {
  if (!itemId) return null;
  const s = size;
  const cx = s / 2;

  const armors: Record<string, React.JSX.Element> = {
    "camisa-startup": (
      <g opacity="0.5">
        <path d={`M${cx - s * 0.3},${s * 0.95} L${cx - s * 0.25},${s * 0.6} Q${cx},${s * 0.55} ${cx + s * 0.25},${s * 0.6} L${cx + s * 0.3},${s * 0.95}`} fill="none" stroke="#6b7280" strokeWidth="1.5" strokeDasharray="4 2" />
      </g>
    ),
    "blazer-closer": (
      <g opacity="0.7">
        {/* Blazer shoulders */}
        <path
          d={`M${cx - s * 0.35},${s * 0.65} Q${cx - s * 0.3},${s * 0.55} ${cx - s * 0.1},${s * 0.58} L${cx - s * 0.1},${s * 0.95} L${cx - s * 0.35},${s * 0.95} Z`}
          fill="rgba(88,28,135,0.25)"
          stroke="#7c3aed"
          strokeWidth="1.5"
        />
        <path
          d={`M${cx + s * 0.35},${s * 0.65} Q${cx + s * 0.3},${s * 0.55} ${cx + s * 0.1},${s * 0.58} L${cx + s * 0.1},${s * 0.95} L${cx + s * 0.35},${s * 0.95} Z`}
          fill="rgba(88,28,135,0.25)"
          stroke="#7c3aed"
          strokeWidth="1.5"
        />
      </g>
    ),
    "armadura-revenue": (
      <g opacity="0.8">
        {/* Chest plate */}
        <path
          d={`M${cx - s * 0.2},${s * 0.55} Q${cx},${s * 0.5} ${cx + s * 0.2},${s * 0.55} L${cx + s * 0.25},${s * 0.75} Q${cx},${s * 0.85} ${cx - s * 0.25},${s * 0.75} Z`}
          fill="rgba(71,85,105,0.4)"
          stroke="#94a3b8"
          strokeWidth="2"
        />
        {/* Center line */}
        <line x1={cx} y1={s * 0.52} x2={cx} y2={s * 0.8} stroke="#94a3b8" strokeWidth="1.5" />
        {/* Shoulder pads */}
        <ellipse cx={cx - s * 0.28} cy={s * 0.58} rx={s * 0.08} ry={s * 0.05} fill="rgba(71,85,105,0.5)" stroke="#94a3b8" strokeWidth="1.5" />
        <ellipse cx={cx + s * 0.28} cy={s * 0.58} rx={s * 0.08} ry={s * 0.05} fill="rgba(71,85,105,0.5)" stroke="#94a3b8" strokeWidth="1.5" />
      </g>
    ),
    "manto-cro": (
      <g opacity="0.85">
        {/* Epic cape/mantle */}
        <path
          d={`M${cx - s * 0.25},${s * 0.55} Q${cx - s * 0.4},${s * 0.7} ${cx - s * 0.35},${s * 0.98}`}
          fill="none"
          stroke="#dc2626"
          strokeWidth="2.5"
          opacity="0.7"
        />
        <path
          d={`M${cx + s * 0.25},${s * 0.55} Q${cx + s * 0.4},${s * 0.7} ${cx + s * 0.35},${s * 0.98}`}
          fill="none"
          stroke="#dc2626"
          strokeWidth="2.5"
          opacity="0.7"
        />
        {/* Heavy plate armor */}
        <path
          d={`M${cx - s * 0.22},${s * 0.52} Q${cx},${s * 0.48} ${cx + s * 0.22},${s * 0.52} L${cx + s * 0.28},${s * 0.78} Q${cx},${s * 0.9} ${cx - s * 0.28},${s * 0.78} Z`}
          fill="rgba(120,53,15,0.4)"
          stroke="#b45309"
          strokeWidth="2"
        />
        {/* Dragon emblem */}
        <circle cx={cx} cy={s * 0.65} r={s * 0.06} fill="none" stroke="#eab308" strokeWidth="1.5" />
        <path
          d={`M${cx - s * 0.03},${s * 0.65} L${cx},${s * 0.6} L${cx + s * 0.03},${s * 0.65} L${cx},${s * 0.7} Z`}
          fill="#eab308"
          opacity="0.6"
        />
      </g>
    ),
  };

  return (
    <svg className="absolute inset-0 pointer-events-none" width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
      {armors[itemId] || null}
    </svg>
  );
}

// Default warrior silhouette when no photo
function DefaultSilhouette({ size }: { size: number }) {
  const s = size;
  const cx = s / 2;
  return (
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} className="absolute inset-0">
      <defs>
        <radialGradient id="silhouette-bg" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#1e1b2e" />
          <stop offset="100%" stopColor="#0a0a0f" />
        </radialGradient>
      </defs>
      <rect width={s} height={s} fill="url(#silhouette-bg)" rx="8" />
      {/* Head */}
      <circle cx={cx} cy={s * 0.32} r={s * 0.14} fill="#1a1625" stroke="#2d2640" strokeWidth="1.5" />
      {/* Shoulders */}
      <path
        d={`M${cx - s * 0.3},${s * 0.95} Q${cx - s * 0.3},${s * 0.55} ${cx},${s * 0.5} Q${cx + s * 0.3},${s * 0.55} ${cx + s * 0.3},${s * 0.95}`}
        fill="#1a1625"
        stroke="#2d2640"
        strokeWidth="1.5"
      />
      {/* Sword hint */}
      <line x1={cx + s * 0.15} y1={s * 0.3} x2={cx + s * 0.3} y2={s * 0.05} stroke="#2d2640" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export default function SkyrimAvatar({ user, character, size = "lg", onPhotoChange, editable = false }: SkyrimAvatarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [processedPhoto, setProcessedPhoto] = useState<string | null>(null);
  const config = SIZE_CONFIG[size];
  const levelTier = getLevelTier(user.level);
  const overlays = getEquipmentOverlays(character);

  // Process photo with Skyrim-style filter
  useEffect(() => {
    if (!user.photo) {
      setProcessedPhoto(null);
      return;
    }

    const img = new Image();
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const s = config.frame;
      canvas.width = s;
      canvas.height = s;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Draw image centered/cropped
      const scale = Math.max(s / img.width, s / img.height);
      const w = img.width * scale;
      const h = img.height * scale;
      const x = (s - w) / 2;
      const y = (s - h) / 2;
      ctx.drawImage(img, x, y, w, h);

      // Apply Skyrim-style color grading
      const imageData = ctx.getImageData(0, 0, s, s);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        // Desaturate slightly
        const gray = r * 0.3 + g * 0.59 + b * 0.11;
        const saturation = 0.55;
        let newR = gray + (r - gray) * saturation;
        let newG = gray + (g - gray) * saturation;
        let newB = gray + (b - gray) * saturation;

        // Cold blue/steel tint (Skyrim atmosphere)
        newR = newR * 0.85 + 20;
        newG = newG * 0.88 + 15;
        newB = newB * 0.95 + 30;

        // Increase contrast
        const contrast = 1.3;
        newR = ((newR / 255 - 0.5) * contrast + 0.5) * 255;
        newG = ((newG / 255 - 0.5) * contrast + 0.5) * 255;
        newB = ((newB / 255 - 0.5) * contrast + 0.5) * 255;

        // Slight vignette darkening at edges
        const px = (i / 4) % s;
        const py = Math.floor(i / 4 / s);
        const dx = (px - s / 2) / (s / 2);
        const dy = (py - s / 2) / (s / 2);
        const dist = Math.sqrt(dx * dx + dy * dy);
        const vignette = Math.max(0, 1 - dist * 0.6);

        data[i] = Math.max(0, Math.min(255, newR * vignette + (1 - vignette) * newR * 0.3));
        data[i + 1] = Math.max(0, Math.min(255, newG * vignette + (1 - vignette) * newG * 0.3));
        data[i + 2] = Math.max(0, Math.min(255, newB * vignette + (1 - vignette) * newB * 0.3));
      }

      ctx.putImageData(imageData, 0, 0);

      // Add a dark gradient overlay at bottom for depth
      const gradient = ctx.createLinearGradient(0, s * 0.6, 0, s);
      gradient.addColorStop(0, "rgba(10,10,15,0)");
      gradient.addColorStop(1, "rgba(10,10,15,0.7)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, s, s);

      setProcessedPhoto(canvas.toDataURL("image/jpeg", 0.85));
    };
    img.src = user.photo;
  }, [user.photo, config.frame]);

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      onPhotoChange?.(result);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  }

  const frameSize = config.frame;
  const isLegendary = levelTier.tier === "legendary";
  const isEpic = levelTier.tier === "epic" || levelTier.tier === "legendary";

  return (
    <div className="relative inline-block">
      <div
        className={`${config.container} relative overflow-visible`}
        style={{
          filter: isEpic ? `drop-shadow(0 0 ${isLegendary ? "12px" : "8px"} ${levelTier.glow})` : undefined,
        }}
      >
        {/* Background / Photo */}
        <div
          className="absolute inset-0 rounded-lg overflow-hidden"
          style={{ margin: size === "sm" ? 2 : 8 }}
        >
          {processedPhoto ? (
            <img
              src={processedPhoto}
              alt={user.name}
              className="w-full h-full object-cover"
              draggable={false}
            />
          ) : user.photo ? null : (
            <DefaultSilhouette size={frameSize - (size === "sm" ? 4 : 16)} />
          )}
        </div>

        {/* Armor overlay */}
        {size !== "sm" && <ArmorOverlay itemId={overlays.body?.id} size={frameSize} />}

        {/* Helmet overlay */}
        {size !== "sm" && <HelmetOverlay itemId={overlays.head?.id} size={frameSize} />}

        {/* Frame */}
        <SkyrimFrame size={frameSize} levelTier={levelTier} hasPhoto={!!user.photo} />

        {/* Legendary pulse animation */}
        {isLegendary && (
          <div
            className="absolute inset-0 rounded-lg animate-pulse pointer-events-none"
            style={{
              boxShadow: `inset 0 0 20px ${levelTier.glow}, 0 0 20px ${levelTier.glow}`,
              margin: size === "sm" ? 2 : 8,
            }}
          />
        )}

        {/* Canvas for processing (hidden) */}
        <canvas ref={canvasRef} className="hidden" />
      </div>

      {/* Upload button */}
      {editable && (
        <>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="absolute -bottom-2 -right-2 w-9 h-9 rounded-full bg-purple-600 hover:bg-purple-500 border-2 border-gray-900 flex items-center justify-center text-white text-sm transition-all shadow-lg z-20"
            title="Enviar foto"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
              <circle cx="12" cy="13" r="4" />
            </svg>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
        </>
      )}

      {/* Level badge */}
      {size !== "sm" && (
        <div
          className="absolute -top-1 -right-1 z-20 px-2 py-0.5 rounded-full text-xs font-bold border"
          style={{
            backgroundColor: `${levelTier.color}22`,
            borderColor: `${levelTier.color}66`,
            color: levelTier.color,
          }}
        >
          Lv.{user.level}
        </div>
      )}
    </div>
  );
}
