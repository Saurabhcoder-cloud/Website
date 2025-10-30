"use client";

import { useState } from "react";
import Link from "next/link";

import { useTranslations } from "@/components/i18n/locale-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/sonner";

export function CheckoutPage() {
  const t = useTranslations();
  const [pendingPlan, setPendingPlan] = useState<string | null>(null);

  async function startCheckout(planId: string, amountCents: number, name: string, description: string) {
    setPendingPlan(planId);

    try {
      const response = await fetch("/api/checkout/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lineItems: [
            {
              name,
              description,
              amount: amountCents / 100,
              quantity: 1,
            },
          ],
          metadata: { planId },
        }),
      });

      const data = await response.json();

      if (!response.ok || !data?.url) {
        throw new Error(data?.error ?? "Checkout error");
      }

      window.location.href = data.url as string;
    } catch (error) {
      console.error("Checkout start failed", error);
      toast.error(t.checkout.errorMessage);
    } finally {
      setPendingPlan(null);
    }
  }

  return (
    <div className="bg-background py-20">
      <div className="container mx-auto space-y-12 px-4">
        <header className="mx-auto max-w-3xl text-center">
          <Badge variant="outline" className="border-primary/50 text-primary">
            {t.checkout.subtitle}
          </Badge>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            {t.checkout.title}
          </h1>
        </header>

        <section aria-labelledby="checkout-steps" className="mx-auto max-w-3xl rounded-lg border bg-card p-6">
          <h2 id="checkout-steps" className="text-lg font-semibold text-foreground">
            {t.checkout.stepsTitle}
          </h2>
          <ol className="mt-4 space-y-3 text-sm text-muted-foreground">
            {t.checkout.steps.map((step, index) => (
              <li key={step} className="flex gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">
                  {index + 1}
                </span>
                <span className="flex-1 leading-relaxed">{step}</span>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="checkout-plans" className="space-y-6">
          <h2 id="checkout-plans" className="text-center text-2xl font-semibold text-foreground">
            {t.checkout.plansTitle}
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {t.checkout.plans.map((plan) => (
              <Card key={plan.id} className="flex h-full flex-col border-muted/60">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-foreground">{plan.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                </CardHeader>
                <CardContent className="flex-1 space-y-4">
                  <p className="text-3xl font-semibold text-primary">{plan.price}</p>
                  <p className="text-sm font-medium text-muted-foreground">{plan.bestFor}</p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex gap-2">
                        <span aria-hidden className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full"
                    disabled={pendingPlan === plan.id}
                    onClick={() => startCheckout(plan.id, plan.amountCents, plan.name, plan.description)}
                  >
                    {pendingPlan === plan.id ? `${t.checkout.cta}...` : t.checkout.cta}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        <section aria-labelledby="checkout-legal" className="mx-auto max-w-3xl rounded-lg border border-dashed border-primary/40 bg-primary/5 p-6">
          <h2 id="checkout-legal" className="text-lg font-semibold text-foreground">
            {t.common.nav.privacy}
          </h2>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {t.checkout.legal.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="checkout-support" className="mx-auto max-w-3xl rounded-lg border bg-card p-6">
          <h2 id="checkout-support" className="text-lg font-semibold text-foreground">
            {t.checkout.supportTitle}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">{t.checkout.supportDescription}</p>
          <Link href={`mailto:${t.checkout.supportEmail}`} className="mt-4 inline-flex text-sm font-medium text-primary underline">
            {t.checkout.supportEmail}
          </Link>
        </section>
      </div>
    </div>
  );
}
