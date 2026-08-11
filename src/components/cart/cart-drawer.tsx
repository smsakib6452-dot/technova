'use client';

import { X, ShoppingBag, Truck, Check, PartyPopper } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import type { PaymentMethod } from '@/lib/types';
import { formatPrice, cn } from '@/lib/utils';
import { PaymentLogo } from '@/components/ui/payment-logos';
import { useHydrated } from '@/lib/hooks';
import { useCartStore } from '@/store/cart';
import { useOrdersStore } from '@/store/orders';
import { Button } from '@/components/ui/button';
import { CartLineItem } from '@/components/cart/cart-line-item';

const FREE_SHIPPING_THRESHOLD = 25000;

const paymentMethods: { id: PaymentMethod; label: string; hint: string; className: string }[] = [
  { id: 'bkash', label: 'bKash', hint: 'Mobile wallet', className: 'bg-[#e2136e]' },
  { id: 'nagad', label: 'Nagad', hint: 'Mobile wallet', className: 'bg-[#f6921e]' },
  { id: 'cod', label: 'Cash on Delivery', hint: 'Pay on arrival', className: 'bg-ink-800' },
];

export function CartDrawer() {
  const { items, isOpen, close, clear, subtotal, count } = useCartStore();
  const addOrder = useOrdersStore((s) => s.addOrder);
  const hydrated = useHydrated();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('bkash');
  const [orderTotal, setOrderTotal] = useState(0);
  const [ordered, setOrdered] = useState(false);

  const handleClose = useCallback(() => {
    setOrdered(false);
    close();
  }, [close]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', onKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleClose]);

  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal());
  const progress = Math.min(100, (subtotal() / FREE_SHIPPING_THRESHOLD) * 100);

  const handleCheckout = () => {
    const currentItems = items;
    const total = subtotal();
    addOrder({
      id: `TN-${Date.now().toString().slice(-5)}`,
      customer: {
        name: 'Guest Customer',
        phone: '-',
        address: '-',
        city: '-',
      },
      items: currentItems.map((item) => ({
        productId: item.product.id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
      })),
      subtotal: total,
      paymentMethod,
      status: 'pending',
      createdAt: new Date().toISOString(),
    });
    setOrderTotal(total);
    setOrdered(true);
    clear();
  };

  const selectedMethod =
    paymentMethods.find((m) => m.id === paymentMethod) ?? paymentMethods[0];

  return (
    <div className={cn('fixed inset-0 z-50', !isOpen && 'pointer-events-none')}>
      <div
        className={cn(
          'absolute inset-0 bg-ink-900/50 backdrop-blur-sm transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'opacity-0',
        )}
        onClick={handleClose}
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
            {ordered ? 'Order Confirmed' : 'Your Cart'}
            {!ordered && hydrated && count() > 0 && (
              <span className="rounded-full bg-brand-600 px-2 py-0.5 text-xs font-semibold text-white">
                {count()}
              </span>
            )}
          </h2>
          <button
            type="button"
            onClick={handleClose}
            className="flex h-9 w-9 items-center justify-center rounded-full text-ink-500 transition-colors hover:bg-ink-100 hover:text-ink-900"
            aria-label="Close cart"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        {ordered ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-success-light">
              <PartyPopper className="h-10 w-10 text-success" />
            </div>
            <h3 className="text-2xl font-bold text-ink-900">Thank you for your order!</h3>
            <p className="max-w-xs text-sm leading-relaxed text-ink-500">
              Your order of <strong>{formatPrice(orderTotal)}</strong> is confirmed. Pay with{' '}
              <span
                className={cn(
                  'inline-block rounded-md px-2 py-0.5 text-xs font-bold text-white',
                  selectedMethod.className,
                )}
              >
                {selectedMethod.label}
              </span>{' '}
              — a payment request will be sent to your registered mobile number.
            </p>
            <Button onClick={handleClose} className="mt-2 w-full">
              Done
            </Button>
          </div>
        ) : hydrated && items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-ink-100">
              <ShoppingBag className="h-8 w-8 text-ink-400" />
            </div>
            <p className="text-lg font-semibold text-ink-900">Your cart is empty</p>
            <p className="text-sm text-ink-500">
              Add some tech to your collection and it will show up here.
            </p>
            <Button onClick={handleClose} className="mt-2">
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
                Taxes and delivery calculated at checkout.
              </p>

              <fieldset className="mt-3">
                <legend className="text-xs font-semibold uppercase tracking-wide text-ink-500">
                  Payment method
                </legend>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {paymentMethods.map((method) => (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setPaymentMethod(method.id)}
                      className={cn(
                        'relative rounded-xl border-2 p-3 text-left transition-all',
                        paymentMethod === method.id
                          ? 'border-brand-600 bg-brand-50'
                          : 'border-ink-200 bg-white hover:border-ink-300',
                      )}
                      aria-pressed={paymentMethod === method.id}
                    >
                      {paymentMethod === method.id && (
                        <span className="absolute right-2 top-2 flex h-4 w-4 items-center justify-center rounded-full bg-brand-600 text-white">
                          <Check className="h-3 w-3" />
                        </span>
                      )}
                      <div className="flex items-center gap-3">
                        <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-white shadow-sm">
                          <PaymentLogo method={method.id} className="h-6 w-6" />
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-ink-900">{method.label}</p>
                          <p className="mt-1 text-[11px] text-ink-400">{method.hint}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </fieldset>

              <Button size="lg" className="mt-4 w-full" onClick={handleCheckout}>
                Checkout with {selectedMethod.label}
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
                  onClick={handleClose}
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
