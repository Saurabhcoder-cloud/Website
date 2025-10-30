"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import { useLocale, useTranslations } from "@/components/i18n/locale-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/components/ui/sonner";
import { demoComputeInput, demoComputeOutput } from "@/lib/contracts";

interface ReceiptPageProps {
  orderId: string;
}

interface SessionData {
  status: string;
  paymentStatus: string;
  currency: string;
  amountTotal: number;
  customerEmail: string | null;
  metadata?: Record<string, string>;
}

function formatCurrency(amountCents: number, currency: string, locale: string) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency?.toUpperCase() ?? "USD",
  }).format((amountCents ?? 0) / 100);
}

export function ReceiptPage({ orderId }: ReceiptPageProps) {
  const t = useTranslations();
  const { locale } = useLocale();
  const [session, setSession] = useState<SessionData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function fetchStatus() {
      try {
        const response = await fetch(`/api/checkout/status?session_id=${encodeURIComponent(orderId)}`);
        if (!response.ok) {
          throw new Error("status request failed");
        }
        const data = (await response.json()) as SessionData;
        if (mounted) {
          setSession(data);
        }
      } catch (error) {
        console.error("Failed to load checkout status", error);
        toast.error(t.checkout.errorMessage);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    fetchStatus();
    return () => {
      mounted = false;
    };
  }, [orderId, t.checkout.errorMessage]);

  const formattedTotal = useMemo(() => {
    if (!session) return null;
    return formatCurrency(session.amountTotal ?? 0, session.currency ?? "USD", `${locale}-US`);
  }, [session, locale]);

  const planName = useMemo(() => {
    const planId = session?.metadata?.planId;
    if (!planId) {
      return t.checkout.plans[0]?.name ?? "Basic";
    }
    return t.checkout.plans.find((plan) => plan.id === planId)?.name ?? planId;
  }, [session?.metadata?.planId, t.checkout.plans]);

  function downloadFile(type: "pdf" | "json") {
    if (type === "json") {
      const blob = new Blob([JSON.stringify({ input: demoComputeInput, output: demoComputeOutput }, null, 2)], {
        type: "application/json",
      });
      triggerDownload(blob, `taxhelpai-demo-${orderId}.json`);
      return;
    }

    const content = `TaxHelp AI Demo Receipt\nOrder: ${orderId}\nPlan: ${session?.metadata?.planId ?? "basic"}\nAmount: ${formattedTotal ?? "$0.00"}`;
    const blob = new Blob([content], { type: "application/pdf" });
    triggerDownload(blob, `taxhelpai-demo-${orderId}.pdf`);
  }

  function triggerDownload(blob: Blob, filename: string) {
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = filename;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="bg-background py-20">
      <div className="container mx-auto space-y-10 px-4">
        <header className="mx-auto max-w-3xl text-center">
          <Badge variant="outline" className="border-primary/50 text-primary">
            {t.receipt.title}
          </Badge>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            {t.receipt.subtitle}
          </h1>
        </header>

        <Card className="mx-auto max-w-3xl border-muted/60">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-foreground">{t.receipt.summaryTitle}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <div className="grid gap-2 md:grid-cols-2">
              <ReceiptRow label={t.receipt.details.order} value={orderId} loading={loading} />
              <ReceiptRow
                label={t.receipt.details.plan}
                value={planName}
                loading={loading}
              />
              <ReceiptRow
                label={t.receipt.details.status}
                value={session?.paymentStatus ?? session?.status ?? "pending"}
                loading={loading}
              />
              <ReceiptRow
                label={t.receipt.details.total}
                value={formattedTotal ?? ""}
                loading={loading}
              />
              <ReceiptRow
                label={t.receipt.details.email}
                value={session?.customerEmail ?? "—"}
                loading={loading}
              />
            </div>

            <div className="flex flex-wrap gap-3 pt-4">
              <Button onClick={() => downloadFile("pdf")} variant="default">
                {t.receipt.downloads.pdf}
              </Button>
              <Button onClick={() => downloadFile("json")} variant="outline">
                {t.receipt.downloads.json}
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-wrap justify-center gap-3 text-sm">
          <Button asChild>
            <Link href="/demo">{t.receipt.actions.dashboard}</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/status">{t.receipt.actions.status}</Link>
          </Button>
        </div>

        <p className="text-center text-sm text-muted-foreground">{t.receipt.help}</p>
      </div>
    </div>
  );
}

function ReceiptRow({ label, value, loading }: { label: string; value: string; loading: boolean }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-foreground/80">{label}</p>
      {loading ? (
        <Skeleton className="mt-2 h-5 w-32" />
      ) : (
        <p className="mt-1 text-sm text-muted-foreground">{value}</p>
      )}
    </div>
  );
}
