"use client";

import { useTranslations } from "@/components/i18n/locale-provider";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function FAQPage() {
  const t = useTranslations();

  return (
    <div className="bg-background py-20">
      <div className="container mx-auto space-y-12 px-4">
        <header className="mx-auto max-w-3xl text-center">
          <Badge variant="outline" className="border-primary/50 text-primary">
            {t.faq.intro}
          </Badge>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            {t.faq.title}
          </h1>
        </header>

        <div className="grid gap-8 md:grid-cols-2">
          {t.faq.categories.map((category, categoryIndex) => (
            <section key={category.title} aria-labelledby={`faq-${categoryIndex}`} className="rounded-lg border bg-card p-6">
              <h2 id={`faq-${categoryIndex}`} className="text-xl font-semibold text-foreground">
                {category.title}
              </h2>
              <Accordion type="single" collapsible className="mt-4 space-y-2">
                {category.items.map((item, itemIndex) => (
                  <AccordionItem key={item.question} value={`item-${categoryIndex}-${itemIndex}`}>
                    <AccordionTrigger className="text-left text-sm font-medium text-foreground">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
