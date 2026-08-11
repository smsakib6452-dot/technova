'use client';

import { useCatalogStore } from '@/store/catalog';
import { ProductCard } from '@/components/product/product-card';

export function FeaturedProducts() {
  const products = useCatalogStore((s) => s.products);
  const featured = products.filter((p) => p.featured).slice(0, 8);

  if (featured.length === 0) return null;

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {featured.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
