import { Opportunity } from '@/types/opportunity';

export const initialOpportunities: Opportunity[] = [
  {
    id: '1',
    title: 'Frontend Developer Intern',
    organization: 'Kabul Tech Community',
    category: 'Internship',
    location: 'Kabul',
    type: 'Remote',
    deadline: '2026-07-20',
    description: 'A beginner-friendly internship for students who know React and Next.js. You will work on real-world projects and get mentorship from experienced developers.',
    requirements: ['Basic React', 'HTML/CSS', 'GitHub', 'JavaScript'],
    applyLink: 'https://example.com/apply/frontend-intern',
    tags: ['React', 'Next.js', 'Internship', 'Remote'],
    isFeatured: true,
    createdAt: '2026-06-15T00:00:00.000Z',
    views: 156,
    saves: 23
  },
  {
    id: '2',
    title: 'Women in Tech Scholarship',
    organization: 'Global Learning Foundation',
    category: 'Scholarship',
    location: 'Online',
    type: 'Remote',
    deadline: '2026-08-10',
    description: 'A scholarship opportunity for women who want to study technology online. Covers full tuition for selected candidates.',
    requirements: ['Basic English', 'Motivation letter', 'Internet access', 'High school diploma'],
    applyLink: 'https://example.com/apply/scholarship',
    tags: ['Scholarship', 'Women', 'Online', 'Education'],
    isFeatured: true,
    createdAt: '2026-06-10T00:00:00.000Z',
    views: 89,
    saves: 45
  },
  {
    id: '3',
    title: 'Junior Web Developer',
    organization: 'Herat IT Solutions',
    category: 'Job',
    location: 'Herat',
    type: 'On-site',
    deadline: '2026-07-15',
    description: 'Looking for a junior web developer with knowledge of HTML, CSS, and JavaScript. Must be willing to learn and grow with the team.',
    requirements: ['HTML/CSS', 'JavaScript', 'Team player', 'Problem-solving skills'],
    applyLink: 'https://example.com/apply/junior-dev',
    tags: ['Web Development', 'Job', 'Herat'],
    createdAt: '2026-06-05T00:00:00.000Z',
    views: 201,
    saves: 34
  },
  {
    id: '4',
    title: 'Digital Skills Training Program',
    organization: 'UNICEF Afghanistan',
    category: 'Training Program',
    location: 'Kabul',
    type: 'Hybrid',
    deadline: '2026-07-30',
    description: 'Free digital skills training program for youth in Afghanistan. Covers digital marketing, content creation, and basic coding.',
    requirements: ['Age 18-25', 'Basic English', 'Access to internet', 'Commitment to complete program'],
    applyLink: 'https://example.com/apply/training',
    tags: ['Training', 'Digital Skills', 'Youth', 'Free'],
    isFeatured: true,
    createdAt: '2026-06-01T00:00:00.000Z',
    views: 312,
    saves: 67
  },
  {
    id: '5',
    title: 'Remote Content Writer',
    organization: 'Afghanistan Media Center',
    category: 'Remote Work',
    location: 'Online',
    type: 'Remote',
    deadline: '2026-07-25',
    description: 'Write articles and blog posts about technology, education, and current events in Afghanistan. Flexible hours and competitive pay.',
    requirements: ['Excellent English', 'Writing skills', 'Research skills', 'Basic SEO knowledge'],
    applyLink: 'https://example.com/apply/writer',
    tags: ['Writing', 'Remote', 'Content', 'Freelance'],
    createdAt: '2026-06-08T00:00:00.000Z',
    views: 144,
    saves: 19
  },
  {
    id: '6',
    title: 'Volunteer Teacher - Coding',
    organization: 'Kabul Coding School',
    category: 'Volunteer Work',
    location: 'Kabul',
    type: 'On-site',
    deadline: '2026-09-01',
    description: 'Volunteer to teach coding to underprivileged youth in Kabul. Make a difference in your community while gaining teaching experience.',
    requirements: ['Coding knowledge', 'Patience', 'Teaching skills', 'Reliable transportation'],
    applyLink: 'https://example.com/apply/volunteer',
    tags: ['Volunteer', 'Teaching', 'Coding', 'Community'],
    createdAt: '2026-06-12T00:00:00.000Z',
    views: 78,
    saves: 12
  },
  {
  id: '7',
  title: 'Data Science Scholarship Program',
  organization: 'Afghan Future Academy',
  category: 'Scholarship',
  location: 'Online',
  type: 'Remote',
  deadline: '2026-09-15',
  description:
    'A scholarship program for Afghan students interested in data science, artificial intelligence, and machine learning. Selected students will receive online mentorship and learning resources.',
  requirements: [
    'Basic Mathematics',
    'English Communication Skills',
    'Interest in Programming',
    'High School Diploma'
  ],
  applyLink: 'https://example.com/apply/data-scholarship',
  tags: [
    'Data Science',
    'AI',
    'Scholarship',
    'Online Learning'
  ],
  isFeatured: false,
  createdAt: '2026-06-18T00:00:00.000Z',
  views: 134,
  saves: 29
},

{
  id: '8',
  title: 'UI/UX Design Internship',
  organization: 'Creative Studio Afghanistan',
  category: 'Internship',
  location: 'Herat',
  type: 'Hybrid',
  deadline: '2026-08-25',
  description:
    'A practical internship opportunity for beginner designers. Learn user interface design, Figma, design systems, and work on real client projects.',
  requirements: [
    'Basic Figma Knowledge',
    'Design Portfolio',
    'Creative Thinking',
    'Communication Skills'
  ],
  applyLink: 'https://example.com/apply/uiux-internship',
  tags: [
    'UI/UX',
    'Figma',
    'Design',
    'Internship'
  ],
  isFeatured: true,
  createdAt: '2026-06-20T00:00:00.000Z',
  views: 221,
  saves: 56
},

{
  id: '9',
  title: 'Full Stack Developer Bootcamp',
  organization: 'Code Academy Afghanistan',
  category: 'Training Program',
  location: 'Online',
  type: 'Remote',
  deadline: '2026-10-01',
  description:
    'A three-month intensive bootcamp covering frontend and backend development including React, Node.js, databases, and deployment.',
  requirements: [
    'Basic JavaScript',
    'Computer Skills',
    'Commitment to Learning',
    'Internet Access'
  ],
  applyLink: 'https://example.com/apply/fullstack-bootcamp',
  tags: [
    'React',
    'Node.js',
    'Programming',
    'Bootcamp'
  ],
  isFeatured: false,
  createdAt: '2026-06-22T00:00:00.000Z',
  views: 178,
  saves: 41
},

{
  id: '10',
  title: 'Digital Marketing Assistant',
  organization: 'Afghan Media Network',
  category: 'Job',
  location: 'Kabul',
  type: 'On-site',
  deadline: '2026-08-05',
  description:
    'Entry-level position for someone interested in social media management, digital campaigns, content planning, and online marketing.',
  requirements: [
    'Social Media Knowledge',
    'Basic Design Skills',
    'Content Writing',
    'Teamwork'
  ],
  applyLink: 'https://example.com/apply/digital-marketing',
  tags: [
    'Marketing',
    'Social Media',
    'Content Creation',
    'Job'
  ],
  isFeatured: false,
  createdAt: '2026-06-25T00:00:00.000Z',
  views: 97,
  saves: 18
}
];
