import { NextResponse } from "next/server";
import { surahService } from "@/src/modules/surahs/surahs.service";

export async function GET() {
  const surahs = surahService.getAllSurahs();
  return NextResponse.json({ success: true, data: surahs });
}
