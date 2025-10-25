import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Providers from '../components/Providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TaxHelp AI',
  description: 'AI-powered tax filing assistant with multilingual chat and automation'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-50 text-slate-900`}>
        <Providers>
          <div className="min-h-screen flex flex-col">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
