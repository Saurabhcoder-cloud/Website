import type { Metadata } from "next";

import { ContactPage } from "@/components/pages/contact-page";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Contact TaxHelp AI",
  description: "Reach TaxHelp AI for support, partnerships, media, or product questions via email, chat, or the secure request form.",
  path: "/contact"
});

export default function Page() {
  return <ContactPage />;
}
