import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [status, setStatus] = useState(null);

  const handleChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus('Attempting login...');
    try {
      // Placeholder for real API call
      await new Promise((resolve) => setTimeout(resolve, 600));
      setStatus('Login request sent. Replace with API integration.');
    } catch (error) {
      setStatus('Login failed.');
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Navbar />
      <main className="flex flex-1 items-center justify-center px-6 py-16">
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6 rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">Welcome back</h1>
            <p className="text-sm text-slate-600">Log in to access your personalized tax dashboard.</p>
          </div>
          <label className="block text-sm font-medium text-slate-700">
            Email
            <input
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
              className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2 text-sm focus:border-indigo-500 focus:outline-none"
            />
          </label>
          <label className="block text-sm font-medium text-slate-700">
            Password
            <input
              name="password"
              type="password"
              required
              value={form.password}
              onChange={handleChange}
              className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2 text-sm focus:border-indigo-500 focus:outline-none"
            />
          </label>
          <button
            type="submit"
            className="w-full rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500"
          >
            Sign in
          </button>
          {status && <p className="text-center text-xs text-slate-500">{status}</p>}
        </form>
      </main>
      <Footer />
    </div>
  );
}
