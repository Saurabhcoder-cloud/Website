import type { Metadata } from "next";

import { LegalContent } from "@/components/pages/legal-content";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Review how TaxHelp AI collects, uses, and retains information across the demo and filing experiences.",
  alternates: { canonical: "https://www.taxhelp.ai/legal/privacy" }
};

export default function PrivacyPolicyPage() {
  return <LegalContent type="privacy" />;
}
