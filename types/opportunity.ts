export interface Opportunity {
  id: string;
  title: string;
  organization: string;
  category: 'Job' | 'Internship' | 'Scholarship' | 'Online Course' | 'Remote Work' | 'Training Program' | 'Volunteer Work';
  location: string;
  type: 'Remote' | 'On-site' | 'Hybrid';
  deadline: string; // ISO date string
  description: string;
  requirements: string[];
  applyLink: string;
  tags: string[];
  isFeatured?: boolean;
  isExpiringSoon?: boolean;
  createdAt: string; // ISO date string
  updatedAt?: string; // ISO date string
  views?: number;
  saves?: number;
}

export interface OpportunityFormData {
  title: string;
  organization: string;
  category: string;
  location: string;
  type: string;
  deadline: string;
  description: string;
  requirements: string;
  applyLink: string;
  tags: string;
}

export interface FilterOptions {
  search: string;
  category: string;
  location: string;
  type: string;
  deadline: string;
}