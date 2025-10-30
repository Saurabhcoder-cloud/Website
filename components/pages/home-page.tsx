"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowRight, CheckCircle2, Languages, ShieldCheck, Sparkles, Users } from "lucide-react";

import { useTranslations } from "@/components/i18n/locale-provider";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { CTAButton } from "@/components/ui/cta-button";
import { Banner } from "@/components/ui/banner";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { Stepper } from "@/components/ui/stepper";
import { DemoScreenshot } from "@/components/graphics/demo-screenshot";
import { HeroFlowGraphic } from "@/components/graphics/hero-flow-graphic";

export function HomePage() {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const hasNetworkError = searchParams.get("error") === "network";

  return (
    <div className="relative bg-background pb-24 lg:pb-0">
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 gradient-hero opacity-10" aria-hidden />
        <div className="container relative z-10 mx-auto flex flex-col gap-12 px-4 lg:flex-row lg:items-center">
          <div className="space-y-6 lg:w-1/2">
            {hasNetworkError && (
              <Banner
                variant="danger"
                title={t.home.errorTitle}
                description={t.home.errorDescription}
                action={
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      if (typeof window !== "undefined") {
                        window.location.reload();
                      }
                    }}
                  >
                    {t.home.errorAction}
                  </Button>
                }
              />
            )}
            <Badge variant="outline" className="border-primary/50 text-primary">
              {t.home.heroBadge}
            </Badge>
            <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              {t.home.heroTitle}
            </h1>
            <p className="text-lg text-muted-foreground">{t.home.heroSubtitle}</p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <CTAButton size="lg" asChild icon={<ArrowRight className="h-5 w-5" aria-hidden />}>
                <Link href="/checkout">{t.home.primaryCta}</Link>
              </CTAButton>
              <CTAButton size="lg" variant="outline" asChild withShadow={false}>
                <Link href="/demo">{t.home.secondaryCta}</Link>
              </CTAButton>
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
            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4 text-sm font-medium text-primary">
              {t.home.socialStrip}
            </div>
          </div>

          <Card className="lg:w-5/12 border-primary/20 shadow-xl" aria-labelledby="demo-preview-heading">
            <CardHeader>
              <CardTitle id="demo-preview-heading" className="flex items-center gap-2 text-2xl">
                <Languages className="h-5 w-5 text-primary" aria-hidden />
                {t.demo.heroTitle}
              </CardTitle>
              <CardDescription>{t.demo.heroSubtitle}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 text-sm text-muted-foreground">
              <p>{t.demo.stepDescriptions.language}</p>
              <LanguageSwitcher showDetectedLabel className="bg-surface" />
              <HeroFlowGraphic />
              <Stepper
                orientation="horizontal"
                steps={t.home.miniSteps.map((step, index) => ({
                  id: `home-step-${index}`,
                  label: step,
                  status: "complete" as const
                }))}
              />
              <p className="text-xs text-muted-foreground">{t.home.mappingSubtitle}</p>
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

      <section className="border-y bg-surface py-20">
        <div className="container mx-auto space-y-10 px-4">
          <div className="space-y-2 text-center">
            <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">{t.home.demoGalleryTitle}</h2>
            <p className="text-muted-foreground">{t.home.demoGallerySubtitle}</p>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <figure className="rounded-lg border border-border bg-background p-4 shadow-sm">
              <DemoScreenshot language="en" />
              <figcaption className="mt-3 text-sm text-muted-foreground">{t.home.demoGalleryEn}</figcaption>
            </figure>
            <figure className="rounded-lg border border-border bg-background p-4 shadow-sm">
              <DemoScreenshot language="es" />
              <figcaption className="mt-3 text-sm text-muted-foreground">{t.home.demoGalleryEs}</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="border-b bg-background py-20">
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
          <Card className="border-primary/30 bg-background shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-foreground">{t.home.mappingTitle}</CardTitle>
              <CardDescription>{t.home.mappingSubtitle}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Stepper
                orientation="vertical"
                steps={t.home.miniSteps.map((step, index) => ({
                  id: `detail-step-${index}`,
                  label: step,
                  status: "complete" as const,
                  description: index === 0 ? t.home.stepsSubtitle : undefined
                }))}
              />
              <div className="rounded-lg bg-muted/40 p-4 text-xs text-muted-foreground">
                <p>{t.demo.progressSubtitle}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-primary/10 bg-background/95 px-4 py-4 shadow-lg backdrop-blur supports-[backdrop-filter]:bg-background/80 lg:hidden">
        <div className="container mx-auto space-y-3 text-center">
          <div>
            <p className="text-sm font-semibold text-foreground">{t.home.mobileCtaTitle}</p>
            <p className="text-xs text-muted-foreground">{t.home.mobileCtaSubtitle}</p>
          </div>
          <div className="flex justify-center gap-3">
            <CTAButton size="sm" asChild>
              <Link href="/checkout">{t.home.mobileCtaPrimary}</Link>
            </CTAButton>
            <Button size="sm" variant="outline" asChild>
              <Link href="/demo">{t.home.mobileCtaSecondary}</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
