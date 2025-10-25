'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { loginSchema, registerSchema } from '../../lib/zod';

export default function LoginPage() {
  const router = useRouter();
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    try {
      if (isRegister) {
        const parsed = registerSchema.parse(form);
        setLoading(true);
        const response = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(parsed)
        });
        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error ?? 'Unable to register');
        }
      } else {
        loginSchema.parse({ email: form.email, password: form.password });
      }

      setLoading(true);
      const result = await signIn('credentials', {
        redirect: false,
        email: form.email,
        password: form.password
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message ?? 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-950 to-slate-900 px-6">
      <div className="card w-full max-w-md p-8">
        <h1 className="text-2xl font-bold text-white">{isRegister ? 'Create your account' : 'Sign in to TaxHelp AI'}</h1>
        <p className="mt-2 text-sm text-slate-400">
          {isRegister ? 'Register to unlock the AI tax assistant.' : 'Use your credentials or continue with Google.'}
        </p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {isRegister && (
            <label className="flex flex-col gap-2 text-sm">
              Name
              <input
                className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2"
                value={form.name}
                onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
              />
            </label>
          )}
          <label className="flex flex-col gap-2 text-sm">
            Email
            <input
              type="email"
              className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2"
              value={form.email}
              onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
              required
            />
          </label>
          <label className="flex flex-col gap-2 text-sm">
            Password
            <input
              type="password"
              className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2"
              value={form.password}
              onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))}
              required
            />
          </label>
          {error && <p className="text-xs text-red-400">{error}</p>}
          <button
            type="submit"
            className="w-full rounded-xl bg-primary-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
            disabled={loading}
          >
            {loading ? 'Processing…' : isRegister ? 'Create account' : 'Sign in'}
          </button>
        </form>
        <button
          className="mt-4 w-full rounded-xl border border-slate-700 px-4 py-2 text-sm text-slate-100"
          onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
        >
          Continue with Google
        </button>
        <p className="mt-4 text-sm text-slate-400">
          {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button className="text-primary-300" onClick={() => setIsRegister((prev) => !prev)}>
            {isRegister ? 'Sign in' : 'Create one'}
          </button>
        </p>
      </div>
    </div>
  );
}
