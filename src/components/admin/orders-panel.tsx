'use client';

import { ChevronDown, Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import type { Order, OrderStatus } from '@/lib/types';
import { cn, formatPrice } from '@/lib/utils';
import { useOrdersStore } from '@/store/orders';
import { useHydrated } from '@/lib/hooks';
import {
  PaymentBadge,
  StatusBadge,
  formatDateTime,
} from '@/components/admin/admin-helpers';
import { Button } from '@/components/ui/button';

const statusFilters: { id: OrderStatus | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'pending', label: 'Pending' },
  { id: 'processing', label: 'Processing' },
  { id: 'shipped', label: 'Shipped' },
  { id: 'delivered', label: 'Delivered' },
  { id: 'cancelled', label: 'Cancelled' },
];

const statusOptions: OrderStatus[] = [
  'pending',
  'processing',
  'shipped',
  'delivered',
  'cancelled',
];

export function OrdersPanel() {
  const { orders, updateStatus, resetOrders } = useOrdersStore();
  const hydrated = useHydrated();
  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'all'>('all');
  const [query, setQuery] = useState('');
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let list = [...orders].sort(
      (a, b) => +new Date(b.createdAt) - +new Date(a.createdAt),
    );
    if (statusFilter !== 'all') {
      list = list.filter((o) => o.status === statusFilter);
    }
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter(
        (o) =>
          o.id.toLowerCase().includes(q) ||
          o.customer.name.toLowerCase().includes(q) ||
          o.customer.phone.toLowerCase().includes(q) ||
          o.customer.city.toLowerCase().includes(q),
      );
    }
    return list;
  }, [orders, statusFilter, query]);

  const toggle = (id: string) => setExpanded((current) => (current === id ? null : id));

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-lg font-bold text-ink-900">Orders</h2>
          <p className="text-sm text-ink-500">
            {hydrated ? `${filtered.length} order${filtered.length === 1 ? '' : 's'}` : 'Loading…'}
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={resetOrders}>
          Reset demo orders
        </Button>
      </div>

      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="scrollbar-thin flex gap-2 overflow-x-auto pb-1">
          {statusFilters.map((filter) => (
            <button
              key={filter.id}
              type="button"
              onClick={() => setStatusFilter(filter.id)}
              className={cn(
                'shrink-0 rounded-full border px-4 py-1.5 text-sm font-medium transition-colors',
                statusFilter === filter.id
                  ? 'border-ink-900 bg-ink-900 text-white'
                  : 'border-ink-300 bg-white text-ink-700 hover:border-ink-400',
              )}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <label className="relative w-full md:w-64">
          <span className="sr-only">Search orders</span>
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by order, name, phone…"
            className="h-10 w-full rounded-xl border border-ink-300 bg-white pl-9 pr-3 text-sm outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-500/30"
          />
        </label>
      </div>

      <div className="overflow-hidden rounded-2xl border border-ink-200 bg-white shadow-card">
        {!hydrated ? (
          <p className="px-5 py-12 text-center text-sm text-ink-400">Loading orders…</p>
        ) : filtered.length === 0 ? (
          <p className="px-5 py-12 text-center text-sm text-ink-400">
            No orders match your filters.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead>
                <tr className="border-b border-ink-200 bg-ink-50 text-xs font-semibold uppercase tracking-wide text-ink-500">
                  <th className="px-5 py-3">Order</th>
                  <th className="px-5 py-3">Customer</th>
                  <th className="px-5 py-3">Items</th>
                  <th className="px-5 py-3">Total</th>
                  <th className="px-5 py-3">Payment</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-200">
                {filtered.map((order) => {
                  const isExpanded = expanded === order.id;
                  return (
                    <OrderRows
                      key={order.id}
                      order={order}
                      isExpanded={isExpanded}
                      onToggle={() => toggle(order.id)}
                      onStatus={(status) => updateStatus(order.id, status)}
                    />
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function OrderRows({
  order,
  isExpanded,
  onToggle,
  onStatus,
}: {
  order: Order;
  isExpanded: boolean;
  onToggle: () => void;
  onStatus: (status: OrderStatus) => void;
}) {
  const itemCount = order.items.reduce((s, i) => s + i.quantity, 0);

  return (
    <>
      <tr
        className="cursor-pointer transition-colors hover:bg-ink-50"
        onClick={onToggle}
        aria-expanded={isExpanded}
      >
        <td className="px-5 py-3">
          <p className="font-semibold text-ink-900">{order.id}</p>
          <p className="text-xs text-ink-500">{formatDateTime(order.createdAt)}</p>
        </td>
        <td className="px-5 py-3">
          <p className="font-medium text-ink-900">{order.customer.name}</p>
          <p className="text-xs text-ink-500">{order.customer.city}</p>
        </td>
        <td className="px-5 py-3 text-ink-600">{itemCount}</td>
        <td className="px-5 py-3 font-bold text-ink-900">{formatPrice(order.subtotal)}</td>
        <td className="px-5 py-3">
          <PaymentBadge method={order.paymentMethod} />
        </td>
        <td className="px-5 py-3">
          <StatusBadge status={order.status} />
        </td>
        <td className="px-5 py-3">
          <ChevronDown
            className={cn('h-4 w-4 text-ink-400 transition-transform', isExpanded && 'rotate-180')}
          />
        </td>
      </tr>
      {isExpanded && (
        <tr className="border-t border-ink-100 bg-ink-50/60">
          <td colSpan={7} className="px-5 py-4">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wide text-ink-400">
                  Customer
                </h4>
                <ul className="mt-2 space-y-1 text-sm text-ink-700">
                  <li>{order.customer.name}</li>
                  <li>{order.customer.phone}</li>
                  <li>
                    {order.customer.address}, {order.customer.city}
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wide text-ink-400">
                  Update status
                </h4>
                <label className="relative mt-2 block">
                  <select
                    value={order.status}
                    onChange={(e) => onStatus(e.target.value as OrderStatus)}
                    onClick={(e) => e.stopPropagation()}
                    className="h-10 w-full appearance-none rounded-xl border border-ink-300 bg-white pl-3 pr-9 text-sm font-medium text-ink-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/30"
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
                </label>
              </div>

              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wide text-ink-400">
                  Items
                </h4>
                <ul className="mt-2 space-y-1.5">
                  {order.items.map((item) => (
                    <li key={item.productId} className="flex items-center justify-between gap-2 text-sm">
                      <span className="text-ink-700">
                        {item.name} <span className="text-ink-400">&times;{item.quantity}</span>
                      </span>
                      <span className="font-medium text-ink-900">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </li>
                  ))}
                  <li className="flex items-center justify-between gap-2 border-t border-ink-200 pt-1.5 text-sm font-bold text-ink-900">
                    <span>Subtotal</span>
                    <span>{formatPrice(order.subtotal)}</span>
                  </li>
                </ul>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}