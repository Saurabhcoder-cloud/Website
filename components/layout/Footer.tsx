import Link from "next/link";
import { ShieldCheck } from "lucide-react";

const footerLinks = [
  {
    title: "Product",
    items: [
      { label: "Demo", href: "/demo" },
      { label: "Pricing", href: "/pricing" },
      { label: "Security", href: "/security" }
    ]
  },
  {
    title: "Company",
    items: [
      { label: "Contact", href: "/contact" },
      { label: "Privacy Policy", href: "/legal/privacy" },
      { label: "Terms of Service", href: "/legal/terms" }
    ]
  },
  {
    title: "Resources",
    items: [
      { label: "Tax Rules Mapping", href: "/demo#rules" },
      { label: "Consent & Retention", href: "/demo#consent" },
      { label: "Support", href: "/contact#support" }
    ]
  }
];

export function Footer() {
  return (
    <footer className="border-t bg-muted/40 text-muted-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="space-y-4 text-foreground">
            <Link href="/" className="flex items-center space-x-2" aria-label="TaxHelp AI home">
              <div className="gradient-primary flex h-9 w-9 items-center justify-center rounded-lg">
                <ShieldCheck className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-semibold tracking-tight">TaxHelp AI</span>
            </Link>
            <p className="text-sm">
              Explainable tax automation built for U.S. gig workers, students, retirees, and the professionals who support them.
            </p>
            <p className="text-xs text-muted-foreground">
              Vercel hosted • SOC2-ready infrastructure • U.S. data residency
            </p>
          </div>

          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground">{section.title}</h3>
              <ul className="mt-4 space-y-2">
                {section.items.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="text-sm transition-colors hover:text-primary">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t pt-6 text-center text-xs">
          <p>&copy; {new Date().getFullYear()} TaxHelp AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
