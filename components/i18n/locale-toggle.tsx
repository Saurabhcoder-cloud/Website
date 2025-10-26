"use client";

import { Button } from "@/components/ui/button";
import { useLocale, useTranslations } from "./locale-provider";

export function LocaleToggle({ className }: { className?: string }) {
  const { locale, setLocale, detectedLocale } = useLocale();
  const t = useTranslations();

  const languages: { code: "en" | "es"; label: string }[] = [
    { code: "en", label: t.common.languages.en },
    { code: "es", label: t.common.languages.es }
  ];

  return (
    <div className={className}>
      <div className="flex flex-wrap items-center gap-2">
        {languages.map((language) => (
          <Button
            key={language.code}
            type="button"
            variant={locale === language.code ? "gradient" : "outline"}
            size="sm"
            onClick={() => setLocale(language.code)}
          >
            {language.label}
          </Button>
        ))}
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        {t.common.languages.detected.replace("{language}", languages.find((item) => item.code === detectedLocale)?.label ?? "")}
      </p>
    </div>
  );
}
