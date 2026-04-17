"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Settings } from "../types/quran";

const inisial: Settings = {
  arabicFont: "Amiri",
  arabicFontSize: 28,
  translationFontSize: 16,
};

interface SettingsContextType {
  settings: Settings;
  update: (partial: Partial<Settings>) => void;
  mounted: boolean;
}

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined,
);

const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState<Settings>(inisial);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("quran-settings");
      if (stored) {
        setSettings({ ...DEFAULT, ...JSON.parse(stored) });
      }
    } catch (e) {
      console.error("Failed to load settings:", e);
    }

    setMounted(true);
  }, []);

  const update = (partial: Partial<Settings>) => {
    setSettings((prev) => {
      const next = { ...prev, ...partial };
      try {
        localStorage.setItem("quran-settings", JSON.stringify(next));
      } catch (e) {
        console.error("Failed to save settings:", e);
      }
      return next;
    });
  };

  return (
    <SettingsContext.Provider value={{ settings, update, mounted }}>
      {children}
    </SettingsContext.Provider>
  );
};

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within SettingsProvider");
  }
  return context;
}

export default SettingsProvider;
