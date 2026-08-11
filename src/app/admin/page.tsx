'use client';

import {
  Cpu,
  LayoutDashboard,
  LogOut,
  Package,
  ShoppingBag,
  Store,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { useHydrated } from '@/lib/hooks';
import { useAdminStore } from '@/store/admin';
import { LoginForm } from '@/components/admin/login-form';
import { OverviewPanel } from '@/components/admin/overview-panel';
import { OrdersPanel } from '@/components/admin/orders-panel';
import { ProductsPanel } from '@/components/admin/products-panel';
import { Button } from '@/components/ui/button';

type TabId = 'overview' | 'orders' | 'products';

const tabs: { id: TabId; label: string; icon: React.ElementType }[] = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'orders', label: 'Orders', icon: ShoppingBag },
  { id: 'products', label: 'Products', icon: Package },
];

export default function AdminPage() {
  const { isAuthenticated, logout } = useAdminStore();
  const hydrated = useHydrated();
  const [activeTab, setActiveTab] = useState<TabId>('overview');

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
                TECHNOVA Admin
              </p>
              <p className="text-xs text-ink-500">Management console</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/admin/dashboard"
              className="inline-flex h-10 items-center gap-2 rounded-xl border border-ink-300 bg-white px-3 text-sm font-medium text-ink-700 transition-colors hover:border-ink-400 hover:bg-ink-50"
            >
              <LayoutDashboard className="h-4 w-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </Link>
            <Link
              href="/"
              className="inline-flex h-10 items-center gap-2 rounded-xl border border-ink-300 bg-white px-3 text-sm font-medium text-ink-700 transition-colors hover:border-ink-400 hover:bg-ink-50"
            >
              <Store className="h-4 w-4" />
              <span className="hidden sm:inline">View store</span>
            </Link>
            <Button variant="outline" onClick={logout}>
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Log out</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="container flex flex-col gap-8 py-8 lg:flex-row">
        <aside className="shrink-0 lg:w-56">
          <nav className="scrollbar-thin flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:pb-0">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    'flex shrink-0 items-center gap-2.5 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors',
                    active
                      ? 'bg-ink-900 text-white'
                      : 'text-ink-700 hover:bg-ink-100 hover:text-ink-900',
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </aside>

        <section className="min-w-0 flex-1 pb-16">
          {activeTab === 'overview' && <OverviewPanel />}
          {activeTab === 'orders' && <OrdersPanel />}
          {activeTab === 'products' && <ProductsPanel />}
        </section>
      </div>
    </div>
  );
}