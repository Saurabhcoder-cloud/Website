import type { Metadata } from "next";

import { SecurityContent } from "@/components/pages/security-content";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "TaxHelp AI Security & Privacy",
  description:
    "Review TaxHelp AI safeguards including HTTPS encryption, masking, consent receipts, retention controls, and upcoming IRS e-file alignment.",
  path: "/security"
});

export default function SecurityPage() {
  return <SecurityContent />;
}
