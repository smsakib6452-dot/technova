'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Cpu, Menu, Search, ShoppingCart, X, Zap } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { categories } from '@/lib/data/products';
import { cn } from '@/lib/utils';
import { useHydrated } from '@/lib/hooks';
import { useCartStore } from '@/store/cart';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/catalog', label: 'Shop All' },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState('');
  const hydrated = useHydrated();
  const count = useCartStore((s) => s.items.reduce((sum, i) => sum + i.quantity, 0));
  const toggle = useCartStore((s) => s.toggle);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    router.push(q ? `/catalog?q=${encodeURIComponent(q)}` : '/catalog');
    setQuery('');
    searchRef.current?.blur();
  };

  return (
    <>
      <div className="bg-ink-900 text-white">
        <div className="container flex items-center justify-center gap-2 py-2 text-xs font-medium tracking-wide">
          <Zap className="h-3.5 w-3.5 text-warning" />
          Free shipping on orders over $150 &middot; 30-day easy returns
        </div>
      </div>

      <header className="sticky top-0 z-40 border-b border-ink-200 bg-white/90 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-xl text-ink-700 transition-colors hover:bg-ink-100 lg:hidden"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <Link href="/" className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white shadow-sm">
                <Cpu className="h-5 w-5" />
              </span>
              <span className="text-lg font-extrabold tracking-tight text-ink-900">
                TECHNOVA
              </span>
            </Link>
          </div>

          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  pathname === link.href
                    ? 'bg-brand-50 text-brand-700'
                    : 'text-ink-700 hover:bg-ink-100 hover:text-ink-900',
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="group relative">
              <button
                type="button"
                className="rounded-lg px-3 py-2 text-sm font-medium text-ink-700 transition-colors hover:bg-ink-100 hover:text-ink-900"
              >
                Categories
              </button>
              <div className="invisible absolute left-0 top-full z-50 w-56 translate-y-1 rounded-xl border border-ink-200 bg-white p-2 opacity-0 shadow-popover transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/catalog?category=${category.slug}`}
                    className="block rounded-lg px-3 py-2 text-sm text-ink-700 transition-colors hover:bg-ink-100 hover:text-brand-700"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>
          </nav>

          <div className="flex items-center gap-2">
            <form
              onSubmit={submitSearch}
              className="hidden items-center md:flex"
              role="search"
            >
              <label className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
                <input
                  ref={searchRef}
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search products..."
                  className="h-10 w-56 rounded-xl border border-ink-300 bg-ink-50 pl-9 pr-3 text-sm outline-none transition-all focus:w-72 focus:border-brand-500 focus:bg-white focus:ring-2 focus:ring-brand-500/30"
                />
              </label>
            </form>

            <button
              type="button"
              onClick={toggle}
              className="relative flex h-10 w-10 items-center justify-center rounded-xl text-ink-700 transition-colors hover:bg-ink-100"
              aria-label="Open cart"
            >
              <ShoppingCart className="h-5 w-5" />
              {hydrated && count > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-600 px-1 text-[10px] font-bold text-white">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="border-t border-ink-200 bg-white lg:hidden">
            <nav className="container flex flex-col gap-1 py-3">
              <Link href="/catalog" className="rounded-lg px-3 py-2.5 text-sm font-medium text-ink-900 hover:bg-ink-100">
                Shop All
              </Link>
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/catalog?category=${category.slug}`}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-ink-700 hover:bg-ink-100"
                >
                  {category.name}
                </Link>
              ))}
              <form onSubmit={submitSearch} className="mt-1 flex gap-2 px-3 pb-1 md:hidden">
                <label className="relative flex-1">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
                  <input
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search products..."
                    className="h-10 w-full rounded-xl border border-ink-300 bg-ink-50 pl-9 pr-3 text-sm outline-none focus:border-brand-500 focus:bg-white focus:ring-2 focus:ring-brand-500/30"
                  />
                </label>
              </form>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
