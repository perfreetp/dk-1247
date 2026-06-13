import Taro from '@tarojs/taro';
import { Pet, PetProfile } from '../types/pet';
import { Question } from '../types/question';

const STORAGE_KEYS = {
  PET_PROFILES: 'pet_profiles',
  COLLECTIONS: 'collections',
  QUESTION_HISTORY: 'question_history'
};

export const StorageService = {
  getPetProfiles(): PetProfile[] {
    try {
      const data = Taro.getStorageSync(STORAGE_KEYS.PET_PROFILES);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('[Storage] Failed to get pet profiles:', error);
      return [];
    }
  },

  savePetProfiles(profiles: PetProfile[]) {
    try {
      Taro.setStorageSync(STORAGE_KEYS.PET_PROFILES, JSON.stringify(profiles));
    } catch (error) {
      console.error('[Storage] Failed to save pet profiles:', error);
    }
  },

  addPetProfile(profile: PetProfile) {
    const profiles = this.getPetProfiles();
    profiles.push(profile);
    this.savePetProfiles(profiles);
    return profiles;
  },

  updatePetProfile(profileId: string, updatedProfile: PetProfile) {
    const profiles = this.getPetProfiles();
    const index = profiles.findIndex(p => p.id === profileId);
    if (index !== -1) {
      profiles[index] = updatedProfile;
      this.savePetProfiles(profiles);
    }
    return profiles;
  },

  deletePetProfile(profileId: string) {
    const profiles = this.getPetProfiles();
    const filtered = profiles.filter(p => p.id !== profileId);
    this.savePetProfiles(filtered);
    return filtered;
  },

  getCollections(): string[] {
    try {
      const data = Taro.getStorageSync(STORAGE_KEYS.COLLECTIONS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('[Storage] Failed to get collections:', error);
      return [];
    }
  },

  saveCollections(collectionIds: string[]) {
    try {
      Taro.setStorageSync(STORAGE_KEYS.COLLECTIONS, JSON.stringify(collectionIds));
    } catch (error) {
      console.error('[Storage] Failed to save collections:', error);
    }
  },

  addCollection(id: string) {
    const collections = this.getCollections();
    if (!collections.includes(id)) {
      collections.push(id);
      this.saveCollections(collections);
    }
    return collections;
  },

  removeCollection(id: string) {
    const collections = this.getCollections();
    const filtered = collections.filter(c => c !== id);
    this.saveCollections(filtered);
    return filtered;
  },

  isCollected(id: string): boolean {
    return this.getCollections().includes(id);
  },

  getQuestionHistory(): Question[] {
    try {
      const data = Taro.getStorageSync(STORAGE_KEYS.QUESTION_HISTORY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('[Storage] Failed to get question history:', error);
      return [];
    }
  },

  saveQuestionHistory(questions: Question[]) {
    try {
      Taro.setStorageSync(STORAGE_KEYS.QUESTION_HISTORY, JSON.stringify(questions));
    } catch (error) {
      console.error('[Storage] Failed to save question history:', error);
    }
  },

  addQuestion(question: Question) {
    const history = this.getQuestionHistory();
    history.unshift(question);
    this.saveQuestionHistory(history);
    return history;
  },

  updateQuestion(questionId: string, updatedQuestion: Question) {
    const history = this.getQuestionHistory();
    const index = history.findIndex(q => q.id === questionId);
    if (index !== -1) {
      history[index] = updatedQuestion;
      this.saveQuestionHistory(history);
    }
    return history;
  }
};
