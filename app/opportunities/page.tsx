'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useOpportunityContext } from '@/context/OpportunityContext';
import { OpportunityCard } from '@/components/opportunity/OpportunityCard';
import { SearchFilter } from '@/components/opportunity/SearchFilter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Plus, Filter, X } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const OpportunitiesPage: React.FC = () => {
  const searchParams = useSearchParams();
  const { getFilteredOpportunities, filters, setFilters } = useOpportunityContext();
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  
  const filteredOpportunities = getFilteredOpportunities();

  // Set initial filters from URL params
  useEffect(() => {
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    
    if (category || search) {
      setFilters({
        ...filters,
        category: category || '',
        search: search || '',
      });
    }
  }, [searchParams]);

  const hasActiveFilters = Object.values(filters).some(value => value !== '');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Opportunities
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {filteredOpportunities.length} opportunities available
            </p>
          </div>
          <Link href="/add-opportunity">
            <Button leftIcon={<Plus className="w-4 h-4" />}>
              Add Opportunity
            </Button>
          </Link>
        </div>

        {/* Filter Toggle for Mobile */}
        <button
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="lg:hidden w-full mb-4 flex items-center justify-center gap-2 p-3 bg-white dark:bg-dark-card rounded-lg border border-gray-200 dark:border-dark-border"
        >
          <Filter className="w-5 h-5" />
          <span>Filters</span>
          {hasActiveFilters && (
            <span className="bg-primary text-white text-xs px-2 py-0.5 rounded-full">
              Active
            </span>
          )}
        </button>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filter Sidebar */}
          <div className={`
            lg:w-72 flex-shrink-0
            ${showMobileFilters ? 'block' : 'hidden lg:block'}
          `}>
            <div className="sticky top-20">
              <Card className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-semibold text-gray-900 dark:text-white">
                    Filters
                  </h2>
                  {hasActiveFilters && (
                    <button
                      onClick={() => setFilters({ search: '', category: '', location: '', type: '', deadline: '' })}
                      className="text-sm text-primary hover:underline flex items-center gap-1"
                    >
                      <X className="w-4 h-4" />
                      Clear All
                    </button>
                  )}
                </div>
                <SearchFilter />
              </Card>
            </div>
          </div>

          {/* Results Grid */}
          <div className="flex-1">
            {filteredOpportunities.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AnimatePresence>
                  {filteredOpportunities.map((opportunity, index) => (
                    <motion.div
                      key={opportunity.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      exit={{ opacity: 0, y: -20 }}
                    >
                      <OpportunityCard opportunity={opportunity} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              <Card className="text-center py-12">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                    <Filter className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    No opportunities found
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Try adjusting your filters or add a new opportunity.
                  </p>
                  <Link href="/add-opportunity">
                    <Button leftIcon={<Plus className="w-4 h-4" />}>
                      Add Opportunity
                    </Button>
                  </Link>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpportunitiesPage;