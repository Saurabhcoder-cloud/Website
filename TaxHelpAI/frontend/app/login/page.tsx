'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import api from '../../lib/api';
import { useAuth } from '../../hooks/useAuth';

export default function LoginPage() {
  const router = useRouter();
  const { setAuth } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const endpoint = isRegister ? '/auth/register' : '/auth/login';
      const { data } = await api.post(endpoint, form);
      setAuth(data.user, data.token);
      localStorage.setItem('taxhelp_token', data.token);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message ?? 'Unable to authenticate');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex flex-1 items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 px-4">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
          <h1 className="text-2xl font-semibold text-slate-900">{isRegister ? 'Create Account' : 'Sign In'}</h1>
          <p className="mt-2 text-sm text-slate-600">
            {isRegister ? 'Access AI-powered filing in minutes.' : 'Welcome back. Continue filing your taxes.'}
          </p>
          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            {isRegister && (
              <div>
                <label className="block text-sm font-medium text-slate-700">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-slate-700">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
              />
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-primary px-4 py-2 text-white hover:bg-secondary disabled:cursor-not-allowed disabled:bg-slate-400"
            >
              {loading ? 'Processing…' : isRegister ? 'Create Account' : 'Sign In'}
            </button>
          </form>
          <button
            className="mt-4 w-full rounded-lg border border-slate-300 px-4 py-2 text-sm"
            onClick={() => setIsRegister(!isRegister)}
          >
            {isRegister ? 'Already have an account? Sign In' : "Need an account? Register"}
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
