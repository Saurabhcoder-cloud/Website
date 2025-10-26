import type { Metadata } from "next";

import { PricingContent } from "@/components/pages/pricing-content";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "TaxHelp AI Pricing",
  description:
    "Choose from $9.99, $14.99, and $24.99 TaxHelp AI plans with transparent features for single, gig, and family filers—no hidden fees.",
  path: "/pricing"
});

export default function PricingPage() {
  return <PricingContent />;
}
