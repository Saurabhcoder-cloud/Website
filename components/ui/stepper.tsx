"use client";

import { CheckCircle2 } from "lucide-react";

import { cn } from "@/lib/utils";

export type StepStatus = "complete" | "current" | "upcoming";

export interface StepperStep {
  id: string;
  label: string;
  description?: string;
  status: StepStatus;
}

export interface StepperProps {
  steps: StepperStep[];
  orientation?: "horizontal" | "vertical";
  onStepSelect?: (stepId: string) => void;
  className?: string;
}

export function Stepper({
  steps,
  orientation = "horizontal",
  onStepSelect,
  className
}: StepperProps) {
  const isVertical = orientation === "vertical";

  return (
    <ol
      className={cn(
        "flex w-full",
        isVertical ? "flex-col gap-4" : "flex-col gap-6 sm:flex-row sm:items-stretch sm:gap-4",
        className
      )}
    >
      {steps.map((step, index) => {
        const isClickable = typeof onStepSelect === "function";
        const baseButton = cn(
          "relative flex h-full flex-1 flex-col gap-2 rounded-2xl border px-4 py-4 text-left shadow-sm transition-all",
          step.status === "complete" && "border-primary/40 bg-primary/10 text-primary",
          step.status === "current" &&
            "border-primary bg-white text-foreground shadow-lg shadow-primary/20",
          step.status === "upcoming" && "border-border bg-background text-muted-foreground",
          isClickable ? "cursor-pointer" : "cursor-default"
        );

        const handleSelect = () => {
          if (!isClickable) return;
          onStepSelect?.(step.id);
        };

        return (
          <li key={step.id} className={cn(!isVertical && "flex-1")}>
            <button
              type="button"
              onClick={handleSelect}
              className={baseButton}
              disabled={!isClickable}
              aria-disabled={!isClickable}
              aria-current={step.status === "current" ? "step" : undefined}
            >
              <div className="flex items-center justify-between gap-3">
                <div
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-full border-2 text-sm font-semibold",
                    step.status === "complete" && "border-primary bg-primary text-primary-foreground",
                    step.status === "current" && "border-primary bg-primary/10 text-primary",
                    step.status === "upcoming" && "border-border bg-muted/40 text-muted-foreground"
                  )}
                >
                  {step.status === "complete" ? (
                    <CheckCircle2 className="h-4 w-4" aria-hidden />
                  ) : (
                    index + 1
                  )}
                </div>
                <span className="text-sm font-semibold tracking-tight">{step.label}</span>
              </div>
              {step.description && (
                <p className="text-xs text-muted-foreground">{step.description}</p>
              )}
            </button>
          </li>
        );
      })}
    </ol>
  );
}

