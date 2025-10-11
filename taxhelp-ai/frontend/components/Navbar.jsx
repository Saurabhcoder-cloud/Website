import Link from 'next/link';

const links = [
  { href: '/', label: 'Home' },
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/chatbot', label: 'AI Assistant' },
  { href: '/subscription', label: 'Plans' }
];

export default function Navbar() {
  return (
    <header className="border-b bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-semibold text-indigo-600">
          TaxHelp AI
        </Link>
        <nav className="flex items-center gap-4 text-sm font-medium text-slate-600">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-indigo-600">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
