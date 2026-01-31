import  type{ University, ToDoItem } from './types';

export const MOCK_UNIVERSITIES: University[] = [
  {
    id: '1',
    name: 'University of Toronto',
    country: 'Canada',
    costLevel: 'High',
    acceptanceChance: 'Low',
    category: 'Dream',
    whyFit: 'Top-tier CS program matching your tech interest.',
    risks: 'High competition and high tuition fees.',
    tuitionFee: '$45,000 - $60,000'
  },
  {
    id: '2',
    name: 'University of Waterloo',
    country: 'Canada',
    costLevel: 'Medium',
    acceptanceChance: 'Medium',
    category: 'Target',
    whyFit: 'Excellent co-op opportunities for IT students.',
    risks: 'Rigorous workload and specific math requirements.',
    tuitionFee: '$30,000 - $45,000'
  },
  {
    id: '3',
    name: 'York University',
    country: 'Canada',
    costLevel: 'Medium',
    acceptanceChance: 'High',
    category: 'Safe',
    whyFit: 'Good location and solid tech curriculum.',
    risks: 'Lower global ranking compared to UofT.',
    tuitionFee: '$20,000 - $30,000'
  },
  {
    id: '4',
    name: 'University of Melbourne',
    country: 'Australia',
    costLevel: 'High',
    acceptanceChance: 'Low',
    category: 'Dream',
    whyFit: 'Global prestige and strong industry links.',
    risks: 'Very high living costs in Melbourne.',
    tuitionFee: '$40,000 - $55,000'
  }
];

export const INITIAL_TODOS: ToDoItem[] = [
  { id: 't1', task: 'Complete IELTS Preparation', completed: false, category: 'Exams' },
  { id: 't2', task: 'Draft Statement of Purpose', completed: false, category: 'Documents' },
  { id: 't3', task: 'Research Scholarship Options', completed: false, category: 'Profile' },
];
