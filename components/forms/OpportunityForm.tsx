'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { opportunitySchema, OpportunityFormValues } from '@/lib/validation';
import { categories, opportunityTypes, locations } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { X, AlertCircle, CheckCircle } from 'lucide-react';
import { Opportunity } from '@/types/opportunity';

interface OpportunityFormProps {
  initialData?: Opportunity | null;
  onSubmit: (data: OpportunityFormValues) => void;
  onCancel?: () => void;
  isSubmitting?: boolean;
  submitLabel?: string;
  cancelLabel?: string;
}

export const OpportunityForm: React.FC<OpportunityFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  isSubmitting = false,
  submitLabel = 'Submit Opportunity',
  cancelLabel = 'Cancel',
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    reset,
    watch,
    setValue,
  } = useForm<OpportunityFormValues>({
    resolver: yupResolver(opportunitySchema),
    mode: 'onChange',
    defaultValues: {
      title: '',
      organization: '',
      category: '',
      location: '',
      type: '',
      deadline: '',
      description: '',
      requirements: '',
      applyLink: '',
      tags: '',
    },
  });

  // Populate form with initial data for editing
  useEffect(() => {
    if (initialData) {
      reset({
        title: initialData.title,
        organization: initialData.organization,
        category: initialData.category,
        location: initialData.location,
        type: initialData.type,
        deadline: initialData.deadline,
        description: initialData.description,
        requirements: initialData.requirements.join(', '),
        applyLink: initialData.applyLink,
        tags: initialData.tags.join(', '),
      });
    }
  }, [initialData, reset]);

  const handleFormSubmit = (data: OpportunityFormValues) => {
    onSubmit(data);
  };

  const watchTitle = watch('title');
  const watchOrganization = watch('organization');

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
          Opportunity Title <span className="text-red-500">*</span>
        </label>
        <input
          {...register('title')}
          type="text"
          className={`w-full px-4 py-2 rounded-lg border ${
            errors.title ? 'border-red-500' : 'border-gray-200 dark:border-dark-border'
          } bg-white dark:bg-dark-card text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all`}
          placeholder="e.g., Frontend Developer Intern"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {errors.title.message}
          </p>
        )}
      </div>

      {/* Organization */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
          Organization <span className="text-red-500">*</span>
        </label>
        <input
          {...register('organization')}
          type="text"
          className={`w-full px-4 py-2 rounded-lg border ${
            errors.organization ? 'border-red-500' : 'border-gray-200 dark:border-dark-border'
          } bg-white dark:bg-dark-card text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all`}
          placeholder="e.g., Kabul Tech Community"
        />
        {errors.organization && (
          <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {errors.organization.message}
          </p>
        )}
      </div>

      {/* Category, Location, Type - Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            {...register('category')}
            className={`w-full px-4 py-2 rounded-lg border ${
              errors.category ? 'border-red-500' : 'border-gray-200 dark:border-dark-border'
            } bg-white dark:bg-dark-card text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all cursor-pointer`}
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          {errors.category && (
            <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.category.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            Location <span className="text-red-500">*</span>
          </label>
          <select
            {...register('location')}
            className={`w-full px-4 py-2 rounded-lg border ${
              errors.location ? 'border-red-500' : 'border-gray-200 dark:border-dark-border'
            } bg-white dark:bg-dark-card text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all cursor-pointer`}
          >
            <option value="">Select Location</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
          {errors.location && (
            <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.location.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            Type <span className="text-red-500">*</span>
          </label>
          <select
            {...register('type')}
            className={`w-full px-4 py-2 rounded-lg border ${
              errors.type ? 'border-red-500' : 'border-gray-200 dark:border-dark-border'
            } bg-white dark:bg-dark-card text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all cursor-pointer`}
          >
            <option value="">Select Type</option>
            {opportunityTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          {errors.type && (
            <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.type.message}
            </p>
          )}
        </div>
      </div>

      {/* Deadline */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
          Deadline <span className="text-red-500">*</span>
        </label>
        <input
          {...register('deadline')}
          type="date"
          className={`w-full px-4 py-2 rounded-lg border ${
            errors.deadline ? 'border-red-500' : 'border-gray-200 dark:border-dark-border'
          } bg-white dark:bg-dark-card text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all`}
        />
        {errors.deadline && (
          <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {errors.deadline.message}
          </p>
        )}
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
          Description <span className="text-red-500">*</span>
        </label>
        <textarea
          {...register('description')}
          rows={5}
          className={`w-full px-4 py-2 rounded-lg border ${
            errors.description ? 'border-red-500' : 'border-gray-200 dark:border-dark-border'
          } bg-white dark:bg-dark-card text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-y min-h-[100px]`}
          placeholder="Describe the opportunity in detail..."
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {errors.description.message}
          </p>
        )}
        <div className="mt-1 text-xs text-gray-500 dark:text-gray-400 text-right">
          {watchDescription?.length || 0}/2000 characters
        </div>
      </div>

      {/* Requirements */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
          Requirements <span className="text-red-500">*</span>
        </label>
        <textarea
          {...register('requirements')}
          rows={3}
          className={`w-full px-4 py-2 rounded-lg border ${
            errors.requirements ? 'border-red-500' : 'border-gray-200 dark:border-dark-border'
          } bg-white dark:bg-dark-card text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-y min-h-[80px]`}
          placeholder="e.g., Basic React, HTML/CSS, GitHub (separate with commas)"
        />
        {errors.requirements && (
          <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {errors.requirements.message}
          </p>
        )}
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          Separate multiple requirements with commas
        </p>
      </div>

      {/* Apply Link */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
          Apply Link <span className="text-red-500">*</span>
        </label>
        <input
          {...register('applyLink')}
          type="url"
          className={`w-full px-4 py-2 rounded-lg border ${
            errors.applyLink ? 'border-red-500' : 'border-gray-200 dark:border-dark-border'
          } bg-white dark:bg-dark-card text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all`}
          placeholder="https://example.com/apply"
        />
        {errors.applyLink && (
          <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {errors.applyLink.message}
          </p>
        )}
      </div>

      {/* Tags */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
          Tags
        </label>
        <input
          {...register('tags')}
          type="text"
          className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-card text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          placeholder="e.g., React, Next.js, Remote (separate with commas)"
        />
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          Separate tags with commas (optional)
        </p>
      </div>

      {/* Form Actions */}
      <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200 dark:border-dark-border">
        <Button
          type="submit"
          isLoading={isSubmitting}
          disabled={!isDirty || !isValid || isSubmitting}
          className="w-full sm:w-auto order-2 sm:order-1"
        >
          {isSubmitting ? 'Submitting...' : submitLabel}
        </Button>
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isSubmitting}
            className="w-full sm:w-auto order-1 sm:order-2"
          >
            {cancelLabel}
          </Button>
        )}
      </div>

      {/* Form Status */}
      {isDirty && isValid && (
        <div className="flex items-center gap-2 text-sm text-green-500">
          <CheckCircle className="w-4 h-4" />
          All fields are valid
        </div>
      )}
    </form>
  );
};

// Helper for description character count
const watchDescription = '';