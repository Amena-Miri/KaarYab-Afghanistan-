import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ==============================
// Date Helpers
// ==============================

export function formatDate(
  date: string | Date | null | undefined
): string {
  if (!date) {
    return "No date";
  }

  const d = new Date(date);

  if (isNaN(d.getTime())) {
    return "Invalid date";
  }

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(d);
}

export function formatDateShort(
  date: string | Date | null | undefined
): string {
  if (!date) {
    return "-";
  }

  const d = new Date(date);

  if (isNaN(d.getTime())) {
    return "-";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(d);
}

// ==============================
// Deadline Helpers
// ==============================

export function getDaysRemaining(
  deadline: string | Date | null | undefined
): number {
  if (!deadline) {
    return 0;
  }

  const now = new Date();
  const deadlineDate = new Date(deadline);

  if (isNaN(deadlineDate.getTime())) {
    return 0;
  }

  const diffTime = deadlineDate.getTime() - now.getTime();

  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

export function isExpiringSoon(
  deadline: string | Date | null | undefined
): boolean {
  const daysRemaining = getDaysRemaining(deadline);

  return daysRemaining <= 7 && daysRemaining >= 0;
}

export function isExpired(
  deadline: string | Date | null | undefined
): boolean {
  return getDaysRemaining(deadline) < 0;
}

export function getDeadlineStatus(
  deadline: string | Date | null | undefined
): {
  status: "active" | "expiring" | "expired";
  label: string;
  color: string;
} {
  const days = getDaysRemaining(deadline);

  if (!deadline) {
    return {
      status: "active",
      label: "No Deadline",
      color: "text-text-secondary",
    };
  }

  if (days < 0) {
    return {
      status: "expired",
      label: "Expired",
      color: "text-red-500 bg-red-500/10",
    };
  }

  if (days <= 7) {
    return {
      status: "expiring",
      label: `${days} Days Left`,
      color: "text-yellow-500 bg-yellow-500/10",
    };
  }

  return {
    status: "active",
    label: `${days} Days Left`,
    color: "text-primary bg-primary/10",
  };
}

// ==============================
// Text Helpers
// ==============================

export function truncateText(
  text: string | null |undefined,
  maxLength: number
): string {
  if (!text) {
    return "";
  }

  if (text.length <= maxLength) {
    return text;
  }

  return text.slice(0, maxLength) + "...";
}

export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

// ==============================
// Category Helpers
// ==============================

export function getCategoryColor(category: string): string {
  const primary =
    "bg-primary/10 text-primary border border-primary/20";

  const colors: Record<string, string> = {
    Job: primary,
    Internship: primary,
    Scholarship: primary,
    "Online Course": primary,
    "Remote Work": primary,
    "Training Program": primary,
    "Volunteer Work": primary,
  };

  return colors[category] || primary;
}

export function getCategoryIcon(category: string): string {
  const icons: Record<string, string> = {
    Job: "",
    Internship: "",
    Scholarship: "",
    "Online Course": "",
    "Remote Work": "",
    "Training Program": "",
    "Volunteer Work": "",
  };

  return icons[category] || "";
}

// ==============================
// Constants
// ==============================

export const categories = [
  "Job",
  "Internship",
  "Scholarship",
  "Online Course",
  "Remote Work",
  "Training Program",
  "Volunteer Work",
] as const;

export const opportunityTypes = [
  "Remote",
  "On-site",
  "Hybrid",
] as const;

export const locations = [
  "Kabul",
  "Herat",
  "Mazar-i-Sharif",
  "Kandahar",
  "Jalalabad",
  "Kunduz",
  "Online",
  "Other",
] as const;