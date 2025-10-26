import type { Metadata } from "next";

import { SecurityContent } from "@/components/pages/security-content";

export const metadata: Metadata = {
  title: "Security",
  description: "Learn how TaxHelp AI handles encryption, consent, retention, and upcoming IRS e-file alignment.",
  alternates: { canonical: "https://www.taxhelp.ai/security" }
};

export default function SecurityPage() {
  return <SecurityContent />;
}
