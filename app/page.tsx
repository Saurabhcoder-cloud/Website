import type { Metadata } from "next";

import { HomePage } from "@/components/pages/home-page";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "TaxHelp AI — Smart, Simple & Affordable Tax Filing (USA)",
  description:
    "TaxHelp AI combines guided AI explanations with secure consent controls so gig workers, students, and retirees can file U.S. taxes confidently.",
  path: "/"
});

export default function Page() {
  return <HomePage />;
}
