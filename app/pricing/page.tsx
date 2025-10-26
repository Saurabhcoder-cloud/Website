import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, CreditCard, Headset, Shield, Workflow } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const plans = [
  {
    name: "Sandbox",
    price: "$0",
    cadence: "per month",
    description: "Preview-ready experience for product and compliance reviews.",
    features: [
      "Unlimited demo runs with mock data",
      "10 document uploads/day",
      "Consent + retention logging",
      "Email support within 2 business days"
    ],
    cta: "Launch demo",
    highlight: "Best for evaluations"
  },
  {
    name: "Growth",
    price: "$249",
    cadence: "per month",
    description: "Activate the tax engine with production capacity and API access.",
    features: [
      "Live OCR + tax computation",
      "5,000 documents/month",
      "OpenRouter Q&A with audit transcripts",
      "SOC 2 reporting package"
    ],
    cta: "Start subscription",
    highlight: "Includes Stripe billing hook",
    popular: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    cadence: "",
    description: "Tailored deployments with dedicated compliance and support SLAs.",
    features: [
      "Dedicated VPC or on-prem support",
      "SAML/SCIM + role-based access",
      "24/7 incident response",
      "Data residency guarantees"
    ],
    cta: "Talk to sales"
  }
] as const;

export const metadata: Metadata = {
  title: "Pricing",
  description: "Transparent pricing for TaxHelp AI demo, growth, and enterprise deployments.",
  alternates: { canonical: "https://www.taxhelp.ai/pricing" }
};

export default function PricingPage() {
  const stripeKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

  return (
    <div className="bg-background py-20">
      <div className="container mx-auto px-4">
        <header className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <Badge variant="outline" className="border-primary/50 text-primary">
            Predictable pricing, no hidden fees
          </Badge>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">Choose the plan that matches your rollout</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Start with the sandbox demo, upgrade when you are ready to process production data, and contact us for bespoke security or throughput needs.
          </p>
        </header>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {plans.map((plan) => (
            <Card key={plan.name} className={`flex flex-col ${plan.popular ? "border-primary shadow-xl" : "border-border"}`}>
              <CardHeader className="space-y-3 text-center">
                {plan.highlight && (
                  <span className="mx-auto inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                    {plan.highlight}
                  </span>
                )}
                <CardTitle className="text-2xl text-foreground">{plan.name}</CardTitle>
                <div className="text-4xl font-bold text-primary">
                  {plan.price}
                  {plan.cadence && <span className="text-base font-normal text-muted-foreground">/{plan.cadence}</span>}
                </div>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 space-y-4">
                <ul className="space-y-3 text-sm text-muted-foreground">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-1 h-4 w-4 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                {plan.name === "Growth" && stripeKey ? (
                  <Button className="w-full" size="lg" asChild>
                    <Link href="https://buy.stripe.com/test_dR6aGm9dGdQy2dq5kl">{plan.cta}</Link>
                  </Button>
                ) : (
                  <Button className="w-full" size="lg" variant={plan.popular ? "gradient" : "outline"} asChild>
                    <Link href={plan.name === "Enterprise" ? "/contact" : "/demo"}>{plan.cta}</Link>
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>

        <section className="mt-20 grid gap-8 rounded-2xl border border-primary/30 bg-muted/40 p-8 lg:grid-cols-3">
          <div className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">Every plan includes</h2>
            <p className="text-sm text-muted-foreground">
              We designed TaxHelp AI to be deployable on day one. These capabilities are bundled across all tiers.
            </p>
          </div>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <Shield className="mt-1 h-4 w-4 text-primary" /> SOC 2-ready controls & evidence templates
            </li>
            <li className="flex items-start gap-2">
              <Workflow className="mt-1 h-4 w-4 text-primary" /> 1040 + CA 540 mapping with documentation
            </li>
            <li className="flex items-start gap-2">
              <Headset className="mt-1 h-4 w-4 text-primary" /> Implementation support via Slack or email
            </li>
            <li className="flex items-start gap-2">
              <CreditCard className="mt-1 h-4 w-4 text-primary" /> Vercel previews on every pull request
            </li>
          </ul>
          <Card className="bg-background/80">
            <CardHeader>
              <CardTitle className="text-lg">Need procurement docs?</CardTitle>
              <CardDescription>We maintain security questionnaires, DPAs, and W-9s on request.</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button variant="outline" asChild>
                <Link href="mailto:security@taxhelp.ai">Request package</Link>
              </Button>
            </CardFooter>
          </Card>
        </section>
      </div>
    </div>
  );
}
