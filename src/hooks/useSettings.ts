"use client";

import { useState, useEffect } from "react";
import { Settings } from "@/types/quran";

const DEFAULT: Settings = {
  arabicFont: "Amiri",
  arabicFontSize: 28,
  translationFontSize: 16,
};

export function useSettings() {
  const [settings, setSettings] = useState<Settings>(DEFAULT);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("quran-settings");
      if (stored) setSettings({ ...DEFAULT, ...JSON.parse(stored) });
    } catch {}
    setMounted(true);
  }, []);

  const update = (partial: Partial<Settings>) => {
    setSettings((prev) => {
      const next = { ...prev, ...partial };
      localStorage.setItem("quran-settings", JSON.stringify(next));
      return next;
    });
  };

  return { settings, update, mounted };
}
