import { NextResponse } from "next/server";

import { demoComputeOutput } from "@/lib/contracts";

export async function POST() {
  return NextResponse.json(demoComputeOutput);
}
