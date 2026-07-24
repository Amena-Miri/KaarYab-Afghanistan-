'use client';

import { useOpportunityContext } from '@/context/OpportunityContext';
import { categories, opportunityTypes, locations } from '@/lib/utils';
import { Search, MapPin, Briefcase, Calendar, X } from 'lucide-react';
import { motion } from 'framer-motion';

export const SearchFilter = () => {
  const { filters, setFilters } = useOpportunityContext();

  const handleChange = (key: string, value: string) => {
    setFilters({ ...filters, [key]: value });
  };

  const clearFilter = (key: string) => {
    setFilters({ ...filters, [key]: '' });
  };

  const filterFields = [
    { key: 'search', label: 'Search', icon: Search, type: 'text', placeholder: 'Search by title...' },
    { key: 'category', label: 'Category', icon: Briefcase, type: 'select', options: ['', ...categories] },
    { key: 'location', label: 'Location', icon: MapPin, type: 'select', options: ['', ...locations] },
    { key: 'type', label: 'Type', icon: Briefcase, type: 'select', options: ['', ...opportunityTypes] },
    { 
      key: 'deadline', 
      label: 'Deadline', 
      icon: Calendar, 
      type: 'select', 
      options: [
        { value: '', label: 'All Deadlines' },
        { value: 'active', label: 'Active (Not Expired)' },
        { value: 'expiring-soon', label: 'Expiring Soon (7 days)' },
        { value: 'expired', label: 'Expired' },
      ] 
    },
  ];

  const hasActiveFilters = Object.values(filters).some(value => value !== '');

  return (
    <div className="space-y-4">
      {filterFields.map((field) => (
        <div key={field.key} className="space-y-1.5">
          <label className="text-sm font-medium text-text-secondary flex items-center gap-2">
            <field.icon className="w-4 h-4" />
            {field.label}
            {filters[field.key as keyof typeof filters] && (
              <button
                onClick={() => clearFilter(field.key)}
                className="ml-auto text-xs text-primary hover:underline"
              >
                Clear
              </button>
            )}
          </label>
          
          {field.type === 'text' ? (
            <div className="relative">
              <input
                type="text"
                value={filters[field.key as keyof typeof filters] as string}
                onChange={(e) => handleChange(field.key, e.target.value)}
                placeholder={field.placeholder}
                className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base rounded-xl border border-input-border bg-input-bg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
              {filters[field.key as keyof typeof filters] && (
                <button
                  onClick={() => clearFilter(field.key)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <X className="w-4 h-4 text-text-secondary hover:text-text-primary" />
                </button>
              )}
            </div>
          ) : (
            <select
              value={filters[field.key as keyof typeof filters] as string}
              onChange={(e) => handleChange(field.key, e.target.value)}
              className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base rounded-xl border border-input-border bg-input-bg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all cursor-pointer"
            >
              {field.options?.map((option: any) => (
                <option key={option.value || option} value={option.value || option}>
                  {option.label || option || `All ${field.label}s`}
                </option>
              ))}
            </select>
          )}
        </div>
      ))}

      {hasActiveFilters && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="pt-4 border-t border-border"
        >
          <p className="text-sm text-text-secondary">
            {Object.values(filters).filter(value => value !== '').length} active filters
          </p>
        </motion.div>
      )}
    </div>
  );
};