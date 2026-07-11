'use client';

import React from 'react';
import Link from 'next/link';
import { useOpportunityContext } from '@/context/OpportunityContext';
import { OpportunityCard } from '@/components/opportunity/OpportunityCard';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Bookmark, BookmarkCheck, ArrowLeft, Plus, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const SavedOpportunitiesPage: React.FC = () => {
  const { getSavedOpportunities, savedOpportunities } = useOpportunityContext();
  const savedOpps = getSavedOpportunities();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3">
              <Bookmark className="w-8 h-8 text-primary" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Saved Opportunities
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  {savedOpps.length} opportunity{savedOpps.length !== 1 ? 'ies' : ''} saved
                </p>
              </div>
            </div>
          </div>
          <Link href="/opportunities">
            <Button variant="outline" leftIcon={<ArrowLeft className="w-4 h-4" />}>
              Browse All
            </Button>
          </Link>
        </div>

        {/* Content */}
        {savedOpps.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {savedOpps.map((opportunity, index) => (
              <motion.div
                key={opportunity.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                <OpportunityCard opportunity={opportunity} />
              </motion.div>
            ))}
          </div>
        ) : (
          <Card className="text-center py-16">
            <div className="flex flex-col items-center max-w-sm mx-auto">
              <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                <BookmarkCheck className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No Saved Opportunities
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-center mb-6">
                Start saving opportunities you're interested in. They'll appear here for easy access.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link href="/opportunities">
                  <Button leftIcon={<ArrowLeft className="w-4 h-4" />}>
                    Browse Opportunities
                  </Button>
                </Link>
                <Link href="/add-opportunity">
                  <Button variant="outline" leftIcon={<Plus className="w-4 h-4" />}>
                    Add Opportunity
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default SavedOpportunitiesPage;