"use client";

import Link from "next/link";

import { useTranslations } from "@/components/i18n/locale-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function PricingContent() {
  const t = useTranslations();

  return (
    <div className="bg-background py-20">
      <div className="container mx-auto space-y-12 px-4">
        <header className="mx-auto max-w-3xl text-center">
          <Badge variant="outline" className="border-primary/50 text-primary">
            {t.pricing.heroSubtitle}
          </Badge>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            {t.pricing.heroTitle}
          </h1>
        </header>

        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  {t.pricing.tableHeadings.map((heading) => (
                    <TableHead key={heading} className="bg-muted/40 text-foreground">
                      {heading}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {t.pricing.plans.map((plan) => (
                  <TableRow key={plan.name} className="bg-background/80">
                    <TableCell className="font-semibold text-foreground">{plan.name}</TableCell>
                    <TableCell className="text-primary">{plan.price}</TableCell>
                    <TableCell>{plan.bestFor}</TableCell>
                    <TableCell>
                      <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                        {plan.includes.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </TableCell>
                    <TableCell className="text-center">
                      <Button asChild size="sm" className="w-full sm:w-auto">
                        <Link href={`/checkout?plan=${plan.sku}`}>{t.pricing.choosePlan}</Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-muted-foreground">
          {t.pricing.note}
        </p>

        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <p className="text-sm text-muted-foreground">{t.common.footer.ctaSubtitle}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild>
              <Link href="/demo">{t.common.buttons.demo}</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/contact">{t.common.buttons.contact}</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
