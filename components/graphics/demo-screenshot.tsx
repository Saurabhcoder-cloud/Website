"use client";

interface DemoScreenshotProps {
  language: "en" | "es";
}

const COPY = {
  en: {
    cards: [
      {
        heading: "Step 1",
        body: "Upload W-2",
        badge: "Encrypted (demo)",
        tone: "bg-slate-900 text-slate-100"
      },
      {
        heading: "Step 5",
        body: "Adaptive Q&A",
        badge: "Filing status, dependents, gig mileage",
        tone: "bg-[hsl(var(--primary))] text-primary-foreground"
      },
      {
        heading: "Step 9",
        body: "Summary & export",
        badge: "Consent required",
        tone: "bg-[hsl(var(--accent))] text-foreground"
      }
    ]
  },
  es: {
    cards: [
      {
        heading: "Paso 1",
        body: "Sube tu W-2",
        badge: "Cifrado (demo)",
        tone: "bg-slate-900 text-slate-100"
      },
      {
        heading: "Paso 5",
        body: "Preguntas adaptables",
        badge: "Estado civil, dependientes, millas",
        tone: "bg-[hsl(var(--accent))] text-foreground"
      },
      {
        heading: "Paso 9",
        body: "Resumen y exportar",
        badge: "Consentimiento requerido",
        tone: "bg-[hsl(var(--primary))] text-primary-foreground"
      }
    ]
  }
} as const;

export function DemoScreenshot({ language }: DemoScreenshotProps) {
  const copy = COPY[language];

  return (
    <div className="flex min-h-[280px] flex-col gap-4 rounded-2xl border border-primary/10 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 text-sm text-slate-100 shadow-xl">
      {copy.cards.map((card, index) => (
        <div
          key={`${language}-${index}`}
          className={`rounded-2xl border border-white/5 p-4 shadow-inner ${card.tone}`}
        >
          <p className="text-lg font-semibold">{card.heading}</p>
          <p className="mt-1 text-sm opacity-80">{card.body}</p>
          <p className="mt-3 text-xs font-medium uppercase tracking-wide opacity-70">{card.badge}</p>
        </div>
      ))}
    </div>
  );
}
