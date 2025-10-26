import { Link, NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShieldCheck } from 'lucide-react';

const navItems = [
  { to: '/demo', label: 'Demo' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/security', label: 'Security' },
  { to: '/contact', label: 'Contact' },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/75">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center space-x-2" aria-label="TaxHelp AI home">
          <div className="gradient-primary flex h-9 w-9 items-center justify-center rounded-lg">
            <ShieldCheck className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-semibold tracking-tight">TaxHelp AI</span>
        </Link>

        <nav className="hidden gap-6 md:flex" aria-label="Primary">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors hover:text-primary ${isActive ? 'text-primary' : 'text-muted-foreground'}`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <NavLink
            to="/legal/privacy"
            className={({ isActive }) =>
              `text-sm font-medium transition-colors hover:text-primary ${isActive ? 'text-primary' : 'text-muted-foreground'}`
            }
          >
            Privacy
          </NavLink>
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/demo">View Demo</Link>
          </Button>
          <Button size="sm" asChild>
            <Link to="/contact">Talk to us</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
