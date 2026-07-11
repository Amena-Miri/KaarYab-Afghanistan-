'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useOpportunityContext } from '@/context/OpportunityContext';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { OpportunityCard } from '@/components/opportunity/OpportunityCard';
import { 
  ArrowLeft, 
  Bookmark, 
  BookmarkCheck, 
  MapPin, 
  Calendar, 
  Briefcase,
  Clock,
  ExternalLink,
  Share2,
  Users,
  Eye,
  Heart,
  Building,
  Tag,
  FileText,
  ListChecks,
  Link as LinkIcon,
  AlertCircle
} from 'lucide-react';
import { 
  formatDate, 
  formatDateShort, 
  getDaysRemaining, 
  isExpiringSoon, 
  isExpired,
  getCategoryColor,
  getCategoryIcon,
  getDeadlineStatus,
  truncateText
} from '@/lib/utils';
import { motion } from 'framer-motion';

const OpportunityDetailsPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const { getOpportunityById, savedOpportunities, toggleSave, opportunities } = useOpportunityContext();
  const [opportunity, setOpportunity] = useState(getOpportunityById(params.id as string));
  const [relatedOpportunities, setRelatedOpportunities] = useState<any[]>([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const opp = getOpportunityById(params.id as string);
    setOpportunity(opp);

    if (opp) {
      // Get related opportunities (same category or tags)
      const related = opportunities
        .filter(o => o.id !== opp.id && (o.category === opp.category || o.tags.some(tag => opp.tags.includes(tag))))
        .slice(0, 3);
      setRelatedOpportunities(related);
    }
  }, [params.id, getOpportunityById, opportunities]);

  if (!opportunity) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-black flex items-center justify-center px-4">
        <Card className="max-w-md w-full text-center p-8">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Opportunity Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The opportunity you're looking for doesn't exist or has been removed.
          </p>
          <Link href="/opportunities">
            <Button leftIcon={<ArrowLeft className="w-4 h-4" />}>
              Back to Opportunities
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  const isSaved = savedOpportunities.includes(opportunity.id);
  const daysRemaining = getDaysRemaining(opportunity.deadline);
  const expired = isExpired(opportunity.deadline);
  const expiringSoon = isExpiringSoon(opportunity.deadline);
  const categoryColor = getCategoryColor(opportunity.category);
  const deadlineStatus = getDeadlineStatus(opportunity.deadline);

  const handleShare = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back Button */}
        <Link href="/opportunities" className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Opportunities</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="p-6">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div className="flex-1 min-w-0">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                      {opportunity.title}
                    </h1>
                    <div className="flex flex-wrap items-center gap-2 text-gray-600 dark:text-gray-400">
                      <Building className="w-4 h-4" />
                      <span className="font-medium">{opportunity.organization}</span>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex gap-2 flex-shrink-0">
                    <button
                      onClick={() => toggleSave(opportunity.id)}
                      className={`p-2 rounded-lg border-2 transition-all ${
                        isSaved 
                          ? 'border-primary bg-primary/10 text-primary' 
                          : 'border-gray-200 dark:border-dark-border hover:border-primary'
                      }`}
                      aria-label={isSaved ? 'Unsave' : 'Save'}
                    >
                      {isSaved ? (
                        <BookmarkCheck className="w-5 h-5" />
                      ) : (
                        <Bookmark className="w-5 h-5" />
                      )}
                    </button>
                    <button
                      onClick={handleShare}
                      className="p-2 rounded-lg border-2 border-gray-200 dark:border-dark-border hover:border-primary transition-all"
                      aria-label="Share"
                    >
                      <Share2 className="w-5 h-5" />
                    </button>
                    {copied && (
                      <span className="text-sm text-green-500 font-medium flex items-center">
                        Copied!
                      </span>
                    )}
                  </div>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge className={`${categoryColor} font-medium`}>
                    {getCategoryIcon(opportunity.category)} {opportunity.category}
                  </Badge>
                  <Badge variant="default">
                    <Briefcase className="w-3 h-3 mr-1" />
                    {opportunity.type}
                  </Badge>
                  <Badge variant="default">
                    <MapPin className="w-3 h-3 mr-1" />
                    {opportunity.location}
                  </Badge>
                  {opportunity.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="default">
                      <Tag className="w-3 h-3 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Deadline Status */}
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${deadlineStatus.color}`}>
                  <Clock className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    {expired ? 'Expired' : `${deadlineStatus.label}`}
                  </span>
                </div>
              </Card>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <Card className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  Description
                </h2>
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">
                  {opportunity.description}
                </p>
              </Card>
            </motion.div>

            {/* Requirements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <Card className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <ListChecks className="w-5 h-5 text-primary" />
                  Requirements
                </h2>
                <ul className="space-y-2">
                  {opportunity.requirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                      <span className="text-primary font-bold">•</span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>

            {/* Apply Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <Card className="p-6 bg-primary/5 border-primary/20">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Ready to Apply?
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Take the next step towards your opportunity
                    </p>
                  </div>
                  {!expired ? (
                    <a
                      href={opportunity.applyLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto"
                    >
                      <Button 
                        size="lg" 
                        rightIcon={<ExternalLink className="w-4 h-4" />}
                        className="w-full sm:w-auto"
                      >
                        Apply Now
                      </Button>
                    </a>
                  ) : (
                    <Button size="lg" disabled className="w-full sm:w-auto opacity-50 cursor-not-allowed">
                      Expired
                    </Button>
                  )}
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Info Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <Card className="p-6">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
                  Opportunity Details
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Building className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Organization</p>
                      <p className="font-medium text-gray-900 dark:text-white">{opportunity.organization}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Location</p>
                      <p className="font-medium text-gray-900 dark:text-white">{opportunity.location}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Deadline</p>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {formatDateShort(opportunity.deadline)}
                      </p>
                      {!expired && (
                        <p className="text-sm text-primary">
                          {daysRemaining} days remaining
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Eye className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Views</p>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {opportunity.views || 0} views
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Heart className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Saves</p>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {opportunity.saves || 0} saves
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-dark-border">
                  <Link href={opportunity.applyLink} target="_blank" rel="noopener noreferrer">
                    <Button 
                      fullWidth 
                      rightIcon={<LinkIcon className="w-4 h-4" />}
                      disabled={expired}
                    >
                      {expired ? 'Expired' : 'Apply Now'}
                    </Button>
                  </Link>
                </div>
              </Card>
            </motion.div>

            {/* Related Opportunities */}
            {relatedOpportunities.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <Card className="p-6">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
                    Similar Opportunities
                  </h3>
                  <div className="space-y-4">
                    {relatedOpportunities.map((rel) => (
                      <Link 
                        key={rel.id} 
                        href={`/opportunities/${rel.id}`}
                        className="block group"
                      >
                        <div className="p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                          <h4 className="font-medium text-gray-900 dark:text-white group-hover:text-primary transition-colors">
                            {rel.title}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {rel.organization}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="default" className="text-xs">
                              {rel.category}
                            </Badge>
                            <Badge variant="default" className="text-xs">
                              {rel.type}
                            </Badge>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </Card>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpportunityDetailsPage;