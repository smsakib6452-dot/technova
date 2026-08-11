import { cn, discountPercent, formatPrice } from '@/lib/utils';

type PriceProps = {
  price: number;
  compareAtPrice?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

const sizeClasses = {
  sm: 'text-sm',
  md: 'text-lg',
  lg: 'text-2xl',
};

export function Price({ price, compareAtPrice, size = 'md', className }: PriceProps) {
  const discount = discountPercent(price, compareAtPrice);

  return (
    <div className={cn('flex items-baseline gap-2', className)}>
      <span
        className={cn(
          'font-bold text-ink-900',
          sizeClasses[size],
        )}
      >
        {formatPrice(price)}
      </span>
      {compareAtPrice && compareAtPrice > price && (
        <span className={cn('text-ink-400 line-through', size === 'lg' ? 'text-base' : 'text-sm')}>
          {formatPrice(compareAtPrice)}
        </span>
      )}
      {discount && (
        <span className="text-sm font-semibold text-success">
          -{discount}%
        </span>
      )}
    </div>
  );
}
