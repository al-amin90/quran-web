export interface IVerse {
  id: number;
  text: string;
  translation?: string;
}

export interface ISurah {
  id: number;
  name: string;
  transliteration: string;
  translation: string;
  type: "meccan" | "medinan";
  total_verses: number;
  verses?: IVerse[];
}

export interface ITranslation {
  chapter: number;
  verse: number;
  text: string;
}
