"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useOpportunityContext } from "@/context/OpportunityContext";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { RecentOpportunitiesTable } from "@/components/dashboard/RecentOpportunitiesTable";
import { CategoryChart } from "@/components/dashboard/CategoryChart";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

import {
  Briefcase,
  Globe,
  Clock,
  Plus,
  ChevronRight,
  Sparkles,
  BarChart3,
  GraduationCap,
  Award,
} from "lucide-react";

import { categories } from "@/lib/utils";
import { EmptyState } from "@/components/ui/EmptyState";
import { LoadingState } from "@/components/ui/LoadingState";

const DashboardPage = () => {
  const { opportunities, deleteOpportunity } = useOpportunityContext();

  const [isLoading, setIsLoading] = useState(true);

  const [stats, setStats] = useState({
  total: 0,
  jobs: 0,
  internships: 0,
  scholarships: 0,
  remote: 0,
  expiringSoon: 0,
  totalViews: 0,
});

  useEffect(() => {
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

    jobs: opportunities.filter(
      (o) => o.category === "Job"
    ).length,

    internships: opportunities.filter(
      (o) => o.category === "Internship"
    ).length,

    scholarships: opportunities.filter(
      (o) => o.category === "Scholarship"
    ).length,

    remote: opportunities.filter(
      (o) => o.type === "Remote"
    ).length,

    expiringSoon: opportunities.filter((o) => {
      const deadline = new Date(o.deadline);
      return deadline >= now && deadline <= sevenDaysFromNow;
    }).length,

    totalViews: opportunities.reduce(
      (sum, o) => sum + (o.views || 0),
      0
    ),
  });
  };

  const categoryData = categories

    .map((category) => ({
      name: category,

      value: opportunities.filter((o) => o.category === category).length,

      color: "var(--primary)",
    }))

    .filter((item) => item.value > 0);

  const monthlyData = [
    { name: "Jan", value: 5 },

    { name: "Feb", value: 8 },

    { name: "Mar", value: 12 },

    { name: "Apr", value: 10 },

    { name: "May", value: 15 },

    { name: "Jun", value: 20 },
  ];

  if (isLoading) {
  return (
    <LoadingState
      text="Loading Dashboard..."
      fullScreen
    />
  );
}

const recentOpportunities = [...opportunities]
  .sort(
    (a, b) =>
      new Date(b.createdAt).getTime() -
      new Date(a.createdAt).getTime()
  )
  .slice(0, 10);

  return (
    <main className="min-h-screen pt-20 lg:pt-24 pb-16">

      <div className="container-custom">
        {/* HEADER */}
        <Card className="mb-10 p-8 bg-surface border border-border rounded-3xl">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-primary/10">
                <BarChart3 className="w-7 h-7 text-primary" />
              </div>

              <div>
                <h1 className="text-4xl font-bold text-primary mb-2">
                  Dashboard
                </h1>

                <p className="text-text-secondary text-lg">
                  Monitor platform statistics, opportunities and recent
                  activity.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link href="/opportunities">
                <Button
                  variant="outline"
                  leftIcon={<Briefcase className="w-4 h-4" />}
                >
                  View Opportunities
                </Button>
              </Link>

              <Link href="/add-opportunity">
                <Button leftIcon={<Plus className="w-4 h-4" />}>
                  Add Opportunity
                </Button>
              </Link>
            </div>
          </div>
        </Card>
        {/* STATS */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

          <DashboardCard
            title="Total Opportunities"
            value={stats.total}
            icon={<Briefcase className="w-5 h-5" />}
            subtitle="All opportunities"
          />

          <DashboardCard
            title="Total Jobs"
            value={stats.jobs}
            icon={<Briefcase className="w-5 h-5" />}
            subtitle="Available jobs"
          />

          <DashboardCard
            title="Total Scholarships"
            value={stats.scholarships}
            icon={<Award className="w-5 h-5" />}
            subtitle="Scholarship opportunities"
          />

          <DashboardCard
            title="Total Internships"
            value={stats.internships}
            icon={<GraduationCap className="w-5 h-5" />}
            subtitle="Internship opportunities"
          />

          <DashboardCard
            title="Remote Opportunities"
            value={stats.remote}
            icon={<Globe className="w-5 h-5" />}
            subtitle="Remote jobs"
          />

          <DashboardCard
            title="Expiring Soon"
            value={stats.expiringSoon}
            icon={<Clock className="w-5 h-5" />}
            subtitle="Need attention"
          />
        </div>
        {/* CHARTS SECTION */}

        <div
          className=" grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {categoryData.length > 0 ? (
            <CategoryChart
              data={categoryData}
              title="Opportunities by Category"
              type="pie"
            />
          ) : (
            <EmptyState
              icon={BarChart3}
              title="No Category Data"
              description="Category statistics will appear after adding opportunities."
            />
          )}
          <CategoryChart
            data={monthlyData}
            title="Monthly Growth Trend"
            type="line"
          />
        </div>

        {/* RECENT OPPORTUNITIES */}

        <div className="mb-8">
          <div className="flex flex-wrap justify-between items-center gap-4 mb-4">

            <div>
              <h2 className="text-xl font-semibold text-text-primary">
                Recent Opportunities
              </h2>

              <p className="text-sm text-text-secondary">
                Latest added opportunities
              </p>
            </div>

            <Link href="/opportunities">
              <Button
                variant="outline"
                rightIcon={<ChevronRight className="w-4 h-4" />}
              >
                View All
              </Button>
            </Link>
          </div>

          <RecentOpportunitiesTable
            opportunities={recentOpportunities}
            onDelete={deleteOpportunity}
          />
        </div>

        {/* INSIGHTS */}

        <div className="p-5 bg-primary/5 border border-primary/20 rounded-2xl">
          <div className="flex items-start gap-3">

            <Sparkles className="w-5 h-5 text-primary mt-1"/>

            <div>
              <h3 className="font-semibold text-text-primary">
                Platform Insights
              </h3>

              <p className="text-sm text-text-secondary mt-1">
                Total {stats.total} opportunities
                {" • "}
                {stats.totalViews} views
              </p>

              <div className="flex flex-wrap gap-2  mt-3 ">
                <Badge variant="warning">Expiring: {stats.expiringSoon}</Badge>
                <Badge variant="default">Jobs: {stats.jobs}</Badge>
                <Badge variant="warning">Scholarships: {stats.scholarships}</Badge>
                <Badge variant="success">Internships: {stats.internships}</Badge>
                <Badge variant="success">Remote: {stats.remote}</Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DashboardPage;