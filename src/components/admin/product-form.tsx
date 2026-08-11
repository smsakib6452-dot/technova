'use client';

import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { categories } from '@/lib/data/products';
import type { Product, ProductBadge } from '@/lib/types';
import { cn } from '@/lib/utils';
import { slugify } from '@/components/admin/admin-helpers';
import { Button } from '@/components/ui/button';

const badgeOptions: { value: ProductBadge | ''; label: string }[] = [
  { value: '', label: 'None' },
  { value: 'new', label: 'New' },
  { value: 'sale', label: 'Sale' },
  { value: 'bestseller', label: 'Bestseller' },
];

type FormState = {
  name: string;
  brand: string;
  category: string;
  price: string;
  compareAtPrice: string;
  stock: string;
  rating: string;
  reviews: string;
  badge: ProductBadge | '';
  featured: boolean;
  image: string;
  description: string;
  features: string;
  images: string;
};

export function ProductForm({
  initial,
  onSave,
  onClose,
}: {
  initial?: Product;
  onSave: (product: Product) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState<FormState>({
    name: initial?.name ?? '',
    brand: initial?.brand ?? '',
    category: initial?.category ?? categories[0].id,
    price: initial?.price?.toString() ?? '',
    compareAtPrice: initial?.compareAtPrice?.toString() ?? '',
    stock: initial?.stock?.toString() ?? '10',
    rating: initial?.rating?.toString() ?? '4.5',
    reviews: initial?.reviews?.toString() ?? '0',
    badge: (initial?.badge ?? '') as ProductBadge | '',
    featured: initial?.featured ?? false,
    image: initial?.image ?? '',
    description: initial?.description ?? '',
    features: (initial?.features ?? []).join('\n'),
    images: (initial?.images ?? []).join('\n'),
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const price = Number(form.price);
    const stock = Number(form.stock);
    const rating = Number(form.rating) || 4.5;
    const reviews = Number(form.reviews) || 0;

    if (!form.name.trim()) return setError('Product name is required.');
    if (!Number.isFinite(price) || price <= 0)
      return setError('Price must be a number greater than zero.');
    if (!Number.isFinite(stock) || stock < 0)
      return setError('Stock must be zero or a positive number.');

    const features = form.features
      .split('\n')
      .map((f) => f.trim())
      .filter(Boolean);
    const images = form.images
      .split('\n')
      .map((i) => i.trim())
      .filter(Boolean);

    onSave({
      id: initial?.id ?? `p-${Date.now().toString(36)}`,
      slug:
        initial?.slug ??
        (slugify(form.name) || `product-${Date.now().toString(36)}`),
      name: form.name.trim(),
      brand: form.brand.trim() || 'TECHNOVA',
      category: form.category,
      price,
      compareAtPrice: form.compareAtPrice.trim() ? Number(form.compareAtPrice) : undefined,
      rating,
      reviews,
      description: form.description.trim(),
      features,
      image: form.image.trim() || (images[0] ?? ''),
      images: images.length > 0 ? images : [form.image.trim()].filter(Boolean),
      stock,
      badge: form.badge || undefined,
      featured: form.featured,
    });
  };

  const inputClass =
    'h-10 w-full rounded-xl border border-ink-300 bg-white px-3 text-sm outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-500/30';
  const textareaClass =
    'w-full rounded-xl border border-ink-300 bg-white px-3 py-2 text-sm outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-500/30';

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-4">
      <div
        className="absolute inset-0 bg-ink-900/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative flex max-h-[90vh] w-full max-w-2xl flex-col rounded-t-2xl bg-white shadow-popover sm:rounded-2xl">
        <header className="flex items-center justify-between border-b border-ink-200 px-6 py-4">
          <h3 className="text-lg font-bold text-ink-900">
            {initial ? 'Edit product' : 'Add product'}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full text-ink-500 transition-colors hover:bg-ink-100 hover:text-ink-900"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        <form onSubmit={submit} className="scrollbar-thin flex-1 overflow-y-auto px-6 py-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-500">
                Name *
              </label>
              <input
                className={inputClass}
                value={form.name}
                onChange={(e) => set('name', e.target.value)}
                placeholder="Aurora X15 Ultrabook"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-500">
                Brand
              </label>
              <input
                className={inputClass}
                value={form.brand}
                onChange={(e) => set('brand', e.target.value)}
                placeholder="NovaTech"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-500">
                Category
              </label>
              <select
                className={inputClass}
                value={form.category}
                onChange={(e) => set('category', e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-500">
                Price (৳) *
              </label>
              <input
                type="number"
                min="0"
                step="1"
                className={inputClass}
                value={form.price}
                onChange={(e) => set('price', e.target.value)}
                placeholder="165000"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-500">
                Compare-at price (৳)
              </label>
              <input
                type="number"
                min="0"
                step="1"
                className={inputClass}
                value={form.compareAtPrice}
                onChange={(e) => set('compareAtPrice', e.target.value)}
                placeholder="189000"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-500">
                Stock *
              </label>
              <input
                type="number"
                min="0"
                step="1"
                className={inputClass}
                value={form.stock}
                onChange={(e) => set('stock', e.target.value)}
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-500">
                Badge
              </label>
              <select
                className={inputClass}
                value={form.badge}
                onChange={(e) => set('badge', e.target.value as ProductBadge | '')}
              >
                {badgeOptions.map((option) => (
                  <option key={option.value || 'none'} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-500">
                Rating
              </label>
              <input
                type="number"
                min="0"
                max="5"
                step="0.1"
                className={inputClass}
                value={form.rating}
                onChange={(e) => set('rating', e.target.value)}
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-500">
                Review count
              </label>
              <input
                type="number"
                min="0"
                step="1"
                className={inputClass}
                value={form.reviews}
                onChange={(e) => set('reviews', e.target.value)}
              />
            </div>

            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-500">
                Image URL
              </label>
              <input
                className={inputClass}
                value={form.image}
                onChange={(e) => set('image', e.target.value)}
                placeholder="https://images.unsplash.com/…"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-500">
                Description
              </label>
              <textarea
                rows={3}
                className={textareaClass}
                value={form.description}
                onChange={(e) => set('description', e.target.value)}
              />
            </div>

            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-500">
                Features (one per line)
              </label>
              <textarea
                rows={4}
                className={textareaClass}
                value={form.features}
                onChange={(e) => set('features', e.target.value)}
                placeholder={'15.6" 3K OLED display\n1TB NVMe SSD storage'}
              />
            </div>

            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-500">
                Gallery image URLs (one per line)
              </label>
              <textarea
                rows={2}
                className={textareaClass}
                value={form.images}
                onChange={(e) => set('images', e.target.value)}
              />
            </div>

            <label className="flex items-center gap-2.5 sm:col-span-2">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => set('featured', e.target.checked)}
                className="h-4 w-4 rounded border-ink-300 text-brand-600 accent-brand-600"
              />
              <span className="text-sm font-medium text-ink-700">Feature on the homepage</span>
            </label>
          </div>

          {error && (
            <p className="mt-4 rounded-xl bg-danger-light px-4 py-3 text-sm font-medium text-danger">
              {error}
            </p>
          )}

          <footer className="mt-6 flex justify-end gap-3 border-t border-ink-200 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">{initial ? 'Save changes' : 'Add product'}</Button>
          </footer>
        </form>
      </div>
    </div>
  );
}