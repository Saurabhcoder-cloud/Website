"use client";

import { useTranslations } from "@/components/i18n/locale-provider";
import { Badge } from "@/components/ui/badge";

type LegalType = "privacy" | "terms";

type LegalContentProps = {
  type: LegalType;
};

export function LegalContent({ type }: LegalContentProps) {
  const t = useTranslations();
  const content = t.legal[type];

  return (
    <main className="bg-background py-16">
      <div className="container mx-auto px-4">
        <header className="mx-auto max-w-3xl text-center">
          <Badge variant="outline" className="border-primary/40 text-primary">
            {content.updated}
          </Badge>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">{content.title}</h1>
          <p className="mt-6 text-base text-muted-foreground">{content.intro}</p>
        </header>

        <section className="mt-12 space-y-10">
          {content.sections.map((section) => (
            <article key={section.title} className="mx-auto max-w-3xl space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">{section.title}</h2>
              <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
