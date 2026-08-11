'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product } from '@/lib/types';
import { products as seedProducts } from '@/lib/data/products';

export type CatalogStore = {
  products: Product[];
  getProduct: (slug: string) => Product | undefined;
  updateProduct: (id: string, patch: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  addProduct: (product: Product) => void;
  resetCatalog: () => void;
};

export const useCatalogStore = create<CatalogStore>()(
  persist(
    (set, get) => ({
      products: seedProducts,

      getProduct: (slug) => get().products.find((p) => p.slug === slug),

      updateProduct: (id, patch) =>
        set((state) => ({
          products: state.products.map((p) =>
            p.id === id ? { ...p, ...patch } : p,
          ),
        })),

      deleteProduct: (id) =>
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
        })),

      addProduct: (product) =>
        set((state) => ({ products: [product, ...state.products] })),

      resetCatalog: () => set({ products: seedProducts }),
    }),
    {
      name: 'technova-catalog',
      partialize: (state) => ({ products: state.products }),
    },
  ),
);
