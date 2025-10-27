import type { Metadata } from "next";

import { OG_IMAGE_DATA_URI } from "@/lib/inline-assets";

const BASE_URL = "https://www.taxhelp.ai";
const SITE_NAME = process.env.NEXT_PUBLIC_APP_NAME ?? "TaxHelp AI";

interface CreateMetadataOptions {
  title: string;
  description: string;
  path: string;
}

export function createMetadata({ title, description, path }: CreateMetadataOptions): Metadata {
  const url = new URL(path, BASE_URL).toString();

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type: "website",
      images: [
        {
          url: OG_IMAGE_DATA_URI,
          width: 1200,
          height: 630,
          alt: `${title} – TaxHelp AI`,
          type: "image/svg+xml"
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [
        {
          url: OG_IMAGE_DATA_URI,
          alt: `${title} – TaxHelp AI`,
          type: "image/svg+xml"
        }
      ],
      site: "@taxhelpai"
    }
  };
}
