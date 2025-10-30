"use client";

import { useTranslations } from "@/components/i18n/locale-provider";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ChangelogPage() {
  const t = useTranslations();

  return (
    <div className="bg-background py-20">
      <div className="container mx-auto space-y-12 px-4">
        <header className="mx-auto max-w-3xl text-center">
          <Badge variant="outline" className="border-primary/50 text-primary">
            {t.changelog.intro}
          </Badge>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            {t.changelog.title}
          </h1>
        </header>

        <div className="space-y-6">
          {t.changelog.entries.map((entry) => (
            <Card key={entry.version} className="border-muted/60">
              <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <CardTitle className="text-xl font-semibold text-foreground">
                  {entry.version}
                </CardTitle>
                <span className="text-sm text-muted-foreground">{entry.date}</span>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-2">
                <div>
                  <h2 className="text-sm font-semibold uppercase tracking-wide text-foreground">
                    {t.changelog.highlightLabel}
                  </h2>
                  <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                    {entry.highlights.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span aria-hidden className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h2 className="text-sm font-semibold uppercase tracking-wide text-foreground">
                    {t.changelog.notesLabel}
                  </h2>
                  <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                    {entry.notes.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span aria-hidden className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground">{t.changelog.contactCta}</p>
      </div>
    </div>
  );
}
