import React from 'react';
import { LoadingSpinner } from './LoadingSpinner';
import { cn } from '@/lib/utils';

interface LoadingStateProps {
  text?: string;
  className?: string;
  fullScreen?: boolean;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  text = 'Loading...',
  className,
  fullScreen = false,
}) => {
  const content = (
    <div className={cn(
      'flex flex-col items-center justify-center gap-4',
      className
    )}>
      <LoadingSpinner size="lg" />
      <p className="text-gray-600 dark:text-gray-400 animate-pulse">
        {text}
      </p>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        {content}
      </div>
    );
  }

  return content;
};