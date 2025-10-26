import { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  const location = useLocation();

  useEffect(() => {
    console.error('404 Error: User attempted to access non-existent route:', location.pathname);
  }, [location.pathname]);

  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center bg-background px-4 text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-primary">Error 404</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">We couldn&apos;t find that page</h1>
      <p className="mt-4 max-w-xl text-sm text-muted-foreground">
        The link you followed may be broken or the page may have been removed. Return home to explore the TaxHelp AI demo, pricing,
        and security documentation.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Button asChild>
          <Link to="/">Go home</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link to="/contact">Contact support</Link>
        </Button>
      </div>
    </section>
  );
}
