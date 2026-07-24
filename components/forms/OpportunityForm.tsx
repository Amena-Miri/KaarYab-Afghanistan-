'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { opportunitySchema, OpportunityFormValues } from '@/lib/validation';
import { categories, opportunityTypes, locations } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { Opportunity } from '@/types/opportunity';
import { cn } from '@/lib/utils';

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

  const watchDescription = watch('description');

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

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-text-secondary mb-1.5">
          Opportunity Title <span className="text-error">*</span>
        </label>
        <input
          {...register('title')}
          type="text"
          className={cn(
            'w-full px-4 py-2 rounded-lg border bg-input-bg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all',
            errors.title ? 'border-error' : 'border-input-border'
          )}
          placeholder="e.g., Frontend Developer Intern"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-error flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {errors.title.message}
          </p>
        )}
      </div>

      {/* Organization */}
      <div>
        <label className="block text-sm font-medium text-text-secondary mb-1.5">
          Organization <span className="text-error">*</span>
        </label>
        <input
          {...register('organization')}
          type="text"
          className={cn(
            'w-full px-4 py-2 rounded-lg border bg-input-bg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all',
            errors.organization ? 'border-error' : 'border-input-border'
          )}
          placeholder="e.g., Kabul Tech Community"
        />
        {errors.organization && (
          <p className="mt-1 text-sm text-error flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {errors.organization.message}
          </p>
        )}
      </div>

      {/* Category, Location, Type - Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-1.5">
            Category <span className="text-error">*</span>
          </label>
          <select
            {...register('category')}
            className={cn(
              'w-full px-4 py-2 rounded-lg border bg-input-bg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all cursor-pointer',
              errors.category ? 'border-error' : 'border-input-border'
            )}
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          {errors.category && (
            <p className="mt-1 text-sm text-error flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.category.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-text-secondary mb-1.5">
            Location <span className="text-error">*</span>
          </label>
          <select
            {...register('location')}
            className={cn(
              'w-full px-4 py-2 rounded-lg border bg-input-bg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all cursor-pointer',
              errors.location ? 'border-error' : 'border-input-border'
            )}
          >
            <option value="">Select Location</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
          {errors.location && (
            <p className="mt-1 text-sm text-error flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.location.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-text-secondary mb-1.5">
            Type <span className="text-error">*</span>
          </label>
          <select
            {...register('type')}
            className={cn(
              'w-full px-4 py-2 rounded-lg border bg-input-bg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all cursor-pointer',
              errors.type ? 'border-error' : 'border-input-border'
            )}
          >
            <option value="">Select Type</option>
            {opportunityTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          {errors.type && (
            <p className="mt-1 text-sm text-error flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.type.message}
            </p>
          )}
        </div>
      </div>

      {/* Deadline */}
      <div>
        <label className="block text-sm font-medium text-text-secondary mb-1.5">
          Deadline <span className="text-error">*</span>
        </label>
        <input
          {...register('deadline')}
          type="date"
          className={cn(
            'w-full px-4 py-2 rounded-lg border bg-input-bg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all',
            errors.deadline ? 'border-error' : 'border-input-border'
          )}
        />
        {errors.deadline && (
          <p className="mt-1 text-sm text-error flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {errors.deadline.message}
          </p>
        )}
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-text-secondary mb-1.5">
          Description <span className="text-error">*</span>
        </label>
        <textarea
          {...register('description')}
          rows={5}
          className={cn(
            'w-full px-4 py-2 rounded-lg border bg-input-bg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-y min-h-[100px]',
            errors.description ? 'border-error' : 'border-input-border'
          )}
          placeholder="Describe the opportunity in detail..."
        />
        {errors.description && (
          <p className="mt-1 text-sm text-error flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {errors.description.message}
          </p>
        )}
        <div className="mt-1 text-xs text-text-secondary text-right">
          {watchDescription?.length || 0}/2000 characters
        </div>
      </div>

      {/* Requirements */}
      <div>
        <label className="block text-sm font-medium text-text-secondary mb-1.5">
          Requirements <span className="text-error">*</span>
        </label>
        <textarea
          {...register('requirements')}
          rows={3}
          className={cn(
            'w-full px-4 py-2 rounded-lg border bg-input-bg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-y min-h-[80px]',
            errors.requirements ? 'border-error' : 'border-input-border'
          )}
          placeholder="e.g., Basic React, HTML/CSS, GitHub (separate with commas)"
        />
        {errors.requirements && (
          <p className="mt-1 text-sm text-error flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {errors.requirements.message}
          </p>
        )}
        <p className="mt-1 text-xs text-text-secondary">
          Separate multiple requirements with commas
        </p>
      </div>

      {/* Apply Link */}
      <div>
        <label className="block text-sm font-medium text-text-secondary mb-1.5">
          Apply Link <span className="text-error">*</span>
        </label>
        <input
          {...register('applyLink')}
          type="url"
          className={cn(
            'w-full px-4 py-2 rounded-lg border bg-input-bg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all',
            errors.applyLink ? 'border-error' : 'border-input-border'
          )}
          placeholder="https://example.com/apply"
        />
        {errors.applyLink && (
          <p className="mt-1 text-sm text-error flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {errors.applyLink.message}
          </p>
        )}
      </div>

      {/* Tags */}
      <div>
        <label className="block text-sm font-medium text-text-secondary mb-1.5">
          Tags
        </label>
        <input
          {...register('tags')}
          type="text"
          className="w-full px-4 py-2 rounded-lg border border-input-border bg-input-bg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          placeholder="e.g., React, Next.js, Remote (separate with commas)"
        />
        <p className="mt-1 text-xs text-text-secondary">
          Separate tags with commas (optional)
        </p>
      </div>

      {/* Form Actions */}
      <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
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
        <div className="flex items-center gap-2 text-sm text-success">
          <CheckCircle className="w-4 h-4" />
          All fields are valid
        </div>
      )}
    </form>
  );
};