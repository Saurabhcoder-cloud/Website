import type { Metadata } from "next";

import { CheckoutCanceledPage } from "@/components/pages/checkout-canceled-page";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Checkout canceled",
  description: "Resume your TaxHelp AI purchase or contact billing support if your Stripe session was canceled.",
  path: "/checkout/canceled",
});

export default function Page() {
  return <CheckoutCanceledPage />;
}
