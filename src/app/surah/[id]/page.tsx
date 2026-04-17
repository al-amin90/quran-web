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
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-10">
        <h1
          className="text-5xl font-bold mb-2"
          style={{ fontFamily: "Amiri, serif" }}
        >
          {surah.name}
        </h1>
        <p className="text-xl font-semibold text-gray-700">
          {surah.transliteration}
        </p>
        <p className="text-gray-500">{surah.translation}</p>
        <div className="flex items-center justify-center gap-4 mt-3 text-sm text-gray-400">
          <span className="capitalize">{surah.type}</span>
          <span>•</span>
          <span>{surah.total_verses} verses</span>
        </div>
      </div>

      <AyatList verses={surah.verses!} />
    </main>
  );
};

export default SurahPage;
