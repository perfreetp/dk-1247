export interface Pet {
  id: string;
  name: string;
  type: 'cat' | 'dog' | 'rabbit' | 'bird';
  breed: string;
  age: number;
  gender: 'male' | 'female';
  avatar?: string;
}

export interface PetProfile {
  id: string;
  pet: Pet;
  weight?: number;
  allergies?: string[];
  medications?: string[];
  notes?: string;
}
