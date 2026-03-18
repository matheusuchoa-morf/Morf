"use client";

import { useEffect, useState } from "react";

interface XpNotificationProps {
  xp: number;
  message?: string;
  onDone: () => void;
}

export default function XpNotification({ xp, message, onDone }: XpNotificationProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onDone, 300);
    }, 2500);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <div
      className={`fixed top-6 right-6 z-50 transition-all duration-300 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
      }`}
    >
      <div className="bg-gray-800 border border-purple-500/50 rounded-xl px-6 py-4 shadow-lg shadow-purple-500/20">
        <div className="flex items-center gap-3">
          <span className="text-2xl">✨</span>
          <div>
            <p className="text-lg font-bold text-purple-300">+{xp} XP</p>
            {message && <p className="text-sm text-gray-400">{message}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
