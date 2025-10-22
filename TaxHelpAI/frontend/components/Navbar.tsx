'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../hooks/useAuth';

const links = [
  { href: '/', label: 'Home' },
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/refund-calculator', label: 'Refund Calculator' },
  { href: '/chatbot', label: 'Chat Assistant' }
];

export default function Navbar() {
  const pathname = usePathname();
  const { user, clear } = useAuth();

  return (
    <header className="bg-white shadow">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-2xl font-semibold text-primary">
          TaxHelp AI
        </Link>
        <nav className="flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium ${pathname === link.href ? 'text-primary' : 'text-slate-600'}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3 text-sm">
          {user ? (
            <>
              <span className="hidden sm:block">{user.name}</span>
              <button
                onClick={clear}
                className="rounded-md bg-primary px-4 py-2 text-white shadow hover:bg-secondary"
              >
                Logout
              </button>
            </>
          ) : (
            <Link href="/login" className="rounded-md bg-primary px-4 py-2 text-white shadow hover:bg-secondary">
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
