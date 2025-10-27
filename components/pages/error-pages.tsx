"use client";

import Link from "next/link";

import { useTranslations } from "@/components/i18n/locale-provider";
import { Button } from "@/components/ui/button";

export function NotFoundPage() {
  const t = useTranslations();

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center space-y-6 bg-background px-4 text-center">
      <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
        {t.errors.notFoundTitle}
      </h1>
      <p className="max-w-xl text-sm text-muted-foreground">{t.errors.notFoundDescription}</p>
      <Button asChild>
        <Link href="/">{t.errors.notFoundCta}</Link>
      </Button>
    </div>
  );
}

export function ServerErrorPage() {
  const t = useTranslations();

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center space-y-6 bg-background px-4 text-center">
      <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
        {t.errors.serverTitle}
      </h1>
      <p className="max-w-xl text-sm text-muted-foreground">{t.errors.serverDescription}</p>
      <Button onClick={() => window.location.reload()}>{t.errors.serverCta}</Button>
    </div>
  );
}
