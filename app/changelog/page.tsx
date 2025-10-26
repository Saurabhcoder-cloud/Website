import type { Metadata } from "next";

import { ChangelogPage } from "@/components/pages/changelog-page";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "TaxHelp AI Changelog",
  description: "Review the product milestones preparing TaxHelp AI for production including checkout, localization, and consent tooling.",
  path: "/changelog",
});

export default function Page() {
  return <ChangelogPage />;
}
