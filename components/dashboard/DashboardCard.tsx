'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface DashboardCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  trend?: {
    value: number;
    label: string;
    direction: 'up' | 'down' | 'neutral';
  };
  color?: string;
  subtitle?: string;
  className?: string;
}

export const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  value,
  icon,
  trend,
  color = 'primary',
  subtitle,
  className,
}) => {
  const colorClasses = {
    primary: 'bg-primary/10 text-primary',
    blue: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
    green: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
    purple: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
    orange: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400',
    red: 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400',
    yellow: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400',
  };

  const trendColors = {
    up: 'text-green-500',
    down: 'text-red-500',
    neutral: 'text-gray-500',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className={cn('p-6 hover:shadow-lg transition-all', className)}>
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {title}
            </p>
            <p className="mt-2 text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              {value}
            </p>
            {subtitle && (
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {subtitle}
              </p>
            )}
            {trend && (
              <div className="mt-2 flex items-center gap-2">
                <span className={cn(
                  'text-sm font-medium',
                  trendColors[trend.direction]
                )}>
                  {trend.direction === 'up' && '↑'}
                  {trend.direction === 'down' && '↓'}
                  {trend.value}%
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {trend.label}
                </span>
              </div>
            )}
          </div>
          <div className={cn(
            'p-3 rounded-xl flex-shrink-0',
            colorClasses[color as keyof typeof colorClasses]
          )}>
            {icon}
          </div>
        </div>
      </Card>
    </motion.div>
  );
};