'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useOpportunityContext } from '@/context/OpportunityContext';
import { OpportunityCard } from '@/components/opportunity/OpportunityCard';
import { SearchFilter } from '@/components/opportunity/SearchFilter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { 
  Plus, Filter, X, Grid, List, LayoutGrid,
  TrendingUp, Clock, CheckCircle, AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { EmptyState } from "@/components/ui/EmptyState";

type ViewMode = 'grid' | 'list';

const OpportunitiesPage = () => {
  const searchParams = useSearchParams();
  const { getFilteredOpportunities, filters, setFilters, clearFilters } = useOpportunityContext();
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [activeTab, setActiveTab] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);

  const filteredOpportunities = getFilteredOpportunities();

  useEffect(() => {
    const load = async () => {
      await new Promise(resolve => setTimeout(resolve, 300));
      setIsLoading(false);
    };
    load();
  }, []);

  // Set initial filters from URL params
  useEffect(() => {
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    if (category || search) {
      setFilters({ ...filters, category: category || '', search: search || '' });
    }
  }, [searchParams]);

  const hasActiveFilters = Object.values(filters).some(value => value !== '');

  // Get filtered opportunities by tab
  const getTabOpportunities = () => {
    const now = new Date();
    const sevenDaysFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    
    switch (activeTab) {
      case 'active':
        return filteredOpportunities.filter(opp => new Date(opp.deadline) >= now);
      case 'expiring':
        return filteredOpportunities.filter(opp => {
          const deadline = new Date(opp.deadline);
          return deadline >= now && deadline <= sevenDaysFromNow;
        });
      case 'saved':
        return filteredOpportunities.filter(opp => 
          JSON.parse(localStorage.getItem('savedOpportunities') || '[]').includes(opp.id)
        );
      default:
        return filteredOpportunities;
    }
  };

  const tabOpportunities = getTabOpportunities();

  const tabs = [
    { id: 'all', label: 'All', icon: LayoutGrid },
    { id: 'active', label: 'Active', icon: CheckCircle },
    { id: 'expiring', label: 'Expiring Soon', icon: Clock },
    { id: 'saved', label: 'Saved', icon: TrendingUp },
  ];

  const fadeUp = { 
    initial: { opacity: 0, y: 20 }, 
    animate: { opacity: 1, y: 0 }, 
    transition: { duration: 0.4 } 
  };
  return (
    <main className="min-h-screen pt-20 lg:pt-24 pb-16">
        <div className="container-custom">
        {/* ===== HEADER ===== */}
        <Card className="mb-10 p-8 border border-border bg-surface rounded-3xl">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-4xl font-bold text-primary mb-3">
                Browse Opportunities
              </h1>
              <p className="text-text-secondary text-lg">
                Find jobs, internships, scholarships, fellowships and competitions in one place.
              </p>
              <div className="mt-4">
                <span className="text-sm font-medium text-text-secondary">
                  {filteredOpportunities.length} Opportunities
                </span>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              {/* View Toggle */}
              <div className="flex bg-surface border border-border rounded-2xl p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={cn(
                    'p-3 rounded-xl transition-all',
                    viewMode === 'grid' 
                      ? 'bg-primary text-white shadow-lg shadow-primary/25' 
                      : 'text-text-secondary hover:bg-surface-secondary'
                  )}
                  aria-label="Grid view"
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={cn(
                    'p-3 rounded-xl transition-all',
                    viewMode === 'list' 
                      ? 'bg-primary text-white shadow-lg shadow-primary/25' 
                      : 'text-text-secondary hover:bg-surface-secondary'
                  )}
                  aria-label="List view"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              <Link href="/add-opportunity">
                <Button
                  size="lg"
                  leftIcon={<Plus className="w-5 h-5" />}
                >
                  Add Opportunity
                </Button>
              </Link>
            </div>
          </div>
        </Card>

        {/* ===== TABS ===== */}
        <div className="flex flex-wrap gap-2 mb-8 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-semibold transition-all whitespace-nowrap',
                activeTab === tab.id
                  ? 'bg-primary text-white shadow-lg shadow-primary/25'
                  : 'bg-surface text-text-secondary hover:bg-surface-secondary border border-border'
              )}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* ===== MOBILE FILTER TOGGLE ===== */}
        <button
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="lg:hidden w-full mb-4 flex items-center justify-center gap-2 p-3 bg-surface rounded-xl border border-border"
        >
          <Filter className="w-5 h-5 text-text-secondary" />
          <span className="text-text-secondary">Filters</span>
          {hasActiveFilters && (
            <Badge variant="primary" className="ml-2">
              {Object.values(filters).filter(v => v !== '').length} active
            </Badge>
          )}
        </button>

        {/* ===== MAIN CONTENT ===== */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* ===== FILTER SIDEBAR ===== */}
          <div className={cn(
            'lg:w-72 flex-shrink-0 transition-all duration-300',
            showMobileFilters ? 'block' : 'hidden lg:block'
          )}>
            <div className="sticky top-28">
              <Card className="p-6 rounded-2xl border border-border shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-primary">Filters</h2>
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
                <div className="space-y-6">
                  <SearchFilter />
                </div>
              </Card>
            </div>
          </div>

          {/* ===== RESULTS ===== */}
          <div className="flex-1">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="bg-surface rounded-xl border border-border p-6 animate-pulse h-64" />
                ))}
              </div>
            ) : tabOpportunities.length > 0 ? (
              <AnimatePresence mode="wait">
                <motion.div
                  key={viewMode + activeTab}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className={cn(
                    viewMode === 'grid' 
                      ? 'grid grid-cols-1 md:grid-cols-2 gap-6' 
                      : 'space-y-4'
                  )}
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
              <EmptyState
  icon={AlertCircle}
  title="No Opportunities Found"
  description={
    hasActiveFilters
      ? "Try adjusting your filters to find more opportunities."
      : activeTab !== "all"
      ? `No ${activeTab} opportunities available at the moment.`
      : "Be the first to add an opportunity!"
  }
  action={
    !hasActiveFilters
      ? {
          label: "Add Opportunity",
          onClick: () => {
            window.location.href = "/add-opportunity";
          },
        }
      : undefined
  }
/>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default OpportunitiesPage;