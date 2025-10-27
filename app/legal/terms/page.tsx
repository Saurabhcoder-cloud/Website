import type { Metadata } from "next";

import { LegalContent } from "@/components/pages/legal-content";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "TaxHelp AI Terms of Service",
  description: "Review the demo-only conditions, production filing requirements, and consent obligations for using TaxHelp AI.",
  path: "/legal/terms"
});

export default function TermsPage() {
  return <LegalContent type="terms" />;
}
