import type { Metadata } from "next";

import { AccessibilityPage } from "@/components/pages/accessibility-page";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Accessibility at TaxHelp AI",
  description: "Learn how TaxHelp AI designs an inclusive tax filing experience with WCAG 2.1 AA support and rapid remediation.",
  path: "/accessibility",
});

export default function Page() {
  return <AccessibilityPage />;
}
