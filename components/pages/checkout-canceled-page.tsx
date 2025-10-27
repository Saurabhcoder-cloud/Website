"use client";

import Link from "next/link";

import { useTranslations } from "@/components/i18n/locale-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function CheckoutCanceledPage() {
  const t = useTranslations();

  return (
    <div className="bg-background py-20">
      <div className="container mx-auto max-w-3xl space-y-8 px-4 text-center">
        <Badge variant="outline" className="border-primary/50 text-primary">
          {t.checkoutCanceled.title}
        </Badge>
        <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          {t.checkoutCanceled.description}
        </h1>
        <ul className="mx-auto max-w-2xl space-y-3 text-sm text-muted-foreground">
          {t.checkoutCanceled.suggestions.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <div className="flex flex-wrap justify-center gap-3">
          <Button asChild>
            <Link href="/checkout">{t.checkoutCanceled.retry}</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="mailto:billing@taxhelp.ai">{t.checkoutCanceled.contact}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
