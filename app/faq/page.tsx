import type { Metadata } from "next";

import { FAQPage } from "@/components/pages/faq-page";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "TaxHelp AI FAQ",
  description: "Get quick answers about the TaxHelp AI demo, pricing plans, checkout, and compliance safeguards.",
  path: "/faq",
});

export default function Page() {
  return <FAQPage />;
}
