import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({
    requestId: "demo-compute-2024",
    metadata: {
      receivedAt: new Date().toISOString(),
      schemaVersion: "2023.1",
      documents: ["w2", "1099-nec", "1099-k"]
    },
    federalReturn: {
      form1040: {
        taxYear: 2023,
        filingStatus: "single",
        lines: {
          "1a": 41250,
          "8": 29850,
          "9": 1250,
          "23": 4200,
          "33": 2100
        }
      },
      scheduleC: {
        grossReceipts: 29850,
        expenses: {
          carAndTruck: 3850,
          contractLabor: 1200,
          utilities: 450
        },
        netProfit: 24350
      },
      scheduleSE: {
        seIncome: 22520,
        socialSecurityTax: 2780,
        medicareTax: 652
      }
    },
    stateReturn: {
      ca540: {
        agi: 41250,
        taxableIncome: 35120,
        tax: 1840,
        withholding: 2025,
        refund: 185
      }
    },
    notices: [
      {
        code: "CA-SDI",
        level: "info",
        message: "California SDI withholding exceeds threshold; carry to Form 540 line 74."
      },
      {
        code: "QBI-THRESH",
        level: "info",
        message: "Qualified Business Income deduction estimate available once 1099-K fees confirmed."
      }
    ]
  });
}
