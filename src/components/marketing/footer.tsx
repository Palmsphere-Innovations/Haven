import Link from "next/link";
import React from "react";
import { BrandLogo } from "./brand-logo";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterSectionProps {
  title: string;
  links: FooterLink[];
}

const FooterColumn: React.FC<FooterSectionProps> = ({ title, links }) => (
  <div>
    <h4 className="text-xs font-semibold text-neutral-900 tracking-wider uppercase mb-4">{title}</h4>
    <ul className="space-y-2.5 text-sm text-neutral-600">
      {links.map((link) => (
        <li key={link.label}>
          <Link className="hover:text-[#132A20] transition-colors" href={link.href}>
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export const Footer: React.FC = () => {
  const companyLinks: FooterLink[] = [
    { label: "About Us", href: "/#about" },
    { label: "Careers", href: "/#careers" },
    { label: "Press & News", href: "/#press" },
    { label: "Contact", href: "/#contact" },
  ];

  const productLinks: FooterLink[] = [
    { label: "Rent Tracking", href: "/#rent-tracking" },
    { label: "Maintenance Dispatch", href: "/#maintenance" },
    { label: "Compliance Vault", href: "/#compliance" },
    { label: "Artisan Network", href: "/#artisans" },
  ];

  const supportLinks: FooterLink[] = [
    { label: "Help Centre", href: "/#help-center" },
    { label: "Agency Onboarding", href: "/#onboarding" },
    { label: "Developer Docs", href: "/#api-docs" },
    { label: "System Status", href: "/#status" },
  ];

  const legalLinks: FooterLink[] = [
    { label: "Privacy Policy", href: "/#privacy" },
    { label: "Terms of Service", href: "/#terms" },
    { label: "Security & GDPR", href: "/#security" },
    { label: "Cookie Settings", href: "/#cookies" },
  ];

  return (
    <footer className="border-t border-neutral-200 bg-[#FCF9F8]" data-purpose="footer">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-6 md:gap-10 lg:gap-12">
          {/* Brand Col */}
          <div className="md:col-span-2">
            <Link aria-label="Haven Homepage" className="h-8 flex items-center mb-4" href="/">
              <BrandLogo />
            </Link>
            <p className="text-sm text-neutral-500 max-w-sm mb-4 leading-relaxed">
              A unified standard for UK property management and compliance.
            </p>
            <div className="inline-flex items-center gap-2 text-xs font-medium text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200/80">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
              Compliant with UK PRS statutes
            </div>
          </div>

          <FooterColumn title="Company" links={companyLinks} />
          <FooterColumn title="Product" links={productLinks} />
          <FooterColumn title="Support" links={supportLinks} />
          <FooterColumn title="Legal" links={legalLinks} />
        </div>

        {/* Bottom copyright row */}
        <div className="mt-10 flex items-center justify-center border-t border-neutral-200/80 pt-6 text-center text-xs text-neutral-500 sm:mt-14 sm:justify-start sm:pt-8 sm:text-left">
          <div>© 2026 Haven Platform Ltd. UK Registered.</div>
        </div>
      </div>
    </footer>
  );
};
