'use client';

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ChatWindow from '../../components/ChatWindow';
import { useAuth } from '../../hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ChatbotPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push('/login');
  }, [user, router]);

  if (!user) {
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-slate-100 py-10">
        <div className="mx-auto h-[70vh] max-w-4xl overflow-hidden rounded-2xl bg-white shadow-lg">
          <ChatWindow />
        </div>
      </main>
      <Footer />
    </div>
  );
}
