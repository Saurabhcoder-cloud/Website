import { NextResponse } from "next/server";

import { demoOcrResponse } from "@/lib/contracts";

export async function POST() {
  return NextResponse.json(demoOcrResponse);
}
