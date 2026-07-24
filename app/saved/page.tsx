"use client";

import React from "react";
import Link from "next/link";
import { useOpportunityContext } from "@/context/OpportunityContext";
import { OpportunityCard } from "@/components/opportunity/OpportunityCard";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  Bookmark,
  BookmarkCheck,
  ArrowLeft,
  Plus,
  Clock,
  TrendingUp,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { EmptyState } from "@/components/ui/EmptyState";

const SavedOpportunitiesPage = () => {
  const { getSavedOpportunities } = useOpportunityContext();

  const savedOpps = getSavedOpportunities();

  const stats = [
    {
      label: "Total Saved",
      value: savedOpps.length,
      icon: BookmarkCheck,
      color: "primary",
    },
    {
      label: "Active",
      value: savedOpps.filter((o) => new Date(o.deadline) >= new Date()).length,
      icon: Clock,
      color: "green",
    },
    {
      label: "Expiring Soon",
      value: savedOpps.filter((o) => {
        const now = new Date();
        const sevenDays = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
        const deadline = new Date(o.deadline);

        return deadline >= now && deadline <= sevenDays;
      }).length,
      icon: TrendingUp,
      color: "orange",
    },
  ];

  return (
    <main className="min-h-screen pt-20 lg:pt-24 pb-16">
      <div className="container-custom">

        {/* HEADER */}
        <Card className="mb-10 p-8 bg-surface border border-border rounded-3xl">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">

            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-primary/10">
                <Bookmark className="w-7 h-7 text-primary" />
              </div>

              <div>
                <h1 className="text-4xl font-bold text-primary mb-2">
                  Saved Opportunities
                </h1>

                <p className="text-text-secondary text-lg">
                  {savedOpps.length} opportunity
                  {savedOpps.length !== 1 ? "ies" : ""} saved
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link href="/opportunities">
                <Button
                  variant="outline"
                  leftIcon={<ArrowLeft className="w-4 h-4" />}
                >
                  Browse All
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
        {savedOpps.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">

            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >

                <Card className="p-5 flex items-center gap-4 bg-surface border border-border rounded-2xl">

                  <div
                    className={cn("p-3 rounded-xl", {
                      "bg-primary/10 text-primary": stat.color === "primary",
                      "bg-green-500/10 text-green-500": stat.color === "green",
                      "bg-orange-500/10 text-orange-500":
                        stat.color === "orange",
                    })}
                  >
                    <stat.icon className="w-5 h-5" />
                  </div>

                  <div>
                    <p className="text-2xl font-bold text-text-primary">
                      {stat.value}
                    </p>

                    <p className="text-sm text-text-secondary">
                      {stat.label}
                    </p>
                  </div>

                </Card>

              </motion.div>
            ))}

          </div>
        )}
                {/* CONTENT */}

        <AnimatePresence mode="wait">
          {savedOpps.length > 0 ? (
            <motion.div
              key="saved"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                {savedOpps.map((opportunity, index) => (
                  <motion.div
                    key={opportunity.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <OpportunityCard opportunity={opportunity} />
                  </motion.div>
                ))}

              </div>


              <div className="mt-10 flex justify-center">

                <Badge
                  variant="primary"
                  className="text-sm px-4 py-2"
                >
                  <BookmarkCheck className="w-4 h-4 mr-2" />
                  {savedOpps.length} opportunities saved
                </Badge>

              </div>


            </motion.div>

          ) : (

            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <EmptyState
                icon={BookmarkCheck}
                title="No Saved Opportunities"
                description="Start saving opportunities you're interested in. They'll appear here for easy access and tracking."
                action={{
                  label: "Browse Opportunities",
                  onClick: () => {
                    window.location.href = "/opportunities";
                  },
                }}
              />
            </motion.div>
          )}

        </AnimatePresence>

      </div>

    </main>
  );
};

export default SavedOpportunitiesPage;