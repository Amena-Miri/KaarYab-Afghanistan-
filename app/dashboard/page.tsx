'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useOpportunityContext } from '@/context/OpportunityContext';
import { DashboardCard } from '@/components/dashboard/DashboardCard';
import { RecentOpportunitiesTable } from '@/components/dashboard/RecentOpportunitiesTable';
import { CategoryChart } from '@/components/dashboard/CategoryChart';
import { Button } from '@/components/ui/Button';
import { LoadingState } from '@/components/ui/LoadingState';
import { EmptyState } from '@/components/ui/EmptyState';
import { 
  Briefcase, 
  GraduationCap, 
  Award, 
  Globe, 
  TrendingUp,
  Clock,
  Users,
  Plus,
  AlertCircle
} from 'lucide-react';
import { categories, getCategoryColor } from '@/lib/utils';
import { motion } from 'framer-motion';

const DashboardPage: React.FC = () => {
  const { opportunities, deleteOpportunity } = useOpportunityContext();
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    jobs: 0,
    scholarships: 0,
    internships: 0,
    remote: 0,
    expiringSoon: 0,
    active: 0,
  });

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      calculateStats();
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [opportunities]);

  const calculateStats = () => {
    const now = new Date();
    const sevenDaysFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

    setStats({
      total: opportunities.length,
      jobs: opportunities.filter(o => o.category === 'Job').length,
      scholarships: opportunities.filter(o => o.category === 'Scholarship').length,
      internships: opportunities.filter(o => o.category === 'Internship').length,
      remote: opportunities.filter(o => o.type === 'Remote').length,
      expiringSoon: opportunities.filter(o => {
        const deadline = new Date(o.deadline);
        return deadline >= now && deadline <= sevenDaysFromNow;
      }).length,
      active: opportunities.filter(o => new Date(o.deadline) >= now).length,
    });
  };

  // Category data for charts
  const categoryData = categories.map(category => ({
    name: category,
    value: opportunities.filter(o => o.category === category).length,
    color: getCategoryColor(category).replace(/ .*$/, '').replace('bg-', '#').replace(' dark:bg-', '').replace('/30', ''),
  })).filter(d => d.value > 0);

  // Monthly trend data (mock data for demo)
  const monthlyData = [
    { name: 'Jan', value: 5 },
    { name: 'Feb', value: 8 },
    { name: 'Mar', value: 12 },
    { name: 'Apr', value: 10 },
    { name: 'May', value: 15 },
    { name: 'Jun', value: 20 },
  ];

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this opportunity?')) {
      deleteOpportunity(id);
    }
  };

  if (isLoading) {
    return <LoadingState text="Loading dashboard..." fullScreen />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Overview of your opportunities and statistics
            </p>
          </div>
          <Link href="/add-opportunity">
            <Button leftIcon={<Plus className="w-4 h-4" />}>
              Add Opportunity
            </Button>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <DashboardCard
            title="Total Opportunities"
            value={stats.total}
            icon={<Briefcase className="w-6 h-6" />}
            color="primary"
            trend={stats.total > 0 ? { value: 10, label: 'vs last month', direction: 'up' } : undefined}
          />
          <DashboardCard
            title="Active Opportunities"
            value={stats.active}
            icon={<TrendingUp className="w-6 h-6" />}
            color="green"
          />
          <DashboardCard
            title="Remote Opportunities"
            value={stats.remote}
            icon={<Globe className="w-6 h-6" />}
            color="blue"
          />
          <DashboardCard
            title="Expiring Soon"
            value={stats.expiringSoon}
            icon={<Clock className="w-6 h-6" />}
            color="orange"
            subtitle={stats.expiringSoon > 0 ? 'Need attention' : 'All good!'}
          />
        </div>

        {/* Second Row - More Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <DashboardCard
            title="Jobs"
            value={stats.jobs}
            icon={<Briefcase className="w-6 h-6" />}
            color="blue"
          />
          <DashboardCard
            title="Scholarships"
            value={stats.scholarships}
            icon={<Award className="w-6 h-6" />}
            color="purple"
          />
          <DashboardCard
            title="Internships"
            value={stats.internships}
            icon={<GraduationCap className="w-6 h-6" />}
            color="green"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {categoryData.length > 0 ? (
            <CategoryChart
              data={categoryData}
              title="Opportunities by Category"
              type="pie"
            />
          ) : (
            <div className="bg-white dark:bg-dark-card rounded-xl border border-gray-200 dark:border-dark-border p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Opportunities by Category
              </h3>
              <div className="h-[300px] flex items-center justify-center">
                <p className="text-gray-500 dark:text-gray-400">No data to display</p>
              </div>
            </div>
          )}

          <CategoryChart
            data={monthlyData}
            title="Monthly Growth Trend"
            type="line"
          />
        </div>

        {/* Recent Opportunities Table */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Recent Submissions
            </h2>
            <Link href="/opportunities">
              <Button variant="outline" size="sm">
                View All
              </Button>
            </Link>
          </div>
          <RecentOpportunitiesTable
            opportunities={opportunities.slice(0, 10)}
            onDelete={handleDelete}
          />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link href="/add-opportunity">
            <div className="bg-white dark:bg-dark-card p-4 rounded-xl border border-gray-200 dark:border-dark-border hover:border-primary transition-all cursor-pointer text-center">
              <Plus className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="font-medium text-gray-900 dark:text-white">Add Opportunity</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Share a new opportunity</p>
            </div>
          </Link>
          <Link href="/opportunities">
            <div className="bg-white dark:bg-dark-card p-4 rounded-xl border border-gray-200 dark:border-dark-border hover:border-primary transition-all cursor-pointer text-center">
              <Briefcase className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="font-medium text-gray-900 dark:text-white">Browse All</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">View all opportunities</p>
            </div>
          </Link>
          <Link href="/saved">
            <div className="bg-white dark:bg-dark-card p-4 rounded-xl border border-gray-200 dark:border-dark-border hover:border-primary transition-all cursor-pointer text-center">
              <Users className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="font-medium text-gray-900 dark:text-white">Saved</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">View saved opportunities</p>
            </div>
          </Link>
          <Link href="/about">
            <div className="bg-white dark:bg-dark-card p-4 rounded-xl border border-gray-200 dark:border-dark-border hover:border-primary transition-all cursor-pointer text-center">
              <TrendingUp className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="font-medium text-gray-900 dark:text-white">Analytics</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">View platform insights</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;