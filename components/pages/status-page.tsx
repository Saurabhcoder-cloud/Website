"use client";

import { useMemo } from "react";

import { useTranslations } from "@/components/i18n/locale-provider";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const STATUS_VARIANTS: Record<string, string> = {
  operational: "bg-emerald-500/10 text-emerald-600",
  degraded: "bg-amber-500/10 text-amber-600",
  outage: "bg-red-500/10 text-red-600",
};

export function StatusPage() {
  const t = useTranslations();
  const timestamp = useMemo(() => new Date().toLocaleString(), []);

  function resolveStatusLabel(status: string) {
    switch (status) {
      case "operational":
        return t.status.healthy;
      case "degraded":
        return t.status.degraded;
      case "outage":
        return t.status.down;
      default:
        return status;
    }
  }

  return (
    <div className="bg-background py-20">
      <div className="container mx-auto space-y-8 px-4">
        <header className="mx-auto max-w-3xl text-center">
          <Badge variant="outline" className="border-primary/50 text-primary">
            {t.status.subtitle}
          </Badge>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            {t.status.title}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {t.status.lastUpdated}: {timestamp}
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-2">
          {t.status.services.map((service) => {
            const statusClass = STATUS_VARIANTS[service.status] ?? STATUS_VARIANTS.operational;
            return (
              <Card key={service.name} className="border-muted/60">
                <CardHeader className="flex items-center justify-between gap-3">
                  <CardTitle className="text-lg font-semibold text-foreground">{service.name}</CardTitle>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClass}`}>
                    {resolveStatusLabel(service.status)}
                  </span>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">{service.description}</CardContent>
              </Card>
            );
          })}
        </div>

        <p className="text-center text-sm text-muted-foreground">{t.status.contact}</p>
      </div>
    </div>
  );
}
