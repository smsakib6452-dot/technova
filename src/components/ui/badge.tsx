import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide',
  {
    variants: {
      variant: {
        brand: 'bg-brand-100 text-brand-800',
        success: 'bg-success-light text-success',
        warning: 'bg-warning-light text-warning',
        danger: 'bg-danger-light text-danger',
        ink: 'bg-ink-900 text-white',
        outline: 'border border-ink-300 text-ink-700',
      },
    },
    defaultVariants: {
      variant: 'brand',
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}
