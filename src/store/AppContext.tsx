import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { PetProfile } from '../types/pet';
import { Question } from '../types/question';
import { StorageService } from '../services/storage';
import { mockPetProfiles } from '../data/mockPets';
import { mockQuestions } from '../data/mockQuestions';

interface AppContextType {
  petProfiles: PetProfile[];
  collectionsArticles: string[];
  collectionsPitfalls: string[];
  questionHistory: Question[];
  addPetProfile: (profile: PetProfile) => void;
  updatePetProfile: (id: string, profile: PetProfile) => void;
  deletePetProfile: (id: string) => void;
  addArticleCollection: (id: string) => void;
  removeArticleCollection: (id: string) => void;
  isArticleCollected: (id: string) => boolean;
  addPitfallCollection: (id: string) => void;
  removePitfallCollection: (id: string) => void;
  isPitfallCollected: (id: string) => boolean;
  addQuestion: (question: Question) => void;
  refreshData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [petProfiles, setPetProfiles] = useState<PetProfile[]>([]);
  const [collectionsArticles, setCollectionsArticles] = useState<string[]>([]);
  const [collectionsPitfalls, setCollectionsPitfalls] = useState<string[]>([]);
  const [questionHistory, setQuestionHistory] = useState<Question[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const savedProfiles = StorageService.getPetProfiles();
    if (savedProfiles.length > 0) {
      setPetProfiles(savedProfiles);
    } else {
      StorageService.savePetProfiles(mockPetProfiles);
      setPetProfiles(mockPetProfiles);
    }

    setCollectionsArticles(StorageService.getCollectionsArticles());
    setCollectionsPitfalls(StorageService.getCollectionsPitfalls());
    setQuestionHistory(StorageService.getQuestionHistory());
  };

  const refreshData = () => {
    loadData();
  };

  const addPetProfile = (profile: PetProfile) => {
    const updated = StorageService.addPetProfile(profile);
    setPetProfiles([...updated]);
  };

  const updatePetProfile = (id: string, profile: PetProfile) => {
    const updated = StorageService.updatePetProfile(id, profile);
    setPetProfiles([...updated]);
  };

  const deletePetProfile = (id: string) => {
    const updated = StorageService.deletePetProfile(id);
    setPetProfiles([...updated]);
  };

  const addArticleCollection = (id: string) => {
    const updated = StorageService.addArticleCollection(id);
    setCollectionsArticles([...updated]);
  };

  const removeArticleCollection = (id: string) => {
    const updated = StorageService.removeArticleCollection(id);
    setCollectionsArticles([...updated]);
  };

  const isArticleCollected = (id: string): boolean => {
    return collectionsArticles.includes(id);
  };

  const addPitfallCollection = (id: string) => {
    const updated = StorageService.addPitfallCollection(id);
    setCollectionsPitfalls([...updated]);
  };

  const removePitfallCollection = (id: string) => {
    const updated = StorageService.removePitfallCollection(id);
    setCollectionsPitfalls([...updated]);
  };

  const isPitfallCollected = (id: string): boolean => {
    return collectionsPitfalls.includes(id);
  };

  const addQuestion = (question: Question) => {
    const updated = StorageService.addQuestion(question);
    setQuestionHistory([...updated]);
  };

  return (
    <AppContext.Provider
      value={{
        petProfiles,
        collectionsArticles,
        collectionsPitfalls,
        questionHistory,
        addPetProfile,
        updatePetProfile,
        deletePetProfile,
        addArticleCollection,
        removeArticleCollection,
        isArticleCollected,
        addPitfallCollection,
        removePitfallCollection,
        isPitfallCollected,
        addQuestion,
        refreshData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};
