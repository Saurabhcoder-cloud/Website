import type { Metadata } from "next";

import { LegalContent } from "@/components/pages/legal-content";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Understand the terms that govern your use of TaxHelp AI demos and filing products.",
  alternates: { canonical: "https://www.taxhelp.ai/legal/terms" }
};

export default function TermsPage() {
  return <LegalContent type="terms" />;
}
