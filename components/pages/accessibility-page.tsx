"use client";

import Link from "next/link";

import { useTranslations } from "@/components/i18n/locale-provider";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function AccessibilityPage() {
  const t = useTranslations();

  return (
    <div className="bg-background py-20">
      <div className="container mx-auto space-y-12 px-4">
        <header className="mx-auto max-w-4xl text-center">
          <Badge variant="outline" className="border-primary/50 text-primary">
            {t.accessibility.intro}
          </Badge>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            {t.accessibility.title}
          </h1>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            {t.accessibility.statement}
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-3">
          {t.accessibility.sections.map((section) => (
            <Card key={section.title}>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-foreground">
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  {section.items.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span aria-hidden className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="border-primary/40 bg-primary/5">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-foreground">
              {t.accessibility.contact.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <p>
              <strong className="font-semibold text-foreground">{t.accessibility.contact.emailLabel}</strong>
            </p>
            <p>
              <strong className="font-semibold text-foreground">{t.accessibility.contact.phoneLabel}</strong>
            </p>
            <p>{t.accessibility.contact.response}</p>
            <p>
              {t.accessibility.feedback}{" "}
              <Link href="mailto:accessibility@taxhelp.ai" className="font-medium text-primary underline underline-offset-4">
                accessibility@taxhelp.ai
              </Link>
              .
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
