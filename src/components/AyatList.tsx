"use client";

import { IVerse } from "@/src/types/quran";
import { useSettings } from "../providers/SettingsProvider";

export default function AyatList({ verses }: { verses: IVerse[] }) {
  const { settings, mounted } = useSettings();

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex flex-col gap-6">
      {verses.map((verse, index) => (
        <div
          key={verse.id}
          id={`ayat-${verse.id}`}
          className="group p-6 rounded-2xl bg-white border-2 border-emerald-200 hover:border-emerald-400 hover:shadow-lg hover:shadow-emerald-200/40 transition-all duration-300"
          style={{
            animation: `slideIn 0.5s ease-out ${index * 50}ms forwards`,
            opacity: 0,
          }}
        >
          {/* Background accent on hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-50/0 via-emerald-50/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none"></div>

          {/* Verse Header */}
          <div className="flex justify-between items-center mb-5 relative z-10">
            <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">
              Translation
            </span>
            <span className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-sm font-bold text-white shadow-md">
              {verse.id}
            </span>
          </div>

          {/* Arabic Text Section */}
          <div className="mb-5 pb-5 border-b-2 border-emerald-100 group-hover:border-emerald-200 transition-colors">
            <p
              className="text-right leading-loose text-emerald-950 font-medium"
              style={{
                fontFamily: `"${settings.arabicFont}", serif`,
                fontSize: `${settings.arabicFontSize}px`,
                direction: "rtl",
              }}
            >
              {verse.text}
            </p>
          </div>

          {/* Translation Section */}
          <p
            className="text-emerald-700/95 leading-relaxed text-left"
            style={{ fontSize: `${settings.translationFontSize}px` }}
          >
            {verse.translation}
          </p>
        </div>
      ))}

      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}
