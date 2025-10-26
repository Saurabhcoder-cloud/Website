import { CheckCircle2, Headphones, ShieldCheck, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { usePageMetadata } from '@/hooks/usePageMetadata';

const plans = [
  {
    name: 'Launch',
    price: '$99',
    cadence: 'per month',
    description: 'For small teams launching a consumer-ready tax experience.',
    highlights: [
      'Up to 500 guided demo runs',
      'Document upload sandbox (no storage)',
      'Email + async Slack support',
      'Stripe checkout ready (bring your publishable key)',
    ],
    cta: 'Start pilot',
  },
  {
    name: 'Scale',
    price: '$249',
    cadence: 'per month',
    description: 'Connect production data pipelines and launch in multiple states.',
    highlights: [
      'Unlimited demo runs + API access',
      'SOC2-aligned monitoring & audit log exports',
      'Priority weekday support (<2h response)',
      'Single-tenant storage with 30-day retention controls',
    ],
    cta: 'Schedule onboarding',
    featured: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    cadence: 'annual agreements',
    description: 'For banks, payroll providers, and nationwide preparer networks.',
    highlights: [
      'Dedicated success engineer + white-glove migration',
      'Signed BAA + custom data residency',
      'On-prem model hosting options',
      'Monthly compliance & Lighthouse reports',
    ],
    cta: 'Talk to sales',
  },
];

const guarantees = [
  {
    title: 'Security SLA',
    description: 'Breach notification under 24 hours, annual SOC2 audit support, encryption in transit + at rest.',
    icon: ShieldCheck,
  },
  {
    title: 'Response time',
    description: 'Average 45-minute response during tax season across Slack, email, and ticketing queues.',
    icon: Headphones,
  },
  {
    title: 'Optimization',
    description: 'Quarterly Lighthouse optimization review to maintain ≥ 90 scores for performance and accessibility.',
    icon: Zap,
  },
];

export default function PricingPage() {
  usePageMetadata({
    title: 'Pricing | TaxHelp AI',
    description:
      'Compare TaxHelp AI plans for launching a secure, consent-driven tax filing experience with Stripe-ready billing hooks.',
    canonicalPath: '/pricing',
  });

  return (
    <main id="main" className="bg-background py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary">
            30-day pilot with zero data retention
          </Badge>
          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">Plans that grow with your filing season</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            All plans include the guided demo wizard, tax rule mappings, Lighthouse automation, and secure consent capture.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`flex h-full flex-col border ${plan.featured ? 'border-primary shadow-lg shadow-primary/20' : 'border-border'}`}
            >
              <CardHeader className="space-y-1 text-left">
                {plan.featured && (
                  <Badge className="w-fit bg-primary text-primary-foreground">Most popular</Badge>
                )}
                <CardTitle className="text-2xl text-foreground">{plan.name}</CardTitle>
                <CardDescription className="text-base">{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <span className="text-4xl font-semibold text-foreground">{plan.price}</span>
                  <span className="ml-2 text-sm text-muted-foreground">{plan.cadence}</span>
                </div>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  {plan.highlights.map((highlight) => (
                    <li key={highlight} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-1 h-4 w-4 text-primary" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="mt-auto">
                <Button className="w-full" variant={plan.featured ? 'default' : 'outline'} asChild>
                  <a
                    href={plan.featured ? 'https://cal.com/taxhelp-ai/implementation' : 'https://cal.com/taxhelp-ai/discovery'}
                    aria-label={`${plan.cta} plan ${plan.name}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {plan.cta}
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <section className="mt-16 grid gap-8 lg:grid-cols-3">
          {guarantees.map((guarantee) => (
            <Card key={guarantee.title} className="bg-muted/40">
              <CardHeader>
                <guarantee.icon className="h-6 w-6 text-primary" aria-hidden />
                <CardTitle className="text-lg text-foreground">{guarantee.title}</CardTitle>
                <CardDescription>{guarantee.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </section>

        <section className="mt-16 rounded-3xl border border-primary/30 bg-primary/5 p-10 text-center">
          <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">Need help estimating ROI?</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Ask for our payback worksheet—covering onboarding, support, and compliance savings—during your kickoff call.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Button asChild>
              <a href="https://cal.com/taxhelp-ai/roi" target="_blank" rel="noreferrer">
                Request ROI session
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href="mailto:hello@taxhelp.ai?subject=Pricing%20Question">Email finance team</a>
            </Button>
          </div>
        </section>
      </div>
    </main>
  );
}
