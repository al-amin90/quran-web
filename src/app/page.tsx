import { SurahList } from "../components/SurahList";
import { surahService } from "../modules/surahs/surahs.service";

export const dynamic = "force-static";

export default function HomePage() {
  const surahs = surahService.getAllSurahs();

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-2">القرآن الكريم</h1>
      <p className="text-center text-gray-500 mb-8">
        The Holy Quran — 114 Surahs
      </p>
      <SurahList surahs={surahs} />
    </main>
  );
}
