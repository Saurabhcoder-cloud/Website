"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

import { defaultLocale, isLocale, translations, type Locale, type Translation } from "@/lib/i18n";

type LocaleContextValue = {
  locale: Locale;
  detectedLocale: Locale;
  setLocale: (locale: Locale) => void;
  translation: Translation;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>(defaultLocale);
  const [detectedLocale, setDetectedLocale] = useState<Locale>(defaultLocale);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const stored = window.localStorage.getItem("taxhelpai.locale");
    if (isLocale(stored)) {
      setLocale(stored);
      setDetectedLocale(stored);
      return;
    }

    const browserLanguage = window.navigator.language?.slice(0, 2).toLowerCase();
    if (isLocale(browserLanguage)) {
      setLocale(browserLanguage);
      setDetectedLocale(browserLanguage);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem("taxhelpai.locale", locale);
    window.document.documentElement.lang = locale;
  }, [locale]);

  const value = useMemo<LocaleContextValue>(
    () => ({
      locale,
      detectedLocale,
      setLocale,
      translation: translations[locale]
    }),
    [locale, detectedLocale]
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return context;
}

export function useTranslations() {
  const { translation } = useLocale();
  return translation;
}
