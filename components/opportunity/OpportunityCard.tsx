"use client";

import React from "react";
import Link from "next/link";
import { useOpportunityContext } from "@/context/OpportunityContext";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Bookmark,
  BookmarkCheck,
  MapPin,
  Calendar,
  Briefcase,
  Clock,
  ExternalLink,
  Building,
  Tag,
  Eye,
} from "lucide-react";
import {
  cn,
  formatDate,
  getDaysRemaining,
  isExpiringSoon,
  isExpired,
  truncateText,
  getCategoryColor,
  getCategoryIcon,
  getDeadlineStatus,
} from "@/lib/utils";
import { Opportunity } from "@/types/opportunity";
import { motion } from "framer-motion";

interface OpportunityCardProps {
  opportunity: Opportunity;
  featured?: boolean;
  viewMode?: "grid" | "list";
}

export const OpportunityCard: React.FC<OpportunityCardProps> = ({
  opportunity,
  featured = false,
  viewMode = "grid",
}) => {
  const { savedOpportunities, toggleSave } = useOpportunityContext();

  const isSaved = savedOpportunities.includes(opportunity.id);

  const daysRemaining = getDaysRemaining(opportunity.deadline);
  const expiringSoon = isExpiringSoon(opportunity.deadline);
  const expired = isExpired(opportunity.deadline);
  const categoryColor = getCategoryColor(opportunity.category);
  const categoryIcon = getCategoryIcon(opportunity.category);
  const deadlineStatus = getDeadlineStatus(opportunity.deadline);

  const handleSaveClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleSave(opportunity.id);
  };

  if (viewMode === "list") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card hover className="p-4">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <Link
                  href={`/opportunities/${opportunity.id}`}
                  className="flex-1 min-w-0"
                >
                  <h3 className="text-lg font-semibold text-text-primary hover:text-primary transition-colors">
                    {opportunity.title}
                  </h3>
                </Link>
                <button
                  onClick={handleSaveClick}
                  className="p-2 rounded-lg hover:bg-surface-secondary transition-colors flex-shrink-0"
                  aria-label={
                    isSaved ? "Unsave opportunity" : "Save opportunity"
                  }
                >
                  {isSaved ? (
                    <BookmarkCheck className="w-5 h-5 text-primary fill-primary" />
                  ) : (
                    <Bookmark className="w-5 h-5 text-text-secondary hover:text-primary" />
                  )}
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-2 mt-1">
                <Building className="w-4 h-4 text-text-secondary" />
                <span className="text-sm text-text-secondary">
                  {opportunity.organization}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2 mt-2">
                <Badge className={categoryColor}>
                  {categoryIcon} {opportunity.category}
                </Badge>
                <Badge variant="default">
                  <Briefcase className="w-3 h-3 mr-1" />
                  {opportunity.type}
                </Badge>
                <Badge variant="default">
                  <MapPin className="w-3 h-3 mr-1" />
                  {opportunity.location}
                </Badge>
                {expiringSoon && !expired && (
                  <Badge variant="warning" className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Expiring Soon
                  </Badge>
                )}
                {expired && <Badge variant="error">Expired</Badge>}
              </div>

              <p className="text-sm text-text-secondary mt-2 line-clamp-2">
                {truncateText(opportunity.description, 100)}
              </p>

              <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-text-secondary">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {formatDate(opportunity.deadline)}
                </span>
                {!expired && (
                  <span
                    className={`flex items-center gap-1 ${deadlineStatus.color}`}
                  >
                    <Clock className="w-4 h-4" />
                    {deadlineStatus.label}
                  </span>
                )}
                {opportunity.tags.slice(0, 2).map((tag) => (
                  <span key={tag} className="flex items-center gap-1">
                    <Tag className="w-3 h-3" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
              <Link
                href={`/opportunities/${opportunity.id}`}
                className="w-full sm:w-auto"
              >
                <Button
                  size="sm"
                  variant="outline"
                  fullWidth
                  rightIcon={<ExternalLink className="w-3 h-3" />}
                >
                  View
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </motion.div>
    );
  }

  // Grid view
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <Card
        hover
        className={cn(
          "relative overflow-hidden h-full flex flex-col",
          "px-9 py-9 md:px-10 md:py-10 rounded-2xl",
          "border border-border/60",
          "hover:shadow-xl hover:-translate-y-1 transition-all duration-300",
          featured && "border-primary/40 shadow-lg shadow-primary/10"
        )}
      >
        {/* Top Badges + Save Button */}
        <div className="flex justify-between items-start mb-6">
          {/* Badges */}
          <div className="flex flex-wrap gap-2">
            {featured && (
              <Badge
                variant="featured"
                className="
                px-3 py-1
                rounded-full
                text-xs
                font-medium
              "
              >
                Featured
              </Badge>
            )}

            {expiringSoon && !expired && (
              <Badge
                variant="warning"
                className="
                flex items-center gap-1
                px-3 py-1
                rounded-full
                text-xs
              "
              >
                <Clock className="w-3 h-3" />
                Expiring
              </Badge>
            )}

            {expired && (
              <Badge variant="error" className="px-3 py-1 rounded-full text-xs">
                Expired
              </Badge>
            )}
          </div>

          {/* Save Button */}
          <button
            onClick={handleSaveClick}
            className="
            w-10 h-10
            flex items-center justify-center
            rounded-xl
            bg-surface
            border border-border
            hover:bg-primary/10
            hover:border-primary/40
            transition-all
          "
          >
            {isSaved ? (
              <BookmarkCheck className="w-5 h-5 text-primary fill-primary" />
            ) : (
              <Bookmark className="w-5 h-5 text-text-secondary" />
            )}
          </button>
        </div>

        {/* Main Content */}
        <div className="flex flex-col flex-1 gap-5">
          {/* Title */}
          <div className="space-y-3">
            <Link href={`/opportunities/${opportunity.id}`}>
              <h3
                className="
                text-xl
                font-bold
                leading-snug
                text-text-primary
                hover:text-primary
                transition-colors
                line-clamp-2
              "
              >
                {opportunity.title}
              </h3>
            </Link>

            {/* Organization */}
            <div
              className="
              flex
              items-center
              gap-2
              text-sm
              text-text-secondary
            "
            >
              <Building className="w-4 h-4 text-primary" />

              <span className="truncate">{opportunity.organization}</span>
            </div>
          </div>

          {/* Category Badges */}
          <div className="flex flex-wrap gap-2">
            <Badge className={cn(categoryColor, "px-3 py-1 rounded-full")}>
              {categoryIcon}
              <span className="ml-1">{opportunity.category}</span>
            </Badge>

            <Badge variant="default" className="px-3 py-1 rounded-full">
              <Briefcase className="w-3 h-3 mr-1" />
              {opportunity.type}
            </Badge>

            <Badge variant="default" className="px-3 py-1 rounded-full">
              <MapPin className="w-3 h-3 mr-1" />
              {opportunity.location}
            </Badge>
          </div>

          {/* Description */}
          <p
            className="
            text-sm
            leading-7
            text-text-secondary
            line-clamp-3
          "
          >
            {truncateText(opportunity.description, 120)}
          </p>

          {/* Tags */}
          {opportunity.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {opportunity.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="
                      px-3
                      py-1
                      text-xs
                      rounded-full
                      bg-surface-secondary
                      text-text-secondary
                      border border-border/50
                    "
                >
                  #{tag}
                </span>
              ))}

              {opportunity.tags.length > 3 && (
                <span
                  className="
                      px-3
                      py-1
                      text-xs
                      rounded-full
                      bg-primary/10
                      text-primary
                    "
                >
                  +{opportunity.tags.length - 3}
                </span>
              )}
            </div>
          )}

          {/* Footer */}
          <div
            className="
            mt-auto
            pt-5
            border-t
            border-border
            space-y-4
          "
          >
            <div
              className="
              flex
              flex-wrap
              gap-4
              text-xs
              text-text-secondary
            "
            >
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {formatDate(opportunity.deadline)}
              </span>

              {!expired && (
                <span
                  className={cn(
                    "flex items-center gap-1.5",
                    deadlineStatus.color
                  )}
                >
                  <Clock className="w-4 h-4" />

                  {deadlineStatus.label}
                </span>
              )}
            </div>

            <Link
              href={`/opportunities/${opportunity.id}`}
              className="block mt-3"
            >
              <Button
                className="
      w-full
      h-8
      rounded-xl
      text-sm
      font-semibold
      shadow-sm
      hover:shadow-lg
      transition-all
      duration-300
    "
              >
                View Details
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
