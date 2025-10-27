import type { Metadata } from "next";

import { ServerErrorPage } from "@/components/pages/error-pages";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Server error",
  description: "Something went wrong while rendering TaxHelp AI. Reload the page or contact support if the issue persists.",
  path: "/500",
});

export default function Page() {
  return <ServerErrorPage />;
}
