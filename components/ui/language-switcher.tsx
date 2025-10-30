"use client";

import { Languages } from "lucide-react";

import { useLocale, useTranslations } from "@/components/i18n/locale-provider";
import { cn } from "@/lib/utils";

import { Badge } from "./badge";
import { Button } from "./button";

export interface LanguageSwitcherProps {
  className?: string;
  showDetectedLabel?: boolean;
}

export function LanguageSwitcher({ className, showDetectedLabel = true }: LanguageSwitcherProps) {
  const { locale, setLocale, detectedLocale } = useLocale();
  const t = useTranslations();

  const languages: { code: "en" | "es"; label: string }[] = [
    { code: "en", label: t.common.languages.en },
    { code: "es", label: t.common.languages.es }
  ];

  const detectedLabel = t.common.languages.detected.replace(
    "{language}",
    languages.find((language) => language.code === detectedLocale)?.label ?? t.common.languages.en
  );

  return (
    <div
      className={cn(
        "space-y-3 rounded-2xl border border-primary/20 bg-white/80 p-4 shadow-lg shadow-primary/10",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Languages className="h-5 w-5" aria-hidden />
          </span>
          <div>
            <p className="text-sm font-semibold text-foreground">{t.demo.language.toggleLabel}</p>
            {showDetectedLabel && <p className="text-xs text-muted-foreground">{detectedLabel}</p>}
          </div>
        </div>
        <Badge className="bg-primary/10 text-primary" variant="secondary">
          {t.common.brandName}
        </Badge>
      </div>
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
    </div>
  );
}

