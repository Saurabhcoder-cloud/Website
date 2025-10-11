import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PlanCard from '../components/PlanCard';

const plans = [
  {
    name: 'Free',
    price: '$0',
    features: ['AI chat assistant', 'Demo refund calculator']
  },
  {
    name: 'Standard',
    price: '$9.99',
    features: ['Single W-2 filing', 'Stripe checkout integration', 'Basic reminders']
  },
  {
    name: 'Pro',
    price: '$19.99',
    features: ['1099 + Schedule C support', 'OCR auto-fill', 'Priority support']
  },
  {
    name: 'Premium',
    price: '$29.99',
    features: ['Joint filing', 'Automated reminders', 'PDF form delivery']
  }
];

export default function SubscriptionPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Navbar />
      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8 px-6 py-14">
        <header className="text-center">
          <h1 className="text-3xl font-semibold text-slate-900">Subscription plans</h1>
          <p className="text-sm text-slate-600">
            Upgrade to unlock OCR uploads, PDF generation, multilingual chat, and proactive reminders.
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan) => (
            <PlanCard key={plan.name} name={plan.name} price={plan.price} features={plan.features} ctaLabel="Select" />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
