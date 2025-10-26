import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

import { GoogleTagManager } from "@/components/analytics/gtm";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

const appName = process.env.NEXT_PUBLIC_APP_NAME ?? "TaxHelp AI";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.taxhelp.ai"),
  title: {
    default: `${appName} | Explainable Tax Automation`,
    template: `%s | ${appName}`
  },
  description:
    "File accurate U.S. taxes with AI that maps W-2 and gig income to IRS/FTB forms, explains every step, and keeps consent by design.",
  openGraph: {
    title: `${appName} | Explainable Tax Automation`,
    description:
      "Guided demo, transparent pricing, and enterprise security for TaxHelp AI—built for gig workers, students, and retirees.",
    url: "https://www.taxhelp.ai",
    siteName: appName,
    images: [
      {
        url: "/placeholder.svg",
        width: 1200,
        height: 630,
        alt: `${appName} marketing preview`
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: `${appName} | Explainable Tax Automation`,
    description:
      "See how TaxHelp AI turns W-2 and 1099 data into IRS-ready returns with a consent-focused workflow.",
    images: ["/placeholder.svg"],
    site: "@taxhelpai"
  },
  alternates: {
    canonical: "https://www.taxhelp.ai"
  }
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#1d4ed8" },
    { media: "(prefers-color-scheme: dark)", color: "#1e293b" }
  ]
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} flex min-h-screen flex-col bg-background text-foreground`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <GoogleTagManager />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster richColors position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
