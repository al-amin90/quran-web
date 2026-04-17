"use client";
import { useSettings } from "@/src/hooks/useSettings";
import { useState } from "react";

const ARABIC_FONTS = [
  { value: "Amiri", label: "Amiri" },
  { value: "Noto Naskh Arabic", label: "Noto Naskh" },
];

const SettingsSidebar = () => {
  const [open, setOpen] = useState(false);
  const { settings, update } = useSettings();

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed right-4 top-1/2 -translate-y-1/2 z-40 w-10 h-10 rounded-full bg-emerald-600 text-white shadow-lg flex items-center justify-center hover:bg-emerald-700 transition-all"
        title="Settings"
      >
        ⚙
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
        className={`fixed right-0 top-0 h-full w-80 bg-white shadow-2xl z-50 transition-transform duration-300 flex flex-col ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-5 border-b">
          <h2 className="font-bold text-lg">Display Settings</h2>
          <button
            onClick={() => setOpen(false)}
            className="text-gray-400 hover:text-gray-600 text-xl"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-7">
          {/* Arabic Font */}
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-gray-500 block mb-3">
              Arabic Font
            </label>
            <div className="flex flex-col gap-2">
              {ARABIC_FONTS.map((f) => (
                <button
                  key={f.value}
                  onClick={() => update({ arabicFont: f.value as any })}
                  className={`p-3 rounded-xl border text-right transition-all ${
                    settings.arabicFont === f.value
                      ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                      : "border-gray-200 hover:border-gray-300"
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
                  <p className="text-xs text-gray-400 text-left mt-1">
                    {f.label}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Arabic Font Size */}
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-gray-500 block mb-3">
              Arabic Font Size — {settings.arabicFontSize}px
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
              className="w-full accent-emerald-500"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>18px</span>
              <span>48px</span>
            </div>
            {/* Live preview */}
            <p
              className="mt-3 text-right bg-gray-50 rounded-xl p-3 leading-loose text-gray-800"
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
            <label className="text-xs font-bold uppercase tracking-widest text-gray-500 block mb-3">
              Translation Font Size — {settings.translationFontSize}px
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
              className="w-full accent-emerald-500"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>12px</span>
              <span>24px</span>
            </div>
            <p
              className="mt-3 bg-gray-50 rounded-xl p-3 text-gray-600 leading-relaxed"
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
