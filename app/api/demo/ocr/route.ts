import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    documentId: "demo-1099-nec",
    detectedForm: "1099-NEC",
    confidence: 0.982,
    normalizedFields: {
      payerName: "DoorDash, Inc.",
      recipientTin: "***-**-6789",
      nonemployeeCompensation: 18250.45,
      stateWithholding: 1240.33
    },
    processingTimeMs: 742
  });
}
