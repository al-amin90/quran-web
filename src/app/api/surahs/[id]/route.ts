import { NextResponse } from "next/server";
import { surahService } from "@/src/modules/surahs/surahs.service";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const surah = surahService.getSurahById(Number(id));

  if (!surah)
    return NextResponse.json(
      { success: false, message: "Not found" },
      { status: 404 },
    );

  return NextResponse.json({ success: true, data: surah });
}
