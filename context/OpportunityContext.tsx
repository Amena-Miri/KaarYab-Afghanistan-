'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { Opportunity, FilterOptions } from '@/types/opportunity';
import { initialOpportunities } from '@/data/opportunities';

interface OpportunityContextType {
  opportunities: Opportunity[];
  savedOpportunities: string[];
  filters: FilterOptions;
  setFilters: (filters: FilterOptions) => void;
  addOpportunity: (opportunity: Omit<Opportunity, 'id' | 'createdAt'>) => void;
  editOpportunity: (id: string, updatedData: Partial<Opportunity>) => void;
  deleteOpportunity: (id: string) => void;
  toggleSave: (id: string) => void;
  getFilteredOpportunities: () => Opportunity[];
  getOpportunityById: (id: string) => Opportunity | undefined;
  clearFilters: () => void;
  getCategoryStats: () => Record<string, number>;
  getSavedOpportunities: () => Opportunity[];
  isLoading: boolean;
}

const OpportunityContext = createContext<OpportunityContextType | undefined>(undefined);

export const useOpportunityContext = () => {
  const context = useContext(OpportunityContext);
  if (!context) {
    throw new Error('useOpportunityContext must be used within an OpportunityProvider');
  }
  return context;
};

interface OpportunityProviderProps {
  children: React.ReactNode;
}

export const OpportunityProvider: React.FC<OpportunityProviderProps> = ({ children }) => {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [savedOpportunities, setSavedOpportunities] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState<FilterOptions>({
    search: '',
    category: '',
    location: '',
    type: '',
    deadline: ''
  });

  // Load initial data
  useEffect(() => {
    // Simulate API loading
    setTimeout(() => {
      setOpportunities(initialOpportunities);
      setIsLoading(false);
    }, 500);
  }, []);

  // Load saved opportunities from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('savedOpportunities');
    if (saved) {
      try {
        setSavedOpportunities(JSON.parse(saved));
      } catch (error) {
        console.error('Error loading saved opportunities:', error);
      }
    }
  }, []);

  // Save to localStorage whenever savedOpportunities changes
  useEffect(() => {
    localStorage.setItem('savedOpportunities', JSON.stringify(savedOpportunities));
  }, [savedOpportunities]);

  const addOpportunity = useCallback((opportunityData: Omit<Opportunity, 'id' | 'createdAt'>) => {
    const newOpportunity: Opportunity = {
      ...opportunityData,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      views: 0,
      saves: 0
    };
    setOpportunities(prev => [newOpportunity, ...prev]);
  }, []);

  const editOpportunity = useCallback((id: string, updatedData: Partial<Opportunity>) => {
    setOpportunities(prev => 
      prev.map(opp => 
        opp.id === id 
          ? { ...opp, ...updatedData, updatedAt: new Date().toISOString() }
          : opp
      )
    );
  }, []);

  const deleteOpportunity = useCallback((id: string) => {
    setOpportunities(prev => prev.filter(opp => opp.id !== id));
    setSavedOpportunities(prev => prev.filter(savedId => savedId !== id));
  }, []);

  const toggleSave = useCallback((id: string) => {
    setSavedOpportunities(prev => {
      const isSaved = prev.includes(id);
      const newSaved = isSaved 
        ? prev.filter(savedId => savedId !== id)
        : [...prev, id];
      
      setOpportunities(opps => 
        opps.map(opp => 
          opp.id === id 
            ? { ...opp, saves: isSaved ? Math.max(0, (opp.saves || 0) - 1) : (opp.saves || 0) + 1 }
            : opp
        )
      );
      
      return newSaved;
    });
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({
      search: '',
      category: '',
      location: '',
      type: '',
      deadline: ''
    });
  }, []);

  const getFilteredOpportunities = useCallback(() => {
    let filtered = [...opportunities];

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(opp => 
        opp.title.toLowerCase().includes(searchLower) ||
        opp.organization.toLowerCase().includes(searchLower) ||
        opp.description.toLowerCase().includes(searchLower) ||
        opp.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }

    if (filters.category) {
      filtered = filtered.filter(opp => opp.category === filters.category);
    }

    if (filters.location) {
      const locationLower = filters.location.toLowerCase();
      filtered = filtered.filter(opp => 
        opp.location.toLowerCase().includes(locationLower)
      );
    }

    if (filters.type) {
      filtered = filtered.filter(opp => opp.type === filters.type);
    }

    if (filters.deadline) {
      const now = new Date();
      
      if (filters.deadline === 'expiring-soon') {
        const sevenDaysFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
        filtered = filtered.filter(opp => {
          const oppDeadline = new Date(opp.deadline);
          return oppDeadline <= sevenDaysFromNow && oppDeadline >= now;
        });
      } else if (filters.deadline === 'expired') {
        filtered = filtered.filter(opp => new Date(opp.deadline) < now);
      } else if (filters.deadline === 'active') {
        filtered = filtered.filter(opp => new Date(opp.deadline) >= now);
      }
    }

    return filtered;
  }, [opportunities, filters]);

  const getOpportunityById = useCallback((id: string): Opportunity | undefined => {
    return opportunities.find(opp => opp.id === id);
  }, [opportunities]);

  const getCategoryStats = useCallback(() => {
    const stats: Record<string, number> = {};
    opportunities.forEach(opp => {
      stats[opp.category] = (stats[opp.category] || 0) + 1;
    });
    return stats;
  }, [opportunities]);

  const getSavedOpportunities = useCallback(() => {
    return opportunities.filter(opp => savedOpportunities.includes(opp.id));
  }, [opportunities, savedOpportunities]);

  const value = useMemo(() => ({
    opportunities,
    savedOpportunities,
    filters,
    setFilters,
    addOpportunity,
    editOpportunity,
    deleteOpportunity,
    toggleSave,
    getFilteredOpportunities,
    getOpportunityById,
    clearFilters,
    getCategoryStats,
    getSavedOpportunities,
    isLoading
  }), [
    opportunities,
    savedOpportunities,
    filters,
    addOpportunity,
    editOpportunity,
    deleteOpportunity,
    toggleSave,
    getFilteredOpportunities,
    getOpportunityById,
    clearFilters,
    getCategoryStats,
    getSavedOpportunities,
    isLoading
  ]);

  return (
    <OpportunityContext.Provider value={value}>
      {children}
    </OpportunityContext.Provider>
  );
};