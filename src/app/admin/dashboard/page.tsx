'use client';

import { Cpu, LayoutDashboard, Package, ShoppingBag, Store } from 'lucide-react';
import Link from 'next/link';
import { useAdminStore } from '@/store/admin';
import { LoginForm } from '@/components/admin/login-form';
import { OverviewPanel } from '@/components/admin/overview-panel';
import { Button } from '@/components/ui/button';
import { useHydrated } from '@/lib/hooks';

export default function AdminDashboardPage() {
  const { isAuthenticated, logout } = useAdminStore();
  const hydrated = useHydrated();

  if (!hydrated) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-sm text-ink-400">
        Loading…
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  return (
    <div className="min-h-screen bg-surface">
      <header className="sticky top-0 z-40 border-b border-ink-200 bg-white/90 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-ink-900 text-white">
              <Cpu className="h-5 w-5" />
            </span>
            <div className="leading-tight">
              <p className="text-sm font-extrabold tracking-tight text-ink-900">
                TECHNOVA Admin Dashboard
              </p>
              <p className="text-xs text-ink-500">Fast access to orders, inventory, and store metrics.</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/admin"
              className="inline-flex h-10 items-center gap-2 rounded-xl border border-ink-300 bg-white px-3 text-sm font-medium text-ink-700 transition-colors hover:border-ink-400 hover:bg-ink-50"
            >
              <LayoutDashboard className="h-4 w-4" />
              Console
            </Link>
            <Link
              href="/"
              className="inline-flex h-10 items-center gap-2 rounded-xl border border-ink-300 bg-white px-3 text-sm font-medium text-ink-700 transition-colors hover:border-ink-400 hover:bg-ink-50"
            >
              <Store className="h-4 w-4" />
              View store
            </Link>
            <Button variant="outline" onClick={logout}>
              <ShoppingBag className="h-4 w-4" />
              Log out
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-10">
        <section className="space-y-6">
          <div className="max-w-3xl space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-700">
              Admin Dashboard
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
              Store performance at a glance
            </h1>
            <p className="max-w-2xl text-sm leading-6 text-ink-500">
              Monitor revenue, orders, and stock levels, then jump straight into management tools.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <Link
              href="/admin"
              className="group rounded-3xl border border-ink-200 bg-white p-6 transition hover:border-ink-300 hover:shadow-card"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ink-900 text-white">
                <LayoutDashboard className="h-5 w-5" />
              </div>
              <h2 className="mt-5 text-lg font-semibold text-ink-900">Admin console</h2>
              <p className="mt-2 text-sm text-ink-500">
                Manage orders, product catalog and advanced admin actions.
              </p>
            </Link>

            <Link
              href="/admin"
              className="group rounded-3xl border border-ink-200 bg-white p-6 transition hover:border-ink-300 hover:shadow-card"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ink-900 text-white">
                <ShoppingBag className="h-5 w-5" />
              </div>
              <h2 className="mt-5 text-lg font-semibold text-ink-900">Orders</h2>
              <p className="mt-2 text-sm text-ink-500">
                Review and update order statuses to keep fulfillment moving.
              </p>
            </Link>

            <Link
              href="/admin"
              className="group rounded-3xl border border-ink-200 bg-white p-6 transition hover:border-ink-300 hover:shadow-card"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ink-900 text-white">
                <Package className="h-5 w-5" />
              </div>
              <h2 className="mt-5 text-lg font-semibold text-ink-900">Catalog</h2>
              <p className="mt-2 text-sm text-ink-500">
                Update product listings, stock, and featured items from one place.
              </p>
            </Link>
          </div>
        </section>

        <section className="mt-10">
          <OverviewPanel />
        </section>
      </main>
    </div>
  );
}
