import { useState } from 'react';
import { Building2, Headset, Mail, MapPin, Phone, Send } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { usePageMetadata } from '@/hooks/usePageMetadata';

const offices = [
  {
    title: 'San Francisco HQ',
    address: '1355 Market Street, Suite 900, San Francisco, CA 94103',
    phone: '(415) 555-0199',
  },
  {
    title: 'Los Angeles (Operations)',
    address: '6300 Wilshire Blvd, Floor 12, Los Angeles, CA 90048',
    phone: '(213) 555-0143',
  },
];

const channels = [
  {
    title: 'Sales & Partnerships',
    description: 'Launch strategic deployments with payroll providers, banks, and preparer networks.',
    icon: Building2,
    email: 'hello@taxhelp.ai',
  },
  {
    title: 'Support',
    description: 'Existing customers can reach our dedicated Slack channel or email support.',
    icon: Headset,
    email: 'support@taxhelp.ai',
  },
  {
    title: 'Press',
    description: 'For media inquiries, podcast requests, and speaking engagements.',
    icon: Mail,
    email: 'press@taxhelp.ai',
  },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  usePageMetadata({
    title: 'Contact | TaxHelp AI',
    description: 'Contact TaxHelp AI for sales, partnerships, support, and media inquiries. Offices in California with responsive teams.',
    canonicalPath: '/contact',
  });

  return (
    <main id="main" className="bg-background py-16">
      <div className="container mx-auto px-4" id="support">
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="outline" className="border-primary/40 text-primary">
            We reply within one business day
          </Badge>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">Talk to the TaxHelp AI team</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Share your goals and we&apos;ll coordinate a tailored walkthrough. Include any compliance requirements so we can prepare
            documentation in advance.
          </p>
        </div>

        <section className="mt-12 grid gap-6 lg:grid-cols-[2fr_1fr]">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-foreground">Send us a message</CardTitle>
              <CardDescription>
                No data is persisted in this demo form—connect your backend endpoint when you&apos;re ready for production.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {submitted ? (
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>Thank you! A team member will follow up shortly.</p>
                  <Button variant="ghost" onClick={() => setSubmitted(false)}>
                    Send another message
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
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" name="name" required autoComplete="name" />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" name="email" type="email" required autoComplete="email" />
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="company">Company</Label>
                      <Input id="company" name="company" autoComplete="organization" />
                    </div>
                    <div>
                      <Label htmlFor="role">Role</Label>
                      <Input id="role" name="role" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="message">What would you like to explore?</Label>
                    <Textarea id="message" name="message" required rows={5} />
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <input type="checkbox" id="consent" required className="h-4 w-4 rounded border border-border" />
                    <label htmlFor="consent" className="text-left">
                      I agree to the data handling described in the <a href="/legal/privacy" className="text-primary underline">Privacy Policy</a>.
                    </label>
                  </div>
                  <Button type="submit" className="inline-flex items-center gap-2">
                    Send message
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="bg-muted/40">
              <CardHeader>
                <CardTitle className="text-lg text-foreground">Direct lines</CardTitle>
                <CardDescription>Choose the channel that fits your request.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {channels.map((channel) => (
                  <div key={channel.title} className="rounded-xl border border-border bg-background/60 p-4">
                    <channel.icon className="h-5 w-5 text-primary" aria-hidden />
                    <p className="mt-2 text-sm font-semibold text-foreground">{channel.title}</p>
                    <p className="text-sm text-muted-foreground">{channel.description}</p>
                    <a className="mt-2 block text-sm text-primary underline" href={`mailto:${channel.email}`}>
                      {channel.email}
                    </a>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-muted/20">
              <CardHeader>
                <CardTitle className="text-lg text-foreground">Office locations</CardTitle>
                <CardDescription>Meet us in person for roadmap sessions and compliance reviews.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {offices.map((office) => (
                  <div key={office.title} className="rounded-xl border border-border bg-background/60 p-4">
                    <MapPin className="h-5 w-5 text-primary" aria-hidden />
                    <p className="mt-2 text-sm font-semibold text-foreground">{office.title}</p>
                    <p className="text-sm text-muted-foreground">{office.address}</p>
                    <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                      <Phone className="h-4 w-4 text-primary" aria-hidden />
                      {office.phone}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </main>
  );
}
