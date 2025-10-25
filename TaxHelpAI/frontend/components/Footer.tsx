export default function Footer() {
  return (
    <footer className="bg-slate-900 py-6 text-slate-200">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 text-sm sm:flex-row">
        <p>&copy; {new Date().getFullYear()} TaxHelp AI. All rights reserved.</p>
        <div className="flex gap-4">
          <a href="/privacy" className="hover:text-white">
            Privacy
          </a>
          <a href="/terms" className="hover:text-white">
            Terms
          </a>
          <a href="mailto:support@taxhelp.ai" className="hover:text-white">
            Support
          </a>
        </div>
      </div>
    </footer>
  );
}
