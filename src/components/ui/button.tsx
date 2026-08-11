import { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:translate-y-px',
  {
    variants: {
      variant: {
        primary:
          'bg-brand-600 text-white shadow-sm hover:bg-brand-700',
        secondary:
          'bg-ink-900 text-white hover:bg-ink-800',
        outline:
          'border border-ink-300 bg-white text-ink-900 hover:border-ink-400 hover:bg-ink-50',
        ghost:
          'text-ink-700 hover:bg-ink-100 hover:text-ink-900',
        danger: 'bg-danger text-white hover:bg-danger/90',
        success: 'bg-success text-white hover:bg-success/90',
      },
      size: {
        sm: 'h-9 px-3 text-xs',
        md: 'h-11 px-5',
        lg: 'h-12 px-7 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, type = 'button', ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  ),
);

Button.displayName = 'Button';

export { buttonVariants };
