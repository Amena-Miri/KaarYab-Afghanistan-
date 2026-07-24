'use client';

import React from "react";
import { LucideIcon } from "lucide-react";
import { Card } from "./Card";
import { Button } from "./Button";
import { cn } from "@/lib/utils";

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
    <Card
      className={cn(
        `
        p-12
        text-center
        bg-surface
        border
        border-border
        rounded-3xl
        `,
        className
      )}
    >
      <div className="flex flex-col items-center max-w-md mx-auto">

        {/* Icon */}

        <div
          className="
            w-20
            h-20
            rounded-full
            bg-primary/10
            flex
            items-center
            justify-center
            mb-6
          "
        >
          <Icon className="w-10 h-10 text-primary" />
        </div>

        {/* Title */}

        <h2 className="text-2xl font-bold text-text-primary mb-3">
          {title}
        </h2>

        {/* Description */}

        <p className="text-text-secondary leading-7 mb-8">
          {description}
        </p>

        {/* Action */}

        {action && (
          <Button onClick={action.onClick}>
            {action.label}
          </Button>
        )}
      </div>
    </Card>
  );
};