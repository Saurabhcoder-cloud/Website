import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

import { AnalyticsManager } from "@/components/analytics/analytics-manager";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { LocaleProvider } from "@/components/i18n/locale-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { APPLE_ICON_DATA_URI, FAVICON_DATA_URI, OG_IMAGE_DATA_URI } from "@/lib/inline-assets";

const inter = Inter({ subsets: ["latin"] });

const appName = process.env.NEXT_PUBLIC_APP_NAME ?? "TaxHelp AI";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.taxhelp.ai"),
  title: {
    default: `${appName} | Smart, Simple & Affordable Tax Filing`,
    template: `%s | ${appName}`
  },
  description:
    "TaxHelp AI delivers guided U.S. tax prep with clear explanations, secure consent controls, and transparent pricing for gig workers, students, and retirees.",
  openGraph: {
    title: `${appName} | Smart, Simple & Affordable Tax Filing`,
    description:
      "See how TaxHelp AI automates W-2 and 1099 workflows into IRS and California returns with explainable AI and built-in privacy controls.",
    url: "https://www.taxhelp.ai",
    siteName: appName,
    images: [
      {
        url: OG_IMAGE_DATA_URI,
        width: 1200,
        height: 630,
        alt: `${appName} product preview`,
        type: "image/svg+xml"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: `${appName} | Smart, Simple & Affordable Tax Filing`,
    description:
      "Guided demo, transparent pricing, and enterprise security from TaxHelp AI's explainable tax assistant.",
    images: [
      {
        url: OG_IMAGE_DATA_URI,
        alt: `${appName} product preview`,
        type: "image/svg+xml"
      }
    ],
    site: "@taxhelpai"
  },
  alternates: {
    canonical: "https://www.taxhelp.ai"
  },
  icons: {
    icon: [
      { url: FAVICON_DATA_URI, type: "image/svg+xml" }
    ],
    apple: [{ url: APPLE_ICON_DATA_URI, sizes: "180x180", type: "image/svg+xml" }],
    shortcut: [FAVICON_DATA_URI]
  }
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#004AAD" },
    { media: "(prefers-color-scheme: dark)", color: "#0F172A" }
  ]
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} flex min-h-screen flex-col bg-background text-foreground`}>
        <a
          href="#main-content"
          className="skip-link focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          Skip to main content
        </a>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <LocaleProvider>
            <AnalyticsManager />
            <Header />
            <main id="main-content" className="flex-1">
              {children}
            </main>
            <Footer />
            <Toaster richColors position="top-right" />
          </LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
