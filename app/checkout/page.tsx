import type { Metadata } from "next";

import { CheckoutPage } from "@/components/pages/checkout-page";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Checkout | TaxHelp AI",
  description: "Complete a secure TaxHelp AI checkout with Stripe, consent tracking, and transparent pricing for every plan.",
  path: "/checkout",
});

export default function Page() {
  return <CheckoutPage />;
}
