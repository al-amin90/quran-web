import { SurahList } from "../components/SurahList";
import { surahService } from "../modules/surahs/surahs.service";

export const dynamic = "force-static";

export default function HomePage() {
  const surahs = surahService.getAllSurahs();

  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-green-500 to-teal-600 mb-4">
            The Holy Quran
          </h2>
          <div className="flex justify-center gap-2 mb-6">
            <div className="h-1 w-12 bg-gradient-to-r from-emerald-500 to-green-400 rounded-full"></div>
            <div className="h-1 w-12 bg-teal-500 rounded-full"></div>
            <div className="h-1 w-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"></div>
          </div>
        </div>
      </div>

      <SurahList surahs={surahs} />
    </main>
  );
}
