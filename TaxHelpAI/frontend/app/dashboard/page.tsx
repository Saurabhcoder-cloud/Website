'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useAuth } from '../../hooks/useAuth';
import Link from 'next/link';

const tabs = [
  { href: '/chatbot', title: 'Chat Assistant', description: 'Ask tax questions with AI-powered insights.' },
  { href: '/refund-calculator', title: 'Refund Calculator', description: 'Estimate your refund instantly.' },
  { href: '/file-taxes', title: 'File Taxes', description: 'Upload W-2/1099 forms and auto-fill 1040 PDFs.' },
  { href: '/documents', title: 'My Documents', description: 'Manage your uploaded forms and PDFs.' },
  { href: '/subscription', title: 'Subscription Plan', description: 'Upgrade to unlock premium features.' }
];

export default function DashboardPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-slate-100 py-12">
        <div className="mx-auto max-w-5xl space-y-6 px-4">
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h1 className="text-2xl font-semibold text-slate-900">Welcome back, {user.name}</h1>
            <p className="mt-2 text-sm text-slate-600">
              Current plan: <span className="font-medium text-primary uppercase">{user.plan}</span>
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {tabs.map((tab) => (
              <Link
                key={tab.href}
                href={tab.href}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <h2 className="text-lg font-semibold text-slate-900">{tab.title}</h2>
                <p className="mt-2 text-sm text-slate-600">{tab.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
