import React from 'react';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const badgeVariants = cva(
  'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
  {
    variants: {
      variant: {
        default: 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200',
        primary: 'bg-primary/10 text-primary',
        success: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
        danger: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
        warning: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400',
        info: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export const Badge: React.FC<BadgeProps> = ({ className, variant, ...props }) => {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
};