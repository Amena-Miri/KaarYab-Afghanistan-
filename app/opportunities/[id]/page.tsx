'use client';

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

import { useOpportunityContext } from "@/context/OpportunityContext";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { LoadingState } from "@/components/ui/LoadingState";
import { ConfirmModal } from "@/components/ui/Modal";

import {
  ArrowLeft, Bookmark, BookmarkCheck, MapPin, Calendar, Briefcase,
  Clock, ExternalLink, Share2, Eye, Heart, Building, Tag,
  FileText, ListChecks, Link as LinkIcon, AlertCircle, Edit, Trash2, Sparkles, CheckCircle
} from "lucide-react";

import {
  formatDateShort, getDaysRemaining, isExpired,
  getCategoryColor, getCategoryIcon, getDeadlineStatus, cn
} from "@/lib/utils";

const OpportunityDetailsPage = () => {
  const params = useParams();
  const router = useRouter();
  const { getOpportunityById, savedOpportunities, toggleSave, deleteOpportunity, opportunities } = useOpportunityContext();

  const [opportunity, setOpportunity] = useState(getOpportunityById(params.id as string));
  const [relatedOpportunities, setRelatedOpportunities] = useState<any[]>([]);
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // ===== LOAD OPPORTUNITY =====
  useEffect(() => {
    const loadOpportunity = async () => {
      setIsLoading(true);
      const opp = getOpportunityById(params.id as string);
      setOpportunity(opp);
      setIsLoading(false);
    };
    loadOpportunity();
  }, [params.id, getOpportunityById]);

  // ===== RELATED OPPORTUNITIES =====
  useEffect(() => {
    const opp = getOpportunityById(params.id as string);
    setOpportunity(opp);
    if (opp) {
      const related = opportunities
        .filter((item) =>
          item.id !== opp.id &&
          (item.category === opp.category || item.tags.some((tag) => opp.tags.includes(tag)))
        )
        .slice(0, 3);
      setRelatedOpportunities(related);
    }
  }, [params.id, getOpportunityById, opportunities]);

  // ===== LOADING =====
  if (isLoading) return <LoadingState text="Loading opportunity details..." fullScreen />;

  // ===== NOT FOUND =====
  if (!opportunity) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4">
        <Card className="max-w-md w-full text-center rounded-3xl p-8">
          <AlertCircle className="w-16 h-16 text-error mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-text-primary mb-2">Opportunity Not Found</h2>
          <p className="text-text-secondary mb-6">The opportunity you're looking for doesn't exist.</p>
          <Link href="/opportunities">
            <Button leftIcon={<ArrowLeft className="w-4 h-4" />}>Back to Opportunities</Button>
          </Link>
        </Card>
      </main>
    );
  }

  const isSaved = savedOpportunities.includes(opportunity.id);
  const expired = isExpired(opportunity.deadline);
  const categoryColor = getCategoryColor(opportunity.category);
  const deadlineStatus = getDeadlineStatus(opportunity.deadline);

  // ===== SHARE =====
  const handleShare = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  // ===== DELETE =====
  const handleDelete = () => setShowDeleteModal(true);
  const confirmDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteOpportunity(opportunity.id);
      router.push("/opportunities");
    } catch (error) {
      console.error("Error deleting:", error);
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
  };

  const fadeUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4 }
  };

  return (
    <main className="min-h-screen pt-20 lg:pt-24 pb-16">
      <div className="container-custom">
        {/* ===== HEADER ===== */}
        <motion.div {...fadeUp}>
          <Card className="mb-8 rounded-3xl border border-border bg-surface p-6 md:p-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                  <Briefcase className="h-7 w-7 text-primary" />
                </div>
                <div>
                  <Badge variant="primary" className="mb-2">Opportunity Details</Badge>
                  <h1 className="text-2xl md:text-3xl font-bold text-text-primary">{opportunity.title}</h1>
                  <div className="flex items-center gap-2 text-text-secondary mt-1">
                    <Building className="w-4 h-4" />
                    <span>{opportunity.organization}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => toggleSave(opportunity.id)}
                  className={cn(
                    "flex items-center justify-center rounded-xl border p-3 transition-all",
                    isSaved ? "border-primary bg-primary/10 text-primary" : "border-border hover:border-primary"
                  )}
                >
                  {isSaved ? <BookmarkCheck className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />}
                </button>
                <button
                  onClick={handleShare}
                  className="flex items-center justify-center rounded-xl border border-border p-3 hover:border-primary transition-all"
                >
                  <Share2 className="w-5 h-5" />
                </button>
                <Link href={`/edit-opportunity/${opportunity.id}`}>
                  <Button variant="outline" leftIcon={<Edit className="w-4 h-4" />}>Edit</Button>
                </Link>
              </div>
            </div>
            {copied && (
              <div className="mt-4 flex items-center gap-2 text-success text-sm">
                <CheckCircle className="w-4 h-4" /> Link copied successfully
              </div>
            )}
          </Card>
        </motion.div>

        {/* ===== MAIN GRID ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* ===== LEFT CONTENT ===== */}
          <div className="lg:col-span-2 space-y-6">
            {/* INFO BADGES */}
            <motion.div {...fadeUp}>
              <Card className="rounded-3xl border border-border bg-surface p-6">
                <div className="flex flex-wrap gap-3">
                  <Badge className={categoryColor}>{getCategoryIcon(opportunity.category)} {opportunity.category}</Badge>
                  <Badge variant="default"><Briefcase className="w-3 h-3 mr-1" />{opportunity.type}</Badge>
                  <Badge variant="default"><MapPin className="w-3 h-3 mr-1" />{opportunity.location}</Badge>
                  {opportunity.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="default"><Tag className="w-3 h-3 mr-1" />{tag}</Badge>
                  ))}
                </div>
                <div className={cn("mt-4 inline-flex items-center gap-2 rounded-xl px-4 py-2", deadlineStatus.color)}>
                  <Clock className="w-4 h-4" />
                  <span className="text-sm font-medium">{expired ? "Expired" : deadlineStatus.label}</span>
                </div>
              </Card>
            </motion.div>

            {/* DESCRIPTION */}
            <motion.div {...fadeUp} transition={{ delay: 0.1 }}>
              <Card className="rounded-3xl border border-border bg-surface p-6">
                <h2 className="flex items-center gap-2 text-xl font-bold text-text-primary mb-4">
                  <FileText className="w-5 h-5 text-primary" /> Description
                </h2>
                <p className="text-text-secondary leading-7 whitespace-pre-wrap">{opportunity.description}</p>
              </Card>
            </motion.div>

            {/* REQUIREMENTS */}
            <motion.div {...fadeUp} transition={{ delay: 0.2 }}>
              <Card className="rounded-3xl border border-border bg-surface p-6">
                <h2 className="flex items-center gap-2 text-xl font-bold text-text-primary mb-4">
                  <ListChecks className="w-5 h-5 text-primary" /> Requirements
                </h2>
                <ul className="space-y-2">
                  {opportunity.requirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-3 text-text-secondary">
                      <span className="mt-1 text-primary font-bold">•</span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>

            {/* APPLY SECTION */}
            <motion.div {...fadeUp} transition={{ delay: 0.3 }}>
              <Card className="rounded-3xl border border-primary/20 bg-primary/5 p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h3 className="flex items-center gap-2 text-xl font-bold text-text-primary">
                      <Sparkles className="w-5 h-5 text-primary" /> Ready to Apply?
                    </h3>
                    <p className="text-text-secondary">Take the next step towards your opportunity.</p>
                  </div>
                  {!expired ? (
                    <a href={opportunity.applyLink} target="_blank" rel="noopener noreferrer">
                      <Button size="lg" rightIcon={<ExternalLink className="w-4 h-4" />}>Apply Now</Button>
                    </a>
                  ) : (
                    <Button size="lg" disabled>Expired</Button>
                  )}
                </div>
              </Card>
            </motion.div>
          </div>

          {/* ===== SIDEBAR ===== */}
          <div className="space-y-6">
            {/* DETAIL CARD */}
            <motion.div {...fadeUp} transition={{ delay: 0.2 }}>
              <Card className="rounded-3xl border border-border bg-surface p-6">
                <h3 className="mb-5 text-lg font-bold text-text-primary">Opportunity Information</h3>
                <div className="space-y-4">
                  {[
                    { icon: Building, label: "Organization", value: opportunity.organization },
                    { icon: MapPin, label: "Location", value: opportunity.location },
                    {
                      icon: Calendar,
                      label: "Deadline",
                      value: (
                        <>
                          {formatDateShort(opportunity.deadline)}
                          {!expired && <p className="text-sm text-success">{getDaysRemaining(opportunity.deadline)} days remaining</p>}
                        </>
                      )
                    },
                    { icon: Eye, label: "Views", value: opportunity.views || 0 },
                    { icon: Heart, label: "Saves", value: opportunity.saves || 0 }
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-3">
                      <item.icon className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm text-text-secondary">{item.label}</p>
                        <p className="font-medium text-text-primary">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* ACTION BUTTONS */}
            <motion.div {...fadeUp} transition={{ delay: 0.3 }}>
              <Card className="rounded-3xl border border-border bg-surface p-6">
                <div className="space-y-3">
                  <a href={opportunity.applyLink} target="_blank" rel="noopener noreferrer">
                    <Button fullWidth rightIcon={<LinkIcon className="w-4 h-4" />} disabled={expired}>
                      {expired ? "Expired" : "Apply Now"}
                    </Button>
                  </a>
                  <div className="flex gap-3">
                    <Link href={`/edit-opportunity/${opportunity.id}`} className="flex-1">
                      <Button variant="outline" fullWidth leftIcon={<Edit className="w-4 h-4" />}>Edit</Button>
                    </Link>
                    <Button variant="danger" onClick={handleDelete} leftIcon={<Trash2 className="w-4 h-4" />}>Delete</Button>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* RELATED OPPORTUNITIES */}
            {relatedOpportunities.length > 0 && (
              <motion.div {...fadeUp} transition={{ delay: 0.4 }}>
                <Card className="rounded-3xl border border-border bg-surface p-6">
                  <h3 className="mb-4 text-lg font-bold text-text-primary">Similar Opportunities</h3>
                  <div className="space-y-3">
                    {relatedOpportunities.map((item) => (
                      <Link key={item.id} href={`/opportunities/${item.id}`} className="block group">
                        <div className="rounded-2xl border border-border p-4 transition-all hover:border-primary/30 hover:bg-primary/5">
                          <h4 className="font-semibold text-text-primary group-hover:text-primary transition-colors">{item.title}</h4>
                          <p className="mt-1 text-sm text-text-secondary">{item.organization}</p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            <Badge variant="default">{item.category}</Badge>
                            <Badge variant="default">{item.type}</Badge>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </Card>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* ===== DELETE MODAL ===== */}
      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
        title="Delete Opportunity"
        message={`Are you sure you want to delete "${opportunity.title}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
        isLoading={isDeleting}
      />
    </main>
  );
};

export default OpportunityDetailsPage;