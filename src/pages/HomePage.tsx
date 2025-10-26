import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, FileText, Lock, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { usePageMetadata } from '@/hooks/usePageMetadata';

const personas = [
  {
    title: 'Gig workers',
    description:
      'Connect 1099-NEC/K income, mileage, and platform fees in minutes. Detect SE tax automatically and receive deductions guidance.',
    outcomes: ['Uber/Lyft, DoorDash, Instacart ready', 'Auto mileage + home office prompts', 'Quarterly estimated tax reminders'],
  },
  {
    title: 'Students',
    description:
      'Sync W-2 campus jobs, scholarships, and 1098-T benefits. Capture education credits with clear “why” explanations.',
    outcomes: ['Automated AOTC & LLC checks', 'Residency-aware state questions', 'FAFSA-friendly audit trail'],
  },
  {
    title: 'Retirees',
    description:
      'Consolidate SSA-1099, pensions, and RMD notices. Track medical deductions and Social Security taxation thresholds.',
    outcomes: ['Taxable Social Security calculator', 'Medicare premium reimbursements', 'Beneficiary-ready export packages'],
  },
];

const assurances = [
  { icon: Lock, title: 'Security-first', description: 'SOC2 controls, TLS 1.3, and zero-retention sandbox modes.' },
  { icon: Sparkles, title: 'Explainable AI', description: 'Every suggestion references IRS or FTB guidance with citations.' },
  { icon: FileText, title: 'Compliance ready', description: 'Native mapping for 1040, Schedules C/SE, and CA 540 attachments.' },
];

const workflow = [
  'Import documents and classify income sources',
  'Validate extracted values against IRS schemas',
  'Ask TaxHelp AI anything with OpenRouter-backed models (no PII stored)',
  'Review a benefits summary plus filing readiness score',
  'Generate a draft 1040 + state return for preparer review',
];

export default function HomePage() {
  usePageMetadata({
    title: 'TaxHelp AI | Human-Ready Tax Automation for U.S. Filers',
    description:
      'Understand how TaxHelp AI turns W-2 and 1099 documents into complete 1040, Schedule C/SE, and CA 540 filings with secure consent-driven workflows.',
    canonicalPath: '/',
  });

  return (
    <main id="main">
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-24 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_#38bdf81a,_transparent_55%)]" aria-hidden />
        <div className="container mx-auto px-4">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div className="space-y-8">
              <Badge variant="secondary" className="bg-white/10 text-white">
                New in 2024 · Real tax rules baked in
              </Badge>
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
                The transparent AI co-pilot for every U.S. taxpayer
              </h1>
              <p className="max-w-xl text-lg text-slate-200">
                TaxHelp AI shows exactly how documents become filings. Watch the full demo, validate the IRS/FTB mapping, and keep
                humans in the loop with audit-ready exports.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Button size="lg" asChild>
                  <Link to="/demo" className="inline-flex items-center gap-2">
                    Launch interactive demo
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10" asChild>
                  <Link to="/pricing">See pricing</Link>
                </Button>
              </div>
              <div className="flex flex-wrap gap-6 text-sm text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  SOC2-ready controls
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  OpenRouter + proprietary guardrails
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  Vercel edge delivery
                </div>
              </div>
            </div>

            <div className="relative rounded-3xl border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur">
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">How a return is assembled</h2>
                <ol className="space-y-3 text-sm text-slate-100">
                  {workflow.map((step, index) => (
                    <li key={step} className="flex items-start gap-3">
                      <span className="gradient-primary mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full text-sm font-semibold">
                        {index + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
                <div className="rounded-2xl bg-slate-950/60 p-4 text-xs text-slate-300">
                  <p className="font-semibold uppercase tracking-wide text-slate-200">Vercel live deploy</p>
                  <p className="mt-1">
                    Connect your repository and environment secrets (OpenRouter, Stripe) to go live in minutes. Each deploy is
                    preflight-checked for Lighthouse 90+ scores.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Built for taxpayers and the humans who help them</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Tailored onboarding paths ensure that every filer understands how TaxHelp AI assembles their return end-to-end.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {personas.map((persona) => (
              <Card key={persona.title} className="h-full border-primary/20">
                <CardHeader>
                  <CardTitle>{persona.title}</CardTitle>
                  <CardDescription>{persona.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    {persona.outcomes.map((outcome) => (
                      <li key={outcome} className="flex items-start gap-2">
                        <CheckCircle2 className="mt-1 h-4 w-4 text-primary" />
                        <span>{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted/40 py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Explainability built into every step</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                TaxHelp AI provides regulation-ready evidence for how numbers move from W-2s and 1099s to federal and state forms.
                Share the mapping with preparers, auditors, or even curious students.
              </p>
              <div className="mt-8 grid gap-6 md:grid-cols-3">
                {assurances.map((assurance) => (
                  <div key={assurance.title} className="rounded-2xl border border-border bg-background/60 p-6">
                    <assurance.icon className="h-6 w-6 text-primary" aria-hidden />
                    <h3 className="mt-4 text-lg font-semibold text-foreground">{assurance.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{assurance.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <Card className="border-primary/20 bg-background">
              <CardHeader>
                <CardTitle>Deployment checklist</CardTitle>
                <CardDescription>
                  Use this to verify your project before handing it to compliance or your fractional CTO.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-1 h-4 w-4 text-primary" />
                    <span>Environment variables: OPENROUTER_API_KEY, STRIPE_PUBLISHABLE_KEY (optional)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-1 h-4 w-4 text-primary" />
                    <span>Role-based access and consent logs synced to your backend via webhooks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-1 h-4 w-4 text-primary" />
                    <span>Automated Lighthouse audits ≥ 90 for Performance, Accessibility, Best Practices, and SEO</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="bg-background py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Ready for your compliance team</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Detailed audit trails, consent receipts, and retention controls give compliance teams the documentation they need
                without slowing down product velocity.
              </p>
              <div className="mt-6 space-y-4 text-sm text-muted-foreground">
                <p>
                  • Consent and retention policies configurable per client, per document type.
                </p>
                <p>
                  • Annual SOC2 Type II readiness kit with mapped controls and evidence checklist.
                </p>
                <p>
                  • Dedicated compliance channel with 2-hour average response times during filing season.
                </p>
              </div>
            </div>
            <Card className="border-primary/20 bg-muted/40">
              <CardHeader>
                <CardTitle>Next steps</CardTitle>
                <CardDescription>Let&apos;s tailor the deployment for your use case.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button asChild size="lg" className="w-full">
                  <Link to="/contact">Book a strategy session</Link>
                </Button>
                <Button variant="outline" asChild size="lg" className="w-full">
                  <Link to="/demo">Run the guided demo</Link>
                </Button>
                <p className="text-xs text-muted-foreground">
                  Need enterprise terms or custom data residency? Visit our security page for documentation.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}
