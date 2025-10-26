"use client";

import Link from "next/link";

import { ShieldCheck } from "lucide-react";

import { useTranslations } from "@/components/i18n/locale-provider";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function SecurityContent() {
  const t = useTranslations();

  return (
    <main className="bg-background py-16">
      <div className="container mx-auto space-y-12 px-4">
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="outline" className="border-primary/40 text-primary">
            {t.security.heroSubtitle}
          </Badge>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            {t.security.heroTitle}
          </h1>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {t.security.bullets.map((bullet) => (
            <Card key={bullet} className="border-primary/20">
              <CardContent className="flex items-start gap-3 p-6 text-sm text-muted-foreground">
                <ShieldCheck className="mt-1 h-5 w-5 text-primary" aria-hidden />
                <span>{bullet}</span>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="space-y-3 p-8 text-left">
            <h2 className="text-2xl font-semibold text-foreground">{t.security.roadmapTitle}</h2>
            <p className="text-sm text-muted-foreground">{t.security.roadmapDescription}</p>
            <Button asChild size="sm" className="mt-4 w-full sm:w-auto">
              <Link href="/legal/privacy">{t.security.ctaLabel}</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
