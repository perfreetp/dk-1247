import Taro from '@tarojs/taro';

const STORAGE_KEYS = {
  PET_PROFILES: 'pet_profiles',
  COLLECTIONS_ARTICLES: 'collections_articles',
  COLLECTIONS_PITFALLS: 'collections_pitfalls',
  QUESTION_HISTORY: 'question_history'
};

export const StorageService = {
  getPetProfiles() {
    try {
      const data = Taro.getStorageSync(STORAGE_KEYS.PET_PROFILES);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('[Storage] Failed to get pet profiles:', error);
      return [];
    }
  },

  savePetProfiles(profiles) {
    try {
      Taro.setStorageSync(STORAGE_KEYS.PET_PROFILES, JSON.stringify(profiles));
    } catch (error) {
      console.error('[Storage] Failed to save pet profiles:', error);
    }
  },

  addPetProfile(profile) {
    const profiles = this.getPetProfiles();
    profiles.push(profile);
    this.savePetProfiles(profiles);
    return profiles;
  },

  updatePetProfile(profileId, updatedProfile) {
    const profiles = this.getPetProfiles();
    const index = profiles.findIndex(p => p.id === profileId);
    if (index !== -1) {
      profiles[index] = updatedProfile;
      this.savePetProfiles(profiles);
    }
    return profiles;
  },

  deletePetProfile(profileId) {
    const profiles = this.getPetProfiles();
    const filtered = profiles.filter(p => p.id !== profileId);
    this.savePetProfiles(filtered);
    return filtered;
  },

  getCollectionsArticles() {
    try {
      const data = Taro.getStorageSync(STORAGE_KEYS.COLLECTIONS_ARTICLES);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('[Storage] Failed to get collections articles:', error);
      return [];
    }
  },

  getCollectionsPitfalls() {
    try {
      const data = Taro.getStorageSync(STORAGE_KEYS.COLLECTIONS_PITFALLS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('[Storage] Failed to get collections pitfalls:', error);
      return [];
    }
  },

  getAllCollections() {
    return {
      articles: this.getCollectionsArticles(),
      pitfalls: this.getCollectionsPitfalls()
    };
  },

  saveCollectionsArticles(ids) {
    try {
      Taro.setStorageSync(STORAGE_KEYS.COLLECTIONS_ARTICLES, JSON.stringify(ids));
    } catch (error) {
      console.error('[Storage] Failed to save collections articles:', error);
    }
  },

  saveCollectionsPitfalls(ids) {
    try {
      Taro.setStorageSync(STORAGE_KEYS.COLLECTIONS_PITFALLS, JSON.stringify(ids));
    } catch (error) {
      console.error('[Storage] Failed to save collections pitfalls:', error);
    }
  },

  addArticleCollection(id) {
    const collections = this.getCollectionsArticles();
    if (!collections.includes(id)) {
      collections.push(id);
      this.saveCollectionsArticles(collections);
    }
    return collections;
  },

  removeArticleCollection(id) {
    const collections = this.getCollectionsArticles();
    const filtered = collections.filter(c => c !== id);
    this.saveCollectionsArticles(filtered);
    return filtered;
  },

  isArticleCollected(id) {
    return this.getCollectionsArticles().includes(id);
  },

  addPitfallCollection(id) {
    const collections = this.getCollectionsPitfalls();
    if (!collections.includes(id)) {
      collections.push(id);
      this.saveCollectionsPitfalls(collections);
    }
    return collections;
  },

  removePitfallCollection(id) {
    const collections = this.getCollectionsPitfalls();
    const filtered = collections.filter(c => c !== id);
    this.saveCollectionsPitfalls(filtered);
    return filtered;
  },

  isPitfallCollected(id) {
    return this.getCollectionsPitfalls().includes(id);
  },

  getQuestionHistory() {
    try {
      const data = Taro.getStorageSync(STORAGE_KEYS.QUESTION_HISTORY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('[Storage] Failed to get question history:', error);
      return [];
    }
  },

  saveQuestionHistory(questions) {
    try {
      Taro.setStorageSync(STORAGE_KEYS.QUESTION_HISTORY, JSON.stringify(questions));
    } catch (error) {
      console.error('[Storage] Failed to save question history:', error);
    }
  },

  addQuestion(question) {
    const history = this.getQuestionHistory();
    history.unshift(question);
    this.saveQuestionHistory(history);
    return history;
  },

  updateQuestion(questionId, updatedQuestion) {
    const history = this.getQuestionHistory();
    const index = history.findIndex(q => q.id === questionId);
    if (index !== -1) {
      history[index] = updatedQuestion;
      this.saveQuestionHistory(history);
    }
    return history;
  }
};
