import Link from 'next/link';
import { Cpu, Facebook, Instagram, Twitter, Github } from 'lucide-react';
import { categories } from '@/lib/data/products';
import { BkashLogo, NagadLogo, CodLogo } from '@/components/ui/payment-logos';

const columns = [
  {
    title: 'Shop',
    links: [
      { href: '/catalog', label: 'All Products' },
      ...categories.map((c) => ({ href: `/catalog?category=${c.slug}`, label: c.name })),
    ],
  },
  {
    title: 'Company',
    links: [
      { href: '#', label: 'About Us' },
      { href: '#', label: 'Careers' },
      { href: '#', label: 'Press' },
      { href: '#', label: 'Sustainability' },
    ],
  },
  {
    title: 'Support',
    links: [
      { href: '#', label: 'Contact' },
      { href: '#', label: 'Shipping & Returns' },
      { href: '#', label: 'Warranty' },
      { href: '#', label: 'FAQ' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-20 bg-ink-900 text-ink-300">
      <div className="container grid grid-cols-2 gap-10 py-14 md:grid-cols-4">
        <div className="col-span-2 md:col-span-1">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white">
              <Cpu className="h-5 w-5" />
            </span>
            <span className="text-lg font-extrabold tracking-tight text-white">
              TECHNOVA
            </span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed">
            Your trusted technology store. Cutting-edge gadgets, honest advice and
            support that sticks around long after the box is opened.
          </p>
          <div className="mt-5 flex gap-2">
            {[Twitter, Instagram, Facebook, Github].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="Social link"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-ink-800 text-ink-300 transition-colors hover:bg-brand-600 hover:text-white"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              {col.title}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-ink-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-ink-800">
        <div className="container flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
          <p className="text-xs text-ink-500">
            &copy; {new Date().getFullYear()} Technova Inc. All rights reserved.
          </p>
          <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-4">
            <p className="text-xs text-ink-500">We accept</p>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-2xl bg-[#e2136e] px-3 py-2 text-xs font-semibold text-white">
                <BkashLogo className="h-5 w-5" />
                bKash
              </span>
              <span className="inline-flex items-center gap-2 rounded-2xl bg-[#f6921e] px-3 py-2 text-xs font-semibold text-white">
                <NagadLogo className="h-5 w-5" />
                Nagad
              </span>
              <span className="inline-flex items-center gap-2 rounded-2xl bg-ink-700 px-3 py-2 text-xs font-semibold text-white">
                <CodLogo className="h-5 w-5" />
                COD
              </span>
            </div>
            <span className="hidden text-ink-600 sm:inline">&middot;</span>
            <Link
              href="/admin/dashboard"
              className="text-xs text-ink-500 transition-colors hover:text-white"
            >
              Admin Dashboard
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
