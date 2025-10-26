'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { locales, type Locale } from '../lib/i18n';

export default function LanguageSwitcher({ locale }: { locale: Locale }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams?.toString());
    params.set('lang', event.target.value);
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
  };

  return (
    <select
      aria-label="Select language"
      className="rounded-lg bg-slate-900/80 px-3 py-2 text-sm text-slate-50"
      onChange={handleChange}
      value={locale}
    >
      {locales.map((language) => (
        <option key={language} value={language}>
          {language}
        </option>
      ))}
    </select>
  );
}
