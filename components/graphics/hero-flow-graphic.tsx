"use client";

const FLOW_STEPS = [
  {
    title: "Language",
    description: "Detected: English (US)",
    accent: "bg-[hsl(var(--primary))] text-primary-foreground"
  },
  {
    title: "Upload",
    description: "W-2 • 1099 • Receipts",
    accent: "bg-[hsl(var(--accent))] text-foreground"
  },
  {
    title: "Consent",
    description: "Export unlocked after approval",
    accent: "bg-[hsl(var(--success))] text-white"
  }
] as const;

const FLOW_DETAILS = ["Preprocess", "OCR", "Classify", "Validate", "Compute"] as const;

export function HeroFlowGraphic() {
  return (
    <div className="space-y-6 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-background to-primary/5 p-6 shadow-inner">
      <div className="grid gap-4 sm:grid-cols-3">
        {FLOW_STEPS.map((step) => (
          <div
            key={step.title}
            className={`rounded-2xl p-4 text-sm font-medium shadow-md transition-transform duration-300 ease-out hover:-translate-y-1 ${step.accent}`}
          >
            <p className="text-xs uppercase tracking-wide opacity-80">{step.title}</p>
            <p className="mt-2 text-base font-semibold leading-tight">{step.description}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
        {FLOW_DETAILS.map((detail) => (
          <span
            key={detail}
            className="flex items-center gap-2 rounded-full bg-background/80 px-3 py-1 font-semibold text-foreground shadow"
          >
            <span className="h-2 w-2 rounded-full bg-primary" aria-hidden />
            {detail}
          </span>
        ))}
      </div>
    </div>
  );
}
