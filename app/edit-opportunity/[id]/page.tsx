"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

import { useOpportunityContext } from "@/context/OpportunityContext";

import { OpportunityForm } from "@/components/forms/OpportunityForm";

import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ConfirmModal } from "@/components/ui/Modal";

import {
  ArrowLeft,
  Edit,
  AlertCircle,
  CheckCircle,
  Sparkles,
  Trash2,
  Calendar,
  Building,
  MapPin,
  Briefcase,
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";

import { OpportunityFormValues } from "@/lib/validation";

import { Opportunity } from "@/types/opportunity";

import { formatDate, getDaysRemaining, isExpired } from "@/lib/utils";
import { LoadingState } from "@/components/ui/LoadingState";

const EditOpportunityPage = () => {
  const params = useParams();

  const router = useRouter();

  const { getOpportunityById, editOpportunity, deleteOpportunity } =
    useOpportunityContext();

  const [opportunity, setOpportunity] = useState<Opportunity | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const [errorMessage, setErrorMessage] = useState("");

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [isDeleting, setIsDeleting] = useState(false);

  // ================= FETCH DATA =================

  useEffect(() => {
    const id = params.id as string;

    const data = getOpportunityById(id);

    if (data) {
      setOpportunity(data);
    }

    setIsLoading(false);
  }, [params.id, getOpportunityById]);

  // ================= UPDATE =================

  const handleSubmit = async (data: OpportunityFormValues) => {
    if (!opportunity) return;

    setIsSubmitting(true);

    setSubmitStatus("idle");

    setErrorMessage("");

    try {
      const requirements = data.requirements
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);

      const tags = data.tags
        ? data.tags
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean)
        : [];

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

      setSubmitStatus("success");

      setTimeout(() => {
        router.push(`/opportunities/${opportunity.id}`);
      }, 2000);
    } catch {
      setSubmitStatus("error");

      setErrorMessage("Failed to update opportunity. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ================= DELETE =================

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!opportunity) return;

    setIsDeleting(true);

    try {
      await deleteOpportunity(opportunity.id);

      router.push("/opportunities");
    } finally {
      setIsDeleting(false);

      setShowDeleteModal(false);
    }
  };

  // ================= CANCEL =================

  const handleCancel = () => {
    if (opportunity) {
      router.push(`/opportunities/${opportunity.id}`);
    } else {
      router.push("/opportunities");
    }
  };

  // ================= ANIMATION =================

  const fadeUp = {
    initial: {
      opacity: 0,
      y: 20,
    },

    animate: {
      opacity: 1,
      y: 0,
    },

    transition: {
      duration: 0.4,
    },
  };

  // ================= LOADING =================

if (isLoading) {
  return (
    <LoadingState
      fullScreen
      text="Loading opportunity..."
    />
  );
}

  // ================= NOT FOUND =================

  if (!opportunity) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4">
        <Card className="max-w-md w-full text-center p-8">
          <AlertCircle className="w-16 h-16 text-error mx-auto mb-4" />

          <h2 className="text-2xl font-bold text-text-primary mb-2">
            Opportunity Not Found
          </h2>

          <p className="text-text-secondary mb-6">
            The opportunity you want to edit does not exist.
          </p>

          <Link href="/opportunities">
            <Button leftIcon={<ArrowLeft className="w-4 h-4" />}>
              Back to Opportunities
            </Button>
          </Link>
        </Card>
      </main>
    );
  }

  const expired = isExpired(opportunity.deadline);

  const daysRemaining = getDaysRemaining(opportunity.deadline);

  return (
    <main className="min-h-screen pt-20 lg:pt-24 pb-16">
      <div className="container-custom">
        {/* ================= HEADER ================= */}

        <Card className="mb-8 rounded-3xl border border-border bg-surface p-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Left */}

            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                <Edit className="h-8 w-8 text-primary" />
              </div>

              <div>
                <Badge variant="primary" className="mb-3">
                  Edit Opportunity
                </Badge>

                <h1 className="text-3xl md:text-4xl font-bold text-primary">
                  Update Opportunity
                </h1>

                <p className="mt-2 text-text-secondary max-w-2xl">
                  Update the information below to keep this opportunity accurate
                  and helpful for students and professionals.
                </p>
              </div>
            </div>

            {/* Right */}

            <div className="flex">
              <Link href={`/opportunities/${opportunity.id}`}>
                <Button
                  variant="outline"
                  leftIcon={<ArrowLeft className="w-4 h-4" />}
                >
                  Back to Details
                </Button>
              </Link>
            </div>
          </div>
        </Card>

        {/* ================= QUICK INFO ================= */}

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
          <Card className="rounded-2xl border border-border bg-surface p-5">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <Building className="h-6 w-6 text-primary" />
              </div>

              <div>
                <p className="text-xs uppercase tracking-wide text-text-secondary">
                  Organization
                </p>

                <p className="font-semibold text-text-primary">
                  {opportunity.organization}
                </p>
              </div>
            </div>
          </Card>

          <Card className="rounded-2xl border border-border bg-surface p-5">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <MapPin className="h-6 w-6 text-primary" />
              </div>

              <div>
                <p className="text-xs uppercase tracking-wide text-text-secondary">
                  Location
                </p>

                <p className="font-semibold text-text-primary">
                  {opportunity.location}
                </p>
              </div>
            </div>
          </Card>

          <Card className="rounded-2xl border border-border bg-surface p-5">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <Briefcase className="h-6 w-6 text-primary" />
              </div>

              <div>
                <p className="text-xs uppercase tracking-wide text-text-secondary">
                  Type
                </p>

                <p className="font-semibold text-text-primary">
                  {opportunity.type}
                </p>
              </div>
            </div>
          </Card>

          <Card className="rounded-2xl border border-border bg-surface p-5">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <Calendar className="h-6 w-6 text-primary" />
              </div>

              <div>
                <p className="text-xs uppercase tracking-wide text-text-secondary">
                  Deadline
                </p>

                <p className="font-semibold text-text-primary">
                  {formatDate(opportunity.deadline)}
                </p>

                {!expired ? (
                  <Badge variant="success" className="mt-2">
                    {daysRemaining} Days Left
                  </Badge>
                ) : (
                  <Badge variant="error" className="mt-2">
                    Expired
                  </Badge>
                )}
              </div>
            </div>
          </Card>
        </div>
        {/* ================= SUCCESS / ERROR ================= */}

        <AnimatePresence>
          {submitStatus === "success" && (
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="
              mb-6
              flex
              items-center
              gap-4
              rounded-2xl
              border
              border-success/20
              bg-success/10
              p-5
            "
            >
              <div
                className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              bg-success/10
            "
              >
                <CheckCircle className="h-5 w-5 text-success" />
              </div>

              <div>
                <p className="font-semibold text-success">
                  Opportunity Updated Successfully!
                </p>

                <p className="text-sm text-success/80">
                  Redirecting to opportunity details...
                </p>
              </div>
            </motion.div>
          )}

          {submitStatus === "error" && (
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="
              mb-6
              flex
              items-center
              gap-4
              rounded-2xl
              border
              border-error/20
              bg-error/10
              p-5
            "
            >
              <div
                className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              bg-error/10
            "
              >
                <AlertCircle className="h-5 w-5 text-error" />
              </div>

              <div>
                <p className="font-semibold text-error">Update Failed</p>

                <p className="text-sm text-error/80">
                  {errorMessage || "Please try again later."}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ================= FORM ================= */}

        <Card
          className="
        rounded-3xl
        border
        border-border
        bg-surface
        p-6
        sm:p-8
      "
        >
          <div className="mb-8">
            <Badge variant="primary" className="mb-3">
              Opportunity Details
            </Badge>

            <h2
              className="
            text-2xl
            font-bold
            text-text-primary
          "
            >
              Update Information
            </h2>

            <p
              className="
            mt-2
            text-text-secondary
          "
            >
              Modify the opportunity information and save your changes.
            </p>
          </div>

          <OpportunityForm
            initialData={opportunity}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isSubmitting={isSubmitting}
            submitLabel="Save Changes"
            cancelLabel="Cancel"
          />
        </Card>

        {/* ================= DANGER ZONE ================= */}

        <div
          className="
          mt-8
          rounded-3xl
          border
          border-error/20
          bg-error/5
          p-6
        "
        >
          <div
            className="
          flex
          flex-col
          sm:flex-row
          sm:items-center
          justify-between
          gap-5
        "
          >
            <div className="flex items-start gap-4">
              <div
                className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-2xl
              bg-error/10
            "
              >
                <AlertCircle className="h-6 w-6 text-error" />
              </div>

              <div>
                <h3
                  className="
                font-bold
                text-error
                text-lg
              "
                >
                  Danger Zone
                </h3>

                <p
                  className="
                mt-1
                text-sm
                text-text-secondary
                max-w-xl
              "
                >
                  Deleting this opportunity is permanent and cannot be undone.
                </p>
              </div>
            </div>

            <Button
              variant="danger"
              leftIcon={<Trash2 className="w-4 h-4" />}
              onClick={handleDelete}
              className="w-full sm:w-auto"
            >
              Delete Opportunity
            </Button>
          </div>
        </div>

        {/* ================= TIP ================= */}

        <div
          className="
          mt-6
          flex
          items-start
          gap-4
          rounded-3xl
          border
          border-primary/20
          bg-primary/5
          p-6
        "
        >
          <div
            className="
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-xl
          bg-primary/10
          flex-shrink-0
        "
          >
            <Sparkles className="h-5 w-5 text-primary" />
          </div>

          <div>
            <h4
              className="
            font-semibold
            text-text-primary
          "
            >
              Pro Tip
            </h4>

            <p
              className="
            mt-1
            text-sm
            text-text-secondary
            leading-6
          "
            >
              Make sure all details, deadline and application links are updated
              before saving changes.
            </p>
          </div>
        </div>
      </div>

      {/* ================= DELETE MODAL ================= */}

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

export default EditOpportunityPage;
