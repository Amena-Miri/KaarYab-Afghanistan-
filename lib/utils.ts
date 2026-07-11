
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date): string {
  const d = new Date(date);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(d);
}

export function getDaysRemaining(deadline: string): number {
  const now = new Date();
  const deadlineDate = new Date(deadline);
  const diffTime = deadlineDate.getTime() - now.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

export function isExpiringSoon(deadline: string): boolean {
  const daysRemaining = getDaysRemaining(deadline);
  return daysRemaining <= 7 && daysRemaining >= 0;
}

export function isExpired(deadline: string): boolean {
  return getDaysRemaining(deadline) < 0;
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export const categories = [
  'Job',
  'Internship',
  'Scholarship',
  'Online Course',
  'Remote Work',
  'Training Program',
  'Volunteer Work',
] as const;

export const opportunityTypes = ['Remote', 'On-site', 'Hybrid'] as const;

export const locations = [
  'Kabul',
  'Herat',
  'Mazar-i-Sharif',
  'Kandahar',
  'Jalalabad',
  'Kunduz',
  'Online',
  'Other',
] as const;