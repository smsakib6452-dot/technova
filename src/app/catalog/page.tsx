import type { Metadata } from 'next';
import { Suspense } from 'react';
import { CatalogContent } from '@/components/catalog/catalog-content';

export const metadata: Metadata = {
  title: 'Shop All Products',
  description:
    'Browse laptops, smartphones, audio, wearables, gaming gear and accessories at TECHNOVA.',
};

export default function CatalogPage() {
  return (
    <Suspense fallback={<CatalogSkeleton />}>
      <CatalogContent />
    </Suspense>
  );
}

function CatalogSkeleton() {
  return (
    <div className="container py-10">
      <div className="h-8 w-48 animate-pulse rounded-lg bg-ink-200" />
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-96 animate-pulse rounded-2xl bg-ink-100" />
        ))}
      </div>
    </div>
  );
}
