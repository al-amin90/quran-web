import { NextResponse } from "next/server";

import { surahService } from "@/src/modules/surahs/surahs.service";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") ?? "";
  const results = surahService.searchVerses(q);
  return NextResponse.json({
    success: true,
    data: results,
    count: results.length,
  });
}
