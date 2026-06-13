import { Pet, PetProfile } from '../types/pet';

export const mockPets: Pet[] = [
  {
    id: '1',
    name: '豆豆',
    type: 'cat',
    breed: '英短蓝猫',
    age: 2,
    gender: 'male',
    avatar: 'https://picsum.photos/id/237/200/200'
  },
  {
    id: '2',
    name: '小白',
    type: 'dog',
    breed: '泰迪',
    age: 3,
    gender: 'female',
    avatar: 'https://picsum.photos/id/659/200/200'
  }
];

export const mockPetProfiles: PetProfile[] = [
  {
    id: '1',
    pet: mockPets[0],
    weight: 4.5,
    allergies: ['海鲜'],
    medications: [],
    notes: '胆子较小，洗澡时会紧张'
  },
  {
    id: '2',
    pet: mockPets[1],
    weight: 3.2,
    allergies: [],
    medications: ['定期驱虫'],
    notes: '活泼好动，喜欢户外活动'
  }
];
