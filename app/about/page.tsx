import React from 'react';
import { Card } from '@/components/ui/Card';
import { 
  Target, 
  Users, 
  Lightbulb, 
  Heart, 
  Globe, 
  Award,
  BookOpen,
  Briefcase,
  GraduationCap,
  Sparkles
} from 'lucide-react';

const AboutPage: React.FC = () => {
  const values = [
    {
      icon: Target,
      title: 'Our Mission',
      description: 'To empower Afghan youth by providing easy access to opportunities that can shape their future and contribute to the development of Afghanistan.'
    },
    {
      icon: Lightbulb,
      title: 'Our Vision',
      description: 'A connected Afghanistan where every young person has access to opportunities that match their skills, interests, and potential.'
    },
    {
      icon: Heart,
      title: 'Our Values',
      description: 'We believe in transparency, accessibility, and equal opportunities for all, regardless of gender, ethnicity, or background.'
    },
  ];

  const impactStats = [
    { label: 'Opportunities Listed', value: '50+', icon: Briefcase },
    { label: 'Categories Available', value: '7', icon: BookOpen },
    { label: 'Target Users', value: 'Youth & Students', icon: GraduationCap },
    { label: 'Platform Type', value: 'Free Access', icon: Award },
  ];

  const steps = [
    {
      step: '01',
      title: 'Browse Opportunities',
      description: 'Explore hundreds of opportunities across various categories and locations.',
      icon: Globe,
    },
    {
      step: '02',
      title: 'Find Your Match',
      description: 'Use our advanced filters to find opportunities that match your interests.',
      icon: Sparkles,
    },
    {
      step: '03',
      title: 'Save & Apply',
      description: 'Save your favorite opportunities and apply directly through our platform.',
      icon: Heart,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 to-gray-800 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-primary/20 text-primary-light px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Users className="w-4 h-4" />
            About KaarYab
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            Empowering Afghan Youth Through Opportunities
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            We believe that every young person in Afghanistan deserves access to opportunities 
            that can help them build a better future.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="text-center p-6">
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {value.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-white dark:bg-dark-card">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Our Impact
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {impactStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-3">
                  <stat.icon className="w-8 h-8 text-primary" />
                </div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            How KaarYab Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div key={step.step} className="relative">
                <div className="text-5xl font-bold text-primary/10 absolute -top-4 left-0">
                  {step.step}
                </div>
                <Card className="relative pt-12">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <step.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {step.description}
                  </p>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Built for Afghanistan
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            KaarYab is created with the goal of making opportunity discovery accessible 
            to every young person in Afghanistan. We are committed to building a platform 
            that truly serves the needs of our community.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <div className="bg-white dark:bg-dark-card px-6 py-3 rounded-lg shadow-sm">
              <p className="text-sm text-gray-600 dark:text-gray-400">Made with ❤️ in Afghanistan</p>
            </div>
            <div className="bg-white dark:bg-dark-card px-6 py-3 rounded-lg shadow-sm">
              <p className="text-sm text-gray-600 dark:text-gray-400">Open to all youth</p>
            </div>
            <div className="bg-white dark:bg-dark-card px-6 py-3 rounded-lg shadow-sm">
              <p className="text-sm text-gray-600 dark:text-gray-400">Free to use</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;