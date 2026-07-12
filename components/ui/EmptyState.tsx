import React from 'react';
import { Card } from './Card';
import { Button } from './Button';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon,
  title,
  description,
  action,
  className,
}) => {
  return (
    <Card className={cn('text-center py-12', className)}>
      <div className="flex flex-col items-center max-w-sm mx-auto">
        <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
          <Icon className="w-10 h-10 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-center mb-6">
          {description}
        </p>
        {action && (
          <Button onClick={action.onClick}>
            {action.label}
          </Button>
        )}
      </div>
    </Card>
  );
};