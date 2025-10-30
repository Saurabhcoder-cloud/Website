import type { Metadata } from "next";

import { DemoPage } from "@/components/pages/demo-page";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "TaxHelp AI Guided Demo",
  description:
    "Experience the 10-step TaxHelp AI workflow with language detection, secure uploads, OCR validation, adaptive Q&A, benefit insights, and consent-gated exports.",
  path: "/demo"
});

export default function Page() {
  return <DemoPage />;
}
