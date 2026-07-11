'use client';

import React from 'react';
import Link from 'next/link';
import { useOpportunityContext } from '@/context/OpportunityContext';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
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
  Eye
} from 'lucide-react';
import { 
  formatDate, 
  getDaysRemaining, 
  isExpiringSoon, 
  isExpired, 
  truncateText,
  getCategoryColor,
  getCategoryIcon,
  getDeadlineStatus
} from '@/lib/utils';
import { Opportunity } from '@/types/opportunity';
import { motion } from 'framer-motion';

interface OpportunityCardProps {
  opportunity: Opportunity;
  featured?: boolean;
  viewMode?: 'grid' | 'list';
}

export const OpportunityCard: React.FC<OpportunityCardProps> = ({ 
  opportunity, 
  featured = false,
  viewMode = 'grid'
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

  if (viewMode === 'list') {
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
                <Link href={`/opportunities/${opportunity.id}`} className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white hover:text-primary transition-colors">
                    {opportunity.title}
                  </h3>
                </Link>
                <button
                  onClick={handleSaveClick}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex-shrink-0"
                  aria-label={isSaved ? 'Unsave opportunity' : 'Save opportunity'}
                >
                  {isSaved ? (
                    <BookmarkCheck className="w-5 h-5 text-primary fill-primary" />
                  ) : (
                    <Bookmark className="w-5 h-5 text-gray-400 hover:text-primary" />
                  )}
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-2 mt-1">
                <Building className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600 dark:text-gray-400">
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
                {expired && (
                  <Badge variant="danger">
                    Expired
                  </Badge>
                )}
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-2">
                {truncateText(opportunity.description, 100)}
              </p>

              <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {formatDate(opportunity.deadline)}
                </span>
                {!expired && (
                  <span className={`flex items-center gap-1 ${deadlineStatus.color}`}>
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
              <Link href={`/opportunities/${opportunity.id}`} className="w-full sm:w-auto">
                <Button size="sm" variant="outline" fullWidth rightIcon={<ExternalLink className="w-3 h-3" />}>
                  View
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </motion.div>
    );
  }

  // Grid view (original design)
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card 
        hover 
        className={cn(
          'relative overflow-hidden h-full flex flex-col',
          featured && 'border-primary/50 shadow-lg shadow-primary/10'
        )}
      >
        {/* Badges */}
        <div className="absolute top-0 left-0 right-0 flex justify-between items-start p-2 pointer-events-none">
          <div className="flex gap-1">
            {featured && (
              <Badge variant="primary" className="bg-primary text-white">
                Featured
              </Badge>
            )}
            {expiringSoon && !expired && (
              <Badge variant="warning" className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                Expiring
              </Badge>
            )}
            {expired && (
              <Badge variant="danger">
                Expired
              </Badge>
            )}
          </div>
          <button
            onClick={handleSaveClick}
            className="p-2 rounded-lg bg-white/80 dark:bg-black/80 backdrop-blur-sm hover:bg-white dark:hover:bg-black transition-colors pointer-events-auto"
            aria-label={isSaved ? 'Unsave opportunity' : 'Save opportunity'}
          >
            {isSaved ? (
              <BookmarkCheck className="w-5 h-5 text-primary fill-primary" />
            ) : (
              <Bookmark className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            )}
          </button>
        </div>

        <div className="flex-1 pt-10 space-y-3">
          {/* Header */}
          <div>
            <Link href={`/opportunities/${opportunity.id}`}>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white hover:text-primary transition-colors line-clamp-2">
                {opportunity.title}
              </h3>
            </Link>
            <div className="flex items-center gap-2 mt-1 text-sm text-gray-600 dark:text-gray-400">
              <Building className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">{opportunity.organization}</span>
            </div>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-1">
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
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
            {truncateText(opportunity.description, 120)}
          </p>

          {/* Tags */}
          {opportunity.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {opportunity.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-600 dark:text-gray-400">
                  #{tag}
                </span>
              ))}
              {opportunity.tags.length > 3 && (
                <span className="text-xs text-gray-400">+{opportunity.tags.length - 3}</span>
              )}
            </div>
          )}

          {/* Footer */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-gray-100 dark:border-gray-800">
            <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {formatDate(opportunity.deadline)}
              </span>
              {!expired && (
                <span className={`flex items-center gap-1 ${deadlineStatus.color}`}>
                  <Clock className="w-3 h-3" />
                  {deadlineStatus.label}
                </span>
              )}
            </div>
            <Link href={`/opportunities/${opportunity.id}`}>
              <Button size="sm" variant="outline">
                View Details
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

// Import cn utility
import { cn } from '@/lib/utils';