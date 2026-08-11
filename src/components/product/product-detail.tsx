'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import {
  Check,
  ChevronRight,
  Minus,
  Plus,
  ShoppingCart,
  Truck,
  RotateCcw,
  ShieldCheck,
} from 'lucide-react';
import { getRelatedProducts } from '@/lib/data/products';
import type { Product } from '@/lib/types';
import { cn, discountPercent } from '@/lib/utils';
import { useCartStore } from '@/store/cart';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Price } from '@/components/ui/price';
import { Rating } from '@/components/ui/rating';
import { ProductCard } from '@/components/product/product-card';

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

const perks = [
  { icon: Truck, label: 'Free shipping over ৳25,000' },
  { icon: RotateCcw, label: '30-day easy returns' },
  { icon: ShieldCheck, label: '2-year warranty included' },
];

export function ProductDetail({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.open);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [added, setAdded] = useState(false);

  const related = getRelatedProducts(product);
  const discount = discountPercent(product.price, product.compareAtPrice);
  const inStock = product.stock > 0;

  const handleAddToCart = () => {
    addItem(product, quantity);
    setAdded(true);
    window.setTimeout(() => {
      setAdded(false);
      openCart();
    }, 500);
  };

  return (
    <div className="container py-10">
      <nav className="mb-6 flex items-center gap-1 text-sm text-ink-400" aria-label="Breadcrumb">
        <Link href="/" className="transition-colors hover:text-ink-900">
          Home
        </Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/catalog" className="transition-colors hover:text-ink-900">
          Catalog
        </Link>
        <ChevronRight className="h-4 w-4" />
        <Link
          href={`/catalog?category=${product.category}`}
          className="transition-colors hover:text-ink-900"
        >
          {product.category}
        </Link>
      </nav>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <div>
          <div className="relative aspect-square overflow-hidden rounded-2xl border border-ink-200 bg-white shadow-card">
            <Image
              src={product.images[activeImage] ?? product.image}
              alt={product.name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
            <div className="absolute left-4 top-4 flex flex-col gap-1.5">
              {product.badge && (
                <Badge variant={badgeStyles[product.badge]}>
                  {badgeLabels[product.badge]}
                </Badge>
              )}
              {discount && <Badge variant="danger">Save {discount}%</Badge>}
            </div>
          </div>

          {product.images.length > 1 && (
            <div className="mt-4 flex gap-3">
              {product.images.map((image, index) => (
                <button
                  key={image}
                  type="button"
                  onClick={() => setActiveImage(index)}
                  className={cn(
                    'relative h-20 w-20 overflow-hidden rounded-xl border-2 bg-white transition-all',
                    index === activeImage
                      ? 'border-brand-600 shadow-card'
                      : 'border-transparent opacity-70 hover:opacity-100',
                  )}
                  aria-label={`View image ${index + 1}`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold uppercase tracking-wide text-brand-700">
              {product.brand}
            </span>
            {!inStock && <Badge variant="danger">Out of stock</Badge>}
            {inStock && product.stock <= 10 && (
              <Badge variant="warning">Only {product.stock} left</Badge>
            )}
          </div>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
            {product.name}
          </h1>

          <div className="mt-3">
            <Rating rating={product.rating} reviews={product.reviews} />
          </div>

          <div className="mt-5">
            <Price price={product.price} compareAtPrice={product.compareAtPrice} size="lg" />
          </div>

          <p className="mt-5 leading-relaxed text-ink-600">{product.description}</p>

          <div className="mt-6 rounded-2xl border border-ink-200 bg-white p-5 shadow-card">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-500">
              Key features
            </h2>
            <ul className="mt-3 space-y-2.5">
              {product.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5 text-sm text-ink-700">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                    <Check className="h-3 w-3" />
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <div className="flex items-center rounded-xl border border-ink-300 bg-white">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="flex h-12 w-12 items-center justify-center text-ink-600 transition-colors hover:text-ink-900 disabled:opacity-40"
                disabled={quantity <= 1 || !inStock}
                aria-label="Decrease quantity"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-12 text-center text-lg font-bold tabular-nums text-ink-900">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                className="flex h-12 w-12 items-center justify-center text-ink-600 transition-colors hover:text-ink-900 disabled:opacity-40"
                disabled={quantity >= product.stock || !inStock}
                aria-label="Increase quantity"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            <Button
              size="lg"
              className="flex-1 min-w-52"
              variant={added ? 'success' : 'primary'}
              onClick={handleAddToCart}
              disabled={!inStock}
            >
              {added ? (
                <>
                  <Check className="h-5 w-5" /> Added to cart
                </>
              ) : (
                <>
                  <ShoppingCart className="h-5 w-5" />
                  {inStock ? 'Add to cart' : 'Sold out'}
                </>
              )}
            </Button>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {perks.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2.5 rounded-xl border border-ink-200 bg-white px-3 py-3 shadow-card"
              >
                <Icon className="h-5 w-5 shrink-0 text-brand-600" />
                <span className="text-xs font-medium text-ink-700">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="mb-6 text-2xl font-bold tracking-tight text-ink-900">
            You may also like
          </h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
