'use client';

import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { SecQALogo } from '@/components/SecQALogo';
import { useState } from 'react';

export function TopNavBar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const centerLinks = [
    { label: 'Product', href: '/products/security-questionnaire-automation' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Customers', href: '/customers' },
    { label: 'About', href: '/about' },
    { label: 'Resources', href: '/blog' },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A]/95 backdrop-blur-sm border-b border-white/[0.06]"
      aria-label="Primary navigation"
    >
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 flex items-center justify-between h-14">
        {/* Left: Menu button + Logo */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/[0.15] transition-colors shrink-0"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={16} strokeWidth={1.5} className="text-white/60" /> : <Menu size={16} strokeWidth={1.5} className="text-white/60" />}
          </button>
          <SecQALogo />
        </div>

        {/* Center: Key links (hidden on mobile) */}
        <div className="hidden lg:flex items-center gap-6">
          {centerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[12px] font-medium text-white/50 hover:text-white transition-colors nav-link"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right: Contact + Login */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <Link
            href="/auth/sign-in"
            className="hidden md:inline-flex items-center px-4 py-1.5 rounded border border-white/[0.12] text-white text-[11px] font-semibold hover:border-white/25 hover:bg-white/[0.04] transition-colors"
          >
            Log In
          </Link>
          <Link
            href="/pricing"
            className="inline-flex items-center px-4 py-1.5 rounded bg-white text-black text-[11px] font-semibold hover:bg-white/90 transition-colors"
          >
            Request a Demo
          </Link>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-white/[0.06] bg-[#0A0A0A] px-4 py-4 space-y-3">
          {centerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block text-sm font-medium text-white/60 hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/auth/sign-in"
            onClick={() => setMobileOpen(false)}
            className="block text-sm font-medium text-white/60 hover:text-white transition-colors"
          >
            Log In
          </Link>
        </div>
      )}
    </nav>
  );
}
