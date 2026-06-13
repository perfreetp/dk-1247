import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import Taro from '@tarojs/taro';
import { PetProfile } from '../types/pet';
import { Question } from '../types/question';
import { StorageService } from '../services/storage';
import { mockPetProfiles } from '../data/mockPets';
import { mockQuestions } from '../data/mockQuestions';

interface AppContextType {
  petProfiles: PetProfile[];
  collections: string[];
  questionHistory: Question[];
  addPetProfile: (profile: PetProfile) => void;
  updatePetProfile: (id: string, profile: PetProfile) => void;
  deletePetProfile: (id: string) => void;
  addCollection: (id: string) => void;
  removeCollection: (id: string) => void;
  isCollected: (id: string) => boolean;
  addQuestion: (question: Question) => void;
  refreshData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [petProfiles, setPetProfiles] = useState<PetProfile[]>([]);
  const [collections, setCollections] = useState<string[]>([]);
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

    setCollections(StorageService.getCollections());
    setQuestionHistory(StorageService.getQuestionHistory());
  };

  const refreshData = () => {
    loadData();
  };

  const addPetProfile = (profile: PetProfile) => {
    const updated = StorageService.addPetProfile(profile);
    setPetProfiles([...updated]);
    Taro.showToast({ title: '添加成功', icon: 'success' });
  };

  const updatePetProfile = (id: string, profile: PetProfile) => {
    const updated = StorageService.updatePetProfile(id, profile);
    setPetProfiles([...updated]);
    Taro.showToast({ title: '保存成功', icon: 'success' });
  };

  const deletePetProfile = (id: string) => {
    const updated = StorageService.deletePetProfile(id);
    setPetProfiles([...updated]);
    Taro.showToast({ title: '删除成功', icon: 'success' });
  };

  const addCollection = (id: string) => {
    const updated = StorageService.addCollection(id);
    setCollections([...updated]);
    Taro.showToast({ title: '收藏成功', icon: 'success' });
  };

  const removeCollection = (id: string) => {
    const updated = StorageService.removeCollection(id);
    setCollections([...updated]);
    Taro.showToast({ title: '已取消收藏', icon: 'success' });
  };

  const isCollected = (id: string): boolean => {
    return collections.includes(id);
  };

  const addQuestion = (question: Question) => {
    const updated = StorageService.addQuestion(question);
    setQuestionHistory([...updated]);
  };

  return (
    <AppContext.Provider
      value={{
        petProfiles,
        collections,
        questionHistory,
        addPetProfile,
        updatePetProfile,
        deletePetProfile,
        addCollection,
        removeCollection,
        isCollected,
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
