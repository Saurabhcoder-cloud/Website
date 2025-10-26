import type { Metadata } from "next";
import { KeyRound, Lock, ServerCog, ShieldCheck, Users } from "lucide-react";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const controls = [
  {
    icon: Lock,
    title: "Encryption everywhere",
    description: "TLS 1.3 enforced in transit, AES-256 at rest with per-tenant keys managed via AWS KMS."
  },
  {
    icon: ServerCog,
    title: "Isolated environments",
    description: "Vercel edge + regional functions with environment-specific secrets and zero data crossover."
  },
  {
    icon: KeyRound,
    title: "Least privilege access",
    description: "Just-in-time role escalation, short-lived admin sessions, and quarterly access reviews."
  },
  {
    icon: Users,
    title: "Consent-aware logging",
    description: "Every access event logs user consent context, retention window, and reason codes."
  }
] as const;

const faqs = [
  {
    question: "Where is data stored?",
    answer:
      "Primary storage resides in AWS us-west-2 with optional GovCloud deployment. California-specific data is geo-fenced for CA 540 compliance."
  },
  {
    question: "How long do you retain uploads?",
    answer:
      "Default retention is 30 days, configurable down to zero-day sandbox mode. Consent receipts include user-selected retention."
  },
  {
    question: "What audit reports are available?",
    answer:
      "SOC 2 Type II report, penetration testing summaries, Lighthouse audits, and quarterly compliance dashboards for enterprise customers."
  }
] as const;

export const metadata: Metadata = {
  title: "Security & Privacy",
  description: "Review TaxHelp AI security posture including encryption, retention controls, and consent-aware logging.",
  alternates: { canonical: "https://www.taxhelp.ai/security" }
};

export default function SecurityPage() {
  return (
    <main className="bg-background py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="outline" className="border-primary/40 text-primary">
            Privacy-first infrastructure
          </Badge>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">Security, privacy, and trust</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Built for regulated teams that need explicit consent tracking, configurable retention, and verifiable controls across the entire filing journey.
          </p>
        </div>

        <section className="mt-12 grid gap-6 lg:grid-cols-2">
          {controls.map((control) => (
            <Card key={control.title} className="border-primary/20">
              <CardHeader>
                <control.icon className="h-6 w-6 text-primary" aria-hidden />
                <CardTitle className="text-xl text-foreground">{control.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{control.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="mt-16 rounded-3xl border border-primary/30 bg-primary/5 p-10 text-left">
          <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">Compliance roadmap</h2>
          <ul className="mt-6 space-y-4 text-sm text-muted-foreground">
            <li>
              <ShieldCheck className="mr-2 inline h-4 w-4 text-primary" aria-hidden /> SOC 2 Type II readiness kit delivered quarterly with mapped evidence.
            </li>
            <li>
              <ShieldCheck className="mr-2 inline h-4 w-4 text-primary" aria-hidden /> IRS Publication 1345 identity proofing workflows baked into onboarding.
            </li>
            <li>
              <ShieldCheck className="mr-2 inline h-4 w-4 text-primary" aria-hidden /> CCPA/CPRA request handling SLA under 7 days with portal for secure file delivery.
            </li>
          </ul>
        </section>

        <section className="mt-16">
          <h2 className="text-2xl font-semibold text-foreground">Security FAQs</h2>
          <Accordion type="single" collapsible className="mt-6">
            {faqs.map((faq) => (
              <AccordionItem key={faq.question} value={faq.question}>
                <AccordionTrigger className="text-left text-lg text-foreground">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </div>
    </main>
  );
}
