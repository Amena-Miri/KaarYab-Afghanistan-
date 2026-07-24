export interface CVData {
  personal: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    title: string;
    summary: string;
  };
  experience: {
    id: string;
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    current: boolean;
  }[];
  education: {
    id: string;
    institution: string;
    degree: string;
    field: string;
    startDate: string;
    endDate: string;
    current: boolean;
  }[];
  skills: string[];
  languages?: { name: string; level: string }[];
  certifications?: { id: string; name: string; issuer: string; date: string; url?: string }[];
  projects?: { id: string; name: string; description: string; technologies: string[]; url?: string; startDate: string; endDate: string }[];
  template: string;
  createdAt: string;
  updatedAt: string;
}

export interface CVFormData {
  personal: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    title: string;
    summary: string;
  };
  experience: Omit<CVData['experience'][0], 'id'>[];
  education: Omit<CVData['education'][0], 'id'>[];
  skills: string[];
  languages?: { name: string; level: string }[];
certifications?: Omit<
    NonNullable<CVData['certifications']>[number],
    'id'
>[];
projects?: Omit<
    NonNullable<CVData['projects']>[number],
    'id'
>[];}