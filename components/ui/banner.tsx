"use client";

import { AlertOctagon, AlertTriangle, CheckCircle2, Info } from "lucide-react";

import { cn } from "@/lib/utils";

type BannerVariant = "info" | "success" | "warning" | "danger";

const variantStyles: Record<BannerVariant, { wrapper: string; icon: string }> = {
  info: {
    wrapper: "border-primary/30 bg-primary/5 text-primary",
    icon: "text-primary"
  },
  success: {
    wrapper: "border-[hsl(var(--success))]/40 bg-[hsl(var(--success))]/10 text-[hsl(var(--success))]",
    icon: "text-[hsl(var(--success))]"
  },
  warning: {
    wrapper: "border-[hsl(var(--warning))]/40 bg-[hsl(var(--warning))]/10 text-[hsl(var(--warning))]",
    icon: "text-[hsl(var(--warning))]"
  },
  danger: {
    wrapper: "border-destructive/40 bg-destructive/10 text-destructive",
    icon: "text-destructive"
  }
};

const variantIcon: Record<BannerVariant, typeof Info> = {
  info: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  danger: AlertOctagon
};

export interface BannerProps {
  title: string;
  description?: string;
  variant?: BannerVariant;
  className?: string;
  action?: React.ReactNode;
}

export function Banner({
  title,
  description,
  variant = "info",
  className,
  action
}: BannerProps) {
  const Icon = variantIcon[variant];
  const styles = variantStyles[variant];

  return (
    <div
      role="status"
      className={cn(
        "flex w-full flex-col gap-3 rounded-2xl border px-4 py-3 shadow-sm sm:flex-row sm:items-center sm:justify-between",
        styles.wrapper,
        className
      )}
    >
      <div className="flex items-start gap-3 text-sm">
        <Icon className={cn("mt-0.5 h-5 w-5", styles.icon)} aria-hidden />
        <div>
          <p className="font-semibold">{title}</p>
          {description && <p className="mt-1 text-xs opacity-90">{description}</p>}
        </div>
      </div>
      {action && <div className="text-sm font-medium">{action}</div>}
    </div>
  );
}

