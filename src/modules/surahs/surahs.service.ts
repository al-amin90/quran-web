/* eslint-disable @typescript-eslint/no-explicit-any */
import { ISurah, ITranslation, IVerse } from "@/src/types/quran";
import quranData from "../../data/quran.json";
import translations from "../../data/en.json";

const raw = quranData as any[];
const trans = translations as Record<string, ITranslation[]>;

const getAllSurahs = (): Omit<ISurah, "verses">[] => {
  return raw.map(
    ({ id, name, transliteration, translation, type, total_verses }) => ({
      id,
      name,
      transliteration,
      translation,
      type,
      total_verses,
    }),
  );
};

const getSurahById = (id: number): ISurah | null => {
  const surah = raw.find((s) => s.id === id);

  if (!surah) return null;

  const verses: IVerse[] = surah.verses.map((v: any) => {
    const surahTrans = trans[String(id)] ?? [];
    const translationObj = surahTrans.find((t) => t.verse === v.id);

    return {
      id: v.id,
      text: v.text,
      translation: translationObj?.text ?? "",
    };
  });

  return { ...surah, verses };
};

const searchVerses = (
  query: string,
): {
  surahId: number;
  surahName: string;
  surahTransliteration: string;
  verse: IVerse;
}[] => {
  if (!query || query.trim().length < 2) return [];
  const q = query.toLowerCase().trim();
  const results: ReturnType<typeof searchVerses> = [];

  for (const surah of raw) {
    const surahTrans = trans[String(surah.id)] ?? [];

    for (const verse of surah.verses) {
      const translationObj = surahTrans.find((t) => t.verse === verse.id);
      const translation = translationObj?.text ?? "";

      if (translation?.toLowerCase().includes(q)) {
        results.push({
          surahId: surah.id,
          surahName: surah.name,
          surahTransliteration: surah.transliteration,
          verse: { id: verse.id, text: verse.text, translation },
        });
        if (results.length >= 50000) return results; // cap at 50
      }
    }
  }
  return results;
};

export const surahService = { getAllSurahs, getSurahById, searchVerses };
