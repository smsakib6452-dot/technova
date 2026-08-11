'use client';

import { useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChevronDown, PackageSearch } from 'lucide-react';
import { categories } from '@/lib/data/products';
import type { SortOption } from '@/lib/types';
import { cn } from '@/lib/utils';
import { useCatalogStore } from '@/store/catalog';
import { ProductCard } from '@/components/product/product-card';
import { Button } from '@/components/ui/button';

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
];

export function CatalogContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const activeCategory = searchParams.get('category') ?? 'all';
  const query = (searchParams.get('q') ?? '').toLowerCase();
  const [sort, setSort] = useState<SortOption>('featured');
  const products = useCatalogStore((s) => s.products);

  const filtered = useMemo(() => {
    let list = [...products];

    if (activeCategory !== 'all') {
      list = list.filter((p) => p.category === activeCategory);
    }

    if (query) {
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.brand.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.category.includes(query),
      );
    }

    switch (sort) {
      case 'price-asc':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        list.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        list.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        list.sort((a, b) => Number(b.badge === 'new') - Number(a.badge === 'new'));
        break;
      default:
        list.sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));
    }

    return list;
  }, [activeCategory, products, query, sort]);

  const setCategory = (slug: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (slug === 'all') params.delete('category');
    else params.set('category', slug);
    router.replace(`/catalog?${params.toString()}`);
  };

  const activeName =
    activeCategory === 'all'
      ? 'All Products'
      : categories.find((c) => c.slug === activeCategory)?.name ?? 'All Products';

  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-ink-900">{activeName}</h1>
        <p className="mt-1 text-ink-500">
          {query ? `Search results for “${query}”` : 'Hand-picked technology, ready to ship.'}
        </p>
      </div>

      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="scrollbar-thin flex gap-2 overflow-x-auto pb-1">
          <button
            type="button"
            onClick={() => setCategory('all')}
            className={cn(
              'shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors',
              activeCategory === 'all'
                ? 'border-brand-600 bg-brand-600 text-white'
                : 'border-ink-300 bg-white text-ink-700 hover:border-ink-400',
            )}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => setCategory(category.slug)}
              className={cn(
                'shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors',
                activeCategory === category.slug
                  ? 'border-brand-600 bg-brand-600 text-white'
                  : 'border-ink-300 bg-white text-ink-700 hover:border-ink-400',
              )}
            >
              {category.name}
            </button>
          ))}
        </div>

        <label className="relative w-full md:w-auto">
          <span className="sr-only">Sort products</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            className="h-10 w-full appearance-none rounded-xl border border-ink-300 bg-white pl-4 pr-10 text-sm font-medium text-ink-900 outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-500/30 md:w-56"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
        </label>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-ink-300 bg-white py-20 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-ink-100">
            <PackageSearch className="h-8 w-8 text-ink-400" />
          </div>
          <h2 className="text-lg font-semibold text-ink-900">No products found</h2>
          <p className="max-w-sm text-sm text-ink-500">
            Try a different search term or category, or browse our full collection.
          </p>
          <Button
            variant="outline"
            className="mt-2"
            onClick={() => {
              router.replace('/catalog');
              setSort('featured');
            }}
          >
            Clear filters
          </Button>
        </div>
      ) : (
        <>
          <p className="mb-4 text-sm text-ink-500">
            {filtered.length} {filtered.length === 1 ? 'product' : 'products'}
          </p>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
