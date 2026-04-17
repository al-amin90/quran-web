import { ISurah } from "@/src/types/quran";
import Link from "next/link";

interface SurahListProps {
  surahs: Omit<ISurah, "verses">[];
}

export function SurahList({ surahs }: SurahListProps) {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 max-w-7xl mx-auto">
        {surahs.map((surah, index) => (
          <div
            key={surah.id}
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 p-6 border-2 border-emerald-200 hover:border-emerald-400 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-200/50"
            style={{
              animation: `fadeInUp 0.5s ease-out ${index * 50}ms forwards`,
              opacity: 0,
            }}
          >
            {/* Background Gradient Accent */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/8 via-transparent to-teal-400/8 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            {/* Content */}
            <div className="relative z-10">
              {/* Surah Number and Type Badge */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  {/* Surah Number Circle */}
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center flex-shrink-0 shadow-lg">
                    <span className="text-white font-bold text-sm">
                      {surah.id}
                    </span>
                  </div>
                </div>

                {/* Type Badge */}
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-all duration-300 ${
                    surah.type === "meccan"
                      ? "bg-blue-100 text-blue-700 border border-blue-300"
                      : "bg-emerald-100 text-emerald-700 border border-emerald-300"
                  }`}
                >
                  {surah.type === "meccan" ? "Meccan" : "Medinan"}
                </span>
              </div>

              {/* Arabic Name */}
              <h3 className="text-2xl font-bold text-emerald-900 mb-2 text-right group-hover:text-emerald-600 transition-colors duration-300">
                {surah.name}
              </h3>

              {/* Transliteration */}
              <p className="text-emerald-700 font-semibold text-sm mb-1">
                {surah.transliteration}
              </p>

              {/* Translation */}
              {surah.translation && (
                <p className="text-emerald-600/90 text-sm mb-4 leading-relaxed">
                  {surah.translation}
                </p>
              )}

              {/* Verse Count */}
              <div className="mt-6 pt-4 border-t border-emerald-200">
                <div className="flex justify-between items-center">
                  <span className="text-emerald-700/80 text-sm font-medium">
                    Total Verses
                  </span>
                  <span className="text-emerald-600 font-bold text-lg">
                    {surah.total_verses}
                  </span>
                </div>
              </div>

              {/* CTA Button */}
              <Link href={`/surah/${surah.id}`}>
                <button className="w-full mt-4 cursor-pointer py-2 px-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-2xl hover:shadow-emerald-400/50 transition-all duration-300 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative">Read Surah</span>
                </button>
              </Link>
            </div>

            {/* Decorative Corner Element */}
            <div className="absolute -top-1 -right-1 w-20 h-20 bg-gradient-to-br from-emerald-400/15 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        ))}
      </div>

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
