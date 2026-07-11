import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';


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
    return 'تاریخ مشخص نیست';
  }


  const d = new Date(date);


  if (isNaN(d.getTime())) {
    return 'تاریخ نامعتبر';
  }


  return new Intl.DateTimeFormat('fa-IR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(d);

}



export function formatDateShort(
  date: string | Date | null | undefined
): string {

  if (!date) {
    return '-';
  }


  const d = new Date(date);


  if (isNaN(d.getTime())) {
    return '-';
  }


  return new Intl.DateTimeFormat('fa-IR', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
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



  const diffTime =
    deadlineDate.getTime() - now.getTime();


  return Math.ceil(
    diffTime / (1000 * 60 * 60 * 24)
  );

}




export function isExpiringSoon(
  deadline: string | Date | null | undefined
): boolean {


  const daysRemaining =
    getDaysRemaining(deadline);


  return (
    daysRemaining <= 7 &&
    daysRemaining >= 0
  );

}





export function isExpired(
  deadline: string | Date | null | undefined
): boolean {


  return getDaysRemaining(deadline) < 0;

}




export function getDeadlineStatus(
  deadline: string | Date | null | undefined
): {
  status: 'active' | 'expiring' | 'expired';
  label: string;
  color: string;
} {


  const days =
    getDaysRemaining(deadline);



  if (!deadline) {

    return {
      status: 'active',
      label: 'No deadline',
      color: 'text-gray-400',
    };

  }



  if (days < 0) {

    return {
      status: 'expired',
      label: 'Expired',
      color:
        'text-red-500 bg-red-50 dark:bg-red-900/20',
    };

  }



  if (days <= 7) {

    return {
      status: 'expiring',
      label: `${days} days left`,
      color:
        'text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20',
    };

  }



  return {

    status: 'active',

    label: `${days} days left`,

    color:
      'text-green-500 bg-green-50 dark:bg-green-900/20',

  };

}




// ==============================
// Text Helpers
// ==============================


export function truncateText(
  text: string | null | undefined,
  maxLength: number
): string {


  if (!text) {
    return '';
  }


  if (text.length <= maxLength) {
    return text;
  }


  return text.slice(0, maxLength) + '...';

}





export function generateId(): string {

  return (
    Math.random()
      .toString(36)
      .substring(2) +
    Date.now().toString(36)
  );

}




// ==============================
// Category Helpers
// ==============================


export function getCategoryColor(
  category: string
): string {


  const colors: Record<string, string> = {


    'Job':
      'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',


    'Internship':
      'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400',


    'Scholarship':
      'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',


    'Online Course':
      'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400',


    'Remote Work':
      'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400',


    'Training Program':
      'bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-400',


    'Volunteer Work':
      'bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400',

  };


  return (
    colors[category] ||
    'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-400'
  );

}





export function getCategoryIcon(
  category: string
): string {


  const icons: Record<string, string> = {


    'Job': '💼',

    'Internship': '🎓',

    'Scholarship': '📚',

    'Online Course': '💻',

    'Remote Work': '🌍',

    'Training Program': '📝',

    'Volunteer Work': '🤝',

  };


  return icons[category] || '📌';

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



export const opportunityTypes = [

  'Remote',

  'On-site',

  'Hybrid',

] as const;



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