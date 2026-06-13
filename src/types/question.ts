import { Pet } from './pet';

export type QuestionCategory = 'feeding' | 'care' | 'behavior' | 'health';

export interface Question {
  id: string;
  title: string;
  content: string;
  petType: 'cat' | 'dog' | 'rabbit' | 'bird' | 'all';
  category: QuestionCategory;
  petInfo?: {
    breed: string;
    age: number;
    symptoms?: string[];
    diet?: string;
  };
  images?: string[];
  createdAt: string;
  status: 'pending' | 'answered' | 'closed';
}

export interface Answer {
  id: string;
  questionId: string;
  content: string;
  category: QuestionCategory;
  helpful: number;
  outdated: number;
  createdAt: string;
  isVerified: boolean;
}

export interface QuestionHistory {
  id: string;
  question: Question;
  answers: Answer[];
  pet?: Pet;
  marked?: 'helpful' | 'outdated';
}
