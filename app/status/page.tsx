import type { Metadata } from "next";

import { StatusPage } from "@/components/pages/status-page";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "TaxHelp AI system status",
  description: "Check the live availability of TaxHelp AI marketing, demo, checkout, and AI explanation services.",
  path: "/status",
});

export default function Page() {
  return <StatusPage />;
}
