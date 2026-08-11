'use client';

import { AlertTriangle, Banknote, ClipboardList, Clock } from 'lucide-react';
import { useMemo } from 'react';
import { formatPrice, cn } from '@/lib/utils';
import { useCatalogStore } from '@/store/catalog';
import { useOrdersStore } from '@/store/orders';
import { PaymentBadge, StatusBadge, formatDateTime } from '@/components/admin/admin-helpers';

function StatCard({
  icon: Icon,
  label,
  value,
  hint,
  accent,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  hint?: string;
  accent: string;
}) {
  return (
    <div className="flex items-start gap-4 rounded-2xl border border-ink-200 bg-white p-5 shadow-card">
      <span
        className={cn(
          'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white',
          accent,
        )}
      >
        <Icon className="h-5 w-5" />
      </span>
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">{label}</p>
        <p className="mt-1 truncate text-2xl font-bold text-ink-900">{value}</p>
        {hint && <p className="mt-0.5 truncate text-xs text-ink-500">{hint}</p>}
      </div>
    </div>
  );
}

export function OverviewPanel() {
  const orders = useOrdersStore((s) => s.orders);
  const products = useCatalogStore((s) => s.products);

  const stats = useMemo(() => {
    const active = orders.filter((o) => o.status !== 'cancelled');
    const revenue = active.reduce((sum, o) => sum + o.subtotal, 0);
    const pending = orders.filter((o) => o.status === 'pending').length;
    const lowStock = products
      .filter((p) => p.stock <= 5)
      .sort((a, b) => a.stock - b.stock);
    return { revenue, pending, lowStock, activeCount: active.length };
  }, [orders, products]);

  const recent = useMemo(
    () =>
      [...orders]
        .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt))
        .slice(0, 5),
    [orders],
  );

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-bold text-ink-900">Store overview</h2>
        <p className="text-sm text-ink-500">A snapshot of orders and inventory.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={Banknote}
          label="Total revenue"
          value={formatPrice(stats.revenue)}
          hint={`${stats.activeCount} active order${stats.activeCount === 1 ? '' : 's'}`}
          accent="bg-success"
        />
        <StatCard
          icon={ClipboardList}
          label="Total orders"
          value={String(orders.length)}
          hint="Across all statuses"
          accent="bg-brand-600"
        />
        <StatCard
          icon={Clock}
          label="Pending orders"
          value={String(stats.pending)}
          hint="Awaiting processing"
          accent="bg-warning"
        />
        <StatCard
          icon={AlertTriangle}
          label="Low stock items"
          value={String(stats.lowStock.length)}
          hint={
            stats.lowStock.length > 0
              ? `${stats.lowStock.length} product(s) at or below 5 units`
              : 'All stock levels healthy'
          }
          accent="bg-danger"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-ink-200 bg-white shadow-card">
          <header className="border-b border-ink-200 px-5 py-4">
            <h3 className="font-semibold text-ink-900">Recent orders</h3>
          </header>
          <ul className="divide-y divide-ink-200">
            {recent.map((order) => (
              <li key={order.id} className="flex items-center justify-between gap-3 px-5 py-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-ink-900">
                    {order.customer.name}
                  </p>
                  <p className="text-xs text-ink-500">
                    {order.id} &middot; {formatDateTime(order.createdAt)}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <PaymentBadge method={order.paymentMethod} />
                  <StatusBadge status={order.status} />
                </div>
              </li>
            ))}
            {recent.length === 0 && (
              <li className="px-5 py-10 text-center text-sm text-ink-400">No orders yet.</li>
            )}
          </ul>
        </section>

        <section className="rounded-2xl border border-ink-200 bg-white shadow-card">
          <header className="border-b border-ink-200 px-5 py-4">
            <h3 className="font-semibold text-ink-900">Low stock alerts</h3>
          </header>
          {stats.lowStock.length === 0 ? (
            <p className="px-5 py-10 text-center text-sm text-ink-400">
              All products have healthy stock levels.
            </p>
          ) : (
            <ul className="divide-y divide-ink-200">
              {stats.lowStock.map((product) => (
                <li key={product.id} className="flex items-center justify-between gap-3 px-5 py-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-ink-900">{product.name}</p>
                    <p className="text-xs text-ink-500">{product.brand}</p>
                  </div>
                  <span
                    className={cn(
                      'shrink-0 rounded-full px-2.5 py-0.5 text-xs font-bold',
                      product.stock === 0
                        ? 'bg-danger-light text-danger'
                        : 'bg-warning-light text-warning',
                    )}
                  >
                    {product.stock === 0 ? 'Out of stock' : `${product.stock} left`}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}