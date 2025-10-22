
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Calculator, MessageCircle, Upload, User } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
            <Calculator className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold">TaxHelp AI</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/refund-calculator" className="text-sm font-medium hover:text-primary transition-colors">
            Calculator
          </Link>
          <Link to="/chat" className="text-sm font-medium hover:text-primary transition-colors">
            AI Assistant
          </Link>
          <Link to="/file-taxes" className="text-sm font-medium hover:text-primary transition-colors">
            File Taxes
          </Link>
          <Link to="/pricing" className="text-sm font-medium hover:text-primary transition-colors">
            Pricing
          </Link>
        </nav>
        
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/login">Login</Link>
          </Button>
          <Button size="sm" asChild>
            <Link to="/register">Get Started</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}