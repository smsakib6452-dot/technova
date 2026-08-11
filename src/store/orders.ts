'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Order, OrderStatus } from '@/lib/types';

const seedOrders: Order[] = [
  {
    id: 'TN-1042',
    customer: {
      name: 'Rahim Uddin',
      phone: '+8801712-456789',
      address: 'House 12, Road 5, Dhanmondi',
      city: 'Dhaka',
    },
    items: [
      { productId: 'p-pixel9-pro', name: 'Pixel9 Pro', price: 125000, quantity: 1 },
    ],
    subtotal: 125000,
    paymentMethod: 'bkash',
    status: 'delivered',
    createdAt: '2026-08-09T09:24:00.000Z',
  },
  {
    id: 'TN-1043',
    customer: {
      name: 'Nusrat Jahan',
      phone: '+8801812-334455',
      address: 'Apt 4B, Bashundhara R/A',
      city: 'Dhaka',
    },
    items: [
      { productId: 'p-whisper-buds', name: 'Whisper Buds Pro', price: 16000, quantity: 2 },
    ],
    subtotal: 32000,
    paymentMethod: 'nagad',
    status: 'shipped',
    createdAt: '2026-08-10T14:02:00.000Z',
  },
  {
    id: 'TN-1044',
    customer: {
      name: 'Tanvir Ahmed',
      phone: '+8801912-778899',
      address: 'College Road, GEC Circle',
      city: 'Chittagong',
    },
    items: [
      { productId: 'p-opti-key-75', name: 'Opti Key 75', price: 18000, quantity: 1 },
      { productId: 'p-glide-x2', name: 'Glide X2 Mouse', price: 6000, quantity: 1 },
    ],
    subtotal: 24000,
    paymentMethod: 'cod',
    status: 'processing',
    createdAt: '2026-08-11T05:40:00.000Z',
  },
  {
    id: 'TN-1045',
    customer: {
      name: 'Farhana Rahman',
      phone: '+8801312-112233',
      address: 'Nirala Road',
      city: 'Khulna',
    },
    items: [
      { productId: 'p-pulse-watch', name: 'Pulse Watch Series 7', price: 45000, quantity: 1 },
    ],
    subtotal: 45000,
    paymentMethod: 'bkash',
    status: 'pending',
    createdAt: '2026-08-11T07:15:00.000Z',
  },
];

export type OrdersStore = {
  orders: Order[];
  addOrder: (order: Order) => void;
  updateStatus: (id: string, status: OrderStatus) => void;
  resetOrders: () => void;
};

export const useOrdersStore = create<OrdersStore>()(
  persist(
    (set) => ({
      orders: seedOrders,

      addOrder: (order) =>
        set((state) => ({ orders: [order, ...state.orders] })),

      updateStatus: (id, status) =>
        set((state) => ({
          orders: state.orders.map((o) =>
            o.id === id ? { ...o, status } : o,
          ),
        })),

      resetOrders: () => set({ orders: seedOrders }),
    }),
    {
      name: 'technova-orders',
      partialize: (state) => ({ orders: state.orders }),
    },
  ),
);
