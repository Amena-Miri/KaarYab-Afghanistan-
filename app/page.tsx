'use client';

import React from 'react';
import Link from 'next/link';
import { useOpportunityContext } from '@/context/OpportunityContext';
import { OpportunityCard } from '@/components/opportunity/OpportunityCard';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { 
  Search, 
  Briefcase, 
  GraduationCap, 
  Globe, 
  BookOpen, 
  Users, 
  ArrowRight,
  TrendingUp,
  Award,
  Sparkles
} from 'lucide-react';
import { motion } from 'framer-motion';

const HomePage: React.FC = () => {
  const { opportunities } = useOpportunityContext();
  const featuredOpportunities = opportunities.filter(opp => opp.isFeatured).slice(0, 3);

  const stats = [
    { label: 'Total Opportunities', value: opportunities.length, icon: Briefcase },
    { label: 'Jobs Available', value: opportunities.filter(o => o.category === 'Job').length, icon: TrendingUp },
    { label: 'Scholarships', value: opportunities.filter(o => o.category === 'Scholarship').length, icon: Award },
    { label: 'Remote Work', value: opportunities.filter(o => o.type === 'Remote').length, icon: Globe },
  ];

  const categories = [
    { name: 'Jobs', icon: Briefcase, count: opportunities.filter(o => o.category === 'Job').length },
    { name: 'Internships', icon: GraduationCap, count: opportunities.filter(o => o.category === 'Internship').length },
    { name: 'Scholarships', icon: Award, count: opportunities.filter(o => o.category === 'Scholarship').length },
    { name: 'Remote Work', icon: Globe, count: opportunities.filter(o => o.category === 'Remote Work').length },
    { name: 'Courses', icon: BookOpen, count: opportunities.filter(o => o.category === 'Online Course').length },
    { name: 'Volunteer', icon: Users, count: opportunities.filter(o => o.category === 'Volunteer Work').length },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                Empowering Afghan Youth
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                Discover Your Next{' '}
                <span className="text-primary">Opportunity</span>
              </h1>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-lg">
                Find jobs, internships, scholarships, online courses, and more. 
                Your future starts here.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/opportunities">
                  <Button size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
                    Browse Opportunities
                  </Button>
                </Link>
                <Link href="/add-opportunity">
                  <Button size="lg" variant="outline">
                    Add Opportunity
                  </Button>
                </Link>
              </div>

              {/* Quick Search */}
              <div className="mt-8 bg-white dark:bg-dark-card rounded-lg shadow-lg p-4 flex items-center gap-3 max-w-xl">
                <Search className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search opportunities..."
                  className="flex-1 bg-transparent outline-none text-gray-900 dark:text-white"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      window.location.href = `/opportunities?search=${e.currentTarget.value}`;
                    }
                  }}
                />
                <Button size="sm">Search</Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl"></div>
                <div className="relative grid grid-cols-2 gap-4">
                  {featuredOpportunities.map((opp, index) => (
                    <Card key={opp.id} className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Briefcase className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold text-sm text-gray-900 dark:text-white">
                            {opp.title}
                          </p>
                          <p className="text-xs text-gray-500">{opp.organization}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-white dark:bg-black border-y border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="flex justify-center mb-2">
                  <stat.icon className="w-8 h-8 text-primary" />
                </div>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Explore Opportunities by Category
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Find the perfect opportunity based on your interests and goals
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link href={`/opportunities?category=${category.name}`}>
                  <Card hover className="text-center p-6">
                    <category.icon className="w-10 h-10 text-primary mx-auto mb-3" />
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-500">{category.count} opportunities</p>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Opportunities */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Featured Opportunities
              </h2>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Handpicked opportunities for you
              </p>
            </div>
            <Link href="/opportunities">
              <Button variant="outline" rightIcon={<ArrowRight className="w-4 h-4" />}>
                View All
              </Button>
            </Link>
          </div>

          {featuredOpportunities.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredOpportunities.map((opportunity) => (
                <OpportunityCard key={opportunity.id} opportunity={opportunity} featured />
              ))}
            </div>
          ) : (
            <Card className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">
                No featured opportunities available at the moment.
              </p>
            </Card>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-primary text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Find Your Next Opportunity?
          </h2>
          <p className="text-lg text-primary-light max-w-2xl mx-auto mb-8">
            Join thousands of Afghan youth who are discovering new opportunities every day.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/opportunities">
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                Start Searching
              </Button>
            </Link>
            <Link href="/add-opportunity">
              <Button className="bg-white text-primary hover:bg-gray-100">
                Share an Opportunity
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;