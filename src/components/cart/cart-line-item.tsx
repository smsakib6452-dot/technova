'use client';

import Image from 'next/image';
import { Minus, Plus, Trash2 } from 'lucide-react';
import Link from 'next/link';
import type { CartItem } from '@/lib/types';
import { formatPrice } from '@/lib/utils';
import { useCartStore } from '@/store/cart';

export function CartLineItem({ item }: { item: CartItem }) {
  const { product, quantity } = item;
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);

  return (
    <div className="flex gap-4 rounded-xl border border-ink-200 bg-white p-3 shadow-card">
      <Link
        href={`/products/${product.slug}`}
        className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-ink-100"
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="80px"
          className="object-cover"
        />
      </Link>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-ink-900">{product.name}</p>
            <p className="text-xs text-ink-400">{product.brand}</p>
          </div>
          <button
            type="button"
            onClick={() => removeItem(product.id)}
            className="text-ink-400 transition-colors hover:text-danger"
            aria-label={`Remove ${product.name} from cart`}
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-auto flex items-center justify-between pt-2">
          <div className="flex items-center rounded-lg border border-ink-300">
            <button
              type="button"
              onClick={() => updateQuantity(product.id, quantity - 1)}
              className="flex h-7 w-7 items-center justify-center text-ink-600 hover:text-ink-900 disabled:opacity-40"
              disabled={quantity <= 1}
              aria-label="Decrease quantity"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            <span className="w-8 text-center text-sm font-semibold tabular-nums text-ink-900">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => updateQuantity(product.id, quantity + 1)}
              className="flex h-7 w-7 items-center justify-center text-ink-600 hover:text-ink-900 disabled:opacity-40"
              disabled={quantity >= product.stock}
              aria-label="Increase quantity"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>
          <span className="text-sm font-bold text-ink-900">
            {formatPrice(product.price * quantity)}
          </span>
        </div>
      </div>
    </div>
  );
}
