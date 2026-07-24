"use client";

import React from "react";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface DashboardCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  subtitle?: string;
  className?: string;
}

export const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  value,
  icon,
  subtitle,
  className,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        className={cn(
          "p-5 rounded-2xl border border-border bg-surface hover:shadow-md transition-all",
          className
        )}
      >
        <div className="flex items-center justify-between">

          {/* Text */}
          <div>
            <p className="text-sm font-medium text-text-secondary">
              {title}
            </p>

            <h3 className="mt-2 text-3xl font-bold text-text-primary">
              {value}
            </h3>

            {subtitle && (
              <p className="mt-1 text-xs text-text-secondary">
                {subtitle}
              </p>
            )}
          </div>


          {/* Icon */}
          <div
            className="
              w-12
              h-12
              rounded-xl
              flex
              items-center
              justify-center
              bg-primary/10
              text-primary
            "
          >
            {icon}
          </div>

        </div>
      </Card>
    </motion.div>
  );
};