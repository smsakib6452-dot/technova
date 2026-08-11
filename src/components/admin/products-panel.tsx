'use client';

import Image from 'next/image';
import { Package, Pencil, Plus, Search, Trash2 } from 'lucide-react';
import { useMemo, useState } from 'react';
import { categories } from '@/lib/data/products';
import type { Product, ProductBadge } from '@/lib/types';
import { cn, formatPrice } from '@/lib/utils';
import { useCatalogStore } from '@/store/catalog';
import { useHydrated } from '@/lib/hooks';
import { ProductForm } from '@/components/admin/product-form';
import { Button } from '@/components/ui/button';

const badgeLabels: Record<ProductBadge, string> = {
  new: 'New',
  sale: 'Sale',
  bestseller: 'Bestseller',
};

const categoryName = (id: string) =>
  categories.find((c) => c.id === id)?.name ?? id;

export function ProductsPanel() {
  const { products, addProduct, updateProduct, deleteProduct, resetCatalog } =
    useCatalogStore();
  const hydrated = useHydrated();
  const [query, setQuery] = useState('');
  const [editing, setEditing] = useState<Product | 'new' | null>(null);

  const filtered = useMemo(() => {
    let list = [...products];
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          categoryName(p.category).toLowerCase().includes(q),
      );
    }
    return list;
  }, [products, query]);

  const closeForm = () => setEditing(null);

  const saveProduct = (product: Product) => {
    if (editing === 'new') addProduct(product);
    else updateProduct(product.id, product);
    closeForm();
  };

  const removeProduct = (product: Product) => {
    if (window.confirm(`Delete “${product.name}”? This cannot be undone.`)) {
      deleteProduct(product.id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-lg font-bold text-ink-900">Products</h2>
          <p className="text-sm text-ink-500">
            {hydrated
              ? `${filtered.length} of ${products.length} products`
              : 'Loading…'}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={resetCatalog}>
            Reset demo catalog
          </Button>
          <Button size="sm" onClick={() => setEditing('new')}>
            <Plus className="h-4 w-4" />
            Add product
          </Button>
        </div>
      </div>

      <label className="relative block md:w-80">
        <span className="sr-only">Search products</span>
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, brand, category…"
          className="h-10 w-full rounded-xl border border-ink-300 bg-white pl-9 pr-3 text-sm outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-500/30"
        />
      </label>

      <div className="overflow-hidden rounded-2xl border border-ink-200 bg-white shadow-card">
        {!hydrated ? (
          <p className="px-5 py-12 text-center text-sm text-ink-400">Loading products…</p>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center gap-3 px-5 py-14 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-ink-100">
              <Package className="h-7 w-7 text-ink-400" />
            </div>
            <p className="text-sm text-ink-500">No products found. Try a different search.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead>
                <tr className="border-b border-ink-200 bg-ink-50 text-xs font-semibold uppercase tracking-wide text-ink-500">
                  <th className="px-5 py-3">Product</th>
                  <th className="px-5 py-3">Category</th>
                  <th className="px-5 py-3">Price</th>
                  <th className="px-5 py-3">Stock</th>
                  <th className="px-5 py-3">Badge</th>
                  <th className="px-5 py-3">Featured</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-200">
                {filtered.map((product) => (
                  <tr key={product.id} className="transition-colors hover:bg-ink-50">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg bg-ink-100">
                          {product.image ? (
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              sizes="44px"
                              className="object-cover"
                            />
                          ) : null}
                        </div>
                        <div className="min-w-0">
                          <p className="truncate font-semibold text-ink-900">{product.name}</p>
                          <p className="truncate text-xs text-ink-500">{product.brand}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-ink-600">{categoryName(product.category)}</td>
                    <td className="px-5 py-3 font-semibold text-ink-900">
                      {formatPrice(product.price)}
                      {product.compareAtPrice && product.compareAtPrice > product.price && (
                        <span className="ml-1.5 text-xs font-normal text-ink-400 line-through">
                          {formatPrice(product.compareAtPrice)}
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-3">
                      <span
                        className={cn(
                          'rounded-full px-2.5 py-0.5 text-xs font-bold',
                          product.stock === 0
                            ? 'bg-danger-light text-danger'
                            : product.stock <= 5
                              ? 'bg-warning-light text-warning'
                              : 'bg-success-light text-success',
                        )}
                      >
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      {product.badge ? (
                        <span className="rounded-full bg-ink-900 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-white">
                          {badgeLabels[product.badge]}
                        </span>
                      ) : (
                        <span className="text-ink-300">—</span>
                      )}
                    </td>
                    <td className="px-5 py-3">
                      <button
                        type="button"
                        role="switch"
                        aria-checked={Boolean(product.featured)}
                        aria-label={`Toggle featured for ${product.name}`}
                        onClick={() => updateProduct(product.id, { featured: !product.featured })}
                        className={cn(
                          'relative inline-flex h-5 w-9 items-center rounded-full transition-colors',
                          product.featured ? 'bg-brand-600' : 'bg-ink-200',
                        )}
                      >
                        <span
                          className={cn(
                            'inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform',
                            product.featured ? 'translate-x-4' : 'translate-x-0.5',
                          )}
                        />
                      </button>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex justify-end gap-1">
                        <button
                          type="button"
                          onClick={() => setEditing(product)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-500 transition-colors hover:bg-ink-100 hover:text-ink-900"
                          aria-label={`Edit ${product.name}`}
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => removeProduct(product)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-500 transition-colors hover:bg-danger-light hover:text-danger"
                          aria-label={`Delete ${product.name}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {editing && (
        <ProductForm
          initial={editing === 'new' ? undefined : editing}
          onSave={saveProduct}
          onClose={closeForm}
        />
      )}
    </div>
  );
}