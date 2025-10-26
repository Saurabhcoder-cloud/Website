"use client";

import { useState } from "react";
import { Mail, MessageCircle, Send } from "lucide-react";

import { useTranslations } from "@/components/i18n/locale-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function ContactPage() {
  const t = useTranslations();
  const [submitted, setSubmitted] = useState(false);

  return (
    <main className="bg-background py-16">
      <div className="container mx-auto space-y-12 px-4">
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="outline" className="border-primary/40 text-primary">
            {t.contact.heroSubtitle}
          </Badge>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            {t.contact.heroTitle}
          </h1>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.2fr,1fr]">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-foreground">{t.contact.formTitle}</CardTitle>
              <CardDescription>{t.contact.formDescription}</CardDescription>
            </CardHeader>
            <CardContent>
              {submitted ? (
                <div className="space-y-3 text-sm text-muted-foreground">
                  <p>{t.contact.success}</p>
                  <Button variant="ghost" onClick={() => setSubmitted(false)}>
                    {t.common.buttons.contact}
                  </Button>
                </div>
              ) : (
                <form
                  className="space-y-4"
                  onSubmit={(event) => {
                    event.preventDefault();
                    setSubmitted(true);
                  }}
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="name">{t.contact.labels.name}</Label>
                      <Input id="name" name="name" required autoComplete="name" />
                    </div>
                    <div>
                      <Label htmlFor="email">{t.contact.labels.email}</Label>
                      <Input id="email" name="email" type="email" required autoComplete="email" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="topic">{t.contact.labels.topic}</Label>
                    <Input id="topic" name="topic" required />
                  </div>
                  <div>
                    <Label htmlFor="message">{t.contact.labels.message}</Label>
                    <Textarea id="message" name="message" rows={5} required />
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <input type="checkbox" id="consent" required className="h-4 w-4 rounded border border-border" />
                    <label htmlFor="consent">{t.contact.labels.consent}</label>
                  </div>
                  <Button type="submit" className="inline-flex items-center gap-2">
                    {t.contact.submit}
                    <Send className="h-4 w-4" aria-hidden />
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="bg-muted/40">
              <CardHeader>
                <CardTitle className="text-lg text-foreground">Email</CardTitle>
                <CardDescription>{t.common.buttons.contact}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-2 text-foreground">
                  <Mail className="h-4 w-4 text-primary" aria-hidden />
                  <a href={`mailto:${t.contact.supportEmail}`} className="underline">
                    {t.contact.supportEmail}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-foreground">
                  <Mail className="h-4 w-4 text-primary" aria-hidden />
                  <a href={`mailto:${t.contact.partnersEmail}`} className="underline">
                    {t.contact.partnersEmail}
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-muted/20">
              <CardHeader>
                <CardTitle className="text-lg text-foreground">Messaging</CardTitle>
                <CardDescription>{t.contact.heroSubtitle}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <a
                  href="https://t.me/taxhelpai"
                  className="flex items-center gap-2 text-foreground underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  <MessageCircle className="h-4 w-4 text-primary" aria-hidden />
                  {t.contact.telegramLabel}
                </a>
                <a
                  href="https://wa.me/18001234567"
                  className="flex items-center gap-2 text-foreground underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  <MessageCircle className="h-4 w-4 text-primary" aria-hidden />
                  {t.contact.whatsappLabel}
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
