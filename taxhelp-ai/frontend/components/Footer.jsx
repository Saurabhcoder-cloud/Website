export default function Footer() {
  return (
    <footer className="border-t bg-slate-50">
      <div className="mx-auto max-w-6xl px-6 py-6 text-sm text-slate-500">
        <p>© {new Date().getFullYear()} TaxHelp AI. Built to simplify U.S. tax filing.</p>
      </div>
    </footer>
  );
}
