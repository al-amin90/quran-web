"use client";

import { useSettings } from "../hooks/useSettings";
import { IVerse } from "../types/quran";

export default function AyatList({ verses }: { verses: IVerse[] }) {
  const { settings } = useSettings();

  return (
    <div className="flex flex-col gap-6">
      {verses.map((verse) => (
        <div
          key={verse.id}
          id={`ayat-${verse.id}`}
          className="p-5 rounded-2xl border border-gray-100 hover:border-emerald-200 hover:shadow-sm transition-all"
        >
          {/* Verse number badge */}
          <div className="flex justify-between items-center mb-4">
            <span className="text-xs text-gray-400 font-medium">
              Translation
            </span>
            <span className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-sm font-bold text-emerald-700">
              {verse.id}
            </span>
          </div>

          {/* Arabic text */}
          <p
            className="text-right leading-loose mb-4 text-gray-900"
            style={{
              fontFamily: `"${settings.arabicFont}", serif`,
              fontSize: settings.arabicFontSize + "px",
              direction: "rtl",
            }}
          >
            {verse.text}
          </p>

          <hr className="border-gray-100 mb-4" />

          {/* Translation */}
          <p
            className="text-gray-600 leading-relaxed"
            style={{ fontSize: settings.translationFontSize + "px" }}
          >
            {verse.translation}
          </p>
        </div>
      ))}
    </div>
  );
}
