'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Check } from 'lucide-react';
import { useState } from 'react';
import type { Product } from '@/lib/types';
import { cn, discountPercent } from '@/lib/utils';
import { useCartStore } from '@/store/cart';
import { Badge } from '@/components/ui/badge';
import { Price } from '@/components/ui/price';
import { Rating } from '@/components/ui/rating';
import { Button } from '@/components/ui/button';

const badgeStyles: Record<string, React.ComponentProps<typeof Badge>['variant']> = {
  new: 'brand',
  sale: 'danger',
  bestseller: 'ink',
};

const badgeLabels: Record<string, string> = {
  new: 'New',
  sale: 'Sale',
  bestseller: 'Bestseller',
};

export function ProductCard({ product, className }: { product: Product; className?: string }) {
  const addItem = useCartStore((s) => s.addItem);
  const [added, setAdded] = useState(false);
  const discount = discountPercent(product.price, product.compareAtPrice);

  const handleAdd = () => {
    addItem(product, 1);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  };

  return (
    <div
      className={cn(
        'group flex flex-col overflow-hidden rounded-2xl border border-ink-200 bg-white shadow-card transition-all hover:-translate-y-0.5 hover:shadow-card-hover',
        className,
      )}
    >
      <Link
        href={`/products/${product.slug}`}
        className="relative block aspect-[4/3] overflow-hidden bg-ink-100"
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {product.badge && (
            <Badge variant={badgeStyles[product.badge]}>{badgeLabels[product.badge]}</Badge>
          )}
          {discount && <Badge variant="danger">-{discount}%</Badge>}
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[11px] font-medium uppercase tracking-wide text-ink-400">
            {product.brand}
          </span>
          <Rating rating={product.rating} />
        </div>

        <Link href={`/products/${product.slug}`}>
          <h3 className="line-clamp-2 font-semibold text-ink-900 transition-colors group-hover:text-brand-700">
            {product.name}
          </h3>
        </Link>

        <p className="line-clamp-2 text-sm text-ink-500">{product.description}</p>

        <div className="mt-auto flex items-center justify-between gap-3 pt-3">
          <Price price={product.price} compareAtPrice={product.compareAtPrice} />
          <Button
            size="sm"
            variant={added ? 'success' : 'primary'}
            onClick={handleAdd}
            aria-label={`Add ${product.name} to cart`}
            className="shrink-0"
          >
            {added ? <Check className="h-4 w-4" /> : <ShoppingCart className="h-4 w-4" />}
            {added ? 'Added' : 'Add'}
          </Button>
        </div>
      </div>
    </div>
  );
}
