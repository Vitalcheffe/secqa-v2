'use client';

import Link from 'next/link';
import { SecQALogo } from '@/components/SecQALogo';

export function Footer() {
  const productLinks = [
    { name: 'Questionnaire Automation', href: '/products/security-questionnaire-automation' },
    { name: 'Trust Center', href: '/products/trust-center' },
    { name: 'Knowledge Management', href: '/products/knowledge-management' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Integrations', href: '/integrations' },
    { name: 'Demo', href: '/demo' },
  ];

  const companyLinks = [
    { name: 'About', href: '/about' },
    { name: 'Customers', href: '/customers' },
    { name: 'Blog', href: '/blog' },
    { name: 'Changelog', href: '/changelog' },
    { name: 'Contact', href: '/contact' },
  ];

  const trustLinks = [
    { name: 'Trust Center', href: '/trust-center' },
    { name: 'Security', href: '/security' },
    { name: 'Privacy Policy', href: '/legal/privacy' },
    { name: 'Terms of Service', href: '/legal/terms' },
    { name: 'DPA', href: '/legal/dpa' },
  ];

  const compareLinks = [
    { name: 'vs Vanta', href: '/compare/secqa-vs-vanta' },
    { name: 'vs Conveyor', href: '/compare/secqa-vs-conveyor' },
    { name: 'vs Drata', href: '/compare/secqa-vs-drata' },
    { name: 'vs Secureframe', href: '/compare/secqa-vs-secureframe' },
    { name: 'vs Loopio', href: '/compare/secqa-vs-loopio' },
  ];

  return (
    <footer className="bg-[#0A0A0A] border-t border-white/[0.06] pt-16 pb-8">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-12">
          {/* Logo + tagline */}
          <div className="col-span-2">
            <SecQALogo />
            <p className="mt-4 text-[13px] text-white/40 leading-relaxed max-w-[240px]">
              Security questionnaires, answered. AI-powered automation for B2B SaaS.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-[10px] font-semibold text-white/30 uppercase tracking-wider mb-3">Product</h4>
            <ul className="space-y-2">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[12px] text-white/50 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-[10px] font-semibold text-white/30 uppercase tracking-wider mb-3">Company</h4>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[12px] text-white/50 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Compare */}
          <div>
            <h4 className="text-[10px] font-semibold text-white/30 uppercase tracking-wider mb-3">Compare</h4>
            <ul className="space-y-2">
              {compareLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[12px] text-white/50 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Trust */}
          <div>
            <h4 className="text-[10px] font-semibold text-white/30 uppercase tracking-wider mb-3">Trust</h4>
            <ul className="space-y-2">
              {trustLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[12px] text-white/50 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-white/30">
            © 2026 SecQA. Security questionnaires, answered.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/legal/privacy" className="text-[11px] text-white/30 hover:text-white/60 transition-colors">Privacy</Link>
            <Link href="/legal/terms" className="text-[11px] text-white/30 hover:text-white/60 transition-colors">Terms</Link>
            <Link href="/legal/security" className="text-[11px] text-white/30 hover:text-white/60 transition-colors">Security</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
