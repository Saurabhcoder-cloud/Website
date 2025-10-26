"use client";

import { useEffect, useMemo, useState } from "react";
import {
  CheckCircle2,
  CloudUpload,
  FileOutput,
  Languages,
  Loader2,
  ShieldCheck,
  Sparkles,
  Workflow
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { consentStatements, supportedLanguages, taxRules } from "@/lib/taxRules";

type OcrResponse = {
  documentId: string;
  detectedForm: string;
  confidence: number;
  normalizedFields: Record<string, string | number>;
  processingTimeMs: number;
};

type ComputeResponse = {
  requestId: string;
  metadata: {
    receivedAt: string;
    schemaVersion: string;
    documents: string[];
  };
  federalReturn: {
    form1040: { taxYear: number; filingStatus: string; lines: Record<string, number> };
    scheduleC: { grossReceipts: number; expenses: Record<string, number>; netProfit: number };
    scheduleSE: { seIncome: number; socialSecurityTax: number; medicareTax: number };
  };
  stateReturn: {
    ca540: { agi: number; taxableIncome: number; tax: number; withholding: number; refund: number };
  };
  notices: { code: string; level: string; message: string }[];
};

type QaResponse = {
  answer: string;
  references: string[];
  model: string;
};

const steps = [
  { id: "language", title: "Language selection", icon: Languages, description: "Choose disclosures and narration." },
  { id: "upload", title: "Document upload", icon: CloudUpload, description: "Secure drag-and-drop intake." },
  { id: "ocr", title: "OCR & classification", icon: Sparkles, description: "Form detection and confidence scoring." },
  { id: "extract", title: "Extract & validate", icon: Workflow, description: "Schema validation with reviewer notes." },
  { id: "qa", title: "Q&A co-pilot", icon: ShieldCheck, description: "Ask questions without exposing PII." },
  { id: "summary", title: "Tax & benefits summary", icon: CheckCircle2, description: "See deductions and compliance flags." },
  { id: "draft", title: "Draft assembly", icon: FileOutput, description: "Generate IRS/FTB-ready packages." },
  { id: "export", title: "Export options", icon: FileOutput, description: "Deliver PDF, JSON, and e-file bundles." },
  { id: "consent", title: "Consent & retention", icon: ShieldCheck, description: "Capture consent with retention controls." }
] as const;

const demoPrompts = [
  "I drove 9,200 business miles last year—how does that affect my Schedule C?",
  "Is my 529 distribution taxable if it matches my qualified expenses?",
  "Show me how my Uber 1099-K flows into CA Form 540."
];

type DemoState = {
  language: string;
  uploadedDocuments: number;
  ocrConfidence: number;
  extractionNotes: string;
  qaSelection: string;
  summaryAcknowledged: boolean;
  draftMode: "federal" | "state" | "both";
  exportFormat: "pdf" | "json" | "e-file";
  retentionDays: number;
  consent: Record<string, boolean>;
};

const initialState: DemoState = {
  language: supportedLanguages[0].code,
  uploadedDocuments: 3,
  ocrConfidence: 0.98,
  extractionNotes: "Validated W-2 wage totals against IRS schema v2023.1.",
  qaSelection: demoPrompts[0],
  summaryAcknowledged: false,
  draftMode: "both",
  exportFormat: "pdf",
  retentionDays: 30,
  consent: Object.fromEntries(consentStatements.map((statement) => [statement.id, false]))
};

export default function DemoPage() {
  const [stepIndex, setStepIndex] = useState(0);
  const [state, setState] = useState<DemoState>(initialState);
  const [ocrData, setOcrData] = useState<OcrResponse | null>(null);
  const [computeData, setComputeData] = useState<ComputeResponse | null>(null);
  const [qaData, setQaData] = useState<QaResponse | null>(null);
  const [qaLoading, setQaLoading] = useState(false);

  const activeStep = steps[stepIndex];
  const progress = ((stepIndex + 1) / steps.length) * 100;

  useEffect(() => {
    let isMounted = true;

    fetch("/api/demo/ocr")
      .then((response) => response.json())
      .then((payload: OcrResponse) => {
        if (isMounted) {
          setOcrData(payload);
          setState((prev) => ({ ...prev, ocrConfidence: payload.confidence }));
        }
      })
      .catch((error) => {
        console.error("Failed to load OCR mock", error);
      });

    fetch("/api/demo/compute", { method: "POST" })
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
    const controller = new AbortController();
    setQaLoading(true);

    fetch("/api/ai/explain", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: state.qaSelection }),
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
      .finally(() => {
        setQaLoading(false);
      });

    return () => controller.abort();
  }, [state.qaSelection]);

  const rulesByTarget = useMemo(() => {
    return taxRules.reduce<Record<string, typeof taxRules>>((acc, rule) => {
      acc[rule.targetForm] = acc[rule.targetForm] ? [...acc[rule.targetForm], rule] : [rule];
      return acc;
    }, {});
  }, []);

  const allConsented = Object.values(state.consent).every(Boolean);

  const goToStep = (index: number) => {
    setStepIndex(Math.max(0, Math.min(index, steps.length - 1)));
  };

  const handleConsentToggle = (id: string, value: boolean) => {
    setState((prev) => ({
      ...prev,
      consent: {
        ...prev.consent,
        [id]: value
      }
    }));
  };

  return (
    <div className="bg-background py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-6 lg:flex-row">
          <aside className="lg:w-72">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-lg">Demo progress</CardTitle>
                <CardDescription>Mock services emulate the live orchestration flow.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Progress value={progress} aria-label={`Demo progress ${Math.round(progress)} percent`} />
                <ul className="space-y-3 text-sm">
                  {steps.map((step, index) => (
                    <li key={step.id}>
                      <button
                        type="button"
                        onClick={() => goToStep(index)}
                        className={`flex w-full items-center justify-between rounded-lg border px-3 py-2 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                          stepIndex === index ? "border-primary bg-primary/10 text-primary" : "border-border hover:bg-muted/60"
                        }`}
                      >
                        <span className="flex items-center gap-2 text-sm font-medium">
                          <step.icon className="h-4 w-4" />
                          {step.title}
                        </span>
                        {index < stepIndex && <CheckCircle2 className="h-4 w-4 text-emerald-500" aria-hidden />}
                      </button>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </aside>

          <section className="flex-1 space-y-8">
            <header className="space-y-3">
              <Badge variant="outline" className="border-primary/40 text-primary">
                Backend-ready schemas included
              </Badge>
              <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Interactive filing demo</h1>
              <p className="text-muted-foreground">
                Each step mirrors the live orchestration pipeline. Adjust the options to see how TaxHelp AI prepares a draft
                return while capturing consent and audit evidence.
              </p>
            </header>

            <Card id={activeStep.id} className="border-primary/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <activeStep.icon className="h-5 w-5 text-primary" />
                  {activeStep.title}
                </CardTitle>
                <CardDescription>{activeStep.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {activeStep.id === "language" && (
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Language selection controls narration and ensures disclosures meet state requirements.
                    </p>
                    <RadioGroup
                      value={state.language}
                      onValueChange={(value) => setState((prev) => ({ ...prev, language: value }))}
                      className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
                    >
                      {supportedLanguages.map((option) => (
                        <Label
                          key={option.code}
                          className={`flex cursor-pointer items-center justify-between rounded-xl border px-4 py-3 text-sm transition ${
                            state.language === option.code ? "border-primary bg-primary/10" : "border-border hover:bg-muted/60"
                          }`}
                        >
                          <span>{option.label}</span>
                          <RadioGroupItem value={option.code} className="sr-only" />
                        </Label>
                      ))}
                    </RadioGroup>
                  </div>
                )}

                {activeStep.id === "upload" && (
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Mocked upload service creates S3 pre-signed URLs and redacts detected PII before storage.
                    </p>
                    <Label htmlFor="document-count" className="text-sm font-medium text-foreground">
                      Number of sample documents
                    </Label>
                    <Input
                      id="document-count"
                      type="number"
                      min={1}
                      max={15}
                      value={state.uploadedDocuments}
                      onChange={(event) => setState((prev) => ({ ...prev, uploadedDocuments: Number(event.target.value) }))}
                    />
                    <p className="text-xs text-muted-foreground">
                      Accepted formats: PDF, PNG, JPG. Automatic rotation, glare detection, and duplicate flagging included.
                    </p>
                  </div>
                )}

                {activeStep.id === "ocr" && (
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      OCR/classification runs on GPU-backed workers. The mock service returns confidence metrics and detected IRS
                      form templates.
                    </p>
                    <Card className="bg-muted/60">
                      <CardHeader>
                        <CardTitle className="text-base">Sample response</CardTitle>
                        <CardDescription>
                          {ocrData ? `Detected ${ocrData.detectedForm} in ${(ocrData.processingTimeMs / 1000).toFixed(2)} seconds` : "Loading"}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <pre className="overflow-x-auto rounded-lg bg-background p-4 text-xs">
{JSON.stringify(ocrData, null, 2)}
                        </pre>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {activeStep.id === "extract" && (
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Extraction validators use IRS Modernized e-File schemas. Adjust notes to simulate reviewer comments.
                    </p>
                    <Textarea
                      value={state.extractionNotes}
                      onChange={(event) => setState((prev) => ({ ...prev, extractionNotes: event.target.value }))}
                      aria-label="Extraction notes"
                    />
                    <p className="text-xs text-muted-foreground">
                      Validation checks: control totals, TIN checksum, EIN match, CA SDI withholding thresholds.
                    </p>
                  </div>
                )}

                {activeStep.id === "qa" && (
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Q&A is powered by OpenRouter models with guardrails that strip PII and cite IRS/FTB references.
                    </p>
                    <Label className="text-sm font-medium text-foreground">Try a sample question</Label>
                    <RadioGroup
                      value={state.qaSelection}
                      onValueChange={(value) => setState((prev) => ({ ...prev, qaSelection: value }))}
                      className="space-y-3"
                    >
                      {demoPrompts.map((prompt) => (
                        <Label
                          key={prompt}
                          className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 text-sm transition ${
                            state.qaSelection === prompt ? "border-primary bg-primary/10" : "border-border hover:bg-muted/60"
                          }`}
                        >
                          <RadioGroupItem value={prompt} className="sr-only" />
                          <span>{prompt}</span>
                        </Label>
                      ))}
                    </RadioGroup>
                    <Card className="bg-muted/60">
                      <CardHeader>
                        <CardTitle className="text-base">Model response</CardTitle>
                        <CardDescription>
                          {qaLoading ? "Contacting OpenRouter sandbox…" : `Sources: ${qaData?.references.join(", ") ?? "Mock data"}`}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        {qaLoading ? (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Loader2 className="h-4 w-4 animate-spin" /> Fetching explanation
                          </div>
                        ) : (
                          <p className="text-sm text-muted-foreground">{qaData?.answer ?? "No answer available."}</p>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                )}

                {activeStep.id === "summary" && (
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      The benefits summary compares standard vs. itemized deductions, tracks credits, and lists compliance flags.
                    </p>
                    <ul className="space-y-3 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="mt-1 h-4 w-4 text-primary" />
                        Qualified Business Income deduction estimated at $2,140 (finalized after Schedule C adjustments).
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="mt-1 h-4 w-4 text-primary" />
                        Education credit eligibility triggered (American Opportunity Credit).
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="mt-1 h-4 w-4 text-primary" />
                        Social Security taxation threshold review complete—15% taxable.
                      </li>
                    </ul>
                    {computeData && (
                      <Card className="bg-muted/40">
                        <CardHeader>
                          <CardTitle className="text-base">Mock compute output</CardTitle>
                          <CardDescription>Schema version {computeData.metadata.schemaVersion}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <pre className="overflow-x-auto rounded-lg bg-background p-4 text-xs">
{JSON.stringify(computeData.federalReturn.form1040, null, 2)}
                          </pre>
                        </CardContent>
                      </Card>
                    )}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Switch
                        id="summary-ack"
                        checked={state.summaryAcknowledged}
                        onCheckedChange={(checked) => setState((prev) => ({ ...prev, summaryAcknowledged: checked }))}
                      />
                      <Label htmlFor="summary-ack">I reviewed and acknowledge the summary</Label>
                    </div>
                  </div>
                )}

                {activeStep.id === "draft" && (
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Draft generation compiles Form 1040, Schedule C/SE, and CA 540. Toggle the focus area below.
                    </p>
                    <RadioGroup
                      value={state.draftMode}
                      onValueChange={(value) => setState((prev) => ({ ...prev, draftMode: value as DemoState["draftMode"] }))}
                      className="grid gap-3 sm:grid-cols-3"
                    >
                      {[
                        { value: "federal", label: "Federal only" },
                        { value: "state", label: "California only" },
                        { value: "both", label: "Full package" }
                      ].map((option) => (
                        <Label
                          key={option.value}
                          className={`flex cursor-pointer items-center justify-center rounded-xl border px-4 py-3 text-sm transition ${
                            state.draftMode === option.value ? "border-primary bg-primary/10" : "border-border hover:bg-muted/60"
                          }`}
                        >
                          <RadioGroupItem value={option.value} className="sr-only" />
                          {option.label}
                        </Label>
                      ))}
                    </RadioGroup>
                    <p className="text-xs text-muted-foreground">
                      Drafts include machine-readable JSON aligned with IRS Modernized e-File schemas.
                    </p>
                  </div>
                )}

                {activeStep.id === "export" && (
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Choose the export artifact your team needs. JSON exports can be pushed to your backend via webhook.
                    </p>
                    <RadioGroup
                      value={state.exportFormat}
                      onValueChange={(value) => setState((prev) => ({ ...prev, exportFormat: value as DemoState["exportFormat"] }))}
                      className="grid gap-3 sm:grid-cols-3"
                    >
                      {[
                        { value: "pdf", label: "PDF drafts" },
                        { value: "json", label: "MeF JSON" },
                        { value: "e-file", label: "E-file package" }
                      ].map((option) => (
                        <Label
                          key={option.value}
                          className={`flex cursor-pointer items-center justify-center rounded-xl border px-4 py-3 text-sm transition ${
                            state.exportFormat === option.value
                              ? "border-primary bg-primary/10"
                              : "border-border hover:bg-muted/60"
                          }`}
                        >
                          <RadioGroupItem value={option.value} className="sr-only" />
                          {option.label}
                        </Label>
                      ))}
                    </RadioGroup>
                    <p className="text-xs text-muted-foreground">
                      Stripe integration (optional) can collect payment before enabling downloads.
                    </p>
                  </div>
                )}

                {activeStep.id === "consent" && (
                  <div className="space-y-6" id="consent">
                    <p className="text-sm text-muted-foreground">
                      Capture explicit consent with timestamped receipts. Configure retention per jurisdiction and user role.
                    </p>
                    <div className="space-y-4">
                      {consentStatements.map((statement) => (
                        <div key={statement.id} className="flex items-start gap-3 rounded-xl border border-border bg-muted/40 p-4">
                          <Switch
                            id={statement.id}
                            checked={state.consent[statement.id]}
                            onCheckedChange={(checked) => handleConsentToggle(statement.id, checked)}
                          />
                          <Label htmlFor={statement.id} className="text-sm text-foreground">
                            {statement.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="retention">Retention window (days)</Label>
                      <Input
                        id="retention"
                        type="number"
                        min={0}
                        max={180}
                        value={state.retentionDays}
                        onChange={(event) => setState((prev) => ({ ...prev, retentionDays: Number(event.target.value) }))}
                      />
                      <p className="text-xs text-muted-foreground">
                        Setting to 0 enables zero-retention sandbox mode for high-sensitivity clients.
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="ghost" disabled={stepIndex === 0} onClick={() => goToStep(stepIndex - 1)}>
                  Previous
                </Button>
                <Button
                  onClick={() => goToStep(stepIndex + 1)}
                  disabled={stepIndex === steps.length - 1 || (activeStep.id === "consent" && !allConsented)}
                >
                  {stepIndex === steps.length - 1 ? "Complete" : "Next"}
                </Button>
              </CardFooter>
            </Card>

            <section id="rules" className="space-y-6">
              <header>
                <h2 className="text-2xl font-semibold tracking-tight text-foreground">Real tax rule mapping</h2>
                <p className="text-sm text-muted-foreground">
                  The mappings below are production-ready references that align W-2 and 1099 data with Form 1040, Schedule C/SE,
                  and California Form 540 lines.
                </p>
              </header>
              <div className="grid gap-6 lg:grid-cols-2">
                {Object.entries(rulesByTarget).map(([target, rules]) => (
                  <Card key={target} className="bg-muted/40">
                    <CardHeader>
                      <CardTitle>{target}</CardTitle>
                      <CardDescription>{rules.length} mappings</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3 text-sm text-muted-foreground">
                        {rules.map((rule) => (
                          <li key={rule.id} className="rounded-lg border border-border bg-background/60 p-4">
                            <p className="font-medium text-foreground">{rule.sourceForm} {rule.sourceField}</p>
                            <p className="text-xs uppercase tracking-wide text-primary">→ {rule.targetForm} {rule.targetLine}</p>
                            <p className="mt-2 text-xs">{rule.description}</p>
                            {rule.computation && <p className="mt-1 text-xs text-muted-foreground">Rule: {rule.computation}</p>}
                            <p className="mt-2 text-[11px] text-muted-foreground">Sources: {rule.references.join(", ")}</p>
                          </li>
                        ))}
                      </ul>
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
