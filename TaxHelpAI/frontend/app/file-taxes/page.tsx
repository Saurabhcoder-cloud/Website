'use client';

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import OCRUploader from '../../components/OCRUploader';
import { useAuth } from '../../hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function FileTaxesPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push('/login');
  }, [user, router]);

  if (!user) return null;

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-slate-100 py-10">
        <div className="mx-auto max-w-4xl space-y-6 px-4">
          <h1 className="text-3xl font-semibold text-slate-900">File Taxes with OCR</h1>
          <p className="text-sm text-slate-600">
            Upload your W-2 or 1099 and we will extract key fields, run the refund calculator, and generate a filled Form
            1040 PDF for download.
          </p>
          <OCRUploader />
        </div>
      </main>
      <Footer />
    </div>
  );
}
