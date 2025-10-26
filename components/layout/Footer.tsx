import Link from "next/link";
import { ShieldCheck } from "lucide-react";

import { useTranslations } from "@/components/i18n/locale-provider";
import type { Translation } from "@/lib/i18n";

const footerLinks = [
  {
    title: "Product",
    items: [
      { key: "common.nav.demo", href: "/demo" },
      { key: "common.nav.pricing", href: "/pricing" },
      { key: "common.nav.security", href: "/security" }
    ]
  },
  {
    title: "Company",
    items: [
      { key: "common.nav.contact", href: "/contact" },
      { key: "legal.terms.title", href: "/legal/terms" },
      { key: "common.nav.privacy", href: "/legal/privacy" }
    ]
  }
] as const;

function resolveLabel(path: string | undefined, fallback: string | undefined, t: Translation) {
  if (!path) return fallback ?? "";
  const segments = path.split(".");
  let current: any = t;
  for (const segment of segments) {
    current = current?.[segment];
  }
  return typeof current === "string" ? current : fallback ?? "";
}

export function Footer() {
  const t = useTranslations();

  return (
    <footer className="border-t bg-muted/40 text-muted-foreground">
      <div className="border-b border-border/60 bg-background">
        <div className="container mx-auto flex flex-col gap-6 px-4 py-10 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <div>
            <h2 className="text-2xl font-semibold text-foreground">{t.common.footer.ctaTitle}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{t.common.footer.ctaSubtitle}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center rounded-md bg-gradient-to-r from-primary to-primary/80 px-4 py-2 text-sm font-semibold text-primary-foreground shadow"
            >
              {t.common.footer.ctaPrimary}
            </Link>
            <Link
              href="/demo"
              className="inline-flex items-center justify-center rounded-md border border-primary px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary/10"
            >
              {t.common.footer.ctaSecondary}
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-10 md:grid-cols-3 lg:grid-cols-4">
          <div className="space-y-4 text-foreground">
            <Link href="/" className="flex items-center space-x-2" aria-label="TaxHelp AI home">
              <div className="gradient-primary flex h-9 w-9 items-center justify-center rounded-lg">
                <ShieldCheck className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-semibold tracking-tight">{t.common.brandName}</span>
            </Link>
            <p className="text-sm">{t.common.footer.tagline}</p>
            <p className="text-xs text-muted-foreground">{t.common.footer.hosting}</p>
          </div>

          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground">{section.title}</h3>
              <ul className="mt-4 space-y-2">
                {section.items.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-sm transition-colors hover:text-primary">
                      {resolveLabel(item.key, item.label, t)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t pt-6 text-center text-xs">
          <p>
            &copy; {new Date().getFullYear()} {t.common.brandName}. {t.common.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
