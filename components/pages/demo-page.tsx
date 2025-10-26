"use client";

import { useEffect, useMemo, useState } from "react";
import {
  BadgeCheck,
  CheckCircle2,
  ClipboardList,
  CloudUpload,
  FileOutput,
  Languages,
  Loader2,
  PartyPopper,
  ShieldCheck,
  Sparkles,
  Workflow
} from "lucide-react";

import { LocaleToggle } from "@/components/i18n/locale-toggle";
import { useLocale, useTranslations } from "@/components/i18n/locale-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { demoComputeInput, type DemoComputeOutput, type DemoOcrResponse } from "@/lib/contracts";
import { taxRules } from "@/lib/taxRules";

const stepOrder = [
  "language",
  "upload",
  "ocr",
  "extract",
  "qa",
  "benefits",
  "draft",
  "summary",
  "consent",
  "complete"
] as const;

type StepId = (typeof stepOrder)[number];

type StepIconMap = Record<StepId, React.ComponentType<{ className?: string }>>;

const stepIcons: StepIconMap = {
  language: Languages,
  upload: CloudUpload,
  ocr: Sparkles,
  extract: Workflow,
  qa: BadgeCheck,
  benefits: CheckCircle2,
  draft: FileOutput,
  summary: ClipboardList,
  consent: ShieldCheck,
  complete: PartyPopper
};

type OcrResponse = DemoOcrResponse;

type ComputeResponse = DemoComputeOutput;

type QaResponse = {
  answer: string;
  references: string[];
  model: string;
};

export function DemoPage() {
  const { detectedLocale } = useLocale();
  const t = useTranslations();
  const [stepIndex, setStepIndex] = useState(0);
  const [uploadedDocs, setUploadedDocs] = useState(2);
  const [selectedDocType, setSelectedDocType] = useState<string>(t.demo.ocr.chips[0]);
  const [qaSelection, setQaSelection] = useState(t.demo.qa.prompts[0]);
  const [qaData, setQaData] = useState<QaResponse | null>(null);
  const [qaLoading, setQaLoading] = useState(false);
  const [ocrData, setOcrData] = useState<OcrResponse | null>(null);
  const [computeData, setComputeData] = useState<ComputeResponse | null>(null);
  const [retention, setRetention] = useState(t.demo.consent.options[1]);
  const [consentAccepted, setConsentAccepted] = useState(false);

  useEffect(() => {
    setQaSelection(t.demo.qa.prompts[0]);
    setRetention(t.demo.consent.options[1]);
    setConsentAccepted(false);
  }, [t]);

  useEffect(() => {
    let isMounted = true;

    fetch("/api/demo/ocr", { method: "POST" })
      .then((response) => response.json())
      .then((payload: OcrResponse) => {
        if (isMounted) {
          setOcrData(payload);
          const normalized = t.demo.ocr.chips.find((chip) => {
            const sanitize = (value: string) => value.toLowerCase().replace(/[^a-z0-9]/g, "");
            return sanitize(payload.docType).includes(sanitize(chip));
          });
          setSelectedDocType(normalized ?? t.demo.ocr.chips[0]);
        }
      })
      .catch((error) => {
        console.error("Failed to load OCR mock", error);
      });

    fetch("/api/demo/compute", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(demoComputeInput),
    })
      .then((response) => response.json())
      .then((payload: ComputeResponse) => {
        if (isMounted) {
          setComputeData(payload);
        }
      })
      .catch((error) => {
        console.error("Failed to load compute mock", error);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    setSelectedDocType(t.demo.ocr.chips[0]);
  }, [t]);

  useEffect(() => {
    const controller = new AbortController();
    setQaLoading(true);

    fetch("/api/ai/explain", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: qaSelection }),
      signal: controller.signal
    })
      .then((response) => response.json())
      .then((payload: QaResponse) => {
        setQaData(payload);
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          console.error("Failed to load AI explanation", error);
          setQaData(null);
        }
      })
      .finally(() => setQaLoading(false));

    return () => controller.abort();
  }, [qaSelection]);

  const steps = useMemo(
    () =>
      stepOrder.map((id) => ({
        id,
        title: t.demo.stepTitles[id],
        description: t.demo.stepDescriptions[id],
        icon: stepIcons[id]
      })),
    [t]
  );

  const activeStep = steps[stepIndex];
  const progress = ((stepIndex + 1) / steps.length) * 100;
  const federal = computeData?.federal;
  const state = computeData?.state;
  const explainers = computeData?.explainers ?? [];
  const benefits = computeData?.benefits ?? [];
  const files = computeData?.files ?? [];
  const primaryW2 = demoComputeInput.docs.w2[0];
  const primaryNec = demoComputeInput.docs.nec1099[0];
  const ssRate = primaryW2 && primaryW2.ss_wages > 0 ? (primaryW2.ss_tax_withheld / primaryW2.ss_wages) * 100 : null;
  const medicareRate = primaryW2 && primaryW2.medi_wages > 0 ? (primaryW2.medi_tax_withheld / primaryW2.medi_wages) * 100 : null;

  const detectedLabel = useMemo(() => {
    const languageLabels: Record<string, string> = {
      en: t.common.languages.en,
      es: t.common.languages.es
    };
    return t.demo.language.detection.replace("{language}", languageLabels[detectedLocale] ?? t.common.languages.en);
  }, [detectedLocale, t]);

  const goToStep = (index: number) => {
    setStepIndex(Math.max(0, Math.min(index, steps.length - 1)));
  };


  return (
    <div className="bg-background py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-6 lg:flex-row">
          <aside className="lg:w-72">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-lg">{t.demo.progressTitle}</CardTitle>
                <CardDescription>{t.demo.progressSubtitle}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Progress value={progress} aria-label={`${Math.round(progress)}%`} />
                <ul className="space-y-3 text-sm">
                  {steps.map((step, index) => {
                    const Icon = step.icon;
                    return (
                      <li key={step.id}>
                        <button
                          type="button"
                          onClick={() => goToStep(index)}
                          className={`flex w-full items-center justify-between rounded-lg border px-3 py-2 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                            stepIndex === index ? "border-primary bg-primary/10 text-primary" : "border-border hover:bg-muted/60"
                          }`}
                        >
                          <span className="flex items-center gap-2 text-sm font-medium">
                            <Icon className="h-4 w-4" aria-hidden />
                            {step.title}
                          </span>
                          {index < stepIndex && <CheckCircle2 className="h-4 w-4 text-emerald-500" aria-hidden />}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </CardContent>
            </Card>
          </aside>

          <section className="flex-1 space-y-8">
            <header className="space-y-3">
              <Badge variant="outline" className="border-primary/40 text-primary">
                {t.demo.heroBadge}
              </Badge>
              <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{t.demo.heroTitle}</h1>
              <p className="text-muted-foreground">{t.demo.heroSubtitle}</p>
            </header>

            <Card id={activeStep.id} className="border-primary/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <activeStep.icon className="h-5 w-5 text-primary" aria-hidden />
                  {activeStep.title}
                </CardTitle>
                <CardDescription>{activeStep.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {activeStep.id === "language" && (
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">{detectedLabel}</p>
                    <LocaleToggle />
                  </div>
                )}

                {activeStep.id === "upload" && (
                  <div className="space-y-4">
                    <div className="rounded-2xl border border-dashed border-primary/40 bg-muted/40 p-6 text-center">
                      <p className="text-sm text-muted-foreground">{t.demo.upload.description}</p>
                      <Badge className="mt-3 bg-primary/10 text-primary">{t.demo.upload.encryptedBadge}</Badge>
                      <p className="mt-3 text-xs text-muted-foreground">{t.demo.upload.accepted}</p>
                    </div>
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <Label htmlFor="upload-count" className="text-sm font-medium text-foreground">
                        {uploadedDocs} docs staged
                      </Label>
                      <Input
                        id="upload-count"
                        type="number"
                        min={1}
                        max={12}
                        value={uploadedDocs}
                        onChange={(event) => setUploadedDocs(Number(event.target.value))}
                        className="max-w-[120px]"
                      />
                    </div>
                  </div>
                )}

                {activeStep.id === "ocr" && (
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">{t.demo.ocr.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {t.demo.ocr.stages.map((stage) => (
                        <Badge key={stage} variant="outline" className="border-primary/40 text-primary">
                          {stage}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {t.demo.ocr.chips.map((chip) => (
                        <Button
                          key={chip}
                          type="button"
                          variant={selectedDocType === chip ? "gradient" : "outline"}
                          size="sm"
                          onClick={() => setSelectedDocType(chip)}
                        >
                          {chip}
                        </Button>
                      ))}
                    </div>
                    {ocrData && (
                      <Card className="bg-muted/60">
                        <CardHeader>
                          <CardTitle className="text-base">{ocrData.docType}</CardTitle>
                          <CardDescription>{(ocrData.confidence * 100).toFixed(1)}% confidence</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <pre className="overflow-x-auto rounded-lg bg-background p-4 text-xs">
{JSON.stringify(ocrData.fields, null, 2)}
                          </pre>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                )}

                {activeStep.id === "extract" && (
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">{t.demo.extract.description}</p>
                    <Textarea rows={3} value={t.demo.extract.masking} readOnly aria-label="masking-notes" />
                    <div className="flex flex-wrap gap-2">
                      {t.demo.extract.chips.map((chip) => (
                        <Badge key={chip} variant="outline" className="border-primary/40 text-primary">
                          {chip}
                        </Badge>
                      ))}
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <Card className="bg-muted/40">
                        <CardHeader>
                          <CardTitle className="text-base">W-2 validation</CardTitle>
                          <CardDescription>Box 1 → Form 1040 line 1</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2 text-xs text-muted-foreground">
                          <p>Wages: {primaryW2 ? `$${primaryW2.wages.toLocaleString()}` : "—"}</p>
                          <p>SS tax rate ≈ {ssRate !== null ? `${ssRate.toFixed(2)}%` : "—"} of Box 3</p>
                          <p>Medicare rate ≈ {medicareRate !== null ? `${medicareRate.toFixed(2)}%` : "—"} of Box 5</p>
                        </CardContent>
                      </Card>
                      <Card className="bg-muted/40">
                        <CardHeader>
                          <CardTitle className="text-base">1099-NEC validation</CardTitle>
                          <CardDescription>Box 1 → Schedule C line 1</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2 text-xs text-muted-foreground">
                          <p>Payer: {primaryNec?.payer ?? "—"}</p>
                          <p>Gross receipts: {primaryNec ? `$${primaryNec.amount.toLocaleString()}` : "—"}</p>
                          <p>Withholding: {primaryNec ? `$${primaryNec.fed_withheld.toLocaleString()}` : "$0"}</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                )}

                {activeStep.id === "qa" && (
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">{t.demo.qa.description}</p>
                    <RadioGroup value={qaSelection} onValueChange={(value) => setQaSelection(value)} className="space-y-3">
                      {t.demo.qa.prompts.map((prompt) => (
                        <Label
                          key={prompt}
                          className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 text-sm transition ${
                            qaSelection === prompt ? "border-primary bg-primary/10" : "border-border hover:bg-muted/60"
                          }`}
                        >
                          <RadioGroupItem value={prompt} className="sr-only" />
                          <span>{prompt}</span>
                        </Label>
                      ))}
                    </RadioGroup>
                    <Card className="bg-muted/60">
                      <CardHeader>
                        <CardTitle className="text-base">OpenRouter</CardTitle>
                        <CardDescription>{qaData?.model ?? "Sandbox"}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        {qaLoading ? (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Loading answer...
                          </div>
                        ) : (
                          <p className="text-sm text-muted-foreground">{qaData?.answer ?? "No answer available."}</p>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                )}

                {activeStep.id === "benefits" && (
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">{t.demo.benefits.description}</p>
                    <div className="grid gap-4 lg:grid-cols-2">
                      <Card className="bg-muted/40">
                        <CardHeader>
                          <CardTitle className="text-base text-foreground">{t.demo.benefits.federalTitle}</CardTitle>
                          <CardDescription>
                            {federal ? `Refund → $${federal.refund}` : t.demo.benefits.refundLabel}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2 text-xs text-muted-foreground">
                            <li>AGI: ${federal?.agi ?? 0}</li>
                            <li>Tax: ${federal?.tax ?? 0}</li>
                            <li>Credits: ${federal?.credits ?? 0}</li>
                            <li>Forms: {federal?.forms.join(", ") ?? "—"}</li>
                          </ul>
                        </CardContent>
                      </Card>
                      <Card className="bg-muted/40">
                        <CardHeader>
                          <CardTitle className="text-base text-foreground">{t.demo.benefits.stateTitle}</CardTitle>
                          <CardDescription>
                            {state ? `Refund → $${state.refund}` : t.demo.benefits.refundLabel}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2 text-xs text-muted-foreground">
                            <li>Jurisdiction: {state?.jurisdiction ?? "—"}</li>
                            <li>Tax: ${state?.tax ?? 0}</li>
                            <li>Credits: ${state?.credits ?? 0}</li>
                            <li>Forms: {state?.forms.join(", ") ?? "—"}</li>
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">{t.demo.benefits.benefitsTitle}</h3>
                      <div className="mt-2 space-y-2">
                        {benefits.length > 0 ? (
                          benefits.map((benefit) => (
                            <div
                              key={benefit.program}
                              className="flex items-start justify-between rounded-lg border border-border bg-background/80 p-3 text-xs text-muted-foreground"
                            >
                              <div>
                                <p className="font-medium text-foreground">{benefit.program}</p>
                                <p>{benefit.reason}</p>
                              </div>
                              <Badge variant={benefit.likely ? "gradient" : "outline"}>
                                {benefit.likely ? t.demo.benefits.likely : t.demo.benefits.review}
                              </Badge>
                            </div>
                          ))
                        ) : (
                          <div className="flex flex-wrap gap-2">
                            {t.demo.benefits.benefits.map((benefit) => (
                              <Badge key={benefit} variant="outline" className="border-primary/40 text-primary">
                                {benefit}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {activeStep.id === "draft" && (
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">{t.demo.draft.description}</p>
                    <RadioGroup defaultValue={t.demo.draft.pills[0]} className="grid gap-3 sm:grid-cols-2">
                      {t.demo.draft.pills.map((pill) => (
                        <Label
                          key={pill}
                          className="flex cursor-pointer items-center justify-center rounded-xl border border-border px-4 py-3 text-sm transition hover:bg-muted/60"
                        >
                          <RadioGroupItem value={pill} className="sr-only" />
                          {pill}
                        </Label>
                      ))}
                    </RadioGroup>
                  </div>
                )}

                {activeStep.id === "summary" && (
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">{t.demo.summary.description}</p>
                    <ul className="space-y-3 text-sm text-muted-foreground">
                      {t.demo.summary.refundDrivers.map((driver) => (
                        <li key={driver} className="flex items-start gap-2">
                          <CheckCircle2 className="mt-1 h-4 w-4 text-primary" aria-hidden />
                          <span>{driver}</span>
                        </li>
                      ))}
                    </ul>
                    {(federal || state) && (
                      <div className="grid gap-4 sm:grid-cols-2">
                        {federal && (
                          <Card className="bg-muted/40">
                            <CardHeader>
                              <CardTitle className="text-sm font-semibold text-foreground">Federal snapshot</CardTitle>
                              <CardDescription>Refund ${federal.refund}</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-1 text-xs text-muted-foreground">
                              <p>Tax: ${federal.tax}</p>
                              <p>Credits: ${federal.credits}</p>
                              <p>Forms: {federal.forms.join(", ")}</p>
                            </CardContent>
                          </Card>
                        )}
                        {state && (
                          <Card className="bg-muted/40">
                            <CardHeader>
                              <CardTitle className="text-sm font-semibold text-foreground">California snapshot</CardTitle>
                              <CardDescription>Refund ${state.refund}</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-1 text-xs text-muted-foreground">
                              <p>Tax: ${state.tax}</p>
                              <p>Credits: ${state.credits}</p>
                              <p>Forms: {state.forms.join(", ")}</p>
                            </CardContent>
                          </Card>
                        )}
                      </div>
                    )}
                    {explainers.length > 0 && (
                      <div className="space-y-2">
                        <h3 className="text-sm font-semibold text-foreground">Line explainers</h3>
                        <ul className="space-y-2 text-xs text-muted-foreground">
                          {explainers.map((explainer) => (
                            <li key={explainer.line} className="rounded-lg border border-border bg-background/80 p-3">
                              <p className="text-[11px] uppercase text-primary">{explainer.line}</p>
                              <p>{explainer.text}</p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <div className="flex flex-wrap gap-3">
                      {files.length > 0
                        ? files.map((file) => (
                            <Button key={`${file.type}-${file.url}`} variant="gradient" size="sm">
                              {`Download ${file.type.toUpperCase()}`}
                            </Button>
                          ))
                        : t.demo.summary.downloads.slice(0, 2).map((download) => (
                            <Button key={download} variant="gradient" size="sm">
                              {download}
                            </Button>
                          ))}
                      <Button variant="outline" size="sm" disabled>
                        {t.demo.summary.downloads[2]}
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">{t.demo.summary.comingSoon}</p>
                    {files.length > 0 && (
                      <p className="text-xs text-muted-foreground">
                        {`Demo links expire in ${Math.floor(files[0].expires_in / 86400)} days.`}
                      </p>
                    )}
                  </div>
                )}

                {activeStep.id === "consent" && (
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">{t.demo.consent.description}</p>
                    <div className="flex items-center gap-3">
                      <Checkbox
                        id="consent-checkbox"
                        checked={consentAccepted}
                        onCheckedChange={(checked) => setConsentAccepted(Boolean(checked))}
                      />
                      <Label htmlFor="consent-checkbox" className="text-sm text-foreground">
                        {t.demo.consent.acknowledgement}
                      </Label>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-foreground">{t.demo.consent.retentionLabel}</Label>
                      <RadioGroup value={retention} onValueChange={(value) => setRetention(value)} className="flex flex-wrap gap-3">
                        {t.demo.consent.options.map((option) => (
                          <Label
                            key={option}
                            className={`flex cursor-pointer items-center justify-center rounded-xl border px-4 py-2 text-sm transition ${
                              retention === option ? "border-primary bg-primary/10" : "border-border hover:bg-muted/60"
                            }`}
                          >
                            <RadioGroupItem value={option} className="sr-only" />
                            {option}
                          </Label>
                        ))}
                      </RadioGroup>
                    </div>
                    <Button variant="outline" size="sm">
                      {t.demo.consent.deleteNow}
                    </Button>
                  </div>
                )}

                {activeStep.id === "complete" && (
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">{t.demo.complete.description}</p>
                    <ul className="space-y-3 text-sm text-muted-foreground">
                      {t.demo.complete.checklist.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <CheckCircle2 className="mt-1 h-4 w-4 text-primary" aria-hidden />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="ghost" disabled={stepIndex === 0} onClick={() => goToStep(stepIndex - 1)}>
                  Previous
                </Button>
                <Button
                  onClick={() => goToStep(stepIndex + 1)}
                  disabled={stepIndex === steps.length - 1 || (activeStep.id === "consent" && !consentAccepted)}
                >
                  {stepIndex === steps.length - 1 ? "Done" : "Next"}
                </Button>
              </CardFooter>
            </Card>

            <section id="rules" className="space-y-6">
              <header>
                <h2 className="text-2xl font-semibold tracking-tight text-foreground">{t.home.mappingTitle}</h2>
                <p className="text-sm text-muted-foreground">{t.home.mappingSubtitle}</p>
              </header>
              <div className="grid gap-6 lg:grid-cols-2">
                {taxRules.map((rule) => (
                  <Card key={rule.id} className="bg-muted/40">
                    <CardHeader>
                      <CardTitle className="text-base text-foreground">
                        {rule.sourceForm} → {rule.targetForm}
                      </CardTitle>
                      <CardDescription>{rule.targetLine}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2 text-xs text-muted-foreground">
                      <p>{rule.sourceField}</p>
                      <p>{rule.description}</p>
                      {rule.computation && <p className="text-[11px] uppercase text-primary">{rule.computation}</p>}
                      <p className="text-[11px]">Sources: {rule.references.join(", ")}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </section>
        </div>
      </div>
    </div>
  );
}
