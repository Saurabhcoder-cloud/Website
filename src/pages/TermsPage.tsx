import { usePageMetadata } from '@/hooks/usePageMetadata';

const sections = [
  {
    title: '1. Acceptance of terms',
    paragraphs: [
      'By accessing TaxHelp AI you agree to these Terms of Service. If you are acting on behalf of an organization, you confirm you have authority to bind that entity.',
    ],
  },
  {
    title: '2. Services',
    paragraphs: [
      'TaxHelp AI provides software for tax document processing, explainable mapping, and collaboration with tax professionals.',
      'Beta features, including demo flows, may change or be discontinued without notice.',
    ],
  },
  {
    title: '3. Your responsibilities',
    paragraphs: [
      'You are responsible for maintaining confidentiality of login credentials and ensuring uploaded documents are accurate.',
      'You will obtain consent from end users before sharing their information with TaxHelp AI.',
    ],
  },
  {
    title: '4. Payment',
    paragraphs: [
      'Paid plans are billed monthly or annually in advance. Taxes are additional.',
      'We may suspend access for unpaid invoices after 15 days. Stripe handles all payment processing; we never store card data.',
    ],
  },
  {
    title: '5. Compliance & confidentiality',
    paragraphs: [
      'We maintain SOC2-ready controls, encryption in transit and at rest, and consent-aware logging.',
      'Each customer is responsible for regulatory filings. TaxHelp AI is not a substitute for a licensed tax professional.',
    ],
  },
  {
    title: '6. Termination',
    paragraphs: [
      'Either party may terminate the agreement with 30 days notice. Upon termination you may export your data and request deletion.',
    ],
  },
  {
    title: '7. Limitation of liability',
    paragraphs: [
      'Neither party will be liable for consequential damages. TaxHelp AI’s aggregate liability is limited to fees paid in the prior 12 months.',
    ],
  },
  {
    title: '8. Changes',
    paragraphs: [
      'We will notify customers at least 30 days before material changes take effect. Continued use after the effective date constitutes acceptance.',
    ],
  },
  {
    title: '9. Contact',
    paragraphs: ['For questions, email legal@taxhelp.ai.'],
  },
];

export default function TermsPage() {
  usePageMetadata({
    title: 'Terms of Service | TaxHelp AI',
    description: 'Review the TaxHelp AI terms governing access, payment, responsibilities, and compliance.',
    canonicalPath: '/legal/terms',
  });

  return (
    <main id="main" className="bg-background py-16">
      <div className="container mx-auto px-4">
        <header className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">Terms of Service</h1>
          <p className="mt-4 text-sm text-muted-foreground">Effective: January 15, 2024</p>
          <p className="mt-6 text-base text-muted-foreground">
            These terms describe the relationship between TaxHelp AI and our customers. Please read them carefully before using the
            platform.
          </p>
        </header>

        <section className="mt-12 space-y-10">
          {sections.map((section) => (
            <article key={section.title} className="mx-auto max-w-3xl space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">{section.title}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-sm text-muted-foreground">
                  {paragraph}
                </p>
              ))}
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
