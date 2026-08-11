'use client';

import { X, ShoppingBag, Truck } from 'lucide-react';
import { useEffect } from 'react';
import { formatPrice, cn } from '@/lib/utils';
import { useHydrated } from '@/lib/hooks';
import { useCartStore } from '@/store/cart';
import { Button } from '@/components/ui/button';
import { CartLineItem } from '@/components/cart/cart-line-item';

const FREE_SHIPPING_THRESHOLD = 150;

export function CartDrawer() {
  const { items, isOpen, close, clear, subtotal, count } = useCartStore();
  const hydrated = useHydrated();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    if (isOpen) {
      document.addEventListener('keydown', onKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, close]);

  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal());
  const progress = Math.min(100, (subtotal() / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <div className={cn('fixed inset-0 z-50', !isOpen && 'pointer-events-none')}>
      <div
        className={cn(
          'absolute inset-0 bg-ink-900/50 backdrop-blur-sm transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'opacity-0',
        )}
        onClick={close}
        aria-hidden="true"
      />

      <aside
        className={cn(
          'absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-surface shadow-drawer transition-transform duration-300 ease-out',
          isOpen ? 'translate-x-0' : 'translate-x-full',
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
      >
        <header className="flex items-center justify-between border-b border-ink-200 bg-white px-5 py-4">
          <h2 className="flex items-center gap-2 text-lg font-bold text-ink-900">
            <ShoppingBag className="h-5 w-5 text-brand-600" />
            Your Cart
            {hydrated && count() > 0 && (
              <span className="rounded-full bg-brand-600 px-2 py-0.5 text-xs font-semibold text-white">
                {count()}
              </span>
            )}
          </h2>
          <button
            type="button"
            onClick={close}
            className="flex h-9 w-9 items-center justify-center rounded-full text-ink-500 transition-colors hover:bg-ink-100 hover:text-ink-900"
            aria-label="Close cart"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        {hydrated && items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-ink-100">
              <ShoppingBag className="h-8 w-8 text-ink-400" />
            </div>
            <p className="text-lg font-semibold text-ink-900">Your cart is empty</p>
            <p className="text-sm text-ink-500">
              Add some tech to your collection and it will show up here.
            </p>
            <Button onClick={close} className="mt-2">
              Continue shopping
            </Button>
          </div>
        ) : (
          <>
            <div className="border-b border-ink-200 bg-white px-5 py-3">
              <div className="flex items-center gap-2 text-sm text-ink-700">
                <Truck className="h-4 w-4 text-brand-600" />
                {remaining > 0 ? (
                  <span>
                    Add <strong>{formatPrice(remaining)}</strong> more for free shipping
                  </span>
                ) : (
                  <span className="font-semibold text-success">You qualify for free shipping!</span>
                )}
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-ink-200">
                <div
                  className="h-full rounded-full bg-success transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div className="scrollbar-thin flex-1 space-y-3 overflow-y-auto px-5 py-4">
              {items.map((item) => (
                <CartLineItem key={item.product.id} item={item} />
              ))}
            </div>

            <footer className="border-t border-ink-200 bg-white px-5 py-4">
              <div className="flex items-center justify-between text-sm text-ink-500">
                <span>Subtotal</span>
                <span className="text-base font-bold text-ink-900">
                  {formatPrice(subtotal())}
                </span>
              </div>
              <p className="mt-1 text-xs text-ink-400">
                Taxes and shipping calculated at checkout.
              </p>
              <Button size="lg" className="mt-3 w-full">
                Checkout
              </Button>
              <div className="mt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={clear}
                  className="text-xs font-medium text-ink-400 underline-offset-2 hover:text-danger hover:underline"
                >
                  Clear cart
                </button>
                <button
                  type="button"
                  onClick={close}
                  className="text-xs font-medium text-ink-400 underline-offset-2 hover:text-ink-900 hover:underline"
                >
                  Continue shopping
                </button>
              </div>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}
