import type { Metadata } from 'next';

import Providers from '../components/Providers';

import './globals.css';

export const metadata: Metadata = {
  title: 'TaxHelp AI',
  description: 'Vercel-native AI tax assistant with OCR, Stripe plans, and multilingual chat.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-slate-950 text-slate-50">
        <Providers>
          <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
