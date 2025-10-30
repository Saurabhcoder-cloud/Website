import type { Metadata } from "next";

import { NotFoundPage } from "@/components/pages/error-pages";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Page not found",
  description: "The page you’re looking for isn’t available. Return to TaxHelp AI to keep exploring the demo and pricing.",
  path: "/404",
});

export default function Page() {
  return <NotFoundPage />;
}
