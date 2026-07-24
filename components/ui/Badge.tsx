'use client';

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'bg-surface text-text-secondary border border-border',
        primary: 'bg-primary/10 text-primary border border-primary/20',
        success: 'bg-success/10 text-success border border-success/20',
        warning: 'bg-warning/10 text-warning border border-warning/20',
        error: 'bg-error/10 text-error border border-error/20',
        info: 'bg-info/10 text-info border border-info/20',
        featured: 'bg-gradient-to-r from-primary to-primary-accent text-white border-0 shadow-lg',
        'soft-primary': 'bg-primary/5 text-primary',
        'soft-success': 'bg-success/5 text-success',
        'soft-warning': 'bg-warning/5 text-warning',
        'soft-error': 'bg-error/5 text-error',
      },
      size: {
        sm: 'px-2 py-0.5 text-[10px]',
        md: 'px-2.5 py-0.5 text-xs',
        lg: 'px-3 py-1 text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  dot?: boolean;
}

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, size, dot, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(badgeVariants({ variant, size }), className)}
        {...props}
      >
        {dot && (
          <span
            className={cn(
              'w-1.5 h-1.5 rounded-full mr-1.5',
              {
                'bg-primary': variant === 'primary' || variant === 'default',
                'bg-success': variant === 'success' || variant === 'soft-success',
                'bg-warning': variant === 'warning' || variant === 'soft-warning',
                'bg-error': variant === 'error' || variant === 'soft-error',
                'bg-info': variant === 'info',
                'bg-white': variant === 'featured',
              }
            )}
          />
        )}
        {children}
      </div>
    );
  }
);

Badge.displayName = 'Badge';

export { badgeVariants };