import type { Metadata } from "next";

import { PricingContent } from "@/components/pages/pricing-content";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Flat plans from $9.99 to $24.99 with no hidden fees. Choose the TaxHelp AI tier that fits your filing needs.",
  alternates: { canonical: "https://www.taxhelp.ai/pricing" }
};

export default function PricingPage() {
  return <PricingContent />;
}
