import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import OCRUploader from '../components/OCRUploader';

const sections = [
  { title: 'Chat Assistant', description: 'Ask the AI tax specialist questions and get answers in your preferred language.' },
  { title: 'Refund Calculator', description: 'Estimate your refund using current IRS brackets and your income data.' },
  { title: 'File Taxes', description: 'Upload tax forms and let OCR + AI map them into ready-to-file IRS PDFs.' },
  { title: 'My Documents', description: 'Securely store and access all of your tax documents in one location.' },
  { title: 'Plans & Subscription', description: 'Manage your current plan, upgrade tiers, and view renewal dates.' }
];

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Navbar />
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10 px-6 py-14">
        <header>
          <h1 className="text-3xl font-semibold text-slate-900">Dashboard</h1>
          <p className="text-sm text-slate-600">Access all filing tools, reminders, and AI guidance from a single workspace.</p>
        </header>

        <section className="grid gap-6 md:grid-cols-2">
          {sections.map((section) => (
            <article key={section.title} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900">{section.title}</h2>
              <p className="mt-2 text-sm text-slate-600">{section.description}</p>
            </article>
          ))}
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-slate-900">Quick Upload</h2>
          <OCRUploader onUpload={() => {}} />
        </section>
      </main>
      <Footer />
    </div>
  );
}
