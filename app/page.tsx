import Link from "next/link";
import { ArrowRight, ClipboardList, GraduationCap, Handshake, ShieldCheck, Sparkles, Truck } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const personas = [
  {
    title: "Gig workers",
    description:
      "Connect DoorDash, Uber, Lyft, Instacart, and platform 1099 data. Mileage logs and platform fees map straight into Schedule C.",
    icon: Truck
  },
  {
    title: "Students",
    description:
      "Upload 1098-T, scholarships, and part-time W-2s. We surface education credits and dependent scenarios automatically.",
    icon: GraduationCap
  },
  {
    title: "Retirees",
    description:
      "Blend Social Security statements, retirement distributions, and RMD notices with Medicare deductions and taxability checks.",
    icon: Handshake
  }
];

const highlights = [
  {
    title: "Explainable by design",
    description: "Every data flow—from W-2 box 1 to Form 1040 line 1a—is mapped with citations you can hand to compliance.",
    icon: ClipboardList
  },
  {
    title: "Consent-first workflow",
    description: "Retention preferences and disclosure receipts are captured alongside every upload for SOC 2 evidence.",
    icon: ShieldCheck
  },
  {
    title: "Ready for production",
    description: "Mock APIs mirror the JSON that our upcoming tax engine will ship, so backend integration stays painless.",
    icon: Sparkles
  }
];

export default function HomePage() {
  return (
    <div className="bg-background">
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 gradient-hero opacity-10" aria-hidden />
        <div className="container relative z-10 mx-auto flex flex-col gap-12 px-4 lg:flex-row lg:items-center">
          <div className="space-y-6 lg:w-1/2">
            <Badge variant="outline" className="border-primary/50 text-primary">
              USA-focused tax co-pilot
            </Badge>
            <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              TaxHelp AI explains every step from upload to filed return.
            </h1>
            <p className="text-lg text-muted-foreground">
              Guided demos show how we ingest W-2 and 1099 forms, apply federal and California rules, and surface draft returns
              with clear consent controls—no production data required.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button size="lg" variant="gradient" asChild>
                <Link href="/demo" className="flex items-center gap-2">
                  Try the 10-step demo
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/security">Review security posture</Link>
              </Button>
            </div>
            <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-primary" />
                SOC 2 controls ready
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-tax-green" />
                IRS & FTB mappings built-in
              </div>
              <div className="flex items-center gap-2">
                <Handshake className="h-4 w-4 text-tax-gold" />
                Human preparer handoff
              </div>
            </div>
          </div>
          <Card className="lg:w-5/12">
            <CardHeader>
              <CardTitle className="text-2xl">Demo flow at a glance</CardTitle>
              <CardDescription>Preview what prospects see inside the interactive walkthrough.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-muted-foreground">
              <ol className="space-y-3">
                {[
                  "Language + consent disclosure",
                  "Document upload & OCR",
                  "Classification with confidence scores",
                  "Data validation against IRS schemas",
                  "AI Q&A (OpenRouter sandbox)",
                  "Tax & benefits summary",
                  "Draft 1040 + Schedule C/SE",
                  "CA Form 540 alignment",
                  "Export to PDF/JSON",
                  "Final retention confirmation"
                ].map((step, index) => (
                  <li key={step} className="flex items-start gap-3">
                    <span className="mt-1 h-6 w-6 rounded-full bg-primary/10 text-center text-xs font-semibold leading-6 text-primary">
                      {index + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
              <p>
                Mock APIs now, production tax engine next. Share the flow with stakeholders without exposing PII.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="border-t border-b bg-muted/40 py-16">
        <div className="container mx-auto grid gap-6 px-4 md:grid-cols-3">
          {personas.map((persona) => (
            <Card key={persona.title} className="border-primary/30">
              <CardHeader className="space-y-3">
                <persona.icon className="h-8 w-8 text-primary" />
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
        <div className="container mx-auto px-4">
          <div className="grid gap-10 lg:grid-cols-[2fr,1fr] lg:items-start">
            <div className="space-y-6">
              <Badge variant="outline" className="border-primary/50 text-primary">
                Compliance-ready details
              </Badge>
              <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                Built for tax teams that need audit trails and faster onboarding.
              </h2>
              <p className="text-lg text-muted-foreground">
                Our library of mappings covers W-2, 1099-NEC/K/MISC, and flows into Form 1040, Schedule C/SE, and California Form
                540. Each mapping includes references so tax leaders can validate the automation in minutes.
              </p>
              <div className="grid gap-6 sm:grid-cols-2">
                {highlights.map((item) => (
                  <Card key={item.title} className="h-full bg-muted/40">
                    <CardHeader className="space-y-3">
                      <item.icon className="h-6 w-6 text-primary" />
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                      <CardDescription className="text-sm text-muted-foreground">
                        {item.description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>
            <Card className="bg-background/80">
              <CardHeader>
                <CardTitle className="text-xl">What&apos;s included</CardTitle>
                <CardDescription>Demo-ready assets deploy with every preview build.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <ul className="space-y-2">
                  <li>• Vercel preview links per pull request</li>
                  <li>• Mock OCR + compute APIs with production schemas</li>
                  <li>• Consent receipts & retention controls</li>
                  <li>• SEO tags + optional Google Tag Manager</li>
                  <li>• Stripe-ready pricing CTA hook</li>
                </ul>
                <Button variant="ghost" asChild>
                  <Link href="/pricing" className="flex items-center gap-2">
                    See pricing tiers
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="border-t bg-muted/30 py-16">
        <div className="container mx-auto flex flex-col gap-8 px-4 text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Ready to put TaxHelp AI in front of your stakeholders?
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Spin up a Vercel preview, invite decision-makers into the guided demo, and connect with our team to plan backend
            integration across tax, benefits, and retention workflows.
          </p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Button size="lg" variant="success" asChild>
              <Link href="/contact">Talk to our team</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/legal/privacy">Review privacy commitments</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
