import { usePageMetadata } from '@/hooks/usePageMetadata';

const sections = [
  {
    title: '1. Information we collect',
    body: [
      'Identity data: name, email, and account identifiers supplied when you create an account or join a workspace.',
      'Document data: W-2, 1099, 1098-T, receipts, and other tax records you upload for processing. Documents can be processed in zero-retention sandbox mode.',
      'Usage data: page visits, Lighthouse metrics, and diagnostic logs tied to anonymized identifiers.',
    ],
  },
  {
    title: '2. How we use information',
    body: [
      'Deliver guided demos and production tax preparation workflows.',
      'Validate extracted data against IRS and FTB schemas and provide explainable mapping.',
      'Monitor performance, accessibility, and security to maintain Lighthouse ≥ 90 scores.',
    ],
  },
  {
    title: '3. Data retention',
    body: [
      'Default retention for uploaded documents is 30 days. Customers can set shorter windows or immediate deletion.',
      'Consent receipts store the user-selected retention policy and any overrides requested through the support portal.',
      'Aggregated analytics data is retained for up to 12 months for trend analysis.',
    ],
  },
  {
    title: '4. Sharing and disclosures',
    body: [
      'We do not sell personal information.',
      'Data may be shared with tax professionals or partners at your direction, subject to explicit consent.',
      'Service providers under signed DPA/BAA agreements assist with hosting, analytics, and support.',
    ],
  },
  {
    title: '5. Your rights',
    body: [
      'Request access, correction, or deletion of your data via hello@taxhelp.ai.',
      'California residents may exercise CPRA rights, including limiting the use of sensitive personal information.',
      'You may export your data and revoke consent at any time through the account portal.',
    ],
  },
  {
    title: '6. Contact',
    body: [
      'Email: privacy@taxhelp.ai',
      'Address: TaxHelp AI, 1355 Market Street, Suite 900, San Francisco, CA 94103',
    ],
  },
];

export default function PrivacyPolicyPage() {
  usePageMetadata({
    title: 'Privacy Policy | TaxHelp AI',
    description: 'Learn how TaxHelp AI collects, uses, and retains information for tax automation workflows.',
    canonicalPath: '/legal/privacy',
  });

  return (
    <main id="main" className="bg-background py-16">
      <div className="container mx-auto px-4">
        <header className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">Privacy Policy</h1>
          <p className="mt-4 text-sm text-muted-foreground">Effective: January 15, 2024</p>
          <p className="mt-6 text-base text-muted-foreground">
            TaxHelp AI is committed to transparent handling of personal information. This policy explains what we collect, how we
            use it, and the rights available to you.
          </p>
        </header>

        <section className="mt-12 space-y-10">
          {sections.map((section) => (
            <article key={section.title} className="mx-auto max-w-3xl space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">{section.title}</h2>
              <ul className="list-disc space-y-3 pl-5 text-sm text-muted-foreground">
                {section.body.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
