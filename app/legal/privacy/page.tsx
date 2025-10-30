import type { Metadata } from "next";

import { LegalContent } from "@/components/pages/legal-content";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "TaxHelp AI Privacy Policy",
  description:
    "Understand how TaxHelp AI collects, uses, stores, and deletes information across demo and production filing workflows.",
  path: "/legal/privacy"
});

export default function PrivacyPolicyPage() {
  return <LegalContent type="privacy" />;
}
