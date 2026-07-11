import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card: React.FC<CardProps> = ({
  className,
  children,
  hover = false,
  padding = 'md',
  ...props
}) => {
  const paddingClasses = {
    none: 'p-0',
    sm: 'p-3',
    md: 'p-4 sm:p-6',
    lg: 'p-6 sm:p-8',
  };

  return (
    <div
      className={cn(
        'bg-white dark:bg-dark-card rounded-xl border border-gray-200 dark:border-dark-border transition-all duration-200',
        paddingClasses[padding],
        hover && 'hover:shadow-xl hover:scale-[1.01] hover:-translate-y-1',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};