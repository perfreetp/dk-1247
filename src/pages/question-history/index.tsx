import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import styles from './index.module.scss';
import { mockQuestions } from '@/data/mockQuestions';
import { useAppContext } from '@/store/AppContext';

const QuestionHistoryPage: React.FC = () => {
  const [selectedPetId, setSelectedPetId] = useState<string>('all');
  const [historyList, setHistoryList] = useState(mockQuestions);
  const { questionHistory, petProfiles } = useAppContext();

  useEffect(() => {
    filterHistory();
  }, [selectedPetId]);

  const filterHistory = () => {
    const allQuestions = [...mockQuestions, ...questionHistory];
    
    if (selectedPetId === 'all') {
      setHistoryList(allQuestions);
    } else if (selectedPetId === 'no-pet') {
      setHistoryList(allQuestions.filter(q => !q.petId));
    } else {
      setHistoryList(allQuestions.filter(q => q.petId === selectedPetId));
    }
  };

  const getPetEmoji = (type: string) => {
    const emojis: Record<string, string> = {
      cat: '🐱',
      dog: '🐶',
      rabbit: '🐰',
      bird: '🐦',
      all: '🐾'
    };
    return emojis[type] || '🐾';
  };

  const getPetName = (type: string) => {
    const names: Record<string, string> = {
      cat: '猫咪',
      dog: '狗狗',
      rabbit: '兔子',
      bird: '鸟类',
      all: '全部'
    };
    return names[type] || '宠物';
  };

  const getCategoryName = (category: string) => {
    const names: Record<string, string> = {
      feeding: '💊 喂养',
      care: '🧹 护理',
      behavior: '🧠 行为',
      health: '🏥 疾病'
    };
    return names[category] || '🏥 其他';
  };

  const handleViewAnswer = (questionId: string) => {
    Taro.navigateTo({
      url: `/pages/answer/index?id=${questionId}`
    });
  };

  const filterOptions = [
    { id: 'all', name: '全部', icon: '🐾', type: 'all' },
    ...petProfiles.map(profile => ({
      id: profile.id,
      name: profile.pet.name,
      icon: getPetEmoji(profile.pet.type),
      type: profile.pet.type
    })),
    { id: 'no-pet', name: '未关联宠物', icon: '❓', type: 'unknown' }
  ];

  return (
    <View className={styles.container}>
      <View className={styles.filterNav}>
        <ScrollView scrollX enableFlex className={styles.filterScroll}>
          {filterOptions.map(option => (
            <View
              key={option.id}
              className={`${styles.filterItem} ${selectedPetId === option.id ? styles.active : ''}`}
              onClick={() => setSelectedPetId(option.id)}
            >
              <Text className={styles.filterIcon}>{option.icon}</Text>
              <Text className={styles.filterText}>{option.name}</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      {historyList.length === 0 ? (
        <View className={styles.emptyState}>
          <Text className={styles.emptyIcon}>📋</Text>
          <Text className={styles.emptyTitle}>暂无问答记录</Text>
          <Text className={styles.emptyDesc}>
            {selectedPetId === 'all' 
              ? '您还没有提问记录，快去提问吧！'
              : '这只宠物还没有提问记录'}
          </Text>
        </View>
      ) : (
        <ScrollView className={styles.historyList} scrollY>
          <Text className={styles.historyCount}>
            {selectedPetId === 'all' 
              ? `共 ${historyList.length} 条记录`
              : `${filterOptions.find(o => o.id === selectedPetId)?.name} 的 ${historyList.length} 条记录`}
          </Text>
          {historyList.map(question => {
            const relatedPet = petProfiles.find(p => p.id === question.petId);
            return (
              <View
                key={question.id}
                className={styles.historyCard}
                onClick={() => handleViewAnswer(question.id)}
              >
                <View className={styles.cardHeader}>
                  <View className={styles.petBadge}>
                    <Text className={styles.petIcon}>
                      {relatedPet ? getPetEmoji(relatedPet.pet.type) : getPetEmoji(question.petType)}
                    </Text>
                    <Text className={styles.petType}>
                      {relatedPet ? relatedPet.pet.name : getPetName(question.petType)}
                    </Text>
                  </View>
                  <View className={styles.statusBadge}>
                    {question.status === 'answered' ? '✓ 已解答' : '⏳ 待解答'}
                  </View>
                </View>
                <Text className={styles.cardTitle}>{question.title}</Text>
                <Text className={styles.cardContent}>{question.content}</Text>
                <View className={styles.cardFooter}>
                  <Text className={styles.cardMeta}>
                    {question.createdAt} · {getCategoryName(question.category)}
                  </Text>
                  <Text className={styles.viewBtn}>查看回答 ›</Text>
                </View>
              </View>
            );
          })}
        </ScrollView>
      )}
    </View>
  );
};

export default QuestionHistoryPage;
