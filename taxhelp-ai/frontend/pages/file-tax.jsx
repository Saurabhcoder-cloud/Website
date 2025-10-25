import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import OCRUploader from '../components/OCRUploader';

export default function FileTaxPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Navbar />
      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8 px-6 py-14">
        <header>
          <h1 className="text-3xl font-semibold text-slate-900">File your taxes</h1>
          <p className="text-sm text-slate-600">
            Upload supporting documents, review AI-suggested deductions, and generate a ready-to-file Form 1040 packet.
          </p>
        </header>

        <section className="space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">1. Upload documents</h2>
          <OCRUploader onUpload={() => {}} />
        </section>

        <section className="space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">2. Review extracted data</h2>
          <p className="text-sm text-slate-600">
            Once OCR processing completes, the extracted W-2/1099 line items will appear here for confirmation.
          </p>
        </section>

        <section className="space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">3. Submit for PDF generation</h2>
          <button className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500">
            Generate Form 1040 Packet
          </button>
        </section>
      </main>
      <Footer />
    </div>
  );
}
