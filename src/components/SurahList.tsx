import { ISurah } from "@/src/types/quran";
import Link from "next/link";

interface SurahListProps {
  surahs: Omit<ISurah, "verses">[];
}

export function SurahList({ surahs }: SurahListProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 mb-4">
            All Surahs
          </h2>
          <div className="flex justify-center gap-2 mb-6">
            <div className="h-1 w-12 bg-gradient-to-r from-amber-400 to-yellow-300 rounded-full"></div>
            <div className="h-1 w-12 bg-amber-500 rounded-full"></div>
            <div className="h-1 w-12 bg-gradient-to-r from-yellow-300 to-amber-400 rounded-full"></div>
          </div>
          <p className="text-gray-400 text-lg">
            Explore the 114 chapters of the Holy Quran
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {surahs.map((surah, index) => (
            <div
              key={surah.id}
              className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-700 to-slate-800 p-6 border border-amber-500/20 hover:border-amber-400/50 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/20"
              style={{
                animation: `fadeInUp 0.5s ease-out ${index * 50}ms forwards`,
                opacity: 0,
              }}
            >
              {/* Background Gradient Accent */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              {/* Content */}
              <div className="relative z-10">
                {/* Surah Number and Type Badge */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {/* Surah Number Circle */}
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center flex-shrink-0 shadow-lg">
                      <span className="text-slate-900 font-bold text-sm">
                        {surah.id}
                      </span>
                    </div>
                  </div>

                  {/* Type Badge */}
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold transition-all duration-300 ${
                      surah.type === "meccan"
                        ? "bg-blue-500/20 text-blue-300 border border-blue-400/30"
                        : "bg-green-500/20 text-green-300 border border-green-400/30"
                    }`}
                  >
                    {surah.type === "meccan" ? "Meccan" : "Medinan"}
                  </span>
                </div>

                {/* Arabic Name */}
                <h3 className="text-2xl font-bold text-white mb-2 text-right group-hover:text-amber-300 transition-colors duration-300">
                  {surah.name}
                </h3>

                {/* Transliteration */}
                <p className="text-amber-400/90 font-semibold text-sm mb-1">
                  {surah.transliteration}
                </p>

                {/* Translation */}
                {surah.translation && (
                  <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                    {surah.translation}
                  </p>
                )}

                {/* Verse Count */}
                <div className="mt-6 pt-4 border-t border-amber-500/20">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Total Verses</span>
                    <span className="text-amber-400 font-bold text-lg">
                      {surah.total_verses}
                    </span>
                  </div>
                </div>

                {/* CTA Button */}
                <Link href={`/surah/${surah.id}`}>
                  <button className="w-full mt-4 cursor-pointer py-2 px-4 bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-900 font-semibold rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-105 shadow-lg hover:shadow-amber-500/50">
                    Read Surah
                  </button>
                </Link>
              </div>

              {/* Decorative Corner Element */}
              <div className="absolute -top-1 -right-1 w-20 h-20 bg-gradient-to-br from-amber-500/10 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
