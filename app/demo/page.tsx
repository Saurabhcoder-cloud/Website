import type { Metadata } from "next";

import { DemoPage } from "@/components/pages/demo-page";

export const metadata: Metadata = {
  title: "Guided Demo",
  description:
    "Walk through TaxHelp AI's 10-step workflow: language selection, secure uploads, OCR, extraction, Q&A, tax summary, draft export, and consent logging.",
  alternates: { canonical: "https://www.taxhelp.ai/demo" }
};

export default function Page() {
  return <DemoPage />;
}
