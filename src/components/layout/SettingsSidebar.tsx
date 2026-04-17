/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useSettings } from "@/src/providers/SettingsProvider";
import Image from "next/image";
import { useEffect, useState } from "react";

const ARABIC_FONTS = [
  { value: "Amiri", label: "Amiri" },
  { value: "Noto Naskh Arabic", label: "Noto Naskh" },
  { value: "Cairo", label: "Cairo" },
];

const SettingsSidebar = () => {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { settings, update } = useSettings();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setOpen(true)}
        className=" animate-spin cursor-pointer z-40 w-9 h-9 md:w-10 md:h-10 rounded-full bg-emerald-600 text-white shadow-lg flex items-center justify-center hover:bg-emerald-700 transition-all"
        title="Settings"
      >
        <Image src={"/settings.svg"} width={40} height={40} alt="setting" />
      </button>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 z-40 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed right-0 top-0 h-full w-80 bg-gradient-to-b from-emerald-50 to-teal-50 shadow-2xl z-50 transition-transform duration-300 flex flex-col ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-5 border-b-2 border-emerald-200 bg-white">
          <h2 className="font-bold text-lg text-emerald-900">
            Display Settings
          </h2>
          <button
            onClick={() => setOpen(false)}
            className="text-gray-400 hover:text-emerald-600 text-xl transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-7">
          {/* Arabic Font */}
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-emerald-700 block mb-3">
              Arabic Font
            </label>
            <div className="flex flex-col gap-2">
              {ARABIC_FONTS.map((f) => (
                <button
                  key={f.value}
                  onClick={() => update({ arabicFont: f.value as any })}
                  className={`p-3 rounded-xl border-2 transition-all ${
                    settings.arabicFont === f.value
                      ? "border-emerald-500 bg-white shadow-md"
                      : "border-emerald-200 hover:border-emerald-300 bg-white/50"
                  }`}
                >
                  <span
                    style={{
                      fontFamily: f.value + ", serif",
                      fontSize: "1.4rem",
                    }}
                  >
                    بِسْمِ اللَّهِ
                  </span>
                  <p
                    className={`text-xs text-left mt-1 font-semibold ${
                      settings.arabicFont === f.value
                        ? "text-emerald-700"
                        : "text-emerald-600"
                    }`}
                  >
                    {f.label}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Arabic Font Size */}
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-emerald-700 block mb-3">
              Arabic Font Size —{" "}
              <span className="text-emerald-600">
                {settings.arabicFontSize}px
              </span>
            </label>
            <input
              type="range"
              min={18}
              max={48}
              step={2}
              value={settings.arabicFontSize}
              onChange={(e) =>
                update({ arabicFontSize: Number(e.target.value) })
              }
              className="w-full h-2 bg-emerald-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="flex justify-between text-xs text-emerald-600 mt-2 font-semibold">
              <span>18px</span>
              <span>48px</span>
            </div>
            {/* Live preview */}
            <p
              className="mt-4 text-right bg-white border-2 border-emerald-200 rounded-xl p-3 leading-loose text-emerald-950"
              style={{
                fontFamily: settings.arabicFont + ", serif",
                fontSize: settings.arabicFontSize + "px",
              }}
            >
              بِسْمِ اللَّهِ
            </p>
          </div>

          {/* Translation Font Size */}
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-emerald-700 block mb-3">
              Translation Font Size —{" "}
              <span className="text-emerald-600">
                {settings.translationFontSize}px
              </span>
            </label>
            <input
              type="range"
              min={12}
              max={24}
              step={1}
              value={settings.translationFontSize}
              onChange={(e) =>
                update({ translationFontSize: Number(e.target.value) })
              }
              className="w-full h-2 bg-emerald-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="flex justify-between text-xs text-emerald-600 mt-2 font-semibold">
              <span>12px</span>
              <span>24px</span>
            </div>
            <p
              className="mt-4 bg-white border-2 border-emerald-200 rounded-xl p-3 text-emerald-900 leading-relaxed"
              style={{ fontSize: settings.translationFontSize + "px" }}
            >
              In the name of Allah, the Entirely Merciful.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default SettingsSidebar;
