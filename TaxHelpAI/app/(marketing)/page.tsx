import Link from 'next/link';

import LanguageSwitcher from '../../components/LanguageSwitcher';
import PricingTable from '../../components/PricingTable';
import { getDictionary, locales, type Locale } from '../../lib/i18n';

export default async function MarketingPage({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const param = searchParams?.lang as string | undefined;
  const locale: Locale = locales.includes(param as Locale) ? (param as Locale) : 'en';
  const dictionary = await getDictionary(locale);

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-16">
      <header className="flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold tracking-tight text-white">
          TaxHelp AI
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="rounded-xl bg-slate-800 px-4 py-2 text-sm font-medium text-white">
            {dictionary.dashboardCta}
          </Link>
          <LanguageSwitcher locale={locale} />
        </div>
      </header>

      <section className="mt-16 grid gap-10 md:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <h1 className="text-4xl font-bold leading-tight md:text-5xl">{dictionary.heroTitle}</h1>
          <p className="max-w-xl text-lg text-slate-300">{dictionary.heroSubtitle}</p>
          <div className="flex flex-wrap gap-3">
            {dictionary.features.map((feature) => (
              <span key={feature} className="rounded-full bg-slate-800 px-3 py-1 text-xs uppercase tracking-wide text-slate-200">
                {feature}
              </span>
            ))}
          </div>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-5 py-3 text-sm font-semibold text-white"
          >
            {dictionary.cta}
          </Link>
        </div>
        <div className="card overflow-hidden p-0">
          <div className="bg-gradient-to-br from-primary-600 to-primary-500 p-6">
            <h2 className="text-xl font-semibold text-white">What you get</h2>
            <ul className="mt-4 space-y-2 text-sm text-primary-50">
              <li>✔️ IRS-trained AI assistant with citations</li>
              <li>✔️ OCR uploads with Google Vision fallback</li>
              <li>✔️ Form 1040 PDFs in seconds</li>
              <li>✔️ Automated reminders & email alerts</li>
            </ul>
          </div>
          <div className="p-6">
            <h3 className="text-lg font-semibold text-white">{dictionary.pricingTitle}</h3>
            <PricingTable />
          </div>
        </div>
      </section>
    </div>
  );
}
