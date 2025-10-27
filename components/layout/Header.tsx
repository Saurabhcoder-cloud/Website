"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { CTAButton } from "@/components/ui/cta-button";
import { Button } from "@/components/ui/button";
import { useTranslations } from "@/components/i18n/locale-provider";
import { LogoMark } from "@/components/graphics/logo-mark";

export function Header() {
  const pathname = usePathname();
  const t = useTranslations();
  const navItems = [
    { href: "/demo", label: t.common.nav.demo },
    { href: "/pricing", label: t.common.nav.pricing },
    { href: "/security", label: t.common.nav.security },
    { href: "/faq", label: t.common.nav.faq },
    { href: "/contact", label: t.common.nav.contact },
    { href: "/checkout", label: t.common.nav.checkout }
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary/10 bg-background/95 shadow-lg backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-3" aria-label="TaxHelp AI home">
          <LogoMark className="h-10 w-10" />
          <span className="text-xl font-semibold tracking-tight text-foreground">
            {t.common.brandName}
          </span>
        </Link>

        <nav className="hidden items-center gap-2 md:flex" aria-label="Primary navigation">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-2xl px-4 py-2 text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/40 focus-visible:ring-offset-2 ${
                  isActive
                    ? "bg-primary/10 text-primary shadow-inner"
                    : "text-muted-foreground hover:bg-primary/5 hover:text-primary"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/demo">{t.common.buttons.demo}</Link>
          </Button>
          <CTAButton size="sm" asChild>
            <Link href="/contact">{t.common.buttons.contact}</Link>
          </CTAButton>
        </div>
      </div>
    </header>
  );
}
