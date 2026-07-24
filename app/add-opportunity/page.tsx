'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useOpportunityContext } from '@/context/OpportunityContext';
import { OpportunityForm } from '@/components/forms/OpportunityForm';
import { Card } from '@/components/ui/Card';
import { ArrowLeft, CheckCircle, AlertCircle, PlusCircle, Sparkles } from 'lucide-react';
import { OpportunityFormValues } from '@/lib/validation';
import { motion, AnimatePresence } from 'framer-motion';

const AddOpportunityPage = () => {
  const router = useRouter();
  const { addOpportunity } = useOpportunityContext();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (data: OpportunityFormValues) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const requirements = data.requirements
        .split(',')
        .map(req => req.trim())
        .filter(req => req.length > 0);

      const tags = data.tags
        ? data.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
        : [];

      await addOpportunity({
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
        isFeatured: false,
      });

      setSubmitStatus('success');
      setTimeout(() => router.push('/opportunities'), 2000);

    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage('Failed to add opportunity. Please try again.');

    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen pt-20 lg:pt-24 pb-16">
      <div className="container-custom">

        {/* HEADER */}
        <Card className="mb-8 p-8 bg-surface border border-border rounded-3xl">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">

            <div className="flex items-center gap-3">

              <Link
                href="/opportunities"
                className="p-2 rounded-xl hover:bg-surface-secondary transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-text-secondary" />
              </Link>

              <div className="flex items-center gap-3">

                <div className="p-3 rounded-2xl bg-primary/10">
                  <PlusCircle className="w-7 h-7 text-primary" />
                </div>

                <div>
                  <h1 className="text-4xl font-bold text-primary mb-2">
                    Add Opportunity
                  </h1>

                  <p className="text-text-secondary text-lg">
                    Share an opportunity with the community
                  </p>
                </div>

              </div>

            </div>

          </div>
        </Card>


        {/* SUCCESS / ERROR */}

        <AnimatePresence>

          {submitStatus === 'success' && (
            <motion.div
              initial={{ opacity:0, y:-20 }}
              animate={{ opacity:1, y:0 }}
              exit={{ opacity:0, y:-20 }}
              className="mb-6 p-4 bg-success/10 border border-success/20 rounded-xl flex items-center gap-3"
            >
              <CheckCircle className="w-5 h-5 text-success" />

              <div>
                <p className="font-medium text-success">
                  Opportunity Added Successfully!
                </p>

                <p className="text-sm text-success/80">
                  Redirecting to opportunities page...
                </p>
              </div>

            </motion.div>
          )}


          {submitStatus === 'error' && (
            <motion.div
              initial={{ opacity:0, y:-20 }}
              animate={{ opacity:1, y:0 }}
              exit={{ opacity:0, y:-20 }}
              className="mb-6 p-4 bg-error/10 border border-error/20 rounded-xl flex items-center gap-3"
            >
              <AlertCircle className="w-5 h-5 text-error" />

              <div>
                <p className="font-medium text-error">
                  Failed to Add Opportunity
                </p>

                <p className="text-sm text-error/80">
                  {errorMessage || 'Please try again later.'}
                </p>
              </div>

            </motion.div>
          )}

        </AnimatePresence>


        {/* FORM */}

        <Card className="p-4 sm:p-6 bg-surface border border-border rounded-3xl">
          <OpportunityForm
            onSubmit={handleSubmit}
            onCancel={() => router.push('/opportunities')}
            isSubmitting={isSubmitting}
            submitLabel="Add Opportunity"
            cancelLabel="Cancel"
          />
        </Card>


        {/* TIP */}

        <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-xl flex items-start gap-3">

          <Sparkles className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />

          <div>
            <p className="text-sm font-medium text-text-primary">
              💡 Pro Tip:
            </p>

            <p className="text-sm text-text-secondary">
              Make sure to provide accurate and detailed information. This will help others find and apply to your opportunity more easily.
            </p>
          </div>

        </div>

      </div>
    </main>
  );
};

export default AddOpportunityPage;