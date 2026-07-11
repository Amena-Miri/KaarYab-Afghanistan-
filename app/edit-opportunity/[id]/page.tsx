'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useOpportunityContext } from '@/context/OpportunityContext';
import { OpportunityForm } from '@/components/forms/OpportunityForm';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, Edit, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import { OpportunityFormValues } from '@/lib/validation';
import { motion, AnimatePresence } from 'framer-motion';
import { Opportunity } from '@/types/opportunity';

const EditOpportunityPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const { getOpportunityById, editOpportunity } = useOpportunityContext();
  const [opportunity, setOpportunity] = useState<Opportunity | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const id = params.id as string;
    const opp = getOpportunityById(id);
    
    if (opp) {
      setOpportunity(opp);
    }
    setIsLoading(false);
  }, [params.id, getOpportunityById]);

  const handleSubmit = async (data: OpportunityFormValues) => {
    if (!opportunity) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      // Parse requirements and tags
      const requirements = data.requirements
        .split(',')
        .map(req => req.trim())
        .filter(req => req.length > 0);

      const tags = data.tags
        ? data.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
        : [];

      // Edit the opportunity
      await editOpportunity(opportunity.id, {
        title: data.title,
        organization: data.organization,
        category: data.category as any,
        location: data.location,
        type: data.type as any,
        deadline: data.deadline,
        description: data.description,
        requirements,
        applyLink: data.applyLink,
        tags,
      });

      setSubmitStatus('success');
      
      // Redirect after 2 seconds
      setTimeout(() => {
        router.push(`/opportunities/${opportunity.id}`);
      }, 2000);
    } catch (error) {
      console.error('Error editing opportunity:', error);
      setSubmitStatus('error');
      setErrorMessage('Failed to update opportunity. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (opportunity) {
      router.push(`/opportunities/${opportunity.id}`);
    } else {
      router.push('/opportunities');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-black flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading opportunity...</p>
        </div>
      </div>
    );
  }

  if (!opportunity) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-black flex items-center justify-center px-4">
        <Card className="max-w-md w-full text-center p-8">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Opportunity Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The opportunity you're trying to edit doesn't exist or has been removed.
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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Link 
              href={`/opportunities/${opportunity.id}`}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </Link>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Edit className="w-8 h-8 text-primary" />
                Edit Opportunity
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Update details for "{opportunity.title}"
              </p>
            </div>
          </div>
        </div>

        {/* Success/Error Messages */}
        <AnimatePresence>
          {submitStatus === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800 flex items-center gap-3"
            >
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
              <div>
                <p className="font-medium text-green-700 dark:text-green-400">
                  Opportunity Updated Successfully!
                </p>
                <p className="text-sm text-green-600 dark:text-green-300">
                  Redirecting to opportunity details...
                </p>
              </div>
            </motion.div>
          )}

          {submitStatus === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800 flex items-center gap-3"
            >
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
              <div>
                <p className="font-medium text-red-700 dark:text-red-400">
                  Failed to Update Opportunity
                </p>
                <p className="text-sm text-red-600 dark:text-red-300">
                  {errorMessage || 'Please try again later.'}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form */}
        <Card className="p-4 sm:p-6">
          <OpportunityForm
            initialData={opportunity}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isSubmitting={isSubmitting}
            submitLabel="Update Opportunity"
            cancelLabel="Cancel"
          />
        </Card>

        {/* Delete Section */}
        <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/10 rounded-lg border border-red-200 dark:border-red-800">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-semibold text-red-700 dark:text-red-400">
                Danger Zone
              </h3>
              <p className="text-sm text-red-600 dark:text-red-300">
                This action cannot be undone. This will permanently delete the opportunity.
              </p>
            </div>
            <Link href={`/opportunities/${opportunity.id}?delete=true`}>
              <Button variant="danger">
                Delete Opportunity
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditOpportunityPage;