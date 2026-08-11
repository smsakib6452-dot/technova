import Link from 'next/link';
import { Cpu, Facebook, Instagram, Twitter, Github } from 'lucide-react';
import { categories } from '@/lib/data/products';

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
        <div className="container flex flex-col items-center justify-between gap-2 py-6 text-xs text-ink-500 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} Technova Inc. All rights reserved.</p>
          <p>Demo storefront &middot; Product images via Unsplash &amp; Pexels</p>
        </div>
      </div>
    </footer>
  );
}
