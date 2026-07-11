'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useOpportunityContext } from '@/context/OpportunityContext';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { cn } from "@/lib/utils";
import { 
  Bookmark, 
  BookmarkCheck, 
  MapPin, 
  Calendar, 
  Briefcase,
  Clock,
  ExternalLink
} from 'lucide-react';
import { formatDate, getDaysRemaining, isExpiringSoon, isExpired, truncateText } from '@/lib/utils';
import { Opportunity } from '@/types/opportunity';
import { motion } from 'framer-motion';

interface OpportunityCardProps {
  opportunity: Opportunity;
  featured?: boolean;
}

export const OpportunityCard: React.FC<OpportunityCardProps> = ({ 
  opportunity, 
  featured = false 
}) => {
  const router = useRouter();
  const { savedOpportunities, toggleSave } = useOpportunityContext();
  const isSaved = savedOpportunities.includes(opportunity.id);

  const daysRemaining = getDaysRemaining(opportunity.deadline);
  const expiringSoon = isExpiringSoon(opportunity.deadline);
  const expired = isExpired(opportunity.deadline);

  const categoryColors: Record<string, string> = {
    'Job': 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
    'Internship': 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400',
    'Scholarship': 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
    'Online Course': 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400',
    'Remote Work': 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400',
    'Training Program': 'bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-400',
    'Volunteer Work': 'bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card 
        hover 
        className={cn(
          'relative overflow-hidden',
          featured && 'border-primary/50 shadow-lg shadow-primary/10'
        )}
      >
        {/* Featured Badge */}
        {featured && (
          <div className="absolute top-0 right-0">
            <div className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
              Featured
            </div>
          </div>
        )}

        {/* Expiring Soon Badge */}
        {expiringSoon && !expired && (
          <div className="absolute top-0 left-0">
            <div className="bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-br-lg flex items-center gap-1">
              <Clock className="w-3 h-3" />
              Expiring Soon
            </div>
          </div>
        )}

        {/* Expired Badge */}
        {expired && (
          <div className="absolute top-0 left-0">
            <div className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-br-lg">
              Expired
            </div>
          </div>
        )}

        <div className="space-y-4">
          {/* Header */}
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <Link href={`/opportunities/${opportunity.id}`}>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white hover:text-primary transition-colors">
                  {opportunity.title}
                </h3>
              </Link>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {opportunity.organization}
              </p>
            </div>
            <button
              onClick={() => toggleSave(opportunity.id)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label={isSaved ? 'Unsave opportunity' : 'Save opportunity'}
            >
              {isSaved ? (
                <BookmarkCheck className="w-5 h-5 text-primary fill-primary" />
              ) : (
                <Bookmark className="w-5 h-5 text-gray-400 hover:text-primary" />
              )}
            </button>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-2">
            <Badge variant="primary" className={categoryColors[opportunity.category] || ''}>
              {opportunity.category}
            </Badge>
            <Badge variant="default">
              <Briefcase className="w-3 h-3 mr-1" />
              {opportunity.type}
            </Badge>
            {opportunity.tags.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="default">
                #{tag}
              </Badge>
            ))}
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
            {truncateText(opportunity.description, 120)}
          </p>

          {/* Footer */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-gray-100 dark:border-gray-800">
            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {opportunity.location}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {formatDate(opportunity.deadline)}
              </span>
              {!expired && (
                <span className={`flex items-center gap-1 font-medium ${
                  daysRemaining <= 3 ? 'text-red-500' : 
                  daysRemaining <= 7 ? 'text-yellow-500' : 
                  'text-green-500'
                }`}>
                  <Clock className="w-4 h-4" />
                  {daysRemaining} days left
                </span>
              )}
            </div>
            <Link href={`/opportunities/${opportunity.id}`}>
              <Button size="sm" variant="outline" rightIcon={<ExternalLink className="w-3 h-3" />}>
                View Details
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};