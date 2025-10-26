"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useTranslations } from "@/components/i18n/locale-provider";

export function Header() {
  const pathname = usePathname();
  const t = useTranslations();
  const navItems = [
    { href: "/demo", label: t.common.nav.demo },
    { href: "/pricing", label: t.common.nav.pricing },
    { href: "/security", label: t.common.nav.security },
    { href: "/contact", label: t.common.nav.contact },
    { href: "/legal/privacy", label: t.common.nav.privacy }
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/75">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2" aria-label="TaxHelp AI home">
          <div className="gradient-primary flex h-9 w-9 items-center justify-center rounded-lg">
            <ShieldCheck className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-semibold tracking-tight">{t.common.brandName}</span>
        </Link>

        <nav className="hidden gap-6 md:flex" aria-label="Primary">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive ? "text-primary" : "text-muted-foreground"
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
          <Button size="sm" asChild>
            <Link href="/contact">{t.common.buttons.contact}</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
