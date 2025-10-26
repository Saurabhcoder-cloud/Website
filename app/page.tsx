"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, Languages, ShieldCheck, Sparkles, Users } from "lucide-react";

import { LocaleToggle } from "@/components/i18n/locale-toggle";
import { useTranslations } from "@/components/i18n/locale-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function HomePage() {
  const t = useTranslations();

  return (
    <div className="bg-background">
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 gradient-hero opacity-10" aria-hidden />
        <div className="container relative z-10 mx-auto flex flex-col gap-12 px-4 lg:flex-row lg:items-center">
          <div className="space-y-6 lg:w-1/2">
            <Badge variant="outline" className="border-primary/50 text-primary">
              {t.home.heroBadge}
            </Badge>
            <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              {t.home.heroTitle}
            </h1>
            <p className="text-lg text-muted-foreground">{t.home.heroSubtitle}</p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button size="lg" asChild>
                <Link href="/pricing" className="flex items-center gap-2">
                  {t.home.primaryCta}
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/demo">{t.home.secondaryCta}</Link>
              </Button>
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-primary" aria-hidden />
                SOC 2-ready evidence
              </span>
              <span className="inline-flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-tax-green" aria-hidden />
                1040 · Schedule C/SE · CA 540
              </span>
              <span className="inline-flex items-center gap-2">
                <Users className="h-4 w-4 text-tax-gold" aria-hidden />
                Built for gig workers, students & retirees
              </span>
            </div>
          </div>

          <Card className="lg:w-5/12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Languages className="h-5 w-5 text-primary" aria-hidden />
                {t.demo.heroTitle}
              </CardTitle>
              <CardDescription>{t.demo.heroSubtitle}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 text-sm text-muted-foreground">
              <p>{t.demo.stepDescriptions.language}</p>
              <LocaleToggle />
              <div className="grid gap-2 sm:grid-cols-3">
                {t.home.miniSteps.map((step) => (
                  <Badge key={step} variant="outline" className="justify-center border-primary/40 text-primary">
                    {step}
                  </Badge>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">
                {t.home.mappingSubtitle}
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="border-t border-b bg-muted/40 py-16">
        <div className="container mx-auto grid gap-6 px-4 md:grid-cols-3">
          <div className="md:col-span-3">
            <h2 className="text-center text-3xl font-semibold text-foreground sm:text-4xl">
              {t.home.personasTitle}
            </h2>
          </div>
          {t.home.personas.map((persona) => (
            <Card key={persona.title} className="border-primary/30">
              <CardHeader className="space-y-3">
                <CardTitle className="text-xl text-foreground">{persona.title}</CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                  {persona.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto space-y-10 px-4">
          <div className="space-y-4 text-center">
            <Badge variant="outline" className="border-primary/50 text-primary">
              {t.home.valueHeading}
            </Badge>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {t.home.valueCards.map((card) => (
              <Card key={card.title} className="border-primary/30">
                <CardHeader>
                  <CardTitle className="text-lg text-foreground">{card.title}</CardTitle>
                  <CardDescription>{card.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-b bg-muted/40 py-20">
        <div className="container mx-auto grid gap-10 px-4 lg:grid-cols-[1.2fr,1fr] lg:items-start">
          <div className="space-y-6">
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              {t.home.stepsTitle}
            </h2>
            <p className="text-lg text-muted-foreground">{t.home.stepsSubtitle}</p>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {t.home.mappingBullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-1 h-4 w-4 text-primary" aria-hidden />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
          <Card className="bg-background">
            <CardHeader>
              <CardTitle className="text-xl text-foreground">{t.home.mappingTitle}</CardTitle>
              <CardDescription>{t.home.mappingSubtitle}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {t.home.miniSteps.map((step, index) => (
                <div key={step} className="flex items-center justify-between rounded-lg border border-border/60 px-4 py-3">
                  <span className="text-sm font-medium text-foreground">{step}</span>
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    {index + 1}
                  </Badge>
                </div>
              ))}
              <div className="rounded-lg bg-muted/40 p-4 text-xs text-muted-foreground">
                <p>
                  {t.demo.progressSubtitle}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
