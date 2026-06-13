export interface Article {
  id: string;
  title: string;
  summary: string;
  content: string;
  coverImage: string;
  category: 'feeding' | 'care' | 'behavior' | 'health';
  tags: string[];
  readTime: number;
  publishDate: string;
  isHot?: boolean;
}

export interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
  category: string;
}

export interface Pitfall {
  id: string;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  petTypes: ('cat' | 'dog' | 'rabbit' | 'bird')[];
}

export interface DailyTip {
  id: string;
  content: string;
  date: string;
  petType?: 'cat' | 'dog' | 'rabbit' | 'bird' | 'all';
}
