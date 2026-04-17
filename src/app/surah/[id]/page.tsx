import { notFound } from "next/navigation";
import { surahService } from "@/src/modules/surahs/surahs.service";
import AyatList from "@/src/components/AyatList";

export async function generateStaticParams() {
  return surahService.getAllSurahs().map((s) => ({ id: String(s.id) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const surah = surahService.getSurahById(Number(id));
  if (!surah) return {};

  return { title: `${surah.transliteration} — ${surah.translation}` };
}

const SurahPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const surah = surahService.getSurahById(Number(id));
  if (!surah) notFound();

  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header Section */}
        <div className="text-center mb-12 pb-8 border-b-2 border-emerald-200">
          {/* Surah Number Badge */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">{surah.id}</span>
            </div>
          </div>

          {/* Arabic Name */}
          <h1
            className="text-5xl md:text-6xl font-bold mb-3 text-emerald-900"
            style={{ fontFamily: "Amiri, serif" }}
          >
            {surah.name}
          </h1>

          {/* Decorative Line */}
          <div className="flex justify-center gap-2 mb-6">
            <div className="h-1 w-12 bg-gradient-to-r from-emerald-500 to-green-400 rounded-full"></div>
            <div className="h-1 w-12 bg-teal-500 rounded-full"></div>
            <div className="h-1 w-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"></div>
          </div>

          {/* Transliteration */}
          <p className="text-2xl font-semibold text-emerald-700 mb-2">
            {surah.transliteration}
          </p>

          {/* Translation */}
          <p className="text-emerald-600/90 text-lg mb-6 max-w-2xl mx-auto leading-relaxed">
            {surah.translation}
          </p>

          {/* Metadata */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-6">
            {/* Type Badge */}
            <div
              className={`px-4 py-2 rounded-full font-semibold transition-all ${
                surah.type === "meccan"
                  ? "bg-blue-100 text-blue-700 border border-blue-300"
                  : "bg-emerald-100 text-emerald-700 border border-emerald-300"
              }`}
            >
              {surah.type === "meccan" ? "🕌 Meccan" : "🏛️ Medinan"}
            </div>

            <div className="hidden sm:block text-emerald-300">•</div>

            {/* Verse Count */}
            <div className="px-4 py-2 rounded-full font-semibold bg-teal-100 text-teal-700 border border-teal-300">
              📖 {surah.total_verses} Verses
            </div>
          </div>
        </div>

        {/* Verses Section */}
        <AyatList verses={surah.verses!} />
      </div>
    </main>
  );
};

export default SurahPage;
