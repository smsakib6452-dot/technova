'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem, Product } from '@/lib/types';

type CartStore = {
  items: CartItem[];
  isOpen: boolean;
  lastAddedAt: number | null;
  open: () => void;
  close: () => void;
  toggle: () => void;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clear: () => void;
  count: () => number;
  subtotal: () => number;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      lastAddedAt: null,

      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      toggle: () => set((s) => ({ isOpen: !s.isOpen })),

      addItem: (product, quantity = 1) =>
        set((state) => {
          const existing = state.items.find(
            (item) => item.product.id === product.id,
          );
          if (existing) {
            return {
              items: state.items.map((item) =>
                item.product.id === product.id
                  ? {
                      ...item,
                      quantity: Math.min(item.quantity + quantity, product.stock),
                    }
                  : item,
              ),
              lastAddedAt: Date.now(),
            };
          }
          return {
            items: [...state.items, { product, quantity }],
            lastAddedAt: Date.now(),
          };
        }),

      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item.product.id !== productId),
        })),

      updateQuantity: (productId, quantity) =>
        set((state) => ({
          items: state.items
            .map((item) =>
              item.product.id === productId
                ? {
                    ...item,
                    quantity: Math.max(
                      0,
                      Math.min(quantity, item.product.stock),
                    ),
                  }
                : item,
            )
            .filter((item) => item.quantity > 0),
        })),

      clear: () => set({ items: [] }),

      count: () => get().items.reduce((sum, item) => sum + item.quantity, 0),

      subtotal: () =>
        get().items.reduce(
          (sum, item) => sum + item.product.price * item.quantity,
          0,
        ),
    }),
    {
      name: 'technova-cart',
      partialize: (state) => ({ items: state.items }),
    },
  ),
);
