import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PlanCard from '../components/PlanCard';

const plans = [
  {
    name: 'Free',
    price: '$0',
    features: ['AI chat assistant', 'Demo refund calculator', 'Basic reminders']
  },
  {
    name: 'Standard',
    price: '$9.99',
    features: ['Single W-2 filing', 'Document storage', 'Email support']
  },
  {
    name: 'Pro',
    price: '$19.99',
    features: ['1099 + Schedule C support', 'OCR auto-fill', 'Priority chat access']
  },
  {
    name: 'Premium',
    price: '$29.99',
    features: ['Joint filing workflows', 'Automated reminders', 'PDF generation for IRS forms']
  }
];

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Navbar />
      <main className="flex-1">
        <section className="bg-gradient-to-br from-indigo-50 via-white to-slate-100">
          <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-16 text-center">
            <span className="mx-auto rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-indigo-700">
              AI-Powered Tax Assistant
            </span>
            <h1 className="text-4xl font-bold text-slate-900 md:text-5xl">
              File your U.S. taxes with confidence and real-time AI guidance.
            </h1>
            <p className="mx-auto max-w-3xl text-lg text-slate-600">
              TaxHelp AI combines IRS expertise, OpenAI copilots, and automated document processing to streamline every step of filing.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="mb-8 text-2xl font-semibold text-slate-900">Choose the plan that fits your filing needs</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {plans.map((plan) => (
              <PlanCard key={plan.name} name={plan.name} price={plan.price} features={plan.features} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
