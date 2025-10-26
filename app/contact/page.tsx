import type { Metadata } from "next";

import { ContactPage } from "@/components/pages/contact-page";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with TaxHelp AI for sales, partnerships, support, and media inquiries.",
  alternates: { canonical: "https://www.taxhelp.ai/contact" }
};

export default function Page() {
  return <ContactPage />;
}
