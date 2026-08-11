'use client';

import type { OrderStatus, PaymentMethod } from '@/lib/types';
import { cn } from '@/lib/utils';
import { PaymentLogo } from '@/components/ui/payment-logos';

export const statusLabels: Record<OrderStatus, string> = {
  pending: 'Pending',
  processing: 'Processing',
  shipped: 'Shipped',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
};

export const statusStyles: Record<OrderStatus, string> = {
  pending: 'bg-warning-light text-warning',
  processing: 'bg-brand-100 text-brand-800',
  shipped: 'bg-ink-200 text-ink-800',
  delivered: 'bg-success-light text-success',
  cancelled: 'bg-danger-light text-danger',
};

export const paymentLabels: Record<PaymentMethod, string> = {
  bkash: 'bKash',
  nagad: 'Nagad',
  cod: 'Cash on Delivery',
};

export const paymentStyles: Record<PaymentMethod, string> = {
  bkash: 'bg-[#e2136e]',
  nagad: 'bg-[#f6921e]',
  cod: 'bg-ink-800',
};

export function StatusBadge({ status }: { status: OrderStatus }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide',
        statusStyles[status],
      )}
    >
      {statusLabels[status]}
    </span>
  );
}

export function PaymentBadge({ method }: { method: PaymentMethod }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full px-2.5 py-0.5 text-[11px] font-semibold text-white',
        paymentStyles[method],
      )}
    >
      <span className="flex h-4 w-4 items-center justify-center rounded-full bg-white/20">
        <PaymentLogo method={method} className="h-3.5 w-3.5" />
      </span>
      {paymentLabels[method]}
    </span>
  );
}

export function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString('en-GB', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}
