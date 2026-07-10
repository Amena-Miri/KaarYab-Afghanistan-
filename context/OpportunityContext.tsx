'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
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
  children: ReactNode;
}

export const OpportunityProvider: React.FC<OpportunityProviderProps> = ({ children }) => {
  const [opportunities, setOpportunities] = useState<Opportunity[]>(initialOpportunities);
  const [savedOpportunities, setSavedOpportunities] = useState<string[]>([]);
  const [filters, setFilters] = useState<FilterOptions>({
    search: '',
    category: '',
    location: '',
    type: '',
    deadline: ''
  });

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

  const addOpportunity = (opportunityData: Omit<Opportunity, 'id' | 'createdAt'>) => {
    const newOpportunity: Opportunity = {
      ...opportunityData,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      views: 0,
      saves: 0
    };
    setOpportunities(prev => [newOpportunity, ...prev]);
  };

  const editOpportunity = (id: string, updatedData: Partial<Opportunity>) => {
    setOpportunities(prev => 
      prev.map(opp => 
        opp.id === id 
          ? { ...opp, ...updatedData, updatedAt: new Date().toISOString() }
          : opp
      )
    );
  };

  const deleteOpportunity = (id: string) => {
    setOpportunities(prev => prev.filter(opp => opp.id !== id));
    // Remove from saved if it was saved
    if (savedOpportunities.includes(id)) {
      setSavedOpportunities(prev => prev.filter(savedId => savedId !== id));
    }
  };

  const toggleSave = (id: string) => {
    setSavedOpportunities(prev => {
      const isSaved = prev.includes(id);
      const newSaved = isSaved 
        ? prev.filter(savedId => savedId !== id)
        : [...prev, id];
      
      // Update saves count in opportunities
      setOpportunities(opps => 
        opps.map(opp => 
          opp.id === id 
            ? { ...opp, saves: isSaved ? Math.max(0, (opp.saves || 0) - 1) : (opp.saves || 0) + 1 }
            : opp
        )
      );
      
      return newSaved;
    });
  };

  const getFilteredOpportunities = (): Opportunity[] => {
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
      const deadlineDate = new Date(filters.deadline);
      
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
  };

  const getOpportunityById = (id: string): Opportunity | undefined => {
    return opportunities.find(opp => opp.id === id);
  };

  const value = {
    opportunities,
    savedOpportunities,
    filters,
    setFilters,
    addOpportunity,
    editOpportunity,
    deleteOpportunity,
    toggleSave,
    getFilteredOpportunities,
    getOpportunityById
  };

  return (
    <OpportunityContext.Provider value={value}>
      {children}
    </OpportunityContext.Provider>
  );
};