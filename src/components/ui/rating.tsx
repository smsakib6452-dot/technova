import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

type RatingProps = {
  rating: number;
  reviews?: number;
  className?: string;
};

export function Rating({ rating, reviews, className }: RatingProps) {
  const rounded = Math.round(rating * 2) / 2;

  return (
    <div className={cn('flex items-center gap-1.5', className)}>
      <div className="flex" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((index) => (
          <Star
            key={index}
            className={cn(
              'h-3.5 w-3.5',
              index <= Math.floor(rounded)
                ? 'fill-warning text-warning'
                : index - 0.5 === rounded
                  ? 'fill-warning text-warning opacity-50'
                  : 'fill-ink-200 text-ink-200',
            )}
          />
        ))}
      </div>
      <span className="text-xs font-medium text-ink-700">{rating.toFixed(1)}</span>
      {reviews !== undefined && (
        <span className="text-xs text-ink-400">({reviews})</span>
      )}
    </div>
  );
}
