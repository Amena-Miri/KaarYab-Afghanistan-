'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useOpportunityContext } from '@/context/OpportunityContext';
import { OpportunityCard } from '@/components/opportunity/OpportunityCard';
import { SearchFilter } from '@/components/opportunity/SearchFilter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { 
  Plus, 
  Filter, 
  X, 
  Grid, 
  List, 
  LayoutGrid,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { categories } from '@/lib/utils';

type ViewMode = 'grid' | 'list';

const OpportunitiesPage: React.FC = () => {
  const searchParams = useSearchParams();
  const { getFilteredOpportunities, filters, setFilters, clearFilters } = useOpportunityContext();
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [activeTab, setActiveTab] = useState<string>('all');
  
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

  // Get filtered opportunities by tab
  const getTabOpportunities = () => {
    if (activeTab === 'all') return filteredOpportunities;
    if (activeTab === 'active') {
      return filteredOpportunities.filter(opp => new Date(opp.deadline) >= new Date());
    }
    if (activeTab === 'expiring') {
      const sevenDaysFromNow = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
      return filteredOpportunities.filter(opp => {
        const deadline = new Date(opp.deadline);
        return deadline >= new Date() && deadline <= sevenDaysFromNow;
      });
    }
    if (activeTab === 'saved') {
      return filteredOpportunities.filter(opp => 
        JSON.parse(localStorage.getItem('savedOpportunities') || '[]').includes(opp.id)
      );
    }
    return filteredOpportunities;
  };

  const tabOpportunities = getTabOpportunities();

  const tabs = [
    { id: 'all', label: 'All', icon: LayoutGrid },
    { id: 'active', label: 'Active', icon: CheckCircle },
    { id: 'expiring', label: 'Expiring Soon', icon: Clock },
    { id: 'saved', label: 'Saved', icon: TrendingUp },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Opportunities
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {filteredOpportunities.length} opportunities available
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {/* View Toggle */}
            <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === 'grid' 
                    ? 'bg-white dark:bg-gray-700 shadow-sm' 
                    : 'hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
                aria-label="Grid view"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === 'list' 
                    ? 'bg-white dark:bg-gray-700 shadow-sm' 
                    : 'hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
                aria-label="List view"
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            <Link href="/add-opportunity">
              <Button leftIcon={<Plus className="w-4 h-4" />}>
                Add Opportunity
              </Button>
            </Link>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-primary text-white shadow-lg shadow-primary/25'
                  : 'bg-white dark:bg-dark-card text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Filter Toggle for Mobile */}
        <button
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="lg:hidden w-full mb-4 flex items-center justify-center gap-2 p-3 bg-white dark:bg-dark-card rounded-lg border border-gray-200 dark:border-dark-border"
        >
          <Filter className="w-5 h-5" />
          <span>Filters</span>
          {hasActiveFilters && (
            <Badge variant="primary" className="ml-2">
              {Object.values(filters).filter(v => v !== '').length} active
            </Badge>
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
                      onClick={clearFilters}
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

          {/* Results */}
          <div className="flex-1">
            {tabOpportunities.length > 0 ? (
              <AnimatePresence mode="wait">
                <motion.div
                  key={viewMode + activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className={viewMode === 'grid' 
                    ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-4' 
                    : 'space-y-4'
                  }
                >
                  {tabOpportunities.map((opportunity, index) => (
                    <motion.div
                      key={opportunity.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <OpportunityCard 
                        opportunity={opportunity} 
                        featured={opportunity.isFeatured}
                        viewMode={viewMode}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            ) : (
              <Card className="text-center py-16">
                <div className="flex flex-col items-center max-w-sm mx-auto">
                  <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                    <AlertCircle className="w-10 h-10 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    No opportunities found
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-center mb-6">
                    {hasActiveFilters 
                      ? 'Try adjusting your filters to find more opportunities.'
                      : activeTab !== 'all' 
                        ? `No ${activeTab} opportunities available at the moment.`
                        : 'Be the first to add an opportunity!'}
                  </p>
                  {!hasActiveFilters && (
                    <Link href="/add-opportunity">
                      <Button leftIcon={<Plus className="w-4 h-4" />}>
                        Add Opportunity
                      </Button>
                    </Link>
                  )}
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