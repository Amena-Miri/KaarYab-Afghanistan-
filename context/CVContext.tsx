'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { CVData, CVFormData } from '@/types/cv';

interface CVContextType {
  cvData: CVData | null;
  isLoading: boolean;
  createCV: (data: CVFormData) => Promise<CVData>;
  updateCV: (data: Partial<CVData>) => Promise<void>;
  deleteCV: () => Promise<void>;
  downloadCV: (format: 'pdf' | 'docx') => Promise<void>;
}

const STORAGE_KEY = 'cvData';

const CVContext = createContext<CVContextType | undefined>(undefined);

export const useCV = () => {
  const context = useContext(CVContext);
  if (!context) {
    throw new Error('useCV must be used within a CVProvider');
  }
  return context;
};

interface CVProviderProps {
  children: React.ReactNode;
}

export const CVProvider: React.FC<CVProviderProps> = ({ children }) => {
  const [cvData, setCvData] = useState<CVData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setCvData(JSON.parse(stored));
    } catch (error) {
      console.error('Failed to parse CV:', error);
      localStorage.removeItem(STORAGE_KEY);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveToStorage = useCallback((data: CVData) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    setCvData(data);
  }, []);

  const createCV = useCallback(async (data: CVFormData): Promise<CVData> => {
    setIsLoading(true);
    try {
      const newCV: CVData = {
        personal: data.personal,
        experience: data.experience.map((exp) => ({
          ...exp,
          id: crypto.randomUUID(),
        })),
        education: data.education.map((edu) => ({
          ...edu,
          id: crypto.randomUUID(),
        })),
        skills: data.skills || [],
        languages: data.languages || [],
       certifications: (data.certifications ?? []).map(cert => ({
    ...cert,
    id: crypto.randomUUID(),
})),
        projects: (data.projects ?? []).map(proj => ({
    ...proj,
    id: crypto.randomUUID(),
})),
        template: 'modern',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      saveToStorage(newCV);
      return newCV;
    } finally {
      setIsLoading(false);
    }
  }, [saveToStorage]);

  const updateCV = useCallback(async (data: Partial<CVData>) => {
    setIsLoading(true);
    try {
      if (!cvData) throw new Error('No CV found');
      const updated: CVData = {
        ...cvData,
        ...data,
        personal: { ...cvData.personal, ...(data.personal || {}) },
        updatedAt: new Date().toISOString(),
      };
      saveToStorage(updated);
    } finally {
      setIsLoading(false);
    }
  }, [cvData, saveToStorage]);

  const deleteCV = useCallback(async () => {
    setIsLoading(true);
    try {
      localStorage.removeItem(STORAGE_KEY);
      setCvData(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const downloadCV = useCallback(async (format: 'pdf' | 'docx') => {
    setIsLoading(true);
    try {
      const element = document.getElementById('cv-preview');
      if (!element) {
        alert('Please go to Preview tab first');
        return;
      }
      if (format === 'pdf') {
        const html2pdf = (await import('html2pdf.js')).default;
        await html2pdf()
          .set({ margin: 10, filename: 'cv.pdf', html2canvas: { scale: 2 } })
          .from(element)
          .save();
      } else {
        alert('DOCX download coming soon. Use PDF format.');
      }
    } catch (error) {
      console.error('Download failed:', error);
      alert('Failed to download CV');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <CVContext.Provider value={{ cvData, isLoading, createCV, updateCV, deleteCV, downloadCV }}>
      {children}
    </CVContext.Provider>
  );
};