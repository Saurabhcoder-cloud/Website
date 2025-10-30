import type { Metadata } from "next";

import { ReceiptPage } from "@/components/pages/receipt-page";
import { createMetadata } from "@/lib/metadata";

interface PageProps {
  params: { orderId: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const orderId = decodeURIComponent(params.orderId);
  return createMetadata({
    title: `Receipt ${orderId} | TaxHelp AI`,
    description: "View your TaxHelp AI demo receipt with secure download links and checkout details.",
    path: `/receipt/${orderId}`,
  });
}

export default function Page({ params }: PageProps) {
  const orderId = decodeURIComponent(params.orderId);
  return <ReceiptPage orderId={orderId} />;
}
