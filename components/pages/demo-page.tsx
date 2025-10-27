"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type ComponentType } from "react";
import Link from "next/link";
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

import { useTranslations } from "@/components/i18n/locale-provider";
import { Badge } from "@/components/ui/badge";
import { Banner } from "@/components/ui/banner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { CTAButton } from "@/components/ui/cta-button";
import { ConsentModal } from "@/components/ui/consent-modal";
import { Label } from "@/components/ui/label";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Stepper, type StepperStep } from "@/components/ui/stepper";
import { Textarea } from "@/components/ui/textarea";
import { UploadDropzone, type UploadFileDescriptor } from "@/components/ui/upload-dropzone";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "@/components/ui/sonner";
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
type StepIconMap = Record<StepId, ComponentType<{ className?: string }>>;

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

const SENSITIVE_KEYS = ["ssn", "ein"];

const INITIAL_DEMO_FILES: UploadFileDescriptor[] = [
  { id: "demo-w2", name: "W2_sample.pdf", size: 92_000, type: "application/pdf" },
  { id: "demo-1099", name: "1099NEC_sample.pdf", size: 54_000, type: "application/pdf" }
];

const maskTaxId = (value: string) => {
  const digits = value.replace(/[^0-9]/g, "");
  if (digits.length < 4) return "***-**-****";
  const lastFour = digits.slice(-4);
  return `***-**-${lastFour}`;
};

const sanitizeField = (key: string, value: string | number) => {
  if (typeof value !== "string") return value;
  const normalizedKey = key.toLowerCase();
  if (SENSITIVE_KEYS.some((s) => normalizedKey.includes(s))) return maskTaxId(value);
  return value;
};

export function DemoPage() {
  const t = useTranslations();
  const docChips = useMemo(() => t.demo.ocr.chips, [t]);
  const qaPrompts = useMemo(() => t.demo.qa.prompts, [t]);
  const consentOptions = useMemo(() => t.demo.consent.options, [t]);
  const languageSwitches = useMemo(() => t.demo.language.switches, [t]);
  const defaultRetention = consentOptions[1] ?? consentOptions[0] ?? "30 days";
  const isMountedRef = useRef(true);
  const [stepIndex, setStepIndex] = useState(0);
  const [stagedFiles, setStagedFiles] = useState<UploadFileDescriptor[]>(() => [...INITIAL_DEMO_FILES]);
  const [selectedDocType, setSelectedDocType] = useState<string>(docChips[0] ?? "");
  const [qaSelection, setQaSelection] = useState(qaPrompts[0] ?? "");
  const [qaData, setQaData] = useState<QaResponse | null>(null);
  const [qaLoading, setQaLoading] = useState(false);
  const [ocrData, setOcrData] = useState<OcrResponse | null>(null);
  const [computeData, setComputeData] = useState<ComputeResponse | null>(null);
  const [retention, setRetention] = useState(defaultRetention);
  const [consentAccepted, setConsentAccepted] = useState(false);
  const [isConsentModalOpen, setIsConsentModalOpen] = useState(false);
  const [pendingDownload, setPendingDownload] = useState<string | null>(null);
  const [modalConsentChecked, setModalConsentChecked] = useState(false);
  const [dataCleared, setDataCleared] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [ocrError, setOcrError] = useState(false);
  const [computeError, setComputeError] = useState(false);

  useEffect(() => {
    setQaSelection(qaPrompts[0] ?? "");
    setRetention(defaultRetention);
    setConsentAccepted(false);
    setModalConsentChecked(false);
  }, [qaPrompts, defaultRetention]);

  useEffect(() => {
    isMountedRef.current = true;
    return () => { isMountedRef.current = false; };
  }, []);

  const generateFileDescriptor = useCallback((file: File): UploadFileDescriptor => {
    const id =
      typeof globalThis.crypto !== "undefined" && typeof globalThis.crypto.randomUUID === "function"
        ? globalThis.crypto.randomUUID()
        : `${file.name}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
    return { id, name: file.name, size: file.size, type: file.type };
  }, []);

  const handleFilesAdded = useCallback(
    (files: File[]) => {
      setStagedFiles((previous) => {
        const next = [...previous];
        files.forEach((file) => next.push(generateFileDescriptor(file)));
        return next.slice(0, 12);
      });
    },
    [generateFileDescriptor]
  );

  const handleRemoveFile = useCallback((id: string) => {
    setStagedFiles((previous) => previous.filter((file) => file.id !== id));
  }, []);

  const handleFileRejected = useCallback(
    ({ reason, file }: { reason: "size" | "type"; file: File }) => {
      const template = reason === "size" ? t.demo.upload.errors.size : t.demo.upload.errors.type;
      toast.error(template.replace("{name}", file.name));
    },
    [t]
  );

  const loadOcr = useCallback(async () => {
    setOcrError(false);
    try {
      const response = await fetch("/api/demo/ocr", { method: "POST" });
      if (!response.ok) throw new Error(`Unexpected status ${response.status}`);
      const payload: OcrResponse = await response.json();
      if (!isMountedRef.current) return;
      setOcrData(payload);
      const normalized = docChips.find((chip) => {
        const sanitize = (v: string) => v.toLowerCase().replace(/[^a-z0-9]/g, "");
        return sanitize(payload.docType).includes(sanitize(chip));
      });
      setSelectedDocType(normalized ?? docChips[0] ?? "");
    } catch (error) {
      console.error("Failed to load OCR mock", error);
      if (!isMountedRef.current) return;
      setOcrData(null);
      setOcrError(true);
    }
  }, [docChips]);

  const loadCompute = useCallback(async () => {
    setComputeError(false);
    try {
      const response = await fetch("/api/demo/compute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(demoComputeInput)
      });
      if (!response.ok) throw new Error(`Unexpected status ${response.status}`);
      const payload: ComputeResponse = await response.json();
      if (!isMountedRef.current) return;
      setComputeData(payload);
      setDataCleared(false);
    } catch (error) {
      console.error("Failed to load compute mock", error);
      if (!isMountedRef.current) return;
      setComputeData(null);
      setComputeError(true);
    }
  }, []);

  useEffect(() => {
    if (dataCleared) {
      setOcrData(null);
      setComputeData(null);
      return;
    }
    loadOcr();
    loadCompute();
  }, [dataCleared, loadOcr, loadCompute]);

  useEffect(() => { setSelectedDocType(docChips[0] ?? ""); }, [docChips]);

  useEffect(() => {
    const controller = new AbortController();
    setQaLoading(true);

    if (!qaSelection) {
      setQaData(null);
      setQaLoading(false);
      return () => controller.abort();
    }

    fetch("/api/ai/explain", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: qaSelection }),
      signal: controller.signal
    })
      .then((r) => r.json())
      .then((payload: QaResponse) => setQaData(payload))
      .catch((error: any) => {
        if (error?.name !== "AbortError") {
          console.error("Failed to load AI explanation", error);
          setQaData(null);
        }
      })
      .finally(() => setQaLoading(false));

    return () => controller.abort();
  }, [qaSelection]);

  useEffect(() => {
    if (!isConsentModalOpen) {
      setPendingDownload(null);
      return;
    }
    setModalConsentChecked(consentAccepted);
  }, [isConsentModalOpen, consentAccepted]);

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

  const stepperSteps = useMemo<StepperStep[]>(
    () =>
      steps.map((step, index) => {
        const status = (index < stepIndex ? "complete" : index === stepIndex ? "current" : "upcoming") as StepperStep["status"];
        return { id: step.id, label: step.title, description: step.description, status };
      }),
    [steps, stepIndex]
  );

  const activeStep = steps[stepIndex];
  const Icon = activeStep.icon as ComponentType<{ className?: string }>;

  const progress = ((stepIndex + 1) / steps.length) * 100;
  const federal = !dataCleared && !computeError ? computeData?.federal : undefined;
  const state = !dataCleared && !computeError ? computeData?.state : undefined;
  const explainers = !dataCleared && !computeError ? computeData?.explainers ?? [] : [];
  const benefits = !dataCleared && !computeError ? computeData?.benefits ?? [] : [];
  const files = !dataCleared && !computeError ? computeData?.files ?? [] : [];
  const primaryW2 = !dataCleared ? demoComputeInput.docs.w2[0] : undefined;
  const primaryNec = !dataCleared ? demoComputeInput.docs.nec1099[0] : undefined;
  const ssRate = primaryW2 && primaryW2.ss_wages > 0 ? (primaryW2.ss_tax_withheld / primaryW2.ss_wages) * 100 : null;
  const medicareRate = primaryW2 && primaryW2.medi_wages > 0 ? (primaryW2.medi_tax_withheld / primaryW2.medi_wages) * 100 : null;

  const sanitizedOcrFields = useMemo(() => {
    if (!ocrData) return null;
    return Object.entries(ocrData.fields).reduce<Record<string, string | number>>((acc, [key, value]) => {
      acc[key] = sanitizeField(key, value);
      return acc;
    }, {} as Record<string, string | number>);
  }, [ocrData]);

  const formatCurrency = useCallback((value?: number | null) => {
    if (value === undefined || value === null) return "—";
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
  }, []);

  const manualEntryStepIndex = stepOrder.indexOf("qa");

  const goToStep = (index: number) => {
    setStepIndex(Math.max(0, Math.min(index, steps.length - 1)));
  };

  const handleExportClick = useCallback(
    (label: string) => {
      if (dataCleared) {
        toast.error(t.demo.consent.exportDisabled);
        return;
      }
      setPendingDownload(label);
      setIsConsentModalOpen(true);
    },
    [dataCleared, t]
  );

  const handleConsentConfirm = useCallback(() => {
    if (!modalConsentChecked) return;
    setConsentAccepted(true);
    setIsConsentModalOpen(false);
    if (pendingDownload) toast.success(t.demo.consent.toastSuccess.replace("{item}", pendingDownload));
    setPendingDownload(null);
  }, [modalConsentChecked, pendingDownload, t]);

  const handleDeleteData = useCallback(() => {
    setOcrData(null);
    setComputeData(null);
    setQaData(null);
    setStagedFiles([]);
    setConsentAccepted(false);
    setModalConsentChecked(false);
    setDataCleared(true);
    setOcrError(false);
    setComputeError(false);
    setStepIndex(0);
    setQaSelection(qaPrompts[0] ?? "");
    setSelectedDocType(docChips[0] ?? "");
    setPendingDownload(null);
    toast.success(t.demo.consent.toastCleared);
  }, [docChips, qaPrompts, t]);

  const handleRestoreData = useCallback(() => {
    setStagedFiles([...INITIAL_DEMO_FILES]);
    setDataCleared(false);
    setConsentAccepted(false);
    setModalConsentChecked(false);
    setOcrError(false);
    setComputeError(false);
    toast.success(t.demo.consent.toastRestored);
    loadOcr();
    loadCompute();
  }, [loadCompute, loadOcr, t]);

  return (
    <>
      <div className="bg-background py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-6 lg:flex-row">
            <aside className="lg:w-72">
              <Card className="sticky top-24 border-primary/20 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg">{t.demo.progressTitle}</CardTitle>
                  <CardDescription>{t.demo.progressSubtitle}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Progress value={progress} aria-label={`${Math.round(progress)}%`} />
                  <Stepper
                    orientation="vertical"
                    steps={stepperSteps}
                    onStepSelect={(id) => {
                      const targetIndex = stepOrder.findIndex((stepId) => stepId === id);
                      if (targetIndex !== -1) goToStep(targetIndex);
                    }}
                  />
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
                    <Icon className="h-5 w-5 text-primary" aria-hidden />
                    {activeStep.title}
                  </CardTitle>
                  <CardDescription>{activeStep.description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* LANGUAGE */}
                  {activeStep.id === "language" && (
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">{t.demo.language.detection}</p>
                      <div className="flex flex-wrap gap-2">
                        {languageSwitches.map((label) => (
                          <Badge key={label} variant="outline" className="border-primary/40 text-primary">
                            {label}
                          </Badge>
                        ))}
                      </div>
                      <LanguageSwitcher className="bg-surface" />
                    </div>
                  )}

                  {/* UPLOAD */}
                  {activeStep.id === "upload" && (
                    <div className="space-y-4">
                      <UploadDropzone
                        files={stagedFiles}
                        description={t.demo.upload.description}
                        helperText={t.demo.upload.accepted}
                        badgeText={[t.demo.upload.encryptedBadge, t.demo.upload.maskedBadge]}
                        browseLabel={t.demo.upload.browse}
                        removeLabel={t.demo.upload.remove}
                        accept={["application/pdf", "image/jpeg", "image/png"]}
                        onFilesAdded={handleFilesAdded}
                        onRemoveFile={handleRemoveFile}
                        onFileRejected={handleFileRejected}
                        className={dataCleared ? "pointer-events-none opacity-60" : ""}
                      />
                      <Banner
                        title={t.demo.upload.staged.replace("{count}", `${stagedFiles.length}`)}
                        description={t.demo.upload.helper}
                      />
                    </div>
                  )}

                  {/* OCR */}
                  {activeStep.id === "ocr" && (
                    <div className="space-y-4">
                      {ocrError && (
                        <Banner
                          variant="danger"
                          title={t.demo.ocr.error}
                          action={<Button variant="outline" size="sm" onClick={() => loadOcr()}>{t.demo.ocr.retry}</Button>}
                        />
                      )}
                      {!ocrError && !ocrData && (
                        <Banner
                          title={t.demo.ocr.manualEntry}
                          action={<Button variant="ghost" size="sm" onClick={() => goToStep(manualEntryStepIndex)}>{t.demo.ocr.skip}</Button>}
                        />
                      )}
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
                      {ocrData && sanitizedOcrFields && (
                        <Card className="bg-muted/60">
                          <CardHeader>
                            <CardTitle className="text-base">{ocrData.docType}</CardTitle>
                            <CardDescription>{(ocrData.confidence * 100).toFixed(1)}% confidence</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <pre className="overflow-x-auto rounded-lg bg-background p-4 text-xs">
{JSON.stringify(sanitizedOcrFields, null, 2)}
                            </pre>
                          </CardContent>
                        </Card>
                      )}
                    </div>
                  )}

                  {/* EXTRACT */}
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

                  {/* QA */}
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
                              {t.demo.qa.loading}
                            </div>
                          ) : (
                            <p className="text-sm text-muted-foreground">{qaData?.answer ?? t.demo.qa.empty}</p>
                          )}
                        </CardContent>
                      </Card>
                    </div>
                  )}

                  {/* BENEFITS */}
                  {activeStep.id === "benefits" && (
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">{t.demo.benefits.description}</p>
                      {computeError && (
                        <Banner
                          variant="danger"
                          title={t.demo.summary.error}
                          action={<Button variant="outline" size="sm" onClick={() => loadCompute()}>{t.demo.summary.retry}</Button>}
                        />
                      )}
                      <div className="grid gap-4 lg:grid-cols-2">
                        <Card className="bg-muted/40">
                          <CardHeader>
                            <CardTitle className="text-base text-foreground">{t.demo.benefits.federalTitle}</CardTitle>
                            <CardDescription>
                              {federal ? `${t.demo.benefits.refundLabel} → ${formatCurrency(federal.refund)}` : t.demo.benefits.placeholder}
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-2 text-xs text-muted-foreground">
                              <li>AGI: {formatCurrency(federal?.agi)}</li>
                              <li>Tax: {formatCurrency(federal?.tax)}</li>
                              <li>Credits: {formatCurrency(federal?.credits)}</li>
                              <li>Forms: {federal?.forms.join(", ") ?? "—"}</li>
                            </ul>
                          </CardContent>
                        </Card>
                        <Card className="bg-muted/40">
                          <CardHeader>
                            <CardTitle className="text-base text-foreground">{t.demo.benefits.stateTitle}</CardTitle>
                            <CardDescription>
                              {state ? `${t.demo.benefits.refundLabel} → ${formatCurrency(state.refund)}` : t.demo.benefits.placeholder}
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-2 text-xs text-muted-foreground">
                              <li>Jurisdiction: {state?.jurisdiction ?? "—"}</li>
                              <li>Tax: {formatCurrency(state?.tax)}</li>
                              <li>Credits: {formatCurrency(state?.credits)}</li>
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
                            <div className="space-y-2 text-xs text-muted-foreground">
                              <p>{t.demo.benefits.placeholder}</p>
                              <div className="flex flex-wrap gap-2">
                                {t.demo.benefits.benefits.map((benefit) => (
                                  <Badge key={benefit} variant="outline" className="border-primary/40 text-primary">
                                    {benefit}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* DRAFT */}
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
                      <p className="rounded-xl border border-primary/20 bg-primary/5 p-3 text-xs text-primary">
                        {t.demo.draft.sampleNote}
                      </p>
                    </div>
                  )}

                  {/* SUMMARY */}
                  {activeStep.id === "summary" && (
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">{t.demo.summary.description}</p>
                      {computeError && (
                        <Banner
                          variant="danger"
                          title={t.demo.summary.error}
                          action={<Button variant="outline" size="sm" onClick={() => loadCompute()}>{t.demo.summary.retry}</Button>}
                        />
                      )}
                      <ul className="space-y-3 text-sm text-muted-foreground">
                        {t.demo.summary.refundDrivers.map((driver) => (
                          <li key={driver} className="flex items-start gap-2">
                            <CheckCircle2 className="mt-1 h-4 w-4 text-primary" aria-hidden />
                            <span>{driver}</span>
                          </li>
                        ))}
                      </ul>
                      {(!computeError && (federal || state)) && (
                        <div className="grid gap-4 sm:grid-cols-2">
                          {federal && (
                            <Card className="bg-muted/40">
                              <CardHeader>
                                <CardTitle className="text-sm font-semibold text-foreground">Federal snapshot</CardTitle>
                                <CardDescription>
                                  {t.demo.benefits.refundLabel} {formatCurrency(federal.refund)}
                                </CardDescription>
                              </CardHeader>
                              <CardContent className="space-y-1 text-xs text-muted-foreground">
                                <p>Tax: {formatCurrency(federal.tax)}</p>
                                <p>Credits: {formatCurrency(federal.credits)}</p>
                                <p>Forms: {federal.forms.join(", ")}</p>
                              </CardContent>
                            </Card>
                          )}
                          {state && (
                            <Card className="bg-muted/40">
                              <CardHeader>
                                <CardTitle className="text-sm font-semibold text-foreground">California snapshot</CardTitle>
                                <CardDescription>
                                  {t.demo.benefits.refundLabel} {formatCurrency(state.refund)}
                                </CardDescription>
                              </CardHeader>
                              <CardContent className="space-y-1 text-xs text-muted-foreground">
                                <p>Tax: {formatCurrency(state.tax)}</p>
                                <p>Credits: {formatCurrency(state.credits)}</p>
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
                              <Button
                                key={`${file.type}-${file.url}`}
                                variant="gradient"
                                size="sm"
                                onClick={() => handleExportClick(`Download ${file.type.toUpperCase()}`)}
                                disabled={dataCleared}
                              >
                                {`Download ${file.type.toUpperCase()}`}
                              </Button>
                            ))
                          : t.demo.summary.downloads.slice(0, 2).map((download) => (
                              <Button
                                key={download}
                                variant="gradient"
                                size="sm"
                                onClick={() => handleExportClick(download)}
                                disabled={dataCleared}
                              >
                                {download}
                              </Button>
                            ))}
                        <Button variant="outline" size="sm" disabled>
                          {t.demo.summary.downloads[2]}
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground">{t.demo.summary.comingSoon}</p>
                      {files.length > 0 && !dataCleared && (
                        <p className="text-xs text-muted-foreground">
                          {t.demo.summary.expiration.replace("{days}", `${Math.floor(files[0].expires_in / 86400)}`)}
                        </p>
                      )}
                      {dataCleared && <Banner variant="warning" title={t.demo.consent.clearedNotice} />}
                    </div>
                  )}

                  {/* CONSENT */}
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
                          {consentOptions.map((option) => (
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
                      <div className="flex flex-wrap gap-2">
                        <Button variant="outline" size="sm" onClick={() => setIsDeleteConfirmOpen(true)} disabled={dataCleared}>
                          {t.demo.consent.deleteNow}
                        </Button>
                        <Button variant="ghost" size="sm" onClick={handleRestoreData} disabled={!dataCleared}>
                          {t.demo.consent.restore}
                        </Button>
                      </div>
                      {dataCleared && <Banner variant="warning" title={t.demo.consent.clearedNotice} />}
                    </div>
                  )}

                  {/* COMPLETE */}
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
                      <div className="flex flex-wrap gap-3">
                        <CTAButton size="sm" asChild>
                          <Link href="/pricing">{t.demo.complete.ctaPricing}</Link>
                        </CTAButton>
                        <Button size="sm" variant="outline" asChild>
                          <Link href="/checkout">{t.demo.complete.ctaCheckout}</Link>
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>

                <CardFooter className="flex justify-between">
                  <Button variant="ghost" disabled={stepIndex === 0} onClick={() => goToStep(stepIndex - 1)}>
                    Previous
                  </Button>
                  <CTAButton
                    onClick={() => goToStep(stepIndex + 1)}
                    disabled={stepIndex === steps.length - 1 || (activeStep.id === "consent" && !consentAccepted)}
                  >
                    {stepIndex === steps.length - 1 ? "Done" : "Next"}
                  </CTAButton>
                </CardFooter>
              </Card>

              {/* RULES */}
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

      {/* Modals */}
      <ConsentModal
        open={isConsentModalOpen}
        onOpenChange={setIsConsentModalOpen}
        title={t.demo.consent.modalTitle}
        description={t.demo.consent.modalDescription.replace("{item}", pendingDownload ?? t.demo.summary.downloads[0])}
        confirmLabel={t.demo.consent.modalCta.replace("{item}", pendingDownload ?? t.demo.summary.downloads[0])}
        cancelLabel={t.demo.consent.modalCancel}
        acknowledgement={t.demo.consent.acknowledgement}
        checked={modalConsentChecked}
        onCheckedChange={setModalConsentChecked}
        onConfirm={handleConsentConfirm}
      />

      <AlertDialog open={isDeleteConfirmOpen} onOpenChange={setIsDeleteConfirmOpen}>
        <AlertDialogContent className="max-w-md rounded-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle>{t.demo.consent.deleteNow}</AlertDialogTitle>
            <AlertDialogDescription>{t.demo.consent.deleteConfirm}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t.demo.consent.modalCancel}</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                setIsDeleteConfirmOpen(false);
                handleDeleteData();
              }}
            >
              {t.demo.consent.deleteNow}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
